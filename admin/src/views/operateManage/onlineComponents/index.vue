<template>
  <div class="content">
    <el-form label-width="100px" label-position="top">
      <div v-if="formData.baseData.length > 0" class="data-list">
        <div class="title-top content-detail">基础数据</div>
        <div class="data-item">
          <el-row :gutter="20">
            <el-col
              v-for="item in formData.baseData"
              :key="item.label"
              :span="12"
            >
              <el-form-item
                :label="item.label"
                :class="{ 'link-box': item.id !== null }"
                style="width: 400px"
              >
                <div
                  v-if="item.id !== null"
                  class="link-skip"
                  @click="lookDetails(item)"
                >
                  {{ item.value }}
                </div>
                <el-input v-model="item.value" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :class="{ 'link-box': true }"
                label="服务来源"
                style="width: 400px"
              >
                <div
                  :class="{
                    'link-skip': !!formData.serviceSourceVO.serviceSourceId,
                  }"
                  @click="linkSkip(formData.serviceSourceVO)"
                >
                  {{ serviceSource }}
                </div>
                <el-input v-model="serviceSource" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="$isNotEmpty(formData.userDemandVo)" class="data-list">
        <div class="title-top content-detail">服务信息</div>
        <div class="data-item">
          <el-row>
            <el-col :span="34">
              <el-form-item label="">
                <div class="flex">
                  <div>用户资料：</div>
                  <div
                    class="link-skip"
                    @click="skip(formData.userDemandVo.secondTreatmentId)"
                  >
                    点击跳转
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="">
                <div class="flex">
                  <div style="flex-shrink: 0">用户资料：</div>
                  <div>
                    {{ formData.userDemandVo.userDemand }}
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="formData.resultData.length > 0" class="data-list">
        <div class="title-top content-detail">服务信息</div>
        <div class="data-item">
          <el-row :gutter="20">
            <el-col
              v-for="item in formData.resultData"
              :key="item.label"
              :span="12"
            >
              <el-form-item
                :label="item.label"
                :class="{ 'link-box': item.id !== null }"
              >
                <div
                  v-if="item.id !== null"
                  class="link-skip"
                  @click="lookDetails(item)"
                >
                  {{ item.value }}
                </div>
                <el-input v-model="item.value" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="formData.serviceMessage.length > 0" class="data-list">
        <div class="title-top content-detail">服务结果</div>
        <div class="data-item">
          <el-row :gutter="20">
            <el-col
              v-for="item in formData.serviceMessage"
              :key="item.label"
              :span="12"
            >
              <el-form-item
                :label="item.label"
                :class="{ 'link-box': item.id !== null }"
              >
                <div
                  v-if="item.id !== null"
                  class="link-skip"
                  @click="lookDetails(item)"
                >
                  {{ item.value }}
                </div>
                <el-input v-model="item.value" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { serviceRegionState } from '@/utils/enum';
export default {
  name: 'onlineIndex',
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
    }
  },
  methods: {
    // 二次诊疗跳转
    skip(id) {
      let routeData = '';
      routeData = this.$router.resolve({
        path: `/secondaryTreatment/treatments/detail/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    // 查看详情
    lookDetails(item) {
      const vm = this;
      let routeData = '';
      if (item.linkType === 1) {
        // 服务项
        routeData = this.$router.resolve({
          path: `/supplyChainManage/serviceItems/details/${item.id}/detail`
        });
      } else if (vm.linkType === 2) {
        // 服务包
        routeData = this.$router.resolve({
          path: `/supplyChainManage/servicePackage/details/${item.id}/detail`
        });
      } else if (vm.linkType === 3) {
        // 保险公司
        routeData = this.$router.resolve({
          path: `/supplyChainManage/insuranceCompany/details/${item.id}/detail`
        });
      } else if (vm.linkType === 3) {
        // 保险产品
        routeData = this.$router.resolve({
          path: `/supplyChainManage/insuranceProducts/details/${item.id}/detail`
        });
      }
      window.open(routeData.href, '_blank');
    },
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

<style lang="scss" scoped></style>
