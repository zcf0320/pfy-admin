<template>
  <el-container>
    <div class="dashboard-page">
      <el-scrollbar style="height: 100%; overflow-x: hidden">
        <div class="dashboard-data">
          <div class="general-data">
            <div class="data-item">
              <div class="flex">
                <div class="data-details">
                  <div class="data-text">供应商总量</div>
                  <div class="data-acount" @click="lookPage(1)">
                    {{ poviderTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="data-item">
              <div class="flex">
                <div class="data-details">
                  <div class="data-text">服务项总量</div>
                  <div class="data-acount" @click="lookPage(2)">
                    {{ serviceTotal }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="echarts-item">
            <Echarts
              :id="`providerType`"
              :options="providerOptions"
              :height="`317`"
            />
          </div>
          <div class="echarts-item">
            <Echarts
              :id="`providerMap`"
              :options="eChartsMapOptions"
              :height="`317`"
            />
          </div>
        </div>
        <div class="provider-data">
          <div class="date-pick">
            <el-date-picker
              v-model="providerDate"
              type="year"
              placeholder="选择年"
              @change="providerDateChange"
            />
          </div>
          <div class="echarts">
            <Echarts
              :id="`providerList`"
              :width="`100%`"
              :options="providerListOptions"
              :height="`400`"
            />
          </div>
        </div>
        <div class="dashboard-data">
          <div class="echarts-item">
            <Echarts
              :id="`serviceStatus`"
              :options="serviceStatusOptions"
              :height="`369`"
            />
          </div>
          <div class="echarts-item">
            <Echarts
              :id="`EchartsSunburst`"
              :options="serviceTypeOptions"
              :height="`369`"
            />
          </div>
        </div>
        <div class="provider-data">
          <div class="date-pick">
            <el-date-picker
              v-model="providerDate"
              type="year"
              placeholder="选择年"
              :picker-options="pickerOptions"
              :clearable="false"
              @change="serviceDateChange"
            />
          </div>
          <div class="echarts">
            <Echarts
              :id="`serviceStatusData`"
              :width="`100%`"
              :options="serviceStatusDataOptions"
              :height="`400`"
            />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex';
import {
  providerOptions,
  providerListOptions,
  serviceStatusOptions,
  serviceTypeOptions,
  serviceStatusDataOptions,
  eChartsMapOptions
} from './config';
import { postStatusObj, postTypeColor } from '@/utils/enum';
import moment from 'moment';
import { toThousands } from '@/utils/common';
export default {
  name: 'SupplyChainDashboard',

  data() {
    return {
      providerOptions,
      providerListOptions,
      serviceStatusOptions,
      serviceTypeOptions,
      serviceStatusDataOptions,
      eChartsMapOptions,
      poviderTotal: 0,
      providerDate: new Date(),
      prepointServices: [],
      postStatusObj,
      serviceTotal: 0,
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() - 8.64e7 ||
            moment(time).format('YYYY') < 2020
          );
        }
      }
    };
  },
  created() {
    const year = moment().format('YYYY');
    const month = moment().format('MM');
    this.getProviderType({
      year,
      month
    }).then(res => {
      const { data } = res;
      data.list.forEach(item => {
        item.name = item.providerTypeName;
        item.value = item.providerCount;
      });

      this.providerOptions.series[0].data =
        JSON.parse(JSON.stringify(data.list)) || [];
      this.poviderTotal = toThousands(data.total || 0);
    });
    this.getProviderList(year);

    this.getServiceStatus({
      year,
      month
    }).then(res => {
      const { data } = res;
      this.serviceStatusOptions.series[0].data = [];
      data.list.forEach(item => {
        this.serviceStatusOptions.series[0].data.push({
          name: postStatusObj[item.postType],
          value: item.serviceInfosAllCount
        });
      });
      this.serviceTotal = toThousands(data.total || 0);
    });

    this.getServiceStatusList(year);

    this.findServiceUseCount().then(res => {
      const colors = ['#00D1C7', '#FF8100', '#3599FE'];
      res.data.forEach((item, index) => {
        item.itemStyle = {
          color: colors[index]
        };
        item.value = item.useCount;
        // 在线服务不展示子级
        if (item.id === 57) {
          item.children = [];
        }
        if (item.children.length) {
          item.children.forEach(child => {
            child.value = child.useCount;
            child.itemStyle = {
              color: colors[index],
              opacity: Math.random() + 0.5
            };
          });
        }
      });

      this.serviceTypeOptions.series[0].data = JSON.parse(
        JSON.stringify(res.data),
      );
    });

    this.getProviderAreaData().then(res => {
      this.eChartsMapOptions.series[0].data.forEach(item => {
        if (res.data[item.name]) {
          item.value = res.data[item.name];
        }
      });
    });
  },
  methods: {
    ...mapActions('serviceItems', [
      'getProviderType',
      'getProviderData',
      'getServiceStatus',
      'getServiceStatusData',
      'findServiceUseCount',
      'getProviderAreaData'
    ]),
    ...mapActions('app', ['getSysConfig']),
    // 供应商时间改变
    providerDateChange(year) {
      this.getProviderList(moment(year).format('YYYY'));
    },
    // 获取供应商数据
    getProviderList(year) {
      this.getProviderData({
        year
      }).then(res => {
        const { data } = res;
        this.providerListOptions.series[0].data = data || [];
      });
    },
    // 服务项趋势时间改变
    serviceDateChange(year) {
      this.getServiceStatusList(moment(year).format('YYYY'));
    },
    // 获取服务项状态趋势
    getServiceStatusList(year) {
      this.getServiceStatusData({
        year
      }).then(res => {
        const { data } = res;
        this.serviceStatusDataOptions.series = [];
        // data[0].data.map((mouth, index) => {
        //     this.serviceStatusDataOptions.xAxis[0].data.push(
        //         `2021-${index + 1}`
        //     )
        // })
        data.forEach(item => {
          this.serviceStatusDataOptions.series.push({
            data: item.data || [],
            name: postStatusObj[item.post_type],
            type: 'line',
            areaStyle: {},
            color: postTypeColor[item.post_type]
          });
        });
      });
    },
    lookPage(type) {
      let routeData;
      if (type === 1) {
        routeData = this.$router.resolve({
          path: '/supplyChainManage/supplier'
        });
      } else {
        routeData = this.$router.resolve({
          path: '/supplyChainManage/serviceItems'
        });
      }
      window.open(routeData.href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-page {
  width: 100%;
  min-height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  .dashboard-data {
    width: 100%;
    justify-content: space-between;
    display: flex;
    .general-data {
      width: 256px;
      height: 341px;
      margin-right: 24px;
      .data-item {
        background-color: #ffffff;
        width: 100%;
        height: 158px;
        padding: 24px;
        margin-bottom: 25px;
        .data-details {
          .data-acount {
            font-size: 42px;

            font-weight: 400;
            color: #464668;
            line-height: 42px;
            cursor: pointer;
            &:hover {
              color: #3599fe;
            }
          }
          .data-text {
            font-size: 16px;

            font-weight: 400;
            color: #464668;
            line-height: 22px;
            margin-bottom: 20px;
          }
        }
        &:nth-child(1) {
          background-image: url('../../../assets/data-center/data-dashboard-1.png');
          background-size: 100% 100%;
        }
        &:nth-child(2) {
          background-image: url('../../../assets/data-center/data-dashboard-2.png');
          background-size: 100% 100%;
        }
      }
    }
    .echarts-item {
      flex: 1;
      margin-right: 24px;
      padding: 12px;
      background-color: #ffffff;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .provider-data {
    width: 100%;
    height: 484px;
    background-color: #ffffff;
    margin: 24px 0;
    padding: 24px;
    .date-pick {
      float: right;
      height: 36px;
      z-index: 999;
    }
    .echarts {
      margin-top: 36px;
    }
  }
}
</style>
