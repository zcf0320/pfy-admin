<template>
  <div id="ProcessBar" class="pB_Container">
    <div
      v-if="processValue[0] !== '0' && processValue[0] !== 'NaN'"
      class="first"
      :style="{ width: processValue[0] + '%' }"
    />
    <div
      v-if="processValue[1] !== '0' && processValue[1] !== 'NaN'"
      class="second"
      :style="{ width: processValue[1] + '%' }"
    />
    <div
      v-if="processValue[2] !== '0' && processValue[2] !== 'NaN'"
      class="third"
      :style="{ width: processValue[2] + '%' }"
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
    }
  }
};
</script>
<style lang="scss" scoped>
.pB_Container {
  width: 758px;
  height: 40px;
  background: #293053;
  display: inline-flex;
  line-height: 40px;
  margin-bottom: 20px;
}
.pB_Container div {
  float: left;
}
.first {
  background-color: #4bdde3;
  padding-right: 10px;
  position: relative;
}
.second {
  background-color: #a3a0d5;
  padding-right: 10px;
  position: relative;
}
.third {
  background-color: #f692bb;
  padding-right: 10px;
  position: relative;
}
.text {
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  left: 0;
  top: -27px;
}
</style>
