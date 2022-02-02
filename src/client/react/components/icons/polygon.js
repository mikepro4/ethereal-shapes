import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Polygon extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="42"
                    fill="none"
                    viewBox="0 0 26 42"
                >
                    <path
                        fill="#8247E5"
                        d="M13.274.527l-.278.938v27.213l.278.275 12.712-7.467L13.274.527z"
                    ></path>
                    <path
                        fill="#B591F0"
                        d="M13.274.527L.563 21.487l12.711 7.466V.527z"
                    ></path>
                    <path
                        fill="#8247E5"
                        d="M13.274 31.346l-.157.19v9.693l.157.454 12.72-17.8-12.72 7.463z"
                    ></path>
                    <path
                        fill="#B591F0"
                        d="M13.274 41.683V31.346L.563 23.883l12.711 17.8z"
                    ></path>
                    <path
                        fill="#3C1281"
                        d="M13.273 28.954l12.712-7.466-12.712-5.742v13.208z"
                    ></path>
                    <path
                        fill="#8247E5"
                        d="M.563 21.488l12.711 7.466V15.746L.563 21.488z"
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

export default connect(mapStateToProps, {})(Polygon);
