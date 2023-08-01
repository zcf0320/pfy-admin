<template>
  <div class="btn-group flex-box" :style="btnStyle">
    <div
      v-for="item in btns"
      :key="item[activeKey]"
      class="btn-item"
      :class="item[activeKey] === activeId ? 'active' : ''"
      @click="toggleActive(item[activeKey])"
    >
      {{ item[activeName] }}
      <div v-if="item.isNew" class="new-label">
        <img :src="newLabel" alt="" />
      </div>
      <div v-if="item.isNumber && item.number" class="number">
        {{ item.number > 99 ? '99+' : item.number }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    activeKey: {
      type: String,
      default: 'value'
    },
    activeName: {
      type: String,
      default: 'name'
    },
    btns: {
      type: Array,
      required: true
    },
    currentKey: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    btnStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      newLabel: require('@/assets/new-label.svg'),
      activeId: null
    };
  },
  computed: {},
  watch: {
    currentKey(val) {
      // 手动设置
      this.activeId = val;
    }
  },
  created() {
    this.activeId = this.currentKey
      ? this.currentKey
      : this.$isNotEmpty(this.btns)
      ? this.btns[0][this.activeKey]
      : '';
  },
  methods: {
    /**
     * 点击按钮 切换激活状态
     */
    toggleActive(activeId) {
      // 如果点击当前选中的按钮 不做任何处理
      if (activeId === this.activeId || this.disable) {
        return;
      }
      this.activeId = activeId;
      this.$emit('change', activeId);
      this.$emit('input', activeId);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  position: relative;
  width: 100%;
  padding-bottom: 21px;
  overflow: auto;
  flex-shrink: 0;
  .btn-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    font-size: 14px;
    min-width: 72px;
    height: 32px;
    padding: 0px 10px;
    border-radius: 4px;

    color: #989ab3;
    flex-shrink: 0;
    position: relative;
    .new-label {
      position: absolute;
      top: 0px;
      right: 0px;
      img {
        width: 10px;
        height: 10px;
      }
    }
    &.active {
      background: #3599fe;
      color: #fff;
      font-weight: bold;
      &:hover {
        color: #fff;
      }
    }
    &:hover {
      color: #3599fe;
    }
    .number {
      position: absolute;
      top: -10px;
      right: -13px;
      background: #f64e60;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      padding: 2px;
      min-width: 20px;
    }
  }
  /* &::after {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    top: 32px;
    height: 20px;
    background: #fff;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  } */
}
</style>
