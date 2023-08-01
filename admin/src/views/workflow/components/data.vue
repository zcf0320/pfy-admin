<template>
  <div class="flow-data card">
    <div class="flex header">
      <div class="card-title flex">
        <div class="icon" />
        <span>数据总览</span>
      </div>
      <div class="time">
        统计时间：{{ $moment().format('YYYY-MM-DD 00:00:00') }}
      </div>
    </div>
    <div class="bar flex">
      <div class="flex">
        <div class="box flex">
          <span>{{ providerTotal }}</span>
          <span class="name">供应商数</span>
        </div>
        <img class="img-chart" src="../images/suppliers-chart.png" alt="" />
      </div>

      <div class="line" />
      <div class="flex">
        <div class="box flex">
          <span>{{ serviceTotal }}</span>
          <span class="name">服务项数</span>
        </div>
        <img class="img-chart" src="../images/service-item-chart.png" alt="" />
      </div>

      <div class="line" />
      <div class="flex">
        <div class="box flex">
          <span>{{ yearAmount }}</span>
          <span class="name">保单量</span>
        </div>
        <img class="img-chart" src="../images/policy-chart.png" alt="" />
      </div>

      <div class="line" />
      <div class="flex">
        <div class="box flex">
          <span>{{ productNum }}</span>
          <span class="name">保险产品数</span>
        </div>
        <img class="img-chart" src="../images/insurance-chart.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/utils/common';
import { mapActions } from 'vuex';
export default {
  name: 'flowData',
  data() {
    return {
      providerTotal: '-',
      serviceTotal: '-',
      userAllCount: '-',
      userServicedCount: '-',
      yearAmount: '-',
      productNum: '-'
    };
  },
  created() {
    this.getPovider();
    this.getUser();
    this.getProduct();
  },
  methods: {
    ...mapActions('serviceItems', ['getProviderType', 'getServiceStatus']),
    ...mapActions('operateManageDashboard', ['getUserDashboard']),
    ...mapActions('insuranceProducts', ['getStatistics', 'getStatisticsAll']),
    getPovider() {
      const year = this.$moment().format('YYYY');
      const month = this.$moment().format('MM');
      this.getProviderType({
        year,
        month
      }).then(res => {
        const { data } = res;
        this.providerTotal = toThousands(data.total || 0);
      });
      this.getServiceStatus({
        year,
        month
      }).then(res => {
        const { data } = res;
        this.serviceTotal = toThousands(data.total || 0);
      });
    },
    getUser() {
      this.getUserDashboard({
        create_time: this.$moment().format('YYYY-MM-DD')
      }).then(res => {
        const { data, status } = res;
        if (status && data) {
          this.userAllCount = data.userAllCount || 0;
          this.userServicedCount = data.userServicedCount || 0;
        }
      });
    },
    getProduct() {
      this.getStatisticsAll().then(res => {
        this.productNum = res.data.productNum || 0;
        this.yearAmount = res.data.policyNumAll || 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.flow-data {
  height: 168px;
  .header {
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('../images/data.svg');
      background-size: 100% 100%;
    }
    .time {
      font-size: 14px;
      font-weight: 400;
      color: #989ab3;
    }
  }
  .bar {
    justify-content: space-between;
    align-items: center;
    padding: 0 62px;
    margin-top: 40px;
    .box {
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: #464668;
      flex-direction: column;
      text-align: center;
      .name {
        font-size: 14px;
        color: #989ab3;
        font-weight: normal;
        margin-top: 5px;
      }
    }
    .img-chart {
      width: 56px;
      height: 25px;
      margin-left: 13px;
    }
    .line {
      width: 2px;
      height: 36px;
      background: #ebedf2;
    }
  }
}
</style>
