<template>
  <div class="batchUpdateDrug">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">批量更新药品</div>
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          class="demo-ruleForm"
        >
          <div class="batchUpdateDrug-select">
            <div class="batchUpdateDrug-select-text">选择药品</div>
            <div class="batchUpdateDrug-select-input">
              <el-form-item prop="drugsName">
                <el-select
                  v-model="form.drugsName"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="searchName"
                  :loading="drugsNameLoading"
                  @change="drugNameChange"
                >
                  <el-option
                    v-for="item in drugsNameList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="batchUpdateDrug-drugsDetail">
            <div class="batchUpdateDrug-drugsDetail-top">适应症</div>
            <div class="batchUpdateDrug-drugsDetail-content">
              {{ drugInfo1 || '请选择药品' }}
            </div>
            <div class="batchUpdateDrug-drugsDetail-top">用法用量描述</div>
            <div class="batchUpdateDrug-drugsDetail-content">
              {{ drugInfo2 || '请选择药品' }}
            </div>
          </div>
          <div class="batchUpdateDrug-select no-border">
            <div class="batchUpdateDrug-select-text">选择规格</div>
            <div class="batchUpdateDrug-select-input">
              <el-select
                v-model="form.specifications"
                multiple
                filterable
                placeholder="全部"
              >
                <el-option
                  v-for="item in specificationsList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
          <div class="batchUpdateDrug-select no-border no-padding">
            <div class="batchUpdateDrug-select-text">选择更新内容</div>
            <el-form-item prop="updataType">
              <el-checkbox-group v-model="form.updataType">
                <el-checkbox label="1">适用疾病</el-checkbox>
                <el-checkbox label="4">禁忌疾病</el-checkbox>
                <el-checkbox label="5">药品分类</el-checkbox>
                <el-checkbox label="2">药品属性</el-checkbox>
                <el-checkbox label="3">药品用量</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="batchUpdateDrug-drugsDetail">
            <div
              v-if="form.updataType.includes('1')"
              class="batchUpdateDrug-drugsDetail-top m-top10"
            >
              适用疾病
            </div>
            <div
              v-if="form.updataType.includes('1')"
              class="batchUpdateDrug-drugsDetail-input"
            >
              <el-select
                v-model="form.applyDisease"
                filterable
                multiple
                remote
                placeholder="请搜索适用疾病"
                :remote-method="remoteMethod"
                :loading="searchLoading"
                @change="applyHandlerSelect"
              >
                <el-option
                  v-for="(item, index) in diseaseList"
                  :key="'适用疾病' + index"
                  :label="item.diseaseName"
                  :value="String(item.id)"
                >
                  <span v-html="item.hightLable" />
                  <span class="option-remark">{{
                    item.code ? `${item.code} : ${item.attribute}` : ''
                  }}</span>
                </el-option>
              </el-select>
            </div>
            <div
              v-if="form.updataType.includes('4')"
              class="batchUpdateDrug-drugsDetail-top"
            >
              禁忌疾病
            </div>
            <div
              v-if="form.updataType.includes('4')"
              class="batchUpdateDrug-drugsDetail-input"
            >
              <el-select
                v-model="form.tabooDisease"
                filterable
                multiple
                remote
                placeholder="请搜索禁忌疾病"
                :remote-method="remoteMethod"
                :loading="searchLoading"
                @change="handlerSelect"
              >
                <el-option
                  v-for="(item, index) in diseaseList"
                  :key="'禁忌疾病' + index"
                  :label="item.diseaseName"
                  :value="String(item.id)"
                >
                  <span v-html="item.hightLable" />
                  <span class="option-remark">{{
                    item.code ? `${item.code} : ${item.attribute}` : ''
                  }}</span>
                </el-option>
              </el-select>
            </div>
            <div
              v-if="form.updataType.includes('5')"
              class="batchUpdateDrug-drugsDetail-top"
            >
              药品分类
            </div>
            <div
              v-if="form.updataType.includes('5')"
              class="batchUpdateDrug-drugsDetail-input"
            >
              <el-cascader
                v-model="form.classifyCode"
                :options="medicineTypes"
                :props="optionProps"
                style="width: 100%"
              />
            </div>
            <div
              v-if="form.updataType.includes('2')"
              class="batchUpdateDrug-drugsDetail-top"
            >
              药品属性
            </div>
            <div
              v-if="form.updataType.includes('2')"
              class="batchUpdateDrug-drugsDetail-table"
            >
              <div class="batchUpdateDrug-drugsDetail-table-top">
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  剂量
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  剂量单位
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  制剂数量
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  制剂单位
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  包装单位
                </div>
              </div>
              <div class="batchUpdateDrug-drugsDetail-table-bottom">
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-form-item prop="contentSpecification">
                    <el-input
                      v-model="form.contentSpecification"
                      maxlength="8"
                      type="number"
                      placeholder="请输入剂量"
                    />
                  </el-form-item>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.contentUnit"
                    filterable
                    placeholder="请选择剂量单位"
                  >
                    <el-option
                      v-for="item in DrugUnits1"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-form-item prop="preparationsCount">
                    <el-input
                      v-model="form.preparationsCount"
                      type="number"
                      placeholder="请输入制剂数量"
                    />
                  </el-form-item>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.preparationsUnit"
                    placeholder="请选择制剂单位"
                    filterable
                  >
                    <el-option
                      v-for="item in DrugUnits1"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.packagingUnit"
                    placeholder="请选择包装单位"
                    filterable
                  >
                    <el-option
                      v-for="item in DrugUnits2"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
              </div>
            </div>
            <div
              v-if="form.updataType.includes('3')"
              class="batchUpdateDrug-drugsDetail-top"
            >
              药品用量
            </div>
            <div
              v-if="form.updataType.includes('3')"
              class="batchUpdateDrug-drugsDetail-table"
            >
              <div class="batchUpdateDrug-drugsDetail-table-top">
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  默认单次用量
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  最大单次用量
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  用量单位
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  默认用药频率
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-top-item">
                  最大用药频率
                </div>
              </div>
              <div class="batchUpdateDrug-drugsDetail-table-bottom">
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-form-item prop="singleDose">
                    <el-input
                      v-model="form.singleDose"
                      maxlength="8"
                      type="number"
                      placeholder="请输入默认单次用量"
                    />
                  </el-form-item>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-form-item prop="maxSingleDose">
                    <el-input
                      v-model="form.maxSingleDose"
                      maxlength="8"
                      type="number"
                      placeholder="请输入最大单次用量"
                    />
                  </el-form-item>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.singleDosUnit"
                    placeholder="请选择用量单位"
                    filterable
                  >
                    <el-option
                      v-for="item in DrugUnits1"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.pharmacyFrequency"
                    placeholder="请选择默认用药频率"
                    filterable
                  >
                    <el-option
                      v-for="item in DrugUnits0"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="batchUpdateDrug-drugsDetail-table-bottom-item">
                  <el-select
                    v-model="form.maxPharmacyFrequency"
                    filterable
                    placeholder="请选择最大用药频率"
                  >
                    <el-option
                      v-for="item in DrugUnits0"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </el-scrollbar>
      <div class="page-footer">
        <el-button
          type="primary"
          :loading="btnLoading"
          @click.native.prevent="save"
          >保存</el-button
        >
      </div>
    </el-container>
  </div>
</template>

<script>
import { replaceHightKeyWord } from '@/utils/common';
import { mapActions } from 'vuex';
export default {
  name: 'BatchUpdate',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== '' && (value > 9999.999 || value < 0.001)) {
        callback(new Error('大小限制0.001～9999.999'));
      } else if (value !== '' && !/^\d+(\.\d{1,3})?$/g.test(value)) {
        callback(new Error('最多三位小数'));
      } else {
        callback();
      }
    };
    const validateInt = (rule, value, callback) => {
      if (value !== '' && (value > 9999 || value < 1)) {
        callback(new Error('大小限制1～9999'));
      } else if (value !== '' && !/^[0-9]*[1-9][0-9]*$/g.test(value)) {
        callback(new Error('必须为正整数'));
      } else {
        callback();
      }
    };
    return {
      searchLoading: false,
      drugsNameLoading: false,
      btnLoading: false,
      keyword: '',
      specificationsList: [],
      drugsNameList: [],
      drugInfo1: '', // 适应症
      drugInfo2: '', // 用法用量描述
      diseaseList: [],
      historyList: [],
      DrugUnits0: [], // 用药频率
      DrugUnits1: [], // 用量单位
      DrugUnits2: [], // 包装单位
      medicineTypes: [], // 药品分类
      form: {
        updataType: ['1'],
        drugsName: '',
        specifications: [], // 药品规格
        applyDisease: [],
        contentSpecification: '', // 含量
        contentUnit: '', // 含量单位
        preparationsCount: '', // 制剂数量
        preparationsUnit: '', // 制剂单位
        packagingUnit: '', // 包装单位
        singleDose: '', // 单次用量
        maxSingleDose: '', // 最大单次用量
        singleDosUnit: '', // 单次用量单位
        pharmacyFrequency: '', // 用药频率
        maxPharmacyFrequency: '', // 最大用药频率
        tabooDisease: [], // 禁忌疾病
        classifyCode: [] // 分类
      },
      optionProps: {
        label: 'value',
        value: 'label',
        children: 'children'
      },
      rules: {
        singleDose: [{ validator: validatePass, trigger: 'blur' }],
        maxSingleDose: [{ validator: validatePass, trigger: 'blur' }],
        contentSpecification: [{ validator: validatePass, trigger: 'blur' }],
        preparationsCount: [{ validator: validateInt, trigger: 'blur' }],
        updataType: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个更新内容',
            trigger: 'change'
          }
        ],
        drugsName: [{ required: true, message: '请选择药品', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getDrugUnits().then(res => {
      this.DrugUnits0 = res.data[2].unitValue || [];
      this.DrugUnits1 = res.data[1].unitValue || [];
      this.DrugUnits2 = res.data[0].unitValue || [];
    });
    // 获取商品分类
    this.getMedicineTypes().then(res => {
      this.medicineTypes = this.getTreeData(res.obj) || [];
    });
  },
  methods: {
    ...mapActions('drugManage', [
      'getDrugUnits',
      'getDiseasesNameList',
      'getDiseasesNameDetail',
      'batchUpdateDrug',
      'getMedicineTypes'
    ]),
    // 递归删除空药品分类方法
    getTreeData(data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length < 1) {
          // children若为空数组，则将children删除
          delete data[i].children;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          if (data[i].children) {
            this.getTreeData(data[i].children);
          }
        }
      }
      return data;
    },
    searchName(keyName) {
      this.drugsNameLoading = true;
      this.getDiseasesNameList({ searchName: keyName })
        .then(res => {
          this.drugsNameList = res.data;
          this.drugsNameLoading = false;
        })
        .catch(() => {
          this.drugsNameLoading = false;
        });
    },
    drugNameChange(searchName) {
      this.getDiseasesNameDetail({ searchName }).then(res => {
        res.data.classifyCode && res.data.classifyCode.reverse();
        this.drugInfo = res.data;
        this.drugInfo1 = res.data.indications || '';
        this.drugInfo2 = res.data.usageInfo || '';
        // this.diseaseList = res.data.applyDiseaseNames
        this.diseaseList = res.data.applyDiseaseNames.concat(
          res.data.tabooDiseaseNames,
        );
        this.diseaseList.forEach(item => {
          item.hightLable = replaceHightKeyWord('', item.diseaseName);
        });
        this.historyList = res.data.applyDiseaseNames;
        this.specificationsList = res.data.specs;
        this.form.applyDisease =
          res.data.applyDisease && res.data.applyDisease.length > 0
            ? res.data.applyDisease.split(',')
            : [];
        this.form.tabooDisease =
          res.data.tabooDisease && res.data.tabooDisease.length > 0
            ? res.data.tabooDisease.split(',')
            : [];
        this.form.classifyCode = res.data.classifyCode;
      });
    },
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const arr = [];
          this.form.updataType.includes('1') && arr.push('适用疾病');
          this.form.updataType.includes('2') && arr.push('药品属性');
          this.form.updataType.includes('3') && arr.push('药品用量');
          this.form.updataType.includes('4') && arr.push('禁忌疾病');
          this.form.updataType.includes('5') && arr.push('药品分类');
          this.$confirm(
            `确认要批量更新该药品的信息吗？保存成功后批量更新对应“${
              this.form.drugsName
            }”药品的（${arr.join('、')}）药品数据。`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            },
          ).then(() => {
            this.btnLoading = true;
            let {
              applyDisease,

              classifyCode,
              tabooDisease
            } = this.form;
            const {
              contentSpecification,
              contentUnit,
              preparationsCount,
              preparationsUnit,
              packagingUnit,
              singleDose,
              maxSingleDose,
              singleDosUnit,
              pharmacyFrequency,
              maxPharmacyFrequency,
              specifications,
              drugsName
            } = this.form;
            applyDisease = applyDisease.join(',');
            tabooDisease = tabooDisease.join(',');
            classifyCode =
              classifyCode.length > 0
                ? classifyCode[classifyCode.length - 1]
                : '';
            const params = {
              medicineName: drugsName,
              medicineSpecs: specifications.length > 0 ? specifications : ''
            };
            if (!params.medicineSpecs) {
              delete params.medicineSpecs;
            }
            if (this.form.updataType.includes('1')) {
              params.applyDisease = applyDisease;
            }
            if (this.form.updataType.includes('2')) {
              params.contentSpecification = contentSpecification; // 含量
              params.contentUnit = contentUnit; // 含量单位
              params.preparationsCount = preparationsCount; // 制剂数量
              params.preparationsUnit = preparationsUnit; // 制剂单位
              params.packagingUnit = packagingUnit; // 包装单位
            }
            if (this.form.updataType.includes('3')) {
              params.singleDose = singleDose; // 单次用量
              params.maxSingleDose = maxSingleDose; // 最大单次用量
              params.singleDosUnit = singleDosUnit; // 单次用量单位
              params.pharmacyFrequency = pharmacyFrequency; // 用药频率
              params.maxPharmacyFrequency = maxPharmacyFrequency; // 最大用药频率
            }
            if (this.form.updataType.includes('4')) {
              params.tabooDisease = tabooDisease;
            }
            if (this.form.updataType.includes('5')) {
              params.classifyCode = classifyCode;
            }
            this.batchUpdateDrug(params)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '批量更新成功!'
                });
                this.btnLoading = false;
                this.$router.go(-1);
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '批量更新失败!'
                });
                this.btnLoading = false;
              });
          });
        } else {
          this.$message.error('请检查输入！');
          return false;
        }
      });
    },
    handlerSelect() {
      const id = this.form.tabooDisease[this.form.tabooDisease.length - 1];
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
      this.diseaseList = this.historyList;
    },
    applyHandlerSelect() {
      const id = this.form.applyDisease[this.form.applyDisease.length - 1];
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
      this.diseaseList = this.historyList;
    },
    // 搜索疾病
    remoteMethod(keyword) {
      this.searchLoading = true;
      this.keyword = keyword;
      if (keyword !== '') {
        this.$store
          .dispatch('goodsManage/getDiseaseByName', {
            name: keyword
          })
          .then(res => {
            this.searchLoading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data
              ? res.data.concat(this.historyList)
              : this.historyList;
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.diseaseList = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.batchUpdateDrug {
  &-select {
    padding-bottom: 24px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
    &.no-border {
      box-shadow: none;
    }
    &.no-padding {
      padding: 0;
    }
    .el-form-item {
      margin: 0;
    }
    &-text {
      font-size: 14px;

      font-weight: bold;
      color: #464668;
      line-height: 14px;
    }
    &-input {
      width: 494px;
      height: 38px;
      margin-top: 12px;
      .el-select {
        width: 100%;
      }
    }
  }
  &-drugsDetail {
    padding-bottom: 24px;
    &-top {
      font-size: 15px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      margin: 24px 0 12px;
      &.m-top10 {
        margin-top: 10px;
      }
    }
    &-content {
      padding: 10px;
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 21px;
      background: #f3f7ff;
      border-radius: 4px;
    }
    &-input {
      > .el-select {
        width: 100%;
      }
    }
    &-table {
      background: #f3f6f9;
      &-top {
        display: flex;
        height: 42px;
        border-radius: 4px 4px 0px 0px;
        &-item {
          flex: 1;
          height: 42px;
          box-sizing: border-box;
          padding: 14px 24px;
          font-size: 14px;

          font-weight: 400;
          color: #989ab3;
          line-height: 14px;
        }
      }
      &-bottom {
        display: flex;
        height: 42px;
        border-radius: 4px 4px 0px 0px;
        &-item {
          flex: 1;
          height: 42px;
          box-sizing: border-box;
          .el-form-item,
          .el-select {
            margin: 0;
            width: 100%;
          }
          .el-form-item {
            /deep/ .el-form-item__error {
              right: 10px;
              top: 50%;
              left: auto;
              transform: translateY(-50%);
            }
          }
          > .el-select {
            width: 100%;
          }
          > .el-input {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
