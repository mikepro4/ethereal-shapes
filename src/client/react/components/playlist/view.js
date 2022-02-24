import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";
import * as _ from "lodash"

import {
    loadShape
} from '../../../redux/actions/shapeActions'

import Viz from "../viz"

class View extends Component {

    componentDidMount = () => {

    }

    componentDidUpdate = (prevprops) => {

    }

    render() {
        return (
            <div className="nft-playlist-view">
                {this.props.defaultViz ? <Viz defaultViz={ this.props.defaultViz } playlist={true} lessBlur={true} paused={this.props.paused} fullScreen={true} presentation={true}  nftId={this.props.item._id}  />  : " "}
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
    loadShape
})(withRouter(View));
