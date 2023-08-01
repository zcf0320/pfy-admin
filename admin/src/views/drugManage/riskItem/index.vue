<template>
  <div class="el-container">
    <div class="el-main">
      <div class="title-top pb-24 bord-b">风险项-X</div>
      <div class="risk-item-info">
        <i class="el-icon-info" />
        同一理赔药单有多药商配药的情况下，将产生多物流、客户满意度、运营、结算等问题，我们把这些成本统一计算为X值附加到药单成本中
      </div>
      <div class="title-top content-detail pb-24 bord-b">
        药品理赔成本=药品成本+运费+处方费+X
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <div class="risk-item-info-main">
          X：
          <el-form-item prop="druggistNumCoefficient">
            <el-input
              v-model.number="form.druggistNumCoefficient"
              class="risk-item-info-main-input"
              type="number"
              :disabled="!edit"
            />
          </el-form-item>
          *药商数量 -
          <el-form-item prop="reduceNum">
            <el-input
              v-model.number="form.reduceNum"
              class="risk-item-info-main-input"
              type="number"
              :disabled="!edit"
            />
          </el-form-item>
          +
          <el-form-item prop="addNum">
            <el-input
              v-model.number="form.addNum"
              class="risk-item-info-main-input"
              type="number"
              :disabled="!edit"
            />
          </el-form-item>
          <div class="risk-item-info-main-info">
            (当药商数量大于1时产生该系数)
          </div>
        </div>
      </el-form>
      <div class="risk-item-info-x">
        当1家药商时，风险项<span>X={{ result1.toFixed(2) }}元</span>
      </div>
      <div class="risk-item-info-x">
        当2家药商时，风险项<span>X={{ result2.toFixed(2) }}元</span>
      </div>
      <div class="risk-item-info-x">
        当3家药商时，风险项<span>X={{ result3.toFixed(2) }}元</span>
      </div>
    </div>
    <div class="page-footer">
      <el-button type="primary" @click="save">{{
        edit ? '保存' : '修改'
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'RiskItem',
  data() {
    const validateFloat = (rule, value, callback) => {
      if (!/^(\d+)(\.\d{1})?$/.test(value)) {
        callback(new Error('最多一位有效数字'));
      } else {
        callback();
      }
    };
    return {
      form: {
        addNum: '',
        druggistNumCoefficient: '',
        reduceNum: ''
      },
      edit: false,
      rules: {
        addNum: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        druggistNumCoefficient: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        reduceNum: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { type: 'number', message: '请输入数字', tratrigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ]
      },
      result1: 0,
      result2: 0,
      result3: 0
    };
  },
  watch: {
    form: {
      handler(newData) {
        if (
          typeof newData.addNum === 'number' &&
          typeof newData.druggistNumCoefficient === 'number' &&
          typeof newData.reduceNum === 'number'
        ) {
          this.result1 =
            newData.druggistNumCoefficient - newData.reduceNum + newData.addNum;
          this.result2 =
            newData.druggistNumCoefficient * 2 -
            newData.reduceNum +
            newData.addNum;
          this.result3 =
            newData.druggistNumCoefficient * 3 -
            newData.reduceNum +
            newData.addNum;
        } else {
          this.result1 = 0;
          this.result2 = 0;
          this.result3 = 0;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.medicineRiskDetail().then(res => {
      this.form = res.data;
    });
  },
  methods: {
    ...mapActions('drugManage', ['saveOrUpdateRisk', 'medicineRiskDetail']),
    save() {
      if (!this.edit) {
        this.edit = !this.edit;
        return;
      } else {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.saveOrUpdateRisk(this.form).then(() => {
              this.$message.success('保存成功');
            });
          }
        });
        this.edit = !this.edit;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bord-b {
  box-shadow: 0px 1px 0px 0px #ebedf2;
}
.pb-24 {
  padding-bottom: 24px;
}
.risk-item-info {
  width: 471px;
  height: 86px;
  background: #e0f0ff;
  border-radius: 4px;
  border: 1px solid #3599fe;
  font-size: 14px;

  font-weight: 400;
  color: #3599fe;
  line-height: 20px;
  padding: 13px 16px 13px 42px;
  position: relative;
  > i {
    position: absolute;
    top: 16px;
    left: 16px;
  }
}
.risk-item-info-main {
  font-size: 16px;

  font-weight: bold;
  color: #464668;
  line-height: 22px;
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
  &-info {
    font-size: 14px;

    font-weight: 400;
    color: #a2a3b7;
    line-height: 20px;
  }
  &-input {
    width: 81px;
    margin: 0 12px;
  }
}
.risk-item-info-x {
  font-size: 14px;

  font-weight: 400;
  color: #a2a3b7;
  line-height: 14px;
  position: relative;
  padding-left: 12px;
  margin-bottom: 20px;
  > span {
    color: #3599fe;
    font-weight: bold;
  }
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background: #3599fe;
    position: absolute;
    top: 4px;
    left: 0px;
    border-radius: 50%;
  }
}
</style>
