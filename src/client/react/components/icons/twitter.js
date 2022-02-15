import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Twitter extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="36"
                    fill="none"
                    viewBox="0 0 44 36"
                >
                    <path
                        fill="#2AA9E0"
                        d="M44.002 4.194c-1.6.71-3.321 1.19-5.126 1.405A8.952 8.952 0 0042.8.66a17.869 17.869 0 01-5.668 2.167 8.914 8.914 0 00-6.516-2.82 8.927 8.927 0 00-8.927 8.927c0 .7.08 1.381.232 2.035-7.42-.373-13.997-3.927-18.4-9.327a8.884 8.884 0 00-1.208 4.487 8.922 8.922 0 003.97 7.43 8.89 8.89 0 01-4.042-1.116l-.001.112c0 4.325 3.077 7.933 7.16 8.753a8.939 8.939 0 01-4.031.153 8.935 8.935 0 008.339 6.2 17.91 17.91 0 01-11.086 3.82c-.721 0-1.431-.042-2.13-.124a25.266 25.266 0 0013.684 4.01c16.42 0 25.398-13.601 25.398-25.398 0-.387-.008-.772-.026-1.155a18.136 18.136 0 004.454-4.62z"
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

export default connect(mapStateToProps, {})(Twitter);
