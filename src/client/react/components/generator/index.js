import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { 
    showDrawer,
    hideDrawer
} from "../../../redux/actions/appActions"
import { 
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
    loadNewShape
} from "../../../redux/actions/shapeActions"


import SmallButton from "../smallButton"

class Generator extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        this.props.searchGenerators(
            "",
            "",
            0,
            1,
            {},
            data => {
                console.log(data.all[0])
                this.props.loadGeneratorToState(data.all[0])
            }
        );
    }

    componentDidUpdate = (prevprops) => {
        if(this.props.generator.currentIteration !== prevprops.generator.currentIteration) {
            this.generateIteration()
        }
    }

    toggleRecord = () => {
        if(this.props.generator.record){
            this.props.stopRecord()
        } else {
            this.props.startRecord()
        }
    }

    togglePlay = () => {
        if(this.props.generator.status == "play"){
            this.props.pauseGenerator()
            clearInterval(this.state.timeInterval)
        } else {
            this.props.playGenerator()
            const timeInterval = setInterval(() => {

                let iteration

                if(this.props.generator.currentIteration + 1 < this.props.generator.details.iterations) {
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

    generateParameter = (shape, key) => {
        // console.log(this.props.generator.details.parameters)
        let contains = _.filter(this.props.generator.details.parameters, (parameter) => {
            return ( parameter.changeParameter.value == key )
        })
        if(contains.length > 0) {
            let param = contains[0]

            if(param.stepDirection == "forward") {
                return shape[key] + param.stepAmount * this.props.generator.currentIteration
            } else if(param.stepDirection == "backward") { 
                return shape[key] - param.stepAmount * this.props.generator.currentIteration
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

    render() {
        if(this.props.generator && this.props.generator.details) {

            let icon

            if(this.props.generator.status == "play") {
                icon = "pause"
            } else {
                icon = "play"
            }

            return(
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
                                if(this.props.app.drawerType == "generation") {
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
                            onClick={() => alert("add")}
                        />
                    </div>
                </div>
            ) 
        } else {
            return(<div></div>)
        }
        
        
    }
}

// onClick={() => this.props.showDrawer("connect-wallet")}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        app: state.app,
        generator: state.generator,
        shape: state.shape
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
    hideDrawer
})(withRouter(Generator));
