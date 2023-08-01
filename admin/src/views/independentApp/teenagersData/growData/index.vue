<template>
  <div v-loading="bmiLoading" class="all-data">
    <div class="product-panel-title flex">
      <div class="product-panel-title-text flex">
        <div class="line" />
        生长发育情况
      </div>
    </div>
    <div class="bmidata-box">
      <div class="bmidata-box-head">
        <div class="bmidata-box-head-l">
          <div class="bmidata-title">BMI</div>
          <div class="bmidata-subtitle">
            标准BMI值：正常：18.5-23.9、超重：≥24、偏胖：24～27.9、肥胖：≥28
          </div>
        </div>
        <div class="bmidata-box-head-r">
          <el-select
            v-model="age"
            placeholder="请选择年龄"
            clearable
            @change="ageChange"
          >
            <el-option
              v-for="item in ageList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="sex-bmi">
        <div class="sex-bmi-l">
          <img
            src="../../../../assets/teenagersData/boy-bmi.png"
            class="boy-bmi"
            alt=""
          />
          <div class="sex-bmi-l-title">男生平均BMI</div>
          <div class="sex-bmi-l-subtitle">{{ bmiData.manBmi || '-' }}</div>
          <div
            :class="
              `${
                bmiData.manBimRemark === '正常'
                  ? 'sex-bmi-l-state-good'
                  : 'sex-bmi-l-state-bad'
              }`
            "
          >
            {{ bmiData.manBimRemark || '-' }}
          </div>
        </div>
        <div class="sex-bmi-r">
          <img
            src="../../../../assets/teenagersData/girl-bmi.png"
            class="girl-bmi"
            alt=""
          />
          <div class="sex-bmi-r-title">女生平均BMI</div>
          <div class="sex-bmi-r-subtitle">{{ bmiData.womanBmi || '-' }}</div>
          <div
            :class="
              `${
                bmiData.womanBmiRemark === '正常'
                  ? 'sex-bmi-l-state-good'
                  : 'sex-bmi-l-state-bad'
              }`
            "
          >
            {{ bmiData.womanBmiRemark || '-' }}
          </div>
        </div>
        <div class="sex-bmi-score">
          <div class="sex-bmi-score-title">学生营养平均得分</div>
          <div class="sex-bmi-score-title">
            {{ bmiData.stuHealthAvg || '-' }}
          </div>
          <div class="sex-bmi-score-go" @click="goList">查看列表>></div>
        </div>
      </div>
      <HeighWight :data="heightWightData" />
    </div>
  </div>
</template>

<script>
import HeighWight from './highWight.vue';
import { default as api } from '@/api/YouthHealthRecord';
export default {
  name: 'GrowData',
  components: { HeighWight },
  props: {
    schoolId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      age: '',
      bmiLoading: false,
      ageList: [],
      bmiData: {},
      heightWightData: []
    };
  },
  watch: {
    schoolId() {
      this.getData({ schoolId: this.schoolId, age: this.age });
    }
  },
  created() {
    for (let i = 10; i <= 30; i++) {
      this.ageList.push({ label: `${i}岁`, value: `${i}` });
    }
    this.getData({ schoolId: this.schoolId });
  },
  methods: {
    ageChange() {
      this.getData({ schoolId: this.schoolId, age: this.age });
    },
    getData(params) {
      this.bmiLoading = true;
      api.getStuHealthAvg(params).then(res => {
        this.bmiData.stuHealthAvg = res.data;
        api.getStuBmi(params).then(res1 => {
          this.bmiLoading = false;
          this.bmiData = { ...this.bmiData, ...res1.data };
        });
      });
      api.getStuWeightAndHeight({ schoolId: this.schoolId }).then(res => {
        this.heightWightData = res.data;
      });
    },
    goList() {
      this.$router.push('/independent-application/youth-health-record/index');
    }
  }
};
</script>

<style lang="scss" scoped>
.all-data {
  overflow: hidden;
  &-selsct {
    margin-right: 30px;
  }
  &-box {
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    &-claim {
      flex: 0 0 50%;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  &-plan {
    justify-content: space-between;
    align-items: center;
  }
  .bmidata-box {
    background-color: #fff;
    padding: 24px;
    margin-top: 24px;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    &-head {
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
    .sex-bmi {
      margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0 27px 0;
      &-l {
        width: 146px;
        height: 103px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(68, 96, 225, 0.2);
        border-radius: 6px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        .boy-bmi {
          width: 43px;
          height: 44px;
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%) translateY(-50%);
        }
        &-title {
          font-size: 14px;

          font-weight: bold;
          color: #4a6afd;
          line-height: 16px;
          margin-top: 30px;
        }
        &-subtitle {
          font-size: 14px;

          font-weight: bold;
          color: #627efd;
          line-height: 16px;
          margin-top: 4px;
        }
        &-state-good {
          width: 44px;
          height: 18px;
          background: rgba(39, 224, 205, 0.1);
          border-radius: 12px;
          font-size: 12px;

          font-weight: bold;
          color: #27e0cd;
          line-height: 18px;
          text-align: center;
          margin-top: 10px;
        }
        &-state-bad {
          width: 44px;
          height: 18px;
          background: rgba(255, 119, 93, 0.1);
          border-radius: 12px;
          font-size: 12px;

          font-weight: bold;
          color: #ff775d;
          line-height: 18px;
          text-align: center;
          margin-top: 10px;
        }
      }
      &-r {
        width: 146px;
        height: 103px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(68, 96, 225, 0.2);
        border-radius: 6px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 30px;
        .girl-bmi {
          width: 43px;
          height: 44px;
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%) translateY(-50%);
        }
        &-title {
          font-size: 14px;

          font-weight: bold;
          color: #ff775d;
          line-height: 16px;
          margin-top: 30px;
        }
        &-subtitle {
          font-size: 14px;

          font-weight: bold;
          color: #ff775d;
          line-height: 16px;
          margin-top: 4px;
        }
        &-state-good {
          width: 44px;
          height: 18px;
          background: rgba(39, 224, 205, 0.1);
          border-radius: 12px;
          font-size: 12px;

          font-weight: bold;
          color: #27e0cd;
          line-height: 18px;
          text-align: center;
          margin-top: 10px;
        }
        &-state-bad {
          width: 44px;
          height: 18px;
          background: rgba(255, 119, 93, 0.1);
          border-radius: 14px;
          font-size: 12px;

          font-weight: bold;
          color: #ff775d;
          line-height: 18px;
          text-align: center;
          margin-top: 10px;
        }
      }
      &-score {
        width: 146px;
        height: 103px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(68, 96, 225, 0.2);
        border-radius: 6px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 30px;
        padding-top: 22px;
        &-title {
          font-size: 14px;

          font-weight: bold;
          color: #3599fe;
          line-height: 16px;
          margin-bottom: 4px;
        }
        &-go {
          font-size: 14px;

          font-weight: bold;
          color: #3599fe;
          line-height: 16px;
          margin-bottom: 4px;
          margin-top: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
