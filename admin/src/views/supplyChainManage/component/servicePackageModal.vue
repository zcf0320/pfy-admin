<template>
  <div class="service-pack-select-modal">
    <el-dialog
      v-loading="loading"
      title="修改服务包"
      :visible="isShow"
      :width="dialogWidth"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="service-table">
        <el-table
          ref="serviceTable"
          v-loading="tableLoading"
          :data="servicePackageList"
          :row-key="
            row => {
              return row.id;
            }
          "
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            :reserve-selection="true"
          />
          <el-table-column label="ID" fixed="left">
            <template slot-scope="scope">
              <span>{{ scope.row.orderNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务包名称">
            <template slot-scope="scope">
              <span>{{ scope.row.packageName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务包介绍">
            <template slot-scope="scope">
              <span>{{ scope.row.packageDescribe || '-' }}</span>
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
  name: 'ServicePackageModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    serviceInfos: {
      type: Array,
      default: function() {
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
      servicePackageList: []
    };
  },
  computed: {
    dialogWidth() {
      return window.screen.width >= 768 ? '50%' : '95%';
    }
  },
  created() {
    const vm = this;
    vm.getServicePackageList();
  },
  methods: {
    // // 关闭弹框
    // closeModal() {
    //   this.$emit('closeModal', false);
    // },
    // // 提交
    // submit() {
    //   this.$emit('closeModal', false);
    // },
    handleSelectionChange(list) {
      const vm = this;
      vm.serviceSelectedList = list;
    },
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
          // 数据回显必须使用统一数据源 垃圾
          const showSelectList = [];
          vm.servicePackageList.forEach(item => {
            for (let i = 0; i < vm.serviceInfos.length; i++) {
              if (vm.serviceInfos[i].id === item.id) {
                showSelectList.push(item);
              }
            }
          });
          vm.$nextTick(() => {
            showSelectList.forEach(row => {
              vm.$refs.serviceTable.toggleRowSelection(row);
            });
          });
        })
        .catch(() => {
          vm.tableLoading = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
