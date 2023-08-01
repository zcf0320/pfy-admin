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
            服务结算明细<button
              v-if="pageAuthority.includes('export')"
              type="button"
              class="btn-save fr"
              @click="exportList"
            >
              导出
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">结算ID</span>
                  <el-input
                    v-model="filter.settlementDetailNumber"
                    placeholder="请输入结算ID"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">结算单编号</span>
                  <el-input
                    v-model="filter.settlSerialNumber"
                    placeholder="请输入结算单编号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">账期</span>
                  <el-select
                    v-model="filter.accountPeriod"
                    class="search-input"
                    placeholder="全部"
                    clearable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in dateList"
                      :key="item.id"
                      :label="item.name"
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
                  <span class="label-name">供应商编号</span>
                  <el-input
                    v-model="filter.supplierCode"
                    placeholder="请输入供应商编号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">供应商名称</span>
                  <el-select
                    v-model="filter.supplierName"
                    class="search-input"
                    placeholder="全部"
                    multiple
                    clearable
                    collapse-tags
                    :multiple-limit="5"
                    filterable
                    @change="getList({ page: 1 })"
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
                  <span class="label-name">服务名称</span>
                  <el-select
                    v-model="filter.serviceInfoName"
                    class="search-input"
                    placeholder="全部"
                    clearable
                    multiple
                    collapse-tags
                    :multiple-limit="5"
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in serviceItemsList"
                      :key="item.id"
                      :label="item.serviceName"
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
                  <span class="label-name">生成时间</span>
                  <el-date-picker
                    v-model="filter.filterTime"
                    type="daterange"
                    value-format="timestamp"
                    :clearable="isShowClear"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTime('create')"
                  />
                </div>
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
                    @change="changeTime('update')"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">保险产品</span>
                  <el-select
                    v-model="filter.insuranceProductId"
                    class="search-input"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in options"
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
                  <span class="label-name">结算状态</span>
                  <el-select
                    v-model="filter.state"
                    class="search-input"
                    placeholder="全部"
                    clearable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">服务编号</span>
                  <el-input
                    v-model="filter.serviceId"
                    placeholder="请输入服务编号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">结算类型</span>
                  <el-select
                    v-model="filter.policyStatus"
                    class="search-input"
                    placeholder="全部"
                    @change="getList({ page: 1 })"
                  >
                    <el-option label="正常结算" :value="0" />
                    <el-option label="撤单结算" :value="1" />
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
            <el-table v-loading="tableLoading" :data="workOrderList" class="table-large">
              <el-table-column
                label="结算ID"

                show-overflow-tooltip
              >
              <template slot-scope="scope">
                <div class="box">{{scope.row.settlementDetailNumber}}</div>
              </template>
              </el-table-column>
              <el-table-column label="结算单信息" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">{{ scope.row.settlSerialNumber }}</div>
                    <div>
                      {{
                        scope.row.createTime
                          ? $moment(scope.row.createTime).format('YYYY-MM-DD')
                          : '-'
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="供应商信息">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">{{ scope.row.supplierName }}</div>
                    <div>编号：{{ scope.row.supplierCode }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="服务项名称">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">
                      {{ scope.row.serviceInfoName || '-' }}
                    </div>
                    <div>编号：{{ scope.row.serialNumber }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="保险产品">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="name">
                      {{ scope.row.insuranceProductName || '-' }}
                    </div>
                    <div>
                      {{ scope.row.orderNumber || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="结算金额">
                <template slot-scope="scope">
                  <div class="box">
                    <span v-if="scope.row.policyStatus === 0"
                      >￥{{ scope.row.settlementPrice || '0' }}</span
                    >
                    <span v-else class="red"
                      >￥{{ scope.row.settlementPrice || '0' }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="结算状态">
                <template slot-scope="scope">
                  <div class="box">
                    <div v-if="scope.row.state === 1011" class="tag finish">
                      已结算
                    </div>
                    <div v-else class="tag fail">待结算</div>
                    <div class="mt-16">
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
                    @click.native.prevent="lookDeatils(scope.row)"
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
export default {
  name: 'ServiceItemSettlementDetails',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      showMore: false,
      filter: {
        accountPeriod: '',
        serviceInfoName: [],
        filterTime: [],
        filterTimeUpdate: [],
        supplierCode: '',
        state: '',
        serviceId: '',
        supplierName: [],
        startCreateTime: '',
        endCreateTime: '',
        startUpdateTime: '',
        endUpdateTime: '',
        settlSerialNumber: '',
        settlementDetailNumber: '',
        insuranceProductId: '',
        policyStatus: '',
        settlementForm: 0
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      workOrderList: [],
      dateList: [],
      statusList: [],
      supplierList: [],
      serviceItemsList: [],
      dayData: {
        settledSum: 0,
        settlementCountSum: 0,
        settlementPriceSum: 0,
        unsettledSum: 0
      },
      options: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      return this.$store.state.user.pageAuthority['12030102'] || [];
    }
  },
  created() {
    if (this.$route.query.id) {
      this.filter.settlSerialNumber = this.$route.query.id;
    }
    this.getSupplierList();
    this.getOption('settlementState');
    this.getOption('accountPeriod');
    this.getServiceItemsList();
    if (localStorage.getItem('serviceInfoId')) {
      this.filter.serviceInfoName = [localStorage.getItem('serviceInfoId')];
      localStorage.removeItem('serviceInfoId');
    }
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
    this.getInsuranceProductList();
  },
  methods: {
    // 修改筛选时间
    changeTime(name) {
      if (name === 'create') {
        this.filter.startCreateTime = this.filter.filterTime[0];
        this.filter.endCreateTime =
          this.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      } else {
        this.filter.startUpdateTime = this.filter.filterTimeUpdate[0];
        this.filter.endUpdateTime =
          this.filter.filterTimeUpdate[1] + 3600 * 24 * 1000 - 1000;
      }
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
      if (params.supplierName && params.supplierName.length === 0) {
        delete params.supplierName;
      }
      if (params.serviceInfoName && params.serviceInfoName.length === 0) {
        delete params.serviceInfoName;
      }
      delete params.filterTime;
      delete params.filterTimeUpdate;
      vm.tableLoading = true;
      this.$store
        .dispatch('supplier/getSettlementDetails', params)
        .then(res => {
          vm.tableLoading = false;
          this.dayData = Object.assign(
            this.dayData,
            res.data.settlementCollectVO,
          );

          vm.workOrderList = res.data.settlementDetailListVO.records || [];
          vm.pagingOptions.total =
            res.data.settlementDetailListVO.totalNum || 0;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 清空查询条件
    clearFilter() {
      this.filter = {
        accountPeriod: '',
        serviceInfoName: '',
        filterTime: [],
        filterTimeUpdate: [],
        supplierCode: '',
        state: '',
        serviceId: '',
        supplierName: [],
        startCreateTime: '',
        endCreateTime: '',
        startUpdateTime: '',
        endUpdateTime: '',
        settlSerialNumber: '',
        settlementDetailNumber: '',
        insuranceProductId: '',
        policyStatus: '',
        settlementForm: 0
      };
      this.getList({
        page: 1
      });
    },
    // 查看详情
    lookDeatils(row) {
      this.$router.push(
        `/financial-center/service-item-settlement-details/detail/${row.id}`,
      );
    },
    getOption(code) {
      // 账期  结算状态
      this.$store
        .dispatch('app/getSysConfig', {
          code: code
        })
        .then(res => {
          if (code === 'settlementState') {
            this.statusList = res.obj || [];
            //   this.statusList.unshift({ name: '全部', id: '' })
          } else {
            this.dateList = res.obj || [];
          }
        });
    },
    getSupplierList() {
      this.$store.dispatch('drugManage/getSuppliersList').then(res => {
        this.supplierList = res.obj;
      });
    },
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      vm.$store.dispatch('serviceItems/getServiceinfos', {}).then(res => {
        // res.data.map(item => {
        //   item.name = `${item.serviceInfoName}`
        // })
        vm.serviceItemsList = res.data || [];
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
    },
    getInsuranceProductList() {
      this.$store.dispatch('insuranceProducts/getProdList', {}).then(res => {
        if (res) {
          this.options = res.data;
        }
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
    margin-bottom: 24px;
  }
  .content {
    border-radius: 4px;
    .box {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      .red {
        color: #f64e60;
      }
       .name {
          color: #333333;
          font-size: 14px;
          margin-bottom: 16px;
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
