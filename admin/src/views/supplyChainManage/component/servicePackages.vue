<template>
  <div class="service-packages-tab">
    <div class="title-top content-detail">服务包列表</div>
    <el-table v-loading="tableLoading" :data="list">
      <el-table-column label="ID" prop="orderNumber" show-overflow-tooltip/>
      <el-table-column
        label="服务包名称"
        prop="packageName"
        show-overflow-tooltip
      />
      <el-table-column label="使用类型" prop="packageType">
        <template slot-scope="scope">
          <span>{{ scope.row.packageType | formatType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.updateTime).format("YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <HoverTip
            content="查看"
            tip-class-name="icon-detail"
            @click.native.prevent="view(scope.row.id)"
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
  </div>
</template>

<script>
export default {
  name: 'service-packages-tab',
  filters: {
    formatType(val) {
      if (val === 1) {
        return '保险产品';
      } else if (val === 2) {
        return '健康服务';
      } else {
        return '健康方案';
      }
    }
  },
  data() {
    return {
      list: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      tableLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    view(id) {
      this.$router.push(`/supplyChainManage/servicePackage/details/${id}/detail`);
    },
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch('serviceItems/getRelaPackages', {
          itemId: this.$route.params.id,
          pageSize: this.pagingOptions.pageSize,
          pageNum: this.pagingOptions.pageNo
        })
        .then(res => {
          this.list = res.records;
          this.pagingOptions.total = res.totalNum;
          this.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
