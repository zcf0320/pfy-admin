<template>
  <div class="service-table">
    <div v-for="(value, index) in insuranceProducts" :key="value.planId">
      <el-form ref="ruleForm" :model="value">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="title-top data-title">
              {{ value.productName }} - {{ value.planName }}({{
                value.companyName
              }})<span class="product-delete fr" @click="delProductData(index)"
                >移除</span
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table">
              <div class="table-header">
                <div class="header">服务项ID</div>
                <div class="header">服务项名称</div>
                <div class="header">当月使用次数</div>
              </div>
              <div
                v-for="(item, i) in value.useCountList"
                :key="item.id"
                class="table-content"
              >
                <div class="item">{{ item.serviceId }}</div>
                <div class="item">{{ item.serviceName }}</div>
                <div class="item">
                  <el-form-item
                    :prop="'useCountList.' + i + '.useCount'"
                    :rules="[
                      {
                        required: true,
                        message: '请输入使用次数，输入正整数',
                        trigger: 'blur',
                      },
                      {
                        type: 'number',
                        message: '请输入0-99999999',
                        trigger: 'blur',
                        min: 0,
                        max: 99999999,
                      },
                    ]"
                  >
                    <el-input v-model.number="item.useCount" />
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    insuranceProducts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      planRules: {}
    };
  },
  methods: {
    tableChange(index) {
      this.$emit('tableChange', this.insuranceProducts, index);
    },
    delProductData(index) {
      const planId = this.insuranceProducts[index].planId;
      this.insuranceProducts.splice(index, 1);
      this.tableChange(planId);
    },
    // 表单校验成功false失败true
    validate() {
      if (this.insuranceProducts.length <= 0) {
        return true;
      }
      let bol = false;
      this.$refs.ruleForm.some(item => {
        item.validate(valid => {
          if (!valid) {
            bol = true;
            return bol;
          } else {
            bol = false;
            return false;
          }
        });
        return bol;
      });
      return bol;
    }
  }
};
</script>

<style lang="scss" scoped>
.service-table {
  .product-delete {
    font-size: 14px;

    font-weight: 400;
    color: #3599fe;
    line-height: 24px;
    cursor: pointer;
  }
  .data-title {
    margin-top: 24px;
    box-shadow: none;
  }
  .table {
    .table-header {
      width: 100%;
      height: 42px;
      background: #f3f6f9;
      border-radius: 4px;
      display: flex;
      .header {
        width: calc(100% / 3);
        padding-left: 28px;
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
        line-height: 42px;
      }
      .header-width {
        width: 100px;
      }
      .header-action {
        width: 150px;
      }
    }
    .table-content {
      width: 100%;
      display: flex;
      .item {
        width: calc(100% / 3);
        height: 80px;
        box-shadow: 0px 1px 0px 0px #ebedf2;
        display: flex;
        align-items: center;
        font-size: 14px;

        font-weight: 400;
        color: #464668;
        padding: 0 28px;
        .el-form-item {
          margin: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
