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
              保单结算单
              <button
                v-if="pageAuthority.includes('details')"
                type="button"
                class="btn-save fr"
                @click="toSettlementDetail"
              >
                保单结算明细
              </button>
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">结算单编号</span>
                    <el-input
                      v-model="filter.bizNo"
                      placeholder="请输入结算单编号"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
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
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">保险公司名称</span>
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
                    <span class="label-name">保险产品名称</span>
                    <el-select
                      v-model="filter.productId"
                      filterable
                      remote
                      reserve-keyword
                      :remote-method="getInsuranceProductList"
                      placeholder="请输入保险产品名称"
                      clearable
                      @change="search"
                    >
                      <el-option
                        v-for="item in insuranceProductsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">结算方式</span>
                    <el-select
                      v-model="filter.pricingMethod"
                      class="search-input"
                      placeholder="全部"
                      @change="search"
                    >
                      <el-option label="按固定金额" :value="1"/>
                      <el-option label="按固定比例" :value="2"/>
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">完成人</span>
                    <el-select
                      v-model="filter.finisher"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in finisherList"
                        :key="item.employeeNo"
                        :label="item.name"
                        :value="item.employeeNo"
                      />
                    </el-select>
                  </div>
                </div>
                <div v-if="!showMore" class="flex-box">
                  <img
                  class="expand-icon"
                  src="../../../assets/expand.png"
                  alt=""
                  @click="showMore = true"
                  />
                </div>
                <!-- <div class="flex-box">
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
                </div> -->
              </div>
              <div v-if="showMore" class="filter-boxto">
                <div class="search-form flex-between">
                <div class="flex-box">
                   <div class="form-item">
                    <span class="label-name">更新时间</span>
                    <el-date-picker
                      v-model="filter.filterTimeUpdate"
                      type="daterange"
                      value-format="timestamp"
                      :clearable="isShowClear"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="changeTime"
                    />
                  </div>
                </div>
                 <div class="flex-box">
                      <img
                      class="collapse-icon"
                      src="../../../assets/collapse.png"
                      alt=""
                      @click="showMore = false"/>
                    </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="work-data">
          <div class="work-data-l">
            <div class="item">
              <div class="settlement-1"/>
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.policyBillNum || '0' }}
                </div>
                <div class="data">总单量</div>
              </div>
            </div>
            <div class="item">
              <div class="settlement-2"/>
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.completedPolicyBillNum || '0' }}
                </div>
                <div class="data">已完成</div>
              </div>
            </div>
            <div class="item">
              <div class="settlement-3"/>
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.pendingPolicyBillNum || '0' }}
                </div>
                <div class="data">待处理</div>
              </div>
            </div>
          </div>
          <div class="work-data-r">
            <div class="item">
              <div class="settlement-4"/>
              <div class="data-text">
                <div class="label">￥{{ statisticsData.sumAmount || '0' }}</div>
                <div class="data">结算金额</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="tabsChange"
          />
          <el-table
            v-loading="tableLoading"
            :data="orderList"
            class="table table-large"
          >
            <el-table-column label="结算单编号">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.bizNo || '-' }}</div>
                  <div v-if="scope.row.finisherName" class="table-sectext">
                    完成人：{{ scope.row.finisherName }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结算方式">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">
                    {{ scope.row.pricingMethod | fliterSettle }}
                  </div>
                  <div class="table-sectext">
                    {{ scope.row.settlementMonth }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保险产品">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.productName }}</div>
                  <div class="table-sectext">
                    {{ scope.row.productCode }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保险公司信息">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">{{ scope.row.companyName }}</div>
                  <div class="table-sectext">
                    编号:{{ scope.row.companyCode }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结算金额">
              <template slot-scope="scope">
                   <div class="message">
                ￥{{ scope.row.sumMoney }}
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
                        'YYYY-MM-DD HH:mm:ss'
                      ) || '-'
                    }}
                  </div>
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
            <div slot="empty" class="empty-img"/>
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
import { getConfirmNumber } from '@/utils/common';
import { getPolicySettlementStatistics } from '@/api/supplier';
export default {
  name: 'PolicySettlement',

  filters: {
    fliterSettle(type) {
      if (type === 1) {
        return '按照固定额度';
      } else if (type === 2) {
        return '按保单固定比例';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      showMore: false,
      filter: {
        bizNo: '',
        companyId: '',
        creator: '',
        finisher: '',
        keyWord: '',
        order: '',
        orderDirection: '',
        pricingMethod: '',
        productId: '',
        settlementMonth: '',
        settlementStatus: '',
        filterTimeUpdate: [],
        updateTimeFrom: '',
        updateTimeTo: '',
        settlementType: 1
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      statusList: [],
      dateList: [], // 账期
      orderList: [], // table
      supplierList: [], // 保险公司名称
      insuranceProductsList: [], // 服务项
      finisherList: [], // 完成人
      statisticsData: {}
    };
  },
  computed: {
    btns() {
      return [
        { name: '全部', value: '' },
        {
          name: '待结算',
          value: '0',
          isNumber: true,
          number: getConfirmNumber('PolicySettlement') || 0
        },
        { name: '已结算', value: '1' }
      ];
    },
    pageAuthority() {
      return this.$store.state.user.pageAuthority['120201'];
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
    this.getOption();
  },
  methods: {
    ...mapActions('insuranceCompany', [
      'getPolicyList',
      'getFinisherList',
      'getMonthList'
    ]),
    ...mapActions('insuranceProducts', ['getInsuranceProductByName']),
    // 根据名称查询保险产品
    getInsuranceProductList(name) {
      if (!name) {
        return;
      }
      this.getInsuranceProductByName({
        name
      }).then(res => {
        this.insuranceProductsList = res.data || [];
      });
    },
    // 修改筛选时间
    changeTime() {
      this.filter.updateTimeFrom = this.filter.filterTimeUpdate[0];
      this.filter.updateTimeTo =
        this.filter.filterTimeUpdate[1] + 3600 * 24 * 1000 - 1000;
      this.search();
    },
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }

      delete params.filterTimeUpdate;
      vm.tableLoading = true;
      getPolicySettlementStatistics(params).then(res => {
        this.statisticsData = res.data || {};
      });
      vm.getPolicyList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.orderList = res.data.records || [];
          vm.pagingOptions.total = res.data.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 保险公司
    getSupplierList() {
      this.$store
        .dispatch('insuranceCompany/getInsuranceCompanyList', {
          pageSize: 99,
          pageNum: 1
        })
        .then(response => {
          this.supplierList = response.records || [];
        });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`policy-settlement/detail/${id}`);
    },
    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        bizNo: '',
        companyId: '',
        creator: '',
        finisher: '',
        keyWord: '',
        order: '',
        orderDirection: '',
        pricingMethod: '',
        productId: '',
        settlementMonth: '',
        settlementStatus: '',
        filterTimeUpdate: [],
        updateTimeFrom: '',
        updateTimeTo: '',
        settlementType: 1
      };
      this.getList();
    },
    getOption() {
      // 账期  完成人
      this.getMonthList().then(res => {
        this.dateList = res.data;
      });
      this.getFinisherList().then(res => {
        this.finisherList = res.data;
      });
    },
    tabsChange(val) {
      this.filter.settlementStatus = val;
      this.getList({
        pageNo: 1
      });
    },
    toSettlementDetail() {
      this.$router.push('policy-settlement-details');
    }
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  width: 100%;
  .expand-icon,
.collapse-icon {
  width: 24px;
  height: 30px;
}
  .work-data {
    width: 100%;
    display: flex;
    margin: 24px 0;
    height: 97px;
    &-l {
      flex: 2;
      padding: 24px;
      background-color: #fff;
      border-radius: 4px;
      margin-right: 24px;
      display: flex;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ebedf2;
        &:last-of-type {
          border: none;
        }
        .settlement-1 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-1.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-2 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-2.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-3 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-3.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-4 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-4.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .label {
          font-size: 24px;

          font-weight: bold;
          color: #464668;
          line-height: 30px;
          margin: 0 0 8px;
          text-align: center;
          max-width: 200px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .data {
          font-size: 14px;

          font-weight: 400;
          color: #464668;
          line-height: 14px;
          text-align: center;
        }
      }
    }
    &-r {
      flex: 1;
      padding: 24px;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        .settlement-1 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-1.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-2 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-2.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-3 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-3.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-4 {
          width: 40px;
          height: 40px;
          background: url('../../../assets/settlement/settle-4.png') no-repeat
            center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .label {
          font-size: 24px;

          font-weight: bold;
          color: #464668;
          line-height: 30px;
          margin: 0 0 8px;
          text-align: center;
          max-width: 200px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .data {
          font-size: 14px;

          font-weight: 400;
          color: #464668;
          line-height: 14px;
          text-align: center;
        }
      }
    }
  }
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
    .message {
     height: 60px;

      .text {
        color: #464668;
        margin-bottom: 16px;
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
  }
}
</style>
