import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Mic extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="16"
                    fill="none"
                    viewBox="0 0 12 16"
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M3.178 7.97a2.39 2.39 0 104.78 0V2.39a2.39 2.39 0 10-4.78 0v5.58zm-1.553 3.955a5.564 5.564 0 003.148 1.58V16h1.595v-2.496a5.572 5.572 0 004.769-5.508H9.56V8a4 4 0 01-3.993 3.989A3.981 3.981 0 012.74 10.81 3.978 3.978 0 011.576 8H0c0 1.53.623 2.92 1.625 3.925z"
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

export default connect(mapStateToProps, {})(Mic);
