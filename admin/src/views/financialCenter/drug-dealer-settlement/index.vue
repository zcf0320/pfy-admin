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
            <div class="title-top title-btn">
              <div>
                药商结算单
              </div>
              <button
                type="button"
                class="btn-save fr"
                style="margin-right: 15px"
                @click="toSettlementDetail"
              >
                药商结算明细
              </button>
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">结算单编号</span>
                    <el-input
                      v-model="filter.serialNumber"
                      placeholder="请输入结算单编号"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
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
                    <span class="label-name">供药商ID</span>
                    <el-input
                      v-model="filter.supplierCode"
                      placeholder="请输入供药商ID"
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
                    <span class="label-name">服务项编号</span>
                    <el-input
                      v-model="filter.serviceId"
                      placeholder="请输入服务项编号"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">服务项名称</span>
                    <el-select
                      v-model="filter.serviceInfoId"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in serviceList"
                        :key="item.id"
                        :label="item.serviceName"
                        :value="item.id"
                      />
                    </el-select>
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
                 <div v-if="!showMore" class="flex-box">
                    <img
                      class="expand-icon"
                      src="../../../assets/expand.png"
                      alt=""
                      @click="showMore = true"
                    />
                </div>
              </div>
              <div v-if="showMore" class="filter-boxto">
                <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">结算状态</span>
                    <el-select
                      v-model="filter.state"
                      class="search-input"
                      placeholder="全部"
                      @change="search"
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
                    <span class="label-name">更新日期</span>
                    <el-date-picker
                      v-model="filter.filterTime"
                      type="daterange"
                      value-format="timestamp"
                      :clearable="isShowClear"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="changeTime"
                    />
                  </div>
                   <div class="form-item">
                    <span class="label-name">供药商名称</span>
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
                <div class="flex-box">
                    <img
                    class="expand-icon"
                    src="../../../assets/collapse.png"
                    alt=""
                    @click="showMore = false"
                    />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="work-data">
          <div class="work-data-l">
            <div class="item">
              <div class="settlement-1" />
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.settlementCountSum || '0' }}
                </div>
                <div class="data">总结算单</div>
              </div>
            </div>
            <div class="item">
              <div class="settlement-2" />
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.settledSum || '0' }}
                </div>
                <div class="data">已完成</div>
              </div>
            </div>
            <div class="item">
              <div class="settlement-3" />
              <div class="data-text">
                <div class="label">
                  {{ statisticsData.unsettledSum || '0' }}
                </div>
                <div class="data">待处理</div>
              </div>
            </div>
          </div>
          <div class="work-data-r">
            <div class="item">
              <div class="settlement-4" />
              <div class="data-text">
                <div class="label">
                  ￥{{ statisticsData.settlementPriceSum || '0' }}
                </div>
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
          <el-table v-loading="tableLoading" :data="orderList" class="table-large">
            <el-table-column label="结算单编号">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text mb-16">{{ scope.row.serialNumber || '-' }}</div>
                  <div v-if="scope.row.updator" class="gray">
                    完成人：{{ scope.row.updator || '-' }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="供应商信息">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text mb-16">ID:{{ scope.row.supplierCode || '-' }}</div>
                  <div class="gray">
                    {{ scope.row.supplierName || '-' }}
                  </div>
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
                  <div class="text">
                    <div v-if="scope.row.state === '已结算'" class="tag check">
                      已结算
                    </div>
                    <div v-else class="tag uncheck">待结算</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="更新时间">
              <template slot-scope="scope">
                <div class="message">
                  <div class="text">
                    {{ scope.row.updateTime | timeFormat('yyyy-MM-dd') }}
                  </div>
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
                  @click.native.prevent="lookDetails(scope.row.id, scope.row)"
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
import { getConfirmNumber } from '@/utils/common';
export default {
  name: 'SettleList',
  filters: {
    fliterSettle(type) {
      if (type === 0) {
        return '一口价';
      } else if (type === 1) {
        return '阶梯价';
      } else if (type === 2) {
        return '按保单';
      } else if (type === 3) {
        return '按区域';
      } else if (type === 4) {
        return '按订单价格';
      } else if (type === 5) {
        return '按药商结算';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      showMore: false,
      filter: {
        supplierCode: '',
        supplierId: '',
        serialNumber: '',
        accountPeriod: '',
        // updator: '',
        state: '',
        serviceId: '',
        serviceInfoId: '',
        settlementMethod: '', // 结算方式
        settlementForm: 2, // 结算类型
        settlementContent: '', // 结算内容
        filterTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      //   contentList: [{ specialColumnName: 1 }],
      statusList: [],
      dateList: [],
      orderList: [],
      supplierList: [],
      settleType: [
        { label: '一口价', value: '0' },
        { label: '阶梯价', value: '1' },
        { label: '按保单', value: '2' },
        { label: '按区域', value: '3' },
        { label: '按订单价格', value: '4' }
      ],
      serviceList: [],
      contentList: [],
      settlementFormList: [],
      statisticsData: {}
    };
  },
  computed: {
    btns() {
      return [
        { name: '全部', value: '' },
        {
          name: '待结算',
          value: 1012,
          isNumber: true,
          number: getConfirmNumber('SettleList') || 0
        },
        { name: '已结算', value: 1011 }
      ];
    },
    pageAuthority() {
      return this.$store.state.user.pageAuthority['120302'];
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
    this.getOption('settlementState');
    this.getOption('settlementContent');
    this.getOption('accountPeriod');
    this.getOption('settlementForm');
    this.getServiceList();
  },
  methods: {
    ...mapActions('drugManage', ['getSettleList', 'getSuppliersList']),
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
      vm.tableLoading = true;
      vm.getSettleList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.statisticsData = res.data.settlementCollectVO;
          vm.orderList = res.data.listRespPageableResp.records || [];
          vm.pagingOptions.total = res.data.listRespPageableResp.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    getSupplierList() {
      this.getSuppliersList().then(res => {
        this.supplierList = res.obj;
      });
    },
    lookDetails(id, row) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      if (row.policySettlementNo) {
        sessionStorage.setItem(
          'notSettlementPolicyNo',
          JSON.stringify(row.policySettlementNo),
        );
      }
      this.$router.push(`drug-dealer-settlement/detail/${id}`);
    },
    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        supplierCode: '',
        supplierId: '',
        serialNumber: '',
        accountPeriod: '',
        state: '',
        serviceId: '',
        serviceInfoId: '',
        settlementMethod: '', // 结算方式
        settlementForm: 2, // 结算类型
        settlementContent: '', // 结算内容
        filterTime: ''
      };
      this.getList();
    },
    getOption(code) {
      // 账期  结算状态
      this.$store
        .dispatch('app/getSysConfig', {
          code: code
        })
        .then(res => {
          switch (code) {
            case 'settlementState':
              this.statusList = res.obj || [];
              this.statusList.unshift({ name: '全部', id: '' });
              break;
            case 'settlementContent':
              this.contentList = res.obj;
              break;
            case 'settlementForm':
              this.settlementFormList = res.obj;
              break;
            default:
              this.dateList = res.obj || [];
              break;
          }
        });
    },
    getServiceList() {
      this.$store.dispatch('serviceItems/getServiceinfos').then(response => {
        this.serviceList = response.data || [];
      });
    },
    tabsChange(val) {
      this.filter.state = val;
      this.getList({
        pageNo: 1
      });
    },
    changeTime() {
      this.filter.filterTime[1] =
        this.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    toSettlementDetail() {
      this.$router.push({
        path: 'drug-dealer-settlement-details'
      });
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
      line-height: 12px;
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
}
</style>
