<template>
  <div class="page-user-manage-details page-form modal-form">
    <el-container>
      <el-main>
        <el-form
          ref="userDetails"
          :model="userDetails"
          label-width="100px"
          label-position="top"
        >
          <div class="details-content flex-col">
            <Tab :btns="btns" :current-key="currentIndex" @change="btnChange" />
            <div class="scroll-table">
              <div v-if="activeName === '1'">
                <div class="content">
                  <div class="data-list">
                    <div class="title-top content-detail">基础数据</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="用户ID">
                            <el-input
                              v-model="userDetails.id"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="姓名">
                            <el-input
                              v-model="userDetails.name"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="手机号">
                            <el-input
                              v-model="userDetails.mobile"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="身份证号">
                            <el-input
                              v-model="userDetails.idCard"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="性别">
                            <el-input
                              v-model="userDetails.sex"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="年龄">
                            <el-input
                              v-model="userDetails.age"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="账号状态">
                            <el-input
                            style="width:49%"
                              :value="userDetails.logout ? '注销' : '正常'"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="title-top content-detail"
                    >工作信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="所在公司" prop="id">
                            <el-input
                              v-model="userDetails.company"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="职位" prop="companyName">
                            <el-input
                              v-model="userDetails.position"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="title-top content-detail">星币信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="星币">
                            <el-input
                              v-model="userDetails.userScore"
                              disabled
                              placeholder="暂无"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="activeName === '2'" class="h-full">
                <div v-if="submitState === 0">
                  <div v-if="isList">
                    <div class="title-top content-detail">服务列表</div>
                    <el-table :data="serviceInfoVoList">
                      <el-table-column label="服务名称">
                        <template slot-scope="scope">
                          <div
                            v-if="$isNotEmpty(scope.row.serviceName)"
                            class="link-skip"
                            @click="lookService(scope.row.serviceInfoId)"
                          >
                            {{ scope.row.serviceName }}
                          </div>
                          <div v-else>-</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务来源">
                        <template slot-scope="{ row }">
                          <div
                            :class="{
                              'link-skip': !!row.serviceSource.serviceSourceId,
                              text: true,
                            }"
                            @click="linkSkip(row.serviceSource)"
                          >
                            {{
                              row.serviceSource.serviceRegin
                                ? '【' +
                                  serviceRegionState[
                                    Object.keys(
                                      row.serviceSource.serviceRegin,
                                    )[0]
                                  ] +
                                  '】'
                                : '-'
                            }}{{ row.serviceSource.serviceSourceId }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="生效时间">
                        <template slot-scope="{ row }">
                          <span>
                            {{
                              row.activeCodeCreateTime
                                | timeFormat('yyyy-MM-dd')
                            }}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务截止日期">
                        <template slot-scope="{ row }">
                          <span>
                            {{ row.endTime | timeFormat('yyyy-MM-dd') }}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用次数">
                        <template slot-scope="{ row }">
                          <span>
                            {{
                              row.useCount === -1
                                ? '无限次'
                                : `${row.useCount}次`
                            }}
                          </span>
                          <!-- <span>{{ scope.row.state === 1 ? '1次' : scope.row.useCount === -1  ? '无限次' : scope.row.useCount === null ? '无限次' : '1次' }}</span> -->
                        </template>
                      </el-table-column>
                      <el-table-column label="使用状态">
                        <template slot-scope="{ row }">
                          <div
                            :class="[
                              'label-text',
                              $enums['serviceUseClass'][row.state],
                            ]"
                          >
                            {{ serviceUseStatus[row.state] }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="160">
                        <template slot-scope="{ row }">
                          <div class="flex-box">
                            <span
                              v-if="
                                row.state === 0 &&
                                  (row.serviceType == '1' ||
                                    row.serviceType == '3') &&
                                  pageAuthority.includes('toUse')
                              "
                              class="icon-look"
                              @click="toDetail(row)"
                            />
                            <span
                              v-if="
                                row.useCount === -1 &&
                                  row.state === 1 &&
                                  pageAuthority.includes('toUse')
                              "
                              class="icon-detail"
                              @click="
                                showModal(row.serviceInfoId, row.serviceName)
                              "
                            />
                            <span
                              v-if="
                                row.useCount !== -1 &&
                                  row.state === 1 &&
                                  pageAuthority.includes('toUse')
                              "
                              class="icon-detail"
                              @click="lookPage(row)"
                            />
                            <span
                              v-if="row.expireTime > 0"
                              class="fc-red fs-14 ml-14"
                            >
                              倒计时：{{
                                getDialysisDurationShow(row.expireTime)
                              }}
                            </span>
                          </div>
                        </template>
                      </el-table-column>
                      <div slot="empty" class="empty-img" />
                    </el-table>
                  </div>
                  <div v-else>
                    <UseDetail
                      :id="serviceRecordId"
                      ref="useDetail"
                      :mobile="userDetails.mobile"
                      :service-info-id="serviceInfoId"
                      :submit-state.sync="submitState"
                      :appointment-id.sync="appointmentId"
                      :msg.sync="msg"
                    />
                  </div>
                </div>
                <div v-else class="flex-center h-full">
                  <div v-if="submitState == 1" class="h-full">
                    <SubmitSuccess
                      :appointment-id="appointmentId"
                      @back="backList"
                    />
                  </div>
                  <div v-if="submitState == 2">
                    <SubmitErr :msg="msg" @back="backList" />
                  </div>
                </div>
              </div>
              <div v-if="activeName === '3'">
                <div class="title-top content-detail">保单列表</div>
                <el-table
                  :data="userDetails.insureVoList"
                  border
                  :span-method="objectSpanMethod"
                  class="object-table"
                >
                  <el-table-column label="保险产品" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.produceName || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="保单号"
                    show-overflow-tooltip
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.policyNo || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="投保人姓名">
                    <template slot-scope="scope">
                      <span>{{ scope.row.insuranceName || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="被保险人姓名">
                    <template slot-scope="scope">
                      <span>{{ scope.row.insuredName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="保单生效日期"
                    min-width="100"
                    show-overflow-tooltip
                  >
                    <template slot-scope="{ row }">
                      <span>{{ row.effectiveDate | timeFormat }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="保单终止日期"
                    min-width="100"
                    show-overflow-tooltip
                  >
                    <template slot-scope="{ row }">
                      <span>{{ row.expiryDate | timeFormat }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="保单与该用户关系" min-width="90">
                    <template slot-scope="{ row }">
                      <span v-if="row.customerRoleCode === '1'">投保人</span>
                      <span v-if="row.customerRoleCode === '2'">被保人</span>
                      <span
                        v-if="
                          row.customerRoleCode !== '1' &&
                            row.customerRoleCode !== '2'
                        "
                      >
                        投保人/被保人
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="保单状态">
                    <template slot-scope="scope">
                      <span>{{ policyStatus[scope.row.state] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="76">
                    <template slot-scope="scope">
                      <span
                        class="primary pointer"
                        @click="lookPolicyPage(scope.row)"
                        >查看</span
                      >
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
              </div>
              <div v-if="activeName === '8'">
                <DrugPlan />
              </div>
              <div v-if="activeName === '4'">
                <HealthRecords :id="id" :is-man="userDetails.sex == '女'" />
              </div>
              <div v-if="activeName === '5'">
                <div class="title-top content-detail">
                  总星币：{{ userDetails.userScore || '0' }}
                </div>
                <el-table
                  v-loading="tableLoading"
                  :data="scoreList"
                  class="table-large"
                >
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      <span>{{ scope.row.remark || '-' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="星币变化">
                    <template slot-scope="{ row }">
                      <span>
                        {{ (row.type == 1 ? '+' : '-') + (row.score || '-') }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间">
                    <template slot-scope="{ row }">
                      <span>{{ row.createTime | timeFormat }}</span>
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
                <Pagination
                  :total="pagingOptions.total"
                  :limit="pagingOptions.pageSize"
                  :page="pagingOptions.pageNo"
                  layout="total, prev, pager, next"
                  @pagination="getUserScore"
                />
              </div>
              <div v-if="activeName === '7'">
                <div class="mt-24">
                  <receivingAddress :id="id" />
                </div>
              </div>
              <div v-if="activeName === '6'" class="log-items">
                <div
                  v-for="item in logList"
                  :key="item.createTime"
                  class="log-item"
                >
                  <div class="circle" />
                  <div class="log-details">
                    <span class="create-time">
                      {{ item.createTime | timeFormat }}
                    </span>
                    <span class="color-hight">{{ item.operation }}</span>
                  </div>
                </div>
              </div>
              <div v-if="activeName === '9'" class="h-full">
                <Portrait />
              </div>
              <div v-if="activeName==='10'">
  <el-table v-loading="tableLoading" :data="familyList" class="table-large">
          <el-table-column label="账号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
           <el-table-column label="角色">
            <template slot-scope="scope">
              <span>{{ scope.row.ftype || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.sex |sexFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span :class="scope.row.status ? 'active' : 'logout'">{{
                scope.row.status ? '正常' : '解除'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime | timeFormat('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>

          <div slot="empty" class="empty-img" />
        </el-table>

              </div>
            </div>
          </div>
        </el-form>
        <ServiceListModal
          v-if="isShow"
          :is-show="isShow"
          :service-info-id="serviceInfoId"
          :service-name="serviceName"
          :user-id="id"
          @close="toggleModal"
        />
        <Unqualified :data="userDetails" :visible.sync="dialog.visible" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  serviceUseStatus,
  policyStatus,
  bloodIdList,
  specialPeriod
} from '@/utils/enum';
import ServiceListModal from './component/serviceListModal';
import receivingAddress from './component/receivingAddress';
import UseDetail from './component/useDetail';
import HealthRecords from './component/healthRecords';
import SubmitSuccess from './component/submitSuccess';
import SubmitErr from './component/submitErr.vue';
import Unqualified from './component/unqualified.vue';
import DrugPlan from './drugPlan';
import Portrait from './component/portrait';
import { serviceRegionState } from '@/utils/enum';
import { getFamilyList } from '@/api/userManage';
let timerIntervalId = null;
export default {
  name: 'UserDetails',
  provide() {
    return {
      currentData: this.currentData // 传递可响应对象
    };
  },
  components: {
    ServiceListModal,
    receivingAddress,
    UseDetail,
    HealthRecords,
    SubmitSuccess,
    SubmitErr,
    Unqualified,
    DrugPlan,
    Portrait
  },

  data() {
    return {
      serviceRegionState,
      msg: '',
      appointmentId: null,
      isList: false,
      submitState: 0, // 0 未提交 1 提交成功 2 提交失败
      tableLoading: false,
      type: false,
      modalShow: false,
      currentIndex: '1',
      userDetails: {
        age: 0,
        company: '',
        healthFileVo: {
          allergy: '',
          bloodPressureTrend: [
            {
              createTime: '',
              diastolicBloodPressure: '',
              fastingBloodGlucose: '',
              systolicBloodPressure: ''
            }
          ],
          bloodTypeId: 0,
          bmi: 0,
          diastolicBloodPressure: 0,
          familyDiseaseHistory: '',
          fastingBloodGlucose: 0,
          hasCaries: '',
          headCircumference: 0,
          height: '',
          id: '',
          kidneyFunction: true,
          leftEyeDegree: 0,
          leftEyeScore: 0,
          liverFunction: true,
          menstrualCycle: 0,
          menstrualFlow: '',
          menstrualPeriod: 0,
          menstruation: 0,
          past: '',
          pregnancyState: 0,
          rightEyeDegree: 0,
          rightEyeScore: 0,
          surgeryHistory: '',
          systolicBloodPressure: 0,
          toothGrowth: '',
          userType: 0,
          weight: ''
        },
        id: '',
        idCard: '',
        insureVoList: [],
        mobile: '',
        name: '',
        position: '',
        sex: 0,
        userScore: 0
      },
      serviceInfoVoList: [],
      logList: [],
      serviceUseStatus,
      policyStatus,
      isShow: false,
      serviceInfoId: '',
      serviceName: '',
      bloodIdList,
      specialPeriod,
      activeName: '1',
      btns: [
        { value: '1', name: '基础信息' },
        { value: '2', name: '服务列表' },
        { value: '3', name: '保单列表' },
        { value: '4', name: '健康档案' },
        { value: '9', name: '用户画像' },
        { value: '8', name: '用药计划' },
        { value: '5', name: '星币明细' },
        { value: '7', name: '收货地址' },
          { value: '10', name: '家庭账号' },
        { value: '6', name: '操作日志' }
      ],
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      scoreList: [],
      serviceRecordId: null,
      currentData: {
        serviceInfoId: null,
        serviceName: '',
        serviceRecordId: '',
        serviceType: '',
        commodityType: ''
      },
      spanArr: [],
      familyList: []
    };
  },
  computed: {
    pageAuthority() {
      // 110101 用户管理
      return this.$store.state.user.pageAuthority['110101'];
    }
  },
  beforeDestroy() {
    clearInterval(timerIntervalId);
  },
  created() {
    if (this.$isNotEmpty(this.$route.params.index)) {
      this.currentIndex = this.$route.params.index;
      this.activeName = this.$route.params.index;
    }
    // 判断是新增还是编辑
    this.id = this.$route.params.id;
    this.getUserDetails(this.id);
  },

  methods: {
    linkSkip(obj) {
      if (obj.serviceSourceId) {
        const id = obj.serviceSourceId;
        const source = obj.source;
        const key = Object.keys(obj.serviceRegin)[0];

        if (key === '1') {
          // 激活码
          this.$router.push(`/projectManage/activeCodeManage/details/${id}`);
        } else if (key === '2') {
          // 保单 source 0个险 1团险
          if (source === 0) {
            this.$router.push(`/policyManage/personalPolicy/details/${id}`);
          } else {
            this.$router.push(`/policyManage/groupPolicy/details/${id}`);
          }
        } else if (key === '3') {
          // 星矿
          this.$router.push(`/operateManage/pointsMall/details/${id}`);
        } else if (key === '4') {
          // 首页领取
          return false;
        } else if (key === '5') {
          // 服务包
          this.$router.push(
            `/supplyChainManage/servicePackage/details/${id}/detail`,
          );
        } else if (key === '6') {
          // 券码领取
          this.$router.push(`/marketingTool/interests/detail/${id}`);
        }
      } else {
        return false;
      }
    },
    toDetail(row) {
      if (this.$isEmpty(this.userDetails.mobile)) {
        this.dialog.visible = true;
        return false;
      }
      this.serviceRecordId = row.serviceRecordId;
      this.serviceInfoId = row.serviceInfoId;
      this.$copyProps(this.currentData, row);
      this.isList = false;
    },
    // 返回列表
    backList() {
      this.submitState = 0;
      this.isList = true;
      this.getUserRecordList();
    },
    /**
     * 按钮组change
     */
    btnChange(val) {
      const vm = this;
      vm.activeName = val;
      this.submitState = 0;
      this.isList = true;
      if (val === '6') {
        vm.$store
          .dispatch('userManage/userLog', {
            id: vm.id
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
      if (val === '2') {
        this.getUserRecordList();
      }
      if (val === '5') {
        vm.getUserScore({});
      }
      if (val === '10') {
        getFamilyList(this.id).then(res => {
            this.familyList = res.data;
        });
      }
    },
    // 获取分秒
    getDialysisDurationShow(leftTime) {
      if (this.$isEmpty(leftTime)) {
        return '00:00';
      }
      const min = parseInt(Number(leftTime) / 60);
      const s = parseInt(Number(leftTime) % 60);
      return `${min > 9 ? min : '0' + min}:${s > 9 ? s : '0' + s}`;
    },
    // 获取列表
    getUserRecordList() {
      this.$store
        .dispatch('userManage/getUserRecordList', {
          userId: this.id
        })
        .then(res => {
          clearInterval(timerIntervalId);
          this.serviceInfoVoList = res.data || [];
          this.countDown();
        });
    },
    // 获取用户积分
    getUserScore(pageInfo) {
      const vm = this;
      vm.tableLoading = true;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        userId: vm.id,
        orderBy: '',
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize
      };
      vm.$store.dispatch('userManage/getUserScore', params).then(res => {
        vm.scoreList = res.records || [];
        vm.pagingOptions.total = res.totalNum;
        vm.tableLoading = false;
      });
    },
    // 获取用户详情
    getUserDetails(id) {
      this.$store
        .dispatch('userManage/getUserDetails', {
          id
        })
        .then(res => {
          !res.obj.healthFile
            ? (res.obj.healthFile = this.userDetails.healthFile)
            : res.obj.healthFile;
          this.userDetails = res.obj;
          this.userDetails.sex = res.obj.sex === 0 ? '女' : '男';
          this.getSpanArr(this.userDetails.insureVoList);
        });
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
    // 查看服务项
    lookService(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 服务记录弹框切换显示
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 查看保单详情
    lookPolicyPage(item) {
      const { id, source } = item;
      let routeData = '';
      if (source) {
        // 1 团险
        routeData = this.$router.resolve({
          path: `/policyManage/groupPolicy/details/${id}`
        });
      } else {
        // 0 个险
        routeData = this.$router.resolve({
          path: `/policyManage/personalPolicy/details/${id}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 无限次服务项查看服务详情
    showModal(serviceInfoId, serviceName) {
      this.isShow = true;
      this.serviceInfoId = serviceInfoId;
      this.serviceName = serviceName;
    },
    // 倒计时
    countDown() {
      clearInterval(timerIntervalId);
      const dataList = this.serviceInfoVoList.filter(item => {
        return item.expireTime > 0;
      });
      if (this.$isNotEmpty(dataList)) {
        timerIntervalId = setInterval(function() {
          dataList.forEach(item => {
            if (item.expireTime > 0) {
              item.expireTime--;
            }
          });
        }, 1000);
      }
    },
    getSpanArr(data) {
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].produceName === data[i - 1].produceName) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
          }
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-user-manage-details {
  /deep/ .el-row::after {
    content: none;
  }
  .el-form {
    height: 100%;
  }
  .details-content {
    // padding-bottom: 60px;
    height: 100%;
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
    .table-link {
      color: #3b9fff;
      text-decoration: underline;
      cursor: pointer;
    }
    //健康档案
    .record-details {
      .title-top {
        position: relative;
        .monthPicker {
          position: absolute;
          right: 80px;
          top: 0;
          width: 120px;
          height: 32px;
          font-size: 14px;

          font-weight: 500;
          line-height: 14px;
          cursor: pointer;
        }
      }
      .explain {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
        line-height: 14px;
      }
      .details {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          width: 50%;
          font-size: 14px;

          font-weight: 400;
          color: #333333;
          margin-bottom: 24px;
          .label {
            width: 100px;
          }
          .text {
            flex: 1;
          }
        }
      }
    }
    .details-content-empty {
      text-align: center;
      padding-top: 100px;
      .empty-img-error {
        width: 280px;
        height: 159px;
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
    .logout {
    font-size: 14px;
    font-weight: 400;
    color: #f64e60;
  }
  .active {
    font-size: 14px;
    font-weight: 400;
    color: #63d8da;
  }
}
</style>
