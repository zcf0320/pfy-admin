<template>
  <div class="commodity-exchange-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="content">
                <el-form
                  ref="exchangeDetails"
                  :model="exchangeDetails"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="title-top content-detail">基础数据</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="ID">
                            <el-input
                              v-model="exchangeDetails.baseMsg.id"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务项">
                            <el-input
                              v-model="exchangeDetails.baseMsg.serviceInfoName"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item v-if="type" label="创建时间">
                            <el-input
                              v-model="exchangeDetails.baseMsg.createTimeStr"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item v-if="type" label="更新时间">
                            <el-input
                              v-model="exchangeDetails.baseMsg.updateTimeStr"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item v-if="type" label="订单状态">
                            <el-input
                            style="width:49%"
                              v-model="exchangeDetails.baseMsg.statusStr"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                  <div
                    v-if="exchangeDetails.reivewedTypeId === 97"
                    class="data-list"
                  >
                    <div class="title-top content-detail">产品信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="商品规格">
                            <el-input
                             style="width:49%"
                              v-model="exchangeDetails.productSpecifications"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                  <div v-if="exchangeDetails.serviceMsg" class="data-list">
                    <div class="title-top content-detail">
                      {{
                        exchangeDetails.reivewedTypeId === 97
                          ? '收货地址'
                          : '服务信息'
                      }}
                    </div>
                    <div
                      v-if="exchangeDetails.reivewedTypeId === 97"
                      class="data-item"
                    >
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="收货人">
                            <el-input
                              v-model="
                                exchangeDetails.serviceMsg.physicalProdMsg
                                  .receiver
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="联系方式">
                            <el-input
                              v-model="
                                exchangeDetails.serviceMsg.physicalProdMsg
                                  .mobile
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="收货地址">
                            <el-input
                              v-model="
                                exchangeDetails.serviceMsg.physicalProdMsg
                                  .address
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <div class="logistics">
                            <div class="express">
                              <el-form-item label="物流信息">
                                <el-select
                                  v-model="
                                    exchangeDetails.serviceMsg.physicalProdMsg
                                      .logisticsCompany
                                  "
                                  filterable
                                  placeholder="请选择快递公司"
                                >
                                  <el-option
                                    v-for="item in courieCompanyList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  />
                                </el-select>
                              </el-form-item>
                            </div>
                            <div class="courier-number ml-24">
                              <el-form-item label="" class="mt-24">
                                <el-input
                                  v-model="
                                    exchangeDetails.serviceMsg.physicalProdMsg
                                      .number
                                  "
                                  placeholder="请输入快递单号"
                                />
                              </el-form-item>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="供应商券码">
                            <el-input
                              v-model="
                                exchangeDetails.serviceMsg.virtualProdMsg.code
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="有效期">
                            <el-date-picker
                              v-model="
                                exchangeDetails.serviceMsg.virtualProdMsg
                                  .validTime
                              "
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
            <div v-show="activeName === '1'" class="log-items">
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
        <div v-if="type" class="page-footer">
          <button type="button" class="btn-save" @click="updateRemark">
            保存
          </button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { operationType, menuType } from '@/utils/enum';
export default {
  name: 'CommodityExchangeDetails',
  data() {
    return {
      tableLoading: false,
      type: false,
      id: '',
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      exchangeDetails: {
        baseMsg: {
          id: '',
          serviceInfoName: ''
        }
      },
      logList: [],
      courieCompanyList: [],
      operationType,
      menuType,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ]
    };
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    vm.type = vm.$route.params.types === '1' ? true : false;
    vm.getExchangeDetails(vm.id);
    // 实物商品兑换获取物流公司名单
    if (vm.type) {
      vm.getCourierCompanyList();
    }
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '1') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '14'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 获取商品兑换详情
    getExchangeDetails(id) {
      if (!this.type) {
        this.$store
          .dispatch('commodityExchange/virtualDetail', {
            id
          })
          .then(res => {
            this.exchangeDetails = res.obj;
          });
      } else {
        this.$store
          .dispatch('commodityExchange/physicalDetail', {
            id
          })
          .then(res => {
            if (res.obj) {
              res.obj.serviceMsg = res.obj.serviceMsg || {};
              res.obj.baseMsg.createTimeStr = this.$timeFormat(
                res.obj.baseMsg.createTime,
              );
              res.obj.baseMsg.updateTimeStr = this.$timeFormat(
                res.obj.baseMsg.updateTime,
              );
              res.obj.baseMsg.statusStr = this.$enums['logisticsState'][
                res.obj.baseMsg.state
              ];
              res.obj.serviceMsg.virtualProdMsg =
                res.obj.serviceMsg.virtualProdMsg || {};
              this.exchangeDetails = res.obj;
            }
          });
      }
    },
    // 获取物流公司名单
    getCourierCompanyList() {
      this.$store
        .dispatch('commodityExchange/getCourierCompanyList')
        .then(res => {
          this.courieCompanyList = res.data || [];
        });
    },
    // 更新配送地址
    updateRemark() {
      const vm = this;
      this.$store
        .dispatch('commodityExchange/updateLogistics', {
          id: vm.id,
          courieCompany:
            vm.exchangeDetails.serviceMsg.physicalProdMsg.logisticsCompany,
          shipmentCode: vm.exchangeDetails.serviceMsg.physicalProdMsg.number
        })
        .then(() => {
          vm.$message.success('更新物流信息成功');
          // this.$router.push(`/operateManage/commodityExchange`)
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.commodity-exchange-details {
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
        .logistics {
          display: flex;
          align-items: center;
          .express {
            width: 30%;
          }
          .courier-number {
            flex: 1;
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
