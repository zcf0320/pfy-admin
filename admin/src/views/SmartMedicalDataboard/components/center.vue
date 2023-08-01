<template>
  <div class="center-target">
    <div class="left">
      <div class="text">目标进度</div>
      <div class="flex-between">
        <div class="left1">
          <div class="table-column item-name">C端用户</div>
          <div class="table-column">
            <div class="item-num">
              {{ userData && userData.finish }}
            </div>
            <div class="item-name2">C端用户数(个)</div>
          </div>
          <div class="table-column" style="text-align:center">
            <div class="progress">
              <div ref="userPieChart" class="pie" />
            </div>
            <div class="target">
              <div class="target-line-yellow" />
              <div>目标(个)</div>
              <div class="target-num">
                {{ userData && userData.target }}
              </div>
            </div>
          </div>
        </div>
        <div class="left2">
          <div class="table-column item-name">使用记录</div>
          <div class="table-column">
            <div class="item-num">
              {{ recordData && recordData.finish }}
            </div>
            <div class="item-name2">使用记录(条)</div>
          </div>
          <div class="table-column" style="text-align:center">
            <div class="progress">
              <div ref="recordPieChart" class="pie" />
            </div>

            <div class="target">
              <div class="target-line-blue" />
              <div>目标(条)</div>
              <div class="target-num">
                {{ recordData && recordData.target }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <div class="title">用户反馈(条)</div>
        <div class="flex-center">
          <div class="flex-wrap">
            <div class="name">已反馈</div>
            <div class="num">
              {{ feedBackData && feedBackData.finish }}
            </div>
          </div>
          <div class="flex-wrap">
            <div class="name">目标</div>
            <div class="num">
              {{ feedBackData && feedBackData.target }}
            </div>
          </div>
          <div class="finish-wrap">
            <div class="finish-rate">
              <span>完成率</span>
              {{ feedBackData && feedBackData.finishRate * 100 }}%<img
                src="../images/up-arrow.png"
                alt=""
              />
            </div>
            <div>
              <el-progress
                class="progress-bg"
                :stroke-width="10"
                color="#FFBD1C"
                :percentage="feedBackData && feedBackData.finishRate * 100"
                :show-text="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">专利/著作权申请(个)</div>
        <div class="flex-center">
          <div class="flex-wrap">
            <div class="name">已申请</div>
            <div class="num">
              {{ patentData && patentData.finish }}
            </div>
          </div>
          <div class="flex-wrap">
            <div class="name">目标</div>
            <div class="num">
              {{ patentData && patentData.target }}
            </div>
          </div>
          <div class="finish-wrap">
            <div class="finish-rate">
              <span>完成率</span>
              {{ patentData && patentData.finishRate * 100 }}%<img
                src="../images/up-arrow.png"
                alt=""
              />
            </div>
            <div>
              <el-progress
                class="progress-bg"
                :stroke-width="10"
                color="#FFBD1C"
                :percentage="patentData && patentData.finishRate * 100"
                :show-text="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">独立健康应用(个)</div>
        <div class="flex-center">
          <div class="flex-wrap">
            <div class="name">已完成</div>
            <div class="num">
              {{ applicationData && applicationData.finish }}
            </div>
          </div>
          <div class="flex-wrap">
            <div class="name">目标</div>
            <div class="num">
              {{ applicationData && applicationData.target }}
            </div>
          </div>
          <div class="finish-wrap">
            <div class="finish-rate">
              <span>完成率</span>
              {{ applicationData && applicationData.finishRate * 100 }}%<img
                src="../images/up-arrow.png"
                alt=""
              />
            </div>
            <div>
              <el-progress
                class="progress-bg"
                :stroke-width="10"
                color="#FFBD1C"
                :percentage="
                  applicationData && applicationData.finishRate * 100
                "
                :show-text="false"
              />
            </div>
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
  name: 'center',
  props: {
    target: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      userChart: null,
      recordChart: null
    };
  },
  computed: {
    userData() {
      const target = this.$store.getters.smartData.target || [];
      return target.find(item => item.type === 0);
    },
    recordData() {
      const target = this.$store.getters.smartData.target || [];
      return target.find(item => item.type === 1);
    },
    feedBackData() {
      const target = this.$store.getters.smartData.target || [];
      return target.find(item => item.type === 2);
    },
    patentData() {
      const target = this.$store.getters.smartData.target || [];
      return target.find(item => item.type === 3);
    },
    applicationData() {
      const target = this.$store.getters.smartData.target || [];
      return target.find(item => item.type === 4);
    },
    userPieOption() {
      const target = this.$store.getters.smartData.target || [];
      const userData = target.find(item => item.type === 0);
      let finishRate = 0;
      if (userData) {
        finishRate = (userData.finishRate * 100).toFixed(2);
      }
      const option = {
        title: {
          text: finishRate + '%', // 主标题文本
          subtext: '完成率', // 副标题文本
          left: 'center',
          top: '32%',
          textStyle: {
            fontSize: 40,
            color: '#FFFFFF',
            align: 'center'
          },
          subtextStyle: {
            fontSize: 16,
            color: '#A4A6B3',
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['79%', '99%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            color: ['#FFB900', '#333b64'],
            data: [
              {
                value: finishRate,
                name: ''
              },
              { value: 100 - finishRate, name: '' }
            ]
          }
        ]
      };
      return option;
    },
    recordPieOption() {
      const target = this.$store.getters.smartData.target || [];
      const recordData = target.find(item => item.type === 1);
      let finishRate = 0;
      if (recordData) {
        finishRate = (recordData.finishRate * 100).toFixed(2);
      }
      const option = {
        title: {
          text: finishRate + '%', // 主标题文本
          subtext: '完成率', // 副标题文本
          left: 'center',
          top: '32%',
          textStyle: {
            fontSize: 40,
            color: '#FFFFFF',
            align: 'center'
          },
          subtextStyle: {
            fontSize: 16,
            color: '#A4A6B3',
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['79%', '99%'],
            hoverAnimation: false,
            color: ['#3F5FFF', '#333b64'],
            data: [
              {
                value: finishRate,
                name: ''
              },
              { value: 100 - finishRate, name: '' }
            ]
          }
        ]
      };
      return option;
    }
  },
  watch: {
    userPieOption(newVal) {
      this.userChart && this.userChart.setOption(newVal);
    },
    recordPieOption(newVal) {
      this.recordChart && this.recordChart.setOption(newVal);
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', () => {
      this.userChart.resize();
      this.recordChart.resize();
    });
  },
  methods: {
    initChart() {
      const chart1 = this.$refs.userPieChart;
      this.userChart = echarts.init(chart1);

      this.userChart.setOption(this.userPieOption);

      const chart2 = this.$refs.recordPieChart;
      this.recordChart = echarts.init(chart2);

      this.recordChart.setOption(this.recordPieOption);
    }
  }
};
</script>
<style lang="scss" scoped>
.center-target {
  height: 451px;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    flex: 1;
    padding: 32px 48px 50px;
    background: #1f2544;
    border: 1px solid #5d4dfd;
  }
  .left {
    margin-right: 30px;
    .text {
      margin-bottom: 31px;
      font-size: 32px;
      font-weight: bold;
      opacity: 0.59;
    }
    .left1,
    .left2 {
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 794px;
      height: 298px;
      padding: 25px 49px;
    }
    .left1 {
      margin-right: 30px;
      background: url('../images/left1-bg.png') no-repeat;
      background-size: 100% 100%;
    }
    .left2 {
      background: url('../images/left2-bg.png') no-repeat;
      background-size: 100% 100%;
    }
    .table-column {
      flex: 1;
      flex-direction: column;
      &.item-name {
        margin-top: 210px;
      }
      .item-num {
        font-size: 64px;
        font-weight: bold;
        color: #ffffff;
        margin-top: 40px;
        text-align: center;
      }
      .item-name2 {
        margin-top: 95px;
        text-align: center;
      }
      .target {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #a4a6b3;
        .target-line-yellow {
          width: 42px;
          height: 10px;
          margin-right: 10px;
          background: #ffb900;
          border-radius: 6px;
        }
        .target-line-blue {
          width: 42px;
          height: 10px;
          margin-right: 10px;
          background: #3f5fff;
          border-radius: 6px;
        }
        .target-num {
          margin-left: 10px;
          font-size: 32px;
          font-weight: bold;
          color: #ffffff;
        }
      }

      .progress {
        width: 100%;
        height: 192px;
        .pie {
          margin: 0 auto;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  span {
    font-size: 16px;
    color: #a4a6b3;
  }
  .right {
    padding: 32px 48px 34px 47px;
    .item {
      margin-bottom: 32px;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        font-weight: bold;
        font-size: 32px;
        opacity: 0.59;
        margin-bottom: 19px;
      }
      .name {
        font-size: 24px;
        color: #8e8bbd;
        margin-right: 24px;
      }
      .num {
        font-size: 48px;
        font-weight: bold;
        color: #cfccff;
      }
      .flex-wrap {
        flex: 1;
      }
      .finish-wrap {
        flex: 1;
        .finish-rate {
          margin-bottom: 12px;
          img {
            width: 10px;
            height: 24px;
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
