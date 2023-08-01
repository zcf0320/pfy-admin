const option = {
    tooltip: {
        trigger: 'item',
        extraCssText:
            'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;',
        backgroundColor: '#fff',
        textStyle: {
            color: '#464668'
        }
    },
    title: {
        text: '类型',
        left: 'center',
        top: '32%',
        textStyle: {
            color: '#A2A3B7',
            fontSize: 14,
            align: 'center'
        }
    },
    graphic: {
        type: 'text',
        left: 'center',
        top: '48%',
        style: {
            text: '00%',
            textAlign: 'center',
            fill: '#464668',
            fontSize: 24,
            fontWeight: 700
        }
    },
    legend: {
        top: 'center',
        left: '80%',
        textStyle: {
            fontSize: 12, // 字体大小
            color: '#464668' // 字体颜色
        },
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 16
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['70%', '60%'],
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: [{ name: 'f', value: 9 }]
        }
    ]
};
export default option;
