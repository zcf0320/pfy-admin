<template>
  <div class="active-code-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            券码管理
            <el-button
              v-if="pageAuthority.includes('export')"
              class="fr"
              type="primary"
              :loading="exportLoading"
              @click="exportList"
              >导出数据</el-button>
            <el-button
              v-if="pageAuthority.includes('add')"
              class="export-button fr mr-30"
              @click="toggleModal"
              >生成激活码</el-button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">激活码:</span>
                  <el-input
                    v-model="filter.activeCode"
                    placeholder="请输入激活码"
                    class="search-input"
                    @keyup.enter.native="getActiveCodeList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">批次:</span>
                  <el-input
                    v-model="filter.codeBatch"
                    placeholder="请输入批次"
                    class="search-input"
                    @keyup.enter.native="getActiveCodeList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务包:</span>
                  <el-select
                    v-model="filter.servicePackageInfoId"
                    placeholder="全部"
                    filterable
                    @change="getActiveCodeList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in servicePackageList"
                      :key="item.id"
                      :label="item.packageName"
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
                  @click.native.prevent="getActiveCodeList({ page: 1 })"
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
                <span class="label-name">状态:</span>
                <el-select
                  v-model="filter.codeStatus"
                  class="search-input"
                  @change="getActiveCodeList({ page: 1 })"
                  placeholder="全部"
                >
                  <el-option label="可用" value="0"/>
                  <el-option label="过期" value="1"/>
                  <el-option label="作废" value="2"/>
                  <el-option label="已使用" value="3"/>
                  <el-option label="不存在" value="4"/>
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">生成时间:</span>
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
                <span class="label-name">渠道名称:</span>
                <el-select
                  v-model="filter.serviceChanelId"
                  placeholder="全部"
                  filterable
                  @change="getActiveCodeList({ page: 1 })"
                >
                  <el-option
                    v-for="item in channelList"
                    :key="item.id"
                    :label="item.chanelName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          class="m-t-24 p-l-24 table-large"
          :data="activeCodeList"
        >
          <el-table-column label="服务包信息">
            <template slot-scope="scope">
                <div class="box">
              <div class="mb-16">{{ scope.row.servicePackageCode }}</div>
              <div class="grey">{{ scope.row.servicePackageName }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道信息">
            <template slot-scope="scope">
                  <div class="box">
              <div class="mb-16">{{ scope.row.channelCode }}</div>
              <div class="grey">{{ scope.row.channelName }}</div>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="激活码">
            <template slot-scope="scope">
                  <div class="box">
              <div class="mb-16">{{ scope.row.activeCode || '-' }}</div>
              <div class="grey">
                生成时间：{{ scope.row.createTime | timeFormat('yyyy-MM-dd') }}
              </div>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="批次">
            <template slot-scope="scope">
                  <div class="box">
              <div class="mb-16">{{ scope.row.codeBatch }}</div>
              <div class="grey">操作人：{{ scope.row.creator || '-' }}</div>
                  </div>
            </template>
          </el-table-column>
          <el-table-column
            label="关联企业"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="box">{{ scope.row.customerCompanyName || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
                  <div class="box">
              <span
                :class="'label-text ' + columnCodeStatus[scope.row.codeStatus]"
                >{{ activeCodeStatus[scope.row.codeStatus] }}</span>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                  <div class="box">
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
          @pagination="getActiveCodeList"
        />
      </el-scrollbar>
    </el-container>
    <CreateActiveCodeModal
      v-if="show"
      :is-show="show"
      @close="toggleModal"
      @save="save"
    />
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
import CreateActiveCodeModal from './component/createActiveCodeModal';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
import {
  appointmentType,
  activeCodeStatus,
  columnCodeStatus
} from '@/utils/enum';
export default {
  name: 'ActiveCodeManage',
  components: {
    CreateActiveCodeModal,
    ExportDialog
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        activeCode: '',
        codeBatch: this.$route.query.codeBatch || '',
        codeStatus: '',
        filterTime: '',
        codeType: '',
        servicePackageInfoId: '',
        serviceChanelId: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      servicePackageList: [],
      appointmentType,
      activeCodeStatus,
      activeCodeList: [],
      columnCodeStatus,
      channelList: [],
      showExportDia: false,
      exportLoading: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 110202 券码管理
      return this.$store.state.user.pageAuthority['110202'];
    }
  },
  created() {
    const vm = this;
    vm.getServicePackageList();
    vm.getActiveCodeList();
    if (this.pageNum) {
      this.getActiveCodeList({
        page: Number(this.pageNum)
      });
    } else {
      this.getActiveCodeList({});
    }
    this.getChannelList();
  },
  methods: {
    // 服务包列表
    getServicePackageList() {
      const vm = this;
      vm.$store
        .dispatch('servicePackage/getServicePackageList', {
          pageNum: 1,
          pageSize: 10000
        })
        .then(res => {
          vm.servicePackageList = res.records;
        });
    },
    // 生成激活码
    addActivationCode() {},
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getActiveCodeList({ page: 1 });
    },
    // 清空查询条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        activeCode: '',
        codeBatch: '',
        codeStatus: '',
        filterTime: '',
        codeType: '',
        servicePackageInfoId: '',
        serviceChanelId: ''
      };
      vm.getActiveCodeList();
    },
    // 获取券码列表
    getActiveCodeList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      this.$store
        .dispatch('activeCodeManage/getActiveCodeList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.activeCodeList = res.records;
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
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      ExportApi.getActiveCodeCount(params)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
            this.$store
              .dispatch('activeCodeManage/exportActiveCode', params)
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
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      params.email = email;
      this.$store
        .dispatch('activeCodeManage/exportActiveCode', params)
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
    // 弹框切换开关
    toggleModal() {
      this.show = !this.show;
    },
    // 生成激活码确定
    save() {
      this.getActiveCodeList();
      this.toggleModal();
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/projectManage/activeCodeManage/details/${id}`);
    },
    // 获取渠道列表
    getChannelList() {
      const params = {
        pageNum: 1,
        pageSize: 999
      };
      this.$store.dispatch('channelManage/getChannelList', params).then(res => {
        this.channelList = res.records || [];
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.active-code-manage-page {
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
  .box{
    height: 50px;
  }
  .grey {
    color: #989ab3;
  }
}
</style>
