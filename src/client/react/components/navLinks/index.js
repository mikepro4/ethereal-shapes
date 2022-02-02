import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavLinks from "./nav_links"


class Nav extends Component {

	render() {

        let mobileTabs = [
			{
			  	url: "/",
				name: "Featured",
			},
            {
                url: "/all",
                name: "All NFTs",
            },
			{
			  	url: "/sale",
				name: "On Sale",
                active: true
			}
		]

        let mainLinks = [
			{
			  	url: "/",
				name: "Featured",
			},
            {
                url: "/all",
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

        let links

        if(this.props.linksType == "mainLinks") {
            links = mainLinks
        } else if(this.props.linksType == "mobileTabs") {
            links = mobileTabs
        }

		return (
			<div className={"nav-container theme-" + this.props.theme}>

                <NavLinks
                    links={links}
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
