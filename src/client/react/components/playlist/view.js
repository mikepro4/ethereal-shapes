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

    state = {
        shape: null
    }

    componentDidMount = () => {
        if(this.props.item) {
            // this.props.loadShape(this.props.item.metadata.shapeId, true, (data) => {
            //     this.setState({
            //         shape: data
            //     })
            // })
        }
    }

    componentDidUpdate = (prevprops) => {
        if(!_.isEqual(prevprops.item, this.props.item) && this.props.item) {
            this.props.loadShape(this.props.item.metadata.shapeId, true, (data) => {
                this.setState({
                    shape: data
                })
            })
        }
    }

    render() {

        return (
            <div className="nft-playlist-view">
                {this.state.shape ? <Viz defaultViz={ this.state.shape.defaultViz } lessBlur={true} fullScreen={true} nftId={this.props.item._id}  />  : " No shape"}
                
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
