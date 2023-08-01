<template>
  <div class="settlement">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="card">
          <div class="filter-form">
            <div class="title-top">
              销售结算单
              <button type="button" class="btn-save fr" @click="add">
                新增
              </button>
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">结算ID</span>
                    <el-input
                      v-model="filter.serialNumber"
                      placeholder="请输入结算ID"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">备注</span>
                    <el-input
                      v-model="filter.keyWord"
                      placeholder="请输入备注"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">结算内容</span>
                    <el-select
                      v-model="filter.settlementContent"
                      class="search-input"
                      placeholder="全部"
                      @change="search"
                    >
                      <el-option
                        v-for="item in contentList"
                        :key="item.id"
                        :label="item.name"
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
                    <span class="label-name">供应商名称</span>
                    <el-select
                      v-model="filter.supplierId"
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
                    <span class="label-name">账期</span>
                    <el-select
                      v-model="filter.accountPeriod"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in dateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">结算金额（元）</span>
                    <el-input
                      v-model="filter.settlementPrice"
                      placeholder="请输入结算金额"
                      @keyup.enter.native="search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <el-table v-loading="tableLoading" :data="orderList" class="table-large">
            <el-table-column label="ID">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.serialNumber || '-' }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="供应商信息">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text mb-16">{{ scope.row.supplierCode || '-' }}</div>
                  <div class="gray">
                    {{ scope.row.supplierName || '-' }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="结算内容">
              <template slot-scope="scope">
                <div class="message">
                  <div v-if="scope.row.settlementForm === 1" class="text">
                    {{ scope.row.settlementContentName || '-' }}
                  </div>
                  <template v-else>
                    <div class="text mb-16">
                      {{ scope.row.serviceInfoName || '-' }}
                    </div>
                    <div class="gray">
                      {{ scope.row.serviceId || '-' }}
                    </div>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="账期">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.accountPeriod || '-' }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保险产品">
              <template slot-scope="scope">
                <div class="message">
                  <template v-if="scope.row.insuranceProductList.length > 0">
                    <el-tooltip :visible-arrow="false">
                      <div slot="content">
                        <div
                          v-for="item in scope.row.insuranceProductList"
                          :key="item.id"
                          class="tool-content"
                        >
                          {{ item.orderNumber }} {{ item.name }}
                        </div>
                      </div>
                      <div class="text">
                        {{ scope.row.insuranceProductList[0]['name'] || '-' }}
                      </div>
                    </el-tooltip>

                    <div class="gray mt-16">
                      {{
                        scope.row.insuranceProductList[0]['orderNumber'] || '-'
                      }}
                    </div>
                  </template>
                  <div v-else class="message">-</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结算状态">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text mb-16">
                    <div v-if="scope.row.state === '已结算'" class="tag check">
                      已结算
                    </div>
                    <div v-else class="tag uncheck">待结算</div>
                  </div>
                  <div v-if="true" class="gray">
                    {{
                      $moment(scope.row.updateTime).format(
                        'YYYY-MM-DD HH:mm:ss',
                      ) || '-'
                    }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结算金额(元)">
              <template slot-scope="scope">
                <div class="message">
                ￥{{ scope.row.settlementPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="message">
                <HoverTip
                  v-if="pageAuthority.includes('detail')"
                  content="查看"
                  tip-class-name="icon-detail"
                  class="mr-30"
                  @click.native.prevent="lookDetails(scope.row.id)"
                />
                </div>
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
import {
  getSettlementContentList,
  getAccountPeriodList
} from '@/api/drugManage';
export default {
  name: 'SupplierSalesSettlement',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      filter: {
        settlementContent: '',
        serialNumber: '',
        accountPeriod: '',
        keyWord: '',
        supplierId: '',
        settlementPrice: '',
        settlementForm: 1 // 结算类型
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      dateList: [], // 账期
      orderList: [], // table
      supplierList: [], // 保险公司名称
      insuranceProductsList: [], // 服务项

      contentList: []
    };
  },
  computed: {
    pageAuthority() {
      return this.$store.state.user.pageAuthority['120303'] || [];
    }
  },
  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      pageNo: Number(pageNo)
    });
    this.getSupplierList();
    this.getSettlementContent();
    this.getAccountPeriod();
  },
  methods: {
    ...mapActions('drugManage', ['getSettleList', 'getSuppliersList']),

    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.getSettleList(params)
        .then(res => {
          this.tableLoading = false;
          this.orderList = res.data.listRespPageableResp.records || [];
          this.pagingOptions.total = res.data.listRespPageableResp.totalNum;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 保险公司
    getSupplierList() {
      this.getSuppliersList().then(res => {
        this.supplierList = res.data;
      });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`supplier-sales-settlement/detail/${id}`);
    },
    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        settlementContent: '',
        serialNumber: '',
        accountPeriod: '',
        keyWord: '',
        supplierId: '',
        settlementForm: 1
      };
      this.getList();
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

    add() {
      this.$router.push('supplier-sales-settlement/create');
    }
  }
};
</script>

<style lang="scss" scoped>
.settlement {
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

    .message {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      height: 50px;

      .text {
        color: #333333;
      }
       .gray{
        color: #999999;
        font-size: 14px;
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
    }
}
</style>
