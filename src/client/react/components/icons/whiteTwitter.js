import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class WhiteTwitter extends Component {
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
                        fill="#fff"
                        fillRule="evenodd"
                        d="M20.5 41C31.822 41 41 31.822 41 20.5S31.822 0 20.5 0 0 9.178 0 20.5 9.178 41 20.5 41zm8.2-26.16h.001zm0 0a7.314 7.314 0 01-2.101.576 3.67 3.67 0 001.61-2.025c-.708.42-1.491.724-2.325.888a3.66 3.66 0 00-6.237 3.338 10.39 10.39 0 01-7.543-3.824 3.658 3.658 0 001.133 4.886 3.646 3.646 0 01-1.658-.457v.046a3.663 3.663 0 002.935 3.588 3.662 3.662 0 01-1.653.063 3.664 3.664 0 003.42 2.542 7.344 7.344 0 01-5.42 1.515 10.359 10.359 0 005.611 1.645c6.732 0 10.413-5.577 10.413-10.414 0-.158-.003-.316-.01-.473a7.435 7.435 0 001.826-1.895z"
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

export default connect(mapStateToProps, {})(WhiteTwitter);
