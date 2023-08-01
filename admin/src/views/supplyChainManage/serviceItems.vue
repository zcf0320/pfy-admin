<template>
  <div class="page-service-items">
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
              服务项<button
                v-if="pageAuthority.includes('add')"
                type="button"
                class="btn-save fr"
                @click="addOrLookServiceItems()"
              >
                新增
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">服务项名称:</span>
                  <el-input
                    v-model="filter.serviceName"
                    placeholder="请输入服务项名称"
                    class="search-input"
                    @keyup.enter.native="getServiceList()"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.serviceId"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getServiceList()"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">供应商:</span>
                  <el-select
                    v-model="filter.providerId"
                    filterable
                    placeholder="全部"
                    @change="getServiceList()"
                  >
                    <el-option
                      v-for="item in providerList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search mr-30"
                  @click.native.prevent="getServiceList()"
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
                  <span class="label-name">发布状态:</span>
                  <el-select
                    v-model="filter.postStatus"
                    filterable
                    placeholder="全部"
                    @change="getServiceList()"
                  >
                    <el-option
                      v-for="(item, key) in $enums['postStatusObj']"
                      :key="key"
                      :label="item"
                      :value="key"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">服务类型:</span>
                  <el-cascader
                    v-model="filter.reivewedTypeIds"
                    :options="prepointServices"
                    placeholder="全部"
                    :props="{
                      label: 'name',
                      value: 'id',
                    }"
                    filterable
                    popper-class="select-search"
                    @change="getServiceList()"
                  />
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
                      <span class="label-name">服务项别称:</span>
                      <el-input
                        v-model="filter.serviceAlias"
                        placeholder="全部"
                        class="search-input"
                        @keyup.enter.native="getServiceList()"
                      />
                    </div>
                  </div>
                  <div class="flex-box">
                    <img
                      class="collapse-icon"
                      src="../../assets/collapse.png"
                      alt=""
                      @click="showMore = false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Tab
              :btns="btns"
              :btn-style="{ overflow: 'visible' }"
              @change="tabsChange"
            />
            <el-table
              v-loading="tableLoading"
              :data="serviceList"
              class="table-large"
            >
              <el-table-column label="服务信息" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="mb-16">{{ scope.row.serviceId }}</div>
                  <div
                    class="link-skip"
                    @click="addOrLookServiceItems(scope.row.id, 'detail')"
                  >
                    {{ scope.row.serviceName || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="服务项别称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="mb-32">
                    {{ scope.row.serviceAlias || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="服务类型" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="mb-32">
                    <span v-if="scope.row.reivewedTypeId[0]">{{
                      `${serviceType[scope.row.reivewedTypeId[0]]}`
                    }}</span>
                    <span v-if="scope.row.reivewedTypeId[1]">{{
                      `- ${serviceType[scope.row.reivewedTypeId[1]]}`
                    }}</span>
                    <span v-if="scope.row.reivewedTypeId[2]">{{
                      `- ${serviceType[scope.row.reivewedTypeId[2]]}`
                    }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="供应商" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="mb-32">{{ scope.row.providerName || '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column label="更新时间">
                <template slot-scope="scope">
                  <div class="mb-32">
                    {{ scope.row.updateTime | timeFormat('yyyy-MM-dd') }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发布状态">
                <template slot-scope="scope">
                  <div class="mb-32">
                    <span
                      :class="[
                        'label-text',
                        $enums['columnPostStatusText'][scope.row.postStatus],
                      ]"
                      >{{ $enums['postStatusObj'][scope.row.postStatus] }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审批状态">
                <template slot-scope="scope">
                  <div class="mb-32">
                    <span
                      :class="[
                        'label-text',
                        checkColumn[scope.row.reviewStatus],
                      ]"
                      >{{ checkState[scope.row.reviewStatus] || '-' }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="mb-32">
                    <HoverTip
                      v-if="pageAuthority.includes('detail')"
                      content="查看"
                      tip-class-name="icon-detail mr-30"
                      @click.native.prevent="
                        addOrLookServiceItems(scope.row.id, 'detail')
                      "
                    />
                    <HoverTip
                      v-if="pageAuthority.includes('edit')"
                      content="编辑"
                      tip-class-name="icon-edit mr-30"
                      @click.native.prevent="
                        addOrLookServiceItems(scope.row.id, 'edit')
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
                      @onConfirm="deleteServiceItems(scope.row.id)"
                    >
                      <HoverTip
                        v-if="pageAuthority.includes('delete')"
                        slot="reference"
                        content="删除"
                        tip-class-name="icon-delete"
                      />
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
              <div
                v-show="!tableLoading && serviceList.length === 0"
                slot="empty"
                class="empty-img"
              />
            </el-table>
            <Pagination
              :total="total"
              :limit="filter.pageSize"
              :page.sync="filter.pageNum"
              layout="total, prev, pager, next"
              @pagination="getServiceList"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { checkState, checkColumn } from '@/utils/enum';
import { getConfirmNumber } from '@/utils/common';
export default {
  name: 'ServiceItems',
  data() {
    return {
      isShowClear: false,
      // 列表loading
      tableLoading: false,
      showMore: false,
      pagingOptions: {},
      total: 0,
      filter: {
        pageSize: 10,
        pageNum: 1,
        serviceId: '',
        serviceName: '',
        provideName: '',
        filterTime: [],
        postStatus: '',
        reivewedTypeIds: [],
        isLackStorage: null,
        serviceAlias: ''
      },
      serviceList: [],
      providerList: [],
      serviceType: {},
      prepointServices: [],
      checkColumn,
      checkState
    };
  },
  computed: {
    pageAuthority() {
      // 100102 服务项
      return this.$store.state.user.pageAuthority['100102'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        { name: '全部', value: '' },
        {
          name: '缺货',
          value: '1',
          isNumber: true,
          number: getConfirmNumber('ServiceItems') || 0
        }
      ];
    }
  },
  created() {
    const vm = this;
    // 编辑查看返回后查询之前分页数据
    this.filter.pageNum = Number(this.pageNum) || 1;
    vm.$store
      .dispatch('supplier/getProviderList', {
        pageNum: 1,
        pageSize: 10000
      })
      .then(res => {
        vm.providerList = res.records;
      });

    // 服务类型
    // 服务类型
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'prepointService'
      })
      .then(res => {
        this.prepointServices = res.obj || [];
        res.obj.forEach(item => {
          this.serviceType[item.id] = item.name;
          if (item.children) {
            item.children.forEach(child => {
              this.serviceType[child.id] = child.name;
              if (child.children) {
                child.children.forEach(m => {
                  this.serviceType[m.id] = m.name;
                });
              }
            });
          }
        });

        vm.getServiceList();
      });
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'ServiceItemsDetails' && from.params.id === 'add') {
      next(vm => {
        vm.clearFilter();
      });
    }
    next();
  },
  methods: {
    ...mapActions('serviceType', ['getTypeList']),
    refresh() {
      const vm = this;
      vm.getServiceList();
    },
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getServiceList();
    },
    // 获取列表
    getServiceList() {
      const vm = this;
      let query = this.$extends({}, this.filter);
      if (vm.filter.filterTime.length) {
        query.startTime = vm.filter.filterTime[0];
        query.endTime = vm.filter.filterTime[1];
      }
      query = this.$delEmptyKey(query);
      //
      if (this.$isNotEmpty(query.reivewedTypeIds)) {
        const length = query.reivewedTypeIds.length - 1;
        query.reivewedTypeId = query.reivewedTypeIds[length];
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('serviceItems/getServiceList', query)
        .then(response => {
          vm.tableLoading = false;
          vm.serviceList = response.records || [];
          vm.total = response.totalNum;
          // 查询完清除分页历史
          sessionStorage.removeItem('pageNum');
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 清除筛选条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        serviceId: '',
        serviceName: '',
        provideName: '',
        filterTime: [],
        pageNum: 1,
        pageSize: 10,
        serviceAlias: ''
      };
      vm.getServiceList();
    },
    // 新增服务项
    addOrLookServiceItems(id, type, index) {
      const vm = this;
      if (!id) {
        sessionStorage.setItem('pageNum', 1);
        this.$router.push({
          path: '/supplyChainManage/serviceItems/add-details/add/edit'
        });
      } else {
        sessionStorage.setItem('pageNum', vm.pagingOptions.pageNum);
        if (this.$isNotEmpty(index)) {
          if (!this.pageAuthority.includes('stockSetting')) {
            this.$message.warning('您无权限查看');
            return;
          }
          this.$router.push(
            `/supplyChainManage/serviceItems/details/${id}/${type}/7`,
          );
        } else {
          if (type === 'detail') {
            vm.$router.push({
              path: `/supplyChainManage/serviceItems/details/${id}/${type}`
            });
          } else {
            vm.$router.push({
              path: `/supplyChainManage/serviceItems/edit-details/${id}/${type}`
            });
          }
        }
      }
    },
    // 删除服务项
    deleteServiceItems(id) {
      const vm = this;
      vm.$store
        .dispatch('serviceItems/deleteServiceItems', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getServiceList({
              page: vm.pagingOptions.pageNum
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    },
    tabsChange(val) {
      this.filter.state = val;
      this.pagingOptions.pageNum = 1;
      if (val === '1') {
        this.filter.isLackStorage = 1;
      } else {
        this.filter.isLackStorage = '';
      }
      this.getServiceList();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table .cell {
  text-align: left;
}
.expand-icon,
.collapse-icon {
  width: 24px;
  height: 30px;
}
</style>
