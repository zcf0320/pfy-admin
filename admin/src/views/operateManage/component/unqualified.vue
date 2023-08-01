<template>
  <Dialog
    title="提示"
    :visible.sync="dialogVisible"
    :height="250"
    :width="500"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <div class="mb-14 fc-black fs-14">姓名：{{ data.name }}</div>
      <div class="mb-14 fc-black fs-14">手机号：-</div>
      <div class="fc-red">
        用户没有唯一判断标识，建议用户登录【寰宇关爱】小程序自行操作
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'sendResult',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        this.dialogVisible = val;
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
