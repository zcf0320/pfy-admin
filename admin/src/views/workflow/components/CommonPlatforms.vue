<template>
  <div class="common-platforms card">
    <div class="platform-header card-title">
      <div class="icon" />
      <div>
        <div>常用平台</div>
        <div class="sub-title">若没有账号，请向部门主管申请</div>
      </div>
    </div>

    <div class="platform-list">
      <div
        class="platform-item"
        v-for="item in platforms"
        :key="item.id"
        @click="goUrl(item.link)"
      >
        <img class="item-icon" :src="item.icon" alt="" />
        <div class="item-text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonPlatforms',
  data() {
    return {
      platforms: [
        {
          id: 1,
          icon: require('../images/ali-mail1.png'),
          text: '企业邮箱',
          link: 'https://qiye.aliyun.com/alimail/auth/login'
        },
        {
          id: 2,
          icon: require('../images/wiki1.png'),
          text: '文档中心',
          link: 'http://wiki.huanyu.g-hcare.com/author/index'
        },
        {
          id: 3,
          icon: require('../images/net-disk1.png'),
          text: '寰宇关爱网盘',
          link: 'https://pan.g-hcare.com'
        }
      ]
    };
  },
  methods: {
    goUrl(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.common-platforms {
  height: 270px;
  .platform-header {
    display: flex;

    .icon {
      background: url('../images/platform-icon.png');
      background-size: 100% 100%;
    }

    .sub-title {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #989ab3;
    }
  }
  .platform-list {
    margin-top: 23px;
    display: flex;
    justify-content: space-between;
    .platform-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      .item-icon {
        width: 82px;
        height: 82px;
      }
      .item-text {
        margin-top: 17px;
        font-size: 12px;
        font-weight: 500;
        color: #464668;
      }
    }
  }
}
</style>
