<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="goods-manage-page">
        <div class="title-top">症状库</div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">症状编号</span>
                  <el-input
                    v-model.number="filter.serialNumber"
                    placeholder="请输入症状编号"
                    class="search-input"
                    @input="onlyNumber"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">问诊部位</span>
                  <el-input
                    v-model="filter.patientPart"
                    placeholder="请输入问诊部位"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">症状</span>
                  <el-input
                    v-model="filter.patientSymptom"
                    placeholder="请输入症状"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
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
          </div>
        </div>
        <div class="content">
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="goodsList"
              max-height="1050"
              class="fix-table table-large"
            >
              <el-table-column prop="sumStock" label="症状编号">
                <template slot-scope="scope">
                  <div class="fixmargin">{{ scope.row.serialNumber }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="sumStock" label="问诊部位">
                <template slot-scope="scope">
                  <div class="fixmargin">{{ scope.row.patientPart }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="sumStock" label="症状">
                <template slot-scope="scope">
                  <div class="fixmargin">{{ scope.row.patientSymptom }}</div>
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img"/>
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
import { mapActions } from 'vuex';
export default {
  name: 'symptomDatabase',
  data() {
    return {
      isShowClear: false,
      filter: {
        name: '',
        serialNumber: '',
        patientSymptom: '',
        patientPart: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      goodsList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getList();
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('inquiryManage', ['getSymptomList']),
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
        serialNumber: '',
        patientSymptom: '',
        patientPart: ''
      };
      this.getList({ page: 1, pageSize: 10 });
    },
    // tab切换
    tabClick(saleState) {
      this.filter.saleState = saleState;
      this.getList();
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
        pageSize: vm.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      vm.tableLoading = true;

      vm.getSymptomList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.goodsList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    onlyNumber(value) {
      const reg = /^([0]|[0-9][0-9]*)$/;
      const flag = reg.test(value);
      if (flag) {
        this.filter.serialNumber = value;
        return true;
      }
      this.filter.serialNumber = this.filter.serialNumber.slice(
        0,
        this.filter.serialNumber.length - 1
      );
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-manage-page {
  .content {
    .table {
      font-size: 16px;
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
    }
  }
}
</style>
