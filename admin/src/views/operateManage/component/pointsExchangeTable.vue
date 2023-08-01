<template>
  <div class="points-exchange-table">
    <el-table :data="exchangeList">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗积分">
        <template slot-scope="scope">
          <span>{{ scope.row.score || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="兑换时间">
        <template slot-scope="scope">
          <span>{{
            $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') || '-'
          }}</span>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img"/>
    </el-table>
    <Pagination
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      :total="pagingOptions.total"
      layout="total, prev, pager, next"
      @pagination="getExchangeList"
    />
  </div>
</template>

<script>
export default {
  name: 'PointsExchangeTable',

  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      exchangeList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getExchangeList();
    if (this.pageNum) {
      this.getExchangeList({
        page: Number(this.pageNum)
      });
    } else {
      this.getExchangeList({});
    }
  },
  methods: {
    getExchangeList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        productId: vm.id,
        pageNum: vm.pagingOptions.pageNo
      };
      vm.$store
        .dispatch('pointsCommodity/getPointsExchangeList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.exchangeList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.points-exchange-table {
}
</style>
