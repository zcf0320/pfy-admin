<template>
  <div class="product-panel">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="product-panel-title flex">
          <div class="product-panel-title-text flex">
            <div class="line" />
            人数分布情况
          </div>
          <SelectSchool
            v-model="schoolId"
            placeholder="请选择学校"
            :filterable="true"
            class="mr-30"
            @change="schoolChange"
          />
        </div>
        <PeopleData v-loading="peopleLoading" :age-data="peopleData" />
        <GrowData :school-id="schoolId" />
        <div v-loading="eyeLoading" class="eye-data">
          <div class="eye-data-title">视力情况</div>
          <div class="eye-el-progress">
            <div class="eye-el-progress-l">
              <EyeAverage :data="eyeData" />
            </div>
            <div class="eye-el-progress-r">
              <el-progress
                type="circle"
                :stroke-width="8"
                :width="126"
                stroke-linecap="butt"
                :percentage="eyeData.avg * 100"
                :show-text="false"
              />
              <div class="eye-average">
                <div class="eye-average-t">平均视力</div>
                <div class="eye-average-b">{{ eyeData.avg || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="life-habit">
          <LifeHabit :school-id="schoolId" />
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import PeopleData from './peopleData';
import GrowData from './growData';
import LifeHabit from './lifeHabit';
import EyeAverage from './components/eyeAverage';
import SelectSchool from '../component/SelectSchool';
import { default as api } from '@/api/YouthHealthRecord';
export default {
  name: 'teenagersData',
  components: { PeopleData, GrowData, EyeAverage, LifeHabit, SelectSchool },
  data() {
    return {
      schoolId: '',
      eyeLoading: false,
      peopleLoading: false,
      eyeData: {
        avg: 0
      },
      peopleData: {
        list: [],
        other: null
      }
    };
  },
  mounted() {
    this.schoolChange('');
  },
  methods: {
    schoolChange(val) {
      this.schoolId = val;
      this.eyeLoading = true;
      this.peopleLoading = true;
      api.getStuEye({ schoolId: val }).then(res => {
        this.eyeLoading = false;
        this.eyeData = res.data;
      });
      api.getStuAge({ schoolId: val }).then(res => {
        this.peopleLoading = false;
        this.peopleData = res.data;
        api.getStuSexProportion({ schoolId: val }).then(res1 => {
          const genderStatistics = [
            { sex: '男', num: res1.data.manNum },
            { sex: '女', num: res1.data.womanNum }
          ];
          this.peopleData = { ...this.peopleData, genderStatistics };
        });
      });
    }
  }
};
</script>

<style lang="scss">
.product-panel {
  &-title {
    justify-content: space-between;
    align-items: center;
    &-text {
      font-size: 18px;
      font-weight: bold;
      color: #545473;
      margin-left: 8px;
      justify-content: flex-start;
      align-items: center;

      .line {
        width: 4px;
        height: 18px;
        background: #3599fe;
        margin-right: 8px;
      }
    }
  }
  .eye-data {
    padding: 24px;
    background-color: #fff;
    margin: 24px 0;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #545473;
      line-height: 18px;
    }
    .eye-el-progress {
      margin-top: 24px;
      display: flex;
      align-items: center;
      &-l {
        height: 180px;
        width: 350px;
      }
      &-r {
        position: relative;
        width: 126px;
        height: 126px;
        .eye-average {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          &-t {
            font-size: 14px;

            font-weight: 400;
            color: #a2a3b7;
            line-height: 14px;
            text-align: center;
          }
          &-b {
            font-size: 24px;

            font-weight: bold;
            color: #464668;
            line-height: 18px;
            margin-top: 7px;
            text-align: center;
          }
        }
      }
    }
  }
  .life-habit {
    padding: 24px;
    background-color: #fff;
  }
}
</style>
