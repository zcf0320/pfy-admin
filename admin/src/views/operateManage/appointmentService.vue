<template>
  <div class="appointment-service-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">
          预约服务
          <el-dropdown class="fr"  v-if="pageAuthority.includes('export')" @command="exportList2">
                <el-button type="primary">
                  导出<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">预约记录</el-dropdown-item>
                  <el-dropdown-item command="1">重疾绿通-门诊</el-dropdown-item>
                  <el-dropdown-item command="2">重疾绿通-手术住院</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

          <el-button
            v-if="pageAuthority.includes('add')"
            type="primary"
            class="fr mr-30"
            @click="toggleModal"
          >
            新增企业预约
          </el-button>
       </div>
        <div class="filter-box">
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">预约ID:</span>
                <el-input
                  v-model="filter.serialNumber"
                  placeholder="请输入预约ID"
                  class="search-input"
                  @keyup.enter.native="getAppointmentServiceList({ page: 1 })"
                />
              </div>
              <div class="form-item">
                <span class="label-name">服务项:</span>
                <el-select
                  v-model="filter.serviceId"
                  filterable
                  placeholder="全部"
                  @change="getAppointmentServiceList({ page: 1 })"
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
                <span class="label-name">预约类型:</span>
                <el-select
                  v-model="filter.type"
                  placeholder="全部"
                  @change="getAppointmentServiceList({ page: 1 })"
                >
                  <el-option label="个人" value="0" />
                  <el-option label="企业" value="1" />
                </el-select>
              </div>
            </div>
            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search"
                class="mr-30"
                @click.native.prevent="getAppointmentServiceList({ page: 1 })"
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
                <span class="label-name">联系电话:</span>
                <el-input
                  v-model="filter.mobile"
                  placeholder="请输入联系电话"
                  class="search-input"
                  @keyup.enter.native="getAppointmentServiceList({ page: 1 })"
                />
              </div>
              <div class="form-item">
                <span class="label-name">申请时间:</span>
                <el-date-picker
                  v-model="filter.createTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="isShowClear"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeCreateTime"
                />
              </div>
              <div class="form-item">
                <span class="label-name">更新时间:</span>
                <el-date-picker
                  v-model="filter.updateTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="isShowClear"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeUpdateTime"
                />
              </div>
            </div>

          </div>
        </div>
        <div class="tabs">
          <Tab
            :current-key="filter.state !== null ? String(filter.state) : null"
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
        </div>
        <el-table
          v-loading="tableLoading"
          :data="appointmentServiceList"
          class="table-large"
        >
          <el-table-column label="预约ID">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.serialNumber || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="服务信息">
            <template slot-scope="scope">
              <div class="box">
                <div class="mb-16">{{ scope.row.serviceName }}</div>
                <div class="insurance-name">
                  {{ scope.row.insuranceProductName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="预约类型">
            <template slot-scope="scope">
              <div class="box">{{ appointmentType[scope.row.type] || '个人' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.mobile }}</div>
            </template>
          </el-table-column>
          <el-table-column label="申请时间">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.createTime | timeFormat('yyyy-MM-dd') }}</div>
            </template>
          </el-table-column>
          <el-table-column label="预约状态">
            <template slot-scope="scope">
                <div class="box mb-16">
              <span
                :class="
                  'label-text ' + columnAppointmentStatus[scope.row.state]
                "
                >{{ scope.row.state | companyStatusFilter }}</span
              >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
            <div class="box">{{ scope.row.updateTime | timeFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="76">
            <template slot-scope="scope">
                <div class="box mb-16">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="查看"
                tip-class-name="icon-detail"
                @click.native.prevent="
                  lookDetails(scope.row.id, scope.row.type)
                "
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
          @pagination="getAppointmentServiceList"
        />
      </el-scrollbar>
    </el-container>
    <CreateAppointmentModal
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
import CreateAppointmentModal from './component/createAppointment';
import { appointmentType, columnAppointmentStatus } from '@/utils/enum';
import { getConfirmNumber } from '@/utils/common';
import { exportMajorDisease } from '@/api/appointmentService';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'AppointmentService',
  components: {
    CreateAppointmentModal,
    ExportDialog
  },
  filters: {
    companyStatusFilter(val) {
      if (val === 0) {
        return '成功';
      } else if (val === 1) {
        return '待确认';
      } else if (val === 2) {
        return '失败';
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        serviceId: '',
        serialNumber: '',
        mobile: '',
        filterTime: '',
        type: '',
        state: '',
        createTime: '',
        updateTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      serviceList: [],
      appointmentStatus: [],
      appointmentServiceList: [],
      appointmentType,
      columnAppointmentStatus,
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
          number: getConfirmNumber('AppointmentService') || 0
        },
        { value: '0', name: '预约成功' },
        { value: '2', name: '预约失败' }
      ];
    },
    pageAuthority() {
      // 110104 预约服务
      return this.$store.state.user.pageAuthority['110104'];
    }
  },
  created() {
    // 获取服务项
    this.$store.dispatch('serviceItems/getServiceinfos').then(response => {
      this.serviceList = response.data;
    });
    // 获取预约列表
    if (this.pageNum) {
      this.getAppointmentServiceList({
        page: Number(this.pageNum)
      });
    } else {
      this.getAppointmentServiceList({});
    }
  },
  methods: {
    // 筛选创建时间
    changeCreateTime() {
      const vm = this;
      vm.filter.createTime[1] =
        vm.filter.createTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getAppointmentServiceList({ page: 1 });
    },
    // 筛选更新时间
    changeUpdateTime() {
      const vm = this;
      vm.filter.updateTime[1] =
        vm.filter.updateTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getAppointmentServiceList({ page: 1 });
    },
    // 清除查询条件
    clearFilter() {
      this.filter = {
        serviceId: '',
        serialNumber: '',
        mobile: '',
        filterTime: '',
        type: '',
        state: '',
        createTime: '',
        updateTime: ''
      };
      this.getAppointmentServiceList();
    },
    // 获取预约列表
    getAppointmentServiceList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: 10,
        createStartTime: vm.filter.createTime.length
          ? vm.filter.createTime[0]
          : '',
        createEndTime: vm.filter.createTime.length
          ? vm.filter.createTime[1]
          : '',
        updateStartTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[0]
          : '',
        updateEndTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[1]
          : ''
      };

      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('appointmentService/getAppointmentServiceList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.appointmentServiceList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => [(vm.tableLoading = false)]);
    },
    // 导出
    exportList() {
      const vm = this;
      const params = {
        ...vm.filter,
        createStartTime: vm.filter.createTime.length
          ? vm.filter.createTime[0]
          : '',
        createEndTime: vm.filter.createTime.length
          ? vm.filter.createTime[1]
          : '',
        updateStartTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[0]
          : '',
        updateEndTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[1]
          : ''
      };

      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      ExportApi.getReverseListCount(params)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
            this.$store
              .dispatch('appointmentService/exportAppointment', params)
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
        createStartTime: vm.filter.createTime.length
          ? vm.filter.createTime[0]
          : '',
        createEndTime: vm.filter.createTime.length
          ? vm.filter.createTime[1]
          : '',
        updateStartTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[0]
          : '',
        updateEndTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[1]
          : ''
      };

      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      params.email = email;
      this.$store
        .dispatch('appointmentService/exportAppointment', params)
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
    // 企业预约保存
    save() {
      this.toggleModal();
      this.getAppointmentServiceList();
    },
    lookDetails(id, type) {
      this.$router.push(
        `/operateManage/appointmentService/details/${id}/${type}`,
      );
    },
    // 状态切换
    handleClick(state) {
      this.filter.state = state;
      this.getAppointmentServiceList({
        page: 1
      });
    },
    exportList2(command) {
        if (command === '0') {
            this.exportList();
            return;
        }
      const params = {
        exportType: command,
        ...this.filter
      };
      exportMajorDisease(params).then(res => {
        const blob = new Blob([res.data], { type: 'application/zip' });
        const element = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        element.href = href;
        element.setAttribute('target', '_blank');
        document.body.appendChild(element);
        element.click();
        window.URL.revokeObjectURL(href);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.appointment-service-page {
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
  .insurance-name {
    font-size: 14px;
    font-weight: 400;
    color: #6f7293;
  }
  .box{
    height: 60px;
  }
}
</style>
