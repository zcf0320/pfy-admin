<template>
  <Dialog
    title="药品比价"
    :visible="true"
    :height="600"
    width="750px"
    :close-on-click-modal="closeClickModal"
    class="drug-price-comparison"
    @closed="close"
  >
    <div>
      <div class="header">
        <div class="details">
          <span
            >{{ drugPriceList.medicineName || '-' }}（{{
              drugPriceList.medicineSpec || '-'
            }}）</span
          >
          <span
            >结算价格：{{
              drugPriceList.medicinePrice
                ? drugPriceList.medicinePrice.toFixed(2)
                : '-'
            }}元</span
          >
        </div>
        <div class="symptom">
          <div v-if="openState">
            <span class="close"
              >适应症：{{ drugPriceList.indications || '-' }}</span
            ><span
              v-show="drugPriceList.indications"
              class="openBtn"
              @click="openState = false"
              >展开</span
            >
          </div>
          <span v-else>适应症：{{ drugPriceList.indications || '-' }}</span>
        </div>
      </div>
      <div class="table">
        <el-table v-loading="tableLoading" :data="drugList" class="table-large">
          <el-table-column label="平台">
            <template slot-scope="scope">
              <span>{{ scope.row.platformName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品厂家">
            <template slot-scope="scope">
              <span class="text-overflow">{{
                scope.row.produceCompany || '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span>{{ scope.row.medicineSpec || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="'零售价(' + drugPriceList.retailPriceLimit + ')'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.retailPrice.toFixed(2) || '-' }}</span>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getDrugList"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: 'DrugPriceComparison',
  props: {
    id: {
      type: String,
      default: ''
    },
    drugPriceList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    drugParams: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      closeClickModal: false,
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      openState: true
    };
  },
  computed: {
    drugList() {
      if (this.drugPriceList.medicineCompareInfos) {
        return this.drugPriceList.medicineCompareInfos.list;
      } else {
        const arr = [];
        return arr;
      }
    }
  },
  watch: {
    drugPriceList() {
      this.drugListChange();
    }
  },
  created() {
    this.drugListChange();
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getDrugList() {
      const { pageNo, pageSize } = this.pagingOptions;
      this.drugParams.pageNum = pageNo;
      this.drugParams.pageSize = pageSize;
      this.$emit('getDrugPriceList', this.drugParams);
    },
    drugListChange() {
      if (this.drugPriceList.medicineCompareInfos) {
        const { total, pageNum } = this.drugPriceList.medicineCompareInfos;
        this.pagingOptions.total = total;
        this.pagingOptions.pageNo = pageNum;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.drug-price-comparison {
  .header {
    padding: 24px 0;
    .details {
      margin-bottom: 19px;
      span {
        margin-right: 70px;
        color: #464668;
        font-size: 16px;
      }
    }
    .symptom {
      span {
        color: #464668;
        font-size: 16px;
        line-height: 24px;
      }
      div {
        display: flex;
        .close {
          display: inline-block;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .openBtn {
          color: #3599fe;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .dialog-footer {
    margin-top: 10px;
  }
}
</style>
