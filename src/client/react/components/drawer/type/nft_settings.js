import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import * as _ from "lodash"

// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"


import {
    updateNFT,
    loadNFT,
    createNFT,
    deleteNFT,
    loadNewNFT
} from "../../../../redux/actions/nftActions"

import NFTSettingsForm from "./nft_settings_form"

import {
    hideDrawer,
    updateCollectionItem,
    updateQueryString
} from "../../../../redux/actions/appActions"

import {
    loadShape,
    loadNewShape
} from "../../../../redux/actions/shapeActions"


import Polygon from "../../icons/polygon"

import qs from "qs";

import {CopyToClipboard} from 'react-copy-to-clipboard';

class NFTSettings extends Component {

    
    

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    
        this.debouncedOnChange = _.debounce(this.handleFormSubmit, 1000);
        this.imagePreview = this.imagePreview = React.createRef()
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
    handleFormSubmit(data) {
 
        // if(this.getQueryParams().id) {
        //     this.props.updateNFT(this.props.nft.newNFT, data, () => {
        //         this.props.loadNewNFT(data)
        //         if(data.metadata.shapeId !== this.props.nft.newNFT.metadata.shapeId) {
        //             this.props.loadShape(data.metadata.shapeId, false, (data) => {
        //                 console.log(data)
        //                 this.props.loadNewShape(data)
        //             })
        //         }
        //     })

        // } else {
        //     console.log(data)
        //     this.props.loadNewNFT(data)
        //     if(data.metadata.shapeId !== this.props.nft.newNFT.metadata.shapeId) {
        //         this.props.loadShape(data.metadata.shapeId, false, (data) => {
        //             console.log(data)
        //             this.props.loadNewShape(data)
        //         })
        //     }
        // }
        // if(this.getQueryParams().id || this.props.match.params.tokenId) {
            this.props.updateNFT(this.props.drawerData, data, () => {
                this.props.loadNewNFT(data)
                this.props.updateCollectionItem(this.props.drawerData)

                if(data.metadata.shapeId !== this.props.nft.newNFT.metadata.shapeId) {
                        this.props.loadShape(data.metadata.shapeId, false, (data) => {
                            console.log(data)
                            this.props.loadNewShape(data)
                        })
                    }
            })
    
            this.props.hideDrawer()
        // } else {
        //     if(data.metadata.shapeId !== this.props.nft.newNFT.metadata.shapeId) {
        //         this.props.loadShape(data.metadata.shapeId, false, (data) => {
        //             console.log(data)
        //             this.props.loadNewShape(data)
        //         })
        //     }
        //     this.props.loadNewNFT(data)
        //     this.props.hideDrawer()
        // }
       

       


       

        // this.setState({
		// 	loading: true
        // })

        // this.props.updateNFT(this.props.nft, data, () => {
        //     // this.props.hideDrawer()
        //     this.setState({
        //         loading: false
        //     })

        //     this.props.loadNFT(this.getQueryParams().nft, (data) => {
        //         console.log(data)
        //     })
        // })
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    launchImageEditor = () => {
        this.props.updateQueryString(
			{ imageEditor: true },
			this.props.location,
			this.props.history
        );
        this.props.hideDrawer()

        // var canvas = document.getElementById("viz");
        // var dataURL = canvas.toDataURL("image/png");
        // var newTab = window.open('about:blank','image from canvas');
        // newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
        // console.log(dataURL)
    }

    renderImagePreviewAdmin = () => {

        let nft = this.props.drawerData

        if(nft.nft.fileUrl) {
            return(
                <div className="nft-image-wrapper">
                    <div className="nft-image-header">
                        <div className="nft-image-left">
                            Main image
                        </div>

                        <div className="nft-image-right">
                            <div className="update-image" onClick={() => this.launchImageEditor()}>Update</div>
                        </div>
                        
                    </div>
                    <div className="nft-image-preview">
                        <img src={nft.nft.fileUrl}></img>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="nft-image-preview" onClick={() => this.launchImageEditor()}>Create Image</div>
            )
        }
        
    }

    renderStatus() {
        let nft = this.props.drawerData
        if(nft.metadata.minted) {
            if(nft.metadata.owner) {
                let myNft
                let filteredTokens = _.filter(this.props.app.marketTokens, {
                    image: nft.nft.fileUrl
                })
                console.log(filteredTokens[0])
    
                if(filteredTokens[0]) {
                    if(filteredTokens[0].owner.toLowerCase() == this.props.app.account.address.toLowerCase() && filteredTokens[0].owner !== "0x0000000000000000000000000000000000000000") {
                        return(<div className="status owned">Owned by You</div>)
                    } 
                } else{
                    if(nft.metadata.owner){
                        return (<div className="status grey">Sold</div>)
                    }
                }
            } else {
                return(<div className="status green">On Sale</div>)
            }
        } else {
            return(<div className="status draft">Draft</div>)
        }
        
    }

    renderImagePreview = () => {
        let container
        let nft = this.props.drawerData
        let height

        if(this.props.app.clientWidth < 1000) {
           height = this.props.app.clientWidth - 40
        } else {
            height = 560
        }

        return(
            <div className="nft-main-image" style={{height: height + "px"}}>
                <img src={nft.nft.fileUrl}></img>
            </div>
        )
    }

    renderContent() {
        if(!this.props.user) {

            let url = "https://www.etherealshapes.com/" + this.props.drawerData.metadata.tokenId
            return(
                <div className="nft-info-container">

                    <div className="nft-info-header">
                        <div className="nft-info-header-left">
                            <span className="nft-info-title">NFT</span>
                            <span className="nft-info-tokenid">#{this.props.drawerData.metadata.tokenId}</span>
                        </div>
                        <div className="nft-info-header-right">
                            <div className="nft-status">
                                {this.renderStatus()}
                            </div>
                        </div>
                    </div>

                    <div className="nft-info-image-preview" >
                        {this.renderImagePreview()}
                    </div>

                    <div className="nft-info-details-container">

                        <div className="nft-info-name">
                            <div className="nft-info-label">Name</div>
                            <div className="nft-info-value">{this.props.drawerData.nft.name}</div>
                        </div>

                        <div className="nft-info-price-container">
                            <div className="nft-info-label">Price</div>
                            <div className="nft-info-value">
                                <span className="nft-info-polygon">
                                    <Polygon/>
                                </span>

                                <span className="nft-info-price">
                                    {this.props.drawerData.nft.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="nft-url-container">
                        <div className="nft-info-label">NFT URL</div>
                        <div className="nft-url">
                            <a href={url} target="_blank">etherealshapes.com/{this.props.drawerData.metadata.tokenId}</a>
                            <CopyToClipboard text={url} 
                                onCopy={() => this.setState({copied: true})}>
                                <div className="copy-url">
                                    COPY
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>

                    

                </div>
            )
        } else {
            return( <div className={"details-container theme-" + this.props.theme}>
            {/* <div className="drawer-header">
                Title: {this.props.nft.metadata.title}
            </div> */}

            {this.renderImagePreviewAdmin()}
            {this.props.nft.newNFT && this.props.nft.newNFT.metadata && this.props.nft.newNFT.metadata.tokenId && <div className="short-url">
                <a href={"https://www.etherealshapes.com/" + this.props.nft.newNFT.metadata.tokenId} target="_blank">https://www.etherealshapes.com/{this.props.nft.newNFT.metadata.tokenId}</a>
            </div>}
            
            
            <NFTSettingsForm 
                enableReinitialize="true"
                initialValues={
                    this.props.drawerData
                }
                loading={this.state.loading}
                onSubmit={this.handleFormSubmit.bind(this)}
                theme={this.props.theme}
                // onChange={this.debouncedOnChange.bind(this)}
            />

        </div>)
        }
    }


	render() {
       
        return (
            <div className={"app-drawer-content-container standard-drawer nft-settings-drawer theme-" + this.props.theme} ref={this.imagePreview}>
                {this.renderContent()}
            </div>

        )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        nft: state.activeNFT,
        drawerData: state.app.drawerData,
        app: state.app
	};
}

export default withRouter(connect(mapStateToProps, {
    updateNFT,
    loadNFT,
    createNFT,
    deleteNFT,
    loadNewNFT,
    hideDrawer,
    loadShape,
    loadNewShape,
    updateCollectionItem,
    updateQueryString
})(NFTSettings));
