import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import keydown from "react-keydown";
import moment from "moment"
import update from "immutability-helper";
import axios from "axios";

import qs from "qs";
import * as _ from "lodash"

import Viz from "../../components/viz"

import SettingsIcon from "../../components/icons/settings"

import {
    showDrawer,
    updateQueryString,
    pauseAnimation
} from '../../../redux/actions/appActions'

import Timeline from "../../components/player/Timeline"

import NFTDetails from "../../../react/components/nft_details"

import EditorEditableField from "../../components/editor/editorEditableField"

import { 
    createShape, loadShape, clearShape, searchShapes, deleteShape, updateShape, loadNewShape, clearNewShape, getMainShape
} from "../../../redux/actions/shapeActions"

import { 
    loadNFT,
    loadNewNFT,
    clearNFT,
    clearNewNFT,
    updateNFTImage
} from "../../../redux/actions/nftActions"

import ipfsHttpClient from "ipfs-http-client";

import { Buffer } from 'buffer';

// var client = ipfsHttpClient('ipfs.infura.io:5001/api/v0', "", { protocol: "https"}) // leaving out the arguments will default to these values

var client = ipfsHttpClient({ host: 'ipfs.infura.io', port: '5001', 'api-path': '/api/v0/', protocol: "https" })



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
        // this.props.loadShape("61fc4d5c9c7c440021028b5b")

        // this.props.loadNewNFT({
        //     nft: {
        //         price: 222,
        //         name:  "Dystopia"
        //     },
        //     metadata: {
        //         shapeId: "61fc4d5c9c7c440021028b5b"
        //     }
        // })

        
        if (this.props.location.search) {
            console.log("here")
            console.log(this.getQueryParams().id)

            this.props.loadNFT(this.getQueryParams().id, (data) => {
                this.props.loadNewNFT(data)
                this.props.loadShape(data.metadata.shapeId)
            })
            // this.props.loadNft(this.getQueryParams().id, (data) => {
            //     console.log(data)
            // })
        } else {

            this.props.loadShape("61fc4d5c9c7c440021028b5b")

            this.props.loadNewNFT({
                nft: {
                    price: 222,
                    name:  "Ethereal",
                    description: "1"
                },
                metadata: {
                    shapeId: "61fc4d5c9c7c440021028b5b"
                }
            })

        }
    }

    componentWillUnmount() {
        this.props.clearShape()
        this.props.clearNewShape()
        this.props.clearNFT()
        this.props.clearNewNFT()
    }

    
	componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.app.activeKeys, this.props.app.activeKeys)) {
            setTimeout(() => {
                this.checkIntervals()
            }, 1)
        }

        if(this.getQueryParams().id !== this.props.nft._id && this.getQueryParams().id) {
            this.props.loadNFT(this.getQueryParams().id, (data) => {
                this.props.loadNewNFT(data)
                this.props.loadShape(data.metadata.shapeId)
            })
        }

        // if(this.props.nft && this.props.nft.metadata && prevprops.nft && prevprops.nft.metadata) {
        //     if(this.props.nft.metadata.shapeId !== prevprops.nft.metadata.shapeId) {
        //         this.props.loadShape(this.props.nft.metadata.shapeId)
        //     }
        // }

       
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

        if(key == 16) {

            // rotate speed
            if(_.includes(this.state.startedIntervals, 82)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "more", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "more", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
                }
            } 

            if(_.includes(this.state.startedIntervals, 69)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "less", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "less", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
                }
            } 

            // bold rate
            if(_.includes(this.state.startedIntervals, 66)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "more", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "more", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
                }
            } 

            if(_.includes(this.state.startedIntervals, 86)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "less", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "less", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
                }
            } 

            // frequency
            if(_.includes(this.state.startedIntervals, 70)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "more", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "more", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
                }
            } 

            if(_.includes(this.state.startedIntervals, 86)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "less", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "less", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
                }
            } 

            // step
            if(_.includes(this.state.startedIntervals, 83)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "more", "step", changeValues.step.standard, changeValues.step.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "more", "step", changeValues.step.standard, changeValues.step.extended)
                }
            } 

            if(_.includes(this.state.startedIntervals, 65)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "less", "step", changeValues.step.standard, changeValues.step.extended)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "less", "step", changeValues.step.standard, changeValues.step.extended)
                }
            } 

            // pointSize
            if(_.includes(this.state.startedIntervals, 80)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "more", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "more", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
                }
            } 

            if(_.includes(this.state.startedIntervals, 79)) {
                if(action == "start") {
                    this.runPropertyChange(includesShift, "start", "less", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
                } else if(action == "stop") {
                    this.runPropertyChange(false, "start", "less", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
                }
            } 

            
        }

        if(key == 82) {
            this.runPropertyChange(includesShift, action, "more", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
        }

        if(key == 69) {
            this.runPropertyChange(includesShift, action, "less", "rotateSpeed", changeValues.rotateSpeed.standard, changeValues.rotateSpeed.extended)
        }

        if(key == 66) {
            this.runPropertyChange(includesShift, action, "more", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
        }

        if(key == 86) {
            this.runPropertyChange(includesShift, action, "less", "boldRate", changeValues.boldRate.standard, changeValues.boldRate.extended)
        }

        if(key == 70) {
            this.runPropertyChange(includesShift, action, "more", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
        }

        if(key == 68) {
            this.runPropertyChange(includesShift, action, "less", "frequency", changeValues.frequency.standard, changeValues.frequency.extended)
        }

        if(key == 83) {
            this.runPropertyChange(includesShift, action, "more", "step", changeValues.step.standard, changeValues.step.extended)
        }

        if(key == 65) {
            this.runPropertyChange(includesShift, action, "less", "step", changeValues.step.standard, changeValues.step.extended)
        }

        if(key == 80) {
            this.runPropertyChange(includesShift, action, "more", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
        }

        if(key == 79) {
            this.runPropertyChange(includesShift, action, "less", "pointSize", changeValues.pointSize.standard, changeValues.pointSize.extended, "point", changeValues.pointSize.minValue, changeValues.pointSize.maxValue)
        }

        if(key == 76) {
            this.runPropertyChange(includesShift, action, "more", "pointOpacity", changeValues.pointOpacity.standard, changeValues.pointOpacity.extended, "point", changeValues.pointOpacity.minValue, changeValues.pointOpacity.maxValue)
        }

        if(key == 75) {
            this.runPropertyChange(includesShift, action, "less", "pointOpacity", changeValues.pointOpacity.standard, changeValues.pointOpacity.extended, "point", changeValues.pointOpacity.minValue, changeValues.pointOpacity.maxValue)
        }

        if(key == 87) {
            if(action == "start") {
                this.updateMath("next")
            }
        }

        if(key == 81) {
            if(action == "start") {
                this.updateMath("prev")
            }
        }

    }

    updateProperty(property, amount, destination, minValue, maxValue) {
        let selectedShape

        if(this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }

        // console.log(selectedShape)
        if(selectedShape && selectedShape.defaultViz) {
            let finalshape

            if(!destination || destination == "shape") {
                finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            [property]: selectedShape.defaultViz.shape[property]  + amount
                        }
                    }
                }
            }

            if(destination == "point") {
                let finalAmount
                let pointAmount = selectedShape.defaultViz.point[property]  + amount

                if(maxValue) {
                    if(pointAmount < minValue) {
                        finalAmount = minValue
                    } else if(pointAmount > maxValue) {
                        finalAmount = maxValue
                    } else if(pointAmount >= minValue && pointAmount <= maxValue) {
                        finalAmount = pointAmount
                    }
                } else {
                    if(pointAmount < 0) {
                        finalAmount = 0
                    } else {
                        finalAmount = pointAmount
                    }
                }

                finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        point: {
                            ...selectedShape.defaultViz.point,
                            [property]: finalAmount
                        }
                    }
                }
            }
            
            this.props.loadNewShape(finalshape)
        }
    }

    updateMath(direction) {
        let selectedShape

        if(this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }

        if(selectedShape && selectedShape.defaultViz) {
            
            let indexOfCurrent = _.indexOf(this.state.mathValues, selectedShape.defaultViz.shape.math)
            let finalIndex

            if(direction == "next") {
                if((indexOfCurrent + 1) > this.state.mathValues.length -1) {
                    finalIndex = 0
                } else {
                    finalIndex = indexOfCurrent + 1
                }

                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            math: this.state.mathValues[finalIndex]
                        }
                    }
                }

                this.props.loadNewShape(finalshape)
            } else if (direction == "prev") {

                if((indexOfCurrent - 1) < 0) {
                    finalIndex = this.state.mathValues.length - 1
                } else {
                    finalIndex = indexOfCurrent - 1
                }

                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            math: this.state.mathValues[finalIndex]
                        }
                    }
                }

                this.props.loadNewShape(finalshape)
            }

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

    runPropertyChange (includesShift, action, direction, property, standardAmount, extendedAmount, destination, minValue, maxValue) {
        if(action == "start") {
            if(direction == "more") {
                clearInterval(this.state[property+"More"]);
            }

            if(direction == "less") {
                clearInterval(this.state[property+"Less"]);
            }

            let amount

            if(includesShift) {
                amount = extendedAmount
            } else {
                amount = standardAmount
            }

            if(direction == "less") {
                amount = amount * -1
            } 

            if(direction == "more") {
                const intervalMore = setInterval(() => {
                    this.updateProperty(property, amount, destination, minValue, maxValue)
                }, 1);
        
                this.setState({ 
                    [property+"More"]: intervalMore 
                });
            } 

            if(direction == "less") {
                const intervalLess = setInterval(() => {
                    this.updateProperty(property, amount, destination, minValue, maxValue)
                }, 1);
        
                this.setState({ 
                    [property+"Less"]: intervalLess 
                });
            } 

        } else if (action == "stop") {
            let timeoutValue = 50
            
            if (includesShift) {
                timeoutValue = 100
            }

            if(direction == "more") {
                setTimeout(() => {
                    clearInterval(this.state[property+"More"]);
                }, timeoutValue)
            }

            if(direction == "less") {
                setTimeout(() => {
                    clearInterval(this.state[property+"Less"]);
                }, timeoutValue)
            }

        }
    }

    hideEditor = () => {
        this.props.updateQueryString(
            { imageEditor: false },
            this.props.location,
            this.props.history
        );
    }

    captureImage = () => {
        var canvas = document.getElementById("viz");
        var dataURL = canvas.toDataURL("image/png");
        // var newTab = window.open('about:blank','image from canvas');
        // newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
        console.log(dataURL)

        this.urltoFile(dataURL)
            .then((file) => {
                console.log(file);
                this.onChange(file)
                this.handleDrop(file)
            })
    }

    handleDrop = file => {
        // Progress
        var config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round(
                    progressEvent.loaded * 100 / progressEvent.total
                );
                console.log(
                    "onUploadProgress called with",
                    arguments,
                    "Percent Completed:" + percentCompleted
                );
            }
        };
        // Initial FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `epic`);
        formData.append("upload_preset", "ethereal"); // Replace the preset name with your own
        formData.append("api_key", "DhgKXiXYQqQj0nEB74w_70HfPWI"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        return axios
            .post(
                "https://api.cloudinary.com/v1_1/dcdnt/image/upload",
                formData,
                config
            )
            .then(response => {
                const data = response.data;
                const fileURL = data.secure_url;
                let palette = ""
                console.log("cloudinary url: ", fileURL)
            });
	};

    onChange = async(file) => {

        try {
            const added = await client.add(
                file, {
                    progress: (prog) => console.log("received: ", prog)
                }
            )
            console.log(added)
            const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;
            console.log(url)
            this.setState({
                fileUrl: url.toString()
            })
            // this.props.dispatch(change('nftSettings', 'nft.fileUrl', url.toString()));
        } catch(error) {
            console.log("error: ", error);
        }
    }

    urltoFile = (url, filename, mimeType) => {
        mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }

    renderTransportControls = () => {
        if(this.props.app.pauseAnimation == true) {
            return(<div onClick={() => this.props.pauseAnimation(false)}>Play</div>)
        } else {
            return(<div onClick={() => this.props.pauseAnimation(true)}>Pause</div>)
        }
    }

    cancel = () => {
        this.hideEditor()
        this.props.pauseAnimation(false)
    }

    save = () => {
        this.props.updateNFTImage(this.props.nft._id,this.state.fileUrl, () => {
            this.hideEditor()
        })
        
    }
    

    renderScreen = () => {
        if(this.getQueryParams().imageEditor == "true") {
            // this.props.pauseAnimation(false)

            let vertical  =false

            let height = 0

            if( this.props.app.clientHeight > this.props.app.clientWidth) {
                vertical = true
            }

            if(vertical) {
                height = this.props.app.clientWidth
            } else {
                height = 800
            }
            return(<div>
                <div 
                className="preview-shape" 
                style = {{height: height + "px", top: 50 + "%", marginTop: - height/2 + "px"}}
            >
                <div className="nft-generated">{this.state.fileUrl && <img src={this.state.fileUrl}></img>}</div>
                {this.props.nft &&  this.props.nft.metadata && <Viz shapeId={this.props.nft.metadata.shapeId}pointCount={null} highDensity={true} /> }
                <div className="cancel-editor" onClick={() => this.cancel()}>Cancel</div>
                <div className="save-editor" onClick={() => this.save()}>Save</div>
                <div className="capture-editor" onClick={() => this.captureImage()}>Capture image</div>
                <div 
                    className={classNames({
                        "clear-editor": true,
                        "active": this.state.fileUrl
                    })}
                    onClick={() => this.setState({
                        fileUrl: null
                    })}
                >Clear</div>

                <div className="transport-editor">
                    {this.renderTransportControls()}
                </div>
                
            </div>
            </div>)
        } else {
            return(<div 
                className="main-shape" 
            >
                {this.props.nft &&  this.props.nft.metadata && <Viz shapeId={this.props.nft.metadata.shapeId}pointCount={null} fullScreen={true}/> }
                
            </div>)
        }
    }

    renderButtonStatus() {
        if(this.getQueryParams().id) {
            if(this.props.nft.metadata.minted) {
                if(this.props.nft.metadata.owner) {
                    if(this.props.nft.metadata.owner == this.props.app.account.address) {
                        return("own")
                    } else {
                        return("sold")
                    }
                } else {
                    return("buy")
                }
            } else {
                return("mint")
            }
        } else {
            return("create")
        }
    }

	render() {

        let vizId

        if(!this.props.nft.currentNFT) {
        }

        let style = {}

        // if(this.getQueryParams().imageEditor == "true") {
        //     style = {height: this.props.app.clientWidth + "px", top: 50 + "%", marginTop: -this.props.app.clientWidth / 2 +"px" }
        // } else {
        //     style = {}
        // }
		return (
     		<div className="route-content nft-route">
                {this.renderHead()}

                <div className="nft-details-container">
                    {this.props.nft && this.props.nft.nft && this.props.nft.nft.name && <NFTDetails item={this.props.nft
                    } large={true} more={true} type={this.renderButtonStatus()} /> }
                </div>

                <div className="description-editor">
                    <EditorEditableField
                        value={this.state.description ? this.state.description : ""}
                        updateField={(value) => this.handleDescriptionChange(value)}
                    />
                </div>

                {this.renderScreen()}

                {/* <div 
                    className="main-shape" 
                    style={style}
                >
                    {this.props.nft &&  this.props.nft.metadata && <Viz shapeId={this.props.nft.metadata.shapeId}pointCount={null} fullScreen={true}/> }
                    
                </div> */}

                

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
        app: state.app,
        shape: state.shape,
        nft: state.activeNFT.newNFT
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
        showDrawer,
        createShape, loadShape, clearShape, searchShapes, deleteShape, updateShape, loadNewShape, clearNewShape, getMainShape,
        loadNewNFT,
        loadNFT,
        clearNFT,
        clearNewNFT,
        updateQueryString,
        pauseAnimation,
        updateNFTImage
	})(NFTPage))
}