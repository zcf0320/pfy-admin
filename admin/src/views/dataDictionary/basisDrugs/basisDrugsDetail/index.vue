<template>
  <div class="basisDrugsDetail">
    <el-container>
      <el-main v-loading="mainLoading">
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'" class="basisDrugsDetail-table">
              <el-form
                ref="ruleForm"
                :model="form"
                :rules="rules"
                class="demo-ruleForm"
              >
                <div class="basisDrugsDetail-table-title">基础信息</div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">ID</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.id || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">药品通用名</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.name || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">药品类型</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.type || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">处方药标记</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{
                      drugDetail.prescriptionType ? '处方' : '非处方'
                    }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">批准文号</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.approvalNumber || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">厂家</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.manufacturer || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">品牌名</div>
                  <div class="basisDrugsDetail-table-item-r">
                    {{ drugDetail.trademark || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">药品分类</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-cascader
                      v-model="form.classifyCode"
                      :options="medicineTypes"
                      :props="optionProps"
                      :disabled="saveState"
                      style="width: 100%"
                    />
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">适应疾病</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-select
                      v-model="form.applyDisease"
                      filterable
                      multiple
                      remote
                      placeholder="请搜索适用疾病"
                      :remote-method="remoteMethod"
                      :loading="searchLoading"
                      :disabled="saveState"
                      @change="applyHandlerSelect"
                    >
                      <el-option
                        v-for="(item, index) in diseaseList"
                        :key="'适用疾病' + index"
                        :label="item.diseaseName"
                        :value="String(item.id)"
                      >
                        <span v-html="item.hightLable" />
                        <span class="option-remark">{{
                          item.code ? `${item.code} : ${item.attribute}` : ''
                        }}</span>
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">禁忌疾病</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-select
                      v-model="form.tabooDisease"
                      filterable
                      multiple
                      remote
                      placeholder="请搜索禁忌疾病"
                      :remote-method="remoteMethod"
                      :loading="searchLoading"
                      :disabled="saveState"
                      @change="handlerSelect"
                    >
                      <el-option
                        v-for="(item, index) in diseaseList"
                        :key="'禁忌疾病' + index"
                        :label="item.diseaseName"
                        :value="String(item.id)"
                      >
                        <span v-html="item.hightLable" />
                        <span class="option-remark">{{
                          item.code ? `${item.code} : ${item.attribute}` : ''
                        }}</span>
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">
                    儿童禁用标记/禁用年龄
                  </div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span
                      >{{ drugDetail.childDisable || '-' }}/{{
                        drugDetail.oldManDisableAge || '-'
                      }}</span
                    >
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">
                    老年人禁用标记/禁用年龄
                  </div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span
                      >{{ drugDetail.oldManDisable || '-' }}/{{
                        drugDetail.childDisableAge || '-'
                      }}</span
                    >
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">成分</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.composition || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">重量</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.weight || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">有效期</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{ drugDetail.validity || '-' }}</span>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-title">药品属性</div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">规格</div>
                    <el-tooltip
                      effect="dark"
                      :open-delay="500"
                      :popper-class="'w-400'"
                      :content="drugDetail.specifications"
                      placement="top"
                    >
                      <div class="basisDrugsDetail-detail">
                        {{ drugDetail.specifications || '-' }}
                      </div>
                    </el-tooltip>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">剂型</div>
                    <el-tooltip
                      effect="dark"
                      :open-delay="500"
                      :popper-class="'w-400'"
                      :content="drugDetail.preparation"
                      placement="top"
                    >
                      <div class="basisDrugsDetail-detail">
                        {{ drugDetail.preparation || '-' }}
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">给药途径</div>
                    <el-tooltip
                      effect="dark"
                      :open-delay="500"
                      :popper-class="'w-400'"
                      :content="drugDetail.deliveryWay"
                      placement="top"
                    >
                      <div class="basisDrugsDetail-detail">
                        {{ drugDetail.deliveryWay || '-' }}
                      </div>
                    </el-tooltip>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">剂量</div>
                    <div class="basisDrugsDetail-detail">
                      <el-form-item prop="contentSpecification">
                        <el-input
                          v-model.number="form.contentSpecification"
                          :disabled="saveState"
                          maxlength="8"
                          type="number"
                          placeholder="请输入剂量"
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">剂量单位</div>
                    <div class="basisDrugsDetail-detail">
                      <el-select
                        v-model="form.contentUnit"
                        :disabled="saveState"
                        filterable
                        placeholder="请选择剂量单位"
                      >
                        <el-option
                          v-for="item in DrugUnits1"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">制剂数量</div>
                    <div class="basisDrugsDetail-detail">
                      <el-form-item prop="preparationsCount">
                        <el-input
                          v-model.number="form.preparationsCount"
                          :disabled="saveState"
                          type="number"
                          placeholder="请输入制剂数量"
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four">
                  <div class="basisDrugsDetail-table-four-l">
                    <div class="basisDrugsDetail-type">制剂单位</div>
                    <div class="basisDrugsDetail-detail">
                      <el-select
                        v-model="form.preparationsUnit"
                        :disabled="saveState"
                        filterable
                        placeholder="请选择制剂单位"
                      >
                        <el-option
                          v-for="item in DrugUnits1"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </div>
                  </div>
                  <div class="basisDrugsDetail-table-four-r">
                    <div class="basisDrugsDetail-type">包装单位</div>
                    <div class="basisDrugsDetail-detail">
                      <el-select
                        v-model="form.packagingUnit"
                        :disabled="saveState"
                        filterable
                        placeholder="请选择包装单位"
                      >
                        <el-option
                          v-for="item in DrugUnits2"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-title">用法用量</div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">默认单次用量</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-form-item prop="singleDose">
                      <el-input
                        v-model.number="form.singleDose"
                        :disabled="saveState"
                        maxlength="8"
                        type="number"
                        placeholder="请输入默认单次用量"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">最大单次用量</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-form-item prop="maxSingleDose">
                      <el-input
                        v-model.number="form.maxSingleDose"
                        :disabled="saveState"
                        maxlength="8"
                        type="number"
                        placeholder="请输入最大单次用量"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">用量单位</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-select
                      v-model="form.singleDosUnit"
                      :disabled="saveState"
                      filterable
                      placeholder="请选择用量单位"
                    >
                      <el-option
                        v-for="item in DrugUnits1"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">默认用药频率</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-select
                      v-model="form.pharmacyFrequency"
                      :disabled="saveState"
                      filterable
                      placeholder="请选择默认用药频率"
                    >
                      <el-option
                        v-for="item in DrugUnits0"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">最大用药频率</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <el-select
                      v-model="form.maxPharmacyFrequency"
                      :disabled="saveState"
                      filterable
                      placeholder="请选择最大用药频率"
                    >
                      <el-option
                        v-for="item in DrugUnits0"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-item">
                  <div class="basisDrugsDetail-table-item-l">用法用量描述</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span class="wrap">{{ drugDetail.usageInfo || '-' }}</span>
                  </div>
                </div>
                <div
                  v-if="drugDetail.source"
                  class="basisDrugsDetail-table-title"
                >
                  补充信息
                </div>
                <div
                  v-if="drugDetail.source"
                  class="basisDrugsDetail-table-item"
                >
                  <div class="basisDrugsDetail-table-item-l">数据来源</div>
                  <div class="basisDrugsDetail-table-item-r">
                    <span>{{
                      drugDetail.source === 1 ? '药房网' : '九洲大药房'
                    }}</span>
                  </div>
                </div>
              </el-form>
            </div>
            <div v-show="activeName === '1'" class="basisDrugsDetail-img">
              <div class="basisDrugsDetail-img-title">头图</div>
              <div class="basisDrugsDetail-img-list">
                <div class="basisDrugsDetail-img-list-item">
                  <div
                    v-for="(item, index) in headPic || []"
                    :key="index"
                    class="img"
                    style="position: relative"
                  >
                    <i
                      v-if="!saveState"
                      class="icon-disable"
                      @click.stop="deleteImage(index)"
                    />
                    <el-image
                      style="width: 104px; height: 104px"
                      :src="item"
                      class="avatar"
                      :preview-src-list="[item]"
                    />
                  </div>
                  <el-upload
                    :class="`avatar-uploader ${saveState ? 'disable' : ''}`"
                    action=""
                    :show-file-list="false"
                    :http-request="uploadHeader"
                    :before-upload="beforeAvatarUpload"
                    :disabled="saveState"
                  >
                    <!-- <div
                                            class="img"
                                            v-for="(item, index) in headPic ||
                                            []"
                                            :key="index"
                                            style="position: relative"
                                            >
                                            <i
                                                class="icon-disable"
                                                @click.stop="deleteImage(index)"
                                            ></i>
                                            <el-image
                                                style="width: 100px; height: 100px"
                                                :src="item"
                                                 class="avatar">
                                            </el-image>
                                            <img :src="item" alt="暂无图片" class="avatar" />
                                            </div> -->
                    <i class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </div>
              </div>
              <div class="basisDrugsDetail-img-title">药品说明</div>
              <div id="drugDetailInfo" />
            </div>
            <div v-show="activeName === '2'" class="log-items">
              <Logs :id="$route.params.id" :type="'101'" />
            </div>
          </div>
        </div>
      </el-main>
      <div v-if="pageAuthority.includes('edit')" class="page-footer">
        <button
          v-if="activeName === '0'"
          class="btn-save"
          @click="editBaseInfo"
        >
          {{ saveState ? '修改' : '保存' }}
        </button>
        <button v-if="activeName === '1'" class="btn-save" @click="editHeadImg">
          {{ saveState ? '修改' : '保存' }}
        </button>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { editorUploadImage, replaceHightKeyWord } from '@/utils/common';
import uploadImage from '@/utils/uploadImage';
import E from 'wangeditor';
import { uniqWith, isEqual } from 'lodash';
let productFeatureEditor;
export default {
  name: 'BasisDrugsDetail',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== '' && (value > 9999.999 || value < 0.001)) {
        callback(new Error('大小限制0.001～9999.999'));
      } else if (value !== '' && !/^\d+(\.\d{1,3})?$/g.test(value)) {
        callback(new Error('最多三位小数'));
      } else {
        callback();
      }
    };
    const validateInt = (rule, value, callback) => {
      if (value !== '' && (value > 9999 || value < 1)) {
        callback(new Error('大小限制1～9999'));
      } else if (value !== '' && !/^[0-9]*[1-9][0-9]*$/g.test(value)) {
        callback(new Error('必须为正整数'));
      } else {
        callback();
      }
    };
    return {
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '图片信息' },
        { value: '2', name: '操作日志' }
      ],
      mainLoading: true,
      activeName: '0',
      drugDetail: {},
      searchLoading: false,
      diseaseList: [], // 疾病数据
      historyList: [], // 历史疾病
      DrugUnits0: [], // 用药频率
      DrugUnits1: [], // 用量单位
      DrugUnits2: [], // 包装单位
      medicineTypes: [],
      keyword: '',
      form: {
        applyDisease: [], // 适用疾病
        tabooDisease: [], // 禁忌病症
        contentSpecification: '', // 含量
        contentUnit: '', // 含量单位
        preparationsCount: '', // 制剂数量
        preparationsUnit: '', // 制剂单位
        packagingUnit: '', // 包装单位
        singleDose: '', // 单次用量
        maxSingleDose: '', // 最大单次用量
        singleDosUnit: '', // 单次用量单位
        pharmacyFrequency: '', // 用药频率
        maxPharmacyFrequency: '', // 最大用药频率
        classifyCode: [] // 分类
      },
      rules: {
        singleDose: [{ validator: validatePass, trigger: 'blur' }],
        maxSingleDose: [{ validator: validatePass, trigger: 'blur' }],
        contentSpecification: [{ validator: validatePass, trigger: 'blur' }],
        preparationsCount: [{ validator: validateInt, trigger: 'blur' }]
      },
      saveState: true, // 编辑状态
      headPic: [], // 头图
      richText: '', // 富文本
      optionProps: {
        label: 'value',
        value: 'label',
        children: 'children'
      }
    };
  },
  computed: {
    pageAuthority() {
      // 180203 个险投保记录
      return this.$store.state.user.pageAuthority['180203'];
    }
  },
  watch: {
    richText() {
      productFeatureEditor.txt.html(this.richText);
    }
  },
  created() {
    this.getDrugUnits().then(res => {
      this.DrugUnits0 = res.data[2].unitValue || [];
      this.DrugUnits1 = res.data[1].unitValue || [];
      this.DrugUnits2 = res.data[0].unitValue || [];
      this.getDrugDetail(this.$route.params.id).then(res => {
        this.drugDetail = res.data || {};
        res.data.classifyCode && res.data.classifyCode.reverse();
        this.form = res.data || this.form;
        this.form.applyDisease = this.form.applyDisease
          ? this.form.applyDisease.split(',')
          : [];
        this.form.tabooDisease = this.form.tabooDisease
          ? this.form.tabooDisease.split(',')
          : [];
        this.form.applyDiseaseNames.forEach(item => {
          item.hightLable = replaceHightKeyWord('', item.diseaseName);
        });
        this.form.tabooDiseaseNames.forEach(item => {
          item.hightLable = replaceHightKeyWord('', item.diseaseName);
        });
        this.diseaseList = this.form.applyDiseaseNames.concat(
          this.form.tabooDiseaseNames,
        );
        this.diseaseList = uniqWith(this.diseaseList, isEqual) || [];
        this.historyList = this.diseaseList;
        this.headPic = this.drugDetail.headPic
          ? this.drugDetail.headPic.split(',')
          : [];
        this.richText = this.drugDetail.description;
        this.mainLoading = false;
      });
    });
    // 获取商品分类
    this.getMedicineTypes().then(res => {
      this.medicineTypes = this.getTreeData(res.obj) || [];
    });
  },
  mounted() {
    productFeatureEditor = new E('#drugDetailInfo');
    this.configEditor(productFeatureEditor);
    // 富文本赋值
    productFeatureEditor.txt.html(this.richText);
  },
  methods: {
    ...mapActions('drugManage', [
      'getDrugDetail',
      'updateDrugDetails',
      'getDrugUnits',
      'getMedicineTypes'
    ]),
    handlerSelect() {
      const id = this.form.tabooDisease[this.form.tabooDisease.length - 1];
      const flag = this.historyList.some(item => item.id === id);
      if (!flag) {
        this.diseaseList.forEach(item => {
          if (item.id === id) {
            this.historyList.push(item);
          }
        });
      }
      this.historyList.forEach(item => {
        item.hightLable = replaceHightKeyWord(this.keyword, item.diseaseName);
      });
      this.diseaseList = this.historyList;
    },
    applyHandlerSelect() {
      const id = this.form.applyDisease[this.form.applyDisease.length - 1];
      const flag = this.historyList.some(item => item.id === id);
      if (!flag) {
        this.diseaseList.forEach(item => {
          if (item.id === id) {
            this.historyList.push(item);
          }
        });
      }
      this.historyList.forEach(item => {
        item.hightLable = replaceHightKeyWord(this.keyword, item.diseaseName);
      });
      this.diseaseList = this.historyList;
    },
    // 搜索疾病
    remoteMethod(keyword) {
      this.searchLoading = true;
      this.keyword = keyword;
      if (keyword !== '') {
        this.$store
          .dispatch('goodsManage/getDiseaseByName', {
            name: keyword
          })
          .then(res => {
            this.searchLoading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data
              ? res.data.concat(this.historyList)
              : this.historyList;
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.diseaseList = [];
      }
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
    },
    editHeadImg() {
      if (!this.saveState) {
        this.mainLoading = true;
        const headPic = this.headPic ? this.headPic.join(',') : '';
        this.richText = productFeatureEditor.txt.html();
        const params = {
          headPic,
          description: this.richText,
          id: this.$route.params.id
        };
        this.updateDrugDetails(params)
          .then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.mainLoading = false;
            this.saveState = true;
          })
          .catch(() => {
            this.mainLoading = false;
          });
      } else {
        this.saveState = false;
      }
    },
    configEditor(editor) {
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];
      editor.customConfig.customUploadImg = function(files, insert) {
        // files 是 input 中选中的文件列表
        editorUploadImage(files)
          .then(res => {
            // insert 是获取图片 url 后，插入到编辑器的方法
            insert(res);
          })
          .catch(() => {
            this.$message.error('上传图片有误');
          });
      };

      editor.customConfig.zIndex = 1;
      editor.create();
    },
    editBaseInfo() {
      if (!this.saveState) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.mainLoading = true;
            let {
              applyDisease,
              tabooDisease,

              classifyCode
            } = this.form;
            const {
              contentSpecification,
              contentUnit,
              preparationsCount,
              preparationsUnit,
              packagingUnit,
              singleDose,
              maxSingleDose,
              singleDosUnit,
              pharmacyFrequency,
              maxPharmacyFrequency
            } = this.form;
            applyDisease = applyDisease.join(',');
            tabooDisease = tabooDisease.join(',');
            classifyCode =
              classifyCode.length > 0
                ? classifyCode[classifyCode.length - 1]
                : '';
            const params = {
              applyDisease,
              tabooDisease,
              contentSpecification,
              contentUnit,
              preparationsCount,
              preparationsUnit,
              packagingUnit,
              singleDose,
              maxSingleDose,
              singleDosUnit,
              pharmacyFrequency,
              maxPharmacyFrequency,
              id: this.$route.params.id,
              classifyCode
            };
            this.updateDrugDetails(params)
              .then(() => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.mainLoading = false;
                this.saveState = true;
              })
              .catch(() => {
                this.mainLoading = false;
              });
          } else {
            return false;
          }
        });
      } else {
        this.saveState = false;
      }
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 商品包装
    uploadHeader(item) {
      if (this.headPic.length >= 10) {
        this.$message.error('最多添加10张！');
        return;
      }
      uploadImage(item)
        .then(res => {
          this.headPic.push(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    deleteImage(index) {
      this.headPic.splice(index, 1);
    },
    // 递归删除空药品分类方法
    getTreeData(data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length < 1) {
          // children若为空数组，则将children删除
          delete data[i].children;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          if (data[i].children) {
            this.getTreeData(data[i].children);
          }
        }
      }
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.basisDrugsDetail {
  .basisDrugsDetail-table {
    // box-shadow: 0px 0px 2px 2px #e8e8e8;
    // margin-bottom: 20px;
     width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
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
    &-item {
      min-height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 14px;
      align-items: center;
      &-l {
        height: 100%;
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
      }
      &-r {
        > span {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          line-height: 14px;
          &.wrap {
            line-height: 18px;
            white-space: normal;
            padding: 17px 0;
          }
        }
        flex: 1;
        min-height: 48px;
        display: flex;
        align-items: center;
        padding: 4px 61px;
        border-left: 1px solid #e8e8e8;
        overflow: hidden;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
        .el-form-item {
          /deep/ .el-form-item__error {
            right: 10px;
            top: 50%;
            left: auto;
            transform: translateY(-50%);
          }
        }
      }
    }
    &-content {
      border: 1px solid #e8e8e8;
      border-top: none;
      min-height: 48px;
      font-size: 14px;

      color: #545473;
      padding: 17px 24px 17px 32px;
      display: flex;
      line-height: 20px;
      align-items: flex-start;
      &-l {
        font-weight: bold;
      }
      &-c {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.open {
          word-break: break-all;
          white-space: normal;
        }
      }
      &-r {
        color: #3599fe;
        cursor: pointer;
      }
    }
    &-four {
      height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 48px;
      &-l,
      &-r {
        // flex: 1;
        width: 50%;
        display: flex;
        align-items: center;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
      }
      &-l {
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-type {
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-detail {
        flex: 1;
        padding: 0 61px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .el-form-item {
          margin: 0;
          /deep/ .el-form-item__error {
            right: 10px;
            left: auto;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  &-img {
    &-title {
      display: flex;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 16px;
      align-items: center;
      margin: 24px 0;
      &::before {
        display: block;
        content: '';
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-list {
      &-item {
        display: flex;
        flex-wrap: wrap;
        .img {
          margin-right: 24px;
          margin-bottom: 24px;
          width: 104px;
          height: 104px;
        }
        /deep/ .avatar-uploader .el-upload {
          cursor: pointer;
          position: relative;
        }
        /deep/ .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        /deep/ .avatar-uploader.disable .el-upload:hover {
          cursor: no-drop;
        }
        .avatar-uploader.disable .avatar-uploader-icon {
          &:hover {
            border-color: #dee2e8;
          }
        }
        .avatar-uploader-icon {
          border: 1px dashed #dee2e8;
          border-radius: 6px;
          font-size: 28px;
          color: #8c939d;
          width: 104px;
          height: 104px;
          line-height: 104px;
          text-align: center;
          &:hover {
            border-color: #409eff;
          }
        }
        .avatar {
          width: 104px;
          height: 104px;
          display: block;
        }
        .icon-disable {
          position: absolute;
          top: -7px;
          right: -5px;
          z-index: 10;
        }
      }
    }
  }
}
</style>
