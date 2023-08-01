<template>
  <Dialog
    title="新增收货地址"
    :visible.sync="dialogVisible"
    :height="550"
    :width="500"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <el-form ref="formData" :model="formData">
        <el-form-item
          label="收货人"
          prop="name"
          :rules="[{ required: true, message: '请输入收货人' }]"
        >
          <el-input v-model="formData.name" maxlength="15" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号' },
            {
              validator: $validators.checkPhone,
              message: '请输入正确的手机号',
            },
          ]"
        >
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item
          label="地区"
          prop="selectCity"
          :rules="[{ required: true, message: '请选择地区' }]"
        >
          <el-cascader
            v-model="formData.selectCity"
            class="w-full"
            :options="allCityList"
            placeholder="请选择地区"
            :props="optionProps"
          />
        </el-form-item>
        <el-form-item
          label="详细地址"
          class="mb-0"
          prop="address"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        >
          <el-input
            v-model="formData.address"
            type="textarea"
            placeholder="请输入详细地址"
            maxlength="50"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveForm('formData')">确 定</el-button>
    </span>
  </Dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'addressAddDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ''
    }
  },
  data() {
    const defaultForm = {
      selectCity: [],
      address: null,
      cityId: null,
      districtId: null,
      id: null,
      mobile: null,
      name: null,
      provinceId: null,
      isDefault: false
    };
    return {
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      allCityList: [],
      optionProps: {
        value: 'id',
        label: 'name'
      },
      dialogVisible: false
    };
  },
  watch: {
    visible: {
      async handler(val) {
        this.$copyProps(this.formData, this.defaultForm);
        if (val) {
          this.getAllCity();
        }
        this.dialogVisible = val;
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  methods: {
    ...mapActions('userManage', ['saveAddress', 'getProvincesAndCities']),
    // 获取省市区
    getAllCity() {
      this.getProvincesAndCities({ token: this.token }).then(res => {
        const arr = res.data.data || [];
        arr.forEach(item => {
          item.id = item.provinceId;
          item.name = item.provinceName;
          item.children = item.cities;
          item.cities.forEach(city => {
            city.id = city.cityId;
            city.name = city.cityName;
            city.children = city.districts;
            city.districts.forEach(districy => {
              districy.id = districy.districtId;
              districy.name = districy.districtName;
            });
          });
        });
        this.allCityList = arr;
      });
    },
    // 保存收货地址
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.provinceId = this.formData.selectCity[0];
        this.formData.cityId = this.formData.selectCity[1];
        this.formData.districtId = this.formData.selectCity[2];
        this.formData.token = this.token;
        this.saveAddress(this.formData).then(() => {
          this.$message.success('保存成功');
          this.$emit('saved');
          this.dialogVisible = false;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
