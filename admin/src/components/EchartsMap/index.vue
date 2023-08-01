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
import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);
export default {
  name: 'EchartsMap',
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
    return {
      defaultSettings: {
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
            { start: 50, end: 100 },
            { start: 20, end: 50 },
            { start: 10, end: 20 },
            { start: 0, end: 10 }
          ],
          color: ['#3599FE', '#63B0FF', '#8EC6FF', '#C3E1FF']
        },
        series: [
          {
            name: '供应商数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              show: true,
              color: '#fff'
            },
            data: [
              { name: '北京', value: this.randomData() },
              { name: '天津', value: this.randomData() },
              { name: '上海', value: this.randomData() },
              { name: '重庆', value: this.randomData() },
              { name: '河北', value: this.randomData() },
              { name: '河南', value: this.randomData() },
              { name: '云南', value: this.randomData() },
              { name: '辽宁', value: this.randomData() },
              { name: '黑龙江', value: this.randomData() },
              { name: '湖南', value: this.randomData() },
              { name: '安徽', value: this.randomData() },
              { name: '山东', value: this.randomData() },
              { name: '新疆', value: this.randomData() },
              { name: '江苏', value: this.randomData() },
              { name: '浙江', value: this.randomData() },
              { name: '江西', value: this.randomData() },
              { name: '湖北', value: this.randomData() },
              { name: '广西', value: this.randomData() },
              { name: '甘肃', value: this.randomData() },
              { name: '山西', value: this.randomData() },
              { name: '内蒙古', value: this.randomData() },
              { name: '陕西', value: this.randomData() },
              { name: '吉林', value: this.randomData() },
              { name: '福建', value: this.randomData() },
              { name: '贵州', value: this.randomData() },
              { name: '广东', value: this.randomData() },
              { name: '青海', value: this.randomData() },
              { name: '西藏', value: this.randomData() },
              { name: '四川', value: this.randomData() },
              { name: '宁夏', value: this.randomData() },
              { name: '海南', value: this.randomData() },
              { name: '台湾', value: this.randomData() },
              { name: '香港', value: this.randomData() },
              { name: '澳门', value: this.randomData() }
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
      return Math.round(Math.random() * 100);
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
