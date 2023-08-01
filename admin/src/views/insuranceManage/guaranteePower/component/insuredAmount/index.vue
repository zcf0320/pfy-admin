<template>
  <div class="insured-amount page-form modal-form">
    <div class="title-top content-detail">
      保额信息<button
        type="button"
        class="btn-save fr"
        :disabled="!!id && postStatus !== 107"
        @click="addRow"
      >
        添加
      </button>
    </div>
    <div class="table">
      <el-form ref="form" :model="form">
        <el-table :data="form.list || []">
          <el-table-column>
            <template slot="header">
              <span class="fc-red">*</span>
              <span>累计保额</span>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.priceUnit === -1">不投保</div>
              <div v-else class="table-flex">
                <div class="form-item">
                  <el-form-item
                    :prop="`list[${scope.$index}].price`"
                    :rules="[{ required: true, message: '' }]"
                    class="table-form-item"
                  >
                    <InputNumber
                      v-model="scope.row.price"
                      placeholder="累计保额"
                      class="input-number"
                      :precision="2"
                      :max="9999999.99"
                      :min="0.0"
                    />
                  </el-form-item>
                </div>
                <div class="form-item-unit">
                  <el-form-item
                    :prop="`list[${scope.$index}].priceUnit`"
                    :rules="[{ required: true, message: '' }]"
                    class="table-form-item"
                  >
                    <el-select
                      v-model="scope.row.priceUnit"
                      placeholder="请选择单位"
                    >
                      <el-option
                        v-for="item in units"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单次保额">
            <template slot-scope="scope">
              <div v-if="scope.row.priceUnit === -1">不投保</div>
              <div v-else class="table-flex">
                <div class="form-item">
                  <el-form-item class="table-form-item">
                    <InputNumber
                      v-model="scope.row.singlePrice"
                      placeholder="单次保额"
                      class="input-number"
                      :max="9999999"
                      :min="0"
                    />
                  </el-form-item>
                </div>
                <div class="form-item-unit">
                  <el-form-item
                    :prop="`list[${scope.$index}].singlePriceUnit`"
                    :rules="[
                      {
                        required: $isNotEmpty(scope.row.singlePrice),
                        message: '',
                      },
                    ]"
                    class="table-form-item"
                  >
                    <el-select
                      v-model="scope.row.singlePriceUnit"
                      placeholder="请选择单位"
                    >
                      <el-option
                        v-for="item in units"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteInsuredAmount(scope)"
              >
                <HoverTip
                  v-show="scope.row.priceUnit !== -1 && postStatus === 107"
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
      </el-form>
    </div>
    <div v-if="!id" class="footer">
      <el-button @click.native.prevent="back">上一步</el-button>
      <el-button type="primary" @click.native.prevent="next('form')"
        >下一步</el-button
      >
    </div>
    <div v-else class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="save('form')"
        >保存</el-button
      >
      <!-- 状态改变组件 -->
      <Footer :id="id" :post-status="postStatus" />
    </div>
  </div>
</template>
<script>
import Footer from '../footer';
import { units } from './config';
export default {
  name: 'InsuredAmountSet',
  components: {
    Footer
  },
  props: {
    dtos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {
      type: true,
      units
    };
  },
  computed: {
    form() {
      return {
        list: this.dtos
      };
    }
  },
  created() {
    this.$route.params.id ? (this.type = false) : (this.type = true);
  },
  methods: {
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 0
      });
    },
    // 下一步
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dtos = this.form.list;
          this.$emit('next', {
            activeIndex: 2
          });
        }
      });
    },
    // 删除
    deleteInsuredAmount(item) {
      this.dtos.splice(item.$index, 1);
    },
    // 保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('guaranteePower/updatePriceSetting', {
              dtos: this.form.list,
              id: this.id
            })
            .then(res => {
              if (!res.code) {
                this.$message.success('更新保额设置成功');
              }
            });
        }
      });
    },
    // 添加
    addRow() {
      this.form.list.push({
        price: '',
        priceUnit: '',
        singlePrice: '',
        singlePriceUnit: ''
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.insured-amount {
  .add-insured-amount {
    margin-bottom: 10px;
  }
  .table {
    margin-bottom: 10px;
    .table-flex {
      display: flex;
      align-items: center;
      .form-item {
        flex: 1;
        .input-number {
          width: 100%;
        }
      }
      .form-item-unit {
        width: 200px;
      }
      .table-form-item {
        margin-bottom: 0 !important;
        padding: 12px 0;
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
