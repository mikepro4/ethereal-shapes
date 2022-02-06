import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash";
import update from "immutability-helper";
import { fromPairs } from "lodash";

import TouchZones from "./touchZones"

class Viz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            radius: 0,
            rotate: 0,
            rotate_speed: 0,
            friction: 0,
            speed: 0,
            step: 0,
            freq: 0,
            bold_rate: 0,
            math: "sin",
            pointSize: 0,
            pointOpacity: 0,
            x: 0,
            y: 0,
            paused: false,
            shape: {},
            pointCount: 0,
            timeInterval: null,
            totalPointCount: 1024,
            static: false,
            points: []
        };

        this.vizContainer = this.vizContainer = React.createRef();
        this.canvas = this.canvas = React.createRef();

    }

    componentDidMount = () => {
        console.log("VIZ MOUNT")
        this.loadShape()
        if (this.props.shape.defaultViz || this.props.defaultViz) {
            if (this.props.defaultViz && this.props.defaultViz.point && this.props.defaultViz.point.pointCount) {
                this.loadShape()
            }
        }
        window.addEventListener("resize", this.handleResize);

        // setTimeout(() => {
        //     if(!this.props.fullScreen && this.props.app.clientWidth > 1000) {
        //         this.setState({
        //             paused: true
        //         })
        //     }
        // }, 10000)
    }

    componentDidUpdate = (prevprops, prevState) => {

        if (this.props.shape.currentShape) {
            if (prevprops.shape.currentShape._id !== this.props.shape.currentShape._id) {
                this.loadShape()
            }
        }

        if (!_.isEqual(prevprops.shape.newShape.defaultViz, this.props.shape.newShape.defaultViz)) {
            this.loadShape()

            if (prevprops.shape.newShape.defaultViz && this.props.shape.newShape.defaultViz) {
                if (!_.isEqual(prevprops.shape.newShape.defaultViz.colors, this.props.shape.newShape.defaultViz.colors)) {
                    this.updateColors()
                }
            }
        }


        if (prevState.pointCount !== this.state.pointCount) {
            this.generatePoints()
            setTimeout(() => {
                this.updateColors()
            }, 1)
        }

        let rect = this.vizContainer.current.getBoundingClientRect();

        if (this.props.defaultViz) {

            if (rect.y > this.props.app.clientHeight / 1.4) {
                if (!this.state.paused) {
                    this.setState({
                        paused: true
                    })
                }
            }

            if (rect.y < -250) {
                if (!this.state.paused) {
                    this.setState({
                        paused: true
                    })
                }
            }
            if (rect.y < this.props.app.clientHeight / 1.4 && rect.y > -249) {
                if (this.state.paused) {
                    this.setState({
                        paused: false
                    }, () => {
                        this.renderFrame(this.canvas.current.getContext('2d'), this.state.points)
                    })
                }
            }
        }

        if(this.props.app.pauseAnimation !== prevprops.app.pauseAnimation) {
            if(this.props.app.pauseAnimation) {
                this.setState({
                    paused: true
                })
            } else {
                this.setState({
                    paused: false
                }, () => {
                    this.renderFrame(this.canvas.current.getContext('2d'), this.state.points)
                })
            }
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.handleResize);
        window.cancelAnimationFrame(this.state.requestAnimationFrame);
        clearInterval(this.state.timeInterval);

        var id = window.requestAnimationFrame(function () { });
        while (id--) {
            window.cancelAnimationFrame(id);
        }
    }

    handleResize = () => {
        this.updateDimensions()
    }

    loadShape = () => {
        let pointCount

        if (this.props.pointCount) {
            pointCount = this.props.pointCount
        } else {
            if (this.getViz()) {
                pointCount = this.getViz().point.pointCount
            }
        }
        this.startViz()
        this.setState({
            pointCount: pointCount
        })
        this.updateColors()
    }

    startViz = () => {
        this.generatePoints()
        this.updateDimensions(this.updateViz)
    }

    updateViz = (callback) => {

        let finalViz = {}

        if (this.props.defaultViz) {
            finalViz = this.props.defaultViz
        } else {

            let vizSource

            if (this.props.shape.newShape.defaultViz) {
                vizSource = 'newShape'
            } else {
                vizSource = 'currentShape'
            }

            finalViz = this.props.shape[vizSource].defaultViz
        }

        this.updateVizState(finalViz)
    }

    updateVizState = (defaultViz) => {
        console.log(defaultViz)

        if(defaultViz) {
            const {
                rotateSpeed,
                friction,
                rotatePointSpeed,
                step,
                frequency,
                boldRate,
                math
            } = defaultViz.shape
    
            const {
                pointSize,
                pointOpacity,
                pointCount,
                pointColor
            } = defaultViz.point

            let finalPointSise

            if(this.props.highDensity) {
                finalPointSise = pointSize + 1.5
            } else {
                finalPointSise = pointSize
            }
    
            this.setState({
                rotate_speed: rotateSpeed * 0.1 + 0.001,
                friction: friction * 0.8 + 0.1,
                rotate_point_speed: rotatePointSpeed * 0.2 + 0.03,
                step: step * 0.5 + 0.0001,
                freq: frequency * 0.09 + 0.01,
                bold_rate: boldRate * 0.3 + 0.1,
                math: math,
                pointSize: finalPointSise,
                pointOpacity: pointOpacity,
                pointColor: "#ffffff",
                backgroundColor: "",
                backgroundEnabled: false,
                backgroundOpacity: 1
            }, () => {
                if (!this.state.requestAnimationFrame) {
                    this.paint()
                    console.log("Initial state: ", this.state)
                }
            })
        }
    }

    updateDimensions = (callback) => {
        if(this.props.highDensity) {
            let rect = this.vizContainer.current.getBoundingClientRect();

            let scale = 1
    
            if (this.props.defaultViz) {
                scale = 0.8
            }
    
            let scaleValue
            if (this.props.app.clientWidth > 1000) {
                if(this.props.fullScreen == true) {
                    scaleValue = (rect.width * 2) / 10 * scale;
                } else {
                    scaleValue = (rect.width * 2) / 4 * scale;
                }
            } else {
                scaleValue = (rect.width * 2) / 4 * scale;
            }
    
            if (this.props.app.clientWidth > 1000) {
                this.setState({
                    width: rect.width * 4,
                    height: rect.height * 4,
                    radius: scaleValue*2,
                    x: (rect.width * 4) / 2,
                    y: (rect.height * 4) / 2
                }, () => {
                    if (callback) {
                        callback()
                    }
                })
            } else {
                this.setState({
                    width: rect.width * 4,
                    height: rect.height * 4,
                    radius: scaleValue*2,
                    x: (rect.width * 4) / 2,
                    y: (rect.height * 4) / 2
                }, () => {
                    if (callback) {
                        callback()
                    }
                })
            }
        } else {
            let rect = this.vizContainer.current.getBoundingClientRect();

            let scale = 1
    
            if (this.props.defaultViz) {
                scale = 0.8
            }
    
            let scaleValue
            if (this.props.app.clientWidth > 1000) {
                if(this.props.fullScreen == true) {
                    scaleValue = (rect.width * 2) / 10 * scale;
                } else {
                    scaleValue = (rect.width * 2) / 4 * scale;
                }
            } else {
                scaleValue = (rect.width * 2) / 4 * scale;
            }
    
            if (this.props.app.clientWidth > 1000) {
                this.setState({
                    width: rect.width * 2,
                    height: rect.height * 2,
                    radius: scaleValue,
                    x: (rect.width * 2) / 2,
                    y: (rect.height * 2) / 2
                }, () => {
                    if (callback) {
                        callback()
                    }
                })
            } else {
                this.setState({
                    width: rect.width * 2,
                    height: rect.height * 2,
                    radius: scaleValue,
                    x: (rect.width * 2) / 2,
                    y: (rect.height * 2) / 2
                }, () => {
                    if (callback) {
                        callback()
                    }
                })
            }
        }
        
    }

    paint = () => {
        let canvas = this.canvas;
        let ctx = canvas.current.getContext('2d')
        ctx.width = this.state.width;
        ctx.height = this.state.height;
        
        this.update();
    }

    generatePoints = () => {
        let points = []
        for (var i = 0; i < this.state.pointCount; i++) {
            var pt = this.createPoint(
                Math.random(1) * this.state.width,
                Math.random(1) * this.state.height,
                i
            );
            points.push(pt)
        }

        this.setState({
            points: points
        })

        return points
    }

    createPoint = (x, y, i) => {

        let finalHidden = false

        if (i < Math.floor(this.state.pointCount)) {
            finalHidden = false
        } else {
            finalHidden = true
        }

        let point = {
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            hidden: finalHidden,
            color: "#000000"
        }
        return point
    }

    update = () => {
        let points = this.generatePoints()
        this.renderFrame(this.canvas.current.getContext('2d'), points)
    }

    renderOnce = (ctx) => {

        let points = this.state.points
        if (points.length > 0) {
            ctx.clearRect(0, 0, this.state.width, this.state.height);

            this.setState({
                rotate: this.state.rotate + this.state.rotate_speed
            })

            // ctx.globalCompositeOperation = 'destination-over'
            // ctx.fillStyle = "black";
            // ctx.fillRect(0, 0, ctx.width, ctx.height)

            let freqData = []
            let soundModifier = 1

            if (this.props.player.analyser) {
                freqData = new Uint8Array(this.props.player.analyser.frequencyBinCount)
                this.props.player.analyser.getByteFrequencyData(freqData)
            }

            ctx.fillStyle = "rgba(0,0, 0, 255)";
            ctx.fillRect(0, 0, ctx.width * 2, ctx.height * 2);


            for (let i = 0; i < points.length; i++) {

                if (this.props.player.analyser && soundModifier) {
                    soundModifier = freqData[this.getPointIterator(i)] / 1000

                    if (soundModifier == 0) {
                        soundModifier = 1
                    }
                }

                let point = points[i];

                if (point) {
                    let t_radius = this.calculateRadius(soundModifier, i)

                    let tx = this.state.x + Math.cos(this.state.rotate + this.state.step * i + soundModifier) * t_radius;
                    let ty = this.state.y + Math.sin(this.state.rotate + this.state.step * i + soundModifier) * t_radius;

                    point.vx += (tx - point.x) * this.state.rotate_point_speed;
                    point.vy += (ty - point.y) * this.state.rotate_point_speed;

                    point.x += point.vx;
                    point.y += point.vy;

                    point.vx *= this.state.friction;
                    point.vy *= this.state.friction;

                   

                    if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {

                        if (point.hidden) {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = `rgba(
                                ${this.hexToRgb(this.state.pointColor).r},
                                ${this.hexToRgb(this.state.pointColor).g},
                                ${this.hexToRgb(this.state.pointColor).b},
                                0}
                            )`;
                            ctx.fill();
                        } else {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, this.state.pointSize, 0, 2 * Math.PI);
                            ctx.fillStyle = `rgba(
                                ${this.hexToRgb(point.color).r},
                                ${this.hexToRgb(point.color).g},
                                ${this.hexToRgb(point.color).b},
                                ${this.getPointOpacity(freqData[this.getPointIterator(i)], point)}
                            )`;
                            ctx.fill();
                        }

                    }

                   
                }


            }
        }

    }

    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    calculateRadius = (soundModifier, i) => {
        let radius = Math[this.state.math](this.state.rotate + this.state.freq * i) * this.state.radius * this.state.bold_rate +
            this.state.radius;

        return radius
    }

    getPointIterator = (i) => {
        if (i <= this.state.totalPointCount) {
            return i
        } else {
            return i - this.state.totalPointCount
        }
    }

    getPointOpacity = (value, point) => {
        if (value > 0) {
            return value / 256 * 100
        } else {
            return point.opacity / 50
        }
    }

    renderFrame = (ctx, points) => {
        if (!this.state.paused) {
            this.renderOnce(ctx, points);
            this.setState({
                requestAnimationFrame: window.requestAnimationFrame(() => this.renderFrame(ctx, points))
            });
        } else {
            this.setState({
                requestAnimationFrame: null
            });
        }
    }

    renderOverlay = () => {
        let vizSource
        let finalViz
        let finalColor
        let finalOpacity
        let finalBlur



        if (this.props.defaultViz) {
            finalViz = this.props.defaultViz
        } else {
            if (this.props.shape.newShape.defaultViz) {
                vizSource = 'newShape'
            } else {
                vizSource = 'currentShape'
            }
            finalViz = this.props.shape[vizSource].defaultViz
        }

        if (finalViz && finalViz.overlay) {
            const {
                visible,
                blur,
                color,
                colorOpacity,
            } = finalViz.overlay
            if (visible) {
                finalBlur = blur
                finalColor = color
                finalOpacity = colorOpacity
            } else {
                finalBlur = 0
                finalColor = "#000000"
                finalOpacity = 0
            }

        } else {
            finalBlur = 0,
                finalColor = "#000000"
            finalOpacity = 0
        }

        // console.log(`rgba(${this.hexToRgb(finalColor).r}, ${this.hexToRgb(finalColor).g}, ${this.hexToRgb(finalColor).b}, 0.6)`)
        return (
            <div>

                <div className="goo"></div>
                <div
                    className="glass"
                    style={{
                        background: `rgba(${this.hexToRgb(finalColor).r}, ${this.hexToRgb(finalColor).g}, ${this.hexToRgb(finalColor).b}, ${finalOpacity})`,
                        backdropFilter: "blur(" + finalBlur + "px)",
                        WebkitBackdropFilter: "blur(" + finalBlur + "px)",
                    }}
                >

                </div>
            </div>
        )

    }

    getViz = () => {
        let finalViz
        let vizSource

        if (this.props.defaultViz) {
            finalViz = this.props.defaultViz
        } else {
            if (this.props.shape.newShape.defaultViz) {
                vizSource = 'newShape'
            } else {
                vizSource = 'currentShape'
            }
            finalViz = this.props.shape[vizSource].defaultViz
        }
        return finalViz
    }

    updateColors = () => {
        if (this.getViz()) {

            let colors = this.getViz().colors
            let pointCount = this.state.pointCount
            let ranges = []

            if (colors.length > 0) {
                let newRanges = _.map(colors, (point, i) => {
                    return ({
                        count: point.amount * pointCount / 100
                    })
                })

                let points = []

                _.map(newRanges, (range, colorCount) => {
                    let filteredPoints = _.filter(this.state.points, (point, i) => {
                        if (i < range.count) {
                            return true
                        }
                    })
                    let coloredPoints = _.map(filteredPoints, (point, i) => {
                        if (i < range.count) {
                            return ({
                                ...point,
                                color: colors[colorCount].hex,
                                opacity: colors[colorCount].opacity
                            })
                        }
                    })
                    points = _.concat(points, coloredPoints)
                    return
                })

                let difference = this.state.pointCount - points.length

                let filteredDifference = _.filter(this.state.points, (point, i) => {
                    if (i >= (this.state.pointCount - difference)) {
                        return true
                    }
                })

                let remainingPoints = _.map(filteredDifference, (point, i) => {
                    return ({
                        ...point,
                        hidden: true
                    })
                })
                points = _.concat(points, remainingPoints)

                this.setState({
                    points: points
                })

                if (points.length == this.state.totalPointCount) {
                    this.setState({
                        points: points
                    })
                } else {

                }
            } else {
                let allWhitePoints = _.map(this.state.points, (point, i) => {
                    return ({
                        ...point,
                        color: "#ffffff",
                        opacity: 100
                    })
                })

                this.setState({
                    points: allWhitePoints
                })
            }
        }

    }

    renderTouchZones = () => {

        let TouchZones = [
            {

            }
        ]

        

    }


    render() {

        let finalViz
        let vizSource

        if (this.props.defaultViz) {
            finalViz = this.props.defaultViz
        } else {
            if (this.props.shape.newShape.defaultViz) {
                vizSource = 'newShape'
            } else {
                vizSource = 'currentShape'
            }
            finalViz = this.props.shape[vizSource].defaultViz
        }

        return (
            <div
                className={classNames({ "full": this.props.app.fullScreen }, "viz-container")}
                ref={this.vizContainer}
                style={{
                    backgroundColor: finalViz && finalViz.shape && finalViz.shape.backgroundColor
                }}
            >
                <TouchZones/>
                <canvas
                    ref={this.canvas}
                    className="viz"
                    id="viz"
                    width={this.state.width}
                    height={this.state.height}
                />
                <div id="centered" style={{ display: "none" }}></div>
                {/* {this.state.visible ? <div>visible</div> : <div>hidden</div>} */}
                {this.renderOverlay()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        app: state.app,
        shape: state.shape,
        player: state.player
    };
}

export default connect(mapStateToProps, {

})(Viz);
