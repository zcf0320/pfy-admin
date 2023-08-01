<template>
  <div class="flow-task card">
    <div class="flex header">
      <div class="card-title flex">
        <div class="icon" />
        <span>任务</span>
      </div>
      <div class="time">
        统计时间：{{ $moment().format('YYYY-MM-DD 00:00:00') }}
      </div>
    </div>
    <div class="flex bottom">
      <div ref="echartDom" class="echartDom" />
      <div class="line" />
      <div class="pending">
        <div class="title">待处理任务：</div>
        <div class="list flex">
          <div
            v-for="item in menuList"
            :key="item.value"
            class="item flex"
            @click="$router.push({ name: item.url })"
          >
            <div class="dot" />
            <div class="flex-1">
              {{ item.label }}（{{ item.remindNumber }}）
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartOption from './circle';
import Echart from 'echarts';
export default {
  name: 'flowTask',
  computed: {
    menuList() {
      const menuList = this.$store.getters.menuList;
      const list = [];
      menuList.forEach(item => {
        for (const i in item.children) {
          const children = item.children[i].children;
          for (const j in children) {
            if (children[j].remindNumber) {
              list.push(children[j]);
            }
          }
        }
      });
      return list;
    },
    num() {
      let num = 0;
      this.menuList.forEach(item => {
        num += item.remindNumber;
      });
      return num;
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
      const chart = Echart.init(echartDom);
      echartOption.series[0].data[0].value = this.num;
      echartOption.title.text = `${this.num}`;
      chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.flow-task {
  .header {
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('../images/task.svg');
      background-size: 100% 100%;
    }
    .time {
      font-size: 14px;
      font-weight: 400;
      color: #989ab3;
    }
  }
  .bottom {
    width: 100%;
    justify-content: flex-start;
    .line {
      width: 1px;
      height: 124px;
      background: #ebedf2;
      margin: 37px;
    }
    .echartDom {
      width: 264px;
      min-width: 264px;
      height: 204px;
      margin-left: 32px;
      flex: 0 0 150px;
    }
    .pending {
      .list {
        flex: 1;
        margin-top: 20px;
        font-size: 14px;
        color: #464668;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item {
          justify-content: flex-start;
          align-items: center;
          margin: 0 40px 24px 0;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          &:hover {
            color: #66b2ff;
          }
          .dot {
            width: 6px;
            height: 6px;
            background: #3599fe;
            border-radius: 50%;
            margin-right: 7px;
          }
        }
      }
    }
  }
}
.flex-1 {
  width: 93px;
  flex: 1;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
