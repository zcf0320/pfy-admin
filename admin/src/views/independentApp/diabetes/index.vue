<template>
  <div class="basis-drugs-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">用户列表</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.userId"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号码:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号码"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">渠道名称:</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="change"
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
                <span class="label-name">更新时间：</span>
                <el-date-picker
                  v-model="filterTime"
                  type="daterange"
                   value-format="yyyy-MM-dd"
                  clearable
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTime"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="goodList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <div class="mb-32">{{ scope.row.userId || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <div class="medicineName">
                {{ scope.row.mobile || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div>{{ scope.row.channelName || '-' }}</div>
              <div class="medicineSpec">{{
                scope.row.channelCode || '-'
              }}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <div class="mb-32">{{ $moment(scope.row.time).format('YYYY-MM-DD') }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <div class="mb-32">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.userId)"
              />
              </div>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNum"
          layout="total, prev, pager, next"
          @pagination="getList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import Api from '@/api/YouthHealthRecord';
export default {
  name: 'DiabetesList',
  data() {
    return {
      filter: {
        userId: '',
        channelCode: '',
        mobile: '',
        beginTime: '',
        endTime: ''
      },
      filterTime: [],
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNum: 1
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
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    change(val) {
      this.filter.channelCode = val;
      this.getList({ page: 1 });
    },
    // 修改筛选时间
    changeTime() {
      this.filter.beginTime = this.filterTime[0];
      this.filter.endTime = this.filterTime[1];
      this.getList({ page: 1 });
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
      this.tableLoading = true;
      Api.getDiabetesList(params).then(res => {
        this.goodList = res.data.records;
        this.pagingOptions.total = res.data.total;
        this.tableLoading = false;
      });
    },
    clearFilter() {
      this.filterTime = [];
      this.filter = {
        userId: '',
        channelCode: '',
        mobile: '',
        beginTime: '',
        endTime: ''
      };
      this.getList({});
    },
    lookDetails(id) {
      this.$router.push(`/independent-application/diabetes/detail/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>

  .medicineName {
    font-size: 14px;
    margin-bottom: 32px;
    font-weight: 400;
    color: #464668;
  }

  .medicineSpec {
    font-size: 14px;
    font-weight: 400;
    color: #989ab3;
    margin-top: 16px;
  }
</style>
