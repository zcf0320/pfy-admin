<template>
  <div class="questionnaire-manage-page">
    <el-container>
      <el-scrollbar
        v-loading="tableLoading"
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="questionnaire-manage-main">
          <div class="title-top">自定义问卷</div>
          <div class="questionnaireList">
            <div
              v-for="item in goodList.customType"
              :key="item.id"
              class="questionnaireItem"
            >
              <span>{{ item.name }}</span>
              <div
                class="item-btn"
                @click="questionnaireDetail(item.id, item.step, item.type)"
              >
                管理
              </div>
            </div>
          </div>
        </div>
        <div class="questionnaire-manage-main">
          <div class="title-top mt-13">通用问卷</div>
          <div class="questionnaireList">
            <div
              v-for="item in goodList.currencyType"
              :key="item.id"
              class="questionnaireItem"
            >
              <span>{{ item.name }}</span>
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="delQuestionnaire(item.id)"
              >
                <div slot="reference" class="delete-btn">删除</div>
              </el-popconfirm>
              <div
                class="item-btn"
                @click="questionnaireDetail(item.id, item.step, item.type)"
              >
                {{ item.step === 3 ? '管理' : '继续' }}
              </div>
            </div>
            <div class="questionnaireItem add" @click="add">+新增问卷</div>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireManage',
  data() {
    return {
      tableLoading: false,
      goodList: []
    };
  },
  created() {
    this.tableLoading = true;
    this.$store.dispatch('marketingTool/getQuestionnaireList').then(res => {
      this.goodList = res.data;
      this.tableLoading = false;
    });
  },
  methods: {
    questionnaireDetail(id, step, type) {
      if (step === 3 && type === 0) {
        this.$router.push(`/marketingTool/questionnaireManage/detail/${id}`);
        return;
      }
      if (step < 3 && type === 1) {
        this.$router.push(`/marketingTool/questionnaireManage/add/${id}`);
        return;
      }
      if (step === 3 && type === 1) {
        this.$router.push(`/marketingTool/questionnaireManage/edit/${id}`);
        return;
      }
    },
    add() {
      this.$router.push('/marketingTool/questionnaireManage/add/0');
    },
    delQuestionnaire(id) {
      this.tableLoading = true;
      this.$store.dispatch('marketingTool/delQuestionnaire', id).then(() => {
        this.$store
          .dispatch('marketingTool/getQuestionnaireList')
          .then(res1 => {
            this.goodList = res1.data;
            this.tableLoading = false;
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.questionnaire-manage-page {
  .mt-13 {
    margin-top: 13px;
  }
  .questionnaire-manage-main {
    box-shadow: 0px 1px 0px 0px rgba(235, 237, 242, 1);
    &:last-of-type {
      box-shadow: none;
    }
  }
  .questionnaireList {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .questionnaireItem {
      flex: 0 0 calc((100% - 50px) / 3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 24px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(232, 232, 232, 0.5);
      border-radius: 4px;
      height: 72px;
      margin-right: 25px;
      margin-bottom: 24px;
      transition: all 0.3s;
      &.add {
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #3599fe;
        line-height: 72px;
        cursor: pointer;
      }
      &:hover {
        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.5);
      }
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      > span:first-of-type {
        font-size: 16px;

        font-weight: bold;
        color: #464668;
        line-height: 16px;
        flex: 1;
        overflow: hidden;
      }
      .delete-btn {
        font-size: 14px;

        font-weight: bold;
        color: #f64e60;
        line-height: 14px;
        margin-right: 24px;
        cursor: pointer;
      }
      .item-btn {
        width: 63px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #3599fe;
        font-size: 14px;

        font-weight: 500;
        color: #3599fe;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: #3599fe;
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
