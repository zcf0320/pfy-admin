<template>
  <div class="create-appointment-container modal-form">
    <el-dialog
      v-loading="loading"
      title="新增预约"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="isShow"
      @close="close"
    >
      <div class="add-form">
        <el-form
          ref="submitInfo"
          :model="submitInfo"
          :rules="rules"
          class="form"
          label-position="top"
        >
          <el-form-item label="服务内容:" prop="serviceInfoId">
            <el-select
              v-model="submitInfo.serviceInfoId"
              placeholder="请选择服务内容"
              @change="serviceInfoChange"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.id"
                :label="item.serviceName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称:" prop="companyName">
            <el-input
              v-model="submitInfo.companyName"
              type="text"
              placeholder="请输入企业名称"
            />
          </el-form-item>
          <el-form-item label="选择城市:" prop="selectCity">
            <el-cascader
              v-model="submitInfo.selectCity"
              :options="proviceList"
              placeholder="请选择城市"
              :props="optionProps"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="详细地址:" prop="detailAddress">
            <el-input
              v-model="submitInfo.detailAddress"
              type="text"
              placeholder="请输入详细地址"
            />
          </el-form-item>
          <el-form-item label="预约人数:" prop="personNumber">
            <el-input
              v-model="submitInfo.personNumber"
              type="text"
              placeholder="请输入预约人数"
            />
          </el-form-item>
          <el-form-item label="预约时间:" prop="preponitTime">
            <el-date-picker
              v-model="submitInfo.preponitTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="联系人:" prop="peopleName">
            <el-input
              v-model="submitInfo.peopleName"
              placeholder="请输入联系人"
            />
          </el-form-item>
          <el-form-item label="联系电话:" prop="peopleTelephone">
            <el-input
              v-model="submitInfo.peopleTelephone"
              maxlength="11"
              placeholder="请输入联系电话"
            />
          </el-form-item>
          <el-form-item label="联系邮箱:" prop="peopleEmail">
            <el-input
              v-model="submitInfo.peopleEmail"
              placeholder="请输入联系邮箱"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <button type="button" class="btn-exit" @click="close">取 消</button>
        <button
          type="button"
          class="btn-save"
          @click="confirmAdd('submitInfo')"
        >
          确 定
        </button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'AddEnterprise',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validInfoPhonenum = (rule, value, callback) => {
      if (!Number(value)) {
        return callback(new Error('请输入正确的预约人数'));
      }
      callback();
    };
    return {
      loading: false,
      closeClickModal: false,
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'settings'
      },
      submitInfo: {
        companyName: '',
        cityId: '',
        detailAddress: '',
        personNumber: '',
        preponitTime: '',
        peopleName: '',
        peopleTelephone: '',
        peopleEmail: '',
        selectCity: [],
        serviceInfoId: ''
      },
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date().getTime();
        }
      },
      rules: {
        serviceInfoId: [
          {
            required: true,
            message: '请选择服务内容',
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
        selectCity: [
          {
            required: true,
            message: '请选择选择城市',
            trigger: 'change'
          }
        ],
        detailAddress: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ],
        personNumber: [
          {
            required: true,
            message: '请输入预约人数',
            trigger: 'blur'
          },
          { validator: validInfoPhonenum, trigger: 'blur' }
        ],
        preponitTime: [
          {
            required: true,
            message: '请选择预约时间',
            trigger: 'change'
          }
        ],
        peopleName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        peopleEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: this.$validators.checkEmail, trigger: 'blur' }
        ],
        peopleTelephone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          { validator: this.$validators.checkPhone, trigger: 'blur' }
        ]
      },
      serviceList: [],
      proviceList: [],
      citySetting: {}
    };
  },
  computed: {
    // proviceList() {
    //     return this.$store.state.app.companyCityList || []
    // }
  },
  created() {
    const vm = this;
    vm.getServiceVos();
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 确认添加
    confirmAdd(formName) {
      // 校验数据
      const vm = this;
      // 校验选择的城市至少选择的人数 和 时间
      vm.getCitySetting(vm.submitInfo.selectCity[1]);
      if (vm.citySetting && vm.submitInfo.personNumber) {
        const { minPerson } = vm.citySetting;
        if (Number(vm.submitInfo.personNumber) < Number(minPerson)) {
          vm.$message.warning(`该地区最少${minPerson}人`);
          return;
        }

        // // 获取选择的时间间隔
        // let spaceDay = parseInt((new Date(vm.preponitTime) - new Date().getTime()) / (3600 * 24*1000) )
        // if(spaceDay < prepointMinDay) {
        //     vm.warnInfo.preponitTime = `该地区至少提前${prepointMinDay}天`
        //     vaild = true
        // }
      }

      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.submitInfo.preponitTime = new Date(
            vm.submitInfo.preponitTime,
          ).getTime();
          vm.submitInfo.cityId = vm.submitInfo.selectCity[1];
          vm.$store
            .dispatch('appointmentService/createAppointment', vm.submitInfo)
            .then(() => {
              vm.$emit('save');
            })
            .catch(() => {});
        }
      });
    },
    handleChange(value) {
      const vm = this;
      vm.submitInfo.cityId = value[1];
      // 禁止时间
      vm.getCitySetting(value[1]);
      if (vm.citySetting) {
        const { beforeDate = 1 } = vm.citySetting;
        vm.pickerOptions = {
          disabledDate: time => {
            return (
              time.getTime() <
              new Date().getTime() + (Number(beforeDate) - 1) * 3600 * 24 * 1000
            );
          }
        };
      }
    },
    // 获取选择城市的设置
    getCitySetting(cityId) {
      if (!cityId) {
        return;
      }
      const vm = this;
      this.proviceList.forEach(item => {
        item.settings.forEach(city => {
          if (city.id === cityId) {
            vm.citySetting = city;
          }
        });
      });
    },
    // 获取服务项列表
    getServiceVos() {
      this.$store
        .dispatch('serviceItems/getServiceVos', {
          pageNum: 1,
          pageSize: 10000
        })
        .then(res => {
          this.serviceList = res.obj || [];
        });
    },
    // 服务内容改变请求服务城市列表
    serviceInfoChange() {
      this.$store
        .dispatch('appointmentService/serviceInfoChange', {
          serviceInfoId: this.submitInfo.serviceInfoId
        })
        .then(res => {
          this.proviceList = res.obj || [];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.create-appointment-container {
  max-height: 500px;
  overflow-y: auto;
  padding: 1px 0;
  .add-form {
    height: 500px;
    overflow: hidden;
    overflow-y: scroll;
     &::-webkit-scrollbar {
        display: none;
    }
  }
  .el-date-editor {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
.danager {
  color: $danger_tag_bg;
  margin-right: 5px;
}
.phone {
  width: 33%;
}
.mail {
  width: 66%;
}
.point-select {
  width: 100%;
}
</style>
