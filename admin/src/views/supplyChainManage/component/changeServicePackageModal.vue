<template>
  <div class="change-service-package-modal modal-form">
    <el-dialog
      title="服务包修改"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="change-form">
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务包名称:" prop="id">
                <el-select v-model="baseForm.id" filterable placeholder="请选择服务包名称">
                  <el-option
                    v-for="item in servicePackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button
type="primary"
:loading="loading"
@click="submit('baseForm')"
>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ChangeServicePackageModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    serviceInfos: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      servicePackageList: [],
      baseForm: {
        id: this.serviceInfos.length ? this.serviceInfos[0].id : ''
      },
      rules: {
        id: [{ required: true, message: '请选择服务包名称', trigger: 'change' }]
      }
    };
  },
  created() {
    const vm = this;
    vm.getServicePackageList();
  },
  methods: {
    // 获取服务包列表
    getServicePackageList() {
      const vm = this;
      vm.$store
        .dispatch('servicePackage/getServicePackageList', {
          pageNum: 1,
          pageSize: 1000
        })
        .then(response => {
          vm.servicePackageList = response.records;
        })
        .catch(() => {});
    },
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
    },
    // 提交
    submit(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.servicePackageList.forEach(item => {
            if (item.id === vm.baseForm.id) {
              vm.$emit('submit', [item]);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.change-service-package-modal {
  .change-form {
    .upload {
      position: relative;
      display: inline-block;
      &:hover {
        .icon-delete {
          display: block;
        }
      }
      .icon-delete {
        display: none;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        left: 172px;
        background-image: url('../../../assets/icon-delete.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
