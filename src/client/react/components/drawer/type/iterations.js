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

import { updateIteration } from "../../../../redux/actions/generatorActions"


import IterationForm from "./iterations_form"

class Iterations extends Component {

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

    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };


	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer iterations-drawer theme-" + this.props.theme}>
               <IterationForm
                    enableReinitialize="true"
                    initialValues={
                        {
                            iterations: this.props.generator.details.iterations,
                            iteration: this.props.generator.currentIteration
                        }
                    }
                    loading={this.state.loading}
                    onSubmit={this.handleFormSubmit.bind(this)}
                    onChange={values => {
                       this.props.updateIteration(values.iteration)
                    }}
                />
            </div>

        )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        generator: state.generator,
	};
}

export default withRouter(connect(mapStateToProps, {
    updateIteration
})(Iterations));
