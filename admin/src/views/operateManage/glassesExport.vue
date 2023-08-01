<template>
  <div class="glassesExport">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">商品兑换</div>
        </div>
        <div class="filter-box">
          <el-form
            ref="ruleForm"
            :model="data.presbyopicGlassesFilter"
            :rules="rules"
            label-width="100px"
            label-position="top"
            :inline="true"
          >
            <el-row>
              <el-form-item label="服务项名称：">
                <el-input v-model="name" style="width: 497px" disabled />
              </el-form-item>
              <el-form-item label="订单状态：" prop="state">
                <el-select
                  v-model="data.presbyopicGlassesFilter.state"
                  style="width: 497px"
                  placeholder="全部"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="创建时间：" prop="createTime">
                <el-date-picker
                  v-model="data.presbyopicGlassesFilter.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 497px"
                  value-format="timestamp"
                  clearable
                  @change="changeDate('createTime')"
                >
                  >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="更新时间：" prop="updateTime">
                <el-date-picker
                  v-model="data.presbyopicGlassesFilter.updateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 497px"
                  value-format="timestamp"
                  clearable
                  @change="changeDate('updateTime')"
                >
                  >
                </el-date-picker>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div class="filter-form">
          <div class="title-top">导出字段</div>
        </div>
        <div class="filter-box">
          <div class="flex checkbox">
            <div class="name">基础信息</div>
            <el-checkbox-group v-model="list1">
              <el-checkbox label="1">ID</el-checkbox>
              <el-checkbox label="2">服务项名称</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="flex checkbox">
            <div class="name">基础信息</div>
            <el-checkbox-group v-model="list2">
              <el-checkbox label="3">商品规格</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="flex checkbox">
            <div class="name">收货地址</div>
            <el-checkbox-group v-model="list3">
              <el-checkbox label="4">收货人</el-checkbox>
              <el-checkbox label="5">联系电话</el-checkbox>
              <el-checkbox label="6">详细地址</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
    <div class="footer flex">
      <button
        type="button"
        class="btn-save"
        :disabled="list1.length + list2.length + list3.length < 1"
        @click="submitForm('ruleForm')"
      >
        导出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'glassesExport',
  data() {
    return {
      data: {
        presbyopicGlassesFilter: {
          updateEndTime: '',
          updateStartTime: '',
          createEndTime: '',
          createStartTime: '',
          state: '', // 1待确认、2已发货、3已完成、4已取消
          createTime: [],
          updateTime: []
        },
        enumList: [],
        serviceInfoId: 'ff80808175e59d5c0175f918bb040289'
      },
      name: '老花镜',
      list1: [],
      list2: [],
      list3: [],
      rules: {},
      options: [
        {
          value: '1',
          label: '待确认'
        },
        {
          value: '2',
          label: '已发货'
        },
        {
          value: '3',
          label: '已完成'
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.export();
        } else {
          return false;
        }
      });
    },
    export() {
      this.data.enumList = [];
      this.data.enumList = this.data.enumList.concat(
        this.list1,
        this.list2,
        this.list3,
      );
      const params = JSON.parse(JSON.stringify(this.data));
      for (const key in params.presbyopicGlassesFilter) {
        if (params.presbyopicGlassesFilter[key] === '') {
          delete params.presbyopicGlassesFilter[key];
        }
      }
      if (
        params.presbyopicGlassesFilter.createTime &&
        params.presbyopicGlassesFilter.createTime.length === 0
      ) {
        delete params.presbyopicGlassesFilter.createTime;
      }
      if (
        params.presbyopicGlassesFilter.updateTime &&
        params.presbyopicGlassesFilter.updateTime.length === 0
      ) {
        delete params.presbyopicGlassesFilter.updateTime;
      }
      if (params.enumList.length === 0) {
        delete params.enumList;
      } else {
        params.enumList = params.enumList.sort();
      }

      if (params.presbyopicGlassesFilter.updateTime === null) {
        delete params.presbyopicGlassesFilter.updateTime;
      }
      if (params.presbyopicGlassesFilter.createTime === null) {
        delete params.presbyopicGlassesFilter.createTime;
      }
      this.$store
        .dispatch('serviceItems/presbyopicGlasses', params)
        .then(response => {
          window.open(response.url);
        });
    },
    changeDate(type) {
      if (type === 'createTime') {
        if (this.data.presbyopicGlassesFilter.createTime) {
          this.data.presbyopicGlassesFilter.createEndTime = this.data.presbyopicGlassesFilter.createTime[1];
          this.data.presbyopicGlassesFilter.createStartTime = this.data.presbyopicGlassesFilter.createTime[0];
        } else {
          this.data.presbyopicGlassesFilter.createEndTime = '';
          this.data.presbyopicGlassesFilter.createStartTime = '';
        }
      } else {
        if (this.data.presbyopicGlassesFilter.updateTime) {
          this.data.presbyopicGlassesFilter.updateEndTime = this.data.presbyopicGlassesFilter.updateTime[1];
          this.data.presbyopicGlassesFilter.updateStartTime = this.data.presbyopicGlassesFilter.updateTime[0];
        } else {
          this.data.presbyopicGlassesFilter.updateEndTime = '';
          this.data.presbyopicGlassesFilter.updateStartTime = '';
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.glassesExport {
  position: relative;
  .checkbox {
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
    .name {
      font-size: 15px;
      color: #464668;
      margin-right: 30px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 68px;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
    border-radius: 0px 0px 4px 4px;
    justify-content: flex-end;
    align-items: center;
    .btn-save {
      margin-right: 54px;
    }
  }
}
</style>
