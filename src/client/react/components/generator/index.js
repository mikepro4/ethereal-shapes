import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { showDrawer } from "../../../redux/actions/appActions"
import { searchGenerators, loadGeneratorToState } from "../../../redux/actions/generatorActions"

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

    render() {
        if(this.props.generator && this.props.generator.details) {
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
                            onClick={() => alert("back")}
                        />
    
                        <SmallButton
                            title="0"
                            iterationCount={true}
                            onClick={() => alert("iterations")}
                        />
    
                        <SmallButton
                            iconName="arrow-right"
                            onClick={() => alert("right")}
                        />
    
                        <SmallButton
                            iconName="play"
                            onClick={() => alert("play")}
                        />
    
                        <SmallButton
                            iconName="stop"
                            onClick={() => alert("stop")}
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
    loadGeneratorToState
})(withRouter(Generator));
