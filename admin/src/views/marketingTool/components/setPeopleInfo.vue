<template>
  <div class="set-peopleInfo-page">
    <div class="peopleInfo-l">
      <div class="peopleInfo-l-title">
        个人信息设置
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">是否需要手机号验证：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group
            v-model="peopleInfo.needVerify"
            :disabled="putOnState"
          >
            <el-radio :label="1">需要</el-radio>
            <el-radio :label="0">不需要</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-show="peopleInfo.needVerify" class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">验证节点：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group
            v-model="peopleInfo.verifyNode"
            :disabled="putOnState"
          >
            <el-radio :label="1">问卷开始前</el-radio>
            <el-radio :label="0">展示结果前</el-radio>
            <el-radio :label="2">展示结果后</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-title">
        是否收集个人信息
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">姓名：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.name" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">性别：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.sex" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">年龄：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.age" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">手机号：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.mobile" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">职业：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.job" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">地区：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.area" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">身份证：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.idCard" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="peopleInfo-l-item">
        <div class="peopleInfo-l-item-l">邮箱：</div>
        <div class="peopleInfo-l-item-r">
          <el-radio-group v-model="peopleInfo.email" :disabled="putOnState">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="0">不展示</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="peopleInfo-r">
      <div v-show="showPhone" class="peopleInfo-r-title">
        预览
      </div>
      <div v-show="showPhone" class="peopleInfo-r-phone">
        <div class="peopleInfo-r-phone-top" />
        <div class="peopleInfo-r-phone-nav">
          <div class="peopleInfo-r-phone-nav-l" />
          <div class="peopleInfo-r-phone-nav-r">主标题</div>
        </div>
        <div
          v-if="pageState"
          v-show="peopleInfo.needVerify"
          class="peopleInfo-r-phone-content"
        >
          <div class="peopleInfo-r-phone-content-title">主标题</div>
          <div :class="imgClass[peopleInfo.verifyNode]" />
          <div
            v-show="showPeopleInfo"
            class="peopleInfo-r-phone-content-left"
            @click="changePage"
          />
          <div
            v-show="showPeopleInfo"
            class="peopleInfo-r-phone-content-right"
            @click="changePage"
          />
        </div>
        <div v-else v-show="showPeopleInfo" class="peopleInfo-r-phone-content">
          <div class="peopleInfo-r-phone-content-title">主标题</div>
          <div class="peopleInfo-r-phone-content-info">
            <div>
              <div class="peopleInfo-r-phone-content-info-title">个人信息</div>
              <div
                v-if="peopleInfo.name"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">姓名</div>
                <div class="content">张三</div>
              </div>
              <div
                v-if="peopleInfo.sex"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">性别</div>
                <div class="content">女</div>
              </div>
              <div
                v-if="peopleInfo.age"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">年龄</div>
                <div class="content">10</div>
              </div>
              <div
                v-if="peopleInfo.mobile"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">手机号</div>
                <div class="content">10000000000</div>
              </div>
              <div
                v-if="peopleInfo.job"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">职业</div>
                <div class="content">职业</div>
              </div>
              <div
                v-if="peopleInfo.area"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">地区</div>
                <div class="content">上海</div>
              </div>
              <div
                v-if="peopleInfo.idCard"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">身份证号</div>
                <div class="content">000000000000000000</div>
              </div>
              <div
                v-if="peopleInfo.email"
                class="peopleInfo-r-phone-content-info-item"
              >
                <div class="name">邮箱</div>
                <div class="content">xxx@xxx.com</div>
              </div>
              <div class="peopleInfo-r-phone-content-info-btn">立即开始</div>
            </div>
          </div>
          <div
            v-show="peopleInfo.needVerify"
            class="peopleInfo-r-phone-content-left"
            @click="changePage"
          />
          <div
            v-show="peopleInfo.needVerify"
            class="peopleInfo-r-phone-content-right"
            @click="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetPeopleInfo',
  props: {
    peopleInfo: {
      type: Object,
      default: () => ({
        age: 0,
        email: 0,
        sex: 1,
        idCard: 0,
        name: 1,
        needVerify: 0,
        questionnaireId: 0,
        mobile: 0,
        verifyNode: 0,
        job: 0,
        area: 0
      })
    },
    putOnState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageState: 0,
      showPhone: true,
      showPeopleInfo: true,
      imgClass: [
        'peopleInfo-r-phone-content-s',
        'peopleInfo-r-phone-content-e',
        'peopleInfo-r-phone-content-ee'
      ]
    };
  },
  watch: {
    peopleInfo: {
      handler(val) {
        if (!val.needVerify) {
          this.pageState = 0;
        }
        if (
          val.age ||
          val.email ||
          val.sex ||
          val.idCard ||
          val.name ||
          val.needVerify ||
          val.mobile
        ) {
          this.showPhone = true;
        } else {
          this.showPhone = false;
        }
        if (
          val.age ||
          val.email ||
          val.sex ||
          val.idCard ||
          val.name ||
          val.mobile
        ) {
          this.showPeopleInfo = true;
          this.pageState = 0;
        } else {
          this.showPeopleInfo = false;
          this.pageState = 1;
        }
      },
      deep: true
    }
  },
  methods: {
    changePage() {
      this.pageState = this.pageState ? 0 : 1;
    },
    toNext() {
      this.$emit('setSecond', this.peopleInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.set-peopleInfo-page {
  display: flex;
  justify-content: space-between;
  .peopleInfo-l {
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #464668;
      line-height: 18px;
      margin-bottom: 24px;
    }
    &-item {
      display: flex;
      margin-bottom: 24px;
      &-l {
        font-size: 16px;

        color: #464668;
        line-height: 16px;
        width: 184px;
      }
    }
  }
  .peopleInfo-r {
    width: 375px;
    margin-right: 2px;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #464668;
      line-height: 18px;
      margin-bottom: 24px;
    }
    &-phone {
      overflow: hidden;
      width: 100%;
      box-shadow: 0px 0px 6px 0px rgba(204, 204, 204, 0.5);
      &-top {
        height: 20px;
        background: url('../../../assets/questionnaire/notice.png') no-repeat;
        background-size: 100% 100%;
      }
      &-nav {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        &-l {
          width: 16px;
          height: 16px;
          background: url('../../../assets/questionnaire/goback.png') no-repeat;
          background-size: 100% 100%;
        }
        &-r {
          flex: 1;
          text-align: center;
          margin-right: 30px;
          font-size: 16px;

          font-weight: bold;
          color: #333333;
          line-height: 22px;
          text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
        }
      }
      &-content {
        width: 100%;
        height: 603px;
        background-color: #0e937b;
        position: relative;
        cursor: pointer;
        &-title {
          font-size: 32px;

          font-weight: bold;
          color: #ffffff;
          line-height: 32px;
          text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
          padding-top: 32px;
          text-align: center;
        }
        &-info {
          width: 304px;
          max-height: 422px;
          background: #ffffff;
          box-shadow: 0px 0px 6px 0px rgba(204, 204, 204, 0.5);
          border-radius: 6px;
          padding: 16px;
          position: absolute;
          top: 107px;
          left: 50%;
          transform: translateX(-50%);
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }
          &-title {
            font-size: 16px;

            font-weight: 500;
            color: #333333;
            line-height: 16px;
            text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
            text-align: center;
            margin-bottom: 15px;
          }
          &-item {
            width: 272px;
            height: 48px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name,
            .content {
              font-size: 14px;

              color: #333333;
              line-height: 20px;
              text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
            }
          }
          &-btn {
            width: 256px;
            height: 40px;
            background: #0e937b;
            box-shadow: 0px 0px 6px 0px rgba(204, 204, 204, 0.5);
            border-radius: 20px;
            text-align: center;
            font-size: 14px;

            font-weight: bold;
            color: #ffffff;
            line-height: 40px;
            text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
            margin: 16px auto;
          }
        }
        &-s {
          width: 332px;
          height: 264px;
          background: url('../../../assets/questionnaire/questionnaire-start.png')
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        &-e {
          width: 332px;
          height: 264px;
          background: url('../../../assets/questionnaire/questionnaire-end.png')
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        &-ee {
          width: 332px;
          height: 220px;
          background: url('../../../assets/questionnaire/questionnaire-end-e.png')
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        &-left {
          width: 37px;
          height: 37px;
          background: url('../../../assets/questionnaire/left.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: -37px;
          transform: translateY(-50%);
          transition: all 0.2s;
          opacity: 0;
        }
        &-right {
          width: 37px;
          height: 37px;
          background: url('../../../assets/questionnaire/right.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          right: -37px;
          transform: translateY(-50%);
          transition: all 0.2s;
          opacity: 0;
        }
        &:hover .peopleInfo-r-phone-content-left {
          left: 16px;
          opacity: 1;
        }
        &:hover .peopleInfo-r-phone-content-right {
          right: 16px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
