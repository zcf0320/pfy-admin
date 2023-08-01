<template>
  <div class="basis-drugs-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">药价监控</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">平台:</span>
                  <el-select
                    v-model="filter.platform"
                    filterable
                    placeholder="全部"
                    @change="getDrugPriceList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in platformList"
                      :key="item.type"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">药品通用名:</span>
                  <el-input
                    v-model="filter.medicineName"
                    placeholder="请输入药品通用名 "
                    class="search-input"
                    @keyup.enter.native="getDrugPriceList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">药品类型:</span>
                  <el-select
                    v-model="filter.medicineType"
                    placeholder="全部"
                    @change="getDrugPriceList({ page: 1 })"
                  >
                    <el-option label="西药" value="西药" />
                    <el-option label="中成药" value="中成药" />
                    <el-option label="中草药" value="中草药" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getDrugPriceList({ page: 1 })"
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
                <span class="label-name">处方标记:</span>
                <el-select
                  v-model="filter.prescription"
                  placeholder="全部"
                  @change="getDrugPriceList({ page: 1 })"
                >
                  <el-option label="处方药" :value="1" />
                  <el-option label="非处方药" :value="0" />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">批准文号:</span>
                <el-input
                  v-model="filter.approvalNumber"
                  placeholder="请输入批准文号 "
                  class="search-input"
                  @keyup.enter.native="getDrugPriceList({ page: 1 })"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="drugList"
          class="table-large"
          @sort-change="tableSort"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.id || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="平台">
            <template slot-scope="scope">
              <div class="box">{{ scope.row.platformName || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="药品通用名/规格" show-overflow-tooltip>
            <template slot-scope="scope">
               <div class="box">
              <div class="medicineName"
                >{{ scope.row.medicineName || '-' }}
              </div>

              <div class="medicineSpec">
                {{ scope.row.medicineSpec || '-' }}
              </div>
               </div>
            </template>
          </el-table-column>

          <el-table-column label="批准文号/厂家">
            <template slot-scope="scope">
                <div class="box">
              <div class="medicineName">
                {{ scope.row.approvalNumber || '-' }}
              </div>
              <div class="medicineSpec">
                {{ scope.row.manufacturer || '-' }}
              </div>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="零售价（元）" sortable="custom">
            <template slot-scope="scope">
                <div class="box">
              <div class="medicineName">{{ scope.row.retailPrice || '-' }}</div>
              <div class="medicineSpec">
                {{ $moment(scope.row.updateTime).format('YYYY-MM') || '-' }}
              </div>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="适应症">
            <template slot-scope="scope">
                <div class="box mb-16">
              <el-popover placement="left-start" width="740" trigger="hover">
                <span slot="reference" class="icon-drug-use" />
                <div class="drugUseContent">
                  <div class="hover-title">
                    {{
                      scope.row.medicineName
                        ? scope.row.medicineName + '适应症描述：'
                        : '-'
                    }}
                  </div>
                  <p class="hover-content">
                    {{ scope.row.indications || '-' }}
                  </p>
                </div>
              </el-popover>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <div class="box mb-16">
              <HoverTip
                content="获取最新P"
                tip-class-name="icon-getDrugPrice"
                class="mr-30"
                @click.native.prevent="getNewPrice(scope.row.id)"
              />
              <HoverTip
                content="P监控"
                tip-class-name="icon-drugPrice"
                @click.native.prevent="
                  lookDetails(
                    scope.row.platformName,
                    scope.row.updateTime,
                    scope.row.medicineName,
                    scope.row.medicineSpec,
                  )
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
          @pagination="getDrugPriceList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DrugsMonitor',
  data() {
    return {
      filter: {
        platform: '',
        medicineName: '',
        medicineType: '',
        prescription: '',
        approvalNumber: '',
        sortBy: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      drugList: [],
      platformList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getMerchantList().then(res => {
      this.platformList = res.data;
    });
    if (this.pageNum) {
      this.getDrugPriceList({
        page: Number(this.pageNum)
      });
    } else {
      this.getDrugPriceList({});
    }
  },
  methods: {
    ...mapActions('drugManage', [
      'drugMonitor',
      'getMerchantList',
      'getNewDrugPrice'
    ]),
    // 价格排序
    tableSort(obj) {
      if (obj.column.label === '零售价（元）' && obj.order === 'ascending') {
        // 升序ASC
        this.filter.sortBy = ['retail_price ASC'];
      } else if (
        obj.column.label === '零售价（元）' &&
        obj.order === 'descending'
      ) {
        // 降序DESC
        this.filter.sortBy = ['retail_price DESC'];
      } else if (obj.column.label === '零售价（元）' && obj.order === null) {
        // 无排序规则
        this.filter.sortBy = '';
      }
      this.getDrugPriceList({});
    },
    getDrugPriceList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.drugMonitor(params).then(res => {
        this.drugList = res.data.list;
        this.pagingOptions.total = res.data.total;
        this.tableLoading = false;
      });
    },
    clearFilter() {
      this.filter = {
        platform: '',
        medicineName: '',
        medicineType: '',
        prescription: ''
      };
      this.getDrugPriceList({});
    },
    lookDetails(platform, year, medicineName, medicineSpec) {
      const params = {
        medicineName,
        medicineSpec,
        year: this.$moment(year).format('YYYY'),
        platform
      };
      localStorage.setItem('drugMonitor', JSON.stringify(params));
      this.$router.push('/dataDictionary/drugMonitor/drugMonitorDetail');
    },
    getNewPrice(id) {
      this.getNewDrugPrice(id).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        });
        if (this.pageNum) {
          this.getDrugPriceList({
            page: Number(this.pageNum)
          });
        } else {
          this.getDrugPriceList({});
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
 height: 60px;
  .medicineName {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    vertical-align: middle;
  }
  .medicineName.otc {
    &::after {
      content: '';
      display: inline-block;
      width: 42px;
      height: 22px;
      background: url('../../../assets/otc.png') no-repeat;
    background-size: 100% 100%;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  .medicineName.Rx {
    &::after {
      content: '';
      display: inline-block;
      width: 35px;
      height: 22px;
      background: url('../../../assets/rx.png') no-repeat;
       background-size: 100% 100%;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  .medicineSpec {
    font-size: 14px;
    font-weight: 400;
    color: #989ab3;
    margin-top: 16px;
  }
}
</style>
