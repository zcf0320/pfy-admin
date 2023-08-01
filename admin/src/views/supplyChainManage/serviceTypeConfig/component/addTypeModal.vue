<template>
  <div class="add-tag-modal modal-form">
    <el-dialog
      v-loading="loading"
      :title="`${isEdit ? '编辑' : '创建'}${title}级分类名称`"
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
        <el-form-item :label="`${title}级分类名称`" prop="name">
          <el-input
            v-model="submitInfo.name"
            placeholder="请输入分类名称"
            :maxlength="15"
            show-word-limit
          />
          <!-- <InputMaxTip :max="15" :current-key="submitInfo.name" /> -->
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
  name: 'AddTypeModal',
  props: {
    pid: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
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
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ]
      },
      title: '',
      edit: ''
    };
  },
  created() {
    switch (this.level) {
      case 1:
        this.title = '一';
        break;
      case 2:
        this.title = '二';
        break;
      case 3:
        this.title = '三';
        break;
      default:
        break;
    }
    if (this.isEdit) {
      this.submitInfo.name = this.name;
    } else {
      this.submitInfo.name = '';
    }
  },
  methods: {
    ...mapActions('serviceType', ['addType', 'updateType']),
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 提交
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            const params = {
              pid: this.pid,
              level: this.level,
              name: this.submitInfo.name
            };
            this.addType(params).then(res => {
              if (res.status) {
                vm.$message.success(res.message);
                vm.$emit('save');
              } else {
                vm.$message.warning('已有相同命名，请调整命名');
              }
            });
          } else {
            const params = {
              id: this.id,
              level: this.level,
              name: this.submitInfo.name
            };
            this.updateType(params).then(res => {
              if (res.status) {
                vm.$message.success(res.message);
                vm.$emit('editSave');
              } else {
                vm.$message.warning('已有相同命名，请调整命名');
              }
            });
          }
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
