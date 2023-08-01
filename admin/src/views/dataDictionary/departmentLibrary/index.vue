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
          <div class="title-top">科室库</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">一级科室:</span>
                  <el-select
                    v-model="filter.departmentName"
                    filterable
                    placeholder="全部"
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in firstDepartmentList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
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
          <el-table-column label="一级科室" width="300">
            <template slot-scope="scope">
              <div class="text">{{ scope.row.label || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="二级科室">
            <template slot-scope="scope">
              <div class="tag">
                <div
                  v-for="item in scope.row.children"
                  :key="item.value"
                  class="tag-item"
                >
                  <div class="text">{{ item.label }}</div>
                </div>
              </div>
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
  name: 'DepartmentLibrary',
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodList: [],
      firstDepartmentList: [],
      filter: {
        departmentName: ''
      }
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    // 获取全部科室下拉框需要
    this.getAllDepartment({ pageNum: 1, pageSize: 1000 }).then((res) => {
      this.firstDepartmentList = res.data.list;
    });
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('inquiryManage', ['getAllDepartment']),
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
      this.getAllDepartment(params).then((res) => {
        this.goodList = res.data.list;
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
.department-libray-page {
  .tag {
    width: 100%;
    display: flex;
    max-height: 172px;
    flex-wrap: wrap;
    overflow-y: auto;
    font-size: 14px;
    line-height: 14px;
    .tag-item {
      margin-right: 36px;
      margin-bottom: 12px;
      .text {
        color: #464668;
        font-size: 14px;
      }
    }
  }
}
</style>
