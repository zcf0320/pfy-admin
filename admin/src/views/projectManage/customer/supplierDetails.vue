<template>
  <div class="page-supplier-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            :current-key="currentKey"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="content">
                <el-form
                  ref="baseForm"
                  :model="baseForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="title-top content-detail">
                      企业信息
                      <div v-if="!expandStatus" class="expand" @click="expand">
                        <span>展开</span
                        ><img src="@/assets/expand_up.svg" alt="" />
                      </div>
                      <div v-else class="expand" @click="expand">
                        <span>收起</span
                        ><img src="@/assets/expand_down.svg" alt="" />
                      </div>
                    </div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col v-if="type" :span="12">
                          <el-form-item label="ID" prop="id">
                            <el-input v-model="baseForm.companyCode" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="企业分类" prop="companyType">
                            <el-select
                              v-model="baseForm.companyType"
                              :disabled="!edit"
                              placeholder="请选择企业分类"
                            >
                              <el-option
                                v-for="item in companyTypes"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <div class="company-name">
                            <div class="company-name-input">
                              <el-form-item label="企业名称" prop="companyName">
                                <el-input
                                  v-model="baseForm.companyName"
                                  :disabled="type || baseForm.id ? true : false"
                                  placeholder="请输入企业名称"
                                />
                              </el-form-item>
                            </div>
                            <div
                              v-if="type || baseForm.id ? true : false"
                              class="button"
                              @click="lookCredit"
                            >
                              企业信用等级
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="企业简称"
                            prop="companySimpleName"
                          >
                            <el-input
                              v-model="baseForm.companySimpleName"
                              :disabled="!edit"
                              placeholder="请输入企业简称"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="所在地区" prop="location">
                            <el-cascader
                              v-model="baseForm.location"
                              :options="options"
                              :props="optionProps"
                              placeholder="请选择所在地区"
                              :disabled="!edit"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col v-if="type" :span="12">
                          <el-form-item label="账号状态">
                            <el-select
                              v-model="baseForm.accountStatus"
                              :disabled="true"
                              placeholder="请选择"
                            >
                              <el-option
                                v-for="item in accountStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <div v-show="expandStatus">
                          <el-col :span="12">
                            <el-form-item label="成立时间">
                              <el-date-picker
                                v-model="baseForm.companyEstablishTime"
                                type="date"
                                placeholder="选择日期"
                                :disabled="!edit"
                                value-format="timestamp"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="注册地址">
                              <el-input
                                v-model="baseForm.companyPostalAddress"
                                :disabled="!edit"
                                placeholder="请输入注册地址"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="通讯地址">
                              <el-input
                                v-model="baseForm.companyAddress"
                                :disabled="!edit"
                                placeholder="请输入通讯地址"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业邮箱">
                              <el-input
                                v-model="baseForm.companyEmail"
                                :disabled="!edit"
                                placeholder="请输入企业邮箱"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业网址">
                              <el-input
                                v-model="baseForm.companyWebsite"
                                :disabled="!edit"
                                placeholder="请输入企业网址"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="法定代表人">
                              <el-input
                                v-model="baseForm.legalPerson"
                                :disabled="!edit"
                                placeholder="请输入法定代表人"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="注册资金"
                              prop="registeredCapital"
                            >
                              <el-input
                                v-model="baseForm.registeredCapital"
                                :disabled="!edit"
                                placeholder="请输入注册资金"
                                style="width: 94%"
                              />
                              <span class="money">元</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业类型" prop="companyNature">
                              <el-select
                                v-model="baseForm.companyNature"
                                :disabled="!edit"
                                placeholder="请选择企业类型"
                              >
                                <el-option
                                  v-for="item in companyNatures"
                                  :key="item.value"
                                  :label="item.name"
                                  :value="item.value"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业规模" prop="companyScale">
                              <el-select
                                v-model="baseForm.companyScale"
                                :disabled="!edit"
                                placeholder="请选择企业规模"
                              >
                                <el-option
                                  v-for="item in companyScales"
                                  :key="item.value"
                                  :label="item.name"
                                  :value="item.value"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="工商注册号">
                              <el-input
                                v-model="baseForm.businessRegistrationNumber"
                                :disabled="!edit"
                                placeholder="请输入工商注册号"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="经营范围">
                              <el-input
                                v-model="baseForm.businessScope"
                                type="textarea"
                                :disabled="!edit"
                                placeholder="请输入经营范围"
                              />
                            </el-form-item>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="title-top content-detail">联系信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="合同负责人">
                            <el-input
                              v-model="baseForm.chargePeople"
                              :disabled="!edit"
                              placeholder="请输入合同负责人"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="联系电话">
                            <el-input
                              v-model="baseForm.chargePeoplePhone"
                              :disabled="!edit"
                              placeholder="请输入联系电话"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="微信号">
                            <el-input
                              v-model="baseForm.chargePeopleWechart"
                              :disabled="!edit"
                              placeholder="请输入微信号"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="电子邮箱">
                            <el-input
                              v-model="baseForm.chargePeopleEmail"
                              :disabled="!edit"
                              placeholder="请输入电子邮箱"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="data-list">
                    <div class="title-top content-detail">财务信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="开户行">
                            <el-input
                              v-model="baseForm.accountBank"
                              :disabled="!edit"
                              placeholder="请输入开户行"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="开户行地址">
                            <el-input
                              v-model="baseForm.accountBankAddress"
                              :disabled="!edit"
                              placeholder="请输入开户行地址"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="纳税人识别号">
                            <el-input
                              v-model="baseForm.taxNumber"
                              :disabled="!edit"
                              placeholder="请输入纳税人识别号"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="银行账号">
                            <el-input
                              v-model="baseForm.bankNumber"
                              :disabled="!edit"
                              placeholder="请输入银行账号"
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
              <div class="data-list">
                <div class="title-top content-detail">
                  证件信息<button
                    v-if="(!type || edit) && pageAuthority.includes('edit')"
                    type="button"
                    class="btn-save fr"
                    @click="addCertificatesModal('')"
                  >
                    新增
                  </button>
                </div>
                <div class="data-item border-no">
                  <el-table
                    v-loading="tableLoading"
                    :data="baseForm.credentials"
                  >
                    <el-table-column label="证件名称">
                      <template slot-scope="scope">
                        <span>{{ credentialType[scope.row.type] }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件编号">
                      <template slot-scope="scope">
                        <span>{{ scope.row.orderNumber || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="生效时间" width="200">
                      <template slot-scope="{ row }">
                        <span>{{
                          !row.validStartUnlimited
                            ? row.validStartTime
                              ? $moment(row.validStartTime).format('YYYY-MM-DD')
                              : '-'
                            : '长期'
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="过期时间" width="200">
                      <template slot-scope="{ row }">
                        <span>{{
                          !row.validEndUnlimited
                            ? row.validEndTime
                              ? $moment(row.validEndTime).format('YYYY-MM-DD')
                              : '-'
                            : '长期'
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态">
                      <template slot-scope="scope">
                        <span :class="contractColumn[scope.row.status]">{{
                          contractState[scope.row.status]
                        }}</span>
                        <span v-if="scope.row.remainingDay" class="red">{{
                          scope.row.remainingDay
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                      <template slot-scope="scope">
                        <span
                          class="primary pointer"
                          @click="lookImage(scope.row.id)"
                          >查看</span
                        >
                        <span
                          v-if="pageAuthority.includes('edit')"
                          class="primary pointer"
                          @click="addCertificatesModal(scope.row.id)"
                          >编辑</span
                        >
                        <span
                          v-if="!type && pageAuthority.includes('edit')"
                          class="danger pointer"
                          @click="deleteCredential(scope.row.id)"
                          >删除</span
                        >
                      </template>
                    </el-table-column>
                    <div slot="empty" class="empty-img" />
                  </el-table>
                </div>
              </div>
            </div>
            <div v-if="activeName === '3'" class="log-items">
              <Logs :id="baseForm.id" :type="'90'" :has-o-a-log="true" />
            </div>
          </div>
        </div>
        <div
          v-if="
            (activeName === '0' || activeName === '1') &&
              (pageAuthority.includes('edit') || !type)
          "
          class="page-footer"
        >
          <template>
            <button
              v-if="type && !edit"
              type="button"
              class="btn-save"
              style="margin-right: 10px"
              @click="changeEdit()"
            >
              编辑
            </button>
            <el-button
              v-if="edit"
              type="button"
              class="btn-save mr-30"
              :loading="loading"
              @click="addOrUpdateSupplier('baseForm')"
            >
              保存
            </el-button>
          </template>
          <button
            v-if="
              baseForm.accountStatus === 1 ||
                baseForm.accountStatus === 3 ||
                flag
            "
            type="button"
            class="btn-save"
            @click="changeStatus(2)"
          >
            启用
          </button>
          <el-popconfirm
            title="确认停用吗？"
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="plain"
            cancel-button-type="primary"
            :hide-icon="true"
            @onConfirm="changeStatus(3)"
          >
            <button
              v-show="baseForm.accountStatus === 2"
              slot="reference"
              class="btn-save"
              type="button"
            >
              停用
            </button>
          </el-popconfirm>
        </div>
      </el-main>
      <CertificatesModal
        v-if="modalShow"
        :id="certiId"
        :is-show="modalShow"
        @closeModal="closeModal"
        @addCertificates="addCertificates"
      />
      <LookImageModal
        v-if="lookShow"
        :id="lookId"
        :is-show="lookShow"
        @closeLookModal="closeLookModal"
      />
    </el-container>
  </div>
</template>
<script>
import {
  serviceType,
  operationType,
  menuType,
  credentialType
} from '@/utils/enum';
import { validBankNum } from '@/utils/validate';
import {
  accountState,
  accountColumn,
  contractState,
  contractColumn
} from '@/utils/enum';
export default {
  name: 'SupplierDetails',
  data() {
    const checkBankNumber = (rule, value, callback) => {
      if (!validBankNum(value)) {
        return callback(new Error('请输入正确的银行卡号'));
      }
      callback();
    };
    const checkTaxNumber = (rule, value, callback) => {
      if (!/^[0-9A-Za-z]+$/.test(value)) {
        return callback(new Error('请输入正确的纳税人识别号'));
      }
      callback();
    };

    const checkDistinctName = (rule, value, callback) => {
      let baseId = null;
      this.baseForm.id ? (baseId = this.baseForm.id) : (baseId = null);
      if (this.baseForm.id) {
        callback();
      } else {
        this.$store
          .dispatch('enterpriseCustomers/checkDistinctName', {
            id:
              this.$route.params.id === 'add' ? baseId : this.$route.params.id,
            name: value
          })
          .then(res => {
            if (res && !res.data) {
              return callback(new Error('企业名称重复'));
            }
            callback();
          });
      }
    };
    const checkDistinctSimpleName = (rule, value, callback) => {
      let baseId = null;
      this.baseForm.id ? (baseId = this.baseForm.id) : (baseId = null);
      this.$store
        .dispatch('enterpriseCustomers/checkDistinctSimpleName', {
          id: this.$route.params.id === 'add' ? baseId : this.$route.params.id,
          simpleName: value
        })
        .then(res => {
          if (res && !res.data) {
            return callback(new Error('企业简称重复'));
          }
          callback();
        });
    };
    const validateMoney = (rule, value, callback) => {
      if (value) {
        const phoneRegex = /^\d{1,8}(\.\d{1,2})?$/;
        if (!phoneRegex.test(value)) {
          callback(new Error('请输入正确的注册资金'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      tableLoading: false,
      type: false,
      activeName: '0',
      modalShow: false,
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'citys'
      },
      baseForm: {
        companyType: '',
        companyName: '',
        companySimpleName: '',
        location: [],
        companyEstablishTime: '',
        companyPostalAddress: '',
        companyAddress: '',
        companyEmail: '',
        companyWebsite: '',
        businessScope: '',
        chargePeople: '',
        chargePeoplePhone: '',
        chargePeopleWechart: '',
        chargePeopleEmail: '',
        accountBank: '',
        accountBankAddress: '',
        taxNumber: '',
        bankNumber: '',
        credentialIds: [],
        credentials: [],
        serviceInfos: [],
        accountStatus: '',
        legalPerson: '',
        registeredCapital: '',
        companyScale: '',
        businessRegistrationNumber: '',
        companyNature: ''
      },
      serviceType,
      rules: {
        companyType: [
          {
            required: true,
            message: '请选择企业类型',
            trigger: 'change'
          }
        ],
        companyName: [
          {
            required: true,
            message: '请输入企业名称',
            trigger: 'blur'
          },
          { validator: checkDistinctName, trigger: 'blur' }
        ],
        location: [
          {
            required: true,
            message: '请选择注册地址',
            trigger: 'change'
          }
        ],
        companySimpleName: [
          {
            required: true,
            message: '请输入企业简称',
            trigger: 'change'
          },
          { validator: checkDistinctSimpleName, trigger: 'blur' }
        ],
        companyEstablishTime: [
          {
            required: true,
            message: '请选择成立时间',
            trigger: 'change'
          }
        ],
        companyPostalAddress: [
          {
            required: true,
            message: '请输入注册地址',
            trigger: 'blur'
          }
        ],
        companyAddress: [
          {
            required: true,
            message: '请输入通讯地址',
            trigger: 'blur'
          }
        ],
        companyEmail: [
          {
            required: true,
            message: '请输入企业邮箱',
            trigger: 'blur'
          },
          { validator: this.$validators.checkEmail, trigger: 'blur' }
        ],
        companyWebsite: [
          {
            required: true,
            message: '请输入企业网址',
            trigger: 'blur'
          }
        ],
        businessScope: [
          {
            required: true,
            message: '请输入经营范围',
            trigger: 'blur'
          }
        ],
        chargePeople: [
          {
            required: true,
            message: '请输入合同负责人姓名',
            trigger: 'blur'
          }
        ],
        chargePeoplePhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          { validator: this.$validators.checkPhone, trigger: 'blur' }
        ],
        chargePeopleWechart: [
          { required: true, message: '请输入微信号', trigger: 'blur' }
        ],
        chargePeopleEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: this.$validators.checkEmail, trigger: 'blur' }
        ],
        accountBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        accountBankAddress: [
          {
            required: true,
            message: '请输入开户行地址',
            trigger: 'blur'
          }
        ],
        taxNumber: [
          {
            required: true,
            message: '请输入纳税人识别号',
            trigger: 'blur'
          },
          { validator: checkTaxNumber, trigger: 'blur' }
        ],
        bankNumber: [
          // { required: true, message: '请输入银行账号', trigger: 'blur' },
          { validator: checkBankNumber, trigger: 'blur' }
        ],
        registeredCapital: [{ validator: validateMoney, trigger: 'blur' }]
      },
      operationType,
      menuType,
      lookId: '',
      lookShow: false,
      companyTypes: [
        { name: '员工福利', value: 1 },
        { name: '银行', value: 2 },
        { name: '其他金融', value: 3 }
      ],
      credentialType,
      edit: true,
      btns: [],
      btnsDialog: [
        { value: '0', name: '涉及用户（0）' },
        { value: '1', name: '涉及服务包（0）' }
      ],
      expandStatus: false,
      loading: false,
      postStatusList: [],
      accountState,
      accountColumn,
      flag: false,
      serviceInfoId: '',
      currentKey: '',
      tabCurrentKey: '',
      pagingOptions: {
        pageSize: 5,
        total: 10,
        pageNum: 1
      },
      companyNatures: [
        { name: '有限责任公司', value: 1 },
        { name: '股份责任有限公司', value: 2 },
        { name: '个人独资企业', value: 3 },
        { name: '合伙企业', value: 4 },
        { name: '个体工商户', value: 5 }
      ],
      companyScales: [
        { name: '0-20人', value: 1 },
        { name: '20-99人', value: 2 },
        { name: '100-499人', value: 3 },
        { name: '500-999人', value: 4 },
        { name: '1000-9999人', value: 5 },
        { name: '10000人以上', value: 6 }
      ],
      accountStatus: [
        {
          value: 1,
          label: '待启用'
        },
        {
          value: 2,
          label: '已启用'
        },
        {
          value: 3,
          label: '已停用'
        }
      ],
      certiId: '',
      contractState,
      contractColumn
    };
  },
  computed: {
    options() {
      const vm = this;
      return vm.$store.state.app.locationList || [];
    },
    pageAuthority() {
      // 100101 供应商
      return this.$store.state.user.pageAuthority['100101'];
    }
  },
  created() {
    // 根据路由设置tab切换按钮个数
    const vm = this;
    // // 企业类型
    // vm.$store
    //   .dispatch('app/getSysConfig', {
    //     code: 'companyType'
    //   })
    //   .then(res => {
    //     vm.companyTypes = res.obj || []
    //   })
    this.$store.dispatch('app/getLocations');
    // 判断是新增还是编辑
    vm.type = vm.$route.params.id !== 'add' ? true : false;
    // 判断是查看还是编辑
    vm.edit = vm.$route.params.type === 'edit' ? true : false;
    if (vm.type) {
      vm.getSupplierDetails(vm.$route.params.id);
    }
    if (vm.type) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '证件信息' },
        { value: '3', name: '操作日志' }
      ];
    } else {
      vm.btns = [{ value: '0', name: '基础信息' }];
    }
    this.getStatus();
  },
  methods: {
    // 展开
    expand() {
      this.expandStatus = !this.expandStatus;
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      const tabItem = this.btns.find(item => item.value === tab);
      if (tabItem.isNew) {
        tabItem.isNew = false;
      }
    },
    // 新建证件弹框确认
    addCertificates(obj, perId) {
      if (perId) {
        this.baseForm.credentialIds.forEach((item, index) => {
          if (item === perId) {
            this.baseForm.credentialIds.splice(index, 1);
          }
        });
        this.baseForm.credentials.forEach((item, index) => {
          if (item.id === perId) {
            this.baseForm.credentials.splice(index, 1);
          }
        });
      }
      this.baseForm.credentialIds.push(obj.id);
      this.baseForm.credentials.push(obj);
      this.closeModal();
    },
    // 新增证件弹框打开
    addCertificatesModal(id) {
      id ? (this.certiId = id) : (this.certiId = '');
      this.modalShow = true;
    },
    // 关闭弹框
    closeModal() {
      this.modalShow = false;
    },
    // 新增或编辑供应商
    addOrUpdateSupplier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.baseForm.id) {
            this.$store
              .dispatch('enterpriseCustomers/updateCustomer', {
                ...this.baseForm,
                companyEstablishTime: this.baseForm.companyEstablishTime
              })
              .then(() => {
                this.loading = false;
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            this.$store
              .dispatch('enterpriseCustomers/createCustomer', {
                ...this.baseForm,
                companyEstablishTime: this.baseForm.companyEstablishTime
              })
              .then(res => {
                this.baseForm.id = res.data;
                this.btns = [
                  { value: '0', name: '基础信息' },
                  {
                    value: '1',
                    name: '证件信息',
                    isNew: true
                  }
                ];
                this.loading = false;
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.flag = true; // 可以启用
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          this.$message.warning('基础信息填写有误!');
        }
      });
    },
    // 供应商详情
    getSupplierDetails(id) {
      const vm = this;
      vm.$store
        .dispatch('enterpriseCustomers/getCustomerDetails', {
          id
        })
        .then(res => {
          vm.baseForm = res.obj;
          vm.baseForm.credentialIds = [];
          vm.baseForm.credentials = vm.baseForm.credentials || [];
          vm.baseForm.credentials.forEach(item => {
            vm.baseForm.credentialIds.push(item.id);
          });
          // this.formatAccout(this.baseForm.accountStatus)
        });
    },
    // 证件删除
    deleteCredential(id) {
      const vm = this;
      vm.$confirm('此操作将永久删除该证件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store
          .dispatch('supplier/deleteCredential', {
            id
          })
          .then(() => {
            vm.baseForm.credentialIds.forEach((item, index) => {
              if (item === id) {
                vm.baseForm.credentialIds.splice(index, 1);
                vm.baseForm.credentials.splice(index, 1);
              }
            });
          });
      });
    },
    // 查看服务项
    lookServiceItemDetail(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 查看证件图片
    lookImage(id) {
      this.lookId = id;
      this.lookShow = true;
    },
    // 查看证件图片
    closeLookModal() {
      this.lookShow = false;
    },
    // 查看企业征信
    lookCredit() {
      window.open(
        `${process.env.VUE_APP_RISK_MANAGE_URL}#/credit/company/${this.$route.params.id}`,
        '_blank',
      );
    },
    // 切换编辑
    changeEdit() {
      this.edit = !this.edit;
    },
    getStatus() {
      this.$store
        .dispatch('app/getSysConfig', {
          code: 'postStatus'
        })
        .then(res => {
          this.postStatusList = res.obj || [];
        });
    },
    changeStatus(accountStatus) {
      const params = {
        accountStatus: accountStatus,
        id: this.baseForm.id
      };
      const url =
        accountStatus === 2
          ? 'enterpriseCustomers/enableCompanyStatus'
          : 'enterpriseCustomers/disableCompanyStatus';
      this.$store.dispatch(url, params).then(() => {
        this.$message({
          message: `${accountStatus === 2 ? '启用成功！' : '解约成功！'} `,
          type: 'success'
        });
        this.$router.go(-1);
      });
    },
    formatAccout(val) {
      if (val === 1) {
        this.baseForm.accountStatus = '待启用';
      } else if (val === 2) {
        this.baseForm.accountStatus = '已启用';
      } else {
        this.baseForm.accountStatus = '已停用';
      }
    }
  }
};
</script>
<style lang="scss" scope>
.page-supplier-details {
  position: relative;

  .m-t-24 {
    margin-top: 24px;
  }
  .p-l-24 {
    margin-left: 24px;
    box-sizing: border-box;
    width: calc(100% - 24px);
  }
  .details-content {
    // padding-bottom: 60px;
    // min-height: calc(100vh - 210px);
    // max-height: calc(100vh - 210px);
    // overflow-y: scroll;
    .data-list {
      // padding: 12px 0px 0;
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-border {
        padding-left: 10px;
        position: relative;
        &::before {
          content: '';
          width: 4px;
          height: 14px;
          background: rgba(34, 118, 255, 1);
          position: absolute;
          top: 1px;
          left: 0;
        }
      }
      .settle {
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 30px;
        .name {
          padding: 0 42px 0 10px;
          position: relative;
        }
        .radio1 {
          margin-bottom: 30px;
        }
        .once {
          justify-content: flex-start;
          align-items: flex-start;
          //   margin-bottom: -15px;
        }
        .rule {
          margin: 30px 0 -25px;
          &-detail {
            span {
              margin: 8px 12px 0;
            }
          }
        }
      }
    }
    .data-name-none {
      font-size: 12px;
      color: #9f9f9f;
    }
    // .data-table-item{
    //     padding: 24px 0 0;
    // }
    .data-item {
      // padding: 24px 0;
      .add-certificates {
        margin-top: 24px;
      }
      .company-name {
        display: flex;
        align-items: center;
        .company-name-input {
          flex: 1;
        }
        .button {
          margin-bottom: 10px;
          width: 96px;
          height: 36px;
          background: #3599fe;
          line-height: 36px;
          text-align: center;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          &:link {
            background: #3599fe;
          }
          &:visited {
            background: #3599fe;
          }
          &:hover {
            background: #66b2ff;
          }
          &:active {
            background: #1c8cff;
          }
          border-radius: 0 4px 4px 0;
        }
        border-radius: 0 4px 4px 0;
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
  .el-dialog__header {
    height: 80px;
    padding: 30px;
    .el-dialog__title {
      font-size: 16px;
      font-weight: bold;
      color: #464668;
    }
    .el-dialog__headerbtn {
      top: 32px;
      right: 30px;
      .el-dialog__close {
        color: #464668;
        font-size: 20px;
      }
    }
  }
  .dialog-red {
    color: #f64e60;
    line-height: 20px;
  }
  .money {
    position: absolute;
    right: 0;
  }
  .red {
    color: #f64e60 !important;
  }
}
</style>
