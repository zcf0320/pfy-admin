<template>
  <div>
    <div class="flex-between">
      <div class="content-detail title-top">服务使用</div>
      <button
        v-if="isDisabled"
        type="button"
        class="btn-save"
        @click="isDisabled = false"
      >
        修改
      </button>
    </div>
    <el-form v-if="flag" ref="formData" :model="formData">
      <component
        :is="currentComponent()"
        ref="uesDetail"
        :data="formData"
        :config-data="configData"
        :is-disabled="isDisabled"
        :expire-time="expireTime"
        :service-record-id="id"
        :token="token"
        :cnt="codeNum"
        :service-info-id="serviceInfoId"
        @saved="saved"
      />
    </el-form>
    <div class="page-footer">
      <el-button
        v-if="!isDisabled"
        size="small"
        class="border-blue"
        type="primary"
        @click="saveForm()"
      >
        保存并获取用户验证码
      </el-button>
      <el-button
        v-if="isDisabled"
        size="small"
        class="border-blue"
        type="primary"
        :disabled="loading"
        @click="submitForm()"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import otherForm from './otherForm';
import reservationService from './reservationService';
import CommodityExchange from './commodityExchange';
import { parseDate } from '@/utils/time';
export default {
  name: 'useDetail',
  provide() {
    return {
      saveForm: this.saveForm // 传递可响应对象
    };
  },
  inject: ['currentData'],
  components: { otherForm, reservationService, CommodityExchange },
  props: {
    id: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    serviceInfoId: {
      type: String,
      default: ''
    }
  },
  data() {
    const defaultForm = {
      name: '',
      mobile: this.mobile,
      itemName: this.currentData.serviceName,
      serviceInfoId: '',
      sex: '',
      idCard: '',
      serviceRecordId: '',
      selectCity: [],
      addressId: '',
      contactMobile: '',
      serviceSiteName: '',
      time: '',
      sexStr: '',
      verificationCode: '',
      validCode: '',
      startTime: null,
      endTime: null,
      rangeTime: [],
      bedNumber: '',
      timeStr: '',
      dateStr: '',
      startDate: '',
      //
      sitesStr: '',
      datesStr: '',
      timeListStr: '',
      specifications: '' // 规格
    };
    return {
      loading: false,
      submitState: 0,
      token: '',
      isDisabled: false,
      expireTime: null, // 剩余时间
      formData: this.$extends({}, defaultForm),
      reserveParamCodeList: [],
      configData: {
        reserveParamCodeList: []
      },
      codeNum: null,
      flag: false
    };
  },
  computed: {},
  created() {
    this.getConfigData();
  },
  methods: {
    ...mapActions('userManage', [
      'getTemporaryStorage',
      'userReceivingTemporaryStorage',
      'deleteTemporaryStorage',
      'getConfig',
      'getToken'
    ]),
    // 初始化暂存数据
    init() {
      this.getTemporaryStorage({ serviceRecordId: this.id }).then(res => {
        this.expireTime = res.data.expireTime;
        if (this.$isNotEmpty(res.data.userTemporaryStorage)) {
          this.isDisabled = true;
          this.$copyProps(this.formData, res.data.userTemporaryStorage);
        }
        this.flag = true;
      });
    },
    /**
     * 获取配置页面
     */
    async getConfigData() {
      this.flag = false;
      const res = await this.getToken({ serviceRecordId: this.id });
      if (res) {
        this.token = res.data;
        if (this.currentData.serviceType === '1') {
          // 如果是预约服务 获取配置信息
          this.getConfig({
            serviceRecordId: this.id,
            token: res.data
          }).then(result => {
            result.data.data.reserveParamCodeList =
              result.data.data.reserveParamCodeList || [];
            const provinces = result.data.data.provinces;
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
            this.configData = result.data.data;
            this.$copyProps(this.formData, result.data.data);
            this.formData.sexStr =
              this.formData.sex === 0
                ? '女'
                : this.formData.sex === 1
                ? '男'
                : '';

            this.init();
          });
        } else {
          this.init();
        }
      }
    },
    currentComponent() {
      // 淼滴服务项id
      const serviceInfoIdList = [
        'ff808081737b57b501737b7243b5009e',
        '2c91808b7724db6f0177293074610022',
        '2c91808b77f2b4600177f5d0c53b004b',
        'ff808081737bbf250173948a352501ea',
        'ff80808175e59d5c0175f92ef2c20296',
        '2c90819377be41100177c790c82b00a9',
        '2c90819377eb6e130177ebb7787a05cf',
        '2c90819377eb6e130177ebbaa46205eb',
        '2c9081927844dc56017844e522780005'
      ];

      if (serviceInfoIdList.includes(this.serviceInfoId)) {
        // 淼滴专项服务使用
        return 'otherForm';
      } else if (this.currentData.serviceType === '3') {
        // 商品兑换 服务项使用
        return 'CommodityExchange';
      }
      return 'reservationService';
    },
    // 发送验证码 暂存数据
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.serviceRecordId = this.id;
        this.formData.serviceInfoId = this.serviceInfoId;
        // //淼滴服务字符换和时间戳转换
        if (
          this.$isNotEmpty(this.formData.dateStr) &&
          this.$isNotEmpty(this.formData.timeStr)
        ) {
          const str = `${this.formData.dateStr} ${this.formData.timeStr}`;

          const time = parseDate(str, 'yyyy-MM-dd HH:hh').getTime();
          this.formData.time = time;
        }
        // 淼滴服务保存下拉数据
        if (this.$isNotEmpty(this.$refs.uesDetail)) {
          this.formData.sitesStr = JSON.stringify(this.$refs.uesDetail.sites);
          this.formData.datesStr = JSON.stringify(this.$refs.uesDetail.dates);
          this.formData.timeListStr = JSON.stringify(
            this.$refs.uesDetail.timeList,
          );
        }
        this.userReceivingTemporaryStorage(this.formData).then(() => {
          this.$message.success('发送成功');
          this.getConfigData();
          this.codeNum = 60;
          this.isDisabled = true;
        });
      });
    },
    // 确认预约
    submitForm() {
      this.loading = true;
      if (this.$isNotEmpty(this.$refs.uesDetail)) {
        this.$refs.uesDetail.submitForm();
      }
    },
    saved(id, state, msg) {
      if (this.$isNotEmpty(id)) {
        this.submitState = 1;
        this.$emit('update:appointmentId', id);
      } else {
        this.submitState = 2;
      }
      this.$emit('update:submitState', this.submitState);
      this.$emit('update:msg', msg);
      // 商品兑换
      if (this.currentData.serviceType === 3) {
        this.deleteTemporaryStorage({
          serviceRecordId: this.id,
          state: state,
          couponCodeRecordId: id
        });
      } else {
        //
        this.deleteTemporaryStorage({
          serviceRecordId: this.id,
          state: state
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss"></style>
