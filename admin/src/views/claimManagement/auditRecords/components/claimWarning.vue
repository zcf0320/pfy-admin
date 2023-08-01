<template>
  <div class="claimWarning-page">
    <div class="claimWarning-top">智能核赔预警</div>
    <div class="claimWarning-content">
      <div class="claimWarning-info">
        <div>
          <span>被保险人：</span
          ><span class="ml-17">{{
            visibleWarningData.insuredName || '-'
          }}</span>
        </div>
        <div>
          <span>确诊疾病：</span
          ><span class="ml-17">{{
            visibleWarningData.diagnoseResult || '-'
          }}</span>
        </div>
        <div>
          <span>就诊医院：</span
          ><span class="ml-17"
            >{{ visibleWarningData.hospital || '-'
            }}{{
              visibleWarningData.hospitalLevel
                ? '(' + visibleWarningData.hospitalLevel + ')'
                : ''
            }}</span
          >
        </div>
        <div>
          <span>就诊科室：</span
          ><span class="ml-17">{{ visibleWarningData.department || '-' }}</span>
        </div>
        <div>
          <span>就诊时间：</span
          ><span class="ml-17">{{
            visibleWarningData.treatmentDate
              ? $moment(visibleWarningData.treatmentDate).format('YYYY-MM-DD')
              : '-'
          }}</span>
        </div>
        <div>
          <span>自费金额：</span
          ><span class="ml-17">{{
            visibleWarningData.totalPrice
              ? visibleWarningData.totalPrice.toFixed(2)
              : '-'
          }}</span>
        </div>
      </div>
      <div class="claimWarning-detail">
        <div class="claimWarning-detail-title">异常情况</div>
        <div
          v-if="
            visibleWarningData.warnInfos && visibleWarningData.warnInfos.length
          "
          class="claimWarning-detail-list"
        >
          <div class="data-from">数据来源：C端用户上传</div>
          <div v-for="item in visibleWarningData.warnInfos" :key="item.warnId">
            <span :class="claimWarnTypeClass[item.warnType]"
              >【{{ claimWarnType[item.warnType] }}】</span
            >
            <span v-if="item.remark" class="ml-10">
              {{ item.warnContent0 || '' }}
              <span
                v-for="(ele, index) in item.remark"
                :key="index"
                class="drug"
                @click="
                  toDurg(
                    ele.itemName,
                    ele.medicineSpec,
                    item.warnId,
                    visibleWarningData.hospital,
                  )
                "
                >“{{ ele.itemName }}”</span
              >
              {{ item.warnContent1 || '' }}
            </span>
            <span v-else class="ml-10" v-html="item.warnContent" />
          </div>
        </div>
        <div
          v-if="
            visibleWarningData.warnInfosByB &&
              visibleWarningData.warnInfosByB.length
          "
          class="claimWarning-detail-list"
        >
          <div class="data-from">数据来源：后台核赔人员录入</div>
          <div
            v-for="item in visibleWarningData.warnInfosByB"
            :key="item.warnId"
          >
            <span :class="claimWarnTypeClass[item.warnType]"
              >【{{ claimWarnType[item.warnType] }}】</span
            >
            <span v-if="item.remark" class="ml-10">
              {{ item.warnContent0 || '' }}
              <span
                v-for="(ele, index) in item.remark"
                :key="index"
                class="drug"
                @click="
                  toDurg(
                    ele.itemName,
                    ele.medicineSpec,
                    item.warnId,
                    visibleWarningData.hospital,
                  )
                "
                >“{{ ele.itemName }}”</span
              >
              {{ item.warnContent1 || '' }}
            </span>
            <span v-else class="ml-10" v-html="item.warnContent" />
          </div>
        </div>
      </div>
      <div class="claimWarning-remarks">
        <div class="claimWarning-remarks-title">备注</div>
        <el-input
          v-model="remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注内容"
          :disabled="remarkState"
          maxlength="100"
        />
        <button type="button" class="btn-exit fr" @click="saveRemark">
          {{ remarkState ? '修改' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { claimWarnType, claimWarnTypeClass } from '@/utils/enum';
export default {
  name: 'ClaimWarning',
  props: {
    visibleWarningData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      remark: '',
      claimWarnType,
      claimWarnTypeClass,
      remarkState: false
    };
  },
  watch: {
    visibleWarningData() {
      this.changeData();
      this.remark = this.visibleWarningData.description;
      if (this.remark) {
        this.remarkState = true;
      } else {
        this.remarkState = false;
      }
    }
  },
  created() {
    this.changeData();
    this.remark = this.visibleWarningData.description;
    if (this.remark) {
      this.remarkState = true;
    } else {
      this.remarkState = false;
    }
  },
  methods: {
    toDurg(name, type, id, hospitalName) {
      const params = {
        medicineName: name,
        medicineSpec: type,
        year: '',
        platform: '',
        hospitalName
      };
      localStorage.setItem('drugMonitor', JSON.stringify(params));
      const routeData = this.$router.resolve({
        path: '/dataDictionary/drugMonitor/drugMonitorDetail'
      });
      window.open(routeData.href, '_blank');
    },
    // 数据处理
    changeData() {
      if (this.visibleWarningData.warnInfos) {
        this.visibleWarningData.warnInfos.forEach(item => {
          if (item.remark) {
            const remarkArr = JSON.parse(item.remark);
            this.$set(item, 'remark', remarkArr);
            const arr = item.warnContent.split('[]');
            this.$set(item, 'warnContent0', arr[0]);
            this.$set(item, 'warnContent1', arr[1]);
          }
        });
      }
      if (this.visibleWarningData.warnInfosByB) {
        this.visibleWarningData.warnInfosByB.forEach(item => {
          if (item.remark) {
            const remarkArr = JSON.parse(item.remark);
            this.$set(item, 'remark', remarkArr);
            const arr = item.warnContent.split('[]');
            this.$set(item, 'warnContent0', arr[0]);
            this.$set(item, 'warnContent1', arr[1]);
          }
        });
      }
    },
    // 保存备注
    saveRemark() {
      if (this.remarkState) {
        this.remarkState = false;
        return;
      }
      if (!this.remark) {
        this.$message({
          type: 'warning',
          message: '请填写备注信息'
        });
        return;
      }
      this.$store
        .dispatch('auditRecords/setClaimRemark', {
          description: this.remark,
          id: this.$route.params.id
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          this.remarkState = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.claimWarning-page {
  width: 417px;
  max-height: 530px;
  background: #ffffff;
  box-shadow: 0px 0px 11px 0px rgba(204, 204, 204, 0.5);
  border-radius: 4px;
  padding: 0 29px 24px 29px;
  display: flex;
  flex-direction: column;
  .claimWarning-top {
    padding: 30px 0;
    box-shadow: 0px 1px 0px 0px #ebedf2;
    font-size: 18px;

    font-weight: 600;
    color: #464668;
    line-height: 18px;
  }
  .claimWarning-content {
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .claimWarning-info {
      padding: 24px 0;
      box-shadow: 0px 1px 0px 0px #ebedf2;
      > div {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      span {
        font-size: 14px;

        font-weight: 400;
        color: #333333;
        line-height: 14px;
        vertical-align: top;
        line-height: 21px;
        &.ml-17 {
          margin-left: 17px;
          max-width: 260px;
          display: inline-block;
        }
      }
    }
    .claimWarning-detail {
      padding: 24px 0;
      box-shadow: 0px 1px 0px 0px #ebedf2;
      .claimWarning-detail-title {
        font-size: 14px;

        font-weight: bold;
        color: #464668;
        line-height: 14px;
        text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
      }
      .claimWarning-detail-list {
        padding: 12px 0;
        .data-from {
          font-size: 14px;
          color: #464668;
          margin-top: 5px;
          font-weight: bold;
        }
        > div {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        span {
          font-size: 14px;

          font-weight: 400;
          color: #333333;
          vertical-align: top;
          line-height: 21px;
          &.ml-10 {
            margin-left: 10px;
            max-width: 260px;
            display: inline-block;
            .drug {
              color: #3599fe;
              cursor: pointer;
            }
          }
          &.drugs {
            color: #3599fe;
          }
          &.claimWarning-danger {
            color: #f64e60;
            text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
          }
          &.claimWarning-warning {
            color: #ffa800;
            text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
          }
          &.claimWarning-primary {
            color: #18c4bd;
            text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
          }
        }
      }
    }
    .claimWarning-remarks {
      padding-top: 24px;
      margin-bottom: 12px;
      .claimWarning-remarks-title {
        font-size: 14px;

        font-weight: 400;
        color: #464668;
        line-height: 14px;
        text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
        margin-bottom: 12px;
      }
      button {
        margin-top: 20px;
      }
    }
  }
}
</style>
