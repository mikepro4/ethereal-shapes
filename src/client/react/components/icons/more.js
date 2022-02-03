import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class More extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="21"
                    fill="none"
                    viewBox="0 0 5 21"
                >
                    <circle cx="2.5" cy="18.5" r="2.5" fill="#fff"></circle>
                    <circle cx="2.5" cy="10.5" r="2.5" fill="#fff"></circle>
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#fff"></circle>
                </svg>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, {})(More);
