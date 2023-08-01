<template>
<el-container>
 <div class="workflow">

        <el-scrollbar style="height: 100%; overflow-x: hidden">
        <el-row :gutter="20">
          <el-col :xs="16" :sm="16" :md="15" :lg="17" :xl="19"
            ><FlowTask
          /></el-col>
          <el-col :xs="8" :sm="8" :md="9" :lg="7" :xl="5"
            ><CommonPlatforms
          /></el-col>
        </el-row>
        <el-row style="margin-top: 24px;" :gutter="20">
          <el-col :xs="16" :sm="16" :md="15" :lg="17" :xl="19"><Data /></el-col>
          <el-col
            style="margin-top: 24px;"
            :xs="16"
            :sm="16"
            :md="15"
            :lg="17"
            :xl="19"
            ><Function
          /></el-col>
          <el-col
            style="margin-top: -168px;margin-bottom: 24px;"
            :xs="8"
            :sm="8"
            :md="9"
            :lg="7"
            :xl="5"
          >
            <RankingList></RankingList>
          </el-col>
        </el-row>
      </el-scrollbar>

   </div>
    </el-container>
</template>

<script>
import FlowTask from './components/task';
import CommonPlatforms from './components/CommonPlatforms';
import Data from './components/data';
import Function from './components/function';
import RankingList from './components/RankingList.vue';
export default {
  name: 'Workflow',
  components: {
    FlowTask,
    CommonPlatforms,
    Data,
    Function,
    RankingList
  }
};
</script>

<style lang="scss">
.workflow {
  width: 100%;
  min-height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  .el-scrollbar__thumb {
    width: 0px !important;
  }
  .card {
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 16px;
    .card-title {
      justify-content: flex-start;
      font-size: 16px;
      font-weight: bold;
      color: #464668;
      .icon {
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }
    }
  }
  &-btm {
    justify-content: space-between;
    align-items: center;
  }
}
</style>
