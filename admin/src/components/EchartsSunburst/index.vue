<template>
  <div
    :id="id"
    :style="{
      width: width ? width + 'px' : '100%',
      height: height ? height + 'px' : '100%'
    }"
  />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EchartsSunburst',
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    id: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    const item1 = {
      color: '#F54F4A'
    };
    const item2 = {
      color: '#FF8C75'
    };
    const item3 = {
      color: '#FFB499'
    };
    return {
      defaultSettings: {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: null,
            highlightPolicy: 'ancestor',
            levels: [],
            itemStyle: {
              color: '#ddd',
              borderWidth: 2
            },
            data: [
              {
                value: 5,
                name: '商品兑换',
                itemStyle: item1,
                children: [
                  {
                    value: 1,
                    name: '22',
                    itemStyle: item2
                  },
                  {
                    value: 2,
                    name: '33',
                    itemStyle: item3
                  }
                ]
              },
              {
                value: 12,
                name: '在线服务',
                itemStyle: item2,
                children: [
                  {
                    value: 1,
                    name: '22',
                    itemStyle: item2
                  },
                  {
                    value: 2,
                    name: '33',
                    itemStyle: item3
                  }
                ]
              },
              {
                value: 12,
                name: '预约服务',
                itemStyle: item2,
                children: [
                  {
                    value: 1,
                    name: '22',
                    itemStyle: item2
                  },
                  {
                    value: 2,
                    name: '33',
                    itemStyle: item3
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  methods: {
    /**
     *  初始化报表数据
     */
    init() {
      const option = this.$extends(true, {}, this.defaultSettings);
      const reInt = this.$isNotEmpty(this.chart);
      // 如果是首次初始化
      if (!reInt) {
        this.chart = echarts.init(document.getElementById(this.id));
      } else {
        this.chart.clear(); // 重新渲染之前，先清空
      }
      this.chart.setOption(option);
    },
    randomData() {
      return Math.round(Math.random() * 500);
    }
  }
  // watch: {
  //     data: {
  //         handler(val) {
  //             if (this.$isEmpty(val)) {
  //                 return;
  //             }
  //             this.init();
  //         },
  //         deep: true
  //     }
  // }
};
</script>

<style scoped lang="scss"></style>
