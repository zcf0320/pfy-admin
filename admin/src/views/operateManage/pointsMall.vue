<template>
  <div class="points-mall-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            星矿<button type="button" class="btn-save fr" @click="addCommodity">
              新增星矿商品
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">服务项:</span>
                  <el-select
                    v-model="filter.serviceInfoId"
                    filterable
                    placeholder="全部"
                    class="search-input"
                    @change="getCommodityList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in serviceItemsList"
                      :key="item.id"
                      :label="item.serviceName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">销售状态:</span>
                  <el-select
                    v-model="filter.saleStatus"
                    placeholder="全部"
                    class="search-input"
                    @change="getCommodityList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in ucProducts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
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
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getCommodityList({ page: 1 })"
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
                <span class="label-name">星币数量:</span>
                <div class="range">
                  <el-input
                    v-model.number="filter.lowerScorePrice"
                    maxlength="15"
                    placeholder="最小值"
                    class="range-input"
                    style="width: 114px;"
                    @keyup.enter.native="getCommodityList({ page: 1 })"
                  />
                  <span class="range-span">-</span>
                  <el-input
                    v-model.number="filter.upperScorePrice"
                      maxlength="15"
                    placeholder="最大值"
                    class="range-input"
                    style="width: 114px;"
                    @keyup.enter.native="getCommodityList({ page: 1 })"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="pointsCommodityList"
          class="table-large"
        >
          <el-table-column label="服务项">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceInfoName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="星币数量">
            <template slot-scope="scope">
              <span>{{ scope.row.scorePrice || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售状态">
            <template slot-scope="scope">
              <span
                :class="'label-text ' + columnSaleStatus[scope.row.saleStatus]"
                >{{ saleStatus[scope.row.saleStatus] || '-' }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                scope.row.updateTime
                  ? $moment(scope.row.updateTime).format('YYYY-MM-DD')
                  : '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getCommodityList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { saleStatus, columnSaleStatus } from '@/utils/enum';
export default {
  name: 'PointsMall',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        serviceInfoId: '',
        lowerScorePrice: '',
        upperScorePrice: '',
        saleStatus: '',
        filterTime: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      serviceItemsList: [],
      ucProducts: [],
      pointsCommodityList: [],
      saleStatus,
      columnSaleStatus
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getCommodityList();
    if (this.pageNum) {
      this.getCommodityList({
        page: Number(this.pageNum)
      });
    } else {
      this.getCommodityList({});
    }
    // 获取销售状态
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'ucProduct'
      })
      .then(res => {
        this.ucProducts = res.obj || [];
      });
    this.getServiceItemsList();
  },
  methods: {
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      vm.$store.dispatch('serviceItems/getServiceinfos').then(res => {
        vm.serviceItemsList = res.data || [];
      });
    },
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getCommodityList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        serviceInfoId: '',
        lowerScorePrice: '',
        upperScorePrice: '',
        saleStatus: '',
        filterTime: ''
      };
      this.getCommodityList();
    },
    // 获取评价列表
    getCommodityList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }

      if (this.filter.lowerScorePrice || this.filter.upperScorePrice) {
        if (
          !/^[0-9]+$/.test(this.filter.lowerScorePrice) ||
          !/^[0-9]+$/.test(this.filter.upperScorePrice)
        ) {
          this.$message.warning('请输入正确的星币数量');
          return;
        }
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.types;
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('pointsCommodity/getPointsCommodityList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.pointsCommodityList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/operateManage/pointsMall/details/${id}`);
    },
    // 新增
    addCommodity() {
      this.$router.push(`/operateManage/pointsMall/addPointsCommodity`);
    },
    // 删除
    deleteContent(id) {
      const vm = this;
      vm.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('contentManage/deleteContent', {
            id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              this.getCommodityList();
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
.points-mall-page {
  width: 100%;
  width: 100%;
  .range-span {
    font-weight: 400;
    color: #6f7293;
    margin: 0 5px;
  }
}
</style>
