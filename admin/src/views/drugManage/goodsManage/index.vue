<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main spacing"
      tag="main"
      :noresize="false"
    >
      <!-- <el-main class="spacing"> -->
      <div class="goods-manage-page mb-24">
        <div class="filter-form">
          <div class="title-top">商品列表页</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">商品名称:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入商品名称"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">批准文号:</span>
                  <el-input
                    v-model="filter.authorizedCode"
                    placeholder="请输入批准文号"
                    class="search-input"
                  />
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
                    class="search-input"
                    @change="changeTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search mr-30"
                  @click.native.prevent="getList({ page: 1 })"
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
                  <span class="label-name">规格:</span>
                  <el-input
                    v-model="filter.standard"
                    placeholder="请输入规格"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">厂家:</span>
                  <el-input
                    v-model="filter.manufacturer"
                    placeholder="请输入厂家"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">供应商名称:</span>
                  <el-input
                    v-model="filter.supplierName"
                    placeholder="请输入供应商名称"
                    class="search-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-manage-page">
        <div class="content">
          <Tab
            v-if="$isNotEmpty(btns)"
            :current-key="activeName"
            :btns="btns"
            @change="handleClick"
          />
          <div class="table">
            <el-table v-loading="tableLoading" :data="goodsList">
              <el-table-column label="商品" width="450">
                <template slot-scope="scope">
                  <div class="goods-details">
                    <div class="name">商品编号:{{ scope.row.code || '-' }}</div>
                    <div class="details">
                      <div class="img">
                        <el-image
                          style="width:100px"
                          :src="scope.row.headPic"
                          alt="暂无图片"
                        />
                      </div>
                      <div class="details-text">
                        <div
                          class="name link-skip"
                          @click="lookDetails(scope.row.id, true)"
                        >
                          {{ scope.row.name || '-' }}
                        </div>
                        <div class="text mb-14">
                          {{ scope.row.manufacturer || '-' }}
                        </div>
                        <div class="text mb-14">
                          {{ scope.row.authorizedCode || '-' }}
                        </div>
                        <div class="flex-between">
                          <div class="text">
                            {{ scope.row.standard || '-' }}
                          </div>
                          <div class="text">
                            {{ scope.row.dosageForm || '-' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="销售信息">
                <template slot-scope="scope">
                  <div class="message">
                    <div class="text mb-14">库存:{{ scope.row.sumStock }}</div>
                    <div class="text">30天售出:{{ scope.row.orderAmount }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="参考" min-width="120">
                <template slot-scope="scope">
                  <div class="message">
                    <div class="text mb-14">
                      当前最低价格:¥{{ scope.row.minPrice }}
                    </div>
                    <div class="text mb-14">
                      供应商总数量:{{ scope.row.supplierAmount }}
                    </div>
                    <div class="text">
                      供应商名称:{{ scope.row.supplierName }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" prop="updateTime">
                <template slot-scope="scope">
                  {{ $moment(scope.row.updateTime).format('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <div class="message mb-16">
                    <div
                      :class="['label-text', columnState[scope.row.saleState]]"
                    >
                      {{ goodsState[scope.row.saleState] }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="message mb-16">
                    <HoverTip
                      v-if="pageAuthority.includes('detail')"
                      content="查看"
                      tip-class-name="icon-detail  mr-30"
                      @click.native.prevent="lookDetails(scope.row.id, true)"
                    />
                    <HoverTip
                      v-if="pageAuthority.includes('edit')"
                      content="编辑"
                      tip-class-name="icon-edit"
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
              @pagination="getList"
            />
          </div>
        </div>
      </div>
      <!-- </el-main> -->
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex';
import { columnState, goodsState } from '@/utils/enum';
export default {
  name: 'GoodsList',

  data() {
    return {
      isShowClear: false,
      filter: {
        name: '',
        authorizedCode: '',
        filterTime: [],
        saleState: -1,
        standard: '',
        manufacturer: '',
        supplierName: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      goodsList: [],
      columnState,
      goodsState,
      typeCount: {
        '-1': 0,
        1004: 0,
        1005: 0
      },
      btns: [],
      activeName: '0',
      dosageList: [],
      supplierList: []
    };
  },
  computed: {
    pageAuthority() {
      // 190201 药品
      return this.$store.state.user.pageAuthority['190201'];
    }
  },
  created() {
    const { pageNo, saleState } = JSON.parse(
      sessionStorage.getItem('historyFilter'),
    ) || { pageNo: 1, saleState: -1 };
    this.filter.saleState = saleState;
    if (this.filter.saleState === -1) {
      this.activeName = '0';
    } else if (this.filter.saleState === 1004) {
      this.activeName = '1';
    } else if (this.filter.saleState === 1005) {
      this.activeName = '2';
    }
    this.getList({
      page: Number(pageNo)
    });
  },
  methods: {
    ...mapActions('goodsManage', [
      'getGoodsList',
      'getTypeCount',
      'findAllDosageForm',
      'findAllManufacturer'
    ]),
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        name: '',
        authorizedCode: '',
        filterTime: [],
        saleState: -1,
        standard: '',
        manufacturer: '',
        supplierName: ''
      };
      this.getList();
    },
    // tab切换
    handleClick(tab) {
      this.activeName = tab;
      if (tab === '0') {
        this.filter.saleState = -1;
      } else if (tab === '1') {
        this.filter.saleState = 1004;
      } else if (tab === '2') {
        this.filter.saleState = 1005;
      }
      this.getList({
        page: 1
      });
    },
    // 获取商品列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '' || params[key] === -1) {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      this.getTypeCount(params).then(res => {
        if (res.data.length) {
          res.data.forEach(item => {
            this.typeCount[item.type] = item.amount;
          });
        } else {
          this.typeCount = {
            '-1': 0,
            1004: 0,
            1005: 0
          };
        }
        // 设置tab切换
        this.btns = [
          { value: '0', name: `所有商品(${vm.typeCount['-1']})` },
          { value: '1', name: `已上架(${vm.typeCount[1004]})` },
          { value: '2', name: `已下架(${vm.typeCount[1005]})` }
        ];
      });
      vm.getGoodsList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.goodsList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id, isView) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo,
        saleState: this.filter.saleState
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      if (isView) {
        this.$router.push(`/drugManage/goods-details/${id}/true`);
      } else {
        this.$router.push(`/drugManage/goods-edit/${id}/false`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-manage-page {
  border-radius: 4px;
  .content {
    padding: 30px;
    background-color: #fff;
    .tabs {
      display: flex;
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      .tab-item {
        padding: 18px 0;
        margin-right: 48px;
        color: #333333;
        font-size: 16px;
        cursor: pointer;
        transition: color 0.1s ease;
      }
      .tab-item-active {
        position: relative;
        color: #2276ff;
        font-weight: 500;
        &::after {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #2276ff;
        }
      }
    }
    .table {
      .goods-details {
        padding-top: 14px;
        padding-bottom: 25px;
        .name {
          font-size: 14px;
          font-weight: 500;
          color: #464668;
          margin-bottom: 24px;
        }
        .details {
          display: flex;
          .img {
            width: 100px;
            height: 100px;
            img {
              width: 100%;
            }
          }
          .details-text {
            margin-left: 16px;
            line-height: 1;
            height: 100px;
            .name {
              margin-bottom: 16px;
            }
            .text {
              color: #6f6f6f;
              font-size: 14px;
            }
          }
        }
        .font-weight-500 {
          font-weight: 500;
        }
      }
      .message {
        height: 70px;
        margin-top: 60px;
        .text {
          color: #6f6f6f;
          line-height: 14px;
          font-size: 14px;
        }
      }
      .edit {
        width: 20px;
        height: 20px;
        background-image: url('../../../assets/icon_edit.png');
        background-size: 100% 100%;
        cursor: pointer;
        &:active {
          background-image: url('../../../assets/icon_edit_active.png');
        }
      }
    }
  }
}
</style>
