<template>
  <div class="user-record-detail">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="tabs"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="title-top content-detail">基础信息</div>
              <div class="user-record-detail-list">
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">ID：</div>
                  <div class="user-record-detail-item-content">
                    {{ baseInfo.id || "-" }}
                  </div>
                </div>
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">项目名称：</div>
                  <div class="user-record-detail-item-content">
                    {{ baseInfo.serviceName || "-" }}
                  </div>
                </div>
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">手机号：</div>
                  <div class="user-record-detail-item-content">
                    {{ baseInfo.mobile || "-" }}
                  </div>
                </div>
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">渠道ID：</div>
                  <div class="user-record-detail-item-content">
                    {{ baseInfo.channelCode || "-" }}
                  </div>
                </div>
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">渠道名称：</div>
                  <div class="user-record-detail-item-content">
                    {{ baseInfo.channelName || "-" }}
                  </div>
                </div>
                <div class="user-record-detail-item">
                  <div class="user-record-detail-item-title">使用时间：</div>
                  <div class="user-record-detail-item-content">
                    {{ $moment(baseInfo.useTime).format("YYYY-MM-DD") || "-" }}
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName == '1'">
              <div class="title-top mt-24">问卷结果</div>
              <div class="result-title">得分</div>
              <div class="result-value">
                {{ detail.result.score }}
              </div>
              <div class="result-title">结论</div>
              <div class="result-value">
                {{ detail.result.conclusion }}
              </div>
              <el-divider class="divider"/>
              <div class="title-top">问卷详情</div>
              <div class="user-record-detail-list">
                <div
                  v-for="(item, index) in detail.qinfos"
                  :key="index"
                  class="user-record-detail-item"
                >
                  <div class="user-record-detail-item-title">
                    {{ item.sortNum }}、{{ item.questionName }}（{{
                      questionAnswerType[item.answerType]
                    }}）<span
                      v-if="item.tips"
                      class="health-tip"
                      @click="lookHealthTip(item.tips)"
                      >健康知识</span>
                  </div>
                  <div class="user-record-detail-item-content">
                    {{ item.answers }}
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName === '2'" class="log-items">
              <div class="log-list">
                <div class="log-item">
                  <span class="dot"/>
                  <span class="time">{{ baseInfo.useTime | timeFormat }} </span>
                  <span class="name">{{ baseInfo.mobile || "-" }} </span>
                  <span class="name">访问页面</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { questionAnswerType } from '@/utils/enum';
import { default as api } from '@/api/useRecord';
export default {
  name: 'useRecordsDetail',
  data() {
    return {
      questionAnswerType,
      tabs: [
        { value: '0', name: '基础信息' }
        // { value: '2', name: '操作日志' } 先不删
      ],
      activeName: '0',
      baseInfo: {},
      detail: {
        result: {}
      }
    };
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    getBaseInfo() {
      const data = {
        id: this.$route.params.id,
        pageNum: 1,
        pageSize: 1
      };
      api.getPageRecordDetail(data).then((res) => {
        if (res.data.records) {
          this.baseInfo = res.data.records[0];
          if (res.data.records[0].code !== 'healthColumn') {
            // this.tabs.splice(1, 0, { value: '1', name: '问卷详情' }); 先不删
            this.tabs.push({ value: '1', name: '问卷详情' });
          }
        }
      });
    },
    getDetail() {
      api.getQuestionnaireDetail(this.$route.params.id).then((res) => {
        this.detail = res.data;
      });
    },
    // tab切换
    handleClick(tab) {
      this.activeName = tab;
      if (tab === '1') {
        this.getDetail();
      }
    },
    close() {
      this.closeClickModal = false;
    },
    lookHealthTip(val) {
      this.healthTip = val;
      this.closeClickModal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-record-detail {
  .user-record-detail-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .user-record-detail-item {
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
  .health-tip-content {
    font-size: 14px;
    font-weight: 400;
    color: #464668;
    line-height: 21px;
  }
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
  .divider{
      background-color: #ebedf2
  }
}
</style>
