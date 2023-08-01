<template>
  <div class="page-service-items-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            v-if="flag"
            :current-key="activeName"
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="data-form">
                <el-form
                  ref="baseForm"
                  :model="baseForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="form-item">
                    <div class="item-title">基础信息</div>
                    <div class="form-content">
                      <el-row :gutter="20">
                        <el-col v-if="type" :span="12">
                          <el-form-item label="ID" prop="id">
                            <el-input v-model="baseForm.serviceId" disabled />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <div class="company-name">
                            <div class="company-name-input">
                              <el-form-item
                                label="服务类型"
                                prop="reivewedTypeId"
                              >
                                <el-cascader
                                  v-model="baseForm.reivewedTypeId"
                                  :options="prepointServices"
                                  placeholder="请选择服务类型"
                                  :props="optionProps"
                                  :disabled="type"
                                  filterable
                                     popper-class="select-search"
                                  @change="changeReivewedTypeId"
                                />
                              </el-form-item>
                            </div>
                            <button
                              v-if="serviceTypeBtnState"
                              type="button"
                              class="company-name-button"
                              :disabled="!serviceTypeBtnText"
                              @click="toSettingDetail"
                            >
                              {{ serviceTypeBtnText ? '配置详情' : '暂无配置' }}
                            </button>
                          </div>
                        </el-col>
                        <el-col :span="12" style="position: relative">
                          <el-form-item label="服务分类" prop="serviceType">
                            <el-cascader
                              v-model="baseForm.serviceType"
                              :options="serviceTypes"
                              :disabled="type"
                              placeholder="请选择服务分类"
                              :props="serviceTypesProps"
                              filterable
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="供应商" prop="providerId">
                            <el-select
                              v-model="baseForm.providerId"
                              :disabled="isDisabled"
                              filterable
                              placeholder="请选择供应商"
                            >
                              <el-option
                                v-for="item in supplierList"
                                :key="item.companyId"
                                :label="item.companyName"
                                :value="item.companyId"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务项名称" prop="serviceName">
                            <el-input
                              v-model="baseForm.serviceName"
                              :disabled="isDisabled"
                              placeholder="请输入服务项名称"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务项别称" prop="serviceAlias">
                            <el-input
                              v-model="baseForm.serviceAlias"
                              :disabled="isDisabled"
                              maxlength="50"
                              placeholder="区分不同供应商的同一种类型服务（不超过50字，核酸检测-京东安联）"
                              show-word-limit
                            />
                            <!-- <InputMaxTip
                              :max="50"
                              :current-key="baseForm.serviceAlias"
                            /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                           <el-popover
                            placement="bottom"
                            width="590"
                            trigger="hover"
                           >
                           <div>
                            <el-cascader
                            style="width:100%;"
                              v-model="baseToform.tagIds"
                               popper-class="select-search"
                              placeholder="请输入关键字"
                              :options="tagTree"
                              :props="tagTreeProps"
                              filterable
                              disabled
                            />
                           </div>
                               <el-form-item
                               slot="reference"
                            label="服务项标签（至少填写3个标签）"
                            prop="tagIds"
                          >
                            <el-cascader
                              v-model="baseForm.tagIds"
                               popper-class="select-search"
                              placeholder="请输入关键字"
                              :options="tagTree"
                              :props="tagTreeProps"
                              filterable
                              :disabled="isDisabled"
                            />
                          </el-form-item>
                          </el-popover>
                        </el-col>
                        <!-- <el-col :span="12">
                          <el-form-item label="技术开发成本">
                            <el-input
                              v-model="baseForm.techDevCost"
                              :disabled="isDisabled"
                              placeholder="请输入技术开发成本"
                            ></el-input>
                          </el-form-item>
                        </el-col> -->
                        <el-col :span="12">
                          <el-form-item label="合同有效期">
                            <el-select
                              v-model="baseForm.serviceValidTime"
                              :disabled="isDisabled"
                              placeholder="请选择服务类型"
                              filterable
                            >
                              <el-option
                                v-for="item in htValidTimes"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                         <el-col :span="12">
                          <el-form-item label="最低人数设置">
                            <el-input
                              v-model="baseForm.serviceMinPerson"
                              :disabled="isDisabled"
                              placeholder="请输入最低人数设置"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="账期">
                            <el-input
                              v-model="baseForm.accountPeriod"
                              :disabled="isDisabled"
                              placeholder="请输入账期"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="是否需要实名认证">
                            <el-select
                              v-model="baseForm.isAuth"
                              :disabled="isDisabled"
                              placeholder="全部"
                            >
                              <el-option label="需要" :value="1" />
                              <el-option label="不需要" :value="0" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="是否参与智能匹配"
                            prop="recommendFlag"
                          >
                            <el-select
                              v-model="baseForm.recommendFlag"
                              :disabled="isDisabled"
                              placeholder="全部"
                            >
                              <el-option label="参与" :value="0" />
                              <el-option label="不参与" :value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="form-item">
                    <!-- <div class="item-title">其他</div> -->
                    <div class="form-content">
                      <el-row :gutter="20">
                        <!-- <el-col :span="24">
                          <el-form-item label="是否需要实名认证">
                            <el-radio-group
                              v-model="baseForm.isAuth"
                              :disabled="isDisabled"
                            >
                              <el-radio :label="1" :value="1">需要</el-radio>
                              <el-radio :label="0" :value="0">不需要</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <div class="tag-box">
                            <el-form-item label="标签">
                              <el-select
                                :multiple-limit="5"
                                multiple
                                filterable
                                remote
                                v-model="baseForm.tagIds"
                                :disabled="isDisabled"
                                placeholder="请选择标签"
                                :remote-method="getTagList"
                              >
                                <el-option
                                  v-for="item in tagList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <div class="add-tag" @click="addTag">
                              + 新增标签
                            </div>
                          </div>
                        </el-col> -->
                        <el-col :span="24">
                          <el-form-item label="简介">
                            <el-input
                              v-model="baseForm.serviceDescribe"
                              type="textarea"
                              :disabled="isDisabled"
                              :maxlength="40"
                              placeholder="请输入简介"
                              show-word-limit
                            />
                            <!-- <InputMaxTip
                              :max="40"
                              :current-key="baseForm.serviceDescribe"
                            /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="">
                            <div class="required-box">
                              <div class="required">
                                <span class="required">*</span>
                                <span class="label">详情</span>
                              </div>
                              <div id="editor" />
                            </div>
                            <!-- <el-input type="textarea" v-model="baseForm.serviceDescribe" placeholder="请输入简介"></el-input> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="" prop="propogandaPic">
                            <div>
                              <div class="el-form-item__label">
                                <span
                                  ><span class="fc-red">*</span> 宣传头像</span
                                >
                                <span
                                  class="fc-blue ml-10 pointer"
                                  @click="getShowViewer()"
                                  >查看示例</span
                                >
                              </div>
                            </div>
                            <div class="upload">
                              <UploadImg
                                :url="baseForm.propogandaPic"
                                name="propogandaPic"
                                :disabled="isDisabled"
                                :size="'450 * 450'"
                                :proportion="'1:1'"
                                @changeUrl="changeUrl"
                                @deleteImage="deleteImage"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="" prop="detailPic">
                            <div>
                              <div class="el-form-item__label">
                                <span
                                  ><span class="fc-red">*</span> 详情图片</span
                                >
                                <span
                                  class="fc-blue ml-10 pointer"
                                  @click="getShowViewer(true)"
                                  >查看示例</span
                                >
                              </div>
                            </div>
                            <div class="upload">
                              <UploadImg
                                :url="baseForm.detailPic"
                                name="detailPic"
                                :size="'375 * 258'"
                                :proportion="'4:3'"
                                :disabled="isDisabled"
                                @changeUrl="changeUrl"
                                @deleteImage="deleteImage"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <div v-if="activeName === '1'">
              <div class="title-top content-detail">
                需求数据
                <button
                  v-if="!type || edit"
                  type="button"
                  class="btn-save fr"
                  @click="changeKey(1)"
                >
                  修改
                </button>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysDataId[0].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  客户数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysDataId[0]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysDataId[1].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  投保数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysDataId[1]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysDataId[2].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  服务数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysDataId[2]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysDataId[3].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  企业数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysDataId[3]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="activeName === '2'">
              <div class="title-top content-detail">
                回收数据
                <button
                  v-if="!type || edit"
                  type="button"
                  class="btn-save fr"
                  @click="changeKey(2)"
                >
                  修改
                </button>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysBackDataId[0].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  客户数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysBackDataId[0]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysBackDataId[1].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  投保数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysBackDataId[1]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysBackDataId[2].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  服务数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysBackDataId[2]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="data-list">
                <div
                  :class="
                    showKeysBackDataId[3].length > 0
                      ? 'data-name'
                      : 'data-name-none'
                  "
                >
                  企业数据
                </div>
                <div class="data-item border-no">
                  <span v-for="item in showKeysBackDataId[3]" :key="item.id">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="type && isFictitious && activeName === '3'">
              <div class="filter-box">
                <div class="search-form">
                  <div class="form-item v-middle">
                    <span>券号:</span>
                    <el-input
                      v-model="filter.thirdPartCode"
                      placeholder="请输入券号"
                      class="search-input"
                    />
                  </div>
                  <div class="form-item v-middle">
                    <span>状态:</span>
                    <el-select v-model="filter.state" placeholder="请选择状态">
                      <el-option
                        v-for="item in codeStatus"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div>
                    <el-button
                      type="primary"
                      @click.native.prevent="getCodeList"
                    >
                      查询
                    </el-button>
                    <el-button
                      v-if="edit"
                      class="export-button"
                      @click.native.prevent="toggleModal"
                    >
                      券码导入
                    </el-button>
                  </div>
                </div>
              </div>
              <el-table v-loading="tableLoading" :data="codeList">
                <el-table-column label="券号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.thirdPartCode || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="有效期至">
                  <template slot-scope="scope">
                    <span>{{
                      $moment(scope.row.validTime).format('YYYY-MM-DD HH:mm:ss')
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="兑换状态">
                  <template slot-scope="scope">
                    <span>{{ exchangeStatus[scope.row.state] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="76">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.state === 1 && edit"
                      class="primary pointer"
                      @click="cancelCode(scope.row.id)"
                      >失效</span
                    >
                  </template>
                </el-table-column>
              </el-table>
              <Pagination
                :total="pagingOptions.total"
                :limit="pagingOptions.pageSize"
                :page="pagingOptions.pageNo"
                layout="total, prev, pager, next"
                @pagination="getCodeList"
              />
            </div>
            <div v-if="activeName === '4' && $isNotEmpty(id)">
              <div class="network-settings">
                <ServiceSite :id="id" :type="type" :edit="edit" />
                <serviceCity :id="id" :type="type" :edit="edit" />
              </div>
            </div>
            <div v-if="activeName === '5' && $isNotEmpty(id)" class="log-items">
              <Logs :id="baseForm.id" :type="'0'" :has-o-a-log="true" />
            </div>
            <div v-if="activeName === '6' && $isNotEmpty(id)" class="mt-24">
              <appointmentConfig
                :id="id"
                ref="appointmentConfig"
                v-model="baseForm.needVerificationCode"
                :data-list="baseForm.reverseConfigs || []"
                :is-edit="edit"
                :is-review="isReview"
                :is-fictitious="isFictitious"
                :reivewed-type-id="reivewedTypeId"
                :product-specification-list="baseForm.productSpecificationList"
                :reservation-materials="baseForm.reverseMaterialConfigs"
              />
            </div>
            <div v-if="activeName === '7'">
              <InventorySetup :id="id" :is-edit="edit" />
            </div>
            <div v-if="activeName === '8'">
              <settlementSales :id="id" ref="settlementSales" :is-edit="edit" />
            </div>
            <div v-if="activeName === '9'">
              <ServicePackages />
            </div>
          </div>
        </div>
        <div v-if="pageAuthority.includes('edit') || !type" class="page-footer">
          <button
            v-if="baseForm.postStatus === 107"
            type="button"
            class="btn-exit"
            @click="changeStatus(105)"
          >
            发布
          </button>
          <!-- 已发布 -->
          <button
            v-if="baseForm.postStatus === 105"
            type="button"
            class="btn-exit"
            @click="changeStatus(106)"
          >
            下架
          </button>
          <!-- 已下架 -->
          <button
            v-if="baseForm.postStatus === 106"
            type="button"
            class="btn-save"
            @click="changeStatus(105)"
          >
            上架
          </button>
          <button
            v-if="type && !edit && baseForm.postStatus === 107"
            type="button"
            class="btn-save"
            @click="changeEdit()"
          >
            编辑
          </button>

          <button
            v-if="
              (!type || edit) &&
                (activeName === '0' ||
                  activeName === '6' ||
                  activeName === '8') &&
                baseForm.postStatus !== 105
            "
            type="button"
            class="btn-save"
            :disabled="(isDisabled && !activeName === '6') || saveStatus"
            @click="submitForm('baseForm')"
          >
            保存
          </button>
        </div>
      </el-main>
      <elImageViewer
        v-if="showViewer"
        :on-close="showViewerClose"
        :url-list="urlList"
      />
      <KeySelectModal
        :key-selected-list="keySelectedList"
        :is-show="isShow"
        :key-type="keyType"
        @close="closeModal"
        @submit="saveKeys"
      />
      <ExportCodeModal
        v-if="exportModalshow"
        :id="baseForm.id"
        :is-show="exportModalshow"
        @close="toggleModal"
        @save="saveCode"
      />
    </el-container>
  </div>
</template>
<script>
import KeySelectModal from './component/keyModal';
import uploadImage from '@/utils/uploadImage';
import { operationType, menuType, exchangeStatus } from '@/utils/enum';
import { editorUploadImage } from '@/utils/common';
import E from 'wangeditor';
import ExportCodeModal from './component/exportCode';
import ServiceSite from './component/serviceSite';
import serviceCity from './component/serviceCity';
import { mapActions } from 'vuex';
import appointmentConfig from './component/appointmentConfig';
import InventorySetup from './component/InventorySetup';
import settlementSales from './component/settlementSales';
import ServicePackages from './component/servicePackages';
import { getTagTree } from '@/api/serviceItems';
let editor;
export default {
  name: 'ServiceItemsDetails',
  components: {
    KeySelectModal,
    ExportCodeModal,
    ServiceSite,
    serviceCity,
    appointmentConfig,
    InventorySetup,
    settlementSales,
    ServicePackages
  },
  data() {
    const defaultForm = {
      serviceType: [],
      serviceName: '',
      providerId: '',
      serviceCostPrice: '0',
      servicePricePeriod: 1,
      serviceValidTime: 1,
      serviceMinPerson: '0',
      serviceUserCount: 1,
      serviceDescribe: '',
      propogandaPic: '',
      detailPic: '',
      needDatas: [],
      backDatas: [],
      serviceSiteVos: [],
      serviceCityVos: [],
      reivewedTypeId: [],
      isAuth: 1,
      tagIds: '',
      remark: '',
      serviceAlias: '',
      reverseConfigs: [],
      postStatus: null,
      needVerificationCode: 0,
      isRelationProduct: 0,
      productSpecificationList: [],
      recommendFlag: 1
    };
    const checkServiceCostPrice = (rule, value, callback) => {
      if (!/^[0-9]+$/.test(value)) {
        return callback(new Error('请输入正确的成本价格'));
      }
      callback();
    };
    const checkNumber = (rule, value, callback) => {
      if (!/^[0-9]+$/.test(value)) {
        return callback(new Error('请输入数字类型'));
      }
      callback();
    };

    return {
      init: false,
      ruleName: '',
      isNew: false,
      urlList: [],
      showViewer: false,
      list1: require('@/assets/list1.png'),
      list2: require('@/assets/list2.png'),
      flag: false,
      tableLoading: false,
      type: false,
      edit: true,
      activeName: '0',
      isShow: false,
      addDoorCityShow: false,
      addNetworkShow: false,
      exportModalshow: false,
      keyType: 1,
      baseForm: this.$extends({}, defaultForm),
      baseToform: this.$extends({}, defaultForm),
      supplierList: [],
      // 弹框展示数据
      keySelectedList: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      // 需求数据
      keySelectedDataIds: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      // 回收数据
      keySelectedBackDataIds: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      // 需求数据显示
      showKeysDataId: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      // 回收数据显示
      showKeysBackDataId: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      // 上一次数据
      lastKeySelectedList: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      rules: {
        id: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        tagIds: [
          {
            required: true,
            message: '请选择标签',
            trigger: 'blur'
          }
        ],
        serviceName: [
          {
            required: true,
            message: '请输入服务项名称',
            trigger: 'blur'
          }
        ],
        serviceType: [
          {
            required: true,
            message: '请选择服务分类',
            trigger: 'change'
          }
        ],
        serviceAlias: [
          {
            required: true,
            message: '请输入服务项别名',
            trigger: 'change'
          }
        ],
        providerId: [
          {
            required: true,
            message: '请选择供应商',
            trigger: 'change'
          }
        ],
        serviceCostPrice: [
          {
            required: true,
            message: '请输入成本价格',
            trigger: 'blur'
          },
          { validator: checkServiceCostPrice, trigger: 'blur' }
        ],
        techDevCost: [
          {
            required: true,
            message: '请输入技术开发成本',
            trigger: 'blur'
          },
          { validator: checkNumber, trigger: 'blur' }
        ],
        accountPeriod: [
          { required: true, message: '请输入账期', trigger: 'blur' }
        ],
        serviceMinPerson: [
          {
            required: true,
            message: '请输入最低人数限制',
            trigger: 'blur'
          },
          { validator: checkNumber, trigger: 'blur' }
        ],
        serviceValidTime: [
          {
            required: true,
            message: '请选择合同有效期',
            trigger: 'change'
          }
        ],
        serviceUserCount: [
          {
            required: true,
            message: '请选择使用次数',
            trigger: 'change'
          }
        ],
        serviceDescribe: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        propogandaPic: [
          {
            required: true,
            message: '请上传宣传头像',
            trigger: 'change'
          }
        ],
        detailPic: [
          {
            required: true,
            message: '请上传详情图片',
            trigger: 'change'
          }
        ],
        reivewedTypeId: [
          {
            required: true,
            message: '请选择服务类型',
            trigger: 'change'
          }
        ],
        isAuth: [
          {
            required: true,
            message: '请选择是否需要实名认证',
            trigger: 'change'
          }
        ],
        recommendFlag: [
          {
            required: true,
            message: '请选择是否参与智能匹配',
            trigger: 'change'
          }
        ]
      },
      operationType,
      menuType,
      // 服务类型
      serviceTypes: [],
      // 标签树
      tagTree: [],
      servicePricePeriods: [],
      htValidTimes: [],
      prepointServices: [],
      optionProps: {
        label: 'name',
        value: 'id'
      },
      serviceTypesProps: {
        label: 'name',
        value: 'id',
        children: 'childs',
        checkStrictly: true
      },
      tagTreeProps: {
        label: 'name',
        value: 'id',
        children: 'child',
        multiple: true
      },
      filter: {
        code: '',
        status: ''
      },
      codeStatus: [
        {
          name: '已兑换',
          value: 0
        },
        {
          name: '未兑换',
          value: 1
        },
        {
          name: '失效',
          value: 2
        }
      ],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      codeList: [],
      exchangeStatus,
      item: {},
      id: '',
      index: null,
      saveStatus: false,
      btns: [],
      tagList: [],
      outOfStock: false,
      serviceTypeBtnState: false, // 服务类型按钮
      serviceTypeBtnText: false, // 按钮文字状态
      settingDetailId: '', // 跳转id
      settingDetailType: '', // 应用设置类型
      tempType: '', // 购药类型
      tagIdsArray: []
    };
  },
  watch: {
    baseForm(val) {
      if (val.tagIds.length > 10) {
      //      this.$message({
      //     message: '最多只支持选择10项',
      //     duration: 1500,
      //     type: 'warning'
      //   });
        this.$nextTick(() => {
          this.baseForm.tagIds = this.tagIdsArray;
        });
      }
    }
  },
  computed: {
    pageAuthority() {
      // 100102 服务项
      return this.$store.state.user.pageAuthority['100102'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    // 是否为预约服务
    isReview() {
      return (
        this.$isNotEmpty(this.baseForm.reivewedTypeId) &&
        this.baseForm.reivewedTypeId[0] === 56
      );
    },
    reivewedTypeId() {
      return this.baseForm.reivewedTypeId[1];
    },
    // 是否为虚拟商品
    isFictitious() {
      return this.baseForm.reivewedTypeId[1] === 96;
    },
    // 是否为在线服务
    isOnline() {
      return (
        this.$isNotEmpty(this.baseForm.reivewedTypeId) &&
        this.baseForm.reivewedTypeId[0] === 57
      );
    },
    // 查看或者发布
    isDisabled() {
      return (
        !this.edit ||
        this.baseForm.postStatus === '105' ||
        (this.baseForm.postStatus === '106' && this.baseForm.isRelationProduct)
      );
    }
  },
  async created() {
    this.init = false;
    this.id = this.$route.params.id === 'add' ? null : this.$route.params.id;
    this.activeName = this.$route.params.tabIndex
      ? this.$route.params.tabIndex
      : '0';

    // 页面选项配置项查询
    // 价格类型
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'priceType'
      })
      .then(res => {
        this.servicePricePeriods = res.obj || [];
      });
    // 合同有效期
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'htValidTime'
      })
      .then(res => {
        this.htValidTimes = res.obj || [];
      });
    // 服务类型
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'prepointService'
      })
      .then(res => {
        this.prepointServices = res.obj || [];
      });
    // 获取数据字段全部数据
    this.getKeys();
    // 判断是新增还是编辑
    this.type = this.$route.params.id !== 'add' ? true : false;
    // 判断是查看还是编辑
    this.edit = this.$route.params.type === 'edit' ? true : false;

    await this.getProviderList();

    // 服务类型
    this.getTreeList().then(res => {
      this.serviceTypes = res.data || [];
    });
    getTagTree().then(res => {
      this.tagTree = this.getTreeData(res.data);
    });
    this.init = true;
    if (this.id) {
  this.initData();
    }
  },
  mounted() {
    editor = new E('#editor');
    // editor.customConfig = {
    //     onchange:function(html){
    //         That.Content = html
    //     },
    //     uploadImgServer: `${process.env.VUE_APP_BASE_API}/scm/sys/uploadPic`, // 上传图片到服务器
    //     uploadImgMaxLength : 1 , // 限制一次最多上传 1 张图片
    // }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      editorUploadImage(files)
        .then(res => {
          // insert 是获取图片 url 后，插入到编辑器的方法
          insert(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    };
    editor.customConfig.zIndex = 1;
    editor.create();
  },
  methods: {
    ...mapActions('tagLibrary', ['getChildTag']),
    ...mapActions('serviceType', ['getTypeList', 'getTreeList']),
    // 递归删除空科室方法
    getTreeData(data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].child && data[i].child.length < 1) {
          // children若为空数组，则将children删除
          delete data[i].child;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          if (data[i].child) {
            this.getTreeData(data[i].child);
          }
        }
      }
      return data;
    },
    // 服务类型改变
    changeReivewedTypeId(val) {
      if (val[0] === 57) {
        this.serviceTypeBtnState = true;
        this.$store
          .dispatch('serviceItems/getServiceSetDetail', {
            serviceTypeId: val[1]
          })
          .then(res => {
            this.serviceTypeBtnText = res.data.status;
            this.settingDetailType = res.data.type;
            this.settingDetailId = res.data.serviceId;
            this.tempType = res.data.tempType;
            if (res.data.supplierId && this.edit && !this.type) {
              this.baseForm.providerId = res.data.supplierId;
            } else if (!res.data.supplierId && this.edit && !this.type) {
              this.baseForm.providerId = '';
            }
          });
      } else {
        this.serviceTypeBtnState = false;
      }
    },
    // 跳转应用设置
    toSettingDetail() {
      if (this.serviceTypeBtnText) {
        let url = '';
        // 1.健康专栏 2 问诊管理 3 医师服务
        if (this.settingDetailType === 1) {
          localStorage.setItem('healthColumnName', this.settingDetailId);
          url = `/healthColumn/applicationSetting`;
        } else if (this.settingDetailType === 2) {
          url = `/drugManage/applicationSettings/create/${
            this.settingDetailId
          }/1/${this.tempType === 0 ? 'single' : 'double'}`;
        } else if (this.settingDetailType === 3) {
          url = `/secondaryTreatment/auditMaterials/detail/${this.settingDetailId}/detail`;
        }
        const routeData = this.$router.resolve({
          path: url
        });
        window.open(routeData.href, '_blank');
      }
    },
    /**
     * 跟新发布状态
     */
    changeStatus(status) {
      if (status === 106) {
        this.$confirm('确认要下架吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('serviceItems/downShelfServiceInfo', {
                id: this.id,
                status: status
              })
              .then(res => {
                if (!res.code) {
                  this.$message.success(res.comment);
                  this.$router.push('/supplyChainManage/serviceItems');
                }
              });
          })
          .catch(() => {});
        return;
      }
      this.$store
        .dispatch('serviceItems/publishServiceInfo', {
          id: this.id,
          status: status
        })
        .then(res => {
          if (!res.code) {
            this.$message.success(res.comment);
            this.$router.push('/supplyChainManage/serviceItems');
          }
        });
    },
    /**
     * 获取详情数据
     */
    getDetail() {
      this.$store
        .dispatch('serviceItems/getServiceInfo', {
          id: this.id
        })
        .then(res => {
          this.tagIdsArray = res.obj.tagIds.slice(0, 10);
          this.baseForm = {
            ...res.obj,
            // ...res.obj.tagIds.slice(0, 9),
            id: this.id
          };
          this.baseToform = {
            ...res.obj,
            // ...res.obj.tagIds.slice(0, 9),
            id: this.id
          };
          editor.txt.html(this.baseForm.serviceDetail);
          // 处理需求和回收数据显示结构
          for (const key in this.$store.state.serviceItems.keyList) {
            const keys = this.$store.state.serviceItems.keyList[key];
            if (this.baseForm.needDatas) {
              this.baseForm.needDatas.forEach(id => {
                keys.forEach(item => {
                  if (id === item.id) {
                    this.keySelectedDataIds[key].push(id);
                    this.showKeysDataId[key].push(item);
                  }
                });
              });
            }
          }
          for (const key in this.$store.state.serviceItems.keyList) {
            const keys = this.$store.state.serviceItems.keyList[key];
            if (this.baseForm.backDatas) {
              this.baseForm.backDatas.forEach(id => {
                keys.forEach(item => {
                  if (id === item.id) {
                    this.keySelectedBackDataIds[key].push(id);
                    this.showKeysBackDataId[key].push(item);
                  }
                });
              });
            }
          }

          // 根据路由设置tab切换按钮个数
          this.setBtns();
        });
    },
    // 获取供应商数据
    getProviderList() {
      this.$store
        .dispatch('serviceItems/getCreditList', {
          pageNum: 1,
          pageSize: 1000
          //   accountStatus: 2
        })
        .then(res => {
          res.obj.forEach(item => {
            item.companyName = `${item.name} ${item.grade}`;
          });
          this.supplierList = res.obj || [];
          if (this.type && this.id) {
            this.getDetail();
          } else {
            this.setBtns();
          }
        });
    },
    // 预览图片
    getShowViewer(isList) {
      if (isList) {
        this.urlList = [this.list1];
      } else {
        this.urlList = [this.list2];
      }
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    },
    // tab切换
    handleClick(tab) {
      this.activeName = tab;
      const tabItem = this.btns.find(item => item.value === tab);
      if (tabItem.isNew) {
        tabItem.isNew = false;
      }
      if (tab === '3') {
        if (this.pageNum) {
          this.getCodeList({
            page: Number(this.pageNum)
          });
        } else {
          this.getCodeList({});
        }
      }
    },
    // 宣传头像上传
    uploadPropogandaPic(item) {
      uploadImage(item)
        .then(res => {
          this.baseForm.propogandaPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 详情图片上传
    uploadDetailPic(item) {
      uploadImage(item)
        .then(res => {
          this.baseForm.detailPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 字段修改弹框打开
    changeKey(type) {
      this.isShow = true;
      this.keyType = type;
      if (type === 1) {
        this.keySelectedList = this.keySelectedDataIds;
        this.lastKeySelectedList = Object.assign({}, this.keySelectedList);
      } else {
        this.keySelectedList = this.keySelectedBackDataIds;
        this.lastKeySelectedList = Object.assign({}, this.keySelectedList);
      }
    },
    skipDetail() {
      const id = this.baseForm.providerId;
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/supplier/details/${id}/edit`
      });
      window.open(routeData.href, '_blank');
    },
    // 保存或新增服务项
    submitForm(formName) {
      this.saveStatus = true;
      if (this.activeName === '0') {
        this.$refs[formName].validate(valid => {
          const serviceDetail = editor.txt.html();
          if (valid && serviceDetail !== '<p><br></p>') {
            let needDatas = [];
            let backDatas = [];
            for (const key in this.keySelectedDataIds) {
              needDatas = [...needDatas, ...this.keySelectedDataIds[key]];
            }
            for (const key in this.keySelectedBackDataIds) {
              backDatas = [...backDatas, ...this.keySelectedBackDataIds[key]];
            }
            this.baseForm = {
              ...this.baseForm,
              serviceDetail,
              needDatas,
              backDatas
            };

            if (this.baseForm.id) {
              this.$store
                .dispatch('serviceItems/updateServiceItem', this.baseForm)
                .then(res => {
                  this.saveStatus = false;
                  if (res.code === 0) {
                    this.$message.success('保存成功');
                  }
                })
                .catch(() => {
                  this.saveStatus = false;
                });
            } else {
              this.$store
                .dispatch('serviceItems/createServiceItem', this.baseForm)
                .then(res => {
                  this.saveStatus = false;
                  if (res.code === 0) {
                    this.$message.success('新增成功');
                    this.id = res.data;
                    this.type = true;
                    this.isNew = true;

                    // 服务项标签分词
                    const {
                      serviceDescribe,
                      serviceAlias,
                      serviceName
                    } = this.baseForm;
                    const params = {
                      serviceAbout: serviceDescribe,
                      serviceAnother: serviceAlias,
                      serviceName,
                      serviceId: this.id
                    };
                    this.$store
                      .dispatch('serviceItems/setServiceLable', params)
                      .then(() => {
                        // do something
                      });
                    if (this.$isNotEmpty(this.id)) {
                      this.getDetail();
                    }
                  }
                })
                .catch(() => {
                  this.saveStatus = false;
                });
            }
          } else {
            this.saveStatus = false;
            this.$message.warning('基础信息必填项不能为空!');
          }
        });
      }
      if (this.activeName === '6') {
        if (this.$isNotEmpty(this.$refs.appointmentConfig)) {
          const dtos = this.$refs.appointmentConfig.configList;
          const materialConfigVos = this.$refs.appointmentConfig.materials;
          const isMaterialConfigVo = materialConfigVos.find(item => {
            return !item.materialId || item.mandatory === null;
          });
          if (isMaterialConfigVo) {
            this.$message.error('材料有必填项未填');
            this.saveStatus = false;
            return;
          }
          const dataList = [];
          if (this.$isNotEmpty(dtos)) {
            dtos.forEach(item => {
              if (this.$isNotEmpty(item.childs)) {
                item.childs.forEach(ids => {
                  const obj = {};
                  obj.reserveConfigId = ids.id;
                  obj.value = ids.value;
                  obj.pid = item.id;
                  dataList.push(obj);
                });
              }
            });
          }
          const data = {
            dtos: dataList,
            serviceInfoId: this.id,
            needVerificationCode: this.baseForm.needVerificationCode,
            materialConfigVos
          };
          if (this.baseForm.reivewedTypeId[1] === 97) {
            data.productSpecificationList = this.$refs.appointmentConfig.specs.filter(
              item => this.$isNotEmpty(item.productSpecificationName),
            );
          }
          this.$store
            .dispatch('serviceItems/saveReverseConfig', data)
            .then(() => {
              this.saveStatus = false;
              this.baseForm.reverseConfigs = dtos;
              this.$message.success('保存成功');
            })
            .catch(() => {
              this.saveStatus = false;
            });
        }
      }
      if (this.activeName === '8') {
        this.saveStatus = false;
        this.$refs.settlementSales.saveForm();
      }
    },
    /**
     * 设置btns
     */
    setBtns() {
      this.flag = false;
      // 如果是新增
      if (this.$isEmpty(this.id)) {
        this.btns = [
          { value: '0', name: '基础信息' }
          // { value: '1', name: '需求数据' },
          // { value: '2', name: '回收数据' }
        ];
      } else {
        if (this.isReview) {
          this.btns = [
            { value: '0', name: '基础信息' },
            { value: '8', name: '结算销售信息', isNew: this.isNew },
            { value: '6', name: '配置信息', isNew: this.isNew },
            { value: '4', name: '网点设置', isNew: this.isNew },
            {
              value: '7',
              name: '库存设置',
              isNew: this.outOfStock
            },
            { value: '9', name: '涉及服务包' },
            { value: '1', name: '需求数据' },
            { value: '2', name: '回收数据' },
            { value: '5', name: '操作日志' }
          ];
        } else if (this.isOnline) {
          // 在线服务
          this.btns = [
            { value: '0', name: '基础信息' },
            { value: '8', name: '结算销售信息', isNew: this.isNew },
            {
              value: '7',
              name: '库存设置',
              isNew: this.outOfStock
            },
            { value: '9', name: '涉及服务包' },
            { value: '1', name: '需求数据' },
            { value: '2', name: '回收数据' },
            { value: '5', name: '操作日志' }
          ];
          // 服务类型按钮
          this.changeReivewedTypeId(this.baseForm.reivewedTypeId);
        } else if (this.isFictitious) {
          // 虚拟商品
          this.btns = [
            { value: '0', name: '基础信息' },
            { value: '8', name: '结算销售信息', isNew: this.isNew },
            { value: '6', name: '配置信息', isNew: this.isNew },
            { value: '3', name: '供应商券码' },
            {
              value: '7',
              name: '库存设置',
              isNew: this.outOfStock
            },
            { value: '9', name: '涉及服务包' },
            { value: '1', name: '需求数据' },
            { value: '2', name: '回收数据' },
            { value: '5', name: '操作日志' }
          ];
        } else {
          // 实物
          this.btns = [
            { value: '0', name: '基础信息' },
            { value: '8', name: '结算销售信息', isNew: this.isNew },
            { value: '6', name: '配置信息', isNew: this.isNew },
            {
              value: '7',
              name: '库存设置',
              isNew: this.outOfStock
            },
            { value: '9', name: '涉及服务包' },
            { value: '1', name: '需求数据' },
            { value: '2', name: '回收数据' },
            { value: '5', name: '操作日志' }
          ];
        }
      }
      this.flag = true;
    },

    // 字段修改弹框关闭
    closeModal(data) {
      if (data.type === 1) {
        this.keySelectedDataIds = this.lastKeySelectedList;
      } else {
        this.keySelectedBackDataIds = this.lastKeySelectedList;
      }
      this.isShow = false;
    },
    // 字段修改弹框确认
    saveKeys(data) {
      const showObj = {
        0: [],
        1: [],
        2: [],
        3: []
      };
      for (const key in data.keySelectedList) {
        this.getShowKeys(data.keySelectedList[key], key, showObj);
      }
      if (data.type === 1) {
        this.showKeysDataId = showObj;
        this.keySelectedDataIds = data.keySelectedList;
        this.lastKeySelectedList = this.keySelectedDataIds;
      } else {
        this.showKeysBackDataId = showObj;
        this.keySelectedBackDataIds = data.keySelectedList;
        this.lastKeySelectedList = this.keySelectedBackDataIds;
      }
      this.isShow = false;
    },
    // 展示字段过滤
    getShowKeys(list, key, showObj) {
      const keyList = this.$store.state.serviceItems.keyList;
      list.forEach(id => {
        keyList[key].forEach(item => {
          if (item.id === id) {
            showObj[key].push(item);
          }
        });
      });
    },
    // 获取数据字段
    getKeys() {
      this.$store.dispatch('serviceItems/getKeys');
    },
    // 删除图片
    deleteImage(key) {
      this.baseForm[key] = '';
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    changeEdit() {
      this.edit = !this.edit;
    },
    // 弹框切换开关
    toggleModal() {
      this.exportModalshow = !this.exportModalshow;
    },
    // 保存券码
    saveCode() {
      this.toggleModal();
      this.getCodeList();
    },
    // 券码查询
    getCodeList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        serviceInfoId: this.baseForm.id
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.$store
        .dispatch('serviceItems/getCodeList', params)
        .then(res => {
          this.tableLoading = false;
          this.codeList = res.records;
          this.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 券码失效
    cancelCode(id) {
      this.$confirm('此操作将该券码失效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('serviceItems/cancelCode', {
            id
          })
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.comment
              });
              this.getCodeList();
            } else {
              this.$message({
                type: 'warning',
                message: res.comment
              });
            }
          });
      });
    },
    // 获取标签list
    getTagList(name) {
      this.getChildTag({
        serviceInfoid: this.id,
        name
      }).then(res => {
        this.tagList = res.data.records || [];
      });
    },
    // 图片上传地址
    changeUrl(name, url) {
      this.baseForm[name] = url;
    },
    // 添加标签
    addTag() {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/tagLibrary`
      });
      window.open(routeData.href, '_blank');
    },
    initData: async function() {
      const res = await this.$store.dispatch(
        'inventory/detailInventory',
        this.$route.params.id,
      );
      if (res) {
        if (res.data.shortageStorageCount > 0) {
          this.outOfStock = true;
        } else {
          this.outOfStock = false;
        }
        this.setBtns();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-service-items-details {
  .details-content {
    position: relative;
    .data-form {
      width: 100%;
      padding-top: 30px;
      .form-item {
        .item-title {
          color: #464668;
          font-size: 18px;

          font-weight: 600;
          color: #464668;
          margin-bottom: 30px;
        }
      }
      .form-content {
        width: 100%;
        .tag-box {
          position: relative;
          display: flex;
          width: 500px;
          .el-form-item {
            flex: 1;
          }
          .add-tag {
            width: 100px;
            font-size: 16px;

            font-weight: 400;
            color: #3599fe;
            line-height: 80px;
            margin-left: 30px;
            cursor: pointer;
          }
        }
        .company-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .company-name-input {
            width: 100%;
            // flex: 1;
          }
          .company-name-button {
            outline: none;
            border: none;
            margin-bottom: 7px;
            width: 96px;
            height: 36px;
            background: #3599fe;
            line-height: 36px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            margin-left: 12px;
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
            &:disabled {
              cursor: not-allowed;
            }
            border-radius: 4px 4px 4px 4px;
          }
        }
      }
    }
    .filter-box {
      width: 100%;
      position: relative;
      padding-top: 9px;
      .search-form {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        .form-item {
          display: flex;
          align-items: center;
          margin: 0 24px 24px 0;
          span {
            display: inline-block;
            min-width: 80px;
            color: #555;
            font-size: 14px;
          }
          .search-input {
            width: 200px;
          }
        }
        .export-button {
          color: #2276ff;
          border-color: #2276ff;
          &:hover {
            background-color: #ecf5ff;
          }
        }
      }
    }
    .upload {
      position: relative;
      display: inline-block;
      &:hover {
        .icon-delete {
          display: block;
        }
      }
      .icon-delete {
        display: none;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        left: 172px;
        background-image: url('../../assets/icon-delete.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
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
    // .data-form{
    //     padding-top: 24px;
    // }
    .data-list {
      padding-top: 11px;
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
        padding: 12px 24px;
        display: flex;
        flex-wrap: wrap;
        span {
          font-size: 12px;
          color: #282828;
          margin-right: 16px;
          display: inline-block;
          width: 98px;
          height: 24px;
          border: 1px solid #c6ddff;
          color: #2276ff;
          line-height: 24px;
          text-align: center;
          border-radius: 4px;
        }
      }
    }
    .network-settings {
      margin-top: 12px;
      .item {
        margin-bottom: 24px;
        .item-title {
          margin-bottom: 24px;
          span {
            font-size: 14px;
            color: #282828;
            font-weight: 600;
            margin-right: 24px;
          }
        }
      }
    }
    .add-button {
      margin-top: 24px;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .cost {
    width: 100%;
    display: flex;
    align-items: center;
    .costPrice {
      flex: 1;
      .el-input {
        width: 100%;
      }
    }
    .costType {
      width: 110px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
  .required-box {
    .required {
      color: #ff4949;
    }
    .label {
      color: #606266;
    }
  }
}
</style>
