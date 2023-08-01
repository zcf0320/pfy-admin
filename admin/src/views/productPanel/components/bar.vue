<template>
  <div id="ProcessBar" class="pB_Container">
    <div
      v-if="processValue[0] !== '0' && processValue[0] !== 'NaN'"
      class="first"
      :style="{ width: processValue[0] + '%' }"
    >
      <div class="text">
        {{ getProcessDesc(processValue[0]) }}
      </div>
    </div>
    <div
      v-if="processValue[1] !== '0' && processValue[1] !== 'NaN'"
      class="second"
      :style="{ width: processValue[1] + '%' }"
    >
      <div class="text">
        {{ getProcessDesc(processValue[1]) }}
      </div>
    </div>
    <div
      v-if="processValue[2] !== '0' && processValue[2] !== 'NaN'"
      class="third"
      :style="{ width: processValue[2] + '%' }"
    >
      <div class="text">
        {{ getProcessDesc(processValue[2]) }}
      </div>
    </div>
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
  width: 100%;
  background-color: #f5f5f5;
  height: 20px;
  display: inline-flex;
  line-height: 20px;
  text-align: right;
  margin-top: 46px;
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
.third {
  background-color: #d2d5e8;
  padding-right: 10px;
  color: #d2d5e8;
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
