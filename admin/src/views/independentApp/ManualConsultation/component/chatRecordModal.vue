<template>
  <div class="chat-record-modal modal-form">
    <el-dialog
      v-loading="loading"
      title="问诊过程"
      :visible="isShow"
      width="800px"
      center
      :close-on-click-modal="false"
      @close="close"
    >
      <div class="chat-record-list">
        <ChatList :chat-list="chatRecordList" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import ChatList from './chatList';
import { chatTimeTransform } from '@/utils/time';
export default {
  name: 'ChatRecordModal',
  components: {
    ChatList
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      chatRecordList: []
    };
  },
  created() {
    this.getProgress();
  },
  methods: {
    ...mapActions('inquiryManageFe', ['getProcess']),
    // 获取问诊详情
    getProgress() {
      this.getProcess({ id: this.id }).then(res => {
        if (!res.code) {
          this.chatRecordList = this.transformShowTime(res.obj.history || []);
        }
      });
    },
    // 关闭
    close() {
      this.$emit('close');
    },
    // 时间转化
    transformShowTime(list) {
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
      });
      return list;
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-record-modal {
  .chat-record-list {
    border-bottom: 1px solid #cccccc;
    max-height: 700px;
    overflow-y: auto;
  }
}
</style>
