<template>
  <Dialog
    title="选择审核不通过原因"
    :visible.sync="dialogVisible"
    :height="600"
    :width="750"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <!-- <div class="view-box">
                <div class="flex-between view-item" v-for="item in filterSelected" :key='item.id'>
                    <span class="item-name">{{item.name}}</span>
                    <span class="icon-close" @click="delItem(item)"></span>
                </div>
            </div> -->
      <Tab
        :btns="cateList"
        :active-key="'id'"
        :active-name="'name'"
        @change="
          val => {
            activeName = val;
          }
        "
      />
      <div>
        <div
          v-if="$isNotEmpty(formData) && $isNotEmpty(formData.childs)"
          class="pt-24 row-2"
        >
          <!-- <el-checkbox-group v-model="formData.reasonIds">
                        <el-checkbox :label="item.id" v-for="item in formData.childs || []" :key="item.id">
                            {{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group> -->
          <div
            v-for="(item, index) in formData.childs || []"
            :key="item.id"
            class="flex-between view-item"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-text" @click="useReason(index)">引用</span>
          </div>
        </div>
        <div class="mt-16">
          <el-input
            v-model="remark"
            class="remarkBox"
            type="textarea"
            maxlength="100"
            placeholder="备注"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="$isEmpty(filterSelected) && $isEmpty(remark)"
          @click="saveForm()"
          >确 定</el-button
        >
      </span>
    </div>
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
    },
    state: {
      type: Number,
      default: null
    },
    secondState: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      remark: '',
      activeName: '',
      formData: {
        id: null,
        reasonIds: [],
        childs: []
      },
      cateList: [],
      dialogVisible: false
    };
  },
  computed: {
    // 筛选选中的原因
    filterSelected() {
      let dataList = [];
      this.cateList.forEach(item => {
        if (this.$isNotEmpty(item.reasonIds)) {
          const arr = item.childs.filter(child =>
            item.reasonIds.includes(child.id),
          );
          dataList = dataList.concat(arr);
        }
      });
      return dataList;
    }
  },
  watch: {
    activeName: {
      handler(val) {
        if (this.$isNotEmpty(val)) {
          if (this.$isNotEmpty(val)) {
            this.formData = this.cateList.find(item => item.id === val);
          }
        }
      },
      immediate: true
    },
    visible: {
      async handler(val) {
        if (val) {
          const res = await this.$store.dispatch(
            'auditRecords/getCategoryReasonList',
          );
          if (res) {
            this.cateList = res.obj || [];
            if (this.$isNotEmpty(this.cateList)) {
              this.cateList.forEach(item => {
                this.$set(item, 'reasonIds', []);
              });
              this.activeName = this.cateList[0].id;
            }
            this.remark = '';
          }
          await this.$nextTick();
          this.dialogVisible = val;
        }
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.activeName = '';
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    // 引用
    useReason(index) {
      // if (!this.formData.childs[index].select) {
      this.formData.childs[index].select = true;
      this.remark += `${this.formData.childs[index].name}；`;
      // }
    },
    /**
     * 保存
     */
    saveForm() {
      this.$confirm('是否确认提交审核结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 保存不通过原因
        let isSecond = false;
        this.state === 2 && this.secondState === 1 && (isSecond = true);
        this.state === 2 && this.secondState === 4 && (isSecond = true);
        this.cateList.filter(item => this.$isNotEmpty(item.reasonIds));
        const dto = {
          id: this.id,
          remark: this.remark,
          isSecond: isSecond
        };
        this.$store.dispatch('auditRecords/rejectReview', dto).then(() => {
          this.dialogVisible = false;
          this.$emit('saved');
        });
      });
    },
    /**
     * 删除选中的原因
     */
    delItem(item) {
      const selectReasons = this.cateList.find(data => data.id === item.pid)
        .reasonIds;
      const selectIndex = selectReasons.findIndex(
        selectItem => selectItem.id === item.id,
      );
      selectReasons.splice(selectIndex, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.view-item {
  margin-bottom: 16px;
  .item-name {
    width: 620px;
    color: #464668;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item-text {
    font-size: 14px;
    color: #3599fe;
    cursor: pointer;
    &.select {
      color: #989ab3;
    }
  }
  .icon-close {
    display: none;
  }
  &:hover .icon-close {
    display: block;
  }
}
.view-box {
  // width: 690px;
  min-height: 64px;
  max-height: 128px;
  overflow: auto;
  border-radius: 4px;
  border: 1px solid #3599fe;
  padding: 12px;
  margin-bottom: 24px;

  .el-dialog__header {
    padding: 0px !important;
    height: 46px;
  }
}
</style>
