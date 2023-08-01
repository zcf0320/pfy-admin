<template>
  <el-container>
    <el-scrollbar
      v-loading="loading"
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <Tab :current-key="activeName" :btns="btns" @change="handleClick"></Tab>
      <div class="mt-10" v-if="activeName === '0'">
        <div class="inquiryDetail-table">
          <div class="inquiryDetail-table-title">基础信息</div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">疾病名称</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseName || '-' }}（{{
                diseaseInfo.diseaseCode || '-'
              }}）
            </div>
          </div>
           <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">推荐药物</div>
            <div class="inquiryDetail-table-item-r">
              <span
                v-if="diseaseInfo.recommendMedicineNum"
                class="diseaseContent link-skip"
                @click="toBasisDrug(diseaseInfo.diseaseName)"
                >{{ diseaseInfo.recommendMedicineNum }}种</span
              >
              <span v-else class="diseaseContent">暂无</span>
            </div>
           </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">疾病别称</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseByname || '-' }}
            </div>
          </div>
           <div class="inquiryDetail-table-item">
             <div class="inquiryDetail-table-item-l">是否属于医保</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseInsured || '-' }}
            </div>
           </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">传染性/传染类型</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseInfectType || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">多发人群</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseMutiple || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">发病部位</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseSite || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
             <div class="inquiryDetail-table-item-l">并发症</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseConcurrent || '-' }}
            </div>
          </div>

          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">疾病症状</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseSymptoms || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">疾病标签</div>
            <div class="inquiryDetail-table-item-r">
              <el-checkbox-group v-model="credentials">
                <el-checkbox
                  v-for="item in diseasesLabels"
                  :key="item.type"
                  :label="item.name"
                />
              </el-checkbox-group>
            </div>
          </div>
          <div class="inquiryDetail-table-content">
            <span class="inquiryDetail-table-content-l">疾病简介：</span>
            <span
              :class="
                `inquiryDetail-table-content-c ${openDetailState ? 'open' : ''}`
              "
              >{{ diseaseInfo.diseaseDetail || '-' }}</span
            >
            <span
              v-if="diseaseInfo.diseaseDetail"
              class="inquiryDetail-table-content-r"
              @click="openDetail"
              >{{ openDetailState ? '收起' : '展开' }}</span
            >
          </div>
          <div class="inquiryDetail-table-title">疾病治疗</div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">相关检查</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseRelevantInspection || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
              <div class="inquiryDetail-table-item-l">治疗方式</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseCureMethod || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">治疗周期</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseCycle || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
             <div class="inquiryDetail-table-item-l">治愈率</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseCureRate || '-' }}
            </div>
          </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">治疗费用</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseCost || '-' }}
            </div>
          </div>
           <div class="inquiryDetail-table-item">
             <div class="inquiryDetail-table-item-l">常用药物</div>
            <div class="inquiryDetail-table-item-r">
              {{ diseaseInfo.diseaseDrug || '-' }}
            </div>
           </div>
          <div class="inquiryDetail-table-item">
            <div class="inquiryDetail-table-item-l">推荐科室</div>
            <div class="inquiryDetail-table-item-r">
              <el-cascader
                v-model="checkedDepartment"
                :options="allDepartment"
                :show-all-levels="false"
                :props="props"
                style="width: 100%"
              />
            </div>
          </div>
        </div>
        <div class="page-footer">
          <button class="btn-save" @click="save">保存</button>
        </div>
      </div>
      <div v-if="id && activeName === '1'" class="log-items">
        <Logs :id="id" :type="'108'" />
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DiseaseDatabaseDetail',
  data() {
    return {
      credentials: [], // 选中的疾病标签
      diseasesLabels: [], // 疾病标签列表
      diseaseInfo: {}, // 疾病详情
      props: { multiple: true },
      // 全部科室
      allDepartment: [],
      // 选中的科室
      checkedDepartment: [],
      loading: true,
      openDetailState: false,
      activeName: '0',
      btns: [{ value: '0', name: '基础信息' }],
      id: ''
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.btns.push({ value: '1', name: '操作日志' });
    }
    // 获取疾病标签
    this.getDiseaseLabel().then(res1 => {
      this.diseasesLabels = res1.data;
      // 获取全部科室多级
      this.getAllDepartment({ pageNum: 1, pageSize: 1000 }).then(res2 => {
        this.allDepartment = this.getTreeData(res2.data.list);
        // 获取疾病详情

        this.getDiseaseInfo({
          diseaseName: decodeURIComponent(this.$route.query.name)
        }).then(res3 => {
          this.loading = false;
          this.diseaseInfo = res3.data;
          this.credentials = res3.data.diseaseLabelChecked;
          this.checkedDepartment = res3.data.diseaseCheckedDepartmentList;
        });
      });
    });
  },
  methods: {
    ...mapActions('inquiryManage', [
      'getDiseaseInfo',
      'getDiseaseLabel',
      'setDiseaseInfo',
      'getAllDepartment'
    ]),
    ...mapActions('drugManage', ['setDiseaseName']),
    save() {
      const secondDepartment = [];
      this.checkedDepartment.forEach(item => {
        secondDepartment.push(item[item.length - 1]);
      });
      const params = {
        checked: this.credentials,
        deseaseCode: this.diseaseInfo.diseaseCode,
        diseaseName: this.diseaseInfo.diseaseName,
        departmentId: secondDepartment,
        diseaseId: this.diseaseInfo.diseaseId
      };
      this.setDiseaseInfo(params).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        });
        this.$router.go(-1);
      });
    },
    toBasisDrug(name) {
      this.setDiseaseName(name);
      this.$router.push('/dataDictionary/basisDrugs');
    },
    // 递归删除空科室方法
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
    },
    // 展开
    openDetail() {
      this.openDetailState = !this.openDetailState;
    },
    handleClick(tab) {
      this.activeName = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
.inquiryDetail-table {
  // box-shadow: 0px 0px 2px 2px #e8e8e8;
  // margin-bottom: 20px;
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 20px;
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
    &-l {
      width: 204px;
      font-weight: bold;
      padding: 17px 0 17px 32px;
      display: flex;
      align-items: center;
      //  display: flex;
      //   align-items: center;
      //   min-height: 48px;
      //   height: 100%;
      //   width: 165px;
      //   font-weight: bold;
      //   padding-left: 32px;
    }
    &-r {
      flex: 1;
      padding: 17px 61px;
      // padding-left: 41px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      border-left: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      align-items: center;
    }
    &-checkbox {
       padding-left: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      border-left: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      align-items: center;
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
}
</style>
