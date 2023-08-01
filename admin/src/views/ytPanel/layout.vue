<template>
  <div class="ytLayout">
    <div class="ytLayout-header">
      <Header
        :new-date="date"
        start-date="2021-04-01"
        title="亚太保险产品数据看板"
      />
    </div>
    <div class="ytLayout-btm"><Bottom /></div>
  </div>
</template>

<script>
import Header from './components/header.vue';
import Bottom from './components/bottom';
import moment from 'moment';
export default {
  name: 'ytLayout',
  components: { Header, Bottom },
  data() {
    return {
      timer: null,
      date: ''
    };
  },
  created() {
    this.getData();
    this.date = moment().format('YYYY-MM-DD HH:mm');
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 10 * 60);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getData() {
      this.$store
        .dispatch('ytPanel/getData', {
          companyId: this.$route.query.id
        }) // prod
        // .dispatch('ytPanel/getData', { companyId: '2c90819579a724e90179a727b16f0003' })//test
        // .dispatch('ytPanel/getData', { companyId: 'ff80808175b51a9e0175c112c2fc0188' })//dev
        .then(res => {
          this.$store.dispatch('ytPanel/setData', res.data);
          this.date = moment().format('YYYY-MM-DD HH:mm');
        })
        .catch(() => {
          clearInterval(this.timer);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.ytLayout {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 24px;

  &-header {
    width: 100%;
    height: 250px;
  }
  &-btm {
    width: 100%;
    height: 1224px;
  }
}
</style>
