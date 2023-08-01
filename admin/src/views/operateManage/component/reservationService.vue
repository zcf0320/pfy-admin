<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="服务名称" required>
          <span class="link-skip" @click="toDetail()">{{ data.itemName }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('reverseArea')"
          label="预约城市"
          prop="selectCity"
          :rules="[{ required: true, message: '请选择预约城市' }]"
        >
          <el-cascader
            v-model="data.selectCity"
            :disabled="isDisabled"
            class="w-full"
            :options="configData.provinces"
            placeholder="请选择预约城市"
            :props="optionProps"
            @change="selectCityChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('reverseArea')"
          label="预约网点"
          prop="addressId"
          :rules="[{ required: true, message: '请选择预约网点' }]"
        >
          <el-select
            v-model="data.addressId"
            :disabled="isDisabled"
            placeholder="请选择预约网点"
    filterable
            class="w-full"
            @change="addressChange"
          >
            <el-option
              v-for="item in filterSites"
              :key="item.addressId"
              :label="item.address"
              :value="item.addressId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="$isNotEmpty(data.serviceSiteName)" :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('reverseArea')"
          label="网点地址"
        >
          <el-input v-model="data.serviceSiteName" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col v-if="$isNotEmpty(data.contactMobile)" :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('reverseArea')"
          label="网点电话"
        >
          <el-input v-model="data.contactMobile" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="
            configData.reserveParamCodeList.includes('reserveDate') &&
              configData.pageCode != 'iDweCl'
          "
          label="预约时间"
          prop="time"
          :rules="[{ required: true, message: '选择预约时间' }]"
        >
          <el-date-picker
            v-model="data.time"
            :disabled="isDisabled"
            class="w-full"
            value-format="timestamp"
            type="datetime"
            placeholder="选择预约时间"
            :picker-options="{
              disabledDate(time) {
                return time.getTime() <= Date.now() - 1000 * 24 * 60 * 60;
              },
            }"
          />
        </el-form-item>
      </el-col>
      <!-- 七日陪护 -->
      <el-col :span="12">
        <el-form-item
          v-if="configData.pageCode == 'iDweCl'"
          label="陪护日期"
          prop="time"
          :rules="[{ required: true, message: '请选择陪护日期' }]"
        >
          <el-date-picker
            v-model="data.time"
            class="w-full"
            type="date"
            :disabled="isDisabled"
            value-format="timestamp"
            placeholder="请选择陪护日期"
            :picker-options="{
              disabledDate(time) {
                return (
                  time.getTime() < Date.now() + 1000 * 24 * 60 * 60 * beforeDate
                );
              },
            }"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="configData.pageCode == 'iDweCl'"
          class="w-full"
          label="陪护时间"
          prop="timeStr"
          :rules="[{ required: true, message: '请选择陪护时间' }]"
        >
          <el-select
            v-model="data.timeStr"
            :disabled="isDisabled"
            placeholder="请选择陪护时间"
            class="w-full"
          >
            <el-option
              v-for="item in timeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="configData.pageCode == 'iDweCl'"
          label="陪护床号"
          prop="bedNumber"
          :rules="[{ required: true, message: '请输入陪护床号' }]"
        >
          <el-input
            v-model="data.bedNumber"
            :disabled="isDisabled"
            class="w-full"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预约人姓名" required>
          <el-input v-model="data.name" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col v-if="$isNotEmpty(data.idCard)" :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('idCard')"
          required
          label="身份证"
        >
          <el-input v-model="idNum" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="configData.reserveParamCodeList.includes('sex')"
          required
          label="性别"
        >
          <el-input v-model="data.sexStr" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预约人手机号" required>
          <el-input v-model="data.mobile" disabled class="w-full" />
        </el-form-item>
      </el-col>
      <el-col v-if="isDisabled" :span="12" class="relative">
        <el-form-item label="验证码" required>
          <span v-if="$isNotEmpty(expireTime)" class="leftTime-box "
            >等待提交，剩余{{ getDialysisDurationShow(leftTime) }}</span
          >
          <div class="flex w-full">
            <el-input v-model="data.verificationCode" class="flex-grow" />
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'sevenDayEscortForm',
  inject: ['saveForm'],
  props: {
    data: {
      type: Object,
      required: true
    },
    configData: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    expireTime: {
      type: Number || String,
      default: ''
    },
    serviceRecordId: {
      type: Number || String,
      default: ''
    },
    serviceInfoId: {
      type: Number || String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    cnt: {
      type: Number || String,
      default: ''
    }
  },
  data() {
    return {
      timeList: ['7:00——15:00', '8:00——16:00', '9:00——17:00'],
      timeId: null,
      timerId: null,
      codeNum: null,
      leftTime: null,
      beforeDate: 2,
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'cities'
      }
    };
  },
  computed: {
    filterSites() {
      const arr = this.configData.sites || [];
      const cityId = this.$isNotEmpty(this.data.selectCity)
        ? this.data.selectCity[1]
        : null;
      if (this.$isNotEmpty(cityId)) {
        return arr.filter(item => item.cityId === cityId);
      }
      return [];
    },
    // 身份证脱敏
    idNum() {
      const str = this.data.idCard.replace(
        /^(.{4})(?:\d+)(.{4})$/,
        '$1**********$2',
      );

      return str;
    }
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
  },
  destroyed() {
    clearInterval(this.timeId);
    clearInterval(this.timerId);
  },
  methods: {
    // 设置验证码倒计时
    ...mapActions('userManage', [
      'checkVerificationCode',
      'addReserve',
      'getTemporaryStorage'
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
    addressChange(val) {
      const itemData = this.configData.sites.find(
        item => item.addressId === val,
      );
      this.data.serviceSiteName = itemData.serviceSiteName;
      this.data.contactMobile = itemData.contactMobile;
      this.beforeDate = this.$isNotEmpty(itemData.beforeDate)
        ? Number(itemData.beforeDate)
        : 2;
    },
    // 预约城市变跟
    selectCityChange() {
      this.data.addressId = null;
      this.data.serviceSiteName = null;
      this.data.contactMobile = null;
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
        const companyTimeArr = this.data.timeStr.split('——');
        // 设置省市区
        this.data.provinceId = this.data.selectCity[0];
        this.data.cityId = this.data.selectCity[1];
        this.data.startTime = new Date(
          `1970/01/01 ${companyTimeArr[0]}:00 `,
        ).getTime();
        this.data.endTime = new Date(
          `1970/01/01 ${companyTimeArr[1]}:00 `,
        ).getTime();
        this.addReserve(this.data).then(result => {
          let id = null;
          if (this.$isNotEmpty(result.data.data)) {
            id = result.data.data.reserveId;
          }
          const msg = result.data.message || '提交失败，用户权益已用完';
          this.$emit('saved', id, true, msg);
        });
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
