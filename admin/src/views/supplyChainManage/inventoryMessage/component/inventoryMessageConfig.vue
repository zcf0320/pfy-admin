<template>
  <Dialog
    title="接收人"
    :visible.sync="dialogVisible"
    :height="480"
    :width="400"
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
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="姓名:" prop="name">
          <el-select
            v-model="formData.userName"
            class="w-full"
            filterable
            @change="changeValue"
          >
            <el-option
              v-for="(item, index) in employeeList"
              :key="index"
              :value="item.name"
              :label="item.name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号:" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveForm('formData')">确 定</el-button>
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
      id: null,
      email: '',
      mobile: '',
      userName: '',
      type: 1
    };
    return {
      defaultForm: defaultForm,
      employeeList: [],
      formData: this.$extends({}, this.defaultForm),
      dialogVisible: false,
      rules: {
        userName: [
          {
            required: true,
            message: '请选择接收人'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            validator: this.$validators.checkPhone
          }
        ],
        email: [
          {
            validator: this.$validators.checkEmail,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        this.list();
        const item = this.$extends({}, this.defaultForm);
        if (this.$isNotEmpty(this.id)) {
          const res = await this.$store.dispatch(
            'inventory/detailWarningMessage',
            { id: this.id, type: 1 },
          );
          if (res) {
            if (this.$isNotEmpty(res.data)) {
              this.$copyProps(item, res.data);
            }
          }
          await this.$nextTick();
        }
        await this.$nextTick();
        this.formData = this.$extends({}, item);
        this.dialogVisible = val;
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
     * 保存
     */
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }

        if (this.$isNotEmpty(this.id)) {
          this.$store
            .dispatch('inventory/updateWarningMessage', this.formData)
            .then(res => {
              if (res) {
                if (res) {
                  this.dialogVisible = false;
                  this.$emit('saved');
                  this.$message.success('保存成功');
                }
              }
            });
        } else {
          this.$store
            .dispatch('inventory/addWarningMessage', this.formData)
            .then(res => {
              if (res) {
                if (res) {
                  this.dialogVisible = false;
                  this.$emit('saved');
                }
              }
            });
        }
      });
    },
    changeValue(val) {
      const item = this.employeeList.find(item => item.name === val);
      if (this.$isNotEmpty(item)) {
        this.$copyProps(this.formData, item);
      }
    },
    /**
     * 获取用户列表
     */
    list() {
      this.$store
        .dispatch('employee/getEmployeeList', { pageSize: 10000 })
        .then(res => {
          if (!res.code) {
            const { records } = res.data;
            this.employeeList = records || [];
          } else {
            this.employeeList = [];
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
