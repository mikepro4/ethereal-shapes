import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";
import moment from 'moment'
import * as _ from "lodash"

import ReactECharts from 'echarts-for-react';

import { getTickerPrices } from "../../../redux/actions/pricesActions"

class TickerMainChart extends Component {

    state = {
        uploadsCount: [],
        prices: [],
        chartOptions: {},
        currentPrice: {}
    };

    componentDidMount() {
       this.getPrices()
    }

    componentDidUpdate(prevprops) {
        if(this.props.ticker) {
            if(!_.isEqual(this.props.ticker, prevprops.ticker)) {
                this.getPrices()
            }
        }
    }

    getPrices() {
        if(this.props.ticker) {
            this.props.getTickerPrices(this.props.ticker.metadata.symbol, (history, current) => {
                this.setState({
                    prices:  history,
                    currentPrice: current
                }, () => {
                    this.updateChartOptions()
                })
            })
        }
    }


    updateChartOptions() {

        let item = this.props.ticker
        let newWeek = item.week.map((metric, i) => {
          let color

          if (i == 0) {
            if(metric < item.week[1]) {
              color = "red"
            } else {
              color = "green"
            }
          } else {
            color = "#CFD9E0"
          }
					return {
            value: metric,
            itemStyle: { color: color },
          }
        })

        let chartPrices = this.state.prices.map(day => {
          let newDate = moment(day.date).format()
          return [
            newDate,
            day.close
          ]
        })

        let currentPriceTime = moment(this.state.currentPrice.price.postMarketTime).format()

        chartPrices = [
            [currentPriceTime, this.state.currentPrice.price.regularMarketPrice],
            ...chartPrices
        ]

        let chartUploadsCount = []
        if(newWeek[0]) {
          chartUploadsCount = [
            {
              value: [ 
                moment().subtract(0, "days").format(),
                newWeek[0].value
              ],
              itemStyle: newWeek[0].itemStyle
            },
            [
              moment().subtract(1, "days").format(),
              newWeek[1].value
            ],
            [
              moment().subtract(2, "days").format(),
              newWeek[2].value
            ],
            [
              moment().subtract(3, "days").format(),
              newWeek[3].value
            ],
            [
              moment().subtract(4, "days").format(),
              newWeek[4].value
            ],
            [
              moment().subtract(5, "days").format(),
              newWeek[5].value
            ],
            [
              moment().subtract(6, "days").format(),
              newWeek[6].value
            ]
          ]
        }
        


        this.setState({
            chartOptions: {
                animation: false,
                tooltip : {
                trigger: 'axis',
                axisPointer : {    
                    type : 'shadow' 
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
                  type : 'time',
                  splitLine: { show:false },
                  axisLine: {
                      lineStyle: {
                          color: "#D6DFE4"
                      }
                  },
                  axisLabel: {
                      color: "#8A9BA9",
                      fontSize: "11px",
                      fontWeight: "500",
                      onZero: 0
                  }
                },
                yAxis: [
                    {
                      type : 'value',
                      axisLabel: {
                          color: "#8A9BA9",
                          fontSize: "11px",
                          fontWeight: "500",
                          formatter: '${value}'
                      },
                      splitNumber: 3,
                      min: 0,
                      splitLine: {
                        show: false
                      },
                    },
                    {
                      type : 'value',
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
                        borderColor: 'rgba(0,0,0,0)',
                        color: '#CFD9E0'
                    }
                    ,
                    emphasis: {
                        itemStyle: {
                            borderColor: 'rgba(0,0,0,1)',
                        }
                    },
                    data: chartUploadsCount,
                    yAxisIndex: 1,
                    },
                   {
                      data: chartPrices,
                      type: 'line'
                    }
                ]
            }
        })
    }

	render() {
      
        return (
            <div className="ticker-main-chart">

                {this.state.chartOptions && <ReactECharts
                    option={this.state.chartOptions}
                    style={{ height: this.props.height, width: "100%" }}
                /> }

            </div>
        ) 
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, {
    getTickerPrices
})(TickerMainChart);
