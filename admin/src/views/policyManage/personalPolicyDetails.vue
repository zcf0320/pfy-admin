<template>
  <div class="page-policy-manage-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-if="activeName == '0'">
              <!-- <div class="title-top content-detail">基础信息</div> -->
              <div class="basisDrugsDetail-table">
                <div class="basisDrugsDetail-table-title">基础信息</div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">保单号</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.policyNo || '-' }}
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">撤单状态</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.state == '0' ? '正常' : '已撤单' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">保司虚拟保单号</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.vcPolicyNo || '-' }}
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">供应链虚拟保单号</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.sysPolicyNo || '-' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">保险产品</div>
                    <div class="basisDrugsDetail-detail">
                      <span
                        class="link-skip"
                        @click="
                          lookDetails(policyDetails.insuranceProductId, 1)
                        "
                      >
                        {{ policyDetails.insuranceProducName || '-' }}
                      </span>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">保障计划</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.planName || '-' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">保险公司</div>
                    <div class="basisDrugsDetail-detail">
                      <span
                        class="link-skip"
                        @click="
                          lookDetails(policyDetails.insuranceCompanyId, 2)
                        "
                      >
                        {{ policyDetails.insuranceCompanyName || '-' }}
                      </span>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">承保机构</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.saleComCode || '-' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">销售渠道</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.saleOrgCode || '-' }}
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">保费</div>
                    <div class="basisDrugsDetail-detail">
                      <span>
                        {{
                          policyDetails.premium
                            ? `￥${policyDetails.premium}`
                            : '暂无'
                        }}
                        <!-- <span
                          v-if="policyDetails.needPolicySettlement"
                          class="link-skip ml-24"
                          @click="
                            toPolicySettle(policyDetails.settlementBillItemId)
                          "
                          >({{
                            settleState[policyDetails.settlementInfo.normalSettlementStatus]
                          }})</span> -->
                      </span>
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">保单生效日期</div>
                    <div class="basisDrugsDetail-detail">
                      {{
                        policyDetails.effectiveDate | timeFormat('yyyy-MM-dd')
                      }}
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">保单终止日期</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.expiryDate | timeFormat('yyyy-MM-dd') }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <!-- <div class="basisDrugsDetail-type">保单服务费</div>
                    <div class="basisDrugsDetail-detail">
                      <span>
                        {{
                          policyDetails.serviceFeeAmount
                            ? `￥${policyDetails.serviceFeeAmount}`
                            : "暂无"
                        }}
                      </span>
                    </div> -->
                    <div class="basisDrugsDetail-type">是否续保</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.renewalOrNot ? '是' : '否' }}
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type"></div>
                    <div class="basisDrugsDetail-detail">
                    </div>
                  </div>
                  <!-- <div class="basisDrugsDetail-table-four-r"></div> -->
                </div>

                <div class="basisDrugsDetail-table-title">投保人信息</div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">投保人</div>
                    <div class="basisDrugsDetail-detail">
                      <span>
                        {{ policyDetails.policyholderName || '-' }}&nbsp;&nbsp;
                        {{
                          policyDetails.policyholderSex | formatSex
                        }}&nbsp;&nbsp;
                        {{ policyDetails.policyholderAge }}
                      </span>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">投保人手机号</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.policyholderMobile || '-' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-title">被保人信息</div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">被保人</div>
                    <div class="basisDrugsDetail-detail">
                      <span>
                        {{ policyDetails.insuredName || '-' }}&nbsp;&nbsp;
                        {{ policyDetails.insuredSex | formatSex }}&nbsp;&nbsp;
                        {{ policyDetails.insuredAge }}
                      </span>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">被保人手机号</div>
                    <div class="basisDrugsDetail-detail">
                      {{ policyDetails.insuredMobile || '-' }}
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">被保人身份证号</div>
                    <div class="basisDrugsDetail-detail">
                      <span>
                       {{ policyDetails.insuredIdcard || '-' }}
                      </span>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type"></div>
                    <div class="basisDrugsDetail-detail">
                    </div>
                  </div>
                </div>
                <!-- <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">
                    被保人身份证号
                  </div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>
                      {{ policyDetails.insuredIdcard || '-' }}
                    </span>
                  </div>
                </div> -->
                <div class="basisDrugsDetail-table-title">保单结算信息</div>
                  <div class="basisDrugsDetail-table-four">
                                      <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type"> 保险公司保单结算</div>
                    <div class="basisDrugsDetail-detail">
                       <span
                      v-if="
                        policyDetails.settlementInfo.normalSettlementStatus ||
                          policyDetails.settlementInfo.cancelSettlementStatus
                      "
                    >
                      保单正常结算：{{
                        settleState[
                          policyDetails.settlementInfo.normalSettlementStatus
                        ]
                      }}<span
                        class="link-skip"
                        @click="
                          toSettleDetail(
                            policyDetails.settlementInfo
                              .normalSettlementBillItemId,
                          )
                        "
                        >({{
                          policyDetails.settlementInfo
                            .normalSettlementBillItemNo || '-'
                        }})</span
                      >
                      &nbsp;&nbsp;&nbsp;&nbsp; 保单撤单结算：{{
                        settleState[
                          policyDetails.settlementInfo.cancelSettlementStatus
                        ]
                      }}<span
                        class="link-skip"
                        @click="
                          toSettleDetail(
                            policyDetails.settlementInfo
                              .cancelSettlementBillItemId,
                          )
                        "
                        >({{
                          policyDetails.settlementInfo
                            .cancelSettlementBillItemNo || '-'
                        }})</span
                      >
                    </span>
                    <span v-else>未生成结算单</span>
                    </div>
                  </div>
                   <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type"></div>
                    <div class="basisDrugsDetail-detail">
                    </div>
                  </div>
                  </div>
                <!-- <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">
                    保险公司保单结算
                  </div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span
                      v-if="
                        policyDetails.settlementInfo.normalSettlementStatus ||
                          policyDetails.settlementInfo.cancelSettlementStatus
                      "
                    >
                      保单正常结算：{{
                        settleState[
                          policyDetails.settlementInfo.normalSettlementStatus
                        ]
                      }}<span
                        class="link-skip"
                        @click="
                          toSettleDetail(
                            policyDetails.settlementInfo
                              .normalSettlementBillItemId,
                          )
                        "
                        >({{
                          policyDetails.settlementInfo
                            .normalSettlementBillItemNo || '-'
                        }})</span
                      >
                      &nbsp;&nbsp;&nbsp;&nbsp; 保单撤单结算：{{
                        settleState[
                          policyDetails.settlementInfo.cancelSettlementStatus
                        ]
                      }}<span
                        class="link-skip"
                        @click="
                          toSettleDetail(
                            policyDetails.settlementInfo
                              .cancelSettlementBillItemId,
                          )
                        "
                        >({{
                          policyDetails.settlementInfo
                            .cancelSettlementBillItemNo || '-'
                        }})</span
                      >
                    </span>
                    <span v-else>未生成结算单</span>
                  </div>
                </div> -->
              </div>
            </div>
            <div v-if="activeName == '1'">
              <el-table :data="policyDetails.vos">
                <el-table-column label="服务名称">
                  <template slot-scope="scope">
                    <span
                      class="table-link"
                      @click="lookService(scope.row.serviceInfoId)"
                      >{{ scope.row.serviceInfoName || '-' }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="服务截至日期">
                  <template slot-scope="scope">
                    <span>{{
                      $moment(scope.row.validTime).format('YYYY-MM-DD')
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="服务权益次数">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.useCount === -1
                        ? '无限次'
                        : `${scope.row.useCount}次`
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="已使用服务次数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.serviceRecordVos.length }}次</span>
                  </template>
                </el-table-column>
                <el-table-column label="服务使用记录" width="120">
                  <template slot-scope="scope">
                    <span
                      class="primary pointer"
                      @click="
                        showModal(
                          scope.row.serviceInfoId,
                          scope.row.serviceInfoName,
                          scope.row.serviceRecordVos,
                        )
                      "
                      >查看</span
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="activeName == '2'" class="log-items">
              <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.creator }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation]
                    }}{{ menuType[item.type] }}</span
                  >
                </div>
              </div>
            </div>
            <div
              v-if="
                policyDetails.state === '0' &&
                  pageAuthority.includes('cancel') &&
                  activeName === '0'
              "
              class="page-footer"
            >
              <button type="button" class="btn-save fr" @click="cancelOrder">
                保单撤单
              </button>
            </div>
          </div>
        </div>
      </el-main>
      <ServiceDetailListModal
        v-if="isShow"
        :id="id"
        :is-show="isShow"
        :service-info-id="serviceInfoId"
        :service-name="serviceName"
        :service-record-vos="serviceRecordVos"
        :type="1"
        @close="toggleModal"
      />
    </el-container>
  </div>
</template>
<script>
import {
  serviceUseStatus,
  policyStatus,
  operationType,
  menuType
} from '@/utils/enum';
import ServiceDetailListModal from './component/serviceDetailListModal';
export default {
  name: 'PersonalPolicyDetails',
  components: {
    ServiceDetailListModal
  },
  filters: {
    formatSex(val) {
      if (val) {
        return val === 0 ? '女' : '男';
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      id: '',
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'dtos'
      },
      policyDetails: {
        policyNo: '',
        dataState: '',
        insuranceProductName: '',
        servicePackageName: '',
        userName: '',
        userIdcard: '',
        userAge: '',
        insuredName: '',
        insuredIdcard: '',
        insuredAge: '',
        effectiveDate: '',
        expiryDate: '',
        insuredMobile: '',
        userMobile: '',
        insuredSex: '',
        policyholderMobile: '',
        policyholderSex: '',
        vos: [],
        settlementInfo: {}
      },
      logList: [],
      serviceUseStatus,
      policyStatus,
      operationType,
      menuType,
      isShow: false,
      serviceInfoId: '',
      serviceName: '',
      policyId: '',
      btns: [],
      serviceRecordVos: [],
      settleState: {
        0: '未生成结算单',
        1: '未结算',
        2: '已结算'
      }
    };
  },
  computed: {
    pageAuthority() {
      // 170301 个险保单
      return this.$store.state.user.pageAuthority['170301'];
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    vm.getPolicyDetails(vm.id);
    if (vm.id) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '服务列表' },
        { value: '2', name: '操作日志' }
      ];
    } else {
      vm.btns = [{ value: '0', name: '基础信息' }];
    }
  },
  methods: {
    // 跳转
    toSettleDetail(id) {
      if (id) {
        const routeData = this.$router.resolve({
          path: `/financial-center/policy-settlement-details/detail/${id}`
        });
        this.value = '';
        window.open(routeData.href, '_blank');
      }
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '2') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '19'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 保单撤单
    cancelOrder() {
      const vm = this;
      vm.$confirm(
        '<strong>确认是否撤销保单，确认后不可修改</strong><br>(撤单后被保险人对应的服务权益将失效)',
        '保单撤单',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        },
      ).then(() => {
        vm.$store
          .dispatch('personalPolicy/cancelPolicy', {
            id: vm.id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.$router.go(-1);
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    },
    // 获取保单详情
    getPolicyDetails(id) {
      this.$store
        .dispatch('personalPolicy/getPolicyDetails', {
          id
        })
        .then(res => {
          this.policyDetails = res.obj;
        });
    },
    // 查看详情
    lookDetails(id, type) {
      let routeData = '';
      if (type === 1) {
        // 查看保险产品详情
        routeData = this.$router.resolve({
          path: `/insuranceManage/insuranceProducts/details/${id}/detail`
        });
      } else if (type === 2) {
        // 查看服务包详情
        routeData = this.$router.resolve({
          path: `/insuranceManage/insuranceCompany/details/${id}/detail`
        });
      } else {
        // 查看保障计划
        routeData = this.$router.resolve({
          path: `/insuranceManage/guaranteePower/guaranteePowerDetails/${id}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 查看服务项
    lookService(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 查看使用详情
    lookPage(item) {
      let routeData = '';
      // 查看预约记录详情
      if (item.serviceType === '1') {
        routeData = this.$router.resolve({
          path: `/operateManage/appointmentService/details/${item.reverseId}/${item.reverseType}`
        });
      } else if (item.serviceType === '2') {
        // 在线服务详情
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${item.serviceRecordId}`
        });
      } else {
        // 商品兑换
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.commodityId}/${item.commodityType}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 服务记录弹框切换显示
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 无限次服务项查看服务详情
    showModal(serviceInfoId, serviceName, serviceRecordVos) {
      this.isShow = true;
      this.serviceInfoId = serviceInfoId;
      this.serviceName = serviceName;
      this.serviceRecordVos = serviceRecordVos;
    },
    toPolicySettle(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/financial-center/policy-settlement-details/detail/${id}`
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.page-policy-manage-details {
  .basisDrugsDetail-table {
    // box-shadow: 0px 0px 2px 2px #e8e8e8;
    // margin-bottom: 20px;
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
  .details-content {
    .data-list {
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item {
        // padding: 24px 0;
        .add-certificates {
          margin-top: 24px;
        }
        .link-box {
          position: relative;
          .link {
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 2;
            color: #464668;
            text-decoration: underline;
            height: 36px;
            cursor: pointer;
            &:hover {
              color: #66b2ff;
              &::after {
                background-color: #66b2ff;
              }
            }
            &:active {
              color: #1c8cff;
              &::after {
                background-color: #1c8cff;
              }
            }
          }
        }
      }
    }
    .table-link {
      color: #464668;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #66b2ff;
        &::after {
          background-color: #66b2ff;
        }
      }
      &:active {
        color: #1c8cff;
        &::after {
          background-color: #1c8cff;
        }
      }
    }
    .log-item {
      margin-top: 12px;
      display: flex;
      align-items: center;
      .circle {
        width: 10px;
        height: 10px;
        background-color: #2276ff;
        border-radius: 50%;
        margin-right: 6px;
      }
      .log-details {
        flex: 1;
        span {
          margin-right: 12px;
          color: #b9b9b9;
        }
        .color-hight {
          color: #282828;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
