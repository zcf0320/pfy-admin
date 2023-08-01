<template>
  <div>
    <Dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      :height="430"
      :width="500"
      @closed="dialog.visible = false"
    >
      <el-form v-if="dialog.visible" ref="formData" :model="formData">
        <el-form-item
          v-if="isReason"
          label="类目："
          prop="categoryId"
          :rules="[
            {
              required: isReason && dialog.visible,
              message: '请选择类目',
              trigger: 'change'
            }
          ]"
        >
          <el-select
            v-model="formData.categoryId"
            class="w-300"
            placeholder="全部"
            clearable
            filterable
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="isReason"
          label="不通过原因："
          prop="reasonsFailure"
          :rules="[
            {
              required: isReason && dialog.visible,
              message: '请输入不通过原因',
              trigger: 'change'
            }
          ]"
        >
          <el-input
            v-model="formData.reasonsFailure"
            placeholder="请输入不通过原因"
            maxlength="255"
            class="w-300"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="!isReason"
          label="类目："
          prop="categoryName"
          :rules="[
            {
              required: !isReason && dialog.visible,
              message: '请输入类目名称',
              trigger: 'change'
            }
          ]"
        >
          <el-input
            v-model="formData.categoryName"
            class="w-300"
            :clearable="true"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button
type="primary"
@click="saveForm('formData')"
>确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>
<script>
export default {
  name: 'cateEditDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: { type: String, default: '' },
    isReason: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const defaultForm = {
      id: null,
      categoryId: null,
      reasonsFailure: '',
      categoryName: ''
    };
    return {
      query: {
        reasonsFailure: '',
        categoryState: '',
        categoryId: null,
        pageNum: 1,
        pageSize: 1000
      },
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      dataList: [],
      dialog: {
        visible: false,
        title: ''
      }
    };
  },
  computed: {},
  watch: {
    visible: {
      handler: function(val) {
        if (val) {
          this.formData = this.$extends({}, this.defaultForm);
          this.list();
          if (this.id) {
            if (this.isReason) {
              this.$store
                .dispatch('examineReason/getReasonFormData', {
                  id: this.id
                })
                .then(res => {
                  if (res) {
                    this.$copyProps(this.formData, res.obj);
                  }
                });
            } else {
              this.$store
                .dispatch('examineReason/getFormData', {
                  id: this.id
                })
                .then(res => {
                  if (res) {
                    this.$copyProps(this.formData, res.obj);
                  }
                });
            }
            this.dialog.title = this.isReason ? '编辑不通过原因' : '编辑类目';
          } else {
            this.dialog.title = this.isReason ? '新增不通过原因' : '新增类目';
          }
        }
        this.dialog.visible = val;
      }
    },
    'dialog.visible': {
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
     * 获取类别集合
     */
    list() {
      if (!this.isReason) {
        return;
      }
      this.$store
        .dispatch('examineReason/getCatelist', this.query)
        .then(res => {
          this.dataList = res.records || [];
        });
    },
    /**
     * 保存编辑的数据
     */
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (this.isReason) {
          this.$store
            .dispatch('examineReason/saveReason', this.formData)
            .then(res => {
              if (res) {
                if (res) {
                  this.dialog.visible = false;
                  this.$emit('saved');
                }
              }
            });
        } else {
          this.$store
            .dispatch('examineReason/saveFormData', this.formData)
            .then(res => {
              if (res) {
                if (res) {
                  this.dialog.visible = false;
                  this.$emit('saved');
                }
              }
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
