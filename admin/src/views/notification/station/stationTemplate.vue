<template>
  <div class="msg-template">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <Tab
          :btns="btns"
          :btn-style="{ overflow: 'visible' }"
          :current-key="currentKey"
          @change="handleClick"
        />
        <div v-for="item in list" :key="item.name" class="box">
          <div class="title flex">
            <div class="line"/>
            {{ item.name }}
          </div>
          <NTemplate
            :id="$route.query.id"
            :key="item.name"
            v-loading="loading"
            :list="item.messageTemplateList"
            :time="false"
          />
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import NTemplate from '../components/template';
export default {
  name: 'stationTemplate',
  components: { NTemplate },
  data() {
    return {
      list: [],
      loading: false,
      btns: [
        { value: '0', name: '寰宇关爱小程序' },
        { value: '1', name: '森罗树后台' }
      ],
      activeName: '0',
      currentKey: '0'
    };
  },
  created() {
    this.activeName = this.$route.query.channel;
    this.currentKey = this.$route.query.channel;
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$store.dispatch('notification/messageTemplate', this.activeName).then(res => {
        this.list = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleClick(tab) {
      this.activeName = tab;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  .title {
    .line {
      width: 4px;
      height: 18px;
      background: #3599fe;
      margin-right: 12px;
    }
    justify-content: flex-start;
    align-items: center;
    margin: 25px 0;
  }
}
</style>
