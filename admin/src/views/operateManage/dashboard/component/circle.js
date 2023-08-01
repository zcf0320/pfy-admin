const option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        show: true,
        orient: 'vertical',
        left: '79%', // 图例距离左的距离
        y: '65%', // 图例上下居中
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
            // 图例文字的样式
            color: '#A2A3B7',
            fontSize: 14,
            padding: [3, 0, 0, 0]
        }
    },
    color: ['#3599FE', '#F64E60', '#FF8100', '#00D1C7', '#A163FF'],
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: []
        }
    ]
};
export default option;
