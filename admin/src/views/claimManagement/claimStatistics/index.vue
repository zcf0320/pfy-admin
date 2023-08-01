<template>
  <div class="page-claim-statistics">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="filter-box">
            <a
              ref="upload"
              :href="downClaimStatisticsList(params)"
              class="none"
            />
            <div class="title-top">
              核赔预警统计<button
                v-if="pageAuthority.includes('export')"
                type="button"
                class="btn-save fr"
                @click="exportList"
              >
                导出
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">被保险人姓名:</span>
                  <el-select
                    v-model="filter.insuredName"
                    filterable
                    remote
                    :remote-method="nameChange"
                    :loading="nameLoading"
                    placeholder="请输入被保险人姓名"
                    @change="getClaimStatisticsList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in insuredNameList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">申请时间:</span>
                  <el-date-picker
                    v-model="filter.filterTime"
                    type="daterange"
                    value-format="timestamp"
                    format="yyyy-MM-dd"
                    :clearable="true"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="changeTime"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">预警规则:</span>
                  <el-select
                    v-model="filter.ruleType"
                    placeholder="全部"
                    filterable
                    @change="getClaimStatisticsList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in ruleNameList"
                      :key="item.ruleType"
                      :label="item.ruleName"
                      :value="item.ruleType"
                    />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getClaimStatisticsList({ page: 1 })"
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
                <span class="label-name">预警类型:</span>
                <el-select
                  v-model="filter.warnType"
                  placeholder="全部"
                  @change="getClaimStatisticsList({ page: 1 })"
                >
                  <el-option label="无异常" value="0" />
                  <el-option label="违规 " value="1" />
                  <el-option label="欺诈" value="2" />
                  <el-option label="提醒" value="3" />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-body">
            <el-table
              v-loading="tableLoading"
              :data="claimStatisticsList"
              class="table-large"
            >
              <el-table-column label="申请编号">
                <template slot-scope="scope">
                  <div class="box">
                    <div
                      class="link-skip mb-16"
                      @click="lookDetail(scope.row.claimId)"
                      >{{ scope.row.serialNumber }}</div
                    >
                    <div class="use text-overflow">
                      {{
                        $moment(scope.row.submitTime).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="被保险人" >
                <template slot-scope="scope">
                  <div class="box">
                   {{
                      scope.row.insuredName || '-'
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="保险产品">
                <template slot-scope="scope">
                  <div class="box">
                    <span class="mr-4">{{
                      scope.row.saleChannelName || '-'
                    }}</span
                    ><span class="mr-4">|</span>
                    <span
                      class="link-skip v-align"
                      @click="toInsuranceProduct(scope.row.insuranceProductId)"
                      >{{ scope.row.insuranceProductName || '-' }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="申请来源">
                <template slot-scope="scope">
                  <div class="box">
                    <div class="mb-16">
                      {{ scope.row.sourceOfApplication || '-' }}
                    </div>
                    <div
                      :class="
                        (scope.row.isHighlight ? 'useless' : 'use') +
                          ' text-overflow'
                      "
                    >
                      {{ scope.row.serviceUseState }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="疾病">
                <template slot-scope="scope">
                  <div class="box">
                    <span
                      v-if="scope.row.diseaseName"
                      class="link-skip"
                      @click="toDisease(scope.row.diseaseName)"
                      >{{ scope.row.diseaseName }}</span
                    >
                    <span v-else>-</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="预警类型/异常描述" width="400" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div class="box">
                  <div
                    v-for="(item, index) in scope.row.warnInfoList"
                    :key="index"
                    class="table-drug"
                  >
                    【{{ claimWarnType[item.warnType] }}】
                    <span v-if="item.remark">
                      {{ item.warnContent0 || '' }}
                      <span v-for="(ele, index) in item.remark" :key="index"
                        >“{{ ele.itemName }}”</span
                      >
                      {{ item.warnContent1 || '' }}
                    </span>
                    <span v-else>{{ item.warnContent }}</span>
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
                      @click.native.prevent="lookDetail(scope.row.claimId)"
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
              @pagination="getClaimStatisticsList"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { claimWarnType } from '@/utils/enum';
import { downClaimStatisticsList } from '@/api/auditRecords';
export default {
  name: 'ClaimStatistics',
  data() {
    return {
      params: {},
      downClaimStatisticsList,
      filter: {
        insuredName: '',
        ruleType: '',
        warnType: '',
        filterTime: []
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      claimStatisticsList: [],
      ruleNameList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      insuredNameList: [],
      nameLoading: false,
      claimWarnType
    };
  },
  computed: {
    pageAuthority() {
      // 170502 核赔预警统计
      return this.$store.state.user.pageAuthority['170502'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    if (this.pageNum) {
      this.getClaimStatisticsList({
        page: Number(this.pageNum)
      });
    } else {
      this.getClaimStatisticsList({});
    }
    // 获取预警规则
    this.$store.dispatch('auditRecords/getClaimRules').then(res => {
      this.ruleNameList = res.data;
    });
  },
  methods: {
    // 跳转疾病详情
    toDisease(name) {
      const routeData = this.$router.resolve({
        path: `/dataDictionary/diseaseDatabase/detail`,
        query: { name }
      });
      window.open(routeData.href, '_blank');
    },
    // 跳转购药订单
    toMedicineOrder(id) {
      const routeData = this.$router.resolve({
        path: `/drugManage/orderDetails/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    // 跳转保险产品
    toInsuranceProduct(id) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 姓名
    nameChange(query) {
      if (query !== '') {
        this.loading = true;
        // 获取全部名字
        this.$store.dispatch('auditRecords/getClaimName', query).then(res => {
          this.loading = true;
          this.insuredNameList = res.data;
        });
      } else {
        this.insuredNameList = [];
      }
    },
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getClaimStatisticsList({ page: 1 });
    },
    // 清除筛选条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        insuredName: '',
        ruleType: '',
        warnType: '',
        filterTime: []
      };
      vm.getClaimStatisticsList({});
    },
    // 查看详情
    lookDetail(id) {
      if (!this.pageAuthority.includes('detail')) {
        return;
      }
      this.$router.push(`/claimManagement/auditRecordsDetail/${id}`);
    },
    // 获取表格数据
    getClaimStatisticsList(pageInfo) {
      const vm = this;
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1,
        pageSize: 10
      };
      vm.filter.insuredName && (params.insuredName = vm.filter.insuredName);
      vm.filter.ruleType && (params.ruleType = vm.filter.ruleType);
      vm.filter.warnType && (params.warnType = vm.filter.warnType);
      if (vm.filter.filterTime.length) {
        params.startTime = vm.filter.filterTime[0];
        params.endTime = vm.filter.filterTime[1];
      }
      vm.tableLoading = true;
      vm.$store
        .dispatch('auditRecords/getClaimStatisticsList', params)
        .then(response => {
          vm.tableLoading = false;
          const { total } = response.data;
          vm.claimStatisticsList = response.data.list;
          if (this.claimStatisticsList) {
            this.claimStatisticsList.forEach(ele => {
              ele.warnInfoList.forEach(item => {
                if (item.remark) {
                  const remarkArr = JSON.parse(item.remark);
                  this.$set(item, 'remark', remarkArr);
                  const arr = item.warnContent.split('[]');
                  this.$set(item, 'warnContent0', arr[0]);
                  this.$set(item, 'warnContent1', arr[1]);
                }
              });
            });
          }
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = total;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出
    exportList() {
      const vm = this;
      let params = {
        ...vm.filter,
        createStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        createEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      params = this.$delEmptyKey(params);
      delete params.filterTime;
      this.params = params;
      this.$refs.upload.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-drug {
  border-left: 1px #ebedf2 solid;
  border-right: 1px #ebedf2 solid;
  margin-bottom: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 10px;
}
.box {
  height: 50px;
}
.text-overflow {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.mr-5 {
  margin-right: 5px;
}
.use {
  font-size: 14px;

  font-weight: 400;
  color: #989ab3;
  line-height: 14px;
  margin-top: 4px;
}
.useless {
  font-size: 14px;

  font-weight: 400;
  color: #e80019;
  line-height: 14px;
  margin-top: 4px;
}
.mr-4 {
  margin-right: 4px;
  vertical-align: middle;
}
.v-align {
  vertical-align: middle;
}
</style>
