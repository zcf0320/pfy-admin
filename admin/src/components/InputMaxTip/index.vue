<template>
  <div class="InputMaxTip">{{ cnt }}/{{ max }}</div>
</template>

<script>
export default {
  name: 'InputMaxTip',
  props: {
    max: {
      type: Number,
      required: true
    },
    currentKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    cnt() {
      if (typeof this.currentKey === 'string') {
        return this.currentKey.length;
      }
      return 0;
    }
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.InputMaxTip {
  position: absolute;
  top: -33px;
  right: 10px;
  color: #a2a3b7;
}
</style>
