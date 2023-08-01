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
            <div class="title-top">新增销售结算</div>
            <el-form
              ref="baseForm"
              :model="baseForm"
              :rules="rules"
              label-width="100px"
              label-position="top"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="供应商" prop="providerCompanyId">
                    <el-select
                      v-model="baseForm.providerCompanyId"
                      class="search-input"
                      placeholder="全部"
                      filterable
                    >
                      <el-option
                        v-for="item in supplierList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="账期" prop="accountPeriod">
                    <el-select
                      v-model="baseForm.accountPeriod"
                      class="search-input"
                      placeholder="全部"
                    >
                      <el-option
                        v-for="item in dateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="结算金额" prop="settlementPrice">
                    <el-input
                      v-model="baseForm.settlementPrice"
                      maxlength="20"
                      placeholder="请输入结算金额"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结算内容" prop="settlementContent">
                    <el-select
                      v-model="baseForm.settlementContent"
                      class="search-input"
                      placeholder="全部"
                    >
                      <el-option
                        v-for="item in contentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input
                      v-model="baseForm.remark"
                      type="textarea"
                       maxlength="40"
                      show-word-limit
                      placeholder="请输入备注"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- </div> -->
          </div>
        </div>
        <div class="page-footer">
          <el-button
type="primary"
@click.native.prevent="save('baseForm')"
>发布</el-button>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import {
  getSettlementContentList,
  getAccountPeriodList,
  saveSettlement
} from '@/api/drugManage';

export default {
  name: 'SupplierSalesSettlementCreate',
  data() {
    const validateNumber = (rule, value, callback) => {
      const regula = /^[0-9]+(\.[0-9]{2})?$/g;
      if (!regula.test(value)) {
        this.baseForm.settlementPrice = '';
        callback(new Error('请输入正确的两位小数金额'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      baseForm: {
        providerCompanyId: '',
        accountPeriod: '',
        settlementContent: '',
        remark: '',
        settlementPrice: ''
      },
      rules: {
        providerCompanyId: [
          { required: true, message: '请输入保单号', trigger: 'change' }
        ],
        accountPeriod: [
          { required: true, message: '请选择账期', trigger: 'change' }
        ],
        settlementContent: [
          { required: true, message: '请选择结算内容', trigger: 'change' }
        ],
        settlementPrice: [
          { required: true, message: '请输入结算金额', trigger: 'blur' },
          {
            validator: validateNumber,
            trigger: 'blur'
          }
        ]
      },
      dateList: [],
      supplierList: [],
      contentList: []
    };
  },
  created() {
    this.getSupplierList();
    this.getSettlementContent();
    this.getAccountPeriod();
  },
  methods: {
    ...mapActions('drugManage', ['getSuppliersList']),
    getSupplierList() {
      this.getSuppliersList().then(res => {
        this.supplierList = res.obj;
      });
    },
    getSettlementContent() {
      getSettlementContentList().then(res => {
        this.contentList = res.data;
      });
    },
    getAccountPeriod() {
      getAccountPeriodList().then(res => {
        this.dateList = res.data;
      });
    },
    // 保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          saveSettlement(this.baseForm).then(res => {
            vm.$message.success(res.message);
            vm.$router.go(-1);
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
