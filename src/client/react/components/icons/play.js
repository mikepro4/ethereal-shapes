import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Play extends Component {
	render() {
		return (
			<div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="41"
                    fill="none"
                    viewBox="0 0 41 41"
                    >
                    <path
                        fill="#FFFFFF"
                        fillRule="evenodd"
                        d="M20.5 41C31.822 41 41 31.822 41 20.5S31.822 0 20.5 0 0 9.178 0 20.5 9.178 41 20.5 41zM16 14.39v12.258a.5.5 0 00.744.437l10.507-5.863a.5.5 0 00.016-.864L16.76 13.963a.5.5 0 00-.76.427z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Play);
