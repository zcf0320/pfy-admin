<template>
  <div class="add-network-container modal-form">
    <el-dialog
      v-loading="loading"
      title="新增网点"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="submitInfo"
        :model="submitInfo"
        label-width="100px"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="选择城市" prop="selectCity">
          <el-cascader
            v-model="submitInfo.selectCity"
            :options="allCityList"
            placeholder="请选择城市"
            :props="optionProps"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="siteAddress">
          <el-input
            v-model="submitInfo.siteAddress"
            placeholder="请输入详细地址"
          />
        </el-form-item>
        <el-form-item label="最多单日接待人数" prop="dayMaxPerson">
          <el-select
            v-model="submitInfo.dayMaxPerson"
            placeholder="请选择人数"
            class="select"
          >
            <el-option
              v-for="item in appointmentNumber"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提前预约天数" prop="beforeDate">
          <el-select
            v-model="submitInfo.beforeDate"
            placeholder="请选择人数"
            class="select"
          >
            <el-option
              v-for="item in enterpriseAdvanceDay"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="网点名称" prop="name">
          <el-input
            v-model="submitInfo.name"
            placeholder="请输入网点名称"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="网点电话">
          <el-input
            v-model="submitInfo.contactMobile"
            placeholder="请输入网点电话(可输入手机号）"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { appointmentNumber, enterpriseAdvanceDay } from '@/config/selectConfig';
export default {
  name: 'AddNetwork',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        siteAddress: '',
        selectCity: [],
        dayMaxPerson: '',
        beforeDate: '',
        contactMobile: '',
        name: ''
      },
      rules: {
        selectCity: [
          {
            required: true,
            message: '请选择选择城市',
            trigger: 'change'
          }
        ],
        siteAddress: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入网点地址',
            trigger: 'blur'
          }
        ],
        dayMaxPerson: [
          {
            required: true,
            message: '请选择最多单日接待人数',
            trigger: 'change'
          }
        ],
        beforeDate: [
          {
            required: true,
            message: '请选择提前预约天数',
            trigger: 'change'
          }
        ]
      },
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'citys'
      },
      appointmentNumber,
      enterpriseAdvanceDay,
      edit: false
    };
  },
  computed: {
    allCityList() {
      return this.$store.state.app.allCityList || [];
    }
  },
  created() {
    // 获取城市列表
    this.$store.dispatch('app/getAllCityList').then(() => {
      // 判断是否是编辑
      if (this.item.cityId) {
        this.edit = true;
        this.submitInfo = {
          ...this.item,
          selectCity: [this.item.provId, this.item.cityId]
        };
      }
    });
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 提交
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.allCityList.forEach(item => {
            item.citys.forEach(city => {
              if (city.id === vm.submitInfo.selectCity[1]) {
                vm.submitInfo.cityName = city.name;
                vm.submitInfo.provName = item.name;
                vm.submitInfo.provId = vm.submitInfo.selectCity[0];
                vm.submitInfo.cityId = vm.submitInfo.selectCity[1];
              }
            });
          });
          vm.$emit('save', vm.submitInfo);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-network-container {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
