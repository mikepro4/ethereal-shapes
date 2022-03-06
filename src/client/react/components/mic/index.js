import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import stringInject from 'stringinject';
import Dictaphone from "./Dictaphone";

import Mic from "../icons/mic"

import 'regenerator-runtime'
import SpeechRecognition from 'react-speech-recognition';

import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

import qs from "qs";
import * as _ from "lodash"

import {
    generate,
    setMic,
    setMicAudio,
    setTouchZones
} from '../../../redux/actions/appActions'

import {
    setAnalyser
} from '../../../redux/actions/playerActions'

import {
    createTranscript
} from '../../../redux/actions/transcriptActions'

class MicAudio extends Component {
    state = {
        status: null,
        loaded: false,
        connected: false,
        audio: false,
        request: [],
        response: []
    }

    componentDidMount = () => {
        // this.toggleMic()

    }

    componentDidUpdate = (prevprops, prevparams) => {
    }


    toggleMic = async () => {
        console.log("toggle audio")


        if (!this.state.connected) {

            const appId = 'd158af9e-c90e-47f6-b0a4-6e2fde5d2be6';
            const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
            SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

            SpeechRecognition.startListening({
                continuous: true,
                language: 'en-GB'
            })

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
                this.props.setMicAudio(audio)


                let audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)();


                // var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

                // var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
                // recognition.continuous = true;
                // recognition.lang = 'en-US';
                // recognition.interimResults = false;
                // recognition.maxAlternatives = 0
                // recognition.start()

                // recognition.addEventListener('result', (event) => {
                //     console.log(event)
                //     // let result
                //     // if(event.results[1]) {
                //     //     result = event.results[1][0].transcript
                //     // } else {
                //     //     result = event.results[0][0].transcript
                //     // }

                //     this.setState({
                //         results: Object.values(event.results)
                //     })
                //     console.log(event.results[0][0].transcript)
                // });


                let analyser = audioContext.createAnalyser();
                let dataArray = new Uint8Array(analyser.frequencyBinCount);
                let source = audioContext.createMediaStreamSource(audio);

                // this.connect();
                source.connect(analyser);
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
                this.props.setAnalyser(analyser)





                // this.audioContext = new (window.AudioContext ||
                //     window.webkitAudioContext)();
                //   this.analyser = this.audioContext.createAnalyser();
                //   this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
                //   this.source = this.audioContext.createMediaStreamSource(this.props.audio);
                //   this.source.connect(this.analyser);
                //   this.rafId = requestAnimationFrame(this.tick);

            })
        } else {
            this.state.audio.getTracks().forEach(track => track.stop());
            this.setState({
                connected: false,
                audio: null
            }, () => {
                this.props.setMic(false)

                SpeechRecognition.stopListening({
                    continuous: true,
                    language: 'en-GB'
                })
            })
        }

    }
    renderTranscript() {
        console.log("here", this.state.results)
        return (<div>
            {this.state.results && this.state.results.length > 0 && this.state.results.map((result, i) => {
                return (
                    <div key={i}>{result[0].transcript}</div>
                )
            })}
        </div>)
    }

    createResponse = (text) => {
        clearInterval(this.state.timeInterval);
        clearTimeout(this.state.secondTimeInterval);
        setTimeout(() => {
            const timeInterval = setInterval(() => {
                if (this.state.response.length > 0) {
                    this.setState({
                        response: [
                            this.state.response[0]
                        ]
                    })
                }

            }, 5000);
            this.setState({ timeInterval });

            const secondTimeInterval = setTimeout(() => {
                this.setState({
                    response: []
                })
            }, 30000)

            this.setState({ secondTimeInterval });
        }, 1)

        let finalText = stringInject(this.props.nft.currentNFT.metadata.prompt, [text]);

        this.props.generate(finalText, (data) => {
            console.log(data)
            this.setState({
                response: [
                    ...this.state.response,
                    {
                        date: new Date(),
                        text: data.result
                    }
                ]
            })
        })
    }

    generate = (text) => {
        console.log("Start Timer")
        console.log(text)
        this.saveTranscript()

        this.setState({
            request: [
                ...this.state.request,
                {
                    date: new Date(),
                    text: text
                }
            ]
        }, () => {
            console.log(this.state.request)

            let lastStatement = this.state.request[this.state.request.length - 1].text
            if (lastStatement !== "SAVE TRANSCRIPT") {
                this.createResponse(lastStatement)
            }
        })


        // const timeInterval = setInterval(() => {
        //     this.setState({
        //         request: [
        //             this.state.request,
        //             text
        //         ]
        //     })

        // }, 5000);
        // this.setState({ timeInterval });
    }

    renderResponse() {
        console.log(this.state.response)
        return (<div>
            {this.state.response && this.state.response.length > 0 && _.reverse(this.state.response).map((result, i) => {
                if (i <= 3) {
                    return (
                        <div className="response-item" key={i}>{result.text}</div>
                    )
                }

            })}
        </div>)
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    saveTranscript() {
        clearTimeout(this.state.saveTranscriptInterval);
        let nftId = this.getQueryParams().id
        setTimeout(() => {
            const saveTranscriptInterval = setTimeout(() => {
                if (this.state.response.length > 0 || this.state.request.length > 0) {
                    console.log("request", this.state.request)
                    console.log("response", this.state.response)
                    console.log("nftId", nftId)
                    this.props.createTranscript({
                        request: this.state.request,
                        response: this.state.response,
                        metadata: {
                            nftId: nftId,
                        }
                    }, () => {
                        this.setState({
                            request: [],
                            response: []
                        })
                    })
                }

            }, 30000);
            this.setState({ saveTranscriptInterval });
        }, 1)

    }


    render() {
        const commands = [
            {
                command: 'show controls',
                callback: (food) => { this.props.setTouchZones(true) },
                matchInterim: true
            },
            {
                command: 'close controls',
                callback: (food) => { this.props.setTouchZones(false) },
                matchInterim: true
            },
            ,
            {
                command: 'save transcript',
                callback: (food) => { this.saveTranscript() },
                matchInterim: true
            }
        ]

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
                <div className="speech-container">
                    <span>{this.renderTranscript()}</span>
                </div>

                <div className="response-container">
                    <span>{this.renderResponse()}</span>
                </div>
                <Dictaphone commands={commands} onListen={(text) => this.generate(text)} />
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
        app: state.app,
        nft: state.activeNFT
    };
}

export default connect(mapStateToProps, {
    setAnalyser,
    setMic,
    setMicAudio,
    setTouchZones,
    generate,
    createTranscript
})(withRouter(MicAudio));
