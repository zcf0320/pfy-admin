<template>
  <div>
    <el-container>
      <el-main>
        <div class="inquiry-details-page flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName == '0'" class="leaving-message-info">
              <div class="leaving-message-info-title">基础信息</div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">问诊编号</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.baseMsg.serialNumber || '-' }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">问诊时间</div>
                <div class="leaving-message-info-item-r">
                  {{
                    recordDetails.baseMsg.createTime
                      ? $moment(recordDetails.baseMsg.createTime).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      : '-'
                  }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">结束时间</div>
                <div class="leaving-message-info-item-r">
                  {{
                    recordDetails.baseMsg.endTime
                      ? $moment(recordDetails.baseMsg.endTime).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      : '-'
                  }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">问诊时长</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.baseMsg.chartTime || 0 }}秒
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">会话数</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.baseMsg.chartAmount || '-' }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">服务来源</div>
                <div class="leaving-message-info-item-r">
                  <span
                    :class="{
                      'link-skip': !!recordDetails.serviceSourceVO
                        .serviceSourceId,
                      text: true,
                    }"
                    @click="linkSkip(recordDetails.serviceSourceVO)"
                  >
                    {{
                      recordDetails.serviceSourceVO.serviceRegin
                        ? '【' +
                          serviceRegionState[
                            Object.keys(
                              recordDetails.serviceSourceVO.serviceRegin,
                            )[0]
                          ] +
                          '】'
                        : '-'
                    }}{{ recordDetails.serviceSourceVO.serviceSourceId }}
                  </span>
                </div>
              </div>
              <div class="leaving-message-info-title">用户信息</div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">用户姓名</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.userMsg.name || '-' }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">用户年龄</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.userMsg.age || '-' }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">用户性别</div>
                <div class="leaving-message-info-item-r">
                  {{ recordDetails.userMsg.sex ? '男' : '女' }}
                </div>
              </div>
              <div v-if="recordDetails.resultMsg">
                <div class="leaving-message-info-title">
                  {{
                    diagnoseType[recordDetails.baseMsg.diagnoseType]
                  }}结果<span class="title-result" @click="progressModalToggle"
                    >问诊过程</span
                  >
                </div>
                <div class="leaving-message-info-item">
                  <div class="leaving-message-info-item-l">推荐科室</div>
                  <div class="leaving-message-info-item-r">
                    {{ recordDetails.resultMsg.diseaseClinicDepartment }}
                  </div>
                </div>
                <div
                  v-if="recordDetails.resultMsg.diseaseName"
                  class="leaving-message-info-item"
                >
                  <div class="leaving-message-info-item-l">问诊症状</div>
                  <div class="leaving-message-info-item-r">
                    {{ recordDetails.resultMsg.diseaseName }}
                  </div>
                </div>
                <div class="leaving-message-info-item">
                  <div class="leaving-message-info-item-l">推荐药物</div>
                  <div class="leaving-message-info-item-r">
                    {{ recordDetails.resultMsg.diseaseDrug }}
                  </div>
                </div>
              </div>
              <div v-if="recordDetails.onlineCallMsg">
                <div class="leaving-message-info-title">电话问诊</div>
                <div class="leaving-message-info-item">
                  <div class="leaving-message-info-item-l">手机号码：</div>
                  <div class="leaving-message-info-item-r">
                    {{ recordDetails.onlineCallMsg.mobile }}
                  </div>
                </div>
                <div
                  v-if="recordDetails.resultMsg.diseaseName"
                  class="leaving-message-info-item"
                >
                  <div class="leaving-message-info-item-l">本次疾病概述：</div>
                  <div class="leaving-message-info-item-r">
                    {{ recordDetails.onlineCallMsg.patientDescribe }}
                  </div>
                </div>
              </div>
              <ChatRecordModal
                v-if="isShow"
                :id="id"
                :is-show="isShow"
                @close="progressModalToggle"
              />
            </div>
            <div v-show="activeName == '1'" class="log-items">
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
                    >{{ operationType[item.operation] }}
                    {{ menuType[item.type] }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ChatRecordModal from '../component/chatRecordModal';
import {
  operationType,
  menuType,
  diagnoseActionType,
  diagnoseType,
  serviceRegionState
} from '@/utils/enum';
export default {
  name: 'workOrderDetails',
  components: {
    ChatRecordModal
  },
  data() {
    return {
      id: '',
      activeName: '0',
      recordDetails: {
        baseMsg: {
          chartAmount: 0,
          chartTime: 0,
          createTime: '',
          endTime: '',
          serialNumber: '',
          serviceRegin: ''
        },
        userMsg: {
          address: '',
          age: 0,
          name: '',
          sex: 0,
          avatarUrl: ''
        },
        serviceSourceVO: {
          serviceRegin: null,
          serviceSourceId: ''
        }
      },
      isShow: false,
      logList: [],
      operationType,
      menuType,
      diagnoseType,
      btns: [
        { value: '0', name: '问诊详情' },
        { value: '1', name: '操作日志' }
      ],
      serviceRegionState
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail(this.id);
  },
  methods: {
    ...mapActions('inquiryManage', ['getWorkOrderDetails']),
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      if (tab === '1') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: diagnoseActionType[vm.recordDetails.baseMsg.diagnoseType]
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    getDetail(id) {
      this.getWorkOrderDetails({
        id
      })
        .then(res => {
          this.recordDetails = res.obj;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 获取问诊详情
    progressModalToggle() {
      this.isShow = !this.isShow;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.inquiry-details-page {
  .record-details {
    .details {
      display: flex;
      flex-wrap: wrap;
      .item {
        display: flex;
        width: 25%;
        font-size: 14px;

        font-weight: 400;
        color: #333333;
        margin-bottom: 24px;
        .label {
          width: 100px;
        }
        .text {
          flex: 1;
        }
      }
    }
    .link-skip {
      float: right;
      font-size: 14px;
      font-weight: normal;
    }
  }
  .leaving-message-info {
    box-shadow: 0px 0px 2px 2px #e8e8e8;
    margin-bottom: 20px;
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
      .title-result {
        font-size: 16px;

        font-weight: bold;
        color: #3599fe;
        line-height: 16px;
        cursor: pointer;
        flex: 1;
        text-align: right;
      }
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
        flex: 1;
        min-height: 48px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 4px 61px;
        border-left: 1px solid #e8e8e8;
        flex-direction: column;
        &-text {
          line-height: 18px;
        }
        &-time {
          width: 100%;
          font-size: 14px;
          color: #989ab3;
          line-height: 14px;
          margin-top: 17px;
          text-align: right;
        }
        .leaving-message-imgs {
          display: flex;
          margin-top: 19px;
          &-item {
            width: 107px;
            height: 107px;
            background: #e8e8e8;
            border-radius: 4px;
            margin-right: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
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
    .padd-17 {
      padding: 17px 61px;
    }
  }
}
</style>
