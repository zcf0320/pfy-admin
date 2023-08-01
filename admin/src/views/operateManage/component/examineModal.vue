<template>
  <div class="examine-container modal-form">
    <el-dialog
      v-loading="loading"
      title="审核"
      :visible="isShow"
      width="548px"

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
        <div v-if="type === '0'">
          <el-form-item label="审核结果:" prop="state">
            <el-radio-group v-model="submitInfo.state">
              <el-radio :label="0">审核通过，预约成功</el-radio>
              <el-radio :label="2">审核失败，关闭预约</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="submitInfo.state === 2"
            label="关闭原因:"
            prop="reasonId"
          >
            <el-select
              v-model="submitInfo.reasonId"
              placeholder="请选择关闭原因"
            >
              <el-option
                v-for="item in revieweds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if=" submitInfo.state === 0"
            label="核销码:"
          >
            <el-input v-model="submitInfo.code" placeholder="请输入核销码" maxlength="20" />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="关闭原因:" prop="reasonId">
            <el-select
              v-model="submitInfo.reasonId"
              placeholder="请选择关闭原因"
            >
              <el-option
                v-for="item in revieweds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
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
  name: 'ExamineModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '0'
    },
    // 是否要显示核销码
    isNeedCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        reasonId: '',
        code: null
      },
      rules: {
        reasonId: [
          {
            required: true,
            message: '请选择关闭原因',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入核销码',
            trigger: 'change'
          },
          {
            validator: this.$validators.checkValidCode,
            trigger: 'change'
          }
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
      // 个人审核 企业关闭
      if (vm.type === '0') {
        vm.$refs[formName].validate(valid => {
          if (valid) {
            const vm = this;
            const data = {
              id: vm.id,
              state: vm.submitInfo.state,
              reviewedId: vm.submitInfo.reasonId,
              type: vm.type
            };
            if (vm.submitInfo.state === 0) {
              data.code = vm.submitInfo.code;
            }
            vm.$store
              .dispatch('appointmentService/reviewedAppointment', data)
              .then(() => {
                vm.$emit('save');
              });
          }
        });
      } else {
        vm.$refs[formName].validate(valid => {
          if (valid) {
            const vm = this;
            vm.$store
              .dispatch('appointmentService/closeAppointment', {
                id: vm.id,
                reasonId: vm.submitInfo.reasonId
              })
              .then(() => {
                vm.$emit('save');
              });
          }
        });
      }
    },
    // 获取审核不通过原因
    getReviewed() {
      const vm = this;
      vm.$store
        .dispatch('app/getSysConfig', {
          code: 'reviewed'
        })
        .then(res => {
          vm.revieweds = res.obj || [];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.examine-container {
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
