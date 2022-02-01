import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Account extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="25"
                    fill="none"
                    viewBox="0 0 22 25"
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M11.278 11.444a5.222 5.222 0 100-10.444 5.222 5.222 0 000 10.444zm0 1a6.222 6.222 0 100-12.444 6.222 6.222 0 000 12.444zM16.764 14.14l4.103 7.111c.961 1.667-.242 3.75-2.166 3.75H3.461c-1.924 0-3.127-2.083-2.166-3.75l4.103-7.111.866.5-4.103 7.111a1.5 1.5 0 001.3 2.25H18.7a1.5 1.5 0 001.3-2.25l-4.103-7.111.866-.5z"
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

export default connect(mapStateToProps, {})(Account);
