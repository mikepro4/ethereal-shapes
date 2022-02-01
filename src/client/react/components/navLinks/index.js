import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavLinks from "./nav_links"


class Nav extends Component {

	render() {

        let mobileLinks = [
			{
			  	url: "/",
				name: "All NFTs",
			},
			{
			  	url: "/sale",
				name: "On Sale",
                active: true
			},
			{
			  	url: "/my-nfts",
				name: "My NFTs",
			},
			{
			  	url: "/mint",
				name: "Mint",
			},
			{
			  	url: "/about",
				name: "About",
			}
		]

		return (
			<div className={"nav-container theme-" + this.props.theme}>

                <NavLinks
                    links={mobileLinks}
                    hideMenu={() => this.props.hideMenu()}
                />

            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme
	};
}

export default connect(mapStateToProps, {
})(Nav);
