<template>
  <div class="page-active-code-details page-form modal-form">
    <el-container>
      <el-main>
        <el-form
          ref="baseForm"
          :model="baseForm"
          label-width="100px"
          label-position="top"
          style="height: 100%"
        >
          <div class="details-content flex-col">
            <Tab :btns="btns" @change="handleClick" />
            <div class="scroll-table">
              <div v-show="activeName == '0'">
                <div class="title-top content-detail">
                  基础信息<button
                    v-if="baseForm.codeStatus === '0'"
                    type="button"
                    class="btn-save fr"
                    @click="cancelActiveCode"
                  >
                    作废
                  </button>
                </div>
                <div class="content">
                  <div class="data-list">
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="激活码">
                            <el-input v-model="baseForm.activeCode" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="批次号">
                            <el-input v-model="baseForm.codeBatch" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务包">
                            <el-input
                              v-model="baseForm.servicePackageInfoName"
                              disabled
                            />
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item label="有效期至" disabled>
                            <el-date-picker
                              v-model="baseForm.codeValidTime"
                              type="date"
                              placeholder="选择日期"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="状态">
                            <el-input
                              v-model="baseForm.codeStatusText"
                              disabled
                              placeholder="请输入注册地址"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="activeName == '1'">
                <div class="title-top content-detail">批次信息</div>
                <div class="content">
                  <div class="data-list">
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="批次号">
                            <el-input
                              v-model="baseForm.batchMsg.codeBatch"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="渠道名称">
                            <el-input
                              v-model="baseForm.batchMsg.chanelName"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="批次券码总数">
                            <el-input
                              v-model="baseForm.batchMsg.batchCount"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="备注">
                            <el-input
                              v-model="baseForm.batchMsg.remark"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col v-if="baseForm.customerCompanyName" :span="12">
                          <el-form-item label="关联企业">
                            <el-input
                              v-model="baseForm.customerCompanyName"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="activeName == '2'" class="log-items">
                <div v-if="logList.length>0">
                   <div
                  v-for="item in logList"
                  :key="item.createTime"
                  class="log-item"
                >
                  <div class="circle" />
                  <div class="log-details">
                    <span class="create-time">{{
                      $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    }}</span>
                    <span class="color-hight">{{ item.creator }}</span>
                    <span class="color-hight">{{ item.name }}</span>
                    <span class="color-hight"
                      >{{ operationType[item.operation]
                      }}{{ menuType[item.type] }}</span
                    >
                  </div>
                </div>
                </div>
                 <div v-else>
                    <!-- 暂无记录 -->
                    <div slot="empty" class="empty-img" />
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  activeCodeStatus,
  appointmentType,
  operationType,
  menuType
} from '@/utils/enum';
export default {
  name: 'ActiveCodeDetails',
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      id: '',
      modalShow: false,
      tabIndex: '0',
      baseForm: {
        activeCode: '',
        codeBatch: '',
        codeStatus: '',
        codeType: '',
        codeValidTime: '',
        servicePackageInfoName: '',
        codeStatusText: '',
        batchMsg: {
          codeBatch: '',
          chanelName: '',
          batchCount: '',
          remark: ''
        },
        customerCompanyName: ''
      },
      logList: [],
      activeCodeStatus,
      operationType,
      menuType,
      btns: []
    };
  },
  computed: {},
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    vm.getActiveCodeDetails(vm.id);
    if (vm.id) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '批次信息' },
        { value: '2', name: '操作日志' }
      ];
    } else {
      vm.btns = [{ value: '0', name: '基础信息' }];
    }
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '2') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '7'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 作废
    cancelActiveCode() {
      const vm = this;
      vm.$confirm('是否确认作废该券码？确认后不可恢复', '券码作废', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('activeCodeManage/cancelActiveCode', {
            id: vm.id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.$router.go(-1);
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    },
    // 获取激活码详情
    getActiveCodeDetails(id) {
      this.$store
        .dispatch('activeCodeManage/getActiveCodeDetails', {
          id
        })
        .then(res => {
          this.baseForm = res.obj;
          this.baseForm.codeStatusText = activeCodeStatus[res.obj.codeStatus];
          this.baseForm.codeType = appointmentType[res.obj.codeType];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-active-code-details {
  /deep/ .el-row::after {
    content: none;
  }
  .details-content {
    .data-list {
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item {
        .add-certificates {
          margin-top: 24px;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
