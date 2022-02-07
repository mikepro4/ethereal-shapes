import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import Anime from 'react-anime';
import { motion } from "framer-motion"
import keydown from "react-keydown";
import WordsList from "./words_list"

import Scroll from "../scroll"

import Account from "../icons/account"
import LogoMobile from "../icons/logo_mobile"
import LogoDesktop from "../icons/logo_desktop"
import Powered from "../icons/powered"
import Polygon from "../icons/polygon"

import NavLinks from "../../components/navLinks"

import { showDrawer } from "../../../redux/actions/appActions"

import AccountDisplay from "./account"

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
            menuClosing: false,
            showMenuBars: false,
            showContent: false,
            showWord: false
        }
    }

    render() {
        return (
            <div
                className={classNames({
                    "user": true,
                })}
            >
                {this.props.app.user && <div>
                {this.props.app.user.email}
                <Link to="/auth/logout">Logout</Link>
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        demoMode: false,
        user: state.app.user,
        blocks: state.blocks,
        clientHeight: state.app.clientHeight,
        app: state.app
    };
}

export default connect(mapStateToProps, {
    showDrawer
})(withRouter(User));
