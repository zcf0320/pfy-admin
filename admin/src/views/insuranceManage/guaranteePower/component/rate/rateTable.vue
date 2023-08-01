<template>
  <div class="rate-table page-form modal-form">
    <div class="title-top content-detail">
      费率表<button
        type="button"
        class="btn-save fr"
        :disabled="!!id && postStatus !== 107"
        @click="toggleModal"
      >
        设置
      </button>
    </div>
    <div
      v-for="(rateItem, rateIndex) in tableList"
      :key="rateIndex"
      class="table"
    >
      <div class="rate-name">
        <div class="name">{{ rateItem.name }}</div>
        <el-popconfirm
          title="删除后将不可恢复，是否删除？"
          placement="top"
          confirm-button-text="确认"
          cancel-button-text="取消"
          confirm-button-type="plain"
          cancel-button-type="primary"
          :hide-icon="true"
          @onConfirm="deleteRate(rateIndex)"
        >
          <div
            v-if="!(!!id && postStatus !== 107)"
            slot="reference"
            class="icon-delete ml-30"
          />
        </el-popconfirm>
      </div>
      <div v-if="rateItem.factor.length === 1" class="one-table">
        <div class="table-header">
          <div class="header">{{ tableHeader[rateItem.factor[0]] }}</div>
          <div class="header">
            费率 (单位: {{ rateText[rateItem.rateUnit] }})
          </div>
        </div>
        <div class="table-content">
          <div
            v-for="(item, index) in rateItem.rateTable"
            :key="index"
            class="table-item"
          >
            <div class="item">{{ item.name }}</div>
            <div class="item">
              <el-input-number
                v-model="item.value"
                :disabled="!!id && postStatus !== 107"
                class="item-input"
                controls-position="right"
                :min="0"
                :max="9999.999"
                :step="0.001"
                placeholder="请输入费率"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="rateItem.factor.length === 2" class="two-table">
        <div class="table-header">
          <div class="header">
            费率 (单位: {{ rateText[rateItem.rateUnit] }})
          </div>
          <div
            v-for="(item, index) in rateItem.rateTable[0].child || []"
            :key="index"
            class="header"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="table-content">
          <div
            v-for="(item, index) in rateItem.rateTable"
            :key="index"
            class="table-item"
          >
            <div class="item">{{ item.name }}</div>
            <div
              v-for="(child, childIndex) in item.child"
              :key="childIndex"
              class="item"
            >
              <el-input-number
                v-model="child.value"
                :disabled="!!id && postStatus !== 107"
                class="item-input"
                controls-position="right"
                :min="0"
                :max="9999.999"
                :step="0.001"
                placeholder="请输入费率"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!id" class="footer">
      <el-button @click.native.prevent="back">上一步</el-button>
      <el-button type="primary" @click.native.prevent="next('baseForm')"
        >下一步</el-button
      >
    </div>
    <div v-else class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >
      <!-- 状态改变组件 -->
      <Footer :id="id" :post-status="postStatus" />
    </div>
    <SetModal
      v-if="isShow"
      :is-show="isShow"
      :rate-jobs="rateJobs"
      :rate-sexs="rateSexs"
      @close="toggleModal"
      @sure="sureRateSet"
    />
  </div>
</template>
<script>
import SetModal from './setModal';
import Footer from '../footer';
export default {
  name: 'RateTable',
  components: {
    SetModal,
    Footer
  },
  props: {
    rateTable: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {
      isShow: false,
      showTable: false,
      tableList: [],
      flag: true,
      rateJobs: [],
      rateSexs: []
    };
  },
  computed: {
    tableHeader() {
      return this.$store.state.guaranteePower.tableHeader;
    },
    rateText() {
      return this.$store.state.guaranteePower.rateText;
    }
  },
  created() {
    const vm = this;
    // 费率表职业
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'rateJob'
      })
      .then(res => {
        vm.rateJobs = res.obj || [];
      });
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'rateSex'
      })
      .then(res => {
        vm.rateSexs = res.obj || [];
      });
    this.rateTable.forEach(rate => {
      rate.rateTable.forEach(item => {
        const factorSet = new Set();
        factorSet.add(item.key);
        if (item.child.length) {
          item.child.forEach(child => {
            factorSet.add(child.key);
          });
        }
        rate.factor = [...factorSet];
      });
    });
    this.tableList = this.rateTable;
  },
  methods: {
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 1
      });
    },
    // 下一步
    next() {
      const vm = this;
      this.flag = true;
      if (!this.tableList.length) {
        vm.$message.warning('请设置费率表');
        return;
      }
      // 判断是否有费率为0
      if (
        this.tableList.every(item => {
          return this.validRate(item.rateTable);
        })
      ) {
        vm.$emit('next', {
          activeIndex: 3,
          data: this.tableList
        });
      } else {
        vm.$message.warning('费率不能为0');
      }
    },
    // 判断费率表中是否存在费率为0
    validRate(list) {
      this.flag = true;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        // 判断是否是二级费率表
        if (item.child && item.child.length) {
          this.validRate(item.child);
        } else {
          if (!item.value) {
            this.flag = false;
          }
        }
      }
      return this.flag;
    },
    // 保额新增弹框切换显示
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 确认新增费率
    sureRateSet(data) {
      const { map, submitInfo } = data;
      const tableList = [];
      if (map.size === 1) {
        for (const [key, values] of map.entries()) {
          values.forEach(item => {
            tableList.push({
              key,
              row: item.id,
              name: item.name,
              value: 1,
              child: []
            });
          });
        }
      } else {
        const keys = [];
        const values = [];
        for (const key of map.keys()) {
          keys.push(key);
        }
        for (const value of map.values()) {
          values.push(value);
        }
        values[0].forEach(item => {
          tableList.push({
            key: keys[0],
            name: item.name,
            row: item.id,
            child: []
          });
        });
        tableList.forEach(item => {
          const childs = [];
          values[1].forEach(child => {
            childs.push({
              key: keys[1],
              name: child.name,
              column: child.id,
              value: 1
            });
            item.child = childs;
          });
        });
      }
      // 判断是几维费率表
      const factorSet = new Set();
      tableList.forEach(item => {
        factorSet.add(item.key);
        if (item.child.length) {
          item.child.forEach(child => {
            factorSet.add(child.key);
          });
        }
      });
      this.tableList.push({
        name: submitInfo.name,
        rateTable: tableList,
        rateUnit: submitInfo.unit,
        factor: [...factorSet]
      });
      this.toggleModal();
    },
    // 保存
    save() {
      this.$store
        .dispatch('guaranteePower/updateRateTable', {
          rateTable: this.tableList,
          id: this.id
        })
        .then(res => {
          if (!res.code) {
            this.$message.success('更新费率表成功');
          }
        });
    },
    // 删除费率表
    deleteRate(index) {
      this.tableList.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.rate-table {
  .add-rate {
    margin-bottom: 10px;
  }
  .table {
    margin-bottom: 10px;
    .rate-name {
      display: flex;
      margin: 24px 0 21px;
      height: 20px;
      .name {
        position: relative;
        padding-left: 14px;
        &::before {
          content: '';
          width: 4px;
          height: 14px;
          background-color: #2276ff;
          position: absolute;
          top: 3px;
          left: 0px;
        }
      }
      .delete-icon {
        width: 20px;
        height: 20px;
        background-image: url('../../../../../assets/icon_delete.png');
        background-size: 100% 100%;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .one-table {
      width: 544px;
      .table-header {
        display: flex;
        border-radius: 4px 4px 0 0;
        background: #f3f6fc;
        .header {
          flex: 1;
          height: 64px;
          color: #333333;
          font-weight: 500;
          line-height: 64px;
          padding-left: 24px;
          font-size: 16px;
          &:first-child {
            border-right: none;
          }
        }
      }
      .table-content {
        max-height: 700px;
        overflow-y: auto;
        .table-item {
          height: 70px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ebebeb;
          .item {
            flex: 1;
            color: #333333;
            padding: 0px 24px;
            font-size: 14px;
            &:first-child {
              border-right: none;
            }
            .el-input-number {
              width: 100%;
            }
          }
        }
      }
    }
    .two-table {
      .table-header {
        display: flex;
        border-radius: 4px 4px 0 0;
        background: #f3f6fc;
        .header {
          flex: 1;
          height: 64px;
          color: #333333;
          font-weight: 500;
          line-height: 64px;
          padding-left: 24px;
          font-size: 16px;
        }
      }
      .table-content {
        max-height: 700px;
        overflow-y: auto;
        .table-item {
          height: 70px;
          display: flex;
          border-bottom: 1px solid #ebebeb;
          align-items: center;
          .item {
            flex: 1;
            color: #333333;
            padding: 0 24px;
            font-size: 14px;
            .el-input-number {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
