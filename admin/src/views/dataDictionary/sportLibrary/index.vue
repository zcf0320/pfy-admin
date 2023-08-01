<template>
  <div class="department-libray-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">运动库</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">运动名称:</span>
                  <el-input
                    v-model="filter.searchName"
                    placeholder="请输入运动名称"
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
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="goodList" class="table-large">
          <el-table-column label="运动名称" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.sportName || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="能量消耗（大卡/5分钟）">
            <template slot-scope="scope">
              <span>{{ scope.row.calories || "-" }}</span>
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
import { mapActions } from 'vuex';
export default {
  name: 'SurgicalLibrary',
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodList: [],
      filter: {
        searchName: ''
      }
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
    ...mapActions('dataDictionary', ['getSportList']),
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
      this.getSportList(params).then((res) => {
        this.goodList = res.data.records;
        this.pagingOptions.total = res.data.total;
        this.tableLoading = false;
      });
    },
    clearFilter() {
      this.filter = {
        departmentName: ''
      };
      this.getList({});
    }
  }
};
</script>

<style lang="scss" scoped>
.surgical-libray-page {
}
</style>
