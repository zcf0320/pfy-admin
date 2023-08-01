<template>
  <el-select
    v-model="channelName"
    :filterable="filterable"
    :placeholder="placeholder"
    @change="change"
  >
    <el-option
      v-for="item in channelList"
      :key="item.value"
      :label="`${item.label}(${item.value})`"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { default as api } from '@/api/appChannelManange';
export default {
  name: 'SelectChannel',
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
      channelName: this.value,
      channelList: []
    };
  },
   watch: {
      /**
       * 监视v-model值，如果来源有变化需要在这里刷新
       * @param val
       */
      value(val) {
        if (val === this.channelName) {
          return;
        }
        this.channelName = val;
      }
    },
  created() {
    this.getChannelList();
  },

  methods: {
    getChannelList() {
      api.getChannelList().then((res) => {
        this.channelList = res.data;
      });
    },
    change(value) {
        this.$emit('change', value);
    }
  }
};
</script>
