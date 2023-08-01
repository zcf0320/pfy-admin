<template>
  <div class="content-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            内容管理
            <button type="button" class="btn-save fr" @click="exportList">
              导出
            </button>
            <button type="button" class="btn-save fr mr-30" @click="addContent">
              新增
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">标题:</span>
                  <el-input
                    v-model="filter.title"
                    placeholder="请输入标题"
                    class="search-input"
                    @keyup.enter.native="getContentList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">分类:</span>
                  <el-cascader
                    v-model="filter.types"
                    :options="types"
                    placeholder="全部"
                    :props="optionProps"
                    class="search-input"
                    @change="getContentList({ page: 1 })"
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
                  @click.native.prevent="getContentList({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">状态:</span>
                  <el-select
                    v-model="filter.postStatus"
                    placeholder="全部"
                    clearable
                    @change="getContentList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="contentList"
          class="table-large"
        >
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span>{{ scope.row.title || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类">
            <template slot-scope="scope">
              <span>{{
                `${contentType[scope.row.type[0]]}-${
                  contentType[scope.row.type[1]]
                }` || '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :class="['label-text', columnPostStatus[scope.row.postStatus]]"
                >{{ postStatusObj[scope.row.postStatus] || '-' }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="
                  lookDetails(scope.row.id, 0, scope.row.postStatus)
                "
              />
              <HoverTip
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-30"
                @click.native.prevent="
                  lookDetails(scope.row.id, 1, scope.row.postStatus)
                "
              />
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteContent(scope.row.id)"
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
          @pagination="getContentList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { contentType } from '@/utils/enum';
import { postStatusObj, columnPostStatus } from '@/utils/enum';
export default {
  name: 'ContentManage',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        title: '',
        types: [],
        filterTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      contentList: [],
      serviceList: [],
      contentType,
      types: [],
      optionProps: {
        label: 'name',
        value: 'id'
      },
      statusList: [],
      postStatusObj,
      columnPostStatus
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getStatus();
    this.getContentList();
    if (this.pageNum) {
      this.getContentList({
        page: Number(this.pageNum)
      });
    } else {
      this.getContentList({});
    }

    // 分类
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'contentManage'
      })
      .then(res => {
        res.obj.forEach(item => {
          item.children.forEach(children => {
            children.children = null;
          });
        });
        this.types = res.obj || [];
      });
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getContentList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        title: '',
        types: [],
        filterTime: ''
      };
      this.getContentList();
    },
    // 获取评价列表
    getContentList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        type: vm.filter.types.length ? vm.filter.types[1] : '',
        startUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        endUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
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
        .dispatch('contentManage/getContentList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.contentList = res.records || [];
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
        type: vm.filter.types.length ? vm.filter.types[1] : '',
        startUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        endUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      this.$store.dispatch('contentManage/exportContent', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 查看详情
    lookDetails(id, type, postStatus) {
      if (type === 1) {
 this.$router.push(
        `/operateManage/contentManage/content-edit/${id}/${type}/${postStatus}`,
      );
      } else {
 this.$router.push(
        `/operateManage/contentManage/details/${id}/${type}/${postStatus}`,
      );
      }
    },
    // 新增
    addContent() {
      this.$router.push(`/operateManage/contentManage/addContent`);
    },
    // 删除
    deleteContent(id) {
      const vm = this;
      vm.$store
        .dispatch('contentManage/deleteContent', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            this.getContentList();
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    },
    getStatus() {
      this.$store
        .dispatch('app/getSysConfig', {
          code: 'postStatus'
        })
        .then(res => {
          this.statusList = res.obj || [];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.content-manage-page {
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
