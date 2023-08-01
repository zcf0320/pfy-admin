<template>
  <div class="claims-details-page page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="1">
              <div class="content">
                <el-form label-width="100px" label-position="top">
                  <div class="data-list">
                    <div class="data-name data-name-border">基本数据</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="理赔ID">
                            <el-input v-model="claimsDeatils.id" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保单号">
                            <el-input
                              v-model="claimsDeatils.policyNo"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保险公司">
                            <el-input
                              v-model="claimsDeatils.insuranceCompany"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="赔偿责任">
                            <el-input
                              v-model="
                                claimsDeatils.guaranteeResponsibilityText
                              "
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保险有效期">
                            <el-input
                              v-model="claimsDeatils.insuranTime"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="被保险人">
                            <el-input
                              v-model="claimsDeatils.userName"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="被保险人身份证">
                            <el-input v-model="claimsDeatils.idCard" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="手机号码">
                            <el-input v-model="claimsDeatils.mobile" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="理赔状态">
                            <el-input
                              v-model="claimsDeatils.stateText"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="data-name data-name-border">银行信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="银行名称">
                            <el-input
                              v-model="claimsDeatils.bankName"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="银行卡号">
                            <el-input
                              v-model="claimsDeatils.bankCardNumber"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="补充资料" name="2">
              <div class="data-list">
                <div class="data-name data-name-border">病例</div>
                <div class="data-item">
                  <div class="data-img">
                    <img :src="claimsDeatils.medicalRecord" alt="" />
                  </div>
                </div>
              </div>
              <div class="data-list">
                <div class="data-name data-name-border">处方单</div>
                <div class="data-item">
                  <div class="data-img">
                    <img :src="claimsDeatils.prescription" alt="" />
                  </div>
                </div>
              </div>
              <div class="data-list">
                <div class="data-name data-name-border">发票</div>
                <div class="data-item">
                  <div class="data-img">
                    <img :src="claimsDeatils.invoice" alt="" />
                  </div>
                </div>
              </div>
              <div class="data-list">
                <div class="data-name data-name-border">其他资料</div>
                <div class="data-item">
                  <div class="data-img">
                    <img :src="claimsDeatils.otherMaterials" alt="" />
                  </div>
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
        <div v-if="claimsDeatils.state === 1" class="page-footer">
          <el-button type="primary" @click.native.prevent="toggleModal">
            审核
          </el-button>
        </div>
        <ReviewModal
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
import ReviewModal from './component/reviewModal';
import { reviewStatus } from '@/utils/enum';
export default {
  name: 'UserDetails',
  components: {
    ReviewModal
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
      reviewStatus,
      claimResponsibilityObj: {}
    };
  },
  computed: {},
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    this.getClaimsDetails(vm.id);
    // 赔偿责任
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'claimResponsibility'
      })
      .then(res => {
        res.obj.forEach(item => {
          this.claimResponsibilityObj[item.id] = item.name;
        });
      });
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
            type: '11'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 获取在线详情
    getClaimsDetails(id) {
      this.$store
        .dispatch('claims/getClaimsDetails', {
          id
        })
        .then(res => {
          for (const key in res.obj) {
            if (res.obj[key] !== null) {
              this.claimsDeatils[key] = res.obj[key];
            }
          }
          this.claimsDeatils.stateText = reviewStatus[this.claimsDeatils.state];
          this.claimsDeatils.guaranteeResponsibilityText = this.claimResponsibilityObj[
            this.claimsDeatils.guaranteeResponsibility
          ];
          this.claimsDeatils = Object.assign({}, res.obj, this.claimsDeatils);
        });
    },
    // 查看详情
    save() {
      this.$router.push(`/insuranceManage/customerClaims`);
    },
    // 切换审核弹框状态
    toggleModal() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="scss" scoped>
.claims-details-page {
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
