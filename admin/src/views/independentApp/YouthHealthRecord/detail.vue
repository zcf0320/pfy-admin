<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="student-info-detail">
        <Tab :btns="btns" @change="btnChange"/>
        <div v-if="activeName === '1'">
          <div class="student-info-detail-table">
            <div class="student-info-detail-table-title">
              用户信息
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">学校</div>
                <div class="student-info-detail-value">
                  {{ detailInfo.schoolName }}
                </div>
              </div>
              <div class="student-info-detail-table-four-r">
                <div class="student-info-detail-label">
                  学生ID
                </div>
                <div class="student-info-detail-value">
                  {{ detailInfo.id }}
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">学生姓名</div>

                <div class="student-info-detail-value">
                  {{ detailInfo.name }}
                </div>
              </div>
              <div class="student-info-detail-table-four-r">
                <div class="student-info-detail-label">家庭联系人姓名</div>

                <div class="student-info-detail-value">
                  {{ detailInfo.familyName }}
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">
                  与家庭联系人关系
                </div>

                <div class="student-info-detail-value">
                  {{ detailInfo.familyRelation }}
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-title">健康信息</div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">
                  性别
                </div>
                <div class="student-info-detail-value">
                  {{ detailInfo.sex | sexFormat }}
                </div>
              </div>
              <div class="student-info-detail-table-four-r">
                <div class="student-info-detail-label">
                  年龄
                </div>
                <div class="student-info-detail-value">
                  {{ detailInfo.age }}
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">
                  身高
                </div>
                <div class="student-info-detail-value">
                  {{ detailInfo.height }}cm
                </div>
              </div>
              <div class="student-info-detail-table-four-r">
                <div class="student-info-detail-label">
                  体重
                </div>
                <div class="student-info-detail-value">
                  {{ detailInfo.weight }}KG
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">
                  视力状况
                </div>

                <div class="student-info-detail-value">
                  左眼: {{ detailInfo.leftEye }} 右眼: {{ detailInfo.rightEye }}
                  <span class="vision-info">{{ detailInfo.eyeInfo }}</span>
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-four">
              <div class="student-info-detail-table-four-l">
                <div class="student-info-detail-label">
                  疾病史
                </div>
                <div class="student-info-detail-value">
                  <div
                    v-if="detailInfo.teenagerMedicineHistoryVoList.length > 0"
                    class="type-list"
                  >
                    <div
                      v-for="item in detailInfo.teenagerMedicineHistoryVoList"
                      :key="item.medicineId"
                      class="disease-type active"
                    >
                      {{ item.medicineName }}
                    </div>
                  </div>
                  <div v-else>无</div>
                </div>
              </div>
            </div>
            <div class="student-info-detail-table-title">问卷详情</div>
            <div class="student-info-detail-table-two">
              <div class="student-info-detail-table-two-l">
                问卷情况
              </div>
              <div class="student-info-detail-table-two-r">
                <div v-if="detailInfo.questionnaireDetailVoList.length > 0">
                  <div
                    v-for="item in detailInfo.questionnaireDetailVoList"
                    :key="item.name"
                    class="result"
                  >
                    {{ item.name }}得分: {{ item.result.score }}
                    <div class="conclusion">{{ item.result.conclusion }}</div>
                  </div>
                </div>
                <div v-else/>
              </div>
            </div>
            <div
              v-if="detailInfo.questionnaireDetailVoList.length > 0"
              class="student-info-detail-table-two"
            >
              <div class="questionnaire">
                <div
                  v-for="item in detailInfo.questionnaireDetailVoList"
                  :key="item.name"
                >
                  <div class="question-title">{{ item.name }}</div>
                  <div
                    v-for="(ele, index) in item.qinfos"
                    :key="index"
                    class="question-list"
                  >
                    <div class="question-name">
                      {{ index + 1 + '、' }}{{ ele.questionName }}
                    </div>
                    <div class="question-answer">{{ ele.answers || '-' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeName === '2'" class="log-items">
          <div class="log-list">
            <div v-if="logList.length > 0">
              <div
                v-for="(item, index) in logList"
                :key="index"
                class="log-item"
              >
                <span class="dot"/>
                <span class="time">{{ item.createTime | timeFormat }} </span>
                <span class="name">{{ item.name }} </span>
                <span
class="name"
>{{ $enums['operationType'][item.operation]
                  }}{{ $enums['menuType'][item.type] }}</span>
              </div>
            </div>
            <div v-else>
              暂无记录
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { default as api } from '@/api/YouthHealthRecord';
export default {
  name: 'youth-health-record-detail',
  data() {
    return {
      activeName: '1',
      logList: [],
      btns: [
        { value: '1', name: '使用详情' }
        // { value: '2', name: '操作日志' }
      ],
      detailInfo: {
        teenagerMedicineHistoryVoList: [],
        questionnaireDetailVoList: []
      }
    };
  },
  mounted() {
    this.getStudentInfo();
  },
  methods: {
    btnChange(val) {
      this.activeName = val;
      //   if (val === '2') {
      //     // api.getLogList(this.detailInfo.skinId, 0).then(res => {
      //     //   this.logList = res.data;
      //     // });
      //   }
    },
    getStudentInfo() {
      api.getStudentInfoById(this.$route.params.id).then(res => {
        this.detailInfo = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.student-info-detail {
  .student-info-detail-label {
    width: 165px;
    font-weight: bold;
    padding-left: 32px;
    border-right: 1px solid #e8e8e8;
  }
  .student-info-detail-value {
    font-weight: 400;
    padding: 0 22px 0 61px;
  }
  .student-info-detail-table {
    // margin-bottom: 20px;
    // box-shadow: 0px 0px 6px 0px rgba(158, 158, 158, 0.5);
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-four {
      height: 48px;
      display: flex;
      font-size: 14px;
      color: #545473;
      font-weight: bold;
      line-height: 48px;
      border: 1px solid #e8e8e8;
      border-top: none;
      &-l,
      &-r {
        flex: 1;
        display: flex;
        align-items: center;
      }
      &-l {
        border-right: 1px solid #e8e8e8;
      }
    }
    .type-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    .disease-type {
      max-width: 150px;
      min-width: 74px;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
      height: 38px;
      border-radius: 19px;
      font-size: 14px;
      font-weight: bold;
      line-height: 38px;
      border: 1px solid #d1d1d1;
      color: #989ab3;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      &:hover {
        border: 1px solid #3599fe;
        background: #e1f1ff;
        color: #3599fe;
      }
      &.active {
        background: #3599fe;
        color: #ffffff;
      }
    }
  }
  .vision-info {
    margin-left: 24px;
    padding: 5px 11px;
    width: 50px;
    height: 24px;
    background: #eaf0ff;
    font-size: 14px;
    font-weight: 400;
    color: #3599fe;
    border-radius: 4px;
  }
  .student-info-detail-table-two {
    display: flex;
    border: 1px solid #e8e8e8;
    &-l,
    &-r {
      display: flex;
      align-items: center;
    }
    &-l {
      width: 165px;
      padding-left: 32px;
      border-right: 1px solid #e8e8e8;
    }
    &-r {
      padding: 17px 46px 16px 42px;
      color: #545473;
      .result {
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .conclusion {
          margin-top: 6px;
        }
      }
    }
    .questionnaire {
      padding: 24px 32px;
      .question-title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 10px;
      }
      .question-list {
        margin-bottom: 24px;
      }
      .question-name {
        font-size: 14px;
        font-weight: 500;
        color: #464668;
        margin-bottom: 16px;
      }
      .question-answer {
        text-indent: 1.5em;
        font-size: 14px;
        font-weight: 400;
        color: #464668;
      }
    }
  }
}
</style>
