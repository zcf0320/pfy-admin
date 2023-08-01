<template>
  <div class="use-records-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">使用记录</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号码:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号码"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">性别:</span>
                  <el-select
                    v-model="filter.sex"
                    placeholder="全部"
                    @change="loadData({ page: 1 })"
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
                  @click.native.prevent="loadData({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">年龄:</span>
                  <el-input
                    v-model="filter.age"
                    placeholder="请输入年龄"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">使用时间:</span>
                  <el-date-picker
                    v-model="filterTime"
                    style="width: 240px"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTime"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="change"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="recordsList"
          class="table-large"
        >
          <el-table-column label="ID" prop="id"/>

          <el-table-column label="手机号码" prop="mobile"/>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age"/>
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.checkTime).format("YYYY-MM-DD HH:mm")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称" prop="channelName"/>
          <el-table-column label="渠道ID" prop="channelCode"/>
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
          <div slot="empty" class="empty-img"/>
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="loadData"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import skinTest from '@/api/skinTest';
export default {
  name: 'SkinTestRecords',
  data() {
    return {
      filter: {
        mobile: '',
        id: '',
        startDate: '',
        endDate: '',
        sex: '',
        age: '',
        pageSize: 10,
        pageNum: 1,
        channelCode: ''
      },
      filterTime: [],
      recordsList: [],
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      }
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData(pageInfo) {
      this.tableLoading = true;
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
      skinTest
        .getSkinTestList(params)
        .then((res) => {
          this.recordsList = res.data.records || [];
          this.pagingOptions.total = res.data.totalNum;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 清除筛选条件
    clearFilter() {
      this.filter = {
        mobile: '',
        id: '',
        startDate: '',
        endDate: '',
        age: '',
        sex: '',
        pageNum: 1,
        pageSize: 10
      };
      this.filterTime = [];
      this.loadData({ page: 1 });
    },
    changeTime() {
      this.filter.startDate = this.filterTime[0];
      this.filter.endDate = this.filterTime[1];
      this.loadData({ page: 1 });
    },
    lookDetails(id) {
      this.$router.push(
        `/independent-application/skin-test-records/detail/${id}`
      );
    },
    change(val) {
      this.filter.channelCode = val;
      this.loadData({ page: 1 });
    }
  }
};
</script>
