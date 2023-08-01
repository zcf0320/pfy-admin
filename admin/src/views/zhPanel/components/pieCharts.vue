<template>
  <div class="zh-pie-charts zh-layput-pad flex">
    <div class="zh-pie-charts-container">
      <div class="yt-card-name">
        保单销量
      </div>
      <Pie :total="countTotal" :value="countValue" type="0" :data="count" />
    </div>
    <div class="zh-pie-charts-container">
      <div class="yt-card-name">
        保费统计
      </div>
      <Pie
        :total="statisticsTotal"
        :value="statisticsValue"
        type="1"
        :data="statistics"
      />
    </div>
  </div>
</template>

<script>
import Pie from './pie';
export default {
  name: 'pieCharts',
  components: { Pie },
  data() {
    return {
      saleChart: {},
      statisticsChart: {},
      count: [],
      countTotal: 0,
      countValue: 0,
      statistics: [],
      statisticsTotal: 0,
      statisticsValue: 0
    };
  },
  computed: {
    data() {
      return this.$store.getters.zhPanelData;
    }
  },
  watch: {
    data: {
      handler(n) {
        if (n) {
          if (n.policyCountStatistics && n.policyCountStatistics.length) {
            this.count = n.policyCountStatistics.map(item => {
              return {
                value: item.num,
                name: item.name
              };
            });
            this.countTotal = n.policyCountStatistics[0].num;
            this.countValue = n.policyCountStatistics[1].num;
          }
          if (n.policyPremiumStatistics && n.policyPremiumStatistics.length) {
            this.statistics = n.policyPremiumStatistics.map(item => {
              return {
                value: item.premium,
                name: item.name
              };
            });
            this.statisticsTotal = n.policyPremiumStatistics[0].premium;
            this.statisticsValue = n.policyPremiumStatistics[1].premium;
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.zh-pie-charts {
  width: 616px;
  height: 431px;
  justify-content: space-between;
  align-items: flex-start;
  &-container {
    .sale {
      width: 182px;
      height: 182px;
      margin: 32px 0;
    }
    .zh-pie-legend {
      margin-left: 20px;
      width: 219px;
      justify-content: flex-start;
      align-items: center;
      font-weight: bold;
      font-size: 24px;
      color: rgba(207, 204, 255, 0.8);
      &-icon {
        width: 42px;
        height: 10px;
        border-radius: 6px;
      }
      .yellow {
        background: #ffbd1c;
      }
      .blue {
        background: #3f5fff;
      }
      &-count {
        margin: 0 10px;
        font-size: 16px;
        color: #8e8bbd;
        max-width: 150px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  .mb15 {
    margin-bottom: 25px;
  }
}
</style>
