import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon } from "@blueprintjs/core";

import {
	trackPlay,
	trackPause,
	trackSeek
} from '../../../redux/actions/playerActions'

import Play from "../icons/play"
import Pause from "../icons/pause"

class Timeline extends Component {

	renderPlayPauseButton = () => {

            

        let track = {
            _id: 1,
            audioUrl: this.props.word.metadata.audioUrl,
            title: "Iteration 1",
            subtitle: "Octatrack, DFAM, Digitakt, Digitone, Analog Rytm",
            duration: 700
        }

		if(this.props.player.status == "pause" || this.props.player.status == "stop") {
			return (
				<div className="play-button" onClick={() => this.props.trackPlay(track)}>
					<Play/>
				</div>
			)
		} else if (this.props.player.status == "play") {
			return (
				<div className="play-button" onClick={() => this.props.trackPause(track)}>
                    <Pause/>
				</div>
			)
		}
	}

	render() {

		if(this.props.player.trackId) {
			return (
	      <div className="jam-main-timeline-container">
	        <div className="timeline-left">
						{this.props.word && this.props.word.metadata && this.props.word.metadata.audioUrl && this.renderPlayPauseButton()}
{/* 
						<div className="jam-title-container">
							<div className="track-title">
								{this.props.player.trackMetadata.title}
							</div>

							<div className="track-subtitle">
								{this.props.player.trackMetadata.subtitle}
							</div>
						</div> */}
	        </div>

	        <div className="timeline-right">
	            {/* timeline right: {this.props.player.trackMetadata.duration}
			    currentTime: {this.props.player.currentTime} */}
	        </div>
	      </div>
			);
		} else {
			return ""
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
		player: state.player,
        word: state.app.activeWord
	};
}

export default connect(mapStateToProps, {
	trackPlay,
	trackPause,
	trackSeek
})(withRouter(Timeline));
