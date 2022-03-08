import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import {
    updateCollectionItem,
    hideDrawer
} from "../../../../redux/actions/appActions"

import {
    updateCollectionDetails
} from "../../../../redux/actions/collectionActions"

import EditCollectionForm from "./edit_collection_form"


class DeleteCollection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.debouncedOnChange = _.debounce(this.handleFormSubmit, 1000);
    }

    handleFormSubmit = (data) => {
        this.setState({
			loading: true
        })

        this.props.updateCollectionDetails({
            _id: this.props.app.drawerData._id,
            metadata: data
        }, () => {
            this.props.updateCollectionItem( this.props.app.drawerData)
            this.props.hideDrawer()

            this.setState({
                loading: false
            })
        })
    }

	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer connect-wallet theme-" + this.props.theme}>
                <EditCollectionForm 
                    enableReinitialize="true"
                    initialValues={
                        this.props.app.drawerData.metadata
                    }
                    loading={this.state.loading}
                    onSubmit={this.handleFormSubmit.bind(this)}
                />

            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        app: state.app
	};
}

export default withRouter(connect(mapStateToProps, {
    updateCollectionDetails,
    updateCollectionItem,
    hideDrawer
})(DeleteCollection));
