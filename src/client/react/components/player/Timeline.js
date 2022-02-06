import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import { formatTime } from "../../../utils/timeFormatter"

import {
    trackSeek,
    trackPlay,
    updateHoverTime
} from "../../../redux/actions/playerActions"


class Timeline extends Component {


    constructor (props) {
        super(props)

        this.state = {
            hoverWidth: 0
        }

        this.timeline =  this.timeline = React.createRef();
    }

    handleResize = () => {
		this.forceUpdate();
	};

    componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		setTimeout(() => {
			this.forceUpdate();
		}, 1);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

    getTimeline() {
		if (this.timeline.current) {
			const containerWIdth = this.timeline.current.getBoundingClientRect().width;
			const timesAmount = containerWIdth / 50;
			const timeInterval = this.props.duration / timesAmount;

			let betterSecondsArray = [0];

			for (let i = 0; i < timesAmount - 1; i++) {
				betterSecondsArray.push(betterSecondsArray[i] + timeInterval);
			}

			return betterSecondsArray;
		}
	}

    handlePorgressBarClick(event) {
		let box = document.getElementById("progressBar").getBoundingClientRect();
		const relX =
			event.pageX - box.left;
		const progressBarPercent =
			relX *
			100 /
			box.width;
		const seekSeconds = progressBarPercent * this.props.nft.metadata.duration/ 100;
        this.props.trackPlay(
            {
                _id: this.props.nft._id,
                audioUrl: this.props.nft.metadata.audioUrl
            }
			
		); 

        setTimeout(() => {
            this.props.trackSeek(
                seekSeconds,
                {
                    _id: this.props.nft._id,
                    audioUrl: this.props.nft.metadata.audioUrl
                }
                
            )
        , 1})
		
	}

    calculateWidth(event) {
        // console.log(this.refs.progress_bar_container.offsetLeft)
        let box = document.getElementById("progressBar").getBoundingClientRect();
		const relX =
			event.pageX - box.left;
		const progressBarPercent =
			relX *
			100 /
			box.width;
		const seekSeconds = progressBarPercent * this.props.nft.metadata.duration / 100;
		return seekSeconds;
	}

    onMouseMove(event) {
		this.props.updateHoverTime(this.calculateWidth(event));
		this.setState({
            hoverSeconds: this.calculateWidth(event),
			hoverWidth: this.calculateWidth(event) * 100 / this.props.nft.metadata.duration + "%"
		});

		// Update hover time in analysis reducer
		// this.props.updateHoverTime(this.calculateWidth(event))
	}

	onMouseLeave(event) {
		this.props.updateHoverTime(null);
		this.setState({
            hoverSeconds: 0,
			hoverWidth: 0
		});
		// Update hover time in analysis reducer
		// this.props.dispatch(updateHoverTime(null))
	}


        
    render() {
        let times = "";

		const timeArray = this.getTimeline();

		let rangeCLases = classNames({
			range: true
		});

        if (!_.isEmpty(timeArray)) {
			times = timeArray.map((time, i) => {
				return (
					<li className="time" key={i}>
						<span>{formatTime(time)}</span>
					</li>
				);
			});
		}

        if(this.props.nft && this.props.nft.metadata) {
            // console.log(this.props.player.currentTime, this.props.nft.metadata.duration)
        }

        const progressBarWidth = {
			width: this.props.player.currentTime * 100 / this.props.duration + "%"
		};

        const progressBarHoverWidth = {
			width: this.state.hoverWidth
		};

        // const cursorHover = {
		// 	left: this.props.player.hoverTime * 100 / this.props.nft.duration + "%"
		// };

		return (
			<div 
                className="timeline-container" 
                ref={this.timeline}
                id="progressBar"
                onClick={this.handlePorgressBarClick.bind(this)}
                // onMouseMove={this.onMouseMove.bind(this)}
                // onMouseLeave={this.onMouseLeave.bind(this)}
            >
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={progressBarWidth} />
                    <div className="progress-bar-hover" style={progressBarHoverWidth} />
                </div>
				<ul className="time-list">{times}</ul>
			</div>
		);
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        player: state.player
    };
}

export default withRouter(connect(mapStateToProps, {
    trackSeek,
    trackPlay,
    updateHoverTime
})(Timeline));
