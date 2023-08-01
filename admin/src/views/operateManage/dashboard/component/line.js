const option = {
    title: {
        text: '职业占比',
        top: 25
    },
    tooltip: {
        trigger: 'axis',
        formatter: item => {
            const curr = (item[0].data / 280) * 100;
            return parseInt(curr) + '%';
        },
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    axisLabel: {
        color: '#A2A3B7'
    },

    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        splitLine: {
            show: false
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
    yAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisTick: {
            // y轴刻度线
            show: false
        },
        axisLine: {
            // y轴
            show: false
        },
        axisLabel: {
            formatter: function(value) {
                let res = value;
                if (res.length > 5) {
                    res = res.substring(0, 4) + '...';
                }
                return res;
            }
        },
        data: []
    },
    color: ['#3599FE'],
    series: [
        {
            name: '占比',
            type: 'bar',
            data: []
        }
    ]
};
export default option;
