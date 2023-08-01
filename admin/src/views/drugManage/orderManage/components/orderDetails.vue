<template>
  <div class="order-details-page">
     <div class="order-details-table">
            <div class="detail-table-title">
      基础信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">订单编号</div>
         <div class="detail-table-item-value">
        {{ details.orderBaseMsgVO.serialNumber }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">订单状态</div>
         <div class="detail-table-item-value">
        <div
          :class="[
            'check-status-tag',
            orderStateClass[details.orderBaseMsgVO.state],
          ]"
        >
          {{ details.orderBaseMsgVO.state }}
        </div>
        <div class="cancel-reason">
          {{ details.orderBaseMsgVO.cancelReason }}
        </div>
        <div
          v-if="details.cancelStatus === 0"
          class="update-status"
          @click="openMessage"
        >
          修改药品状态
        </div>
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">供应商订单编号</div>
          <div class="detail-table-item-value">
        {{ details.orderBaseMsgVO.outOrderNo || '-' }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">支付方式</div>
         <div class="detail-table-item-value">
        {{ details.orderBaseMsgVO.payType | payType }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">下单时间</div>
         <div class="detail-table-item-value">
        {{
          details.orderBaseMsgVO.createTime
            ? $moment(details.orderBaseMsgVO.createTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
            : '-'
        }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">更新时间</div>
         <div class="detail-table-item-value">
        {{ details.orderBaseMsgVO.updateTime }}
      </div>
      </div>
    </div>
    <div class="detail-table-title">
      被保人信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">用户姓名</div>
         <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.userName }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">身份证号</div>
           <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.idNo }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">性别</div>
           <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.sex === 1 ? '男' : '女' }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">年龄</div>
         <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.age || '-' }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">联系电话</div>
          <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.mobile }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">邮箱</div>
          <div class="detail-table-item-value">
        {{ details.orderBuyerMsgVO.email || '-' }}
      </div>
      </div>
    </div>
    <div class="detail-table-title">
      药品信息
    </div>
    <div class="table">
      <el-table
        class="drug-table"
        :data="details.orderPurchasedMedicineMsgVO.medicineMsgList"
        max-height="1000"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column label="商品">
          <template slot-scope="scope">
            <div class="goods-details">
              <div class="details">
                <div class="img">
                  <img :src="scope.row.headPic" alt="暂无图片" />
                </div>
                <div class="details-text">
                  <div
                    class="name font-weight-500 link-skip"
                    @click="goProduct(scope.row.productId)"
                  >
                    {{ scope.row.name }}
                  </div>
                  <div class="text">
                    批准文号：{{ scope.row.authorizedCode }}
                  </div>
                  <div class="text">规格：{{ scope.row.standard }}</div>
                  <div class="text">剂型：{{ scope.row.dosageForm }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <div class="text">¥{{ scope.row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column label="重量(g)">
          <template slot-scope="scope">
            <div class="text">
              {{ scope.row.weight ? Number(scope.row.weight).toFixed(0) : '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <div class="text">{{ scope.row.medicineNum }}</div>
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <div class="text">¥{{ scope.row.totalPrice.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <div slot="empty" class="empty-img" />
      </el-table>
    </div>
    <div class="detail-table-title">
      订单信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">订单类型</div>
          <div class="detail-table-item-value">
        {{
          details.orderInvoiceMsgVO.onlineOrOffline === 1
            ? '线下订单'
            : '线上订单'
        }}
      </div>
      </div>
      <div class="detail-table-item-right">
         <div class="detail-table-item-label"></div>
         <div class="detail-table-item-value"></div>
      </div>
    </div>
    <div
      v-if="details.orderInvoiceMsgVO.onlineOrOffline === 1"
      class="detail-table-item"
    >
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">核赔人</div>
      </div>
      <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.employeeName || '-' }}
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">核赔门店</div>
      </div>
      <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.drugStoreName || '-' }}
      </div>
    </div>
    <div
      v-if="details.orderInvoiceMsgVO.onlineOrOffline === 0"
      class="detail-table-item"
    >
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">收货人</div>
        <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.receiver }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">联系电话</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.receiverPhone }}
      </div>
      </div>
    </div>
    <div
      v-if="details.orderInvoiceMsgVO.onlineOrOffline === 0"
      class="detail-table-item"
    >
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">物流信息</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.logisticsInfo.logisticsNo || '-' }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">收货地址</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.address || '-' }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">发票形式</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.ticketForm }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">发票类型</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.ticketType }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">发票抬头</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.ticketTitle }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">发票明细</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.ticketDetail }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">姓名</div>
          <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.userName }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">身份证号</div>
         <div class="detail-table-item-value">
        {{ details.orderInvoiceMsgVO.idNo }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">回执发票</div>
         <div class="detail-table-item-value">
        <div v-if="images.length > 0" @click="viewFile">查看</div>
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label"></div>
        <div class="detail-table-item-value"></div>
      </div>
    </div>
    <div class="detail-table-title">
      保险信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">保单编号</div>
        <div class="detail-table-item-value">
        <div v-if="details.productServiceVO.policyNo">
          <span
            class="link-skip"
            @click="
              goPolicyDetail(
                details.productServiceVO.policyId,
                details.productServiceVO.saleChannel,
              )
            "
            >{{ details.productServiceVO.policyNo }}</span
          >
        </div>
        <div v-else>-</div>
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">保险产品</div>
         <div class="detail-table-item-value">
        {{ details.productServiceVO.productName }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">服务编号</div>
          <div class="detail-table-item-value">
        {{ details.productServiceVO.serviceNumber }}
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">服务名称</div>
         <div class="detail-table-item-value">
        {{ details.productServiceVO.serviceName }}
      </div>
      </div>
    </div>

    <div class="detail-table-title">
      结算信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">结算编号</div>
         <div class="detail-table-item-value">
        <div
          v-if="details.orderSettlementMsgVO.serialNumber"
          class="link-skip"
          @click="toSettleDetail(details.orderSettlementMsgVO.settlId)"
        >
          {{ details.orderSettlementMsgVO.serialNumber }}
        </div>
        <div v-else>-</div>
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">结算账期</div>
         <div class="detail-table-item-value">
        {{ details.orderSettlementMsgVO.accountPeriod || '-' }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">结算状态</div>
         <div class="detail-table-item-value">
        <div
          v-if="details.orderSettlementMsgVO.state"
          :class="[
            'check-status-tag',
            settlementStateClass[details.orderSettlementMsgVO.state],
          ]"
        >
          {{ details.orderSettlementMsgVO.state }}
        </div>
        <div v-else>-</div>
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">完成人</div>
           <div class="detail-table-item-value">
        {{ details.orderSettlementMsgVO.creator || '-' }}
      </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">更新时间</div>
           <div class="detail-table-item-value">
        {{ details.orderSettlementMsgVO.updateTime || '-' }}
      </div>
      </div>
      <div class="detail-table-item-right">
          <div class="detail-table-item-label"></div>
          <div class="detail-table-item-value"></div>
      </div>
    </div>
    <div class="detail-table-title">
      核赔信息
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">核赔编号</div>
        <div class="detail-table-item-value">
        <div
          v-if="details.orderClaimVO.claimNo"
          class="link-skip"
          @click="goClaims(details.orderClaimVO.claimNo)"
        >
          {{ details.orderClaimVO.claimNo }}
        </div>
        <div v-else>-</div>
      </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label"></div>
        <div class="detail-table-item-value"></div>
      </div>
    </div>

    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="548px"
      class="viewPic"
    >
      <img
        src="@/assets/icon_rotate.png"
        alt=""
        class="rotate"
        @click="rotate"
      />
      <img ref="rotate" :src="viewUrl" alt="" class="viewImg" />
    </el-dialog>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="images"
    />
     </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { formatMobile, formatCard, formatSettleType } from '@/utils/validate';
import { orderStateClass, settlementStateClass } from '@/utils/enum';
import { updateDrugStatus } from '@/api/orderManage';
export default {
  name: 'OrderDetails',
  filters: {
    formatTel(mobile) {
      return formatMobile(mobile);
    },
    formatID(card) {
      return formatCard(card);
    },
    formatType(type) {
      return formatSettleType(type);
    }
  },

  data() {
    return {
      orderStateClass,
      settlementStateClass,
      details: {
        // 基础信息
        orderBaseMsgVO: {
          orderNo: '',
          payType: '',
          state: '',
          createTime: '',
          serialNumber: '',
          outOrderNo: ''
        },
        // 供应商基础信息
        orderSupplierMsgVO: {
          name: ''
        },
        // 支付信息
        orderPriceMsgVO: {
          cashPrice: 0,
          postage: 0
        },
        // 买家信息
        orderBuyerMsgVO: {
          idNo: '',
          mobile: '',
          userName: ''
        },
        // 收货信息
        orderReceivingGoodsMsgVO: {
          receiver: '',
          receiverPhone: '',
          address: '',
          logisticsInfo: {
            logisticsName: '',
            logisticsNo: ''
          }
        },
        // 发票信息
        orderInvoiceMsgVO: {
          ticketDetail: '',
          ticketForm: '',
          ticketTitle: '',
          ticketType: '',
          ticketUrl: ''
        },
        // 商品列表
        orderPurchasedMedicineMsgVO: [],
        // 处方单列表
        orderPrescriptionMsgVO: {
          adverseReactions: '',
          allergyHistory: '',
          annex: [],
          createTime: '',
          definiteDiagnosis: '',
          dictBoolLiver: '',
          dictBoolNurse: '',
          dictBoolRenal: '',
          familyHistory: '',
          medicalHistory: '',
          state: '',
          updateTime: '',
          useMedicine: '',
          message: ''
        },
        // 结算单信息
        orderSettlementMsgVO: {
          state: '',
          accountPeriod: '',
          serialNumber: '',
          createTime: '',
          creator: '',
          remittanceCertificate: []
        },
        // 核赔
        orderClaimVO: {
          claimNo: '',
          auditStatus: ''
        },
        productServiceVO: {
          policyNo: ''
        }
      },
      list: [
        {
          id: 1
        }
      ],
      isPdf: true,
      pdfUrl: require('@/assets/view_pdf.png'),
      imgUrl: require('@/assets/view_pic.png'),
      dialogVisible: false,
      deg: 0,
      viewUrl: '',
      images: [],
      showViewer: false
    };
  },

  created() {
    this.getDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions('orderManage', ['getOrderDetails']),
    // 去药商结算详情
    toSettleDetail(id) {
      if (id) {
        this.$router.push(
          `/financial-center/drug-dealer-settlement/detail/${id}`,
        );
      }
    },
    // 获取详情
    getDetails(id) {
      this.getOrderDetails({
        id
      }).then(res => {
        this.details = res.data;
        if (res.obj.orderInvoiceMsgVO.ticketUrl) {
          this.images = res.obj.orderInvoiceMsgVO.ticketUrl.split(',');
        }
      });
    },
    rotate() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
      this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`;
    },

    // 查看详情
    goProduct(id) {
      this.$router.push(`/drugManage/goods-details/${id}/${true}`);
    },
    goClaims(id) {
      if (id) {
        this.$router.push(`/claimManagement/auditRecordsDetail/${id}`);
      }
    },
    goSettle(id) {
      if (id) {
        this.$router.push(
          `/financial-center/service-item-settlement/detail/${id}`,
        );
      }
    },

    viewFile() {
      this.showViewer = true;
    },
    showViewerClose() {
      this.showViewer = false;
    },
    openMessage() {
      const h = this.$createElement;
      this.$msgbox({
        message: h('strong', null, [
          h('strong', null, '客户退还药品，调整药品为入库状态'),
          h('p', { style: 'color:red' }, '*确定入库后不可撤销')
        ]),
        title: '药品状态调整',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          updateDrugStatus(this.$route.params.id).then(res => {
            this.$message.success(res.message);
            this.getDetails(this.$route.params.id);
          });
        })
        .catch(() => {});
    },
    goPolicyDetail(id, type) {
      if (type === 99) {
        this.$router.push(`/policyManage/personalPolicy/details/${id}`);
      } else {
        this.$router.push(`/policyManage/groupPolicy/details/${id}`);
      }
    },
    getSummaries() {
      const sums = [];
      sums[0] = '合计';

      sums[2] = '运费:' + this.details.orderPurchasedMedicineMsgVO.postage;
      sums[3] =
        '处方费:' + this.details.orderPurchasedMedicineMsgVO.prescription;

      sums[4] = '总价:' + this.details.orderPurchasedMedicineMsgVO.totalPrice;

      return sums;
    }
  }
};
</script>
<style lang="scss" scoped>
.order-details-page {
  background: #ffffff;
  border-radius: 4px;
  .order-details-table {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
  }
  .table {
    width: 100%;
    padding: 16px 32px;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    .drug-table {
      /deep/ table th {
        background-color: #eef6fe;
      }
    }

    .goods-details {
      padding: 17px 0 27px;
      .details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .img {
          width: 94px;
          min-width: 94px;
          height: 94px;
          border-radius: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .details-text {
          margin-left: 16px;
          .name {
            margin-bottom: 14px;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
              color: #2276ff;
            }
            &:active {
              color: #005ef7;
            }
          }
          .text {
            color: #6f6f6f;
            margin-bottom: 14px;
            font-size: 14px;
            line-height: 14px;
            padding: 0;
          }
        }
      }
      .font-weight-500 {
        font-weight: 500;
      }
    }
    .text {
      color: #333333;
      font-size: 14px;
      line-height: 15px;
      font-weight: 500;
      padding-left: 10px;
    }
  }
  .order-type {
    display: flex;
    border: 1px solid #e8e8e8;
    border-top: none;
    font-size: 14px;
    color: #545473;
    &-label {
      width: 370px;
      display: flex;
      align-items: center;
      min-height: 48px;
      height: 100%;
      font-weight: bold;
      padding-left: 32px;
    }
    &-value {
      display: flex;
      flex: 1;
      padding-left: 42px;
      align-items: center;
      color: #545473;
      min-height: 48px;
      height: 100%;
      border-left: 1px solid #ebedf2;
    }
  }
  .view-ticket {
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    div {
      width: 100px;
      color: #333333;
    }
    span {
      cursor: pointer;
      user-select: none;
      text-decoration: underline;
    }
  }

  .check-status-tag {
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    height: 24px;
  }
  .check-pass {
    background: #c9f7f4;
    color: #18c4bd;
    width: 72px;
  }
  .check-passin {
    background: #e1f1ff;
    color: #62acff;
    width: 55px;
  }
  .check-unpass {
    background: #ffe2e5;
    color: #f64e60;
    width: 72px;
  }

  .overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 30%;
  }
  .viewer {
    display: none;
  }
  .cancel-reason {
    margin-left: 36px;
    font-size: 14px;
    font-weight: 400;
    color: #a2a3b7;
  }
}
</style>
