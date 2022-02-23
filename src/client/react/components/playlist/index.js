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
        paused: false,
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

        const timeInterval = setInterval(() => {
            this.setNextActive()
        }, 
            this.props.playlist.seconds * 1000 
        )

        this.setState({timeInterval})
        
    }

    setNextActive = () => {
        if(!this.state.paused) {
            let index = _.indexOf(this.props.playlist.list, this.state.active, 0)
            let listLength = (this.props.playlist.list.length)
    
            if(index + 1 > listLength - 1) {
                this.setState({
                    active: this.props.playlist.list[0]
                })
            } else {
                this.setState({
                    active: this.props.playlist.list[index + 1]
                })
            }
        }
    }

    setActive = (id) => {
        clearInterval(this.state.timeInterval);

        const timeInterval = setInterval(() => {
            this.setNextActive()
        }, 
            this.props.playlist.seconds * 1000 
        )

        this.setState({
            active: id,
            paused: false,
            timeInterval
        })
    }

    getNft = () => {
        let filteredNfts = _.filter(this.state.list, { _id: this.state.active })
        return filteredNfts[0]
    }

    getDefaultViz = () => {
        let nft = this.getNft()
        if (nft) {
            let filteredShapes = _.filter(this.state.shapes, { _id: nft.metadata.shapeId })
            // console.log(filteredShapes)
            return filteredShapes[0].defaultViz
        } else {
            return null
        }

    }

    getNftById = (id) => {
        let filteredNfts = _.filter(this.state.list, { _id: id })
        return filteredNfts[0]
    }

    renderPlayIcon = (nft) => {
        if (nft._id == this.state.active) {
            return (<div className="single-player-control-content" onClick={() => {
                if (this.state.paused) {
                    this.setState({
                        paused: false
                    })
                } else {
                    this.setState({
                        paused: true
                    })
                }
            }}><div
                className="play-control play-control-active"
            >
                    {this.state.paused ? <Icon className="play" icon="play" /> : <Icon icon="pause" />}
                </div>
                <div className="player-nft-name">
                    {nft.nft.name}
                </div>
            </div>)
        } else {
            return (<div className="single-player-control-content" onClick={() => this.setActive(nft._id)}><div className="play-control" >
                <Icon className="play" icon="play" />
            </div>
                <div className="player-nft-name">
                    {nft.nft.name}
                </div>
            </div>)
        }
    }

    renderPlayItem = (nft) => {
        return (
            <div
                className={classNames({
                    "single-player-control": true,
                    "active": nft._id == this.state.active
                })}
            >
                {this.renderPlayIcon(nft)}

            </div>
        )
    }

    renderPlaylistControls = () => {
        return (
            <div className="playlist-controls-container">

                {this.props.playlist.list.map((nft) => {
                    return (<div className="single-player-control-container" >
                        {this.getNftById(nft) && this.renderPlayItem(this.getNftById(nft))}
                    </div>)
                })}

            </div>
        )
    }

    render() {

        return (
            <div className="nft-playlist-container">
                <div className="nft-playlist-view-container">
                    <View
                        item={this.getNft()}
                        defaultViz={this.getDefaultViz()}
                        paused={this.state.paused}
                    />

                </div>
                
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
