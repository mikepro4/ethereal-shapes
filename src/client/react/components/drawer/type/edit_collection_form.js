import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

import Input from "../../form/BladeInput";

class CollectionSettingsForm extends Component {
    
    state = {
        loading: false
    }

	render() {
        const { handleSubmit } = this.props;
        
		return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="title"
                    component={Input}
                    title="Title" placeholder="Title"
                />

                <Button
                    className="main-button"
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />

            </Form>
		);
	}
}

const validate = values => {
    const errors = {}

    return errors
  }

  CollectionSettingsForm = reduxForm({
    form: 'collectionSettings',
    validate
})(CollectionSettingsForm);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(withRouter(CollectionSettingsForm));

  