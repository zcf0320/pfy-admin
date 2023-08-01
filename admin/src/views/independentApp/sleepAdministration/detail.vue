<template>
  <div class="basisDrugsDetail">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-if="activeName === '0'" class="basisDrugsDetail-table">
              <div class="basisDrugsDetail-table-title">基础信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">姓名</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.name || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">身高</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.height || '-' }}cm
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.id || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">体重</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.weight || '-' }}kg
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">性别</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.sex | sexFormat }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">年龄</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.age || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">手机号码</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.mobile || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">想要达成目标</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.target || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">是否服用辅助药物</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.medicineFlag | medicineFormat }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r" />
              </div>
            </div>
            <div v-if="activeName === '1'">
              <CbtiSleepDiary
                :detail="sleepNoteInfo"
                @changeTime="getSleepNote"
              ></CbtiSleepDiary>
            </div>
            <div v-if="activeName === '2'">
              <CbtiQuestionnaireRecord
                :tableLoading="tableLoading"
                :dataList="dataList"
                :pagingOptions="pagingOptions"
              ></CbtiQuestionnaireRecord>
            </div>
            <div v-if="activeName === '3'">
              <CbtiPunchRecord
                id="punchRecord"
                :chartData="dataLine"
                @dateChange="getChartData"
              ></CbtiPunchRecord>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { operationType, menuType } from '@/utils/enum';
import useRecord from '@/api/useRecord';
export default {
  name: 'SleepDetail',
  data() {
    return {
      operationType,
      menuType,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '睡眠日记' },
        {
          value: '3',
          name: '打卡记录'
        },
        { value: '2', name: '测试问卷' }
      ],
      activeName: '0',
      time: '',
      userInfo: {},
      sleepNoteInfo: {},
      tableLoading: false,
      dataList: [],
      pagingOptions: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      dataLine: {
        xAxisData: [],
        axisLabel: {
          interval: 0,
          rotate: 65,
          textStyle: {
            color: '#666666'
          }
        },
        tooltip: {
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          backgroundColor: '#545454'
        },
        yAxisLabel: {
          formatter: '{value}h',
          textStyle: {
            color: '#666666'
          }
        },
        series: [
          {
            lineStyle: {
              color: '#3599FE'
            },

            type: 'line',
            data: []
          }
        ]
      }
    };
  },
  created() {
    useRecord
      .getSleepManageDetail({ userId: this.$route.params.id })
      .then(res => {
        this.userInfo = res.data;
      });
  },
  methods: {
    // tab切换
    handleClick(tab) {
      this.activeName = tab;
      if (tab === '1') {
        this.getSleepNote();
      }
      if (tab === '2') {
        this.getQuestionList();
      }
      if (tab === '3') {
        this.getChartData();
      }
    },
    // 获取睡眠日记
    getSleepNote(val) {
      if (val) {
        this.time = this.$moment(val).format('YYYY-MM-DD');
      } else {
        this.time = this.$moment(new Date().getTime()).format('YYYY-MM-DD');
      }

      useRecord
        .getSleepRecordByUser({
          userId: this.$route.params.id,
          date: this.time
        })
        .then(res => {
          this.sleepNoteInfo = res.data;
        });
    },
    getQuestionList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize,
        userId: this.$route.params.id
      };
      useRecord.getQuestionResultByUser(params).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.records || [];
        this.pagingOptions.total = res.data.totalNum;
      });
    },
    getChartData(val) {
        const params = {
 userId: this.$route.params.id
        };
        if (val && val.length) {
            params['startDate'] = val[0];
            params['endDate'] = val[1];
        }
      useRecord
        .getPunchRecord(params)
        .then(res => {
          const date = [];
          const series = [];
          res.data.forEach(item => {
            date.push(this.$moment(item.sleepDate).format('YYYY-MM-DD'));
            series.push(item.sleepTime);
          });
          this.dataLine.xAxisData = date;
          this.dataLine.series[0].data = series;
        });
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

  .ml-12 {
    margin-left: 12px;
  }
}
</style>
