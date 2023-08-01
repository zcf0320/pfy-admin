<template>
  <div class="review-service-form">
    <el-form
      :ref="refName"
      :model="form"
      label-width="100px"
      :rules="rules"
      label-position="top"
    >
      <div class="table-title">审核规则</div>
      <el-form-item prop="hasReview" class="mb-24">
        <el-radio-group
          class="mt-24 ml-12"
          v-model="form.hasReview"
          :disabled="edit === 'detail' || postStatus !== 107"
          @change="
            () => {
              form.diseaseIds = [];
            }
          "
        >
          <el-radio :label="true">需要审核</el-radio>
          <el-radio :label="false">不需要审核</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.hasReview" class="table-list">
        <el-form-item prop="firstFlag" class="mb-24">
          <span class="label-info"><span>*</span> 初审</span>
          <el-radio-group
            v-model="form.firstFlag"
            :disabled="edit === 'detail' || postStatus !== 107"
          >
            <el-radio :label="1">人工审核</el-radio>
            <el-radio :label="2">自动审核</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="checkFlag" class="mb-24">
          <span class="label-info"><span>*</span> 复核</span>
          <el-radio-group
            v-model="form.checkFlag"
            :disabled="edit === 'detail' || postStatus !== 107"
          >
            <el-radio :label="1">人工审核</el-radio>
            <el-radio :label="2">自动审核</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最短申请间隔限制" prop="minIntervalDay">
          <el-select
            v-model="form.minIntervalDay"
            :disabled="edit === 'detail' || postStatus !== 107"
            @change="
              val => {
                if (val === -1) {
                  form.useReminder = null;
                }
              }
            "
          >
            <el-option
              v-for="item in intervalDays"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="$isNotEmpty(form.minIntervalDay) && form.minIntervalDay !== -1"
          label="服务使用提醒"
          prop="useReminder"
        >
          <el-select
            v-model="form.useReminder"
            :disabled="edit === 'detail' || postStatus !== 107"
          >
            <el-option
              v-for="item in reminderDays"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="mb-24"
          label="申请通过后有效时间"
          prop="effectiveTimeAfterPass"
        >
          <div class="remark">
            <div class="tips">
              (超出时间未使用权益,需要重新进行理赔申请)
            </div>
            <el-select
              v-model="form.effectiveTimeAfterPass"
              :disabled="edit === 'detail' || postStatus !== 107"
              placeholder="请选择申请通过后有效时间"
            >
              <el-option
                v-for="item in effectiveTimeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="mb-24">
          <span class="label-info">是否授权</span>
          <el-radio-group
            :disabled="edit === 'detail' || postStatus !== 107"
            v-model="form.ifAuthorization"
          >
            <el-radio :label="2">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
          <div v-if="form.ifAuthorization === 2">
            <el-input
              :disabled="edit === 'detail' || postStatus !== 107"
              type="textarea"
              placeholder="请填写授权提示内容"
              v-model="form.authorizationContent"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </div>
        </el-form-item>
      </div>
      <div v-if="form.hasReview" class="table-title mb-24">告知协议</div>
      <el-form-item v-if="form.hasReview">
        <el-radio-group
          class="ml-12"
          :disabled="edit === 'detail' || postStatus !== 107"
          v-model="form.protocolType"
          @change="protoChange"
        >
          <el-radio :label="0">无需告知协议</el-radio>
          <el-radio :label="1">上传协议</el-radio>
          <el-radio :label="2">自定义编辑</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.hasReview">
        <div v-show="form.protocolType === 1" class="sign-wrap">
          <div v-if="!show" class="upload">
            <div class="upload-tip">
              请选择需要协议上传<br />
              文件格式：PDF、JPG、PNG<br />
              大小不超过10M
            </div>
            <el-upload
              action=""
              :show-file-list="false"
              :before-upload="beforeUpload"
              :http-request="httpRequest"
              accept="image/*,.pdf"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div v-if="files.length > 0" class="mt-16">
              <el-button @click="show = true">返回</el-button>
            </div>
          </div>
          <div v-else>
            <upload-protocol-signature
              :edit="edit"
              :img-list="files"
              :postStatus="postStatus"
              :x="x"
              :y="y"
              @back="backEdit"
              @dragChange="changePosition"
            />
          </div>
        </div>

        <div v-show="form.protocolType === 2">
          <div v-if="!show" class="mt-12">
            <RichText
              :rich-id="`editors${index}`"
              :content="editorContent"
              @change="getHtml"
            />
            <div class="submit">
              <el-button type="primary" @click="convertImage">预览</el-button>
            </div>
          </div>
          <div v-else class="sign-wrap">
            <upload-protocol-signature
              :edit="edit"
              :postStatus="postStatus"
              :x="x"
              :y="y"
              :img-list="files"
              @dragChange="changePosition"
              @back="backEdit"
            />
          </div>
        </div>
      </div>
      <div v-if="form.hasReview" class="table-title">审核材料</div>
      <el-form-item v-if="form.hasReview" class="mb-24">
        <div class="disease-flag">
          是否指定疾病
          <el-radio-group
            class="ml-24"
            v-model="form.diseaseFlag"
            :disabled="
              edit === 'detail' || postStatus !== 107
            "
            @change="
              () => {
                form.diseaseIds = [];
              }
            "
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <el-form-item
          v-if="form.diseaseFlag == 1"
          prop="diseaseIds"
          :rules="[
            {
              required: true,
              message: '请选择适用疾病',
            },
          ]"
        >
          <el-select
            v-model="form.diseaseIds"
            :disabled="edit === 'detail' || postStatus !== 107"
            multiple
            filterable
            remote
            placeholder="请搜索适用疾病"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in diseaseList"
              :key="item.id"
              :label="item.diseaseName"
              :value="item.id"
            >
              <span v-html="item.hightLable" />
              <span class="option-remark">{{
                item.code ? `${item.code} : ${item.attribute}` : ''
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <div v-if="form.hasReview" class="table-list">
        <div class="table-item">
          <div class="table-label">
            <span>就诊信息</span>
            <span
              v-if="edit !== 'detail' && postStatus === 107"
              class="add-review"
              @click="addRow"
            ></span>
          </div>
          <el-form ref="form" :model="form">
            <el-table :data="form.medicalList || []" class="table-data">
              <el-table-column label="类型">
                <template slot-scope="scope">
                  <div>
                    <el-form-item
                      :prop="`medicalList[${scope.$index}].type`"
                      :rules="[
                        {
                          required: true,
                          message: '请选择类型',
                          trigger: 'change',
                        },
                      ]"
                      class="mb-0 table-form-item"
                    >
                      <!--  @change="typeChange(scope)" -->
                      <el-select
                        v-model="scope.row.type"
                        placeholder="请选择类型"
                        :disabled="
                          edit === 'detail' ||
                            postStatus !== 107 ||
                            scope.$index !== form.medicalList.length - 1
                        "
                        @change="
                          () => {
                            scope.row.fieldNameList = [];
                          }
                        "
                      >
                        <el-option
                          v-for="item in treatmentsTypes"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="字段" min-width="200">
                <template slot-scope="{ row, $index }">
                  <div>
                    <el-form-item
                      :prop="`medicalList[${$index}].fieldNameList`"
                      :rules="[{ required: true, message: '请选择字段' }]"
                      class="mb-0 table-form-item"
                    >
                      <el-select
                        v-model="row.fieldNameList"
                        placeholder="请选择字段"
                        multiple
                        :disabled="edit === 'detail' || postStatus !== 107"
                      >
                        <el-option
                          v-for="item in getSelect(row.type, row.fieldNameList)"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="是否必填">
                <template slot-scope="scope">
                  <div>
                    <el-form-item
                      :prop="`medicalList[${scope.$index}].required`"
                      :rules="[{ required: true, message: '请选择是否必填' }]"
                      class="mb-0 table-form-item"
                    >
                      <el-select
                        v-model="scope.row.required"
                        placeholder="是否必填"
                        :disabled="edit === 'detail' || postStatus !== 107"
                      >
                        <el-option
                          v-for="item in whetherOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="75">
                <template slot-scope="scope">
                  <el-popconfirm
                    v-if="edit !== 'detail' && postStatus === 107"
                    title="是否删除？"
                    placement="top"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    confirm-button-type="plain"
                    cancel-button-type="primary"
                    :hide-icon="true"
                    @onConfirm="deleteRow(scope.$index)"
                  >
                    <HoverTip
                      slot="reference"
                      content="删除"
                      tip-class-name="icon-delete"
                    />
                  </el-popconfirm>
                </template>
              </el-table-column>
              <div slot="empty">
                <div class="empty-img" />
              </div>
            </el-table>
          </el-form>
        </div>
        <div class="table-item">
          <div class="table-label">
            <span>理赔材料</span>
            <span
              v-if="edit !== 'detail' && postStatus === 107"
              class="add-review"
              @click="increaseMaterials"
            ></span>
          </div>
          <el-table :data="form.materials || []" class="table-data">
            <el-table-column label="材料名称">
              <template slot-scope="scope">
                <div class="table-form-item">
                  <el-form-item
                    class="mb-0"
                    :prop="`materials[${scope.$index}].materialId`"
                    :rules="[
                      {
                        required: true,
                        message: '请选择材料名称',
                        trigger: 'change',
                      },
                    ]"
                    ><el-select
                      v-model="scope.row.materialId"
                      placeholder="材料名称"
                      :disabled="edit === 'detail' || postStatus !== 107"
                      @change="materialChange(scope)"
                    >
                      <el-option
                        v-for="item in materialList"
                        :key="item.id"
                        :label="item.materialName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="用户端名称">
              <template slot-scope="scope">
                <div class="table-form-item">
                  <el-form-item class="mb-0">
                    <el-input
                      v-model="scope.row.materialAlia"
                      :disabled="edit === 'detail' || postStatus !== 107"
                      :maxlength="20"
                      placeholder="用户端名称"
                    />
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="示例文件">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.fileV0s && scope.row.fileV0s.length"
                  class="link-skip"
                  @click="getShowViewer(scope.row.fileV0s[0].exampleFile)"
                  >查看示例</span
                >
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="说明文字（用户可见）"
              width="180"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.explanatoryText || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核要求">
              <template slot-scope="scope">
                <span>{{ scope.row.auditKeyPoints || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否必填">
              <template slot-scope="scope">
                <div class="table-form-item">
                  <el-form-item
                    class="mb-0"
                    :prop="`materials[${scope.$index}].isMandatory`"
                    :rules="[{ required: true, message: '请选择是否必填' }]"
                  >
                    <el-select
                      v-model="scope.row.isMandatory"
                      placeholder="是否必填"
                      :disabled="edit === 'detail' || postStatus !== 107"
                    >
                      <el-option
                        v-for="item in whetherOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="75">
              <template slot-scope="scope">
                <el-popconfirm
                  v-if="edit !== 'detail' && postStatus === 107"
                  title="是否删除？"
                  placement="top"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  confirm-button-type="plain"
                  cancel-button-type="primary"
                  :hide-icon="true"
                  @onConfirm="deleteMaterials(scope)"
                >
                  <HoverTip
                    slot="reference"
                    content="删除"
                    tip-class-name="icon-delete"
                  />
                </el-popconfirm>
              </template>
            </el-table-column>
            <div slot="empty">
              <div class="empty-img" />
              <!-- <div class="empty-button" @click="increaseMaterials">添加审核材料</div> -->
            </div>
          </el-table>
        </div>
      </div>
    </el-form>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="urlList"
    />
  </div>
</template>
<script>
import { whetherOptions } from '@/utils/config';
import { htmlToImg } from '@/api/system';
import { mapActions } from 'vuex';
import { uniqWith, isEqual } from 'lodash';
import { replaceHightKeyWord } from '@/utils/common';
import { uploadFileByType } from '@/api/insuranceProducts';
import UploadProtocolSignature from './uploadProtocolSignature';
export default {
  name: 'ReviewPlanForm',
  props: {
    form: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    },
    refName: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    id: {
      type: String,
      default: ''
    },
    edit: {
      type: String,
      default: ''
    }
  },
  components: {
    UploadProtocolSignature
  },
  data() {
    return {
      loading: false,
      whetherOptions,
      diseaseList: [],
      materialList: [],
      rules: {
        hasReview: [
          {
            required: true,
            message: '请选择是否需要审核',
            trigger: 'change'
          }
        ],
        checkFlag: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        firstFlag: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        minIntervalDay: [
          {
            required: true,
            message: '请选择最短申请间隔',
            trigger: 'change'
          }
        ],
        effectiveTimeAfterPass: [
          {
            required: true,
            message: '请选择申请通过后有效时间',
            trigger: 'change'
          }
        ],
        useReminder: [
          {
            required: true,
            message: '请选择服务使用提醒',
            trigger: 'change'
          }
        ]
      },
      intervalDays: [
        { value: '不限制', code: -1 },
        { value: '1天', code: 1 },
        { value: '2天', code: 2 },
        { value: '3天', code: 3 },
        { value: '4天', code: 4 },
        { value: '5天', code: 5 },
        { value: '6天', code: 6 },
        { value: '7天', code: 7 },
        { value: '8天', code: 8 },
        { value: '9天', code: 9 },
        { value: '10天', code: 10 },
        { value: '15天', code: 15 },
        { value: '20天', code: 20 },
        { value: '30天', code: 30 },
        { value: '40天', code: 40 },
        { value: '50天', code: 50 },
        { value: '60天', code: 60 },
        { value: '70天', code: 70 },
        { value: '80天', code: 80 },
        { value: '90天', code: 90 },
        { value: '180天', code: 180 }
      ],
      reminderDays: [
        { value: '无需提醒', code: -1 },
        { value: '可使用服务的当天提醒', code: 0 },
        { value: '提前1天', code: 1 },
        { value: '提前2天', code: 2 },
        { value: '提前3天', code: 3 }
      ],
      type: '',
      show: false,
      showViewer: false,
      urlList: [],
      effectiveTimeList: [],
      files: [],
      editorContent: '',
      configFiles: [],
      x: undefined,
      y: undefined,
      treatmentsTypes: []
    };
  },
  created() {
    this.findAllMaterial();
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'product_claim_config_show_ctrl_module'
      })
      .then(res => {
        this.treatmentsTypes = res.data;
      });
    // 获取药品分类
    if (this.id) {
      this.getDisease({
        id: this.id,
        type: 2,
        time: new Date().getTime()
      }).then(res => {
        if (res && res.status) {
          res.obj.forEach(item => {
            item.hightLable = replaceHightKeyWord('', item.diseaseName);
          });
          this.diseaseList = uniqWith(res.data, isEqual) || [];
        }
      });
    }

    this.effectiveTimeList = [];
    for (let index = 0; index < 366; index++) {
      if (index === 0) {
        this.effectiveTimeList.push({
          label: '保险产品有效期内有效',
          value: -1
        });
      } else {
        this.effectiveTimeList.push({
          label: `${index}天`,
          value: index
        });
      }
    }
    this.$nextTick(() => {
      if (this.form.hasReview) {
        if (
          this.form.medicalList === null ||
          this.form.medicalList.length <= 0
        ) {
          this.addRow();
        }
        if (this.form.materials === null || this.form.materials.length <= 0) {
          this.increaseMaterials();
        }
      }
    });
    this.editorContent = this.form.claimProtocol;
    this.configFiles = this.form.configFiles || [];
    const files = [];
    this.configFiles.forEach(item => {
      if (item.configFlag === 1) {
        this.x = item.x;
        this.y = item.y;
      }
      files.push(item.url);
    });
    if (files.length > 0) {
      this.show = true;
      this.files = files;
    }
  },
  methods: {
    ...mapActions('goodsManage', ['getDiseaseByName', 'getDisease']),
    // 搜索疾病
    remoteMethod(keyword) {
      this.searchLoading = true;
      if (keyword !== '') {
        this.getDiseaseByName({
          name: keyword
        })
          .then(res => {
            this.searchLoading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.diseaseList = [];
      }
    },
    getFormData(formName) {
      let itemPromise;
      if (this.form.hasReview) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const serviceDetail = this.editorContent;
            if (serviceDetail !== '<p><br></p>') {
              this.form.claimProtocol = serviceDetail;
            } else {
              this.form.claimProtocol = '';
            }
            if (this.configFiles.length === 0) {
              const config = [];
              this.files.forEach((item, index) => {
                if (this.files.length - 1 === index) {
                  config.push({
                    configFlag: 1,
                    height: 80,
                    width: 80,
                    originHeight: 344,
                    originWidth: 229,
                    url: item,
                    x: 135,
                    y: 305
                  });
                } else {
                  config.push({
                    configFlag: 0,
                    height: 80,
                    width: 80,
                    originHeight: 344,
                    originWidth: 229,
                    url: item,
                    x: 0,
                    y: 0
                  });
                }
              });
              this.form.configFiles = config;
            } else {
              this.form.configFiles = this.configFiles;
            }
            if (!this.form.medicalList || !this.form.medicalList.length) {
              itemPromise = Promise.reject('就诊信息不能为空');
              return itemPromise;
            }
            if (!this.form.materials || !this.form.materials.length) {
              itemPromise = Promise.reject('审核材料不能为空');
              return itemPromise;
            }
            this.$refs['form'].validate(valid => {
              if (valid) {
                itemPromise = Promise.resolve(this.form);
              } else {
                itemPromise = Promise.reject('保险权益诊疗/结算信息填写有误');
              }
            });
          } else {
            itemPromise = Promise.reject('请填写必填项');
          }
        });
      } else {
        itemPromise = Promise.resolve(this.form);
      }
      return itemPromise;
    },
    // 添加审核材料
    increaseMaterials() {
      this.form.materials = this.form.materials || [];
      this.form.materials.push({
        isMandatory: null,
        materialAlia: '',
        materialId: '',
        materialFile: [],
        materialName: '',
        fileV0s: [],
        explanatoryText: '',
        auditKeyPoints: ''
      });
      this.findAllMaterial();
    },
    // 删除审核材料
    deleteMaterials(scope) {
      this.$confirm('确认删除该审核材料吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        const { $index } = scope;
        this.form.materials.splice($index, 1);
      });
    },
    // 获取审核材料列表
    findAllMaterial() {
      this.$store
        .dispatch('materalManage/findAllMaterial', {
          // 防止多次请求拦截
          time: new Date().getTime()
        })
        .then(res => {
          if (res && res.status) {
            this.materialList = res.data || [];
          }
        });
    },
    // 选择审核材料
    materialChange(scope) {
      const { $index, row } = scope;
      this.form.materials.forEach((item, index) => {
        if ($index === index) {
          const material = this.materialList.find(
            item => item.id === row.materialId,
          );
          item.materialName = material.materialName;
          item.explanatoryText = material.explanatoryText;
          item.auditKeyPoints = material.auditKeyPoints;
          item.materialAlia = material.materialName;
          item.fileV0s = material.urls.length
            ? [{ exampleFile: material.urls }]
            : [];
        }
      });
    },

    // 预览图片
    getShowViewer(urls) {
      this.urlList = urls;
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    },
    protoChange() {
      this.files = [];
      this.show = false;
      this.editorContent = '';
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isLt10M;
    },
    httpRequest(item) {
      this.files = [];
      const { file } = item;
      const fileObj = file;
      // FormData 对象
      const fd = new FormData();
      // 文件对象
      fd.append('file', fileObj);
      if (file.type === 'application/pdf') {
        fd.append('type', true);
        uploadFileByType(fd, 1).then(res => {
          this.files = res.data;
          this.show = true;
        });
      } else {
        uploadFileByType(fd, 0).then(res => {
          this.files = res.data;
          this.show = true;
        });
      }
    },
    getHtml(val) {
      this.editorContent = val;
    },
    convertImage() {
      this.files = [];

      if (this.editorContent) {
        htmlToImg(this.editorContent).then(res => {
          this.files.push(res.data);
          this.show = true;
        });
      } else {
        this.$message({
          type: 'warning',
          message: '请先编辑协议内容'
        });
      }
    },
    backEdit() {
      this.show = false;
    },
    changePosition(position) {
      const config = [];
      this.files.forEach((item, index) => {
        if (this.files.length - 1 === index) {
          config.push({
            configFlag: 1,
            height: 80,
            width: 80,
            originHeight: 344,
            originWidth: 229,
            url: item,
            x: position.left,
            y: position.top
          });
        } else {
          config.push({
            configFlag: 0,
            height: 80,
            width: 80,
            originHeight: 344,
            originWidth: 229,
            url: item,
            x: 0,
            y: 0
          });
        }
      });
      this.configFiles = config;
    },
    addRow() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.medicalList.push({
            type: null,
            fieldNameList: [],
            required: ''
          });
        }
      });
    },
    // 删除
    deleteRow(index) {
      this.form.medicalList.splice(index, 1);
    },
    // 获取下拉选择
    getSelect(type, selected) {
      if (!type) {
        return [];
      }
      if (this.treatmentsTypes.length) {
        const data = this.treatmentsTypes.find(item => item.id === type);
        let arr = data.children || [];
        if (this.$isNotEmpty(this.form.list)) {
          this.form.list.forEach(item => {
            if (item.type === type) {
              const selectList = item.fieldNameList;
              arr = arr.filter(
                child =>
                  !selectList.includes(child.id) || selected.includes(child.id),
              );
            }
          });
        }
        return arr;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.review-service-form {
  .table-title {
    font-size: 18px;
    font-weight: bold;
    color: #464668;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 12px;
    }
  }
  .label-info {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 19px;
    margin-right: 16px;
    > span {
      color: #f64e60;
    }
  }
  .el-select {
    width: 100%;
  }
  .table-form-item {
    padding: 12px 0;
  }
  .example {
    color: #2276ff;
    text-decoration: underline;
    cursor: pointer;
  }
  .day-unit {
    width: 58px;
    height: 36px;
    display: inline-block;
    background: #f4f7fa;
    border-radius: 0px 4px 4px 0px;
    text-align: center;
    line-height: 36px;
    color: #989ab3;
  }
  .table-list {
    border-radius: 4px;
    background: #fbfbfb;
    padding: 24px;
    margin-left: 12px;
    margin-bottom: 24px;
    .table-data {
      margin-bottom: 12px;
      /deep/ th {
        background: #ebf3fc;
      }
    }
    .table-label {
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 16px;
      margin-bottom: 12px;
      .add-review {
        font-size: 16px;

        font-weight: 400;
        color: #3599fe;
        line-height: 16px;
        margin-left: 12px;
        cursor: pointer;
        text-decoration: underline;
      }
      .required {
        position: relative;
        &::before {
          content: '*';
          color: #ff4949;
          font-size: 12px;
          position: absolute;
          top: 4px;
          left: -10px;
        }
      }
    }
    .remark {
      position: relative;
      width: 100%;
      .tips {
        position: absolute;
        top: -34px;
        left: 140px;
        color: #a2a3b7;
      }
    }
    .add-review {
      display: inline-block;
      background: url('../../../../../assets/add.png') no-repeat;
      background-size: 100% 100%;
      width: 14px;
      height: 14px;
      cursor: pointer;
      text-decoration: underline;
    }
    /deep/ .el-input__inner {
      background: transparent;
    }
    /deep/ .el-textarea__inner {
      background: transparent;
    }
  }
  .disease-flag {
    margin-top: 24px;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 400;
    color: #464668;
  }
  .sign-wrap {
    margin: 12px 0 25px;
    height: 408px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #ebedf2;
    .upload {
      height: 376px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .upload-tip {
        font-size: 14px;
        margin-bottom: 12px;
        color: #a2a3b7;
        text-align: center;
      }
    }
  }
  .submit {
    width: 100%;
    margin-top: 12px;
    text-align: right;
  }
}
</style>
