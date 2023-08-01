<template>
  <div class="modal-form">
    <el-dialog
      v-loading="loading"
      :title="`${id ? '编辑' : '新增'}服务类型`"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <Tab :current-key="activeName" :btns="btns" @change="handleClick"></Tab>
      <div class="mt-10" v-if="activeName === '0'">
        <el-form
          ref="submitInfo"
          :model="submitInfo"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="服务类型名称" prop="name">
            <div class="service-name">
              <div class="type">
                <el-input disabled placeholder="在线服务" />
              </div>
              <div class="name">
                <el-input
                  v-model.trim="submitInfo.name"
                  placeholder="服务类型名称"
                  maxlength="20"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="专栏选择" prop="ids">
            <el-select v-model="submitInfo.ids" filterable multiple placeholder="全部">
              <el-option
                v-for="item in specialColumns"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="id && activeName === '1'" class="log-items">
        <Logs :id="id" :type="'23'" />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ServiceModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      rules: {
        name: [
          { required: true, message: '服务类型名称必填', trigger: 'blur' }
        ],
        ids: [{ required: true, message: '请选择专栏', trigger: 'change' }]
      },
      submitInfo: {
        name: '',
        ids: []
      },
      specialColumns: [],
      activeName: '0',
      btns: [{ value: '0', name: '基础信息' }]
    };
  },
  created() {
    // 专栏分类
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'specialColumn'
      })
      .then(res => {
        this.specialColumns = res.obj || [];
      });

    if (this.id) {
      this.getHealthColumnApplicationDetails(this.id);
      this.btns.push({ value: '1', name: '操作日志' });
    }
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 确定
    sure(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          // 新增
          if (!vm.id) {
            vm.$store
              .dispatch(
                'healthColumn/saveHealthColumnApplication',
                this.submitInfo,
              )
              .then(res => {
                if (!res.code) {
                  vm.$message.success(res.comment);
                  vm.$emit('sure');
                }
              });
          } else {
            // 更新
            vm.$store
              .dispatch(
                'healthColumn/updateHealthColumnApplication',
                this.submitInfo,
              )
              .then(res => {
                if (!res.code) {
                  vm.$message.success(res.comment);
                  vm.$emit('sure');
                }
              });
          }
        }
      });
    },
    // 获取应用设置详情
    getHealthColumnApplicationDetails(id) {
      const vm = this;
      vm.$store
        .dispatch('healthColumn/getHealthColumnApplicationDetails', {
          id
        })
        .then(res => {
          if (!res.code) {
            this.submitInfo = res.obj;
          }
        });
    },
    handleClick(tab) {
      this.activeName = tab;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-form {
  .service-name {
    display: flex;
    align-items: center;
    .type {
      width: 100px;
    }
    .name {
      flex: 1;
    }
  }
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
