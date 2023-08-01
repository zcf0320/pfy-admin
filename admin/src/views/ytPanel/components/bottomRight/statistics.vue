<template>
  <div class="ytStatistics">
    <div class="yt-card-name">理赔统计</div>
    <div class="ytStatistics-claim flex">
      <div class="ytStatistics-claim-box flex">
        <div class="name">理赔案件(件)</div>
        <div v-if="claimRecordVO">
          {{ claimRecordVO.claimRecordNum }}
        </div>
      </div>
      <div class="ytStatistics-claim-box flex">
        <div class="name">理赔申请<span>(人次)</span></div>
        <div v-if="claimRecordVO">
          {{ claimRecordVO.applicantPersonNum }}
        </div>
      </div>
      <div class="ytStatistics-claim-box flex">
        <div class="name">赔付金额(元)</div>
        <div v-if="claimRecordVO">
          {{ claimRecordVO.claimRecordTotalAmount }}
        </div>
      </div>
    </div>
    <div class="ytStatistics-text flex">
      首次理赔占比
      <span v-if="claimRecordVO">
        {{ claimRecordVO.applicantPersonNum }}/{{
          (claimRecordVO.firstTimeRate * 100).toFixed(0)
        }}%</span>
    </div>
    <el-progress
      :percentage="(claimRecordVO && claimRecordVO.firstTimeRate * 100) || 0"
      color="#FFBD1C"
      :show-text="false"
      class="yt-bar"
    />
  </div>
</template>

<script>
export default {
  name: 'ytStatistics',
  computed: {
    claimRecordVO() {
      return this.$store.getters.ytPanelData.claimRecordVO;
    }
  }
};
</script>

<style lang="scss" scoped>
.ytStatistics {
  width: 490px;
  border-bottom: 1px solid #5b588e;
  margin-bottom: 29px;
  &-claim {
    justify-content: space-between;
    align-items: center;
    &-box {
      width: 142px;
      height: 142px;
      background: #333b64;
      font-weight: bold;
      font-size: 24px;
      color: rgba(207, 204, 255, 0.8);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 15px 0 24px;
      .name {
        font-size: 16px;
        color: #8e8bbd;
        margin-bottom: 18px;
      }
    }
  }
  &-text {
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #8e8bbd;
    span {
      color: #cfccff;
    }
    margin-bottom: 11px;
  }
  .yt-bar {
    margin-bottom: 53px;
  }
}
</style>
