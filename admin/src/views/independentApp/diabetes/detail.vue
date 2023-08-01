<template>
  <el-container>
    <el-main>
      <div class="details-content flex-col">
        <Tab :btns="btns" @change="handleClick" />
        <div class="scroll-table">
          <div v-show="activeName === '0'" class="diabetes-manage-page">
            <div class="basisDrugsDetail-table">
              <div class="basisDrugsDetail-table-title">用户信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.user.userId || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">渠道名称</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.user.channelName || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">渠道ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.user.channelCode || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">手机号</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.user.mobile || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-title">疾病基础信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">疾病类型</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.diabetesType || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">确诊时间</div>
                  <div class="basisDrugsDetail-detail">
                    {{
                      data.diabetesInfo.confirmedTime
                        ? $moment(data.diabetesInfo.confirmedTime).format(
                            'YYYY-MM-DD',
                          )
                        : '-'
                    }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">治疗方式</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.therapyMethod || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">胰岛素方案</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.insulinRegimen || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">并发症</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.complication || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">血糖控制情况</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.bloodGlucoseControl || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">糖化血红蛋白</div>
                  <div class="basisDrugsDetail-detail">
                    {{ data.diabetesInfo.glycosylatedHemoglobin || '-' }}
                    <div
                      class="lookreport"
                      @click="getShowViewer(data.diabetesInfo.checkReportImg)"
                    >
                      查看报告
                    </div>
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r" />
              </div>
              <div class="basisDrugsDetail-table-title">其他记录</div>
              <div class="basisDrugsDetail-table-item">
                <div class="basisDrugsDetail-table-item-l">症状</div>
                <div class="basisDrugsDetail-table-item-r">
                  <div class="symptom-select">
                    <div class="symptom-select-l">
                      {{
                        diabetesSymptomInfo.symptom
                          ? diabetesSymptomInfo.symptom.join('、')
                          : '-'
                      }}
                    </div>
                    <div class="symptom-select-r">
                      <el-date-picker
                        v-model="symptomTime"
                         value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择时间"
                        :clearable="false"
                        class="w-150"
                        :picker-options="pickerOptions"
                        @change="getSymptomInfo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-title">血糖记录</div>
              <div class="diabetes-chart">
                <div class="diabetes-chart-title">
                  空腹，高于3.9mmol/L且低于6.1mmol/L的测量值通常可被视为正常范围
                </div>
                <div class="diabetes-chart-main">
                  <div class="chart-time">
                    <el-date-picker
                      v-model="infoTime"
                       value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择时间"
                      :clearable="false"
                      class="w-150"
                      :picker-options="pickerOptions"
                      @change="getMedicalInfo"
                    />
                  </div>
                  <BloodSugar :data="medicalInfoList" />
                </div>
              </div>
            </div>
            <elImageViewer
              v-if="showViewer"
              :on-close="showViewerClose"
              :url-list="urlList"
            />
          </div>
          <div v-if="activeName === '1'" class="log-items">
            <div class="log-list">
              <div v-if="logList.length > 0">
                <div
                  v-for="(item, index) in logList"
                  :key="index"
                  class="log-item"
                >
                  <span class="dot" />
                  <span class="time">{{ item.createTime | timeFormat }} </span>
                  <span class="name">{{ item.name }} </span>
                  <span class="name mr-24">{{
                    $enums['operationType'][item.operation]
                  }}</span>
                  <div class="name">{{ item.remark || '' }}</div>
                </div>
              </div>
              <div v-else>
                暂无记录
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import BloodSugar from './component/bloodSugar';
import Api from '@/api/YouthHealthRecord';
import { default as logApi } from '@/api/skinTest';
export default {
  name: 'DiabetesDetail',
  components: { BloodSugar },
  data() {
    return {
      infoTime: '',
      symptomTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      data: {
        diabetesInfo: {
          bloodGlucoseControl: '',
          checkReportImg: '',
          complication: '',
          confirmedTime: '',
          diabetesType: '',
          glycosylatedHemoglobin: 0,
          hbalcTime: '',
          insulinRegimen: '',
          therapyMethod: ''
        },
        user: {
          channelCode: '',
          channelName: '',
          mobile: '',
          userId: ''
        }
      },
      showViewer: false,
      urlList: [],
      medicalInfoList: [],
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      activeName: '0',
      diabetesSymptomInfo: {},
      logList: []
    };
  },
  created() {
    Api.getDiabetesDetail({ id: this.$route.params.id }).then(res => {
      this.data = res.data;
      this.infoTime = new Date().getTime();
      this.symptomTime = new Date().getTime();
      this.getMedicalInfo();
      this.getSymptomInfo();
    });
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      if (tab === '1') {
        logApi.getLogList(this.$route.params.id, 3).then(res => {
          this.logList = res.data;
        });
      }
    },
    // 预览图片
    getShowViewer(urls) {
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.urlList = urls.split(',');
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    },
    // 获取心率、血压、血糖等统计数据
    getMedicalInfo() {
      Api.getDiabetesBlood({
        userId: this.$route.params.id,
        day: this.$moment(this.infoTime).format('YYYY-MM-DD')
      }).then(res => {
        this.medicalInfoList = res.data;
      });
    },
    getSymptomInfo() {
      Api.getDiabetesSymptom({
        userId: this.$route.params.id,
        day: this.$moment(this.symptomTime).format('YYYY-MM-DD')
      }).then(res => {
        this.diabetesSymptomInfo = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.diabetes-manage-page {
  .basisDrugsDetail-table {
    // width: calc(100% - 6px);
    // box-shadow: 0px 0px 3px 0px rgba(158, 158, 158, 0.5);
    // margin: 0 auto 20px;
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
    .basisDrugsDetail-table-four {
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
    .diabetes-chart {
      padding: 15px 32px;
      &-title {
        font-size: 14px;

        font-weight: 400;
        color: #545473;
        line-height: 14px;
        margin-bottom: 15px;
      }
      &-main {
        position: relative;
        .w-130 {
          width: 130px;
        }
        .chart-time {
          z-index: 2;
          position: absolute;
          right: 0;
          top: -36px;
        }
      }
    }
    .symptom-select {
      width: 100%;
      display: flex;
      align-items: center;
      &-l {
        flex: 1;
        line-height: 21px;
      }
    }
  }
  .lookreport {
    display: inline-block;
    width: 87px;
    height: 32px;
    background: #e1f1ff;
    border-radius: 4px;
    border: 1px solid #3599fe;
    font-size: 14px;

    font-weight: bold;
    color: #3599fe;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    margin-left: 32px;
  }
  .w-150 {
    width: 150px;
  }
}
.log-items {
  margin-top: 0;
}
</style>
