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

import qs from "qs";

class NFTSettings extends Component {

    
    

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    
        this.debouncedOnChange = _.debounce(this.handleFormSubmit, 1000);
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

    renderImagePreview = () => {

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

    renderContent() {
        if(!this.props.user) {
            return(<div>Static</div>)
        } else {
            return( <div className={"details-container theme-" + this.props.theme}>
            {/* <div className="drawer-header">
                Title: {this.props.nft.metadata.title}
            </div> */}

            {this.renderImagePreview()}
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
            <div className={"app-drawer-content-container standard-drawer nft-settings-drawer theme-" + this.props.theme}>
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
        drawerData: state.app.drawerData
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
