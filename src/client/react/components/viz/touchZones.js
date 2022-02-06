import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import keydown from "react-keydown";
import moment from "moment"
import update from "immutability-helper";

import qs from "qs";
import * as _ from "lodash"

import {
    createShape, loadShape, searchShapes, deleteShape, updateShape, loadNewShape, clearNewShape, getMainShape
} from "../../../redux/actions/shapeActions"

import Viz from "../../components/viz"

import SettingsIcon from "../../components/icons/settings"

import {
    showDrawer
} from '../../../redux/actions/appActions'


class TouchZones extends Component {

    state = {
        touched: false,
        timeInterval: null,
        time: 0,
        originalBoldRate: null,
        activeZone: null,
        startedIntervals: [],
        mathValues: ["sin", "cos", "tan", "atan", "log"]
    }

    componentDidMount() {
     
    }

    keyUp() {
        console.log("keyup")
    }

    componentDidUpdate(prevprops) {
       
    }

    componentWillUnmount() {
        this.props.clearNewShape()
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };


    renderHead = () => (
        <Helmet>
            <title>Design, Tech & Techno</title>
            <meta property="og:title" content="Homepage" />
        </Helmet>
    )

    handleZone1TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 1
            })
            this.startZone1TimeInterval()
        }
    }

    handleZone1TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone2TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 2
            })
            this.startZone2TimeInterval()
        }
    }

    handleZone2TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone4TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 4
            })
            this.startZone4TimeInterval()
        }
    }

    handleZone4TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone3TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 3
            })
            this.startZone3TimeInterval()
        }
    }

    handleZone3TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone6TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 6
            })
            this.startZone6TimeInterval()
        }
    }

    handleZone6TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone7TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 7
            })
            this.startZone7TimeInterval()
        }
    }

    handleZone7TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone8TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 8
            })
            this.startZone8TimeInterval()
        }
    }

    handleZone8TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    handleZone5TouchStart = (event) => {
        event.preventDefault()
        if (!this.state.touched) {
            console.log(event)
            this.setState({
                touched: true,
                activeZone: 5
            })
            this.startZone5TimeInterval()
        }
    }

    handleZone5TouchEnd = (event) => {
        event.preventDefault()
        clearInterval(this.state.timeInterval);

        this.setState({
            touched: false,
            time: 0,
            activeZone: null
        })
    }

    startZone5TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            boldRate: selectedShape.defaultViz.shape.boldRate + this.state.time / 10000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone6TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            boldRate: selectedShape.defaultViz.shape.boldRate - this.state.time / 10000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone3TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            step: selectedShape.defaultViz.shape.step + this.state.time / 10000000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone4TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            step: selectedShape.defaultViz.shape.step - this.state.time / 10000000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone1TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            frequency: selectedShape.defaultViz.shape.frequency + this.state.time / 1000000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone2TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            frequency: selectedShape.defaultViz.shape.frequency - this.state.time / 1000000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startZone7TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            rotateSpeed: selectedShape.defaultViz.shape.rotateSpeed + this.state.time / 100000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }
    startZone8TimeInterval() {
        clearInterval(this.state.timeInterval);

        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }
        this.setState({
            originalBoldRate: selectedShape.defaultViz.shape.boldRate
        })

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });

            //  let newShape = this.props.shape.currentShape.defaultViz.shape

            // console.log(selectedShape)
            if (selectedShape && selectedShape.defaultViz) {
                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            rotateSpeed: selectedShape.defaultViz.shape.rotateSpeed - this.state.time / 100000
                        }
                    }
                }
                this.props.loadNewShape(finalshape)
            }

        }, 1);

        this.setState({ timeInterval });
    }

    startDesktopZone8TimeInterval() {
        clearInterval(this.state.timeInterval);

        const timeInterval = setInterval(() => {
            this.setState({
                time: this.state.time + 100
            });


            this.updateProperty("boldRate", this.state.time / 100000)

        }, 1);

        this.setState({ timeInterval });
    }


    updateProperty(property, amount, destination, minValue, maxValue) {
        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }

        // console.log(selectedShape)
        if (selectedShape && selectedShape.defaultViz) {
            let finalshape

            if (!destination || destination == "shape") {
                finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            [property]: selectedShape.defaultViz.shape[property] + amount
                        }
                    }
                }
            }

            if (destination == "point") {
                let finalAmount
                let pointAmount = selectedShape.defaultViz.point[property] + amount

                if (maxValue) {
                    if (pointAmount < minValue) {
                        finalAmount = minValue
                    } else if (pointAmount > maxValue) {
                        finalAmount = maxValue
                    } else if (pointAmount >= minValue && pointAmount <= maxValue) {
                        finalAmount = pointAmount
                    }
                } else {
                    if (pointAmount < 0) {
                        finalAmount = 0
                    } else {
                        finalAmount = pointAmount
                    }
                }

                finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        point: {
                            ...selectedShape.defaultViz.point,
                            [property]: finalAmount
                        }
                    }
                }
            }

            this.props.loadNewShape(finalshape)
        }
    }

    updateMath(direction) {
        let selectedShape

        if (this.props.shape.newShape.defaultViz) {
            selectedShape = this.props.shape.newShape
        } else {
            selectedShape = this.props.shape.currentShape
        }

        if (selectedShape && selectedShape.defaultViz) {

            let indexOfCurrent = _.indexOf(this.state.mathValues, selectedShape.defaultViz.shape.math)
            let finalIndex

            if (direction == "next") {
                if ((indexOfCurrent + 1) > this.state.mathValues.length - 1) {
                    finalIndex = 0
                } else {
                    finalIndex = indexOfCurrent + 1
                }

                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            math: this.state.mathValues[finalIndex]
                        }
                    }
                }

                this.props.loadNewShape(finalshape)
            } else if (direction == "prev") {

                if ((indexOfCurrent - 1) < 0) {
                    finalIndex = this.state.mathValues.length - 1
                } else {
                    finalIndex = indexOfCurrent - 1
                }

                let finalshape = {
                    ...selectedShape,
                    defaultViz: {
                        ...selectedShape.defaultViz,
                        shape: {
                            ...selectedShape.defaultViz.shape,
                            math: this.state.mathValues[finalIndex]
                        }
                    }
                }

                this.props.loadNewShape(finalshape)
            }

        }


    }

    checkIntervals() {

        _.map(this.props.app.activeKeys, (key) => {

            let startedItervalKey = _.includes(this.state.startedIntervals, key);
            if (!startedItervalKey) {
                this.setState({
                    startedIntervals: _.union(this.state.startedIntervals, [key])
                }, () => {
                    this.launchInterval(key, "start")
                })
            }
        })

        _.map(this.state.startedIntervals, (key) => {

            let startedItervalKey = _.includes(this.props.app.activeKeys, key);

            if (!startedItervalKey) {
                this.launchInterval(key, "stop")

                this.setState({
                    startedIntervals: _.pull(this.state.startedIntervals, key)
                })
            }
        })


    }

    runPropertyChange(includesShift, action, direction, property, standardAmount, extendedAmount, destination, minValue, maxValue) {
        if (action == "start") {
            if (direction == "more") {
                clearInterval(this.state[property + "More"]);
            }

            if (direction == "less") {
                clearInterval(this.state[property + "Less"]);
            }

            let amount

            if (includesShift) {
                amount = extendedAmount
            } else {
                amount = standardAmount
            }

            if (direction == "less") {
                amount = amount * -1
            }

            if (direction == "more") {
                const intervalMore = setInterval(() => {
                    this.updateProperty(property, amount, destination, minValue, maxValue)
                }, 1);

                this.setState({
                    [property + "More"]: intervalMore
                });
            }

            if (direction == "less") {
                const intervalLess = setInterval(() => {
                    this.updateProperty(property, amount, destination, minValue, maxValue)
                }, 1);

                this.setState({
                    [property + "Less"]: intervalLess
                });
            }

        } else if (action == "stop") {
            let timeoutValue = 50

            if (includesShift) {
                timeoutValue = 100
            }

            if (direction == "more") {
                setTimeout(() => {
                    clearInterval(this.state[property + "More"]);
                }, timeoutValue)
            }

            if (direction == "less") {
                setTimeout(() => {
                    clearInterval(this.state[property + "Less"]);
                }, timeoutValue)
            }

        }
    }

    render() {

        return (
            <div className="touch-zones">
                <div className="touch-zones-row touch-zones-row-1">

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 2
                        }, "touch-zone touch-zone-2")}
                        onTouchStart={(event) => this.handleZone2TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone2TouchEnd(event)}
                    ></div>

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 1
                        }, "touch-zone touch-zone-1")}
                        onTouchStart={(event) => this.handleZone1TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone1TouchEnd(event)}
                    ></div>

                </div>

                <div className="touch-zones-row touch-zones-row-2">

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 4
                        }, "touch-zone touch-zone-4")}
                        onTouchStart={(event) => this.handleZone4TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone4TouchEnd(event)}
                    ></div>

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 3
                        }, "touch-zone touch-zone-3")}
                        onTouchStart={(event) => this.handleZone3TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone3TouchEnd(event)}
                    ></div>
                </div>

                <div className="touch-zones-row touch-zones-row-3">

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 8
                        }, "touch-zone touch-zone-8")}
                        onTouchStart={(event) => this.handleZone8TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone8TouchEnd(event)}
                    ></div>

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 7
                        }, "touch-zone touch-zone-7")}
                        onTouchStart={(event) => this.handleZone7TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone7TouchEnd(event)}
                    ></div>
                </div>

                <div className="touch-zones-row touch-zones-row-3">
                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 6
                        }, "touch-zone touch-zone-6")}
                        onTouchStart={(event) => this.handleZone6TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone6TouchEnd(event)}
                    ></div>

                    <div
                        className={classNames({
                            "touch-zone-active": this.state.activeZone == 5
                        }, "touch-zone touch-zone-5")}
                        onTouchStart={(event) => this.handleZone5TouchStart(event)}
                        onTouchEnd={(event) => this.handleZone5TouchEnd(event)}
                    ></div>
                </div>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        shape: state.shape,
        app: state.app
    };
}

export default connect(mapStateToProps, {
    createShape,
    loadShape,
    searchShapes,
    deleteShape,
    updateShape,
    showDrawer,
    loadNewShape,
    clearNewShape,
    getMainShape
})(TouchZones);
