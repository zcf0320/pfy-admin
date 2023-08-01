<template>
  <div class="page-online-service-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :current-key="String(activeName)"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div v-if="callType === 1">
                <OrderDetail :deatils="deatils" :form-data="formData" />
              </div>
              <!-- 购药订单 -->
              <div v-if="callType === 2">
                <ExamineDetail :detail="detail" :form-data="formData" />
              </div>
              <!-- 审核记录 -->
              <div v-if="callType === 3">
                <QuestionDetail :form-data="formData" :detail1="detail1" />
              </div>
              <!-- 问卷 -->
              <div v-if="callType === 4">
                <div v-if="diagnose === 1 || diagnose === 2">
                  <!-- 智能 人工问诊 -->
                  <AiInquiry :id="callId" />
                </div>
                <div v-if="diagnose === 3">
                  <!-- 电话问诊 -->
                  <TelConsultation :id="callId" />
                </div>
              </div>
              <!-- 问诊 -->
              <div v-if="!callType">
                <Detail :form-data="formData" />
              </div>
              <!-- 在线 -->
              <div v-if="callType === 5">
                <ReportInterpret :id="callId" />
              </div>
              <!-- 体检解读 -->
              <div v-if="callType === 6">
                <DiabetesManage :form-data="formData" />
              </div>
              <!-- 糖尿病 -->
              <div v-if="callType === 7">
                <YjyDetail :details="yjyDetails" />
              </div>
              <div v-if="callType === 8">
                <Detail :form-data="formData" />
              </div>
              <!-- 老年痴呆 -->
              <div v-if="callType === 9">
                <AlzheimerDetail :form-data="formData" :data="yjyDetail" />
              </div>
              <!-- 睡眠管理 -->
              <div v-if="callType === 10">
                <SleepManagementDetail
                  :form-data="formData"
                  :data="sleepDetail"
                />
              </div>
              <!-- 皮肤检测 -->
              <div v-if="callType === 11">
                <SkinCheckDetail :form-data="formData" :data="skinDetail" />
              </div>
              <div v-if="callType === 12">
                <ThyroidDetail :formData="formData" :thyroidDetail="thyroidDetail"></ThyroidDetail>
              </div>
            </div>
            <div v-show="activeName === '1'" class="log-items">
              <LogList :log-list="logList" />
            </div>
            <div v-if="activeName === '2'">
              <Prescription v-if="callType === 1" :id="callId" />
            </div>
            <div v-if="activeName === '3'">
              <Material :detail="detail" />
            </div>
            <div v-if="['4', '5', '6', '7'].includes(activeName)">
              <yjy-service :type="yjyType" :data="yjyDetail" />
            </div>
            <div v-if="activeName === '8'">
              <div class="title-top mt-24">测试问卷</div>
              <el-table :data="list">
                <el-table-column
                  label="问卷名称"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column label="使用时间" prop="updateTime">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.useTime
                        ? $moment(scope.row.useTime).format('YYYY-MM-DD')
                        : '-'
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <HoverTip
                      content="查看"
                      tip-class-name="icon-detail"
                      @click.native.prevent="view(scope.row.id)"
                    />
                  </template>
                </el-table-column>
                <div slot="empty" class="empty-img" />
              </el-table>
            </div>
            <div v-if="activeName === '101'">
              <CbtiSleepDiary
                :detail="sleepNoteInfo"
                @changeTime="getSleepNote"
              ></CbtiSleepDiary>
            </div>
            <div v-if="activeName === '102'">
              <CbtiQuestionnaireRecord
                :tableLoading="tableLoading"
                :dataList="dataList"
                :pagingOptions="pagingOptions"
                @changePage="getQuestionList"
              ></CbtiQuestionnaireRecord>
            </div>
            <div v-if="activeName === '103'">
              <CbtiPunchRecord
                id="punchRecord"
                :chartData="dataLine"
                @dateChange="getChartData"
              ></CbtiPunchRecord>
            </div>
            <div v-if="activeName === '121'">
                <Thyroid :respList="thyroidDetail.respList"></Thyroid>
            </div>
             <div v-if="activeName === '122'">
              <CbtiQuestionnaireRecord
                :tableLoading="tableLoading"
                :dataList="dataList"
                :pagingOptions="pagingOptions"
                @changePage="getThyroidQuestionnaireRecord"
              ></CbtiQuestionnaireRecord>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import {
  OlgetYjyDetail,
  getQuestionnaireListById,
  getSleepRecordOl,
  getQuestionResultByUser,
  getPunchRecord,
  getThyroidDetailOnline,
  getThyroidQuestionnaireRecordOnline
} from '@/api/onlineService';
import Prescription from '../drugManage/orderManage/components/prescription';
import OrderDetail from './onlineComponents/orderDetail';
import ExamineDetail from './onlineComponents/examineDetail';
import QuestionDetail from './onlineComponents/questionDetail';
import Material from './onlineComponents/material';
import LogList from './onlineComponents/logList';
import Detail from './onlineComponents';
import AiInquiry from './onlineComponents/aiInquiry';
import TelConsultation from './onlineComponents/telConsultation';
import ReportInterpret from './onlineComponents/reportInterpret';
import DiabetesManage from './onlineComponents/diabetesManage';
import YjyDetail from './onlineComponents/yjyDetail.vue';
import YjyService from './onlineComponents/yjy-service.vue';
import AlzheimerDetail from './onlineComponents/AlzheimerDetail.vue';
import SleepManagementDetail from './onlineComponents/SleepManagementDetail.vue';
import SkinCheckDetail from './onlineComponents/SkinCheckDetail.vue';
import ThyroidDetail from './onlineComponents/ThyroidDetail.vue';
// import { PoreText, wrinkleText, AcneText } from '@/filters/index';
export default {
  name: 'UserDetails',
  components: {
    Prescription,
    OrderDetail,
    ExamineDetail,
    QuestionDetail,
    Material,
    LogList,
    Detail,
    AiInquiry,
    TelConsultation,
    ReportInterpret,
    DiabetesManage,
    YjyDetail,
    YjyService,
    AlzheimerDetail,
    SleepManagementDetail,
    SkinCheckDetail,
    ThyroidDetail
  },
  data() {
    return {
      tableLoading: false,
      type: false,
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      formData: {
        baseData: [],
        resultData: [],
        serviceMessage: [],
        userDemandVo: {},
        callType: null, // 1购药 2医师服务 3问卷
        serviceSourceVO: {}
      },
      logList: [],
      btns: [],
      callId: '',
      deatils: {
        // 基础信息
        orderBaseMsgVO: {
          orderNo: '',
          payType: '',
          state: '',
          createTime: ''
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
        orderInvoiceMsgVO: {
          // receiver: '',orderReceivingGoodsMsgVO
          // receiverPhone: '',
          // address: '',
          // logisticsInfo: {
          //   logisticsName: '',
          //   logisticsNo: ''
          // }
          address: '',
          drugStoreName: '',
          employeeName: '',
          idNo: '',
          logisticsInfo: {
            logisticsName: '',
            logisticsNo: ''
          },
          onlineOrOffline: '',
          receiver: '',
          receiverPhone: '',
          remark: '',
          ticketDetail: '',
          ticketForm: '',
          ticketTitle: '',
          ticketType: '',
          ticketUrl: '',
          userName: ''
        },
        // 发票信息
        // orderInvoiceMsgVO: {
        //   ticketDetail: '',
        //   ticketForm: '',
        //   ticketTitle: '',
        //   ticketType: ''
        // },
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
        }
      },
      dialogVisible: false,
      deg: 0,
      viewUrl: '',
      callType: '',
      diagnose: '',
      detail: {
        insuredMsg: {},
        rejectReasons: [],
        materialMsgList: []
      },
      detail1: {
        ucQuestionnaireUserUseDetailVO: {
          info: {
            name: '',
            sex: '',
            age: '',
            idCard: '',
            mobile: '',
            email: ''
          }
        },
        ucQuestionnaireUserUseResultVO: {}
      },
      yjyDetails: {
        baseMsg: { serialNumber: '' },
        userMsg: {},
        resultMsg: {},
        serviceSourceVO: {}
      },
      yjyDetail: {},
      sleepDetail: {},
      skinDetail: {},
      yjyType: 0,
      list: [],
      sleepNoteInfo: {},
      dataList: [],
      pagingOptions: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      dataLine: {
        xAxisData: [],
        axisLabel: {
          interval: 0,
          rotate: 65,
          textStyle: {
            color: '#666666'
          }
        },
        tooltip: {
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          backgroundColor: '#545454'
        },
        yAxisLabel: {
          formatter: '{value}h',
          textStyle: {
            color: '#666666'
          }
        },
        series: [
          {
            lineStyle: {
              color: '#3599FE'
            },

            type: 'line',
            data: []
          }
        ]
      },
      thyroidDetail: {}
    };
  },

  watch: {
    callType(newValue) {
      if (newValue === 1) {
        this.getDrugDetails(this.callId);
      } else if (newValue === 2) {
        this.getDocDetail();
      } else if (newValue === 3) {
        this.$store
          .dispatch('marketingTool/OlgetUserUseDetail', {
            resultId: this.callId
          })
          .then(res => {
            this.detail1 = res.data;
          });
      } else if (newValue === 7) {
        this.OlgetYjyDetail(this.callId);
      } else if (newValue === 10) {
        this.$store
          .dispatch('onlineService/OlgetSleepManage', {
            serviceRecordId: this.callId
          })
          .then(res => {
            this.sleepDetail = res.obj;
          });
      } else if (newValue === 11) {
        // this.$store
        // .dispatch('onlineService/getSkinCheckDetail', { id: this.callId })
        //  .then(res => {
        //   this.skinDetail = res.obj;
        //  });
      } else if (newValue === 12) {
getThyroidDetailOnline(this.callId).then(res => {
this.thyroidDetail = res.data;
});
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getOnlineServiceDetails(this.id);
  },
  methods: {
    ...mapActions('orderManage', ['OlgetOrderDetails']),
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '1') {
        vm.$store
          .dispatch('onlineService/onlineServiceLog', {
            id: vm.id
          })
          .then(res => {
            vm.logList = res.data || [];
          });
      } else if (tab === '8') {
        getQuestionnaireListById(vm.id).then(res => {
          this.list = res.data;
        });
      }
      if (tab === '101') {
        this.getSleepNote();
      }
      if (tab === '102') {
        this.getQuestionList();
      }
      if (tab === '103') {
        this.getChartData();
      }
      if (tab === '122') {
         this.getThyroidQuestionnaireRecord();
      }
    },
    // 获取在线详情
    getOnlineServiceDetails(id) {
      this.$store
        .dispatch('onlineService/getOnlineServiceDetails', {
          id
        })
        .then(res => {
          const serviceSourceVO = JSON.parse(
            JSON.stringify(res.obj.serviceSourceVO),
          );
          if (this.id) {
            const data = res.obj.callType;
            this.callType = data.callType;
            // 测试一下
            // this.callType = 10;
            this.callId = data.callId;
            this.diagnose = data.diagnoseType;
            this.yjyType = data.yjyType;
            this.yjyDetail = res.obj.yjyDetail;
            if (this.callType === 1) {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '2', name: '处方单信息' },
                { value: '1', name: '操作日志' }
              ];
            } else if (this.callType === 2) {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '3', name: '补充资料' },
                { value: '1', name: '操作日志' }
              ];
            } else if (this.callType === 8) {
              if (res.obj.callType.yjyType === 1) {
                this.btns = [
                  { value: '0', name: '基础信息' },
                  { value: '4', name: '图文问诊' },
                  { value: '1', name: '操作日志' }
                ];
              } else if (res.obj.callType.yjyType === 2) {
                this.btns = [
                  { value: '0', name: '基础信息' },
                  { value: '5', name: '挂号小秘书' },
                  { value: '1', name: '操作日志' }
                ];
              } else if (res.obj.callType.yjyType === 3) {
                this.btns = [
                  { value: '0', name: '基础信息' },
                  { value: '6', name: '住院垫付' },
                  { value: '1', name: '操作日志' }
                ];
              } else if (res.obj.callType.yjyType === 4) {
                this.btns = [
                  { value: '0', name: '基础信息' },
                  { value: '7', name: '上门服务' },
                  { value: '1', name: '操作日志' }
                ];
              } else {
                this.btns = [
                  { value: '0', name: '基础信息' },
                  { value: '1', name: '操作日志' }
                ];
              }
            } else if (this.callType === 9) {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '8', name: '测试问卷' }
              ];
            } else if (this.callType === 10) {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '101', name: '睡眠日记' },
                {
                  value: '103',
                  name: '打卡记录'
                },
                { value: '102', name: '测试问卷' },
                { value: '1', name: '操作日志' }
              ];
            } else if (this.callType === 11) {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '1', name: '操作日志' }
              ];
            } else if (this.callType === 12) {
              this.btns = [
                { value: '0', name: '基础信息' },
                {
                  value: '121',
                  name: '甲状腺管理'
                },
                { value: '122', name: '测试问卷' },
                { value: '1', name: '操作日志' }
              ];
            } else {
              this.btns = [
                { value: '0', name: '基础信息' },
                { value: '1', name: '操作日志' }
              ];
            }
          }
          for (const key in res.obj) {
            if (res.obj[key] && res.obj[key].length) {
              res.obj[key].forEach(item => {
                if (item.type === 'date') {
                  item.value = this.$moment(Number(item.value)).format(
                    'YYYY/MM/DD HH:mm:ss',
                  );
                }
              });
            } else {
              if (key !== 'userDemandVo') {
                res.obj[key] = [];
              }
            }
          }

          if (res.obj === null) {
            this.formData = {
              baseData: [],
              resultData: [],
              serviceMessage: [],
              userDemandVo: {},
              callType: null,
              serviceSourceVO: null
            };
          } else {
            this.formData = res.obj;
            this.formData.serviceSourceVO = serviceSourceVO;
          }
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
    getDrugDetails(id) {
      this.OlgetOrderDetails({
        id
      }).then(res => {
        this.deatils = res.obj;
        if (this.deatils.orderSupplierMsgVO === null) {
          this.deatils.orderSupplierMsgVO = {
            name: ''
          };
        }
      });
    },
    async getDocDetail() {
      const res = await this.$store.dispatch(
        'secondaryTreatment/OldetailSecondaryTreatment',
        this.callId,
      );
      if (res) {
        res.obj.materialMsgList = res.obj.materialMsgList || [];
        this.detail = this.$extends({}, res.data);
      }
    },
    OlgetYjyDetail(id) {
      OlgetYjyDetail(id).then(res => {
        this.yjyDetails = res.data;
      });
    },
    view(id) {
      this.$router.push(
        `/operateManage/onlineService/questionnaire-detail/${id}`,
      );
    },
    getSleepNote(val) {
      if (val) {
        this.time = this.$moment(val).format('YYYY-MM-DD');
      } else {
        this.time = this.$moment(new Date().getTime()).format('YYYY-MM-DD');
      }

      getSleepRecordOl({
        serviceRecordId: this.callId,
        date: this.time
      }).then(res => {
        this.sleepNoteInfo = res.data;
      });
    },
    getQuestionList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize,
        serviceRecordId: this.callId
      };
      getQuestionResultByUser(params).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.records || [];
        this.pagingOptions.total = res.data.totalNum;
      });
    },
    getChartData(val) {
      const params = {
        serviceRecordId: this.callId
      };
      if (val && val.length) {
        params['startDate'] = val[0];
        params['endDate'] = val[1];
      }
      getPunchRecord(params).then(res => {
        const date = [];
        const series = [];
        res.data.forEach(item => {
          date.push(this.$moment(item.sleepDate).format('YYYY-MM-DD'));
          series.push(item.sleepTime);
        });
        this.dataLine.xAxisData = date;
        this.dataLine.series[0].data = series;
      });
    },
     getThyroidQuestionnaireRecord(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize,
        userId: this.thyroidDetail.userInfo.id,
        serviceCode: 'thyroid'
      };
      getThyroidQuestionnaireRecordOnline(params).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.records || [];
        this.pagingOptions.total = res.data.totalNum;
      });
    }
  }
};
</script>
<style lang="scss">
.page-online-service-details {
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
        .add-certificates {
          margin-top: 24px;
        }
        .link-box {
          position: relative;
          .link-skip {
            position: absolute;
            top: 0;
            left: 15px;
            z-index: 2;
            height: 36px;
            cursor: pointer;
            background-color: #f3f7ff;
            font-size: 15px;
          }
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
  .h-top {
    height: calc(100% - 28px);
    overflow: auto;
  }
  .fixted-bottom {
    position: fixed;
    bottom: 10px;
    left: 274px;
    right: 30px;
    height: 68px;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
    border-radius: 0px 0px 4px 4px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    .btn-border-blue {
      border: 1px solid #3599fe;
      color: #3599fe;
    }
    .btn-bg-blue {
      color: #fff;
      background: #3599fe;
    }
  }
  .detail {
    .slide-fade-enter-active {
      transition: all 0.8s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.8s ease;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(417px);
    }
    .claimWarnModal {
      position: absolute;
      right: 0;
      top: 0;
      .tip {
        z-index: 3;
        position: absolute;
        right: 0;
        top: 20px;
        height: 36px;
        background: #3599fe;
        box-shadow: 0px 0px 11px 0px rgba(204, 204, 204, 0.5);
        border-radius: 100px 0px 0px 100px;
        transition: all 0.8s;
        font-size: 14px;

        font-weight: 500;
        color: #ffffff;
        text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
        cursor: pointer;
        &.close {
          width: 74px;
        }
        &.open {
          width: 162px;
        }
        .claim-open {
          display: inline-block;
          width: 19px;
          height: 19px;
          vertical-align: middle;
          margin: 0 6px 0 12px;
          background: url('../../assets/claim-open.png') no-repeat center center;
          background-size: contain;
        }
        .claim-close {
          display: inline-block;
          width: 19px;
          height: 19px;
          vertical-align: middle;
          margin: 0 6px 0 12px;
          background: url('../../assets/claim-close.png') no-repeat center
            center;
          background-size: contain;
        }
        span {
          vertical-align: middle;
          line-height: 36px;
        }
      }
    }
  }
  .health {
    margin-bottom: 15px;
    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      background: #464668;
      margin-right: 4px;
      border-radius: 50%;
    }
  }
  p.healthDetail {
    width: 646px;
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 21px;
    margin-bottom: 24px;
  }
}
</style>
