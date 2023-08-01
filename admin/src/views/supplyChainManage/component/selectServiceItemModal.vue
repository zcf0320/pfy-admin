<template>
  <div class="select-service-item-container modal-form">
    <Dialog
      title="新增服务项"
      :visible="true"
      :height="499"
      :width="546"
      @closed="close"
    >
      <div class="health-tip-content">
        <el-form
          ref="submitInfo"
          :model="submitInfo"
          label-width="100px"
          :rules="rules"
          label-position="top"
        >
          <div class="radio-group">
            <el-radio-group v-model="submitInfo.type" @change="typeChange">
              <el-radio :label="0">单个服务项</el-radio>
              <el-radio :label="1">服务项组</el-radio>
            </el-radio-group>
          </div>
          <div v-if="submitInfo.type" class="service-group-tip">
            服务项组可包含由不同供应商提供的同质服务项，单个服务项停止合作不会影响该服务的正常使用
          </div>
          <div v-if="submitInfo.type">
            <el-form-item label="选择服务类型:" prop="serviceType">
              <el-select
                v-model="submitInfo.serviceType"
                placeholder="请选择选择服务类型"
                class="select"
                @change="getServiceItemList"
              >
                <el-option label="在线服务" :value="57" />
                <el-option label="预约服务" :value="56" />
                <el-option label="商品兑换(实物商品，虚拟商品)" :value="95" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="选择服务项:" prop="id">
            <el-select
              v-model="submitInfo.id"
              filterable
              placeholder="请选择服务项"
              class="select"
              multiple
              :multiple-limit="submitInfo.type ? 0 : 1"
              value-key="serviceInfoId"
              @change="serviceItemChange"
            >
              <el-option
                v-for="item in serviceItemsList"
                :key="item.serviceInfoId"
                :label="item.label"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <div
            v-if="submitInfo.type && submitInfo.serviceType !== 56"
            class="service-group"
          >
            <div class="service-group-tip mb-12">
              使用概率设置：当前总计({{ sumProbability.toFixed(2) }}%)
            </div>
            <el-table
              :data="submitInfo.serviceInfoAndProviderList"
              style="width: 100%"
            >
              <el-table-column label="服务项名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.serviceInfoName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="供应商" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.providerName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="使用概率分布（%）">
                <template slot-scope="scope">
                  <el-form-item
                    label=""
                    :prop="
                      `serviceInfoAndProviderList[${scope.$index}].probability`
                    "
                    :rules="[{ validator: validate, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="
                        submitInfo.serviceInfoAndProviderList[scope.$index]
                          .probability
                      "
                      placeholder="请输入"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-form-item
            v-if="submitInfo.type"
            label="服务项组名称:"
            prop="serviceName"
          >
            <el-input
              v-model="submitInfo.serviceName"
              placeholder="请输入服务项组名称"
            />
          </el-form-item>
          <el-form-item label="设置使用次数:" prop="useLimitCount">
            <el-select
              v-model="submitInfo.useLimitCount"
              placeholder="请选择设置使用次数"
              class="select"
              @change="changeCount"
            >
              <el-option
                v-for="item in useCounts"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <div class="flex">
            <div class="mr-24">是否设置周期次数</div>
            <el-radio-group
              :disabled="submitInfo.useLimitCount === -1"
              v-model="submitInfo.cycleFlag"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div class="use-cycle" v-if="submitInfo.cycleFlag === 1">
            <div class="day flex-center">
              每
              <el-input
                class="day-input"
                :readonly="submitInfo.useLimitCount === -1"
                :disabled="submitInfo.useLimitCount === -1"
                v-model="submitInfo.cycle"
              ></el-input>
              <el-select
                style="width: 60px; margin-right: 16px"
                v-model="submitInfo.timeUnit"
              >
                <el-option
                  v-for="item in timeUnitList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              最高
              <div class="number">
                <el-input
                  class="count-input"
                  type="number"
                  min="0"
                  :controls="false"
                  :max="submitInfo.useLimitCount"
                  :readonly="submitInfo.useLimitCount === -1"
                  :disabled="submitInfo.useLimitCount === -1"
                  v-model="submitInfo.maxCount"
                ></el-input>
                <div class="label">次</div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save('submitInfo')">确定</el-button>
      </span>
    </Dialog>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'SelectServiceItemModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'));
      } else if (value < 0 || value > 100) {
        callback(new Error('请输入0-100以内的数字'));
      } else if (!/^(0|[1-9]\d{0,3})(\.\d{0,2})?$/.test(value)) {
        callback(new Error('最多两位有效数字'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      closeClickModal: false,
      serviceItems: {},
      submitInfo: {
        serviceInfoAndProviderList: [],
        serviceName: '',
        serviceType: '',
        type: 0,
        useLimitCount: '',
        id: [],
        cycle: '',
        maxCount: 0,
        cycleFlag: 0,
        timeUnit: ''
      },
      rules: {
        id: [
          {
            required: true,
            message: '请选择服务项',
            trigger: 'change'
          }
        ],
        useLimitCount: [
          {
            required: true,
            message: '请选择使用次数',
            trigger: 'change'
          }
        ],
        serviceName: [
          {
            required: true,
            message: '请输入服务组名称',
            trigger: 'change'
          }
        ],
        serviceType: [
          {
            required: true,
            message: '选择服务类型',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择使用次数',
            trigger: 'change'
          }
        ]
      },
      useCounts: [],
      serviceItemsList: [],
      radio: 0,
      validate,
      timeUnitList: []
    };
  },
  computed: {
    sumProbability() {
      let sum = 0;
      this.submitInfo.serviceInfoAndProviderList.forEach(item => {
        sum += Number(item.probability);
      });
      return sum;
    }
  },
  created() {
    this.getServiceItemsList();
    // 获取使用次数
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'useCount'
      })
      .then(res => {
        this.useCounts = res.obj || [];
        // this.submitInfo.maxCount =
        //   (res.obj.length && res.obj[res.obj.length - 1].value) || 0;
        // this.submitInfo.useLimitCount =
        //   (res.obj.length && res.obj[res.obj.length - 1].value) || 0;
      });
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'timeUnit'
      })
      .then(res => {
        this.timeUnitList = res.data;
        if (res.data.length > 0) {
          this.submitInfo.timeUnit = res.data[0].id;
        }
      });
  },
  methods: {
    serviceItemChange(val) {
      const deepObj = _.cloneDeep(this.submitInfo.serviceInfoAndProviderList);
      val.forEach(item => {
        this.$set(item, 'probability', '');
      });
      this.submitInfo.serviceInfoAndProviderList = val;
      this.submitInfo.serviceInfoAndProviderList.forEach(ele => {
        deepObj.forEach(item => {
          if (item.serviceInfoId === ele.serviceInfoId) {
            this.$set(ele, 'probability', item.probability);
          }
        });
      });
    },
    // 切换类型
    typeChange() {
      this.submitInfo.id = [];
      if (this.submitInfo.type) {
        this.serviceItemsList = [];
      } else {
        this.getServiceItemsList();
      }
    },
    getServiceItemList(val) {
      this.submitInfo.id = [];
      this.$store
        .dispatch('serviceItems/getServiceLstByType', val)
        .then(res => {
          res.data.forEach(item => {
            item.label =
              item.serviceInfoName +
              '(' +
              item.providerName +
              ')' +
              item.serviceId;
          });
          this.serviceItemsList = res.data || [];
        });
    },
    // 获取服务项列表
    getServiceItemsList() {
      const vm = this;
      // 获取服务项
      vm.$store.dispatch('serviceItems/getAllServiceList').then(response => {
        response.data.forEach(item => {
          if (item.providerName) {
            item.label =
              item.serviceName + '(' + item.providerName + ')' + item.serviceId;
          } else {
            item.label = item.serviceName;
          }
          item.serviceInfoId = item.id;
        });
        vm.serviceItemsList = response.data;
      });
    },
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
          if (vm.submitInfo.useLimitCount !== -1) {
            if (vm.submitInfo.maxCount > vm.submitInfo.useLimitCount) {
              this.$message.error('周期次数不能大于使用次数');
              return;
            }
          }

          if (this.submitInfo.type) {
            if (this.submitInfo.serviceType !== 56) {
              if (this.sumProbability !== 100) {
                this.$message.error('概率总和不等于100！');
                return;
              }
            }
          } else {
            this.submitInfo.serviceName = this.submitInfo.serviceInfoAndProviderList[0].serviceName;
            this.submitInfo.serviceInfoAndProviderList[0].serviceInfoName = this.submitInfo.serviceInfoAndProviderList[0].serviceName;
          }
          vm.submitInfo.groupType = vm.submitInfo.serviceType;
          vm.submitInfo.updateTime = new Date().getTime();
          vm.$emit('save', vm.submitInfo);
        }
      });
    },
    changeCount(val) {
      if (val === -1) {
        this.submitInfo.cycleFlag = 0;
      } else {
        this.submitInfo.maxCount = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select-service-item-container {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .radio-group {
    color: #464668;
    margin-bottom: 14px;
    /deep/ .el-radio__label {
      color: #464668;
    }
  }
  .service-group-tip {
    font-size: 14px;

    font-weight: 400;
    color: #989ab3;
    line-height: 21px;
    margin-bottom: 24px;
    .mb-12 {
      margin-bottom: 12px;
    }
  }
  .service-group {
    .el-table {
      margin-bottom: 24px;
    }
    margin-bottom: 24px;
    /deep/ .el-form-item {
      margin-bottom: 0;
    }
  }
  .use-cycle {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .day {
      .day-input {
        width: 140px;
        margin: 0 15px;
      }
    }
    .number {
      display: flex;
      align-items: center;
      margin-left: 15px;
      .count-input {
        width: 124px;
      }
      .label {
        width: 48px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ebedf2;
        border-radius: 0px 4px 4px 0px;
      }
    }
  }
}
</style>
