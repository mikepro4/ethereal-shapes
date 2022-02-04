import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import { formatTime } from "../../../utils/timeFormatter"


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
            console.log("here")
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

        const progressBarWidth = {
            width: 200
        }

        const progressBarHoverWidth = {
			width: this.state.hoverWidth
		};

		return (
			<div className="timeline-container" ref={this.timeline}>
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
        app: state.app
    };
}

export default withRouter(connect(mapStateToProps, {
})(Timeline));
