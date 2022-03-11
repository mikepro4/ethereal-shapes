import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { showDrawer } from "../../../redux/actions/appActions"
import { 
    searchGenerators, 
    loadGeneratorToState,
    startRecord,
    stopRecord,
    pauseGenerator,
    playGenerator,
    stopGenerator,
    nextIteration,
    prevIteration
} from "../../../redux/actions/generatorActions"

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
        } else {
            this.props.playGenerator()
        }
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
                <div className="generator">
                    <div className="generator-left">
                        <SmallButton
                            title={this.props.generator.details.title}
                            iconName="edit"
                            onClick={() => this.props.showDrawer("generation")}
                        />
    
                        <SmallButton
                            iconName="arrow-left"
                            onClick={() => this.props.prevIteration()}
                        />
    
                        <SmallButton
                            title={this.props.generator.currentIteration}
                            iterationCount={true}
                            onClick={() => alert("iterations")}
                        />
    
                        <SmallButton
                            iconName="arrow-right"
                            onClick={() => this.props.nextIteration()}
                        />
    
                        <SmallButton
                            iconName={icon}
                            onClick={() => this.togglePlay()}
                        />
    
                        <SmallButton
                            iconName="stop"
                            onClick={() => this.props.stopGenerator()}
                        />

                        <SmallButton
                            iconName="record"
                            record={this.props.generator.record}
                            onClick={() => this.toggleRecord()}
                        />
    
                        
                    </div>
                    <div className="generator-right">
                        <SmallButton
                            iconName="cross"
                            onClick={() => alert("exit")}
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
        demoMode: false,
        app: state.app,
        generator: state.generator
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
    prevIteration
})(withRouter(Generator));
