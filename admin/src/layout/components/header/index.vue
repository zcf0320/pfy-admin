<template>
  <div class="layout-header">
    <el-popover
      v-if="isShowInput"
      placement="bottom"
      width="280"
      trigger="click"
    >
      <div>
        <el-input
          class="search-policy"
          placeholder="请输入保单号或手机号"
          v-model="keyword"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon search-icon"></i>
        </el-input>
      </div>
      <div slot="reference" class="icon-wrap">
        <div class="icon-wrap-search"></div>
      </div>
    </el-popover>
    <el-popover popper-class="panel-pop" placement="bottom" trigger="click">
      <div v-for="item in options" :key="item.value">
        <div class="panel-item" @click="changePanel(item.value)">
          {{ item.label }}
        </div>
      </div>
      <div slot="reference" class="icon-wrap">
        <div class="panel-icon"></div>
      </div>
    </el-popover>
    <el-popover
      v-if="isShowCode"
      placement="bottom"
      trigger="click"
      popper-class="popover-code"
    >
      <div class="code-container flex">
        <div class="code-img" />
        <div ref="qrCodeUrl" class="qrcode" />
        <div class="view-code">手机端查看报表数据</div>
      </div>
      <div slot="reference" class="icon-wrap">
        <div class="code-icon" @click="preview"></div>
      </div>
    </el-popover>
    <div class="system-menssage" />
    <div class="user-message" @click="openUserCenter">
      <div>你好,</div>
      <div class="user-name">{{ username }}</div>
      <div
        class="head-picture"
        :style="{
          backgroundImage: `url(${employeeInfo.headPortrait})`,
        }"
      >
        <div v-if="articleList[1].length" class="message-tips">
          {{ articleList[1].length > 99 ? '99+' : articleList[1].length }}
        </div>
      </div>
    </div>
    <Dialog
      title="客服查询"
      :visible.sync="dialogVisible"
      :height="431"
      :width="498"
      @closed="close"
    >
      <div v-if="list.length > 0">
        <div class="policy-list" v-for="(item, index) in list" :key="index">
          <div class="policy-title">保单{{ index + 1 }}</div>
          <div class="flex-between mb-16">
            <div>保险产品：</div>
            <div>{{ item.productName }}</div>
          </div>
          <div class="flex-between mb-16">
            <div>保障期：</div>
            <div>
              {{ $moment(item.effectiveDate).format('YYYY-MM-DD') }} -
              {{ $moment(item.expiryDate).format('YYYY-MM-DD') }}
            </div>
          </div>
          <div class="flex-between mb-16">
            <div>被保人：</div>
            <div>{{ item.insuredName }}</div>
          </div>
          <div class="flex-between mb-16">
            <div>联系电话：</div>
            <div>{{ item.insuredMobile }}</div>
          </div>
          <div class="flex-between mb-16">
            <div>投保人：</div>
            <div>{{ item.name }}</div>
          </div>
          <div class="flex-between">
            <div>联系电话：</div>
            <div>{{ item.mobile }}</div>
          </div>
        </div>
      </div>
      <div class="no-result" v-else>
        <img src="../../../assets/no-search-result.png" />
        暂无搜索结果
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
      </span>
    </Dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { getPolicyInfoList } from '@/api/onlineService';
export default {
  name: 'Header',
  data() {
    return {
      username: '用户名',
      lockReconnect: false,
      timeoutnum: null,
      qrcode: null,
      codeShow: false,
      avatar: '',
      value: '',
      options: [],
      keyword: '',
      dialogVisible: false,
      list: []
    };
  },
  computed: {
    articleList() {
      return this.$store.state.app.articleList;
    },
    isShowCode() {
      return this.$store.state.user.isShowCode;
    },
    employeeInfo() {
      return this.$store.state.app.employeeInfo;
    },
    barStatus() {
      return this.$store.state.app.barStatus;
    },
    isShowInput() {
      return this.$store.state.app.showInput;
    }
  },
  created() {
    this.username = localStorage.getItem('username') || '用户名';
    if (this.$route.path !== '/inquiryManage/im') {
      this.$store.dispatch('app/getUserRole', this.username).then(res => {
        if (res.data.some(item => item.roleType === '3')) {
          this.initWebSocket();
        }
      });
    }
    this.getNoticeList();
    this.getEnv();
  },
  methods: {
    editpass() {
      this.showEditPassword = true;
    },
    closeModal() {
      this.showEditPassword = false;
    },
    // 打开用户中心
    openUserCenter() {
      this.$store.commit('app/CHANGE_USER_CENTER', true);
    },
    // 初始化weosocket
    initWebSocket() {
      const wsUrl = `${process.env.VUE_APP_WSS}/message:${localStorage.getItem('username')}/DOCTOR`;

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
    // 连接成功事件
    websocketOnOpen() {
      // 开启心跳
    },
    // 连接失败事件
    websocketOnError() {
      // 重连
      // this.reconnect();
    },
    // 连接关闭事件
    websocketClose() {
      // 重连
      // this.reconnect();
    },
    // 接收服务器推送的信息
    websocketOnMessage(event) {
      const data = JSON.parse(event.data);
      const message = {
        title: `${data.content.userName}发来了新的问诊消息，请至聊天窗口及时处理`,
        updateTime: data.content.time,
        id: data.userId,
        type: 1 // 问诊消息
      };
      if (!this.articleList[1].some(item => item.id === data.userId)) {
        this.articleList[1].push(message);
        this.$store.commit('app/SET_ARTICLE_LIST', this.articleList);
      }
    },
    // 获取未读文章列表
    getNoticeList() {
      this.$store.dispatch('app/getNoticeList', {
        userName: localStorage.getItem('username')
      });
    },
    // 预览
    preview() {
      if (this.qrcode) {
        this.qrcode.clear(); // 清除代码
        this.qrcode.makeCode(`${process.env.VUE_APP_MOBILE_CHARTS}`);
        return;
      }
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${process.env.VUE_APP_MOBILE_CHARTS}`, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    changePanel(value) {
      let routeData = '';
      if (value === 'ff80808175b51a9e0175c112c2fc0188') {
        routeData = this.$router.resolve({
          path: `/zhPanel?id=${value}`
        });
      } else if (value === 'smart-medical-data-board') {
        routeData = this.$router.resolve({
          path: '/smart-medical-data-board'
        });
      } else {
        routeData = this.$router.resolve({
          path: `/ytPanel?id=${value}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    getEnv() {
      const env = window.location.hostname;
      let id = '';
      if (env === 'manage-test.g-hcare.com') {
        id = '2c90819579a724e90179a727b16f0003';
      } else if (env === 'manage.g-hcare.com') {
        id = '2c91808b784466cb017857b9003f0000';
      } else {
        id = '2c90819579a724e90179a727b16f0003';
      }
      this.options = [
        {
          value: id,
          label: '亚太保险产品数据大屏'
        },
        {
          value: 'ff80808175b51a9e0175c112c2fc0188',
          label: '中韩保险产品数据大屏'
        },
        {
          value: 'smart-medical-data-board',
          label: '智慧医疗数据看板'
        }
      ];
    },
    search() {
      if (!this.keyword) {
        this.$message.warning('请先输入保单号或手机号');
        return;
      }
      this.dialogVisible = true;
      getPolicyInfoList(this.keyword).then(res => {
        this.list = res.data;
      });
    },
    close() {
      this.dialogVisible = false;
      this.list = [];
      this.keyword = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 66px;
  display: flex;
  box-shadow: 0px -1px 0px 0px #ebedf2;
  border-bottom: 1px solid #ebedf2;
  align-items: center;
  background-color: #ffffff;
  justify-content: flex-end;

  .icon-wrap {
    width: 30px;
    height: 30px;
    margin-right: 30px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #eef7ff;
    }
    &-search {
      width: 18px;
      height: 18px;
      background-image: url('../../../assets/search-icon.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
    .panel-icon {
      width: 18px;
      height: 18px;
      background: url('../../../assets/panel-select.svg');
      background-size: 100% 100%;
    }
    .code-icon {
      width: 19px;
      height: 19px;
      background: url('../../../assets/code-phone.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .user-message {
    height: 48px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    font-size: 16px;
    color: #989ab3;
    justify-content: space-between;
    margin-right: 19px;
    cursor: pointer;
    .user-name {
      color: #51546a;
      margin: 0 6px;
    }
    .head-picture {
      width: 48px;
      height: 48px;
      //   background-image: url("../../../assets/default_header.png");
      background-size: 100% 100%;
      position: relative;
      border-radius: 4px;
      .message-tips {
        width: 24px;
        height: 24px;
        background: #ff5353;
        border-radius: 50%;
        position: absolute;
        top: -4px;
        right: -12px;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
      }
    }
    &:hover {
      background: rgba(213, 228, 255, 0.4);
    }
  }
}
.policy-list {
  padding: 16px;
  background: #f1f8ff;
  border-radius: 8px;
  font-size: 14px;
  color: #464668;
  margin-bottom: 16px;
  .policy-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 16px;
  }
}
.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #46456b;
}

.panel-item {
  width: 208px;
  height: 32px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 32px;
  cursor: pointer;
  &:hover {
    background: #dbedff;
  }
}
</style>
