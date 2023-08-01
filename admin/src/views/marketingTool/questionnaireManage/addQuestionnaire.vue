<template>
  <div class="add-questionnaire-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="step">
          <el-steps :active="activeIndex" align-center finish-status="success">
            <el-step title="步骤 1" description="题目设置" />
            <el-step title="步骤 2" description="个人信息" />
            <el-step title="步骤 3" description="样式设置" />
          </el-steps>
        </div>
        <div class="step-content scroll-table">
          <SetTitle
            v-if="activeIndex === 0"
            ref="setTitle"
            :base-form="baseForm"
            :rule-form="ruleForm"
            @setFirst="setFirst"
          />
          <SetPeopleInfo
            v-if="activeIndex === 1"
            ref="setPeopleInfo"
            :people-info="peopleInfo"
            @setSecond="setSecond"
          />
          <SetStyle
            v-if="activeIndex === 2"
            ref="setStyle"
            :questionnaire-id="questionnaireId"
            :style-info="styleInfo"
            @setThird="setThird"
          />
        </div>
      </el-scrollbar>
    </el-container>
    <div class="page-footer">
      <el-button
        v-show="activeIndex != 0"
        class="mr-24"
        @click.native.prevent="toPre"
        >上一步</el-button
      >
      <el-button
        type="primary"
        :loading="next"
        @click.native.prevent="saveToNext"
        >{{ activeIndex >= 2 ? '保存' : '保存并进入下一步' }}</el-button
      >
    </div>
  </div>
</template>

<script>
import SetTitle from '../components/setTitle';
import SetPeopleInfo from '../components/setPeopleInfo';
import SetStyle from '../components/setStyle';
import { cloneDeep } from 'lodash';
export default {
  name: 'AddQuestionnaire',
  components: {
    SetTitle,
    SetPeopleInfo,
    SetStyle
  },
  data() {
    return {
      activeIndex: 0,
      next: false,
      questionnaireId: 0,
      // 设置标题
      baseForm: {
        name: '',
        questionList: [
          {
            answerList: [
              {
                answer: '',
                score: ''
              },
              {
                answer: '',
                score: ''
              }
            ],
            answerType: 1,
            question: '',
            remark: '',
            sortNum: 0,
            tip: ''
          }
        ],
        secondName: ''
      },
      ruleForm: {
        conclusionList: [
          {
            content: '',
            maxScore: '',
            minScore: ''
          }
        ]
      },
      // 个人信息设置
      peopleInfo: {
        age: 0,
        email: 0,
        sex: 1,
        idCard: 0,
        name: 1,
        needVerify: 0,
        mobile: 0,
        verifyNode: 0,
        job: 0,
        area: 0
      },
      // 样式设置
      styleInfo: {
        backgroundSettings: '#0E937B',
        buttonText: '立即开启',
        coverSelect: 0,
        coverSettings: '#0E937B',
        name: '',
        resultPageSettings: '#0E937B',
        secondName: '',
        imgurl: ''
      }
    };
  },
  created() {
    if (this.$route.params.id !== '0') {
      this.questionnaireId = Number(this.$route.params.id);
      this.$store
        .dispatch('marketingTool/getAllSetting', this.$route.params.id)
        .then(res => {
          const obj = cloneDeep(res.data);
          this.activeIndex = res.data.step;
          if (res.data.step >= 1) {
            this.ruleForm = {
              conclusionList: res.data.questionnaireVO.conclusionList
            };
            delete obj.questionnaireVO.conclusionList;
            this.baseForm = obj.questionnaireVO;
          }
          if (res.data.step >= 2) {
            this.peopleInfo = res.data.questionnaireUserinfoSettingsVO;
          }
          if (res.data.step >= 3) {
            this.styleInfo = res.data.questionnaireStyleSettingsVO;
          }
        });
    }
  },
  methods: {
    saveToNext() {
      if (this.next) {
        return;
      }
      this.next = true;
      if (this.activeIndex === 0) {
        this.$refs.setTitle.toNext();
        return;
      }
      if (this.activeIndex === 1) {
        this.$refs.setPeopleInfo.toNext();
        return;
      }
      if (this.activeIndex === 2) {
        this.$refs.setStyle.toNext();
        return;
      }
    },
    toPre() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    setFirst(params) {
      if (params === 0) {
        this.next = false;
        return;
      }
      if (this.questionnaireId) {
        params.questionnaireId = this.questionnaireId;
      }
      this.$store
        .dispatch('marketingTool/saveQuestionnaireFirst', params)
        .then(res => {
          this.questionnaireId = res.data;
          this.next = false;
          if (this.activeIndex < 3) {
            this.activeIndex++;
          }
        })
        .catch(() => {
          this.next = false;
          this.$message.error('保存失败！');
        });
    },
    setSecond(params) {
      if (this.questionnaireId) {
        params.questionnaireId = this.questionnaireId;
      }
      this.$store
        .dispatch('marketingTool/saveQuestionnaireSecond', params)
        .then(() => {
          this.next = false;
          if (this.activeIndex < 3) {
            this.activeIndex++;
          }
        })
        .catch(() => {
          this.next = false;
          this.$message.error('保存失败！');
        });
    },
    setThird(params) {
      if (params === 0) {
        this.next = false;
        return;
      }
      if (this.questionnaireId) {
        params.questionnaireId = this.questionnaireId;
      }
      this.$store
        .dispatch('marketingTool/saveQuestionnaireThird', params)
        .then(() => {
          this.next = false;
          this.$message({
            message: '保存成功!',
            type: 'success'
          });
          this.$router.push(
            `/marketingTool/questionnaireManage/edit/${this.questionnaireId}`,
          );
        })
        .catch(() => {
          this.next = false;
          this.$message.error('保存失败！');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-questionnaire-page {
  .step {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ebebeb;
  }
  .step-content {
    padding: 30px 0;
  }
}
</style>
