import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import Play from "../icons/play"
import Polygon from "../icons/polygon"
import More from "../icons/more"
import Settings from "../icons/settings"

import { showDrawer } from "../../../redux/actions/appActions"


class NFTDetails extends Component {

    constructor (props) {
        super(props)

        this.nftMore =  this.nftMore = React.createRef();
    }

	render() {

		return (
			<div 
                className="nft-details-container"
                className={classNames({
                    "nft-details-container": true,
                    "large": this.props.large
                })}
            >
                <div className="nft-details-left">

                    <div className="play-container">
                        <Play/>
                    </div>

                    <div className="metadata-container">
                        <div className="metadata-name">
                            {this.props.item.nft.name}
                        </div>

                        <div className="metadata-status-bar">
                            <div className="status green">
                                On Sale
                            </div>

                            <div className="price green">
                                <Polygon/>
                                {this.props.item.nft.price}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="nft-details-left">
                    <div className="left">
                    <Button
                        className={"buy-button"}
                        type="submit"
                        text="Buy"
                        large="true"
                    />
                    </div>
                    {this.props.more && <div className="right">
                        <div className="more-container" ref={this.nftMore} onClick={() => this.props.showDrawer("nft")}>
                            <Settings/>
                        </div>
                    </div>}
                    
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {
    showDrawer
})(NFTDetails);
