<template>
  <div class="insurable-interest">
    <div class="review-material-content">
      <div class="nav-list">
        <div
          :class="['nav-name', active === index ? 'active' : '']"
          v-for="(item, index) in reviewMaterials"
          :key="index"
          @click="jumpItems(index)"
        >
          服务项{{ index + 1 }}
        </div>
      </div>
      <div class="service-content">
        <div
          v-for="(item, index) in reviewMaterials"
          :key="index"
          class="service-items"
        >
          <div class="service-name">
            <span @click="lookServiceItems(item.serviceInfoId)">{{
              item.serviceInfoName
            }}</span>
          </div>
          <div class="review-form">
            <ReviewPlanForm
              :id="id"
              :ref="'serviceItemsRuleForm' + index"
              :post-status="postStatus"
              :ref-name="'serviceItemsRuleForm' + index"
              :form="item"
              :index="index"
              :edit="edit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReviewPlanForm from './reviewPlanForm';
import { mapActions } from 'vuex';
export default {
  name: 'ServiceItemRule',
  components: {
    ReviewPlanForm
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
      reviewMaterials: [],
      active: 0
    };
  },
  created() {
    this.getClaimReviewServiceItems({
      productId: this.id
    }).then(res => {
      if (res.data) {
        res.data.forEach(item => {
          if (!item.materials) {
            item.materials = [];
          }
          if (!item.medicalList) {
            item.medicalList = [];
          }
        });
        this.reviewMaterials = res.data;
      }
    });
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getClaimReviewServiceItems',
      'createOrUpdateReviewMaterial'
    ]),
    jumpItems(i) {
      this.active = i;
      document.getElementsByClassName('service-items')[i].scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start'
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
    // 保存
    async save() {
      const vm = this;
      const promiseArr = [];
      vm.reviewMaterials.forEach((item, index) => {
        if (item.hasReview) {
          promiseArr.push(
            vm.$refs[`serviceItemsRuleForm${index}`][0].getFormData(
              `serviceItemsRuleForm${index}`,
            ),
          );
        } else {
          promiseArr.push(Promise.resolve());
        }
      });

      await new Promise((resolve, reject) => {
        Promise.all(promiseArr)
          .then(() => {
            vm.loading = true;
            vm.reviewMaterials.forEach(item => {
              item.productId = vm.id;
            });
            vm.createOrUpdateReviewMaterial({
              id: vm.id,
              reviewMaterials: vm.reviewMaterials
            })
              .then(() => {
                this.loading = false;
                resolve();
              })
              .catch(() => {
                reject();
                vm.loading = false;
              });
          })
          .catch(err => {
            reject();
            vm.$message.error(err);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.insurable-interest {
  height: 100%;
  .review-material-content {
    display: flex;
    .nav-list {
      width: 66px;
      height: 100%;
      margin-right: 32px;
      border-right: 1px solid #ebedf2;
      .nav-name {
        font-size: 16px;
        font-weight: 400;
        color: #464668;
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
        cursor: pointer;
        &.active {
          font-size: 16px;
          font-weight: 500;
          color: #3599fe;
          border-right: 1px solid #3599fe;
        }
      }
    }

    .service-content {
      width: 800px;
      max-height: 500px;
      overflow: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .service-items {
      padding: 0;
      .service-name {
        margin-bottom: 24px;
        span {
          color: #464668;
          font-size: 20px;
          font-weight: 500;

          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: #3599fe;
          }
        }
      }
    }
  }
}
</style>
