<template>
  <div class="service-list-container modal-form">
    <el-dialog
      v-loading="loading"
      :title="`[${serviceName}]使用记录`"
      :visible="isShow"
      width="800px"
      center
      @close="close"
    >
      <div class="table">
        <el-table :data="serviceRecordVos">
          <el-table-column label="服务记录ID">
            <template slot-scope="scope">
              <span>{{ scope.row.parentRecordId || '-' }}</span>
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
                >详情</span
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
  name: 'ServiceDetailListModal',
  props: {
    serviceInfoId: {
      type: String,
      default: ''
    },
    serviceName: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    serviceRecordVos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      serviceList: []
    };
  },
  created() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 查询无限次数服务记录
    getServiceList() {
      this.$store
        .dispatch('userManage/getServiceList', {
          id: this.id,
          serviceInfoId: this.serviceInfoId,
          type: this.type
        })
        .then(res => {
          this.serviceList = res.obj || [];
        });
    },
    lookPage(item) {
      //     DRUG_ORDER_DETAIL,      //购药订单
      //   COUPON_CODE_DETAIL,          //虚拟商品兑换
      // COUPON_DETAIL,          //实物商品兑换
      // AI_DIAGNOSE_DETAIL,     //AI问诊
      // DOCTOR_DIAGNOSE_DETAIL, //人工问诊
      // TEL_DIAGNOSE_DETAIL,     //电话问诊
      // DOCTOR_TREATMENT_DETAIL   //医师服务
      let routeData = '';
      if (item.servicePath === 'DRUG_ORDER_DETAIL') {
        routeData = this.$router.resolve({
          path: `/drugManage/orderDetails/${item.detailId}`
        });
      } else if (item.servicePath === 'COUPON_CODE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.detailId}/0`
        });
      } else if (item.servicePath === 'COUPON_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.detailId}/1`
        });
      } else if (item.servicePath === 'AI_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/inquiryRecord/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'DOCTOR_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/inquiryRecord/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'TEL_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/telWorkOrderManage/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'ONLINE_SERVICE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${item.detailId}`
        });
      } else {
        routeData = this.$router.resolve({
          path: `/secondaryTreatment/treatments/detail/${item.detailId}`
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
