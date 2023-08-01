<template>
  <div class="user-record-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">用户记录</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">名称:</span>
                  <el-input
                    v-model="filter.questionnaireName"
                    placeholder="请输入名称"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  class="mr-30"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">渠道名称:</span>
                <el-input
                  v-model="filter.channelName"
                  placeholder="请输入渠道名称"
                  class="search-input"
                  @keyup.enter.native="getList({ page: 1 })"
                />
              </div>
              <div class="form-item">
                <span class="label-name">服务来源:</span>
                <el-select v-model="filter.source" placeholder="全部" @change="getList({ page: 1 })">
                  <el-option label="内部生成" :value="0"/>
                  <el-option label="外部导入" :value="1"/>
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
                   @change="getList({ page: 1 })"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="goodList" class="table-large">
          <el-table-column label="ID">
            <template slot-scope="scope">
              <div>{{ scope.row.serialNumber || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <div>{{ scope.row.mobile || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="问卷名称">
            <template slot-scope="scope">
              <div>
                {{ scope.row.questionnaireName || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div>{{ scope.row.channelName || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="服务来源">
            <template slot-scope="scope">
              <div>{{ scope.row.source ? "外部导入" : "内部生成" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format("YYYY-MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row)"
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
export default {
  name: 'UserRecord',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      filter: {
        channelName: '',
        mobile: '',
        questionnaireName: '',
        filterTime: [],
        serialNumber: '',
        source: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      goodList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    if (this.pageNum) {
      this.filter.pageNum = this.pageNum;
      this.getList();
    } else {
      this.getList();
    }
  },
  methods: {
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize,
        startUpdateTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endUpdateTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] - 1000 + (3600 * 1000 * 24) : '',
        type: true
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store.dispatch('marketingTool/getUserRecordList', params).then(res => {
        vm.tableLoading = false;
        vm.goodList = res.records || [];
        vm.pagingOptions.total = res.totalNum;
      }).catch(() => {
        vm.tableLoading = false;
      });
    },
    // 查看详情
    lookDetails(row) {
      this.$router.push(`/marketingTool/userRecord/detail/${row.resultId}/${row.source}`);
    },
    clearFilter() {
      this.filter = {
        channelName: '',
        mobile: '',
        questionnaireName: '',
        filterTime: [],
        serialNumber: '',
        source: ''
      };
      this.getList({});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
