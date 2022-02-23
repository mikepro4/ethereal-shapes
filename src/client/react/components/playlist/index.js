import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";
import * as _ from "lodash"

import {
    getMultiple
} from '../../../redux/actions/nftActions'

import View from "./view"

class Playlist extends Component {

    state = {
        active: null,
        list: []
    }

    componentDidMount = () => {
        this.props.getMultiple(this.props.playlist.list, (data) => {
            console.log(data.results)
            this.setState({
                list: data.results,
                active: data.results[0]._id
            })


        })
    }

    setActive = (id) => {
        this.setState({
            active: id
        })
    }

    getNft = () => {
        let filteredNfts = _.filter(this.state.list, { _id: this.state.active})
        return filteredNfts[0]
    }

    render() {

        return (
            <div className="nft-playlist-container">
                Playlist

                Nft Id: {this.state.active ? this.state.active : "no"}

                <View item={this.getNft()}/>
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
    getMultiple
})(withRouter(Playlist));
