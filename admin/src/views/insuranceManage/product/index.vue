<template>
  <div class="page-insurance-products">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="filter-box">
            <div class="title-top">
              保险产品<button
                v-if="pageAuthority.includes('add')"
                type="button"
                class="btn-save fr"
                @click="addOrUpdateInsuranceProducts({ step: 1 }, 'add')"
              >
                新增
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">名称:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入名称"
                    class="search-input"
                    @keyup.enter.native="getInsuranceProductsList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.orderNumber"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getInsuranceProductsList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">保险分类:</span>
                  <el-cascader
                    v-model="filter.insuranceType"
                    :options="insuranceTypes"
                    placeholder="全部"
                    :props="optionProps"
                    filterable
                    @change="getInsuranceProductsList({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getInsuranceProductsList({ page: 1 })"
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
                  <span class="label-name">发布状态:</span>
                  <el-select
                    v-model="filter.postStatus"
                    placeholder="全部"
                    @change="getInsuranceProductsList({ page: 1 })"
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
                  <span class="label-name">屏蔽状态:</span>
                  <el-select
                    v-model="filter.shield"
                    placeholder="全部"
                    @change="getInsuranceProductsList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in shieldList"
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
              <div v-if="!showMore" class="flex-box">
                <img
                  class="expand-icon"
                  src="../../../assets/expand.png"
                  alt=""
                  @click="showMore = true"
                />
              </div>
            </div>
            <div v-if="showMore" class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">已下架产品:</span>
                    <el-select
                      v-model="filter.displayFlag"
                      placeholder="全部"
                      @change="getInsuranceProductsList({ page: 1 })"
                    >
                      <el-option
                        v-for="item in displayFlags"
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
                    src="../../../assets/collapse.png"
                    alt=""
                    @click="showMore = false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-body">
            <el-table
              v-loading="tableLoading"
              :data="insuranceProductsList"
              class="table-list table-large"
            >
              <el-table-column label="产品名称">
                <template slot-scope="scope">
                  <div>
                    <div class="text-16 mb-16">{{ scope.row.name || '-' }}</div>
                    <div class="text-14">
                      {{ scope.row.orderNumber || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="基础信息">
                <template slot-scope="scope">
                  <div>
                    <div class="text-16 mb-16">
                      {{ scope.row.saleChannel === 99 ? '个险' : '团险' }}
                      <span class="dividing-line">|</span>
                      {{ scope.row.mainRightName || '-' }}
                    </div>
                    <div class="text-14">
                      {{ scope.row.insuranceCompanyName }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="预设销量 / 补仓预估销量">
                <template slot-scope="scope">
                  <div>
                    <div class="text-16 mb-16">
                      {{
                        scope.row.presetSale || scope.row.estimateSupplementNum
                          ? `${scope.row.presetSale || '-'} / ${scope.row
                              .estimateSupplementNum || '-'}`
                          : '-'
                      }}
                    </div>
                    <div
                      class="preset-sales-volume"
                      @click="setPresetSale(scope.row)"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发布状态" width="210">
                <template slot-scope="scope">
                  <div>
                    <el-popover
                      v-if="scope.row.postStatus === 107"
                      placement="top-end"
                      width="500"
                      trigger="hover"
                    >
                      <div class="information-steps">
                        <div
                          v-for="item in steps"
                          :key="item.index"
                          class="steps-item"
                        >
                          <div
                            :class="[
                              'steps-name',
                              (scope.row.step >= item.index ||
                                scope.row.step === 0) &&
                                'steps-name-active',
                            ]"
                          >
                            {{ item.name }}
                          </div>
                          <div
                            v-if="
                              scope.row.step >= item.index ||
                                scope.row.step === 0
                            "
                            class="steps-complete"
                          />
                        </div>
                      </div>
                      <div
                        slot="reference"
                        :class="[
                          columnPostStatusText[scope.row.postStatus],
                          'pointer',
                        ]"
                      >
                        {{ postStatusObj[scope.row.postStatus] }} ({{
                          scope.row.step || 7
                        }}/7)
                      </div>
                    </el-popover>
                    <div
                      v-else
                      :class="[columnPostStatusText[scope.row.postStatus]]"
                    >
                      {{ postStatusObj[scope.row.postStatus] }}
                      <div v-if="scope.row.shield === 108" class="shield" />
                    </div>
                    <div class="text-14 mt-16">
                      {{
                        $moment(scope.row.updateTime).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="scope">
                  <div class="mb-32">
                    {{ ApprovalStatus[scope.row.approvalStatus] || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <div class="mb-32">
                    <HoverTip
                      v-if="
                        pageAuthority.includes('detail') && scope.row.step === 0
                      "
                      content="查看"
                      tip-class-name="icon-detail"
                      class="mr-30"
                      @click.native.prevent="
                        addOrUpdateInsuranceProducts(scope.row, 'detail')
                      "
                    />
                    <HoverTip
                      v-if="pageAuthority.includes('edit')"
                      content="编辑"
                      tip-class-name="icon-edit"
                      class="mr-30"
                      @click.native.prevent="
                        addOrUpdateInsuranceProducts(scope.row, 'edit')
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
              @pagination="getInsuranceProductsList"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import {
  insuranceType,
  postStatusObj,
  columnPostStatus,
  columnPostStatusText,
  ApprovalStatus
} from '@/utils/enum';
export default {
  name: 'InsuranceProducts',
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
      insuranceProductsList: [],
      filter: {
        orderNumber: '',
        name: '',
        insuranceType: [],
        postStatus: '',
        filterTime: [],
        shield: '',
        displayFlag: true
      },
      insuranceType,
      insuranceTypes: [],
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      postStatusObj,
      columnPostStatus,
      columnPostStatusText,
      postStatusList: [],
      steps: [
        {
          index: 1,
          name: '基础信息'
        },
        {
          index: 2,
          name: '主险权益'
        },
        {
          index: 3,
          name: '保障计划'
        },
        {
          index: 4,
          name: '服务包'
        },
        {
          index: 5,
          name: '审核材料'
        },
        {
          index: 6,
          name: '投保规则'
        },
        {
          index: 7,
          name: '保单配置'
        }
      ],
      shieldList: [
        {
          id: 184,
          name: '未屏蔽'
        },
        {
          id: 108,
          name: '已屏蔽'
        }
      ],
      displayFlags: [
        {
          id: true,
          name: '不展示'
        },
        {
          id: false,
          name: '展示'
        }
      ],
      ApprovalStatus
    };
  },
  computed: {
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    const vm = this;
    if (this.pageNum) {
      this.getInsuranceProductsList({
        page: Number(this.pageNum)
      });
    } else {
      this.getInsuranceProductsList({});
    }
    // 保险类别
    vm.$store.dispatch('insuranceProducts/getInsuranceTypes', {}).then(res => {
      vm.insuranceTypes = res.obj || [];
    });
    // 发布状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        vm.postStatusList = res.obj || [];
      });
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'CreateProduct') {
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
      this.getInsuranceProductsList({ page: 1 });
    },
    // 获取保险产品列表
    getInsuranceProductsList(pageInfo) {
      const vm = this;
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1
      };
      vm.filter.orderNumber && (params.orderNumber = vm.filter.orderNumber);
      vm.filter.name && (params.name = vm.filter.name);
      vm.filter.postStatus && (params.postStatus = vm.filter.postStatus);
      vm.filter.shield && (params.shield = vm.filter.shield);
      if (vm.filter.filterTime.length) {
        params.startTime = vm.filter.filterTime[0];
        params.endTime = vm.filter.filterTime[1];
      }
      vm.filter.insuranceType.length &&
        (params.insuranceType = vm.filter.insuranceType[1]);

      params.displayFlag = vm.filter.displayFlag ? 106 : null;
      // if (vm.filter.postStatus !== 106) {
      // }
      vm.tableLoading = true;
      vm.$store
        .dispatch('insuranceProducts/getInsuranceProductsList', params)
        .then(response => {
          vm.tableLoading = false;
          const { totalNum } = response;

          vm.insuranceProductsList = response.records;
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
        name: '',
        insuranceType: [],
        postStatus: '',
        filterTime: [],
        shield: '',
        displayFlag: true
      };
      vm.getInsuranceProductsList({});
    },
    // 新增或者查看保险产品
    addOrUpdateInsuranceProducts(item, type) {
      if (item.step) {
        if (!item.id) {
          this.$router.push({
            path: `/insuranceManage/insuranceProducts/create/add`
          });
        } else {
          if (type === 'detail') {
            this.$router.push({
              path: `/insuranceManage/insuranceProducts/details/${item.id}/${type}`
            });
          } else {
            this.$router.push({
              path: `/insuranceManage/insuranceProducts/create/${item.id}`
            });
          }
        }
      } else {
        if (type === 'detail') {
          this.$router.push({
            path: `/insuranceManage/insuranceProducts/details/${item.id}/${type}`
          });
        } else {
          this.$router.push({
            path: `/insuranceManage/insuranceProducts/content-edit/${item.id}/${type}`
          });
        }
      }
    },
    // 删除保险产品
    deleteInsuranceProducts(id) {
      const vm = this;
      vm.$confirm('此操作将永久删除该保险产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('insuranceProducts/deleteInsuranceProducts', {
            id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.getInsuranceProductsList({
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
    // 预设销量设置
    setPresetSale(row) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${row.id}/edit/8`
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.page-insurance-products {
  .expand-icon,
  .collapse-icon {
    width: 24px;
    height: 30px;
  }
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

  .table-list {
    .text-16 {
      font-size: 14px;
      font-weight: 400;
      color: #464668;
      .dividing-line {
        margin: 0 6px;
      }
    }
    .text-14 {
      font-size: 14px;
      font-weight: 400;
      color: #989ab3;
    }
    .pointer {
      cursor: pointer;
    }
    .preset-sales-volume {
      width: 20px;
      height: 20px;
      background-image: url('../../../assets/table_icon/preset-sales-volume.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
.el-table .cell {
  text-align: left;
}
.information-steps {
  width: 574px;
  display: flex;
  .steps-item {
    width: 56px;
    color: #989ab3;
    margin-right: 12px;
    .steps-name {
      text-align: center;
    }
    .steps-name-active {
      color: #464668;
    }
    .steps-complete {
      width: 20px;
      height: 20px;
      background-image: url('../../../assets/insurance/step-complete.svg');
      background-size: 100% 100%;
      margin: 12px auto 0;
    }
  }
}
</style>
