<template>
  <div class="msg-template">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <NTemplate :id="$route.query.id" v-loading="loading" :list="list" />
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
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$store.dispatch('notification/smsTemplate').then(res => {
        this.list = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
