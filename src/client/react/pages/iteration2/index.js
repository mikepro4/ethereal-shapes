import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"
import { Button } from "@blueprintjs/core";

import { searchNFTs, loadNFTDetails } from "../../../redux/actions/nftActions"

import ListResults from "../../components/list"
import NavLinks from "../../components/navLinks"
import Viz from "../../components/viz"

import { loadShape } from "../../../redux/actions/shapeActions"

import {
    setAbout
} from "../../../redux/actions/appActions"

import {
    loadNFT
} from "../../../redux/actions/nftActions"

import Twitter from "../../components/icons/twitter"
import Discord from "../../components/icons/discord"
import Opensea from "../../components/icons/opensea"
import Instagram from "../../components/icons/instagram"
import Youtube from "../../components/icons/youtube"
import Reddit from "../../components/icons/reddit"
import WhiteTwitter from "../../components/icons/whiteTwitter"
// import * as THREE from "three";

import Player from "../../components/player"
import Timeline from "../../components/player/Timeline"

import Playlist from "../../components/playlist"



class About extends Component {


    constructor(props) {
        super(props)

        this.state = {
            nft: {},
            shape: {}
        }

        this.planet = this.planet = React.createRef()
    }

    setNft = (nft) => {
        this.setState({
            nft: nft
        })
    }

    setShape = (shape) => {
        this.setState({
            shape: shape
        })
    }


    componentWillUnmount() {
    }

    componentDidMount() {

        // this.props.loadNFT("62102b4d62ae4100210b6dfd", (data) => {
        //     console.log(data)
        //     this.setState({
        //         nft: data
        //     })
        // })

        // 62102b4d62ae4100210b6dfd
        // this.props.setAbout(true)
        // this.props.loadShape(this.props.app.iteration1.mainShapeId, true, (data) => {
        //     this.setState({
        //         shape: data
        //     })
        // })
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

            const geometry = new THREE.PlaneGeometry( 2000, 2000 );
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vshader,
                fragmentShader: fshader,
                wireframe: false,
                lights: true
            });

            const knot = new THREE.Mesh(geometry, material);
            scene.add(knot);
            camera.position.y = 0.1;
            camera.position.z = 0.4;

            let startFrame  = 25
            let endFrame = 18
            let direction = "minus"
            uniforms.iGlobalTime.value = startFrame

           

            var animate = function () {
                requestAnimationFrame(animate);
                if(direction == "minus") {
                    uniforms.iGlobalTime.value -= clock.getDelta() * 0.4;
                    if(uniforms.iGlobalTime.value <= endFrame) {
                        direction = "plus"
                    }
                } else {
                    uniforms.iGlobalTime.value += clock.getDelta() * 0.4;
                    if(uniforms.iGlobalTime.value >= startFrame) {
                        direction = "minus"
                    }
                }
                uniforms.iResolution.value.x = window.devicePixelRatio ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
                uniforms.iResolution.value.y = window.devicePixelRatio ? window.innerHeight * window.devicePixelRatio : indow.innerHeight;
                renderer.render(scene, camera);
            };


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

    componentWillUnmount = () => {
        var id = window.requestAnimationFrame(function () { });
        while (id--) {
            window.cancelAnimationFrame(id);
        }
    }


    renderHead = () => (
        <Helmet>
            <title>Ethereal Shapes</title>
        </Helmet>
    )

    getOpacity() {
        if (this.props.app.totalScrolledPixels < 500) {
            return 100 - this.props.app.totalScrolledPixels / 1.5
        }
        else {
            return 0
        }
    }

    renderSectionHeader(number, name, border) {
        return(
            <div 
                className={classNames({
                    "section-header": true,
                    "border": border
                })}
            >
                <span className="section-count">
                    {number}
                </span>
                <span className="section-divider">
                    ––
                </span>
                <span className="section-name">
                    {name}
                </span>
            </div>
        )
    }

    download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`
            <html>
                <head>
                <style>
                    * {margin: 0; padding: 0}
                    body {background: #000}
                </style>

                </head>
                <body>

                <script type="text/javascript">

                (function(window, document, undefined){

                    // code that should be taken care of right away

                    window.onload = init;

                    function init(){
                        // the code to be called when the dom has loaded
                        // #document has its nodes
                        window.requestAnimFrame = (function(callback) {
                    return (
                      window.requestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      window.msRequestAnimationFrame ||
                      function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                      }
                    );
                  })();
                  
                  var radius = 500
                  
                  function Target() {
                    var incr = 0.9;
                    this.x = 0;
                    this.y = 0;
                    this.rotate = 0;
                    this.radius = radius;
                    this.rotate_speed = 0.001 * 0.1 + 0.001;
                    this.friction = 0.01 * 0.8 + 0.1;
                    this.speed = 0.01 * 0.2 + 0.03;
                    this.step = 5 * 0.5 + 0.0001;
                  
                    this.freq = 0.0001 * 0.09 + 0.01;
                    this.bold_rate = 1 * 0.3 + 0.1;
                  }
                  
                  function VPoint(x, y) {
                    this.x = x;
                    this.y = y;
                    this.vx = 0;
                    this.vy = 0;
                    this.target = null;
                  }
                  
                  var canvas = document.getElementById("dots");
                  
                  var w = 100;
                  var h = 100;
                  
                  var _targets;
                  var _pts = [];
                  
                  var _pre_sec = 0;
                  
                  var ctx = canvas.getContext("2d");
                  ctx.fillStyle = "rgba(255, 0, 0, 255)";
                  ctx.fillRect(0, 0, w, h);
                  
                  for (var i = 0; i < 5000; i++) {
                    var pt = new VPoint(
                      Math.random(1) * window.innerWidth,
                      Math.random(1) * window.innerHeight
                    );
                    _pts.push(pt);
                  }
                  
                  resizeCanvas();
                  
                  window.addEventListener("resize", resizeCanvas, false);
                  
                  function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    w = canvas.width;
                    h = canvas.height;
                    refreshTarget();
                  }
                  var t;
                  
                  
                  function refreshTarget() {
                    _targets = [];
                    t = new Target();
                  
                    t.x = w / 2;
                    t.y = h / 2;
                    _targets.push(t);
                  
                    var l = _pts.length;
                    for (i = 0; i < l; i++) {
                      _pts[i].target = _targets[i % _targets.length];
                    }
                  }
                  
                  function update() {
                    var i = 0;
                    var l = _targets.length;
                    var t;
                    var pt;
                  
                    for (i = 0; i < l; i++) {
                      t = _targets[i];
                      t.rotate += t.rotate_speed;
                    }
                  
                    l = _pts.length;
                  
                    ctx.fillStyle = "rgba(0,0, 0, 255)";
                    ctx.fillRect(0, 0, w * 2, h * 2);
                  
                    for (i = 0; i < l; i++) {
                      pt = _pts[i];
                      t = pt.target;
                      var t_radius =
                        Math.cos(t.rotate * 2.321 + t.freq * i) * t.radius * t.bold_rate +
                        t.radius;
                      var tx = t.x + Math.cos(t.rotate + t.step * i) * t_radius;
                      var ty = t.y + Math.sin(t.rotate + t.step * i) * t_radius;
                  
                      pt.vx += (tx - pt.x) * t.speed;
                      pt.vy += (ty - pt.y) * t.speed;
                  
                      pt.x += pt.vx;
                      pt.y += pt.vy;
                  
                      pt.vx *= t.friction;
                      pt.vy *= t.friction;
                  
                      if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
                        ctx.fillStyle = "rgb(255, 255, 255)";
                        ctx.fillRect(pt.x, pt.y, 1.3, 1.3);
                      }
                    }
                    requestAnimFrame(update);
                  }
                  
                  update();
                    }

                    })(window, document, undefined);
                  
                </script>
                    <canvas id="dots"></canvas>
                
                </body>
            </html>
        `));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    render() {
        let designPlaylist = {
            seconds: 10,
            list: [
                "62016829bc6f6c00213836f9",
                "620207da14481155d8f6f491",
                "6202082d14481155d8f6f517",
                "6201b3784a8a7d0021be3850"
            ]
        }

        return (
            <div className="iteration2-container">
                {/* <div className="iteration2-planet" style={{opacity: this.getOpacity() + "%"}} id="planet" ref={ref => (this.mount = ref)}>
                </div> */}

                {this.renderHead()}

                <div className="iteration2-content-wrapper">

                    <div className="iteration2-section section-hero">

                        {this.renderSectionHeader("01", "Collection", false)}

                        <div className="section-hero-top">
                            <h1 className="section-big-title">
                                Controlling the chaos
                            </h1>
                        </div>

                        <div className="section-hero-bottom">
                            <p className="section-main-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis vehicula nunc. Nullam eget dolor non urna pharetra euismod sed quis sapien. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis vehicula nunc. Nullam eget dolor non urna pharetra euismod sed quis sapien. 
                            </p>
                            

                            <div className="section-stats">

                                <Button
                                    className={"mint-button main-button"}
                                    type="submit"
                                    text="Mint"
                                    large="true"
                                    onClick={() => {}}
                                />
                                <div className="stat-price">
                                    0.222 ETH
                                </div>

                                <div className="stat-divider"></div>

                                <div className="stat-count">
                                    0 / 666 items
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="iteration2-section section-design">
                        {this.renderSectionHeader("02", "Design", true)}

                        <Playlist
                            playlist={designPlaylist}
                            setNft={(nft) => this.setNft(nft)}
                            setShape={(shape) => this.setShape(shape)}
                        />
                    </div>

                    <div className="iteration2-section section-approach">
                        {this.renderSectionHeader("03", "Approach", true)}
                        <div className="section-approach-top">
                            <h1 className="section-big-title">
                                Algorithmic interactive art
                            </h1>

                            {/* <button onClick={() => this.download("hello.html","This is the content of my file :)")}>Download File</button> */}
                        </div>

                        <ul className="section-approach-bottom">
                            <li className="section-approach-1">
                                {this.state.shape && this.state.shape.shape && this.state.shape.shape.math }
                            </li>
                            <li  className="section-approach-2">
                                {/* {this.state.shape && this.state.shape.shape ? <Viz defaultViz={ this.state.shape } lessBlur={true} fullScreen={true} presentation={true} transparent={true} nftId={this.state.nft._id}  />  : " "} */}
                            </li>
                            <li  className="section-approach-3">
                                {/* {this.state.shape && this.state.shape.shape ? <Viz defaultViz={ this.state.shape } lessBlur={true} fullScreen={true} presentation={true} transparent={true} nftId={this.state.nft._id}  />  : " "} */}
                            </li>
                            <li  className="section-approach-4">
                                {/* {this.state.shape && this.state.shape.shape ? <Viz defaultViz={ this.state.shape } lessBlur={true} fullScreen={true} presentation={true} transparent={true} nftId={this.state.nft._id}  />  : " "} */}
                            </li>
                            <li  className="section-approach-5">
                                {/* {this.state.shape && this.state.shape.shape ? <Viz defaultViz={ this.state.shape } lessBlur={true} fullScreen={true} presentation={true} transparent={true} nftId={this.state.nft._id}  />  : " "} */}
                            </li>
                        </ul>

                        <div className="section-approach-description">

                        </div>
                    </div>

                    <div className="iteration2-section section-process">
                        <div className="section-process-description"></div>
                        <div className="section-process-list"></div>
                        <div className="section-process-view"></div>
                    </div>

                    <div className="placeholder">

                    </div>

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
        loadNFTDetails,
        loadShape,
        setAbout,
        loadNFT
    })(About))
}