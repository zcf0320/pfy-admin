<template>
  <div class="add-tag-modal modal-form">
    <el-dialog
      v-loading="loading"
      :title="pid ? '新增二级标签名称' : '新增一级标签名称'"
      :visible="true"
      width="548px"
      top="15%"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="submitInfo"
        :model="submitInfo"
        label-width="100px"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          :label="pid ? '二级标签名称' : '一级标签名称'"
          prop="name"
        >
          <el-input
            v-model="submitInfo.name"
            placeholder="请输入标签名称"
            :maxlength="15"
            show-word-limit
          />

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddTagModal',
  props: {
    pid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        name
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入标签名称',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('tagLibrary', ['addTag']),
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 提交
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            pid: this.pid,
            level: this.pid ? 2 : 1,
            name: this.submitInfo.name
          };
          this.addTag(params).then(res => {
            if (res.status) {
              vm.$message.success(res.message);
              vm.$emit('save');
            } else {
              vm.$message.warning('已有相同命名，请调整命名');
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-tag-modal {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
