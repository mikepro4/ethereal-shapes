import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import ListResults from "../../components/list"

import { 
    showDrawer
} from "../../../redux/actions/appActions"

import {
    searchNFTs,
    loadNFTDetails
} from "../../../redux/actions/nftActions"

import {
    loadCollection,
    loadCollectionToState,
    getCollectionStats
} from "../../../redux/actions/collectionActions"


class Collection extends Component {

    constructor(props) {
        super(props)

        this.state = {
            all: 0,
            approved: 0
        }

    }

    componentDidMount() {
        this.props.loadCollection(this.getQueryParams().id, (data) => {
            this.props.loadCollectionToState(data)
        })

       this.getStats()
    
    }

    getStats = () => {
        this.props.getCollectionStats(this.getQueryParams().id, (data) => {
            this.setState({
                all: data.all,
                approved: data.approved,
            })
        })
    }

    componentDidUpdate(prevprops) {
        if(this.props.app.updateCollectionItem !== prevprops.app.updateCollectionItem && this.props.app.updateCollectionItem) {
            this.getStats()
        }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };


    renderHead = () => (
        <Helmet>
            <title>Collection</title>
        </Helmet>
    )

    render() {

        return (
            <div className="main-container">
                {/* <div className="page-header">
                    <ul className="breadcrumbs">
                        <li>
                            <Link to="/">
                                <Icon icon="home" />
                            </Link>
                        </li>

                        <li>
                            <Icon icon="chevron-right" />
                        </li>

                        <li>
                            <div className="breadcrumb-title active">
                                {this.props.collection.details && this.props.collection.details.metadata.title}
                            </div>
                        </li>

                    </ul>

                    <div className="actions-icon" onClick={() => this.props.showDrawer("collection-actions")}>
                        <Icon icon="settings" />
                    </div>
                </div> */}

                <div className="main-title">
                    <div className="main-page-title">{this.props.collection.details && this.props.collection.details.metadata.title}</div>

                    <div className="collection-stats">
                        <span className="collection-pinned">
                            {this.state.approved}
                        </span>

                        <span className="collection-divider">
                            /
                        </span>

                        <span className="collection-total">
                            {this.state.all}
                        </span>
                    </div>
                </div>

                <ListResults
                    type="collection"
                    resultType="nft"
                    searchCollection={this.props.searchNFTs}
                    updateTotal={(count) => {
                        this.setState({
                            count: count
                        })
                    }}
                    query={{
                        collectionId: this.getQueryParams().id,
                        approved: false
                    }}
                    updateCollectionItem={this.props.loadNFTDetails}
                    handleClick={() => this.props.handleClick()}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        collection: state.collection
    };
}


export default {
    component: withRouter(connect(mapStateToProps, {
        loadCollection, 
        loadCollectionToState,
        showDrawer,
        searchNFTs,
        loadNFTDetails,
        getCollectionStats
    })(Collection))
}