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
          label="预约城市"
          prop="selectCity"
          :rules="[{ required: true, message: '请选择预约城市' }]"
        >
          <el-cascader
            v-model="data.selectCity"
            :disabled="isDisabled"
            class="w-full"
            :options="provinces"
            placeholder="请选择预约城市"
            :props="optionProps"
            @change="getSelectSites"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
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
            @change="getSelectDate"
          >
            <el-option
              v-for="item in sites"
              :key="item.addressId"
              :label="item.address"
              :value="item.addressId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="$isNotEmpty(data.serviceSiteName)" :span="12">
        <el-form-item label="网点地址">
          <el-input
            v-model="data.serviceSiteName"
            disabled
            class="w-full"
          />
        </el-form-item>
      </el-col>
      <el-col v-if="$isNotEmpty(data.contactMobile)" :span="12">
        <el-form-item label="网点电话">
          <el-input
            v-model="data.contactMobile"
            disabled
            class="w-full"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="预约日期"
          prop="dateStr"
          :rules="[{ required: true, message: '选择预约时间' }]"
        >
          <el-select
            v-model="data.dateStr"
            :disabled="isDisabled"
            placeholder="选择预约时间"
            class="w-full"
            @change="getSelectTimes"
          >
            <el-option
              v-for="item in dates"
              :key="item.AppDate"
              :label="item.AppDate"
              :value="item.AppDate"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="预约时间"
          prop="timeStr"
          :rules="[{ required: true, message: '选择预约时间' }]"
        >
          <el-select
            v-model="data.timeStr"
            :disabled="isDisabled"
            placeholder="选择预约时间"
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
        <el-form-item label="预约人姓名" required>
          <el-input v-model="data.name" disabled class="w-full"/>
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
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'cities'
      },
      provinces: [],
      sites: [],
      dates: [],
      timeList: []
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

    if (this.$isNotEmpty(this.data.sitesStr)) {
      this.sites = JSON.parse(this.data.sitesStr);
    }
    if (this.$isNotEmpty(this.data.datesStr)) {
      this.dates = JSON.parse(this.data.datesStr);
    }
    if (this.$isNotEmpty(this.data.timeListStr)) {
      this.timeList = JSON.parse(this.data.timeListStr);
    }
    this.getSelectCitys();
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
      'getTemporaryStorage',
      'getCitys',
      'getSites',
      'getDate',
      'getTimes'
    ]),
    /**
     * 获取中韩城市
     */
    getSelectCitys() {
      this.getCitys({
        serviceInfoId: this.serviceInfoId,
        token: this.token
      }).then(res => {
        const provinces = res.data.data || [];
        if (this.$isNotEmpty(provinces)) {
          provinces.forEach(item => {
            item.id = item.provinceId;
            item.name = item.provinceName;
            if (this.$isNotEmpty(item.cities)) {
              item.cities.forEach(city => {
                city.name = city.cityName;
                city.id = city.cityId;
              });
            }
          });
        }
        this.provinces = res.data.data;
      });
    },
    /**
     * 根据城市获取网点
     */
    getSelectSites(val) {
      this.getSites({
        serviceInfoId: this.serviceInfoId,
        cityId: val[1],
        token: this.token
      }).then(res => {
        this.sites = res.data.data || [];
        // 清空网点 时间 日期
        this.data.addressId = null;
        this.data.dateStr = '';
        this.data.timeStr = '';
      });
    },
    /**
     * 根据网点获取日期
     *
     */
    getSelectDate(val) {
      const itemData = this.sites.find(item => item.addressId === val);
      this.data.serviceSiteName = itemData.serviceSiteName;
      this.data.contactMobile = itemData.contactMobile;
      this.getDate({
        serviceSiteId: val,
        token: this.token
      }).then(res => {
        this.dates = res.data.data || [];
        this.data.dateStr = '';
        this.data.timeStr = '';
      });
    },
    /**
     * 根据日期获取时间
     */
    getSelectTimes(val) {
      this.getTimes({
        appDate: val,
        serviceSiteId: this.data.addressId,
        token: this.token
      }).then(res => {
        if (this.$isNotEmpty(res.data.data)) {
          this.timeList = res.data.data;
          this.data.timeStr = '';
        }
      });
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
        this.addReserve(this.data).then(result => {
          let id = null;
          if (this.$isNotEmpty(result.data.data)) {
            id = result.data.data.reserveId;
          }
          const msg = result.data.message || '提交失败，用户权益已用完';
          this.$emit('saved', id, true, msg);
        });
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
