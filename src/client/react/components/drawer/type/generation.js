import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"
import {
    hideDrawer,
    resetForm
} from "../../../../redux/actions/appActions"

import {
    createGenerator,
    loadGenerator,
    updateGenerator,
    deleteGenerator
} from "../../../../redux/actions/generatorActions"

import GenerationForm from "./generation_form"
import GeneratorSelectorForm from "./generator_selector_form"

class Generation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            generator: null
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

    handleFormSubmitGenerator(data) {
        console.log(data)

    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    render() {
        // console.log(this.state)
        return (
            <div className={"app-drawer-content-container standard-drawer nft-settings-drawer theme-" + this.props.theme}>

                <GeneratorSelectorForm
                    enableReinitialize="true"
                    loading={this.state.loading}
                    onSubmit={this.handleFormSubmitGenerator.bind(this)}
                    theme={this.props.theme}
                    onChange={values => {
                        if(values.generatorId && values.generatorId.value) {
                            this.props.loadGenerator(values.generatorId.value, (data) => {
                                this.setState({
                                    generator: data
                                })
                            })
                        } else {
                            this.setState({
                                generator: null
                            })
                            this.props.resetForm("generationForm")
                        }
                        
                    }}
                />

                <GenerationForm
                    enableReinitialize="true"
                    initialValues={
                        this.state.generator
                    }
                    loading={this.state.loading}
                    onSubmit={this.handleFormSubmit.bind(this)}
                    theme={this.props.theme}
                    onChange={values => {
                        console.log(values)
                        // this.props.changeForm("generationForm", "from", 5)
                        // this.props.loadNewShape({
                        //     defaultViz: {
                        //         shape: values.shape,
                        //         point: values.point,
                        //         overlay: values.overlay,
                        //         colors: values.colors
                        //     }
                        // })
                    }}
                />

                <ul className="generator-actions">
                    <li>
                        <Button
                            className={"main-button "}
                            loading={this.props.loading}
                            text="Save new generator"
                            large="true"
                            icon="plus"
                            onClick={() => {
                                this.props.createGenerator(this.props.form.generationForm.values, (data) => {
                                    console.log(data)
                                    this.props.hideDrawer()
                                })
                            }}
                        />
                    </li>

                    <li>

                        {this.state.generator && this.state.generator._id && <Button
                            className={"main-button "}
                            loading={this.props.loading}
                            text="Update generator"
                            icon="refresh"
                            large="true"
                            onClick={() => {
                                this.props.updateGenerator(this.props.form.generationForm.values, (data) => {
                                    console.log(data)
                                    this.props.hideDrawer()
                                })
                            }}
                        />
                        }

                    </li>

                    <li>
                        {this.state.generator && this.state.generator._id && <Button
                            className={"main-button "}
                            loading={this.props.loading}
                            text="Delete generator"
                            large="true"
                            icon="trash"
                            onClick={() => {
                                this.props.deleteGenerator(this.state.generator._id, (data) => {
                                    console.log(data)
                                    this.props.hideDrawer()
                                })
                            }}
                        />}
                    </li>

                </ul>

            </div>

        )

    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        authenticated: state.auth.authenticated,
        shape: state.shape,
        form: state.form
    };
}

export default withRouter(connect(mapStateToProps, {
    createGenerator,
    loadGenerator,
    updateGenerator,
    deleteGenerator,
    hideDrawer,
    resetForm
})(Generation));
