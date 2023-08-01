<template>
  <div class="zh-layout">
    <Header
      start-date="2020-10-01"
      :new-date="date"
      title="中韩保险产品数据看板"
    />
    <div class="zh-layout-top flex"><Distribute /><PieCharts /><Settle /></div>
    <div class="zh-layout-btm flex"><Statistics /><ZhTable /></div>
  </div>
</template>

<script>
import Header from '../ytPanel/components/header.vue';
import Distribute from './components/distribute.vue';
import PieCharts from './components/pieCharts.vue';
import Settle from './components/settle.vue';
import ZhTable from './components/zhTable.vue';
import Statistics from './components/statistics.vue';
import moment from 'moment';
export default {
  name: 'zhLayout',
  components: { Header, Distribute, PieCharts, Settle, ZhTable, Statistics },
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
        .dispatch('zhPanel/getData', {
          //   companyId: 'ff80808175b51a9e0175c112c2fc0188'//dev
          companyId: this.$route.query.id
        })
        .then(res => {
          this.$store.dispatch('zhPanel/setData', res.data);
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
.zh-layout {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 24px;

  &-header {
    width: 100%;
    height: 250px;
  }
  &-top {
    justify-content: space-between;
    align-items: center;
    margin: 19px auto 32px;
    height: 431px;
    width: 2544px;
  }
  &-btm {
    justify-content: space-between;
    align-items: center;
    height: 734px;
    width: 2544px;
    margin: 0 auto;
  }
}
</style>
