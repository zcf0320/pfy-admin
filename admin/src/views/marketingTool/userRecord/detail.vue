<template>
  <div class="userRecordDetail">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="title-top content-detail">基础信息</div>
              <div class="userRecordDetail-list">
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">ID：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseResultVO.serialNumber || '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">问卷名称：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseResultVO.questionnaireName ||
                        '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">渠道：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseResultVO.channelName || '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">服务来源：</div>
                  <div class="userRecordDetail-item-content">
                    {{ $route.params.source == 1 ? '外部导入' : '内部生成' }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">更新时间：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      $moment(
                        detail.ucQuestionnaireUserUseDetailVO.updateTime,
                      ).format('YYYY-MM-DD') || '-'
                    }}
                  </div>
                </div>
              </div>
              <div class="title-top">服务信息</div>
              <div class="userRecordDetail-list">
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">得分：</div>
                  <div class="userRecordDetail-item-content">
                    {{ detail.ucQuestionnaireUserUseDetailVO.score || '-' }}
                  </div>
                </div>
              </div>
              <div class="userRecordDetail-list">
                <div class="userRecordDetail-item long">
                  <div class="userRecordDetail-item-title">结论：</div>
                  <div class="userRecordDetail-item-contentH">
                    {{ detail.ucQuestionnaireUserUseDetailVO.content || '-' }}
                  </div>
                </div>
              </div>
              <div class="title-top">用户信息</div>
              <div class="userRecordDetail-list">
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">姓名：</div>
                  <div class="userRecordDetail-item-content">
                    {{ detail.ucQuestionnaireUserUseDetailVO.info.name || '-' }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">性别：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseDetailVO.info.sex | formatSex
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">年龄：</div>
                  <div class="userRecordDetail-item-content">
                    {{ detail.ucQuestionnaireUserUseDetailVO.info.age || '-' }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">身份证号：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseDetailVO.info.idCard || '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">手机号：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseDetailVO.info.mobile || '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">邮箱：</div>
                  <div class="userRecordDetail-item-content">
                    {{
                      detail.ucQuestionnaireUserUseDetailVO.info.email || '-'
                    }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">地区：</div>
                  <div class="userRecordDetail-item-content">
                    {{ detail.ucQuestionnaireUserUseDetailVO.info.area || '-' }}
                  </div>
                </div>
                <div class="userRecordDetail-item">
                  <div class="userRecordDetail-item-title">职业：</div>
                  <div class="userRecordDetail-item-content">
                    {{ detail.ucQuestionnaireUserUseDetailVO.info.job || '-' }}
                  </div>
                </div>
              </div>
              <div class="title-top">问卷详情</div>
              <div class="userRecordDetail-list">
                <div
                  v-for="(item, index) in detail.ucQuestionnaireUserUseResultVO
                    .questionInfos"
                  :key="item.questionId"
                  class="userRecordDetail-item"
                >
                  <div class="userRecordDetail-item-title">
                    {{ index + 1 }}、{{ item.questionName }}（{{
                      questionAnswerType[item.answerType]
                    }}）<span
                      v-if="item.tips"
                      class="health-tip"
                      @click="lookHealthTip(item.tips)"
                      >健康知识</span
                    >
                  </div>
                  <div class="userRecordDetail-item-content">
                    {{ item.answerText
                    }}<span v-if="item.rightAnswer"
                      >（正确答案：{{ item.rightAnswer }}）</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName == '1'" class="log-items">
              <Logs :id="$route.params.id" :type="'61'" />
            </div>
          </div>
        </div>
        <Dialog
          title="健康知识"
          :visible="closeClickModal"
          :height="251"
          :width="445"
          @closed="close"
        >
          <div class="health-tip-content">
            {{ healthTip }}
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeClickModal = false"
              >确定</el-button
            >
          </span>
        </Dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { questionAnswerType } from '@/utils/enum';
export default {
  name: 'UserRecordDetail',
  filters: {
    formatSex(val) {
      if (val === 0 || val === 1) {
        if (val === 1) {
          return '男';
        } else {
          return '女';
        }
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      questionAnswerType,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      logListID: '',
      activeName: '0',
      detail: {
        ucQuestionnaireUserUseDetailVO: {
          info: {
            name: '',
            sex: '',
            age: '',
            idCard: '',
            mobile: '',
            email: ''
          }
        },
        ucQuestionnaireUserUseResultVO: {}
      },
      healthTip: '',
      closeClickModal: false
    };
  },
  created() {
    this.$store
      .dispatch('marketingTool/getUserUseDetail', {
        resultId: this.$route.params.id
      })
      .then(res => {
        this.detail = res.data;
      });
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
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
.userRecordDetail {
  .userRecordDetail-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .userRecordDetail-item {
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
}
</style>
