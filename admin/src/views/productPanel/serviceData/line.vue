<template>
  <div class="service-line flex">
    <div :id="id" class="echartDom" />
    <div class="contain">
      <div class="service-line-box flex">
        <div v-if="data.submitNum" class="service-line-item">
          <div class="num">{{ data.submitNum }}</div>
          提交次数
        </div>
        <div v-if="data.submitUserNum" class="service-line-item">
          <div class="num">{{ data.submitUserNum }}</div>
          提交人数
        </div>
        <div v-if="data.successNum" class="service-line-item">
          <div class="num">{{ data.successNum }}</div>
          成功次数
        </div>
        <div v-if="data.successUserNum" class="service-line-item">
          <div class="num">{{ data.successUserNum }}</div>
          成功人数
        </div>
        <div v-if="data.reviewPassRate" class="service-line-item">
          <div class="num">{{ data.reviewPassRate }}</div>
          审核通过率
        </div>
        <div v-if="data.useRate" class="service-line-item">
          <div class="num">{{ Number(data.useRate).toFixed(0) }}%</div>
          使用用户占比
        </div>
        <div v-if="data.policySettlementPrice" class="service-line-item">
          <div class="num">￥{{ data.policySettlementPrice }}</div>
          理赔结算金额
        </div>
        <div v-if="data.providerSettlementPrice" class="service-line-item">
          <div class="num">￥{{ data.providerSettlementPrice }}</div>
          供应商结算金额
        </div>
        <div v-if="data.avgUseNum" class="service-line-item">
          <div class="num">{{ data.avgUseNum }}</div>
          人均使用次数
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/serviceLine';
export default {
  name: 'LineCharts',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      width: ''
    };
  },
  watch: {
    width(n) {
      if (n) {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    data: {
      handler(n) {
        if (n) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initChart();
    if (this.$refs.parent) {
      window.addEventListener('resize', () => {
        this.width = window.getComputedStyle(this.$refs.parent).width;
      });
    }
  },
  methods: {
    initChart() {
      const echartDom = document.getElementById(this.id);
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);
      const submitUserNum = [];
      const submitNum = [];
      const successUserNum = [];
      const successNum = [];
      const date = [];
      option.series = [
        {
          name: '提交人数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: submitUserNum
        },
        {
          name: '提交次数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: submitNum
        },
        {
          name: '使用人数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: successUserNum
        },
        {
          name: '使用次数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: successNum
        }
      ];
      option.xAxis.data = date;
      this.data.dateNumList.forEach(item => {
        submitUserNum.push(item.submitUserNum);
        submitNum.push(item.submitNum);
        successUserNum.push(item.successUserNum);
        successNum.push(item.successNum);
        date.push(item.date);
      });
      option.title.text = this.data.serviceInfoName;
      this.chart.setOption(option);
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.service-line {
  justify-content: flex-start;
  align-items: flex-start;
  .echartDom {
    width: 100%;
    height: 400px;
    flex: 0 0 80%;
    margin-left: -3%;
    padding-top: 10px;
  }
  &-box {
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 4px;
    padding-left: 24px;

    width: 100%;
  }
  &-item {
    margin-right: 8px;
    padding: 16px 24px;
    width: calc(50% - 24px);
    font-size: 14px;
    color: #a2a3b7;
    .num {
      font-size: 18px;
      font-weight: bold;
      color: #464668;
      margin: 16px 0 8px;
    }
  }
  .contain {
    margin: 24px 24px 24px -3%;
    height: 341px;
    background: #fafcff;
    width: 100%;
  }
}
</style>
