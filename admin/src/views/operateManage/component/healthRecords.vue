<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="mt-24 no-content header-tab"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基础档案" name="1"/>
      <el-tab-pane label="HRA问卷" name="2"/>
      <el-tab-pane label="就医记录" name="3"/>
    </el-tabs>
    <div v-if="activeName == 1">
      <el-card class="box-card mb-24">
        <div class="border-box mb-24">基础信息</div>
        <el-row class="small">
          <el-col
:span="8"
><span>身高：{{ detail.baseInfo.height }}cm</span></el-col>
          <el-col
:span="8"
><span>体重：{{ detail.baseInfo.weight }}kg</span></el-col>
          <el-col
:span="8"
><span>BMI：{{ detail.baseInfo.bmi }}</span></el-col>
        </el-row>
        <div class="flex-between mb-20">
          <div class="subTitle mb-0 bmi-conten"
          >BMI详情</div>
          <!-- <div>
            <span>时间：</span>
            <el-date-picker
              v-model="query.BMTTime"
              value-format="timestamp"
              type="month"
              placeholder="选择月"
              :clearable="false"
              class="w-130"
              :picker-options="pickerOptions"
              @change="getBmi"
            />
          </div> -->
        </div>
        <div class="report-box reportBmi-box">
          <scatter
            :id="'BMIId'"
            :title="'BMI'"
            :key-value="'bmi'"
            :show-labels="[
              { key: 'bmi', name: 'BMI' },
              { key: 'height', name: '身高' },
              { key: 'weight', name: '体重' }
            ]"
            :height="220"
            :data="{ titleText: '', series: BMIList, month: query.BMTTime }"
          />
        </div>
      </el-card>
      <el-card class="box-card mb-24">
        <div class="border-box tab-conter mb-24">健康信息</div>
        <div v-if="!isMan">
          <div class="subTitle">女性健康</div>
          <el-row class="small">
            <el-col
:span="24"
><span>生育：{{ detail.healthInfo.birth || '-' }}</span></el-col>
            <el-col
:span="8"
><span>月经时长(天)：{{
                  detail.healthInfo.menstrualDuration || '-'
                }}</span></el-col>
            <el-col
:span="8"
><span>月经周期(天)：{{
                  detail.healthInfo.menstrualCycle || '-'
                }}</span></el-col>
            <el-col
:span="8"
><span>月经流量：{{ detail.healthInfo.bloodVolume || '-' }}</span></el-col>
          </el-row>
          <div class="flex-between mb-20">
            <!-- <div class="subTitle mb-0">月经情况</div> -->
            <!-- <div>
              <span>时间：</span>
              <el-date-picker
                v-model="query.menstruationTime"
                value-format="timestamp"
                type="month"
                placeholder="选择月"
                :clearable="false"
                class="w-130"
                :picker-options="pickerOptions"
                @change="getMenstruation"
              />
            </div> -->
          </div>
          <div class="report-box mb-24">
            <scatter
              :id="'menstruationId'"
              :title="'月经'"
              :key-value="'mensesStr'"
              :show-labels="[
                { key: 'menses', name: '是否月经' },
                { key: 'bloodClot', name: '血块' },
                { key: 'menstrualColor', name: '颜色' },
                { key: 'bloodVolume', name: '血量' },
                { key: 'dysmenorrhea', name: '是否痛经' }
              ]"
              :height="220"
              :data="{
                titleText: '',
                series: menstruationList,
                month: query.menstruationTime
              }"
            />
          </div>
        </div>
        <div class="subTitle">病史等情况</div>
        <el-row class="small">
          <el-col
:span="8"
><span>疾病史：{{ detail.medicalHistoryInfo.disease || '-' }}</span></el-col>
          <el-col
:span="8"
><span>家族病史：{{
                detail.medicalHistoryInfo.familialDiseases || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>药物过敏：{{
                detail.medicalHistoryInfo.drugAllergy || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>其他过敏：{{
                detail.medicalHistoryInfo.allergyHistory || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>外伤史：{{ detail.medicalHistoryInfo.trauma || '-' }}</span></el-col>
          <el-col
:span="8"
><span>手术史：{{ detail.medicalHistoryInfo.operation || '-' }}</span></el-col>
          <el-col
:span="8"
><span>现病史：{{
                detail.medicalHistoryInfo.existingDiseases || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>肝功能：{{
                detail.medicalHistoryInfo.liverFunction || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>肾功能：{{
                detail.medicalHistoryInfo.renalFunction || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>是否容易水肿：{{ detail.medicalHistoryInfo.edema || '-' }}</span></el-col>
          <el-col
:span="8"
><span>是否有皮下出血：{{
                detail.medicalHistoryInfo.subcutaneous || '-'
              }}</span></el-col>
        </el-row>
        <div class="subTitle">糖尿病管理</div>
        <el-row class="small">
          <el-col
:span="8"
><span>疾病类型：{{
                detail.diabetesManagementDetailVO.diabetesType || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>确诊时间：{{
                detail.diabetesManagementDetailVO.confirmedTime
                  ? $moment(
                      detail.diabetesManagementDetailVO.confirmedTime
                    ).format('YYYY-MM-DD HH:MM:SS')
                  : '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>治疗方式：{{
                detail.diabetesManagementDetailVO.therapyMethod || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>胰岛素方案：{{
                detail.diabetesManagementDetailVO.insulinRegimen || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>并发症：{{
                detail.diabetesManagementDetailVO.complication || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>血糖控制情况：{{
                detail.diabetesManagementDetailVO.bloodGlucoseControl || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>糖化血红蛋白 %：{{
                detail.diabetesManagementDetailVO.glycosylatedHemoglobin || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>报告：</span><span
              class="link-skip"
              @click="
                getShowViewer(detail.diabetesManagementDetailVO.checkReportImg)
              "
              >查看报告</span></el-col>
        </el-row>
        <div class="flex-between">
            <el-tabs
              v-model="subActive"
              class="mt-24 no-content main-tab"
              type="card"
              @tab-click="getMedicalInfo"
            >
              <el-tab-pane label="心率情况" name="1"/>
              <el-tab-pane label="血压情况" name="2"/>
              <el-tab-pane label="血糖情况" name="3"/>
            </el-tabs>
            <div style=" display: flex;
  align-items: center;
  justify-content: space-between;">
              <span class="icon-redio"></span>
              <span v-if="subActive == 1">心率</span>
              <span v-if="subActive == 2">血压</span>
              <span v-if="subActive == 3">血糖</span>
              </div>
            <div>
              <!-- <span>时间：</span> -->
              <el-date-picker
                v-model="query.medicalInfoTime"
                value-format="timestamp"
                type="month"
                placeholder="选择月"
                :clearable="false"
                class="w-130"
                :picker-options="pickerOptions"
                @change="getMedicalInfo"
              />
            </div>
          </div>
        <div class="report-box h-400 pt-0">
          <div v-if="subActive == 1">
            <div class="flex-center tips">正常值范围在60~100之间</div>
            <HeartRate :heart-rate-data="medicalInfoList"/>
          </div>
          <div v-if="subActive == 2">
            <div class="flex-center tips">
              于成年人而言，高于90/60mmHg且低于
              140/90mmHg的测量值通常被视为正常范围
            </div>
            <BloodPressure
              :blood-pressure-data="medicalInfoList"
            />
          </div>
          <div v-if="subActive == 3">
            <div class="flex-center tips">
              空腹，高于3.9mmol/L且低于6.1mmol/L的测量值通常可被视为正常范围
            </div>
            <BloodSugar :blood-sugar-data="medicalInfoList"/>
          </div>
        </div>
      </el-card>
      <el-card class="box-card mb-24">
        <div class="border-box mb-24">生活习惯</div>
        <div class="subTitle">饮食情况</div>
        <el-row class="small">
          <el-col
:span="8"
><span>不良习惯：{{ detail.livingHabitInfo.badHabits || '-' }}</span></el-col>
          <el-col
:span="8"
><span>饮食习惯：{{ detail.livingHabitInfo.food || '-' }}</span></el-col>
          <el-col
:span="8"
><span>口味：{{ detail.livingHabitInfo.flavor || '-' }}</span></el-col>
        </el-row>
        <div class="subTitle">运动情况</div>
        <el-row class="small">
          <el-col
:span="8"
><span>运动频率：{{
                detail.livingHabitInfo.sportFrequency || '-'
              }}</span></el-col>
          <el-col
:span="8"
><span>运动项目：{{ detail.livingHabitInfo.sportEvent || '-' }}</span></el-col>
          <el-col
:span="8"
><span>单次运动时长：{{
                detail.livingHabitInfo.sportDuration || '-'
              }}</span></el-col>
        </el-row>
        <div class="subTitle">睡眠情况</div>
        <el-row class="small">
          <el-col
:span="8"
><span>睡眠时长：{{ detail.livingHabitInfo.sleepDuration || '-' }}</span></el-col>
          <el-col
:span="8"
><span>是否失眠：{{ detail.livingHabitInfo.loseSleep || '-' }}</span></el-col>
          <el-col
:span="8"
><span>是否做梦：{{ detail.livingHabitInfo.dream || '-' }}</span></el-col>
        </el-row>
        <div class="flex-between flex-between-life mb-20">
          <!-- <div class="subTitle subTitle-life mb-0"> -->
            <el-tabs
              v-model="lifeActive"
              class="mt-24 no-content footer-tab"
              type="card"
            >
              <el-tab-pane label="运动情况" name="1"/>
              <el-tab-pane label="睡眠情况" name="2"/>
            </el-tabs>
          <div style=" display: flex;
            align-items: center;
            justify-content: space-between;"
            >
            <span  class="icon-redio"></span>
            <span  v-if="lifeActive == 1">运动量</span>
            <span  v-if="lifeActive == 2">睡眠量</span>
            </div>
          <div>
            <!-- <span>时间：</span> -->
            <el-date-picker
             v-model="query.sportTime"
              value-format="timestamp"
              type="month"
              placeholder="时间选择器"
              :clearable="false"
              class="w-130"
              :picker-options="pickerOptions"
              @change="getSport"
            />
          </div>
        </div>
        <div class="report-box">
          <div v-if="lifeActive == 1">
            <scatter
            :id="'sportId'"
            :key-value="'value'"
            :show-labels="[
              { key: 'timeStr', name: '日期' },
              { key: 'sportDuration', name: '运动总时长' },
              { key: 'calorie', name: '卡路里' },
              { key: 'sportEvent', name: '运动项目' }
            ]"
            :height="220"
            :title="'运动'"
            :data="{ titleText: '', series: sportList, month: query.sportTime }"
          />
        </div>
          </div>
      </el-card>
    </div>

    <div v-if="activeName == 2">
      <div class="subTitle">
        健康生活方式评估分数为：{{ detail.healthAssessScore.totalScore }}分
      </div>
      <div class="report-box mb-24 h-363 no-border">
        <RadarMap
          :id="'radarMapId'"
          :height="280"
          :width="300"
          :series-data="seriesList"
        />
      </div>
      <div class="border-box mb-24">问题</div>
      <div>
        <div
          v-for="(item, index) in detail.questionnaireResultList"
          :key="index"
        >
          <div class="subTitle">问题：{{ index + 1 }}、{{ item.question }}</div>
          <el-row class="small">
            <el-col :span="24">
              <div class="flex-box">
                <div>答案：{{ item.answer }}</div>
                <div class="tag-title">{{ item.tag }}</div>
              </div>
            </el-col>
            <el-col :span="24">建议：{{ item.tips }}</el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div v-if="activeName == 3">
      <el-table v-loading="tableLoading" :data="useList" class="table-large">
        <el-table-column label="来源">
          <template slot-scope="scope">
            <span>{{ scope.row.showName || '-' }}:{{
                scope.row.showId || '-'
              }}</span>
          </template>
        </el-table-column>
        <el-table-column label="诊断信息">
          <template slot-scope="scope">
            <span>{{ scope.row.info || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{
              $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <HoverTip
              content="查看"
              tip-class-name="icon-detail"
              @click.native.prevent="
                lookDetails(scope.row.id, scope.row.source)
              "
            />
          </template>
        </el-table-column>
        <div slot="empty" class="empty-img"/>
      </el-table>
    </div>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="urlList"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import scatter from './scatterPot';
import BloodPressure from './bloodPressure';
import BloodSugar from './bloodSugar';
import HeartRate from './heartRate';
import RadarMap from './radarMap';
export default {
  name: 'healthRecords',
  components: {
    scatter,
    BloodPressure,
    BloodSugar,
    HeartRate,
    RadarMap
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    isMan: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: '1',
      subActive: '1',
      lifeActive: '1',
      lifedata: [{
        name: '运动情况'
      }, {
        name: '睡眠情况'
      }],
      detail: {
        baseInfo: {},
        healthInfo: {},
        livingHabitInfo: {},
        medicalHistoryInfo: {},
        healthAssessScore: {},
        diabetesManagementDetailVO: {},
        questionnaireResultList: []
      },
      query: {
        BMTTime: new Date().getTime(),
        menstruationTime: new Date().getTime(),
        medicalInfoTime: new Date().getTime(),
        sportTime: new Date().getTime()
      },
      BMIList: [], // BMI 统计数据
      menstruationList: [], // 月经数据
      medicalInfoList: [],
      sportList: [],
      seriesList: [],
      // <el-date-picker
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableLoading: false,
      useList: [],
      showViewer: false,
      urlList: []
    };
  },
  computed: {},
  created() {
    this.handleClick();
  },
  methods: {
    ...mapActions('userManage', [
      'findHealthFile',
      'findHRAQuestionnaireInfo',
      'findBMIInfo',
      'findMedicalInfo',
      'findMenstruationInfo',
      'findSportInfo',
      'getMedicalRecord'
    ]),
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
    //
    lookDetails(id, type) {
      let url = '';
      if (type === 1) {
        url = `/operateManage/userManage/peopleClaimsDetial/${id}`;
      } else if (type === 2) {
        url = `/operateManage/onlineService/details/${id}`;
      }
      const routeData = this.$router.resolve({
        path: url
      });
      window.open(routeData.href, '_blank');
    },
    handleClick() {
      if (this.activeName === '1') {
        this.findHealthFile(this.id).then(res => {
          this.detail.baseInfo = res.data.baseInfo || {};
          this.detail.healthInfo = res.data.healthInfo || {};
          this.detail.livingHabitInfo = res.data.livingHabitInfo || {};
          this.detail.medicalHistoryInfo = res.data.medicalHistoryInfo || {};
          this.detail.diabetesManagementDetailVO =
            res.data.diabetesManagementDetailVO || {};
        });
        this.getBmi();
        this.getMenstruation();
        this.getMedicalInfo();
        this.getSport();
      } else if (this.activeName === '2') {
        let seriesList = [];
        this.findHRAQuestionnaireInfo(this.id).then(res => {
          this.detail.healthAssessScore = res.data.healthAssessScore || {};
          if (this.$isNotEmpty(res.data.healthAssessScore)) {
            const data = res.data.healthAssessScore;
            seriesList = [
              data.sleepScore,
              data.nutritionScore,
              data.bmiScore,
              data.habitScore,
              data.stressScore,
              data.sportScore
            ];
          }
          this.seriesList = seriesList;
          this.detail.questionnaireResultList =
            res.data.questionnaireResultList || [];
        });
      } else {
        this.tableLoading = true;
        this.getMedicalRecord(this.id).then(res => {
          this.useList = res.data;
          this.tableLoading = false;
        });
      }
    },
    // 获取Bni 统计数据
    getBmi() {
      this.findBMIInfo({
        userId: this.id,
        time: this.query.BMTTime
      }).then(res => {
        this.BMIList = res.data || [];
      });
    },
    // 获取月经

    getMenstruation() {
      if (this.isMan) {
        return;
      }
      this.findMenstruationInfo({
        userId: this.id,
        time: this.query.menstruationTime
      }).then(res => {
        res.data = res.data || [];
        res.data.forEach(item => {
          item.mensesStr = item.menses === '是' ? 1 : 0;
        });
        // 只显示有月经的
        const arr = res.data.filter(item => item.mensesStr === 1);
        this.menstruationList = arr || [];
      });
    },
    // 获取心率、血压、血糖等统计数据
    getMedicalInfo() {
      this.findMedicalInfo({
        userId: this.id,
        time: this.query.medicalInfoTime,
        type: Number(this.subActive)
      }).then(res => {
        res.data = res.data || [];
        this.medicalInfoList = this.$extends([], res.data);
      });
    },
    // 获取运动
    getSport() {
      this.findSportInfo({
        userId: this.id,
        time: this.query.sportTime
      }).then(res => {
        res.data.forEach(item => {
          let sumTime = 0;
          let sumCalorie = 0;
          let sumSportEvent = '';
          item.value = 1;
          item.timeStr = this.$timeFormat(item.createTime, 'yyyy-MM-dd');
          item.sportInfoVOS.forEach(ele => {
            sumTime += Number(ele.sportDuration);
            sumCalorie += Number(ele.calorie);
            sumSportEvent = sumSportEvent + '、' + ele.sportEvent;
          });
          item.calorie = sumCalorie;
          item.sportDuration = sumTime;
          item.sportEvent = sumSportEvent.slice(1, sumSportEvent.length);
        });
        this.sportList = res.data || [];
      });
    },
    // tap切换
    lifebtn(ind) {
     this.lifeActive = ind;
    }
  }
};
</script>

<style scoped lang="scss">
.subTitle {
  width: 100%;
  // height: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #464668;
  margin-bottom: 24px;
  margin-right: 100px;
  // background: #464668;
}
.flex-between {
  // position: relative;
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;
}
.flex-between-life {
   display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;
}
.icon-redio {
  width: 12px;
  height:12px;
  border-radius: 50%;
  background: #3599FE;
  margin-right: 12px;
}
.header-tab {
  /deep/ .el-tabs__header{
  border: none;
  .el-tabs__nav{
 border: none;
  }
  .el-tabs__item{
    border: none;
    background: #F5F6FF;
    color: #9A9AAA;
  }
  .el-tabs__item.is-active {
   background: #fff;
  }
}
}
.main-tab {
  /deep/ .el-tabs__item.is-active {
    border-bottom: 1px solid #dfe4ed;
  }
}
.footer-tab {
  /deep/ .el-tabs__header{
  border: none;
 .el-tabs__item {
    border-bottom: 1px solid #dfe4ed;
 }
}
}
/deep/ .el-input__icon {
  display: none;
}
/deep/ .el-input__icon .el-icon-date::after {
 content: none;
}
/deep/ .el-input__icon .el-icon-date::before {
 content: none !important;
}
/deep/ .el-date-editor .el-input__inner{
  background: #3599FE;
}

/deep/ .el-tabs__item .is-top .is-active {
  border: none;
}
.reportBmi-box {
  margin-top: 70px;
}
.report-box {
  &.h-363 {
    height: 336px;
  }
  &.h-400 {
    height: 400px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 246px;
  border-radius: 4px;
  // border: 1px dashed #b5b5b5ff;
  width: 100%;
  padding: 24px;
  &.no-border {
    border: none;
  }
}
.tag-title {
  margin-left: 48px;
  color: #3599feff;
}
.tips {
  font-size: 14px;
  color: #ffa800;
  margin-bottom: 10px;
}
</style>
