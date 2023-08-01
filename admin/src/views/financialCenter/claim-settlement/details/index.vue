<template>
  <div class="work-order-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            理赔结算明细<button
              type="button"
              class="btn-save fr"
              @click="exportSettle"
            >
              导出
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">结算编号</span>
                  <el-input
                    v-model="filter.billNo"
                    placeholder="请输入结算编号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">账期</span>
                  <el-select
                    v-model="filter.settlementMonth"
                    class="search-input"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getList({ page: 1 })"
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
                  <span class="label-name">服务项名称</span>
                  <el-select
                    v-model="filter.serviceItemId"
                    class="search-input"
                    placeholder="全部"
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in serviceList"
                      :key="item.id"
                      :label="item.serviceName"
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
                  @click.native.prevent="getList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">保险产品名称</span>
                  <el-select
                    v-model="filter.productId"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="getInsuranceProductList"
                    placeholder="请输入保险产品"
                    clearable
                    @change="getList({ page: 1 })"
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
                  <span class="label-name">保障计划名称</span>
                  <el-select
                    v-model="filter.planId"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="getInsurancePlans"
                    placeholder="请输入保障计划"
                    clearable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in insurancePlans"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
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
                    @change="getInstitutions"
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
              <div v-if="!showMore" class="flex-box">
                <img
                class="expand-icon"
                src="../../../../assets/expand.png"
                alt=""
                @click="showMore = true"
                />
              </div>
            </div>
              <div v-if="showMore" class="search-form flex-between">
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
                 <div v-if="filter.companyId" class="form-item">
                  <span class="label-name">承保机构</span>
                  <el-select
                    v-model="filter.contractorName"
                    class="search-input"
                    placeholder="全部"
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in institutionsList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                 </div>
                </div>
                <div class="flex-box">
                  <img
                  class="collapse-icon"
                  src="../../../../assets/collapse.png"
                  alt=""
                  @click="showMore = false"
                  />
              </div>
              </div>
          </div>
        </div>

        <div class="content">
          <div class="table">
            <el-table v-loading="tableLoading" :data="workOrderList">
              <el-table-column label="结算明细ID">
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.billItemNo || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="结算信息">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">
                      {{ scope.row.billNo || '-' }}
                    </div>
                    <div class="table-sectext">
                      {{ scope.row.settlementMonth || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="保单信息">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">
                      {{ scope.row.policyNo }}
                    </div>
                    <div class="table-sectext">
                      {{ scope.row.companyName || '-' }} - {{
                        scope.row.contractorName || '-'
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="保险信息">
                <template slot-scope="scope">
                  <div class="box"
                    >{{ scope.row.productName || '-' }} - {{
                      scope.row.planName || '-'
                    }}</div
                  >
                </template>
              </el-table-column>
              <el-table-column label="服务项名称">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">
                      {{ scope.row.serviceItemName || '-' }}
                    </div>
                    <div class="table-sectext">
                      编号：{{ scope.row.serviceItemCode || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="结算金额">
                <template slot-scope="scope">
                  <div class="box">￥{{ scope.row.completeSum || '0' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="结算状态">
                <template slot-scope="scope">
                  <div class="box">
                    <div v-if="scope.row.settlementStatus" class="tag finish">
                      已结算
                    </div>
                    <div v-else class="tag fail">
                      待结算
                    </div>
                    <div class="table-sectext mt-16">
                      {{
                        scope.row.updateTime
                          ? $moment(scope.row.updateTime).format(
                              'YYYY-MM-DD HH:mm',
                            )
                          : '-'
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="76">
                <template slot-scope="scope">
                    <div class="box">
                  <HoverTip
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
                    @click.native.prevent="lookDetails(scope.row)"
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
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { exportClaimSettle } from '@/api/insuranceCompany';
export default {
  name: 'ClaimSettlementDetails',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      showMore: false,
      filter: {
        billNo: '',
        companyId: '',
        contractorName: '',
        creator: '',
        keyWord: '',
        order: '',
        orderDirection: '',
        planId: '',
        productId: '',
        serviceItemId: '',
        settlementMonth: '',
        settlementStatus: '',
        updateTimeFrom: '',
        updateTimeTo: '',
        filterTimeUpdate: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      workOrderList: [], // 表格数据
      dateList: [], // 账期
      insuranceProductsList: [],
      insurancePlans: [],
      supplierList: [], // 保险公司
      institutionsList: [], // 承保机构
      serviceList: [], // 服务项
      statisticsData: {} // 统计数据
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    if (localStorage.getItem('settlementId')) {
      this.filter.billNo = localStorage.getItem('settlementId');
      // localStorage.removeItem('settlementId');
    }
    if (localStorage.getItem('serviceInfoId')) {
      this.filter.serviceItemId = localStorage.getItem('serviceInfoId');
      // localStorage.removeItem("serviceInfoId")
    }

    this.getOption();
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('supplier', [
      'getCompanySettlementList',
      'getSettlementStatistics',
      'getFinisherList',
      'getSettlementMonth',
      'getAgencyList',
      'getServiceList',
      'getSettleDetailStatistics'
    ]),
    ...mapActions('insuranceProducts', [
      'getInsuranceProductByName',
      'getInsurancePlansByName'
    ]),
    // 导出
    exportSettle() {
      window.open(exportClaimSettle());
    },
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
    // 根据名称查询保障计划
    getInsurancePlans(planName) {
      if (!planName) {
        return;
      }
      this.getInsurancePlansByName({
        planName
      }).then(res => {
        this.insurancePlans = res.data || [];
      });
    },
    // 会根据保险公司获取承保机构
    getInstitutions(companyId) {
      this.getList({ page: 1 });
      this.getAgencyList({ companyId }).then(res => {
        this.institutionsList = res.data || [];
      });
    },
    // 修改筛选时间
    changeTime() {
      this.filter.updateTimeFrom = this.filter.filterTimeUpdate[0];
      this.filter.updateTimeTo =
        this.filter.filterTimeUpdate[1] + 3600 * 24 * 1000 - 1000;
      this.getList({ page: 1 });
    },
    // 查询列表
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
      this.$store
        .dispatch('supplier/getCompanySettlementDetailList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.workOrderList = res.data.records || [];
          vm.pagingOptions.total = res.data.totalNum || 0;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
      // 获取统计数据
      this.getSettleDetailStatistics(params).then(res => {
        this.statisticsData = res.data;
      });
    },
    // 清空查询条件
    clearFilter() {
      this.filter = {
        billNo: '',
        companyId: '',
        contractorName: '',
        creator: '',
        keyWord: '',
        order: '',
        orderDirection: '',
        planId: '',
        productId: '',
        serviceItemId: '',
        settlementMonth: '',
        settlementStatus: '',
        updateTimeFrom: '',
        updateTimeTo: '',
        filterTimeUpdate: []
      };
      localStorage.removeItem('settlementId');
      this.getList({
        page: 1
      });
    },
    // 查看详情
    lookDetails(row) {
      this.$router.push(
        `/financial-center/claim-settlement-details/detail/${row.id}`,
      );
    },
    getOption() {
      // 获取下拉数据
      this.getSettlementMonth().then(res => {
        this.dateList = res.data;
      });
      this.getFinisherList().then(res => {
        this.finisherList = res.data;
      });
      // 获取服务项
      this.getServiceList().then(response => {
        this.serviceList = response.data || [];
      });
      this.$store
        .dispatch('insuranceCompany/getInsuranceCompanyList', {
          pageSize: 999,
          pageNum: 1
        })
        .then(response => {
          this.supplierList = response.records || [];
        });
    },
    // 导出
    exportList() {
      const vm = this;
      const params = {
        ...vm.filter
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      if (params.supplierName.length === 0) {
        delete params.supplierName;
      } else {
        params.supplierName = params.supplierName.join(',');
      }
      if (params.serviceInfoName.length === 0) {
        delete params.serviceInfoName;
      }
      delete params.filterTime;
      delete params.filterTimeUpdate;

      this.$store.dispatch('drugManage/settlementDetails', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.work-order-page {
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
          background: url('../../../../assets/settlement/settle-1.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-2 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-2.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-3 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-3.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-4 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-4.png')
            no-repeat center center;
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
          background: url('../../../../assets/settlement/settle-1.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-2 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-2.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-3 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-3.png')
            no-repeat center center;
          background-size: 100% 100%;
          margin-right: 24px;
        }
        .settlement-4 {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/settlement/settle-4.png')
            no-repeat center center;
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
  .filter-form {
    background-color: #fff;
    border-radius: 4px;
  }
  .content {
    border-radius: 4px;
    .box {
      height: 60px;

       .name {
          color: #333333;
          margin-bottom: 16px;
          font-size: 14px;
        }
    }

  }
  .uncheck {
    color: #3599fe;
    background: #e1f1ff;
  }
  .finish {
    color: #18c4bd;
    background: #c9f7f4;
  }
  .fail {
    color: #f64e60;
    background: #ffe2e5;
  }
  .tag {
    font-size: 14px;
    width: 60px;
    height: 22px;
    border-radius: 4px;
    text-align: center;
    line-height: 12px;
    margin-bottom: 4px;
  }
}
</style>
