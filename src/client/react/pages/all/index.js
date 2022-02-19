import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import { 
    setDraft,
    setApproved,
    setRejected,
    setSold
} from "../../../redux/actions/appActions"
import { searchNFTs, loadNFTDetails} from "../../../redux/actions/nftActions"

import ListResults  from "../../components/list"
import NavLinks  from "../../components/navLinks"

import { checkUser } from "../../../utils/checkUser"

class Home extends Component {

    state = {
    }

    componentDidMount = () => {
        checkUser(this.props.app.user, this.props.history)
    //     if(this.getQueryParams().draft == "true") {
    //         this.props.setDraft(true)
    //     }

    //     if(this.getQueryParams().approved == "true") {
    //         this.props.setApproved(true)
    //     }

    //     if(this.getQueryParams().rejected == "true") {
    //         this.props.setRejected(true)
    //     }

    //     if(this.getQueryParams().sold == "true") {
    //         this.props.setSold(true)
    //     }
    }

    // componentWillUnmount() {
    //     this.props.setSold(false)
    //     this.props.setRejected(false)
    //     this.props.setApproved(false)
    //     this.props.setDraft(false)
    // }

    renderHead = () => (
		<Helmet>
			<title>All NFTs | Ethereal Shapes</title>
		</Helmet>
    )

    getOpacity() {
        if(this.props.app.totalScrolledPixels < 500) {
            return 100 - this.props.app.totalScrolledPixels/1.5
        }
        else {
            return 0
        }
    }

    // componentWillMount()  {
        // if(this.getQueryParams().draft == "true") {
        //     this.props.setDraft(true)
        // }
    // }

    // componentWillUnmount() {
    //     this.props.setDraft(false)
    // }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

	render() {

		return (
     		<div className="nft-container">
                {this.renderHead()}
                <div className="mobile-tabs" style={{opacity: this.getOpacity() + "%"}}>
                    {this.props.app.totalScrolledPixels < 222 && <NavLinks linksType="mobileTabs" hideMenu={() => {}}/> }
                </div>
                
                <div className="nft-grid">
                    <ListResults
                        type="recent_nfts"
                        resultType="nft"
                        searchCollection={this.props.searchNFTs}
                        updateTotal={(count) => {
                            this.setState({
                                count: count
                            })
                        }}
                        updateCollectionItem={this.props.loadNFTDetails}
                        handleClick={() => this.props.handleClick()}
                    />
                </div>
                
            </div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
        app: state.app
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
        searchNFTs,
        loadNFTDetails,
        setDraft,
        setApproved,
        setRejected,
        setSold
	})(Home))
}