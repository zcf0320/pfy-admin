<template>
  <div class="ins-durg-detail">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            医保目录
            <button type="button" class="btn-save fr" @click="isVisible = true">
              导入
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">药品类型</span>
                  <el-select
                    v-model="filter.medicineType"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">药品通用名</span>
                  <el-input
                    v-model="filter.medicineName"
                    placeholder="请输入药品名"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">医保分类</span>
                  <el-select
                    v-model="filter.classification"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in cataList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  class="mr-30"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          class="table-nolarge"
        >
          <el-table-column label="编号">
            <template slot-scope="scope">
              {{ scope.row.id || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="药品类型/医保类型">
            <template slot-scope="scope">
              <div class="top">
                {{ scope.row.medicineType || '-' }}
              </div>
              <div class="bottom">
                医保类型：{{ scope.row.insuranceMedicineClassification || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="药品通用名/剂型">
            <template slot-scope="scope">
              <div class="top">
                {{ scope.row.medicineName || '-' }}
              </div>
              <div class="bottom">
                {{ scope.row.dosage || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="规格/医保支付标准价格">
            <template slot-scope="scope">
              <div class="top">
                {{ scope.row.specifications || '-' }}
              </div>
              <div class="bottom">
                {{ scope.row.price || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="批准文号/厂家">
            <template slot-scope="scope">
              <div class="top">
                {{ scope.row.approvalNumber || '-' }}
              </div>
              <div class="bottom">
                {{ scope.row.produceCompany || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template slot-scope="scope">
              <el-tooltip placement="bottom" effect="light">
                <div slot="content" style="padding: 12px; max-width: 500px">
                  <div
                    style="
                      color: #464668;
                      font-size: 18px;
                      font-weight: blod;
                      margin-bottom: 24px;
                    "
                  >
                    {{ scope.row.medicineName || '-' }}:
                  </div>
                  <div
                    style="font-size: 16px; color: #464668; line-height: 24px"
                  >
                    {{ scope.row.remark || '-' }}
                  </div>
                </div>
                <div class="icon-drug"/>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img"/>
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getList"
        />
      </el-scrollbar>
    </el-container>
    <el-dialog
      title="导入"
      :visible="isVisible"
      width="743px"
      @close="closeDialog"
    >
      <div style="margin-bottom: 40px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="选择文件" prop="roleName">
            <div class="formInput">
              <el-input
                v-model="form.roleName"
                placeholder="最长15字（含15个中/英文、数字），不可有特殊符号（如：空格、标点符号）"
                class="search-input"
                style="width: 580px"
                :disabled="true"
              />
              <el-upload
                class="upload-demo"
                action="/"
                :on-change="beforeAvatarUpload"
                :file-list="fileList"
                :multiple="false"
                :show-file-list="false"
                :auto-upload="false"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  style="
                    margin-left: 30px;
                    border: 1px solid #3599fe;
                    color: #3599fe;
                  "
                  @click="isShow = false"
                  >选择文件</el-button>
              </el-upload>
            </div>
            <div class="text">支持不超过10M的Excel文件。</div>
            <div class="text mt">
              请按照模板格式要求，批量上传医保药品数据！
              <a
                href="/static/医保目录导入模版.xlsx"
                class="download-btn"
                target="_blank"
                download=""
                >下载模板</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          style="margin-right: 20px; border: 1px solid #3599fe; color: #3599fe"
          @click="isVisible = false"
          >取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          size="small"
          @click="submit('form')"
          >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadMedicine } from '@/api/dataDictionary';
export default {
  name: 'insuranceDurgDetail',
  data() {
    return {
      filter: {
        medicineName: '',
        medicineType: '',
        classification: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      tableData: [],
      cataList: [{ label: '甲', value: '甲' }, { label: '乙', value: '乙' }],
      typeList: [
        { label: '西药', value: '西药' },
        { label: '中成药', value: '中成药' }
      ],
      form: {
        roleName: ''
      },
      rules: {
        roleName: [{ required: true, message: '请上传文件', trigger: 'change' }]
      },
      loading: false,
      isVisible: false,
      fileList: [],
      upLoading: false,
      file: null
    };
  },
  created() {
    if (this.$route.query.medicineName) {
      this.filter.medicineName = this.$route.query.medicineName;
    }
    this.getList({ page: 1 });
  },
  methods: {
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        area: this.$route.query.area,
        year: this.$route.query.year,
        classification: this.filter.classification,
        medicineName: this.filter.medicineName,
        medicineType: this.filter.medicineType,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.$store.dispatch('drugList/getMedicineList', params).then(res => {
        this.tableLoading = false;
        this.tableData = res.data.list;
        this.pagingOptions.total = res.data.total;
      });
    },
    clearFilter() {
      this.filter = {
        medicineName: '',
        medicineType: '',
        classification: ''
      };
      this.getList({});
    },
    // 上传文件
    uploadFile(item) {
      const fileObj = item.raw;
      // FormData 对象
      const fd = new FormData();
      // 文件对象
      fd.append('file', fileObj);
      fd.append('year', this.$route.query.year);
      fd.append('area', this.$route.query.area);
      this.loading = true;

      uploadMedicine(
       fd
        )
        .then(response => {
          this.loading = false;
          const { successNum, errorNum } = response.data;

          this.$message.success(`成功上传${successNum}条，失败${errorNum}条`);
          this.resetForm('form');
          this.isVisible = false;
          this.file = null;
          this.getList({ page: 1 });
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000
          });
        });
    },
    // 限制文件上传
    beforeAvatarUpload(file) {
      const extension2 = file.name.split('.')[1] === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!extension2) {
        this.$message.error('导入文件只能是 xlsx 格式!');
      }
      if (!isLt2M) {
        this.$message.error('导入文件大小不能超过 20MB!');
      }
      if (extension2 && isLt2M) {
        this.file = file;
        this.form.roleName = file.name;
      } else {
        this.file = null;
        this.form.roleName = '';
      }
      return extension2 && isLt2M;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadFile(this.file);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog() {
      this.resetForm('form');
      this.isVisible = false;
    }
  }
};
</script>

<style lang="scss" scope>
.ins-durg-detail {
  .top {
    margin-top: 22px;
  }
  .bottom {
    color: #989ab3;
    margin: 5px 0 22px;
  }
  .el-dialog__header {
    height: 80px;
    padding: 30px;
    .el-dialog__title {
      font-size: 16px;
      font-weight: bold;
      color: #464668;
    }
    .el-dialog__headerbtn {
      top: 32px;
      right: 30px;
      .el-dialog__close {
        color: #464668;
        font-size: 20px;
      }
    }
  }
  .el-form-item--medium .el-form-item__content {
    margin-top: -8px;
  }
  .el-dialog__body {
    margin-bottom: 18px;
    box-shadow: 0px 2px 10px 0px rgba(56, 56, 56, 0.06);
  }
  .el-dialog__footer {
    border-radius: 0px 0px 4px 4px;
  }
  .text {
    color: #989ab3;
  }
  .mt {
    margin-top: -10px;
    a {
      color: #3599fe;
      margin-left: 20px;
      cursor: pointer;
      user-select: none;
    }
  }
  .formInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
