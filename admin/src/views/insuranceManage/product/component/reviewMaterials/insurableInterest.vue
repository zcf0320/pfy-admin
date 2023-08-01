<template>
  <div class="insurable-interest">
    <div class="review-material-content">
      <div class="nav-list">
        <div
          :class="['nav-name', active === index ? 'active' : '']"
          v-for="(item, index) in configRequestList"
          :key="index"
          @click="jumpItems(index)"
        >
          责任{{ index + 1 }}
        </div>
      </div>
      <div class="service-content">
        <div
          v-for="(item, index) in configRequestList"
          :key="index"
          class="service-item"
        >
          <div class="service-name">
            <span>{{ item.protectRightsType === 158 ? '主险' : '附险' }}:</span>
            <span @click="lookDetails(item.protectRightsId)">{{
              item.protectRightsName
            }}</span>
          </div>
          <div class="review-form">
            <ReviewPlanForm
              :id="id"
              :ref="'insurableInterestForm' + index"
              :post-status="postStatus"
              :ref-name="'insurableInterestForm' + index"
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
  name: 'InsurableInterest',
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
      configRequestList: [],
      active: 0
    };
  },
  created() {
    this.getInsurableInterest();
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'getRightClaimConfigs',
      'saveRightClaimConfigs'
    ]),
    // 保存
    async save() {
      const vm = this;
      const promiseArr = [];
      vm.configRequestList.forEach((item, index) => {
        if (item.hasReview) {
          promiseArr.push(
            vm.$refs[`insurableInterestForm${index}`][0].getFormData(
              `insurableInterestForm${index}`,
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
            vm.configRequestList.forEach(item => {
              item.productId = vm.id;
            });
            vm.saveRightClaimConfigs(vm.configRequestList)
              .then(() => {
                vm.loading = false;
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
    },
    // 获取保险权益数据
    getInsurableInterest() {
      this.getRightClaimConfigs({
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
          item.diseaseFlag = item.diseaseFlag || 0;
        });

        this.configRequestList = res.data;
        }
      });
    },
    // 查看详情
    lookDetails(id) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/guaranteePower/guaranteePowerDetails/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    jumpItems(i) {
      this.active = i;
      document.getElementsByClassName('service-item')[i].scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start'
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
      width: 60px;
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
    .tittle {
      color: #464668;
      font-weight: 500;
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
    .service-item {
      padding: 0;
      .service-name {
        margin-bottom: 24px;
        span {
          color: #464668;
          font-size: 20px;
          font-weight: 500;
        }
        & > span:last-child {
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
