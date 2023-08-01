<template>
  <div ref="echartDom" class="echartDom" />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'disasterCharts',
  props: {
    diseaseName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {
        backgroundColor: '#fff',
        toolbox: {
          show: true,
          left: 'right',
          right: 20,
          top: 'bottom',
          bottom: 20
        },
        color: [],
        legend: {
          show: false,
          data: [],
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          // inactiveColor: "#fff",
          icon: 'circle',
          type: 'scroll',
          orient: 'vertical',
          left: 'right',
          right: 20,
          top: 20,
          bottom: 80,
          // itemWidth: 12,
          // itemHeight: 12,
          pageIconColor: '#00f6ff',
          pageIconInactiveColor: '#fff',
          pageIconSize: 12,
          pageTextStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        selectedMode: 'false',
        bottom: 20,
        left: 0,
        right: 0,
        top: 0,
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '知识图谱',
            type: 'graph',
            hoverAnimation: true,
            layout: 'force',
            force: {
              repulsion: 300,
              edgeLength: 100
            },
            nodeScaleRatio: 0.6,
            draggable: true,
            roam: true,
            symbol: 'circle',
            data: [],
            links: [],
            categories: [],
            focusNodeAdjacency: true,
            scaleLimit: {
              // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
              min: 0.5, // 最小的缩放值
              max: 9 // 最大的缩放值
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 8],
            label: {
              normal: {
                show: true,
                position: 'right',
                color: '#000',
                distance: 5,
                fontSize: 14
              }
            },
            lineStyle: {
              normal: {
                width: 1.5,
                curveness: 0,
                type: 'solid'
              }
            }
          }
        ]
      },
      colors: [
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        },
        {
          c1: '#DED8FF',
          c2: '#DED8FF'
        }
      ],
      chart: {}
    };
  },
  watch: {
    diseaseName: {
      handler(newName) {
        if (newName) {
          this.getData(newName);
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.option.color = this.colors.map(item => item.c2);
  },
  methods: {
    // 计算list
    handle2(arr, idx, color, category) {
      arr.forEach((item, index) => {
        if (item.name === null) {
          return false;
        }
        // 设置节点大小
        let symbolSize = 10;
        switch (idx) {
          case 0:
            symbolSize = 100;
            break;
          case 1:
            symbolSize = 70;
            break;
          default:
            symbolSize = 30;
            break;
        }

        // 每个节点所对应的文本标签的样式。
        let label = null;
        switch (idx) {
          case 0:
          case 1:
            label = {
              position: 'inside',
              rotate: 0
            };
            break;
          default:
            break;
        }
        // 计算出颜色,从第二级开始
        if (idx === 0) {
          color = {
            c1: '#CDEAFF',
            c2: '#CDEAFF'
          };
        }
        if (idx === 1) {
          color = this.colors.find((itemm, eq) => eq === index % 10);
          this.option.legend.data.push(item.name);
        }
        // 设置线条颜色
        const lineStyle = {
          color: color.c2
        };
        // 设置节点样式
        let bgcolor = null;
        if (idx === 0) {
          bgcolor = {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: color.c1 // 0% 处的颜色
              }
              // {
              //   offset: 0.,
              //   color: color.c1 // 80% 处的颜色
              // },
              // {
              //   offset: 1,
              //   color: "rgba(0, 0, 0, 0.3)" // 100% 处的颜色
              // }
            ],
            global: false
          };
        } else {
          bgcolor = {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: color.c1 // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: color.c1 // 0% 处的颜色
              },
              {
                offset: 1,
                color: color.c2 // 100% 处的颜色
              }
            ],
            global: false
          };
        }
        let itemStyle = null;
        if (item.list && item.list.length !== 0) {
          // 非子节点
          itemStyle = {
            borderColor: color.c2,
            color: bgcolor
          };
        } else {
          // 子节点
          item.isEnd = true;
          if (item.isdisease === 'true') {
            itemStyle = {
              color: color.c2,
              borderColor: color.c2
            };
          } else {
            itemStyle = {
              color: 'transparent',
              borderColor: color.c2
            };
          }
        }
        // 可以改变来实现节点发光效果，但体验不好
        itemStyle = Object.assign(itemStyle, {
          shadowColor: 'rgba(204, 204, 204, 0.5)',
          shadowBlur: 8
        });

        if (idx === 1) {
          category = item.name;
        }
        let obj = {
          name: item.name,
          symbolSize: symbolSize,
          category: category,
          label,
          color: bgcolor,
          itemStyle,
          lineStyle
        };
        obj = Object.assign(item, obj);
        if (idx === 0) {
          obj = Object.assign(obj, {
            root: true
          });
        }
        if (item.list && item.list.length === 0) {
          obj = Object.assign(obj, {
            isEnd: true
          });
        }
        this.option.series[0].data.push(obj);
        if (item.list && item.list.length > 0) {
          this.handle2(item.list, idx + 1, color, category);
        }
      });
    },
    // 计算links

    handle3(arr, index, color) {
      //   this.option.series[0].links = []
      arr.forEach(item => {
        if (item.list) {
          item.list.forEach((item2, eq) => {
            if (index === 0) {
              color = this.colors.find((itemm, eq2) => eq2 === eq % 10);
            }
            let lineStyle = null;
            switch (index) {
              case 0:
                if (item2.list.length > 0) {
                  lineStyle = {
                    normal: {
                      color: 'target'
                    }
                  };
                } else {
                  lineStyle = {
                    normal: {
                      color: color.c2
                    }
                  };
                }
                break;
              default:
                lineStyle = {
                  normal: {
                    color: 'source'
                  }
                };
                break;
            }
            const obj = {
              source: item.name,
              target: item2.name,
              lineStyle
            };
            this.option.series[0].links.push(obj);
            if (item2.list && item.list.length > 0) {
              this.handle3(item.list, index + 1);
            }
          });
        }
      });
    },
    initChart() {
      const echartDom = this.$refs.echartDom;
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!echarts) {
        console.warn('echart 未挂载在vue下');
        return;
      }

      const reInt = this.$isNotEmpty(this.chart);
      if (reInt) {
        this.chart.clear();
      } else {
        this.chart = echarts.init(echartDom);
      }

      this.chart.setOption(this.option, true);
    },
    setChart(data) {
      this.option.series[0].categories = []; // 清空data 重新渲染
      this.option.series[0].data = []; // 清空data 重新渲染
      this.option.series[0].links = []; // 清空data 重新渲染
      this.option.series[0].categories = data[0].list.map(item => {
        return {
          name: item.name
        };
      });
      this.handle2(JSON.parse(JSON.stringify(data)), 0);
      this.handle3(JSON.parse(JSON.stringify(data)), 0);
      this.initChart();
    },
    getData(diseaseName) {
      this.$store
        .dispatch('drugManage/diseasesChart', diseaseName)
        .then(res => {
          const data = [];
          data.push(res.data);
          this.setChart(data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.echartDom {
  width: 100%;
  min-width: 769px;
  height: 714px;
}
</style>
