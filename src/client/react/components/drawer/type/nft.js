import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"


// import {
//     updateWord,
//     loadWord,
//     createWord,
//     deleteWord
// } from "../../../../redux/actions/wordsActions"

// import WordSettingsForm from "./word_settings_form"

class NFTDrawer extends Component {

    
    

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }
    

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };


	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer nft-drawer theme-" + this.props.theme}>
                
                <div className={"details-container theme-" + this.props.theme}>
                    {/* <div className="drawer-header">
                        Title: {this.props.word.metadata.title}
                    </div> */}

                    nft drawer
                </div>
            </div>

        )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        word: state.app.activeWord,
	};
}

export default withRouter(connect(mapStateToProps, {
})(NFTDrawer));
