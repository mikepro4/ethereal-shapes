import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { showDrawer } from "../../../redux/actions/appActions"

import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

class SmallButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return(
            <div 
                className={classNames({
                    "small-button": true,
                    "iteration-count": this.props.iterationCount,
                    "record": this.props.record
                })}
                onClick={() => this.props.onClick()}
            >
                {this.props.title && <span className="small-button-title">{this.props.title}</span> }
                {this.props.iconName && <span className="small-button-icon">
                    <Icon icon={this.props.iconName} />
                </span>}
            </div>
            
        )
        
    }
}

// onClick={() => this.props.showDrawer("connect-wallet")}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        demoMode: false,
        app: state.app
    };
}

export default connect(mapStateToProps, {
    showDrawer
})(withRouter(SmallButton));
