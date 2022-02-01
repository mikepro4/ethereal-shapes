import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { change } from "redux-form";
// import { SketchPicker } from 'react-color';
import { HexColorPicker } from "react-colorful";

class ColorPicker extends Component {
  state = {
    inputFocused: false,
    currentValue: null,
  };

  onBlur = () => {
    this.setState({
      inputFocused: false
    })
  }

  onFocus = () => {
    this.setState({
      inputFocused: true
    })
  }

  componentDidMount = () => {
    this.setState({
      currentValue: this.props.input.value
    })
  }

  componentDidUpdate = (prevprops) => {
    if(prevprops.input.value !== this.props.input.value) {
      this.setState({
        currentValue: this.props.input.value
      })
    }
  }

  changeValue = (value) => {
    this.props.meta.dispatch(change(this.props.meta.form, this.props.input.name, value))
  }

	render() {
		return (
      <div className="input-container color-picker-container">
        <div className="input-label">
          {this.props.label}
        </div>

        <div className="input-right">
          <div className="control-container">
            <div
              className="control-color-picker-container"
              ref="colorPicker"
            >
              {/* {this.state.currentValue && <SketchPicker
                color={ this.state.currentValue }
                onChangeComplete={ (value) =>  this.changeValue(value) }
              />} */}

            {this.state.currentValue && <HexColorPicker
                color={ this.state.currentValue }
                onChange={ (value) =>  {
                    console.log(value)
                    this.changeValue(value) 
                }}
              />}


            </div>

            <div className="control-input" style={{ display: "none"}}>
              <input {...this.props.input}   />
            </div>
          </div>
        </div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    form: state.form
	};
}

export default connect(mapStateToProps, {})(ColorPicker);
