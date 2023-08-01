<template>
  <div class="report-interpret-page">
    <div class="leaving-message-info">
      <div class="leaving-message-info-title">基础信息</div>
      <div class="leaving-message-info-item">
        <div class="leaving-message-info-item-l">姓名</div>
        <div class="leaving-message-info-item-r">{{ detail.name || '-' }}</div>
         <div class="leaving-message-info-item-l">性别</div>
        <div class="leaving-message-info-item-r">{{ detail.sex | sex }}</div>
      </div>
      <div class="leaving-message-info-item">
        <div class="leaving-message-info-item-l">手机号</div>
        <div class="leaving-message-info-item-r">
          {{ detail.phoneNum || '-' }}
        </div>
         <template v-for="(item, index) in detail.medicalMenuInfo" >
          <div :key="index" class="leaving-message-info-item-l">套餐</div>
          <div  :key="`套餐${index}`" class="leaving-message-info-item-r">
            {{ item.medicalMenu || '-' }}
          </div>
         </template>
      </div>
      <template v-for="(item, index) in detail.medicalMenuInfo">
        <!-- <div :key="`套餐${index}`" class="leaving-message-info-item">
          <div class="leaving-message-info-item-l">套餐</div>
          <div class="leaving-message-info-item-r">
            {{ item.medicalMenu || '-' }}
          </div>
        </div> -->
        <div :key="`附件${index}`" class="leaving-message-info-item">
          <div class="leaving-message-info-item-l">附件信息</div>
          <div class="leaving-message-info-item-r padd-17">
            <div class="leaving-message-imgs">
              <div
                v-for="(item1, index) in item.medicalAccessory"
                :key="`附件信息${index}`"
                class="leaving-message-imgs-item"
              >
                <el-image :src="item1" :preview-src-list="[item1]" />
              </div>
              <div
                v-if="
                  item.medicalAccessory && item.medicalAccessory.length <= 0
                "
                class="no-img"
              >
                -
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="leaving-message-info">
      <div class="leaving-message-info-title">结果信息</div>
      <div class="report-interpret-table">
        <div class="report-interpret-table-head">
          <div class="flex-1 item">套餐</div>
          <div class="flex-2 item">项目</div>
          <div class="flex-1 item">参考值</div>
          <div class="flex-1 item">实际值</div>
          <div class="flex-2 item">结论</div>
        </div>
        <div
          v-for="(item, index) in detail.medicalResultInfo"
          :key="`结果信息${index}`"
          class="report-interpret-table-item"
        >
          <div class="flex-1 item">{{ item.medicalMenu || '-' }}</div>
          <div class="flex-2 item">{{ item.medicalProject || '-' }}</div>
          <div class="flex-1 item">{{ item.referenceValue || '-' }}</div>
          <div class="flex-1 item">{{ item.actualValue || '-' }}</div>
          <div class="flex-2 item">{{ item.verdict || '-' }}</div>
        </div>
        <div
          v-if="
            detail.medicalResultInfo && detail.medicalResultInfo.length <= 0
          "
          class="empty-img"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportInterpret',
  filters: {
    sex(val) {
      if (val === 1) {
        return '男';
      } else if (val === 0) {
        return '女';
      } else {
        return '-';
      }
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detail: {
        medicalMenuInfo: [],
        medicalResultInfo: []
      }
    };
  },
  created() {
    this.$store
      .dispatch('onlineService/OlgetInterpretDetail', {
        serviceRecordId: this.id
      })
      .then(res => {
        this.detail = res.data || {};
        if (
          this.detail.medicalMenuInfo &&
          this.detail.medicalMenuInfo.length > 0
        ) {
          this.detail.medicalMenuInfo.forEach(item => {
            item.medicalAccessory = item.medicalAccessory
              ? item.medicalAccessory.split(',')
              : [];
          });
        }
      });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.report-interpret-page {
  .leaving-message-info {
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
      // align-items: center;
      &-l {
        // height: 100%;
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
         display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
        //  border-right: 1px solid #ebedf2;
      }
      &-r {
        // flex: 1;
        // min-height: 48px;
        // display: flex;
        // align-items: flex-start;
        // justify-content: center;
        // padding: 4px 61px;
        border-left: 1px solid #e8e8e8;
        // border-right: 1px solid #e8e8e8;
        // flex-direction: column;
          display: flex;
        flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-right: 1px solid #ebedf2;
        &-text {
          line-height: 18px;
          word-break: break-all;
        }
        &-time {
          width: 100%;
          font-size: 14px;
          color: #989ab3;
          line-height: 14px;
          margin-top: 17px;
          text-align: right;
        }
        .leaving-message-imgs {
          display: flex;
          flex-wrap: wrap;
          &-item {
            width: 107px;
            height: 107px;
            background: #e8e8e8;
            border-radius: 4px;
            margin-right: 24px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
        }
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
    .padd-17 {
      padding: 17px 61px;
    }
  }
  .report-interpret-table {
    &-head {
      font-size: 14px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      display: flex;
      box-shadow: 0px 1px 0px 0px #e8e8e8;
      .item {
        padding: 0 16px;
        box-sizing: border-box;
      }
      .flex-1 {
        flex: 1;
      }
      .flex-2 {
        flex: 1;
      }
    }
    &-item {
      font-size: 14px;

      color: #545473;
      line-height: 21px;
      padding: 16px 0;
      display: flex;
      box-shadow: 0px 1px 0px 0px #e8e8e8;
      &:last-of-type {
        box-shadow: none;
      }
      .item {
        padding: 0 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
      .flex-1 {
        flex: 1;
      }
      .flex-2 {
        flex: 1;
      }
    }
  }
}
</style>
