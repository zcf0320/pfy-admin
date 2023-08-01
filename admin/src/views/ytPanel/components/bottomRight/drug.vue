<template>
  <div class="ytDrug">
    <div class="yt-card-name">药品统计</div>
    <div v-if="drugStatisticsVO" class="ytDrug-pie-box flex">
      <DrugPie
        title="单药品订单"
        :num="drugStatisticsVO.singleDrugNum"
        :amount="drugStatisticsVO.singleDrugAmount"
        :total="claimRecordTotalAmount"
        text="订单占比"
      /><DrugPie
        title="多药品订单"
        :num="drugStatisticsVO.multipleDrugsNum"
        :amount="drugStatisticsVO.multipleDrugsAmount"
        :total="claimRecordTotalAmount"
        text="订单占比"
      />
    </div>
  </div>
</template>

<script>
import DrugPie from './drugPie.vue';
export default {
  name: 'ytDrug',
  components: { DrugPie },
  computed: {
    drugStatisticsVO() {
      return this.$store.getters.ytPanelData.drugStatisticsVO;
    },
    claimRecordTotalAmount() {
      return this.$store.getters.ytPanelData.claimRecordVO.claimRecordTotalAmount;
    }
  }
};
</script>

<style lang="scss" scoped>
.ytDrug {
  width: 490px;
  &-pie-box {
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
