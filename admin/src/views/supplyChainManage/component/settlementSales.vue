<template>
  <div>
    <el-form ref="formData" :model="formData" label-position="top">
      <div class="title-top content-detail mb-20 ">服务项成本</div>
      <el-form-item
        class="mb-14 w-414"
        prop="serviceCostPrice"
        :rules="[
          { required: true, message: '请输入价格' },
          {
            validator: $validators.checkDecima2,
            message: '最多保留两位小数',
          },
        ]"
      >
        <el-input v-model="formData.serviceCostPrice" placeholder="请输入">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <div class="title-top content-detail mb-20 ">结算方式</div>
      <el-form-item class="mb-14">
        <el-radio-group
          v-model="formData.settlementMethodType"
          :disabled="disabled"
        >
          <el-radio :label="0">一口价</el-radio>
          <el-radio :label="1">阶梯价</el-radio>
          <el-radio :label="2">按保单</el-radio>
          <el-radio :label="3">按区域</el-radio>
          <el-radio :label="4">按订单价格</el-radio>
          <el-radio :label="5">按药商结算</el-radio>
          <el-radio :label="6">自定义结算</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 一口价 -->
      <el-form-item
        v-if="
          formData.settlementMethodType === 0 ||
            formData.settlementMethodType == 2
        "
        label="价格（默认含税）"
        prop="settlementPrice"
        :rules="[
          { required: true, message: '请输入价格' },
          {
            validator: $validators.checkDecima2,
            message: '请输入0~999999999.00的数且最多保留两位小数',
          },
        ]"
      >
        <InputNumber
          v-model="formData.settlementPrice"
          class="w-400"
          :maxlength="12"
          :max="999999999.0"
        >
          <div slot="append" class="w-100">
            {{ formData.settlementMethodType == 0 ? '元/人/次' : '每单' }}
          </div>
        </InputNumber>
      </el-form-item>
      <!-- 按阶梯 -->
      <div v-if="formData.settlementMethodType === 1 && flag">
        <div class="flex-box mb-10">
          <span class="fc-red mr-2">*</span>
          <span class="fc-black fs-14">价格（默认含税）</span>
        </div>
        <div
          v-for="(item, index) in formData.ladderList"
          :key="index"
          class="flex-box mt-6 mb-24"
        >
          <span class="fc-black fs-14  w-100">{{
            index > 0 ? '购买：' : '起订量：'
          }}</span>
          <el-form-item
            class="mb-0  ml-10"
            :prop="`ladderList[${index}].ladderStartNum`"
            :rules="[
              { required: true, message: '请输入数量' },
              { validator: $validators.checkPInt, message: '请输入正整数' },
            ]"
          >
            <InputNumber
              v-model="item.ladderStartNum"
              :min="getMin(index)"
              :max="getMax(index)"
              :disabled="index == 0"
              class="w-110"
            />
          </el-form-item>
          <span class="fc-black fs-14 ml-24 mr-24">及以上，价格</span>
          <el-form-item
            class="mb-0"
            :prop="`ladderList[${index}].settlementPrice`"
            :rules="[
              { required: true, message: '请输入价格' },
              {
                validator: $validators.checkDecima2,
                message: '请输入0~999999999.00的数且最多保留两位小数',
              },
            ]"
          >
            <InputNumber
              v-model="item.settlementPrice"
              :maxlength="12"
              :max="999999999.0"
              class="w-400 "
            >
              <div slot="append" class="w-100">元/人/次</div>
            </InputNumber>
          </el-form-item>
          <div
            v-if="index == formData.ladderList.length - 1 && index != 0"
            class="fc-blue pointer ml-24"
            @click="delItem(index)"
          >
            删除
          </div>
        </div>
        <button type="button" class="btn-exit" @click="addItem()">
          新增价格区间
        </button>
      </div>
      <div v-if="formData.settlementMethodType == 3">
        <div class="flex-box mb-10">
          <span class="fc-red mr-2">*</span>
          <span class="fc-black fs-14">价格（默认含税）</span>
          <button
            type="button"
            class="btn-exit ml-24"
            @click="dialog.visible = true"
          >
            添加省份
          </button>
        </div>
        <div>
          <div
            v-for="(item, index) in formData.regionList"
            :key="index"
            class="flex-box mb-24"
          >
            <div class="fc-black fs-14 mr-24 w-100">
              {{ getCityName(item.provinceId) }}，价格
            </div>
            <el-form-item
              class="mb-0"
              :prop="`regionList[${index}].settlementPrice`"
              :rules="[
                { required: true, message: '请输入价格' },
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999999.00的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="item.settlementPrice"
                :maxlength="12"
                :max="999999999.0"
                class="w-400  "
              >
                <div slot="append" class="w-100">元/人/次</div>
              </InputNumber>
            </el-form-item>
          </div>
        </div>
      </div>
      <settlementRule :form-data="formData" />
      <provinceSelectDialog
        v-model="provinceList"
        :visible.sync="dialog.visible"
        @saved="provinceChange"
      />
    </el-form>
  </div>
</template>
<script>
import settlementRule from './settlementRule';
import { mapActions } from 'vuex';
import provinceSelectDialog from './provinceSelectDialog';
export default {
  name: 'settlementSales',
  components: { settlementRule, provinceSelectDialog },
  props: {
    id: { type: String, default: '' }
  },
  data() {
    const defaultForm = {
      type: 1, // 1代表默认结算,2代表自定义规则,3代表不指定规则
      ruleType: 1, // 1按月，2按季度，3按年
      month: '',
      day: '',
      ladderList: [
        {
          ladderEndNum: null,
          ladderStartNum: 1,
          settlementPrice: null
        }
      ],
      regionList: [],
      settlementMethodType: 0,
      settlementPrice: null,
      serviceCostPrice: ''
    };
    return {
      disabled: false,
      flag: true,
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      provinceList: []
    };
  },
  computed: {
    allCityList() {
      return this.$store.state.app.allCityList || [];
    }
  },
  created() {
    // 更新城市
    this.getSettlementRule();
  },
  methods: {
    ...mapActions('serviceItems', [
      'getSettlementRuleMethod',
      'saveSettlementRuleMethod'
    ]),
    /**
     * 获取结算规则
     */
    getSettlementRule() {
      this.getSettlementRuleMethod({ serviceInfoId: this.id }).then(res => {
        if (
          this.$isNotEmpty(res.data.settlementMethodResp) &&
          this.$isNotEmpty(res.data.settlementProviderRuleResp)
        ) {
          this.disabled = true;
        }
        if (
          !this.$isNotEmpty(res.data.settlementMethodResp) &&
          !this.$isNotEmpty(res.data.settlementProviderRuleResp)
        ) {
          res.data.settlementMethodResp = { ladderList: [], regionList: [] };
        }
        if (this.$isNotEmpty(res.data.settlementMethodResp.regionList)) {
          const arr = [];
          res.data.settlementMethodResp.regionList.forEach(item => {
            arr.push(item.provinceId);
          });
          this.provinceList = arr;
        }
        this.$copyProps(this.formData, res.data.settlementMethodResp);
        this.$copyProps(this.formData, res.data.settlementProviderRuleResp);
        this.formData.serviceCostPrice = res.data.serviceCostPrice;
      });
    },
    // 添加价格区间
    addItem() {
      const lastData = this.formData.ladderList[
        this.formData.ladderList.length - 1
      ];
      if (
        this.$isEmpty(lastData.ladderStartNum) ||
        this.$isEmpty(lastData.settlementPrice)
      ) {
        this.$message.warning('请先完善以存在数据');
        return;
      }
      this.flag = false;
      this.formData.ladderList.push({
        ladderEndNum: null,
        ladderStartNum: null,
        settlementPrice: null
      });
      this.flag = true;
    },
    // 删除单条数据
    delItem(index) {
      this.$confirm('删除数据后不可恢复,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.ladderList.splice(index, 1);
      });
    },
    // 过去区域的名称
    getCityName(id) {
      const cityItem = this.allCityList.find(item => item.id === id);
      if (this.$isEmpty(cityItem)) {
        return '';
      }
      return cityItem.name;
    },
    // 保存结算
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          this.$message.warning('信息填写有误');
          return false;
        }
        const ruleObj = {
          type: '1', // 1代表默认结算,2代表自定义规则,3代表不指定规则
          ruleType: '1', // 1按月，2按季度，3按年
          month: '',
          day: '',
          serviceInfoId: this.id
        };
        this.$copyProps(ruleObj, this.formData);
        const saveForm = {
          serviceInfoId: this.id,
          settlementMethodType: this.formData.settlementMethodType,
          settlementPrice: null,
          ladderList: [],
          regionList: []
        };

        // 一口价和保单
        if (
          this.formData.settlementMethodType === 0 ||
          this.formData.settlementMethodType === 2
        ) {
          saveForm.settlementPrice = this.formData.settlementPrice;
        } else if (this.formData.settlementMethodType === 1) {
          // 按阶梯
          if (this.$isNotEmpty(this.formData.ladderList)) {
            this.formData.ladderList.forEach((item, index) => {
              if (index !== this.formData.ladderList.length - 1) {
                item.ladderEndNum = this.formData.ladderList[
                  index + 1
                ].ladderStartNum;
              } else {
                item.ladderEndNum = null;
              }
            });
          }
          saveForm.ladderList = this.formData.ladderList;
        } else if (this.formData.settlementMethodType === 3) {
          saveForm.regionList = this.formData.regionList;
        }
        this.saveSettlementRuleMethod({
          settlementMethodUpdateReq: saveForm,
          settlementRuleUpdateReq: ruleObj,
          serviceCostPrice: this.formData.serviceCostPrice,
          serviceInfoId: this.id
        }).then(() => {
          this.$message.success('保存成功');
          this.disabled = true;
        });
      });
    },
    // 区域修改
    provinceChange(val) {
      const arr = [];
      val.forEach(item => {
        const itemData = this.formData.regionList.find(
          data => data.provinceId === item,
        );
        // 没有
        if (this.$isEmpty(itemData)) {
          arr.push({
            provinceId: item,
            settlementPrice: null
          });
        } else {
          arr.push(itemData);
        }
      });
      this.formData.regionList = arr;
      this.clearValidate('formData');
    },
    // 获取最小值
    getMin(index) {
      // 最后一条
      if (index === 0) {
        return 1;
      }
      return Number(this.formData.ladderList[index - 1].ladderStartNum + 1);
    },
    // 获取最大值
    getMax(index) {
      const idx = this.formData.ladderList.length - 1;
      // 最后一条
      if (idx === index) {
        return Infinity;
      } else {
        return Number(this.formData.ladderList[index + 1].ladderStartNum - 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.w-414 {
  width: 414px;
}
</style>
