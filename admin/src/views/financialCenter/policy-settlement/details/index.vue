<template>
  <div class="work-order-page">
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
              保单结算明细
              <el-button
                v-if="pageAuthority.includes('export')"
                class="fr"
                type="primary"
                :loading="exportLoading"
                @click="exportSettle"
                >导出数据</el-button
              >
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">结算单编号</span>
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
                    <span class="label-name">保单号</span>
                    <el-input
                      v-model="filter.policyNo"
                      placeholder="请输入保单号/虚拟保单号进行查询"
                      class="search-input"
                      @keyup.enter.native="getList({ page: 1 })"
                    />
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
              </div>
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
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
                    <span class="label-name">结算类型</span>
                    <el-select
                      v-model="filter.policyStatus"
                      class="search-input"
                      placeholder="全部"
                      @change="getInstitutions"
                    >
                      <el-option label="保单正常结算" :value="0" />
                      <el-option label="保单撤单结算" :value="1" />
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
                  <div class="form-item">
                    <span class="label-name">结算状态</span>
                    <el-select
                      v-model="filter.settlementStatus"
                      class="search-input"
                      placeholder="全部"
                      @change="getInstitutions"
                    >
                      <el-option label="待结算" :value="0" />
                      <el-option label="已结算" :value="1" />
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
        </div>

        <div class="card">
          <div class="content">
              <el-table v-loading="tableLoading" :data="workOrderList" class="table-large">
                <el-table-column label="结算明细ID">
                  <template slot-scope="scope">
                    <div class="box">
                     {{ scope.row.billItemNo || '-' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算单编号">
                  <template slot-scope="scope">
                    <div class="box">
                      <div class="name">{{ scope.row.billNo || '-' }}</div>
                      <div class="table-sectext">
                        完成人:
                        {{ scope.row.finisherName || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算方式">
                  <template slot-scope="scope">
                    <div class="box">
                      <div class="name">
                        {{ scope.row.pricingMethod | fliterSettle }}
                      </div>
                      <div class="table-sectext">
                        {{ scope.row.settlementMonth || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="保险产品">
                  <template slot-scope="scope">
                    <div class="box">
                      <div class="name"
                        >{{ scope.row.productName || '-' }} - {{
                          scope.row.planName || '-'
                        }}</div
                      >
                      <div class="table-sectext">
                        保单号:
                        {{ scope.row.policyNo || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="机构信息">
                  <template slot-scope="scope">
                    <div class="box">
                      <div class="name">
                        保险公司：{{ scope.row.companyName || '-' }}
                      </div>
                      <div class="table-sectext mb-16">
                        承保机构：{{ scope.row.contractorName || '-' }}
                      </div>
                      <div class="table-sectext">
                        销售渠道：{{ scope.row.saleOrgCode || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算金额">
                  <template slot-scope="scope">
                    <div class="box">
                      <div v-if="scope.row.policyStatus === 0"
                        >￥{{ scope.row.itemMoney || '0' }}</div
                      >
                      <div v-else class="red"
                        >￥{{ scope.row.itemMoney || '0' }}</div
                      >
                      <div class="table-sectext mt-16">
                        {{ POLICYSTATUSTEXT[scope.row.policyStatus] || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算状态">
                  <template slot-scope="scope">
                    <div class="box">
                      <div v-if="scope.row.settlementStatus" class="tag finish">
                        已结算
                      </div>
                      <div v-else class="tag fail">待结算</div>
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
                      v-if="pageAuthority.includes('detail')"
                      content="查看"
                      tip-class-name="icon-detail"
                      class="mr-30"
                      @click.native.prevent="lookDeatils(scope.row.id)"
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
    <ExportDialog
      :dialog-visible.sync="showExportDia"
      :close="
        () => {
          showExportDia = false;
        }
      "
      @sure-submit="sureExport"
    />
  </div>
</template>

<script>
import { POLICYSTATUSTEXT } from '@/utils/enum';
import { mapActions } from 'vuex';
// import qs from 'qs';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'PolicySettlementDetails',
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
  components: { ExportDialog },
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
        policyNo: '',
        productId: '',
        serviceItemId: '',
        settlementMonth: '',
        settlementStatus: '',
        updateTimeFrom: '',
        updateTimeTo: '',
        filterTimeUpdate: [],
        policyStatus: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      workOrderList: [], // 表格数据
      dateList: [], // 账期
      insuranceProductsList: [], // 保险产品
      insurancePlans: [], // 保障计划
      supplierList: [], // 保险公司
      institutionsList: [], // 承保机构
      statisticsData: {},
      POLICYSTATUSTEXT,
      showExportDia: false,
      exportLoading: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      return this.$store.state.user.pageAuthority['12020102'] || [];
    }
  },
  created() {
    this.getOption();
    if (localStorage.getItem('settlementId')) {
      this.filter.billNo = localStorage.getItem('settlementId');
      // localStorage.removeItem('settlementId');
    }
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getInsuranceProductByName',
      'getInsurancePlansByName'
    ]),
    ...mapActions('insuranceCompany', [
      'policyAgency',
      'getPolicyDetailList',
      'getMonthList',
      'getFinisherList',
      'getPolicyStatistics',
      'exportPolicySettle'
    ]),
    exportSettle() {
      const fliter = this.filter;
      // delete fliter.updateTimeFrom;
      delete fliter.keyWord;
      if (this.filter.updateTimeTo) {
        this.filter.updateTimeTo = this.$moment(
          this.filter.updateTimeTo,
        ).format('YYYY-MM-DD HH:mm:ss');
      }
      if (this.filter.updateTimeFrom) {
        this.filter.updateTimeFrom = this.$moment(
          this.filter.updateTimeFrom,
        ).format('YYYY-MM-DD HH:mm:ss');
      }
      delete fliter.filterTimeUpdate;
      ExportApi.getPolicySettlementCount(fliter)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
             fliter.pageSize = res.data;
            ExportApi.exportPolicySettlementCount(fliter).then(res => {
              this.exportLoading = false;
              window.location.href = res.data;
            });
            // const params = qs.stringify(fliter);
            // window.open(
            //   `${process.env.VUE_APP_BASE_API}insurance/policy-settlement/policy/export?${params}`
            // );
          }
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    // 确认邮箱导出
    sureExport(email) {
      const fliter = this.filter;
      // delete fliter.updateTimeFrom;
      delete fliter.keyWord;
      if (this.filter.updateTimeTo) {
        this.filter.updateTimeTo = this.$moment(
          this.filter.updateTimeTo,
        ).format('YYYY-MM-DD HH:mm:ss');
      }
      if (this.filter.updateTimeFrom) {
        this.filter.updateTimeFrom = this.$moment(
          this.filter.updateTimeFrom,
        ).format('YYYY-MM-DD HH:mm:ss');
      }
      delete fliter.filterTimeUpdate;
      fliter.email = email;
      ExportApi.exportPolicySettlementCount(fliter).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        } else {
          this.$message.success(res.comment);
          this.showExportDia = false;
        }
      });
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
      this.policyAgency({ companyId }).then(res => {
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
      // 获取统计数据
      this.getPolicyStatistics(params).then(res => {
        this.statisticsData = res.data || {};
      });
      // 获取表格数据
      this.getPolicyDetailList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.workOrderList = res.data.records || [];
          vm.pagingOptions.total = res.data.totalNum || 0;
        })
        .catch(() => {
          vm.tableLoading = false;
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
        policyNo: '',
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
    lookDeatils(id) {
      this.$router.push(
        `/financial-center/policy-settlement-details/detail/${id}`,
      );
    },
    getOption() {
      // 获取下拉数据
      this.getMonthList().then(res => {
        this.dateList = res.data;
      });
      this.getFinisherList().then(res => {
        this.finisherList = res.data;
      });
      this.$store
        .dispatch('insuranceCompany/getInsuranceCompanyList', {
          pageSize: 999,
          pageNum: 1
        })
        .then(response => {
          this.supplierList = response.records || [];
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
  .card {
    background: #fff;
    margin-bottom: 24px;
  }
  .filter-form {
    background-color: #fff;
    border-radius: 4px;
  }
  .content {
    border-radius: 4px;
    .box {
      height: 80px;

      .red {
        color: #f64e60;
      }
        .name {
          color: #333333;
          margin-bottom: 16px;
          font-size: 14px;
        }
    }
    .name {
      color: #1e1e2f;
      margin-bottom: 4px;
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
.mt-4 {
  margin-top: 4px;
}
</style>
