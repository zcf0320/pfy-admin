<template>
  <div class="underwrite-page">
    <el-container>
      <el-main>
        <div class="filter-box">
          <div class="search-form">
            <div class="form-item v-middle">
              <span>ID:</span>
              <el-input
                v-model="filter.id"
                placeholder="请输入ID"
                class="search-input"
              />
            </div>
            <div class="form-item v-middle">
              <span>投保人:</span>
              <el-input
                v-model="filter.policyHolderName"
                placeholder="请输入投保人"
                class="search-input"
              />
            </div>
            <div class="form-item v-middle">
              <span>手机号:</span>
              <el-input
                v-model="filter.policyHolderMobile"
                placeholder="请输入手机号"
                class="search-input"
              />
            </div>
            <div class="form-item v-middle">
              <span>方案:</span>
              <el-input
                v-model="filter.plan"
                placeholder="请输入方案"
                class="search-input"
              />
            </div>
            <div class="form-item v-middle">
              <span>状态:</span>
              <el-select
                v-model="filter.state"
                class="search-input"
                placeholder="全部"
              >
                <el-option label="待审核" :value="1" />
                <el-option label="可投保" :value="2" />
                <el-option label="不可投保" :value="3" />
              </el-select>
            </div>
            <div class="form-item v-middle">
              <span>生成时间:</span>
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
        <el-row class="operation-buttons">
          <el-button
            type="primary"
            @click.native.prevent="getUnderwrite({ page: 1 })"
            >查询</el-button>
          <el-button
class="export-button"
@click.native.prevent="exportList"
>导出数据</el-button>
          <el-button
class="clear"
@click.native.prevent="clearFilter"
>清除查询条件</el-button>
        </el-row>
        <el-table v-loading="tableLoading" :data="claimsList">
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投保人">
            <template slot-scope="scope">
              <span>{{ scope.row.policyHolderName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.policyHolderMobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="方案">
            <template slot-scope="scope">
              <span>{{ scope.row.plan || '-' }}</span>
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
              <span>{{ underwriteStatus[scope.row.state] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="76">
            <template slot-scope="scope">
              <span
class="primary pointer"
@click="lookDetails(scope.row.id)"
>查看</span>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getUnderwrite"
        />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { underwriteStatus } from '@/utils/enum';
export default {
  name: 'Underwrite',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        id: '',
        policyHolderName: '',
        policyHolderMobile: '',
        plan: '',
        state: '',
        filterTime: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      claimsList: [],
      underwriteStatus,
      claimResponsibilitys: [],
      claimResponsibilityObj: {}
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getUnderwrite();
    if (this.pageNum) {
      this.getUnderwrite({
        page: Number(this.pageNum)
      });
    } else {
      this.getUnderwrite({});
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
        policyHolderName: '',
        policyHolderMobile: '',
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
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
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
        .dispatch('underwrite/getUnderwrite', params)
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
      this.$store.dispatch('underwrite/export', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/insuranceManage/underwrite/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.underwrite-page {
  width: 100%;
  width: 100%;
  .filter-box {
    width: 100%;
    position: relative;
    .search-form {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .form-item {
        display: flex;
        align-items: center;
        margin: 0 24px 24px 0;
        span {
          display: inline-block;
          min-width: 100px;
          color: #555;
          font-size: 14px;
        }
        .search-input {
          width: 200px;
        }
      }
      .add-button {
        position: absolute;
        right: 0;
      }
    }
  }
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
