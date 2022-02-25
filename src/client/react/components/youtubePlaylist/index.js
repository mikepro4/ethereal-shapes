import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";
import * as _ from "lodash"
import YouTube from "react-youtube";

class YoutubePlaylist extends Component {

    constructor(props) {
		super(props);

		this.state = {
			player: null,
            play: false,
            pause: false,
            active: null
		};
	}

    componentDidMount = () => {
        this.setState({
            active: this.props.playlist.list[0]
        }, () => {
        })
    }

    onReady(event) {
		this.setState({
			player: event.target
		});
	}

    onStateChange(event) {
        console.log("onStateChange", event);
    }

    onPlay(event) {
		console.log("onPlay", event);
        this.setState({
            play: true,
            paused: false
        })
	}

    onPause(event) {
        this.setState({
            play: false,
            paused: true
        })
		console.log("onPause", event);
	}

    onEnd(event) {
        this.setState({
            play: false,
            paused: false
        })
		console.log("onEnd", event);
	}

    onStop(event) {
        this.setState({
            play: false,
            paused: false
        })
		console.log("onStop", event);
	}

    renderYoutubeList() {
        return(<div>
            list
        </div>)
    }

    render() {

        const videoPlayerOptions = {
			height: "100%",
			width: "100%",
			playerVars: {
				controls: 1,
				showinfo: 1,
				playsinline: 1,
				disablekb: 0,
				modestbranding: 0,
				enablejsapi: 1
			}
		};

        return (
            <div className="youtube-playlist-container">
                <YouTube
                    videoId={this.state.active}
                    opts={videoPlayerOptions}
                    onReady={this.onReady.bind(this)}
                    onPlay={this.onPlay.bind(this)}
                    onStop={this.onStop.bind(this)}
                    onPause={this.onPause.bind(this)}
                    onEnd={this.onEnd.bind(this)}
                    className="player-video"
                    onStateChange={this.onStateChange.bind(this)}
                />

                {/* <div>
                    play: {this.state.play ? "true": ""}
                </div>

                <div>
                    paused: {this.state.paused ? "true": ""}
                </div> */}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
    };
}

export default connect(mapStateToProps, {
})(withRouter(YoutubePlaylist));
