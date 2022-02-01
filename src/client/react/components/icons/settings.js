import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Settings extends Component {
	render() {
		return (
			<div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    fill="none"
                    viewBox="0 0 15 16"
                >
                    <path
                        fill="#fff"
                        d="M15 7.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3zM14 0v3h-1V0h1zM13 9v7h1V9h-1zM9 11.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3zM8 0v7H7V0h1zM7 13v3h1v-3H7zM3 7.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3A.5.5 0 01.5 4h2a.5.5 0 01.5.5v3zM2 0v3H1V0h1zM1 9v7h1V9H1z"
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

export default connect(mapStateToProps, {})(Settings);
