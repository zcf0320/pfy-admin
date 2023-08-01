<template>
  <div class="policy-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            团险保单<button
              type="button"
              class="btn-save fr"
              @click="createPolicy"
            >
              新增保单
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">保单号:</span>
                  <el-input
                    v-model="filter.policyNo"
                    placeholder="请输入保单号"
                    class="search-input"
                    @keyup.enter.native="getPolicyList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">保险公司:</span>
                  <el-select
                    v-model="filter.insuranceCompanyId"
                    placeholder="全部"
                    filterable
                    @change="getPolicyList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in insuranceCompany"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">撤单状态:</span>
                  <el-select
                    v-model="filter.state"
                    class="search-input"
                    placeholder="全部"
                    @change="getPolicyList({ page: 1 })"
                  >
                    <el-option label="正常" value="0" />
                    <el-option label="已撤单" value="1" />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getPolicyList({ page: 1 })"
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
                <span class="label-name">生成时间:</span>
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
                <span class="label-name">保险产品:</span>
                <el-select
                  v-model="filter.insuranceProductId"
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="getInsuranceProductList"
                  placeholder="请输入保险产品"
                  clearable
                  @change="getPolicyList({ page: 1 })"
                >
                  <el-option
                    v-for="item in insuranceProductsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">保障计划:</span>
                <el-select
                  v-model="filter.planId"
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="getInsurancePlans"
                  placeholder="请输入保障计划"
                  clearable
                  @change="getPolicyList({ page: 1 })"
                >
                  <el-option
                    v-for="item in insurancePlans"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="policyList"
          class="table-large"
        >
          <el-table-column label="保险产品">
            <template slot-scope="scope">
              <div class="box">
                <div
                  class="text-warning text-underling mb-16 cursor-pointer"
                  @click="lookProduct(scope.row.productId)"
                >
                  {{ scope.row.productName || '-' }}
                </div>
                <div class="text-default">{{ scope.row.policyNo || '-' }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="保障计划">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.planName || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="保险公司">
            <template slot-scope="scope">
              <div class="box">
                <div class="text-warning mb-16">
                  {{ scope.row.companyName || '-' }}
                </div>
                <div class="text-default">
                  {{ $moment(scope.row.effectiveDate).format('YYYY-MM-DD') }} ~ {{
                    $moment(scope.row.expiryDate).format('YYYY-MM-DD')
                  }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="撤单状态" >
            <template slot-scope="scope">
              <div class="box mb-16">
                <div
                  :class="[
                    'mb-16 label-text',
                    policyStatusText[scope.row.state],
                  ]"
                >
                  {{ policyStatus[scope.row.state] }}
                </div>
                <div class="text-default">
                  {{
                    $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                <div class="box mb-16">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
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
          @pagination="getPolicyList"
        />
      </el-scrollbar>
      <ExportPolicyModal
        v-if="show"
        :is-show="show"
        @close="toggleModal"
        @save="save"
      />
    </el-container>
  </div>
</template>
<script>
import ExportPolicyModal from './component/exportPolicy';
import { policyStatus, policyStatusText } from '@/utils/enum';
import { mapActions } from 'vuex';
export default {
  name: 'GroupPolicy',
  components: {
    ExportPolicyModal
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        state: '',
        insuranceCompanyId: '',
        policyNo: '',
        filterTime: '',
        insuranceProductId: '',
        planId: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      policyList: [],
      policyStatus,
      policyStatusText,
      insuranceCompany: [],
      insuranceProductsList: [],
      insurancePlans: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 170301 个险保单
      return this.$store.state.user.pageAuthority['170302'];
    }
  },
  created() {
    this.getPolicyList();
    if (this.pageNum) {
      this.getPolicyList({
        page: Number(this.pageNum)
      });
    } else {
      this.getPolicyList({});
    }
    this.getInsuranceCompany();
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getInsuranceProductByName',
      'getInsurancePlansByName'
    ]),
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getPolicyList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        state: '',
        companyId: '',
        policyNo: '',
        filterTime: '',
        insuranceProductId: '',
        planId: ''
      };
      this.getPolicyList();
    },
    // 获取券码列表
    getPolicyList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
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
      delete params.filterTime;

      vm.tableLoading = true;
      this.$store
        .dispatch('groupPolicy/getPolicyList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.policyList = res.data.resp;
          vm.pagingOptions.total = res.data.totalNum;
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
      delete params.filterTime;

      this.$store.dispatch('policyManage/exportPolicy', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 新增保单
    createPolicy() {
      this.$router.push('/policyManage/groupPolicy/create');
    },
    // 企业预约保存
    save() {
      this.getPolicyList();
      this.toggleModal();
    },
    // 获取保险公司列表
    getInsuranceCompany() {
      this.$store
        .dispatch('insuranceCompany/getInsuranceCompanyList', {
          pageNum: 1,
          pageSize: 1000
        })
        .then(res => {
          this.insuranceCompany = res.records || [];
        });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/policyManage/groupPolicy/details/${id}`);
    },
    // 根据名称查询保险产品
    getInsuranceProductList(name) {
      if (!name) {
        return;
      }
      this.getInsuranceProductByName({
        name
      }).then(res => {
        this.insuranceProductsList = res.data || [];
      });
    },
    // 根据名称查询保障计划
    getInsurancePlans(planName) {
      if (!planName) {
        return;
      }
      this.getInsurancePlansByName({
        planName
      }).then(res => {
        this.insurancePlans = res.data || [];
      });
    },
    // 查看保险产品
    lookProduct(id) {
      const { href } = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${id}/detail`
      });
      window.open(href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.policy-manage-page {
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
  .box {
    height: 50px;
    .text-warning {
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
    }

    .text-underling {
      text-decoration: underline;
    }
    .text-default {
      font-size: 14px;

      font-weight: 400;
      color: #989ab3;
      line-height: 14px;
    }
  }
}
</style>
