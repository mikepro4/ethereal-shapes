import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Youtube extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="67"
                    height="46"
                    fill="none"
                    viewBox="0 0 67 46"
                >
                    <path
                        fill="red"
                        d="M65.079 7.41c-.755-2.785-2.978-4.98-5.8-5.725C54.161.332 33.646.332 33.646.332S13.13.332 8.015 1.685c-2.823.745-5.047 2.94-5.8 5.726C.843 12.46.843 22.999.843 22.999s0 10.537 1.37 15.588c.754 2.786 2.978 4.98 5.8 5.726 5.117 1.353 25.632 1.353 25.632 1.353s20.516 0 25.632-1.353c2.823-.745 5.046-2.94 5.8-5.726 1.371-5.05 1.371-15.588 1.371-15.588s0-10.537-1.37-15.588"
                    ></path>
                    <path
                        fill="#fff"
                        d="M26.938 32.568L44.084 23l-17.147-9.567v19.134z"
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

export default connect(mapStateToProps, {})(Youtube);
