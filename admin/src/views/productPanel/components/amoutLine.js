import echarts from 'echarts';
const option = {
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        formatter: params => {
            return `<div style="color:#989AB3;margin-bottom:10px">${
                params[0].axisValue
            }</div><div style="color: #464668">保单量：${
                params[0].value
            }</div>`;
        },
        padding: 8,
        extraCssText:
            'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;'
    },
    legend: {
        top: '5%',
        left: '35%',
        textStyle: {
            fontSize: 14, // 字体大小
            color: '##A2A3B7' // 字体颜色
        },
        orient: 'horizontal',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 8
    },
    xAxis: {
        type: 'category',
        data: ['1', '', '', '', '5', '', '', '8', '', '', '', '12'],
        axisTick: {
            // y轴刻度线
            show: false
        },
        axisLine: {
            // y轴
            show: false
        },
        splitLine: {
            // 网格线
            lineStyle: {
                type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
                width: 1,
                color: '#EAEDF2'
            },
            show: true // 隐藏或显示
        },
        boundaryGap: false,
        axisLabel: {
            color: '#989AB3'
        }
    },
    yAxis: {
        type: 'value',
        axisTick: {
            // y轴刻度线
            show: false
        },
        axisLine: {
            // y轴
            show: false
        },
        splitLine: {
            // 网格线
            lineStyle: {
                type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
                width: 1,
                color: '#EAEDF2'
            },
            show: true // 隐藏或显示
        },
        // 刻度标签
        axisLabel: {
            show: false
        }
    },
    color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
            {
                offset: 0,
                color: '#3599FE' // 0% 处的颜色
            },
            {
                offset: 1,
                color: '#3599FE' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    series: [
        {
            data: [],
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol:
                'image://http://g-hcare-scm-1301127519.cos.ap-shanghai.myqcloud.com/scm/pic/20210810094059green-dot.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDMyJNBigOXPcZHm8yf5D7lAOLHxMbIIl2%26q-sign-time%3D1628559659%3B1943919659%26q-key-time%3D1628559659%3B1943919659%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Dab68778ef70a17b76155a407f52bc8defc2981e1 ',
            symbolSize: 18,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default',
                        // 渐变色实现===
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            // 三种由深及浅的颜色
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(53, 153, 254, 0.4)'
                                },
                                {
                                    offset: 0.4,
                                    color: 'rgba(101, 201, 255, 0.1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            ]
                        )
                    },
                    lineStyle: {
                        // 线的颜色
                        color: '#00C8BE'
                    },
                    // 以及在折线图每个日期点顶端显示数字
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            }
        }
    ]
};
export default option;
