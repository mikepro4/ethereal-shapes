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
    loadCollectionToState
} from "../../../redux/actions/collectionActions"


class Collection extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    componentDidMount() {
        this.props.loadCollection(this.getQueryParams().id, (data) => {
            this.props.loadCollectionToState(data)
        })
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
                    {this.state.count > 0 && <div className="main-page-subtitle">{this.state.count} items</div>}
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
                        collectionId: this.getQueryParams().id
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
        loadNFTDetails
    })(Collection))
}