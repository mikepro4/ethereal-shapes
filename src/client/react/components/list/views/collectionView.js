import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"

import {
    updateCollection,
    showDrawer
} from "../../../../redux/actions/appActions"

import {
    loadCollectionToState,
    deleteCollection,
    getCollectionStats
} from "../../../../redux/actions/collectionActions"

class collectionView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            all: 0,
            approved: 0
        }
    }

    componentDidMount = () => {
        this.props.getCollectionStats(this.props.item._id, (data) => {
            console.log(data)
            this.setState({
                all: data.all,
                approved: data.approved
            })
        })
    }

    deleteCollection = () => {
        this.props.showDrawer("delete-collection", {
            collectionId: this.props.item._id,
            collectionTitle: this.props.item.metadata.title
        })
    }

    editCollection = () => {
        this.props.showDrawer("edit-collection", this.props.item)
    }

    render() {
        return (
            <div className="collection-row">
                <Link to={"/collection?id=" + this.props.item._id} className="row-left" onClick={() => this.props.loadCollectionToState(this.props.item)}>
                    <div className="collection-title">
                        {this.props.item.metadata.title}
                    </div>

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
                </Link>

                <div className="row-right">
                    <ul className="collection-actions">

                        <li onClick={() => this.deleteCollection()}>
                            <Icon icon="trash" />
                        </li>

                        <li onClick={() => this.editCollection()}>
                            <Icon icon="edit" />
                        </li>

                    </ul>
                </div>

            </div>)
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default withRouter(connect(mapStateToProps, {
    deleteCollection,
    updateCollection,
    showDrawer,
    loadCollectionToState,
    getCollectionStats
})(collectionView));
