<template>
  <div>
    <div
      v-for="item in serviceData"
      :key="item.service_type"
      class="data-service"
    >
      <div class="title">{{ serviceType[item.service_type] }}</div>
      <div class="data-details-list">
        <div v-if="item.reverse_amount" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['reverseAmount'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text details-type-1">{{ item.reverse_amount }}</span>
            <span class="unit details-type-1">次</span>
          </div>
          <div class="details-type details-type-1">
            预约次数
          </div>
        </div>
        <div v-if="item.reverse_peoples" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['reversePeoples'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text details-type-2">{{ item.reverse_peoples }}</span>
            <span class="unit details-type-2">人</span>
          </div>
          <div class="details-type details-type-2">
            预约人数
          </div>
        </div>
        <div v-if="item.used_amount" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['usedAmount'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text details-type-3">{{ item.used_amount }}</span>
            <span class="unit details-type-3">次</span>
          </div>
          <div class="details-type details-type-3">
            使用次数
          </div>
        </div>
        <div v-if="item.used_peoples_amount" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['usedPeoplesAmount'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text details-type-4">{{
              item.used_peoples_amount
            }}</span>
            <span class="unit details-type-4">人</span>
          </div>
          <div class="details-type details-type-4">
            使用人数
          </div>
        </div>
        <div v-if="item.usage_per_capita" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['avgUsedAmount'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text">{{ item.usage_per_capita }}</span>
            <span class="unit">次</span>
          </div>
          <div class="details-type">人均使用次数</div>
        </div>
        <div v-if="item.service_used_proportion" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['serviceUsedProportion'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text"
              >{{ (item.service_used_proportion * 100).toFixed(1) }}%</span
            >
          </div>
          <div class="details-type">服务用户占比</div>
        </div>
        <div v-if="item.usedPersonPercentage" class="data-details">
          <div class="tips">
            <div class="icon">
              <div class="tips-details">
                <div class="tips-title">数据说明</div>
                <div class="tips-content">
                  {{ explainText['usedPersonPercentage'] }}
                </div>
              </div>
            </div>
          </div>
          <div class="details-number">
            <span class="text">{{
              (item.usedPersonPercentage * 100).toFixed(1)
            }}</span>
            <span class="unit">%</span>
          </div>
          <div class="details-type">使用用户占比</div>
        </div>
      </div>
      <div class="data-line">
        <ServiceChart :id="`${item.service_type}`" :data="item.monthList" />
      </div>
    </div>
  </div>
</template>
<script>
import ServiceChart from './serviceChart';
import { explainText, serviceType } from '../config';
export default {
  name: 'DataService',
  components: {
    ServiceChart
  },
  props: {
    serviceData: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      explainText,
      serviceType
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.data-service {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  margin-top: 24px;
  padding: 24px;
  .title {
    font-size: 18px;

    font-weight: 600;
    color: #464668;
  }
  .data-details-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .data-details {
      width: 23.5%;
      box-shadow: 0px 2px 8px 0px rgba(15, 81, 255, 0.11);
      border-radius: 4px;
      margin-top: 24px;
      position: relative;
      .details-number {
        vertical-align: bottom;
        text-align: center;
        padding: 24px 0 12px;
        .text {
          font-size: 30px;

          font-weight: bold;
          color: #3599fe;
        }
        .unit {
          font-size: 12px;

          font-weight: 400;
          color: #3599fe;
        }
        .details-type-1 {
          color: #19c5bd;
        }
        .details-type-2 {
          color: #f54e60;
        }
        .details-type-3 {
          color: #3599fe;
        }
        .details-type-4 {
          color: #795bfe;
        }
      }
      .details-type {
        text-align: center;
        padding-bottom: 19px;
        font-size: 14px;

        font-weight: 400;
        color: #464668;
      }
      .details-type-1 {
        color: #19c5bd;
      }
      .details-type-2 {
        color: #f54e60;
      }
      .details-type-3 {
        color: #3599fe;
      }
      .details-type-4 {
        color: #795bfe;
      }
      .tips {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 14px;
        height: 14px;
        background-image: url('../../../../assets/data-center/icon_warning.svg');
        background-size: 100% 100%;
        cursor: pointer;
        .icon {
          width: 100%;
          height: 100%;
          position: relative;
          &:hover {
            .tips-details {
              display: block;
            }
          }
          .tips-details {
            width: 168px;
            height: 100px;
            position: absolute;
            top: 20px;
            left: 22px;
            background: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(15, 81, 255, 0.11);
            border-radius: 4px;
            display: none;
            z-index: 2;
            .tips-title {
              height: 34px;
              background: #f3f6f9;
              padding: 10px 12px;
              color: #464668;
              font-size: 14px;
            }
            .tips-content {
              padding: 10px 12px;
              color: #464668;
              font-size: 14px;
            }
          }
        }
      }
      &:nth-child(4n) {
        .tips {
          .icon {
            .tips-details {
              left: -168px;
            }
          }
        }
      }
    }
    .data-details:not(:nth-child(4n)) {
      margin-right: calc(6% / 3);
    }
  }
  .data-line {
    margin-top: 35px;
    position: relative;
    .date-mouth {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 9;
    }
  }
}
</style>
