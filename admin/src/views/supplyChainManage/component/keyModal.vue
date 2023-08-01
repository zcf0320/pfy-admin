<template>
  <div class="key-select-container">
    <el-dialog
      v-loading="loading"
      title="修改数据字段"
      :visible="isShow"
      :width="dialogWidth"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <div class="key-select">
        <div class="key-items">
          <div class="key-name">客户数据</div>
          <div class="key-checkbox">
            <el-checkbox-group v-model="keySelectedList[0]">
              <el-checkbox
                v-for="item in keyList[0]"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="key-items">
          <div class="key-name">投保数据</div>
          <div class="key-checkbox">
            <el-checkbox-group v-model="keySelectedList[1]">
              <el-checkbox
                v-for="item in keyList[1]"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="key-items">
          <div class="key-name">服务数据</div>
          <div class="key-checkbox">
            <el-checkbox-group v-model="keySelectedList[2]">
              <el-checkbox
                v-for="item in keyList[2]"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="key-items">
          <div class="key-name">企业数据</div>
          <div class="key-checkbox">
            <el-checkbox-group v-model="keySelectedList[3]">
              <el-checkbox
                v-for="item in keyList[3]"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveKey">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'KeySelectModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    keySelectedList: {
      type: Object,
      default: () => {
        return { 0: [], 1: [], 2: [], 3: [] };
      }
    },
    keyType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      lastKeySelectedList: {}
    };
  },
  computed: {
    dialogWidth() {
      return window.screen.width >= 768 ? '50%' : '95%';
    },
    keyList() {
      const vm = this;
      return vm.$store.state.serviceItems.keyList;
    }
  },
  methods: {
    // 关闭弹框
    close() {
      const vm = this;
      vm.$emit('close', {
        type: vm.keyType
      });
    },
    // 提交
    saveKey() {
      const vm = this;
      vm.$emit('submit', {
        keySelectedList: vm.keySelectedList,
        type: vm.keyType
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.key-select-container {
  .key-select {
    .key-items {
      .key-name {
        color: #282828;
      }
      .key-checkbox {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 20px;
        .el-checkbox-group {
          margin-right: 20px;
          .el-checkbox {
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
