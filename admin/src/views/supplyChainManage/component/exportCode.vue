<template>
  <div class="export-code-container modal-form">
    <el-dialog
      v-loading="loading"
      title="券码导入"
      :visible="isShow"
      width="1000px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <div v-if="codeList.length === 0" class="upload-download">
        <el-upload
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
            href="/static/供应商券码模板.xlsx"
            class="download-btn"
            target="_blank"
            download=""
            >下载模板</a
          >
        </el-upload>
      </div>
      <div v-else class="table">
        <div class="tips">
          格式正确 <span class="success">{{ successTotal }}</span> 条，错误
          <span class="error">{{ failTotal }}</span> 条
        </div>
        <el-table :data="codeList">
          <el-table-column label="券号">
            <template slot-scope="scope">
              <span>{{ scope.row.thirdPartCode || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期至">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.validTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据状态">
            <template slot-scope="scope">
              <span :class="{ 'data-error': scope.row.state !== 5 }">{{
                codeStatus[scope.row.state]
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="re-upload">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            accept=".xlsx"
            :file-list="fileList"
            :multiple="false"
            :show-file-list="false"
          >
            <el-button slot="trigger" type="primary">重新提交</el-button>
          </el-upload>
        </div>
        <!-- <Pagination
                    v-show="pagingOptions.total > 0"
                    :limit="pagingOptions.pageSize"
                    :page="pagingOptions.pageNo":total="pagingOptions.total"
                    @pagination="getPolicyList"
                    layout="total, prev, pager, next"
                /> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :disabled="saveStatus" @click="save"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadCode } from '@/api/supplier';
import { codeStatus } from '@/utils/enum';
export default {
  name: 'ExportCodeModal',

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      accpetLimit: '.xlsx',
      fileList: [],
      submitInfo: {
        address: '',
        servicePackageId: ''
      },
      rules: {
        servicePackageId: [
          {
            required: true,
            message: '请选择选择城市',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ]
      },
      codeList: [],
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      codeStatus,
      saveStatus: false
    };
  },
  computed: {},
  created() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 提交
    save() {
      const vm = this;
      vm.$store
        .dispatch('serviceItems/codeSave', {
          serviceInfoId: vm.id,
          codes: vm.codeList
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
      fd.append('serviceInfoId', vm.id);

      vm.loading = true;

      uploadCode(fd)
        .then(response => {
          const { codes, failTotal, successTotal } = response.data;
          vm.loading = false;
          // 数据存在异常禁用确定按钮
          failTotal ? (vm.saveStatus = true) : (vm.saveStatus = false);
          if (!response.data.status) {
            this.$message({
              message: response.data.message,
              type: 'error',
              duration: 3 * 1000
            });
            return;
          }
          vm.codeList = codes || [];
          vm.failTotal = failTotal;
          vm.successTotal = successTotal;
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
.export-code-container {
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
  .upload-download {
    .upload-demo {
      display: flex;
    }
  }
  .table {
    .tips {
      margin: 10px 0 20px;
      font-size: 14px;
      .success {
        color: #409eff;
        font-size: 16px;
      }
      .error {
        color: red;
        font-size: 16px;
      }
    }
  }
  .re-upload {
    margin-top: 24px;
  }
  .data-error {
    color: red;
  }
}
</style>
