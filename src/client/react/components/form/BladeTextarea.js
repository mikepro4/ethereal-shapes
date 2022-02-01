import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

class Textarea extends Component {
  state = {
    textareaFocused: false
  };

  onBlur = () => {
    this.setState({
      textareaFocused: false
    })
  }

  onFocus = () => {
    this.setState({
      textareaFocused: true
    })
  }
	render() {
    let characterCount = this.props.input.value.length

    let containerClassName = classnames({
      "textarea-text": true,
      "textarea-large": this.props.large,
      "textarea-empty": characterCount == 0,
      "textarea-touched": this.props.meta.touched,
      "textarea-valid": this.props.meta.touched && !this.props.meta.error,
      "textarea-invalid":this.props.meta.touched && this.props.meta.error,
      "textarea-focused": this.props.meta.active
    });

    let textareaClassName = classnames({
      "blade-textarea": true,
      "blade-intent-success": this.props.meta.touched && !this.props.meta.error,
      "blade-intent-danger": this.props.meta.touched && this.props.meta.error
    });

    let placeholderLargeClassName = classnames({
      "textarea-placeholder": true,
      "textarea-placeholder-large": true,
      "textarea-placeholder-large-visible": !this.state.textareaFocused & characterCount == 0
    })

    let placeholderSmallClassName = classnames({
      "textarea-placeholder": true,
      "textarea-placeholder-small": true,
      "textarea-placeholder-small-visible": this.state.textareaFocused || characterCount > 0
    })

		return (
      <div className={containerClassName}>

        {!this.props.meta.touched || this.props.meta.valid ? (
          <div className={placeholderSmallClassName}>
            {this.props.title ? this.props.title : this.props.placeholder}
          </div>) : ""
        }

        {(this.props.meta.touched && !this.props.meta.valid && this.state.textareaFocused) || (this.props.meta.touched && !this.props.meta.valid && characterCount > 0 ) ? (
          <div className="textarea-error">
            <span>{this.props.meta.error}</span>
          </div>
        ) : (
          ""
        )}

        <div className={placeholderLargeClassName}>
          {this.props.meta.touched && !this.props.meta.valid ? this.props.meta.error : this.props.placeholder}
        </div>

        <textarea
          {...this.props.input}
          className={textareaClassName}
          type={this.props.type}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          autoComplete="new-password"
        />

      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Textarea);
