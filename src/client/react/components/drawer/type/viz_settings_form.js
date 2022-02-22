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


class VizSettingsForm extends Component {
    renderColors({ fields, meta: { error, submitFailed } }) {
        return (
            <ul className="colors-container">

                {fields.map((color, index) => (
                    <li className="color-container" key={index}>
                        {/* <button
                            type="button"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        >delete</button> */}

                        <Button
                            className={"submit-button update-shape main-button delete-color"}
                            onClick={() => fields.remove(index)}
                            icon="trash"
                            large="true"
                        />
                        <h4>Color #{index + 1}</h4>
                        <Field
                            name={`${color}.hex`}
                            component={ColorPicker}
                            label="Color"
                        />

                        {fields.length > 1 && <Field
                            name={`${color}.amount`}
                            component={Slider}
                            label="Color amount"
                            resetValue={0}
                            sliderMax={100}
                            labelStepSize={20}
                        />}

                        

                        <Field
                            name={`${color}.opacity`}
                            component={Slider}
                            label="Color opacity"
                            resetValue={1}
                            sliderMax={100}
                            labelStepSize={20}
                        />
                    </li>
                ))}

                <li className="color-container">
                
                    <Button
                        className={"main-button add-color"}
                        onClick={() => fields.push({
                            hex: "#ffffff",
                            opacity: "100",
                            amount: "20"
                        })}
                        text="Add color"
                        icon="plus"
                        large="true"
                    />
                </li>
            </ul>
        )
    }
    render() {
        const { handleSubmit } = this.props;

        let mathTabOptions = [
            {
                value: "sin",
                name: "Sin"
            },
            {
                value: "cos",
                name: "Cos"
            },
            {
                value: "tan",
                name: "Tan"
            },
            {
                value: "atan",
                name: "Atan"
            },
            {
                value: "log",
                name: "Log"
            },
            {
                value: "clz32",
                name: "Clz32"
            }
        ]

        return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="shape.math"
                    component={TabGroup}
                    tabOptions={mathTabOptions}
                    label="Algorithm math"
                />

                {!this.props.app.iframe && <div>
                    <Field
                        name="shape.frequency"
                        component={Slider}
                        label="Frequency"
                        sliderMax={20}
                        sliderMin={-20}
                        labelStepSize={10}
                    />

                    <Field
                        name="shape.step"
                        component={Slider}
                        label="Step"
                        sliderMax={20}
                        sliderMin={-20}
                        labelStepSize={10}
                    />

                    <Field
                        name="shape.rotateSpeed"
                        component={Slider}
                        label="Rotation"
                        sliderMax={10}
                        sliderMin={-10}
                        labelStepSize={5}
                    />

                    <Field
                        name="shape.boldRate"
                        component={Slider}
                        label="Boldness"
                        sliderMax={20}
                        sliderMin={-20}
                        labelStepSize={10}
                    />

                    <Field
                        name="shape.friction"
                        component={Slider}
                        label="Friction"
                        sliderMax={1}
                        sliderMin={-1}
                        labelStepSize={0.5}
                    />

                    <Field
                        name="shape.rotatePointSpeed"
                        component={Slider}
                        label="Point rotation speed"
                        sliderMax={10}
                        sliderMin={-10}
                        labelStepSize={5}
                    />

                    <Field
                        name="point.pointSize"
                        component={Slider}
                        label="Point size"
                        sliderMax={500}
                        sliderMin={1}
                        resetValue={1.3}
                        labelStepSize={125}
                    />

                    <Field
                        name="point.pointCount"
                        component={Slider}
                        label="Point count"
                        sliderMax={1024}
                        sliderMin={1}
                        resetValue={1}
                        incrementStep={1}
                        labelStepSize={205}
                    />

                    <Field
                        name="point.pointOpacity"
                        component={Slider}
                        label="Point opacity"
                        resetValue={1}
                        sliderMax={1}
                        labelStepSize={0.1}
                    />

                    

                    <Field
                        name="shape.backgroundColor"
                        component={ColorPicker}
                        label="Background Color"
                    />

                    <Field
                        name="overlay.visible"
                        type="checkbox"
                        component={Checkbox}
                        label="Overlay visible"
                        inline={true}
                    />              

                    <Field
                        name="overlay.blur"
                        component={Slider}
                        label="Overlay blur"
                        resetValue={222}
                        sliderMax={350}
                        labelStepSize={50}
                    />

                    <Field
                        name="overlay.colorOpacity"
                        component={Slider}
                        label="Overlay opacity"
                        resetValue={0}
                        sliderMax={1}
                        labelStepSize={0.1}
                    />

                    <Field
                        name="overlay.color"
                        component={ColorPicker}
                        label="Overlay Color"
                    />

                    <FieldArray name="colors" component={this.renderColors} />


                    {this.props.user && <Button
                        className={"submit-button update-shape main-button"}
                        loading={this.props.loading}
                        type="submit"
                        text="Update"
                        large="true"
                    />}

                </div>}


               


                {/* <div className="blade-input-group">
                    <Field
                        name="title"
                        component={Textarea}
                        placeholder="Type title..."
                        ref="title"
                        title="Title"
                    />
                </div> */}






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

VizSettingsForm = reduxForm({
    form: 'vizSettings',
    validate
})(VizSettingsForm);

const mapStateToProps = state => ({
    user: state.app.user,
    app: state.app
});

export default connect(mapStateToProps, {
})(VizSettingsForm);

