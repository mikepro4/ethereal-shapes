import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import Word from "./word"

import { searchNFTs} from "../../../redux/actions/nftActions"

import ListResults  from "../../components/list"

class Home extends Component {

    state = {
    }

    renderHead = () => (
		<Helmet>
			<title>Home</title>
		</Helmet>
    )

	render() {
		return (
     		<div className="word-container">
                {this.renderHead()}

                <ListResults
                    type="recent_nfts"
                    resultType="nft"
                    searchCollection={this.props.searchNFTs}
                    updateTotal={(count) => {
                        this.setState({
                            count: count
                        })
                    }}
                    handleClick={() => this.props.handleClick()}
                />
            </div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
        searchNFTs
	})(Home))
}