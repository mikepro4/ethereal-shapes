import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
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

class NFTSettings extends Component {

    
    

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    
        this.debouncedOnChange = _.debounce(this.handleFormSubmit, 1000);
    }
    

    handleFormSubmit(data) {
        console.log(data)

        this.props.loadNewNFT(data)

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


	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer nft-settings-drawer theme-" + this.props.theme}>
                
                <div className={"details-container theme-" + this.props.theme}>
                    {/* <div className="drawer-header">
                        Title: {this.props.nft.metadata.title}
                    </div> */}

                    <NFTSettingsForm 
                        enableReinitialize="true"
                        initialValues={
                            this.props.nft.newNFT
                        }
                        loading={this.state.loading}
                        onSubmit={this.handleFormSubmit.bind(this)}
                        theme={this.props.theme}
                        onChange={this.debouncedOnChange.bind(this)}
                    />

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
        nft: state.activeNFT,
	};
}

export default withRouter(connect(mapStateToProps, {
    updateNFT,
    loadNFT,
    createNFT,
    deleteNFT,
    loadNewNFT
})(NFTSettings));
