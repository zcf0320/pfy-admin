<template>
<div class="SleepManagementDetail">
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
            data.updateTime
              ? $moment(data.updateTime).format('YYYY-MM-DD')
              : '-'
          }}
        </div>
      </div>
    </div>
    <div class="detail-table-title">服务信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label detail-table-item-label-to">
          用户姓名
        </div>
        <div class="detail-table-item-value">
          {{ data.name }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label detail-table-item-label-to">性别</div>
        <div class="detail-table-item-value">
          {{ data.sex === 1 ? '男' : '女' }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label detail-table-item-label-to">
          年龄
        </div>
        <div class="detail-table-item-value">{{ data.age }}</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label detail-table-item-label-to">身高</div>
        <div class="detail-table-item-value">
          {{ data.height }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label detail-table-item-label-to">
          体重
        </div>
        <div class="detail-table-item-value">{{ data.weight }}</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label detail-table-item-label-to">是否服药</div>
        <div class="detail-table-item-value">{{ data.medicineFlag === 0 ? '否' : '是' }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { serviceRegionState } from '@/utils/enum';
 export default {
  name: 'SleepManagementDetail',
   props: {
    data: {
      type: Object,
      default: () => {
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
  }
 };
</script>
<style lang="scss" scoped>
.SleepManagementDetail{
  .sleepDetails-table{
      width: 99%;
      background: #ffffff;
      box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
      border-radius: 4px;
      margin: 24px auto 0;
  }
    .detail-table-top-title{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    .detail-table-item-value{
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>
