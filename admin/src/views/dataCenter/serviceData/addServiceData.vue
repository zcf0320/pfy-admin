<template>
  <div class="serviceData-add-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">
          上传数据<button
            type="button"
            class="btn-save fr"
            @click="dialogFormVisible = true"
          >
            新增保险产品
          </button>
        </div>

        <div class="form-item">
          <span class="label-name">选择时间:</span>
          <el-date-picker
            v-model="timeString"
            type="month"
            placeholder="月份"
            value-format="yyyy-M"
            :picker-options="pickerOptions"
            @change="timeChange"
          />
          <div class="tip">
            {{
              isRepeat
                ? '提示：该日期存在重复数据，如重复上传将覆盖原有数据'
                : ''
            }}
          </div>
        </div>
        <div class="insurance-products">
          <Table
            ref="table"
            :insurance-products="insuranceProducts"
            @tableChange="tableChange"
          />
        </div>
        <div class="page-footer">
          <button type="button" class="btn-save" @click="save">确认提交</button>
        </div>
      </el-scrollbar>
    </el-container>
    <el-dialog
      title="新增保险产品"
      :visible.sync="dialogFormVisible"
      width="548px"
      center
    >
      <el-cascader
        v-model="productPlan"
        :options="productList"
        filterable
        :props="props"
        style="width:100%"
        clearable
        @change="productChange"
      />
      <div slot="footer" class="dialog-footer">
        <button
          type="button"
          class="btn-save mr-30 v-middle"
          @click="addInsurancePro"
        >
          确 定
        </button>
        <button
          type="button"
          class="btn-exit v-middle"
          @click="dialogFormVisible = false"
        >
          取 消
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from './component/table';
import { mapActions } from 'vuex';
export default {
  name: 'AddServiceData',
  components: {
    Table
  },
  data() {
    return {
      dialogFormVisible: false, // 模态框
      productList: [], // 保险产品下拉列表
      productId: '', // 计划ID
      productPlan: [],
      timeString: '', // 返回时间
      isRepeat: false, // 当月是否有数据
      insuranceProducts: [], // 录入保险产品数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      }
    };
  },
  created() {
    // 获取产品列表
    this.getProductList().then(res => {
      this.productList = res.data;
    });
    // 查询当前月份是否存在数据
    const date = new Date();
    const timeNow = date.getFullYear() + '-' + (date.getMonth() + 1);
    this.timeChange(timeNow);
  },
  methods: {
    ...mapActions('dataCenter', [
      'hasServiceData',
      'getProductList',
      'selectProduct',
      'deleteProduct',
      'saveProductData'
    ]),
    // 时间变化
    timeChange(time) {
      // this.timeString = time;
      if (!this.timeString) {
        this.isRepeat = false;
        return;
      }
      this.hasServiceData(time).then(res => {
        this.isRepeat = res.data;
      });
    },
    // 表格数据变化
    tableChange(obj, id) {
      this.insuranceProducts = obj;
      this.productList.forEach(item => {
        item.children.some(value => {
          if (value.id === id) {
            this.$set(value, 'disabled', false);
            return true;
          } else {
            return false;
          }
        });
      });
    },
    // 选择产品
    productChange(value) {
      this.productPlan = value;
      this.productId = value[1];
    },
    // 确定保险产品
    addInsurancePro() {
      if (!this.productId) {
        this.$message({
          type: 'error',
          message: '请选择保险产品'
        });
        return;
      }
      this.selectProduct({
        productId: this.productPlan[0],
        planId: this.productPlan[1]
      })
        .then(res => {
          this.insuranceProducts.push(res.data);
          this.productList.forEach(item => {
            item.children.some(value => {
              if (value.id === this.productId) {
                this.$set(value, 'disabled', true);
                return true;
              } else {
                return false;
              }
            });
          });
          this.productId = '';
          this.productPlan = [];
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.productId = '';
        });
    },
    // 提交
    save() {
      if (!this.timeString) {
        this.$message({
          type: 'warning',
          message: '请选择日期！'
        });
        return;
      }
      if (!this.$refs.table.validate()) {
        const obj = {};
        obj.time = this.timeString;
        obj.uploadUseCountList = this.insuranceProducts;
        this.saveProductData(obj).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功'
          });
          this.$router.push(`/dataCenter/serviceData`);
        });
      } else {
        this.$message({
          type: 'warning',
          message: '请检查输入'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.serviceData-add-page {
  .title-top {
    padding-bottom: 24px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
  .form-item {
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
  .el-select {
    width: 100%;
  }
  .form-item .label-name {
    display: block;
    min-width: 100px;
    color: #989ab3;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .tip {
    font-size: 13px;

    font-weight: 400;
    color: #ff5e5e;
    line-height: 13px;
    margin-top: 8px;
    height: 22px;
  }
}
</style>
