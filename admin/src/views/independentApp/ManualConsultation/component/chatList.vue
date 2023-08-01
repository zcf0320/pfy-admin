<template>
  <div id="chatList" class="chat-list">
    <div v-if="showHistory" class="chat-history" @click="getHistory">
      历史记录
    </div>
    <div
      v-for="(chat, index) in chatList"
      :id="`item-${index}`"
      :key="index"
      class="chat-item"
    >
      <div v-if="chat.showTime" class="chat-time">
        {{ chat.showTime }}
      </div>
      <div v-if="chat.conclusion" class="chat-time">问诊已结束</div>
      <div v-else>
        <div v-if="chat.sendor === 2" class="chat-item-doctor">
          <div class="user-avator">
            <img src="../../../../assets/admin_avatar.png" alt="" >
          </div>
          <div class="chat-message">
            <div v-if="chat.type === 1" class="text">{{ chat.msg }}</div>
            <div v-if="chat.type === 3" class="text">{{ chat.msg }}</div>
            <div v-if="chat.type === 4" class="text">
              诊断疾病:{{ JSON.parse(chat.msg).diseaseName }} 推荐科室:
              {{ JSON.parse(chat.msg).hospitalDepartment }} 推荐药物:
              {{ JSON.parse(chat.msg).diseaseDrug }}
            </div>
            <div v-if="chat.type === 2" class="img">
              <img :src="chat.msg" alt="" @click="setShowViewer([chat.msg])" >
            </div>
          </div>
        </div>
        <div v-else class="chat-item-user">
          <div class="user-avator">
            <img src="../../../../assets/user_avatar.png" alt="" >
          </div>
          <div class="chat-message">
            <div v-if="chat.type === 1" class="text">{{ chat.msg }}</div>
            <div v-if="chat.type === 3" class="text">{{ chat.msg }}</div>
            <div v-if="chat.type === 2" class="img">
              <img :src="chat.msg" alt="" @click="setShowViewer([chat.msg])" >
            </div>
          </div>
        </div>
      </div>
    </div>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="urlList"
    />
  </div>
</template>

<script>
export default {
  name: 'ChatList',

  props: {
    chatList: {
      type: Array,
      default: () => {
        [];
      }
    },
    showHistory: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showViewer: false,
      urlList: []
    };
  },
  watch: {
    chatList: function() {
      this.$nextTick(() => {
        if (this.chatList.length) {
          const scrollTop = document.getElementById(
            `item-${this.chatList.length - 1}`
          ).offsetTop;
          const container = document.getElementById('chatList');
          container.scrollTop = scrollTop;
        }
      });
    }
  },
  mounted() {
    if (this.chatList.length) {
      const scrollTop = document.getElementById(
        `item-${this.chatList.length - 1}`
      ).offsetTop;
      const container = document.getElementById('chatList');
      container.scrollTop = scrollTop;
    }
  },
  methods: {
    showViewerClose() {
      this.showViewer = false;
    },
    // 预览图片
    setShowViewer(urls) {
      this.urlList = urls;
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.showViewer = true;
    },
    getHistory() {
      this.$emit('getHistory');
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-list {
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 18px 24px;
  &::-webkit-scrollbar {
    display: none;
  }
  .chat-history {
    color: #2276ff;
    text-align: center;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    padding: 5px 0;
  }
  .chat-item {
    margin-bottom: 34px;
    .chat-time {
      width: 148px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #333333;
      margin: 0 auto 32px;
      background: #f3f6fc;
      border-radius: 6px;
    }
    .chat-item-user {
      display: flex;
      .user-avator {
        width: 52px;
        height: 52px;
        margin-right: 24px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .chat-message {
        flex: 1;
        .text {
          max-width: 60%;
          display: inline-block;
          background: #f2f6fc;
          padding: 16px 24px;
          color: #333333;
          font-size: 14px;
          line-height: 20px;
          border-radius: 0px 6px 6px 6px;
          text-align: justify;
        }
        .img {
          width: 198px;
          height: 198px;
          background-color: rosybrown;
          border-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .chat-item-doctor {
      display: flex;
      flex-direction: row-reverse;
      .user-avator {
        width: 52px;
        height: 52px;
        margin-left: 24px;
        background-color: rosybrown;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .chat-message {
        flex: 1;
        text-align: right;
        .text {
          max-width: 60%;
          display: inline-block;
          background: #2276ff;
          padding: 16px 24px;
          color: #ffffff;
          font-size: 14px;
          line-height: 20px;
          border-radius: 6px 0px 6px 6px;
          text-align: justify;
        }
        .img {
          width: 198px;
          height: 198px;
          background-color: rosybrown;
          float: right;
          border-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
