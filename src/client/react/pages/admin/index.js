import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import { getMarketStats } from "../../../redux/actions/appActions"
import { searchNFTs, loadNFTDetails, resetNFTs } from "../../../redux/actions/nftActions"

import ListResults from "../../components/list"
import NavLinks from "../../components/navLinks"

// import * as THREE from "three";


class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {
            stats: {}
        }

    }

    componentDidMount() {
        this.props.getMarketStats((data) => {
            console.log(data)
            this.setState({
                stats: data
            })
        })
    }
     

    renderHead = () => (
        <Helmet>
            <title>Home</title>
        </Helmet>
    )

    // componentWillUnmount = () => {
    // 	window.removeEventListener("resize", this.handleResize);
    //     window.cancelAnimationFrame(this.state.requestAnimationFrame);
    //     clearInterval(this.state.timeInterval);
    // }

    // handleResize = () => {
    //     this.updateDimensions()
    // }

    getOpacity() {
        if (this.props.app.totalScrolledPixels < 500) {
            return 100 - this.props.app.totalScrolledPixels / 1.5
        }
        else {
            return 0
        }
    }

    render() {

        return (
            <div className="about-container">
                <div className="admin">
                    {/* <button onClick={() => this.props.resetNFTs()}>
                        Reset
                    </button> */}
                    {this.state.stats &&  <ul className="admin-stats">
                        <li className="single-stat">
                            <a href="/all?approved=true">
                                {this.state.stats.approved} approved
                            </a>
                        </li>
                        <li className="single-stat">
                            <a href="/all?rejected=true">
                                {this.state.stats.rejected} rejected
                            </a>
                        </li>
                        <li className="single-stat">
                            <a href="/all?draft=true">
                                {this.state.stats.draft} draft
                            </a>
                        </li>
                        <li className="single-stat">
                            <a href="/">
                                {this.state.stats.featured} featured
                            </a>
                        </li>
                        <li className="single-stat">
                            <a href="/all?sold=true">
                                {this.state.stats.sold} sold
                            </a>
                        </li>
                        <li className="single-stat">
                            <a href="/sale">
                                {this.state.stats.minted} minted
                            </a>
                        </li>
                    </ul>}


                    <a href="/review" className="review-nfts">Review NFT</a>
                   


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
        resetNFTs,
        getMarketStats
    })(Home))
}