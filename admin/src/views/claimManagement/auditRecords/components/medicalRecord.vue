<template>
  <el-form ref="formData" :model="formData">
    <div class="medicalInvoice-box">
      <div class="flex-between mb-24">
        <div class="title-top mb-0 pt-0 pb-0 pl-0">病案首页</div>
      </div>

      <div class="box-list mb-24">
        <div class="flex-box item-box">
          <div class="labelName">病案号</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="medicalRecordId"
              :rules="[
                {
                  validator: $validators.checkInt,
                  message: '请输入合法的病案号',
                },
              ]"
            >
              <el-input
                v-model="formData.medicalRecordId"
                maxlength="20"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入病案号"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">姓名</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="name"
              :rules="[{ required: true, message: '请输入姓名' }]"
            >
              <el-input
                v-model="formData.name"
                maxlength="10"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入姓名"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">性别</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="gender"
              :rules="[{ required: true, message: '请选择性别' }]"
            >
              <el-select
                v-model="formData.gender"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择性别"
              >
                <el-option label="男" :value="1" />
                <el-option label="女" :value="0" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">证件号码</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-input
                v-model="formData.idNumber"
                maxlength="18"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入证件号码"
                @change="calcAge"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">年龄</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <InputNumber
                v-model="formData.age"
                disabled
                class="input-no-border"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">职业</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-cascader
                v-model="formData.professionList"
                :placeholder="
                  $isNotEmpty(formData.professionList)
                    ? formData.professionList[
                        formData.professionList.length - 1
                      ]
                    : '请选择职业'
                "
                :disabled="!isEdit"
                class="input-no-border w-full"
                :show-all-levels="false"
                :props="{
                  value: 'name',
                  label: 'name',
                  lazy: true,
                  lazyLoad: lazyLoad,
                }"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">婚姻</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-select
                v-model="formData.marriage"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择婚姻"
              >
                <el-option label="未婚" :value="0" />
                <el-option label="已婚" :value="1" />
                <el-option label="离异" :value="2" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">国籍</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-select
                v-model="formData.nationality"
                :disabled="!isEdit"
                filterable
                class="input-no-border w-full"
                placeholder="请选择国籍"
              >
                <el-option
                  v-for="item in nationalityList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">民族</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-select
                v-model="formData.nation"
                :disabled="!isEdit"
                filterable
                class="input-no-border w-full"
                placeholder="请选择民族"
              >
                <el-option
                  v-for="item in nationList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">入院科别</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-select
                v-model="formData.admission"
                :disabled="!isEdit"
                filterable
                class="input-no-border w-full"
                placeholder="请选择入院科别"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">出院科别</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <el-select
                v-model="formData.discharged"
                :disabled="!isEdit"
                filterable
                class="input-no-border w-full"
                placeholder="请选择出院科别"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">血型</div>
          <div class="flex-grow">
            <el-form-item class="mb-0  w-full">
              <!--  -->
              <el-select
                v-model="formData.bloodType"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择血型"
              >
                <el-option label="O" :value="0" />
                <el-option label="A" :value="1" />
                <el-option label="B" :value="2" />
                <el-option label="AB" :value="3" />
                <el-option label="未知" :value="4" />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
import { validateIdCardNo } from '@/utils/validate';
export default {
  name: 'medicalRecord',
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
      formData: {
        medicalRecordId: '',
        name: '',
        idNumber: '',
        age: '',
        professionList: [],
        marriage: '',
        nationality: '',
        nation: '',
        admission: '',
        discharged: '',
        bloodType: ''
      },
      rateJobs: [],
      nationalityList: [],
      nationList: [],
      departmentList: []
    };
  },
  computed: {},
  created() {
    this.initData();
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'insuranceJobType'
      })
      .then(res => {
        this.rateJobs = res.obj || [];
      });
    // 查找国籍
    this.findCountryList().then(res => {
      this.nationalityList = res.data || [];
    });
    // 查找名族
    this.findNationList().then(res => {
      this.nationList = res.data || [];
    });
    // 科室查询
    this.findSecondDepartment().then(res => {
      this.departmentList = res.data || [];
    });
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'findCountryList',
      'findNationList',
      'findSecondDepartment',
      'saveMedicalHomePage',
      'findJobList'
    ]),
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        // this.formData.claimCheckList = res.data.claimCheckList || []
        if (this.$isNotEmpty(res.data.medicalHomePageVO)) {
          this.formData = res.data.medicalHomePageVO;
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    // 计算年龄
    calcAge(val) {
      if (validateIdCardNo(val)) {
        const year = val.substring(6, 10);
        const currentYear = new Date().getFullYear();
        const age = Number(currentYear) - Number(year);
        this.formData.age = age;
      }
    },
    lazyLoad(node, resolve) {
      if (node.level > 2) {
        resolve();
        return;
      }
      const data = {};
      if (node.level === 0) {
        data.level = 1;
      } else {
        data.code = node.data.code;
        data.level = node.level + 1;
      }
      this.findJobList(data).then(res => {
        res.data.forEach(item => {
          item.leaf = node.level > 1;
        });

        resolve(res.data);
      });
    },
    // 保存数据
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.claimRecordId = this.id;
        this.saveMedicalHomePage(this.formData).then(() => {
          this.$message.success('保存成功');
          this.$emit('update:isEdit', false);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.medicalInvoice-box {
  .labelName {
    width: 120px;
    height: 38px;
    line-height: 38px;
    padding-left: 14px;
    color: #464668ff;
    background: #f3f6f9;
    font-size: 14px;
  }
  .box-list {
    .item-box {
      border: 1px solid #ebedf2;
      border-top: 0px;
      &:first-child {
        border-top: 1px solid #ebedf2;
      }
    }
  }
  //el-input 不显示border
  .input-no-border >>> .el-input__inner {
    background-color: #fff;
    border-radius: 0px;
    height: 38px;
    // border: 0px !important; //改成0，边框就消失了！
    width: 100%;
    border-color: transparent !important;
    &:focus {
      outline: none;
      border-color: #3599fe !important;
    }
  }
  //错误显示红色
  .el-form-item.is-error {
    //el-input 不显示border
    .input-no-border >>> .el-input__inner {
      background-color: #fff;
      border-radius: 0px;
      height: 38px;
      // border: 0px !important; //改成0，边框就消失了！
      width: 100%;
      border-color: #ff5e5e !important;
      &:focus {
        outline: none;
        border-color: #ff5e5e !important;
      }
    }
  }
}
</style>
