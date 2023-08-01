<template>
  <div>
    <div class="title-top content-detail">测试问卷</div>
    <el-table
      v-loading="tableLoading"
      :data="dataList"
      class="table table-large"
    >
      <el-table-column label="问卷名称">
        <template slot-scope="scope">
          <div>
            {{ scope.row.questionanireName || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="使用时间">
        <template slot-scope="scope">
          <div>
            {{
              scope.row.date
                ? $moment(scope.row.date).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="测试结果">
        <template slot-scope="scope">
          <div>
            {{ scope.row.resultRemark || '-' }}
          </div>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img" />
    </el-table>
    <Pagination
      :total="pagingOptions.total"
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      layout="total, prev, pager, next"
      @pagination="changePage"
    />
  </div>
</template>
<script>
export default {
  name: 'CbtiQuestionnaireRecord',
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pagingOptions: {
      type: Object,
      default: () => {
        return {
          total: 0,
          pageNo: 1,
          pageSize: 10
        };
      }
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  }
};
</script>
