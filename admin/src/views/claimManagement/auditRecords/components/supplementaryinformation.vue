<template>
  <div class="h-full">
    <el-tabs v-model="activeName" type="border-card" class="no-content">
      <el-tab-pane label="全部" name="0" />
      <el-tab-pane
        v-for="item in tabs"
        :key="item.materialId"
        :label="item.materialName"
        :name="item.materialId"
      ></el-tab-pane>
      <!-- <el-tab-pane label="银行卡" name="6" />
      <el-tab-pane label="身份证" name="7" />
      <el-tab-pane label="西方处药" name="1" />
      <el-tab-pane label="检验检查单" name="2" />
      <el-tab-pane label="医疗费用结算单" name="3" />
      <el-tab-pane label="医疗发票" name="4" />
      <el-tab-pane label="病案首页" name="5" /> -->
    </el-tabs>
    <div>
      <div class="flex-between-normal">
        <el-scrollbar
          :native="false"
          :style="{ height: clientHeight - 345 + 'px' }"
          :noresize="false"
        >
          <div class="tabs-content pl-4">
            <component
              :is="currentComponent()"
              :id="id"
              :type="activeName"
              ref="refName"
              :is-edit.sync="isEdit"
              @change="change"
              @imgs="changeImg"
            />
          </div>
        </el-scrollbar>
        <div v-if="activeName !== '0'" class="h-full ml-10 w-400">
          <imgPreview :urls="getImg" />
        </div>
      </div>
    </div>
    <div v-if="activeName !== '0'" class="page-footer">
      <el-button
        v-if="!isEdit && pageAuthority.includes('add')"
        size="small"
        class="border-blue"
        type="primary"
        @click="isEdit = true"
      >
        修改
      </el-button>
      <el-button
        v-if="isEdit && pageAuthority.includes('add')"
        size="small"
        class="border-blue ml-30"
        type="primary"
        @click="saveForm()"
      >
        保存
      </el-button>
    </div>
    <div v-if="flag" class="model flex-center">
      <div class="scanning ">
        <div class="scanning-box">
          <div class="scanning-item flex-center">
            <el-image class="scanningImg" :src="scanningImg" />
          </div>
          <div class="scanning-item flex-center">
            <el-image class="scanningBorder" :src="scanning" />
          </div>
          <div class="scanning-item flex-center">
            <div class="scanningBorder">
              <el-image
                class="scanningContent"
                :class="flag ? 'scanningContentActive' : ''"
                :src="scanningBox"
              />
            </div>
          </div>
        </div>
        <div class="scanning-tips flex-center">自动识别中…</div>
      </div>
    </div>
  </div>
</template>

<script>
import imgPreview from './imgPreview';
import allTab from './allTab';
import treatmentInformation from '../treatmentInformation';
import Inspection from './Inspection';
import medicalExpense from './medicalExpense';
import medicalInvoice from './medicalInvoice';
import medicalRecord from './medicalRecord';
import bankCard from './bankCard';
import idNumber from './idNumber';
import { findDynamicFurtherInformation } from '@/api/auditRecords';
const arrTab = [
  '西药处方',
  '检验检查',
  '医疗费用',
  '病例发票',
  '病例首页',
  '银行卡',
  '身份证'
];
export default {
  name: 'Supplementaryinformation',
  components: {
    imgPreview,
    allTab,
    treatmentInformation,
    Inspection,
    medicalExpense,
    medicalInvoice,
    medicalRecord,
    bankCard,
    idNumber
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeId: null,
      scanning: require('@/assets/scanning.png'),
      scanningBox: require('@/assets/scanning-box.png'),
      scanningImg: require('@/assets/scanning-img.png'),
      activeName: '0',
      isEdit: true,
      flag: false,
      imgList: [],
      tabs: []
    };
  },
  computed: {
    getImg() {
      const arr = [];
      this.imgList.forEach(item => {
        if (this.$isNotEmpty(item.materialImgs)) {
          item.materialImgs.forEach(mItem => {
            if (arrTab[Number(this.activeName) - 1] === item.materialName) {
              arr.push({
                isError: !mItem.status,
                url: mItem.img,
                content: mItem.content
              });
            }
          });
        }
      });
      return arr;
    },
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    }
  },
  created() {
    findDynamicFurtherInformation(this.id).then(res => {
      this.tabs = res.data;
    });
  },
  beforeDestroy() {
    clearTimeout(this.timeId);
  },
  methods: {
    currentComponent() {
      switch (this.activeName) {
        case '0':
          return 'allTab';
        // 西药处方
        case '1':
          return 'treatmentInformation';
        // break
        // 检验检查
        case '4':
          return 'Inspection';
        // break
        // 医疗费用
        case '5':
          return 'medicalExpense';
        // break
        // 病例发票
        case '6':
          return 'medicalInvoice';
        // break
        // 病例首页
        case '3':
          return 'medicalRecord';
        // break
        // 银行卡
        case '7':
          return 'bankCard';
        // break
        // 身份证
        case '8':
          return 'idNumber';
        // break
        // 其他默认
        default:
          return '';
      }
    },
    /**
     * 保存
     */
    saveForm() {
      if (
        this.$isNotEmpty(this.$refs.refName) &&
        this.$isNotEmpty(this.$refs.refName.saveForm)
      ) {
        this.$refs.refName.saveForm();
      }
    },
    change(val) {
      if (val) {
        this.flag = val;
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
          clearTimeout(this.timeId);
          this.flag = false;
          this.$message.success('已完成理赔资料的OCR识别');
        }, 2000);
      }
    },
    changeImg(imgList) {
      this.imgList = imgList;
    }
  }
};
</script>

<style scoped lang="scss">
.tabs-content {
  // box-shadow: 0px 0px 6px 2px rgba(193, 193, 193, 0.5);
  min-height: 100%;
  padding: 24px 14px 10px 0px;
}
@keyframes example {
  from {
    height: 10px;
  }
  to {
    height: 112px;
  }
}
.no-content {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
}
// @keyframes example {
//     0% {
//         height: 0px;
//     }
//     25% {
//         height: 56px;
//     }
//     50% {
//         height: 112px;
//     }
//     75% {
//         height: 56px;
//     }
//     100% {
//         height: 0px;
//     }
// }
.model {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0px;
  background: #00000080;
  z-index: 99999;
  .scanning {
    width: 240px;
    height: 193px;
    background: #ffffff;
    padding: 35px 45px 0;
    .scanning-box {
      position: relative;
      height: 112px;
      width: 100%;
      .scanning-item {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    .scanning-tips {
      font-size: 18px;
      font-weight: 500;
      color: #3599fe;
      height: 47px;
    }
    .scanningImg {
      width: 116px;
      height: 78px;
    }
    .scanningBorder {
      width: 152px;
      height: 112px;
    }
    .scanningBorderActive {
      height: 112px;
    }
    .scanningContent {
      height: 10px;
      width: 152px;
    }
    .scanningContentActive {
      animation-name: example;
      animation-duration: 2s;
    }
  }
}
</style>
