<template>
  <div class="contract-manag">
    <div class="title-top">
      合同列表
    </div>
    <div class="content">
      <div class="table">
        <el-table
          v-loading="tableLoading"
          :data="list"
          class="table-list table-large"
        >
          <el-table-column label="对应服务项" min-width="200">
            <template slot-scope="scope">
              <div class="service-text">
                <div
                  v-for="(item, i) in scope.row.serviceInfoList"
                  :key="i"
                  class="item"
                >
                  {{ item }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="签订日期">
            <template slot-scope="scope">
              <span>{{
                scope.row.signTime
                  ? $moment(scope.row.signTime).format('YYYY-MM-DD')
                  : '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生效时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.effectiveTime).format('YYYY-MM-DD')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="过期时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.expirationTime).format('YYYY-MM-DD')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件">
            <template slot-scope="scope">
              <span class="blue" >{{
                scope.row.pdfFileName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span :class="contractText[scope.row.status]">{{
                scope.row.status | fliterState
              }}</span>
              <span
                v-if="scope.row.remainingDay"
                style="color:#F6B64E !important"
                >{{ scope.row.remainingDay }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteItem(scope.row.id)"
              >
                <HoverTip
                  v-if="pageAuthority.includes('edit')"
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
      </div>
    </div>
  </div>
</template>

<script>
import { uniqWith, isEqual } from 'lodash';

import { contractText } from '@/utils/enum';
export default {
  name: 'contractManage',
  filters: {
    fliterState(type) {
      if (type === 0) {
        return '未生效';
      } else if (type === 1) {
        return '已生效';
      } else if (type === 2) {
        return '已过期';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      list: [],
      rules: {
        serviceInfoList: [
          {
            required: true,
            message: '请选择对应服务项',
            trigger: 'change'
          }
        ],
        time: [
          {
            required: true,
            message: '请选择有效期',
            trigger: 'change'
          }
        ],
        pdfFileList: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      form: {
        effectiveTime: '',
        expirationTime: '',
        pdfFileList: [],
        serviceInfoList: [],
        signTime: '',
        time: '',
        pdfFileName: '',
        id: ''
      },
      serviveList: [],
      fileList: [],
      upLoading: false,
      file: null,
      loading: false,
      images: [],
      contractText
    };
  },
  computed: {
    pageAuthority() {
      // 100101 供应商
      return this.$store.state.user.pageAuthority['100101'];
    }
  },
  created() {
    this.getList({ page: 1 });
    this.getServiceList();
  },
  methods: {
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        providerId: this.$route.params.id,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      this.tableLoading = true;
      this.$store.dispatch('supplier/findContract', params).then(res => {
        this.tableLoading = false;
        this.list = res.records || [];
        this.pagingOptions.total = res.totalNum | 0;
      });
    },
    getServiceList() {
      const params = { providerId: this.$route.params.id };
      this.$store.dispatch('supplier/findServiceInfoList', params).then(res => {
        this.serviveList = uniqWith(res.data, isEqual) || [];
      });
    },
    deleteItem(id) {
      const params = { id };
      this.$store.dispatch('supplier/contractDelete', params).then(() => {
        this.$message.success('删除成功');
        this.getList({ page: 1 });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.contract-manag {
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
  margin-top: 32px;
  .blue {
    color: #1e1e2f;

    user-select: none;

  }
  .el-form-item__label {
    position: absolute;
  }
  .pdf {
    background: url('../../assets/icon-pdf.png');
    background-size: 100% 100%;
    width: 50px;
    height: 52px;
    position: relative;
    .delete {
      background: url('../../assets/icon-delete.png');
      background-size: 100% 100%;
      width: 14px;
      height: 14px;
      position: absolute;
      right: 0;
      top: -7px;
    }
  }
  .name {
    color: #464668;
  }
  .info {
    text-align: center;
    color: #a2a3b7;
    margin: 16px 0 100px;
  }
  .red {
    color: #f64e60 !important;
  }
}
</style>
