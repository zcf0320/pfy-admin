<template>
  <div class="el-container">
    <div class="el-main">
      <div class="flex-col">
        <Tab :btns="btns" @change="tabClick" />
        <div class="scroll-table">
          <Detail v-if="activeName === '0'" />
          <Prescription v-if="activeName === '1'" />
          <OrderLogs v-if="activeName === '2'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from './components/orderDetails';
import OrderLogs from './components/orderLogs';
import Prescription from './components/prescription';
export default {
  name: 'orderTabs',
  components: { Detail, OrderLogs, Prescription },
  data() {
    return {
      state: 0,
      btns: [
        { value: '0', name: '订单详情' },
        { value: '1', name: '处方单信息' },
        { value: '2', name: '操作日志' }
      ],
      activeName: '0'
    };
  },
  methods: {
    tabClick(state) {
      this.activeName = state;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  .tab-item {
    padding: 18px 0;
    margin-right: 48px;
    color: #333333;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.1s ease;
  }
  .tab-item-active {
    position: relative;
    color: #2276ff;
    font-weight: 500;
    &::after {
      content: '';
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #2276ff;
    }
  }
}
.table {
  margin-top: 24px;
  .message {
    padding-left: 10px;
    .text {
      color: #6f6f6f;
      margin: 24px 0;
      font-size: 16px;
      line-height: 16px;
      &:first-child {
        color: #333333;
      }
    }
    .name {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #2276ff;
        font-weight: 500;
      }
      &:active {
        color: #005ef7;
        font-weight: 500;
      }
    }
  }
  .edit {
    width: 20px;
    height: 20px;
    background-image: url('../../../assets/icon_edit.png');
    background-size: 100% 100%;
    cursor: pointer;
    &:active {
      background-image: url('../../../assets/icon_edit_active.png');
    }
  }
}
</style>
