<template>
  <div class="drugMonitorDetail">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :current-key="String(activeName)"
            @change="btnChange"
          />
          <div class="scroll-table">
            <div class="title-top content-detail">
              药品通用名：{{ medicineName || '-' }}
              <el-popover
                v-show="insuranceMedicine.area"
                placement="top-start"
                width="118"
                trigger="hover"
              >
                <span slot="reference" class="isInsurance link-skip"
                  >（该药品已纳入医保目录）</span
                >
                <span
                  class="isInsurance link-skip"
                  @click="
                    toInsuranceMedicine(
                      insuranceMedicine.area,
                      insuranceMedicine.year,
                      medicineName,
                    )
                  "
                  >{{ insuranceMedicine.area || '-' }}医保</span
                >
              </el-popover>
            </div>
            <div class="main-content">
              <div class="main-content-left">
                <el-scrollbar :native="false" tag="div" :noresize="false">
                  <ul v-if="specificationData.length">
                    <li
                      v-for="(item, index) in specificationData"
                      :key="index"
                      :class="item.checked ? 'active' : ''"
                      @click="specificationChange(index, item.name)"
                    >
                      <span>{{ item.name }}</span>
                    </li>
                  </ul>
                  <ul v-else>
                    <li>暂无规格</li>
                  </ul>
                </el-scrollbar>
              </div>
              <div class="main-content-right">
                <el-date-picker
                  v-model="year"
                  type="year"
                  placeholder="选择年"
                  value-format="yyyy"
                  class="dateSelect"
                  :picker-options="pickerOptions"
                  @change="yearChange"
                />
                <div
                  ref="drugPriceEle"
                  :class="hasData ? 'drugPrice' : 'drugPrice empty'"
                />
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapActions } from 'vuex';
export default {
  name: 'DrugMonitorDetail',
  data() {
    return {
      btns: [],
      activeName: '0',
      priceData: [], // 价格趋势
      specificationData: [],
      year: '',
      platform: '',
      medicineName: '',
      medicineSpec: '',
      hospitalName: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      hasData: false,
      insuranceMedicine: {}, // 医保数据
      myChart: null
    };
  },
  created() {
    const {
      year,
      platform,
      medicineName,
      medicineSpec,
      hospitalName
    } = JSON.parse(localStorage.getItem('drugMonitor') || '{}');
    this.year = year || String(new Date().getFullYear());
    this.platform = platform || '全网';
    this.medicineName = medicineName || '';
    this.medicineSpec = medicineSpec || '';
    this.hospitalName = hospitalName || '';
    // 获取药品规格
    this.getDrugFormat(medicineName).then(res => {
      const arr = res.data.map(item => {
        return {
          name: item,
          checked: false
        };
      });
      if (this.medicineSpec) {
        const bol = arr.some(item => {
          if (item.name === this.medicineSpec) {
            item.checked = true;
            return true;
          } else {
            return false;
          }
        });
        if (!bol) {
          arr[0].checked = true;
          this.medicineSpec = arr[0].name;
        }
      } else {
        this.medicineSpec = arr[0].name;
        arr[0].checked = true;
      }
      this.specificationData = arr;
      this.$nextTick(() => {
        this.getPriceData();
      });
    });
    // 获取平台
    this.getMerchantList().then(res => {
      this.btns = res.data.map((item, index) => {
        return {
          value: index,
          name: item.name
        };
      });
      if (this.platform) {
        this.btns.forEach(item => {
          if (this.platform === item.name) {
            this.activeName = item.value;
          }
        });
      }
    });
  },
  mounted() {
    const drugPriceEle = this.$refs.drugPriceEle;
    // drugPriceEle.style.width = drugPriceEle.parentNode.clientWidth + "px";
    drugPriceEle.style.height = '400px';
    this.myChart = echarts.init(drugPriceEle);

    window.onresize = () => {
      this.myChart.resize();
    };
  },
  methods: {
    ...mapActions('drugManage', [
      'getDrugFormat',
      'getMerchantList',
      'drugMonitorDetail'
    ]),
    // 跳转医保
    toInsuranceMedicine(area, year, name) {
      const routeData = this.$router.resolve({
        path: '/dataDictionary/insuranceDrug/detail',
        query: {
          medicineName: name,
          year: year,
          area: area
        }
      });
      window.open(routeData.href, '_blank');
    },
    // 获取趋势数据
    getPriceData() {
      const params = {
        year: this.year,
        platform: this.platform,
        medicineName: this.medicineName,
        medicineSpec: this.medicineSpec,
        hospitalName: this.hospitalName
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.drugMonitorDetail(params).then(res => {
        this.priceData = res.data.medicinePriceTrendVOs;
        this.insuranceMedicine = res.data.insuranceMedicine || {};
        this.draw(); // 重新绘制
      });
    },
    draw() {
      // 处理价格数据
      const heightPrice = []; // 高
      const lowPrice = []; // 低
      const averagePrice = []; // 平均
      const dayX = []; // x轴天数
      this.priceData.forEach(item => {
        dayX.push(item.time);
        if (item.maxPrice) {
          heightPrice.push(item.maxPrice);
        } else {
          heightPrice.push(null);
        }
        if (item.minPrice) {
          lowPrice.push(item.minPrice);
        } else {
          lowPrice.push(null);
        }
        if (item.averagePrice) {
          averagePrice.push(item.averagePrice);
        } else {
          averagePrice.push(null);
        }
      });
      // 判断y轴是否有数据
      if (
        this.getNullNum(heightPrice) === 12 &&
        this.getNullNum(lowPrice) === 12 &&
        this.getNullNum(averagePrice) === 12
      ) {
        this.hasData = false;
      } else {
        this.hasData = true;
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高价', '平均价', '最低价']
        },
        color: ['#F54E60', '#3599FE', '#795BFE'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, // 刻度开始
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#989AB3'
            }
            // interval:0,
            // rotate:40  //旋转
          },
          axisTick: { show: false },
          data: []
        },
        yAxis: {
          type: 'value',
          // interval: 30, // 步长
          // min: 30,
          // max: 150,
          axisTick: { show: false },
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            formatter: '{value}元',
            textStyle: {
              color: '#989AB3'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#989AB3'
            }
          }
        },
        series: [
          {
            name: '最高价',
            type: 'line',
            areaStyle: {
              normal: {
                color: '#FFDCDF' // 改变区域颜色
              }
            },
            data: []
          },
          {
            name: '平均价',
            type: 'line',
            areaStyle: {
              normal: {
                color: '#E1DAFF' // 改变区域颜色
              }
            },
            data: []
          },
          {
            name: '最低价',
            type: 'line',
            areaStyle: {
              normal: {
                color: '#EBF5FF' // 改变区域颜色
              }
            },
            data: []
          }
        ]
      };
      option.xAxis.data = dayX;
      option.series[0].data = heightPrice;
      option.series[1].data = averagePrice;
      option.series[2].data = lowPrice;
      this.myChart.setOption(option);
    },
    // 获取数组中null个数
    getNullNum(arr) {
      let num = 0;
      arr.forEach(item => {
        if (item === null) {
          num++;
        }
      });
      return num;
    },
    specificationChange(index, name) {
      this.specificationData.forEach(item => {
        this.$set(item, 'checked', false);
      });
      this.$set(this.specificationData[index], 'checked', true);
      this.medicineSpec = name;
      this.getPriceData();
    },
    btnChange(val) {
      this.platform = this.btns[val].name;
      this.activeName = val;
      this.getPriceData();
    },
    yearChange(val) {
      this.year = val;
      this.getPriceData();
    }
  }
};
</script>

<style lang="scss" scoped>
.drugMonitorDetail {
  .isInsurance {
    font-size: 14px;
    color: #464668;
    line-height: 18px;
    margin-left: 8px;

    vertical-align: middle;
  }
  .main-content {
    display: flex;
    .main-content-left {
      width: 197px;
      max-height: 400px;
      .el-scrollbar {
        height: 400px;
      }
      ul,
      li {
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        li {
          height: 44px;
          font-size: 16px;

          font-weight: 400;
          color: #989ab3;
          line-height: 44px;
          text-align: center;
          border: 1px solid #ebedf2;
          border-bottom: none;
          cursor: pointer;
          span {
            line-height: 44px;
            vertical-align: middle;
            display: inline-block;
            max-width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &:last-of-type {
            border-bottom: 1px solid #ebedf2;
          }
          &.active,
          &:hover {
            background: #f1f8ff;
            border-radius: 4px 4px 0px 0px;
            color: #3599fe;
          }
          &.active::after {
            content: ' > ';
            display: inline-block;
            vertical-align: middle;
            line-height: 44px;
            margin-left: 5px;
          }
        }
      }
    }
    .main-content-right {
      flex: 1;
      position: relative;
      .drugPrice {
        height: 400px;
        &.empty::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          background: url('../../../../assets/empty-img.png') no-repeat center
            center;
          background-size: 293px 184px;
        }
      }
      .dateSelect {
        position: absolute;
        top: -10px;
        right: 0;
        width: 130px;
        z-index: 2;
      }
    }
  }
}
</style>
