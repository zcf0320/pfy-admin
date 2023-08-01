<template>
  <div class="points-commodity-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="content">
                <div class="title-top content-detail">基础信息</div>
                <el-form
                  ref="baseForm"
                  :model="baseForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="display-flex">
                        <div class="flex">
                          <el-form-item label="服务项" style="width:100%">
                            <el-select
                              v-model="baseForm.serviceInfoId"
                              filterable
                              disabled
                              placeholder="请选择选择服务项"
                              class="search-input"
                              style="width:97%;marginRight:12px;"
                            >
                              <el-option
                                v-for="(item, index) in serviceItemsList"
                                :key="index"
                                :label="item.serviceInfoName"
                                :value="item.serviceInfoId"
                              />
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="fixed-width">
                          <button
                            type="button"
                            class="btn-save"
                            @click="lookServiceItem(baseForm.serviceInfoId)"
                          >
                            查看服务项
                          </button>
                        </div>
                      </div>
                    </el-col>
                    <el-col v-if="baseForm.serviceInfoId" :span="12">
                      <el-form-item label="供应商">
                        <el-input
                          v-model="baseForm.providerName"
                          disabled
                          placeholder="供应商名称"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="星币数量" prop="scorePrice">
                        <el-input
                          v-model="baseForm.scorePrice"
                          placeholder="10星币等于1元"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="使用次数" prop="useCount">
                        <el-select
                          v-model="baseForm.useCount"
                          placeholder="请选择使用次数"
                        >
                          <el-option
                            v-for="item in useCounts"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效期" prop="validateDate">
                        <el-select
                          v-model="baseForm.validateDate"
                          placeholder="请选择有效期"
                        >
                          <el-option
                            v-for="item in validateDates"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-show="false" :span="12">
                      <el-form-item label="销售状态" prop="saleStatus">
                        <el-select
                          v-model="baseForm.saleStatus"
                          placeholder="请选择销售状态"
                        >
                          <el-option
                            v-for="item in ucProducts"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div v-show="activeName === '1'">
              <div class="title-top content-detail">兑换记录</div>
              <PointsExchangeTable :id="id" />
            </div>
            <div v-show="activeName === '2'" class="log-items">
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
                  <!-- <span class="color-hight">{{item.creator}}</span> -->
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation] }}
                    {{ menuType[item.type] }}</span
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
      </el-main>
      <div class="page-footer">
        <el-button
          type="primary"
          :loading="tableLoading"
          @click.native.prevent="updatePointsCommodity('baseForm')"
          >保存</el-button
        >
        <!-- <el-button
          type="primary"
          :loading="tableLoading"
          plain
          @click.native.prevent="putOn('baseForm')"
          >{{ baseForm.saleStatus == 110 ? '下架' : '发布' }}</el-button
        > -->
      </div>
    </el-container>
  </div>
</template>
<script>
import PointsExchangeTable from './component/pointsExchangeTable';
import { operationType, menuType } from '../../utils/enum';
export default {
  name: 'PointsCommodityDetails',
  components: {
    PointsExchangeTable
  },
  data() {
    return {
      operationType,
      menuType,
      tableLoading: false,
      type: false,
      activeName: '0',
      tabIndex: '0',
      baseForm: {
        serviceInfoId: '',
        scorePrice: '',
        useCount: '',
        validateDate: '',
        saleStatus: ''
      },
      logList: [],
      ucProducts: [],
      serviceItemsList: [],
      useCounts: [
        {
          name: '一次',
          value: 1
        },
        {
          name: '二次',
          value: 2
        },
        {
          name: '三次',
          value: 3
        },
        {
          name: '四次',
          value: 4
        },
        {
          name: '五次',
          value: 5
        },
        {
          name: '无限次',
          value: -1
        }
      ],
      validateDates: [
        {
          name: '一年',
          value: 1
        },
        {
          name: '二年',
          value: 2
        },
        {
          name: '三年',
          value: 3
        },
        {
          name: '四年',
          value: 4
        },
        {
          name: '五年',
          value: 5
        },
        {
          name: '无限期',
          value: -1
        }
      ],
      rules: {
        scorePrice: [
          { required: true, message: '请输入积分价格', trigger: 'blur' }
        ],
        useCount: [
          { required: true, message: '请选择使用次数', trigger: 'change' }
        ],
        validateDate: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        saleStatus: [
          { required: true, message: '请选择销售状态', trigger: 'change' }
        ]
      },
      btns: []
    };
  },
  created() {
    const vm = this;
    vm.id = vm.$route.params.id;
    vm.tableLoading = true;
    // 获取销售状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'ucProduct'
      })
      .then(res => {
        vm.tableLoading = false;
        vm.ucProducts = res.obj || [];
      });
    vm.getServiceItemsList();
    if (vm.id) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '兑换记录' },
        { value: '2', name: '操作日志' }
      ];
    } else {
      vm.btns = [{ value: '0', name: '基础信息' }];
    }
  },
  methods: {
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      vm.$store
        .dispatch('serviceItems/getServiceListAndProvider', {
          commodityId: vm.id
        })
        .then(res => {
          vm.serviceItemsList = res.data || [];
          vm.getPointsCommodityDetails(vm.id);
        });
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '2') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '18'
          })
          .then(res => {
            vm.logList = res.data || [];
          });
      }
    },
    // 获取积分商品详情
    getPointsCommodityDetails(id) {
      this.$store
        .dispatch('pointsCommodity/getPointsCommodityDetails', {
          id
        })
        .then(res => {
          this.baseForm = res.obj;
          this.serviceItemsList.forEach(item => {
            if (res.obj.serviceInfoId === item.serviceInfoId) {
              this.baseForm.providerName = item.providerName;
            }
          });
        });
    },
    // 查看服务项
    lookServiceItem(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/details`
      });
      window.open(routeData.href, '_blank');
    },
    // 更新积分商品
    updatePointsCommodity(formName) {
      const vm = this;
      vm.tableLoading = true;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$store
            .dispatch('pointsCommodity/updatePointsCommodity', {
              ...vm.baseForm,
              validateDate: new Date(vm.baseForm.validateDate).getTime()
            })
            .then(res => {
              if (!res.code) {
                vm.$message.success('更新成功');
                vm.tableLoading = false;
                // vm.$router.push('/operateManage/pointsMall')
              }
            });
        }
      });
    },
    // 上下架积分商品
    putOn() {
      const vm = this;
      if (vm.baseForm.saleStatus === 110) {
        // 确认是否下架
        this.$confirm('确认要下架吗?', '请确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.tableLoading = true;
          this.$store
            .dispatch('pointsCommodity/changePointsState', {
              id: this.$route.params.id,
              saleStatus: 111
            })
            .then(res => {
              if (!res.code) {
                vm.$message.success('更新成功');
                vm.tableLoading = false;
                vm.$router.push('/operateManage/pointsMall');
              }
            });
        });
      } else {
        vm.tableLoading = true;
        this.$store
          .dispatch('pointsCommodity/changePointsState', {
            id: this.$route.params.id,
            saleStatus: 110
          })
          .then(res => {
            if (!res.code) {
              vm.$message.success('更新成功');
              vm.tableLoading = false;
              vm.$router.push('/operateManage/pointsMall');
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.points-commodity-details {
  .btn-group {
    border-bottom: 1px solid #e8e8e8;
  }
  .details-content {
    padding-bottom: 60px;
    .display-flex {
      width: 100%;
      display: flex;
      align-items: center;
      .flex {
        flex: 1;
      }
      .fixed-width {
        width: 120px;
        margin-bottom: 10px;
      }
    }
    .data-list {
      padding: 12px 0px 0;
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
        padding: 24px 0;
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
            color: #3b9fff;
            text-decoration: underline;
            height: 36px;
            cursor: pointer;
          }
        }
      }
    }
    .table-link {
      color: #3b9fff;
      text-decoration: underline;
      cursor: pointer;
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
