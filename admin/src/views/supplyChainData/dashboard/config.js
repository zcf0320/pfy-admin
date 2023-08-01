
export const providerOptions = {
    backgroundColor: '#fff',
    title: {
        text: '供应商类型',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        bottom: 'bottom',
        data: ['TPA', '设备/检测供应商', '医疗服务供应商', '其他产品类供应商']
    },
    color: ['#3599FE', '#FF8100', '#00D1C7', '#A163FF'],
    series: [
        {
            name: '供应商类型',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '50%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export const providerListOptions = {
    title: {
        text: '供应商数据'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            },
            lineStyle: {
                color: '#ccc',
                type: 'dashed'
            }
        },
        extraCssText: 'line-height:24px;',
        textStyle: {
            color: '#464668',
            fontSize: 12
        },
        backgroundColor: ' #F3F6F9'
    },
    textStyle: {
        color: '#989AB3'
    },
    legend: {
        data: []
    },
    grid: {
        left: '0%',
        right: '1%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1 // 这里是为了突出显示加上的
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 16
                }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            // axisLabel: {
            //     interval: 0,
            //     rotate: 60
            // }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1 // 这里是为了突出显示加上的
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1
                }
            }
        }
    ],
    color: ['#65ABFF'],
    series: [
        {
            data: [],
            name: '供应商数据',
            type: 'line',
            areaStyle: {}
        }
    ]
};

export const serviceStatusOptions = {
    title: {
        text: '服务项状态',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        top: 'center',
        data: ['待发布', '已下架', '已发布']
    },
    series: [
        {
            name: '服务项状态',
            type: 'pie',
            radius: '80%',
            center: ['45%', '50%'],
            label: {
                position: 'inner'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            color: ['#3599FE', '#FFA400', '#00D5C8'],
            data: [
                { value: 10, name: '待发布' },
                { value: 5, name: '已下架' },
                { value: 15, name: '已发布' }
            ]
        }
    ]
};

export const serviceTypeOptions = {
    title: {
        text: '服务项类型',
        left: 'left'
    },
    backgroundColor: '#fff',
    tooltip: {
        trigger: 'item'
    },
    series: [{
        radius: ['15%', '80%'],
        type: 'sunburst',
        sort: null,
        highlightPolicy: 'ancestor',
        itemStyle: {
            color: '#ddd',
            borderWidth: 2
        },
        // minAngle: 10,
        levels: [{}, {
            r0: '15%',
            r: '50%',
            itemStyle: {
                borderWidth: 2
            },
            label: {
                align: 'center'
            }
        }, {
            r0: '50%',
            r: '100%',
            label: {
                align: 'left'
            },
            itemStyle: {
                borderWidth: 3
            }
        }],
        data: []
    }]
};

export const serviceStatusDataOptions = {
    title: {
        text: '服务项状态趋势'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            },
            lineStyle: {
                color: '#ccc',
                type: 'dashed'
            }
        },
        extraCssText: 'line-height:24px;',
        textStyle: {
            color: '#464668',
            fontSize: 12
        },
        backgroundColor: ' #F3F6F9'
    },
    textStyle: {
        color: '#989AB3'
    },
    legend: {
        data: []
    },
    grid: {
        left: '0%',
        right: '1%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1 // 这里是为了突出显示加上的
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 16
                }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            // axisLabel: {
            //     interval: 0,
            //     rotate: 60
            // }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1 // 这里是为了突出显示加上的
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0',
                    width: 1
                }
            }
        }
    ],
    series: []
};

export const eChartsMapOptions = {
    backgroundColor: '#fff',
    title: {
        text: '供应商分布',
        x: 'left'
    },
    tooltip: {
        trigger: 'item'
    },
    visualMap: {
        show: false,
        x: 'left',
        y: 'bottom',
        splitList: [
            { start: 20, end: 50 }, { start: 10, end: 20 },
            { start: 5, end: 10 }, { start: 0, end: 5 }, { start: 0, end: 0 }
        ],
        color: ['#3599FE', '#63B0FF', '#8EC6FF', '#C3E1FF', '#fff']
    },
    series: [{
        name: '供应商数量',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
            show: true,
            color: '#fff'
        },
        data: [
            { name: '北京', value: 0 }, { name: '天津', value: 0 },
            { name: '上海', value: 0 }, { name: '重庆', value: 0 },
            { name: '河北', value: 0 }, { name: '河南', value: 0 },
            { name: '云南', value: 0 }, { name: '辽宁', value: 0 },
            { name: '黑龙江', value: 0 }, { name: '湖南', value: 0 },
            { name: '安徽', value: 0 }, { name: '山东', value: 0 },
            { name: '新疆', value: 0 }, { name: '江苏', value: 0 },
            { name: '浙江', value: 0 }, { name: '江西', value: 0 },
            { name: '湖北', value: 0 }, { name: '广西', value: 0 },
            { name: '甘肃', value: 0 }, { name: '山西', value: 0 },
            { name: '内蒙古', value: 0 }, { name: '陕西', value: 0 },
            { name: '吉林', value: 0 }, { name: '福建', value: 0 },
            { name: '贵州', value: 0 }, { name: '广东', value: 0 },
            { name: '青海', value: 0 }, { name: '西藏', value: 0 },
            { name: '四川', value: 0 }, { name: '宁夏', value: 0 },
            { name: '海南', value: 0 }, { name: '台湾', value: 0 },
            { name: '香港', value: 0 }, { name: '澳门', value: 0 }
        ]
    }]
};
