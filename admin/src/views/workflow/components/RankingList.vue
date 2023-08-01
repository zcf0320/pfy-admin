<template>
  <div class="ranking-list card">
    <div class="flex header">
      <div class="card-title flex">
        <div class="icon" />
        <span>排行榜</span>
      </div>
      <div class="time">
        统计时间：近30天
      </div>
    </div>
    <div class="ranking-table">
      <div class="table-header">
        <div class="num"></div>
        <div class="name">名称</div>
        <div>登录次数</div>
      </div>
      <div class="ranking-data">
        <div class="ranking-item" v-for="(item, index) in ranking" :key="index">
          <div class="num">
            <img
              class="img"
              v-if="index === 0"
              src="../images/top1.png"
              alt=""
            />
            <img
              class="img"
              v-else-if="index === 1"
              src="../images/top2.png"
              alt=""
            />
            <img
              class="img"
              v-else-if="index === 2"
              src="../images/top3.png"
              alt=""
            />

            <div v-else>{{ index + 1 }}</div>
          </div>
          <div class="name">
            <el-avatar class="avatar" :src="item.headImage"></el-avatar
            >{{ item.creatorName }}
          </div>
          <div class="count">{{ item.loginCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLoginRanking } from '@/api/logCenter';
export default {
  name: 'ranking-list',
  data() {
    return {
      ranking: []
    };
  },
  created() {
    this.getRanking();
  },
  methods: {
    getRanking() {
      getLoginRanking().then(res => {
        this.ranking = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ranking-list {
  height: 466px;
  .header {
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('../images/ranking-list-icon.png');
      background-size: 100% 100%;
    }
    .time {
      font-size: 14px;
      font-weight: 400;
      color: #989ab3;
    }
  }
  .ranking-table {
    .num {
      width: 72px;
      text-align: center;
      font-size: 12px;
      font-family: Impact;
      color: #a2a3b7;
    }
    .table-header {
      padding: 24px 12px 0 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;
      color: #464668;
      .name {
        flex: 1;
      }
    }
    .ranking-data {
      height: 380px;
      max-height: 380px;
      padding-right: 12px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 2px;
        height: 140px;
        background: #fff;
      }
      &::-webkit-scrollbar-track {
        height: 160px;
        background: #fff;
      }
      &::-webkit-scrollbar-thumb {
        width: 2px;
        height: 10px;
        background: #ebedf2;
      }

      .ranking-item {
        display: flex;
        align-items: center;
        margin: 16px 0;
        justify-content: space-between;
        &:last-child {
          margin-bottom: 0;
        }
        .img {
          width: 20px;
          height: 20px;
        }
        .name {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: #545473;
          .avatar {
            width: 28px;
            height: 28px;
            margin-right: 16px;
            border-radius: 50%;
          }
        }
        .count {
          font-size: 14px;
          font-weight: 400;
          color: #545473;
        }
      }
    }
  }
}
</style>
