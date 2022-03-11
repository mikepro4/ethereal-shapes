import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster, Switch } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"

import VizSettingsForm from "./viz_settings_form"

import {
    updateShape,
    loadShape,
    loadNewShape,
    createShape
} from "../../../../redux/actions/shapeActions"

import {
    updateNFTShape
} from "../../../../redux/actions/nftActions"


import {
    demoOn,
    demoOff,
    setTouchZones,
    setDownloadSVG,
    showDrawer
} from "../../../../redux/actions/appActions"

class VizSettings extends Component {

    state = {
        loading: false
    }

    handleFormSubmit(data) {
        console.log(data)

        this.setState({
            loading: true
        })

        this.props.updateShape(this.props.shape, data, () => {
            this.props.hideDrawer()
            this.setState({
                loading: false
            })

            this.props.loadShape(this.getQueryParams().shape, (data) => {
                console.log(data)
            })
        })
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    saveAsPNG = () => {
        var canvas = document.getElementById("viz");
        var dataURL = canvas.toDataURL("image/png");
        var newTab = window.open('about:blank', 'image from canvas');
        newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

    }

    handleSwitchChange = (data) => {

        if (this.props.app.demoMode) {
            this.props.demoOff()
        } else {
            this.props.demoOn()

        }
    }

    renderDemoSwitch = () => {

        return (
            <div>
                <Switch
                    checked={this.props.app.demoMode}
                    onChange={this.handleSwitchChange}
                    label="Demo mode"
                />
            </div>
        )
    }

    handleSwitchTouchZonesChange = (data) => {

        if (this.props.app.touchZones) {
            this.props.setTouchZones(false)
        } else {
            this.props.setTouchZones(true)

        }
    }

    renderTouchZonesSwitch = () => {

        return (
            <div>
                <Switch
                    checked={this.props.app.touchZones}
                    onChange={this.handleSwitchTouchZonesChange}
                    label="Show touch zones"
                />
            </div>
        )
    }


    render() {
        let shape = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.shape : this.props.shape.defaultViz.shape
        let point = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.point : this.props.shape.defaultViz.point
        let overlay = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.overlay : this.props.shape.defaultViz.overlay
        let colors = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.colors : this.props.shape.defaultViz.colors
        return (
            <div className={"app-drawer-content-container standard-drawer viz-settings-drawer theme-" + this.props.theme}>

                <div className={"details-container theme-" + this.props.theme}>
                    <div className="drawer-header">

                        <VizSettingsForm
                            enableReinitialize="true"
                            initialValues={
                                {
                                    title: this.props.shape.metadata.title,
                                    shape: shape,
                                    point: point,
                                    overlay: overlay,
                                    colors: colors,
                                    main: this.props.shape.metadata.main
                                }
                            }
                            loading={this.state.loading}
                            onSubmit={this.handleFormSubmit.bind(this)}
                            theme={this.props.theme}
                            onChange={values => {
                                this.props.loadNewShape({
                                    defaultViz: {
                                        shape: values.shape,
                                        point: values.point,
                                        overlay: values.overlay,
                                        colors: values.colors
                                    }
                                })
                            }}
                        />

                    </div>

                    {!this.props.app.iframe && <div>
                        {this.props.user && <Button
                            className={"control button-update main-button theme-" + this.props.theme}
                            loading={this.state.loading}
                            onClick={() => {

                                this.setState({
                                    loading: true
                                })
                                let user

                                if (this.props.user && this.props.user._id) {
                                    user = this.props.user._id
                                } else {
                                    user = "anon"
                                }
                                this.props.createShape({
                                    metadata: {
                                        title: this.props.shape.metadata.title,
                                        createdBy: user
                                    },
                                    defaultViz: {
                                        shape: shape,
                                        point: point,
                                        overlay: overlay,
                                        colors: colors
                                    }
                                }, (data) => {
                                    console.log(data._id)
                                    this.props.updateNFTShape(data._id, this.getQueryParams().id, () => {
                                        this.props.loadShape(data._id)
                                    })
                                    // this.props.history.push("/?shape="+data._id)
                                    this.props.hideDrawer()
                                    this.setState({
                                        loading: false
                                    })
                                })
                            }
                            }
                        >Save new shape</Button>}



                        <Button
                            className={"control button-saveas main-button theme-" + this.props.theme}
                            onClick={() => this.saveAsPNG()}>Save as PNG</Button>

                        <Button
                            className={"control button-saveas main-button theme-" + this.props.theme}
                            onClick={() => this.props.setDownloadSVG(true)}>Save as SVG</Button>

                        <Button
                            className={"control button-saveas main-button theme-" + this.props.theme}
                            onClick={() => this.props.showDrawer("generation")}>Show generator</Button>

                        <div className="demo-switch-container">
                            {this.renderDemoSwitch()}
                        </div>
                    </div>}

                    {this.renderTouchZonesSwitch()}







                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        shape: state.shape.currentShape,
        newShape: state.shape.newShape,
        nft: state.activeNFT.newNFT,
        app: state.app
    };
}

export default withRouter(connect(mapStateToProps, {
    updateShape,
    loadShape,
    loadNewShape,
    createShape,
    updateNFTShape,
    demoOn,
    demoOff,
    setTouchZones,
    setDownloadSVG,
    showDrawer
})(VizSettings));
