import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import {
	trackPlaying,
	setAnalyser
} from '../../../redux/actions/playerActions'

class AudioPlayer extends Component {
  state = {
    status: null,
    loaded: false,
    connected: false
  }

  componentDidMount = () => {
    // if(!this.props.player.analyser) {

    //     var AudioContext = window.AudioContext
    //     || window.webkitAudioContext
    //     || false;
    //     let context = new AudioContext();
    //     let analyser = context.createAnalyser();
    //     let audio = this.refs.audio
    //     audio.crossOrigin = "anonymous";
    //     let audioSrc = context.createMediaElementSource(audio);
    //     audioSrc.connect(analyser);
    //     audioSrc.connect(context.destination);
    //     this.props.setAnalyser(analyser)
    // }

    // document.body.addEventListener("touchstart", () => {
        // this.refs.audio.currentTime = 0
        // var AudioContext = window.AudioContext
        // || window.webkitAudioContext
        // || false;
        // let context = new AudioContext();
        // let analyser = context.createAnalyser();
        // let audio = this.refs.audio
        
    
        // audio.addEventListener("canplay",  (event) => { console.log(event.type);
        //     let audioSrc = context.createMediaElementSource(audio);
        //     audioSrc.connect(analyser);
        //     audioSrc.connect(context.destination);
        //     analyser.connect(context.destination); 
        //     this.props.setAnalyser(analyser)
        // });
    // });

    // document.body.addEventListener("mousedown", () => {
    //     this.setState({
    //         playable: true
    //     })

    //     if(!this.state.playable) {
    //         this.refs.audio.currentTime = 0
    //         var AudioContext = window.AudioContext
    //         || window.webkitAudioContext
    //         || false;
    //         let context = new AudioContext();
    //         let analyser = context.createAnalyser();
    //         let audio = this.refs.audio
            
        
    //         audio.addEventListener("canplay",  (event) => { console.log(event.type);
    //             let audioSrc = context.createMediaElementSource(audio);
    //             audioSrc.connect(analyser);
    //             audioSrc.connect(context.destination);
    //             analyser.connect(context.destination); 
    //             this.props.setAnalyser(analyser)
    //         });
    //     }
        
    // });

    // setTimeout(() => {
    //     this.setState({
    //         loaded: true
    //     })

        
    // }, 100)

        // this.play()

        // setTimeout(() => {
        //     this.pause()
        // }, 1000)

        // this.play()
   
   
  }

  componentDidUpdate = (prevprops, prevparams) => {
    // if(prevparams.loaded !== this.state.loaded) {
    //     if(!this.props.player.analyser) {
            
    //     }
       
    // }

    if(
      prevprops.player.seekToSeconds !== this.props.player.seekToSeconds
      && this.props.player.seekToSeconds > 0
    ) {
      this.refs.audio.currentTime = this.props.player.seekToSeconds
      this.play() 
    }

    if(prevprops.player.status !== this.props.player.status) {
      this.changeStatus(this.props.player.status)
    }
  }

  changeStatus = (status) => {
      
    switch (status) {
      case "play":
  			return this.play()
      case "pause":
  			return this.pause()
      case "stop":
        return this.stop()
  		default:
  			return
    }
  }

  play = () => {
    console.log("play audio")
    if(!this.state.connected) {
        this.setState({
            connected: true
        }, () => {
            this.refs.audio.currentTime = 0
            var AudioContext = window.AudioContext
            || window.webkitAudioContext
            || false;
            let context = new AudioContext();
            let analyser = context.createAnalyser();
            let audio = this.refs.audio
            let audioSrc = context.createMediaElementSource(audio);
            audioSrc.connect(analyser);
            audioSrc.connect(context.destination);
            this.props.setAnalyser(analyser)

        })
    }
    

    this.refs.audio.play()
  }

  pause = () => {
    console.log("pause audio");
    this.refs.audio.pause()
  }

  stop = () => {
    console.log("stop audio")
    this.refs.audio.pause()
    this.refs.audio.currentTime = 0
  }

  playing = () => {
    this.props.trackPlaying(
      this.props.player.trackId,
      this.refs.audio.currentTime,
      this.props.player.trackMetadata
    )
  }

	render() {
		return (
            <div style={{display: "none"}}> 
                {this.props.player.trackId ? (
                    <audio
                        id="audio"
                        ref="audio"
                        preload="none"
                        controls={true}
                        crossOrigin="anonymous" 
                        src={this.props.player.trackMetadata._id ? this.props.player.trackMetadata.audioUrl : ""}
                        onTimeUpdate={() => {
                            this.playing()
                        }}
                        onLoadedData={() => {
                        }}
                    >
            </audio>
			) : ""}

      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.app.user,
		location: state.router.location,
        player: state.player
	};
}

export default connect(mapStateToProps, {
	trackPlaying,
	setAnalyser
})(AudioPlayer);
