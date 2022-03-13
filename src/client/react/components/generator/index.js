import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { Button, Position, Toaster, Intent } from "@blueprintjs/core";

import {
    showDrawer,
    hideDrawer
} from "../../../redux/actions/appActions"
import {
    loadGenerator,
    searchGenerators,
    loadGeneratorToState,
    startRecord,
    stopRecord,
    pauseGenerator,
    playGenerator,
    stopGenerator,
    nextIteration,
    prevIteration,
    updateIteration
} from "../../../redux/actions/generatorActions"

import {
    createNFT,
    searchNFTs
} from "../../../redux/actions/nftActions"

import {
    loadNewShape,
    createShape
} from "../../../redux/actions/shapeActions"

import {
    loadCollection
} from "../../../redux/actions/collectionActions"


import SmallButton from "../smallButton"

class Generator extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        // this.props.loadCollection(this.props.nft.newNFT.metadata.collectionId, (data) => {
        //     console.log("GENERATOR ", data)
        // })
            // this.props.searchGenerators(
            //     "",
            //     "",
            //     0,
            //     1,
            //     {},
            //     data => {
            //         console.log(data.all[0])
            //         this.props.loadGeneratorToState(data.all[0])
            //     }
            // );
            // if(this.props.nft && this.props.nft.newNFT && this.props.nft.newNFT.metadata  && this.props.nft.newNFT.metadata.collectionId) {
                this.updateGenerator()
            // }
    }

    updateGenerator = () => {
        if(this.props.nft && this.props.nft.newNFT && this.props.nft.newNFT.metadata  && this.props.nft.newNFT.metadata.collection) {
            this.props.loadCollection(this.props.nft.newNFT.metadata.collection.value, (data) => {
                console.log("COLLECTION: ", data)
                this.props.loadGenerator(
                    data.metadata.generatorId,
                    data => {
                        console.log(data)
                        this.props.loadGeneratorToState(data)
                    }
                );
            })
        }
        
    }

    componentDidUpdate = (prevprops) => {
        if (this.props.generator.currentIteration !== prevprops.generator.currentIteration) {
            this.generateIteration()
        }

        if (this.props.nft.newNFT._id !== prevprops.nft.newNFT._id) {
            // this.props.loadCollection(this.props.nft.newNFT.metadata.collectionId, (data) => {
            //     console.log("GENERATOR ", data)
            // })
            this.updateGenerator()
        }
    }

    toggleRecord = () => {
        if (this.props.generator.record) {
            this.props.stopRecord()
        } else {
            this.props.startRecord()
        }
    }

    togglePlay = () => {
        if (this.props.generator.status == "play") {
            this.props.pauseGenerator()
            clearInterval(this.state.timeInterval)
        } else {
            this.props.playGenerator()
            const timeInterval = setInterval(() => {

                let iteration

                if (this.props.generator.currentIteration + 1 < this.props.generator.details.iterations) {
                    iteration = this.props.generator.currentIteration + 1
                } else {
                    iteration = 0
                }
                this.props.updateIteration(iteration)
                this.generateIteration(iteration)

            }, this.props.generator.details.iterationGap);

            this.setState({ timeInterval });
        }
    }

    randomNumber = (from, to) => {
        var randomnum = (Math.random() * (to - from + from) + from).toFixed(6);
        console.log("RAAAAAANDOM: ", randomnum)
        return randomnum
       
    }

    isOdd = (num) => { 
        return num % 2;
    }

    generateParameter = (shape, key) => {
        // console.log(this.props.generator.details.parameters)
        let contains = _.filter(this.props.generator.details.parameters, (parameter) => {
            return (parameter.changeParameter.value == key)
        })
        if (contains.length > 0) {
            let param = contains[0]
            let delayIterations

            if(param.delayIterations) {
                delayIterations = param.delayIterations
            } else {
                delayIterations = 0
            }
            if(this.props.generator.currentIteration > parseInt(delayIterations, 10)) {
                if(param.type == "step") {
                    if (param.stepDirection == "forward") {
                        return shape[key] + param.stepAmount * this.props.generator.currentIteration
                    } else if (param.stepDirection == "backward") {
                        return shape[key] - param.stepAmount * this.props.generator.currentIteration
                    }
                }  if(param.type == "random") {
                    console.log(param)
                    let from = parseInt(param.from, 10)
                    let to = parseInt(param.to, 10)
                    return(this.randomNumber(from, to))
                } if(param.type == "range") {
                    console.log(param)
                    let from = parseInt(param.from, 10)
                    let to = parseInt(param.to, 10)
                    let delayIterations = parseInt(param.delayIterations, 10)
                    let rangeIterations = parseInt(param.rangeIterations, 10)

                    let startFrame = delayIterations
                    let endframe = delayIterations + rangeIterations
                    let difference = to - from
                    let step = (difference / rangeIterations).toFixed(6)

                    let frame = this.props.generator.currentIteration % rangeIterations
                    let finalFrame = rangeIterations - frame * 100
                    console.log(frame)

                    if(this.props.generator.currentIteration < endframe) {
                        return shape[key] + step * (this.props.generator.currentIteration - delayIterations)
                    } else {
                        if(param.rangeBehavior == "loop") {
                            return shape[key] + step * (rangeIterations - frame)
                        } if(param.rangeBehavior == "single") {
                            return shape[key] + step * (rangeIterations)
                        }
                        // if(this.props.generator.currentIteration % rangeIterations) {
                        //     return shape[key] + step * finalFrame
                        // } else {
                        //     return shape[key] - step * finalFrame
                        // }
                        
                    }


                }
            } else {
                return shape[key]
            }
            
        } else {
            return shape[key]
        }
    }

    generateIteration = () => {
        // console.log(this.props.shape.currentShape.defaultViz.shape, iteration)
        // console.log(this.props.generator.details)

        let parameterOptions = [
            {
                value: "math",
                label: "Math"
            },
            {
                value: "frequency",
                label: "Frequency"
            },
            {
                value: "step",
                label: "Step"
            },
            {
                value: "rotateSpeed",
                label: "Rotation"
            },
            {
                value: "boldRate",
                label: "Boldness"
            },
            {
                value: "friction",
                label: "Friction"
            },
            {
                value: "pointRotateSpeed",
                label: "Point rotation speed"
            },
        ]

        let shape = this.props.shape.currentShape.defaultViz.shape

        let newShape = {
            ...shape,
            step: this.generateParameter(shape, "step"),
            frequency: this.generateParameter(shape, "frequency"),
            rotateSpeed: this.generateParameter(shape, "rotateSpeed"),
            boldRate: this.generateParameter(shape, "boldRate"),
            friction: this.generateParameter(shape, "friction"),
            pointRotateSpeed: this.generateParameter(shape, "pointRotateSpeed"),
        }

        this.props.loadNewShape({
            ...this.props.shape.currentShape,
            defaultViz: {
                ...this.props.shape.currentShape.defaultViz,
                shape: newShape
            }
        })

        // console.log(newShape)
    }

    saveIteration() {
        let shape

        if (this.props.shape.newShape && this.props.shape.newShape.defaultViz) {
            shape = this.props.shape.newShape
        } else {
            shape = this.props.shape.currentShape
        }

        this.props.createShape(shape, (shapeData) => {
            let nft = this.props.nft.newNFT



            this.props.searchNFTs(
                "",
                "",
                0,
                1,
                {},
                data => {
                    console.log(data)

                    let newNFT = {
                        ...nft,
                        metadata: {
                            ...nft.metadata,
                            owner: "",
                            minted: false,
                            featured: false,
                            featuredOrder: 0,
                            createdAt: new Date(),
                            shapeId: shapeData._id
                        },
                        nft: {
                            ...nft.nft,
                            name: "#" + data.count
                        }
                    }

                    this.props.createNFT(newNFT, (nft) => {
                        // this.props.history.push("/nft?id=" + nft._id);
                        this.showToast("Created " + nft.nft.name)
                    })
                }
            );


        })
    }

    showToast = (message) => {
        this.refs.toaster.show({
            message: message,
            intent: Intent.SUCCESS
        });
    };

    render() {
        if (this.props.generator && this.props.generator.details && !this.props.app.menuOpen) {

            let icon

            if (this.props.generator.status == "play") {
                icon = "pause"
            } else {
                icon = "play"
            }

            return (
                <div
                    className={classNames({
                        "generator": true,
                        "demo": this.props.app.demoMode
                    })}>
                    <div className="generator-left">
                        <SmallButton
                            title={this.props.generator.details.title}
                            iconName="edit"
                            onClick={() => {
                                this.props.pauseGenerator()
                                clearInterval(this.state.timeInterval)
                                if (this.props.app.drawerType == "generation") {
                                    this.props.hideDrawer()
                                } else {
                                    this.props.showDrawer("generation")
                                }
                            }
                            }
                        />

                        <SmallButton
                            iconName="arrow-left"
                            onClick={() => {
                                this.props.prevIteration()
                                // this.generateIteration()
                            }}
                        />

                        <SmallButton
                            title={this.props.generator.currentIteration}
                            iterationCount={true}
                            onClick={() => this.props.showDrawer("iterations")}
                        />

                        <SmallButton
                            iconName="arrow-right"
                            onClick={() => {
                                this.props.nextIteration()
                                // this.generateIteration()
                            }}
                        />

                        <SmallButton
                            iconName={icon}
                            onClick={() => this.togglePlay()}
                        />

                        <SmallButton
                            iconName="stop"
                            onClick={() => {
                                this.props.stopGenerator()
                                clearInterval(this.state.timeInterval)
                            }}
                        />

                        <SmallButton
                            iconName="record"
                            record={this.props.generator.record}
                            onClick={() => this.toggleRecord()}
                        />


                    </div>
                    <div className="generator-right">
                        <SmallButton
                            iconName="media"
                            onClick={() => alert("image")}
                        />
                        <SmallButton
                            iconName="plus"
                            onClick={() => this.saveIteration()}
                        />
                    </div>

                    <Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                </div>

            )
        } else {
            return (<div></div>)
        }


    }
}

// onClick={() => this.props.showDrawer("connect-wallet")}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        app: state.app,
        generator: state.generator,
        shape: state.shape,
        nft: state.activeNFT
    };
}

export default connect(mapStateToProps, {
    showDrawer,
    searchGenerators,
    loadGeneratorToState,
    startRecord,
    stopRecord,
    pauseGenerator,
    playGenerator,
    stopGenerator,
    nextIteration,
    prevIteration,
    updateIteration,
    loadNewShape,
    hideDrawer,
    createShape,
    createNFT,
    searchNFTs,
    loadCollection,
    loadGenerator
})(withRouter(Generator));
