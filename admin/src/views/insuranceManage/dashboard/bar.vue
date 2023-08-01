<template>
  <div id="ProcessBar" class="pB_Container">
    <div
      v-if="processValue[0] !== 0 && processValue[0] !== 'NaN'"
      class="first"
      :style="{
        width: getWidth(0),
      }"
    />
    <div
      v-if="processValue[1] !== 0 && processValue[1] !== 'NaN'"
      class="second"
      :style="{ width: getWidth(1) }"
    />
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
    }
  },
  methods: {
    getProcessDesc(data) {
      return data === 0 ? ' ' : data + '%';
    },
    sum(arr) {
      let s = 0;
      arr.forEach(function(val) {
        s += val;
      }, 0);
      return s;
    },
    getWidth(index) {
      const total = this.sum(this.processValue);
      if (index === 0) {
        if (this.processValue[0] !== 0) {
          return (this.processValue[0] / total) * 100 + '%';
        } else {
          return '0%';
        }
      } else {
        if (this.processValue[1] !== 0) {
          return (this.processValue[1] / total) * 100 + '%';
        } else {
          return '0%';
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pB_Container {
  width: 100%;
  background-color: #f5f5f5;
  height: 14px;
  display: inline-flex;
  text-align: right;
}
.pB_Container div {
  float: left;
}
.first {
  background-color: #6395f9;
  padding-right: 10px;
  color: #6395f9;
  position: relative;
}
.second {
  background-color: #6cdfad;
  padding-right: 10px;
  color: #6cdfad;
  position: relative;
}
</style>
