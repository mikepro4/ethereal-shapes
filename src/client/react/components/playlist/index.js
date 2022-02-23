import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";

class Playlist extends Component {

    componentDidMount = () => {
    }

    render() {

        return (
            <div className="nft-playlist-container">
                Playlist
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
    };
}

export default connect(mapStateToProps, {
})(withRouter(Playlist));
