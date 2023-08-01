<template>
  <Dialog
    title="调整库存"
    :visible.sync="dialogVisible"
    :height="300"
    :width="500"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <el-form ref="formData" :model="formData">
        <div class="flex-box mb-20">
          <div class="w-80">{{ currentData.label || 0 }}：</div>
          <div>{{ currentData.number }}</div>
        </div>
        <div class="flex-box">
          <div class="w-80">调整库存：</div>
          <el-select
            v-if="overStorageCount > 0"
            v-model="formData.type"
            class="w-80"
          >
            <el-option
              v-for="(item, key) in $enums['inventoryLabel']"
              :key="key"
              :value="key"
              :label="item"
            />
          </el-select>
          <el-input v-else v-model="text" class="w-80" disabled />
          <el-form-item
            label=""
            class="mb-0 ml-10"
            prop="number"
            :rules="[
              {
                required: true,
                message: '输入数量',
                trigger: 'change',
              },
              {
                validator: $validators.checkPInt,
                message: '请输入0~33正整数',
              },
            ]"
          >
            <InputNumber
              v-model="formData.number"
              class="w-140"
              :max="formData.type == 1 ? 999999 : Number(overStorageCount)"
              :maxlength="6"
            />
          </el-form-item>
        </div>
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
  name: 'adjustInventory',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    number: {
      type: Number,
      default: null
    },
    shortageStorageCount: {
      type: Number,
      default: null
    },
    overStorageCount: {
      type: Number,
      default: null
    }
  },
  data() {
    const defautForm = {
      id: this.id || null,
      number: null,
      type: '1'
    };
    return {
      text: '增加',
      defautForm: defautForm,
      formData: this.$extends({}, defautForm),
      dialogVisible: false
    };
  },
  computed: {
    currentData() {
      const data = {
        label: '超出量',
        isOver: true,
        number: this.overStorageCount || 0
      };
      if (this.shortageStorageCount > 0) {
        data.isOver === false;
        // (data.isOver === false),
        //   (data.isOver = '缺货量'),
        //   (data.isOver = this.shortageStorageCount || 0);
      }
      return data;
    }
  },
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          this.formData = this.$extends({}, this.defautForm);
          this.dialogVisible = val;
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
     * 保存
     */
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }

        this.$confirm('是否确认调整库存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch('inventory/adjustInventory', {
              serviceInfoId: this.id,
              value: Number(this.formData.type) * Number(this.formData.number)
            })
            .then(() => {
              this.$message.success('调整成功');
              this.dialogVisible = false;
              this.$emit('saved');
            });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
