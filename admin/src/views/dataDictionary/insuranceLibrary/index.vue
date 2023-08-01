<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="insurance-product-page">
        <div class="title-top">保险库</div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">产品名称</span>
                  <el-input
                    v-model="filter.productName"
                    placeholder="请输入产品名称"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">保司</span>
                  <el-input
                    v-model="filter.insuranceCompany"
                    class="search-input"
                    placeholder="请输入保司"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  >
                  </el-input>
                </div>
                <div class="form-item">
                  <span class="label-name">保险责任</span>
                  <el-input
                    v-model="filter.responsibilityName"
                    class="search-input"
                    placeholder="请输入保险责任"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  >
                  </el-input>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList({ page: 1, pageSize: 10 })"
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
                  <span class="label-name">服务</span>
                  <el-input
                    v-model="filter.serviceName"
                    placeholder="请输入服务"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
                 <div class="form-item">
                  <span class="label-name">来源</span>
                  <el-input
                    v-model="filter.dataSource"
                    placeholder="请输入来源"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
              </div>
             </div>
          </div>
        </div>
        <div class="content">
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="goodsList"
              class="fix-table table-large"
            >
              <el-table-column label="产品名称" prop="productName">
              </el-table-column>
              <el-table-column label="来源" prop="dataSource">
              </el-table-column>
              <el-table-column label="保司" prop="insuranceCompany">
              </el-table-column>
              <el-table-column label="保险责任" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>
                    {{
                      scope.row.responsibilityNames.length
                        ? scope.row.responsibilityNames.join(',')
                        : '-'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="等待期" prop="waitingPeriod">
              </el-table-column>
              <el-table-column label="保障期" prop="guaranteeTime">
              </el-table-column>
              <el-table-column label="服务" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>
                    {{
                      scope.row.serviceNames.length
                        ? scope.row.serviceNames.join(',')
                        : '-'
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <HoverTip
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="lookDetails(scope.row.id)"
                  />
                  <HoverTip
                    content="图谱"
                    tip-class-name="icon-diseaseAtlas"
                    @click.native.prevent="goAtlas(scope.row.id)"
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
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { getInsuranceProduct } from '@/api/insuranceProducts';
export default {
  name: 'insurance-product-library',
  data() {
    return {
      isShowClear: false,
      filter: {
        productName: '',
        insuranceCompany: '',
        responsibilityName: '',
        serviceName: '',
        dataSource: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodsList: [],
      diseasesLabels: [],
      secondDepartments: []
    };
  },
  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      page: Number(pageNo)
    });
  },
  methods: {
    // 清除筛选项
    clearFilter() {
      this.filter = {
        productName: '',
        insuranceCompany: '',
        responsibilityName: '',
        serviceName: ''
      };
      this.getList({ page: 1, pageSize: 10 });
    },
    // 获取疾病列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;
      getInsuranceProduct(params)
        .then(res => {
          vm.tableLoading = false;
          vm.goodsList = res.data.records || [];
          vm.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push({
        path: `/dataDictionary/insurance-product-library/content-edit/${id}`
      });
    },
    goAtlas(id) {
      this.$router.push({
        path: `/dataDictionary/insurance-product-library/atlas/${id}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-product-page {
  .content {
    .table {
      font-size: 16px;
      .insuranceCompany {
        font-size: 14px;

        color: #adafc3;
        line-height: 14px;
      }
      .twoLine {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .goods-details {
        padding: 17px 0 27px 12px;
        .name {
          color: #333333;
          margin-bottom: 10px;
        }
        .details {
          display: flex;
          .img {
            width: 56px;
            height: 56px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .details-text {
            margin-left: 22px;

            .text {
              color: #6f6f6f;
              margin-bottom: 8px;
              line-height: 16px;
            }
            .mb {
              margin-bottom: 15px;
            }
          }
        }
      }
      .name {
        color: #333333;
      }
      .message {
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        height: 60px;
        margin-top: 22px;
        .text {
          color: #6f6f6f;
        }
      }
      .edit {
        width: 20px;
        height: 20px;
        background-image: url('../../../assets/icon_view.png');
        background-size: 100% 100%;
        cursor: pointer;
        &:active {
          background-image: url('../../../assets/icon_view_avtive.png');
        }
      }
    }
  }
  .hidden {
    width: 280px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
