<template>
  <div>
    <el-container>
      <el-main>
        <div class="title-top mt-24">问卷详情</div>
        <div class="result-title">得分</div>
        <div class="result-value">
          {{ detail.result.score }}
        </div>
        <div class="result-title">结论</div>
        <div class="result-value">
          {{ detail.result.conclusion }}
        </div>
        <el-divider class="divider" />
        <div class="title-top">问卷详情</div>
        <div class="questions-list">
          <div
            v-for="(item, index) in detail.qinfos"
            :key="index"
            class="questions-item"
          >
            <div class="questions-item-title">
              {{ item.sortNum }}、{{ item.questionName }}（{{
                questionAnswerType[item.answerType]
              }}）
            </div>
            <div class="questions-item-content">
              {{ item.answers }}
            </div>
          </div>
        </div>
      </el-main></el-container
    >
  </div>
</template>
<script>
import { getQuestionnaireDetail } from '@/api/onlineService';
import { questionAnswerType } from '@/utils/enum';
export default {
  name: 'AlzheimerQuestionnaireDetail',
  data() {
    return {
      questionAnswerType,
      detail: {
        result: {},
        qinfos: []
      }
    };
  },
  created() {
    getQuestionnaireDetail(this.$route.params.id).then(res => {
      this.detail = res.data;
    });
  }
};
</script>
<style scoped lang="scss">
.result-title {
  font-size: 15px;
  font-weight: 400;
  color: #464668;
  margin-bottom: 12px;
}
.result-value {
  padding: 12px 18px;
  background: #f3f7ff;
  color: #464668;
  border-radius: 4px;
  margin-bottom: 24px;
}
.divider {
  background-color: #ebedf2;
}
.questions-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .questions-item {
    width: calc(50% - 15px);
    margin-bottom: 24px;
    &-title {
      font-size: 14px;
      color: #464668;
      line-height: 14px;
      margin-bottom: 12px;
      .health-tip {
        font-size: 14px;
        color: #3599fe;
        line-height: 14px;
        float: right;
        cursor: pointer;
      }
    }
    &-content {
      width: 100%;
      height: 38px;
      background: #f3f7ff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 18px;
      font-size: 14px;
      color: #464668;
      line-height: 38px;
      &.height {
        display: flex;
        align-items: center;
        line-height: 18px;
        padding: 13px 18px;
      }
    }
    &-contentH {
      width: 100%;
      background: #f3f7ff;
      border-radius: 4px;
      font-size: 14px;
      color: #464668;
      line-height: 38px;
      display: flex;
      align-items: center;
      line-height: 18px;
      padding: 11px 18px;
    }
    &.long {
      width: 100%;
    }
  }
}
</style>
