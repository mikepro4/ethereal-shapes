import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector, change } from "redux-form";
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
import ReactSelectAsync from "../../form/ReactSelectAsync";

import Block from "../../block"


import {
    hideDrawer,
} from "../../../../redux/actions/appActions"

import {
    createShape,
} from "../../../../redux/actions/shapeActions"

import ipfsHttpClient from "ipfs-http-client";

import { Buffer } from 'buffer';

// var client = ipfsHttpClient('ipfs.infura.io:5001/api/v0', "", { protocol: "https"}) // leaving out the arguments will default to these values

var client = ipfsHttpClient({ host: 'ipfs.infura.io', port: '5001', 'api-path': '/api/v0/', protocol: "https" })


import {
    createNFT,
    deleteNFT,
    updateNFTImage,
    updateNFTShape,
    searchNFTs
} from "../../../../redux/actions/nftActions"

import {
    searchCollections
} from "../../../../redux/actions/collectionActions"

class NFTSettingsForm extends Component {

    state = {
        loading: false,
        fileUrl: ""
    }



    renderBlock(i) {
        return (
            <div key={i} className="single-block"><Block position={i} /></div>
        )
    }

    renderBlocks() {
        let blocksCount = 200

        let blocks = []

        for (var i = 1; i < blocksCount; i++) {
            blocks.push(this.renderBlock(i))
        }

        return (<div className="blocks-container">
            {blocks}
        </div>)
    }

    onChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        try {
            const added = await client.add(
                file, {
                progress: (prog) => console.log("received: ", prog)
            }
            )
            console.log(added)
            const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;
            console.log(url)
            this.props.updateNFTImage(url.toString())
            this.setState({
                fileUrl: url.toString()
            })
            this.props.dispatch(change('nftSettings', 'nft.fileUrl', url.toString()));
        } catch (error) {
            console.log("error: ", error);
        }
    }

    renderButton() {
        if (this.props.nft && this.props.nft.newNFT) {
            return (<Button
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
            return (<div>
                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />
                {this.props.location.pathname == "/nft" && <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {

                        let newNFT = {
                            ...this.props.nft,
                            nft: {
                                ...this.props.nft.name,
                                name: this.props.nft.metadata.title + " copy"
                                // createdAt: new Date()
                            }
                        }
                        this.setState({
                            loading: true
                        })
                        this.props.createNFT(newNFT, (nft) => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/?nft=" + nft._id);
                        })
                    }}
                    text="Duplicate"
                    large="true"
                />}



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

    getOptions = (input, callback) => {

        this.props.searchCollections(
            "",
            "",
            0,
            20,
            {
                collectionTitle: input
            },
            data => {
                console.log(data)
                callback(data.all.map(collection => ({
                    value: collection._id,
                    label: collection.metadata.title
                }))
                );
            }
        );
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
                    name="metadata.collection"
                    component={ReactSelectAsync}
                    loadOptions={(input, callback) => this.getOptions(input, callback)}
                    placeholder="Search collections"
                    ref="collection search"
                    label="Collection"
                />

                <Field
                    name="_id"
                    component={Input}
                    title="NFT ID" placeholder="NFT ID"
                />

                <Field
                    name="nft.name"
                    component={Input}
                    title="Name" placeholder="Name"
                />

                <div className="prompt">
                    <Field
                        name="metadata.prompt"
                        component={Textarea}
                        title="Prompt" placeholder="Prompt"
                    />
                </div>

                {/* <Field
                    name="nft.price"
                    component={Input}
                    title="Price" placeholder="Price"
                /> */}

                {/* <Field
                    name="nft.description"
                    component={Textarea}
                    title="Description" placeholder="Description"
                /> */}

                {/* <Field
                    name="metadata.collectionId"
                    component={Input}
                    title="Collection ID" placeholder="Collection ID"
                /> */}

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
                    name="nft.fileUrl"
                    component={Input}
                    title="File URL" placeholder="File URL"
                />

                {/* <Field
                    name="metadata.tokenId"
                    component={Input}
                    title="Token ID" placeholder="Token ID"
                />

                <Field
                    name="metadata.owner"
                    component={Input}
                    title="Owner" placeholder="Owner"
                />

                <Field
                    name="metadata.minted"
                    type="checkbox"
                    component={Checkbox}
                    label="Minted"
                    inline={true}
                /> */}

                <input
                    type="file"
                    name="Asset"
                    onChange={this.onChange}
                />
                {this.state.fileUrl && <img src={this.state.fileUrl}></img>}

                <Field
                    name="metadata.featured"
                    type="checkbox"
                    component={Checkbox}
                    label="Featured"
                    inline={true}
                />

                <Field
                    name="metadata.featuredOrder"
                    component={Input}
                    title="Featured Order" placeholder="Featured Order"
                />

                <Field
                    name="metadata.approved"
                    type="checkbox"
                    component={Checkbox}
                    label="Approved"
                    inline={true}
                />

                <Field
                    name="metadata.rejected"
                    type="checkbox"
                    component={Checkbox}
                    label="Rejected"
                    inline={true}
                />

                {/* {this.renderButton()} */}

                <Button
                    className={"submit-button main-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />

                {this.props.nft.newNFT._id == this.props.app.drawerData._id && <Button
                    className={"submit-button main-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {

                        this.props.createShape(this.props.shape.currentShape, (data) => {


                            let newNFT = {
                                ...this.props.app.drawerData,
                                metadata: {
                                    ...this.props.app.drawerData.metadata,
                                    owner: "",
                                    minted: false,
                                    featured: false,
                                    featuredOrder: 0,
                                    createdAt: new Date(),
                                    shapeId: data._id
                                },
                                nft: {
                                    ...this.props.app.drawerData.nft,
                                    name: this.props.app.drawerData.nft.name + " copy"
                                    // createdAt: new Date()
                                }
                            }
                            this.setState({
                                loading: true
                            })
                            this.props.createNFT(newNFT, (nft) => {
                                this.props.hideDrawer()
                                this.setState({
                                    loading: false
                                })

                                this.props.history.push("/nft?id=" + nft._id);
                            })
                        })


                    }}
                    text="Duplicate"
                    large="true"
                />}



                {this.props.nft.newNFT._id == this.props.app.drawerData._id && <Button
                    className={"submit-button main-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.setState({
                            loading: true
                        })

                        this.props.deleteNFT(this.props.nft.newNFT._id, () => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/");
                        })
                    }}
                    text="Delete"
                    large="true"
                />}

                {/* <Button
                    className={"submit-button control theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.props.createNFT( 
                            this.props.nft.newNFT
                        , (data) => {
                            this.props.history.push("/nft?id="+ data._id);
                            this.props.hideDrawer()
                        });
                    }}
                    text="Create"
                    large="true"
                /> */}


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
    shape: state.shape,
    app: state.app
});

export default connect(mapStateToProps, {
    deleteNFT,
    hideDrawer,
    createNFT,
    updateNFTImage,
    updateNFTShape,
    createShape,
    searchNFTs,
    searchCollections
})(withRouter(NFTSettingsForm));

