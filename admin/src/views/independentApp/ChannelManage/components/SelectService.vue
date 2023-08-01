<template>
  <el-select
    v-model="serviceName"
    :filterable="filterable"
    :placeholder="placeholder"
    @change="change"
  >
    <el-option
      v-for="item in serviceList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { default as api } from '@/api/appChannelManange';
export default {
  name: 'SelectService',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      serviceName: this.value,
      serviceList: []
    };
  },
   watch: {
      /**
       * 监视v-model值，如果来源有变化需要在这里刷新
       * @param val
       */
      value(val) {
        if (val === this.serviceName) {
          return;
        }
        this.serviceName = val;
      }
    },
  created() {
    this.getServiceList();
  },

  methods: {
    getServiceList() {
      api.getServiceList().then((res) => {
        this.serviceList = res.data;
      });
    },
    change(value) {
        this.$emit('change', value);
    }
  }
};
</script>
