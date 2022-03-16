import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import { showDrawer } from "../../../redux/actions/appActions"

import {
    getNftBuckets
} from "../../../redux/actions/nftActions"

import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import ReactECharts from 'echarts-for-react';

class Properties extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buckets: null,
            activeProperty: {
                label: "Frequency",
                value: "metadata.defaultViz.shape.frequency"
            },
            properties: [
                {
                    label: "Frequency",
                    value: "metadata.defaultViz.shape.frequency"
                },
                {
                    label: "Step",
                    value: "metadata.defaultViz.shape.step"
                },
                {
                    label: "Rotation",
                    value: "metadata.defaultViz.shape.rotateSpeed"
                },
                {
                    label: "Friction",
                    value: "metadata.defaultViz.shape.friction"
                },
                {
                    label: "Boldness",
                    value: "metadata.defaultViz.shape.boldRate"
                },
                {
                    label: "Math",
                    value: "metadata.defaultViz.shape.math"
                },
                {
                    label: "Point speed",
                    value: "metadata.defaultViz.shape.rotatePointSpeed"
                }
            ]
        }
    }

    componentDidMount = () => {
        this.props.getNftBuckets(this.state.activeProperty.value, 10, (data) => {
            console.log(data)
            this.setState({
                buckets: data
            }, () => {
                this.updateChartOptions()
            })
        })
    }

    renderProperties = (properties) => {
        return (
            <ul className="properties-container">
                {this.state.properties.map((property, i) => {
                    return (
                        <li
                            key={property.value}
                            className={
                                classNames({
                                    "single-property": true,
                                    "active": property.value == this.state.activeProperty.value
                                })
                            }
                            onClick={() => {
                                this.setState({
                                    activeProperty: property
                                })
                            }}
                        >
                            <div className="label-container">
                                {property.label}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderChartHeader = () => {
        return (
            <div className="chart-header">
                <div className="header-left">
                    <div className="header-label">
                        Property
                    </div>

                    <div className="header-value">
                        {this.state.activeProperty.label}
                    </div>
                </div>

                <div className="header-left">
                </div>
            </div>
        )
    }

    updateChartOptions = () => {

        let nftCount = [
            [0, 0],
            [1, 2],
            [2, 4]
        ]

        let rarityCurve = [
            [0, 1.5],
            [1, 2],
            [2, 4]
        ]

        // let newnftCount = _.map( this.state.buckets, (bucket, i) => {
        //     return([bucket._id.max / bucket._id.min, bucket.count])
        // }

        this.setState({
            chartOptions: {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '4%',
                    top: "5%",
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: "#D6DFE4"
                        }
                    },
                    axisLabel: {
                        color: "#8A9BA9",
                        fontSize: "11px",
                        fontWeight: "500",
                        onZero: 0,
                        formatter: '{value}'
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: "#8A9BA9",
                            fontSize: "11px",
                            fontWeight: "500",
                            formatter: '{value}'
                        },
                        splitNumber: 3,
                        min: 0,
                        splitLine: {
                            show: false
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: "#8A9BA9",
                            fontSize: "11px",
                            fontWeight: "500",
                            onZero: 0
                        },

                        splitNumber: 3,
                        min: 0
                    }
                ],
                series: [
                    {
                        name: 'Videos',
                        type: 'bar',
                        stack: 'Videos by week',
                        itemStyle: {
                            borderColor: 'rgba(255,255,255,0)',
                            color: '#CFD9E0'
                        }
                        ,
                        emphasis: {
                            itemStyle: {
                                borderColor: 'rgba(255,255,255,1)',
                            }
                        },
                        data: (() => {
                            let res = [];
    
                            let filtered = _.filter(this.state.buckets, (bucket,i) => {
                                return(this.state.buckets[i]._id.max < 20 && this.state.buckets[i]._id.min > 0)
                            })
    
                            let len = filtered.length;
    
    
                            for (let i = 0; i < len; i++) {
                                res.push([this.state.buckets[i]._id.max, filtered[i].count]);
                            }
                            console.log(res)
                            return res;
                        })(),
                        yAxisIndex: 1,
                    },
                    // {
                    //     data: rarityCurve,
                    //     type: 'line'
                    // }
                ]
            }
        })
    }

    renderChart = () => {
        return (<div className="chart-container">
            {this.state.chartOptions && <ReactECharts
                option={this.state.chartOptions}
                style={{ height: "300px", width: "100%" }}
            />}
        </div>)
    }

    render() {
        return (
            <div
                className={classNames({
                    "section-properties": true,
                })}
            >
                {this.renderChartHeader()}

                {this.renderChart()}

                <h2 className="section-small-title">
                    {this.state.properties.length} shape properties:
                </h2>

                {this.renderProperties()}
            </div>

        )

    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps, {
    showDrawer,
    getNftBuckets
})(withRouter(Properties));
