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

import { loadShape } from "../../../../redux/actions/shapeActions"

import Viz from "../../viz"

import NFTDetails from "../../nft_details"

class nftView extends Component {


    constructor (props) {
        super(props)

        this.state = {
            shape: {}
        }

        this.nftView =  this.nftView = React.createRef();
    }

    componentDidMount = () => {
        this.props.loadShape(this.props.item.metadata.shapeId, true, (data) => {
            this.setState({
                shape: data
            })
        })
    }

    renderNftDetails() {
        let nft = _.filter(this.props.marketTokens, { image: this.props.item.nft.fileUrl})
        if(nft[0]) {
            let owner = nft[0].owner.toLowerCase() == this.props.app.account.address.toLowerCase()
            let seller = nft[0].seller.toLowerCase() == this.props.app.account.address.toString()

            if(this.props.item.metadata.owner && this.props.item.metadata.owner !== this.props.app.account.address.toLowerCase()) {
                return(<div>
                    sold
                </div>)
            } else {
                return(
                    <div>
                        <div>{owner ?  "Own": "Don't own"}</div>
                        {!owner &&<button onClick={() => this.props.buyNFT(this.props.item.nft.fileUrl, this.props.item)}>
                            Buy
                        </button>}
                    </div>
                )
            }
            
        } else {
            return <div></div>
        }

        
    }
    render() {
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
                        {/* <img src={this.props.item.nft.fileUrl}/> */}
                        {this.state.shape && this.state.shape.defaultViz && <Viz defaultViz={ this.state.shape.defaultViz } pointCount={600}  /> }

                        <NFTDetails item={this.props.item} more={false}/>

                </div>

               
            </div>
        )
        
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
    loadShape
})(nftView));
