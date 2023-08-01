<template>
  <div class="settle-approval">
    <el-container>
      <el-main>
        <Tab
          :btns="btns"
          :current-key="activeName"
          :btn-style="{ overflow: 'visible' }"
          @change="handleClick"
        />
        <div v-if="activeName === '0'">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="vertical-ruleForm"
          >
            <el-form-item label="类型：" prop="financialApprovalEnum">
              <el-select
                v-model="ruleForm.financialApprovalEnum"
                placeholder="请选择类型"
                style="width: 411px"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="完成时间：">
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                style="width: 411px"
                @change="changeTime"
              />
            </el-form-item>
          </el-form>
          <div class="btn" @click="submitForm('ruleForm')">导出附件</div>
          <a ref="upload" :href="approvalDownload(params)" class="none" />
        </div>
        <div v-if="activeName === '1'">
          <Logs :id="id" :type="'21'" :has-o-a-log="true" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { approvalDownload } from '@/api/settle';
export default {
  name: 'settleApproval',
  data() {
    return {
      btns: [
        { value: '0', name: '导出规则' },
        { value: '1', name: '操作日志' }
      ],
      activeName: '0',
      id: '',
      ruleForm: {
        financialApprovalEnum: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        financialApprovalEnum: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      typeList: [
        { id: 'PROJECT_PAY', name: '项目付款申请' },
        { id: 'PROJECT_REIMBURSEMENT', name: '项目报销' },
        { id: 'DAILY_PAY', name: '日常付款申请' },
        { id: 'DAILY_REIMBURSEMENT', name: '日常报销' },
        { id: 'BILLING', name: '开票申请' },
        { id: 'RESERVE_FUND	', name: '备用金申请' }
      ],
      time: '',
      approvalDownload,
      params: {}
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab;
    },
    changeTime(val) {
      if (val) {
        this.ruleForm.startTime = val[0];
        this.ruleForm.endTime = val[1];
      } else {
        this.ruleForm.startTime = '';
        this.ruleForm.endTime = '';
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            ...this.ruleForm
          };
          for (const key in params) {
            if (params[key] === '') {
              delete params[key];
            }
          }
          //   this.params = params
          //   this.$refs.upload.click()

          window.open(
            'http://senro-tree-dev-local.huanyu.g-hcare.com/scm/financial/approval/download?financialApprovalEnum=PROJECT_PAY',
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.settle-approval {
  .btn {
    width: 109px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #3599fe;
    font-size: 16px;
    color: #3599fe;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    margin-top: 60px;
  }
}
</style>
