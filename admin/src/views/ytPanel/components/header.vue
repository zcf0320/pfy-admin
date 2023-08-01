<template>
  <div class="ytHeader">
    <div class="ytHeader-bg">{{ title }}</div>
    <div class="ytHeader-time flex">
      <div><span>时间范围</span>{{ startDate }} 至 {{ date }}</div>
      <div><span>数据更新时间</span>{{ newDate }}</div>
    </div>
    <div class="ytHeader-clock flex">
      <div class="stripe-left stripe"/>
      <FlipClock />
      <div class="stripe-right stripe"/>
    </div>
  </div>
</template>

<script>
import FlipClock from './flipClock';
import moment from 'moment';
export default {
  name: 'ytHeader',
  components: { FlipClock },
  props: {
    startDate: {
      type: String,
      default: '-----'
    },
    newDate: {
      type: String,
      default: '-----'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: ''
    };
  },
  created() {
    this.date = moment().format('YYYY-MM-DD');
  }
};
</script>

<style lang="scss" scoped>
.ytHeader {
  position: relative;
  &-bg {
    width: 100%;
    height: 126px;
    background: url('../images/header.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    text-align: center;
    line-height: 86px;
    font-size: 32px;
    font-weight: bold;
  }
  &-time {
    width: 100%;
    padding: 78px 72px 0;
    justify-content: space-between;
    align-items: center;
    span {
      margin-right: 24px;
    }
    color: #fff;
    font-size: 24px;
  }
  &-clock {
    justify-content: space-between;
    align-items: center;
    margin-top: 38px;
    .stripe {
      width: 1026px;
      height: 59px;
    }
    .stripe-left {
      background: url('../images/stripe-left.png');
      background-size: 100% 100%;
      margin-left: 44px;
    }
    .stripe-right {
      background: url('../images/stripe-right.png');
      background-size: 100% 100%;
      margin-right: 44px;
    }
  }
}
</style>
