<template>
  <div class="add-points-commodity page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content">
          <div class="title-top">商品新增</div>
          <el-form
            ref="baseForm"
            :model="baseForm"
            :rules="rules"
            label-width="100px"
            label-position="top"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="服务项" prop="serviceInfoId">
                  <el-select
                    v-model="baseForm.serviceInfoId"
                    filterable
                    placeholder="请选择服务项"
                    class="search-input"
                    @change="serviceChange"
                  >
                    <el-option
                      v-for="(item, index) in serviceItemsList"
                      :key="index"
                      :label="item.name"
                      :value="item.serviceInfoId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="baseForm.serviceInfoId" :span="12">
                <el-form-item label="供应商">
                  <el-input
                    v-model="baseForm.providerName"
                    disabled
                    placeholder="供应商名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="星币数量" prop="scorePrice">
                  <el-input
                    v-model.number="baseForm.scorePrice"
                    placeholder="10星币等于1元"
                    maxlength="8"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用次数" prop="useCount">
                  <el-select
                    v-model="baseForm.useCount"
                    placeholder="请选择使用次数"
                  >
                    <el-option
                      v-for="item in useCounts"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期" prop="validateDate">
                  <el-select
                    v-model="baseForm.validateDate"
                    placeholder="请选择有效期"
                  >
                    <el-option
                      v-for="item in validateDates"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
      <div class="page-footer">
        <button
          type="button"
          placeholder="不超过300字"
          class="btn-save"
          @click="submitForm('baseForm')"
        >
          保存
        </button>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addPiontsCommodity',
  data() {
    return {
      tableLoading: false,
      serviceItemsList: [],
      baseForm: {
        serviceInfoId: '',
        scorePrice: '',
        useCount: '',
        validateDate: ''
      },
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date().getTime();
        }
      },
      useCounts: [
        {
          name: '一次',
          value: 1
        },
        {
          name: '二次',
          value: 2
        },
        {
          name: '三次',
          value: 3
        },
        {
          name: '四次',
          value: 4
        },
        {
          name: '五次',
          value: 5
        },
        {
          name: '无限次',
          value: -1
        }
      ],
      validateDates: [
        {
          name: '一年',
          value: 1
        },
        {
          name: '二年',
          value: 2
        },
        {
          name: '三年',
          value: 3
        },
        {
          name: '四年',
          value: 4
        },
        {
          name: '五年',
          value: 5
        },
        {
          name: '无限期',
          value: -1
        }
      ],
      rules: {
        serviceInfoId: [
          {
            required: true,
            message: '请选择服务项',
            trigger: 'change'
          }
        ],
        scorePrice: [
          {
            required: true,
            message: '请输入积分价格',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '输入数字',
            trigger: 'blur'
          }
        ],
        useCount: [
          {
            required: true,
            message: '请选择使用次数',
            trigger: 'change'
          }
        ],
        validateDate: [
          {
            required: true,
            message: '请选择有效期',
            trigger: 'change'
          }
        ]
      },
      ucProducts: []
    };
  },
  created() {
    const vm = this;
    // 获取销售状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'ucProduct'
      })
      .then(res => {
        vm.ucProducts = res.obj || [];
      });
    vm.getServiceItemsList();
  },
  methods: {
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      vm.$store
        .dispatch('serviceItems/getServiceListAndProvider', {})
        .then(res => {
          res.data.forEach(item => {
            item.name = `${item.serviceInfoName} / ${item.providerName}`;
          });
          vm.serviceItemsList = res.data || [];
        });
    },
    // 创建
    submitForm(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$store
            .dispatch('pointsCommodity/addPointsCommodity', {
              ...vm.baseForm,
              validateDate: new Date(vm.baseForm.validateDate).getTime()
            })
            .then(res => {
              if (!res.code) {
                this.$router.push(
                  `/operateManage/pointsMall/details/${res.data}`
                );
              }
            });
        }
      });
    },
    // 服务项改变
    serviceChange() {
      const { serviceInfoId } = this.baseForm;
      this.serviceItemsList.forEach(item => {
        if (serviceInfoId === item.serviceInfoId) {
          this.baseForm.providerName = item.providerName;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-points-commodity {
  .details-content {
    .display-flex {
      display: flex;
      .flex {
        flex: 1;
      }
      .fixed-width {
        width: 150px;
      }
    }
  }
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
