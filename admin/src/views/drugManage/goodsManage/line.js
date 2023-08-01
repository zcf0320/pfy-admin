const option = {
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff', // 设置背景图片 rgba格式
        color: 'black',
        fontSize: 14,
        borderWidth: '0', // 边框宽度设置1
        borderColor: '#fff', // 设置边框颜色
        extraCssText:
            'box-shadow: 0px 0px 10px 0px rgba(15, 81, 255, 0.11);border-radius: 4px;height:68px',
        textStyle: {
            color: 'black' // 设置文字颜色
        },
        padding: 0,
        formatter: function(params) {
            let result = '';
            params.forEach(function(item) {
                result +=
                    `<div style="background-color:#F3F6F9;color: #464668;width: 199px;
                    height: 34px;line-height:34px;padding-left:12px">${
                        params[0].name
                    }</div>` + '<br>';
                result +=
                    '<div style="height: 34px;line-height:34px;margin:-22px 0 0 12px"><span style="display:inline-block;margin-right:12px;border-radius:10px;width:9px;height:9px;background-color:' +
                    item.color +
                    '"></span>价格：￥' +
                    item.data +
                    '</div>';
            });
            return result;
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
            // y轴刻度线
            show: false
        },
        axisLine: {
            // y轴
            show: false
        },
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        splitLine: {
            // 网格线
            lineStyle: {
                type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
                width: 1,
                color: '#EAEDF2'
            },
            show: true // 隐藏或显示
        },
        axisTick: {
            // y轴刻度线
            show: false
        },
        axisLine: {
            // y轴
            show: false
        }
    },
    axisLabel: {
        color: '#989AB3'
    },
    color: ['#3599FE'],
    series: [
        {
            symbolSize: 8,
            itemStyle: {
                // 圆圈样式
                borderWidth: 2,
                color: '#3599FE'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]
};
export default option;
