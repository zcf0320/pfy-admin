<template>
  <Dialog
    v-loading="loading"
    title="保单导入"
    :visible.sync="dialogVisible"
    :close-on-click-modal="closeClickModal"
    :width="1400"
    :height="800"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div class="flex-between mb-24">
      <div />
      <div>
        <el-upload
          v-if="policyList.length === 0"
          class="upload-demo"
          action=""
          :http-request="uploadFile"
          accept=".xlsx"
          :file-list="fileList"
          :multiple="false"
          :show-file-list="false"
        >
          <el-button slot="trigger" type="primary">选取文件</el-button>
          <a
            href="/static/个险保单模板.xlsx"
            class="download-btn mr-24"
            target="_blank"
            download=""
            >下载模板</a
          >
        </el-upload>
        <el-upload
          v-else
          class="upload-demo"
          action=""
          :http-request="uploadFile"
          accept=".xlsx"
          :file-list="fileList"
          :multiple="false"
          :show-file-list="false"
        >
          <el-button slot="trigger" type="primary" class="mr-24"
            >重新提交</el-button
          >
        </el-upload>
      </div>
    </div>

    <div class="table">
      <el-table :data="policyList" class="table-large">
        <el-table-column label="保单号" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.policyNo || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保险产品" width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.insuranceProductID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保障计划编号" width="140" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.insurancePlanCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="投保人姓名" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name || '-' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
                    label="投保人手机号"
                    width="140"
                >
                    <template slot-scope="{row}">
                        <span>{{ row.mobile || '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="被保人身份证"
                    width="180"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.insuredIdcard || '-'}}</span>
                    </template>
                </el-table-column> -->
        <el-table-column label="被保人姓名" width="120" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.insuredName || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="被保人手机号" width="140" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.insuredMobile || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保单生效日期" width="140" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span v-if="row.effectiveDate > 0">{{
              row.effectiveDate | timeFormat('yyyy-MM-dd')
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="保单终止日期" width="140" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span v-if="row.expiryDate > 0">{{
              row.expiryDate | timeFormat('yyyy-MM-dd')
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="撤单状态" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.state || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保费" width="110" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.premium || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="承保机构" width="110" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.saleComCode || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数据状态" min-width="200" fixed="right">
          <template slot-scope="{ row }">
            <div
              v-for="(item, index) in row.errMsgs"
              :key="index"
              class="data-error"
            >
              {{ index + 1 }}、 {{ item }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="saveStatus || !policyList.length"
        @click="save"
        >确 定</el-button
      >
    </div>
  </Dialog>
</template>

<script>
import { uploadPolicy } from '@/api/personalPolicy';
export default {
  name: 'ExportPolicyModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      closeClickModal: false,
      dialogVisible: false,
      fileList: [],
      policyList: [],
      saveStatus: false
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        this.dialogVisible = val;
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.policyList = [];
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    // 提交
    save() {
      const vm = this;
      vm.$store
        .dispatch('personalPolicy/submitPolicy', {
          list: vm.policyList
        })
        .then(() => {
          vm.$emit('save');
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

      uploadPolicy(fd
       )
        .then(response => {
          const { records, status, message } = response;
          vm.loading = false;
          vm.saveStatus = false;
          if (!status) {
            this.$message({
              message: message,
              type: 'error',
              duration: 3 * 1000
            });
            return;
          }
          vm.policyList = records || [];
          // 数据存在异常禁用确定按钮
          for (let i = 0; i < vm.policyList.length; i++) {
            if (this.$isNotEmpty(vm.policyList[i].errMsgs)) {
              vm.saveStatus = true;
              break;
            }
          }
        })
        .catch(error => {
          vm.loading = false;
          this.$message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
.re-upload {
  margin-top: 24px;
}
.data-error {
  color: red;
}
</style>
