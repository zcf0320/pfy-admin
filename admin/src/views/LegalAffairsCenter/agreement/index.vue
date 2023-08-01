<template>
  <div class="agreement">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <el-table v-loading="tableLoading" :data="list" class="table-large">
          <el-table-column label="名称" prop="title">
            <template
             slot-scope="scope"
            ><span class="link-skip" @click="lookDetails(scope.row, 0, 0)">{{
                scope.row.title
              }}</span>
            </template></el-table-column>
          <el-table-column label="版本号" prop="version"/>
          <el-table-column label="更新时间" prop="updateTime">
            <template slot-scope="scope">
              {{ $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row, 'detail', 0)"
              /> -->
              <HoverTip
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row, 'edit', 0)"
              />
              <HoverTip
                content="历史版本"
                tip-class-name="icon-history"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row, 0, 1)"
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
  name: 'agreement',
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
    lookDetails(row, type, history) {
        if (type === 'detail') {
         this.$router.push({
          path: `/legal-affairs-center/agreement/detail/${row.id}/${type}`
        });
        } else if (type === 'edit') {
          this.$router.push({
          path: `/legal-affairs-center/agreement/content-edit/${row.id}/${type}`
        });
        }
      history === 1 &&
        this.$router.push({
          path: `/legal-affairs-center/agreement/history/${row.type}`
        });
    },
    getList() {
      this.$store.dispatch('marketingTool/getProtocol').then(res => {
        this.list = res.data || [];
        this.tableLoading = false;
      });
    }
  }
};
</script>
