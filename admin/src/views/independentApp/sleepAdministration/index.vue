<template>
  <div class="settlement">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">CBTI睡眠管理</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID</span>
                  <el-input
                    v-model="filter.userId"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">姓名</span>
                  <el-input
                    v-model="filter.userName"
                    placeholder="请输入姓名"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">性别</span>
                  <el-select
                    v-model="filter.sex"
                    class="search-input"
                    placeholder="全部"
                    @change="getList"
                  >
                    <el-option label="男" :value="1"/>
                    <el-option label="女" :value="0"/>
                  </el-select>
                </div>
              </div>
               <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList"
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
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="change"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">使用时间</span>
                  <el-date-picker
                    v-model="filter.filterTimeUpdate"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTime"
                  />
                </div>
                  <div class="form-item">
                  <span class="label-name">手机号码</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号码"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="dataList"
          class="table table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <div>
                {{ scope.row.userId || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道ID" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                {{ scope.row.channelCode || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div>
                {{ scope.row.channelName || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <div>
                {{ scope.row.mobile || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <div>
                {{ scope.row.userName || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <div>
                {{ scope.row.sex | sexFomet }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.registerDate
                    ? $moment(scope.row.registerDate).format('YYYY-MM-DD')
                    : '-'
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.userId)"
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
          @pagination="getList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import useRecord from '@/api/useRecord';
export default {
  name: 'SleepAdministration',
  filters: {
    sexFomet(val) {
      if (val === 0) {
        return '女';
      } else if (val === 1) {
        return '男';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      filter: {
        userId: '',
        userName: '',
        mobile: '',
        sex: '',
        channelCode: '',
        channelName: '',
        filterTimeUpdate: [],
        startTime: '',
        endTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      dataList: []
    };
  },
  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      pageNo: Number(pageNo)
    });
  },
  methods: {
    // 修改筛选时间
    changeTime() {
      this.filter.startTime = this.filter.filterTimeUpdate[0];
      this.filter.endTime = this.filter.filterTimeUpdate[1];
      this.getList();
    },
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
      useRecord
        .getSleepManageList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.dataList = res.data.records || [];
          vm.pagingOptions.total = res.data.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(
        `/independent-application/sleep-administration/detail/${id}`
      );
    },
    clearFilter() {
      this.filter = {
        userId: '',
        userName: '',
        mobile: '',
        sex: '',
        channelCode: '',
        channelName: '',
        filterTimeUpdate: [],
        startTime: '',
        endTime: ''
      };
      this.getList({ page: 1 });
    },
    change(val) {
      this.filter.channelCode = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  width: 100%;
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
  .table {
    .message {
      display: flex;
      justify-content: space-around;
      flex-direction: column;

      .text {
        color: #464668;
        margin: 0 0 12px;
        &:first-child {
          color: #333333;
        }
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
  }
}
</style>
