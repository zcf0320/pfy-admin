<template>
  <el-form ref="formData" :model="formData" class="rx">
    <div class="flex-between mb-24">
      <div class="title-top mb-0 lh-32" style="padding:0">西药处方</div>
      <div>
        <el-button
          v-if="isEdit && pageAuthority.includes('add')"
          size="small"
          class="btn-exit"
          :disabled="formData.treatmentStructuredList.length >= 5"
          @click="add()"
        >
          新增
        </el-button>
      </div>
    </div>
    <div>
      <div
        v-for="(item, index) in formData.treatmentStructuredList"
        :key="index"
      >
        <div class="flex-between mb-20 mt-20">
          <div class="flex">
            <div class="title">西药处方{{ index + 1 }}</div>
            <div class="title-tips">
              （根据医生开具的处方登记）
            </div>
          </div>
          <div class="flex">
            <span
              v-if="
                isEdit &&
                  ($isEmpty(item.baseDrugList) || item.baseDrugList.length) < 10
              "
              class="fc-blue pointer fs-16"
              @click="addItem(index)"
            >
              添加药品
            </span>
            <span
              v-if="
                $isNotEmpty(formData.treatmentStructuredList) &&
                  formData.treatmentStructuredList.length > 1 &&
                  isEdit
              "
              class="fc-red ml-30 pointer fs-16"
              @click="del(index)"
            >
              删除处方
            </span>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="处方编号">
              <el-input
                v-model="item.prescriptionNumber"
                placeholder="请输入"
                style="width: 265px;"
                maxlength="20"
                :disabled="!isEdit"/></el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="就诊时间">
              <el-date-picker
                v-model="item.clinicTime"
                type="date"
                placeholder="选择日期"
                style="width: 265px;"
                value-format="timestamp"
                :disabled="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="就诊医院">
          <el-select
            v-model="item.hospitalList"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="
              key => {
                remoteMethod(key, index);
              }
            "
            :loading="searchLoading"
            style="width: 265px;"
            :disabled="!isEdit"
            value-key="hospitalId"
            clearable
          >
            <el-option
              v-for="item in item.clinicHospital"
              :key="item.hospitalId"
              :label="item.hospitalName"
              :value="item"
            >
              <span v-html="item.hightLable" />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="诊断"
          :prop="`treatmentStructuredList[${index}].diagnoseNameList`"
          :rules="[{ required: true, message: '请选择诊断结果' }]"
          style="amrgin-bottom:24px"
        >
          <el-select
            v-model="item.diagnoseNameList"
            style="width: 100%"
            filterable
            multiple
            placeholder="请选择对应疾病"
            remote
            :remote-method="getDiseases"
            :loading="loading"
            :disabled="!isEdit"
            :multiple-limit="20"
          >
            <el-option
              v-for="(item, index1) in diseaseList"
              :key="index1"
              :label="item.diseaseName"
              :value="item.diseaseName"
            >
              <span v-html="item.hightLable" />
              <span class="option-remark-left">{{
                item.code ? `${item.code} : ${item.attribute}` : ''
              }}</span>
              <span v-if="item.isRights" class="option-remark-lable"
                >权益疾病</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="$isNotEmpty(item.baseDrugList)" class="line-solid mb-24" />
        <div v-for="(itemDrug, idx) in item.baseDrugList || []" :key="idx">
          <div class="flex-between mb-20">
            <div class="subTitle">药品{{ idx + 1 }}</div>
            <div class="flex">
              <span
                v-if="isEdit"
                class="fc-red ml-30 pointer fs-16"
                @click="delItem(index, idx)"
              >
                删除
              </span>
            </div>
          </div>
          <div class="flex-between">
            <el-form-item
              label="药品名称"
              :prop="
                `treatmentStructuredList[${index}].baseDrugList[${idx}].drugName`
              "
              :rules="[{ required: true, message: '请选择药品名称' }]"
            >
              <el-select
                v-model="itemDrug.drugName"
                class="w-320"
                filterable
                placeholder="请选择药品"
                remote
                :remote-method="getDrugName"
                :loading="loading1"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="(item, index2) in drugNameList"
                  :key="index2"
                  :label="item.name"
                  :value="item.name"
                  @click.prevent.native="getDrugType(item.standard, index, idx)"
                >
                  <span v-html="item.hightLable" />
                  <span class="option-remark-left">{{
                    item.standard ? item.standard : ''
                  }}</span>
                  <span v-if="item.isRights" class="option-remark-lable"
                    >权益药品</span
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="药品规格">
              <!-- <el-select
                                class="w-320"
                                placeholder="请选择药品规格"
                                v-model="itemDrug.drugSpecifications"
                                :clearable="true"
                                :disabled="!isEdit"
                            >
                                <el-option
                                    v-for="item in itemDrug.specificationsList"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select> -->
              <el-input
                v-model="itemDrug.drugSpecifications"
                class="w-320"
                placeholder="请选择药品规格"
                :disabled="true"
              />
            </el-form-item>
          </div>
          <div class="flex-between">
            <el-form-item label="用法">
              <el-select
                v-model="itemDrug.useWay"
                class="w-320"
                filterable
                placeholder="请选择用法"
                :clearable="true"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="item in useWayList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="单次剂量"
              :prop="
                `treatmentStructuredList[${index}].baseDrugList[${idx}].unitDose`
              "
              :rules="[{ validator: $validators.checkDecima3 }]"
            >
              <div>
                <InputNumber
                  v-model="itemDrug.unitDose"
                  placeholder="请输入剂量"
                  :max="9999"
                  :clearable="true"
                  :disabled="!isEdit"
                />
                <el-select
                  v-model="itemDrug.unit"
                  placeholder="剂量单位"
                  class="w-130"
                  clearable
                  filterable
                  :disabled="!isEdit"
                >
                  <el-option
                    v-for="item in specList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div class="flex-between">
            <el-form-item label="频率">
              <el-select
                v-model="itemDrug.frequency"
                class="w-320"
                placeholder="请选择频率"
                filterable
                clearable
                :disabled="!isEdit"
              >
                <el-option
                  v-for="item in frequencyList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="天数"
              :prop="
                `treatmentStructuredList[${index}].baseDrugList[${idx}].dayNumber`
              "
              :rules="[
                {
                  validator: $validators.checkPInt,
                  message: '请输入1~99正整数',
                },
              ]"
            >
              <InputNumber
                v-model="itemDrug.dayNumber"
                class="w-320"
                :maxlength="2"
                :disabled="!isEdit"
              />
            </el-form-item>
          </div>
          <div class="flex-between">
            <el-form-item
              label="开药数量"
              :prop="
                `treatmentStructuredList[${index}].baseDrugList[${idx}].prescribeNumber`
              "
              :rules="[
                {
                  validator: $validators.checkPInt,
                  message: '请输入1~99正整数',
                },
              ]"
            >
              <InputNumber
                v-model="itemDrug.prescribeNumber"
                class="w-320"
                :maxlength="2"
                placeholder="请输入数量"
                :disabled="!isEdit"
              />
            </el-form-item>
            <el-form-item
              label="单价"
              :prop="
                `treatmentStructuredList[${index}].baseDrugList[${idx}].univalence`
              "
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="itemDrug.univalence"
                class="w-320"
                :maxlength="9"
                :max="999999.99"
                :disabled="!isEdit"
              />
            </el-form-item>
          </div>
          <div class="flex-between">
            <el-form-item label="品牌名">
              <el-input
                v-model="itemDrug.brandName"
                class="w-320"
                maxlength="20"
                placeholder="请输入品牌名"
                :disabled="!isEdit"
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
import { mapActions } from 'vuex';
import { replaceHightKeyWord } from '@/utils/common';
export default {
  name: 'auditRecordsDetail',
  props: {
    id: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      saveLoading: false,
      loading: false,
      loading1: false,
      drugNameList: [],
      diseaseList: [],
      specList: [
        '片',
        '粒',
        '丸',
        '包',
        '袋',
        '盒',
        '支',
        '贴',
        'mg',
        'g',
        'ml',
        'IU'
      ],
      frequencyList: [
        '隔日1次',
        '每日1次',
        '每日2次',
        '每日3次',
        '每日4次',
        '每日5次',
        '每日6次',
        '每日7次',
        '每日8次',
        '每2日1次',
        '每3日1次',
        '每周1次',
        '每周2次',
        '每周3次',
        '每2周1次',
        '每3周1次',
        '每4周1次',
        '每月1次',
        '每小时1次',
        '每2小时1次',
        '每3小时1次',
        '每4小时1次',
        '每5小时1次',
        '每6小时1次',
        '每8小时1次',
        '每12小时1次',
        '每24小时1次',
        '早晚各1次',
        '睡前服用',
        '必要时服用',
        '立即用药'
      ],
      useWayList: [
        '口服',
        '嚼服',
        '冲服',
        '肌内注射',
        '皮下注射',
        '皮内注射',
        '静脉注射',
        '静脉滴注',
        '穴位注射',
        '喷鼻',
        '滴鼻',
        '耳用',
        '外用',
        '直肠给药',
        '阴道给药',
        '雾化吸入',
        '舌下含服'
      ],
      formData: {
        treatmentStructuredList: [
          {
            diagnoseNameList: [],
            baseDrugList: [],
            clinicTime: null,
            prescriptionNumber: '',
            clinicHospital: [],
            hospitalList: {},
            hospitalId: ''
          }
        ]
      },

      searchLoading: true
    };
  },
  computed: {
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    }
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', [
      'getDiseaseAll',
      'getDrugNameAll',
      'getSpecifications',
      'saveOrUpdate',
      'getTreatmentStructured'
    ]),
    /**
     * 获取初始化数据
     */
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (this.$isNotEmpty(res.data)) {
        if (this.$isNotEmpty(res.data.images)) {
          this.$emit('imgs', res.data.images);
        }
        if (this.$isNotEmpty(res.data.structuredList)) {
          this.formData.treatmentStructuredList = res.data.structuredList;
          const data = this.formData.treatmentStructuredList;
          data.forEach(item => {
            if (this.$isNotEmpty(item.hospitalList)) {
              item.clinicHospital = [item.hospitalList];
              item.hospitalId = item.hospitalList.hospitalId;
            }
          });
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
      }
    },
    /**
     * 保存诊疗资料结构化数据
     */
    saveForm() {
      this.saveLoading = true;
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          this.$message.warning('信息填写有误');
          return false;
        }
        const params = {
          claimRecordId: this.id,
          treatmentStructuredList: this.formData.treatmentStructuredList
        };
        params.treatmentStructuredList.forEach(item => {
          delete item.clinicHospital;
          if (!item.hospitalList) {
            item.hospitalList = {};
          }
        });

        this.saveOrUpdate(params)
          .then(() => {
            // const id = this.id;
            this.$message.success('保存成功');
            this.$emit('update:isEdit', false);
            this.saveLoading = false;
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    },
    getDrugType(type, index, idx) {
      this.formData.treatmentStructuredList[index].baseDrugList[
        idx
      ].drugSpecifications = type;
    },
    // 模糊搜索疾病
    getDiseases(keyword) {
      this.loading = true;
      //   const arr = [];
      if (keyword !== '') {
        this.$store
          .dispatch('goodsManage/getRightDiseaseByName', {
            name: keyword,
            id: this.$route.params.id
          })
          .then(res => {
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.diseaseList = [];
      }
    },
    // 模糊搜索药品
    getDrugName(keyword) {
      this.loading1 = true;
      if (keyword !== '') {
        // const arr = [];
        this.$store
          .dispatch('goodsManage/getRightDrugsByName', {
            name: keyword,
            id: this.$route.params.id
          })
          .then(res => {
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.name);
            });
            this.drugNameList = res.data;
            this.loading1 = false;
          })
          .catch(() => {
            this.loading1 = false;
          });
      } else {
        this.loading1 = false;
        this.drugNameList = [];
      }
    },
    /**
     * 根据药品获取规格
     */
    getSpce(val, index, idx) {
      this.getSpecifications(val)
        .then(res => {
          this.formData.treatmentStructuredList[index].baseDrugList[
            idx
          ].specificationsList = res.data || [];
        })
        .catch(() => {
          this.formData.treatmentStructuredList[index].baseDrugList[
            idx
          ].specificationsList = [];
        });
      this.formData.treatmentStructuredList[index].baseDrugList[
        idx
      ].drugSpecifications = '';
    },
    /**
     * 添加处方
     */
    add() {
      const itemData = {
        diagnoseNameList: [],
        baseDrugList: []
      };
      this.formData.treatmentStructuredList.push(itemData);
    },
    /**
     * 删除处方
     */
    del(index) {
      this.$confirm('删除数据后不可恢复,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.treatmentStructuredList.splice(index, 1);
      });
    },
    /**
     * 添加药品
     */
    addItem(index) {
      const itemData = {
        dayNumber: null,
        drugName: '',
        drugSpecifications: '',
        frequency: '',
        prescribeNumber: null,
        unit: '',
        unitDose: null,
        univalence: null,
        useWay: '',
        specificationsList: [],
        brandName: ''
      };
      this.formData.treatmentStructuredList[index].baseDrugList =
        this.formData.treatmentStructuredList[index].baseDrugList || [];
      this.formData.treatmentStructuredList[index].baseDrugList.push(itemData);
    },
    /**
     * 删除药品
     */
    delItem(index, idx) {
      this.$confirm('删除数据后不可恢复,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.treatmentStructuredList[index].baseDrugList.splice(
          idx,
          1,
        );
      });
    },
    remoteMethod(key, index) {
      this.searchLoading = true;
      if (key) {
        const params = {
          hospitalName: key,
          pageNum: 1,
          pageSize: 99999
        };
        this.$store
          .dispatch('dataDictionary/getHospitalList', params)
          .then(res => {
            this.searchLoading = false;
            res.data.list.forEach(item => {
              item.hightLable = replaceHightKeyWord(key, item.hospitalName);
            });
            this.formData.treatmentStructuredList[index].clinicHospital =
              res.data.list || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.treateInformation {
  .title-top {
    line-height: 32px;
  }
  .el-scrollbar {
    flex-grow: 1;
    width: auto;
  }
  .left-content {
    padding-right: 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
    .title-tips {
      font-size: 16px;
      font-weight: 400;
      color: #a2a3b7;
    }
    .subTitle {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
  }
  .right-content {
    margin-left: 24px;
    width: 445px;
    height: 400px;
    border: 1px solid #979797;
  }
}
</style>
