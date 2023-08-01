<template>
  <div class="underwrite-details-page page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="投保信息" name="1">
              <el-form label-width="100px" label-position="top">
                <div class="content">
                  <div class="data-list">
                    <div class="data-name data-name-border">产品信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="方案">
                            <el-input
                              v-model="underwriteDetails.insureProductMsg.plan"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保额">
                            <el-input
                              v-model="
                                underwriteDetails.insureProductMsg.insuredFee
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="免赔额">
                            <el-input
                              v-model="
                                underwriteDetails.insureProductMsg.deductible
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保障期限">
                            <el-input
                              v-model="
                                underwriteDetails.insureProductMsg.insuredTime
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="生效日期">
                            <el-input
                              v-model="
                                underwriteDetails.insureProductMsg.validTime
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="data-name data-name-border">投保人信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="姓名">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPeople.policyHolderName
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="手机号">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPeople
                                  .policyHolderMobile
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="证件号码">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPeople
                                  .policyHolderIdCard
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="underwriteDetails.agentMsg.policyHolderEmail"
                          :span="12"
                        >
                          <el-form-item label="邮箱">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPeople
                                  .policyHolderEmail
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div v-if="underwriteDetails.insuredPerson" class="data-list">
                    <div class="data-name data-name-border">被保人信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="姓名">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredName
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="手机号">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredMobile
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="身份证号码">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredIdCard
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="省">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.provinceName
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="市">
                            <el-input
                              v-model="underwriteDetails.insuredPerson.cityName"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="年龄">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredAge
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="性别">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredSex
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="underwriteDetails.agentMsg.insuredEmail"
                          :span="12"
                        >
                          <el-form-item label="被保人邮箱">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredEmail
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="职业">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.insuredJob
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="住院津贴保险金">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.allowance
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="是否有社保">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson
                                  .hasSocialSecurity
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="与被保人关系">
                            <el-input
                              v-model="
                                underwriteDetails.insuredPerson.relationship
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="data-name data-name-border">开票信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="发票类型">
                            <el-input
                              v-model="
                                underwriteDetails.billMsg.customerBillType
                              "
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="客户类型">
                            <el-input
                              v-model="underwriteDetails.billMsg.customerType"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="纳税人类型">
                            <el-input
                              v-model="underwriteDetails.billMsg.taxpayerType"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="data-name data-name-border">代理人信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col
                          v-if="underwriteDetails.agentMsg.agentCompany"
                          :span="12"
                        >
                          <el-form-item label="所属分公司">
                            <el-input
                              v-model="underwriteDetails.agentMsg.agentCompany"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="underwriteDetails.agentMsg.agentMobile"
                          :span="12"
                        >
                          <el-form-item label="代理人手机号">
                            <el-input
                              v-model="underwriteDetails.agentMsg.agentMobile"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="underwriteDetails.agentMsg.agentName"
                          :span="12"
                        >
                          <el-form-item label="代理人姓名">
                            <el-input
                              v-model="underwriteDetails.agentMsg.agentName"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="data-name data-name-border">核保状态</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="状态">
                            <el-input
                              v-model="underwriteDetails.underwriteStatusText"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="健康告知" name="2">
              <div class="content">
                <div class="data-list">
                  <el-form label-width="100px" label-position="top">
                    <el-row :gutter="20">
                      <el-col
                        v-for="item in underwriteDetails.healthMsgs"
                        :key="item.label"
                        :span="12"
                      >
                        <el-form-item :label="item.label">
                          <el-input
                            v-model="item.value"
                            disabled
                            placeholder="暂无"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="id" label="操作日志" name="3">
              <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight">{{ item.mobile }}</span>
                  <span class="color-hight">{{ item.operation }}</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="underwriteDetails.state === 1" class="page-footer">
          <el-button type="primary" @click.native.prevent="toggleModal">
            审核
          </el-button>
        </div>
        <ReviewUnderwirteModal
          v-if="isShow"
          :id="id"
          :is-show="isShow"
          @save="save"
          @close="toggleModal"
        />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import ReviewUnderwirteModal from './component/reviewUnderwirteModal';
import { underwriteStatus } from '@/utils/enum';
export default {
  name: 'UnderwriteDetails',
  components: {
    ReviewUnderwirteModal
  },
  data() {
    return {
      tableLoading: false,
      activeName: '1',
      tabIndex: '0',
      logList: [],
      claimsDeatils: {
        policyNo: '暂无',
        insuranceCompany: '暂无',
        insuranTime: '暂无'
      },
      id: '',
      isShow: false,
      underwriteDetails: {
        insureProductMsg: {
          plan: '',
          deductible: '',
          insuredFee: '',
          insuredTime: '',
          valid_time: ''
        },
        agentMsg: {
          agentCompany: '',
          agentMobile: '',
          agentName: ''
        },
        billMsg: {
          customerBillType: '',
          customerType: '',
          taxpayerType: ''
        },
        healthMsgs: [],
        insuredPeople: {
          policyHolderEmail: '',
          policyHolderIdCard: '',
          policyHolderMobile: '',
          policyHolderName: ''
        },
        insuredPerson: {
          insuredName: ''
        }
      },
      underwriteStatus
    };
  },
  computed: {
    allCityList() {
      return this.$store.state.app.allCityList || [];
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    this.getUnderwriteDetails(vm.id);
    this.$store.dispatch('app/getAllCityList');
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab.index;
      if (tab.label === '操作日志') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '12'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 获取在线详情
    getUnderwriteDetails(id) {
      this.$store
        .dispatch('underwrite/getUnderwriteDetails', {
          id
        })
        .then(res => {
          this.underwriteDetails = res.obj;
          this.underwriteDetails.insureProductMsg.validTime = this.$moment(
            this.underwriteDetails.insureProductMsg.valid_time,
          ).format('YYYY/MM/DD HH:mm:ss');
          this.allCityList.forEach(city => {
            if (
              this.underwriteDetails.insuredPerson &&
              this.underwriteDetails.insuredPerson.provinceId === city.id
            ) {
              this.underwriteDetails.insuredPerson.provinceName = city.name;
              city.citys.forEach(item => {
                if (this.underwriteDetails.insuredPerson.cityId === item.id) {
                  this.underwriteDetails.insuredPerson.cityName = item.name;
                }
              });
            }
          });
          if (this.underwriteDetails.insuredPerson) {
            this.underwriteDetails.insuredPerson.hasSocialSecurity = this
              .underwriteDetails.insuredPerson.hasSocialSecurity
              ? '有社保'
              : '无社保';
          }
          this.underwriteDetails.underwriteStatusText = this.underwriteDetails
            .reason
            ? `${this.underwriteStatus[this.underwriteDetails.state]} (${
                this.underwriteDetails.reason
              })`
            : `${this.underwriteStatus[this.underwriteDetails.state]}`;
        });
    },
    // 切换审核弹框状态
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 审核
    save() {
      this.$router.push(`/insuranceManage/underwrite`);
    }
  }
};
</script>
<style lang="scss" scoped>
.underwrite-details-page {
  .details-content {
    padding-bottom: 60px;
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
        .data-img {
          width: 200px;
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .log-item {
      margin-top: 12px;
      display: flex;
      align-items: center;
      .circle {
        width: 10px;
        height: 10px;
        background-color: #2276ff;
        border-radius: 50%;
        margin-right: 6px;
      }
      .log-details {
        flex: 1;
        span {
          margin-right: 12px;
          color: #b9b9b9;
        }
        .color-hight {
          color: #282828;
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
