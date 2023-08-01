<template>
  <el-container>
    <!-- <el-main class="spacing"> -->
    <el-scrollbar
      :native="false"
      wrap-class="el-main spacing"
      tag="main"
      :noresize="false"
    >
      <div class="order-manage-page mb-24">
        <div class="filter-form">
          <div class="title-top">
            订单列表<button
              type="button"
              class="fr btn-save"
              @click="exportList"
            >
              导出
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">订单号:</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入订单号"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">供应商:</span>
                  <el-select
                    v-model="filter.supplierId"
                    class="search-input"
                    placeholder="请输入供应商"
                    filterable
                    remote
                    :remote-method="getSuppliers"
                  >
                    <el-option
                      v-for="item in supplierList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                      <span v-html="item.hightLable" />
                    </el-option>
                  </el-select>
                </div>

                <div class="form-item">
                  <span class="label-name">理赔人:</span>
                  <el-input
                    v-model="filter.claimName"
                    placeholder="请输入理赔人"
                    class="search-input"
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
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">下单时间:</span>
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

                <div class="form-item">
                  <span class="label-name">处方单:</span>
                  <el-select
                    v-model="filter.havePrescriptions"
                    class="search-input"
                    placeholder="全部"
                    @change="getList"
                  >
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="有" :value="1"> </el-option>
                    <el-option label="无" :value="0"> </el-option>
                  </el-select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="order-manage-page">
        <div class="content">
          <Tab
            v-if="$isNotEmpty(tabs)"
            :btns="tabs"
            :current-key="activeName"
            @change="tabClick"
          />
          <div class="order-table">
            <el-table v-loading="tableLoading" :data="orderList" class="table-large">
              <el-table-column label="商品信息" min-width="150">
                <template slot-scope="scope">
                  <div class="table-title">
                    <span class="table-num" @click="lookDetails(scope.row.id)">
                      {{ scope.row.serialNumber || '-' }}</span
                    >
                  </div>
                  <div class="tem">
                    <div
                      v-for="(item, index) in scope.row.medicineList"
                      :key="index"
                      class="flex table-detail"
                    >
                      <div>
                        <img
                          :src="item.headPic"
                          alt="暂无图片"
                          class="table-img"
                        />
                      </div>
                      <div>
                       <el-tooltip :content="item.name"> <div class="product-name mb-16">{{ item.name }}</div></el-tooltip>
                        <div class="table-time">{{ item.standard }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="供应商信息" show-overflow-tooltip min-width="150">
                <template slot-scope="scope">
                  <div class="table-title"></div>
                  <div class="tem">
                    <div
                      class="supplier"
                      v-for="(item, index) in scope.row.medicineList"
                      :key="index"
                    >
                      <div class="supplier-name">
                        {{ item.supplierName || '-' }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="理赔人">
                <template slot-scope="scope">
                  <div class="table-title"></div>
                  <div class="tem">
                    <div class="claims">
                      <div>
                        <div class="claim-name">
                          {{ scope.row.claimName || '-' }}
                        </div>

                        <div class="claim-phone">
                          {{ scope.row.claimPhone || '-' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单状态">
                <template slot-scope="scope">
                  <div class="table-title"></div>
                  <div class="tem">
                    <div class="supplier mb-32">
                      <div
                        :class="[
                          'label-text',
                          columnState[scope.row.state]
                        ]"
                      >
                        {{ orderState[scope.row.state] }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
               <el-table-column label="下单时间">
                <template slot-scope="scope">
                  <div class="table-title"></div>
                  <div class="tem">
                    <div class="supplier mb-32">
                     {{
                      $moment(scope.row.createTime).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                     <div class="table-title"></div>
                  <div class="supplier mb-32">
                    <div class="flex-box">
                      <HoverTip
                        content="查看"
                        tip-class-name="icon-detail"
 class="mr-30"
                        @click.native.prevent="lookDetails(scope.row.id)"
                      />

                      <HoverTip
                      v-if="scope.row.state === '4'"
                        content="撤单"
                        tip-class-name="icon-delete"

                        @click.native.prevent="cancelOrder(scope.row.id)"
                      ></HoverTip>
                    </div>
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
      <Dialog
        title="撤单原因"
        :visible.sync="dialogVisible"
        :height="400"
        :width="626"
        @closed="onClose"
      >
        <el-form
          inline
          ref="ruleForm"
          label-width="100px"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="原因" prop="reason">
            <el-select
              style="width:450px"
              v-model="ruleForm.reason"
              placeholder="全部"
            >
              <el-option
                label="库存不足，理赔失败"
                value="库存不足，理赔失败"
              ></el-option>
              <el-option
                label="客户原因终止理赔"
                value="客户原因终止理赔"
              ></el-option>
              <el-option
                label="核销药品错误重新理赔"
                value="核销药品错误重新理赔"
              ></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="ruleForm.remark"
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onClose">取 消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="submit"
            >确 定</el-button
          >
        </span>
      </Dialog>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex';
import { columnState, orderState } from '@/utils/enum';
import { replaceHightKeyWord } from '@/utils/common';
import { exportOrderList } from '@/api/orderManage';
import { revokeOrder } from '@/api/drugManage';
export default {
  name: 'OrderList',
  data() {
    return {
      isShowClear: false,
      filter: {
        name: '',
        filterTime: [],
        state: -1,
        supplierId: '',
        settlementState: '',
        prescriptionState: '',
        havePrescriptions: '',
        serialNumber: '',
        receiver: '',
        receiverPhone: '',
        drugStoreName: '',
        claimName: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      orderList: [],
      columnState,
      orderState,
      supplierList: [],
      settleList: [],
      drugList: [],
      tabs: [],
      activeName: '-1',
      dialogVisible: false,
      ruleForm: {
        id: '',
        reason: '',
        remark: ''
        // outbound: 1
      },
      rules: {
        reason: [
          {
            required: true,
            message: '请选择原因',
            trigger: 'change'
          }
        ]
      },
      saveLoading: false,
      showMore: false
    };
  },
  watch: {
    filter(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
  created() {
    const { pageNo, state } = JSON.parse(
      sessionStorage.getItem('historyFilter'),
    ) || { pageNo: 1, state: -1 };
    this.filter.state = state;
    // switch (state) {
    //   case -1:
    //     this.activeName = '0';
    //     break;
    //   case 1006:
    //     this.activeName = '1';
    //     break;
    //   case 1007:
    //     this.activeName = '2';
    //     break;
    //   case 1008:
    //     this.activeName = '3';
    //     break;
    //   case 1009:
    //     this.activeName = '4';
    //     break;
    //   case 1010:
    //     this.activeName = '5';
    //     break;
    //   default:
    //     break;
    // }
    // 获取订单列表
    this.getList({
      page: Number(pageNo)
    });

    this.getOption('settlementState');
    this.getOption('prescriptionState');
  },
  methods: {
    ...mapActions('orderManage', ['getOrderList', 'getSupplierList']),
    // 导出
    exportList() {
      window.open(exportOrderList());
    },
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        serialNumber: '',
        filterTime: [],
        state: -1,
        supplierId: '',
        receiver: '',
        receiverPhone: ''
      };
      this.getList();
    },
    // tab切换
    tabClick(state) {
      this.filter.state = state === '-1' ? '' : state;
      this.pagingOptions.pageNo = 1;
      this.getList();
    },
    // 获取订单列表
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
      vm.getOrderList(params)
        .then(res => {
          vm.tableLoading = false;
          const data = res.data;
          const tabs = [];
          data.forEach(item => {
            tabs.push({
              value: item.id.toString(),
              name: item.name + `(${item.actualValue})`
            });
          });
          this.tabs = tabs;
          vm.orderList = res.records || [];

          vm.pagingOptions.total = res.totalNum;
          // 设置tab切换
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看订单详情
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo,
        state: this.filter.state
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`/drugManage/orderDetails/${id}`);
    },

    getOption(code) {
      // 账期  结算状态
      this.$store
        .dispatch('app/getSysConfig', {
          code: code
        })
        .then(res => {
          if (code === 'settlementState') {
            this.settleList = res.obj || [];
          } else {
            this.drugList = res.obj || [];
          }
        });
    },
    getSuppliers(keyword) {
      if (keyword !== '') {
        // 获取供应商列表
        this.getSupplierList({
          supplierName: keyword
        }).then(res => {
          res.obj.vos.forEach(item => {
            item.hightLable = replaceHightKeyWord(keyword, item.name);
          });
          this.supplierList = res.obj.vos || [];
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    cancelOrder(id) {
      this.ruleForm.id = id;
      this.dialogVisible = true;
    },
    onClose() {
      this.ruleForm = {
        id: '',
        reason: '',
        remark: '',
        outbound: 1
      };
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.saveLoading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          return false;
        }
        revokeOrder(this.ruleForm)
          .then(() => {
            this.saveLoading = false;
            this.$message.success('撤单成功');
            this.onClose();
            this.getList();
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.order-manage-page {
  .expand-icon,
  .collapse-icon {
    width: 24px;
    height: 30px;
  }
  .content {
    .tabs {
      display: flex;
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      .tab-item {
        padding: 18px 0;
        margin-right: 48px;
        color: #333333;
        // font-size: 16px;
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
      margin-top: 24px;
      .message {
        padding-left: 10px;
        .text {
          color: #6f6f6f;
          margin: 24px 0;
          // font-size: 16px;
          line-height: 14px;
          &:first-child {
            color: #333333;
          }
        }
        .name {
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: #2276ff;
            font-weight: 500;
          }
          &:active {
            color: #005ef7;
            font-weight: 500;
          }
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
  .table-num {
    color: #464668;
    margin-right: 31px;
    cursor: pointer;
    &:hover {
      color: #3599fe;
    }
  }
  .table-time {
    color: #989ab3;
  }
  .table-img {
    width: 76px;
    height: 76px;
    margin-right: 16px;
  }
  .table-detail {
    justify-content: flex-start;
    align-items: center;

    /* border: 1px solid #ebedf2; */
    border-right: 0;
    .product-name {
        color: #333333;
         overflow: hidden;
         max-width: 160px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
  }
  .supplier {
    display: flex;
    height: 76px;

    color: #464668;
    align-items: center;
    .supplier-name {
        margin-top: 10px;
      margin-bottom: 32px;
    }
  }
  .table-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    /* border-bottom: 1px solid #ebedf2; */
  }
  .name {
    margin-left: 10px;
  }
  .claims {
    height: 76px;
    display: flex;
    align-items: center;
    .claim-name {
      font-size: 14px;
      font-weight: 400;
      color: #545473;
      margin-bottom: 16px;
    }
    .claim-phone {
      font-size: 14px;
      font-weight: 400;
      color: #6f7293;
    }
  }
}
</style>
