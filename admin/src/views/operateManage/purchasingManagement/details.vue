<template>
  <div class="relative">
    <el-container>
      <el-main
        class="filter-form flex-col"
        :class="activeName === '0' ? 'h-box' : ''"
      >
        <Tab :btns="btns" @change="tabsChange" />
        <div class="scroll-table">
          <div v-if="activeName == '0'">
            <div class="title-top mt-24 mb-24 title-top-conter">
              基础信息
            </div>
            <el-form
              ref="formData"
              :model="formData"
              class="page-form "
            >
              <div class="flex-between">
                <el-row :gutter="20">
                  <el-col :span="12">
                  <el-form-item label="ID">
                  <el-input v-model.trim="formData.id" disabled />
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                  <el-form-item label="姓名">
                  <el-input v-model.trim="formData.name" disabled />
                </el-form-item>
                  </el-col>
                 <el-col :span="12">
                <el-form-item label="服务类型">
                  <el-input v-model.trim="formData.serviceStr" disabled />
                </el-form-item>
                 </el-col>
              <!-- </div> -->
              <!-- <div class="flex-between"> -->
                <el-col :span="12">
                <el-form-item label="手机号">
                  <el-input v-model.trim="formData.mobile" disabled />
                </el-form-item>
                 </el-col>
                <el-col :span="12">
                <el-form-item label="更新时间">
                  <el-input v-model.trim="formData.updateTime" disabled />
                </el-form-item>
                 </el-col>
                <el-col :span="12">
                <el-form-item label="提交时间">
                  <el-input v-model.trim="formData.createTime" disabled />
                </el-form-item>
                 </el-col>
              <!-- </div> -->
              <!-- <div class="flex-between"> -->
                <el-col :span="12">
                <el-form-item label="公司名称">
                  <el-input
                    v-model.trim="formData.company"
                    class="search-input"
                    :clearable="true"
                  />
                </el-form-item>
                 </el-col>
                <el-col :span="12">
                <el-form-item
                  label="邮箱"
                  prop="email"
                  :rules="[
                    {
                      validator: $validators.checkEmail,
                      message: '请输入正确邮箱',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-input
                    v-model.trim="formData.email"
                    class="search-input"
                    :clearable="true"
                  />
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item>
                  <el-input
                    class="search-input none"
                    :clearable="true"
                    disabled
                  />
                </el-form-item>
                 </el-col>
                </el-row>
              </div>
              <div class="line-solid" />
              <div  class="title-top mt-24 mb-24">
                操作
              </div>
              <div class="flex-box mb-24">
                <div  class="fs-14 fc-grey mr-26">状态</div>
                <div
                  class="label-text label-primary mr-24"
                  :class="$enums['purchasingState'][formData.status]"
                >
                  {{ $enums['purchasingStatePreview'][formData.status] }}
                </div>
                <div
                  v-if="formData.status !== 3"
                  class="link-skip"
                  @click="
                    () => {
                      dialog.visible = true;
                      remark = '';
                    }
                  "
                >
                  进入{下一状态}
                </div>
              </div>
              <div class="flex">
                <div  class="fs-14 fc-grey mr-26">备注</div>
                <el-input
                style="width:95%;"
                  v-model="formData.remark"
                  type="textarea"
                  class="remark-box"
                  maxlength="50"
                  placeholder="请输入备注"
                  show-word-limit
                />
              </div>
            </el-form>
          </div>
          <div v-if="activeName === '1'">
            <div class="title-top content-detail">服务列表</div>
            <div class="data-table mt-30">
              <div class="data-title">
                服务项名称
              </div>
              <div
                v-for="(item, index) in formData.serviceName"
                :key="index"
                class="data-item"
              >
                {{ item }}
              </div>
              <div v-if="$isEmpty(formData.serviceName)">
                <div slot="empty" class="empty-img" />
              </div>
            </div>
          </div>
          <div v-if="activeName === '2'" class="log-lists">
            <div class="log-list">
              <div
                v-for="(item, index) in logList"
                :key="index"
                class="log-item"
              >
                <span class="dot" />
                <span class="time"
                  >{{ item.createTime | timeFormat('yyyy-MM-dd') }}
                </span>
                <span class="name">{{ item.creator }} </span>
                <span class="name">{{
                  $enums['purchasingLog'][item.operation]
                }}</span>
                <span class="name ">{{ item.remark }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <div v-if="activeName == '0'" class="fixed-bottom">
      <div />
      <div>
        <el-button type="primary" class="mr-30" @click="saveForm('formData')">
          确定
        </el-button>
      </div>
    </div>
    <Dialog
      :visible="dialog.visible"
      :title="'状态变更'"
      :width="750"
      :height="300"
      @closed="dialog.visible = false"
    >
      <div class="span">
        请确认即将进入下一状态
      </div>
      <div class="flex mt-24">
        <span class="span mr-12">备注</span>
        <el-input
          v-model="remark"
          type="textarea"
          class="state-remark"
          maxlength="255"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="updateState()">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    const defaultForm = {
      id: this.$route.params.id,
      name: '',
      mobile: '',
      company: '',
      serviceType: '',
      serviceName: [],
      createTime: '',
      updateTime: '',
      email: '',
      status: '',
      remark: ''
    };
    return {
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      btns: [
        { name: '基础信息', value: '0' },
        { name: '服务列表', value: '1' },
        { name: '操作日志', value: '2' }
      ],
      visible: false,
      activeName: '0',
      remark: '',
      logList: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    /**
     * tabs 切换
     */
    tabsChange(val) {
      this.activeName = val;
      if (this.activeName === '2') {
        this.getLog();
      } else {
        this.getInfo();
      }
    },
    /**
     *获取基础信息
     */
    async getInfo() {
      const res = await this.$store.dispatch(
        'purchasingManagement/getPurchasingDetail',
        { id: this.formData.id },
      );
      if (this.$isNotEmpty(res)) {
        this.$copyProps(this.formData, res.data);
        this.formData.serviceStr =
          this.formData.serviceType === 1 ? '保险服务' : '员工福利';
        this.formData.remark = '';
        this.formData.updateTime = this.$timeFormat(
          this.formData.updateTime,
          'yyyy-MM-dd HH:mm:ss',
        );
        this.formData.createTime = this.$timeFormat(
          this.formData.createTime,
          'yyyy-MM-dd HH:mm:ss',
        );
      }
    },
    /**
     *获取日志
     */
    async getLog() {
      const res = await this.$store.dispatch('purchasingManagement/getLog', {
        id: this.formData.id
      });
      if (res) {
        this.logList = res.data || [];
      }
    },
    /**
     * 保存基础信息
     */
    async saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        const data = {
          id: this.formData.id,
          company: this.formData.company,
          email: this.formData.email,
          remark: this.formData.remark
        };
        this.$store
          .dispatch('purchasingManagement/updateInfo', data)
          .then(() => {
            this.$message.success('保存成功');
            this.$router.go(-1);
          });
      });
    },
    /**
     *进入下一个状态
     */
    async updateState() {
      const status =
        this.formData.status === '1'
          ? '2'
          : this.formData.status === '2'
          ? '3'
          : '';
      const data = {
        id: this.formData.id,
        remark: this.remark,
        status
      };
      const res = await this.$store.dispatch(
        'purchasingManagement/updateStatus',
        data,
      );
      if (res !== undefined) {
        this.$message.success('更新成功');
        this.dialog.visible = false;
        this.getInfo();
      }
    }
  }
};
</script>

<style scoped lang="scss">
// .remark-box {
//   width: 568px;
//   height: 76px;
// }
/deep/ .el-row::after {
  display: none;
}
.page-form .el-form-item {
  margin-bottom: 24px;
}
.title-top-conter {
  border: none;
}

.state-remark {
  width: 650px;
  height: 68px;
}
</style>
