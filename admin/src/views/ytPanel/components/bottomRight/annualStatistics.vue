<template>
  <div class="annual-statistics">
    <div class="yt-card-name">年度保单统计</div>
    <div ref="echartDom" class="echartDom" />
    <div class="annual-statistics-box">
      <div class="annual-statistics-contianer flex">
        <span>保单</span>
        <div
          v-for="item in list"
          :key="item.label"
          class="annual-statistics-legend flex"
        >
          <div :class="['annual-statistics-legend-icon', item.color]" />
          {{ item.label }}
        </div>
      </div>
      <div class="annual-statistics-contianer flex fee">
        <span>保费</span>
        <div
          v-for="item in list"
          :key="item.label"
          class="annual-statistics-legend flex"
        >
          <div
            :class="['annual-statistics-legend-dot', `icon-${item.color}`]"
          />
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from './config';
export default {
  name: 'ytBar',
  data() {
    return {
      chart: {},
      list: [
        { label: '亚太高血压', color: 'green' },
        { label: '亚太糖尿病', color: 'yellow' },
        { label: '亚太冠心病', color: 'blue' }
      ],
      aa: [
        {
          month: 1,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 2,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 3,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 4,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 5,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 6,
          salesAndIncomeProductVOList: [
            {
              premiumIncomeThisMonth: 1,
              productId: 'dhsh1',
              productName: '测试购药优化T1',
              totalSalesThisMonth: 13
            },
            {
              premiumIncomeThisMonth: 2,
              productId: 'dhsh2',
              productName: '测试购药优化T2',
              totalSalesThisMonth: 14
            },
            {
              premiumIncomeThisMonth: 3,
              productId: 'dhsh3',
              productName: '测试购药优化T3',
              totalSalesThisMonth: 15
            }
          ]
        },
        {
          month: 7,
          salesAndIncomeProductVOList: []
        },
        {
          month: 8,
          salesAndIncomeProductVOList: []
        },
        {
          month: 9,
          salesAndIncomeProductVOList: []
        },
        {
          month: 10,
          salesAndIncomeProductVOList: []
        },
        {
          month: 11,
          salesAndIncomeProductVOList: []
        },
        {
          month: 12,
          salesAndIncomeProductVOList: []
        }
      ],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: []
    };
  },
  computed: {
    salesAndIncomeVOList() {
      return this.$store.getters.ytPanelData.salesAndIncomeVOList;
    },
    productSaleVOList() {
      let data = this.$store.getters.ytPanelData.productSaleVOList
        ? JSON.parse(
            JSON.stringify(this.$store.getters.ytPanelData.productSaleVOList)
          )
        : [];
      if (data && data.length > 3) {
        data = data.splice(0, 3);
      }
      return data;
    }
  },
  watch: {
    list: {
      handler(n) {
        if (n && n.length) {
          option.series[0].data = this.data1;
          option.series[1].data = this.data2;
          option.series[2].data = this.data3;
          option.series[3].data = this.data4;
          option.series[4].data = this.data5;
          option.series[5].data = this.data6;
          option.series[0].name = this.list[0].label;
          option.series[1].name = this.list[1].label;
          option.series[2].name = this.list[2].label;
          option.series[3].name = this.list[0].label;
          option.series[4].name = this.list[1].label;
          option.series[5].name = this.list[2].label;
          this.$nextTick(() => {
            this.chart.setOption(option);
          });
        }
      },
      deep: true,
      immediate: true
    },
    productSaleVOList: {
      handler(n) {
        if (n && n.length) {
          this.productSaleVOList.forEach((item, index) => {
            this.list[index].label = item.productName;
          });
          this.data1 = [];
          this.data2 = [];
          this.data3 = [];
          this.data4 = [];
          this.data5 = [];
          this.data6 = [];
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 0) {
                    this.data1.push(items.premiumIncomeThisMonth);
                  }
                });
              } else {
                this.data1.push(0);
              }
            });
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 1) {
                    this.data2.push(items.premiumIncomeThisMonth);
                  }
                });
              } else {
                this.data2.push(0);
              }
            });
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 2) {
                    this.data3.push(items.premiumIncomeThisMonth);
                  }
                });
              } else {
                this.data3.push(0);
              }
            });
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 0) {
                    this.data4.push(items.totalSalesThisMonth);
                  }
                });
              } else {
                this.data4.push(0);
              }
            });
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 1) {
                    this.data5.push(items.totalSalesThisMonth);
                  }
                });
              } else {
                this.data5.push(0);
              }
            });
          this.salesAndIncomeVOList &&
            this.salesAndIncomeVOList.forEach(item => {
              if (item.salesAndIncomeProductVOList.length) {
                item.salesAndIncomeProductVOList.forEach((items, index) => {
                  if (index === 2) {
                    this.data6.push(items.totalSalesThisMonth);
                  }
                });
              } else {
                this.data6.push(0);
              }
            });
          option.series[0].data = this.data1;
          option.series[1].data = this.data2;
          option.series[2].data = this.data3;
          option.series[3].data = this.data4;
          option.series[4].data = this.data5;
          option.series[5].data = this.data6;
          option.series[0].name = this.list[0].label;
          option.series[1].name = this.list[1].label;
          option.series[2].name = this.list[2].label;
          option.series[3].name = this.list[0].label;
          option.series[4].name = this.list[1].label;
          option.series[5].name = this.list[2].label;
          this.$nextTick(() => {
            this.chart.setOption(option);
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const echartDom = this.$refs.echartDom;
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);
      option.series[0].data = this.data1;
      option.series[1].data = this.data2;
      option.series[2].data = this.data3;
      option.series[3].data = this.data4;
      option.series[4].data = this.data5;
      option.series[5].data = this.data6;
      option.series[0].name = this.list[0].label;
      option.series[1].name = this.list[1].label;
      option.series[2].name = this.list[2].label;
      option.series[3].name = this.list[0].label;
      option.series[4].name = this.list[1].label;
      option.series[5].name = this.list[2].label;
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.annual-statistics {
  margin-left: 51px;
  position: relative;
  .echartDom {
    width: 1150px;
    height: 380px;
    margin-left: -100px;
  }
  &-box {
    font-size: 16px;
    font-weight: bold;
    color: #8e8bbd;
    position: absolute;
    top: -2px;
    right: 120px;
  }
  .annual-statistics-legend {
    color: #cfccff;
    justify-content: space-between;
    align-items: center;
    margin-right: 24px;
    &-icon {
      width: 12px;
      height: 12px;
      margin-right: 8px;
    }
    .green {
      background: #1abb5b;
    }
    .blue {
      background: #3f5fff;
    }
    .yellow {
      background: #ffbd1b;
    }
    &-dot {
      width: 20px;
      height: 9px;
      margin-right: 5px;
    }
  }
  &-contianer {
    justify-content: flex-start;
    align-items: center;
    span {
      margin-right: 18px;
    }
    margin-bottom: 16px;
  }
  .icon-green {
    background: url('../../images/icon-green.png');
    background-size: 100% 100%;
  }
  .icon-yellow {
    background: url('../../images/icon-yellow.png');
    background-size: 100% 100%;
  }
  .icon-blue {
    background: url('../../images/icon-blue.png');
    background-size: 100% 100%;
  }
  .fee {
    span {
      margin-right: 13px;
    }
    .annual-statistics-legend {
      margin-right: 20px;
    }
  }
}
</style>
