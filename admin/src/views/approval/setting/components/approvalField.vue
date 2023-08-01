<template>
  <Dialog
    title="审批字段"
    :visible.sync="dialogVisible"
    :height="400"
    :width="500"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible" class="row-3">
      <div>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="
            $isNotEmpty(checkList) && checkList.length !== dataList.length
          "
          class="mb-10"
          @change="checkedAll"
          >全选</el-checkbox
        >
      </div>
      <el-checkbox-group v-model="checkList" @change="checkItem">
        <el-checkbox v-for="item in dataList" :key="item.id" :label="item.id">{{
          item.columnName
        }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        :disabled="$isEmpty(checkList)"
        type="primary"
        @click="saveForm('formData')"
        >确 定</el-button
      >
    </span>
  </Dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'approvalField',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checkAll: false,
      dialogVisible: false,
      dataList: [],
      checkList: []
    };
  },
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          if (this.$isNotEmpty(this.data)) {
            const res = await this.getApprovesOption(this.data);
            if (this.$isNotEmpty(res.data)) {
              const arr = [];
              res.data.forEach(item => {
                arr.push(item.id);
              });
              this.checkList = arr;
            }
            await this.$nextTick();
            this.queryColumnByType({ type: this.data.type }).then(res => {
              this.dataList = res.data || [];
              const isCheckAll =
                this.$isNotEmpty(this.checkList) &&
                this.checkList.length === this.dataList.length;
              if (isCheckAll) {
                this.checkAll = true;
              }
            });
          }
        }
        this.dialogVisible = val;
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.checkAll = false;
          this.checkList = [];
          this.$emit('update:visible', false);
        }
      }
    }
  },
  methods: {
    ...mapActions('approval', [
      'getApprovesOption',
      'saveOrUpdate',
      'queryColumnByType'
    ]),
    // 单个数据选中
    checkItem(val) {
      this.checkAll = val.length === this.dataList.length;
    },
    // 全选数据
    checkedAll(val) {
      const arr = [];
      if (val) {
        this.dataList.forEach(item => {
          arr.push(item.id);
        });
      }
      this.checkList = arr;
    },
    saveForm() {
      const data = {
        columnIds: this.checkList,
        stateOption: this.data.stateOption,
        type: this.data.type
      };
      this.saveOrUpdate(data).then(() => {
        this.$emit('saved');
        this.dialogVisible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
