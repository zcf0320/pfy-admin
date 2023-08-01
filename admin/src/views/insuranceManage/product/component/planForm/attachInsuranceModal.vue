<template>
  <div class="modal-form">
    <el-dialog
      v-loading="loading"
      title="费率表因素设置"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="baseFrom"
        :model="baseFrom"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="保障内容" prop="protectRightsId">
          <el-select
            v-model="baseFrom.protectRightsId"
            filterable
            :disabled="type === 158"
            placeholder="请选择附险"
            @change="getProtect(baseFrom.protectRightsId, false)"
          >
            <el-option
              v-for="item in mainProtectRights"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="累计保额" prop="protectRightsPriceSettingIds">
          <!-- {{protectPremiums}} -->
          <el-select
            v-model="baseFrom.protectRightsPriceSettingIds"
            placeholder="请选择保额"
            @change="getSingleRealPrice"
          >
            <el-option
              v-for="item in protectPremiums"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单次保额">
          <el-input v-model="baseFrom.singleRealPrice" disabled />
        </el-form-item>
        <el-form-item label="费率表" prop="rateTableId">
          <el-select v-model="baseFrom.rateTableId" placeholder="请选择费率表">
            <el-option
              v-for="item in rateTableIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure('baseFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { priceUnit, priceUnitText } from './config';
export default {
  name: 'AttachInsuranceModal',
  props: {
    protectRights: {
      type: Object,
      default: () => ({
        protectRightsId: '',
        protectRightsPriceSettingIds: '',
        rateTableId: '',
        singleRealPrice: ''
      })
    },
    type: {
      type: Number,
      default: () => 159
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      rules: {
        protectRightsId: [
          { required: true, message: '请选择附险', trigger: 'change' }
        ],
        protectRightsPriceSettingIds: [
          { required: true, message: '请选择保额', trigger: 'change' }
        ],
        rateTableId: [
          {
            required: true,
            message: '请选择费率表',
            trigger: 'change'
          }
        ]
      },
      mainProtectRights: [],
      protectPremiums: [],
      rateTableIds: [],
      priceUnit,
      priceUnitText,
      oldProtectRightsId: '',
      baseFrom: {
        protectRightsId: '',
        protectRightsPriceSettingIds: '',
        rateTableId: '',
        singleRealPrice: ''
      }
    };
  },
  computed: {},
  created() {
    this.getAllMain();
    // 防止检验重复出错
    this.baseFrom = Object.assign({}, this.baseFrom, this.protectRights);
    const { protectRightsId } = this.baseFrom;
    this.oldProtectRightsId = protectRightsId;
    if (protectRightsId) {
      this.getProtect(protectRightsId, true);
    }
    // 如果累计保额不为空 获取单次保额
    if (this.$isNotEmpty(this.baseFrom.protectRightsPriceSettingIds)) {
      this.getSingleRealPrice();
    }
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 确定
    sure(formName) {
      const vm = this;
      const {
        protectRightsId,
        protectRightsPriceSettingIds,
        rateTableId
      } = vm.baseFrom;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let data = {};
          this.mainProtectRights.forEach(item => {
            if (item.id === protectRightsId) {
              data = {
                protectRightsName: item.name
              };
            }
          });
          this.protectPremiums.forEach(item => {
            if (item.id === protectRightsPriceSettingIds) {
              if (item.priceUnit !== -1) {
                item.protectRightsPrice =
                  item.price * priceUnit[item.priceUnit];
              } else {
                item.protectRightsPrice = 0;
              }
              data = {
                ...data,
                protectRightsPrice: item.protectRightsPrice
              };
            }
          });
          this.rateTableIds.forEach(item => {
            if (item.id === rateTableId) {
              data = {
                ...data,
                rateTableName: item.name
              };
            }
          });
          let changeType = true;
          if (this.oldProtectRightsId === protectRightsId) {
            changeType = false;
          }
          vm.$emit('planDetailsAddOrEdit', {
            ...vm.baseFrom,
            ...data,
            changeType
          });
        }
      });
    },
    // 获取保障责任保额和费率表
    getProtect(id, type) {
      this.$store
        .dispatch('insuranceProducts/getProtectPremiums', {
          id
        })
        .then(res => {
          if (!res.code) {
            res.obj.forEach(item => {
              if (item.priceUnit !== -1) {
                item.label = item.price + priceUnitText[item.priceUnit];
              } else {
                item.label = '不投保';
              }
            });
            if (!type) {
              this.baseFrom.protectRightsPriceSettingIds = '';
            }
            this.protectPremiums = res.obj || [];
          }
        });
      this.$store
        .dispatch('insuranceProducts/getRightRates', {
          id
        })
        .then(res => {
          if (!res.code) {
            if (!type) {
              this.baseFrom.rateTableId = '';
            }
            this.rateTableIds = res.obj || [];
          }
        });
    },
    // 获取单次保额
    getSingleRealPrice() {
      const itemData = this.protectPremiums.find(
        item => item.id === this.baseFrom.protectRightsPriceSettingIds,
      );
      this.baseFrom.singleRealPrice = itemData.singleRealPrice;
    },
    // 获取权益列表
    getAllMain() {
      this.$store
        .dispatch('insuranceProducts/getAllMain', {
          type: this.type,
          postStatus: 105
        })
        .then(res => {
          if (!res.code) {
            this.mainProtectRights = res.obj;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-form {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
}
</style>
