<template>
  <div>
    <div class="date-top">
     <div class="text">日期范围：</div>
      <el-date-picker
        v-model="filterTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        :editable="false"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDate"
      />
    </div>
    <EchartsLine :id="id" :data="chartData" :height="400" />
  </div>
</template>
<script>
export default {
  name: 'CbtiPunchRecord',
  props: {
    id: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      filterTime: []
    };
  },
  methods: {
    changeDate(val) {
        this.$emit('dateChange', val);
    }
  }
};
</script>
<style lang="scss" scoped>
.date-top{
width: 420px;
    display: flex;
    align-items: center;

.text{
    width: 100px;
font-size: 15px;
font-weight: 400;
color: #464668;
}
}
</style>
