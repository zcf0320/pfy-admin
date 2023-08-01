<template>
  <div class="review-container modal-form">
    <el-dialog
      v-loading="loading"
      title="理赔审核"
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
        <el-form-item label="审核结果:" prop="state">
          <el-radio-group v-model="submitInfo.state">
            <el-radio :label="0">理赔成功，准备打款</el-radio>
            <el-radio :label="2">理赔失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="submitInfo.state === 2"
          label="失败原因:"
          prop="reviewdId"
        >
          <el-select
            v-model="submitInfo.reviewdId"
            placeholder="请选择审核失败原因"
          >
            <el-option
              v-for="item in claimReviews"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
  name: 'ReviewModal',
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
        reviewdId: ''
      },
      rules: {
        reviewdId: [
          { required: true, message: '请选择审核失败原因', trigger: 'change' }
        ]
      },
      revieweds: []
    };
  },
  created() {
    this.getReviewed();
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
            .dispatch('claims/reviewClaims', {
              id: vm.id,
              reviewdId: vm.submitInfo.reviewdId
            })
            .then(() => {
              vm.$emit('save');
            });
        }
      });
    },
    // 获取审核不通过原因
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
