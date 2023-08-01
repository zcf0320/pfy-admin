<template>
  <div class="product-settlement-page">
    <el-tabs v-model="activeName" class="mt-24  no-content" type="card">
      <el-tab-pane label="保单结算" name="1" />
      <el-tab-pane label="理赔服务结算" name="2" />
    </el-tabs>
    <div v-show="activeName == 1" class="policy-content">
      <el-form
        ref="policyForm"
        :model="policyForm"
        label-width="0"
        label-position="left"
      >
        <div class="settlement-item-input mb-24">
          <div class="settlement-item-input-l">结算设置：</div>
          <div class="settlement-item-input-r">
            <el-form-item
              prop="needSettlement"
              :rules="[
                {
                  required: true,
                  message: '请选择是否需要结算',
                  trigger: 'blur',
                },
              ]"
            >
              <el-radio-group
                v-model="policyForm.needSettlement"
                :disabled="edit === 'detail'"
              >
                <el-radio :label="true">需要结算</el-radio>
                <el-radio :label="false">无需结算</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <template v-if="policyForm.needSettlement">
          <div class="settlement-item-input mb-0">
            <div class="settlement-item-input-l">结算方式：</div>
            <div class="settlement-item-input-r">
              <el-form-item
                prop="pricingMethod"
                :rules="[
                  {
                    required: true,
                    message: '请选择结算方式',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio-group
                  v-model="policyForm.pricingMethod"
                  :disabled="edit === 'detail'"
                >
                  <el-radio :label="1">固定额度</el-radio>
                  <el-radio :label="2">固定比例</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div v-if="policyForm.pricingMethod === 1" class="policytable mt-24">
            <el-table
              v-loading="policyLoading"
              :data="policyForm.planPriceList"
            >
              <el-table-column label="保障计划" width="250">
                <template slot-scope="scope">
                  <span>{{ scope.row.planName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="结算金额（每个保单）">
                <template slot-scope="scope">
                  <div>
                    <el-form-item
                      :prop="`planPriceList[${scope.$index}].pricePerUse`"
                      :rules="[{ validator: validateMoney, trigger: 'blur' }]"
                    >
                      <el-input
                        v-model="
                          policyForm.planPriceList[scope.$index].pricePerUse
                        "
                        :disabled="edit === 'detail'"
                        type="number"
                        placeholder="请输入结算金额"
                      />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="policyForm.pricingMethod === 2" class="policytable mt-24">
            <el-table
              v-loading="policyLoading"
              :data="policyForm.planPriceList"
            >
              <el-table-column label="保障计划" width="250">
                <template slot-scope="scope">
                  <span>{{ scope.row.planName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="比例（%）">
                <template slot-scope="scope">
                  <div>
                    <el-form-item
                      :prop="`planPriceList[${scope.$index}].pricePerPolicy`"
                      :rules="[{ validator: validateUse, trigger: 'blur' }]"
                    >
                      <el-input
                        v-model="
                          policyForm.planPriceList[scope.$index].pricePerPolicy
                        "
                        :disabled="edit === 'detail'"
                        type="number"
                        placeholder="请输入比例"
                      />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="自定义保费" width="250">
                <template slot-scope="scope">
                  <div>
                    <span
                      :class="
                        scope.row.customPremium ? 'text-green' : 'text-red'
                      "
                      >{{ scope.row.customPremium ? '已设置' : '未设置' }}</span
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="settlement-item-input mt-24">
            <div class="settlement-item-input-l">结算规则：</div>
            <div class="settlement-item-input-r">
              <el-form-item
                prop="timeRuleType"
                :rules="[
                  {
                    required: true,
                    message: '请选择结算规则',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio-group
                  v-model="policyForm.timeRuleType"
                  :disabled="edit === 'detail'"
                >
                  <el-radio :label="0">每月1号00:00自动生成结算单</el-radio>
                  <el-radio :label="1">自定义规则</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="settlement-item-rule">
            <div v-if="policyForm.timeRuleType === 1" class="rule flex">
              <el-form-item
                label=""
                prop="cronType"
                :rules="[
                  {
                    required: true,
                    message: '请选择周期类型',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-select
                  v-model="policyForm.cronType"
                  :disabled="edit === 'detail'"
                  placeholder="请选择"
                  style="width: 140px"
                  @change="changeMonth1"
                >
                  <el-option
                    v-for="item in ruleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <div v-if="policyForm.cronType == '1'" class="rule-detail flex">
                <span class="fs-14 fc-black">每月</span>
                <el-form-item
                  label=""
                  prop="dayOfMonth"
                  :rules="[
                    { required: true, message: '请选择日期', trigger: 'blur' },
                  ]"
                >
                  <el-select
                    v-model="policyForm.dayOfMonth"
                    :disabled="edit === 'detail'"
                    placeholder="请选择日期"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in dayList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">日</span>
              </div>
              <div v-if="policyForm.cronType != '1'" class="rule-detail flex">
                <span v-if="policyForm.cronType == '2'" class="fs-14 fc-black"
                  >每季度,第</span
                >
                <span v-if="policyForm.cronType == '3'" class="fs-14 fc-black"
                  >每年</span
                >
                <el-form-item
                  v-if="policyForm.cronType == '2'"
                  prop="month"
                  :rules="[
                    { required: true, message: '请选择月份', trigger: 'blur' },
                  ]"
                >
                  <el-select
                    v-model="policyForm.month"
                    :disabled="edit === 'detail'"
                    placeholder="请选择月份"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in yearList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="policyForm.cronType == '3'"
                  label=""
                  prop="month"
                  :rules="[
                    { required: true, message: '请选择月份', trigger: 'blur' },
                  ]"
                >
                  <el-select
                    v-model="policyForm.month"
                    :disabled="edit === 'detail'"
                    placeholder="请选择月份"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in monthList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">月</span>
                <el-form-item
                  prop="dayOfMonth"
                  :rules="[
                    { required: true, message: '请选择日期', trigger: 'blur' },
                  ]"
                >
                  <el-select
                    v-model="policyForm.dayOfMonth"
                    :disabled="edit === 'detail'"
                    placeholder="请选择日期"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in dayList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">日</span>
              </div>
            </div>
          </div>
        </template>
      </el-form>
    </div>
    <div v-show="activeName == 2">
      <el-form
        ref="baseForm"
        :model="baseForm"
        label-width="0"
        label-position="left"
      >
        <div class="service-settle">
          <div class="settlement-item-input fl">
            <div class="settlement-item-input-l">结算设置：</div>
            <div class="settlement-item-input-r">
              <el-form-item
                prop="needSettlement"
                :rules="[
                  {
                    required: true,
                    message: '请选择是否需要结算',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio-group
                  v-model="baseForm.needSettlement"
                  :disabled="edit === 'detail'"
                  @change = "addData"
                >
                  <el-radio :label="true">需要结算</el-radio>
                  <el-radio :label="false">无需结算</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <button
            v-if="edit === 'edit' && baseForm.needSettlement"
            type="button"
            class="btn-save fr"
            @click="addRule"
          >
            新增规则
          </button>
        </div>
        <template v-if="baseForm.needSettlement">
          <div
            v-for="(item, index) in baseForm.ruleList"
            :key="`规则${index}`"
            class="settlement-item"
          >
            <div class="settlement-item-title">
              规则{{ index + 1 }}
              <div
                v-if="edit === 'edit'"
                class="settlement-del"
                @click="delRule(index)"
              >
                <i class="el-icon-delete"></i>
              </div>
            </div>
            <div class="settlement-item-input">
              <div class="settlement-item-input-l">选择服务：</div>
              <div class="settlement-item-input-r">
                <el-form-item
                  :prop="`ruleList[${index}].serviceItemId`"
                  :rules="[
                    {
                      required: true,
                      message: '请选择需结算的服务项',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    v-model="baseForm.ruleList[index].serviceItemId"
                    :disabled="edit === 'detail'"
                    placeholder="请选择需结算的服务项"
                    filterable
                    @change="serviceChange(index)"
                  >
                    <el-option
                      v-for="val in reviewMaterials"
                      :key="val.serviceInfoId"
                      :disabled="val.select"
                      :label="val.serviceInfoName"
                      :value="val.serviceInfoId"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="settlement-item-input">
              <div class="settlement-item-input-l">定价方式：</div>
              <div class="settlement-item-input-r">
                <el-form-item
                  :prop="`ruleList[${index}].pricingMethod`"
                  :rules="[
                    {
                      required: true,
                      message: '请选择定价方式',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-radio-group
                    v-model="baseForm.ruleList[index].pricingMethod"
                    :disabled="edit === 'detail'"
                  >
                    <el-radio :label="1">按权益使用次数</el-radio>
                    <!-- <el-radio :label="2">按服务关联的保单数量</el-radio> -->
                    <el-radio
                      v-if="baseForm.ruleList[index].isBuyMedicine"
                      :label="3"
                      >按订单实际金额</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div
              v-if="baseForm.ruleList[index].pricingMethod === 1"
              class="settlement-input-text"
            >
              <el-form-item
                :prop="`ruleList[${index}].pricePerUse`"
                :rules="[
                  { required: true, message: '请输入价格', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.number="baseForm.ruleList[index].pricePerUse"
                  :disabled="edit === 'detail'"
                  placeholder="请输入价格"
                  type="number"
                >
                  <template slot="append">每次</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="settlement-item-input">
              <div class="settlement-item-input-l">结算规则：</div>
              <div class="settlement-item-input-r">
                <el-form-item
                  :prop="`ruleList[${index}].timeRuleType`"
                  :rules="[
                    {
                      required: true,
                      message: '请选择结算规则',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-radio-group
                    v-model="baseForm.ruleList[index].timeRuleType"
                    :disabled="edit === 'detail'"
                  >
                    <el-radio :label="0">每月1号00:00自动生成结算单</el-radio>
                    <el-radio :label="1">自定义规则</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="settlement-item-rule">
              <div
                v-if="baseForm.ruleList[index].timeRuleType === 1"
                class="rule flex"
              >
                <el-form-item
                  label=""
                  :prop="`ruleList[${index}].cronType`"
                  :rules="[
                    {
                      required: true,
                      message: '请选择周期类型',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    v-model="baseForm.ruleList[index].cronType"
                    :disabled="edit === 'detail'"
                    placeholder="请选择"
                    style="width: 140px"
                    @change="changeMonth(index)"
                  >
                    <el-option
                      v-for="option in ruleList"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
                <div
                  v-if="baseForm.ruleList[index].cronType == '1'"
                  class="rule-detail flex"
                >
                  <span class="fs-14 fc-black">每月</span>
                  <el-form-item
                    label=""
                    :prop="`ruleList[${index}].dayOfMonth`"
                    :rules="[
                      {
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      v-model="baseForm.ruleList[index].dayOfMonth"
                      :disabled="edit === 'detail'"
                      placeholder="请选择日期"
                      style="width: 140px"
                    >
                      <el-option
                        v-for="option in dayList"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <span class="fs-14 fc-black">日</span>
                </div>
                <div
                  v-if="baseForm.ruleList[index].cronType != '1'"
                  class="rule-detail flex"
                >
                  <span
                    v-if="baseForm.ruleList[index].cronType == '2'"
                    class="fs-14 fc-black"
                    >每季度,第</span
                  >
                  <span
                    v-if="baseForm.ruleList[index].cronType == '3'"
                    class="fs-14 fc-black"
                    >每年</span
                  >
                  <el-form-item
                    v-if="baseForm.ruleList[index].cronType == '2'"
                    :prop="`ruleList[${index}].month`"
                    :rules="[
                      {
                        required: true,
                        message: '请选择月份',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      v-model="baseForm.ruleList[index].month"
                      :disabled="edit === 'detail'"
                      placeholder="请选择月份"
                      style="width: 140px"
                    >
                      <el-option
                        v-for="option in yearList"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="baseForm.ruleList[index].cronType == '3'"
                    label=""
                    :prop="`ruleList[${index}].month`"
                    :rules="[
                      {
                        required: true,
                        message: '请选择月份',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      v-model="baseForm.ruleList[index].month"
                      :disabled="edit === 'detail'"
                      placeholder="请选择月份"
                      style="width: 140px"
                    >
                      <el-option
                        v-for="option in monthList"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <span class="fs-14 fc-black">月</span>
                  <el-form-item
                    :prop="`ruleList[${index}].dayOfMonth`"
                    :rules="[
                      {
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      v-model="baseForm.ruleList[index].dayOfMonth"
                      :disabled="edit === 'detail'"
                      placeholder="请选择日期"
                      style="width: 140px"
                    >
                      <el-option
                        v-for="option in dayList"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <span class="fs-14 fc-black">日</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-form>
    </div>
    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
  </div>
</template>

<script>
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'Settlement',
  components: {
    Footer
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    edit: {
      type: String,
      default: ''
    }
  },

  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入结算金额'));
      } else if (!/^(0|[1-9]\d{0,3})(\.\d{0,2})?$/.test(value)) {
        callback(new Error('结算金额最多两位有效数字'));
      } else if (value < 0 || value > 9999.99) {
        callback(new Error('结算金额范围0～9999.99'));
      } else {
        callback();
      }
    };
    const validateUse = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入比例'));
      } else if (!/[0-9]*[1-9][0-9]*$/.test(value)) {
        callback(new Error('比例最多两位有效数字'));
      } else if (value < 0 || value > 100) {
        callback(new Error('比例范围0～100'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      baseForm: {
        needSettlement: '',
        productId: '',
        ruleList: []
      },
      policyForm: {
        cronType: '',
        dayOfMonth: '',
        month: '',
        needSettlement: '',
        planPriceList: [
          {
            planName: '',
            id: '',
            planId: '',
            pricePerPolicy: '',
            pricePerUse: ''
          }
        ],
        pricingMethod: '',
        productId: '',
        timeRuleType: ''
      },
      ruleList: [
        {
          value: 1,
          label: '按月'
        },
        {
          value: 2,
          label: '按季度'
        },
        {
          value: 3,
          label: '按年'
        }
      ],
      dayList: [],
      monthList: [],
      yearList: [],
      reviewMaterials: [], // 服务项列表
      activeName: '1',
      policyLoading: false,
      validateMoney,
      validateUse,
      planList: []
    };
  },
  created() {
    for (let i = 0; i < 28; i++) {
      this.dayList.push({
        value: i + 1,
        label: i + 1
      });
    }
    for (let i = 0; i < 12; i++) {
      this.monthList.push({
        value: i + 1,
        label: i + 1
      });
    }
    for (let i = 0; i < 3; i++) {
      this.yearList.push({
        value: i + 1,
        label: i + 1
      });
    }

    // 查询服务项
    this.getClaimReviewServiceItems({
      productId: this.$route.params.id
    }).then(res => {
      res.data = res.data || [];
      res.data.forEach(item => {
        item.select = false;
      });
      this.reviewMaterials = res.data;
      // 查询理赔结算规则
      this.$store
        .dispatch('insuranceProducts/getCompanySettlementRule', {
          productId: this.$route.params.id
        })
        .then(res1 => {
          if (this.edit === 'edit') {
            if (res1 && res1.data && res1.data.length <= 0) {
              this.baseForm = {
                needSettlement: '',
                productId: this.$route.params.id,
                ruleList: [
                  {
                    cronType: '', // 周期类型 1.按月 2.按季度 3.按年
                    dayOfMonth: '', // 每月第几天
                    month: '', // 第几个月
                    pricePerPolicy: '', // 每单费用
                    pricePerUse: '', // 每次使用费用
                    pricingMethod: '', // 定价方式 1:按照权益使用次数 2:按保单销售数量 3:按订单实际金额
                    productId: this.$route.params.id, // 保险产品id
                    serviceItemId: '', // 服务项id
                    timeRuleType: '', // 结算规则类型 0：默认-每月1号0点 1：自定义-根据自定义生成结算日期
                    isBuyMedicine: false, // 是否是购药服务
                    id: null
                  }
                ]
              };
            } else {
              this.baseForm.needSettlement = res1.data.needSettlement;
              this.baseForm.ruleList = res1.data.reqVOList;
              this.isBuyMedicine();
              this.isRepeat();
            }
          } else {
            this.baseForm.needSettlement = res1.data.needSettlement;
            this.baseForm.ruleList = res1.data.reqVOList;
            this.isBuyMedicine();
            this.isRepeat();
          }
        });
    });
    // 保单结算
    this.$store
      .dispatch('insuranceProducts/getPolicySettlementRule', {
        productId: this.$route.params.id
      })
      .then(res => {
        // 保单结算计划
        if (res.data) {
          this.policyForm = res.data;
          this.policyForm.productId = this.$route.params.id;
        } else {
          this.$store
            .dispatch('insuranceProducts/getPolicyplanRule', {
              productId: this.$route.params.id
            })
            .then(res1 => {
              this.policyForm.planPriceList = res1.data;
              this.policyForm.productId = this.$route.params.id;
            });
        }
      });
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getClaimReviewServiceItems',
      'setPolicySettlementRule'
    ]),
    // 判断这个服务项是不是购药，禁止选两个
    serviceChange(index) {
      const arr = this.reviewMaterials.filter(item => {
        return (
          item.serviceInfoId === this.baseForm.ruleList[index].serviceItemId
        );
      });
      if (arr[0].isBuyMedicine) {
        this.baseForm.ruleList[index].isBuyMedicine = true;
      } else {
        this.baseForm.ruleList[index].isBuyMedicine = false;
      }
      // 禁止选两个
      this.isRepeat();
    },
    // 回显判断这个服务项是不是购药，禁止选两个
    isBuyMedicine() {
      if (
        this.baseForm.ruleList.length > 0 &&
        this.reviewMaterials.length > 0
      ) {
        this.baseForm.ruleList.forEach(item => {
          this.reviewMaterials.forEach(val => {
            if (item.serviceItemId === val.serviceInfoId) {
              if (val.isBuyMedicine) {
                item.isBuyMedicine = true;
              }
            }
          });
        });
      }
    },
    // 遍历规则，选过的置灰
    isRepeat() {
      this.reviewMaterials.forEach(val => {
        val.select = false;
      });
      this.baseForm.ruleList.forEach(item => {
        this.reviewMaterials.forEach(val => {
          if (val.serviceInfoId === item.serviceItemId) {
            val.select = true;
          }
        });
      });
    },
    // 添加规则
    addRule() {
      const obj = {
        cronType: '', // 周期类型 1.按月 2.按季度 3.按年
        dayOfMonth: '', // 每月第几天
        month: '', // 第几个月
        pricePerPolicy: '', // 每单费用
        pricePerUse: '', // 每次使用费用
        pricingMethod: '', // 定价方式 1:按照权益使用次数 2:按保单销售数量 3:按订单实际金额
        productId: this.$route.params.id, // 保险产品id
        serviceItemId: '', // 服务项id
        timeRuleType: '', // 结算规则类型 0：默认-每月1号0点 1：自定义-根据自定义生成结算日期
        isBuyMedicine: false, // 是否是购药服务
        id: null
      };
      this.baseForm.ruleList.push(obj);
    },
    // 单选显示规则
    addData(val) {
      if (val === true) {
       this.addRule();
      }
    },
    // 删除规则
    delRule(index) {
      this.$confirm('请确认是否删除该结算规则', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.baseForm.ruleList.splice(index, 1);
        this.reviewMaterials.forEach(val => {
        val.select = false;
      });
      });
    },
    save(form) {
      this.$refs['policyForm'].validate(valid => {
        if (valid) {
          this.$refs[form].validate(valid1 => {
            if (valid1) {
              const params = {
                ...this.baseForm,
                reqVOList: this.baseForm.ruleList,
                productId: this.$route.params.id
              };
              delete params.ruleList;

              this.$store
                .dispatch('insuranceProducts/setCompanySettlementRule', params)
                .then(() => {
                  this.setPolicySettlementRule(this.policyForm).then(() => {
                    this.$message({
                      type: 'success',
                      message: '结算保存成功'
                    });
                  });
                });
            } else {
              this.$message.error('理赔结算填写有误！');
              return false;
            }
          });
        } else {
          this.$message.error('保单结算填写有误！');
        }
      });
    },
    changeMonth(index) {
      this.baseForm.ruleList[index].month = '';
      this.baseForm.ruleList[index].dayOfMonth = '';
    },
    changeMonth1() {
      this.policyForm.month = '';
      this.policyForm.dayOfMonth = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.product-settlement-page {
  .policy-content {
    padding-bottom: 24px;
    .policytable {
      /deep/ .el-form-item {
        margin-bottom: 0;
      }
    }
    .text-red {
      color: #f64e60;
    }
  }
  .settlement-item {
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(179, 179, 179, 0.5);
    border-radius: 4px;
    width: 99%;
    margin: 0 auto 24px;
    padding: 24px;
    &-title {
      font-size: 16px;

      font-weight: 600;
      color: #464668;
      line-height: 16px;
      margin-bottom: 24px;
      .settlement-del {
        display: inline;
        font-size: 14px;

        font-weight: 400;
        color: #f64e60;
        line-height: 16px;
        margin-left: 24px;
        cursor: pointer;
      }
    }
    &-input {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      &-l {
        font-size: 14px;

        font-weight: 400;
        color: #464668;
        line-height: 14px;
        margin-right: 12px;
      }
      &-r {
        .el-form-item {
          margin: 0;
          .el-select {
            width: 510px;
          }
        }
      }
    }
  }
  .settlement-input-text {
    width: 510px;
    margin-left: 82px;
    margin-bottom: 24px;
  }
  .settlement-item-rule {
    padding-left: 82px;
    .rule {
      margin: 30px 0 -25px;
      &-detail {
        span {
          margin: 8px 12px 0;
        }
      }
    }
  }
  .service-settle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 24px;
    .settlement-item-input {
      margin-bottom: 0;
    }
  }
}
.clear-float::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
</style>
