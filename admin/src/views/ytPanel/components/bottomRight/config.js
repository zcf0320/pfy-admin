const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
            ],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                textStyle: {
                    color: '#8E8BBD', // 坐标值得具体的颜色
                    fontSize: 12
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#8E8BBD', // 坐标值得具体的颜色
                    fontSize: 12
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            }
        },
        {
            type: 'value',
            axisLabel: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    type: 'dashed'
                }
            }
        }
    ],
    color: ['#1AC85E', '#FFBD1B', '#3F5FFF'],
    series: [
        {
            name: '亚太高血压',
            type: 'bar',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12]
        },
        {
            name: '亚太糖尿病',
            type: 'bar',
            data: [22, 12, 1, 3, 2, 15, 11, 22, 11, 33, 23]
        },
        {
            name: '亚太冠心病',
            type: 'bar',
            data: [1, 4, 3, 55, 3, 6, 44, 33, 2, 1, 11, 2]
        },
        {
            name: '亚太高血压',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 8,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12],
            smooth: true,
            areaStyle: {
                normal: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(26, 200, 94, .7)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        },
        {
            name: '亚太糖尿病',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 8,
            data: [22, 12, 1, 3, 2, 15, 11, 22, 11, 33, 23],
            smooth: true,
            areaStyle: {
                normal: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(245, 174, 56, .7)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        },
        {
            name: '亚太冠心病',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 8,
            data: [1, 4, 3, 55, 3, 6, 44, 33, 2, 1, 11, 2],
            smooth: true,
            areaStyle: {
                normal: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(3, 100, 255, .7)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        }
    ]
};
export default option;
