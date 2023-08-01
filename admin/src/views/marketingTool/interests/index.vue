<template>
  <div class="user-record-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="flex-between">
          <div class="title-top">权益券</div>
          <button type="button" class="btn-save fr" @click="lookDetails('add')">
            新增
          </button>
        </div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">券名称:</span>
                  <el-input
                    v-model.trim="filter.name"
                    placeholder="请输入券名称"
                    class="search-input"
                  @keyup.enter.native="list"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务名称:</span>
                  <el-input
                    v-model.trim="filter.serviceInfoName"
                    placeholder="请输入服务名称"
                    class="search-input"
                  @keyup.enter.native="list"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">供应商名称:</span>
                  <el-input
                    v-model="filter.providerName"
                    placeholder="请输入供应商名称"
                    class="search-input"
                  @keyup.enter.native="list"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="list()"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  class="mr-30"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="dataList" class="table-large">
          <el-table-column label="券名称">
            <template slot-scope="scope">
              <div>{{ scope.row.name || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="服务信息">
            <template slot-scope="scope">
              <div>
                {{ scope.row.serviceInfoName || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="发送量">
            <template slot-scope="scope">
              <div>{{ scope.row.userCount || "-" }}</div>
            </template>
          </el-table-column>
          <el-table-column label="待领取/已领取">
            <template slot-scope="{ row }">
              <span>{{ row.pendingReceive || 0 }}</span>/
              <span>{{ row.received || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format("YYYY-MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img"/>
        </el-table>
        <Pagination
          v-if="total > 10"
          :total="total"
          :limit="filter.pageSize"
          :page.sync="filter.pageNum"
          layout="total, prev, pager, next"
          @pagination="list"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'UserRecord',
  data() {
    return {
      tableLoading: false,
      filter: {
        providerName: '',
        name: '',
        serviceInfoName: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      dataList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    if (this.pageNum) {
      this.filter.pageNum = this.pageNum;
      this.list();
    } else {
      this.list();
    }
  },
  methods: {
    list() {
      const vm = this;
      vm.tableLoading = true;
      const params = this.$delEmptyKey(this.filter);
      vm.$store
        .dispatch('interests/listPresentation', params)
        .then(res => {
          vm.tableLoading = false;
          vm.dataList = res.records || [];
          vm.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id) {
      if (id === 'add') {
         this.$router.push(`/marketingTool/interestsAdd/detail/${id}`);
      } else {
       this.$router.push(`/marketingTool/interests/detail/${id}`);
      }
    },
    clearFilter() {
      this.filter = {
        providerName: '',
        name: '',
        serviceInfoName: '',
        pageSize: 10,
        pageNum: 1
      };
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
