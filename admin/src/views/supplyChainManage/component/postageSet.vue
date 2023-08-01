<template>
  <div class="postage-page">
    <div class="title-top mt-30">药商性质</div>
    <el-radio-group v-model="companyMailVo.providerType">
      <el-radio :label="1">线上合作药商</el-radio>
      <el-radio :label="2">自营药房</el-radio>
    </el-radio-group>
      <div class="title-top content-detail">
      邮费
    </div>
    <el-form
      ref="companyMailVo"
      :model="companyMailVo"
      :rules="rules"
      label-width="100px"
      label-position="top"
      :disabled="!edit"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮费形式" prop="mailType">
            <el-select
              v-model="companyMailVo.mailType"
              placeholder="请选择邮费形式"
            >
              <el-option label="限制价包邮" :value="1" />
              <el-option label="全国包邮" :value="2" />
              <el-option label="区域邮费" :value="3" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="companyMailVo.mailType === 1" :gutter="20">
        <el-col :span="12">
          <el-form-item label="包邮限价（元）" prop="pinkagePrice">
            <el-input
              v-model.number="companyMailVo.pinkagePrice"
              type="number"
              placeholder="请输入包邮限价（元）"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="邮费单价（元）(超出限价部分邮费单价)"
            prop="beyondPinkagePrice"
          >
            <el-input
              v-model.number="companyMailVo.beyondPinkagePrice"
              type="number"
              placeholder="请输入邮费单价（元）"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="companyMailVo.mailType === 3" class="title-top">
        区域邮费信息
        <button type="button" class="btn-exit fr" @click="addAreaPostage">
          +添加
        </button>
      </div>
      <el-table
        v-if="companyMailVo.mailType === 3"
        v-loading="tableLoading"
        :data="companyMailVo.noMailVos"
        class="mb-24"
      >
        <el-table-column label="情形" max-width="100">
          <template slot-scope="scope">
            <div>情形{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column label="非包邮区" min-width="200">
          <template slot-scope="scope">
            <div class="table-input">
              <el-form-item
                :prop="`noMailVos[${scope.$index}].noMailCityIds`"
                :rules="{
                  required: true,
                  message: '非包邮区不能为空',
                  trigger: 'blur',
                }"
              >
                <el-select
                  v-model="scope.row.noMailCityIds"
                  placeholder="请选择非包邮区"
                  multiple
                  filterable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="邮费（元）" max-width="100">
          <template slot-scope="scope">
            <div class="table-input">
              <el-form-item
                :prop="`noMailVos[${scope.$index}].mailPrice`"
                :rules="[
                  {
                    required: true,
                    message: '邮费不能为空',
                    trigger: 'blur',
                  },
                  { validator: validateFloat, trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.number="scope.row.mailPrice"
                  type="number"
                  placeholder="请输入邮费（元）"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-popconfirm
              title="删除后将不可恢复，是否删除？"
              placement="top"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirm-button-type="plain"
              cancel-button-type="primary"
              :hide-icon="true"
              @onConfirm="deleteAreaPostage(scope.$index)"
            >
              <HoverTip
                slot="reference"
                content="删除"
                tip-class-name="icon-delete"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="companyMailVo.mailType === 3" :gutter="20">
        <el-col :span="12">
          <el-form-item label="包邮区限价（元）" prop="pinkagePrice">
            <el-input
              v-model.number="companyMailVo.pinkagePrice"
              type="number"
              placeholder="请输入包邮区限价（元）"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮费（元）" prop="beyondPinkagePrice">
            <el-input
              v-model.number="companyMailVo.beyondPinkagePrice"
              placeholder="请输入邮费（元）"
              type="number"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title-top">
        处方费
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="处方费方式" prop="prescriptionFeeType">
            <el-select
              v-model="companyMailVo.prescriptionFeeType"
              placeholder="请选择处方费方式"
            >
              <el-option label="每单收取" :value="1" />
              <el-option label="全国超限价收取" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="companyMailVo.prescriptionFeeType === 2" :span="12">
          <el-form-item
            label="限价（元）
            "
            prop="beyondPrescriptionFeePrice"
          >
            <el-input
              v-model.number="companyMailVo.beyondPrescriptionFeePrice"
              placeholder="请输入处方单价（元）"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="
              companyMailVo.prescriptionFeeType === 2
                ? '超限价单价（元/单）'
                : '处方单价（元）'
            "
            prop="prescriptionFeePrice"
          >
            <el-input
              v-model.number="companyMailVo.prescriptionFeePrice"
              placeholder="请输入超限价单价（元/单）"
              type="number"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PostageSet',
  props: {
    companyMailVo: {
      type: Object,
      default: () => {
        return {
          beyondPinkagePrice: 0,
          beyondPrescriptionFeePrice: 0,
          companyId: '',
          mailType: 2,
          noMailVos: [
            {
              mailPrice: 0,
              noMailCityIds: []
            }
          ],
          pinkagePrice: 0,
          prescriptionFeePrice: 0,
          prescriptionFeeType: 0
        };
      }
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateFloat = (rule, value, callback) => {
      if (!/^(\d+)(\.\d{1})?$/.test(value)) {
        callback(new Error('最多一位有效数字'));
      } else {
        callback();
      }
    };
    return {
      tableLoading: false,
      rules: {
        beyondPinkagePrice: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        beyondPrescriptionFeePrice: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        pinkagePrice: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        prescriptionFeePrice: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        prescriptionFeeType: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur'
          }
        ],
        mailType: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur'
          }
        ]
      },
      validateFloat
    };
  },
  computed: {
    options() {
      const vm = this;
      return vm.$store.state.app.locationList || [];
    }
  },
  methods: {
    addAreaPostage() {
      this.companyMailVo.noMailVos.push({
        mailPrice: '',
        noMailCityIds: ''
      });
    },
    deleteAreaPostage(index) {
      this.companyMailVo.noMailVos.splice(index, 1);
    },
    save() {
      let bol = false;
      this.$refs['companyMailVo'].validate(valid => {
        if (valid) {
          if (
            this.companyMailVo.mailType === 3 &&
            this.companyMailVo.noMailVos.length <= 0
          ) {
            this.$message.error('请添加区域邮费信息！');
            bol = false;
          } else {
            bol = true;
          }
        } else {
          bol = false;
        }
      });
      return bol;
    }
  }
};
</script>

<style lang="scss" scoped>
.postage-page {
  .postage-two {
    display: flex;
    align-items: center;
    &-l {
      width: 104px;
      margin-right: 24px;
    }
    &-r {
      flex: 1;
    }
  }
  .pastage-bord {
    width: 100%;
    height: 1px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
  /deep/ .table-input {
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .m-t-24 {
    margin-top: 24px;
  }
  .p-l-24 {
    margin-left: 24px;
    box-sizing: border-box;
    width: calc(100% - 24px);
  }
  .details-content {
    // padding-bottom: 60px;
    // min-height: calc(100vh - 210px);
    // max-height: calc(100vh - 210px);
    // overflow-y: scroll;
    .data-list {
      // padding: 12px 0px 0;
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-border {
        padding-left: 10px;
        position: relative;
        &::before {
          content: '';
          width: 4px;
          height: 14px;
          background: rgba(34, 118, 255, 1);
          position: absolute;
          top: 1px;
          left: 0;
        }
      }
      .settle {
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 30px;
        .name {
          padding: 0 42px 0 10px;
          position: relative;
        }
        .radio1 {
          margin-bottom: 30px;
        }
        .once {
          justify-content: flex-start;
          align-items: flex-start;
          //   margin-bottom: -15px;
        }
        .rule {
          margin: 30px 0 -25px;
          &-detail {
            span {
              margin: 8px 12px 0;
            }
          }
        }
      }
    }
    .data-name-none {
      font-size: 12px;
      color: #9f9f9f;
    }
    // .data-table-item{
    //     padding: 24px 0 0;
    // }
    .data-item {
      // padding: 24px 0;
      .add-certificates {
        margin-top: 24px;
      }
      .company-name {
        display: flex;
        align-items: center;
        .company-name-input {
          flex: 1;
        }
        .button {
          margin-bottom: 10px;
          width: 96px;
          height: 36px;
          background: #3599fe;
          line-height: 36px;
          text-align: center;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          &:link {
            background: #3599fe;
          }
          &:visited {
            background: #3599fe;
          }
          &:hover {
            background: #66b2ff;
          }
          &:active {
            background: #1c8cff;
          }
          border-radius: 0 4px 4px 0;
        }
        border-radius: 0 4px 4px 0;
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
  .dialog-red {
    color: #f64e60;
    line-height: 20px;
  }
  .money {
    position: absolute;
    right: 0;
  }
  .red {
    color: #f64e60 !important;
  }
}
</style>
