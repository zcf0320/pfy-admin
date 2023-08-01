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
            个险保单
            <el-button
              v-if="pageAuthority.includes('export')"
              class="fr"
              type="primary"
              plain
              :loading="exportLoading"
              @click="exportPolicy"
              >导出数据</el-button
            >
            <el-button
              v-if="pageAuthority.includes('import')"
              type="primary"
              class="fr mr-24"
              @click="toggleModal"
            >
              保单导入
            </el-button>
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
            <div class="search-form flex-between">
              <div class="flex-box">
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
              <div v-if="!showMore" class="flex-box">
                <img
                  class="expand-icon"
                  src="../../assets/expand.png"
                  alt=""
                  @click="showMore = true"
                />
              </div>
            </div>
             <div v-if="showMore" class="filter-box">
               <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">销售渠道:</span>
                    <el-input
                      v-model="filter.saleOrgCode"
                      placeholder="请输入销售渠道"
                      class="search-input"
                      @keyup.enter.native="getPolicyList({ page: 1 })"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">承保机构:</span>
                    <el-input
                      v-model="filter.saleComCode"
                      placeholder="请输入承保机构"
                      class="search-input"
                      @keyup.enter.native="getPolicyList({ page: 1 })"
                    />
                  </div>
                  <div class="form-item">
                    <span class="label-name">服务包:</span>
                    <el-select
                      v-model="filter.servicePackageId"
                      filterable
                      placeholder="全部"
                    >
                      <el-option
                        v-for="item in packages"
                        :key="item.id"
                        :label="item.packageName"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                </div>

              </div>
              </div>
              <div v-if="showMore" class="filter-box">
               <div class="search-form flex-between">
                <div class="flex-box">
                   <div class="form-item">
                  <span class="label-name">保单结算状态:</span>
                  <el-select
                    v-model="filter.settlementStatus"
                    placeholder="全部"
                    @change="getPolicyList({ page: 1 })"
                  >
                    <el-option label="已结算" :value="2" />
                    <el-option label="未结算" :value="1" />
                    <el-option label="未生成结算单" :value="0" />
                  </el-select>
                </div>
                </div>
                 <div class="flex-box">
                    <img
                    class="expand-icon"
                    src="../../assets/collapse.png"
                    alt=""
                    @click="showMore = false"
                    />
                </div>
               </div>
              </div>
          </div>
        </div>
        <Tab
          :btns="btns"
          :btn-style="{ overflow: 'visible' }"
          @change="tabChange"
        />
        <el-table
          v-loading="tableLoading"
          :data="policyList"
          class="table-large"
        >
          <el-table-column label="保险产品">
            <template slot-scope="{ row }">
              <div class="scope">
                <div class="link-skip mb-16" @click="lookProduct(row.productId)">
                  {{ row.productName + ' - ' + row.planName }}
                </div>
                <div class="text-default">{{ row.policyNo || '-' }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="被保险人">
            <template slot-scope="scope">
              <div class="scope">
                <div class="text-warning mb-16">
                  {{ scope.row.insuredName }}
                  {{
                    scope.row.insuredAge ? `（${scope.row.insuredAge}岁）` : ''
                  }}
                </div>
                <div class="text-default">{{ scope.row.insuredPhone }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="保险公司/承保机构/销售渠道">
            <template slot-scope="scope">
              <div class="scope">
                <div class="text-warning mb-16">
                  保险公司：{{ scope.row.companyName || '-' }}
                </div>
                <div class="text-default mb-16">
                  承保机构：{{ scope.row.saleComCode || '-' }}
                </div>
                <div class="text-default">
                  销售渠道：{{ scope.row.saleOrgCode || '-' }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="`保费(${premiumTotal})`">
            <template slot-scope="scope">
              <div class="scope">
                <div class="text-warning">
                  {{ scope.row.premium || '-' }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="保单保障状态">
            <template slot-scope="{ row }">
                <div class="scope">
              <div
                :class="[
                  'status',
                  $enums['policyStateClass'][row.policyStatus],
                ]"
              >
                {{ $enums['policyState'][row.policyStatus] }}
              </div>
              <div class="fc-grey">
                {{ row.effectiveDate | timeFormat('yyyy-MM-dd') }} ~ {{
                  row.expiryDate | timeFormat('yyyy-MM-dd')
                }}
              </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="撤单状态" width="200">
            <template slot-scope="scope">
              <div class="scope mb-16">
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
                    scope.row.cancelTime
                      ? $moment(scope.row.cancelTime).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      : '-'
                  }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                <div class="scope mb-16">
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
      <ExportPolicyModal :visible.sync="show" @save="save" />
      <ExportDialog
        :dialog-visible.sync="showExportDia"
        :close="
          () => {
            showExportDia = false;
          }
        "
        @sure-submit="sureExport"
      />
    </el-container>
  </div>
</template>
<script>
import ExportPolicyModal from './component/exportPolicy';
import { policyStatus, policyStatusText } from '@/utils/enum';
import { mapActions } from 'vuex';
// import { exportPolicy } from '@/api/insuranceProducts';
// import qs from 'qs';
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'PersonalPolicy',
  components: {
    ExportPolicyModal,
    ExportDialog
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
        planId: '',
        saleComCode: '',
        policyStatus: '',
        settlementStatus: '',
        saleOrgCode: '',
        servicePackageId: ''
      },
      btns: [
        { name: '全部', value: '' },
        { name: '保障中', value: '1' },
        { name: '已过期', value: '2' },
        { name: '未生效', value: '3' }
      ],
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
      insurancePlans: [],
      premiumTotal: 0,
      packages: [],
      showExportDia: false,
      exportLoading: false,
      showMore: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 170301 个险保单
      return this.$store.state.user.pageAuthority['170301'];
    }
  },
  created() {
    this.$store.dispatch('tagsView/addCachedView', this.$route); // 缓存页面，保持筛选条件
    this.getPolicyList();
    if (this.pageNum) {
      this.getPolicyList({
        page: Number(this.pageNum)
      });
    } else {
      this.getPolicyList({});
    }
    this.getInsuranceCompany();
    this.getServicePackageList();
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getInsuranceProductByName',
      'getInsurancePlansByName'
    ]),
    exportPolicy() {
      const vm = this;
      this.exportLoading = true;
      const filter = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        endUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      if (filter.startUpdateTime) {
        filter.startUpdateTime = this.$moment(filter.startUpdateTime).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
      if (filter.endUpdateTime) {
        filter.endUpdateTime = this.$moment(filter.endUpdateTime).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
      delete filter.filterTime;
      ExportApi.getPolicyManageCount(filter)
        .then(res => {
          if (res.data >= this.$enums.exportEmailNum) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
             filter.pageSize = res.data;
            ExportApi.exportPolicyManageCount(filter).then(res => {
              this.exportLoading = false;
              window.open(res.data);
              // window.location.href = res.data;
            });
          }
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    // 确认邮箱导出
    sureExport(email) {
      const vm = this;
      const filter = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        endUpdateTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      if (filter.startUpdateTime) {
        filter.startUpdateTime = this.$moment(filter.startUpdateTime).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
      if (filter.endUpdateTime) {
        filter.endUpdateTime = this.$moment(filter.endUpdateTime).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
      delete filter.filterTime;
      filter.email = email;
      ExportApi.exportPolicyManageCount(filter).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        } else {
          this.$message.success(res.comment);
          this.showExportDia = false;
        }
      });
    },
    tabChange(val) {
      this.filter.policyStatus = val;
      this.getPolicyList({ page: 1 });
    },
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
        planId: '',
        saleComCode: '',
        policyStatus: '',
        settlementStatus: '',
        saleOrgCode: '',
        servicePackageId: ''
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
        .dispatch('personalPolicy/getPolicyList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.policyList = res.data.resp;
          vm.pagingOptions.total = res.data.totalNum;
          vm.premiumTotal = res.data.premiumTotal || 0;
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
      this.$store.dispatch('personalPolicy/exportPolicy', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        }
        window.location.href = res.url;
      });
    },
    // 弹框切换开关
    toggleModal() {
      this.show = !this.show;
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
      this.$router.push(`/policyManage/personalPolicy/details/${id}`);
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
    },
    getServicePackageList() {
      const params = {
        pageNum: 1,
        pageSize: 99999
      };
      this.$store
        .dispatch('servicePackage/getServicePackageListNew', params)
        .then(response => {
          this.packages = response.records;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.policy-manage-page {
  width: 100%;
    .expand-icon,
  .collapse-icon {
    width: 24px;
    height: 30px;
  }
  .btn-exit-24 {
    margin-top: -7px;
    margin-left: 24px;
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
  .export-button {
    color: #2276ff;
    border-color: #2276ff;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .scope {
    height: 80px;
    .text-warning {
      font-size: 14px;
      font-weight: 400;
      color: #464668;
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
    .status{
        font-size: 14px;
        margin-bottom: 16px;
    }
  }
}
</style>
