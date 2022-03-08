import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import ListResults from "../../../react/components/list"

import {
    updateCollection,
    showDrawer
} from "../../../redux/actions/appActions"

import {
    searchCollections,
    loadCollection,
    createCollection
} from "../../../redux/actions/collectionActions"

import {
    nftAddress
} from "../../../../../config"

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: null
        }
    }

    componentDidMount() {
    }


    renderHead = () => (
        <Helmet>
            <title>Home</title>
        </Helmet>
    )

    createCollection = () => {
        let newCollection = {
            metadata: {
                title: "Collection " + (this.state.count + 1),
                createdAt: new Date(),
                contractAddress: nftAddress
            },
        }

        this.props.createCollection(newCollection, (collection) => {
            this.props.updateCollection(true)

        })
    }

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

                        

                    </ul>

                    <div className="actions-icon" onClick={() => this.props.showDrawer("collection-actions")}>
                        <Icon icon="settings" />
                    </div>
                </div> */}

                <ListResults
                    type="collections"
                    resultType="collection"
                    searchCollection={this.props.searchCollections}
                    updateTotal={(count) => {
                        this.setState({
                            count: count
                        })
                    }}
                    updateCollectionItem={this.props.loadCollection}
                    handleClick={() => this.props.handleClick()}
                />

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
        searchCollections,
        loadCollection,
        createCollection,
        updateCollection,
        showDrawer
    })(Home))
}