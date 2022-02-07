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


import {
    updateWord,
    loadWord,
    createWord,
    deleteWord
} from "../../../../redux/actions/wordsActions"

import WordSettingsForm from "./word_settings_form"

class WordSettings extends Component {

    
    

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    
        this.debouncedOnChange = _.debounce(this.handleFormSubmit, 1000);
    }
    

    handleFormSubmit(data) {
        console.log(data)

        this.setState({
			loading: true
        })

        this.props.updateWord(this.props.word, data, () => {
            // this.props.hideDrawer()
            this.setState({
                loading: false
            })

            this.props.loadWord(this.getQueryParams().word, (data) => {
                console.log(data)
            })
        })
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };


	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer connect-wallet theme-" + this.props.theme}>
                
               connect wallet buy
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
    updateWord,
    loadWord,
    createWord,
    deleteWord
})(WordSettings));
