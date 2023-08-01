<template>
  <div class="service-list-container modal-form">
    <el-dialog
      v-loading="loading"
      :title="`[${serviceName}]服务记录`"
      :visible="isShow"
      width="800px"
      center
      @close="close"
    >
      <div class="table">
        <el-table :data="serviceList">
          <el-table-column label="服务记录ID">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceRecordId || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="76">
            <template slot-scope="scope">
              <span class="primary pointer" @click="lookPage(scope.row)"
                >查看</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ServiceListModal',
  props: {
    serviceInfoId: {
      type: String,
      default: ''
    },
    serviceName: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      serviceList: []
    };
  },
  created() {
    const vm = this;
    vm.getServiceList();
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 查询无限次数服务记录
    getServiceList() {
      this.$store
        .dispatch('userManage/getServiceList', {
          userId: this.userId,
          serviceInfoId: this.serviceInfoId
        })
        .then(res => {
          this.serviceList = res.obj || [];
        });
    },
    lookPage(item) {
      let routeData = '';
      // 查看预约记录详情
      if (item.serviceType === '1') {
        routeData = this.$router.resolve({
          path: `/operateManage/appointmentService/details/${item.reverseId}/${item.reverseType}`
        });
      } else if (item.serviceType === '2') {
        // 在线服务详情
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${item.serviceRecordId}`
        });
      } else {
        // 商品兑换
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.commodityId}/${item.commodityType}`
        });
      }
      window.open(routeData.href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.service-list-container {
  padding: 1px 0;
  .table {
    min-height: 200px;
    max-height: 500px;
    overflow-y: auto;
  }
}
</style>
