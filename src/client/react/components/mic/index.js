import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import Mic from "../icons/mic"

import {
    setMic
} from '../../../redux/actions/appActions'


import {
    setAnalyser
} from '../../../redux/actions/playerActions'

class MicAudio extends Component {
    state = {
        status: null,
        loaded: false,
        connected: false,
        audio: false
    }

    componentDidMount = () => {
        // this.toggleMic()

       

    }

    componentDidUpdate = (prevprops, prevparams) => {
    }


    toggleMic = async () => {
        console.log("toggle audio")
        if (!this.state.connected) {
            // var constraints = { audio: true, video: { width: 1280, height: 720 } }; 
            console.log(window.navigator)
        
            const audio = await window.navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
              });
            this.setState({
                connected: true,
                audio: audio
            }, () => {
                this.props.setMic(true)
                // this.audioContext = new (window.AudioContext ||
                //     window.webkitAudioContext)();
                // this.analyser = this.audioContext.createAnalyser();
                // this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
                // this.source = this.audioContext.createMediaStreamSource(this.props.audio);
                // this.source.connect(this.analyser);
                // this.refs.audio.currentTime = 0
                // var AudioContext = window.AudioContext
                //     || window.webkitAudioContext
                //     || false;
                // let context = new AudioContext();
                // let analyser = context.createAnalyser();
                // let audio = this.refs.audio
                // let audioSrc = context.createMediaElementSource(audio);
                // audioSrc.connect(analyser);
                // audioSrc.connect(context.destination);
                // this.props.setAnalyser(analyser)

            })
        } else {
            this.state.audio.getTracks().forEach(track => track.stop());
            this.setState({
                connected: false,
                audio: null
            }, () => {
                this.props.setMic(false)
            })
        }

    }

    render() {
        return (
            <div className={
                classNames({
                    "mic-container": true,
                    "mic-active": this.props.app.mic
                })
            }
                onClick={() => this.toggleMic()}
            >
                <Mic />
                <div className="mic-background">
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.app.user,
        location: state.router.location,
        app: state.app
    };
}

export default connect(mapStateToProps, {
    setAnalyser,
    setMic
})(MicAudio);
