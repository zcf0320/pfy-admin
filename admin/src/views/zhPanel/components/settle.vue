<template>
  <div class="zh-settle zh-layput-pad flex">
    <div class="zh-settle-container flex">
      <div>
        <div class="yt-card-name">
          保单结算
        </div>
        <div class="zh-settle-policy">
          <div class="zh-settle-img-num img" />
          <div class="zh-settle-num">{{ data.policySettlementNum }}</div>
          <div class="zh-settle-text">结算数量</div>
        </div>
      </div>
      <div class="zh-settle-container-amount ">
        <div class="zh-settle-policy">
          <div class="zh-settle-img-all img" />
          <div class="zh-settle-num">{{ data.policySettlementPrice }}</div>
          <div class="zh-settle-text">结算金额</div>
        </div>
      </div>
    </div>
    <div class="zh-settle-line" />
    <div class="zh-settle-container flex">
      <div class="zh-settle-container-num ">
        <div class="yt-card-name">
          供应商结算
        </div>
        <div class="zh-settle-policy">
          <div class="zh-settle-img-num img" />
          <div class="zh-settle-num">{{ data.providerSettlementNum }}</div>
          <div class="zh-settle-text">结算数量</div>
        </div>
      </div>
      <div>
        <div class="zh-settle-policy">
          <div class="zh-settle-img-all img" />
          <div class="zh-settle-num">{{ data.providerSettlementPrice }}</div>
          <div class="zh-settle-text">结算金额</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settle',
  computed: {
    data() {
      return this.$store.getters.zhPanelData;
    }
  }
};
</script>

<style lang="scss" scoped>
.zh-settle {
  width: 800px;
  height: 431px;
  justify-content: flex-start;
  align-items: center;
  &-container {
    width: 400px;
    justify-content: flex-start;
    align-items: flex-end;
    &-amount {
      margin-left: 53px;
    }
    &-num {
      margin-left: 56px;
    }
  }
  .img {
    margin: 73px auto 48px;
    width: 108px;
    height: 86px;
  }
  &-img-num {
    background: url('../images/num.svg');
    background-size: 100% 100%;
  }
  &-img-all {
    background: url('../images/all.svg');
    background-size: 100% 100%;
  }
  &-num {
    font-size: 48px;

    font-weight: bold;
    color: #cfccff;
    margin-bottom: 48px;
    width: 130px;
    text-align: center;
  }
  &-text {
    font-size: 24px;

    font-weight: bold;
    color: #8e8bbd;
    width: 130px;
    text-align: center;
  }
  &-line {
    width: 1px;
    height: 318px;
    border: 1px solid #8e8bbd;
  }
}
</style>
