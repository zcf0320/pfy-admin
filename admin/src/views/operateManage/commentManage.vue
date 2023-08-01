<template>
  <div class="comment-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            评价投诉<button
              type="button"
              class="btn-save fr"
              @click="exportList"
            >
              导出
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                    @keyup.enter.native="getCommentList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务项:</span>
                  <el-select
                    v-model="filter.serviceRecordId"
                    filterable
                    placeholder="全部"
                    @change="getCommentList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in serviceList"
                      :key="item.id"
                      :label="item.serviceName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">评价类型:</span>
                  <el-select
                    v-model="filter.type"
                    placeholder="全部"
                    @change="getCommentList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in commentTypes"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getCommentList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">生成时间:</span>
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
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="userList" class="table-large">
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务项">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceInfoName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评价类型">
            <template slot-scope="scope">
              <span>{{ commentType[scope.row.type] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评价内容">
            <template slot-scope="scope">
              <span>{{ scope.row.content || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生成时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.commentId)"
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
          @pagination="getCommentList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { commentType } from '@/utils/enum';
export default {
  name: 'CommentManage',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        serviceRecordId: '',
        type: '',
        mobile: '',
        filterTime: ''
      },
      pagingOptions: {
        pageSize: 20,
        total: 10,
        pageNo: 1
      },
      userList: [],
      serviceList: [],
      commentTypes: [
        {
          name: '好评',
          value: 1
        },
        {
          name: '中评',
          value: 2
        },
        {
          name: '差评',
          value: 3
        }
      ],
      commentType
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getCommentList();
    if (this.pageNum) {
      this.getCommentList({
        page: Number(this.pageNum)
      });
    } else {
      this.getCommentList({});
    }
    // 获取服务项
    this.$store.dispatch('serviceItems/getServiceinfos', {}).then(response => {
      this.serviceList = response.data;
    });
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getCommentList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        serviceRecordId: '',
        type: '',
        mobile: '',
        filterTime: ''
      };
      this.getCommentList();
    },
    // 获取评价列表
    getCommentList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('commentManage/getCommentList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.userList = res.records;
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出
    exportList() {
      const vm = this;
      const params = {
        ...vm.filter,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      this.$store.dispatch('commentManage/exportComment', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/operateManage/commentManage/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-manage-page {
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
