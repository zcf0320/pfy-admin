<template>
  <div class="insurance-record-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            个险投保
            <el-button
              v-if="pageAuthority.includes('export')"
              class="fr"
              type="primary"
              :loading="exportLoading"
              @click="exportList"
              >导出数据</el-button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getUnderwrite({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">投保人:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入投保人"
                    class="search-input"
                    @keyup.enter.native="getUnderwrite({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                    @keyup.enter.native="getUnderwrite({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getUnderwrite({ page: 1 })"
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
                <span class="label-name">保险产品:</span>
                <el-select
                  v-model="filter.insuranceProductId"
                  filterable
                  placeholder="全部"
                  @change="getUnderwrite({ page: 1 })"
                >
                  <el-option
                    v-for="item in insuranceProducts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">更新时间:</span>
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
            </div>
          </div>
        </div>
        <Tab
          :btns="btns"
          :btn-style="{ overflow: 'visible' }"
          :current-key="filter.state"
          @change="tabsChange"
        />
        <el-table
          v-loading="tableLoading"
          :data="claimsList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投保人">
            <template slot-scope="scope">
              <span>{{ scope.row.name || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保险产品">
            <template slot-scope="scope">
              <span>{{ scope.row.insuranceProductName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="{ row }">
              <span>{{ row.updateTime | timeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :class="'label-text ' + columnUnderwriteStatus[scope.row.state]"
                >{{ underwriteStatus[scope.row.state] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="{ row }">
              <HoverTip
                v-if="
                  (row.state == 0 && pageAuthority.includes('review')) ||
                    (row.state != 0 && pageAuthority.includes('detail'))
                "
                :content="row.state == 0 ? '去审核' : '查看'"
                :tip-class-name="row.state == 0 ? 'icon-claim' : 'icon-detail'"
                class="mr-30"
                @click.native.prevent="lookDetails(row.id)"
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
          @pagination="getUnderwrite"
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
import { underwriteStatus, columnUnderwriteStatus } from '@/utils/enum';
import { getConfirmNumber } from '@/utils/common';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'Underwrite',
  components: { ExportDialog },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        id: '',
        name: '',
        mobile: '',
        plan: '',
        state: '',
        insuranceProductId: '',
        filterTime: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      claimsList: [],
      underwriteStatus,
      columnUnderwriteStatus,
      claimResponsibilitys: [],
      claimResponsibilityObj: {},
      insuranceProducts: [],
      showExportDia: false,
      exportLoading: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 170201 个险投保记录
      return this.$store.state.user.pageAuthority['170201'];
    },
    btns() {
      return [
        { name: '全部', value: '' },
        {
          name: '待审核',
          value: '0',
          isNumber: true,
          number: getConfirmNumber('PersonalInsuranceRecord') || 0
        },
        { name: '正常可投保', value: '1' },
        { name: '加费可投保', value: '3' },
        { name: '除外可投保', value: '4' },
        { name: '不可投保', value: '2' }
      ];
    }
  },
  created() {
    this.getInsuranceProducts();
    if (this.$isNotEmpty(this.$route.query)) {
      this.$copyProps(this.filter, this.$route.query);
      this.changeTime();
    }
    if (this.pageNum) {
      this.getUnderwrite({
        page: Number(this.pageNum)
      });
    } else {
      this.getUnderwrite({});
    }
  },
  methods: {
    // 获取保险产品列表
    getInsuranceProducts() {
      this.$store
        .dispatch('insuranceProducts/getProdList')
        .then(res => {
          this.insuranceProducts = res.data || [];
        });
    },
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        Number(vm.filter.filterTime[1]) + 3600 * 24 * 1000 - 1000;
      this.getUnderwrite({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        id: '',
        name: '',
        mobile: '',
        plan: '',
        state: '',
        filterTime: []
      };
      this.getUnderwrite();
    },
    // 获取核保列表
    getUnderwrite(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startTime: vm.filter.filterTime.length
          ? Number(vm.filter.filterTime[0])
          : '',
        endTime: vm.filter.filterTime.length
          ? Number(vm.filter.filterTime[1])
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('personalInsuranceRecord/getRecordList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.claimsList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出
    exportList() {
      const vm = this;
      const params = {
        ...vm.filter,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      ExportApi.getSingleInsuranceCount(params)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
            this.$store
              .dispatch('personalInsuranceRecord/export', params)
              .then(res => {
                this.exportLoading = false;
                window.open(res.url, '_blank');
              });
          }
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    // 确认邮箱导出
    sureExport(email) {
      const vm = this;
      const params = {
        ...vm.filter,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      params.email = email;
      this.$store
        .dispatch('personalInsuranceRecord/export', params)
        .then(res => {
          if (!res.status) {
            this.$message.warning(res.comment);
            return;
          } else {
            this.$message.success(res.comment);
            this.showExportDia = false;
          }
        });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(
        `/insuranceRecord/personalInsuranceRecord/details/${id}`
      );
    },
    tabsChange(val) {
      this.filter.state = val;
      this.pagingOptions.pageNo = 1;
      this.getUnderwrite({
        page: 1
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-record-page {
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
}
</style>
