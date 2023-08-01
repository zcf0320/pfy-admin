<template>
  <div class="group-policy-create-page page-form modal-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="details-content">
          <div class="data-list">
            <div class="title-top">基础信息</div>
            <div class="data-item">
              <el-form
                ref="baseForm"
                :model="baseForm"
                :rules="rules"
                label-width="100px"
                label-position="top"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="保单号" prop="policyNo">
                      <el-input
                        v-model="baseForm.policyNo"
                        placeholder="请输入保单号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保险产品" prop="insuranceProductID">
                      <el-select
                        v-model="baseForm.insuranceProductID"
                        filterable
                        remote
                        :remote-method="getInsuranceProductList"
                        placeholder="请输入保险产品"
                        clearable
                        @change="getPlanList"
                      >
                        <el-option
                          v-for="item in insuranceProducts"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保障计划" prop="insurancePlanCode">
                      <el-select
                        v-model="baseForm.insurancePlanCode"
                        filterable
                        placeholder="请选择保障计划"
                      >
                        <el-option
                          v-for="item in planList"
                          :key="item.planCode"
                          :label="item.name"
                          :value="item.planCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="投保人企业名称" prop="companyName">
                      <el-input
                        v-model="baseForm.companyName"
                        placeholder="请输入投保人企业名称"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="统一信用代码" prop="unifiedCreditCode">
                      <el-input
                        v-model="baseForm.unifiedCreditCode"
                        placeholder="请输入统一信用代码"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人">
                      <el-input
                        v-model="baseForm.contactPerson"
                        placeholder="请输入联系人"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话">
                      <el-input
                        v-model="baseForm.contactMobile"
                        placeholder="请输入联系电话"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保单生效日期" prop="effectiveDate">
                      <el-date-picker
                        v-model="baseForm.effectiveDate"
                        type="date"
                        placeholder="选择保单生效日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保单终止日期" prop="expiryDate">
                      <el-date-picker
                        v-model="baseForm.expiryDate"
                        type="date"
                        placeholder="选择保单终止日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="data-list">
            <el-row :gutter="20">
              <el-col>
                   <div class="title-top content-detail">被保人名单</div>
            <div class="data-item">
              <div class="name-list-button">
                <el-upload
                  action=""
                  :http-request="uploadFile"
                  accept=".xlsx"
                  :multiple="false"
                  :show-file-list="false"
                >
                  <el-button
                type="primary"
                :disabled="loading"
                >上传名单</el-button>
                </el-upload>
                <a
                  href="/static/团险名单模板.xlsx"
                  class="download-btn"
                  target="_blank"
                  download=""
                  >下载模板</a>
              </div>
              <div class="name-list-table">
                <el-table :data="groupPolicyList">
                  <el-table-column label="序号">
                    <template slot-scope="scope">
                      <span>{{ scope.row.orderNum || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="身份证号码">
                    <template slot-scope="scope">
                      <span>{{ scope.row.idCard || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">
                      <span>{{ groupPolicyStatus[scope.row.dataState] }}</span>
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
              </div>
            </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="page-footer">
          <el-button
            type="primary"
            :disabled="submitStatus"
            @click.native.prevent="save('baseForm')"
            >保存</el-button>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { groupPolicyStatus } from '@/utils/enum';
import { mapActions } from 'vuex';
export default {
  name: 'GroupPolicyCreate',
  data() {
    return {
      loading: false,
      baseForm: {
        policyNo: '',
        insuranceProductID: '',
        companyName: '',
        unifiedCreditCode: '',
        contactPerson: '',
        contactMobile: '',
        effectiveDate: '',
        expiryDate: '',
        insurancePlanCode: '',
        orderNumber: ''
      },
      rules: {
        policyNo: [
          { required: true, message: '请输入保单号', trigger: 'blur' }
        ],
        insuranceProductID: [
          { required: true, message: '请输入保险产品', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入投保人企业名称', trigger: 'blur' }
        ],
        unifiedCreditCode: [
          { required: true, message: '请输入统一信用代码', trigger: 'blur' }
        ],
        effectiveDate: [
          { required: true, message: '请选择保单生效日期', trigger: 'change' }
        ],
        expiryDate: [
          { required: true, message: '请选择保单终止日期', trigger: 'change' }
        ],
        insurancePlanCode: [
          { required: true, message: '请选择保障计划', trigger: 'change' }
        ]
      },
      groupPolicyList: [],
      groupPolicyStatus,
      insuranceProducts: [],
      submitStatus: false,
      planList: []
    };
  },
  computed: {},
  created() {},
  methods: {
    ...mapActions('insuranceProducts', ['getInsuranceProductByName', 'uploadGroupPolicy']),
    // 获取保险产品列表
    getInsuranceProductList(name) {
      if (!name) {
        return;
      }
      this.getInsuranceProductByName({
        name
      }).then(res => {
        this.insuranceProducts = res.data || [];
      });
    },
    // 保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$store
            .dispatch('groupPolicy/createPolicy', {
              ...vm.baseForm,
              insuranceProductID: vm.baseForm.orderNumber,
              effectiveDate: new Date(vm.baseForm.effectiveDate).getTime(),
              expiryDate: new Date(vm.baseForm.expiryDate).getTime(),
              dtos: vm.groupPolicyList
            })
            .then(res => {
              if (!res.code) {
                vm.$message.success(res.comment);
                vm.$router.push('/policyManage/groupPolicy');
              } else {
                vm.$message.warning(res.comment);
              }
            });
        }
      });
    },
    // 上传文件
    uploadFile(item) {
      const vm = this;
      const fileObj = item.file;
      // FormData 对象
      const fd = new FormData();
      // 文件对象
      fd.append('file', fileObj);

      vm.loading = true;

      this.uploadGroupPolicy(
       fd
       )
        .then(res => {
          let submitStatus = false;
          if (res.status) {
            vm.groupPolicyList = res.records;
            vm.loading = false;
            vm.groupPolicyList.forEach(item => {
              if (item.dataState) {
                submitStatus = true;
              }
            });
          }
          this.submitStatus = submitStatus;
        })
        .catch(error => {
          vm.loading = false;
          this.$message({
            message: error,
            type: 'error',
            duration: 2 * 1000
          });
        });
    },
    getPlanList(insuranceProductId) {
      if (!insuranceProductId) {
        return;
      }
      this.$store
        .dispatch('groupPolicy/getPlanList', {
          insuranceProductId
        })
        .then(res => {
          if (res.status) {
            this.planList = res.data || [];
            this.insuranceProducts.forEach(item => {
              if (item.id === insuranceProductId) {
                this.baseForm.orderNumber = item.orderNumber;
              }
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.group-policy-create-page {
  .details-content {
    padding-bottom: 60px;
    .data-list {
      padding: 9px 0px 0;
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-item {
        margin-top: 10px;
        .name-list-button {
          display: flex;
          align-items: center;
          .download-btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;
            color: #606266;
            border: 1px solid #dcdfe6;
            margin-left: 20px;
            &:hover {
              border-color: #409eff;
              color: #409eff;
            }
          }
        }
        .name-list-table {
          margin-top: 20px;
        }
      }
    }
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
}
</style>
