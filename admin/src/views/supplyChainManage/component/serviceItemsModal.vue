<template>
  <div class="service-select-modal">
    <el-dialog
      v-loading="loading"
      title="修改服务项"
      :visible="isShow"
      :width="dialogWidth"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="service-table">
        <el-table
          ref="serviceItemsTable"
          v-loading="tableLoading"
          :data="serviceItemsList"
          :row-key="
            row => {
              return row.id;
            }
          "
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" fixed="left" :reserve-selection="true">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务项名称">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务介绍">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceDescribe || '-' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ServiceItemsModal',
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
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
      tableLoading: false,
      serviceItemsList: [],
      serviceSelectedList: [],
      useCounts: []
    };
  },
  computed: {
    dialogWidth() {
      return window.screen.width >= 768 ? '50%' : '95%';
    }
  },
  mounted() {
    const vm = this;
    vm.getServiceItemsList();
  },
  methods: {
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      vm.tableLoading = true;
      vm.$store
        .dispatch('serviceItems/getServiceList', {
          pageNum: 1,
          pageSize: 1000
        })
        .then(response => {
          vm.tableLoading = false;
          vm.serviceItemsList = response.records;
          // 回显数据值必须统一源 垃圾
          const showSelectList = [];
          vm.serviceItemsList.forEach(item => {
            for (let i = 0; i < vm.serviceInfos.length; i++) {
              if (vm.serviceInfos[i].id === item.id) {
                showSelectList.push(item);
              }
            }
          });
          vm.$nextTick(() => {
            showSelectList.forEach(row => {
              vm.$refs.serviceItemsTable.toggleRowSelection(row);
            });
          });
        });
    },
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
    },
    // 提交
    submit() {
      const vm = this;
      vm.$emit('submit', vm.serviceSelectedList);
    },
    handleSelectionChange(list) {
      const vm = this;
      // 服务项选中数据
      vm.serviceSelectedList = list;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
