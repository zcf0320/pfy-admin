<template>
  <div class="log-manage">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="card">
          <div class="filter-form">
            <div class="title-top">
              日志中心
            </div>
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">发生时间</span>
                    <el-date-picker
                      v-model="createTime"
                      type="daterange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="changeCreateTime"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">操作账号</span>
                    <el-input
                      v-model="filter.creator"
                      placeholder="请输入操作账号"
                      class="search-input"
                      @keyup.enter.native="search"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">IP</span>
                    <el-input
                      v-model="filter.ip"
                      placeholder="请输入IP"
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
                    <span class="label-name">动作</span>
                    <el-select
                      v-model="filter.operation"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in operationList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">项目</span>
                    <el-select
                      v-model="filter.type"
                      class="search-input"
                      placeholder="全部"
                      filterable
                      @change="search"
                    >
                      <el-option
                        v-for="item in typeList"
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
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <el-table v-loading="tableLoading" :data="logList" class="table">
            <el-table-column label="发生时间" prop="createTime">
            </el-table-column>
            <el-table-column label="操作账号" prop="creator"> </el-table-column>
            <el-table-column label="IP" prop="ip"> </el-table-column>
            <el-table-column label="动作" prop="operationText">
            </el-table-column>
            <el-table-column label="项目" prop="typeText"> </el-table-column>
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
import { getLogList, getOperationList, getTypeSelect } from '@/api/logCenter';
export default {
  name: 'log-manage',

  data() {
    return {
      tableLoading: false,
      filter: {
        startTime: '',
        endTime: '',
        ip: '',
        operation: '',
        creator: '',
        type: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      createTime: '',
      logList: [],
      operationList: [],
      typeList: []
    };
  },

  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      pageNo: Number(pageNo)
    });
    getOperationList().then(res => {
      this.operationList = res.data;
    });
    getTypeSelect().then(res => {
      this.typeList = res.data;
    });
  },
  methods: {
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      this.tableLoading = true;
      getLogList(params).then(res => {
        this.tableLoading = false;
        this.logList = res.data.records || [];
        this.pagingOptions.total = res.data.total | 0;
      });
    },

    search() {
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.filter = {
        startTime: '',
        endTime: '',
        ip: '',
        operation: '',
        creator: '',
        type: ''
      };
      this.createTime = '';
      this.getList();
    },
    changeCreateTime() {
      this.filter.startTime = this.createTime[0];
      this.filter.endTime = this.createTime[1];
      this.getList({ page: 1 });
    }
  }
};
</script>

<style lang="scss" scoped>
.log-manage {
  width: 100%;
  width: 100%;
  .card {
    background: #fff;
    margin-bottom: 24px;
    &:last-child {
      padding: 30px;
    }
  }

  .clear {
    color: #ff625e;
    border-color: #ff625e;
    &:hover {
      background-color: #ffefef;
    }
  }
  .table {
    min-height: 350px;
  }

  .title-btn {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
