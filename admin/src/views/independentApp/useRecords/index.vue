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
                    v-model="filter.userId"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>

                <div class="form-item">
                  <span class="label-name">项目名称:</span>
                  <el-select
                    v-model="filter.serviceCode"
                    filterable
                    placeholder="全部"
                    @change="loadData({ page: 1 })"
                  >
                    <el-option
                      v-for="item in pageCodeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
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
                  <span class="label-name">渠道名称</span>
                   <SelectChannel
                ref="selectChannel"
                v-model="filter.channelCode"
                filterable
                placeholder="全部"
                @change="change"
              />
                </div>

                <div class="form-item">
                  <span class="label-name">使用时间:</span>
                  <el-date-picker
                    v-model="filterTime"
                    style="width: 240px"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
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
          :data="recordsList"
          class="table-large"
        >
          <el-table-column label="ID" prop="userId"/>
          <el-table-column label="渠道名称" prop="channelName"/>
          <el-table-column label="渠道ID" prop="channelCode"/>
          <el-table-column label="项目名称" prop="serviceName"/>
          <el-table-column label="手机号码" prop="mobile"/>
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.useTime).format("YYYY-MM-DD HH:mm")
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
          @pagination="loadData"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { default as api } from '@/api/useRecord';
export default {
  name: 'useRecords',
  data() {
    return {
      filter: {
        mobile: '',
        id: '',
        beginTime: '',
        endTime: '',
        channelCode: '',
        serviceCode: '',
        pageSize: 10,
        pageNum: 1
      },
      filterTime: [],
      recordsList: [],
      tableLoading: false,
      pageCodeList: [],
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
    this.loadPageName();
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
      api
        .getPageRecordList(params)
        .then((res) => {
          this.recordsList = res.data.records || [];
          this.pagingOptions.total = res.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    loadPageName() {
      api.getPageCodeList().then((res) => {
        this.pageCodeList = res.data;
      });
    },
    // 清除筛选条件
    clearFilter() {
      this.filter = {
        mobile: '',
        id: '',
        beginTime: '',
        endTime: '',
        serviceCode: '',
        channelCode: '',
        pageNum: 1,
        pageSize: 10
      };
      this.filterTime = [];
      this.loadData({ page: 1 });
    },
    changeTime() {
      this.filter.beginTime = this.filterTime[0];
      this.filter.endTime = this.filterTime[1];
      this.loadData({ page: 1 });
    },
    // 查看详情
    lookDetails(row) {
      this.$router.push(
        `/independent-application/use-records/detail/${row.id}`
      );
    },
     change(val) {
      this.filter.channelCode = val;
      this.loadData();
    }
  }
};
</script>
