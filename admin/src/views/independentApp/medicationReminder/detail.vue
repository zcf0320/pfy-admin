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
               <div class="medicationDetails-table">
                   <div class="basisDrugsDetail-table-title">基础信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ infoData.serialNumber || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">手机号码</div>
                  <div class="basisDrugsDetail-detail">
                    {{ infoData.mobile || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">渠道ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ infoData.channelCode || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">渠道名称</div>
                  <div class="basisDrugsDetail-detail">
                    {{ infoData.channelName || '-' }}
                  </div>
                </div>
              </div>
               </div>
              <ClassTable />
            </div>
            <div v-show="activeName == '1'" class="log-items">
              <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.creator }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation] }}
                    {{ menuType[item.type] }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import useRecord from '@/api/useRecord';
import ClassTable from '../component/classTable.vue';
import { operationType, menuType } from '@/utils/enum';
export default {
  name: 'SleepDetail',
  components: {
    ClassTable
  },
  data() {
    return {
      operationType,
      menuType,
      btns: [
        { value: '0', name: '用药计划' },
        { value: '1', name: '操作日志' }
      ],
      mainLoading: true,
      activeName: '0',
      infoData: {},
      logList: []
    };
  },
  created() {
    useRecord
      .getMedicationPlanDetail({
        id: this.$route.params.id,
        pageNum: 1,
        pageSize: 1
      })
      .then(res => {
        this.infoData = res.data.records[0];
        this.mainLoading = false;
      });
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      if (tab === '1') {
        vm.$store
          .dispatch('app/getSysLogsFe', {
            id: this.$route.params.id,
            type: 108
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.basisDrugsDetail {
  .basisDrugsDetail-table {
    // box-shadow: 0px 0px 2px 2px #e8e8e8;
    margin-bottom: 20px;
    .medicationDetails-table {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    }
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
  .select-time {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    margin-right: 12px;
  }
  .ml-12 {
    margin-left: 12px;
  }
  .sleep-result {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    &-green {
      width: 68px;
      height: 38px;
      background: #c9f7f4;
      border-radius: 4px;
      border: 1px solid #18c4bd;
      font-size: 14px;

      font-weight: 400;
      color: #18c4bd;
      line-height: 38px;
      margin-left: 24px;
      text-align: center;
      cursor: pointer;
    }
    &-blue {
      width: 68px;
      height: 38px;
      background: #c9f7f4;
      border-radius: 4px;
      border: 1px solid #3599fe;
      font-size: 14px;

      font-weight: 400;
      color: #3599fe;
      line-height: 38px;
      margin-left: 24px;
      text-align: center;
      cursor: pointer;
    }
    &-red {
      width: 68px;
      height: 38px;
      background: #c9f7f4;
      border-radius: 4px;
      border: 1px solid #f64e60;
      font-size: 14px;

      font-weight: 400;
      color: #f64e60;
      line-height: 38px;
      margin-left: 24px;
      text-align: center;
      cursor: pointer;
    }
  }
  .userRecordDetail-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .userRecordDetail-item {
      width: calc(50% - 15px);
      margin-bottom: 24px;
      &-title {
        font-size: 14px;
        color: #464668;
        line-height: 14px;
        margin-bottom: 12px;
        .health-tip {
          font-size: 14px;
          color: #3599fe;
          line-height: 14px;
          float: right;
          cursor: pointer;
        }
      }
      &-content {
        width: 100%;
        height: 38px;
        background: #f3f7ff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 0 18px;
        font-size: 14px;
        color: #464668;
        line-height: 38px;
        &.height {
          display: flex;
          align-items: center;
          line-height: 18px;
          padding: 13px 18px;
        }
      }
      &-contentH {
        width: 100%;
        background: #f3f7ff;
        border-radius: 4px;
        font-size: 14px;
        color: #464668;
        line-height: 38px;
        display: flex;
        align-items: center;
        line-height: 18px;
        padding: 11px 18px;
      }
      &.long {
        width: 100%;
      }
    }
  }
}
</style>
