<template>
  <div>
    <div v-if="logList.length > 0">
      <div v-for="item in logList" :key="item.createTime" class="log-item">
      <div class="circle"/>
      <div class="log-details">
        <span>{{ item.serviceInfoName }}</span>
        <span class="create-time ml-10">{{
          item.createTime | timeFormat
        }}</span>
        <span class="create-time ml-10">{{
          $enums["operationType"][item.operation]
        }}</span>
        <span class="color-hight">{{ item.name }}</span>
        <span v-if="item.mobile" class="color-hight">{{ item.mobile }}</span>
        <span
       class="color-hight"
       >{{ $enums["operationType"][item.operation]
          }}{{ $enums["menuType"][item.type] }}</span>
      </div>
    </div>
    </div>
     <div v-else>
          <!-- 暂无记录 -->
          <div slot="empty" class="empty-img" />
      </div>
  </div>
</template>

<script>
export default {
  name: 'logList',
  props: {
    logList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
