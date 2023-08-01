<template>
  <div class="insured-">
    <div class="title-top content-detail">
      被保人名单
      <button type="button" class="btn-save fr" @click="exportInsuredPeoples">
        导出数据
      </button>
    </div>
    <el-table v-loading="tableLoading" :data="insuredPeoples">
      <el-table-column label="被保人姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号">
        <template slot-scope="scope">
          <span>{{ scope.row.idCard || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.age || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职业">
        <template slot-scope="scope">
          <span>{{ scope.row.job || '-' }}</span>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img"/>
    </el-table>
    <Pagination
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      :total="pagingOptions.total"
      layout="total, prev, pager, next"
      @pagination="getInsuredPeoples"
    />
  </div>
</template>
<script>
export default {
  name: 'InsuredPeoplesTable',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      insuredPeoples: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getInsuredPeoples();
    if (this.pageNum) {
      this.getInsuredPeoples({
        page: Number(this.pageNum)
      });
    } else {
      this.getInsuredPeoples({});
    }
  },
  methods: {
    // 获取团险被保人列表
    getInsuredPeoples(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        id: vm.id,
        pageNum: vm.pagingOptions.pageNo
      };
      vm.tableLoading = true;
      vm.$store
        .dispatch('groupInsuranceRecord/getInsuredPeoples', params)
        .then(res => {
          vm.tableLoading = false;
          vm.insuredPeoples = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出团险被保人名单
    exportInsuredPeoples() {
      this.$store
        .dispatch('groupInsuranceRecord/exportInsuredPeoples', {
          id: this.id
        })
        .then(res => {
          if (res.status) {
            window.location.href = res.url;
          } else {
            this.$message.warning(res.comment);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.export {
  margin-bottom: 10px;
}
</style>
