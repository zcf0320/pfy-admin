<template>
  <div class="common-word-list">
    <div class="title">
      <div class="text">常用语</div>
      <div class="close" @click.stop="close" />
    </div>
    <el-scrollbar
      :native="false"
      wrap-class="word-list-warp"
      tag="div"
      :noresize="false"
    >
      <div class="word-list">
        <div
          v-for="item in commonWordList"
          :key="item.id"
          class="list-item"
          @click.stop="sendCommon(item)"
        >
          {{ item.word }}
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'CommonWordList',
  data() {
    return {
      commonWordList: []
    };
  },
  created() {
    this.getCommonWord();
  },
  methods: {
    ...mapActions('inquiryManageFe', ['queryCommonWord', 'addCountCommonWord']),
    // 获取常用语列表
    getCommonWord() {
      this.queryCommonWord({
        type: false
      }).then(res => {
        if (res.status) {
          this.commonWordList = res.data || [];
        }
      });
    },
    // 发送常用语
    sendCommon(item) {
      this.addCountCommonWord({
        id: item.id
      }).then(res => {
        if (res.status) {
          this.$emit('sendCommon', item);
        }
      });
    },
    close() {
      this.$emit('closeCommonWord');
    }
  }
};
</script>
<style lang="scss" scoped>
.common-word-list {
  position: absolute;
  width: 494px;
  height: 358px;
  top: -370px;
  left: -320px;
  background: #ffffff;
  box-shadow: 0px 0px 17px 0px rgba(185, 206, 227, 0.4);
  padding: 24px;
  .title {
    height: 42px;
    padding-bottom: 24px;
    display: flex;
    border-bottom: 1px solid #ebedf2;
    .text {
      flex: 1;
      font-size: 18px;

      font-weight: 600;
      color: #464668;
      line-height: 18px;
    }
    .close {
      width: 20px;
      height: 20px;
      background-image: url('../../../../assets/close.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .word-list-warp {
    height: 292px;
  }
  .word-list {
    padding: 24px 0;
    .list-item {
      height: 34px;
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 34px;
      cursor: pointer;
      &:hover {
        background: #f1f8ff;
      }
    }
  }
}
</style>
