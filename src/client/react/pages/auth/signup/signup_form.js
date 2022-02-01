import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../../components/form/BladeInput";


class SignupForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
				<div className="auth-form auth-login-form">
					<Form onSubmit={handleSubmit} autoComplete="off">
						<div className="auth-headline transition-element">Sign up</div>

						<div className="transition-element">
                            <Field
                                name="email"
                                component={Input}
                                placeholder="Email address"
                            />
						</div>

                        <div className="transition-element">
                            <Field
                                name="password"
                                component={Input}
                                placeholder="Password"
                                type="password"
                            />
                        </div>

                        <div className="transition-element">
                            <Field
                                name="passwordConfirm"
                                component={Input}
                                placeholder="Confirm password"
                                type="password"
                            />
                        </div>

		                <Button
							disabled={this.props.pristine}
							className={"submit-button transition-element theme-"+ this.props.theme }
							loading={this.props.loading}
							type="submit"
							text="Sign up"
		                    large="true"
						/>

			
					</Form>
				</div>
		);
	}
}

const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
  
    if (!values.password) {
      errors.password = 'Please enter a password';
    }
  
    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Please confirm password';
    }
  
    if (values.passwordConfirm && (values.password !== values.passwordConfirm)) {
      errors.passwordConfirm = 'Passwords must match';
    }
      

    return errors
  }

export default reduxForm({
    form: 'signup',
    validate
})(SignupForm);
  