<template>
  <Dialog
    title="审批流程"
    :visible.sync="dialogVisible"
    :height="640"
    :width="360"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible" class="img-box">
      <el-image :src="imgUrl"/>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveForm('formData')">确 定</el-button>
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'approvalProcess',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      imgUrl: require('@/assets/approvalProcess.png'),
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
  methods: {
    saveForm() {
      this.$store
        .dispatch('approval/confirmApproveStream', this.id)
        .then(() => {
          this.dialogVisible = false;
          this.$emit('saved');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-box img {
  width: 302px;
  height: 612px;
}
</style>
