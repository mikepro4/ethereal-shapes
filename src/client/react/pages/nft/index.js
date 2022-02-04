import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import keydown from "react-keydown";
import moment from "moment"
import update from "immutability-helper";

import qs from "qs";
import * as _ from "lodash"

import Viz from "../../components/viz"

import SettingsIcon from "../../components/icons/settings"

import {
    showDrawer
} from '../../../redux/actions/appActions'

import Timeline from "../../components/player/Timeline"

import NFTDetails from "../../../react/components/nft_details"


class NFTPage extends Component {

    state = {
        touched: false,
        timeInterval: null,
        time: 0,
        originalBoldRate: null,
        activeZone: null,
        startedIntervals: [],
        mathValues: ["sin", "cos", "tan", "atan", "log"]
	}

	componentDidMount() {
        if (this.props.location.search) {
            console.log("here")
            console.log(this.getQueryParams().id)
            // this.props.loadNft(this.getQueryParams().id, (data) => {
            //     console.log(data)
            // })
        } else {

        }
    }
    
	componentDidUpdate(prevprops) {
        
    }

    componentWillUnmount() {
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
    
    renderHead = () => (
		<Helmet>
			<title>Design, Tech & Techno</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

	render() {
        
		return (
     		<div className="route-content nft-route">
                {this.renderHead()}

                <div className="nft-details-container">
                    <NFTDetails item={
                        {
                            nft: {
                                price: 2.22,
                                name: "Ethereal" 
                            }
                        }
                    } large={true} />
                </div>

                <div 
                    className="main-shape" 
                >
                    <Viz shapeId="61fc4d5c9c7c440021028b5b" pointCount={1024}/>
                    
                </div>

                <div className="nft-player-container">
                    <Timeline duration={1000}/>
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
        showDrawer
	})(NFTPage))
}