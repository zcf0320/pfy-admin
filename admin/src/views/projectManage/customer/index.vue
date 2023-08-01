<template>
  <div class="page-supplier">
    <el-container>
      <!-- <el-main class="filter-form"> -->
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="panel filter-box">
          <div class="panel-body">
            <div class="title-top">
              企业客户<button
                v-if="pageAuthority.includes('add')"
                type="button"
                class="btn-save fr"
                @click="addOrLookSupplier('add', 'edit')"
              >
                新增
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID：</span>
                  <el-input
                    v-model="filter.companyCode"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getProviderList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">企业名称：</span>
                  <el-input
                    v-model="filter.companyName"
                    placeholder="请输入企业名称"
                    class="search-input"
                    @keyup.enter.native="getProviderList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">更新时间：</span>
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
                  @click.native.prevent="getProviderList({ page: 1 })"
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
                  <span class="label-name">状态：</span>
                  <el-select
                    v-model="filter.accountStatus"
                    filterable
                    placeholder="全部"
                    @change="getProviderList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
            </div>
            <el-table
              v-loading="tableLoading"
              :data="providerList"
              class="table-large"
            >
              <el-table-column label="客户信息" >
                <template slot-scope="scope">
                  <div class="box">
                    <div class="mb-16">{{ scope.row.companyName || '-' }}</div>
                     <div class="bottom">{{ scope.row.companyCode }}</div>
                  </div>

                </template>
              </el-table-column>
              <el-table-column label="简称">
                <template slot-scope="scope">
                  <div class="box">{{
                    scope.row.companySimpleName
                  }}</div>
                </template>
              </el-table-column>
              <el-table-column label="所属地区">
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.region || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="账号状态">
                <template slot-scope="scope">
                      <div class="box mb-16">
                  <span
                    :class="[
                      'label-text',
                      accountColumn[scope.row.accountStatus],
                    ]"
                    >{{ accountState[scope.row.accountStatus] || '-' }}</span
                  >
                      </div>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="scope">
                      <div class="box mb-16">
                  <span
                    :class="['label-text', checkColumn[scope.row.reviewStatus]]"
                    >{{ checkState[scope.row.reviewStatus] || '-' }}</span
                  >
                      </div>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" >
                <template slot-scope="scope">
                   <div class="box">{{
                    scope.row.updateTime | timeFormat('yyyy-MM-dd')
                  }}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                      <div class="box mb-16">
                  <HoverTip
                    v-if="pageAuthority.includes('detail')"
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
                    @click.native.prevent="
                      addOrLookSupplier(scope.row.id, 'detail')
                    "
                  />
                  <HoverTip
                    v-if="pageAuthority.includes('edit')"
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="
                      addOrLookSupplier(scope.row.id, 'edit')
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
                    @onConfirm="deleteSupplier(scope.row.id)"
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
            <Pagination
              :total="pagingOptions.total"
              :limit="pagingOptions.pageSize"
              :page="pagingOptions.pageNo"
              layout="total, prev, pager, next"
              @pagination="getProviderList"
            />
          </div>
        </div>
      </el-scrollbar>
      <!-- </el-main> -->
    </el-container>
  </div>
</template>
<script>
import {
  accountState,
  accountColumn,
  checkState,
  checkColumn
} from '@/utils/enum';
export default {
  name: 'Supplier',
  data() {
    return {
      isShowClear: false,
      // 列表loading
      tableLoading: false,
      providerList: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      filter: {
        companyName: '',
        companyCode: '',
        filterTime: [],
        accountStatus: ''
      },
      options: [
      ],
      accountState,
      accountColumn,
      checkColumn,
      checkState
    };
  },
  computed: {
    pageAuthority() {
      // 100101 供应商
      return this.$store.state.user.pageAuthority['100101'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    const vm = this;
    vm.getLocations();
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'companyCustomerState'
      })
      .then(res => {
        this.options = res.data || [];
      });
  },
  methods: {
    // 获取地区数据
    getLocations() {
      this.$store.dispatch('app/getLocations').then(() => {
        // 请求完区域接口再请求列表接口
        if (this.pageNum) {
          this.getProviderList({
            page: Number(this.pageNum)
          });
        } else {
          this.getProviderList({});
        }
      });
    },
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getProviderList({ page: 1 });
    },
    // 获取供应商列表
    getProviderList(pageInfo) {
      const vm = this;
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1
      };
      vm.filter.companyCode && (params.companyCode = vm.filter.companyCode);
      vm.filter.companyName && (params.companyName = vm.filter.companyName);
      vm.filter.accountStatus &&
        (params.accountStatus = vm.filter.accountStatus);
      if (vm.filter.filterTime.length) {
        params.startTime = vm.filter.filterTime[0];
        params.endTime = vm.filter.filterTime[1];
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('enterpriseCustomers/getCustomerList', params)
        .then(response => {
          const getLocationList = vm.$store.state.app.locationList || [];
          let region = '';
          vm.tableLoading = false;
          const { totalNum } = response;
          vm.providerList = response.records;
          // 地区回显处理显示中文
          vm.providerList.forEach(item => {
            item.location.forEach(id => {
              getLocationList.forEach(obj => {
                if (obj.id === id) {
                  region = obj.name;
                }
                obj.citys.forEach(child => {
                  if (child.id === id) {
                    region
                      ? (region = `${region} - ${child.name}`)
                      : (region = child.name);
                  }
                });
              });
            });
            item.region = region;
          });
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
      //   //企业筛选
      //   let params1 = {
      //     pageNum: 1,
      //     pageSize: 100
      //   }
      //   vm.$store
      //     .dispatch('supplier/getProviderList', params1)
      //     .then(item => {
      //       this.options = []
      //       //企业筛选
      //       item.records.forEach(element => {
      //         let obj = {
      //           value: element.companyName,
      //           lable: element.companyCode
      //         }
      //         this.options.push(obj)
      //       })
      //     })
    },
    // 清除筛选条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        companyName: '',
        companyCode: '',
        filterTime: [],
        accountStatus: ''
      };
      vm.getProviderList({});
    },
    // 新增供应商
    addOrLookSupplier(id, type) {
      const vm = this;
      if (id === 'add') {
        vm.$router.push({
        path: `/projectManage/customerAdd/${id}/${type}`
      });
      } else if (type === 'detail') {
        vm.$router.push({
        path: `/projectManage/customer/detail/${id}/${type}`
      });
      } else if (type === 'edit') {
        vm.$router.push({
        path: `/projectManage/customerEdit/${id}/${type}`
      });
      }
    },
    // 供应商删除
    deleteSupplier(id) {
      const vm = this;
      vm.$store
        .dispatch('enterpriseCustomers/deleteCustomer', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getProviderList({
              page: vm.pagingOptions.pageNo
            });
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
.search-form {
  .search-input {
    width: 200px;
    &.username {
      margin-right: 24px;
    }
  }
}
.operation-buttons {
  margin-bottom: 24px;
  .el-button {
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
.box{
    height: 50px;
}
.page-supplier {
  .bottom {
    color: #989ab3;
  }
}
</style>
