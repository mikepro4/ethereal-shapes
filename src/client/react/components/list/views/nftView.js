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

class nftView extends Component {

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
        return(
            <div className="nft-view" >
               <Link 
                    to={"/?word=" + this.props.item._id}
                    className={classNames({
                        "nft-title": true,
                        "active": false
                    })}
                >
                   <img src={this.props.item.nft.fileUrl}/>
                   {this.props.item.nft.name}
                  
               </Link>
               {/* <div className= onClick={() => this.props.deleteWord(this.props.item._id, this.props.item, () => {
                        this.props.updateCollection(true)
                   })}>Delete</div> */}
                {this.renderNftDetails()}
               
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
    updateCollection
})(nftView));
