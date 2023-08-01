<template>
  <div class="drug-plan">
    <div class="title-top content-detail">用药计划</div>
    <el-table :data="tableData" class="table-large">
      <el-table-column label="用药周期">
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.startDate).format("YYYY-MM-DD") }}~{{
              $moment(scope.row.endDate).format("YYYY-MM-DD")
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒时间">
        <template slot-scope="scope">
          <span
v-for="(item, index) in scope.row.reminderTimeList"
:key="index"
>{{ $moment(parseInt(item)).format("HH:mm") }}
            <span
v-if="index !== scope.row.reminderTimeList.length - 1"
>/
            </span></span>
        </template>
      </el-table-column>
      <el-table-column label="计划状态">
        <template slot-scope="scope">
          <span :class="['label-text', drugPlanColumn[scope.row.planStatus]]">{{
            drugPlanState[scope.row.planStatus] || "-"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划来源">
        <template slot-scope="scope">
          <span>{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.updateTime).format("YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <HoverTip
            content="查看"
            tip-class-name="icon-detail"
            class="mr-30"
            @click.native.prevent="lookPage(scope.row.id)"
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
import { drugPlanState, drugPlanColumn } from '@/utils/enum';
export default {
  name: 'drugPlan',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      drugPlanState,
      drugPlanColumn
    };
  },
  created() {
    this.getList({ page: 1 });
  },
  methods: {
    lookPage(id) {
      const routeData = this.$router.resolve({
        path: `/operateManage/userManage/drugPlan/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        // userId: '1340544961321603074',
        userId: this.$route.params.id,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      this.tableLoading = true;
      this.$store
        .dispatch('userManage/getDrugPlan', params)
        .then(res => {
          this.tableLoading = false;
          this.tableData = res.records || [];
          this.pagingOptions.total = res.totalNum;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.drug-plan {
}
</style>
