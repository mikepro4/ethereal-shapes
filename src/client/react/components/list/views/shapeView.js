import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import { 
    updateCollection
} from "../../../../redux/actions/appActions"

import { 
    buyNFT
} from "../../../../redux/actions/nftActions"


import { showDrawer } from "../../../../redux/actions/appActions"

import { loadShape, updateShapeHidden } from "../../../../redux/actions/shapeActions"

import Viz from "../../viz"

import NFTDetails from "../../nft_details"

class nftView extends Component {


    constructor (props) {
        super(props)

        this.state = {
            shape: {}
        }

        this.nftView = this.nftView = React.createRef()
        
    }

    componentDidMount = () => {
        
    }

    hideShape = () => {
        this.props.updateShapeHidden(this.props.item._id, () => {
            this.props.updateCollection(true)
        })
    }

    render() {
        if(!this.props.item.metadata.hidden) {
            let height = 0

            if(this.nftView && this.nftView.current) {
                height = this.nftView.current.clientWidth
            }
    
            return(
                <div className="nft-view" ref={this.nftView} >
                    {/* <Link 
                        to={"/?word=" + this.props.item._id}
                        className={classNames({
                            "nft-title": true,
                            "active": false
                        })}
                    >
                        
                        
                        
                    </Link> */}
                    {/* <div className= onClick={() => this.props.deleteWord(this.props.item._id, this.props.item, () => {
                            this.props.updateCollection(true)
                        })}>Delete</div> */}
                    {/* {this.renderNftDetails()} */}
    
                    <div className="nft-media-container" style={{height: height + 150 + "px"}}>
                            <a href={"https://www.mikhail.co/?shape=" + this.props.item._id} target="_blank" className="nft-click-area">
                                
                            </a>
                            {/* <img src={this.props.item.nft.fileUrl}/> */}
                            {height && <Viz defaultViz={ this.props.item.defaultViz } pointCount={1000} nftId={this.props.item._id}  /> }
    
    
                        <div className="shape-hide">
                            <Button
                                className={"create-button main-button"}
                                text="Hide"
                                large="true"
                                onClick={() => this.hideShape()}
                            />
                        </div>
    
                        <div className="create-nft">
                            <Button
                                className={"create-button main-button"}
                                text="Create"
                                large="true"
                            />
                        </div>
                    </div>
    
                    
                </div>
            )
        } else {
            return (<div></div>)
        }
        

        
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        clientWidth: state.app.clientWidth,
        marketTokens: state.app.marketTokens,
        app: state.app
    };
}

export default withRouter(connect(mapStateToProps, {
    buyNFT,
    updateCollection,
    showDrawer,
    loadShape,
    updateShapeHidden,
})(nftView));
