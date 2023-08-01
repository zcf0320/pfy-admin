<template>
  <div class="page-insurance-products">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-box">
          <div class="flex-between">
            <div class="title-top">核赔记录</div>
            <el-button
              type="primary"
              class="mb-30"
              @click="dialog.visible = true"
              >批量导入</el-button
            >
          </div>
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">审核类型</span>
                <el-select
                  v-model="filter.claimType"
                  placeholder="全部"
                  clearable
                  @change="list({ page: 1 })"
                >
                  <el-option label="全部" value="" />
                  <el-option label="保险责任" :value="2" />
                  <el-option label="保险服务" :value="1" />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">产品名称</span>
                <el-input
                  v-model.trim="filter.insuranceProductName"
                  placeholder="请输入产品名称"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list({ page: 1 })"
                />
              </div>
                <div class="form-item">
                <span class="label-name">被保人</span>
                <el-input
                  v-model.trim="filter.username"
                  placeholder="请输入被保人"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list({ page: 1 })"
                />
              </div>
            </div>
            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search"
                class="mr-30"
                @click.native.prevent="list({ page: 1 })"
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
                <span class="label-name">来源</span>
                <el-input
                  v-model.trim="filter.serviceInfoName"
                  placeholder="请输入申请来源"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list({ page: 1 })"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="panel mb-0">
          <div class="panel-body panel-body-1">
            <div class="flex-between">
              <Tab
                :btns="tabs"
                :btn-style="{ overflow: 'visible' }"
                :current-key="currentKey"
                @change="tabsChange"
              />
            </div>
            <el-table
              v-loading="tableLoading"
              :data="dataList"
              class="table-large"
            >
              <el-table-column label="ID">
                <template slot-scope="{ row }">
                     <div class="box">
                  <div class="link-skip mb-16" @click="detail(row.id)">
                    {{ row.serialNumber || '-' }}
                  </div>
                  <div class="subTitle">
                    {{ $moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </div>
                     </div>
                </template>
              </el-table-column>
              <el-table-column label="被保险人/保险产品">
                <template slot-scope="{ row }">
                     <div class="box">
                  <div class="mb-16">{{ row.userName || '-' }}</div>
                  <div class="subTitle ml-16">{{ row.moblie }}</div>
                  <span class="mr-4">{{ row.saleChannel }}</span
                  ><span class="mr-4">|</span>
                  <span
                    class="link-skip v-align"
                    @click="toInsuranceProduct(row.insuranceProductId)"
                    >{{ row.insuranceProductName }}</span
                  >
                     </div>
                </template>
              </el-table-column>
              <el-table-column label="来源">
                <template slot-scope="{ row }">
                   <div class="box">{{ row.serviceInfoName || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="{ row }">
                     <div class="box">
                  <div :class="['status', claimState[row.stateText]]">
                    {{ row.stateText }}
                  </div>
                     </div>
                </template>
              </el-table-column>
              <el-table-column label="核赔预警">
                <template slot-scope="{ row }">
                  <div class="olderNum">
                    异常数量 ({{ row.abnormalNumber || 0 }})
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="{ row }">
                  <div class="box mb-16">
                    <HoverTip
                      v-if="pageAuthority.includes('detail')"
                      :content="row.secondState != '2' ? '审核' : '查看'"
                      :tip-class-name="
                        row.secondState != '2' ? 'icon-claim' : 'icon-detail'
                      "
                      @click.native.prevent="detail(row.id)"
                    />
                  </div>
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img" />
            </el-table>
            <Pagination
              :total="total"
              :limit="filter.pageSize"
              :page.sync="filter.pageNum"
              layout="total, prev, pager, next"
              @pagination="list"
            />
          </div>
        </div>
      </el-scrollbar>
      <UploadExcel :visible.sync="dialog.visible" @saved="list" />
    </el-container>
  </div>
</template>
<script>
import UploadExcel from './components/uploadExcel';
import { claimState } from '@/utils/enum';
export default {
  name: 'InsuranceProducts',
  components: { UploadExcel },

  data() {
    return {
      // 列表loading
      claimState,
      tableLoading: true,
      dataList: [],
      filter: {
        claimType: '',
        username: '',
        insuranceProductName: '',
        serviceInfoName: '',
        secondState: null,
        state: null,
        pageSize: 10
      },
      currentKey: '',
      total: 0,
      tipsNum: {}
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    },
    tabs() {
      return [
        { name: '全部', value: '' },
        {
          name: '初审',
          value: '1',
          isNumber: true,
          number: this.tipsNum.firstWaitProcessNum || 0
        },
        {
          name: '复核',
          value: '2',
          isNumber: true,
          number: this.tipsNum.secondWaitProcessNum || 0
        },
        { name: '核赔不通过', value: '3' },
        { name: '核赔通过', value: '4' }
      ];
    }
  },
  created() {
    // 获取待审核数量
    this.$store.dispatch('auditRecords/getTipsNum').then(res => {
      this.tipsNum = res.data || {};
    });

    if (this.$isNotEmpty(this.$route.query)) {
      this.$copyProps(this.filter, this.$route.query);
    }
    if (this.pageNum) {
      this.list({ page: this.pageNum });
    } else {
      this.list();
    }
  },
  methods: {
    // 跳转保险产品
    toInsuranceProduct(id) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },

    // 获取保险产品列表
    list(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.filter.pageNum = pageInfo.page;
      }
      this.tableLoading = true;
      this.$store
        .dispatch('auditRecords/getClaimlist', this.filter)
        .then(res => {
          if (res) {
            this.dataList = res.records || [];
            this.total = res.totalNum;
            this.tableLoading = false;
          }
        });
    },
    // 清除筛选条件
    clearFilter() {
      this.filter = {
        claimType: '',
        username: '',
        insuranceProductName: '',
        serviceInfoName: '',
        secondState: null,
        state: null
      };
      this.list();
    },
    // 审核或者查看保险产品
    detail(id) {
      if (!this.pageAuthority.includes('detail')) {
        return;
      }
      this.$router.push(`/claimManagement/auditRecordsDetail/${id}`);
    },
    tabsChange(val) {
      this.currentKey = val;
      if (!val) {
        this.filter.secondState = null;
        this.filter.state = null;
      }
      if (val === '1') {
        this.filter.secondState = null;
        this.filter.state = [1, 3, 4];
      }
      if (val === '2') {
        this.filter.secondState = [1, 4];
        this.filter.state = [2];
      }
      if (val === '3') {
        this.filter.secondState = [3];
        this.filter.state = null;
      }
      if (val === '4') {
        this.filter.secondState = [2];
        this.filter.state = null;
      }
      this.filter.pageNum = 1;
      this.list();
    }
  }
};
</script>
<style lang="scss" scoped>
.page-insurance-products {
  .status {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    &.state-1 {
      color: #3599fe;
      &::before {
        display: block;
        margin-right: 8px;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('../../../assets/wait_icon.png');
        background-size: 100% 100%;
      }
    }
    &.state-2 {
      color: #ffa800;
      &::before {
        display: block;
        margin-right: 8px;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('../../../assets/claim-state-2.png');
        background-size: 100% 100%;
      }
    }
    &.state-3 {
      color: #8950fc;
      &::before {
        display: block;
        margin-right: 8px;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('../../../assets/claim-state-3.png');
        background-size: 100% 100%;
      }
    }
    &.state-4 {
      color: #f64e60;
      &::before {
        display: block;
        margin-right: 8px;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('../../../assets/close_icon.png');
        background-size: 100% 100%;
      }
    }
    &.state-5 {
      color: #18c4bd;
      &::before {
        display: block;
        margin-right: 8px;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('../../../assets/success.png');
        background-size: 100% 100%;
      }
    }
  }

  .mr-4 {
    margin-right: 4px;
    vertical-align: middle;
  }
  .v-align {
    vertical-align: middle;
  }
  .olderNum {
    font-size: 14px;
height: 50px;
    font-weight: 400;
    color: #989ab3;
  }
  .box{
    height: 50px;
  }
}
</style>
