<template>
  <Dialog
    title="添加省份"
    :visible.sync="dialogVisible"
    :height="700"
    :width="650"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <div class="mb-10">
        <el-checkbox
          v-model="isAll"
          :indeterminate="!isAll && provinces.length > 0"
          @change="selectAll"
          >全选</el-checkbox
        >
      </div>
      <div class="row-3">
        <el-checkbox-group v-model="provinces" @change="itemChange">
          <el-checkbox
            v-for="item in allCityList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="$isEmpty(provinces)"
        @click="saveForm()"
        >确 定</el-button
      >
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'provinceSelectDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      isAll: false,
      dialogVisible: false,
      provinces: this.$extends([], this.value)
    };
  },
  computed: {
    allCityList() {
      return this.$store.state.app.allCityList || [];
    }
  },
  watch: {
    visible: {
      async handler(val) {
        // 更新城市
        this.itemChange();
        this.dialogVisible = val;
      }
    },
    value: {
      handler(val) {
        this.provinces = this.$extends([], val);
      },
      immediate: true
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {
    this.$store.dispatch('app/getAllCityList');
    this.isAll = false;
  },
  methods: {
    // 全选和取消全选
    selectAll(val) {
      if (val) {
        const arr = [];
        this.allCityList.forEach(item => {
          arr.push(item.id);
        });
        this.provinces = arr;
      } else {
        this.provinces = [];
      }
    },
    async itemChange() {
      if (this.allCityList.length === this.provinces.length) {
        this.isAll = true;
      }
    },
    saveForm() {
      this.$emit('saved', this.provinces);
      this.$emit('input', this.provinces);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
