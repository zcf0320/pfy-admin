<template>
  <Dialog
    title="关闭预约记录"
    :visible.sync="dialogVisible"
    :height="500"
    :width="550"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <el-form ref="formData" :model="formData">
        <el-form-item label="审核结果：" class="mb-10">
          <el-radio-group v-model="formData.result">
            <el-radio :label="1">审核通过，预约成功</el-radio>
            <el-radio :label="0">审核失败，关闭预约</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formData.result === 1"
          label="上传报告："
          required
          class="mb-0"
        >
          <div v-loading="loading">
            <ImgUpload
              v-model="formData.feedbackPic"
              :accept="'image/*'"
              :loading.sync="loading"
            >
              <div
                class="upload-box"
                :class="$isEmpty(formData.feedbackPic) ? 'upload' : ''"
              >
                <el-image
                  v-if="$isNotEmpty(formData.feedbackPic)"
                  style="width: 178px; height: 178px;"
                  :src="formData.feedbackPic"
                />
              </div>
            </ImgUpload>
          </div>
        </el-form-item>
        <el-form-item
          v-if="formData.result === 0"
          label="关闭原因："
          prop="remark"
          :rules="[{ required: true, message: '请选择关闭原因' }]"
        >
          <el-select v-model="formData.remark" placeholder="请选择关闭原因">
            <el-option
              v-for="item in reasonList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        :disabled="loading"
        type="primary"
        @click="saveForm('formData')"
        >确 定</el-button
      >
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'claimReasonDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    const defaultForm = {
      result: 1,
      remark: '',
      feedbackPic: null
    };
    return {
      loading: false,
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      remark: '',
      dialogVisible: false,
      reasonList: ['客户资料不全', '客户资料有误', '客户不符合资质']
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
          this.formData = this.$extends({}, this.defaultForm);
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (
          this.formData.result === 1 &&
          this.$isEmpty(this.formData.feedbackPic)
        ) {
          this.$message.warning('请上传报告');
          return;
        }
        // 审核通过
        if (this.formData.result === 1) {
          this.$store
            .dispatch('secondaryTreatment/passSecondaryTreatment', {
              id: this.id,
              feedbackPic: this.formData.feedbackPic
            })
            .then(() => {
              this.dialogVisible = false;
              this.$emit('saved');
            });
        } else {
          // 审核失败
          this.$store
            .dispatch('secondaryTreatment/rejectSecondaryTreatment', {
              id: this.id,
              remark: this.formData.remark
            })
            .then(() => {
              this.dialogVisible = false;
              this.$emit('saved');
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-box {
  width: 178px;
  height: 178px;
  border: 1px dashed #ebedf2;
  position: relative;
  img {
    width: 178px;
    height: 178px;
  }
  &.upload::after {
    position: absolute;
    content: '';
    width: 2px;
    height: 91px;
    left: 90px;
    top: 44px;
    background: #ebedf2ff;
  }
  &.upload::before {
    position: absolute;
    content: '';
    width: 91px;
    height: 2px;
    background: #ebedf2ff;
    top: 90px;
    left: 44px;
  }
}
</style>
