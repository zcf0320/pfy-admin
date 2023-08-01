<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="服务名称" required>
          <span class="link-skip" @click="toDetail()">{{
            currentData.serviceName
          }}</span>
        </el-form-item>
      </el-col>
      <el-col v-if="currentData.commodityType == 1" :span="12">
        <el-form-item
          label="收货信息"
          prop="addressId"
          :rules="[{ required: true, message: '请选择收货信息' }]"
        >
          <div class="flex w-full">
            <el-select
              v-model="data.addressId"
              :disabled="isDisabled"
              placeholder="请选择收货信息"
              class="flex-grow mr-24"
            >
              <el-option
                v-for="item in addressList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              >
                <span>{{ item.name }}</span>
                <span class="ml-10">{{ item.mobile }}</span>
                <span class="ml-10">{{ item.address }}</span>
              </el-option>
            </el-select>
            <button
              v-if="!isDisabled"
              type="button"
              class="btn-exit"
              @click="dialog.visible = true"
            >
              新增收货地址
            </button>
          </div>
        </el-form-item>
      </el-col>
      <el-col v-if="currentData.commodityType == 1" :span="12">
        <el-form-item
          label="规格"
          prop="specifications"
          :rules="[{ required: true, message: '请选择规格' }]"
        >
          <el-select
            v-model="data.specifications"
            :disabled="isDisabled"
            placeholder="请选择收货信息"
            class="w-full"
          >
            <el-option
              v-for="item in speciList"
              :key="item.id"
              :value="item.id"
              :label="item.specifications"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预约人手机号" required>
          <el-input v-model="data.mobile" disabled class="w-full"/>
        </el-form-item>
      </el-col>
      <el-col v-if="isDisabled" :span="12" class="relative">
        <el-form-item label="验证码" required>
          <span
v-if="$isNotEmpty(expireTime)"
class="leftTime-box "
>等待提交，剩余{{ getDialysisDurationShow(leftTime) }}</span>
          <div class="flex w-full">
            <el-input
              v-model="data.verificationCode"
              class="flex-grow"
            />
            <div
              class="verificationCode-box flex-center"
              @click="sendMessage()"
            >
              {{ codeNum > 0 ? `${codeNum}s` : '重新获取' }}
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <AddrssAddDialog
      :visible.sync="dialog.visible"
      :token="token"
      @saved="getAdress"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddrssAddDialog from './addressAddDialog';
export default {
  name: 'commodityExchange',
  inject: ['saveForm', 'currentData'],
  components: { AddrssAddDialog },
  props: {
    data: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    expireTime: {
      type: Number,
      default: null
    },
    serviceRecordId: {
      type: String || Number,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    cnt: {
      type: Number,
      default: null
    },
    serviceInfoId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeId: null,
      timerId: null,
      codeNum: null,
      leftTime: null,
      addressList: [],
      speciList: []
    };
  },
  created() {
    if (this.$isNotEmpty(this.expireTime)) {
      this.leftTime = this.expireTime;
      this.timeId = setInterval(() => {
        if (this.leftTime <= 0) {
          this.leftTime = null;
          clearInterval(this.timeId);
        } else {
          this.leftTime -= 1;
        }
      }, 1000);
    }
    if (this.isDisabled) {
      this.codeNum = this.cnt;
      this.timerId = setInterval(() => {
        if (this.codeNum <= 0) {
          this.codeNum = null;
          clearInterval(this.timerId);
        } else {
          this.codeNum -= 1;
        }
      }, 1000);
    }
    if (this.currentData.commodityType === 1) {
      this.getAdress();
      this.getProductSpecifications();
    }
  },
  destroyed() {
    clearInterval(this.timeId);
    clearInterval(this.timerId);
  },
  methods: {
    // 设置验证码倒计时
    ...mapActions('userManage', [
      'checkVerificationCode',
      'getReceivingAddress',
      'create',
      'couponCode',
      'productSpecifications'
    ]),
    // 获取分秒
    getDialysisDurationShow(leftTime) {
      if (this.$isEmpty(leftTime)) {
        return '00:00';
      }
      const min = parseInt(Number(leftTime) / 60);
      const s = parseInt(Number(leftTime) % 60);
      return `${min > 9 ? min : '0' + min}:${s > 9 ? s : '0' + s}`;
    },
    // 重新发送验证码
    sendMessage() {
      if (this.codeNum > 0) {
        return;
      }
      this.saveForm();
    },
    // 提交表单
    submitForm() {
      if (this.$isEmpty(this.leftTime)) {
        this.$emit('saved', null, false, '提交失败，验证码已超时，请重新使用');
        return;
      }
      if (this.$isEmpty(this.data.verificationCode)) {
        this.$message.warning('请输入验证码');
        return;
      }
      this.checkVerificationCode({
        serviceRecordId: this.serviceRecordId,
        verificationCode: this.data.verificationCode
      }).then(res => {
        this.data.token = this.token;
        this.data.validCode = res.data;
        if (this.currentData.commodityType === 0) {
          // 虚拟兑换
          this.couponCode({
            serviceRecordId: this.currentData.serviceRecordId,
            token: this.token
          }).then(res => {
            const id = res.data.data;
            const state = this.$isNotEmpty(res.data.data);
            const msg = res.data.message || '提交失败，用户权益已用完';
            this.$emit('saved', id, state, msg);
          });
        } else {
          // 实物兑换
          const data = {
            addressId: this.data.addressId,
            productSpecificationId: this.data.specifications,
            serviceRecordId: this.currentData.serviceRecordId,
            token: this.token
          };
          this.create(data).then(res => {
            const id = res.data.data.id;
            const state = this.$isNotEmpty(res.data.data.id);
            const msg = res.data.message || '提交失败，用户权益已用完';
            this.$emit('saved', id, state, msg);
          });
        }
      });
    },
    /**
     * 跳转服务详情
     */
    toDetail() {
      if (this.$isNotEmpty(this.serviceInfoId)) {
        const routeData = this.$router.resolve({
          path: `/supplyChainManage/serviceItems/details/${
            this.serviceInfoId
          }/${'detail'}`
        });
        window.open(routeData.href, '_blank');
      }
    },
    /**
     * 获取收货地址
     */
    getAdress() {
      this.getReceivingAddress({
        userId: this.$route.params.id
      }).then(res => {
        this.addressList = res.data || [];
      });
    },
    /**
     * 获取商品规格
     */
    getProductSpecifications() {
      this.productSpecifications({
        serviceRecordId: this.currentData.serviceRecordId,
        token: this.token
      }).then(res => {
        this.speciList = res.data.data || [];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.leftTime-box {
  position: absolute;
  left: 65px;
  top: -23px;
  width: 180px;
  height: 14px;
  font-size: 14px;
  color: #f64e60;
  line-height: 14px;
}
.verificationCode-box {
  margin-left: 24px;
  width: 100px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #3599fe;
  font-size: 14px;
  color: #3599fe;
  cursor: pointer;
}
</style>
