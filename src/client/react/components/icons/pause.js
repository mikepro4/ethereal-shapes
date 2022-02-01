import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Pause extends Component {
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
                        fill="#F9F9F9"
                        fillRule="evenodd"
                        d="M41 20.5C41 31.822 31.822 41 20.5 41S0 31.822 0 20.5 9.178 0 20.5 0 41 9.178 41 20.5zm-27-7a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v14a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-14zm8.5-.5a.5.5 0 00-.5.5v14a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-14a.5.5 0 00-.5-.5h-3z"
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

export default connect(mapStateToProps, {})(Pause);
