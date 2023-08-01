<template>
  <div class="modal-form">
    <el-dialog
      v-loading="loading"
      title="费率表因素设置"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="费率表名称" prop="name">
          <el-input
            v-model="form.name"
            maxlength="20"
            placeholder="最多支持20个中文字符"
          />
        </el-form-item>
        <el-form-item
          label="请在以下因素中选择（最多选择2个，最少选择1个）"
          prop="factor"
        >
          <el-checkbox-group v-model="form.factor">
            <el-checkbox label="age">年龄</el-checkbox>
            <el-checkbox label="job">职业</el-checkbox>
            <el-checkbox label="sex">性别</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="设置单位" prop="unit">
          <el-select v-model="form.unit" placeholder="请选择">
            <el-option
              v-for="item in rateUnits"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SetModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    rateSexs: {
      type: Array,
      default: () => []
    },
    rateJobs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const checkFactor = (rule, value, callback) => {
      if (value.length > 2) {
        return callback(new Error('最多选择俩个因素'));
      }
      callback();
    };
    return {
      loading: false,
      closeClickModal: false,
      rules: {
        name: [
          { required: true, message: '请输入费率表名称', trigger: 'blur' }
        ],
        factor: [
          { required: true, message: '请选择因素', trigger: 'change' },
          { validator: checkFactor, trigger: 'change' }
        ],
        unit: [{ required: true, message: '请选择单位', trigger: 'change' }]
      },
      rateUnits: [],
      form: {
        factor: [],
        unit: ''
      }
    };
  },
  computed: {
    ageOptions() {
      return this.$store.state.guaranteePower.ageOptions;
    }
  },
  created() {
    // 费率表单位
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'rateUnit'
      })
      .then(res => {
        this.rateUnits = res.obj || [];
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
      const rateMap = new Map();
      vm.$refs[formName].validate(valid => {
        if (valid) {
          // 处理年龄优先为列
          if (vm.form.factor.includes('age')) {
            const index = vm.form.factor.indexOf('age');
            vm.form.factor.splice(index, 1);
            vm.form.factor.unshift('age');
          }
          vm.form.factor.forEach(item => {
            if (item === 'age') {
              rateMap.set('age', vm.ageOptions);
            } else if (item === 'job') {
              rateMap.set('job', vm.rateJobs);
            } else {
              rateMap.set('sex', vm.rateSexs);
            }
          });
          vm.$emit('sure', {
            map: rateMap,
            submitInfo: this.form,
            render: false
          });
          // // 判断是否改变了因素选项
          // if(vm.submitInfo.factor.toString() === vm.form.factor.toString()) {
          //     vm.$emit('sure', {
          //         map: rateMap,
          //         submitInfo: this.form,
          //         render: false
          //     })
          // } else {
          //     vm.$emit('sure', {
          //         map: rateMap,
          //         submitInfo: this.form,
          //         render: true
          //     })
          // }
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
}
</style>
