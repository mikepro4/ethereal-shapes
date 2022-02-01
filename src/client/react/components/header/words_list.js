import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import Anime from 'react-anime';
import { motion } from "framer-motion"
import keydown from "react-keydown";

import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import { 
    createWord, loadWord, searchWords 
} from "../../../redux/actions/wordsActions"

import {
    updateQueryString,
    updateCollection
} from "../../../redux/actions/appActions"

import ListResults  from "../../components/list"

import NavLinks  from "../../components/navLinks"

import qs from "qs";

import moment from 'moment'
import * as _ from "lodash"

class WordsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showMenuBars: true,
            })
        }, 500)
    }


    render() {
        return (
            <div
                className={classNames({
                    "words-list-container": true,
                })}
            >
                <NavLinks />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        user: state.app.user
    };
}

export default connect(mapStateToProps, {
    createWord, 
    loadWord, 
    searchWords, 
    updateQueryString,
    updateCollection
})(withRouter(WordsList));
