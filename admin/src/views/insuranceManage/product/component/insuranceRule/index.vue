<template>
  <div class="relative">
    <el-form
      v-if="init"
      ref="formData"
      :model="formData"
      label-width="100px"
      label-position="top"
      class="page-form"
      :rules="formRules"
    >
      <div class="title-top mt-24">基础信息</div>
      <div class="mt-24">
        <div class="flex">
          <el-form-item label="投保年龄" prop="policyholderMinAge">
            <el-input
              v-model="formData.policyholderMinAge"
              class="unit-input"
              :disabled="isDisabled"
            />
          </el-form-item>
          <el-form-item class="unit-select mt-24">
            <el-select
              v-model="policyholderMinUnit"
              placeholder="全部"
              class="w-60"
              :disabled="isDisabled"
            >
              <el-option label="岁" :value="1" />
              <el-option label="天" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item class="mt-24">
            <span class="w-24 flex-center fc-grey"> ~</span>
          </el-form-item>
          <el-form-item class="mt-24" prop="policyholderMaxAge">
            <el-input
              v-model="formData.policyholderMaxAge"
              class="unit-input"
              :disabled="isDisabled"
            />
          </el-form-item>
          <el-form-item class="unit-select mt-24">
            <el-select
              v-model="policyholderMaxUnit"
              placeholder="全部"
              class="w-60"
              :disabled="isDisabled"
            >
              <el-option label="岁" :value="1" />
              <el-option label="天" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="被保人年龄" class="ml-30" prop="insuredMinAge">
            <el-input
              v-model="formData.insuredMinAge"
              class="unit-input"
              :disabled="isDisabled"
            />
          </el-form-item>
          <el-form-item class="unit-select mt-24">
            <el-select
              v-model="insuredMinUnit"
              placeholder="全部"
              class="w-60"
              :disabled="isDisabled"
            >
              <el-option label="岁" :value="1" />
              <el-option label="天" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item class="mt-24">
            <span class="w-24 flex-center fc-grey"> ~</span>
          </el-form-item>
          <el-form-item class="mt-24" prop="insuredMaxAge">
            <el-input
              v-model="formData.insuredMaxAge"
              class="unit-input"
              :disabled="isDisabled"
            />
          </el-form-item>
          <el-form-item class="unit-select mt-24">
            <el-select
              v-model="insuredMaxUnit"
              placeholder="全部"
              class="w-60"
              :disabled="isDisabled"
            >
              <el-option label="岁" :value="1" />
              <el-option label="天" :value="0" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="flex-box">
        <el-form-item label="被保人性别" prop="insuredGender">
          <el-select
            v-model="formData.insuredGender"
            class="w-498"
            :disabled="isDisabled"
          >
            <el-option label="不限性别" :value="2" />
            <el-option label="仅限男性投保" :value="1" />
            <el-option label="仅限女性投保" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="被保人职业"
          class="ml-30"
          prop="underwritingOccupation"
        >
          <el-select
            v-model="formData.underwritingOccupation"
            class="w-498"
            :disabled="isDisabled"
          >
            <el-option
              v-for="item in rateJobs"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-box">
        <el-form-item label="可投保区域" prop="provinceIds">
          <el-cascader
            v-model="formData.provinceIds"
            style="width: 1025px; height: auto"
            :options="allCityList"
            :props="{
              multiple: true,
              value: 'id',
              label: 'name',
              children: 'citys',
            }"
            filterable
            :disabled="isDisabled"
            :clearable="false"
          />
        </el-form-item>
      </div>
      <div class="flex-box">
        <el-form-item label="最大投保份数" prop="maxInsuranceNum" maxlength="3">
          <el-input
            v-model="formData.maxInsuranceNum"
            class="w-498"
            maxlength="2"
            :disabled="isDisabled"
          >
            <template slot="append">份</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="title-top">补充信息</div>
      <div class="flex-box">
        <el-form-item label="受益人信息" prop="beneficiaryInfoFlag">
          <el-select
            v-model="formData.beneficiaryInfoFlag"
            class="w-498"
            :disabled="isDisabled"
          >
            <el-option label="不需要填写" :value="0" />
            <el-option label="需要填写" :value="1" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-box" v-if="formData.beneficiaryInfoFlag">
        <div class="w-498">
          <el-form-item label="所需证件材料">
            <el-checkbox-group
              v-model="formData.insuranceDataTypeList"
              :disabled="isDisabled"
            >
              <el-checkbox :label="1">身份证正反面</el-checkbox>
              <el-checkbox :label="2">护照信息页签证页</el-checkbox>
              <el-checkbox :label="3">其他资料</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="ml-30">
          <el-form-item
            v-if="formData.insuranceDataTypeList.indexOf(3) > -1"
            label="其他资料"
            prop="otherDataTypeRemark"
          >
            <el-input
              v-model="formData.otherDataTypeRemark"
              class="w-498"
              :disabled="isDisabled"
              maxlength="10"
            />
          </el-form-item>
        </div>
      </div>
      <div class="title-top">健康告知</div>
      <div class="flex-box">
        <el-form-item label="是否需要核保" prop="underwritingFlag">
          <el-select
            v-model="formData.underwritingFlag"
            class="w-498"
            :disabled="isDisabled"
            @change="underwritingFlagChange"
          >
            <el-option label="不需要" :value="0" />
            <el-option label="需要" :value="1" />
          </el-select>
        </el-form-item>
      </div>
      <div v-if="formData.underwritingFlag == 1 || !flag" class="flex-box">
        <el-form-item label="">
          <el-radio-group
            v-model="formData.healthNoticeType"
            :disabled="isDisabled"
            @change="healthNoticeChange"
          >
            <el-radio :label="0">普通健康告知</el-radio>
            <el-radio :label="1">问卷健康告知</el-radio>
          </el-radio-group>
        </el-form-item>
        <div
          v-if="
            formData.healthNoticeType === 1 &&
              $isEmpty(formData.questionnaireNoticeId)
          "
          class="uploadBtn ml-24 mb-30"
          @click="
            () => {
              dialog.visible = true;
            }
          "
        >
          选择问卷健告
        </div>
        <el-button
          v-if="
            formData.healthNoticeType === 1 &&
              $isNotEmpty(formData.questionnaireNoticeId)
          "
          type="primary"
          size="small"
          class="ml-24 mb-30"
          :disabled="isDisabled"
          @click="
            () => {
              dialog.visible = true;
            }
          "
          >更新问卷健告</el-button
        >
      </div>
      <div
        v-if="
          (formData.underwritingFlag === 1 || !flag) &&
            formData.healthNoticeType === 0
        "
        class="baseNotice-box"
      >
        <fileUpload
          v-model="formData.baseNoticeId"
          :data-list="
            $isEmpty(formData.baseNoticePdfName)
              ? []
              : [
                  {
                    name: formData.baseNoticePdfName,
                    url: formData.baseNoticeId,
                  },
                ]
          "
          :tip="'《普通健康告知》（只能上传不超过10M的PDF文件）'"
          :disabled="isDisabled"
          @change="
            val => {
              imgUploadChange(val, 'baseNoticePdfName');
            }
          "
          @del="
            val => {
              delFile('baseNoticeId', 'baseNoticePdfName');
            }
          "
        />
      </div>

      <div v-if="$isNotEmpty(questionInfo)" class="tpl-content mb-24">
        <div class="tpl-label-top">
        <div class="tpl-label-title">{{ questionInfo.name }}</div>
        <div class="tpl-label">{{ questionInfo.remark }}</div>
        </div>
        <div class="flex">
          <div>
            <div
              v-for="(item, index) in questionInfo.questionInfos"
              :key="item.questionID"
              class="mb-20 questionInfos-content"
            >
              <div class="mb-10">
                <span :class="item.questionType == '1' ? 'questionType-one' : 'questionType-three'">{{
                  $enums['questionType'][item.questionType]
                }}</span>
              {{ index + 1 }}、{{ item.questionName }}
              </div>
              <div
                v-for="itm in item.answerInfos"
                :key="itm.answerID"
                class="mb-10"
              >
                <span v-if="itm.optionName"> 选择【{{ itm.optionName }}】
                  <span :class="itm.optionName == '是' ? 'yes': itm.optionName == '否' ? 'no':''">
                  <i class="el-icon-arrow-right"></i>
                  </span></span>
                <span v-if="itm.jumpType === '1'"
                  >跳转问题{{ itm.nextNumber }}</span
                >
                <span v-else-if="itm.jumpType === '2'"
                  >跳转结论：{{
                    $enums['insuranceStatus'][itm.nextNumber]
                  }}</span
                >
                <span v-else>跳转问题{{ index + 2 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <fileUploadList
        v-if="init"
        v-model="loading"
        :disabled="isDisabled"
        :data="formData"
      />
      <selectHealthQue
        :id="formData.questionnaireNoticeId"
        :visible.sync="dialog.visible"
        @saved="getTpl"
      />
    </el-form>

    <div v-if="edit === 'edit'" class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        :loading="loading"
        @click.native.prevent="save('formData')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button @click.native.prevent="back()">上一步</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="save('formData')"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import fileUploadList from './component/fileUploadList';
import fileUpload from './component/fileUpload.vue';
import Footer from '../footer';
import selectHealthQue from './component/selectHealthQue.vue';
export default {
  name: 'InsuranceRule',
  components: {
    Footer,
    selectHealthQue,
    fileUpload,
    fileUploadList
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    const defaultForm = {
      productId: this.id,
      id: null,
      baseNoticeId: '',
      questionnaireNoticeId: '', // 问卷健康告知
      insuredMinAge: '',
      insuredMaxAge: '',
      policyholderMinAge: '',
      policyholderMaxAge: '',
      insuredGender: 2, // 0 男
      underwritingOccupation: '', // 承保职业
      provinceIds: [],
      maxInsuranceNum: '1',
      otherDataTypeRemark: '',
      underwritingFlag: 1, // 0、无需核保 1、需要核保
      insuranceDataTypeList: [], // 1 2 3
      healthNoticeType: 0, // 0、普通健康告知，1、健告问卷
      insuranceInstruction: '', // 用户告知
      privacyPolicy: '',
      insuranceClause: '',
      liabilityExemption: '',
      insuranceStatement: '',
      customerNotice: '',
      samplePolicy: '',
      rateTable: '',
      beneficiaryInfoFlag: 0,
      step: 6,
      // 上传文件名称
      insuranceInstructionPdfName: '',
      privacyPolicyPdfName: '',
      insuranceClausePdfName: '',
      liabilityExemptionPdfName: '',
      insuranceStatementPdfName: '',
      customerNoticePdfName: '',
      samplePolicyPdfName: '',
      rateTablePdfName: '',
      baseNoticePdfName: ''
    };
    const validMin = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        return callback(new Error('只能输入1~365'));
      }
      if (Number(value) > 365) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      // 单位转天
      const minAge =
        this.insuredMinUnit === 1 ? Number(value) * 365 : Number(value);
      const maxAge =
        this.insuredMaxUnit === 1
          ? Number(this.formData.insuredMaxAge) * 365
          : Number(this.formData.insuredMaxAge);

      if (minAge > maxAge && this.formData.insuredMaxAge) {
        return callback(new Error('最小年龄不能大于最大年龄'));
      }
      callback();
    };
    const validMax = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      if (Number(value) > 365) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      // 单位转天
      const minAge =
        this.insuredMinUnit === 1
          ? Number(this.formData.insuredMinAge) * 365
          : Number(this.formData.insuredMinAge);
      const maxAge =
        this.insuredMaxUnit === 1 ? Number(value) * 365 : Number(value);
      if (maxAge < minAge) {
        return callback(new Error('最大年龄不能小于最小年龄'));
      }
      callback();
    };
    const validPolicyMin = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        return callback(new Error('只能输入1~365'));
      }
      if (Number(value) > 365) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      // 单位转天
      const minAge =
        this.policyholderMinUnit === 1 ? Number(value) * 365 : Number(value);
      const maxAge =
        this.policyholderMaxUnit === 1
          ? Number(this.formData.policyholderMaxAge) * 365
          : Number(this.formData.policyholderMaxAge);
      if (minAge > maxAge && this.formData.policyholderMaxAge) {
        return callback(new Error('最小年龄不能大于最大年龄'));
      }
      callback();
    };
    const validPolicyMax = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      if (Number(value) > 365) {
        return callback(new Error('只能输入1~365的正整数'));
      }
      // 单位转天
      const minAge =
        this.policyholderMinUnit === 1
          ? Number(this.formData.policyholderMinAge) * 365
          : Number(this.formData.policyholderMinAge);
      const maxAge =
        this.policyholderMaxUnit === 1 ? Number(value) * 365 : Number(value);
      if (maxAge < minAge) {
        return callback(new Error('最大年龄不能小于最小年龄'));
      }
      callback();
    };
    return {
      // 单位
      insuredMinUnit: 1,
      insuredMaxUnit: 1,
      policyholderMinUnit: 1,
      policyholderMaxUnit: 1,
      formData: this.$extends({}, defaultForm),
      optionProps: {
        multiple: true,
        value: 'id',
        label: 'name',
        children: 'citys'
      },
      formRules: {
        insuredMinAge: [
          {
            required: true,
            message: '请输入被保人年龄',
            trigger: 'change'
          },
          {
            validator: validMin,
            trigger: 'change'
          }
        ],
        insuredMaxAge: [
          {
            required: true,
            message: '请输入被保人年龄',
            trigger: 'change'
          },
          {
            validator: validMax,
            trigger: 'change'
          }
        ],
        policyholderMinAge: [
          {
            required: true,
            message: '请输入投保年龄',
            trigger: 'change'
          },
          {
            validator: validPolicyMin,
            trigger: 'change'
          }
        ],
        policyholderMaxAge: [
          {
            required: true,
            message: '请输入投保年龄',
            trigger: 'change'
          },
          {
            validator: validPolicyMax,
            trigger: 'change'
          }
        ],
        underwritingOccupation: [
          {
            required: true,
            message: '请选择承保职业',
            trigger: 'change'
          }
        ],
        maxInsuranceNum: [
          {
            required: true,
            message: '请输入最大投保份数',
            trigger: 'change'
          },
          {
            validator: this.$validators.checkPInt,
            trigger: 'change'
          }
        ],
        insuredGender: [
          {
            required: true,
            message: '请选择被保人性别',
            trigger: 'change'
          }
        ],
        otherDataTypeRemark: [
          {
            required: true,
            message: '请输入其他材料名称',
            trigger: 'change'
          }
        ],
        provinceIds: [
          {
            required: true,
            message: '请选择投保区域',
            trigger: 'change'
          }
        ]
      },
      flag: true,
      rateJobs: [],
      questionInfo: {},
      loading: false,
      init: false
    };
  },
  computed: {
    // 是否可编辑
    isDisabled() {
      return this.edit === 'detail' || this.postStatus !== 107;
    },
    allCityList() {
      const allCity = this.$store.state.app.allCityList || [];
      const arr = this.$extends([], allCity);
      if (this.$isNotEmpty(arr)) {
        const obj = {
          name: '全国',
          citys: null,
          id: '全国'
        };
        arr.unshift(obj);
      }
      return arr;
    }
  },
  watch: {
    'formData.provinceIds'(val, oldVal) {
      if (val.length > oldVal.length && this.$isNotEmpty(oldVal)) {
        const itemData = val.find(item => oldVal.indexOf(item) === -1);
        if (itemData.includes('全国')) {
          this.formData.provinceIds = [itemData];
        } else {
          this.formData.provinceIds = val.filter(
            item => !item.includes('全国'),
          );
        }
      }
    }
  },
  created() {
    this.init = false;
    // 获取职业
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'insuranceJobType'
      })
      .then(res => {
        this.rateJobs = res.obj || [];
      });

    // 更新城市
    this.$store.dispatch('app/getAllCityList');

    if (this.rules && this.rules.id) {
      const formData = this.$extends({}, this.rules);
      // 单位换算
      if (this.isYear(formData.insuredMinAge)) {
        this.insuredMinUnit === 1;
        formData.insuredMinAge = formData.insuredMinAge / 365;
      } else {
        this.insuredMinUnit = 0;
      }
      if (this.isYear(formData.insuredMaxAge)) {
        this.insuredMaxUnit = 1;
        formData.insuredMaxAge = formData.insuredMaxAge / 365;
      } else {
        this.insuredMaxUnit = 0;
      }
      if (this.isYear(formData.policyholderMinAge)) {
        this.policyholderMinUnit === 1;
        formData.policyholderMinAge = formData.policyholderMinAge / 365;
      } else {
        this.policyholderMinUnit = 0;
      }
      if (this.isYear(formData.policyholderMaxAge)) {
        this.policyholderMaxUnit === 1;
        formData.policyholderMaxAge = formData.policyholderMaxAge / 365;
      } else {
        this.policyholderMaxUnit = 0;
      }
      formData.provinceIds = this.$isNotEmpty(formData.provinceIds)
        ? formData.provinceIds
        : ['全国'];
      formData.insuranceDataTypeList = formData.insuranceDataTypeList || [];
      this.getTpl(formData.questionnaireNoticeId);
      this.$copyProps(this.formData, formData);
    }
    this.init = true;
  },
  methods: {
    isYear(value) {
      return Number(value) % 365 === 0 && value !== 365;
    },
    /**
     * 获取模板
     */
    getTpl(id) {
      // 获取职业
      if (this.$isEmpty(id)) {
        return;
      }
      this.$store.dispatch('supplier/healthQuesDetail', { id }).then(res => {
        this.formData.questionnaireNoticeId = id;
        this.questionInfo = res.data;
      });
    },

    // 人工核保+智能核保 变更
    healthNoticeChange(val) {
      // 如果没有选择过就不给提示
      const flag =
        this.$isNotEmpty(this.formData.baseNoticeId) ||
        this.$isNotEmpty(this.formData.questionnaireNoticeId);
      if (!flag) {
        return false;
      }
      this.$confirm('切换后，已设置的核保资料将不可恢复，是否切换？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (val !== 0) {
            this.formData.baseNoticeId = null;
            this.formData.baseNoticePdfName = null;
          } else {
            this.formData.questionnaireNoticeId = null;
            this.questionInfo = {};
          }
        })
        .catch(() => {
          if (val !== 0) {
            this.formData.healthNoticeType = 0;
          } else {
            this.formData.healthNoticeType = 1;
          }
        });
    },
    // 是否需要核保 变更
    underwritingFlagChange(val) {
      // 如果没有选择过就不给提示
      const flag =
        this.$isNotEmpty(this.formData.baseNoticeId) ||
        this.$isNotEmpty(this.formData.questionnaireNoticeId);
      if (!flag) {
        this.formData.healthNoticeType = 0;
        return false;
      }

      if (val === 0) {
        this.flag = false;
        this.$confirm(
          '切换后，已设置的核保资料将不可恢复，是否切换？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          },
        )
          .then(() => {
            this.formData.baseNoticeId = null;
            this.formData.baseNoticePdfName = null;
            this.formData.questionnaireNoticeId = null;
            this.questionInfo = {};
            this.formData.healthNoticeType = null;
            this.flag = true;
          })
          .catch(() => {
            this.formData.underwritingFlag = 1;
            this.flag = true;
          });
      } else {
        this.formData.healthNoticeType = 0;
      }
    },
    // 更新保险规则
    save(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (
          !this.formData.insuranceInstruction &&
          !this.formData.privacyPolicy &&
          !this.formData.insuranceClause &&
          !this.formData.liabilityExemption &&
          !this.formData.customerNotice &&
          !this.formData.samplePolicy &&
          !this.formData.rateTable &&
          !this.formData.insuranceStatement
        ) {
          this.$message.warning('请上传用户告知资料');
          return;
        }
        if (this.formData.underwritingFlag === 1) {
          if (
            this.formData.healthNoticeType === 0 &&
            this.$isEmpty(this.formData.baseNoticeId)
          ) {
            this.$message.warning('请上传普通健康告知');
            return;
          } else if (
            this.formData.healthNoticeType === 1 &&
            this.$isEmpty(this.formData.questionnaireNoticeId)
          ) {
            this.$message.warning('请选择健告问卷');
            return;
          }
        }
        let formData = this.$extends({}, this.formData);
        // 单位提交成天
        formData.insuredMinAge =
          this.insuredMinUnit === 1
            ? formData.insuredMinAge * 365
            : formData.insuredMinAge;
        formData.insuredMaxAge =
          this.insuredMaxUnit === 1
            ? formData.insuredMaxAge * 365
            : formData.insuredMaxAge;
        formData.policyholderMinAge =
          this.policyholderMinUnit === 1
            ? formData.policyholderMinAge * 365
            : formData.policyholderMinAge;
        formData.policyholderMaxAge =
          this.policyholderMaxUnit === 1
            ? formData.policyholderMaxAge * 365
            : formData.policyholderMaxAge;
        // 判断新增还是编辑
        this.rules && this.rules.id && delete formData.step;
        const provinceIds = formData.provinceIds.filter(item =>
          item.includes('全国'),
        );
        if (this.$isNotEmpty(provinceIds)) {
          formData.provinceIds = null;
        }
        formData = this.$delEmptyKey(formData);
        this.loading = true;
        this.$store
          .dispatch('insuranceProducts/saveRules', formData)
          .then(res => {
            this.loading = false;
            if (!res.code) {
              this.$message.success(res.comment);
              if (this.edit === 'create') {
                this.$emit('next', {
                  activeIndex: 5,
                  data: {
                    rules: { ...formData, id: res.data },
                    stepState: true
                  }
                });
              }
            } else {
              this.$message.warning(res.comment);
            }
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 3
      });
    },
    /**
     * 上传图片变更
     */
    imgUploadChange(val, key) {
      this.formData[key] = val.name;
    },
    /**
     * 删除上传的文件
     */
    delFile(valueKey, key) {
      this.formData[valueKey] = null;
      this.formData[key] = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.baseNotice-box {
  margin-bottom: 24px;
  margin-top: -24px;
  width: 290px;
}
.unit-input {
  width: 177px;
}
.rule-list {
  .rule-item {
    margin-bottom: 24px;
    width: 290px;
    .rule-tips {
      width: 380px;
    }
    .rule-content {
      color: #989ab3;
      font-size: 14px;
      margin: 24px 0 24px 10px;
    }
    .label-content {
      color: #464668;
      font-size: 16px;
    }
    .label-tip {
      color: #989ab3;
    }
  }
}
.rule-content {
  .del {
    display: none;
  }
  &:hover .del {
    display: block;
  }
}
.uploadBtn {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #3599fe;
  color: #3599fe;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.tpl-content {
  padding: 24px 24px 0px;
  width: 99%;
  font-size: 16px;
  line-height: 16px;
  border-radius: 4px;
  border: 1px solid #ebedf2;
  background: #fff;
  margin: 0 auto 24px;
  box-shadow: 0px 0px 4px 0px rgba(179, 179, 179, 0.5);
  color: #464668;
  .tpl-label-top {
 border-bottom: 1px solid #EBEDF2;
  }
  .tpl-label {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 400;
    color: #A2A3B7;
  }
  .tpl-label-title {
    font-size: 18px;
    font-weight: 500;
     margin-bottom: 24px;
  }
  .questionInfos-content {
    border-bottom: 1px solid #ebedf2;
    width: 1118px;
  }
  .questionInfos-content:first-child{
    margin-top: 20px;
  }
  .questionType-one {
    display: inline-block;
    width: 38px;
    height: 20px;
    background: #BDE1FF;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: #3599FE;
    border: solid 1px #3599FE;
  }
  .questionType-three {
   width: 68px;
  height: 20px;
  background: #D4FFEE;
  border-radius: 3px;
  border: 1px solid #4DB49B;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  padding: 3px;
  color: #4DB49B;
  }
  .yes{
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #63D8DA;
    border-radius: 50%;
    color: #fff;
    text-align: center;
  }
  .no {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #F64E60;
    border-radius: 50%;
    text-align: center;
    color: #fff;
  }
}
</style>
