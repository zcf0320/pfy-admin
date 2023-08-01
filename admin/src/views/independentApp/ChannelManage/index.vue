<template>
  <div class="channel-page">
    <el-container>
      <!-- <el-main> -->
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <Tab :btns="btns" @change="handleClick"/>
        <channel-link v-if="activeName === '0'"/>
        <channel v-if="activeName === '1'"/>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import Channel from './components/Channel.vue';
import ChannelLink from './components/ChannelLink.vue';
export default {
  name: 'AppChannelManange',
  components: { ChannelLink, Channel },
  data() {
    return {
      btns: [
        { value: '0', name: '渠道链接' },
        { value: '1', name: '渠道列表' }
      ],
      activeName: '0'
    };
  },
  methods: {
    handleClick(index) {
      this.activeName = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.channel-page {
  width: 100%;
  width: 100%;
}
</style>
