<template>
  <div class="risk-factors page-form modal-form">
    <div class="title-top content-detail">测算因子</div>
    <el-form
      ref="baseForm"
      :model="baseForm"
      label-width="200px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="被保险人风险状况系数">
            <el-select
              v-model="baseForm.insuredRiskFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择被保险人风险状况系数"
              class="select"
            >
              <el-option
                v-for="item in riskProfile"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售区域系数">
            <el-select
              v-model="baseForm.saleAreaFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择销售区域系数"
              class="select"
            >
              <el-option
                v-for="item in saleAreaFactor"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风险管理水平系数">
            <el-select
              v-model="baseForm.manageRiskFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择风险管理水平系数"
              class="select"
            >
              <el-option
                v-for="item in riskProfile"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="被保险人或渠道预期投保人数（仅限于团体或渠道业务) "
          >
            <el-select
              v-model="baseForm.insuredNumber"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择被保险人或渠道预期投保人数"
              class="select"
            >
              <el-option
                v-for="item in riskProfile"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="政府合作或行业性业务系数">
            <el-select
              v-model="baseForm.industryFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择政府合作或行业性业务系数"
              class="select"
            >
              <el-option
                v-for="item in riskProfile"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司目标客户优惠系数">
            <el-select
              v-model="baseForm.preferentialFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择公司目标客户优惠系数"
              class="select"
            >
              <el-option
                v-for="item in preferentialFactor"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道系数">
            <el-select
              v-model="baseForm.channelFactor"
              :disabled="!!id && postStatus !== 107"
              placeholder="请选择渠道系数"
              class="select"
            >
              <el-option
                v-for="item in channelFactor"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!id" class="footer">
      <el-button @click.native.prevent="back">上一步</el-button>
      <el-button type="primary" @click.native.prevent="next()"
        >下一步</el-button
      >
    </div>
    <div v-else class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="save()"
        >保存</el-button
      >
      <!-- 状态改变组件 -->
      <Footer :id="id" :post-status="postStatus" />
    </div>
  </div>
</template>
<script>
import {
  riskProfile,
  saleAreaFactor,
  preferentialFactor,
  channelFactor
} from './config';
import Footer from '../footer';
export default {
  name: 'RiskFactors',
  components: {
    Footer
  },
  props: {
    baseForm: {
      type: Object,
      default: () => ({
        channelFactor: 1,
        industryFactor: 1,
        insuredNumber: 1,
        insuredRiskFactor: 1,
        manageRiskFactor: 1,
        preferentialFactor: 1,
        saleAreaFactor: 1
      })
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {
      isShow: false,
      riskProfile,
      saleAreaFactor,
      preferentialFactor,
      channelFactor,
      type: true
    };
  },
  computed: {},
  created() {},
  methods: {
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 2
      });
    },
    // 下一步
    next() {
      this.$emit('next', {
        activeIndex: 4
      });
    },
    // 保存
    save() {
      this.$store
        .dispatch('guaranteePower/updateCalculatingFactor', {
          calculatingFactor: {
            ...this.baseForm
          },
          id: this.id
        })
        .then(res => {
          if (!res.code) {
            this.$message.success('更新测算因子成功');
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.risk-factors {
  width: 100%;
  .el-select {
    width: 100%;
  }
}
</style>
