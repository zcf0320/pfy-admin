<template>
  <div class="online-examine">
   <div class="examineDetails-table">
    <div class="detail-table-title">基础信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          ID:
        </div>
        <div class="detail-table-item-value">
          {{ detail.id }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          服务名称:
        </div>
        <div class="detail-table-item-value">
          {{ detail.serviceTypeName }}
        </div>
      </div>
    </div>

    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          申请人姓名:
        </div>
        <div class="detail-table-item-value">
          {{ detail.name }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          手机号码:
        </div>
        <div class="detail-table-item-value">{{ detail.mobile }}</div>
      </div>
    </div>

    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          身份证号:
        </div>
        <div class="detail-table-item-value">{{ detail.idCard }}</div>
      </div>

      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          邮箱:
        </div>
        <div class="detail-table-item-value">{{ detail.email }}</div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          审核状态:
        </div>
        <div class="detail-table-item-value">{{ state }}</div>
      </div>

      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          服务来源:
        </div>
        <div
          class="detail-table-item-value"
          :class="{
            'link-skip': !!formData.serviceSourceVO.serviceSourceId,
          }"
          @click="linkSkip(formData.serviceSourceVO)"
        >
          {{ serviceSource }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          审核不通过原因:
        </div>
        <div class="detail-table-item-value">{{ detail.remark }}</div>
      </div>

      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          用户诉求:
        </div>
        <div class="detail-table-item-value">{{ detail.userDemand }}</div>
      </div>
    </div>

    <div v-if="$isNotEmpty(detail.feedbackPic)">
      <div class="detail-table-title">服务结果</div>
      <div class="detail-table-item">
        <el-image
          style="width: 200px; height: 150px"
          :src="detail.feedbackPic"
          :preview-src-list="[detail.feedbackPic]"
        />
      </div>
    </div>
      </div>
  </div>
</template>

<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'examineDetail',
  filters: {
    formatSex(val) {
      if (val) {
        if (val === 1) {
          return '男';
        } else {
          return '女';
        }
      } else {
        return '-';
      }
    }
  },
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      serviceRegionState
    };
  },
  computed: {
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
    state() {
      return this.$enums['secondaryTreatmentState'][this.detail.state];
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.online-examine {
  .examineDetails-table{
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
  }
  .source {
    flex-direction: column;
    height: 48px;
    justify-content: space-between;
  }
  .div {
    margin-bottom: 30px;
  }
}
</style>
