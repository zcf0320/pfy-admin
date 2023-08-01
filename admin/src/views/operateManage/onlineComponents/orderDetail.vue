<template>
  <div class="order-detail-online">
    <div class="basisDrugsDetail-table">
      <div class="basisDrugsDetail-table-title">基础信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">订单编号</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBaseMsgVO.serialNumber || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">供应商订单编号</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBaseMsgVO.outOrderNo || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">下单时间</div>
          <div class="basisDrugsDetail-detail">
            {{ createTime || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">订单状态</div>
          <div class="basisDrugsDetail-detail">
            <div
              v-if="deatils.orderBaseMsgVO.state === '待确认'"
              class="check-status-tag check-passin"
            >
              待确认
            </div>
            <div
              v-if="deatils.orderBaseMsgVO.state === '待审核'"
              class="check-status-tag check-passin"
            >
              待审核
            </div>
            <div
              v-if="deatils.orderBaseMsgVO.state === '已取消'"
              class="check-status-tag check-unpass"
            >
              已取消
            </div>
            <div
              v-if="deatils.orderBaseMsgVO.state === '已完成'"
              class="check-status-tag check-pass"
            >
              已完成
            </div>
            <div
              v-if="deatils.orderBaseMsgVO.state === '已发货'"
              class="check-status-tag check-pass"
            >
              已发货
            </div>
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">更新时间</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBaseMsgVO.updateTime || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">服务来源</div>
          <div class="basisDrugsDetail-detail">
            <div
              :class="{
                'link-skip': !!formData.serviceSourceVO.serviceSourceId,
                text: true,
              }"
              @click="linkSkip(formData.serviceSourceVO)"
            >
              <span>
                {{ serviceSource }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">买家信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">用户姓名</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBuyerMsgVO.userName || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">联系电话</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBuyerMsgVO.mobile || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">身份证号</div>
          <div class="basisDrugsDetail-detail">
            {{
              deatils.orderBuyerMsgVO.idNo
                || '-'
            }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">收货人</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.receiver || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">收货人电话</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.receiverPhone || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">快递单号</div>
          <div class="basisDrugsDetail-detail">
            {{
              deatils.orderInvoiceMsgVO.logisticsInfo.logisticsNo || '-'
            }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">收货地址</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.address || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">供应商</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderSupplierMsgVO.name || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">发票信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">发票形式</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.ticketForm || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">发票类型</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.ticketType || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">发票抬头</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.ticketTitle || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">发票明细</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderInvoiceMsgVO.ticketDetail || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">价格信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">支付方式</div>
          <div class="basisDrugsDetail-detail">
            支付宝
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">产品金额</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderBaseMsgVO.orderNo || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">运费</div>
          <div class="basisDrugsDetail-detail">
            {{ postage || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">订单金额</div>
          <div class="basisDrugsDetail-detail">
            {{ cashPrice || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">核赔记录</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">核赔编号</div>
          <div class="basisDrugsDetail-detail">
            <div
              :class="deatils.orderClaimVO.claimNo ? 'link-skip' : ''"
              @click="goClaims(deatils.orderClaimVO.claimNo)"
            >
              <span>
                {{ deatils.orderClaimVO.claimNo || '-' }}
              </span>
            </div>
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">审核状态</div>
          <div class="basisDrugsDetail-detail">
            <div v-if="deatils.orderClaimVO.auditStatus">
              <!-- 1待审核，2成功，3失败 -->
              <div
                v-if="deatils.orderClaimVO.auditStatus === 1"
                class="check-status-tag check-passin"
              >
                <span class="padding-15"> 待审核 </span>
              </div>
              <div
                v-if="deatils.orderClaimVO.auditStatus === 2"
                class="check-status-tag check-pass"
              >
                <span class="padding-15"> 审核通过 </span>
              </div>
              <div
                v-if="deatils.orderClaimVO.auditStatus === 3"
                class="check-status-tag check-unpass"
              >
                <span class="padding-15"> 审核失败 </span>
              </div>
            </div>
            <div v-if="!deatils.orderClaimVO.auditStatus" class="text">
              <span> - </span>
            </div>
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">结算单信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">结算编号</div>
          <div class="basisDrugsDetail-detail">
            <div
              :class="deatils.orderSettlementMsgVO.settlId ? 'link-skip' : ''"
              @click="goSettle(deatils.orderSettlementMsgVO.settlId)"
            >
              {{ deatils.orderSettlementMsgVO.serialNumber || '-' }}
            </div>
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">结算账期</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderSettlementMsgVO.accountPeriod || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">结算状态</div>
          <div class="basisDrugsDetail-detail">
            <div class="text">
              <div
                v-if="deatils.orderSettlementMsgVO.state === '待结算'"
                class="check-status-tag check-passin"
              >
                待结算
              </div>
              <div
                v-if="deatils.orderSettlementMsgVO.state === '已结算'"
                class="check-status-tag check-pass"
              >
                已结算
              </div>
            </div>
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">完成人</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderSettlementMsgVO.creator || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">更新时间</div>
          <div class="basisDrugsDetail-detail">
            {{ deatils.orderSettlementMsgVO.updateTime || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r" />
      </div>
      <div class="table">
        <div class="basisDrugsDetail-table-title">价格信息</div>
        <el-table :data="PurchasedMedicineMsgVOArray" max-height="1000">
          <el-table-column label="商品" width="450">
            <template slot-scope="scope">
              <div class="goods-details">
                <div class="details">
                  <div class="img">
                    <img :src="scope.row.headPic" alt="暂无图片" />
                  </div>
                  <div class="details-text">
                    <div
                      class="name font-weight-500 link-skip"
                      @click="lookDeatils(scope.row.productId)"
                    >
                      {{ scope.row.name || '-' }}
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
                {{
                  scope.row.weight ? Number(scope.row.weight).toFixed(0) : '-'
                }}
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
              <div class="text">
                ¥{{ scope.row.price * scope.row.medicineNum }}
              </div>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
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
  </div>
</template>

<script>
// import { formatMobile, formatCard, formatSettleType } from '@/utils/validate';
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'orderDetail',
  // filters: {
  //   formatTel(mobile) {
  //     return formatMobile(mobile);
  //   },
  //   formatID(card) {
  //     return formatCard(card);
  //   },
  //   formatType(type) {
  //     return formatSettleType(type);
  //   }
  // },
  props: {
    deatils: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      deg: 0,
      viewUrl: '',
      serviceRegionState,
      PurchasedMedicineMsgVOArray: this.deatils.orderPurchasedMedicineMsgVO
    };
  },
  computed: {
    serviceSource() {
      return `【${
        this.serviceRegionState[
          Object.keys(this.formData.serviceSourceVO.serviceRegin)[0]
        ]
      }】${
        this.formData.serviceSourceVO.serviceSourceId
          ? this.formData.serviceSourceVO.serviceSourceId
          : ''
      }`;
    },
    createTime() {
      if (this.deatils.orderBaseMsgVO.createTime) {
        return this.$moment(this.deatils.orderBaseMsgVO.createTime).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      } else {
        return '-';
      }
    },
    // mobile() {
    //   return formatMobile(this.deatils.orderBuyerMsgVO.mobile);
    // },
    // idNo() {
    //   return formatCard(this.deatils.orderBuyerMsgVO.idNo);
    // },
    // receiverPhone() {
    //   return formatMobile(this.deatils.orderInvoiceMsgVO.receiverPhone);
    // },
    cashPrice() {
      return `￥${this.deatils.orderPriceMsgVO.cashPrice}`;
    },
    postage() {
      return `￥${this.deatils.orderPriceMsgVO.postage}`;
    }
  },
  methods: {
    rotate() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
      this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`;
    },
    viewPicture(url) {
      this.dialogVisible = true;
      this.viewUrl = url;
      this.$nextTick(() => {
        this.$refs.rotate.style.transform = `rotate(0deg)`;
        this.deg = 0;
      });
    },
    linkSkip(obj) {
      if (obj.serviceSourceId) {
        const id = obj.serviceSourceId;
        const source = obj.source;
        const key = Object.keys(obj.serviceRegin)[0];

        if (key === '1') {
          // 激活码
          this.$router.push(`/projectManage/activeCodeManage/details/${id}`);
        } else if (key === '2') {
          // 保单 source 0个险 1团险
          if (source === 0) {
            this.$router.push(`/policyManage/personalPolicy/details/${id}`);
          } else {
            this.$router.push(`/policyManage/groupPolicy/details/${id}`);
          }
        } else if (key === '3') {
          // 星矿
          this.$router.push(`/operateManage/pointsMall/details/${id}`);
        } else if (key === '4') {
          // 首页领取
          return false;
        } else if (key === '5') {
          // 服务包
          this.$router.push(
            `/supplyChainManage/servicePackage/details/${id}/detail`,
          );
        } else if (key === '6') {
          // 券码领取
          this.$router.push(`/marketingTool/interests/detail/${id}`);
        }
      } else {
        return false;
      }
    },
    // 查看详情
    lookDeatils(id) {
      this.$router.push(`/drugManage/goods-details/${id}/${true}`);
    },
    goClaims(id) {
      if (id) {
        this.$router.push(`/claimManagement/auditRecordsDetail/${id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-details {
  display: flex;
  width: 100%;
  margin-left: 13px;
  .margin-left {
    margin-left: 24px;
  }
  .max-width {
    max-width: 50%;
  }
  .details-item {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    // padding: 36px 40px;
    .title {
      color: #333333;
      font-size: 16px;
      position: relative;
      line-height: 14px;
      &::before {
        content: '';
        width: 4px;
        height: 16px;
        position: absolute;
        top: -2px;
        left: -12px;
        background-color: #2276ff;
      }
    }
    .content-detail {
      position: relative;
      &::before {
        content: '';
        width: 4px;
        height: 16px;
        position: absolute;
        top: 1px;
        left: -12px;
        background-color: #2276ff;
      }
    }
    .contnet {
      display: flex;
      flex-wrap: wrap;
      .item-2 {
        width: 50%;
        margin-bottom: 24px;
        display: flex;
        font-size: 14px;

        font-weight: 400;
        color: #333333;
        line-height: 14px;
        align-items: center;
        .label {
          width: 70px;
          font-size: 14px;
          color: #333333;
          text-align: justify-all;
        }
        .text {
          flex: 1;
          font-size: 14px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 20px;
          background-color: #f3f7ff;
          height: 36px;
          line-height: 36px;
          border-radius: 4px;
          box-sizing: border-box;
          .padding-15 {
            padding: 0 15px;
          }
        }
      }
    }
  }

  .file {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px 46px 0 0;
    .pdf {
      width: 31px;
      height: 35px;
      margin-right: 12px;
    }
    span {
      font-size: 12px;
      font-weight: 500;
      color: #2276ff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .blue {
    color: #2276ff;
    text-decoration: underline;
  }
  .cur {
    cursor: pointer;
    margin-bottom: 14px;
    font-size: 14px;
    line-height: 14px;
    padding: 0;
  }
  .viewImg {
    width: 500px;
    height: 500px;
    object-fit: contain;
  }
  .rotate {
    position: absolute;
    width: 16px;
    height: 16px;
    user-select: none;
    top: 14px;
    right: 44px;
    cursor: pointer;
  }
  .underline {
    text-decoration: underline;
    cursor: pointer;
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
  .status-box {
    justify-content: flex-start;
    align-items: center;
    div {
      margin: 0 5px;
    }
  }
}
.table {
  width: 100%;
  /deep/ .el-table th {
    background-color: #fff;
    border-bottom: 1px solid #dfe6ec;
  }
  .goods-details {
    padding: 17px 0 27px;
    .details {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        width: 111px;
        height: 111px;
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .details-text {
        margin-left: 32px;
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
.order-detail-online {
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
  .basisDrugsDetail-table {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-item {
      min-height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 14px;
      align-items: center;
      &-l {
        height: 100%;
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
      }
      &-r {
        > span {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          line-height: 14px;
          &.wrap {
            line-height: 18px;
            white-space: normal;
            padding: 17px 0;
          }
        }
        flex: 1;
        min-height: 48px;
        display: flex;
        align-items: center;
        padding: 4px 61px;
        border-left: 1px solid #e8e8e8;
        overflow: hidden;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
        .el-form-item {
          /deep/ .el-form-item__error {
            right: 10px;
            top: 50%;
            left: auto;
            transform: translateY(-50%);
          }
        }
      }
    }
    &-content {
      border: 1px solid #e8e8e8;
      border-top: none;
      min-height: 48px;
      font-size: 14px;

      color: #545473;
      padding: 17px 24px 17px 32px;
      display: flex;
      line-height: 20px;
      align-items: flex-start;
      &-l {
        font-weight: bold;
      }
      &-c {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.open {
          word-break: break-all;
          white-space: normal;
        }
      }
      &-r {
        color: #3599fe;
        cursor: pointer;
      }
    }
    &-four {
      // height: 48px;
      // display: flex;
      // border: 1px solid #e8e8e8;
      // border-top: none;
      // font-size: 14px;
      // color: #545473;
      // line-height: 48px;
        min-height: 48px;
    height: 100%;
    display: flex;
    border: 1px solid #e8e8e8;
    border-top: none;
    font-size: 14px;
    color: #545473;
      &-l,
      &-r {
        // flex: 1;
        // width: 50%;
        // display: flex;
        // align-items: center;
          flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
      }
      &-l {
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-type {
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
        // border-right: 1px solid #e8e8e8;
          display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
      }
      .basisDrugsDetail-detail {
        // flex: 1;
        // padding: 0 61px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
         display: flex;
        flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-left: 1px solid #ebedf2;
        .el-form-item {
          margin: 0;
          /deep/ .el-form-item__error {
            right: 10px;
            left: auto;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
