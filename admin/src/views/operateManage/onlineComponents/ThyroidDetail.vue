<template>
  <div>
    <div class="detail-table-title">基础信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          ID:
        </div>
        <div class="detail-table-item-value">
          {{ formData.baseData[0].value }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          服务项:
        </div>
        <div class="detail-table-item-value">
          {{ formData.baseData[1].value }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          服务来源:
        </div>
        <div class="detail-table-item-value">
          <span
            :class="{
              'link-skip': !!formData.serviceSourceVO.serviceSourceId,
              text: true,
            }"
            @click="linkSkip(formData.serviceSourceVO)"
          >
            {{
              formData.serviceSourceVO.serviceRegin
                ? '【' +
                  serviceRegionState[
                    Object.keys(formData.serviceSourceVO.serviceRegin)[0]
                  ] +
                  '】'
                : '-'
            }}{{ formData.serviceSourceVO.serviceSourceId }}
          </span>
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">
          更新时间:
        </div>
        <div class="detail-table-item-value">
          {{
            thyroidDetail.userInfo.lastLoginTime
              ? $moment(thyroidDetail.userInfo.lastLoginTime).format('YYYY-MM-DD')
              : '-'
          }}
        </div>
      </div>
    </div>
     <div class="detail-table-title">服务信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">ID</div>
        <div class="detail-table-item-value">
          {{ thyroidDetail.userInfo.userId || '-' }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">账号</div>
        <div class="detail-table-item-value">
          {{ thyroidDetail.userInfo.mobile || '-' }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">性别</div>
        <div class="detail-table-item-value">
          {{ thyroidDetail.userInfo.sex | sexFormat }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">年龄</div>
        <div class="detail-table-item-value">
          {{ thyroidDetail.userInfo.age || '-' }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">身高</div>
        <div class="detail-table-item-value">{{ thyroidDetail.userInfo.height }}cm</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">体重</div>
        <div class="detail-table-item-value">{{ thyroidDetail.userInfo.weight }}kg</div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">是否有甲状腺疾病</div>
        <div class="detail-table-item-value">
          {{ thyroidDetail.userInfo.thyroidEntryFlag | medicineFormat }}
        </div>
      </div>
      <div class="detail-table-item-right"></div>
    </div>
  </div>
</template>
<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'ThyroidDetail',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    thyroidDetail: {
      type: Object,
      default() {
        return {
            userInfo: {

            }
        };
      }
    }
  },
   data() {
    return {
        serviceRegionState
    };
  }
};
</script>
<style lang="scss" scoped></style>
