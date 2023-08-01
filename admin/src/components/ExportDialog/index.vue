<template>
  <Dialog
    title="提示"
    :visible.sync="dialogVisible"
    :height="259"
    :width="521"
    @closed="close"
  >
    <div class="export-content">
      <div class="export-content-title">
        本次导出数据量过大，导出数据将统一发送至您的邮箱
      </div>
      <el-form ref="form" :model="emailForm">
        <div class="input-item">
          <span class="input-l">电子邮箱：</span>
          <el-form-item
            prop="email"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="emailForm.email" placeholder="请输入邮箱地址" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        plain
        @click="$emit('update:dialogVisible', false)"
        >取 消</el-button
      >
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'ExportDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      emailForm: {
        email: ''
      }
    };
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('sure-submit', this.emailForm.email);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.export-content {
  &-title {
    font-size: 14px;

    font-weight: bold;
    color: #464668;
    line-height: 14px;
  }
  .input-item {
    margin-top: 17px;
    display: flex;
    align-items: center;
    /deep/ .el-form-item {
      margin-bottom: 0;
      flex: 1;
    }
  }
}
</style>
