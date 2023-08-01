<template>
  <div class="chat-record-modal modal-form">
    <Dialog
      title="问诊过程"
      :visible="isShow"
      :height="800"
      :width="700"
      @closed="close"
    >
      <ChatList :chat-list="chatRecordList" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close()">确 定</el-button>
      </div>
    </Dialog>
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
    ...mapActions('inquiryManageFe', ['getProcessFe']),
    // 获取问诊详情
    getProgress() {
      this.getProcessFe({ id: this.id }).then(res => {
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
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
