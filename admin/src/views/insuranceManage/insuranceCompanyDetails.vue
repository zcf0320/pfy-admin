<template>
  <div class="page-supplier-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" :current-key="activeName" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="tabIndex == '0'">
              <div>
                <el-form
                  ref="baseForm"
                  :model="baseForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="title-top content-detail">企业信息</div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col v-if="type" :span="12">
                          <el-form-item label="ID" prop="id">
                            <el-input v-model="baseForm.companyCode" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="企业类型" prop="companyType">
                            <el-select
                              v-model="baseForm.companyType"
                              :disabled="!edit"
                              placeholder="请选择企业类型"
                            >
                              <el-option
                                v-for="item in companyTypes"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              />
                            </el-select>
                            <!-- <el-select v-model="baseForm.companyType" placeholder="请选择企业类型">
                                                            <el-option label="保险机构" value="1"></el-option>
                                                        </el-select> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="企业名称" prop="companyName">
                            <el-input
                              v-model="baseForm.companyName"
                              :disabled="type"
                              placeholder="请输入企业名称"
                            />
                          </el-form-item>
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
                              :disabled="!edit"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="成立时间">
                            <el-date-picker
                              v-model="baseForm.companyEstablishTime"
                              type="date"
                              placeholder="选择日期"
                              :disabled="!edit"
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
                        <template v-if="this.$route.params.id === 'add'">
                           <el-col :span="24">
                          <el-form-item label="企业网址">
                            <el-input
                              v-model="baseForm.companyWebsite"
                              :disabled="!edit"
                              placeholder="请输入企业网址"
                            />
                          </el-form-item>
                        </el-col>
                        </template>
                        <template v-if="this.$route.params.id !== 'add'">
                           <el-col :span="12">
                          <el-form-item label="企业网址">
                            <el-input
                              v-model="baseForm.companyWebsite"
                              :disabled="!edit"
                              placeholder="请输入企业网址"
                            />
                          </el-form-item>
                        </el-col>
                        </template>
                        <el-col :span="24">
                          <el-form-item label="经营范围">
                            <el-input
                              v-model="baseForm.businessScope"
                              :disabled="!edit"
                              type="textarea"
                              placeholder="请输入经营范围"
                            />
                          </el-form-item>
                        </el-col>
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
            <div v-show="tabIndex == '1'">
              <div class="data-list">
                <div class="title-top content-detail">
                  证件列表<button
                    v-if="!type || edit"
                    type="button"
                    class="btn-save fr"
                    @click="addCertificatesModal"
                  >
                    新增
                  </button>
                </div>
                <div class="data-item">
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
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.validStartTime
                            ? $moment(scope.row.validStartTime).format(
                                'YYYY-MM-DD',
                              )
                            : '-'
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="过期时间" width="200">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.validEndTime
                            ? $moment(scope.row.validEndTime).format(
                                'YYYY-MM-DD',
                              )
                            : '-'
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
                          v-if="!type || edit"
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
            <div v-show="tabIndex == '2'">
              <div class="data-list">
                <div class="title-top content-detail">产品列表</div>
                <div class="data-item-table">
                  <el-table
                    v-loading="tableLoading"
                    :data="baseForm.insuranceProducts || []"
                  >
                    <el-table-column label="序号" width="200">
                      <template slot-scope="scope">
                        <span>{{ scope.row.orderNumber }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="保险产品名称">
                      <template slot-scope="scope">
                        <span>{{ scope.row.name || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="保险分类">
                      <template slot-scope="scope">
                        <span>{{ insuranceType[scope.row.type] || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="更新时间" width="200">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.updateTime | timeFormat('yyyy-MM-dd')
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                      <template slot-scope="scope">
                        <span
                          class="primary pointer"
                          @click="lookProductDetail(scope.row.id)"
                          >查看</span
                        >
                      </template>
                    </el-table-column>
                    <div slot="empty" class="empty-img" />
                  </el-table>
                </div>
              </div>
            </div>
            <div v-if="tabIndex == '3'" class="log-items">
              <Logs :id="baseForm.id" :type="'3'" :has-o-a-log="true" />
            </div>
          </div>
        </div>
        <div
          v-if="
            (tabIndex === '0' || tabIndex === '1') &&
              (pageAuthority.includes('edit') || !type)
          "
          class="page-footer"
        >
          <button
            v-if="type && !edit"
            type="button"
            class="btn-save"
            @click="changeEdit()"
          >
            编辑
          </button>
          <button
            v-else
            type="button"
            class="btn-save"
            @click="addOrUpdateInsuranceCompany('baseForm')"
          >
            {{ type ? '保存' : '创建' }}
          </button>
          <button
            v-if="id && edit"
            type="button"
            class="btn-exit"
            @click="enableOrDisable"
          >
            {{ baseForm.companyStatus === 1 ? '停用' : '启用' }}
          </button>
        </div>
      </el-main>
      <CertificatesModal
        v-if="modalShow"
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
  insuranceType,
  credentialType
} from '@/utils/enum';
import { validBankNum } from '@/utils/validate';
import { isEqual } from 'lodash';
export default {
  name: 'InsuranceCompanyDetails',
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
    return {
      tableLoading: false,
      type: false,
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'citys'
      },
      baseForm: {
        companyType: 2,
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
        companyStatus: 0
      },
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
          }
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
          }
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
        ]
      },
      operationType,
      menuType,
      serviceType,
      insuranceType,
      lookShow: false,
      lookId: '',
      companyTypes: [
        {
          name: '保险公司',
          value: 2
        },
        {
          name: '保险经纪公司',
          value: 3
        },
        {
          name: '再保公司',
          value: 4
        }
      ],
      credentialType,
      edit: true,
      btns: [],
      id: ''
    };
  },
  computed: {
    options() {
      const vm = this;
      return vm.$store.state.app.locationList || [];
    },
    pageAuthority() {
      // 170105 保险机构
      return this.$store.state.user.pageAuthority['170105'];
    }
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.type = vm.$route.params.id !== 'add' ? true : false;
    // 判断是查看还是编辑
    vm.edit = vm.$route.params.type === 'edit' ? true : false;
    vm.$store.dispatch('app/getLocations').then(() => {
      if (vm.type) {
        vm.getInsuranceCompanyDetails(vm.$route.params.id);
        vm.id = vm.$route.params.id;
      }
      if (vm.type) {
        vm.btns = [
          { value: '0', name: '基础信息' },
          { value: '1', name: '证件信息' },
          { value: '2', name: '产品列表' },
          { value: '3', name: '操作日志' }
        ];
      } else {
        vm.btns = [
          { value: '0', name: '基础信息' },
          { value: '1', name: '证件信息' }
        ];
      }
    });
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
    },
    // 新建证件弹框确认
    addCertificates(obj) {
      let equalStatus = false;
      this.baseForm.credentials.forEach(item => {
        if (isEqual(item, obj)) {
          equalStatus = true;
        }
      });
      if (!equalStatus) {
        this.baseForm.credentialIds.push(obj.id);
        this.baseForm.credentials.push(obj);
      }
      this.closeModal();
    },
    // 新增证件弹框打开
    addCertificatesModal() {
      this.modalShow = true;
    },
    // 关闭弹框
    closeModal() {
      this.modalShow = false;
    },
    // 新增保险机构
    addOrUpdateInsuranceCompany(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.baseForm.id) {
            this.$store
              .dispatch(
                'insuranceCompany/updateInsuranceCompany',
                this.baseForm,
              )
              .then(() => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.$router.push({
                  path: `/insuranceManage/insuranceCompany`
                });
              });
          } else {
            this.$store
              .dispatch('insuranceCompany/addInsuranceCompany', this.baseForm)
              .then(() => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.$router.push({
                  path: `/insuranceManage/insuranceCompany`
                });
              });
          }
        } else {
          this.$message.warning('基础信息填写有误!');
        }
      });
    },
    // 获取保险机构详情
    getInsuranceCompanyDetails(id) {
      const vm = this;
      vm.$store
        .dispatch('insuranceCompany/getInsuranceCompanyDetails', {
          id
        })
        .then(res => {
          vm.baseForm = res.obj;
          vm.baseForm.credentialIds = [];
          vm.baseForm.credentials = res.obj.credentials || [];
          vm.baseForm.credentials.forEach(item => {
            vm.baseForm.credentialIds.push(item.id);
          });
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
    // 查看产品详情
    lookProductDetail(id) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${id}/detail`
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
    // 切换编辑
    changeEdit() {
      this.edit = !this.edit;
    },
    // 启用禁用
    enableOrDisable() {
      // 停用
      if (this.baseForm.companyStatus === 1) {
        this.$store
          .dispatch('insuranceCompany/stopCompany', {
            id: this.id,
            status: this.baseForm.companyStatus === 1 ? 2 : 1
          })
          .then(res => {
            if (res.status) {
              this.$message.success(res.message);
              this.$router.push({
                path: `/insuranceManage/insuranceCompany`
              });
            }
          });
        return;
      }
      this.$store
        .dispatch('insuranceCompany/activeCompany', {
          id: this.id,
          status: this.baseForm.companyStatus === 1 ? 2 : 1
        })
        .then(res => {
          if (res.status) {
            this.$message.success(res.message);
            this.$router.push({
              path: `/insuranceManage/insuranceCompany`
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-supplier-details {
  position: relative;
  /deep/ .el-row::after {
    content: none;
  }
  .m-t-24 {
    margin-top: 24px;
  }
  .p-l-24 {
    margin-left: 24px;
    box-sizing: border-box;
    width: calc(100% - 24px);
  }
  .details-content {
    // min-height: calc(100vh - 210px);
    // max-height: calc(100vh - 210px);
    // overflow-y: scroll;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .details-content {
      // padding-bottom: 60px;
      // min-height: calc(100vh - 210px);
      // max-height: calc(100vh - 210px);
      // overflow-y: scroll;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .data-list {
        .data-name {
          font-size: 14px;
          color: #282828;
          font-weight: 600;
        }
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item-table {
        padding: 24px 0;
      }
      .data-item {
        padding: 24px 0;
        .add-certificates {
          margin-top: 20px;
        }
        .data-item {
          .add-certificates {
            margin-top: 20px;
          }
          span {
            margin-right: 24px;
          }
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
