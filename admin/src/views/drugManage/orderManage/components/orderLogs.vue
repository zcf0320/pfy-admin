<template>
  <div v-loading="tableLoading" class="logs">
    <div v-for="(item, index) in list" :key="index" class="list">
      <div class="dot" />
      <div class="date">{{ item.operationTime }}</div>
      <div class="operater">操作人{{ item.operator }}</div>
      <div class="operater">{{ item.operationDetails }}</div>
      <div class="operater min-operater">
        {{ item.operationType | formatType }}
      </div>
      <div class="operater">{{ item.remark }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderLogs',
  filters: {
    formatType(type) {
      switch (type) {
        case '待确认':
          return '待确认';
        case '已结算':
          return '已结算';
        case '待发货':
          return '待发货';
        case '已取消':
          return '已取消';
        case '已发货':
          return '已发货';
        case '已完成':
          return '已完成';
        default:
          return '';
      }
    }
  },
  data() {
    return {
      tableLoading: true,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const vm = this;
      const params = {
        id: this.$route.params.id
      };
      vm.tableLoading = true;
      this.$store
        .dispatch('drugManage/getLogsList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.list = res.obj || [];
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.logs {
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 24px 0;
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    .dot {
      width: 14px;
      height: 14px;
      background: #3599fe;
      border-radius: 50%;
      margin-right: 12px;
    }
    .operater {
      margin-left: 24px;
      width: 200px;
    }
    .min-operater {
      width: 100px;
    }
    .tag {
      width: 60px;
      height: 22px;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      margin-left: 24px;
    }
    .comfirm {
      background: rgba(71, 206, 198, 0.1);
      color: #2276ff;
    }
    .upload {
      background: rgba(34, 118, 255, 0.1);
      color: #47cec6;
    }
  }
}
</style>
