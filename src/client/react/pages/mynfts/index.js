import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import { searchNFTs, loadNFTDetails} from "../../../redux/actions/nftActions"

import ListResults  from "../../components/list"
import NavLinks  from "../../components/navLinks"

class Home extends Component {

    state = {
    }

    renderHead = () => (
		<Helmet>
			<title>Home</title>
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

	render() {

		return (
     		<div className="nft-container">
                {this.renderHead()}
                
                
                <div className="nft-grid">
                    <ListResults
                        type="my-nfts"
                        resultType="nft-verified"
                        identifier={this.props.app.account.address}
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
        loadNFTDetails
	})(Home))
}