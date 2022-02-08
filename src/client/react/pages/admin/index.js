import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

import { searchNFTs, loadNFTDetails, resetNFTs } from "../../../redux/actions/nftActions"

import ListResults from "../../components/list"
import NavLinks from "../../components/navLinks"

// import * as THREE from "three";


class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {}

    }

    componentDidMount() {
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
                    <button onClick={() => this.props.resetNFTs()}>
                        Reset
                    </button>
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
        resetNFTs
    })(Home))
}