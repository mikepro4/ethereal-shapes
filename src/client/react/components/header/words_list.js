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
               <ListResults
                    type="recent_words"
                    resultType="word"
                    searchCollection={this.props.searchWords}
                    updateTotal={(count) => {
                        this.setState({
                            count: count
                        })
                    }}
                    handleClick={() => this.props.handleClick()}
                />

                <Button 
                    minimal="true"
                    icon="plus"
                    text="Create"
                    className={"control "}
                    onClick={() =>  {
                        this.props.createWord({
                            metadata: {
                                title: "Iteration " + (this.state.count + 1),
                                createdBy: "anon"
                            },
                        }, () => {
                            this.props.updateCollection(true)
                        })
                        }
                    }
                />
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
