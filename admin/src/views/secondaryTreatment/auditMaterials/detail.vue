<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div>
        <Tab v-model="activeName" :btns="btns" />
      </div>

      <el-form
        v-if="activeName == 1"
        ref="formData"
        :model="formData"
        class="form-data"
      >
        <el-form-item
          prop="name"
          label="服务项名称"
          :rules="[
            {
              required: true,
              message: '请输入服务名称',
            },
          ]"
        >
          <el-input
            v-model="formData.name"
            :disabled="isDisabled"
            placeholder="请输入服务名称"
            class="w-full"
            type="textarea"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <div style="display:flex;alignItems: center;">
            <el-form-item
         prop="name"
          label="是否需要用户填写服务诉求："
        :rules="[
            {
              required: true,
              message: '请用户输入填写服务诉求',
            },
          ]">
          <!-- <span class="mr-24">是否需要用户填写服务诉求：</span> -->
          <!-- <el-radio-group
            v-model="formData.isWriteAppeal"
            :disabled="isDisabled"
          >
            <el-radio :label="true" :value="true">是</el-radio>
            <el-radio :label="false" :value="false">否</el-radio>
          </el-radio-group> -->
        </el-form-item>
         <div style="marginTop:-19px;">
          <el-radio-group
            v-model="formData.isWriteAppeal"
            :disabled="isDisabled"
          >
            <el-radio :label="true" :value="true">是</el-radio>
            <el-radio :label="false" :value="false">否</el-radio>
          </el-radio-group>
         </div>
        </div>
        <div v-if="activeName == 1" class="mt-24 flex-box mb-16">
          <div class="title">设置审核材料</div>
          <div
            v-if="!isDisabled"
            class="add"
            @click="addItem()"
          >
          </div>
        </div>
        <el-table v-loading="loading" :data="formData.dataList">
          <el-table-column label="材料名称" width="220">
            <template slot-scope="{ row, $index }">
              <div class="pd-4">
                <el-form-item
                  :prop="'dataList.' + $index + '.materialName'"
                  :rules="[
                    {
                      required: true,
                      message: '请输入材料名称',
                    },
                  ]"
                  label-width="0px"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="row.materialName"
                    :disabled="isDisabled"
                    placeholder="请输入材料名称"
                    class="w-180"
                    maxlength="10"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户端名称" width="220">
            <template slot-scope="{ row, $index }">
              <div class="pd-4">
                <el-form-item
                  :prop="'dataList.' + $index + '.nickname'"
                  label-width="0px"
                  class="mb-0"
                  :rules="[
                    {
                      required: true,
                      message: '请输入用户端名称',
                    },
                  ]"
                >
                  <el-input
                    v-model.trim="row.nickname"
                    :disabled="isDisabled"
                    class="w-180"
                    placeholder="请输入用户端名称"
                    maxlength="10"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="示例图片" width="140">
            <template slot-scope="{ row }">
              <div class="pd-4">
                <ImgUpload
                  v-model="row.sampleImage"
                  :accept="'image/*'"
                  :loading.sync="loading"
                >
                  <span
                    v-if="$isEmpty(row.sampleImage) && !isDisabled"
                    class="upload-text fl"
                  >
                    上传</span
                  >
                  <span
                    v-if="$isNotEmpty(row.sampleImage) && !isDisabled"
                    class="fl upload-text"
                    >修改</span
                  >
                </ImgUpload>
                <span
                  v-if="$isNotEmpty(row.sampleImage)"
                  class="upload-text fl ml-24"
                  @click="getShowViewer(row.sampleImage)"
                  >预览</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="材料说明">
            <template slot-scope="{ row, $index }">
              <div class="pd-4">
                <el-form-item
                  :prop="'dataList.' + $index + '.materialExplain'"
                  label-width="0px"
                  class="mb-0"
                  :rules="[
                    {
                      required: true,
                      message: '请输入材料说明',
                    },
                  ]"
                >
                  <el-input
                    v-model.trim="row.materialExplain"
                    placeholder="50字符以内"
                    maxlength="50"
                    :disabled="isDisabled"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="是否必填" width="120">
            <template slot-scope="{ row, $index }">
              <div class="pd-4">
                <el-form-item
                  label-width="0px"
                  class="mb-0"
                  :prop="'dataList.' + $index + '.isRequired'"
                  :rules="[
                    {
                      required: true,
                      message: '请选择是否必填',
                    },
                  ]"
                >
                  <el-select
                    v-model="row.isRequired"
                    class="w-100"
                    :disabled="isDisabled"
                  >
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                  </el-select>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteItem($index)"
              >
                <HoverTip
                  v-if="!isDisabled"
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
      <div v-if="activeName == '2'">
        <appointmentConfig
          :id="formData.id"
          ref="appointmentConfig"
          :data-list="onlineServiceUserInfoVos || []"
          :is-edit="!isDisabled"
          :is-treatment="true"
        />
      </div>
      <div v-if="activeName == '3'">
        <Logs :id="$route.params.id" :type="'35'" />
      </div>
      <div class="page-footer">
        <el-button
          size="small"
          class="btn-bg-blue"
          type="primary"
          @click="saveForm('formData')"
          >保存</el-button
        >
      </div>
      <elImageViewer
        v-if="showViewer"
        :on-close="showViewerClose"
        :url-list="urlList"
      />
    </el-scrollbar>
  </el-container>
</template>
<script>
import appointmentConfig from '@/views/supplyChainManage/component/appointmentConfig';
export default {
  name: 'auditMaterials',
  components: { appointmentConfig },
  data() {
    const defaultForm = {
      id: null,
      name: null,
      isWriteAppeal: true,
      dataList: []
    };
    return {
      defaultForm: defaultForm,
      loading: false,
      formData: this.$extends({}, defaultForm),
      activeName: '1',
      urlList: [],
      showViewer: false,
      activeRow: {},
      onlineServiceUserInfoVos: [],
      btns: [{ name: '基础信息', value: '1' }]
    };
  },
  computed: {
    isDisabled() {
      return this.$route.params.type === 'detail';
    }
  },
  created() {
    if (this.$route.params.id !== 0) {
      this.formData.id = this.$route.params.id;
      this.getFormData();
      this.setBtns(this.$route.params.id, false);
    }
  },
  methods: {
    /**
     * 添加单行数据
     */
    addItem() {
      const item = {
        isRequired: null,
        materialExplain: '',
        materialName: '',
        nickname: '',
        sampleImage: ''
      };
      this.formData.dataList.push(item);
    },
    /**
     * 获取二次诊疗数据
     */
    getFormData() {
      this.$store
        .dispatch('secondaryTreatment/initSecondaryTreatment', this.formData.id)
        .then(res => {
          if (res) {
            this.$copyProps(this.formData, res.data.serviceBaseSettings);
            this.formData.dataList = res.data.reviewMaterialList || [];
            this.onlineServiceUserInfoVos =
              res.data.onlineServiceUserInfoVos || [];
          }
        });
    },
    /**
     * 保存材料
     */
    saveForm(refName) {
      if (this.activeName === '1') {
        this.$refs[refName].validate(valid => {
          if (!valid) {
            return false;
          }
          if (this.$isEmpty(this.formData.dataList)) {
            this.$message.warning('请配置审核材料');
            return;
          }
          const serviceBaseSettings = this.$extends({}, this.formData);
          delete serviceBaseSettings['dataList'];
          if (serviceBaseSettings.id === '0') {
            delete serviceBaseSettings['id'];
          }
          const saveData = {
            materialsList: this.formData.dataList,
            serviceBaseSettings: serviceBaseSettings
          };
          this.$store
            .dispatch('secondaryTreatment/saveServiceAndMaterial', saveData)
            .then(res => {
              this.$message.success('保存成功');
              if (this.$isEmpty(this.formData.id)) {
                this.formData.id = res.data;
                this.setBtns(res.data, true);
                this.getFormData();
              } else {
                this.$router.push(`/secondaryTreatment/auditMaterials`);
              }
            });
        });
      } else if (this.activeName === '2') {
        if (this.$isNotEmpty(this.$refs.appointmentConfig)) {
          const dtos = this.$refs.appointmentConfig.configList;
          const data = {
            userInfoSettingsConfigs: dtos,
            serviceSettingsId: this.formData.id
          };
          this.$store
            .dispatch('secondaryTreatment/updateUserinfoConfig', data)
            .then(() => {
              this.$message.success('保存成功');
              this.$router.push(`/secondaryTreatment/auditMaterials`);
            });
        }
      }
    },
    // 预览图片
    getShowViewer(url) {
      this.urlList = [url];
      this.showViewer = true;
    },
    /**
     * 设置按钮
     */
    setBtns(id, isAdd) {
      this.btns = [
        { name: '基础信息', value: '1' },
        { name: '配置信息', value: '2', isNew: isAdd },
        { name: '操作日志', value: '3' }
      ];
    },
    showViewerClose() {
      this.showViewer = false;
    },
    deleteItem(index) {
      this.formData.dataList.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="scss">

.form-data{
    /deep/.el-form-item__label{
font-size: 16px;
font-weight: 400;
color: #464668;
    }
}
.title {
font-size: 16px;
font-weight: 400;
color: #464668;
}
.add{
    width: 16px;
    height: 16px;
    margin-left: 16px;
    background: url("../../../assets/add.png") no-repeat;
    background-size: 100% 100%;
}
</style>
