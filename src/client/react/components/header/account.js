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

class AccountDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderAccount() {
        if(this.props.account.address) {
            let account = this.props.account.address.substr(this.props.account.address.length - 4)
            return(<div className="header-account-wrapper">
                <div className="header-account-balance-container">
                    <div className="header-polygon"><Polygon/></div>
                    <div className="header-account-balance">{this.props.account.balance}</div>
                </div>
                <div className="header-account-addresss">0x...{account}</div>
            </div>)
        } else {
            return(
                <div className="header-account" onClick={() => this.props.showDrawer("connect-wallet")}>
                    <div className="header-account-icon"><Account /></div>
                    <div className="login-link">Login</div>
                </div>
            )
        }
    }


    render() {
        if(!this.props.app.iframe) {
            if(this.props.account.address && this.props.account.balance !== null) {
                let account = this.props.account.address.substr(this.props.account.address.length - 4)
                return(<div className="header-account-wrapper">
                    <div className="header-account-balance-container">
                        <div className="header-polygon"><Polygon/></div>
                        <div className="header-account-balance">{this.props.account.balance}</div>
                        
                    </div>
                    <div className="header-account-addresss">0x...{account}</div>
                </div>)
            } else {
                return(
                    <div className="header-account" onClick={() => this.props.showDrawer("connect-wallet")}>
                        <div className="header-account-icon"><Account /></div>
                        <div className="login-link">Login</div>
                    </div>
                )
            }
        } else {
            return (<div></div>)
        }
        
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        demoMode: false,
        user: state.app.user,
        blocks: state.blocks,
        account: state.app.account,
        app: state.app
    };
}

export default connect(mapStateToProps, {
    showDrawer
})(withRouter(AccountDisplay));
