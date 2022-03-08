import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

import Input from "../../form/BladeInput";

class CollectionActionsForm extends Component {
    
    state = {
        loading: false
    }

	render() {
        const { handleSubmit } = this.props;
        
		return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="nftId"
                    component={Input}
                    title="NFT ID" placeholder="NFT ID"
                />

                <Button
                    className="main-button"
                    loading={this.props.loading}
                    type="submit"
                    text="Add to collection"
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

  CollectionActionsForm = reduxForm({
    form: 'collectionActions',
    validate
})(CollectionActionsForm);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(withRouter(CollectionActionsForm));

  