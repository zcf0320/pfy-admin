<template>
  <div class="zh-table zh-layput-pad">
    <div class="zh-table-title flex">
      <div class="yt-card-name">
        服务项
      </div>
      <div class="zh-table-legend flex">
        <div class="mr32">
          服务项使用人数：
          <span class="yellow">{{ userCount }}</span>
        </div>
        <div>
          服务项使用次数：
          <span class="green">{{ useCount }}</span>
        </div>
      </div>
    </div>
    <div class="zh-scroll">
      <tr class="zh-scroll-header flex">
        <td>服务项名称</td>
        <td>使用人数</td>
        <td>使用次数</td>
      </tr>
      <div class="zh-scroll-body" :style="view">
        <div class="scroll-content" :style="{ top }">
          <tr
            v-for="item in data.serviceInfoStatistics"
            :key="item.serviceInfoName"
          >
            <td class="name">{{ item.serviceInfoName }}</td>
            <td class="stand">{{ item.userCount }}</td>
            <td class="mafc">{{ item.useCount }}</td>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zhTable',
  props: {
    viewHeight: {
      // 可视窗口
      type: [Number, String],
      default: '600px'
    },
    moveDistance: {
      // 移动距离
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      activeIndex: 0,
      view: '',
      timer: null,
      useCount: 0,
      userCount: 0
    };
  },
  computed: {
    top() {
      return -this.activeIndex * this.moveDistance + 'px'; // 定义移动的单元高度
    },
    data() {
      return this.$store.getters.zhPanelData;
    }
  },
  watch: {
    'data.serviceInfoStatistics': {
      handler(n) {
        // if (n && n.length > 5 && !this.timer) {
        //   this.timer = setInterval(_ => {
        //     // 自定义滚动 出勤率
        //     if (this.activeIndex < n.length /* this.towerListArr.length */) {
        //       this.activeIndex += 1;
        //     } else {
        //       this.activeIndex = 0;
        //     }
        //   }, 1500);
        // }
        if (n && n.length) {
          n.forEach(item => {
            this.useCount += item.useCount;
            this.userCount += item.userCount;
          });
        }
      },
      deep: true
    }
  },
  mounted() {
    this.view = { height: this.viewHeight };
    // if (
    //   this.data.serviceInfoStatistics &&
    //   this.data.serviceInfoStatistics.length > 5
    // ) {
    //   this.timer = setInterval(_ => {
    //     if (
    //       this.activeIndex <
    //       this.data.serviceInfoStatistics.length /* this.towerListArr.length */
    //     ) {
    //       this.activeIndex += 1;
    //     } else {
    //       this.activeIndex = 0;
    //     }
    //   }, 1500);
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.zh-table {
  width: 1449px;
  height: 734px;
  &-title {
    justify-content: space-between;
    align-items: center;
  }
  &-legend {
    font-size: 24px;

    font-weight: bold;
    color: #ffffff;
    justify-content: flex-start;
    align-items: center;
    .yellow {
      color: #ffb900;
    }
    .green {
      color: #00fb87;
    }
    .mr32 {
      margin-right: 32px;
    }
  }
  .zh-scroll {
    width: 1353px;
    font-weight: bold;
    color: #b4afff;
    .scroll-content {
      //自定义滚动 间隔时间和方向
      position: relative;
      transition: top 0.825s; //向上移动
    }
    &-body {
      width: 100%;
      height: 120px;
      overflow: hidden;
      color: #8e8bbd;
      font-weight: normal;
      tr {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        padding: 0 208px 0 60px;
        td {
          line-height: 36px;
        }
      }
      tr:nth-child(2n) {
        background: none;
      }
      tr:nth-child(2n + 1) {
        background: rgba(51, 59, 100, 0.5);
      }
    }
    &-header {
      height: 46px;
      background: #333b64;
      line-height: 46px;
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;
      padding: 0 208px 0 60px;
    }
    .overflow {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .stand {
      margin: 0 32px;
      width: 499px;
    }
    .name {
      width: 526px;
    }
    .mafc {
      width: 100px;
    }
  }
}
</style>
