import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector, change } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";
import ReactSelectAsync from "../../form/ReactSelectAsync";

import Block from "../../block"


import {
    searchGenerators,
} from "../../../../redux/actions/generatorActions"

class GeneratorSelectorForm extends Component {

    state = {
        loading: false,
    }

    getOptions = (input, callback) => {

        this.props.searchGenerators(
            "",
            "",
            0,
            20,
            {},
            data => {
                console.log(data)
                callback(data.all.map(generator => ({
                    value: generator._id,
                    label: generator.title
                }))
                );
            }
        );
    }

    render() {

        return (
            <Form  autoComplete="off">
                <Field
                    name="generatorId"
                    component={ReactSelectAsync}
                    loadOptions={(input, callback) => this.getOptions(input, callback)}
                    placeholder="Search generators..."
                    ref="collection search"
                    label="Generator"
                />
            </Form>
        );
    }
}

const validate = values => {
    const errors = {}

    if (values.username) {

    }

    return errors
}

GeneratorSelectorForm = reduxForm({
    form: 'generatorSelector',
    validate
})(GeneratorSelectorForm);

const mapStateToProps = state => ({
    user: state.app.user,
    nft: state.activeNFT,
    shape: state.shape,
    app: state.app
});

export default connect(mapStateToProps, {
    searchGenerators
})(withRouter(GeneratorSelectorForm));

