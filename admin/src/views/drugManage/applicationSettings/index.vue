<template>
  <el-container>
    <!-- <el-main> -->
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="application-settings-page">
        <div class="title-top">
          应用设置
          <!-- <el-dropdown trigger="click" class="btn-save fr drug-drop">
            <el-button type="plain" class="add">
              新增服务类型<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
@click.native="createType('add', 2, 'single')"
><div class="drug-drop-item flex">
                  <div class="single"></div>
                  新增单药品
                </div></el-dropdown-item>
              <el-dropdown-item
@click.native="createType('add', 2, 'double')"
><div class="drug-drop-item flex">
                  <div class="double"></div>
                  新增组合药品
                </div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <button
            type="button"
            class="btn-save fr"
            @click="dialogVisible = true"
          >
            新增药单
          </button>
        </div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">类型名称:</span>
                  <el-input
                    v-model="filter.settingName"
                    placeholder="请输入类型名称"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">药品名称:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入药品名称"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">更新时间:</span>
                  <el-date-picker
                    v-model="filterTime"
                    type="daterange"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="search-input"
                    @change="changeTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search mr-30"
                  @click.native.prevent="getApplicationList({ page: 1 })"
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
        <div class="content">
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="list"
              class="table-list table-large"
            >
              <el-table-column
                label="名称"
                min-width="70"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.settingName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="药品信息" min-width="150">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.names.join('、')"
                    placement="top-start"
                  >
                    <span>{{ scope.row.names.join('、') }}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="类型">
                <template slot-scope="scope">
                  {{ scope.row.type === 1 ? '组合药品' : '单药品' }}
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
                      createType(
                        scope.row.id,
                        1,
                        scope.row.type === 0 ? 'single' : 'double',
                        scope.row.assignMedicineSupplier ? 1 : 0,
                      )
                    "
                  />
                  <HoverTip
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="
                      createType(
                        scope.row.id,
                        2,
                        scope.row.type === 0 ? 'single' : 'double',
                        scope.row.assignMedicineSupplier ? 1 : 0,
                      )
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
                    @onConfirm="deleteType(scope.row.id)"
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
              @pagination="getApplicationList"
            />
          </div>
        </div>
        <Dialog
          title="新增药单类型"
          :visible.sync="dialogVisible"
          :height="400"
          :width="500"
          @closed="
            val => {
              dialogVisible = false;
            }
          "
        >
          <el-form
            ref="addDrugType"
            :model="addDrugType"
            label-position="left"
            class="drug-type-dialog"
          >
            <el-form-item label="药单类型">
              <el-radio-group v-model="addDrugType.drugType">
                <el-radio label="single">单药品</el-radio>
                <el-radio label="double">组合药品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否指定药商供药">
              <el-radio-group v-model="addDrugType.supplier">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="goAddDrug">创建药单</el-button>
          </span>
        </Dialog>
      </div>
      <!-- </el-main> -->
    </el-scrollbar>
  </el-container>
</template>
<script>
export default {
  name: 'ApplicationSettings',
  data() {
    return {
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      list: [],
      filter: {
        startUpdateTime: '',
        endUpdateTime: '',
        name: '',
        settingName: ''
      },
      filterTime: '',
      dialogVisible: false,
      addDrugType: {
        drugType: 'single',
        supplier: 0
      }
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getApplicationList();
    if (this.pageNum) {
      this.getApplicationList({
        page: Number(this.pageNum)
      });
    } else {
      this.getApplicationList({});
    }
  },
  methods: {
    // 创建药单跳转
    goAddDrug() {
      this.createType(
        'add',
        2,
        this.addDrugType.drugType,
        this.addDrugType.supplier,
      );
    },
    // 筛选时间改变
    changeTime(val) {
      if (val) {
        this.filter.startUpdateTime = val[0];
        this.filter.endUpdateTime = val[1];
      }
    },
    // 获取商品列表
    getApplicationList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: vm.pagingOptions.pageNo,
        pageSize: 10
      };
      Object.assign(params, this.filter);
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      this.$store
        .dispatch('drugManage/getApplicationList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.list = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 新增服务分类
    createType(id, type, combine, supplier) {
      this.$router.push({
        path: `/drugManage/applicationSettings/create/${id}/${type}/${combine}`,
        query: {
          supplier
        }
      });
      this.$store.commit('drugManage/SET_PAGE_STATE', true);
      this.$store.commit('drugManage/SET_GOODS', {
        goodsList: [],
        goodsListIds: []
      });
      this.$store.commit('drugManage/SET_SERVICE_TYPE_NAME', '');
    },
    // 删除分类
    deleteType(id) {
      const vm = this;
      vm.$store
        .dispatch('drugManage/deleteApplication', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getApplicationList({
              page: vm.pagingOptions.pageNo
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    },
    clearFilter() {
      this.filter = {
        startUpdateTime: '',
        endUpdateTime: '',
        name: '',
        settingName: ''
      };
      this.filterTime = '';
      this.getApplicationList({ page: 1 });
    }
  }
};
</script>
<style lang="scss" scoped>
.application-settings-page {
  background: #fff;
  /deep/ .drug-type-dialog {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .add {
    border: 1px solid #3599fe;
    color: #3599fe;
  }
  .page-title {
    padding: 0 0 19px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    display: flex;
    align-items: center;
    .title {
      color: #333333;
      font-weight: 500;
      flex: 1;
    }
  }
  .content {
    .tabs {
      display: flex;
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      .tab-item {
        padding: 18px 0;
        margin-right: 48px;
        color: #333333;
        font-size: 16px;
        cursor: pointer;
        transition: color 0.1s ease;
      }
      .tab-item-active {
        position: relative;
        color: #2276ff;
        font-weight: 500;
        &::after {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #2276ff;
        }
      }
    }
    .table {
      margin-top: 24px;
      .message {
        padding-left: 10px;
        .text {
          color: #6f6f6f;
          margin: 24px 0;
          font-size: 16px;
          line-height: 16px;
          &:first-child {
            color: #333333;
          }
        }
      }
    }
  }
}
.el-dropdown-menu {
  .el-dropdown-menu__item {
    .drug-drop-item {
      justify-content: flex-start;
      align-items: center;
      .single {
        width: 14px;
        height: 14px;
        background: url('./images/single.svg');
        background-size: contain;
        margin-right: 7px;
      }
      .double {
        width: 14px;
        height: 14px;
        background: url('./images/double.svg');
        background-size: contain;
        margin-right: 7px;
      }
      &:hover {
        .single {
          background: url('./images/single_active.svg');
        }
        .double {
          background: url('./images/double_active.svg');
        }
      }
    }
  }
}
</style>
