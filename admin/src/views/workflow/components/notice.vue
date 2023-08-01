<template>
  <div class="flow-notice card">
    <div class="flex header">
      <div class="card-title flex">
        <div class="icon" />
        <span>最新通知</span>
      </div>
      <div
        class="tip"
        @click="
          $router.push({
            path: `/notification/personalNews/${employeeInfo.id}/null`,
          })
        "
      />
    </div>
    <el-carousel height="60px" direction="vertical">
      <el-carousel-item v-for="item in list" :key="item.configId">
        <div
          class="list flex"
          @click="
            $router.push({
              path: `/notification/personalNews/${employeeInfo.id}/${item.configId}`,
            })
          "
        >
          <div class="introduce">{{ item.introduce }}</div>
          <div class="time">
            {{ $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss') }}
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- <div
      v-for="item in list"
      :key="item.configId"
      class="list flex"
      @click="
        $router.push({
          path: `/notification/personalNews/${employeeInfo.id}/${item.configId}`,
        })
      "
    >
      <div class="introduce">{{ item.introduce }}</div>
      <div class="time">
        {{ $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss') }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'flowNotice',
  computed: {
    list() {
      return this.$store.state.app.noticeList;
    },
    employeeInfo() {
      return this.$store.state.app.employeeInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.flow-notice {
  .header {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .icon {
      background: url('../images/notice.svg');
      background-size: 100% 100%;
    }
    .tip {
      width: 8px;
      height: 12px;
      background: url('../images/more.png');
      background-size: 100% 100%;
      /* &:hover {
        background: url('../images/more_active.svg');
      } */
    }
  }
  .list {
    margin-top: 19px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #464668;
    cursor: pointer;
    .time {
      color: #989ab3;
      width: 130px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .introduce {
      width: 400px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        color: #66b2ff;
      }
    }
  }
}
</style>
