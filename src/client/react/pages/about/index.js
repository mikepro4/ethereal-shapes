import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import { searchNFTs, loadNFTDetails } from "../../../redux/actions/nftActions"

import ListResults from "../../components/list"
import NavLinks from "../../components/navLinks"

// import * as THREE from "three";


class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {}

        this.planet = this.planet = React.createRef()
    }

    componentDidMount() {
        const vshader = `
#include <common>
#include <lights_pars_begin>
#include <noise>

uniform float iGlobalTime;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform float audio1;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
varying float v_noise;

varying vec3 vPosition;
varying mat4 vModelMatrix;
varying vec3 vWorldNormal;
varying vec3 vLightIntensity;

#define t iGlobalTime
void main() {
  #include <simple_lambert_vertex>

  vLightIntensity = vLightFront + ambientLightColor;

  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vPosition = position;
  vModelMatrix = modelMatrix;

  
  v_noise = 20.0 *  -.1 * turbulence( 0.1*sin(iGlobalTime*1.7) * normal + iGlobalTime * 0.017 );
  float b = 1.0 * pnoise( 0.001 * position, vec3( 100.0 ) );
  float displacement = b - dot(0.1, sin(iGlobalTime*1.7))  * v_noise;
  vec3 pos = position + displacement * normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
`;
        const fshader = `
uniform vec3 u_color;
uniform vec3 u_light_position;
uniform vec3 u_rim_color;
uniform float u_rim_strength;
uniform float u_rim_width;
uniform float iGlobalTime;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform float audio1;
uniform samplerCube u_envmap_cube;
uniform float u_envmap_strength;

varying vec2 vUv;
varying vec3 vecPos;
varying vec3 vecNormal;

// Example varyings passed from the vertex shader
varying vec3 vPosition;
varying vec3 vWorldNormal;
varying mat4 vModelMatrix;
varying vec3 vLightIntensity;
varying float v_noise;


#define t iGlobalTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
    p.xz*= m(2.4);p.xy*= m(.4) ;
    vec3 q = p*30.+t*2.3;
    return  p.x*p.y * length(p+vec3(log(.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.04 - 0.9;
}

void main() {
  vec3 worldPosition = ( vModelMatrix * vec4( vPosition, 1.0 )).xyz;
  vec3 lightVector = normalize( cos(iGlobalTime*u_light_position*0.2)  - worldPosition );
  vec3 viewVector = normalize(cameraPosition - worldPosition);
  float rimndotv =  max(0.0, u_rim_width - clamp(dot(vWorldNormal, viewVector), 0.0, 1.0));
  // vec3 rimLight = rimndotv * mix(u_rim_color, vec3(0.0,1.0,1.0), cos(iGlobalTime/0.7))* cos(-iGlobalTime*u_rim_strength*1.5);
   vec3 rimLight = rimndotv * u_rim_color* u_rim_strength;
  vec2 p = gl_FragCoord.xy/iResolution.y - vec2(.8,.5) ;

  vec3 cl = vec3(0.);
  float d = 2.7;
  for(int i=0; i<=5; i++) {
    vec3 p = + normalize(vec3(-worldPosition.x-3.6,worldPosition.y-0.3,worldPosition.z+3.1))*d ;
    float rz = map(p);
    float f =  clamp((rz - map(p+0.4))*0.8*cos(iGlobalTime*.1)*p.x, -.1, 0.9 );
    vec3 l = vec3(0.,.0,.1) + vec3(3., 3.5 , 3.)*f ;
    cl = cl*l + (1.-smoothstep(0., 2.5, rz))*.7*l;
    d += min(rz, 1.0 );
  }

  vec3 reflection = reflect(-viewVector, vWorldNormal);
  vec3 envmapLight = textureCube(u_envmap_cube, reflection).rgb * u_envmap_strength;
  vec3 color = u_color /10.+ vLightIntensity*cl + envmapLight + rimLight ;
  vec3 test = cl * v_noise;
  gl_FragColor = vec4( color, 1.0 );

 }
`;
        setTimeout(() => {


            var startTime = Date.now();
            var clock = new THREE.Clock();

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                60,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );

            const light = new THREE.DirectionalLight(0x54eeff, 0);
            light.position.set(0, 0.5, 1.25);
            scene.add(light);
            scene.add(new THREE.AmbientLight(0xffffff));

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.mount.appendChild(renderer.domElement);

            const envCube = new THREE.CubeTextureLoader()
                .setPath("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/")
                .load([
                    "skybox2_px.jpg",
                    "skybox2_nx.jpg",
                    "skybox2_py.jpg",
                    "skybox2_ny.jpg",
                    "skybox2_pz.jpg",
                    "skybox2_nz.jpg"
                ]);

            const uniforms = THREE.UniformsUtils.merge([
                THREE.UniformsLib["common"],
                THREE.UniformsLib["lights"],
                {
                    lightIntensity: { type: "f", value: 1.0 },
                    iGlobalTime: { type: "f", value: 0.0 },
                    audio1: { type: "f", value: 0.0 },
                    iResolution: { type: "v2", value: new THREE.Vector2() },
                    side: THREE.DoubleSide,
                    wrapping: THREE.ClampToEdgeWrapping,
                    shading: THREE.SmoothShading,
                    side: THREE.BackSide
                }
            ]);

            uniforms.u_color = { value: new THREE.Color(0xccffff) };
            uniforms.u_light_position = { value: light.position.clone() };
            uniforms.u_rim_color = { value: new THREE.Color(0xE2D7FF) };
            uniforms.u_rim_strength = { value: 0 };
            uniforms.u_rim_width = { value: 1 };
            uniforms.u_envmap_cube = { value: envCube };
            uniforms.u_envmap_strength = { value: 0 };

            const geometry = new THREE.SphereGeometry(1, 128, 128);
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vshader,
                fragmentShader: fshader,
                wireframe: false,
                lights: true
            });

            const knot = new THREE.Mesh(geometry, material);
            scene.add(knot);

            camera.position.z = 5;

            var animate = function () {
                requestAnimationFrame(animate);
                uniforms.iGlobalTime.value += clock.getDelta() * 0.5;
                uniforms.iResolution.value.x = window.devicePixelRatio ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
                uniforms.iResolution.value.y = window.devicePixelRatio ? window.innerHeight * window.devicePixelRatio : indow.innerHeight;
                renderer.render(scene, camera);
            };
            animate();

            const controls = new THREE.OrbitControls(camera, renderer.domElement);

            onWindowResize();
            if (!("ontouchstart" in window))
                window.addEventListener("resize", onWindowResize, false);

            animate();

            function onWindowResize(event) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        }, 100)
        // === THREE.JS EXAMPLE CODE END ===
    }

    renderHead = () => (
        <Helmet>
            <title>Home</title>
        </Helmet>
    )

    // componentWillUnmount = () => {
    // 	window.removeEventListener("resize", this.handleResize);
    //     window.cancelAnimationFrame(this.state.requestAnimationFrame);
    //     clearInterval(this.state.timeInterval);
    // }

    // handleResize = () => {
    //     this.updateDimensions()
    // }

    getOpacity() {
        if (this.props.app.totalScrolledPixels < 500) {
            return 100 - this.props.app.totalScrolledPixels / 1.5
        }
        else {
            return 0
        }
    }

    render() {

        return (
            <div className="about-container">
                <div className="planet" id="planet" ref={ref => (this.mount = ref)}>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    };
}


export default {
    component: withRouter(connect(mapStateToProps, {
        searchNFTs,
        loadNFTDetails
    })(Home))
}