<template>
  <div class="modal-form">
    <el-dialog
      v-loading="loading"
      title="保额设置"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="submitInfo"
        :model="submitInfo"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-row>
          <el-col :span="18">
            <el-form-item label="单次保额" prop="singlePrice">
              <InputNumber
                v-model="submitInfo.singlePrice"
                class="item-input"
                controls-position="right"
                :min="1"
                :max="99999"
                placeholder="请输入保额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="none-label" prop="singlePriceUnit">
              <el-select
                v-model="submitInfo.singlePriceUnit"
                placeholder="请选择单位"
              >
                <el-option
                  v-for="item in insuredUnits"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="累计保额" prop="price">
              <InputNumber
                v-model="submitInfo.price"
                class="item-input"
                controls-position="right"
                :min="1"
                :max="99999"
                placeholder="请输入保额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="none-label" prop="priceUnit">
              <el-select
                v-model="submitInfo.priceUnit"
                placeholder="请选择单位"
              >
                <el-option
                  v-for="item in insuredUnits"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { realPriceConfig } from './config';
export default {
  name: 'InsuredAmountModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        price: 1,
        priceUnit: '',
        realPrice: 0,
        singlePrice: 1,
        singlePriceUnit: ''
      },
      rules: {
        price: [{ required: true, message: '请输入保额', trigger: 'blur' }],
        priceUnit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        singlePrice: [
          { required: true, message: '请输入保额', trigger: 'blur' }
        ],
        singlePriceUnit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ]
      },
      insuredUnits: [],
      realPriceConfig
    };
  },
  created() {
    const vm = this;
    // 单位
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'insuredUnit'
      })
      .then(res => {
        vm.insuredUnits = res.obj || [];
      });
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 确定
    sure(formName) {
      const vm = this;
      const { price, priceUnit } = this.submitInfo;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          // 计算保额
          this.submitInfo.realPrice = price * realPriceConfig[priceUnit];
          vm.$emit('sure', this.submitInfo);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-form {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
  .item-input {
    width: 100%;
  }
  .none-label {
    padding-top: 24px;
  }
}
</style>
