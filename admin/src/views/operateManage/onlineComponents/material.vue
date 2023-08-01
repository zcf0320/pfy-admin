<template>
  <div class="data-list">
    <div v-for="item in detail.materialMsgList" :key="item.materialId">
      <div class="title-top content-detail">
        {{ item.materialName }}
      </div>
      <imgs :urls="$isEmpty(item.imgs) ? [] : item.imgs.split(',')"/>
    </div>
  </div>
</template>

<script>
import imgs from '@/views/claimManagement/auditRecords/components/imgs';
export default {
  name: 'material',
  components: { imgs },
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
