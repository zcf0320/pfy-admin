<template>
  <div class="life-habit-page">
    <div class="bmidata-box-head">
      <div class="bmidata-box-head-l">
        <div class="bmidata-title">生活习惯与压力</div>
        <div class="bmidata-subtitle">
          80分以上的同学生活习惯较为健康，建议加强观察80分以下的同学，及时疏导、缓解压力
        </div>
      </div>
      <div class="bmidata-box-head-r">
        <div class="high-wight-page-tab">
          <div
            :class="`tab-item ${tab === 0 ? 'active' : ''} `"
            @click="tabChange(0)"
          >
            平均压力得分
          </div>
          <div
            :class="`tab-item ${tab === 1 ? 'active' : ''} `"
            @click="tabChange(1)"
          >
            平均睡眠时长
          </div>
        </div>
      </div>
    </div>
    <div class="life-habit-page-chart">
      <div class="life-habit-page-chart-l">
        <div class="chart-l-title">平均得分：{{ pressureData.scoreAvg }}分</div>
        <div class="chart-l-subtitle">全校总人数生活习惯与压力</div>
        <div class="chart-l-title">{{ pressureData.pressureNum }}人</div>
        <div class="chart-l-subtitle">有熬夜习惯的人数</div>
        <div class="chart-l-title">{{ pressureData.stayUpLateNum }}人</div>
        <div class="chart-l-subtitle">生活压力较大的人数</div>
      </div>
      <div class="life-habit-page-chart-r">
        <ScoreChart :data="dataList" :tab="tab" />
        <div class="chart-r-title">
          <div class="chart-r-title-l">年级平均得分：</div>
          <div class="chart-r-title-r">
            <div class="chart-r-title-r-blue">生活习惯与压力得分</div>
            <div class="chart-r-title-r-green">平均睡眠时长</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreChart from './scoreChart.vue';
import { default as api } from '@/api/YouthHealthRecord';
export default {
  name: 'LifeHabit',
  components: { ScoreChart },
  props: {
    schoolId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tab: 0,
      dataList: [],
      pressureData: {}
    };
  },
  watch: {
    schoolId() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.tab) {
        api.getSleepTime({ schoolId: this.schoolId }).then(res => {
          this.dataList = res.data;
        });
      } else {
        api.getPressureAvg({ schoolId: this.schoolId }).then(res => {
          this.dataList = res.data;
        });
      }
      api.getStuPressure({ schoolId: this.schoolId }).then(res => {
        this.pressureData = res.data;
      });
    },
    tabChange(val) {
      this.tab = val;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.life-habit-page {
  .bmidata-box-head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-l {
      .bmidata-title {
        font-size: 18px;

        font-weight: bold;
        color: #545473;
        line-height: 18px;
      }
      .bmidata-subtitle {
        font-size: 14px;

        font-weight: 400;
        color: #a2a3b7;
        line-height: 14px;
        margin-top: 8px;
      }
    }
  }
  .high-wight-page-tab {
    width: 200px;
    height: 32px;
    display: flex;
    cursor: pointer;
    .tab-item {
      width: 50%;
      height: 32px;
      font-size: 14px;

      font-weight: 400;
      color: #989ab3;
      line-height: 32px;
      text-align: center;
      &.active {
        background: #3599fe;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  &-chart {
    margin-top: 24px;
    display: flex;
    height: 258px;
    &-l {
      width: 200px;
      height: 100%;
      padding: 16px;
      background: #fafcff;
      border-radius: 4px;
      margin-right: 24px;
      .chart-l-title {
        font-size: 18px;

        font-weight: bold;
        color: #464668;
        line-height: 18px;
      }
      .chart-l-subtitle {
        font-size: 14px;

        font-weight: 400;
        color: #a2a3b7;
        line-height: 14px;
        margin: 8px 0 24px;
      }
    }
    &-r {
      flex: 1;
      position: relative;
      .chart-r-title {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        &-l {
          font-size: 14px;

          font-weight: bold;
          color: #545473;
          line-height: 14px;
        }
        &-r {
          flex: 1;
          display: flex;
          font-size: 12px;

          font-weight: 400;
          color: #464668;
          line-height: 12px;
          align-items: center;
          justify-content: center;
          &-blue {
            margin-right: 24px;
            &::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background: #6395f9;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
          &-green {
            &::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background: #6cdfad;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
