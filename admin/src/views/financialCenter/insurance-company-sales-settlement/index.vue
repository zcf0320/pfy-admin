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
                      v-model="filter.bizNo"
                      placeholder="请输入结算ID"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">备注</span>
                    <el-input
                      v-model="filter.remark"
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
                    <span class="label-name">保司名称</span>
                    <el-select
                      v-model="filter.companyId"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in supplierList"
                        :key="item.id"
                        :label="item.companyName"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">账期</span>
                    <el-select
                      v-model="filter.settlementMonth"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in dateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      />
                    </el-select>
                  </div>
                   <div class="form-item">
                    <span class="label-name">结算金额（元）</span>
                    <el-input
                      v-model="filter.amount"
                      placeholder="请输入结算金额"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <el-table
            v-loading="tableLoading"
            :data="orderList"
            class="table-large"
          >
            <el-table-column label="ID">
                <template slot-scope="scope">
                    <div class="message">{{scope.row.bizNo}}</div>
                </template>
            </el-table-column>
            <el-table-column label="保司信息">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.companyCode || '-' }}</div>
                  <div class="table-sectext">
                    {{ scope.row.companyName || '-' }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="结算内容">
              <template slot-scope="scope">
                <div class="message">
                {{ scope.row.settlementContent | settlementContent }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="账期">
                <template slot-scope="scope">
                     <div class="message">
                        {{scope.row.settlementMonth}}
                     </div>
                </template>
            </el-table-column>

            <el-table-column label="结算状态">
              <template slot-scope="scope">
                <div class="message mb-16">
                  <div class="text">
                    <div v-if="scope.row.settlementStatus" class="tag check">
                      已结算
                    </div>
                    <div v-else class="tag uncheck">待结算</div>
                  </div>
                  <div v-if="true" class="table-sectext">
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
                ￥{{ scope.row.sumMoney || '-' }}
                 </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                 <div class="message mb-16">
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
  name: 'InsuranceCompanySalesSettlement',
  filters: {
    settlementContent(val) {
      if (val === 1) {
        return '接口';
      } else if (val === 2) {
        return '短信';
      } else if (val === 3) {
        return '平台';
      } else if (val === 4) {
        return '其他';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      filter: {
        settlementContent: '',
        bizNo: '',
        settlementMonth: '',
        settlementAmount: '',
        orderDirection: 'desc',
        remark: '',
        companyId: '',
        amount: '',
        settlementType: 2
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
      return this.$store.state.user.pageAuthority['120203'] || [];
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
    ...mapActions('insuranceCompany', [
      'getInsuranceCompanySalesList',
      'getInsuranceCompanyList'
    ]),

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
      this.getInsuranceCompanySalesList(params)
        .then(res => {
          this.tableLoading = false;
          this.orderList = res.data.records || [];
          this.pagingOptions.total = res.data.totalNum;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 保险公司
    getSupplierList() {
      this.getInsuranceCompanyList({
        pageSize: 99,
        pageNum: 1
      }).then(res => {
        this.supplierList = res.records;
      });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`insurance-company-sales-settlement/detail/${id}`);
    },
    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        settlementContent: '',
        settlementNo: '',
        settlementMonth: '',
        settlementAmount: '',
        keyWord: '',
        companyId: '',
        amount: '',
        settlementType: 2
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
      this.$router.push('insurance-company-sales-settlement/create');
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
     height: 60px;

      .text {
        color: #333333;
        margin-bottom: 16px;
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

}
</style>
