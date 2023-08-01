<template>
  <div class="channel-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            渠道管理<button
              type="button"
              class="btn-save fr"
              @click="addOrUpdate('')"
            >
              新增渠道
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.code"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getChannelList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">渠道名称:</span>
                  <el-input
                    v-model="filter.chanelName"
                    placeholder="请输入渠道名称"
                    class="search-input"
                    @keyup.enter.native="getChannelList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">更新时间:</span>
                  <el-date-picker
                    v-model="filter.filterTime"
                    type="daterange"
                    value-format="timestamp"
                    :clearable="isShowClear"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getChannelList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="channelList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.code || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <span>{{ scope.row.chanelName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <HoverTip
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-30"
                @click.native.prevent="addOrUpdate(scope.row.id)"
              />
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteChannel(scope.row.id)"
              >
                <HoverTip
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getChannelList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { underwriteStatus } from '@/utils/enum';
export default {
  name: 'Underwrite',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        code: '',
        chanelName: '',
        filterTime: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      channelList: [],
      underwriteStatus,
      claimResponsibilitys: [],
      claimResponsibilityObj: {}
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getChannelList();
    if (this.pageNum) {
      this.getChannelList({
        page: Number(this.pageNum)
      });
    } else {
      this.getChannelList({});
    }
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getChannelList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        code: '',
        chanelName: '',
        filterTime: []
      };
      this.getChannelList();
    },
    // 获取渠道列表
    getChannelList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('channelManage/getChannelList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.channelList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/insuranceManage/underwrite/details/${id}`);
    },
    // 新增或者编辑渠道
    addOrUpdate(id) {
      if (id) {
        this.$router.push({
          path: '/projectManage/channelDetails',
          query: {
            id
          }
        });
      } else {
        this.$router.push({
          path: '/projectManage/channelAdd'
        });
      }
    },
    deleteChannel(id) {
      const vm = this;
      vm.$store
        .dispatch('channelManage/delete', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getChannelList();
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.channel-page {
  width: 100%;
  width: 100%;
  .operation-buttons {
    margin-bottom: 24px;
    .el-button {
      margin-right: 24px;
    }
    .el-select {
      margin-right: 24px;
    }
  }
}
</style>
