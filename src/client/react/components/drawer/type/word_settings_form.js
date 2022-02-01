import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";

import Block from "../../block"


import {
    hideDrawer,
} from "../../../../redux/actions/appActions"


import {
    createWord,
    deleteWord,
    convertToPositions
} from "../../../../redux/actions/wordsActions"

class WordSettingsForm extends Component {
    
    state = {
        loading: false
    }

    renderBlock(i) {
        return(
            <div key={i} className="single-block"><Block position={i}/></div>
        )
    }

    renderBlocks() {
        let blocksCount = 200

        let blocks = []

        for (var i = 1; i < blocksCount; i++) {
            blocks.push(this.renderBlock(i))
        } 

        return(<div className="blocks-container">
            {blocks}
        </div>)
    }

	render() {
        const { handleSubmit } = this.props;
        
        let sortByOptions = [
			{
				value: "position",
				name: "Position"
			},
			{
				value: "h",
				name: "H"
			},
			{
				value: "s",
				name: "S"
			},
			{
				value: "b",
				name: "B"
			},
		]

        let sortByDirectionOptions = [
			{
				value: "desc",
				name: "Desc"
			},
			{
				value: "asc",
				name: "Asc"
			},
		]


		return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="title"
                    component={Input}
                    title="Title" placeholder="Title"
                />

                <Field
                    name="shapeId"
                    component={Input}
                    title="Shape ID" placeholder="Shape ID"
                />

                <Field
                    name="audioUrl"
                    component={Input}
                    title="Audio URL" placeholder="Audio URL"
                />

                <Field
                    name="sortBy"
                    component={TabGroup}
                    tabOptions={sortByOptions}
                    label="Sort by:"
                />

                <Field
                    name="sortByDirection"
                    component={TabGroup}
                    tabOptions={sortByDirectionOptions}
                    label="Sort by:"
                />   

                     

                {this.renderBlocks()}

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.props.convertToPositions(this.props.word, this.props.sortedBlocks)
                    }}
                        text="Convert To Positions"
                    large="true"
                />      
               

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {

                        let newWord = {
                            ...this.props.word,
                            metadata: {
                                ...this.props.word.metadata,
                                title: this.props.word.metadata.title + " copy"
                                // createdAt: new Date()
                            },
                            blocks: this.props.sortedBlocks
                        }
                        this.setState({
                            loading: true
                        })
                            this.props.createWord(newWord, (word) => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/?word="+ word._id);
                        })
                    }}
                        text="Duplicate"
                    large="true"
                />


                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.setState({
                            loading: true
                        })
                           
                            this.props.deleteWord(this.props.word._id, () => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/");
                        })
                    }}
                        text="Delete"
                    large="true"
                />

               
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

WordSettingsForm = reduxForm({
    form: 'wordSettings',
    validate
})(WordSettingsForm);

const mapStateToProps = state => ({
    user: state.app.user,
    word: state.app.activeWord,
    sortedBlocks: state.app.sortedBlocks
});

export default connect(mapStateToProps, {
    deleteWord,
    hideDrawer,
    createWord,
    convertToPositions,
    convertToPositions
})(withRouter(WordSettingsForm));

  