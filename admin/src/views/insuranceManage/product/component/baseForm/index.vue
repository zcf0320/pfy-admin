<template>
  <div class="base-form modal-form">
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col v-if="baseForm.id" :span="12">
          <el-form-item label="ID" prop="name">
            <div class="look-box">
              <el-input
                v-model.trim="baseForm.id"
                maxlength="20"
                disabled
                placeholder="ID"
              />
              <el-button
                v-if="postStatus === 105"
                type="primary"
                @click="lookProduct(baseForm.id)"
                >立即查看</el-button
              >
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险产品名称" prop="name">
            <el-input
              v-model.trim="baseForm.name"
              maxlength="20"
              :disabled="edit === 'detail' || postStatus !== 107"
              placeholder="请输入保险产品名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险分类" prop="type">
            <el-cascader
              v-model="baseForm.type"
              :options="insuranceTypes"
              placeholder="请选择保险分类"
              :props="optionProps"
              :disabled="edit === 'detail' || postStatus !== 107"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品类型" prop="saleChannel">
            <el-select
              v-model="baseForm.saleChannel"
              :disabled="edit === 'detail' || postStatus !== 107"
              placeholder="请选择产品类型"
            >
              <el-option
                v-for="item in saleChannels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险公司" prop="companyId">
            <el-select
              v-model="baseForm.companyId"
              :disabled="edit === 'detail' || postStatus !== 107"
              placeholder="请选择归属公司"
            >
              <el-option
                v-for="item in insuranceCompanyList"
                :key="item.id"
                :label="item.companyName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签约地区" prop="signedAreaId">
            <el-select
              v-model="baseForm.signedAreaId"
              :disabled="edit === 'detail' || postStatus !== 107"
              placeholder="请选择归属公司"
            >
              <el-option
                v-for="item in signedAreaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保障期限" prop="insuranceTime">
            <div class="flex">
              <!--  -->
              <el-select
               style="width:50%;"
                v-model="baseForm.insuranceTime"
                :disabled="edit === 'detail' || postStatus !== 107"
                placeholder="请选择保障期限"
              >
                <el-option
                  v-for="item in insuranceTimes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-select
              style="width:50%;"
                v-model="baseForm.insuranceTimeUnit"
                class=" ml-24"
                :disabled="edit === 'detail' || postStatus !== 107"
              >
                <el-option label="年" :value="1" />
                <el-option label="月" :value="2" />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <div class="flex"> -->
            <el-form-item label="保证续保" prop="renewalOrNot">
              <el-select
                v-model="baseForm.renewalOrNot"
                class="flex1"
                :disabled="
                  edit === 'detail' || postStatus !== 107 || renewalDisable()
                "
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </el-form-item>
          <!-- </div> -->
        </el-col>
        <el-col :span="12">
        <el-form-item
              v-if="baseForm.renewalOrNot"
              label="续保年限"
              prop="renewalPeriod"
            >
              <el-select
                v-model="baseForm.renewalPeriod"
                :disabled="edit === 'detail' || postStatus !== 107"
                placeholder="请选择续保年限"
                clearable
              >
                <el-option
                  v-for="item in renewalPeriodList"
                  :key="item.lable"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item
              v-if="baseForm.renewalOrNot"
              label="续保年龄"
              prop="renewalAge"
            >
              <el-select
                v-model="baseForm.renewalAge"
                :disabled="edit === 'detail' || postStatus !== 107"
                placeholder="请选择续保年龄"
                clearable
              >
                <el-option
                  v-for="item in renewalAgeList"
                  :key="item.lable"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="等待期(天)" prop="waitTime">
            <el-input-number
              v-model="baseForm.waitTime"
              style="text-align:left;"
              controls-position="right"
              :disabled="edit === 'detail' || postStatus !== 107"
              :min="0"
              :step="1"
              step-strictly
              placeholder="请输入等待期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保障范围" prop="coverage">
            <el-input
              v-model.trim="baseForm.coverage"
              :disabled="edit === 'detail' || postStatus !== 107"
              maxlength="20"
              placeholder="请输入保障范围"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
                    <el-form-item label="承保职业" prop="jobId">
                        <el-select v-model="baseForm.jobId" :disabled="(edit === 'detail' || postStatus !== 107)" placeholder="请选择承保职业">
                            <el-option
                                v-for="item in insuranceJobTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="String(item.id)"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投保年龄" prop="suitAge">
                        <el-input v-model="baseForm.suitAge" maxlength="10" :disabled="(edit === 'detail' || postStatus !== 107)" placeholder="请输入投保年龄"></el-input>
                    </el-form-item>
                </el-col> -->
      </el-row>
    </el-form>
    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        v-if="postStatus === 107"
        type="primary"
        :loading="loading"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="next('baseForm')"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'BaseForm',
  components: {
    Footer
  },
  props: {
    baseForm: {
      type: Object,
      default: () => ({
        name: '',
        type: [],
        companyId: '',
        suitPeople: '',
        suitAge: '',
        insuranceTime: 4430,
        jobId: '',
        underwritingQuota: 66,
        packageIds: [],
        packages: [],
        postStatus: 107,
        signedAreaId: '',
        waitTime: 0,
        insuranceTimeUnit: 1,
        renewalOrNot: false,
        renewalAge: '',
        renewalPeriod: ''
      })
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    step: {
      type: Number,
      default: 1
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    // var checkAge = (rule, value, callback) => {
    //     if (!/^[1-9][0-9]{0,1}$/.test(value)) {
    //         return callback(new Error('投保年龄0-99'))
    //     }
    //     callback()
    // }
    const renewal = (rule, value, callback) => {
      if (!this.baseForm.renewalPeriod && !this.baseForm.renewalAge) {
        callback(new Error('保证续保年限、年龄，不能全部为空'));
      } else {
        callback();
      }
    };
    return {
      insuranceTypes: [],
      saleChannels: [],
      insuranceJobTypes: [],
      underwritingQuotas: [],
      insuranceTimes: [],
      insuranceCompanyList: [],
      rules: {
        id: [
          {
            required: true,
            message: '请输入保险产品Id',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入保险产品名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择产品类型',
            trigger: 'change'
          }
        ],
        companyId: [
          {
            required: true,
            message: '请选择所属企业',
            trigger: 'change'
          }
        ],
        suitPeople: [
          {
            required: true,
            message: '请输入适用人群',
            trigger: 'blur'
          }
        ],
        suitAge: [
          {
            required: true,
            message: '请输入投保年龄',
            trigger: 'blur'
          }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        insuranceTime: [
          {
            required: true,
            message: '请选择保障期限',
            trigger: 'change'
          }
        ],
        suitJobId: [
          {
            required: true,
            message: '请选择适用职业',
            trigger: 'change'
          }
        ],
        underwritingQuota: [
          {
            required: true,
            message: '请选择承保额度',
            trigger: 'change'
          }
        ],
        jobId: [
          {
            required: true,
            message: '请选择承保职业',
            trigger: 'change'
          }
        ],
        saleChannel: [
          {
            required: true,
            message: '请选择销售渠道',
            trigger: 'change'
          }
        ],
        postStatus: [
          {
            required: true,
            message: '请选择发布状态',
            trigger: 'change'
          }
        ],
        coverage: [
          {
            required: true,
            message: '请输入保障范围',
            trigger: 'blur'
          }
        ],
        signedAreaId: [
          {
            required: true,
            message: '请选择签约城市',
            trigger: 'change'
          }
        ],
        waitTime: [
          {
            required: true,
            message: '请输入等待期',
            trigger: 'change'
          }
        ],
        renewalOrNot: [
          {
            required: true,
            message: '请选择是否保证续保',
            trigger: 'blur'
          }
        ],
        renewalAge: [
          {
            validator: renewal,
            trigger: 'blur'
          }
        ],
        renewalPeriod: [
          {
            validator: renewal,
            trigger: 'blur'
          }
        ]
      },
      postStatusList: [],

      optionProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      signedAreaList: [],
      loading: false,
      renewalAgeList: [],
      renewalPeriodList: []
    };
  },
  created() {
    // 保证续保年限
    for (let i = 1; i <= 20; i++) {
      this.renewalPeriodList.push({ lable: `${i}年`, value: i });
    }
    // 保证续保年龄
    for (let i = 1; i <= 110; i++) {
      this.renewalAgeList.push({ lable: `${i}岁`, value: i });
    }
    // 保险类别
    this.$store
      .dispatch('insuranceProducts/getInsuranceTypes', {})
      .then(res => {
        this.insuranceTypes = res.obj || [];
      });
    // 保障期限
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'insuranceTime'
      })
      .then(res => {
        this.insuranceTimes = res.obj || [];
      });
    // 承保额度
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'underwritingQuota'
      })
      .then(res => {
        this.underwritingQuotas = res.obj || [];
      });
    // 销售渠道
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'saleChannel'
      })
      .then(res => {
        this.saleChannels = res.obj || [];
      });
    // 获取职业
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'insuranceJobType'
      })
      .then(res => {
        this.insuranceJobTypes = res.obj || [];
      });
    // 发布状态
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        this.postStatusList = res.obj || [];
      });
    // 保险产品签约地区
    this.$store.dispatch('insuranceProducts/getSignedArea').then(res => {
      this.signedAreaList = res.obj || [];
    });
    this.getInsuranceCompanyList();
  },
  mounted() {},
  methods: {
    ...mapActions('insuranceProducts', ['createOrUpdateBaseMsg']),
    // 获取保险公司列表
    getInsuranceCompanyList() {
      const vm = this;
      vm.$store
        .dispatch('insuranceCompany/getInsuranceCompanyList', {
          pageNum: 1,
          companyStatus: 1,
          pageSize: 1000
        })
        .then(res => {
          vm.insuranceCompanyList = res.records;
        });
    },
    // 下一步
    next(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          this.checkName(vm.baseForm.name);
        }
      });
    },
    // 更新基础信息
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('insuranceProducts/checkName', {
              name: vm.baseForm.name,
              id: this.id || null
            })
            .then(res => {
              if (!res.obj) {
                this.loading = true;
                this.createOrUpdateBaseMsg({
                  ...this.baseForm,
                  insuranceProductId: this.id
                })
                  .then(() => {
                    this.loading = false;
                    this.$message.success('更新基础信息成功');
                  })
                  .catch(() => {
                    this.loading = false;
                  });
              } else {
                this.$message.warning('保险产品名称重复');
              }
            });
        }
      });
    },
    // 校验保险产品名称是否重复
    checkName(name) {
      this.$store
        .dispatch('insuranceProducts/checkName', {
          name,
          id: this.id || null
        })
        .then(res => {
          if (!res.obj) {
            let params = {};
            this.step > 0
              ? (params = {
                  ...this.baseForm,
                  insuranceProductId: this.id
                })
              : (params = {
                  ...this.baseForm,
                  step: 1
                });
            this.loading = true;
            this.createOrUpdateBaseMsg(params)
              .then(res => {
                this.loading = false;
                if (this.step > 0) {
                  this.$emit('next', {
                    activeIndex: 1,
                    data: {
                      ...this.baseForm,
                      stepState: false,
                      id: res.data
                    }
                  });
                } else {
                  this.$emit('next', {
                    activeIndex: 1,
                    data: {
                      ...this.baseForm,
                      stepState: true,
                      id: res.data
                    }
                  });
                }
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            this.$message.warning('保险产品名称重复');
          }
        });
    },
    // 查看保险产品
    lookProduct(insuranceId) {
      this.$store
        .dispatch('insuranceProducts/getInsuranceLink', {
          insuranceId
        })
        .then(res => {
          if (!res.code) {
            window.open(res.obj, '_blank');
          }
        });
    },
    // 判断保证续保字段是否禁用
    renewalDisable() {
      if (this.baseForm.insuranceTimeUnit === 1) {
        if (this.baseForm.insuranceTime === 4400) {
          this.baseForm.renewalOrNot = false;
          return true;
        } else {
          return false;
        }
      } else {
        if (this.baseForm.insuranceTime < 4410) {
          this.baseForm.renewalOrNot = false;
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.base-form {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
  .look-box {
    display: flex;
    align-items: center;
  }
  .flex1 {
    flex: 1;
  }
}
</style>
