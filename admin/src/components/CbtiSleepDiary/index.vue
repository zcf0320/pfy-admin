<template>
  <div>
    <div class="title-top flex-between">
      睡眠日记
      <div class="select-time">
        <div class="text">选择时间</div>
        <el-date-picker
          v-model="time"
          class="ml-12"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择时间"
          @change="ChangeTime"
        />
      </div>
    </div>
    <div class="sleep-result">
      睡眠质量评估
      <div :class="sleepState[detail.sleepState] || 'sleep-result-ccc'">
        {{ sleepStateStr[detail.sleepState] || '-' }}
      </div>
    </div>
    <div class="user-record-detail-list">
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          您昨晚大概几点睡着？
        </div>
        <div class="user-record-detail-item-content">
          {{ detail.asleep | asleep }}
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          您今早几点醒来？
        </div>
        <div class="user-record-detail-item-content">
          {{ detail.wake | wake }}
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          昨晚有醒来过吗？
        </div>
        <div class="user-record-detail-item-content">
          {{ detail.havaWake | haveWake }}
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          昨天服用过助眠类药物吗？
        </div>
        <div class="user-record-detail-item-content">
          {{ detail.medicineFlag | medicineFormat }}
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          昨天白天有小睡一会吗？
        </div>
        <div class="user-record-detail-item-content">
          {{ detail.haveSleepFlag | medicineFormat }}
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          早上起来感觉如何?（多选）
        </div>
        <div class="user-record-detail-item-content">
            <span v-for="(item,index) in detail.wakeFeeling.split(',')" :key="index">
 {{ item | wakeFeeling }}
            </span>
        </div>
      </div>
      <div class="user-record-detail-item">
        <div class="user-record-detail-item-title">
          补充内容
        </div>
        <el-input
          v-model="detail.remark"
          type="textarea"
          autosize
          placeholder="-"
          disabled
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CbtiSleepDiary',
  props: {
    detail: {
      type: Object,
      default: () => {
        return { };
      }
    }
  },
  data() {
    return {
      time: '',
      sleepState: {
        1: 'sleep-result-green',
        2: 'sleep-result-blue',
        3: 'sleep-result-red'
      },
      sleepStateStr: {
        1: '良好',
        2: '一般',
        3: '较差'
      }
    };
  },
  created() {
    this.time = this.$moment(new Date().getTime()).format('YYYY-MM-DD');
  },
  methods: {
    ChangeTime(val) {
      this.$emit('changeTime', val);
    }
  }
};
</script>
<style lang="scss" scoped>
.select-time {
  width: 300px;
  display: flex;
  align-items: center;

  .text {
    width: 80px;
    font-size: 14px;
    font-weight: 400;
    color: #464668;
  }
}
.sleep-result {
  font-size: 14px;
  font-weight: 400;
  color: #464668;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  &-green {
    width: 68px;
    height: 38px;
    background: #c9f7f4;
    border-radius: 4px;
    border: 1px solid #18c4bd;
    font-size: 14px;

    font-weight: 400;
    color: #18c4bd;
    line-height: 38px;
    margin-left: 24px;
    text-align: center;
    cursor: pointer;
  }
  &-blue {
    width: 68px;
    height: 38px;
    background: #e1f1ff;
    border-radius: 4px;
    border: 1px solid #3599fe;
    font-size: 14px;

    font-weight: 400;
    color: #3599fe;
    line-height: 38px;
    margin-left: 24px;
    text-align: center;
    cursor: pointer;
  }
  &-red {
    width: 68px;
    height: 38px;
    background: #ffe2e5;
    border-radius: 4px;
    border: 1px solid #f64e60;
    font-size: 14px;

    font-weight: 400;
    color: #f64e60;
    line-height: 38px;
    margin-left: 24px;
    text-align: center;
    cursor: pointer;
  }
  &-ccc {
    width: 68px;
    height: 38px;
    background: #f3f7ff;
    border-radius: 4px;
    border: 1px solid #f3f7ff;
    font-size: 14px;

    font-weight: 400;
    color: #333;
    line-height: 38px;
    margin-left: 24px;
    text-align: center;
    cursor: pointer;
  }
}
.user-record-detail-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .user-record-detail-item {
    width: calc(50% - 15px);
    margin-bottom: 24px;
    &-title {
      font-size: 14px;
      color: #464668;
      line-height: 14px;
      margin-bottom: 12px;
      .health-tip {
        font-size: 14px;
        color: #3599fe;
        line-height: 14px;
        float: right;
        cursor: pointer;
      }
    }
    &-content {
      width: 100%;
      height: 38px;
      background: #f3f7ff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 18px;
      font-size: 14px;
      color: #464668;
      line-height: 38px;
      &.height {
        display: flex;
        align-items: center;
        line-height: 18px;
        padding: 13px 18px;
      }
    }
    &-contentH {
      width: 100%;
      background: #f3f7ff;
      border-radius: 4px;
      font-size: 14px;
      color: #464668;
      line-height: 38px;
      display: flex;
      align-items: center;
      line-height: 18px;
      padding: 11px 18px;
    }
    &.long {
      width: 100%;
    }
  }
}
</style>
