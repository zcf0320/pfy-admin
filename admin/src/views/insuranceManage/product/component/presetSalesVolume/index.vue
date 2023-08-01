<template>
  <div class="base-form page-form modal-form">
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="撤单条件:" prop="cancelType">
            <el-select
              v-model="baseForm.cancelType"
              :disabled="edit === 'detail'"
              placeholder="全部"
            >
              <el-option label="仅限服务未使用" :value="1" />
              <el-option label="随时可撤单" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
           <el-col :span="12">
          <el-form-item label="预设保单销量:" prop="presetSale">
            <InputNumber
              v-model="baseForm.presetSale"
              class="input-number"
              :min="0"
              :disabled="edit === 'detail'"
              placeholder="请输入预设保单销量"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="补仓后预估销量:">
            <el-input
              v-model="baseForm.estimatedSalesVolumeAfterReplenishment"
              disabled
              placeholder="请输入补仓后预估销量"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际保单理赔发生率:">
            <el-input
              v-model="baseForm.policyClaimRateStr"
              disabled
              placeholder="请输入预设保单销量"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="baseForm.cancelType === 2" :span="12">
          <el-form-item label="扣除金额" prop="deductionAmount">
            <el-input
              v-model="baseForm.deductionAmount"
              :disabled="edit === 'detail'"
              placeholder="如服务已被使用，需要扣除金额"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table :data="baseForm.serviceItemConfigs" class="table-large"
       :stripe="true"
      >
        <el-table-column label="服务项">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceItemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际数据">
          <template slot-scope="scope">
            <div>
              <div>实际服务量：{{ scope.row.usageAmount }}</div>
              <div>
                实际发生率：<span v-if="$isNotEmpty(scope.row.usageRate)"
                  >{{ Number(scope.row.usageRate).toFixed(2) }}%</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预计发生率">
          <template slot-scope="scope">
            <el-form-item
              :prop="'serviceItemConfigs.' + scope.$index + '.presetRate'"
              :rules="rules.presetRate"
            >
              <el-input-number
                v-model="scope.row.presetRate"
                controls-position="right"
                :min="0"
                :max="100"
                :precision="2"
                :step="0.01"
                class="input-number-11"
                :disabled="edit === 'detail'"
                placeholder="请输入预计发生率"
              />
              <span>%</span>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button @click.native.prevent="back()">上一步</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="next('baseForm')"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'PresetSalesVolume',
  components: {
    Footer
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      baseForm: {
        presetSale: '',
        estimatedSalesVolumeAfterReplenishment: '',
        policyClaimRate: '',
        serviceItemConfigs: [],
        cancelType: '',
        deductionAmount: ''
      },
      rules: {
        presetSale: [
          {
            required: true,
            message: '请输入预设保单销量',
            trigger: 'blur'
          }
        ],
        presetRate: [
          {
            required: true,
            message: '请输入预计发生率',
            trigger: 'blur'
          }
        ],
        cancelType: [
          {
            required: true,
            message: '请选择撤单条件',
            trigger: 'blur'
          }
        ],
        deductionAmount: [
          {
            required: true,
            message: '请输入扣费金额',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getPresetSales({
      productId: this.id
    }).then(res => {
      this.baseForm = res.data;
      if (this.$isNotEmpty(this.baseForm.policyClaimRate)) {
        this.baseForm.policyClaimRateStr = Number(
          this.baseForm.policyClaimRate,
        ).toFixed(2);
      }
    });
  },
  methods: {
    ...mapActions('insuranceProducts', ['getPresetSales', 'setPresetSales']),
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 5
      });
    },
    // 保存并新增
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.setPresetSales({
            productId: this.id,
            ...this.baseForm,
            step: 0
          })
            .then(res => {
              if (res.status) {
                this.loading = false;
                this.$message.success('保存成功');
                this.$emit('next', {
                  activeIndex: 7,
                  data: {
                    stepState: true
                  }
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    // 保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.setPresetSales({
            productId: this.id,
            ...this.baseForm
          })
            .then(res => {
              if (res.status) {
                this.loading = false;
                this.$message.success('保存成功');
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.base-form {
  /deep/ .el-table__row {
   background: #F8F8F8;
     height: 58px;
     border: 1px #FDFFFF dashed;
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
  .package-select {
    padding: 24px;
  }
  .input-number {
    width: 100%;
  }
  .input-number-11 {
    width: 200px;
  }
  /deep/ .el-icon-arrow-down .el-icon-arrow-up:before {
    width: 11px;
    height: 10px;
  }
}
</style>
