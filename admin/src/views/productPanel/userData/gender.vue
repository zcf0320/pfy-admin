<template>
  <div class="user-gender">
    <div class="user-gender-title">性别分布</div>
    <div class="user-gender-box flex">
      <div class="user-gender-left">保单性别分布比例</div>
      <div class="user-gender-right flex">
        <div class="user-gender-legend flex">
          <div class="dot blue"/>
          男性
        </div>
        <div class="user-gender-legend flex">
          <div class="dot green"/>
          女性
        </div>
        <div class="user-gender-legend flex">
          <div class="dot grey"/>
          未知
        </div>
      </div>
    </div>
    <Bar v-bind="processBarModel" />
    <div class="user-gender-data flex">
      <div class="user-gender-data-item">
        <div class="num">{{ data.totalNum }}</div>
        用户总数
      </div>
      <div class="user-gender-data-item">
        <div class="num">{{ data.effectiveNum }}</div>
        有效用户数
      </div>
      <div class="user-gender-data-item">
        <div class="num">{{ data.serviceUseNum }}</div>
        使用服务用户数
      </div>
      <div class="user-gender-data-item">
        <div class="num">{{ data.avgServiceUseNum }}</div>
        人均使用服务项种类
      </div>
    </div>
  </div>
</template>

<script>
import Bar from '../components/bar.vue';
export default {
  name: 'userGender',
  components: { Bar },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      processBarModel: {
        processValue: [0, 0, 0]// 此处是每个进度的值
      }
    };
  },
  watch: {
    data: {
      handler(n) {
        if (n) {
          this.processBarModel.processValue = [];
          const item = n.genderStatistics;
          let male = 0;
          let female = 0;
          let unknow = 0;
          for (const i in n.genderStatistics) {
            if (item[i].sex === '男') {
              male = item[i].num;
            } else if (item[i].sex === '女') {
              female = item[i].num;
            } else {
              unknow = item[i].num;
            }
          }
          const total = male + female + unknow;
          this.processBarModel.processValue.push(((male / total * 100).toFixed(0)), ((female / total * 100).toFixed(0)), ((unknow / total * 100).toFixed(0)));
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.user-gender {
  flex: 0 0 55%;
  height: 281px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  margin-right: 24px;
  padding: 0 24px;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #545473;
    margin: 28px 0 8px;
  }
  &-box {
    justify-content: space-between;
    align-items: center;
  }
  &-left {
    font-size: 14px;
    color: #a2a3b7;
  }
  &-right {
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    color: #a2a3b7;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .blue {
      background: #6395f9;
    }
    .green {
      background: #6cdfad;
    }
    .grey {
      background: #a2a3b7;
    }
  }
  &-legend {
    justify-content: flex-start;
    align-items: center;
    margin-left: 24px;
  }
  &-data {
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 35px;
    border-top: 1px solid #ebedf2;
    margin-top: 24px;
    &-item {
      width: 84px;
      font-size: 14px;
      color: #a2a3b7;
      text-align: center;

      line-height: 21px;
      .num {
        font-size: 24px;
        font-weight: bold;
        color: #464668;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
