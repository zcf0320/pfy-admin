<template>
  <Dialog
    :title="isReject ? '选择审核不通过原因' : '审核通过'"
    :visible.sync="dialogVisible"
    :height="620"
    :width="585"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        label-position="top"
        class="page-form"
      >
        <!-- 审核失败 -->
        <div v-if="isReject">
          <div class="row-2">
            <el-checkbox-group v-model="formData.rejectReasons">
                <el-checkbox
                  v-for="item in reasonList || []"
                  :key="item"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            <div >
               <el-input
              v-model="remark"
              type="textarea"
              placeholder="请输入不通过原因"
              :maxlength="160"
            />
            </div>
          </div>
        </div>
        <!-- 审核成功 -->
        <div v-else>
          <div class="pt-24 mb-24">
            <el-radio-group
              v-model="formData.reviewStatus"
              @change="reviewStatusChange"
            >
              <el-radio :label="1">正常可投保</el-radio>
              <el-radio :label="3">加费可投保</el-radio>
              <el-radio :label="4">除外可投保</el-radio>
            </el-radio-group>
          </div>
          <div class="flex">
            <span class="w-60">上传回执</span>
            <el-image
              v-for="item in imgUrl"
              :key="item"
              style="width: 60px; height: 60px"
              :src="item"
              :preview-src-list="imgUrl"
              class="ml-24 mb-24"
            />
            <ImgUpload
              :accept="'.jpg,.png,.bmp,.jpeg,.pdf'"
              :type="false"
              @change="imgChange"
            >
              <div class="add-ico flex-center mb-24 pointer" />
            </ImgUpload>
          </div>
          <div class="flex">
            <div class="w-60" />
            <div>
              <div v-for="item in fileList" :key="item.id" class="preview-file">
                <div>
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <el-form-item
            v-if="formData.reviewStatus == 3"
            label="加费金额"
            prop="addPrice"
            :rules="[
              { required: true, message: '请输入加费金额', trigger: 'blur' },
            ]"
          >
            <div class="flex-box">
              <InputNumber
                v-model="formData.addPrice"
                placeholder="请输入加费金额"
                class="w-150"
                :max="999999"
                :maxlength="8"
              />
              <span class="ml-10">
                元
              </span>
            </div>
          </el-form-item>
          <el-form-item
            v-if="formData.reviewStatus == 3"
            label="加费说明"
            prop="passRemark"
            :rules="[
              { required: true, message: '请输入加费说明', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="formData.passRemark"
              type="textarea"
              placeholder="请输入加费说明"
              maxlength="200"
            />
          </el-form-item>
          <el-form-item
            v-if="formData.reviewStatus == 4"
            label="除外说明"
            prop="passRemark"
            :rules="[
              { required: true, message: '请输入除外说明', trigger: 'blur' },
            ]"
            maxlength="200"
          >
            <el-input v-model="formData.passRemark" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="
          $isEmpty(formData.rejectReasons) && $isEmpty(remark) && isReject
        "
        @click="saveForm('formData')"
        >确 定</el-button
      >
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'reviewDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    isReject: {
      type: Boolean,
      default: false
    } // 是否为审核失败
  },
  data() {
    const defaultForm = {
      addPrice: null,
      passFileUrl: [],
      passRemark: '',
      recordId: this.id,
      rejectReasons: [],
      reviewStatus: 1
    };
    return {
      remark: '',
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      reasonList: [
        '被保人证件图片不清晰',
        '投保信息与实际不符',
        '重复投保',
        '体检结果不满足投保需求'
      ],
      reasonIds: [],
      dialogVisible: false
    };
  },
  computed: {
    imgUrl() {
      const arr = [];
      if (this.$isNotEmpty(this.formData.passFileUrl)) {
        this.formData.passFileUrl.forEach(item => {
          if (item.type === 1) {
            arr.push(item.url);
          }
        });
      }
      return arr;
    },
    fileList() {
      return this.formData.passFileUrl.filter(item => item.type !== 1);
    }
  },
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          this.dialogVisible = val;
          this.$copyProps(this.formData, this.defaultForm);
        }
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
    /**
     *
     */
    imgChange(val) {
      this.formData.passFileUrl.push(val);
    },
    /**
     * 保存
     */
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (!this.isReject && this.$isEmpty(this.formData.passFileUrl)) {
          this.$message.warning('请上传回执文件');
          return;
        }
        this.$confirm('是否确认提交审核结果?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 如果是审核失败
          let formData = {};
          if (this.isReject) {
            formData = {
              recordId: this.id,
              rejectReasons: this.formData.rejectReasons,
              reviewStatus: 2
            };
            if (this.$isNotEmpty(this.remark)) {
              formData.rejectReasons.push(this.remark);
            }
          } else {
            // 审核成功
            formData = {
              addPrice: null,
              passFileUrl: [],
              passRemark: '',
              recordId: this.id,
              reviewStatus: null
            };
            this.$copyProps(formData, this.formData);
            if (this.$isNotEmpty(formData.addPrice)) {
              formData.addPrice = Number(formData.addPrice).toFixed(2);
            }
          }
          this.$store
            .dispatch('personalInsuranceRecord/reviewRecord', formData)
            .then(() => {
              this.$message.success('审核成功');
              this.dialogVisible = false;
              this.$emit('saved');
            });
        });
      });
    },
    reviewStatusChange() {
      this.$copyProps(this.formData, this.defaultForm, [
        'reviewStatus',
        'passFileUrl'
      ]);
      this.clearValidate('formData');
    }
  }
};
</script>

<style lang="scss" scoped>
.add-ico {
  width: 110px;
  height: 110px;
  border: 1px solid #e4e4e4;
  font-size: 40px;
  margin-left: 24px;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 45px;
    height: 2px;
    left: 30px;
    top: 50px;
    background: #d8d8d8;
  }
  &::before {
    position: absolute;
    content: '';
    width: 2px;
    height: 45px;
    background: #d8d8d8;
    left: 50px;
    top: 30px;
  }
}
.preview-file {
  color: #989ab3;
  margin-bottom: 12px;
}
</style>
