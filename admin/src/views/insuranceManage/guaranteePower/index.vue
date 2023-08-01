<template>
  <div class="guarantee-power-page page-form modal-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            保障责任<button
              v-if="pageAuthority.includes('add')"
              type="button"
              class="btn-save fr"
              @click="createGuaranteePower"
            >
              新增
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">责任名称:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入责任名称"
                    class="search-input"
                    @keyup.enter.native="getProtectRightList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">主/附险:</span>
                  <el-select
                    v-model="filter.mainDeputy"
                    placeholder="全部"
                    filterable
                    @change="getProtectRightList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in mainDeputys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">保险分类:</span>
                  <el-cascader
                    v-model="filter.insuranceType"
                    :options="insuranceTypes"
                    placeholder="全部"
                    :props="optionProps"
                    @change="getProtectRightList({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getProtectRightList({ page: 1 })"
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
                <span class="label-name">保障责任类型:</span>

                <el-cascader
                  v-model="filter.rightType"
                  :options="rightTypes"
                  placeholder="全部"
                  :props="optionProps"
                  @change="getProtectRightList({ page: 1 })"
                />
              </div>
              <div class="form-item">
                <span class="label-name">发布状态:</span>
                <el-select
                  v-model="filter.postStatus"
                  placeholder="全部"
                  @change="getProtectRightList({ page: 1 })"
                >
                  <el-option
                    v-for="item in postStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
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
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="protectRightList"
          class="table-large"
        >
          <el-table-column label="责任名称">
            <template slot-scope="{ row }">
                 <div class="box">
              <div class="mb-16">{{ row.mainDeputy === 158 ? '主险' : '附险' }} |
             {{ row.name || '-' }}</div>
              <div class="table-sectext">{{ row.bizNo }}</div>
                 </div>
            </template>
          </el-table-column>
          <el-table-column label="保险分类">
            <template slot-scope="scope">
               <div class="box">{{ types[scope.row.insuranceType] || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="保障责任类型">
            <template slot-scope="{ row }">
               <div class="box">{{ row.rightTypeName || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="发布状态" width="210">
            <template slot-scope="scope">
                 <div class="box mb-16">
              <span
                :class="'label-text mb-16 ' + columnPostStatus[scope.row.postStatus]"
                >{{ postStatusObj[scope.row.postStatus] || '-' }}</span
              >
              <div class="table-sectext">
                {{
                  $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                }}
              </div>
                 </div>
            </template>
          </el-table-column>
          <el-table-column label="审批状态">
            <template slot-scope="{ row }">
                 <div class="box">
              <span
                :class="
                  'label-text ' +
                    $enums['ApprovalColumnClass'][row.approvalStatus]
                "
                >{{ ApprovalStatus[row.approvalStatus] || '-' }}</span
              >
                 </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                 <div class="box">
              <HoverTip
                v-if="
                  scope.row.postStatus !== 107 &&
                    pageAuthority.includes('detail')
                "
                content="查看"
                tip-class-name="icon-detail"
                @click.native.prevent="lookDetails(scope.row.id,'detail')"
              />
              <HoverTip
                v-if="
                  scope.row.postStatus === 107 && pageAuthority.includes('edit')
                "
                content="编辑"
                tip-class-name="icon-edit"
                @click.native.prevent="lookDetails(scope.row.id,'edit')"
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
          @pagination="getProtectRightList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { columnPostStatus, postStatusObj, ApprovalStatus } from '@/utils/enum';
export default {
  name: 'GuaranteePower',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      filter: {
        name: '',
        insuranceType: [],
        mainDeputy: '',
        postStatus: '',
        filterTime: [],
        rightType: []
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      mainDeputys: [],
      insuranceTypes: [],
      protectRightList: [],
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      columnPostStatus,
      postStatusObj,
      postStatusList: [],
      rightTypes: [],
      ApprovalStatus
    };
  },
  computed: {
    // 保险分类
    types() {
      return this.$store.state.guaranteePower.types;
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 170102 保障责任
      return this.$store.state.user.pageAuthority['170102'];
    }
  },
  created() {
    const vm = this;
    // 保险类别
    vm.$store.dispatch('insuranceProducts/getInsuranceTypes', {}).then(res => {
      vm.insuranceTypes = res.obj || [];
    });
    // 主险附险
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'mainDeputy'
      })
      .then(res => {
        vm.mainDeputys = res.obj || [];
      });
    // 发布状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        vm.postStatusList = res.obj || [];
      });
    // 获取保险类型
    this.$store.dispatch('guaranteePower/getListTypeTree').then(res => {
      this.rightTypes = res.data || [];
    });
    vm.getProtectRightList();
    if (this.pageNum) {
      this.getProtectRightList({
        page: Number(this.pageNum)
      });
    } else {
      this.getProtectRightList({});
    }
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getProtectRightList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        name: '',
        insuranceType: [],
        mainDeputy: '',
        postStatus: '',
        filterTime: [],
        rightType: []
      };
      this.getProtectRightList();
    },
    // 获取责任列表
    getProtectRightList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        insuranceType: vm.filter.insuranceType.length
          ? vm.filter.insuranceType[1]
          : '',
        pageNum: vm.pagingOptions.pageNo,
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
      const query = this.$delEmptyKey(params);
      if (this.$isNotEmpty(query.rightType)) {
        query.rightType = query.rightType[1];
      }
      delete query.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('guaranteePower/getProtectRightList', query)
        .then(res => {
          vm.tableLoading = false;
          vm.protectRightList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id, type) {
      if (type === 'detail') {
      this.$router.push(
        `/insuranceManage/guaranteePower/guaranteePowerDetails/${id}`,
      );
      } else if (type === 'edit') {
       this.$router.push(
        `/insuranceManage/guaranteePower/content-edit/${id}`,
       );
      }
    },
    // 新增
    createGuaranteePower() {
      this.$router.push(`/insuranceManage/guaranteePower/create`);
    },
    // 删除保障责任
    deleteGuaranteePower(id) {
      const vm = this;
      vm.$confirm('此操作将永久删除该保障责任, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('guaranteePower/deleteGuaranteePower', {
            id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.getProtectRightList({
                page: vm.pagingOptions.pageNo
              });
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.guarantee-power-page {
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
  .clear {
    color: #ff625e;
    border-color: #ff625e;
    &:hover {
      background-color: #ffefef;
    }
  }
  .export-button {
    color: #2276ff;
    border-color: #2276ff;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .box{
    height: 50px;
  }
}
</style>
