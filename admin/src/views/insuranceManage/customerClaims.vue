<template>
  <div class="customer-claims-page">
    <el-container>
      <el-main>
        <div class="filter-form">
          <div class="title-top">
            客户理赔<button
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
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入ID"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">被保险人姓名:</span>
                  <el-input
                    v-model="filter.username"
                    placeholder="请输入被保险人姓名"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getClaimsList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
              <div class="search-form">
                <div class="form-item">
                  <span class="label-name">赔偿责任:</span>
                  <el-select
                    v-model="filter.guaranteeResponsibility"
                    class="search-input"
                    filterable
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in claimResponsibilitys"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">状态:</span>
                  <el-select
                    v-model="filter.state"
                    class="search-input"
                    placeholder="全部"
                  >
                    <el-option label="成功" :value="0" />
                    <el-option label="待审核" :value="1" />
                    <el-option label="失败" :value="2" />
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
              </div>
            </div>
          </div>
        </div>
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
          <el-table-column label="被保险人姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.userName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="赔偿责任">
            <template slot-scope="scope">
              <span>{{
                claimResponsibilityObj[scope.row.guaranteeResponsibility] || '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :class="'label-text ' + columnReviewStatus[scope.row.state]"
                >{{ reviewStatus[scope.row.state] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getClaimsList"
        />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { reviewStatus, columnReviewStatus } from '@/utils/enum';
export default {
  name: 'ContentManage',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        id: '',
        username: '',
        mobile: '',
        guaranteeResponsibility: '',
        state: '',
        filterTime: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      claimsList: [],
      reviewStatus,
      claimResponsibilitys: [],
      claimResponsibilityObj: {},
      columnReviewStatus
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getClaimsList();
    if (this.pageNum) {
      this.getClaimsList({
        page: Number(this.pageNum)
      });
    } else {
      this.getClaimsList({});
    }
    // 赔偿责任
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'claimResponsibility'
      })
      .then(res => {
        this.claimResponsibilitys = res.obj || [];
        res.obj.forEach(item => {
          this.claimResponsibilityObj[item.id] = item.name;
        });
      });
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        id: '',
        username: '',
        mobile: '',
        guaranteeResponsibility: '',
        state: '',
        filterTime: ''
      };
      this.getClaimsList();
    },
    // 获取理赔列表
    getClaimsList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        updateStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        updateEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
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
        .dispatch('claims/getClaimsList', params)
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
        updateStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        updateEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      this.$store.dispatch('claims/export', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/insuranceManage/customerClaims/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.customer-claims-page {
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
