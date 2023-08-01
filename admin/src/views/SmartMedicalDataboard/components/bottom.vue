<template>
  <div class="bottom flex">
    <div class="left">
      <div class="flex-between" style="margin-bottom:40px">
        <div class="title">数据统计</div>
        <div class="legend">
          <div style="margin-right:19px"><span class="line1" />C端用户数量</div>
          <div><span class="line2" />使用记录</div>
        </div>
      </div>

      <div ref="echarts" style="width:100%;height:100%;" />
    </div>
    <div class="right">
      <div class="flex-between">
        <div class="title">健康应用使用排名</div>
        <div class="flex-between">
          <div class="line" />
          <div class="count-text">使用量总数</div>
        </div>
      </div>
      <div class="application-name">应用名称</div>
      <div class="application-list">
        <div
          v-for="(item, index) in ranking"
          :key="index"
          class="application-item"
          :class="index % 2 !== 0 ? 'bg' : ''"
        >
          <div class="left-ranking">
            <img v-if="index === 0" src="../images/top1.png" alt="" />
            <img v-if="index === 1" src="../images/top2.png" alt="" />
            <img v-if="index === 2" src="../images/top3.png" alt="" />
            <div v-if="index > 2">{{ index + 1 }}</div>
          </div>
          <div class="right-ranking">
            <div class="item-name">
              {{ item.code }}
            </div>
            <el-progress
              class="progress-bg"
              :stroke-width="4"
              color="#6D4AE3"
              :percentage="item.count"
              :show-text="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);
export default {
  name: 'bottom',
  data() {
    return {
      chart: null
    };
  },
  computed: {
    ranking() {
      return this.$store.getters.smartData.ranking;
    },
    options() {
      const chartData = this.$store.getters.smartData.statistics || [];
      const date = [];
      const userYaxisData = [];
      const recordYaxisData = [];
      chartData.forEach(item => {
        date.push(item.statisticsDate);
        userYaxisData.push(item.useCountFinish);
        recordYaxisData.push(item.useRecordFinish);
      });
      const option = {
        color: ['#ffbf1c', '#3f5fff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisLine: {
              lineStyle: {
                color: '#8E8BBD',
                type: 'dashed'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#8E8BBD',
                type: 'dashed'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 0.3
              }
            }
          }
        ],
        grid: {
          left: '35px',
          bottom: '15%',
          width: '100%',
          height: '100%'
        },
        // legend: {
        //     textStyle: {
        //         color: '#CFCCFF'
        //     },
        //     right: '10px'
        // },
        // dataZoom: [{
        //     type: 'slider',
        //      bottom: '10%'
        // }],
        series: [
          {
            name: 'C端用户数量',
            data: userYaxisData,
            barGap: 0,
            barWidth: 20,
            type: 'bar',
            itemStyle: {
              normal: {
                color: function() {
                  return '#ffbf1c';
                }
              }
            }
          },
          {
            name: '使用记录',
            data: recordYaxisData,
            type: 'bar',
            barGap: 0,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: function() {
                  return '#3f5fff';
                }
              }
            }
          }
        ]
      };
      return option;
    }
  },
  watch: {
    options(newVal) {
      this.chart.setOption(newVal);
    }
  },
  mounted() {
    this.init();
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  methods: {
    init() {
      this.chart = echarts.init(this.$refs.echarts);

      this.chart.setOption(this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom {
  height: 714px;
  margin: 32px 0;
  justify-content: space-between;
  .left,
  .right {
    padding: 32px 48px 50px;
    background: #1f2544;
    border: 1px solid #5d4dfd;
  }
  .left {
    flex: 1;
    min-width: 1715px;
    margin-right: 30px;
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.59;
    }
    .legend {
      display: flex;
      align-items: center;
      color: #cfccff;
      font-size: 16px;
      font-weight: bold;
    }
    .line1,
    .line2 {
      display: inline-block;
      width: 20px;
      height: 12px;
      margin-right: 4px;
    }
    .line1 {
      background: #ffbf1c;
    }
    .line2 {
      background: #3f5fff;
    }
  }
  .right {
    flex: 1;
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.59;
    }
    .count-text {
      font-size: 16px;
      font-weight: 500;
      color: #cfccff;
    }
    .line {
      width: 24px;
      height: 4px;
      background: #6d4ae3;
      border-radius: 6px;
      margin-right: 16px;
    }
    .application-name {
      margin-top: 32px;
      padding-left: 48px;
      height: 46px;
      line-height: 46px;
      font-weight: bold;
      font-size: 24px;
      color: #b4afff;
      background: #333b64;
    }
    .application-list {
      height: 510px;
      overflow: hidden;
      overflow-y: auto;
      .application-item {
        height: 120px;
        padding: 0 32px 0 10px;
        display: flex;
        align-items: center;
        &.bg {
          background: rgba(51, 59, 100, 0.5);
        }
        .left-ranking {
          margin-top: -16px;
          margin-right: 10px;

          font-size: 34px;
          color: #8e8bbd;
          img {
            margin-top: 10px;
            width: 28px;
            height: 28px;
          }
        }

        .right-ranking {
          flex: 1;
          .item-name {
            font-size: 24px;
            font-weight: bold;
            color: #8e8bbd;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
  .progress-bg {
    /deep/ .el-progress-bar__outer {
      background-color: #333b64;
    }
  }
}
</style>
