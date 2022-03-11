import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { change } from "redux-form";
import { H5, Slider, Switch, Icon } from "@blueprintjs/core";

class SliderComponent extends Component {
    state = {
        inputFocused: false,
        sliderMin: 0,
        sliderMax: 0,
        currentValue: 0,
        clickActive: false
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
            sliderMax: this.props.sliderMax,
            currentValue: Number(this.props.input.value)
        })
    }

    componentDidUpdate = (prevprops) => {
        if(prevprops.input.value !== this.props.input.value) {
            this.setState({
            currentValue: Number(this.props.input.value)
            })
        }
    }

    getBarWidth = (e) => {
        let value = Number(this.state.currentValue)
        let width = value * 100 / this.state.sliderMax
        return `${width}%`
    }

    calculateWidth(event) {
        const relX = event.pageX - (this.refs.slider.offsetLeft)
        const progressBarPercent = relX * 100 / this.refs.slider.getBoundingClientRect().width
        let newValue = this.state.sliderMax *progressBarPercent / 100
        this.changeValue(newValue)
    }

    changeValue = (value) => {
        this.props.meta.dispatch(change(this.props.meta.form, this.props.input.name, Number(value)))
    }

    onMouseMove = (value) => {
        if(this.state.clickActive) {
            this.calculateWidth(value)
        }
    }

    onMouseLeave = (value) => {
        this.setState({
            clickActive: false
        })
    }

    onMouseDown = (value) => {
        this.setState({
            clickActive: true
        })
    }

    onMouseUp = (value) => {
        this.setState({
            clickActive: false
        })
    }

    setMin = () => {
        this.changeValue(this.state.sliderMin)
    }

    setMax = () => {
        this.changeValue(this.state.sliderMax)
    }

    add = () => {
        let inc 

        if(this.props.incrementStep) {
            inc = this.props.incrementStep
        } else {
            inc = 0.01
        }
            this.changeValue(Number(this.props.input.value) + inc)
    }

    subtract = () => {
        this.changeValue(Number(this.props.input.value) - inc)
    }

    setMid = () => {
        this.changeValue(Number(this.state.sliderMax)/2)
    }

    setPercent = (percent) => {
        let value = percent * this.state.sliderMax / 100
        this.changeValue(value)
    }

    resetValue = () => {
        let resetValue

        if(this.props.resetValue) {
            resetValue = this.props.resetValue
        } else {
            resetValue = -0.01
        }

        this.changeValue(resetValue)
    }

	render() {
		return (
            <div className="input-container slider-container">
                <div className="input-label">
                    {this.props.label}
                </div>

                <div className="input-right">
                    <div className="control-container">

                        <div className="control-input">

                            <div style={{display: "none"}}>
                                <input {...this.props.input}   />
                            </div>

                            <Slider
                                min={this.props.sliderMin}
                                max={this.props.sliderMax}
                                stepSize={this.props.stepSize ? this.props.stepSize : 0.1}
                                labelStepSize={this.props.labelStepSize}
                                value={Number(this.props.input.value)}
                                onChange={(value) => this.changeValue(value)}
                                onRelease={(value) => {
                                    // console.log(value)
                                    // setTimeout(() => {
                                    //     this.changeValue(value)
                                    // }, 1)
                                }}
                            />

                            <div className="action-container">
                                <ul className="action-list">

                                    <li className="action-item">
                                        <a className="input-action-button" onClick={() => this.resetValue()}>
                                            <Icon icon="locate"/>
                                        </a>
                                    </li>
                                
                            
                                    <li className="action-item">
                                        <a className="input-action-button" onClick={() => this.subtract()}>
                                            <Icon icon="minus"/>
                                        </a>
                                    </li>

                                    <li className="action-item">
                                        <a className="input-action-button" onClick={() => this.add()}>
                                            <Icon icon="plus"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>

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

export default connect(mapStateToProps, {})(SliderComponent);
