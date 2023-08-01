<template>
  <div class="tag-libray-page page-form modal-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            标签库<button
              type="button"
              class="btn-save fr"
              @click="createTag(1, null)"
            >
              新增一级标签
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box mb-16">
                <div class="line-form">
                  <el-input
                    v-model="name"
                    placeholder="请输入标签"
                    @keyup.enter.native="search()"
                  />
                </div>
                <div class="flex-box">
                  <HoverTip
                    content="查询"
                    tip-class-name="icon-search"
                    class="mr-30"
                    @click.native.prevent="search"
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
        </div>
        <el-table v-loading="tableLoading" :data="tagList" class="table-large">
          <el-table-column label="一级标签" width="300">
            <template slot-scope="scope">
              <div class="tag">
                <div class="tag-item">
                  <div
                    v-if="deleteState && scope.$index === deleteIndex"
                    class="tag-name delete-tag"
                  >
                    <span>{{ scope.row.name }}</span>
                    <el-popconfirm
                      title="删除一级标签后，二级标签也将会删除，是否删除？"
                      placement="top"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      confirm-button-type="plain"
                      cancel-button-type="primary"
                      :hide-icon="true"
                      @onConfirm="deleteTags(1, scope.row.id)"
                    >
                      <div slot="reference" class="delete" />
                    </el-popconfirm>
                  </div>
                  <div v-else class="text">{{ scope.row.name }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="二级标签">
            <template slot-scope="scope">
              <div class="tag">
                <div
                  v-for="item in scope.row.childs || []"
                  :key="item.id"
                  class="tag-item"
                >
                  <div
                    v-if="deleteState && scope.$index === deleteIndex"
                    class="tag-name delete-tag"
                  >
                    <span>{{ item.name }}</span>
                    <el-popconfirm
                      title="删除后将不可恢复，是否删除？"
                      placement="top"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      confirm-button-type="plain"
                      cancel-button-type="primary"
                      :hide-icon="true"
                      @onConfirm="deleteTags(2, item.id)"
                    >
                      <div slot="reference" class="delete" />
                    </el-popconfirm>
                  </div>
                  <div v-else class="tag-name">{{ item.name }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div>
                <HoverTip
                  v-if="scope.row.allowDelete"
                  content="添加"
                  tip-class-name="icon-add"
                  class="mr-30"
                  @click.native.prevent="createTag(2, scope.row.id)"
                />
                <HoverTip
                  v-if="scope.row.allowDelete && !deleteState"
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                  class="mr-30"
                  @click.native.prevent="deleteStateChange(scope.$index)"
                />
                <HoverTip
                  v-if="
                    scope.row.allowDelete &&
                      deleteState &&
                      scope.$index === deleteIndex
                  "
                  slot="reference"
                  content="保存"
                  tip-class-name="icon-save"
                  class="mr-30"
                  @click.native.prevent="cancelDelete"
                />
              </div>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getList"
        />
      </el-scrollbar>
      <AddTagModal
        v-if="isShow"
        :pid="pid"
        @close="closeAddTagModal"
        @save="save"
      />
    </el-container>
  </div>
</template>
<script>
import AddTagModal from './component/addTagModal';
import { mapActions } from 'vuex';
export default {
  name: 'TagLibrary',
  components: {
    AddTagModal
  },
  data() {
    return {
      tableLoading: false,
      tagList: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      isShow: false,
      pid: 0,
      deleteIndex: 0,
      deleteState: false,
      name: ''
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('tagLibrary', ['getTagList', 'deleteTag']),
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '' || params[key] === -1) {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      vm.getTagList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.tagList = res.data.records || [];
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 新增标签
    createTag(type, pid) {
      if (pid) {
        this.pid = pid;
      }
      this.isShow = true;
      this.deleteState = false;
    },
    // 关闭标签弹框
    closeAddTagModal() {
      this.isShow = false;
      this.pid = 0;
    },
    // 删除状态切换
    deleteStateChange(index) {
      this.deleteIndex = index;
      this.deleteState = true;
    },
    // 新增标签
    save() {
      this.closeAddTagModal();
      this.getList({});
    },
    // 删除标签
    deleteTags(level, id) {
      this.deleteTag({
        level,
        id
      }).then(res => {
        if (res.status) {
          this.$message.success(res.message);
          this.tagList.forEach((item, index) => {
            if (level === 1 && item.id === id) {
              this.tagList.splice(index, 1);
              this.deleteState = false;
            } else {
              item.childs &&
                item.childs.forEach((child, childIndex) => {
                  if (child.id === id) {
                    this.tagList[index].childs.splice(childIndex, 1);
                  }
                });
            }
          });
        }
      });
    },
    // 取消删除
    cancelDelete() {
      this.deleteState = false;
      this.getList({
        page: 1
      });
    },
    clearFilter() {
      this.name = '';
      this.pagingOptions.pageNo = 1;
      this.getList({
        page: 1
      });
    },
    search() {
      if (this.name) {
        this.tableLoading = true;
        const params = Object.assign({}, { name: this.name });
        params.pageNum = this.pagingOptions.pageNo;
        params.pageSize = this.pagingOptions.pageSize;
        this.$store
          .dispatch('tagLibrary/getTagListSearch', params)
          .then(res => {
            this.tableLoading = false;
            this.tagList = res.records || [];
            this.pagingOptions.pageNo = params.pageNum;
            this.pagingOptions.total = res.totalNum;
          });
      } else {
        this.getList({
          page: 1
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-libray-page {
  .tag {
    width: 100%;
    display: flex;
    max-height: 172px;
    flex-wrap: wrap;
    padding: 8px 0;
    overflow-y: auto;
    .tag-item {
      margin-right: 24px;
      margin-bottom: 12px;
      .tag-name {
        width: fit-content;
        text-align: center;
        height: 36px;
        line-height: 36px;
        padding: 0 16px;
        background: #edf6ff;
        font-size: 14px;
        font-weight: 400;
        color: #464668;
        border-radius: 4px;
        border: 1px solid #a2a3b7;
      }

      .text {
        font-size: 14px;
        font-weight: 400;
        color: #464668;
      }
      .delete-tag {
        position: relative;
        .delete {
          width: 16px;
          height: 16px;
          position: absolute;
          top: -8px;
          right: -8px;
          background-image: url('../../../assets/icon_tag_delete.svg');
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
  }
  .line-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 16px;
    .label-name {
      width: 90px;
    }
  }
}
</style>
