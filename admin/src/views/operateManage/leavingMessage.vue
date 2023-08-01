<template>
  <div class="leaving-message-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form spacing"
        tag="main"
        :noresize="false"
      >
        <div class="bg-fff">
          <div class="title-top">用户留言</div>
          <div class="filter-box plr-30">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">用户名:</span>
                  <el-input
                    v-model="filter.userName"
                    placeholder="请输入用户名"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">留言时间:</span>
                  <el-date-picker
                    v-model="filter.createTime"
                    type="daterange"
                    value-format="timestamp"
                    :clearable="isShowClear"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeCreateTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList({ page: 1 })"
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
                <span class="label-name">更新时间:</span>
                <el-date-picker
                  v-model="filter.updateTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="isShowClear"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeUpdateTime"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-24 bg-fff p-30">
          <div class="tabs">
            <Tab
              :btns="btns"
              :btn-style="{ overflow: 'visible' }"
              @change="handleClick"
            />
          </div>
          <el-table v-loading="tableLoading" :data="list" class="table-large">
            <el-table-column label="用户名">
              <template slot-scope="scope">
                <span>{{ scope.row.userName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号">
              <template slot-scope="scope">
                <span>{{ scope.row.mobile || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span
                  :class="'label-text ' + leavingMessageState[scope.row.state]"
                  >{{ leavingMessageText[scope.row.state] || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="留言时间">
              <template slot-scope="scope">
                <span>{{
                  $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间">
              <template slot-scope="scope">
                <span>{{
                  $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="76">
              <template slot-scope="scope">
                <HoverTip
                  content="查看"
                  tip-class-name="icon-detail"
                  @click.native.prevent="lookDetails(scope.row.id)"
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
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { getConfirmNumber } from '@/utils/common';
import { leavingMessageState, leavingMessageText } from '@/utils/enum';
export default {
  name: 'LeavingMessage',
  data() {
    return {
      leavingMessageState,
      leavingMessageText,
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        userName: '',
        mobile: '',
        state: '',
        createTime: '',
        updateTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      list: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        { value: '', name: '全部' },
        {
          value: '1',
          name: '待处理',
          isNumber: true,
          number: getConfirmNumber('LeavingMessage') || 0
        },
        { value: '2', name: '已完成' }
      ];
    }
  },
  created() {
    const vm = this;
    // 获取服务项
    vm.getList();
  },
  methods: {
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: 10,
        startCreateTime: vm.filter.createTime.length
          ? vm.filter.createTime[0]
          : '',
        endCreateTime: vm.filter.createTime.length
          ? vm.filter.createTime[1]
          : '',
        startUpdateTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[0]
          : '',
        endUpdateTime: vm.filter.updateTime.length
          ? vm.filter.updateTime[1]
          : ''
      };

      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('leavingMessage/getMessageList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.list = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => [(vm.tableLoading = false)]);
    },
    // 筛选创建时间
    changeCreateTime() {
      const vm = this;
      vm.filter.createTime[1] =
        vm.filter.createTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getList({ page: 1 });
    },
    // 筛选更新时间
    changeUpdateTime() {
      const vm = this;
      vm.filter.updateTime[1] =
        vm.filter.updateTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getList({ page: 1 });
    },
    // 清除查询条件
    clearFilter() {
      this.filter = {
        userName: '',
        mobile: '',
        state: null,
        createTime: '',
        updateTime: ''
      };
      this.getList();
    },
    // 状态切换
    handleClick(state) {
      this.filter.state = state;
      this.getList({
        page: 1
      });
    },
    lookDetails(id) {
      this.$router.push(`/leavingMessage/details/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.leaving-message-page {
  .bg-fff {
    background-color: #fff;
  }
  .plr-30 {
    padding: 0 32px;
  }
  .p-30 {
    padding: 30px;
  }
}
</style>
