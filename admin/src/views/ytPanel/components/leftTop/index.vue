<template>
  <div class="yt-leftTop">
    <div class="yt-card-name">保险产品</div>
    <tr class="yt-leftTop-header flex">
      <td class="stand-name">产品名称</td>
      <td class="stand-head">销量</td>
      <td class="mafc-head">保单保费</td>
      <td class="num-head">理赔案件</td>
    </tr>
    <div class="yt-leftTop-body" :style="view">
      <div class="scroll-content" :style="{ top }">
        <tr v-for="(item, index) in dutyRateData" :key="index">
          <td class="name">{{ item.productName }}</td>
          <td class="stand">{{ item.productSales }}</td>
          <td class="mafc">{{ item.productPremium }}</td>
          <td class="num">{{ item.productClaimRecordNum }}</td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftTop',
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
      return this.$store.getters.ytPanelData.productSaleVOList;
    }
  },
  watch: {
    dutyRateData: {
      handler(n) {
        if (n && n.length > 4 && !this.timer) {
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
    if (this.dutyRateData && this.dutyRateData.length > 4) {
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
.yt-leftTop {
  width: 894px;
  height: 605px;
  background: #1f2544;
  border: 1px solid #5d4dfd;
  padding: 28px 40px;
  overflow: hidden;
  color: #b4afff;
  font-weight: bold;
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
    tr:nth-child(2n + 1) {
      background: none;
    }
    tr:nth-child(2n) {
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
    width: 310px;
    padding-left: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .stand {
    width: 175px;
    padding-left: 79px;
  }
  .mafc {
    width: 155px;
    padding-left: 33px;
  }
  .num {
    width: 200px;
    padding-left: 42px;
  }
  .stand-name {
    width: 310px;
    padding-left: 60px;
  }
  .stand-head {
    padding-left: 133px;
    width: 200px;
  }
  .mafc-head {
    padding-left: 80px;
    width: 248px;
  }
  .num-head {
    padding-left: 25px;
    width: 200px;
  }
}
</style>
