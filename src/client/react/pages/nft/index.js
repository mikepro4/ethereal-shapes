import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import keydown from "react-keydown";
import moment from "moment"
import update from "immutability-helper";

import qs from "qs";
import * as _ from "lodash"

import Viz from "../../components/viz"

import SettingsIcon from "../../components/icons/settings"

import {
    showDrawer
} from '../../../redux/actions/appActions'

import Timeline from "../../components/player/Timeline"

import NFTDetails from "../../../react/components/nft_details"

import EditorEditableField from "../../components/editor/editorEditableField"

import { 
    createShape, loadShape, searchShapes, deleteShape, updateShape, loadNewShape, clearNewShape, getMainShape
} from "../../../redux/actions/shapeActions"


class NFTPage extends Component {

    state = {
        description: "",
        touched: false,
        timeInterval: null,
        time: 0,
        originalBoldRate: null,
        activeZone: null,
        startedIntervals: [],
        mathValues: ["sin", "cos", "tan", "atan", "log"]
	}

	componentDidMount() {
        if (this.props.location.search) {
            console.log("here")
            console.log(this.getQueryParams().id)
            // this.props.loadNft(this.getQueryParams().id, (data) => {
            //     console.log(data)
            // })
        } else {

        }
    }
    
	componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.app.activeKeys, this.props.app.activeKeys)) {
            setTimeout(() => {
                this.checkIntervals()
            }, 1)
        }
    }

    componentWillUnmount() {
    }

    checkIntervals () {

        _.map(this.props.app.activeKeys, (key) => {

            let startedItervalKey = _.includes(this.state.startedIntervals, key);
            if(!startedItervalKey) {
                this.setState({
                    startedIntervals: _.union(this.state.startedIntervals, [key])
                }, () => {
                    this.launchInterval(key, "start")
                })
            }
        })

        _.map(this.state.startedIntervals, (key) => {

            let startedItervalKey = _.includes(this.props.app.activeKeys, key);

            if(!startedItervalKey) {
                this.launchInterval(key, "stop")

                this.setState({
                    startedIntervals: _.pull(this.state.startedIntervals, key)
                })
            }
        })
    }

    launchInterval(key, action) {
        console.log(key, action)

        let changeValues = {
            boldRate: {
                standard: 0.01,
                extended: 0.1
            },
            rotateSpeed: {
                standard: 0.001,
                extended: 0.01
            },
            frequency: {
                standard: 0.00005,
                extended: 0.0001
            },
            step: {
                standard: 0.00001,
                extended: 0.0001
            },
            pointSize: {
                standard: 0.01,
                extended: 0.5,
                minValue: 0,
                maxValue: 80
            },
            pointOpacity: {
                standard: 0.01,
                extended: 0.1,
                minValue: 0,
                maxValue: 1
            }
        }

        let includesShift = _.includes(this.props.app.activeKeys, 16) 

        if(key == 82) {
            // this.runPropertyChange(includesShift, action, "more", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
        }

        if(key == 69) {
            // this.runPropertyChange(includesShift, action, "less", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
        }

        if(key == 66) {
            // this.runPropertyChange(includesShift, action, "more", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
        }

        if(key == 86) {
            // this.runPropertyChange(includesShift, action, "less", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
        }

        if(key == 70) {
            // this.runPropertyChange(includesShift, action, "more", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
        }

        if(key == 68) {
            // this.runPropertyChange(includesShift, action, "less", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
        }

        if(key == 83) {
            // this.runPropertyChange(includesShift, action, "more", "step", changeValues.step.standard, changeValues.step.extended)
        }

        if(key == 65) {
            // this.runPropertyChange(includesShift, action, "less", "step", changeValues.step.standard, changeValues.step.extended)
        }

        if(key == 80) {
            // this.runPropertyChange(includesShift, action, "more", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
        }

        if(key == 79) {
            // this.runPropertyChange(includesShift, action, "less", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
        }

        if(key == 76) {
            // this.runPropertyChange(includesShift, action, "more", "pointOpacity", changeValues.pointOpacity.standard, changeValues.pointOpacity.extended, "point", changeValues.pointOpacity.minValue, changeValues.pointOpacity.maxValue)
        }

        if(key == 75) {
            // this.runPropertyChange(includesShift, action, "less", "pointOpacity", changeValues.pointOpacity.standard, changeValues.pointOpacity.extended, "point", changeValues.pointOpacity.minValue, changeValues.pointOpacity.maxValue)
        }

        if(key == 87) {
            // if(action == "start") {
            //     this.updateMath("next")
            // }
        }

        if(key == 81) {
            // if(action == "start") {
            //     this.updateMath("prev")
            // }
        }

    }


    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
    handleDescriptionChange = (value) => {
        this.setState({
            description: value
        })
    }

    renderHead = () => (
		<Helmet>
			<title>Ethereal Shapes</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

	render() {
        
		return (
     		<div className="route-content nft-route">
                {this.renderHead()}

                <div className="nft-details-container">
                    <NFTDetails item={
                        {
                            nft: {
                                price: 2.22,
                                name: "Ethereal" 
                            }
                        }
                    } large={true} />
                </div>

                <div className="description-editor">
                    <EditorEditableField
                        value={this.state.description ? this.state.description : ""}
                        updateField={(value) => this.handleDescriptionChange(value)}
                    />
                </div>

                <div 
                    className="main-shape" 
                >
                    <Viz shapeId="61fc4d5c9c7c440021028b5b" pointCount={1024}/>
                    
                </div>

                <div className="media-controls">
                    media controls
                </div>

                <div className="nft-player-container">
                    <Timeline duration={1000}/>
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
        showDrawer,
        createShape, loadShape, searchShapes, deleteShape, updateShape, loadNewShape, clearNewShape, getMainShape
	})(NFTPage))
}