<template>
  <div class="add-door-city-container modal-form">
    <el-dialog
      v-loading="loading"
      title="新增上门城市"
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
        <el-form-item label="选择城市:" prop="selectCity">
          <el-cascader
            v-model="submitInfo.selectCity"
            :options="allCityList"
            placeholder="请选择城市"
            :props="optionProps"
          />
        </el-form-item>
        <el-form-item label="设置最少上门人数:" prop="minPerson">
          <el-select
            v-model="submitInfo.minPerson"
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

        <el-form-item label="设置最少提前上门天数:" prop="beforeDate">
          <el-select
            v-model="submitInfo.beforeDate"
            placeholder="请选择天数"
            class="select"
          >
            <el-option
              v-for="item in enterpriseAdvanceDay"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
  name: 'AddDoorCity',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        beforeDate: '',
        minPerson: '',
        cityId: '',
        prepointType: '1',
        selectCity: []
      },
      enterpriseAdvanceDay,
      appointmentNumber,
      rules: {
        selectCity: [
          { required: true, message: '请选择选择城市', trigger: 'change' }
        ],
        minPerson: [
          { required: true, message: '请设置最少上门人数', trigger: 'change' }
        ],
        beforeDate: [
          {
            required: true,
            message: '请设置最少提前上门天数',
            trigger: 'change'
          }
        ]
      },
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'citys'
      },
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
      const vm = this;
      vm.$emit('close');
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
.add-door-city-container {
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
