<template>
  <div class="page-policy-manage-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="content">
                <div class="title-top content-detail">
                  基础信息<button
                    v-if="
                      policyDetails.state === '0' &&
                        pageAuthority.includes('cancel')
                    "
                    type="button"
                    class="btn-save fr"
                    @click="cancelOrder"
                  >
                    保单撤单
                  </button>
                </div>
                <el-form
                  ref="policyDetails"
                  :model="policyDetails"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="保单号">
                            <el-input
                              v-model="policyDetails.policyNo"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保单状态" prop="companyType">
                            <el-select
                              v-model="policyDetails.state"
                              class="search-input"
                              disabled
                              placeholder="请选择保单状态"
                            >
                              <el-option label="正常" value="0" />
                              <el-option label="已撤单" value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保险产品" class="link-box">
                            <el-input disabled />
                            <div
                              class="link"
                              @click="
                                lookDetails(policyDetails.insuranceProductId, 1)
                              "
                            >
                              {{ policyDetails.insuranceProductName }}
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保险公司" class="link-box">
                            <el-input disabled />
                            <div
                              class="link"
                              @click="
                                lookDetails(policyDetails.insuranceCompanyId, 2)
                              "
                            >
                              {{ policyDetails.insuranceCompanyName }}
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保障计划">
                            <el-input
                              v-model="policyDetails.insurancePlanName"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保司虚拟保单号">
                            <el-input
                              v-model="policyDetails.vcPolicyNo"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="供应链虚拟保单号">
                            <el-input
                              v-model="policyDetails.sysPolicyNo"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="投保人企业名称">
                            <el-input
                              v-model="policyDetails.companyName"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="统一信用代码">
                            <el-input
                              v-model="policyDetails.unifiedCreditCode"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="联系人">
                            <el-input
                              v-model="policyDetails.contactPerson"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="联系电话">
                            <el-input
                              v-model="policyDetails.contactMobile"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保单生效日期">
                            <el-date-picker
                              v-model="policyDetails.effectiveDate"
                              type="date"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保单终止日期">
                            <el-date-picker
                              v-model="policyDetails.expiryDate"
                              type="date"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <div v-show="activeName === '1'">
              <div class="title-top content-detail">服务列表</div>
              <el-table :data="policyDetails.serviceInfoVos">
                <el-table-column label="服务名称">
                  <template slot-scope="scope">
                    <span
                      class="table-link"
                      @click="lookService(scope.row.serviceInfoId)"
                      >{{ scope.row.serviceInfoName || '-' }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="服务截至日期">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.validTime | timeFormat('yyyy-MM-dd')
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="使用次数">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.useCount === -1
                        ? '无限次'
                        : `${scope.row.useCount}次`
                    }}</span>
                    <!-- <span>{{ scope.row.state === 1 ? '1次' : scope.row.useCount === -1  ? '无限次' : scope.row.useCount === null ? '无限次' : '1次' }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column label="使用状态" width="100">
                  <template slot-scope="scope">
                    <span
                      v-if="
                        scope.row.useCount === -1 && scope.row.useState === 1
                      "
                      class="primary pointer"
                      @click="
                        showModal(
                          scope.row.serviceInfoId,
                          scope.row.serviceName,
                        )
                      "
                      >查看</span
                    >
                    <!-- <span  class="primary pointer" @click="lookPage(scope.row)">查看</span> -->
                  </template>
                </el-table-column>
                <div slot="empty" class="empty-img" />
              </el-table>
            </div>
            <div v-show="activeName === '2'">
              <div class="title-top content-detail">被保人名单</div>
              <InsuredTable :id="id" />
            </div>
            <div v-show="activeName === '3'" class="log-items">
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
          </div>
        </div>
      </el-main>
      <ServiceDetailListModal
        v-if="isShow"
        :id="id"
        :is-show="isShow"
        :service-info-id="serviceInfoId"
        :service-name="serviceName"
        :type="2"
        @close="toggleModal"
      />
    </el-container>
  </div>
</template>
<script>
import {
  serviceUseStatus,
  policyStatus,
  operationType,
  menuType
} from '@/utils/enum';
import InsuredTable from './component/insuredTable';
import ServiceDetailListModal from './component/serviceDetailListModal';
export default {
  name: 'GroupPolicyDetails',
  components: {
    InsuredTable,
    ServiceDetailListModal
  },
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      id: '',
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'dtos'
      },
      policyDetails: {
        vos: []
      },
      logList: [],
      serviceUseStatus,
      policyStatus,
      operationType,
      menuType,
      isShow: false,
      serviceInfoId: '',
      serviceName: '',
      policyId: ''
    };
  },
  computed: {
    pageAuthority() {
      // 170301 个险保单
      return this.$store.state.user.pageAuthority['170302'];
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    vm.getPolicyDetails(vm.id);
    if (vm.id) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '服务列表' },
        { value: '2', name: '被保人名单' },
        { value: '3', name: '操作日志' }
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
      if (tab === '3') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '20'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 保单撤单
    cancelOrder() {
      const vm = this;
      vm.$confirm(
        '<strong>确认是否撤销保单，确认后不可修改</strong><br>(撤单后被保险人对应的服务权益将失效，服务项已经使用的不支持撤单)',
        '保单撤单',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        },
      ).then(() => {
        vm.$store
          .dispatch('groupPolicy/cancelPolicy', {
            id: vm.id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              vm.$router.push('/policyManage/groupPolicy');
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    },
    // 获取保单详情
    getPolicyDetails(id) {
      this.$store
        .dispatch('groupPolicy/getPolicyDetails', {
          id
        })
        .then(res => {
          this.policyDetails = res.obj;
        });
    },
    // 查看详情
    lookDetails(id, type) {
      let routeData = '';
      if (type === 1) {
        // 查看保险产品详情
        routeData = this.$router.resolve({
          path: `/insuranceManage/insuranceProducts/details/${id}/detail`
        });
      } else {
        // 查看服务包详情
        routeData = this.$router.resolve({
          path: `/insuranceManage/insuranceCompany/details/${id}/detail`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 查看服务项
    lookService(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 查看使用详情
    lookPage(item) {
      let routeData = '';
      // 查看预约记录详情
      if (item.serviceType === '1') {
        routeData = this.$router.resolve({
          path: `/operateManage/appointmentService/details/${item.reverseId}/${item.reverseType}`
        });
      } else if (item.serviceType === '2') {
        // 在线服务详情
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${item.serviceRecordId}`
        });
      } else {
        // 商品兑换
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.commodityId}/${item.commodityType}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 服务记录弹框切换显示
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 无限次服务项查看服务详情
    showModal(serviceInfoId, serviceName) {
      this.isShow = true;
      this.serviceInfoId = serviceInfoId;
      this.serviceName = serviceName;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-policy-manage-details {
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
        // padding: 24px 0;
        .add-certificates {
          margin-top: 24px;
        }
        .link-box {
          position: relative;
          .link {
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 2;
            color: #464668;
            text-decoration: underline;
            height: 36px;
            cursor: pointer;
            &:hover {
              color: #66b2ff;
              &::after {
                background-color: #66b2ff;
              }
            }
            &:active {
              color: #1c8cff;
              &::after {
                background-color: #1c8cff;
              }
            }
          }
        }
      }
    }
    .table-link {
      color: #464668;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #66b2ff;
        &::after {
          background-color: #66b2ff;
        }
      }
      &:active {
        color: #1c8cff;
        &::after {
          background-color: #1c8cff;
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
