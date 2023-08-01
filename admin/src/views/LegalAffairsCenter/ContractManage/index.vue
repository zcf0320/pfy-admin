<template>
  <div class="contract-manage">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="card">
          <div class="filter-form">
            <div class="title-top title-btn">
              <div>合同管理</div>
              <div>
                <button type="button" class="btn-save" @click="addContract">
                  新增
                </button>
              </div>
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">ID</span>
                    <el-input
                      v-model="filter.id"
                      placeholder="请输入ID"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">签订公司</span>
                    <el-select
                      v-model="filter.providerId"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in supplierList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">服务项名称</span>
                    <el-input
                      v-model="filter.serviceName"
                      placeholder="请输入服务项名称"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                </div>
                <div class="flex-box">
                  <HoverTip
                    content="查询"
                    tip-class-name="icon-search"
                    class="mr-30"
                    @click.native.prevent="search"
                  />
                  <HoverTip
                    content="清除查询条件"
                    tip-class-name="icon-reset"
                    @click.native.prevent="clearFilter"
                  />
                </div>
              </div>
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">生效时间</span>
                    <el-date-picker
                      v-model="effectiveTime"
                      type="daterange"
                      value-format="timestamp"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="changeEffectiveTime"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">过期时间</span>
                    <el-date-picker
                      v-model="expirationTime"
                      type="daterange"
                      value-format="timestamp"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="changeExpirationTime"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">状态</span>
                    <el-select
                      v-model="filter.status"
                      class="search-input"
                      placeholder="全部"
                      @change="search"
                    >
                      <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <el-table v-loading="tableLoading" :data="contractList" class="table">
            <el-table-column label="ID" prop="id" />
            <el-table-column
              label="签订公司"
              prop="providerName"
              show-overflow-tooltip
            />
            <el-table-column label="服务项名称" show-overflow-tooltip>
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
            <el-table-column label="生效时间">
              <template slot-scope="scope">
                {{ $moment(scope.row.effectiveTime).format('YYYY-MM-DD') }}
              </template>
            </el-table-column>
            <el-table-column label="过期时间">
              <template slot-scope="scope">
                {{ $moment(scope.row.expirationTime).format('YYYY-MM-DD') }}
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
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <HoverTip
                  content="查看"
                  tip-class-name="icon-detail"
                  class="mr-30"
                  @click.native.prevent="lookDetails(scope.row.id)"
                />
                <HoverTip
                  content="编辑"
                  tip-class-name="icon-edit"
                  class="mr-30"
                  @click.native.prevent="editItem(scope.row.id)"
                />
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
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { contractText } from '@/utils/enum';
export default {
  name: 'contract-manage',
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
      contractText,
      tableLoading: false,
      filter: {
        id: '',
        effectiveEndTime: '',
        effectiveStartTime: '',
        expirationEndTime: '',
        expirationStartTime: '',
        providerId: '',
        status: '',
        serviceName: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      effectiveTime: '',
      expirationTime: '',
      contractList: [],
      supplierList: [],
      statusList: []
    };
  },

  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      pageNo: Number(pageNo)
    });
    this.getSupplierList();
    this.getOption();
  },
  methods: {
    ...mapActions('drugManage', ['getSuppliersList']),
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      this.tableLoading = true;
      this.$store.dispatch('supplier/findContract', params).then(res => {
        this.tableLoading = false;
        this.contractList = res.records || [];
        this.pagingOptions.total = res.totalNum | 0;
      });
    },
    getSupplierList() {
      this.getSuppliersList().then(res => {
        this.supplierList = res.obj;
      });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`/legal-affairs-center/contract-manage/detail/${id}`);
    },
    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        id: '',
        effectiveTime: '',
        expirationTime: '',
        effectiveEndTime: '',
        effectiveStartTime: '',
        expirationEndTime: '',
        expirationStartTime: '',
        providerId: '',
        status: '',
        serviceName: ''
      };
      this.getList();
    },
    getOption() {
      // 账期  结算状态
      this.$store
        .dispatch('app/getSysConfig', {
          code: 'activeSatus'
        })
        .then(res => {
          this.statusList = res.obj || [];
        });
    },
    addContract() {
      this.$router.push('/legal-affairs-center/contract-manage/create');
    },
    changeEffectiveTime() {
      this.filter.effectiveStartTime = this.effectiveTime[0];
      this.filter.effectiveEndTime =
        this.effectiveTime[1] + 3600 * 24 * 1000 - 1000;
      this.getList({ page: 1 });
    },
    changeExpirationTime() {
      this.filter.expirationStartTime = this.expirationTime[0];
      this.filter.expirationEndTime =
        this.expirationTime[1] + 3600 * 24 * 1000 - 1000;
      this.getList({ page: 1 });
    },
    editItem(id) {
      this.$router.push(`/legal-affairs-center/contract-manage/edit/${id}`);
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
.contract-manage {
  width: 100%;
  width: 100%;
  .card {
    background: #fff;
    margin-bottom: 24px;
    &:last-child {
      padding: 30px;
    }
  }
  .operation-buttons {
    .el-button {
      margin-right: 24px;
    }
    .el-select {
      margin-right: 24px;
    }
  }
  .clear {
    color: #ff625e;
    border-color: #ff625e;
    &:hover {
      background-color: #ffefef;
    }
  }
  .export-button {
    color: #2276ff;
    border-color: #2276ff;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .table {
    min-height: 350px;
    .message {
      padding: 12px 0 0 12px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      height: 112px;

      .text {
        color: #6f6f6f;
        margin: 12px 0;
        &:first-child {
          color: #333333;
        }
      }
    }
    .check {
      color: #47cec6;
      background: rgba(71, 206, 198, 0.1);
    }
    .uncheck {
      color: #ff625e;
      background: rgba(255, 98, 94, 0.1);
    }
    .tag {
      font-size: 14px;
      width: 60px;
      height: 22px;
      border-radius: 4px;
      text-align: center;
      line-height: 12px;
    }
    .service-text {
      padding: 25px 0;
      font-size: 14px;
      .item {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .edit {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background-image: url('../../../assets/icon_edit.png');
    background-size: 100% 100%;
    cursor: pointer;
    &:active {
      background-image: url('../../../assets/icon_edit_active.png');
    }
  }
  .title-btn {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
