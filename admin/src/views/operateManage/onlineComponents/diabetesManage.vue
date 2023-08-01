<template>
  <div class="diabetes-manage-page">
    <div class="basisDrugsDetail-table">
      <div class="basisDrugsDetail-table-title">药品属性</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">ID</div>
          <div class="basisDrugsDetail-detail">
            {{ data.serialNumber || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">服务项</div>
          <div class="basisDrugsDetail-detail">
            {{ data.serviceInfoName || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">服务来源</div>
          <div class="basisDrugsDetail-detail">
            <div
              :class="{
                'link-skip': !!formData.serviceSourceVO.serviceSourceId,
              }"
              @click="linkSkip(formData.serviceSourceVO)"
            >
              {{ serviceSource() }}
            </div>
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">更新时间</div>
          <div class="basisDrugsDetail-detail">
            {{
              data.updateTime
                ? $moment(data.updateTime).format('YYYY-MM-DD')
                : '-'
            }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">用户信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">姓名</div>
          <div class="basisDrugsDetail-detail">
            {{ data.name || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">性别</div>
          <div class="basisDrugsDetail-detail">
            {{ data.sex ? '男' : '女' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">年龄</div>
          <div class="basisDrugsDetail-detail">
            {{ data.age || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">手机号</div>
          <div class="basisDrugsDetail-detail">
            {{ data.mobile || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-title">疾病基础信息</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">疾病类型</div>
          <div class="basisDrugsDetail-detail">
            {{ data.diabetesType || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">确诊时间</div>
          <div class="basisDrugsDetail-detail">
            {{
              data.confirmedTime
                ? $moment(data.confirmedTime).format('YYYY-MM-DD')
                : '-'
            }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">治疗方式</div>
          <div class="basisDrugsDetail-detail">
            {{ data.therapyMethod || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">胰岛素方案</div>
          <div class="basisDrugsDetail-detail">
            {{ data.insulinRegimen || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">并发症</div>
          <div class="basisDrugsDetail-detail">
            {{ data.complication || '-' }}
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">血糖控制情况</div>
          <div class="basisDrugsDetail-detail">
            {{ data.bloodGlucoseControl || '-' }}
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">糖化血红蛋白</div>
          <div class="basisDrugsDetail-detail">
            {{ data.glycosylatedHemoglobin || '-' }}
            <div class="lookreport" @click="getShowViewer(data.checkReportImg)">
              查看报告
            </div>
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r" />
      </div>
      <div class="basisDrugsDetail-table-title">其他记录</div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
          <div class="basisDrugsDetail-type">用药记录</div>
          <div class="basisDrugsDetail-detail">
            <span class="link-skip" @click="toUserDetail(data.userId, 8)"
              >查看详情</span
            >
          </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type">运动记录</div>
          <div class="basisDrugsDetail-detail">
            <span class="link-skip" @click="toUserDetail(data.userId, 4)"
              >查看详情</span
            >
          </div>
        </div>
      </div>
      <div class="basisDrugsDetail-table-four">
        <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">症状</div>
              <div class="basisDrugsDetail-detail"
              >
                <span>{{ '-' }}</span>
              </div>
        </div>
        <div class="basisDrugsDetail-table-four-r">
          <div class="basisDrugsDetail-type"></div>
          <div class="basisDrugsDetail-detail">
          </div>
        </div>
        <!-- <div class="basisDrugsDetail-table-item-l"
        ></div>
        <div class="basisDrugsDetail-table-item-r"
        style="borderLeft:none;"
        >
        </div> -->
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
              value-format="timestamp"
              type="month"
              placeholder="选择月"
              :clearable="false"
              class="w-130"
              :picker-options="pickerOptions"
              @change="getMedicalInfo(infoTime)"
            />
          </div>
          <BloodSugar :blood-sugar-data="medicalInfoList" />
        </div>
      </div>
    </div>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="urlList"
    />
  </div>
</template>

<script>
import BloodSugar from '../component/bloodSugar';
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'DiabetesManage',
  components: { BloodSugar },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      infoTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      data: {},
      showViewer: false,
      urlList: [],
      medicalInfoList: [],
      serviceRegionState
    };
  },
  created() {
    this.$store
      .dispatch('onlineService/OlgetDiabetesDetail', this.$route.params.id)
      .then(res => {
        this.data = res.data;
        this.getMedicalInfo(new Date().getTime());
        this.infoTime = new Date().getTime();
      });
  },
  methods: {
    linkSkip(obj) {
      if (obj.serviceSourceId) {
        const id = obj.serviceSourceId;
        const source = obj.source;
        const key = Object.keys(obj.serviceRegin)[0];
        if (key === '1') {
          // 激活码
          this.$router.push(`/projectManage/activeCodeManage/details/${id}`);
        } else if (key === '2') {
          // 保单 source 0个险 1团险
          if (source === 0) {
            this.$router.push(`/policyManage/personalPolicy/details/${id}`);
          } else {
            this.$router.push(`/policyManage/groupPolicy/details/${id}`);
          }
        } else if (key === '3') {
          // 星矿
          this.$router.push(`/operateManage/pointsMall/details/${id}`);
        } else if (key === '4') {
          // 首页领取
          return false;
        } else if (key === '5') {
          // 服务包
          this.$router.push(
            `/supplyChainManage/servicePackage/details/${id}/detail`,
          );
        } else if (key === '6') {
          // 券码领取
          this.$router.push(`/marketingTool/interests/detail/${id}`);
        }
      } else {
        return false;
      }
    },
    serviceSource() {
      return `【${
        this.serviceRegionState[
          Object.keys(this.formData.serviceSourceVO.serviceRegin)[0]
        ]
      }】${
        this.formData.serviceSourceVO.serviceSourceId
          ? this.formData.serviceSourceVO.serviceSourceId
          : ''
      }`;
    },
    toUserDetail(id, num) {
      this.$router.push(`/operateManage/userManage/details/${id}/${num}`);
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
    getMedicalInfo(time) {
      this.$store
        .dispatch('userManage/findMedicalInfo', {
          userId: this.data.userId,
          time,
          type: 3
        })
        .then(res => {
          this.medicalInfoList = this.$extends([], res.data);
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
      // height: 48px;
      // display: flex;
      // border: 1px solid #e8e8e8;
      // border-top: none;
      // font-size: 14px;
      // color: #545473;
      // line-height: 48px;
              min-height: 48px;
    height: 100%;
    display: flex;
    border: 1px solid #e8e8e8;
    border-top: none;
    font-size: 14px;
    color: #545473;
      &-l,
      &-r {
        // flex: 1;
        // width: 50%;
        // display: flex;
        // align-items: center;
          flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
        // border-right: 1px solid #e8e8e8;
                  display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
      }
      .basisDrugsDetail-detail {
        // flex: 1;
        // padding: 0 61px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
         display: flex;
        flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-left: 1px solid #ebedf2;
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
          top: 0;
        }
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
}
</style>
