<template>
  <div v-if="packageType" class="set-sales">
    <div class="title-top content-detail">销售信息</div>
    <el-form ref="formData" :model="formData" label-position="top">
      <el-form-item class="mb-14">
        <el-radio-group
          v-model="formData.settlementMethodType"
          :disabled="type"
        >
          <el-radio :label="1">一口价</el-radio>
          <el-radio v-if="packageType === 2 || packageType === 1" :label="3"
            >阶梯价</el-radio
          >
          <el-radio v-if="packageType === 1" :label="2">按保单</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 一口价 -->
      <el-form-item
        v-if="
          formData.settlementMethodType === 1 ||
            formData.settlementMethodType === 2
        "
        label="销售价格"
        prop="settlementPrice"
        :rules="[
          { required: true, message: '请输入价格' },
          {
            validator: $validators.checkDecima2,
            message: '请输入0~999999999.00的数且最多保留两位小数',
          },
        ]"
      >
        <span v-if="formData.settlementMethodType === 2">保费的</span>
        <InputNumber
          v-model="formData.settlementPrice"
          class="w-400"
          :precision="1"
          :maxlength="12"
          :max="999999999.0"
          :disabled="type"
        >
          <div slot="append" class="w-100">
            {{ formData.settlementMethodType === 1 ? '元/份' : '%' }}
          </div>
        </InputNumber>
      </el-form-item>
      <!-- 按阶梯 -->
      <div v-if="formData.settlementMethodType === 3 && flag">
        <div class="flex-box mb-10 btn-box">
          <div>
            <span class="fc-red mr-2">*</span>
            <span class="fc-black fs-14">销售价格</span>
          </div>
          <button
            v-if="!type"
            type="button"
            class="btn-exit"
            @click="addItem()"
          >
            新增价格区间
          </button>
        </div>

        <div
          v-for="(item, index) in formData.ladderList"
          :key="index"
          class="flex-box mt-6 mb-24"
        >
          <span class="fc-black fs-14 w-100">{{
            index > 0 ? '购买：' : '起订量：'
          }}</span>
          <el-form-item
            class="mb-0 ml-10"
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
              :disabled="index == 0 || type"
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
              class="w-400"
              :disabled="type"
            >
              <div slot="append" class="w-100">元/人/次</div>
            </InputNumber>
          </el-form-item>
          <div
            v-if="
              index == formData.ladderList.length - 1 && index != 0 && !type
            "
            class="fc-blue pointer ml-24"
            @click="delItem(index)"
          >
            删除
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'settlementSales',
  props: {
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Boolean,
      default: false
    },
    packageType: {
      type: Number,
      default: 0
    },
    type: {
      // 保存成功
      type: Boolean,
      default: false
    }
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
      settlementMethodType: 1,
      settlementPrice: null
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
    if (this.id && this.type) {
      this.getDetail(this.id);
    }
  },
  methods: {
    ...mapActions('serviceItems', [
      'getSettlementRuleMethod',
      'saveSettlementRuleMethod'
    ]),

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
    validateForm() {
      return new Promise(resolve => {
        this.$refs.formData.validate(valid => {
          if (valid) {
            resolve(true);
            // this.checked && this.saveForm()
          } else {
            resolve(false);
          }
        });
      });
    },
    // 保存结算
    saveForm(id) {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
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
          servicePackageId: id,
          type: this.formData.settlementMethodType,
          price: null,
          ladderList: [],
          regionList: [],
          premiumRatio: null // 保费
        };
        // 一口价和保单
        if (this.formData.settlementMethodType === 1) {
          saveForm.price = this.formData.settlementPrice;
        } else if (this.formData.settlementMethodType === 2) {
          saveForm.premiumRatio = this.formData.settlementPrice;
        } else if (this.formData.settlementMethodType === 3) {
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
        }
        this.$store
          .dispatch('servicePackage/saveServiceMethod', saveForm)
          .then(() => {
            this.$message.success('保存成功');
            return true;
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
      //   const idx = this.formData.ladderList.length - 1
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
    },
    getDetail(servicePackageId) {
      this.$forceUpdate();
      this.$store
        .dispatch('servicePackage/getServiceMethod', { servicePackageId })
        .then(res => {
          Object.assign(this.formData, res.data);

          this.formData.settlementMethodType = res.data.type;
          this.formData.settlementPrice = res.data.price;
          this.formData.settlementPrice = res.data.price;
          if (res.data.premiumRatio) {
            this.formData.settlementPrice = res.data.premiumRatio;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.set-sales {
  // box-shadow: 0px 1px 0px 0px #ebedf2;
  padding-bottom: 30px;
  margin-bottom: 30px;
  .title-top.content-detail {
    // box-shadow: 0px -1px 0px 0px #ebedf2;
    padding: 30px 0;
  }
  .title-top {
    margin-bottom: 0;
  }
  .btn-box {
    justify-content: space-between;
  }
}
</style>
