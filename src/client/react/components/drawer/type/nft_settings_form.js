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
    createNFT,
    deleteNFT,
} from "../../../../redux/actions/nftActions"

class NFTSettingsForm extends Component {
    
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

    renderButton() {
        if(this.props.nft && this.props.nft.newNFT) {
            return(<Button
                className={"submit-button theme-" + this.props.theme}
                loading={this.state.loading}
                onClick={() => {

                    let newNFT = {
                        ...this.props.nft,
                        metadata: {
                            ...this.props.nft.metadata,
                            title: this.props.nft.metadata.title + " copy"
                            // createdAt: new Date()
                        },
                        blocks: this.props.sortedBlocks
                    }

                    console.log(newNFT)
                    this.setState({
                        loading: true
                    })
                    // this.props.createNFT(newNFT, (nft) => {
                    //     this.props.hideDrawer()
                    //     this.setState({
                    //         loading: false
                    //     })

                    //     this.props.history.push("/?nft="+ nft._id);
                    // })
                }}
                    text="Create"
                large="true"
            />)
        } else {
            return(<div>
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

                        let newNFT = {
                            ...this.props.nft,
                            metadata: {
                                ...this.props.nft.metadata,
                                title: this.props.nft.metadata.title + " copy"
                                // createdAt: new Date()
                            },
                            blocks: this.props.sortedBlocks
                        }
                        this.setState({
                            loading: true
                        })
                            this.props.createNFT(newNFT, (nft) => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/?nft="+ nft._id);
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
                           
                            this.props.deleteNFT(this.props.nft._id, () => {
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
            </div>)

        }
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
                    name="nft.name"
                    component={Input}
                    title="Name" placeholder="Name"
                />

                <Field
                    name="nft.price"
                    component={Input}
                    title="Price" placeholder="Price"
                />

                <Field
                    name="metadata.shapeId"
                    component={Input}
                    title="Shape ID" placeholder="Shape ID"
                />

                <Field
                    name="metadata.audioUrl"
                    component={Input}
                    title="Audio URL" placeholder="Audio URL"
                />

                <Field
                    name="nft.description"
                    component={Textarea}
                    title="Name" placeholder="Description"
                />


                {/* {this.renderButton()} */}

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.props.createNFT( 
                            this.props.nft.newNFT
                        , () => {
                            this.props.history.push("/");
                        });
                    }}
                    text="Create"
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

NFTSettingsForm = reduxForm({
    form: 'nftSettings',
    validate
})(NFTSettingsForm);

const mapStateToProps = state => ({
    user: state.app.user,
    nft: state.activeNFT,
});

export default connect(mapStateToProps, {
    deleteNFT,
    hideDrawer,
    createNFT,
})(withRouter(NFTSettingsForm));

  