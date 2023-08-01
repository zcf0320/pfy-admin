<template>
  <div class="commodity-exchange-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            商品兑换
            <el-button
              v-if="pageAuthority.includes('export')"
              class="fr"
              type="primary"
              :loading="exportLoading"
              @click="exportList"
              >导出数据</el-button>
            <!-- <el-button
              v-if="pageAuthority.includes('export')"
              type="primary"
              class="fr"
              style="margin-right: 20px"
              @click="$router.push('/operateManage/glassesExport')"
            >
              老花镜数据导出
            </el-button> -->
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getCommodityExchangeList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">联系电话:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入联系电话"
                    class="search-input"
                    @keyup.enter.native="getCommodityExchangeList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务项:</span>
                  <el-select
                    v-model="filter.serviceInfoId"
                    filterable
                    placeholder="全部"
                    @change="getCommodityExchangeList({ page: 1 })"
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
                  @click.native.prevent="getCommodityExchangeList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">兑换类型:</span>
                <el-select
                  v-model="filter.types"
                  placeholder="全部"
                  @change="typesChange"
                >
                  <el-option label="虚拟商品" :value="0"/>
                  <el-option label="实物商品" :value="1"/>
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">创建时间:</span>
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
              <!-- <div class="form-item" v-if="filter.types">
                                <span class="label-name">状态:</span>
                                <el-select
                                    v-model="filter.state"
                                    placeholder="全部"
                                >
                                    <el-option
                                        label="待确认"
                                        :value="1"
                                    ></el-option>
                                    <el-option
                                        label="已发货"
                                        :value="2"
                                    ></el-option>
                                    <el-option
                                        label="已完成"
                                        :value="3"
                                    ></el-option>
                                </el-select>
                            </div> -->
            </div>
          </div>
        </div>
        <div class="tabs">
          <Tab
            v-if="filter.types"
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
        </div>
        <el-table
          v-loading="tableLoading"
          :data="commodityExchangeList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.serialNumber || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务项">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                v-if="scope.row.state"
                :class="['label-text', exchangeColumn[scope.row.state]]"
                >{{ exchangeState[scope.row.state] }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img"/>
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getCommodityExchangeList"
        />
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
import { underwriteStatus, exchangeColumn, exchangeState } from '@/utils/enum';
import { getConfirmNumber } from '@/utils/common';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'CommodityExchange',
  components: { ExportDialog },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        types: 1,
        serialNumber: '',
        mobile: '',
        serviceInfoId: '',
        filterTime: [],
        state: null
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      commodityExchangeList: [],
      underwriteStatus,
      claimResponsibilitys: [],
      claimResponsibilityObj: {},
      serviceList: [],
      exchangeState,
      exchangeColumn,
      showExportDia: false,
      exportLoading: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        { value: '', name: '全部' },
        {
          value: '1',
          name: '待确认',
          isNumber: true,
          number: getConfirmNumber('CommodityExchange') || 0
        },
        { value: '2', name: '已发货' },
        { value: '3', name: '已完成' }
      ];
    },
    pageAuthority() {
      // 110106 商品兑换
      return this.$store.state.user.pageAuthority['110106'];
    }
  },
  created() {
    this.getCommodityExchangeList();
    if (this.pageNum) {
      this.getCommodityExchangeList({
        page: Number(this.pageNum)
      });
    } else {
      this.getCommodityExchangeList({});
    }

    // 获取服务项
    this.$store.dispatch('serviceItems/getServiceinfos').then(response => {
      this.serviceList = response.data;
    });
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getCommodityExchangeList({ page: 1 });
    },
    // 兑换类型改变
    typesChange() {
      this.filter.state = null;
      this.getCommodityExchangeList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        types: 0,
        serialNumber: '',
        mobile: '',
        serviceInfoId: '',
        filterTime: [],
        state: null
      };
      this.getCommodityExchangeList();
    },
    // 获取商品兑换列表
    getCommodityExchangeList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      if (!params.types) {
        delete params.state;
      }
      for (const key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      vm.tableLoading = true;
      if (!vm.filter.types) {
        // 虚拟商品
        vm.$store
          .dispatch('commodityExchange/virtualList', params)
          .then(res => {
            vm.tableLoading = false;
            vm.commodityExchangeList = res.records || [];
            vm.pagingOptions.total = res.totalNum;
          })
          .catch(() => {
            vm.tableLoading = false;
          });
      } else {
        // 实物商品
        vm.$store
          .dispatch('commodityExchange/physicalList', params)
          .then(res => {
            vm.tableLoading = false;
            vm.commodityExchangeList = res.records || [];
            vm.pagingOptions.total = res.totalNum;
          })
          .catch(() => {
            vm.tableLoading = false;
          });
      }
    },
    // 导出
    exportList() {
      this.exportLoading = true;
      const vm = this;
      const params = {
        ...vm.filter,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      delete params.types;
      if (!vm.filter.types) {
        // 虚拟商品导出
        this.$store
          .dispatch(
            'commodityExchange/queryAndExportVirtualCommodityExchange',
            params
          )
          .then(res => {
            window.location.href = res.url;
          }).catch(() => {
             this.exportLoading = false;
          });
      } else {
        // 实物商品导出
        ExportApi.getCommodityExchangeCount(params)
          .then(res => {
            if (res.data >= this.$enums.exportEmailNum) {
              this.showExportDia = true;
              this.exportLoading = false;
            } else {
              this.$store
                .dispatch(
                  'commodityExchange/queryAndExportPhysicalCommodityExchange',
                  params
                )
                .then(res => {
                  this.exportLoading = false;

                  window.location.href = res.url;
                }).catch(() => {
                     this.exportLoading = false;
                });
            }
          })
          .catch(() => {
            this.exportLoading = false;
          });
      }
    },
    // 确认邮箱导出
    sureExport(email) {
      const vm = this;
      const params = {
        ...vm.filter,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      delete params.types;
      params.email = email;
      this.$store
        .dispatch(
          'commodityExchange/queryAndExportPhysicalCommodityExchange',
          params
        )
        .then(res => {
            this.$message.success(res.comment);
            this.showExportDia = false;
        });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(
        `/operateManage/commodityExchange/details/${id}/${this.filter.types}`
      );
    },
    // 状态切换
    handleClick(state) {
      this.filter.state = state;
      this.getCommodityExchangeList({
        page: 1
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.commodity-exchange-page {
  width: 100%;
  width: 100%;
  .operation-buttons {
    margin-bottom: 24px;
    .el-button {
      margin-right: 24px;
    }
    .el-select {
      margin-right: 24px;
    }
  }
}
</style>
