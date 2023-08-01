<template>
  <div>
    <div>
      <div class="title-top content-detail">结算信息</div>
      <div class=" flex settle">
        <div class="name fs-14">
          <span
            style="
                            position: absolute;
                            top: 0;
                            left: 3px;
                            color: #ff4949;
                          "
            >*</span>结算规则
        </div>
        <div class="content">
          <div class="radio1">
            <el-radio
v-model="formData.type"
:label="1"
>每月1号00:00自动生成结算单</el-radio>
          </div>
          <div class="radio1">
            <el-radio v-model="formData.type" :label="2">自定义规则</el-radio>
            <div v-if="formData.type == '2'" class="rule flex">
              <el-form-item label="" prop="ruleType">
                <el-select
                  v-model="formData.ruleType"
                  placeholder="全部"
                  style="width: 140px"
                  @change="changeMonth"
                >
                  <el-option
                    v-for="item in ruleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <div v-if="formData.ruleType == '1'" class="rule-detail flex">
                <span class="fs-14 fc-black">每月</span>
                <el-form-item
                  label=""
                  prop="day"
                  :rules="[
                    { required: true, message: '请选择日期', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formData.day"
                    placeholder="请选择日期"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in dayList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">日</span>
              </div>
              <div v-if="formData.ruleType != '1'" class="rule-detail flex">
                <span
v-if="formData.ruleType == '2'"
class="fs-14 fc-black"
>每季度,第</span>
                <span
v-if="formData.ruleType == '3'"
class="fs-14 fc-black"
>每年</span>
                <el-form-item
                  v-if="formData.ruleType == '2'"
                  prop="month"
                  :rules="[
                    { required: true, message: '请选择月份', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formData.month"
                    placeholder="请选择月份"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in yearList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="formData.ruleType == '3'"
                  label=""
                  prop="month"
                  :rules="[
                    { required: true, message: '请选择月份', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formData.month"
                    placeholder="请选择月份"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in monthList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">月</span>
                <el-form-item
                  prop="day"
                  :rules="[
                    { required: true, message: '请选择日期', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formData.day"
                    placeholder="请选择日期"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="item in dayList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <span class="fs-14 fc-black">日</span>
              </div>
            </div>
          </div>
          <div class="radio1">
            <el-radio
v-model="formData.type"
:label="3"
>不指定结算规则</el-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settlementRule',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleList: [
        {
          value: 1,
          label: '按月'
        },
        {
          value: 2,
          label: '按季度'
        },
        {
          value: 3,
          label: '按年'
        }
      ],
      dayList: [],
      monthList: [],
      yearList: []
    };
  },
  computed: {},
  watch: {
    'formData.type': {
      handler(val) {
        if (val !== 2) {
          this.changeMonth();
        }
      }
    }
  },
  created() {
    for (let i = 0; i < 28; i++) {
      this.dayList.push({
        value: i + 1,
        label: i + 1
      });
    }
    for (let i = 0; i < 12; i++) {
      this.monthList.push({
        value: i + 1,
        label: i + 1
      });
    }
    for (let i = 0; i < 3; i++) {
      this.yearList.push({
        value: i + 1,
        label: i + 1
      });
    }
  },
  methods: {
    changeMonth() {
      this.formData.month = '';
      this.formData.day = '';
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
