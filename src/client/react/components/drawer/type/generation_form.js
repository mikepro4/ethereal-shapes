import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";
import ReactSelect from "../../form/ReactSelect";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

import { changeForm } from "../../../../redux/actions/appActions"

import update from "immutability-helper";


class GenerationForm extends Component {
    renderColors = ({ fields, meta: { error, submitFailed } }) => {
        let typeOptions = [
            {
                value: "step",
                name: "Step"
            },
            {
                value: "range",
                name: "Range"
            },
            {
                value: "random",
                name: "Random"
            }

        ]

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

        let stepDirection = [
            {
                value: "backward",
                name: "Backward"
            },
            {
                value: "forward",
                name: "Forward"
            }
        ]

        let rangeBehavior = [
            {
                value: "single",
                name: "Single"
            },
            {
                value: "loop",
                name: "Loop"
            },
            {
                value: "bounce",
                name: "Bounce"
            }
        ]

        let parameterOptions = [
            {
                value: "math",
                label: "Math"
            },
            {
                value: "frequency",
                label: "Frequency"
            },
            {
                value: "step",
                label: "Step"
            },
            {
                value: "rotateSpeed",
                label: "Rotation"
            },
            {
                value: "boldRate",
                label: "Boldness"
            },
            {
                value: "friction",
                label: "Friction"
            },
            {
                value: "rotatePointSpeed",
                label: "Point rotation speed"
            },
        ]

        let finalshape
        if(this.props.shape.newShape && this.props.shape.newShape.defaultViz) {
            finalshape = this.props.shape.newShape.defaultViz.shape
        } else {
            if(this.props.shape.currentShape && this.props.shape.currentShape.defaultViz) {
                finalshape = this.props.shape.currentShape.defaultViz.shape
            }
        }



        return (
            <ul className="colors-container">

                {fields.map((parameter, index) => {

                    let currentParameter = {}

                    if (this.props.stateForm
                        && this.props.stateForm.generationForm
                        && this.props.stateForm.generationForm.values
                        && this.props.stateForm.generationForm.values.parameters[index]
                    ) {
                        currentParameter = this.props.stateForm.generationForm.values.parameters[index]
                    }

                    // this.props.changeForm("generationForm", "parameters", [
                    //     ...this.props.stateForm.generationForm.values.parameters,
                    //     {
                    //         ...this.props.stateForm.generationForm.values.parameters[index],
                    //         from: 1
                    //     }
                    // ])


                    return (
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
                            <h4>Parameter #{index + 1}</h4>

                            <Field
                                name={`${parameter}.delayIterations`}
                                component={Input}
                                title="Delay iterations" placeholder="Delay iterations"
                            />

                            {this.props.stateForm.generationForm && this.props.stateForm.generationForm.values && this.props.stateForm.generationForm.values.iterations &&  <Field
                                name={`${parameter}.delayIterations`}
                                component={Slider}
                                label="Delay iterations"
                                resetValue={1000}
                                sliderMax={this.props.stateForm.generationForm.values.iterations}
                                labelStepSize={this.props.stateForm.generationForm.values.iterations / 5}
                                incrementStep={1}
                                stepSize={1}
                            />}
                           

                            <Field
                                name={`${parameter}.type`}
                                component={TabGroup}
                                className="type-tabs"
                                tabOptions={typeOptions}
                                label="Type"
                            />

                            <Field
                                name={`${parameter}.changeParameter`}
                                options={parameterOptions}
                                component={ReactSelect}
                                label="Select parameter"
                                onChange={(data) => {
                                    if(this.props.stateForm.generationForm) {
                                        let newParameters = update(this.props.stateForm.generationForm.values.parameters, {
                                            $splice: [[index, 1, {
                                                ...this.props.stateForm.generationForm.values.parameters[index],
                                                from: finalshape[data.value],
                                                to: finalshape[data.value] + 0.5
                                            }]]
                                        });
    
                                        this.props.changeForm("generationForm", "parameters", newParameters)
                                    }
                                }}
                            />

                            {currentParameter && currentParameter.changeParameter
                                && (currentParameter.changeParameter.value == "frequency"
                                    || currentParameter.changeParameter.value == "step"
                                    || currentParameter.changeParameter.value == "rotateSpeed"
                                    || currentParameter.changeParameter.value == "boldRate"
                                    || currentParameter.changeParameter.value == "friction"
                                    || currentParameter.changeParameter.value == "rotatePointSpeed") && (
                                    <div>
                                        {currentParameter && currentParameter.type
                                            && (currentParameter.type == "step"
                                                ) && (
                                                <div>
                                                    <Field
                                                        name={`${parameter}.stepAmount`}
                                                        component={Input}
                                                        title="Step amount" placeholder="Step Amount"
                                                    />
                                                    <Field
                                                        name={`${parameter}.stepDirection`}
                                                        component={TabGroup}
                                                        className="stepDirection-tabs"
                                                        tabOptions={stepDirection}
                                                        label="Step direction"
                                                    />
                                                </div>
                                            )}

                                        {currentParameter && currentParameter.type && (currentParameter.type == "range" || currentParameter.type == "random") && (
                                            <div>
                                                <div>

                                                    <Field
                                                        name={`${parameter}.from`}
                                                        component={Input}
                                                        title="From" placeholder="From"
                                                    />
                                                    <Field
                                                        name={`${parameter}.to`}
                                                        component={Input}
                                                        title="To" placeholder="To"
                                                    />

                                                    <Field
                                                        name={`${parameter}.rangeIterations`}
                                                        component={Input}
                                                        title="Range iterations" placeholder="Range iterations"
                                                    />
                                                    <Field
                                                        name={`${parameter}.rangeIterations`}
                                                        component={Slider}
                                                        label="Range iterations"
                                                        resetValue={1000}
                                                        sliderMax={this.props.stateForm.generationForm.values.iterations}
                                                        labelStepSize={this.props.stateForm.generationForm.values.iterations / 5}
                                                        incrementStep={1}
                                                        stepSize={1}
                                                    />
                                                    <Field
                                                        name={`${parameter}.rangeBehavior`}
                                                        component={TabGroup}
                                                        className="rangeBehavior-tabs"
                                                        tabOptions={rangeBehavior}
                                                        label="Range behavior"
                                                    />
                                                </div>
                                            </div>

                                        )}

                                    </div>
                                )}

                            {currentParameter && currentParameter.changeParameter && currentParameter.changeParameter.value == "math" && (
                                <Field
                                    name={`${parameter}.math`}
                                    component={TabGroup}
                                    tabOptions={mathTabOptions}
                                    label="Algorithm math"
                                />
                            )}



                            {/* {this.props.fields.changeParameter == "math" && (
                           <Field
                                name={`${parameter}.math`}
                                component={TabGroup}
                                tabOptions={mathTabOptions}
                                label="Algorithm math"
                            />
                        )} */}



                        </li>
                    )
                })}

                <li className="color-container">

                    <Button
                        className={"main-button add-color"}
                        onClick={() => fields.push({
                            type: "step",
                            math: this.props.initialValues && this.props.initialValues.math,
                            stepAmount: 0.1,
                        })}
                        text="Add parameter"
                        icon="plus"
                        large="true"
                    />
                </li>
            </ul>
        )
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

                <div className="form-horizontal">
                    <Field
                        name="iterations"
                        component={Input}
                        title="Iterations" placeholder="Iterations"
                    />

                    <Field
                        name="iterationGap"
                        component={Input}
                        title="Iteration gap" placeholder="Iteration gap"
                    />
                </div>
                

                <FieldArray name="parameters" component={this.renderColors} />

                {this.props.user && <Button
                    className={"control button-update main-button "}
                    loading={this.props.loading}
                    type="submit"
                    text="Generate"
                    large="true"
                />}


                {/* {!this.props.app.iframe && <div>
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



                    

                </div>} */}





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

GenerationForm = reduxForm({
    form: 'generationForm',
    validate
})(GenerationForm);

const mapStateToProps = state => ({
    user: state.app.user,
    app: state.app,
    stateForm: state.form,
    shape: state.shape
});

export default connect(mapStateToProps, {
    changeForm
})(GenerationForm);

