import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

// import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";


class IterationsForm extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="iteration"
                    component={Slider}
                    label="Iteration"
                    sliderMax={this.props.initialValues.iterations}
                    sliderMin={0}
                    incrementStep={1}
                    stepSize={1}
                    resetValue={1}
                    labelStepSize={this.props.initialValues.iterations / 5}
                />


                {/* {this.props.user && <Button
                    className={"submit-button update-shape main-button"}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />} */}

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

IterationsForm = reduxForm({
    form: 'iterations',
    validate
})(IterationsForm);

const mapStateToProps = state => ({
    user: state.app.user,
    app: state.app
});

export default connect(mapStateToProps, {
})(IterationsForm);

