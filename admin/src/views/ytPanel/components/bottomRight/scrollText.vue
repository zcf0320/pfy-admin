<template>
  <div class="yt-scroll">
    <div class="yt-card-name">药品排行</div>
    <tr class="yt-scroll-header flex">
      <td class="index" />
      <td class="name">药品名称</td>
      <td class="stand">规格</td>
      <td class="mafc">厂家</td>
      <td class="num">赔付数量</td>
    </tr>
    <div class="yt-scroll-body" :style="view">
      <div class="scroll-content" :style="{ top }">
        <tr v-for="(item, index) in dutyRateData" :key="index">
          <td
            :class="{
              index: true,
              yellow: index === 0,
              green: index === 1,
              blue: index === 2,
            }"
          >
            {{ index + 1 }}
          </td>
          <td class="name">{{ item.drugName }}</td>
          <td class="stand">{{ item.drugSpecifications }}</td>
          <td class="mafc">{{ item.drugCompany }}</td>
          <td class="num">{{ item.claimsNum }}</td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scrollText',
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
      timer: null
    };
  },
  computed: {
    top() {
      return -this.activeIndex * this.moveDistance + 'px'; // 定义移动的单元高度
    },
    dutyRateData() {
      return this.$store.getters.ytPanelData.drugRankingVOList;
    }
  },
  watch: {
    dutyRateData: {
      handler(n) {
        if (n && n.length > 5 && !this.timer) {
          this.timer = setInterval(() => {
            // 自定义滚动 出勤率
            if (this.activeIndex < n.length /* this.towerListArr.length */) {
              this.activeIndex += 1;
            } else {
              this.activeIndex = 0;
            }
          }, 1500);
        }
      }
    }
  },
  mounted() {
    this.view = { height: this.viewHeight };
    if (this.dutyRateData && this.dutyRateData.length > 5) {
      this.timer = setInterval(() => {
        // 自定义滚动 出勤率
        if (
          this.activeIndex <
          this.dutyRateData.length /* this.towerListArr.length */
        ) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 1500);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.yt-scroll {
  width: 936px;
  font-weight: bold;
  color: #b4afff;
  .scroll-content {
    //自定义滚动 间隔时间和方向
    position: relative;
    transition: top 0.825s; //向上移动
  }
  &-body {
    width: 100%;
    height: 100px;
    overflow: hidden;
    //   position: absolute;
    color: #8e8bbd;
    font-weight: normal;
    tr {
      width: 955px;
      height: 120px;
      display: flex;
      align-items: center;
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
  }
  .overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .index {
    width: 60px;
    text-align: center;
  }
  .name {
    width: 190px;
  }
  .stand {
    width: 178px;
  }
  .mafc {
    width: 288px;
  }
  .num {
    width: 237px;
  }
  .yellow {
    color: #ffbd1c;
  }
  .green {
    color: #1ac85e;
  }
  .blue {
    color: #3f5fff;
  }
}
</style>
