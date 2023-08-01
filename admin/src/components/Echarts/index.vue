<template>
  <div
    :id="id"
    :style="{
      width: width,
      height: height ? height + 'px' : '100%'
    }"
  />
</template>

<script>
import echarts from 'echarts';
import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);
export default {
  name: 'Echarts',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  watch: {
    options: {
      handler(val) {
        if (this.$isEmpty(val)) {
          return;
        }
        this.init();
      },
      deep: true
    }
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
      const reInt = this.$isNotEmpty(this.chart);
      // 如果是首次初始化
      if (!reInt) {
        this.chart = echarts.init(document.getElementById(this.id));
      } else {
        this.chart.clear(); // 重新渲染之前，先清空
      }
      this.chart.setOption(this.options);
    },
    randomData() {
      return Math.round(Math.random() * 500);
    }
  }
};
</script>

<style scoped lang="scss"></style>
