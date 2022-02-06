import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";

import {
	trackPlay,
	trackPause,
	trackSeek,
    trackLoad
} from '../../../redux/actions/playerActions'

import Play from "../icons/play"
import Pause from "../icons/pause"

class Timeline extends Component {

    componentDidMount = () => {
        if(this.props.nft) {
            this.props.trackLoad({
                _id: this.props.nft._id,
                audioUrl: this.props.nft.metadata.audioUrl,
            })
    
        }
      
    }

    componentDidUpdate(prevprops) {
        if(this.props.nft.metadata.audioUrl !== prevprops.nft.metadata.audioUrl) {
            this.props.trackLoad({
                _id: this.props.nft._id,
                audioUrl: this.props.nft.metadata.audioUrl,
            })

           

            // this.props.trackPlay({
            //     _id: this.props.nft._id,
            //     audioUrl: this.props.nft.metadata.audioUrl,
            // })
            // this.props.trackPause({
            //     _id: this.props.nft._id,
            //     audioUrl: this.props.nft.metadata.audioUrl,
            // })


        }
    }

	renderPlayPauseButton = () => {

            

        let track = {
            _id: this.props.nft._id,
            audioUrl: this.props.nft.metadata.audioUrl,
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

        return (
        <div className="nft-transport">
            {this.props.nft && this.props.nft.metadata && this.props.nft.metadata.audioUrl && this.renderPlayPauseButton()}
        </div>
        );
}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
		player: state.player
	};
}

export default connect(mapStateToProps, {
	trackPlay,
	trackPause,
	trackSeek,
    trackLoad
})(withRouter(Timeline));
