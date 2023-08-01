<template>
  <div class="create-active-code-container modal-form">
    <el-dialog
      title="生成激活码"
      :visible="isShow"
      width="584px"
      :close-on-click-modal="closeClickModal"
      top="50px"
      class="bold-dialog"
      @close="close"
    >
      <el-scrollbar style="padding-bottom: 20px">
        <div
          :style="{
            height: `${submitInfo.createType === '2' ? '630px' : 'auto'}`,
            marginTop: '10px',
          }"
        >
          <el-form
            ref="submitInfo"
            :model="submitInfo"
            label-width="120px"
            :rules="rules"
            class="mt24-form"
          >
            <el-form-item label="选择服务包:" prop="servicePackageInfoId">
              <el-select
                v-model="submitInfo.servicePackageInfoId"
                filterable
                placeholder="请选择服务包"
              >
                <el-option
                  v-for="item in servicePackageList"
                  :key="item.id"
                  :label="item.packageName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="有效期至:" prop="codeValidTime">
              <el-date-picker
                v-model="submitInfo.codeValidTime"
                value-format="timestamp"
                :clearable="false"
                :editable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="请选择有效期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
            <el-form-item label="选择渠道:" prop="serviceChanelId">
              <el-select
                v-model="submitInfo.serviceChanelId"
                filterable
                placeholder="请选择渠道"
                @change="getChannelDetails"
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.id"
                  :label="item.chanelName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="生成方式：">
              <el-radio v-model="submitInfo.createType" label="1"
                >默认全渠道</el-radio
              >
              <el-radio v-model="submitInfo.createType" label="2"
                >针对关联企业</el-radio
              >
            </el-form-item>
            <div>
              <el-form-item
                v-if="submitInfo.createType === '1'"
                label="生成激活码数量:"
                prop="codeMount"
              >
                <el-input
                  v-model="submitInfo.codeMount"
                  placeholder="请输入激活码数量"
                />
              </el-form-item>
              <el-form-item v-else label="生成激活码数量:">
                <el-input
                  v-model="submitInfo.activeCodeCompanyRelations.codeMount"
                  placeholder="请输入激活码数量"
                  :disabled="true"
                />
              </el-form-item>
            </div>
            <el-form-item label="备注:">
              <el-input
                v-model="submitInfo.remark"
                placeholder="请输入备注"
                maxlength="20"
              />
            </el-form-item>
          </el-form>
          <el-table v-if="submitInfo.createType === '2'" :data="tableData">
            <el-table-column label="企业名称" prop="companyName" />
            <el-table-column label="激活码数量" prop="codeCount">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.codeCount" :min="0" />
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="save('submitInfo')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CreateActiveCodeModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateMoney = (rule, value, callback) => {
      if (value) {
        const phoneRegex = /^[1-9]\d{0,5}?$/;
        if (!phoneRegex.test(value)) {
          callback(new Error('请输入正确的激活码数量'));
        } else {
          callback();
        }
      } else {
        callback(new Error('请输入激活码数量'));
      }
    };
    return {
      loading: false,
      closeClickModal: false,
      submitInfo: {
        codeValidTime: '',
        servicePackageInfoId: '',
        codeType: '0',
        serviceChanelId: '',
        remark: '',
        createType: '1',
        activeCodeCompanyRelations: {
          codeMount: '',
          companyCustomerId: []
        },
        codeMount: ''
      },
      rules: {
        servicePackageInfoId: [
          { required: true, message: '请选择服务包', trigger: 'change' }
        ],
        codeMount: [
          { required: true, validator: validateMoney, trigger: 'blur' }
        ],
        codeValidTime: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        serviceChanelId: [
          { required: true, message: '请选择渠道', trigger: 'change' }
        ]
      },
      servicePackageList: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date().getTime() - 3600 * 24 * 1000;
        }
      },
      channelList: [],
      tableData: []
    };
  },
  computed: {},
  watch: {
    tableData: {
      handler(newName) {
        const sum = newName.reduce(function(prev, cur) {
          return prev + cur.codeCount;
        }, 0);

        this.submitInfo.activeCodeCompanyRelations.codeMount = sum;
      },
      deep: true
    },
    'submitInfo.createType': {
      handler(newName) {
        if (newName) {
          this.submitInfo.serviceChanelId = '';
          this.submitInfo.codeMount = '';
          this.submitInfo.activeCodeCompanyRelations.codeMount = '';
        }
      },
      deep: true
    }
  },
  created() {
    this.getServiceList();
    this.$store
      .dispatch('channelManage/getChannelList', {
        pageNum: 1,
        pageSize: 1000
      })
      .then(res => {
        this.channelList = res.records || [];
      })
      .catch(() => {});
  },
  methods: {
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
          if (
            this.submitInfo.codeMount > 999999 ||
            this.submitInfo.activeCodeCompanyRelations.codeMount > 999999
          ) {
            this.$message.error('激活码数量不得大于999999');
            return;
          }
          this.submitInfo.activeCodeCompanyRelations = this.tableData;
          this.loading = true;
          vm.submitInfo.codeValidTime =
            vm.submitInfo.codeValidTime + 3600 * 24 * 1000 - 1000;
          vm.$store
            .dispatch('activeCodeManage/createActiveCode', vm.submitInfo)
            .then(() => {
              vm.$emit('save');
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    // 有效期改变
    // changeTime(time) {
    //     const vm = this
    //     vm.baseForm.validStartTime = time[0]
    //     vm.baseForm.validEndTime = time[1]
    // },
    // 获取服务项列表
    getServiceList() {
      const vm = this;
      vm.$store
        .dispatch('servicePackage/getServicePackageListNew', {
          pageNum: 1,
          pageSize: 1000,
          postStatus: 105
        })
        .then(response => {
          vm.servicePackageList = response.records;
        });
    },
    getChannelDetails() {
      const vm = this;
      vm.$store
        .dispatch('channelManage/getChannelDetails', {
          id: this.submitInfo.serviceChanelId
        })
        .then(res => {
          if (res.code === 0) {
            const data = res.obj.companyVos.map(item => {
              item.companyCustomerId = item.id;
              //   item.companyName = item.companyName;
              item.codeCount = 0;
              return item;
            });
            this.tableData = JSON.parse(JSON.stringify(data));
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.create-active-code-container {
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
