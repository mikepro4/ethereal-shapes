import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavLinks from "./nav_links"

import {searchSales} from "../../../redux/actions/nftActions"

class Nav extends Component {

    state = {
        salesActive: true
    }

    componentDidMount = () => {
        this.props.searchSales((data => {
            if(data.count > 0) {
                this.setState({
                    salesActive: true
                })
            }
        }))
    }

	render() {

        let mobileTabs = [
			{
			  	url: "/featured",
				name: "Featured",
			},
            {
                url: "/all",
                name: "All NFTs",
            },
			{
			  	url: "/sale",
				name: "On Sale",
                active: this.props.app.salesActive
			}
		]

        let mainLinks = [
			{
			  	url: "/featured",
				name: "Featured",
			},
            {
                url: "/all",
                name: "All NFTs",
            },
			{
			  	url: "/sale",
				name: "On Sale",
                active: this.props.app.salesActive
			},
			// {
			//   	url: "/my-nfts",
			// 	name: "My NFTs",
			// },
			{
			  	url: "/about",
				name: "About",
			},
			{
			  	url: "/planet",
				name: "Planet",
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
        theme: state.app.theme,
        app: state.app
	};
}

export default connect(mapStateToProps, {
    searchSales
})(Nav);
