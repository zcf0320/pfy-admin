<template>
  <div class="material-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">
          材料模板库<button
            type="button"
            class="btn-save fr"
            @click="createGuaranteePower('add', 'add')"
          >
            新增
          </button>
        </div>
        <div class="filter-box">
          <div class="search-form flex-between">
            <div class="form-item v-middle">
              <span class="label-name">材料名称:</span>
              <el-input
                v-model="filter.materialName"
                placeholder="请输入材料名称"
                class="search-input"
                @keyup.enter.native="getList({ page: 1 })"
              />
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
        </div>
        <div class="table-list">
          <el-table
            v-loading="tableLoading"
            :data="MaterialLibraryList"
            class="table-large"
          >
            <el-table-column label="名称" width="300">
              <template slot-scope="scope">
                <span>{{ scope.row.materialName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="示例文件">
              <template slot-scope="scope">
                <span
                  class="link-skip"
                  @click="getShowViewer(scope.row.materialFile)"
                  >查看图片</span
                >
              </template>
            </el-table-column>
            <el-table-column label="更新时间">
              <template slot-scope="scope">
                <span>{{
                  $moment(scope.row.updateTime).format('YYYY-MM-DD')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span :class="['label-text', labelState[scope.row.state]]">{{
                  scope.row.state === 0 ? '已启用' : '已禁用' || '-'
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <div class="flex-box">
                  <HoverTip
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
                    @click.native.prevent="toDetail(scope.row.id)"
                  />
                  <HoverTip
                    v-if="!scope.row.systemFlag"
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="
                      createGuaranteePower(scope.row.id, 'edit')
                    "
                  />
                  <HoverTip
                    v-if="!scope.row.systemFlag"
                    class="mr-30"
                    :content="scope.row.state === 0 ? '禁用' : '启用'"
                    :tip-class-name="
                      scope.row.state == 0 ? 'icon-disable' : 'icon-enable'
                    "
                    @click.native.prevent="
                      changeState(scope.row.id, scope.row.state)
                    "
                  />
                  <el-popconfirm
                    v-if="!scope.row.systemFlag"
                    title="删除后将不可恢复，是否删除？"
                    placement="top"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    confirm-button-type="plain"
                    cancel-button-type="primary"
                    :hide-icon="true"
                    @onConfirm="deleteItem(scope.row.id)"
                  >
                    <HoverTip
                      slot="reference"
                      content="删除"
                      tip-class-name="icon-delete"
                    />
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
        </div>
        <elImageViewer
          v-if="showViewer"
          :on-close="showViewerClose"
          :url-list="urlList"
        />
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { labelState } from '@/utils/enum';
export default {
  name: 'MaterialManage',

  data() {
    return {
      filter: {
        materialName: ''
      },
      showViewer: false,
      urlList: [],
      MaterialLibraryList: [],
      tableLoading: false,
      isShowClear: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      labelState
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
    // 预览图片
    getShowViewer(urls) {
      this.urlList = urls;
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    },
    // 清空筛选项
    clearFilter() {
      this.filter = {
        keyWord: ''
      };
      this.getList();
    },
    // 获取列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('materalManage/getMaterialLibraryList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.MaterialLibraryList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    createGuaranteePower(id, type) {
      if (type === 'add') {
         this.$router.push(`/toolLibrary/materialManage/createAdd/${id}/${type}`);
      } else if (type === 'edit') {
         this.$router.push(`/toolLibrary/materialManage/content-edit/${id}/${type}`);
      }
    },
    // 切换状态
    changeState(id, state) {
      const vm = this;
      vm.$confirm('确认切换材料状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id,
          state: state ? '0' : '1'
        };
        vm.$store
          .dispatch('materalManage/switchMaterialLibrary', params)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              this.getList();
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    },
    // 删除
    deleteItem(id) {
      this.$confirm(
        '删除后将无法恢复，请确认是否删除？（已经被保险产品引用的材料不支持删除）',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        },
      )
        .then(() => {
          const vm = this;
          vm.$store
            .dispatch('materalManage/deleteMaterialLibrary', {
              id
            })
            .then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: res.comment
                });
                this.getList();
              } else {
                this.$message({
                  type: 'warning',
                  message: res.comment
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });
        });
    },
    toDetail(id) {
      this.$router.push(`/toolLibrary/materialManage/detail/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.material-manage-page {
  width: 100%;
  .open {
    background-image: url(../../../assets/table_icon/able.svg);
  }
  .close {
    background-image: url(../../../assets/table_icon/enable.svg);
  }
  .del {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
    cursor: pointer;
  }
  /deep/ .el-image .image-slot {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 14px;
    background: #f5f7fa;
    color: #c0c4cc;
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
}
</style>
