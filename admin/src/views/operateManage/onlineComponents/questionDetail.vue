<template>
  <div>
    <div class="title-top content-detail">基础信息</div>
    <el-form>
      <el-row :gutter="20">
        <el-col v-for="item in formData.baseData" :key="item.label" :span="12">
          <span>{{ item.label }}：</span>
          <div class="item-content">
            <el-input v-model="item.value" :disabled="true" /></div
        ></el-col>
        <el-col :span="12">
          <span>服务来源：</span>
          <div
            :class="{
              'link-skip': !!formData.serviceSourceVO.serviceSourceId,
              'item-content': true,
            }"
            @click="linkSkip(formData.serviceSourceVO)"
          >
            {{ serviceSource }}
          </div></el-col
        >
        <el-col :span="12"
          ><span>问卷名称：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseResultVO.questionnaireName"
              :disabled="true"
            /></div
        ></el-col>
        <el-col :span="12"
          ><span>渠道名称：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseResultVO.channelName"
              :disabled="true"
            /></div
        ></el-col>
        <el-col :span="12"
          ><span>更新时间：</span>
          <div class="item-content">
            <el-input v-model="updateTime" :disabled="true" /></div
        ></el-col>
      </el-row>
      <div class="title-top content-detail">服务信息</div>
      <el-row :gutter="20">
        <el-col :span="12"
          ><span>得分：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseResultVO.score"
              :disabled="true"
            /></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"
          ><span>结论：</span>
          <div class="item-content-l">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.content"
              :disabled="true"
            /></div
        ></el-col>
      </el-row>
      <div class="title-top content-detail">用户信息</div>
      <el-row :gutter="20">
        <el-col :span="12"
          ><span>姓名：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.name"
              :disabled="true"
            /></div
        ></el-col>
        <el-col :span="12"
          ><span>性别：</span>
          <div class="item-content">
            <el-input v-model="sex" :disabled="true" /></div
        ></el-col>
        <el-col :span="12"
          ><span>年龄：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.age"
              :disabled="true"
            /></div
        ></el-col>
         <el-col :span="12"
          ><span>身份证号：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.idCard"
              :disabled="true"
            /></div
        ></el-col>
         <el-col :span="12"
          ><span>手机号：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.mobile"
              :disabled="true"
            /></div
        ></el-col>
        <el-col :span="12"
          ><span>邮箱：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.email"
              :disabled="true"
            /></div
        ></el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="12"
          ><span>手机号：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.mobile"
              :disabled="true"
            /></div
        ></el-col>
        <el-col :span="12"
          ><span>邮箱：</span>
          <div class="item-content">
            <el-input
              v-model="detail1.ucQuestionnaireUserUseDetailVO.info.email"
              :disabled="true"
            /></div
        ></el-col>
      </el-row> -->
      <div class="title-top content-detail">问卷详情</div>
      <div
        v-for="(item, index) in detail1.ucQuestionnaireUserUseResultVO
          .questionInfos"
        :key="item.questionId"
      >
        <el-row>
          <el-col :span="24">{{ index + 1 }}、{{ item.questionName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            >{{ item.answerText
            }}<span v-if="item.rightAnswer"
              >(正确答案：{{ item.rightAnswer }})</span
            ></el-col
          >
        </el-row>
        <el-row v-if="item.tips">
          <el-col :span="24"><span class="health">健康知识</span></el-col>
          <p class="healthDetail">
            {{ item.tips }}
          </p>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'questionDetail',
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    detail1: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      serviceRegionState
    };
  },
  computed: {
    updateTime() {
      return this.$moment(
        this.detail1.ucQuestionnaireUserUseDetailVO.updateTime,
      ).format('YYYY-MM-DD HH:mm:ss');
    },
    serviceSource() {
      return `【${
        this.serviceRegionState[
          Object.keys(this.formData.serviceSourceVO.serviceRegin)[0]
        ]
      }】${
        this.formData.serviceSourceVO.serviceSourceId
          ? this.formData.serviceSourceVO.serviceSourceId
          : ''
      }`;
    },
    sex() {
      if (this.detail1.ucQuestionnaireUserUseDetailVO.info.sex) {
        return this.detail1.ucQuestionnaireUserUseDetailVO.info.sex === 1
          ? '男'
          : '女';
      } else {
        return '-';
      }
    }
  },
  methods: {
    linkSkip(obj) {
      if (obj.serviceSourceId) {
        const id = obj.serviceSourceId;
        const source = obj.source;
        const key = Object.keys(obj.serviceRegin)[0];

        if (key === '1') {
          // 激活码
          this.$router.push(`/projectManage/activeCodeManage/details/${id}`);
        } else if (key === '2') {
          // 保单 source 0个险 1团险
          if (source === 0) {
            this.$router.push(`/policyManage/personalPolicy/details/${id}`);
          } else {
            this.$router.push(`/policyManage/groupPolicy/details/${id}`);
          }
        } else if (key === '3') {
          // 星矿
          this.$router.push(`/operateManage/pointsMall/details/${id}`);
        } else if (key === '4') {
          // 首页领取
          return false;
        } else if (key === '5') {
          // 服务包
          this.$router.push(
            `/supplyChainManage/servicePackage/details/${id}/detail`,
          );
        } else if (key === '6') {
          // 券码领取
          this.$router.push(`/marketingTool/interests/detail/${id}`);
        }
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  line-height: 21px;
  font-size: 14px;

  font-weight: 400;
  color: #464668;
  margin-bottom: 22px;
  .el-col {
    display: flex;
    margin-bottom: 32px;
    span {
      line-height: 36px;
      width: 70px;
    }
    .item-content {
      flex: 1;
      line-height: 21px;
      display: inline-block;
      vertical-align: text-top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-content-l {
      flex: 1;
      line-height: 21px;
      display: inline-block;
      vertical-align: text-top;
    }
  }
}
</style>
