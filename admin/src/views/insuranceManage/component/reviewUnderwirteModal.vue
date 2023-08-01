<template>
  <div class="review-container modal-form">
    <el-dialog
      v-loading="loading"
      title="核保审核"
      :visible="isShow"
      width="548px"
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
        <el-form-item label="审核结果:" prop="reasonId">
          <el-cascader
            v-model="submitInfo.reasonId"
            :options="options"
            :props="optionProps"
            placeholder="请选择审核结果"
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
export default {
  name: 'ReviewUnderwirteModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        reasonId: ''
      },
      rules: {
        reasonId: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ]
      },
      options: [],
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      }
    };
  },
  created() {
    this.getReviewed();
    // 审核结果
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'insure'
      })
      .then(res => {
        this.options = res.obj;
      });
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 提交
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          const vm = this;
          vm.$store
            .dispatch('underwrite/reviewUnderwrite', {
              id: vm.id,
              reasonId: vm.submitInfo.reasonId[1]
            })
            .then(() => {
              vm.$message.success('审核成功');
              vm.$emit('save');
            });
        }
      });
    },
    // 获取审核结果
    getReviewed() {
      const vm = this;
      vm.$store
        .dispatch('app/getSysConfig', {
          code: 'claimReview'
        })
        .then(res => {
          vm.claimReviews = res.obj || [];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.review-container {
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
