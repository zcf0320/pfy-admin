<template>
  <div class="goods-details-page page-form modal-form">
    <el-container>
      <el-main class="flex-col">
        <Tab :btns="btns" @change="handleClick" />
        <div class="scroll-table">
          <div v-show="activeName === '0'" class="flex detail">
            <div class="detail-left">
              <div class="detail-left-top flex">
                <div class="flex detail-left-title">
                  <div class="line" />
                  药品信息
                </div>
                <div
                  v-if="$route.params.isView === 'false'"
                  class="detail-left-dot"
                  @click="goEdit"
                >
                  ···
                </div>
              </div>
              <div class="detail-left-img">
                <img v-if="pic" :src="pic" alt="" class="detail-left-img-pic" />
              </div>
              <div class="detail-left-content">
                <div class="flex drug-name">
                  药品通用名：{{ drugDetail.name }}
                  <div
                    :class="{
                      tip: true,
                      otc: prescriptionType === 1,
                      rx: prescriptionType === 0,
                    }"
                  />
                </div>
                <div>批准文号：{{ drugDetail.approvalNumber }}</div>
                <div>厂家：{{ drugDetail.manufacturer }}</div>
                <div>规格：{{ drugDetail.specifications }}</div>
                <div>剂型：{{ drugDetail.preparation }}</div>
                <div>适应疾病：{{ applyDiseaseNames }}</div>
                <div>分类：{{ drugDetail.classifyName }}</div>
              </div>
            </div>
            <div class="detail-right">
              <div class="flex detail-left-title">
                <div class="line" />
                销售信息
              </div>
              <el-form
                ref="detailsForm"
                :model="detailsForm"
                :rules="rules"
                label-width="100px"
                class="detailsForm"
              >
                <el-form-item label="商品分类" prop="saleMsg.type">
                  <el-cascader
                    v-model="detailsForm.saleMsg.type"
                    :options="medicineTypes"
                    :props="optionProps"
                    :disabled="isView"
                    style="width: 90%"
                  />
                </el-form-item>
                <el-form-item label="最高限价" prop="saleMsg.priceMax">
                  <el-input
                    v-model="detailsForm.saleMsg.priceMax"
                    maxlength="20"
                    placeholder="请输入最高限价(单位元)"
                    :disabled="isView"
                    style="width: 90%"
                  />
                </el-form-item>
              </el-form>
              <div class="flex detail-left-title">
                <div class="line" />
                价格信息
              </div>
              <el-table
                :data="detailsForm.priceMsgs"
                class="detailsForm"
                height="400px"
              >
                <el-table-column label="价格">
                  <template slot-scope="scope">
                    <div>{{ scope.row.price }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="库存">
                  <template slot-scope="scope">
                    <span>{{ scope.row.stock }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="变价次数">
                  <span>{{ detailsForm.changeNumber }}</span>
                </el-table-column>
                <el-table-column
                  label="供应商"
                  show-overflow-tooltip
                  min-width="150"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.supplierName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template>
                    <div
                      v-if="detailsForm.changeNumber > 1"
                      class="detail-right-icon"
                      @click="viewCharts"
                    />
                    <div v-else class="detail-right-disable" />
                  </template>
                </el-table-column>
                <div slot="empty" class="empty-img" />
              </el-table>
            </div>
          </div>
          <div v-if="activeName === '2'" class="log-lists">
           <Logs type="102" :id="$route.params.id"></Logs>
          </div>
        </div>
        <div class="page-footer">
          <span>{{ detailsForm.onShelfMsg }}</span>
          <button
            v-if="activeName === '0'"
            type="button"
            class="btn-save mr-30"
            @click="save('detailsForm')"
          >
            保存
          </button>
          <!-- 基础信息 -->
          <button
            v-if="activeName === '1'"
            type="button"
            class="btn-save mr-30"
            @click="submitForm('picMsg')"
          >
            保存
          </button>
          <!-- 商品图片 -->
          <button
            v-if="detailsForm.saleMsg.saleState === 1005"
            type="button"
            class="btn-save mr-30"
            @click="putOn(true)"
          >
            上架
          </button>
          <button
            v-else
            type="button"
            class="btn-exit mr-30"
            @click="changeSaleState(false)"
          >
            下架
          </button>
        </div>
        <div
          v-if="dialogVisible"
          class="bg"
          :style="{ width: screenWidth + 'px', height: screenHeight + 'px' }"
        />
        <div v-show="dialogVisible" class="line-dialog">
          <div class="line-dialog-title flex">
            <span>价格波动趋势</span>
            <div class="line-dialog-close" @click="dialogVisible = false" />
          </div>
          <div ref="echartDom" class="echartDom" />
        </div>
        <el-dialog
          title="提示"
          :visible.sync="isShow"
          width="500px"
          :before-close="
            () => {
              isShow = false;
            }
          "
          class="bold-dialog"
        >
          <div class="dialog-text">
            如下应用设置关联了该药品，可调整销售状态后上架
          </div>
          <el-table :data="tableData" height="400px">
            <el-table-column prop="sysConfigName" label="设置名称">
              <template slot-scope="scope">
                <span class="link-skip" @click="goSetting(scope.row)">{{
                  scope.row.sysConfigName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="销售状态">
              <template slot-scope="scope">
                <span :class="saleColumn[scope.row.status]">{{
                  saleState[scope.row.status]
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="aa" label="操作" width="70">
              <template slot-scope="scope">
                <div
                  :class="{
                    sale: true,
                    onSale: scope.row.status === 0,
                    haltSale: scope.row.status === 1,
                  }"
                  @click="editItem(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="changeSaleState(true)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { validMoney } from '@/utils/validate';
import { uniqWith, isEqual } from 'lodash';
import E from 'wangeditor';
let productFeatureEditor;
import { editorUploadImage } from '@/utils/common';
import uploadImage from '@/utils/uploadImage';
import { replaceHightKeyWord } from '@/utils/common';
import moment from 'moment';
import echartOption from './line';
import { operationType, menuType, saleState, saleColumn } from '@/utils/enum';
import Echart from 'echarts';
export default {
  name: 'GoodsDetails',
  data() {
    const checkPackagePrice = (rule, value, callback) => {
      if (!validMoney(value)) {
        return callback(new Error('请输入正确的价格'));
      }
      callback();
    };
    return {
      activeName: '0',
      tabIndex: '0',
     detailsForm: {
        baseMsg: {
          approvalNumber: '',
          trademark: '',
          code: '',
          prescriptionType: '',
          manufacturer: '',
          name: '',
          prescription: '',
          specialType: '',
          specifications: '',
          supplierName: '',
          validity: 0,
          weight: 0,
          applyDisease: []
        },
        priceMsgs: [],
        picMsg: {
          headPic: [],
          manualPic: '',
          packingPic: '',
          id: ''
        },
        saleMsg: {
          priceMax: '',
          saleState: '',
          priceInterval: '',
          diseaseIds: [],
          type: [],
          updateTime: ''
        },
        onShelfMsg: '',
        changeNumber: 0
      },
      expandStatus: false,
      diseaseList: [],
      priceIntervals: [],
      medicineSaleStates: [],
      medicineTypes: [],
      rule: {
        headPic: [{ required: true, message: '请上传图片', trigger: 'change' }]
      },
      rules: {
        'saleMsg.priceInterval': [
          {
            required: true,
            message: '请选择价格区间',
            trigger: 'change'
          }
        ],
        'saleMsg.type': [
          {
            required: true,
            message: '请选择商品分类',
            trigger: 'change'
          }
        ],
        'saleMsg.diseaseIds': [
          {
            required: true,
            message: '请选择对应疾病',
            trigger: 'change'
          }
        ],
        'saleMsg.priceMax': [
          {
            required: true,
            message: '请输入最大限价',
            trigger: 'blur'
          },
          { validator: checkPackagePrice, trigger: 'blur' }
        ]
      },
      optionProps: {
        label: 'name',
        value: 'id',
        children: 'childs'
      },
      loading: false,
      btns: [
        { value: '0', name: '基础信息' },
        // { value: '1', name: '图文详情' },
        { value: '2', name: '操作日志' }
      ],
      isView: false,
      drugDetail: {},
      logList: [],
      menuType,
      operationType,
      dialogVisible: false,
      chart: {},
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      chartData: [],
      isShow: false,
      tableData: [],
      saleColumn,
      saleState
    };
  },
  computed: {
    updateTime() {
      return moment(this.detailsForm.saleMsg.updateTime).format(
        'YYYY-MM-DD hh:mm:ss',
      );
    },
    applyDiseaseNames() {
      if (this.drugDetail.applyDiseaseNames) {
        const name = this.drugDetail.applyDiseaseNames.map(item => {
          return item.diseaseName;
        });
        return name.join(',');
      } else {
        return '';
      }
    },
    prescriptionType() {
      return this.drugDetail.prescriptionType ? 0 : 1; // 0处方 1非处方
    },
    pic() {
      return this.detailsForm.picMsg.headPic.length > 0
        ? this.detailsForm.picMsg.headPic[0]
        : '';
    }
  },
  watch: {
    'detailsForm.picMsg': function() {
      productFeatureEditor.txt.html(this.detailsForm.picMsg.manualPic);
    }
  },
  created() {
    this.isView = JSON.parse(this.$route.params.isView);
    this.getDetails(this.$route.params.id);
    // 获取药品分类
    this.getDisease({
      id: this.$route.params.id,
      type: 1
    }).then(res => {
      if (res && res.status) {
        res.data.forEach(item => {
          item.hightLable = replaceHightKeyWord('', item.diseaseName);
        });
        this.diseaseList = uniqWith(res.data, isEqual) || [];
      }
    });
    // 价格区间
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'priceInterval'
      })
      .then(res => {
        this.priceIntervals = res.obj || [];
      });
    // 销售状态
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'medicineSaleState'
      })
      .then(res => {
        this.medicineSaleStates = res.obj || [];
      });
    // 获取商品分类
    this.getMedicineTypes().then(res => {
      this.medicineTypes = res.obj || [];
    });
    this.getDrugDetail();
    this.getChart();
  },
  mounted() {
    productFeatureEditor = new E('#productFeature');
    this.configEditor(productFeatureEditor);
    // 富文本赋值
    productFeatureEditor.txt.html(this.detailsForm.picMsg.manualPic);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        window.screenHeight = document.body.clientHeight;
        that.screenWidth = window.screenWidth;
        that.screenHeight = window.clientHeight;
      })();
    };
  },
  methods: {
    ...mapActions('goodsManage', [
      'getGoodsDetails',
      'getDisease',
      'getMedicineTypes',
      'saveSaleMsg',
      'changeState',
      'getDiseaseByName',
      'saveGraphicDetails'
    ]),
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
    },
    // 展开基础信息
    expand() {
      this.expandStatus = !this.expandStatus;
    },
    // 获取商品详情
    getDetails(id) {
      this.getGoodsDetails({
        id
      }).then(res => {
        this.detailsForm = res.obj;
        if (!res.obj.baseMsg) {
          this.detailsForm.baseMsg = {
            approvalNumber: '',
            trademark: '',
            code: '',
            prescriptionType: '',
            manufacturer: '',
            name: '',
            prescription: '',
            specialType: '',
            specifications: '',
            supplierName: '',
            validity: 0,
            weight: 0,
            applyDisease: ''
          };
        }
      });
    },
    // 保存销售信息
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveSaleMsg({
            id: this.$route.params.id,
            ...this.detailsForm.saleMsg
          }).then(res => {
            if (!res.code) {
              this.$message.success('更新成功');
              this.getLogs();
            }
          });
        }
      });
    },
    // 保存销售信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.detailsForm.picMsg.manualPic = productFeatureEditor.txt.html();
          this.saveGraphicDetails({
            id: this.$route.params.id,
            manualPic: this.detailsForm.picMsg.manualPic,
            headPic: JSON.stringify(this.detailsForm.picMsg.headPic),
            packingPic: this.detailsForm.picMsg.packingPic
          }).then(() => {
            this.$message.success('保存成功');
            this.getLogs();
          });
        }
      });
    },
    // 更改销售状态
    changeSaleState(saleState) {
      this.$confirm(
        `${
          saleState
            ? '确认上架吗？'
            : '下架后用户将无法选择该商品，是否确认操作？'
        }`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        },
      )
        .then(() => {
          if (saleState) {
            // 上架
            let flag = true;
            flag = this.detailsForm.priceMsgs.every(item => {
              return (
                this.detailsForm.saleMsg.priceMax &&
                this.detailsForm.saleMsg.priceMax > item.price
              );
            });
            if (!flag) {
              this.$message.warning('最高限价小于供应商报价');
              return;
            }
            this.$refs['detailsForm'].validate(valid => {
              if (valid) {
                this.changeState({
                  saleState,
                  medicineStatusList: this.tableData,
                  id: this.$route.params.id
                }).then(res => {
                  if (!res.code) {
                    this.$message.success(res.comment);
                    this.$router.push('/drugManage/goodsList');
                  } else {
                    this.$message.warning(res.comment);
                  }
                });
              }
            });
          } else {
            // 下架
            this.changeState({
              saleState,
              id: this.$route.params.id
            }).then(res => {
              if (!res.code) {
                this.$message.success(res.comment);
                this.$router.push('/drugManage/goodsList');
              } else {
                this.$message.warning(res.comment);
              }
            });
          }
        })
        .catch(() => {});
    },
    // 模糊搜索疾病
    getDiseases(keyword) {
      this.loading = true;
      if (keyword !== '') {
        this.getDiseaseByName({
          name: keyword
        })
          .then(res => {
            this.loading = false;
            res.obj.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.obj || [];
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.diseaseList = [];
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
    // 商品头图
    uploadHeaderImage(item) {
      uploadImage(item)
        .then(res => {
          this.detailsForm.picMsg.headPic = [];
          this.detailsForm.picMsg.headPic.push(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 商品包装
    uploadHeader(item) {
      uploadImage(item)
        .then(res => {
          this.detailsForm.picMsg.packingPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    deleteImage(type, index) {
      type === 0
        ? this.detailsForm.picMsg.headPic.splice(index, 1)
        : (this.detailsForm.picMsg.packingPic = '');
    },
    goEdit() {
      this.$router.push({
        path: `/dataDictionary/basisDrugs/basisDrugsDetail/${this.drugDetail.id}`
      });
    },
    getDrugDetail() {
      this.$store
        .dispatch('drugManage/getDrugDetail', this.$route.params.id)
        .then(res => {
          this.drugDetail = res.data || {};
          res.data.applyDiseaseNames.forEach(item => {
            item.id = item.id.toString();
          });
        });
    },
    viewCharts() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.initChart();
        this.setOption(this.chartData);
      });
    },
    initChart() {
      const echartDom = this.$refs.echartDom;
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);
    },
    setOption(data) {
      //   let data = [{ date: '2020-01-01', price: 20.00 }, { date: '2020-01-02', price: 30.00 }]
      const x = [];
      const y = [];
      data.forEach(item => {
        x.push(item.date);
        y.push(item.price);
      });
      echartOption.series[0].data = y;
      echartOption.xAxis.data = x;
      this.chart.setOption(echartOption);
    },
    getChart() {
      this.$store
        .dispatch('drugManage/viewCharts', {
          id: this.$route.params.id
        })
        .then(res => {
          this.chartData = res.data;
        });
    },
    putOn(type) {
      this.$store
        .dispatch('drugManage/getMedicineStatus', this.$route.params.id)
        .then(res => {
          this.tableData = res.data;
          if (type) {
            this.isShow = true;
          }
        });
    },
    editItem(row) {
      this.$confirm(
        `确认调整为${row.status === 0 ? '在售' : '停售'}状态吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        },
      ).then(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
    },
    goSetting(row) {
      this.$router.push({
        path: `/drugManage/applicationSettings/create/${row.sysConfigId}/1/${
          row.type === 0 ? 'single' : 'double'
        }`
      });
    }
  }
};
</script>
<style lang="scss">
.goods-details-page {
  position: relative;
  .form-item {
    // padding: 10px 0;
    .form-title {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      font-size: 14px;
      .title {
        flex: 1;
        position: relative;
        padding-left: 16px;
        color: #333333;
        &::before {
          content: '';
          width: 4px;
          height: 14px;
          position: absolute;
          top: 0;
          left: 4px;
          background-color: #2276ff;
        }
      }
    }
    .content {
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    }
    &:last-child {
      .content {
        border: none;
      }
    }
    .img-content {
      display: flex;
      .img {
        width: 178px;
        height: 178px;
        border: 1px solid #dee2e8;
        margin-right: 24px;
        border-radius: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-upload {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #dee2e8;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .icon-delete {
    position: absolute;
    top: -7px;
    right: -5px;
  }
  .star {
    position: absolute;
    top: 0;
    left: 0;
    color: #ff4949;
  }
  .btn {
    position: absolute;
    top: 50px;
    right: 54px;
  }
  .echartDom {
    width: 760px;
    height: 400px;
  }
  .line-dialog {
    width: 787px;
    height: 468px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(15, 81, 255, 0.11);
    border-radius: 4px;
    padding: 24px;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: #464668;
      height: 24px;
      justify-content: space-between;
      align-items: center;
    }
    &-close {
      width: 20px;
      height: 20px;
      background: url('../../../assets/close.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
  }
  .detail {
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 24px;
    .line {
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 8px;
    }
    &-left {
      width: 318px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(187, 187, 187, 0.5);
      border-radius: 4px;
      padding: 24px;
      margin-left: 5px;
      &-title {
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        color: #545473;
      }
      &-top {
        justify-content: space-between;
        align-items: center;
        padding-bottom: 24px;
        box-shadow: 0px 1px 0px 0px #ebedf2;
      }
      &-dot {
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
      }
      &-img {
        width: 131px;
        height: 131px;
        border: 1px solid #ccc;
        margin: 24px 0;
        &-pic {
          width: 100%;
          height: 100%;
        }
      }
      &-content {
        font-size: 14px;
        color: #464668;
        line-height: 24px;
        // div {
        //   width: 100%;
        //   white-space: nowrap;
        //   text-overflow: ellipsis;
        //   overflow: hidden;
        // }
      }
    }
    &-right {
      flex: 1;
      padding: 24px;
      .el-form-item label {
        font-size: 15px !important;
      }
      .el-form-item__content {
        margin-top: -24px;
      }
      .detailsForm {
        margin-top: 27px;
      }
      &-icon {
        width: 19px;
        height: 19px;
        background: url('../../../assets/icon_data.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
      &-disable {
        width: 19px;
        height: 19px;
        background: url('../../../assets/icon_disable.png');
        background-size: 100% 100%;
        cursor: not-allowed;
      }
    }
  }
  .tip {
    width: 32px;
    height: 17px;
    margin-left: 5px;
  }
  .otc {
    background: url('../../../assets/otc.png') no-repeat;
    background-size: contain;
  }
  .rx {
    background: url('../../../assets/rx.png') no-repeat;
    background-size: contain;
  }
  .drug-name {
    justify-content: flex-start;
    align-items: center;
  }
  .dialog-text {
    font-size: 14px;
    color: #464668;
    margin-bottom: 12px;
  }
  .sale {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .onSale {
    background: url('../../../assets/onSale.png');
    background-size: 100% 100%;
  }
  .haltSale {
    background: url('../../../assets/haltSale.png');
    background-size: 100% 100%;
  }
}
</style>
