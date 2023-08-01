<template>
  <div class="zh-distribute zh-layput-pad">
    <div class="yt-card-name">
      保单分布
    </div>
    <div class="zh-distribute-img" />
    <div class="zh-distribute-bar flex">
      <Bar v-bind="processBarModel" />
      <div class="zh-distribute-bar-legend flex">
        <div class="item flex">
          <div class="square male" />
          {{ processBarModel.processValue[0] }}%
        </div>
        <div class="item flex">
          <div class="square unknow" />
          {{ processBarModel.processValue[1] }}%
        </div>
        <div class="item flex">
          <div class="square female" />
          {{ processBarModel.processValue[2] }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from './bar.vue';
export default {
  name: 'distribute',
  components: { Bar },
  data() {
    return {
      processBarModel: {
        processValue: ['0', '0', '0'] // 此处是每个进度的值
      }
    };
  },
  computed: {
    gender() {
      return this.$store.getters.zhPanelData;
    }
  },
  watch: {
    gender: {
      handler(n) {
        if (n.genderStatistics && n.genderStatistics.length) {
          this.processBarModel.processValue = [
            n.genderStatistics[1].num,
            n.genderStatistics[2].num,
            n.genderStatistics[0].num
          ];
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.zh-distribute {
  width: 1063px;
  height: 431px;
  &-img {
    width: 746px;
    height: 123px;
    background: url('../images/gender.svg');
    background-size: 100% 100%;
    margin: 68px auto 32px;
  }
  &-bar {
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    &-legend {
      justify-content: space-between;
      align-items: center;
      width: 250px;
      .item {
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;

        font-weight: bold;
        color: #cfccff;
        .square {
          width: 12px;
          height: 12px;
          margin-right: 9px;
        }
        .male {
          background: #4bdde3;
        }
        .unknow {
          background: #a3a0d5;
        }
        .female {
          background: #f692bb;
        }
      }
    }
  }
}
</style>
