<template>
  <div class="base-form page-form modal-form">
    <div class="title-top">基础信息</div>
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="保障责任名称" prop="name">
            <el-input
              v-model="baseForm.name"
              maxlength="20"
              :disabled="!!id && postStatus !== 107"
              placeholder="请输入责任名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险分类" prop="insuranceType">
            <el-cascader
              v-model="baseForm.insuranceType"
              :options="insuranceTypes"
              placeholder="请选择保险分类"
              :props="optionProps"
              :disabled="!!id && postStatus !== 107"
              @change="insuranceTypescChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主/附险" prop="mainDeputy">
            <el-select
              v-model="baseForm.mainDeputy"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择主/附险"
              filterable
              @change="mainDeputyChange"
            >
              <el-option
                v-for="item in mainDeputys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保障责任类型" prop="rightTypeList">
            <el-cascader
              v-model="baseForm.rightTypeList"
              :options="rightTypes"
              placeholder="请选择保障责任类型"
              :props="optionProps"
              :disabled="!!id && postStatus !== 107"
              @change="rightTypeChange"
            />
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <div class="form-item">
            <div class="item">
              <el-form-item label="医疗机构" prop="medicalInstitutionType">
                <el-select
                  v-model="baseForm.medicalInstitutionType"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择医疗机构"
                  filterable
                >
                  <el-option
                    v-for="item in medical_institution_natures"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="item none-label">
              <el-form-item  prop="hospitalLevelLimit">
                <el-select
                  v-model="baseForm.hospitalLevelLimit"
                  :disabled="!!id && postStatus !== 107"
                  filterable
                  placeholder="请选择医院类型"
                >
                  <el-option
                    v-for="item in hospital_level_limints"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div
              v-if="baseForm.hospitalLevelLimit === 4107"
              class="item none-label"
            >
              <el-form-item prop="allowHospitalList">
                <el-select
                  v-model="baseForm.allowHospitalList"
                  multiple
                  filterable
                  remote
                  placeholder="请选择指定医院"
                  :remote-method="remoteHospitalMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in hospitalList"
                    :key="item.hospitalId"
                    :label="item.hospitalName"
                    :value="item.hospitalId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="form-item">
            <div class="item">
              <el-form-item label="给付条件" prop="paymentConditionType">
                <el-select
                  v-model="baseForm.paymentConditionType"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择给付条件"
                  @change="paymentConditionTypeChange"
                >
                  <el-option
                    v-for="item in paymentConditionTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div
              v-if="baseForm.paymentConditionType === 2"
              class="item none-label"
            >
              <el-form-item prop="paymentConditionDisease">
                <el-select
                  v-model="baseForm.paymentConditionDisease"
                  multiple
                  filterable
                  remote
                  placeholder="请搜索适用疾病"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  @change="paymentConditionDiseaseChange"
                >
                  <el-option
                    v-for="item in diseaseList"
                    :key="item.id"
                    :label="item.diseaseName"
                    :value="item.id"
                  >
                    <span v-html="item.hightLable" />
                    <span class="option-remark">{{
                      item.code ? `${item.code} : ${item.attribute}` : ''
                    }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div
              v-if="baseForm.paymentConditionType === 3"
              class="item none-label"
            >
              <el-form-item prop="paymentCondition">
                <el-input
                  v-model="baseForm.paymentCondition"
                  :maxlength="500"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请输入给付条件"
                />
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="赔付条件限制说明">
            <el-input
              v-model="baseForm.paymentConditionLimit"
              type="textarea"
              :rows="3"
              :maxlength="200"
              :disabled="!!id && postStatus !== 107"
              placeholder="如果有赔付条件限制，请说明"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="除外条件说明">
            <el-input
              v-model="baseForm.paymentConditionExclusion"
              type="textarea"
              :rows="2"
              :maxlength="200"
              :disabled="!!id && postStatus !== 107"
              placeholder="如果有除外条件限制，请说明"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="table-list">
            <div class="table-title flex-box">
              <span class="title">给付逻辑</span>
              <div
                v-if="!(!!id && postStatus !== 107)"
                class="add-item"
                @click="addRow"
                ></div
              >
            </div>
            <el-table :data="baseForm.payLogics || []" class="table-data">
              <el-table-column>
                <template slot="header">
                  <span class="fc-red">*</span>
                  <span>结算医保类型</span>
                </template>
                <template slot-scope="scope">
                  <el-form-item
                    :prop="
                      `payLogics[${scope.$index}].settlementMedicalInsuranceType`
                    "
                    :rules="[{ required: true, message: '请选择结算医保类型' }]"
                    class="table-form-item"
                  >
                    <el-select
                      v-model="scope.row.settlementMedicalInsuranceType"
                      placeholder="请选择类型"
                      filterable
                      :disabled="!!id && postStatus !== 107"
                    >
                      <el-option
                        v-for="item in settlementMedicalInsuranceTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot="header">
                  <span class="fc-red">*</span>
                  <span>给付方式</span>
                </template>
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`payLogics[${scope.$index}].settlementType`"
                    :rules="[{ required: true, message: '请选择给付方式' }]"
                    class="table-form-item"
                  >
                    <el-select
                      v-model="scope.row.settlementType"
                      placeholder="请选择给付方式"
                      :disabled="!!id && postStatus !== 107"
                      @change="settlementTypeChange(scope)"
                    >
                      <el-option
                        v-for="item in settlementTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="赔付比例（%）">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="scope.row.settlementType === 1"
                    :prop="`payLogics[${scope.$index}].payoutRatio`"
                    :rules="[{ required: true, message: '' }]"
                    class="table-form-item"
                  >
                    <InputNumber
                      v-model="scope.row.payoutRatio"
                      placeholder="赔付比例"
                      :min="0"
                      :max="100"
                      :precision="0"
                      class="input-number-90"
                      :disabled="!!id && postStatus !== 107"
                    />
                    <span> % </span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="赔付金额">
                <template slot-scope="scope">
                  <div v-if="scope.row.settlementType === 3" class="form-item">
                    <div class="item">
                      <el-form-item
                        :prop="`payLogics[${scope.$index}].payoutAmount`"
                        :rules="[{ required: true, message: '' }]"
                        class="table-form-item"
                      >
                        <InputNumber
                          v-model="scope.row.payoutAmount"
                          placeholder="赔付金额"
                          :min="0"
                          :max="999999"
                          :precision="0"
                          class="input-number"
                          :disabled="!!id && postStatus !== 107"
                        />
                      </el-form-item>
                    </div>
                    <div class="item">
                      <el-form-item
                        :prop="`payLogics[${scope.$index}].payoutAmountUnit`"
                        :rules="[{ required: true, message: '' }]"
                        class="table-form-item"
                      >
                        <el-select
                          v-model="scope.row.payoutAmountUnit"
                          placeholder="请选择单位"
                          :disabled="!!id && postStatus !== 107"
                        >
                          <el-option
                            v-for="item in payoutAmountUnits"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="免赔额">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`payLogics[${scope.$index}].deductible`"
                    :rules="[{ required: true, message: '' }]"
                    class="table-form-item"
                  >
                    <InputNumber
                      v-model="scope.row.deductible"
                      placeholder="免赔额"
                      :min="0"
                      :max="999999"
                      :precision="0"
                      class="input-number"
                      :disabled="!!id && postStatus !== 107"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="75">
                <template slot-scope="scope">
                  <!-- <span
                    v-if="scope.$index > 0 && !(!!id && postStatus !== 107)"
                    class="icon remove"
                    @click="deleteRow(scope.$index)"
                  /> -->
                   <el-popconfirm
                      title="删除后将不可恢复，是否删除？"
                      placement="top"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      confirm-button-type="plain"
                      cancel-button-type="primary"
                      :hide-icon="true"
                      @onConfirm="deleteServiceItems(scope.$index)"
                    >
                      <HoverTip
                         v-if="scope.$index > 0 && !(!!id && postStatus !== 107)"
                        slot="reference"
                        content="删除"
                        tip-class-name="icon-delete"
                        @click="deleteRow(scope.$index)"
                      />
                    </el-popconfirm>
                </template>
              </el-table-column>
              <div slot="empty">
                <div class="empty-img" />
              </div>
            </el-table>
          </div>
        </el-col>
        <el-col v-if="showCtrl === 3" :span="12">
          <el-form-item label="每日住院津贴额度" prop="dailyHospitalAllowance">
            <InputNumber
              v-model="baseForm.dailyHospitalAllowance"
              placeholder="每日住院津贴额度"
              :max="9999"
              :min="0"
              class="input-number"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="showCtrl === 3" :span="12">
          <el-form-item label="起付住院天数">
            <el-select v-model="baseForm.minimumDay" placeholder="起付住院天数">
              <el-option
                v-for="item in days"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="showCtrl === 3" :span="12">
          <div class="form-item">
            <div class="item">
              <el-form-item label="单次理赔天数限制">
                <el-select
                  v-model="baseForm.claimDayLimitSingle"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择单次理赔天数限制"
                >
                  <el-option
                    v-for="item in hospitalDays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="累计理赔天数限制">
                <el-select
                  v-model="baseForm.claimDayLimit"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择累计理赔天数限制"
                >
                  <el-option
                    v-for="item in hospitalDays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div v-if="showCtrl === 4" class="form-item">
            <div class="item">
              <el-form-item label="住院前天数限制" prop="beforeHospitalizedDay">
                <el-select
                  v-model="baseForm.beforeHospitalizedDay"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="住院前天数限制"
                >
                  <el-option
                    v-for="item in hospitalDays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="住院后天数限制" prop="afterHospitalizedDay">
                <el-select
                  v-model="baseForm.afterHospitalizedDay"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="住院后天数限制"
                >
                  <el-option
                    v-for="item in hospitalDays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="等待期" prop="waitDay">
            <el-select
              v-model="baseForm.waitDay"
              :disabled="!!id && postStatus !== 107"
              placeholder="等待期"
            >
              <el-option
                v-for="item in days90"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险责任中止条件" prop="terminationCondition">
            <el-select
              v-model="baseForm.terminationCondition"
              :disabled="(!!id && postStatus !== 107) || disabled"
              placeholder="请选择保险责任中止条件"
              multiple
            >
              <el-option
                v-for="item in terminationConditions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="form-item">
            <div class="item">
              <el-form-item label="保证续保" prop="renewalFlag">
                <el-select
                  v-model="baseForm.renewalFlag"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择保证续保"
                  @change="
                    () => {
                      baseForm.renewalYearLimit = '';
                      baseForm.renewalAgeLimit = '';
                    }
                  "
                >
                  <el-option
                    v-for="item in renewalFlags"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="baseForm.renewalFlag" class="item none-label">
              <el-form-item
                prop="renewalYearLimit"
                :rules="[
                  {
                    required: this.$isEmpty(baseForm.renewalAgeLimit),
                    message: '请选择续保年限',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="baseForm.renewalYearLimit"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择续保年限"
                  :clearable="true"
                >
                  <el-option
                    v-for="item in renewalYearLimits"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="baseForm.renewalFlag" class="item none-label">
              <el-form-item
                prop="renewalAgeLimit"
                :rules="[
                  {
                    required: $isEmpty(baseForm.renewalYearLimit),
                    message: '请选择续保年龄',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="baseForm.renewalAgeLimit"
                  :disabled="!!id && postStatus !== 107"
                  placeholder="请选择续保年龄"
                  :clearable="true"
                >
                  <el-option
                    v-for="item in renewalAgeLimits"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="required-box">
            <div class="required">
              <span class="required-icon">*</span>
              <span class="label">责任详情</span>
            </div>
            <div id="guaranteeDetails" />
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!id" class="footer">
      <el-button type="primary" @click.native.prevent="next('baseForm')"
        >下一步</el-button
      >
    </div>
    <div v-else class="page-footer">
      <!-- 待发布 -->
      <button
        v-if="postStatus === 107"
        type="button"
        class="btn-save mr-30"
        @click="save('baseForm')"
      >
        保存
      </button>
      <!-- 状态改变组件 -->
      <Footer :id="id" :post-status="postStatus" />
    </div>
  </div>
</template>
<script>
import E from 'wangeditor';
let guaranteeDetailsEditor;
import { editorUploadImage, replaceHightKeyWord } from '@/utils/common';
import Footer from '../footer';
import {
  settlementMedicalInsuranceTypes,
  settlementTypes,
  paymentConditionTypes,
  payoutAmountUnits,
  days,
  terminationConditions,
  renewalFlags,
  renewalAgeLimits,
  renewalYearLimits,
  hospitalDays,
  days90
} from './config';
import { mapActions } from 'vuex';
import { uniqWith, isEqual } from 'lodash';
export default {
  name: 'BaseForm',
  components: {
    Footer
  },
  props: {
    baseForm: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    const checkGuaranteePowerName = (rule, value, callback) => {
      this.$store
        .dispatch('insuranceProducts/checkGuaranteePowerName', {
          id: this.$route.params.id || null,
          name: value
        })
        .then(res => {
          if (!res.data) {
            return callback(new Error('责任名称重复'));
          }
          callback();
        });
    };
    return {
      type: true,
      insuranceTypes: [],
      mainDeputys: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入责任名称',
            trigger: 'blur'
          },
          { validator: checkGuaranteePowerName, trigger: 'blur' }
        ],
        insuranceType: [
          {
            required: true,
            message: '请选择保险分类',
            trigger: 'change'
          }
        ],
        mainDeputy: [
          {
            required: true,
            message: '请选择主/附险',
            trigger: 'change'
          }
        ],
        rightTypeList: [
          {
            required: true,
            message: '请选择保障责任类型',
            trigger: 'change'
          }
        ],
        paymentConditionType: [
          {
            required: true,
            message: '请选择给付条件',
            trigger: 'change'
          }
        ],
        paymentConditionDisease: [
          {
            required: true,
            message: '请选择对应疾病',
            trigger: 'change'
          }
        ],
        paymentCondition: [
          {
            required: true,
            message: '请输入给付条件',
            trigger: 'blur'
          }
        ],
        medicalInstitutionType: [
          {
            required: true,
            message: '医疗机构类型',
            trigger: 'change'
          }
        ],
        beforeHospitalizedDay: [
          {
            required: true,
            message: '请选择住院前天数限制',
            trigger: 'change'
          }
        ],
        afterHospitalizedDay: [
          {
            required: true,
            message: '请选择住院后天数限制',
            trigger: 'change'
          }
        ],
        waitDay: [
          {
            required: true,
            message: '请选择等待期',
            trigger: 'change'
          }
        ],
        terminationCondition: [
          {
            required: true,
            message: '请选择保险责任中止条件',
            // trigger: 'change'
            trigger: 'blur'
          }
        ],
        renewalFlag: [
          {
            required: true,
            message: '请选择是否续保',
            trigger: 'change'
          }
        ],

        hospitalLevelLimit: [
          {
            required: true,
            message: '请选择医院等级',
            trigger: 'change'
          }
        ]
      },
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      postStatusList: [],
      settlementMedicalInsuranceTypes,
      settlementTypes,
      paymentConditionTypes,
      diseaseList: [],
      loading: false,
      medicalInstitutionTypes: [],
      hospitalLevelLimits: [],
      payoutAmountUnits,
      days,
      terminationConditions,
      renewalFlags,
      renewalAgeLimits,
      renewalYearLimits,
      hospitalDays,
      rightTypes: [],
      medical_institution_natures: [],
      hospital_level_limints: [],
      showCtrl: null,
      hospitalList: [],
      disabled: false,
      days90,
      historyList: [],
      keyword: ''
    };
  },
  watch: {
    baseForm: function(val, oldVal) {
      if (val.insuranceType !== oldVal.insuranceType) {
        this.insuranceTypescChange();
      }
    },
    'baseForm.guaranteeDetails': function(val) {
      guaranteeDetailsEditor.txt.html(val);
    }
  },
  created() {
    const vm = this;
    // 保险类别
    vm.$store.dispatch('insuranceProducts/getInsuranceTypes', {}).then(res => {
      vm.insuranceTypes = res.obj || [];
    });
    // 主险附险
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'mainDeputy'
      })
      .then(res => {
        vm.mainDeputys = res.obj || [];
      });
    // 发布状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        vm.postStatusList = res.obj || [];
      });

    // 医疗机构性质
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'medical_institution_nature'
      })
      .then(res => {
        vm.medical_institution_natures = res.obj || [];
      });
    // 医院等级限制
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'hospital_level_limint'
      })
      .then(res => {
        vm.hospital_level_limints = res.obj || [];
      });

    if (this.id) {
      this.rightTypeChange();
      vm.$store
        .dispatch('guaranteePower/protectRightHospital', {
          rightId: this.id
        })
        .then(res => {
          res.data.forEach(item => {
            item.hospitalId = Number(item.id);
            item.hospitalName = item.name;
          });
          this.hospitalList = res.data || [];
        });
      this.getDisease({
        id: this.id,
        type: 4
      }).then(res => {
        if (res && res.status) {
          res.data.forEach(item => {
            item.hightLable = replaceHightKeyWord('', item.diseaseName);
          });
          this.diseaseList = uniqWith(res.data, isEqual) || [];
          this.historyList = this.diseaseList;
        }
      });
    }
  },
  mounted() {
    // 富文本初始化
    guaranteeDetailsEditor = new E('#guaranteeDetails');
    this.configEditor(guaranteeDetailsEditor);
  },
  methods: {
    ...mapActions('goodsManage', ['getDiseaseByName', 'getDisease']),
    ...mapActions('dataDictionary', ['getHospitalList']),
    // 富文本配置
    configEditor(editor) {
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];
      editor.customConfig.customUploadImg = function(files, insert) {
        // files 是 input 中选中的文件列表
        editorUploadImage(files)
          .then(res => {
            // insert 是获取图片 url 后，插入到编辑器的方法
            insert(res);
          })
          .catch(() => {
            this.$message.error('上传图片有误');
          });
      };

      editor.customConfig.zIndex = 1;
      editor.create();
    },
    // 下一步
    next(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        vm.baseForm.guaranteeDetails = guaranteeDetailsEditor.txt.html();
        // 原因是富文本默认有这个p标签
        if (vm.baseForm.guaranteeDetails === '<p><br></p>') {
          vm.$message.warning('保障详情必填');
          return;
        }
        if (valid) {
          this.$emit('next', {
            activeIndex: 1
          });
        }
      });
    },
    // 保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        vm.baseForm.guaranteeDetails = guaranteeDetailsEditor.txt.html();
        // 原因是富文本默认有这个p标签
        if (vm.baseForm.guaranteeDetails === '<p><br></p>') {
          vm.$message.warning('保障详情必填');
          return;
        }
        if (valid) {
          vm.$store
            .dispatch('guaranteePower/updateBaseMsg', {
              ...vm.baseForm,
              id: vm.id
            })
            .then(res => {
              if (!res.code) {
                vm.$message.success('更新基础信息成功');
              }
            });
        }
      });
    },
    // 添加给付条件
    addRow() {
      const row = {
        deductible: null,
        payoutAmount: null,
        payoutRatio: null,
        settlementMedicalInsuranceType: null,
        settlementType: null,
        payoutAmountUnit: 1
      };
      this.baseForm.payLogics.push(row);
      // this.initSettlementMedicalInsuranceType()
    },
    // 删除给付条件
    deleteRow(index) {
      this.baseForm.payLogics.splice(index, 1);
      // this.initSettlementMedicalInsuranceType()
    },
    deleteServiceItems(index) {
 this.baseForm.payLogics.splice(index, 1);
    },
    // 搜索疾病
    remoteMethod(keyword) {
      this.loading = true;
      this.keyword = keyword;
      if (keyword !== '') {
        this.getDiseaseByName({
          name: keyword
        })
          .then(res => {
            this.loading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data || [];
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.diseaseList = [];
      }
    },
    // 医保类型
    initSettlementMedicalInsuranceType() {
      const list = [
        {
          label: '公费医疗',
          value: 1
        },
        {
          label: '基本医疗保险',
          value: 2
        },
        {
          label: '其他医疗保险',
          value: 3
        },
        {
          label: '全自费',
          value: 4
        }
      ];
      this.baseForm.payLogics.forEach(item => {
        list.forEach((ele, index) => {
          if (ele.value === item.settlementMedicalInsuranceType) {
            list.splice(index, 1);
          }
        });
      });
      this.settlementMedicalInsuranceTypes = list;
    },
    // 给付方式改变
    settlementTypeChange(scope) {
      const { $index, row } = scope;
      const list = this.baseForm.payLogics;

      if (row.settlementType === 1) {
        list[$index].deductible = null;
        list[$index].payoutAmount = null;
        list[$index].payoutAmountUnit = 1;
      } else if (row.settlementType === 2) {
        list[$index].payoutRatio = null;
        list[$index].payoutAmount = null;
        list[$index].payoutAmountUnit = 1;
      } else {
        list[$index].payoutRatio = null;
      }

      this.$set(this.baseForm, 'payLogics', list);
    },
    // 保险分类改变
    insuranceTypescChange() {
      this.$store
        .dispatch('guaranteePower/getListTypeTree', {
          insuranceType:
            this.baseForm.insuranceType &&
            Number(this.baseForm.insuranceType[1])
        })
        .then(res => {
          this.rightTypes = res.data || [];
        });
    },
    // 保障责任类型改变
    rightTypeChange() {
      const type =
        this.baseForm.rightTypeList && Number(this.baseForm.rightTypeList[1]);
      this.rightTypes.forEach(item => {
        item.child.forEach(child => {
          if (child.id === type) {
            this.showCtrl = Number(child.showCtrl);
          }
        });
      });
    },
    // 医院搜索
    remoteHospitalMethod(keyword) {
      this.loading = true;
      if (keyword !== '') {
        this.getHospitalList({
          hospitalName: keyword,
          pageNum: 1,
          pageSize: 100
        })
          .then(res => {
            this.hospitalList = res.data.list || [];
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.hospitalList = [];
      }
    },
    mainDeputyChange() {
           if (this.baseForm.mainDeputy === 159) {
        this.$set(this.baseForm, 'terminationCondition', ['6']);
        this.disabled = true;
      } else {
        this.disabled = false;
        this.$set(this.baseForm, 'terminationCondition', []);
      }
    },
    // 记录之前选中的疾病数据
    paymentConditionDiseaseChange() {
      const id = this.baseForm.paymentConditionDisease[
        this.baseForm.paymentConditionDisease.length - 1
      ];
      const flag = this.historyList.some(item => item.id === id);
      if (!flag) {
        this.diseaseList.forEach(item => {
          if (item.id === id) {
            this.historyList.push(item);
          }
        });
      }
      this.historyList.forEach(item => {
        item.hightLable = replaceHightKeyWord(this.keyword, item.diseaseName);
      });
    },
    paymentConditionTypeChange() {
      if (this.baseForm.paymentConditionType === 2) {
        this.diseaseList = this.historyList || [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.base-form {
  .title-top {
    margin-top: 24px;
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .required-box {
    .required {
      margin-bottom: 10px;
      line-height: 14px;
      .required-icon {
        color: #ff4949;
      }
      .label {
        color: #606266;
        font-size: 14px;
      }
    }
  }
  .form-item {
    display: flex;
    .item {
      flex: 1;
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
    }
    .none-label {
      padding-top: 24px;
    }
  }
  .table-list {
    margin-bottom: 24px;
    .table-title {
      margin-bottom: 24px;
      .title {
        font-size: 18px;

        font-weight: 600;
        color: #464668;
      }
      .add-item {
        margin-left: 12px;
       width: 16px;
       height: 16px;
        background: url("../../../../../assets/add.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .table-form-item {
      margin-bottom: 0 !important;
      padding: 12px 0;
      .el-select {
        width: 100%;
      }
    }
  }
  .footer {
    margin-top: 24px;
    text-align: right;
  }
  .input-number {
    width: 100%;
  }
  .input-number-90 {
    width: 90%;
  }
}
</style>
