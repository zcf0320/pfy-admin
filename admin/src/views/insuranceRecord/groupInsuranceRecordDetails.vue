<template>
  <div class="group-insurance-record-details-page page-form modal-form">
    <el-container>
      <el-main
        :class="{
          'no-pression': groupInsuranceDetails.state === 0 && tabIndex === '0',
        }"
      >
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName == '0'">
              <div class="content groupInsDetails-table">
                <div class="data-list">
                  <div class="detail-table-title">基础资料</div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保ID:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.id }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        保险产品:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.insuranceProductName }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保人企业名称:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.companyName }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        统一信用代码:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.identificationNumber }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        证件类型:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.type }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        资质证明文件:
                      </div>
                      <div class="detail-table-item-value">
                        <div class="data-img">
                          <img
                            v-for="(item, index) in groupInsuranceDetails
                              .baseMsg.qualificationDocumentsImgs"
                            :key="index"
                            :src="item"
                            alt=""
                            @click="
                              showImg(
                                groupInsuranceDetails.baseMsg
                                  .qualificationDocumentsImgs,
                              )
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        办公电话:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.officePhone }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        投保人数:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.insuredNumber }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        联系人:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.contactPerson }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        联系电话:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.contactMobile }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        联系人电子邮箱:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.baseMsg.contactEmail }}
                      </div>
                    </div>
                      <div class="detail-table-item-right">
                      <div class="detail-table-item-label"></div>
                      <div class="detail-table-item-value" style="borderLeft:none">
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-title">计划信息</div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        保障计划:
                      </div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.planMsg.planName }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">投保金额:</div>
                      <div class="detail-table-item-value">
                        {{ groupInsuranceDetails.planMsg.price }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName == '1'">
              <div class="content">
                <div class="data-list">
                  <InsuredPeoplesTable :id="id" />
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
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight">{{ item.mobile }}</span>
                  <span class="color-hight">{{ item.operation }}</span>
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
        <div
          v-if="groupInsuranceDetails.state === 0 && tabIndex === '0'"
          class="page-footer"
        >
          <button
            v-if="pageAuthority.includes('review')"
            type="button"
            class="btn-save"
            @click="toggleModal"
          >
            审核
          </button>
        </div>
        <ReviewModal
          v-if="isShow"
          :is-show="isShow"
          @review="review"
          @close="toggleModal"
        />
        <elImageViewer
          v-if="showViewer"
          :on-close="showViewerClose"
          :url-list="urlList"
        />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import ReviewModal from './component/reviewModal';
import InsuredPeoplesTable from './component/insuredPeoplesTable';
import { underwriteStatus } from '@/utils/enum';
export default {
  name: 'GroupInsuranceRecordDetails',
  components: {
    ReviewModal,
    InsuredPeoplesTable
  },
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      tabIndex: '0',
      logList: [],
      id: '',
      isShow: false,
      groupInsuranceDetails: {
        baseMsg: {
          companyName: '',
          contactEmail: '',
          contactMobile: '',
          contactPerson: '',
          id: '',
          identificationNumber: '',
          insuranceProductId: '',
          insuranceProductName: '',
          insuredNumber: '',
          officePhone: '',
          qualificationDocumentsImgs: '',
          type: '0'
        },
        planMsg: {
          planName: '',
          price: 0
        }
      },
      underwriteStatus,
      btns: [],
      showViewer: false,
      urlList: []
    };
  },
  computed: {
    pageAuthority() {
      // 170202 团险投保记录
      return this.$store.state.user.pageAuthority['170202'];
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    this.getRecordDetails(vm.id);
    if (this.id) {
      this.btns = [
        { value: '0', name: '投保信息' },
        { value: '1', name: '被保人名单' },
        { value: '2', name: '操作日志' }
      ];
    } else {
      this.btns = [
        { value: '0', name: '投保信息' },
        { value: '1', name: '被保人名单' }
      ];
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
            type: '12'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 获取团险记录详情
    getRecordDetails(id) {
      this.$store
        .dispatch('groupInsuranceRecord/getRecordDetails', {
          id
        })
        .then(res => {
          this.groupInsuranceDetails = res.obj;
        });
    },
    // 切换审核弹框状态
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 审核
    review(reasonId) {
      const vm = this;
      vm.$store
        .dispatch('groupInsuranceRecord/reviewRecord', {
          id: vm.id,
          reasonId
        })
        .then(() => {
          vm.$message.success('审核成功');
          this.$router.push(`/insuranceRecord/groupInsuranceRecord`);
        });
    },
    // 预览图片
    showImg(urls) {
      this.urlList = urls;
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.group-insurance-record-details-page {
  .details-content {
    .groupInsDetails-table {
      width: 99%;
      background: #ffffff;
      box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
      border-radius: 4px;
      margin: 24px auto 0;
    }
    .data-list {
      .data-img {
        padding: 20px 0;
        width: 100%;

        display: flex;
        img {
          width: 200px;
          height: 150px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
