import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { change } from "redux-form";

class TabGroup extends Component {
    state = {
        inputFocused: false,
        currentValue: null,
        tabOptions: []
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
            currentValue: this.props.input.value,
            tabOptions: this.props.tabOptions
        })
    }

    componentDidUpdate = (prevprops) => {
        if (prevprops.input.value !== this.props.input.value) {
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
            <div className="input-container tabgroup-container">
                <div className="input-label">
                    {this.props.label}
                </div>

                <div className="input-right">
                    <div className="control-container">
                        <div
                            className="control-tab-container"
                            ref="tab"
                        >
                            <ul className={"tab-options " + this.props.className}>
                                {this.state.tabOptions.map((tabOption) => {
                                    return (
                                        <li
                                            className={classNames({
                                                "tab-option-active": this.state.currentValue == tabOption.value,
                                            }, "tab-option")}
                                            onClick={() => this.changeValue(tabOption.value)}
                                            key={tabOption.value}
                                        >
                                            <div className="tab-option-label">{tabOption.name}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="control-input">
                            <input {...this.props.input} />
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

export default connect(mapStateToProps, {})(TabGroup);
