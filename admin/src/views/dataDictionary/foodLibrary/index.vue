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
          <div class="title-top">食物库</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">食物分类:</span>
                  <el-select
                    v-model="filter.classify"
                    placeholder="全部"
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="(item, index) in goodTypes"
                      :key="item + index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">食物名称:</span>
                  <el-input
                    v-model="filter.searchName"
                    placeholder="请输入食物名称"
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
          <el-table-column label="食物信息" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.foodName || '-' }}</span>
              <div class="medicineSpec">
                {{ scope.row.foodClassifyName || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="GI值">
            <template slot-scope="scope">
              <span>{{ scope.row.gi || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="热量（每100克）">
            <template slot-scope="scope">
              <span>{{ scope.row.calories || '-' }}</span>
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
import { mapActions } from 'vuex';
export default {
  name: 'FoodLibrary',
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodTypes: [],
      goodList: [],
      filter: {
        classify: '',
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
    this.getFoodClassify().then(res => {
      this.goodTypes = res.data;
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
    ...mapActions('dataDictionary', ['getFoodClassify', 'getFoodList']),
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
      this.getFoodList(params).then(res => {
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
.department-libray-page {
  .medicineSpec {
    font-size: 14px;
    font-weight: 400;
    color: #989ab3;
    margin-top: 16px;
  }
}
</style>
