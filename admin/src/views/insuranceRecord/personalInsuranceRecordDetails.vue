<template>
  <div class="personal-insurance-record-details-page page-form modal-form">
    <el-container>
      <el-main :class="{ 'no-pression': details.state === 0 }">
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick"/>
          <div class="scroll-table">
            <div v-show="activeName == '0'">
              <div class="content">
                <div class="data-list">
                  <div class="detail-table-title">
                    基础资料
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保ID:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.productMsg.productId }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        保险产品:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.productMsg.productName }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        保障计划:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.planMsg.planName }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                      </div>
                      <div class="detail-table-item-value">
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-title">
                    投保人信息
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保人:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.policyholderMsg.policyholderName }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        投保人证件类型:
                      </div>
                      <div class="detail-table-item-value">
                        {{
                          $enums['certificateType'][
                            details.policyholderMsg.certificateType
                          ]
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保人身份证:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.policyholderMsg.policyholderCodeNumber }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        投保人联系方式:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.policyholderMsg.policyholdermobile }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-title">
                    被保人信息
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        被保人:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.insuredName }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        被保人证件类型:
                      </div>
                      <div class="detail-table-item-value">
                        {{
                          $enums['certificateType'][
                            details.insuredMsg.insuredCertificateType
                          ]
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        被保人身份证:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.insuredCodeNumber }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        被保人联系方式:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.insuredMobile }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        有无社保:
                      </div>
                      <div class="detail-table-item-value">
                        {{
                          details.insuredMsg.hasSocialSecurity == '0'
                            ? '无社保'
                            : '有社保'
                        }}
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div class="detail-table-item-label">
                        投保区域:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.provinceName
                        }}{{ details.insuredMsg.cityName }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        投保份数:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.numberOfInsured }}份
                      </div>
                    </div>
                    <div class="detail-table-item-right">
                      <div :span="16" class="detail-table-item-label">
                        通讯地址:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.insuredMailingAddress }}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-item">
                    <div class="detail-table-item-left">
                      <div class="detail-table-item-label">
                        职业:
                      </div>
                      <div class="detail-table-item-value">
                        {{ details.insuredMsg.insuredJob }}
                      </div>
                    </div>
                      <div class="detail-table-item-right">
                      <div :span="16" class="detail-table-item-label">
                      </div>
                      <div class="detail-table-item-value">
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="$isNotEmpty(details.insuredMsg.files)"
                    class="detail-table-item"
                  >
                    <div
                      v-for="item in details.insuredMsg.files"
                      :key="item.fileName"
                      class="detail-table-item-files"
                    >
                      <div class="detail-table-item-label">
                        {{ item.fileName }}:
                      </div>
                      <div
                        v-if="$isNotEmpty(details.insuredMsg.files)"
                        class="detail-table-item-value"
                      >
                        <div v-if="$isNotEmpty(item.url)" class="flex">
                          <div
                            v-for="url in item.url.split(',')"
                            :key="url"
                            class="mt-24 mr-24 mb-24"
                          >
                            <el-image
                              style="width: 110px; height: 110px"
                              :src="item.url"
                              :alt="url"
                              @click="showImg([item.url])"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="detail-table-title">
                    受益人信息
                  </div>
                  <el-table :data="details.beneficiaryMsgs" class="table-large"
                  :stripe="true"
                  >
                        <el-table-column label="受益人姓名" width="120">
                      <template slot-scope="{ row }">
                        <span>{{ row.name || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="与被保人关系" width="110">
                      <template slot-scope="{ row }">
                        <span>{{
                          $enums['relationship'][row.relationshipBetweenInsured]
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型" width="110">
                      <template slot-scope="{ row }">
                        <span>{{
                          $enums['certificateType'][row.cardType]
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件号码">
                      <template slot-scope="{ row }">
                        <span>{{ row.codeNumber }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="受益人手机号">
                      <template slot-scope="{ row }">
                        <span>{{ row.mobile }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="受益比列" width="80">
                      <template slot-scope="{ row }">
                        <span>{{ row.benefitRatio + '%' }}</span>
                      </template>
                    </el-table-column>
                       <div  slot="empty" class="empty-img"/>
                  </el-table>
                  <div
                    v-if="
                      details.healthNoticeQuestionnaire &&
                        details.healthNoticeQuestionnaire.healthNoticeType === 1
                    "
                  >
                    <div class="detail-table-title">
                      健康告知问卷
                    </div>
                    <div
                      v-if="$isNotEmpty(details.healthNoticeQuestionnaire)"
                      class="tpl-content"
                    >
                      <div class="tpl-label">
                        {{
                          details.healthNoticeQuestionnaire.questionnaireName
                        }}
                      </div>
                      <div class="flex ml-24">
                        <div class="tpl-label"/>
                        <div>
                          <div
                            v-for="(item, index) in details
                              .healthNoticeQuestionnaire.questionnaireVOList"
                            :key="index"
                            class="mb-20"
                          >
                            <div class="mb-10">
                              问题{{ index + 1 }}({{
                                $enums['questionType'][item.questionType]
                              }}):{{ item.question }}
                            </div>
                            <div class="mb-10">
                              {{
                                item.questionType === '3'
                                  ? '填写内容:'
                                  : '选项:'
                              }}
                              <span>{{ item.answer }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      details.healthNoticeQuestionnaire &&
                        details.healthNoticeQuestionnaire.healthNoticeType === 0
                    "
                  >
                    <div class="detail-table-title">
                      普通健康告知
                    </div>
                    <div class="detail-table-item">
                      <div class="detail-table-item-left">
                        <div class="detail-table-item-label">文件名称:</div>
                        <div class="detail-table-item-value">
                          <span>{{
                            details.healthNoticeQuestionnaire.questionnaireName
                          }}</span>
                          <a
                            download
                            :href="
                              details.healthNoticeQuestionnaire.healthFileUrl
                            "
                            class="link-skip ml-10"
                            >点击下载</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="detail-table-title">
                      核保详情
                    </div>
                    <div>
                      <div class="detail-table-item">
                        <div class="detail-table-item-left">
                          <div class="detail-table-item-label">
                            审核状态:
                          </div>
                          <div class="detail-table-item-value">
                            {{
                              details.state != 0
                                ? $enums['underwriteStatus'][details.state]
                                : '待人工核保'
                            }}
                          </div>
                        </div>
                      </div>

                      <div v-if="details.state != 0 && details.state != 2">
                        <div
                          v-if="details.state != 2"
                          class="detail-table-item"
                        >
                          <div class="detail-table-item-left">
                            <div class="detail-table-item-label">回执:</div>
                            <div class="detail-table-item-value">
                              <div style="padding:20px 0">
                                <el-image
                                  v-for="item in imgUrl"
                                  :key="item"
                                  style="width: 60px; height: 60px"
                                  :src="item"
                                  class="mr-24"
                                  @click="showImg([item])"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            v-for="item in fileList"
                            :key="item.id"
                            class="mt-12"
                          >
                            <div class="fc-grey mb-12">{{ item.name }}</div>
                          </div>
                        </div>
                        <div
                          v-if="details.state === 3"
                          class="detail-table-item"
                        >
                          <div class="detail-table-item-left">
                            <div class="detail-table-item-label">加费金额:</div>
                            <div class="detail-table-item-value">
                              {{ details.addPrice }}
                              <span class="ml-10">元</span>
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="details.state != 2 && details.state != 1"
                          class="detail-table-item"
                        >
                          <div class="detail-table-item-left">
                            <div class="detail-table-item-label">
                              {{
                                details.state === 3 ? '加费说明:' : '除外说明:'
                              }}
                            </div>
                            <div class="detail-table-item-value">
                              {{ details.successReviewRemark }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="details.state === 2" class="detail-table-item">
                        <div class="detail-table-item-left">
                          <div class="detail-table-item-label">不通过原因:</div>
                          <div class="detail-table-item-value">
                            <span
                              v-for="item in details.failReviewReason"
                              :key="item"
                              >{{ item }};</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName == '1'" class="log-items">
              <div v-if="logList.length>0">
                  <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle"/>
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight">{{ item.mobile }}</span>
                  <span class="color-hight">{{
                    item.operation === 'reviewd' ? '审核通过' : '审核不通过'
                  }}</span>
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

        <div v-if="details.state === 0" class="page-footer">
          <div>
            <el-button
              size="small"
              class="btn-border-blue"
              type="default"
              border
              @click="
                () => {
                  isReject = true;
                  dialog.visible = true;
                }
              "
              >审核不通过</el-button>
            <el-button
              type="primary"
              size="small"
              class="ml-24"
              @click="
                () => {
                  isReject = false;
                  dialog.visible = true;
                }
              "
            >
              审核通过
            </el-button>
          </div>
        </div>
        <ReviewDialog
          :id="id"
          :visible.sync="dialog.visible"
          :is-reject="isReject"
          @saved="getRecordDetails(id)"
        />
      </el-main>
      <elImageViewer
        v-if="showViewer"
        :on-close="showViewerClose"
        :url-list="urlList"
      />
    </el-container>
  </div>
</template>
<script>
import ReviewDialog from './component/reviewDialog';
import { underwriteStatus } from '@/utils/enum';
export default {
  name: 'PersonalInsuranceRecordDetails',
  components: {
    ReviewDialog
  },
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      tabIndex: '0',
      logList: [],
      id: '',
      isShow: false,
      isReject: false,
      details: {
        productMsg: {},
        policyholderMsg: {}, // /投保人信息
        beneficiaryMsgs: [], // 受益人信息
        failReviewReason: '',
        healthNoticeQuestionnaire: [],
        passFileUrl: [],
        insuredMsg: {}, //	被保人信息
        recordId: null,
        planMsg: {}
      },
      underwriteStatus,
      btns: [],
      showViewer: false,
      urlList: []
    };
  },
  computed: {
    allCityList() {
      return this.$store.state.app.allCityList || [];
    },
    /**
     * 图片
     */
    imgUrl() {
      const arr = [];
      if (this.$isNotEmpty(this.details.passFileUrl)) {
        this.details.passFileUrl.forEach(item => {
          if (item.type === 1) {
            arr.push(item.url);
          }
        });
      }
      return arr;
    },
    /**
     * 文件
     */
    fileList() {
      return this.details.passFileUrl.filter(item => item.type !== 1);
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    this.getRecordDetails(vm.id);
    this.$store.dispatch('app/getAllCityList');
    if (this.id) {
      this.btns = [
        { value: '0', name: '投保信息' },
        { value: '1', name: '操作日志' }
      ];
    } else {
      this.btns = [{ value: '0', name: '投保信息' }];
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
            type: '17'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      } else {
        this.getRecordDetails(vm.id);
      }
    },
    // 获取个人投保详情
    getRecordDetails(id) {
      this.$store
        .dispatch('personalInsuranceRecord/getRecordDetails', id)
        .then(res => {
          res.data.insuredMsg = res.data.insuredMsg || {};
          res.passFileUrl = res.passFileUrl || [];
          this.details = res.data;
        });
    },
    // 切换审核弹框状态
    toggleModal() {
      this.isShow = !this.isShow;
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
    // // 设置表格行的样式
    //   tableRowStyle() {
    //     return 'border: 1px dashed #ccc;background:#FAFCFC;';
    //   },
    //   // 设置表头行的样式
    //   tableHeaderColor() {
    //     return ' border: 1px dashed #ccc;';
    //   }
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  box-sizing: border-box;
  &.no-pression {
    padding-bottom: 30px;
  }
  padding-bottom: 0;
  /deep/ .el-table{
    width: 95%;
    margin: 32px;
    // padding: 32px;
  }

}
.content {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
}
.tpl-content {
  padding: 24px 24px 0px;
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  border-radius: 4px;
  border: 1px solid #ebedf2;
  max-height: 325px;
  overflow: auto;
  color: #464668;
  .tpl-label {
    margin-bottom: 24px;
  }
}
</style>
