<template>
  <div class="AlzheimerDetail">
   <div class="AlzheimerDetail-table">
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
    <div class="detail-table-title">用户信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          姓名:
        </div>
        <div class="detail-table-item-value">
          {{ data.name }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">性别:</div>
        <div class="detail-table-item-value">
          {{ data.sex === 1 ? '男' : '女' }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          年龄:
        </div>
        <div class="detail-table-item-value">{{ data.age }}岁</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">手机号码:</div>
        <div class="detail-table-item-value">
          {{ data.mobile }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          身高:
        </div>
        <div class="detail-table-item-value">{{ data.height }}cm</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">体重:</div>
        <div class="detail-table-item-value">{{ data.weight }}kg</div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          受教育年限:
        </div>
        <div class="detail-table-item-value">
          {{ data.educationYears | educationFormat }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">收缩压:</div>
        <div class="detail-table-item-value">
          {{ data.systolicPressure }}mmHg
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          总胆固醇:
        </div>
        <div class="detail-table-item-value">{{ data.cholesterol }}mmol/L</div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">是否常有体力活动:</div>
        <div class="detail-table-item-value">
          {{ data.manual_labour_flag === 1 ? '是' : '否' }}
        </div>
      </div>
    </div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          是否有家族病史:
        </div>
        <div class="detail-table-item-value">
          {{
            data.familyDiseaseFlag === 1
              ? data.familyDisease && data.familyDisease.toString()
              : '否'
          }}
        </div>
      </div>
      <div class="detail-table-item-right">
        <div class="detail-table-item-label">是否有不良习惯:</div>
        <div class="detail-table-item-value">
          {{
            data.badHabitsFlag === 1
              ? data.badHabits && data.badHabits.toString()
              : '否'
          }}
        </div>
      </div>
    </div>
    <div class="detail-table-title">其他信息</div>
    <div class="detail-table-item">
      <div class="detail-table-item-left">
        <div class="detail-table-item-label">
          用药记录:
        </div>
        <div class="detail-table-item-value">
          <span class="link-skip" @click="toUserDetail(data.userId, 8)"
            >查看详情</span
          >
        </div>
      </div>
       <div class="detail-table-item-right">
        <div class="detail-table-item-label"></div>
        <div class="detail-table-item-value"
        style="borderLeft:none"
        >
        </div>
      </div>
    </div>
      </div>
  </div>
</template>
<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'AlzheimerDetail',
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
    toUserDetail(id, num) {
      this.$router.push(`/operateManage/userManage/details/${id}/${num}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.AlzheimerDetail{
  .AlzheimerDetail-table{
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
  }
}
</style>
