<template>
  <div>
    <div class="line-progress-title flex">
      <span>{{ title }}</span>
      <span class="value">{{ value }}</span>
    </div>
    <div id="ProcessBar" class="pB_Container">
      <!--   封装遍历-->
      <div
        v-for="(item, index) in processArray"
        :key="index"
        :style="{
          width: item.data + '%',
          backgroundColor: item.color,
          paddingLeft: item.data === 0 ? '0px' : 10 + 'px'
        }"
      />
    </div>
    <!-- <div class="pB_Container_bottom">
      <ul>
        <li v-for="(item, index) in processArray" :key="index">
          <span
            style="display: inline-block; width: 10px; height: 10px"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span>{{ item.name }}</span>
          <span class="data">{{ item.data }}</span>
        </li>
        <li></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ProcessBar',
  components: {},
  props: {
    processValue: {
      type: Array,
      default: function() {
        return [0];
      }
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dataSum: 0,
      processArray: []
    };
  },
  created() {
    this.processValue.forEach(item => {
      this.dataSum += item.data;
    });
    this.processArray = this.processValue.map(items => {
      return {
        data:
          items.data !== 0 ? Math.round((items.data / this.dataSum) * 100) : 0,
        color: items.color,
        name: items.name
      };
    });
  }
};
</script>
<style lang="scss" scoped>
.line-progress-title {
  justify-content: space-between;
  align-items: center;
  width: 369px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(142, 139, 189, 0.6);
  .value {
    color: rgba(207, 204, 255, 0.8);
  }
}
.pB_Container {
  width: 369px;
  height: 10px;
  border-radius: 5px;
  display: inline-flex;
  line-height: 10px;
  overflow: hidden;
  //   color: white;
  //   box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.pB_Container div {
  float: left;
  /*border-radius: 8px;*/
}

.pB_Container_bottom ul {
  list-style: none;
  text-align: left;
}
.pB_Container_bottom ul li {
  float: left;
  display: inline-block;
  width: 33%;
}
.data {
  display: inline-block;
  float: right;
  padding-right: 10%;
  color: #ffde00;
  font-weight: 700;
  font-size: 16px;
}
</style>
