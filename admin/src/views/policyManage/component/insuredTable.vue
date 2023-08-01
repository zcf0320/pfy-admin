<template>
  <div class="insured-table">
    <el-table :data="insuredPeoples">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件类型">
        <template slot-scope="scope">
          <span>{{ certificateType[scope.row.cardType] || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.idCard || '-' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
                label="出生日期"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.birth || '-'}}</span>
                </template>
      </el-table-column>-->
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效日期">
        <template slot-scope="scope">
          <span>{{
            scope.row.effectiveDate &&
              $moment(scope.row.effectiveDate).format('YYYY/MM/DD')
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
      @pagination="groupPolicyPersonList"
    />
  </div>
</template>

<script>
import { certificateType } from '@/utils/enum';
export default {
  name: 'InsuredTable',
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
        total: 0,
        pageNo: 1
      },
      insuredPeoples: [],
      certificateType
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.groupPolicyPersonList();
    if (this.pageNum) {
      this.groupPolicyPersonList({
        page: Number(this.pageNum)
      });
    } else {
      this.groupPolicyPersonList({});
    }
  },
  methods: {
    groupPolicyPersonList(pageInfo) {
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
        .dispatch('groupPolicy/groupPolicyPersonList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.insuredPeoples = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.insured-table {
}
</style>
