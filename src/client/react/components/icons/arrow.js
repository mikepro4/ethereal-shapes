import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Arrow extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="23"
                    fill="none"
                    viewBox="0 0 37 23"
                >
                    <path
                        fill="#fff"
                        d="M25.739 0l-1.252 1.251 8.937 8.58H0v1.787h33.603l-9.294 9.83 1.43 1.252 11.26-11.976L25.74 0z"
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

export default connect(mapStateToProps, {})(Arrow);
