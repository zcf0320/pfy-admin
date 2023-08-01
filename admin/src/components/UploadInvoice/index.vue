<template>
  <div>
    <div class="flex-between mb-24">
      <div class="total">共计{{ total }}张</div>
      <div class="flex">
        <el-upload v-if="showUpload"
          ref="invoiceUpload"
          action=""
          multiple
          :limit="20"
          :on-exceed="handleExceed"
          :show-file-list="false"
          :http-request="uploadInvoice"
        >
          <!-- <el-button size="small" type="primary">
                  选择文件
                </el-button> -->
          <el-button type="button" class="btn-upload-invoice"
            ><i class="icon-upload"></i>
            上传发票
          </el-button>
        </el-upload>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      stripe
      :data="invoiceList"
      class="table-nolarge"
    >
      <el-table-column label="序号" type="index" width="80"> </el-table-column>
      <el-table-column label="发票图片">
        <template slot-scope="scope">
          <div class="message">
            <div class="skip-link" @click="previewImg(scope.row)">
              {{ scope.row.fileName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="creatorName"> </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <div class="message">
            {{
              $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') || '-'
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-popconfirm
            title="删除后将不可恢复，是否删除？"
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="plain"
            cancel-button-type="primary"
            :hide-icon="true"
            @onConfirm="deleteImg(scope.row.id)"
          >
            <HoverTip
              slot="reference"
              content="删除"
              tip-class-name="icon-delete"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img" />
    </el-table>
    <Pagination
      :total="pagingOptions.total"
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      layout="total, prev, pager, next"
      @pagination="getList"
    />
    <elImageViewer
      v-if="showViewer"
      :on-close="viewerClose"
      :url-list="images"
    />
    <Dialog
      title="上传错误"
      :visible.sync="dialogVisible"
      :height="400"
      :width="500"
      @closed="
        val => {
          dialogVisible = false;
        }
      "
    >
      <div class="scroll-table" v-for="(item, i) in error" :key="i">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </Dialog>
  </div>
</template>
<script>
import {
  getSettlementInvoiceList,
  deleteSettlementInvoice,
  uploadSettlementInvoice
} from '@/api/insuranceCompany';
export default {
  name: 'UploadInvoice',
  props: {
    showUpload: {
        type: Boolean,
        default: true
    },
    settlementId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableLoading: false,
      total: 0,
      invoiceList: [],
      pagingOptions: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      showViewer: false,
      images: [],
      dialogVisible: false,
      error: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(pageInfo) {
      this.tableLoading = true;
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        settlementId: this.settlementId,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      getSettlementInvoiceList(params)
        .then(res => {
          this.invoiceList = res.data.records;
          this.total = res.data.total;
          this.pagingOptions.total = res.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleExceed(files) {
      this.$message.warning(
        `当前限制每次仅选择20个文件，本次选择了 ${files.length} 个文件`,
      );
    },

    previewImg(item) {
        if (item.fileType.toLowerCase() !== 'pdf') {
 this.images = [item.fileUrl];
      this.showViewer = true;
        } else {
            window.open(item.fileUrl, '_blank');
        }
    },
    deleteImg(id) {
      deleteSettlementInvoice(id).then(res => {
        this.$message.success(res.message);
        this.getList({ page: 1 });
      });
    },
    viewerClose() {
      this.showViewer = false;
      this.images = [];
    },

    uploadInvoice(item) {
      //   const fileList = this.$refs.invoiceUpload.uploadFiles;
      //   if (!fileList.length) {
      //     this.$message.warning('请先选择文件！');
      //     return;
      //   }
      // FormData 对象
      const fd = new FormData();
      //   fileList.forEach(item => {
      // 文件对象
      fd.append('files', item.file);
      //   });

      fd.append('settlementId', this.settlementId);
      uploadSettlementInvoice(fd).then(() => {
        this.getList({ page: 1 });
      });
      //         .catch((res) => {
      //             if (res.statusCode === 70001) {
      // this.error = res.data;
      // this.dialogVisible = true;
      //             }
      //         });
    }
  }
};
</script>

<style lang="scss" scoped>
.total {
  font-size: 14px;
  font-weight: 400;
  color: #989ab3;
}
.skip-link {
  font-size: 14px;
  font-weight: 400;
  color: #3599fe;
  cursor: pointer;
}
.btn-upload-invoice {
  height: 32px;
  display: flex;
  align-items: center;
  background: #e1f0fe;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #3599fe;
}
.icon-upload {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url('../../assets/icon-upload.png') no-repeat;
  background-size: 100% 100%;
}
</style>
