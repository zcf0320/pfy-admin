<template>
  <div class="ytHeader">
    <div class="ytHeader-bg">{{ title }}</div>
    <div class="ytHeader-time flex">
      <div><span>时间范围</span>{{ startDate }} 至 {{ endDate }}</div>
      <div><span>数据更新时间</span>{{ date }}</div>
    </div>
    <div class="ytHeader-clock flex">
      <div class="stripe-left stripe" />
      <div class="count-down flex">
        <div class="label">倒</div>
        <div class="label">计</div>
        <div class="label">时</div>
        <div class="label multi">
          <div>{{ lastDay }}</div>
          <div>天</div>
        </div>
      </div>
      <div class="stripe-right stripe" />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'ytHeader',

  props: {
    startDate: {
      type: String,
      default: '-----'
    },
    endDate: {
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
      date: '',
      lastDay: moment(this.endDate).diff(moment(), 'days')
    };
  },

  created() {
    setInterval(() => {
      this.date = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
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
    .count-down {
      .label {
        min-width: 80px;
        height: 100px;
        padding: 0 16px;
        margin-right: 32px;
        font-size: 48px;

        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;
        background: url('../images/border.png') no-repeat;
        background-size: cover;
        &:last-child {
          margin-right: 0;
        }
        &::before {
          content: ' ';
          position: absolute;
          display: block;
        }
        &.multi {
          background: url('../images/border-long.png') no-repeat;
          background-size: cover;
          width: 182px;
          justify-content: center;
        }
      }
    }
  }
}
</style>
