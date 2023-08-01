<template>
  <el-form ref="formData" :model="formData">
    <div class="medicalInvoice-box">
      <div class="flex-between mb-24">
        <div class="title-top mb-0 pt-0 pb-0 pl-0">身份证</div>
      </div>
      <div class="box-list mb-24">
        <div class="flex-box item-box">
          <div class="labelName">证件类型</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="certificateType"
              :rules="[{ required: true, message: '请选择证件类型' }]"
            >
              <el-select
                v-model="formData.certificateType"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择证件类型"
              >
                <el-option label="身份证" :value="0" />
                <el-option label="护照" :value="1" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">姓名</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="name"
              :rules="[{ required: true, message: '请输入姓名' }]"
            >
              <el-input
                v-model="formData.name"
                maxlength="10"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入姓名"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">性别</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="gender"
              :rules="[{ required: true, message: '请选择性别' }]"
            >
              <el-select
                v-model="formData.gender"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择性别"
              >
                <el-option label="男" :value="1" />
                <el-option label="女" :value="0" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">证件号码</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="idNumber"
              :rules="[
                { required: true, message: '请输入证件号码' },
                {
                  validator: $validators.checkIdNumber,
                  message: '请输入有效证件号',
                },
              ]"
            >
              <el-input
                v-model="formData.idNumber"
                maxlength="18"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入证件号码"
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'idNumber',
  props: {
    id: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        certificateType: '',
        idNumber: '',
        name: ''
      }
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'saveIdentityCard'
    ]),
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        // this.formData.claimCheckList = res.data.claimCheckList || []
        if (this.$isNotEmpty(res.data.identityCardVO)) {
          this.formData = res.data.identityCardVO;
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    // 保存数据
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.claimRecordId = this.id;
        this.saveIdentityCard(this.formData).then(() => {
          this.$message.success('保存成功');
          this.$emit('update:isEdit', false);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.medicalInvoice-box {
  .labelName {
    width: 120px;
    height: 38px;
    line-height: 38px;
    padding-left: 14px;
    color: #464668ff;
    background: #f3f6f9;
    font-size: 14px;
  }
  .box-list {
    .item-box {
      border: 1px solid #ebedf2;
      border-top: 0px;
      &:first-child {
        border-top: 1px solid #ebedf2;
      }
    }
  }
  //el-input 不显示border
  .input-no-border >>> .el-input__inner {
    background-color: #fff;
    border-radius: 0px;
    height: 38px;
    // border: 0px !important; //改成0，边框就消失了！
    width: 100%;
    border-color: transparent !important;
    &:focus {
      outline: none;
      border-color: #3599fe !important;
    }
  }

  //错误显示红丝
  .el-form-item.is-error {
    //el-input 不显示border
    .input-no-border >>> .el-input__inner {
      background-color: #fff;
      border-radius: 0px;
      height: 38px;
      // border: 0px !important; //改成0，边框就消失了！
      width: 100%;
      border-color: #ff5e5e !important;
      &:focus {
        outline: none;
        border-color: #ff5e5e !important;
      }
    }
  }
}
</style>
