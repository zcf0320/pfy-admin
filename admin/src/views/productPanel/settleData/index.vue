<template>
  <div class="settle-data">
    <div class="product-panel-title-text flex">
      <div class="line"/>
      结算数据
    </div>
    <div class="settle-data-box flex">
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon1"/>
        <div class="settle-data-item-right">
          <div>保单结算</div>
          <div class="num">{{ data.policySettlementNum }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon2"/>
        <div class="settle-data-item-right">
          <div>保单结算金额</div>
          <div class="num">¥{{ data.policySettlementPrice }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon3"/>
        <div class="settle-data-item-right">
          <div>理赔结算</div>
          <div class="num">{{ data.claimSettlementNum }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon4"/>
        <div class="settle-data-item-right">
          <div>理赔结算金额</div>
          <div class="num">¥{{ data.claimSettlementPrice }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon5"/>
        <div class="settle-data-item-right">
          <div>供应商结算</div>
          <div class="num">{{ data.providerSettlementNum }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon6"/>
        <div class="settle-data-item-right">
          <div>供应商结算金额</div>
          <div class="num">¥{{ data.providerSettlementPrice }}</div>
        </div>
      </div>
      <div class="settle-data-item flex">
        <div class="settle-data-item-left icon7"/>
        <div class="settle-data-item-right">
          <div>利润率</div>
          <div class="num">{{ data.profitRate || 0 }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settleData',
  data() {
    return {
      data: {}
    };
  },
  computed: {
    productId() {
      return this.$store.getters.productId;
    }
  },
  watch: {
    productId: {
      handler(n) {
        if (n) {
          this.getList();
        }
      }
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('insuranceProducts/getStatisticsSettle', { productId: this.productId }).then((res) => {
        this.data = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.settle-data {
  &-box {
    width: 100%;
    height: 200px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 24px 0;
  }
  &-item {
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    margin-left: 75px;
    font-size: 14px;
    color: #a2a3b7;
    height: 58px;
    .num {
      font-size: 28px;
      color: #464668;
      margin-top: 4px;
    }
    &-left {
      width: 66px;
      height: 66px;
      &.icon1 {
        background-image: url("../components/images/icon-1.svg");
        background-size: 100% 100%;
      }
      &.icon2 {
        background-image: url("../components/images/icon-2.svg");
        background-size: 100% 100%;
      }
      &.icon3 {
        background-image: url("../components/images/icon-3.svg");
        background-size: 100% 100%;
      }
      &.icon4 {
        background-image: url("../components/images/icon-4.svg");
        background-size: 100% 100%;
      }
      &.icon5 {
        background-image: url("../components/images/icon-5.svg");
        background-size: 100% 100%;
      }
      &.icon6 {
        background-image: url("../components/images/icon-6.svg");
        background-size: 100% 100%;
      }
      &.icon7 {
        background-image: url("../components/images/icon-7.svg");
        background-size: 100% 100%;
      }
    }
  }
}
</style>
