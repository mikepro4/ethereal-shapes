import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Tag, Intent } from "@blueprintjs/core";

class NavLinks extends Component {
    isActivePath = (pathname) => {
        if(pathname == "/") {
            return this.props.location.pathname == pathname 
        } else {
            return this.props.location.pathname.indexOf(pathname) !== -1 
        }
	}

	render() {

		const {links} = this.props

		const format = commaNumber.bindWith(',', '.');

		return (
			<div className="nav-links-container">
                <ul
                    className={classNames({"active": !(this.props.location.pathname == "/")}, "nav-links")}
                >
                    {links.map(link => {
                        return (
                            <li key={link.url} className={classNames("nav-link-container", {
                                    "nav-link-active": this.isActivePath(link.url)
                                })}
                            >
                                <div className="link-wrapper">
                                    <Link 
                                        to ={link.url} 
                                        
                                        onClick={() =>  {
                                            this.props.hideMenu()
                                            }
                                        }
                                    >
                                        <div className="nav-link line-hover"> 
                                            <div className="nav-link-left">
                                                <span className="nav-link-label">{link.name}</span>

                                            </div>
                                        </div>

                                        {link.active && <span className="nav-link-status"></span>}


                                    </Link>

                                </div>
                            </li>
                        )
                    })}
                </ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
        location: state.router.location,
	};
}

export default connect(mapStateToProps, {
})(NavLinks);
