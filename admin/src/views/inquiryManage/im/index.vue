<template>
  <div>
    <el-container>
      <el-main>
        <div class="im-page">
          <div class="user-list">
            <div class="config">
              <div class="setting" @click="toggleChatSettingShow">
                <i class="el-icon-setting" />
              </div>
              <span>设置</span>
              <div class="title">
                当前{{ chatDetails.list.length }}人/{{
                  chatDetails.maxPerson
                }}人
              </div>
              <div class="status">
                <el-switch
                  v-model="chatDetails.doctorState"
                  @change="doctorStateChange"
                />
              </div>
            </div>
            <div v-if="!!chatDetails.list.length" class="list">
              <div
                v-for="(item, index) in chatDetails.list"
                :key="item.chartRecordId"
                :class="[
                  index === currentIndex && 'user-item-active',
                  'user-item',
                ]"
                @click="changeUser(index)"
              >
                <div class="header">
                  <img
                    :src="item.content.length && item.content[0].userAvator"
                    alt=""
                  />
                </div>
                <div class="user-content">
                  <div class="name">
                    <span>{{
                      (item.content.length && item.content[0].userName) || '-'
                    }}</span>
                    <span class="time">{{
                      item.content.length &&
                        $moment(
                          item.content[item.content.length - 1].time,
                        ).format('HH:mm')
                    }}</span>
                  </div>
                  <div class="last-message">
                    <div
                      v-if="
                        item.content.length &&
                          item.content[item.content.length - 1].state === 3
                      "
                      class="text"
                    >
                      问诊结果
                    </div>
                    <div v-else class="text">
                      {{
                        item.content.length &&
                        item.content[item.content.length - 1].type === 2
                          ? '[图片]'
                          : item.content.length &&
                            item.content[item.content.length - 1].msg
                      }}
                    </div>
                    <div v-if="item.unRead" class="lately">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-container">
            <div class="user-details">
              <div class="user-name">
                {{
                  (chatDetails.list[currentIndex] &&
                    chatDetails.list[currentIndex].content.length &&
                    chatDetails.list[currentIndex].content[0].userName) ||
                    '用户名'
                }}
              </div>
              <div class="close-chat" @click="closeChat">
                <i class="el-icon-close" />
              </div>
            </div>
            <div class="chat">
              <ChatList
                v-if="!!chatDetails.list.length"
                :chat-list="chatDetails.list[currentIndex].content"
                :show-history="showHistory"
                @getHistory="getHistory"
              />
            </div>
            <div class="chat-footer">
              <div class="operation-area">
                <div class="action">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :http-request="uploadPic"
                    :before-upload="beforeAvatarUpload"
                    accept=".png,.jpg,.jpeg,.gif"
                  >
                    <div class="upload-img" />
                  </el-upload>
                </div>
                <div class="send-action">
                  <div class="send-word" @click="sendCommonStatusChange">
                    <CommonWordList
                      v-if="sendCommonStatus"
                      @sendCommon="sendCommon"
                      @closeCommonWord="closeCommonWord"
                    />
                  </div>
                  <div class="send-result" @click="toggleChatResultModal">
                    发送问诊结果
                  </div>
                </div>
              </div>
              <div class="textarea">
                <el-input
                  v-model="sendMessage"
                  type="text"
                  placeholder="在此输入信息…"
                  maxlength="200"
                  show-word-limit
                  @keydown.native="enterSend"
                />
                <div class="send">
                  <el-button type="primary" @click="send">发送</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <ChatResultModal
        v-if="chatResultModalShow"
        :is-show="chatResultModalShow"
        @close="toggleChatResultModal"
        @save="sendResult"
      />
      <ChatSettingModal
        v-if="chatSettingShow"
        :is-show="chatSettingShow"
        @close="toggleChatSettingShow"
        @save="saveSetting"
      />
    </el-container>
  </div>
</template>

<script>
import { chatTimeTransform } from '@/utils/time';
import ChatList from '../component/chatList';
import ChatResultModal from '../component/chatResultModal';
import ChatSettingModal from '../component/chatSettingModal';
import uploadImage from '@/utils/uploadImage';
import CommonWordList from '../component/commonWordList';
import { mapActions } from 'vuex';
export default {
  name: 'IM',
  components: {
    ChatList,
    ChatResultModal,
    ChatSettingModal,
    CommonWordList
  },
  data() {
    return {
      websock: null, // 建立的连接
      lockReconnect: false, // 是否真正建立连接
      timeout: 30 * 1000, // 30秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
      limit: 0,
      maxConnect: 10,
      sendMessage: '',
      chatDetails: {
        doctorState: true,
        maxPerson: 20,
        list: []
      },
      currentIndex: 0,

      chatResultModalShow: false,
      chatSettingShow: false,
      sendCommonStatus: false,
      showHistory: true
    };
  },
  created() {
    // 获取聊天窗口信息
    this.getChartWindow();
  },
  methods: {
    ...mapActions('inquiryManage', ['getProcess']),
    // 回车发送
    enterSend(e) {
      if (e.keyCode === 13) {
        this.send();
      }
    },
    // 初始化weosocket
    initWebSocket() {
      const wsUrl = `${process.env.VUE_APP_WSS}/system:${localStorage.getItem('username')}/DOCTOR`;

      // 建立连接
      this.websock = new WebSocket(wsUrl);
      // 连接成功
      this.websock.onopen = this.websocketOnOpen;
      // 连接错误
      this.websock.onerror = this.websocketOnError;
      // 接收信息
      this.websock.onmessage = this.websocketOnMessage;
      // 连接关闭
      this.websock.onclose = this.websocketClose;
    },
    // 重新连接
    reconnect() {
      const that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      // 没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);

      that.timeoutnum = setTimeout(function() {
        // 新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 2000);
    },
    // 重置心跳
    reset() {
      const that = this;
      // 清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      // 重启心跳
      that.start();
    },
    // 开启心跳
    start() {
      const self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function() {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState === 1) {
          // 如果连接正常
          self.websock.send(
            JSON.stringify({
              diagnoseType: 3,
              content: {
                msg: 'ping'
              }
            }),
          );
        } else {
          // 否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function() {
          // 超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    // 连接成功事件
    websocketOnOpen() {
      // 开启心跳
      this.start();
    },
    // 连接失败事件
    websocketOnError() {
      // 重连
      this.reconnect();
    },
    // 连接关闭事件
    websocketClose() {
      // 关闭
      this.reconnect();
    },
    // 接收服务器推送的信息
    websocketOnMessage(event) {
      if (event.data === 'OK') {
        console.log('服务器连接正常');
      } else {
        const data = JSON.parse(event.data);

        const newStatus = this.chatDetails.list.some(
          item => data.userId === item.userId,
        );
        if (newStatus) {
          // 用户关闭
          if (data.content.state === 6) {
            let closeIndex = 0;
            this.chatDetails.list.forEach((item, index) => {
              if (data.userId === item.userId) {
                closeIndex = index;
              }
            });
            this.chatDetails.list.splice(closeIndex, 1);
          } else {
            this.chatDetails.list.forEach(item => {
              if (data.userId === item.userId) {
                item['chartRecordId'] = data.chartRecordId;
                item.content.push(data.content);
                item.unRead = true;
              }
            });
          }
        } else {
          this.chatDetails.list.push({
            ...data,
            unRead: true,
            content: [data.content]
          });
        }
      }
      // 收到服务器信息，心跳重置
      this.reset();
    },
    // 向服务器发送信息
    websocketsend(msg) {
      this.chatDetails.list.forEach(item => {
        if (this.chatDetails.list[this.currentIndex].userId === item.userId) {
          item.unRead = false;
        }
      });
      // 数据发送
      this.websock.send(JSON.stringify(msg));
    },

    // 发送消息数据
    sendData(data) {
      const { state, msg, type, diagnoseType, conclusion = null } = data;
      let { list } = this.chatDetails;

      if (!list.length) {
        return;
      }
      const content = {
        state,
        msg,
        time: new Date().getTime(),
        receiverId: list[this.currentIndex].userId,
        type,
        sendor: 2,
        conclusion
      };
      list[this.currentIndex].content.push(content);
      list = this.transformShowTime(list);
      this.chatDetails.list = list;

      const sendMsg = {
        ...list[this.currentIndex],
        diagnoseType,
        content
      };
      return sendMsg;
    },

    // 时间转化
    transformShowTime(list) {
      const arr = [];
      list.forEach(item => {
        item.content = item.content || [];
        item.content.forEach((child, index) => {
          if (index === 0) {
            child.showTime = chatTimeTransform(child.time);
          } else if (
            index > 0 &&
            child.time - item.content[index - 1].time > 5 * 60 * 1000
          ) {
            child.showTime = chatTimeTransform(child.time);
          }
        });
        if (item.content.length) {
          arr.push(item);
        }
      });
      return arr;
    },

    // 获取聊天设置
    getChartWindow() {
      this.$store.dispatch('chat/getChartWindow').then(res => {
        this.chatDetails = {
          ...res.obj,
          list: this.transformShowTime(res.obj.list || [])
        };
        // 初始化socket
        this.initWebSocket();
      });
    },
    // 切换用户
    changeUser(index) {
      this.currentIndex = index;
      this.sendMessage = '';
      const { list } = this.chatDetails;
      list.forEach((item, i) => {
        if (index === i) {
          item.unRead = false;
        }
      });
      this.chatDetails.list = [...list];
    },
    // 发送
    send() {
      const { list } = this.chatDetails;
      if (!list.length) {
        this.$message.warning('当前无问诊用户');
        return;
      }
      if (!this.sendMessage) {
        return;
      }
      const sendMsg = this.sendData({
        state: 2,
        msg: this.sendMessage,
        type: 1,
        diagnoseType: 2
      });
      this.sendMessage = '';
      this.websocketsend(sendMsg);
    },
    // 发送问诊结果
    sendResult(data) {
      const { list } = this.chatDetails;
      if (!list.length) {
        this.$message.warning('当前无问诊用户');
        return;
      }
      const sendMsg = this.sendData({
        state: 3,
        msg: '发送问诊结果',
        type: 4, // 发送人工问诊结果
        diagnoseType: 2,
        conclusion: {
          ...data
        }
      });
      this.websocketsend(sendMsg);
      this.toggleChatResultModal();
      setTimeout(() => {
        this.chatDetails.list.splice(this.currentIndex, 1);
      }, 2000);
    },
    // 问诊结果弹框切换
    toggleChatResultModal() {
      this.chatResultModalShow = !this.chatResultModalShow;
    },
    // 聊天设置
    toggleChatSettingShow() {
      this.chatSettingShow = !this.chatSettingShow;
    },
    // 保存聊天设置同步最多问诊人数
    saveSetting(maxPerson) {
      this.chatDetails.maxPerson = maxPerson;
      this.toggleChatSettingShow();
    },
    // 关闭会话
    closeChat() {
      const { list } = this.chatDetails;
      if (!list.length) {
        return;
      }
      this.$confirm('您确定结束该聊天?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let { list } = this.chatDetails;

          const content = {
            state: 5,
            msg: '结束问诊',
            time: new Date().getTime(),
            receiverId: list[this.currentIndex].userId,
            type: 1, // 发送人工问诊结果
            sendor: 2
          };
          list[this.currentIndex].content.push(content);
          list = this.transformShowTime(list);

          const sendMsg = {
            ...list[this.currentIndex],
            diagnoseType: 2,
            content
          };
          this.websocketsend(sendMsg);
          setTimeout(() => {
            this.chatDetails.list.splice(this.currentIndex, 1);
          }, 2000);
        })
        .catch(() => {});
    },
    // 在线状态切换
    doctorStateChange(state) {
      this.$confirm('您确定切换在线状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('chat/changeState', {
              state
            })
            .then(() => {
              this.$message.success('切换成功');
            });
        })
        .catch(() => {
          this.chatDetails.doctorState = !this.chatDetails.doctorState;
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 发送图片
    uploadPic(item) {
      const { list } = this.chatDetails;
      if (!list.length) {
        this.$message.warning('当前无问诊用户');
        return;
      }
      uploadImage(item)
        .then(res => {
          const sendMsg = this.sendData({
            state: 2,
            msg: res,
            type: 2,
            diagnoseType: 2
          });
          this.websocketsend(sendMsg);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 发送常用语
    sendCommon(item) {
      this.sendMessage = item.word;
      this.closeCommonWord();
    },
    // 发送常用语弹框
    sendCommonStatusChange() {
      this.sendCommonStatus = true;
    },
    closeCommonWord() {
      this.sendCommonStatus = false;
    },
    // 获取历史记录
    getHistory() {
      this.getChartWindow();
    }
  }
};
</script>
<style lang="scss" scoped>
.im-page {
  width: 100%;
  height: 100%;
  display: flex;
  .user-list {
    width: 432px;
    height: 100%;
    border-right: 1px solid rgba(204, 204, 204, 0.5);
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    .config {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      display: flex;
      align-items: center;
      .setting {
        width: 20px;
        height: 20px;
        color: #2276ff;
        cursor: pointer;
        margin-top: 5px;
      }
      .title {
        flex: 1;
        font-size: 16px;

        font-weight: 400;
        color: #333333;
        text-align: center;
      }
    }
    .list {
      flex: 1;
      max-height: 100%;
      overflow-y: auto;
      .user-item {
        width: 100%;
        height: 100px;
        padding: 24px 10px;
        display: flex;
        border-bottom: 1px solid rgba(204, 204, 204, 0.5);
        cursor: pointer;
        .header {
          width: 61px;
          height: 61px;
          border-radius: 50%;
          margin-right: 14px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .user-content {
          flex: 1;
          .name {
            font-size: 18px;

            font-weight: 500;
            color: #333333;
            margin-bottom: 20px;
            .time {
              float: right;
              color: #666666;
              font-size: 14px;
            }
          }
          .last-message {
            width: 100%;
            height: 24px;
            font-size: 14px;

            font-weight: 400;
            color: #999990;
            display: flex;
            justify-content: space-between;
            .text {
              height: 100%;
              max-width: 270px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }
            .lately {
              width: 24px;
              height: 24px;
              background-color: #e94c40;
              border-radius: 50%;
              text-align: center;
              line-height: 24px;
              color: #ffffff;
            }
          }
        }
      }
      .user-item-active {
        background: rgba(213, 228, 255, 0.4);
      }
    }
  }
  .chat-container {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .user-details {
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      width: 100%;
      height: 56px;
      position: relative;
      .user-name {
        text-align: center;
        line-height: 56px;
      }
      .close-chat {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 20px;
        right: 0;
        cursor: pointer;
      }
    }
    .chat {
      flex: 1;
      max-height: calc(100% - 160px);
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    }
    .chat-footer {
      padding: 16px 24px 0;
      .operation-area {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .action {
          display: flex;
          .upload-img {
            width: 20px;
            height: 20px;
            background-image: url('../../../assets/icon-upload-img.png');
            background-size: 100% 100%;
            margin-right: 20px;
            cursor: pointer;
          }
          .send-result {
            width: 24px;
            height: 20px;
            background-image: url('../../../assets/icon-send-result.png');
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
        .send-action {
          line-height: 23px;
          display: flex;
          align-items: center;
          .send-word {
            width: 20px;
            height: 20px;
            background-image: url('../../../assets/icon_common_word.svg');
            background-size: 100% 100%;
            margin-right: 30px;
            position: relative;
            cursor: pointer;
          }
          .send-result {
            font-size: 14px;

            font-weight: 400;
            color: #3599fe;
            cursor: pointer;
          }
        }
      }
      .textarea {
        margin-bottom: 21px;
        display: flex;
        .el-textarea__inner {
          min-height: 62px;
          max-height: 62px;
        }
        .send {
          width: 62px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
