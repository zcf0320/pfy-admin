<template>
  <div class="agreement-history">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title">历史版本</div>
        <el-table v-loading="tableLoading" :data="list" class="table-large">
          <el-table-column label="名称" prop="title">
            <template
            slot-scope="scope"
            ><span class="link-skip" @click="lookDetails(scope.row.id, 0)">{{
                scope.row.title
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="版本号" prop="version"/>
          <el-table-column label="更新时间" prop="updateTime">
            <template slot-scope="scope">
              {{ $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id, 0)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'agreementHistory',
  data() {
    return {
      tableLoading: true,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    lookDetails(id, type) {
      this.$router.push({
        path: `/legal-affairs-center/agreement/detail/${id}/${type}`
      });
    },
    getList() {
      this.$store
        .dispatch('marketingTool/getProtocolHistory', this.$route.params.type)
        .then(res => {
          this.list = res.data || [];
          this.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.agreement-history {
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #464668;
    padding-bottom: 24px;
    margin-bottom: 24px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
}
</style>
