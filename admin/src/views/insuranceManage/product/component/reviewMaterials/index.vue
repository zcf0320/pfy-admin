<template>
  <div class="review-material-page modal-form">
    <div class="tab">
      <div
        :class="['tab-item', tabIndex === 1 && 'tab-active']"
        @click="tabClick(1)"
      >
        保障责任理赔规则
      </div>
      <div
        :class="['tab-item', tabIndex === 2 && 'tab-active']"
        @click="tabClick(2)"
      >
        服务项理赔规则
      </div>
    </div>
    <div v-show="tabIndex === 1">
      <InsurableInterest
        :id="id"
        ref="insurableInterest"
        :post-status="postStatus"
        :step="step"
        :edit="edit"
      />
    </div>
    <div v-show="tabIndex === 2">
      <ServiceItemRule
        :id="id"
        ref="serviceItemsRule"
        :post-status="postStatus"
        :step="step"
        :edit="edit"
      ></ServiceItemRule>
    </div>
    <div v-if="edit === 'edit'" class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        :loading="loading"
        @click.native.prevent="save"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button @click.native.prevent="back()">上一步</el-button>
      <el-popover
        placement="top-start"
        width="250"
        trigger="hover"
        content="请确认服务项规则是否设置"
      >
        <el-button
          slot="reference"
          type="primary"
          :loading="loading"
          @click.native.prevent="save"
          >保存并下一步</el-button
        >
      </el-popover>
    </div>
  </div>
</template>
<script>
import Footer from '../footer';
import ServiceItemRule from './ServiceItemRule.vue';
import { mapActions } from 'vuex';
import InsurableInterest from './insurableInterest';
export default {
  name: 'ReviewMaterials',
  components: {
    Footer,
    ServiceItemRule,
    InsurableInterest
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    step: {
      type: Number,
      default: 5
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      tabIndex: 1
    };
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'createOrUpdateReviewMaterial',
      'getClaimReviewServiceItems'
    ]),
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 4
      });
    },
    // 保存并下一步rules
    async save() {
      const vm = this;
      const promiseArr = [];

      promiseArr.push(vm.$refs.insurableInterest.save());

      promiseArr.push(vm.$refs.serviceItemsRule.save());

      Promise.all(promiseArr)
        .then(() => {
          this.loading = false;
          this.$message.success('保存成功');
          this.$emit('next', {
            activeIndex: 6,
            data: {
              stepState: true
            }
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 查看服务项
    lookServiceItems(id) {
      window.open(
        this.$router.resolve({
          path: `/supplyChainManage/serviceItems/details/${id}/detail`
        }).href,
        '_blank',
      );
    },
    // tab切换
    tabClick(tabIndex) {
      this.tabIndex = tabIndex;
    }
  }
};
</script>
<style lang="scss" scoped>
.review-material-page {
  .tab {
    width: 280px;
    display: flex;
    margin-bottom: 24px;
    border-bottom: 1px solid #ebedf2;
    .tab-item {
      padding: 11px 2px;
      color: #989ab3;
      font-size: 14px;
      cursor: pointer;
      color: #464668;
      display: inline-block;
      &:first-child {
        margin-right: 60px;
      }
    }
    .tab-active {
      color: #3599fe;
      font-weight: 500;
      border-bottom: 2px solid #3599fe;
    }
  }
  .review-material-content {
    .tittle {
      color: #464668;
      font-weight: 500;
    }
    .service-item {
      .service-name {
        margin-bottom: 32px;
        font-weight: 500;
        span {
          color: #464668;
          font-size: 16px;
        }
        & > span:last-child {
          color: #464668;
          margin-left: 12px;
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: #3599fe;
          }
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
