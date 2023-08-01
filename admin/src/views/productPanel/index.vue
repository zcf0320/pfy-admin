<template>
  <div class="product-panel">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <AllData />
        <SettleData />
        <UserData />
        <ServiceData />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import AllData from './allData';
import SettleData from './settleData';
import UserData from './userData';
import ServiceData from './serviceData';
export default {
  name: 'productPanel',
  components: { AllData, SettleData, UserData, ServiceData }
};
</script>

<style lang="scss" >
.product-panel {
  &-title {
    justify-content: space-between;
    align-items: center;
    &-text {
      font-size: 18px;
      font-weight: bold;
      color: #545473;
      margin-left: 8px;
      justify-content: flex-start;
      align-items: center;

      .line {
        width: 4px;
        height: 18px;
        background: #3599fe;
        margin-right: 8px;
      }
    }
  }
}
</style>
