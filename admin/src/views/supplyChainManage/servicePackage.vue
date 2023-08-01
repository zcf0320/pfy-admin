<template>
  <div class="page-service-package-items">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="panel filter-box">
          <div class="panel-body">
            <div class="title-top">
              服务包<button
                v-if="pageAuthority.includes('add')"
                type="button"
                class="btn-save fr"
                @click="addOrUpdateServicePackage('add', 'edit')"
              >
                新增
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">服务包名称:</span>
                  <el-input
                    v-model="filter.packageName"
                    placeholder="请输入服务包名称"
                    class="search-input"
                    @keyup.enter.native="getServicePackageList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">服务包ID:</span>
                  <el-input
                    v-model="filter.orderNumber"
                    placeholder="请输入服务包ID"
                    class="search-input"
                    @keyup.enter.native="getServicePackageList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">发布状态:</span>
                  <el-select
                    v-model="filter.postStatus"
                    placeholder="全部"
                    @change="getServicePackageList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in postStatusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
                <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search mr-30"
                  @click.native.prevent="getServicePackageList({ page: 1 })"
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
                <div class="form-item">
                  <span class="label-name">使用类型:</span>
                  <el-select
                    v-model="filter.packageType"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getServicePackageList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in packageTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">创建人:</span>
                  <el-select
                    v-model="filter.creator"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="getServicePackageList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
                <div v-if="!showMore" class="flex-box">
                <img
                 class="expand-icon"
                 src="../../assets/expand.png"
                 alt=""
                 @click="showMore = true"
                 />
              </div>
                     <div v-if="showMore" class="filter-box">
                 <div class="search-form flex-between">
                  <div class="flex-box">
                       <div class="form-item">
                          <span class="label-name">已下架服务:</span>
                          <el-select
                            v-model="filter.postStatus2"
                            :disabled="!!filter.postStatus"
                            @change="getServicePackageList({ page: 1 })"
                          >
                            <el-option
                              v-for="item in OffList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            />
                          </el-select>
                       </div>
                  </div>
                   <div class="flex-box">
                      <img
                      class="collapse-icon"
                      src="../../assets/collapse.png"
                      alt=""
                      @click="showMore = false"/>
                    </div>
                 </div>
              </div>

            </div>
            <el-table
              v-loading="tableLoading"
              :data="servicePackageList"
              class="table-large"
            >
              <el-table-column
                label="服务信息"
                width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="mb-16">{{ scope.row.orderNumber }}</div>
                  <div
                    class="link-skip"
                    @click="addOrUpdateServicePackage(scope.row.id, 'detail')"
                  >
                    {{ scope.row.packageName || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="简介">
                <template slot-scope="scope">
                  <div
                    class="mb-32"
                    >{{ scope.row.packageDescribe || '-' }}</div
                  >
                </template>
              </el-table-column>
              <el-table-column label="使用类型">
                <template slot-scope="scope">
                  <div

                    class="mb-32"
                    >{{ scope.row.packageType || '-' }}</div
                  >
                </template>
              </el-table-column>
              <el-table-column label="创建人" >
                <template slot-scope="scope">
                  <div

                    class="mb-32"
                    >{{ scope.row.creator || '-' }}</div
                  >
                </template>
              </el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <div class="mb-32">
 <span
                    :class="[
                      'label-text',
                      columnPostStatusText[scope.row.postStatus],
                    ]"
                  >
                    {{ postStatusObj[scope.row.postStatus] || '-' }}</span
                  >
                    </div>

                </template>
              </el-table-column>
              <el-table-column label="审批状态" >
                <template slot-scope="scope">
                    <div class="mb-32">
 <span
                    :class="['label-text', checkColumn[scope.row.reviewStatus]]"
                    >{{ checkState[scope.row.reviewStatus] || '-' }}</span
                  >
                    </div>

                </template>
              </el-table-column>
              <el-table-column label="更新时间" >
                <template slot-scope="scope">
                  <div class="mb-32"
                    >{{ scope.row.updateTime | timeFormat('yyyy-MM-dd') }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="mb-32">

                  <HoverTip
                    v-if="pageAuthority.includes('detail')"
                    content="查看"
                    tip-class-name="icon-detail  mr-30"
                    @click.native.prevent="
                      addOrUpdateServicePackage(scope.row.id, 'detail')
                    "
                  />
                  <HoverTip
                    v-if="pageAuthority.includes('edit')"
                    content="编辑"
                    tip-class-name="icon-edit  mr-30"
                    @click.native.prevent="
                      addOrUpdateServicePackage(scope.row.id, 'edit')
                    "
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
              @pagination="getServicePackageList"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import {
  postStatusObj,
  columnPostStatus,
  columnPostStatusText,
  checkState,
  checkColumn
} from '@/utils/enum';
export default {
  name: 'ServicePackage',
  data() {
    return {
      isShowClear: false,
      // 列表loading
      tableLoading: false,
      showMore: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      filter: {
        orderNumber: '',
        packageName: '',
        postStatus: '',
        filterTime: [],
        packageType: '',
        creator: '',
        postStatus2: 106
      },
      servicePackageList: [],
      postStatusObj,
      columnPostStatus,
      postStatusList: [],
      packageTypes: [],
      userList: [],
      checkColumn,
      checkState,
      columnPostStatusText,
      OffList: [
        { name: '不展示', id: 106 },
        { name: '展示', id: null }
      ]
    };
  },
  computed: {
    pageAuthority() {
      // 100103 服务包
      return this.$store.state.user.pageAuthority['100103'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    const vm = this;
    // 发布状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        vm.postStatusList = res.obj || [];
      });
    // 编辑查看返回后查询之前分页数据
    if (this.pageNum) {
      vm.getServicePackageList({
        page: Number(this.pageNum)
      });
    } else {
      vm.getServicePackageList({});
    }
    this.getUserList();
    this.getServicePackages();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'ServicePackageDetails' && from.params.id === 'add') {
      next(vm => {
        vm.clearFilter();
      });
    }
    next();
  },
  methods: {
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getServicePackageList({ page: 1 });
    },
    // 获取服务包列表
    getServicePackageList(pageInfo) {
      const vm = this;
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1
      };
      vm.filter.orderNumber && (params.orderNumber = vm.filter.orderNumber);
      vm.filter.packageName && (params.packageName = vm.filter.packageName);

      vm.filter.packageType && (params.packageType = vm.filter.packageType);
      vm.filter.creator && (params.creator = vm.filter.creator);
      vm.filter.postStatus2 && (params.postStatus2 = vm.filter.postStatus2);
      if (vm.filter.postStatus) {
        params.postStatus = vm.filter.postStatus;
        delete params.postStatus2;
      }
      if (vm.filter.filterTime.length) {
        params.startTime = vm.filter.filterTime[0];
        params.endTime = vm.filter.filterTime[1];
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('servicePackage/getServicePackageList', params)
        .then(response => {
          vm.tableLoading = false;
          const { totalNum } = response;
          vm.servicePackageList = response.records;
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 清除筛选条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        orderNumber: '',
        packageName: '',
        packageTypes: '',
        postStatus: '',
        creator: '',
        filterTime: [],
        postStatus2: 106
      };
      vm.getServicePackageList({});
    },
    // 新增服务项
    addOrUpdateServicePackage(id, type) {
      if (id === 'add') {
         this.$router.push({
        path: `/supplyChainManage/servicePackage/add/${id}/${type}`
      });
      return;
      }
      if (type === 'edit') {
         this.$router.push({
        path: `/supplyChainManage/servicePackage/edit/${id}/${type}`
      });
      return;
      }
      this.$router.push({
        path: `/supplyChainManage/servicePackage/details/${id}/${type}`
      });
    },
    // 服务包删除
    deleteServicePackage(id) {
      const vm = this;
      vm.$confirm('此操作将永久删除该服务包, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('servicePackage/deleteServicePackage', {
            id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.getServicePackageList({
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
    },
    // 服务包类型
    getServicePackages() {
      this.$store
        .dispatch('app/getSysConfig', {
          code: 'packageType'
        })
        .then(res => {
          this.packageTypes = res.obj || [];
        });
    },
    // 查询用户列表
    getUserList() {
      const params = {
        pageNum: 1,
        pageSize: 99999
      };
      this.$store.dispatch('employee/getEmployeeAll', params).then(res => {
          this.userList = res.data || [];
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search-form {
  // flex-wrap: nowrap !important;
}
.el-table .cell {
  text-align: left;
}
.expand-icon,
.collapse-icon {
  width: 24px;
  height: 30px;
}
</style>
