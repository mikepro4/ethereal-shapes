import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import {
    updateCollection,
    hideDrawer,
    updateCollectionItem,
    updateQueryString
} from "../../../../redux/actions/appActions"

import CollectionActionsForm from "./collection_actions_form"

import {
    updateNFTCollection
} from "../../../../redux/actions/nftActions"

import {
    nftAddress
} from "../../../../../../config"


class CollectionActions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    handleFormSubmit = (data) => {
        console.log(data)

        let collectionId = this.getQueryParams().id
        let nftId = data.nftId

        this.props.updateNFTCollection(nftId, collectionId, (data) => {
            console.log(data)
            this.props.hideDrawer()
            this.props.updateCollection(true)
        })
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer theme-" + this.props.theme}>

                <div className="drawer-header">
                   <div className="drawer-title">
                        Collection actions
                   </div>
                </div>

                <div className="test" onClick={() => {
                    this.props.updateQueryString({approved: true}, this.props.location, this.props.history)
                    this.props.updateCollection(true)
                }}>
                    update to Approved
                </div>

                <CollectionActionsForm 
                    enableReinitialize="true"
                    loading={this.state.loading}
                    onSubmit={this.handleFormSubmit.bind(this)}
                />
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        app: state.app,
        collection: state.collection
	};
}

export default withRouter(connect(mapStateToProps, {
    updateCollection,
    hideDrawer,
    updateNFTCollection,
    updateCollectionItem,
    updateQueryString
})(CollectionActions));
