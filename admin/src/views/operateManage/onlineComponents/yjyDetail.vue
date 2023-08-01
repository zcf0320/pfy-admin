<template>
  <div class="yjy-details-pages">
    <div class="scroll-table">
      <div class="basisDrugsDetail-table">
        <div class="leaving-message-info">
          <div class="leaving-message-info-title">基础信息</div>
          <div class="leaving-message-info-item">
            <div class="leaving-message-info-item-l">问诊编号</div>
            <div class="leaving-message-info-item-r">
              {{ details.baseMsg.serialNumber || '-' }}
            </div>
              <div class="leaving-message-info-item-l">保单号</div>
            <div class="leaving-message-info-item-r">
              {{ details.baseMsg.policyNo || '-' }}
            </div>
          </div>
          <div class="leaving-message-info-item">
            <div class="leaving-message-info-item-l">服务名称</div>
            <div class="leaving-message-info-item-r">
              {{ details.baseMsg.serviceName || '-' }}
            </div>
             <div class="leaving-message-info-item-l"
             style="boxSizing: border-box;"
             >服务来源</div>
            <div class="leaving-message-info-item-r"
             style="boxSizing: border-box;width:200px;"
            >
              <span
                :class="{
                  'link-skip': !!details.serviceSourceVO.serviceSourceId,
                  text: true,
                }"
                @click="linkSkip(details.serviceSourceVO)"
              >
                {{
                  details.serviceSourceVO.serviceRegin
                    ? '【' +
                      serviceRegionState[
                        Object.keys(details.serviceSourceVO.serviceRegin)[0]
                      ] +
                      '】'
                    : '-'
                }}{{ details.serviceSourceVO.serviceSourceId }}
              </span>
            </div>
          </div>
          <div class="leaving-message-info-title">用户信息</div>
          <div class="leaving-message-info-item">
            <div class="leaving-message-info-item-l">用户姓名</div>
            <div class="leaving-message-info-item-r">
              {{ details.userMsg.name || '-' }}
            </div>
             <div class="leaving-message-info-item-l">用户年龄</div>
            <div class="leaving-message-info-item-r">
              {{ details.userMsg.age || '-' }}
            </div>
          </div>
          <div class="leaving-message-info-item">
            <div class="leaving-message-info-item-l">用户性别</div>
            <div class="leaving-message-info-item-r">
              {{ details.userMsg.sex ? '男' : '女' }}
            </div>
             <div class="leaving-message-info-item-l"
             ></div>
            <div class="leaving-message-info-item-r"
            style="borderLeft: none;"
            >
            </div>
          </div>
          <div class="leaving-message-info-title">问诊信息</div>
          <div class="leaving-message-info-item">
            <div class="leaving-message-info-item-l">所属科室</div>
            <div class="leaving-message-info-item-r">
              {{ details.resultMsg.diseaseClinicDepartment }}
            </div>
             <div class="leaving-message-info-item-l">咨询总结</div>
            <div class="leaving-message-info-item-r">
              {{ details.resultMsg.conclusion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'YjyDetail',
  props: {
    details: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      serviceRegionState
    };
  },
  methods: {
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
.yjy-details-pages {
  .details {
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      width: 30%;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
      margin: 0 20px 24px 0;
      line-height: 36px;
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
  .leaving-message-info {
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
      // align-items: center;
      &-l {
        // height: 100%;
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
         display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
         border-right: 1px solid #ebedf2;
      }
      &-r {
        // flex: 1;
        // min-height: 48px;
        // display: flex;
        // align-items: flex-start;
        // justify-content: center;
        // padding: 4px 61px;
        // border-left: 1px solid #e8e8e8;
        // border-right: 1px solid #e8e8e8;
        // flex-direction: column;
          display: flex;
        flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-right: 1px solid #ebedf2;
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
