const option = {
    title: {
        text: 'XXXX服务项名称',
        textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#545473'
        },
        x: '5%',
        y: '3%'
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        textStyle: {
            color: '#464668' // 设置文字颜色
        },
        extraCssText:
            'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;'
    },
    legend: {
        top: '5%',
        left: '47%',
        textStyle: {
            fontSize: 14, // 字体大小
            color: '#A2A3B7', // 字体颜色
            padding: [3, 0, 0, 8]
        },
        orient: 'horizontal',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 24
    },
    xAxis: {
        type: 'category',
        data: [],
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
            color: '#989AB3'
        }
    },
    // color: {
    //     type: 'linear',
    //     x: 0,
    //     y: 0,
    //     x2: 1,
    //     y2: 0,
    //     colorStops: [
    //         {
    //             offset: 0,
    //             color: '#3599FE' // 0% 处的颜色
    //         },
    //         {
    //             offset: 1,
    //             color: '#3599FE' // 100% 处的颜色
    //         }
    //     ],
    //     globalCoord: false // 缺省为 false
    // },
    color: ['#EB002C', '#00C8BE', '#B044FF', '#009AFF'],
    series: []
};
export default option;
