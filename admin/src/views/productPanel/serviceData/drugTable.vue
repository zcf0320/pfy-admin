<template>
  <div class="drug-table">
    <div class="drug-table-title">赔付药品</div>
    <el-table :data="tableData">
      <el-table-column prop="medicineName" label="药品名称"/>
      <el-table-column prop="name" label="药品规格/厂家名">
        <template slot-scope="scope">
          {{ scope.row.standard || "-" }}{{ scope.row.manufacturer || "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="赔付次数/占比">
        <template slot-scope="scope">
          {{ scope.row.compensationNum || "-"
          }}{{ scope.row.compensationNum || "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="compensationCount" label="赔付数量"/>
      <el-table-column prop="medicinePrice" label="药品总金额"/>
      <el-table-column prop="postage" label="运费"/>
      <el-table-column prop="totalPrice" label="赔付总金额"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'drugTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.drug-table {
  border-top: 1px solid #ebedf2;
  margin: 0 24px;
  padding-bottom: 36px;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #545473;
    padding: 24px 0;
  }
}
</style>
