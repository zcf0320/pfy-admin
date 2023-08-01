<template>
  <div class="online-service-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            在线服务
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
                    @keyup.enter.native="getOnlineServiceList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">联系电话:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入联系电话"
                    class="search-input"
                    @keyup.enter.native="getOnlineServiceList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务项:</span>
                  <el-select
                    v-model="filter.serviceInfoId"
                    filterable
                    placeholder="全部"
                    @change="getOnlineServiceList({ page: 1 })"
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
                  @click.native.prevent="getOnlineServiceList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
              <!-- <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getOnlineServiceList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div> -->
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
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
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="onlineServiceList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.serialNumber || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务项">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceInfoName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
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
          @pagination="getOnlineServiceList"
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
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'OnlineService',
  components: { ExportDialog },
  data() {
    return {
      tableLoading: true,
      isShowClear: false,
      show: false,
      filter: {
        id: '',
        mobile: '',
        filterTime: '',
        serviceInfoId: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      onlineServiceList: [],
      serviceList: [],
      showExportDia: false,
      exportLoading: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 110105 在线服务
      return this.$store.state.user.pageAuthority['110105'];
    }
  },
  created() {
    const vm = this;
    vm.getOnlineServiceList();
    if (this.pageNum) {
      this.getOnlineServiceList({
        page: Number(this.pageNum)
      });
    } else {
      this.getOnlineServiceList({});
    }
    // 获取服务项
    vm.$store
      .dispatch('serviceItems/getServiceinfos', {
        pageNum: 1,
        pageSize: 10000
      })
      .then(response => {
        vm.serviceList = response.data;
      });
  },
  methods: {
    // 生成激活码
    addActivationCode() {},
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getOnlineServiceList({ page: 1 });
    },
    // 清除刷选项
    clearFilter() {
      this.filter = {
        id: '',
        mobile: '',
        filterTime: '',
        serviceInfoId: ''
      };
      this.getOnlineServiceList();
    },
    // 获取券码列表
    getOnlineServiceList(pageInfo) {
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
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }

      delete params.filterTime;

      vm.tableLoading = true;
      this.$store
        .dispatch('onlineService/getOnlineServiceList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.onlineServiceList = res.records;
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出
    exportList() {
      const vm = this;
      this.exportLoading = true;
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
      ExportApi.getOnlineServiceCount(params)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
            this.$store
              .dispatch('onlineService/exportOnlineService', params)
              .then(res => {
                this.exportLoading = false;
                if (!res.status) {
                  this.$message.warning(res.comment);
                  return;
                }
                window.location.href = res.url;
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
      params.email = email;
      this.$store
        .dispatch('onlineService/exportOnlineService', params)
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
      this.$router.push(`/operateManage/onlineService/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.online-service-page {
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
