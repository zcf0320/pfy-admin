<template>
  <el-container>
    <div class="zhong-han-page">
      <el-scrollbar style="height: 100%; overflow-x: hidden">
        <div class="user-data-title">
          <div class="title">用户数据</div>
          <div class="update-time">更新时间: {{ updateTime }}</div>
        </div>
        <div class="data-summary">
          <div class="summary">
            <div class="title">
              <div class="text">用户总数</div>
              <div class="tips">
                <div class="icon">
                  <div class="tips-details">
                    <div class="tips-title">数据说明</div>
                    <div class="tips-content">
                      {{ explainText['userAllCount'] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message" />
            <div class="total">
              {{ dashboard.userAllCount || '0' }}
              <span class="unit">人</span>
            </div>
          </div>
          <div class="summary">
            <div class="title">
              <div class="text">实名用户数</div>
              <div class="tips">
                <div class="icon">
                  <div class="tips-details">
                    <div class="tips-title">数据说明</div>
                    <div class="tips-content">
                      {{ explainText['userAutonymCount'] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message" />
            <div class="total">
              {{ dashboard.userAutonymCount || '0' }}
              <span class="unit">人</span>
            </div>
          </div>
          <div class="summary">
            <div class="title">
              <div class="text">使用服务用户数</div>
              <div class="tips">
                <div class="icon">
                  <div class="tips-details">
                    <div class="tips-title">数据说明</div>
                    <div class="tips-content">
                      {{ explainText['userServicedCount'] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message">
              使用服务用户占比
              {{ (dashboard.proportionServiceUsers * 100).toFixed(1) }}%
            </div>
            <div class="total">
              {{ dashboard.userServicedCount || '0' }}
              <span class="unit">人</span>
            </div>
            <div v-if="dashboard.userServicedCount" class="progress">
              <el-progress
                :percentage="dashboard.proportionServiceUsers * 100"
                color="#3599FE"
                :show-text="false"
              />
            </div>
          </div>
          <div class="summary">
            <div class="title">
              <div class="text">人均使用服务项种类</div>
              <div class="tips">
                <div class="icon">
                  <div class="tips-details tips-details-left">
                    <div class="tips-title">数据说明</div>
                    <div class="tips-content">
                      {{ explainText['usedServiceTypeAccount'] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message" />
            <div class="total">
              {{ dashboard.usedServiceTypeAccount || '0' }}
              <span class="unit" />
            </div>
          </div>
        </div>
        <div class="chart flex">
          <div class="flex top">
            <div class="width">
              <div class="chart-title">男女比例</div>
              <div class="center">
                <SexRatio :data="chartsData" />
              </div>
            </div>
            <div class="mt48 width">
              <div class="chart-title">年龄分布</div>
              <div class="center">
                <AgeRatio :data="chartsData" />
              </div>
            </div>
          </div>
          <div class="flex crew">
            <div class="chart-line mt48" />
            <div class="chart-line mt48" />
          </div>
          <div class="flex top">
            <div class="width">
              <div class="chart-title">操作系统分布</div>
              <div class="center">
                <SystemRadio :data="chartsData" />
              </div>
            </div>
            <div class="mt48 width">
              <div class="chart-title">手机品牌</div>
              <div class="center">
                <BrandRatio :data="chartsData" />
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-title">
          <div class="title">服务类别数据</div>
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年"
            :clearable="false"
            :picker-options="pickerOptions"
            @change="getData"
          >
            >
          </el-date-picker>
        </div>
        <div v-if="!serviceData.length" class="none-service">
          <div class="none-img" />
          <div class="none-text">暂无数据</div>
        </div>
        <DataService v-else :service-data="serviceData" />
      </el-scrollbar>
    </div>
  </el-container>
</template>
<script>
import DataService from './component/dataService';
import SexRatio from './component/sexRatio';
import AgeRatio from './component/ageRatio';
import SystemRadio from './component/systemRadio';
import BrandRatio from './component/brandRatio';
import { mapActions } from 'vuex';
import { explainText } from './config';
import moment from 'moment';
export default {
  name: 'OperateDashboard',
  components: {
    DataService,
    SexRatio,
    AgeRatio,
    SystemRadio,
    BrandRatio
  },
  data() {
    return {
      dashboard: {
        userAllCount: 0,
        userAutonymCount: 0,
        userServicedCount: 0,
        usedServiceTypeAccount: 0,
        proportionServiceUsers: 0
      },
      explainText,
      serviceData: [],
      year: new Date(),
      updateTime: moment().format('YYYY-MM-DD 00:00:00'),
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() - 8.64e7 ||
            moment(time).format('YYYY') < 2020
          );
        }
      },
      chartsData: ''
    };
  },
  created() {
    this.getUserDashboard({
      create_time: moment().format('YYYY-MM-DD')
    }).then(res => {
      const { data, status } = res;
      if (status) {
        this.dashboard = data;
      }
    });
    this.getData(new Date());
    this.getCharts();
  },
  methods: {
    ...mapActions('operateManageDashboard', [
      'getUserDashboard',
      'getOperateDashboard',
      'userScale'
    ]),
    // 获取看板数据
    getData(year) {
      this.getOperateDashboard({
        year: moment(year).format('YYYY')
      }).then(res => {
        const { data, status } = res;
        if (status) {
          this.serviceData = data;
        }
      });
    },
    getCharts() {
      this.userScale().then(res => {
        this.chartsData = JSON.stringify(res.data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.zhong-han-page {
  width: 100%;
  min-height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  .none-service {
    width: 100%;
    background-color: #fff;
    padding: 57px 0;
    margin-top: 24px;
    min-height: 600px;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    .none-img {
      width: 440px;
      height: 317px;
      margin: 0 auto;
      background-image: url('../../../assets/data-center/none-img.png');
      background-size: 100% 100%;
    }
    .none-text {
      margin-top: 30px;
      font-size: 24px;

      font-weight: 400;
      color: #6f7293;
      text-align: center;
    }
  }
  .user-data-title {
    width: 100%;
    height: 66px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-bottom: 24px;
    .title {
      flex: 1;
      font-size: 18px;

      font-weight: 600;
      color: #464668;
      line-height: 18px;
    }
    .update-time {
      font-size: 14px;

      font-weight: 400;
      color: #6f7293;
      line-height: 16px;
    }
  }
  .dashboard-title {
    width: 100%;
    height: 66px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-top: 24px;
    .title {
      flex: 1;
      font-size: 18px;

      font-weight: 600;
      color: #464668;
      line-height: 18px;
    }
  }
  .data-summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .summary {
      flex: 1;
      height: 180px;
      padding: 24px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
      .title {
        height: 20px;
        display: flex;
        .text {
          flex: 1;
          font-size: 18px;

          font-weight: 600;
          color: #464668;
        }
        .tips {
          width: 20px;
          height: 20px;
          background-image: url('../../../assets/data-center/icon_more.svg');
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
              // height: 100px;
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
                text-align: justify;
              }
            }
            .tips-details-left {
              left: -168px;
            }
          }
        }
      }
      .message {
        height: 60px;
        padding: 12px 0;
        font-size: 14px;

        font-weight: 400;
        color: #464668;
      }
      .total {
        font-size: 30px;

        font-weight: 600;
        color: #464668;
        vertical-align: bottom;
        .unit {
          font-size: 18px;

          font-weight: 400;
          color: #464668;
        }
      }
      .progress {
        width: 100%;
        margin-top: 12px;
      }
    }
  }
  .chart {
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-top: 21px;
    padding: 25px;
    justify-content: space-between;
    align-items: center;
    &-line {
      width: 1px;
      height: 222px;
      background: #e8e8e8;
      margin-right: 62px;
    }
    .top {
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      width: 50%;
    }
    .mt48 {
      margin-top: 48px;
    }
    .crew {
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
    }
    .job {
      flex: 1;
    }
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: #464668;
    }
    .width {
      width: 100%;
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
