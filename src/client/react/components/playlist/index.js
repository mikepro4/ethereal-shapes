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
        shapes: [],
        list: []
    }

    componentDidMount = () => {
        this.props.getMultiple(this.props.playlist.list, (data) => {
            this.setState({
                shapes: data.shapes,
                list: data.nfts,
                active: data.nfts[0]._id
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

    getDefaultViz = () => {
        let nft = this.getNft()
        if(nft) {
            let filteredShapes = _.filter(this.state.shapes, { _id: nft.metadata.shapeId})
            // console.log(filteredShapes)
            return filteredShapes[0].defaultViz
        } else {
            return null
        }
       
    }

    getNftById = (id) => {
        let filteredNfts = _.filter(this.state.list, { _id: id})
        return filteredNfts[0]
    }

    renderPlaylistControls = () => {
        return(
            <div className="playlist-controls-container">

                {this.props.playlist.list.map((nft) => {
                    return(<div onClick={() => this.setActive(nft)}>
                        {this.getNftById(nft)&& this.getNftById(nft).nft.name}
                    </div>)
                })}

            </div>
        )
    }

    render() {

        return (
            <div className="nft-playlist-container">

                <View 
                    item={this.getNft()}
                    defaultViz={this.getDefaultViz()}
                />

                {this.renderPlaylistControls()}
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
