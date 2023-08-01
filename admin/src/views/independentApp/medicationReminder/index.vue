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
          <div class="title-top">使用记录</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getList"
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
                <div class="form-item">
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="changeCode"
                  />
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
                  <span class="label-name">使用时间</span>
                  <el-date-picker
                    v-model="filterTimeUpdate"
                    type="daterange"
                    value-format="yyyy-MM-dd"
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
        <el-table v-loading="tableLoading" :data="dataList" class="table-large">
          <el-table-column label="ID">
            <template slot-scope="scope">
              <div>
                {{ scope.row.serialNumber || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道ID">
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
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.useTime
                    ? $moment(scope.row.useTime).format('YYYY-MM-DD')
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
          @pagination="getList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import useRecord from '@/api/useRecord';
export default {
  name: 'MedicationReminder',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      filter: {
        serialNumber: '',
        channelCode: '',
        mobile: '',
        diseaseCourse: '',
        beginTime: '',
        endTime: ''
      },
      filterTimeUpdate: [],
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
      this.filter.beginTime = this.filterTimeUpdate[0];
      this.filter.endTime = this.filterTimeUpdate[1];
      this.getList();
    },
    changeCode(val) {
      this.filter.channelCode = val;
      this.getList();
    },
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }

      delete params.filterTimeUpdate;
      this.tableLoading = true;
      useRecord
        .getMedicationPlanList(params)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.records || [];
          this.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(
        `/independent-application/medication-reminder/detail/${id}`,
      );
    },
    clearFilter() {
      this.filter = {
        serialNumber: '',
        channelCode: '',
        mobile: '',
        diseaseCourse: '',
        filterTimeUpdate: [],
        endTime: ''
      };
      this.getList({ page: 1 });
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
