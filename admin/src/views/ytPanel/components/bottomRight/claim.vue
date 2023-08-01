<template>
  <div class="ytClaim flex">
    <div>
      <Statistics />
      <Drug />
    </div>
    <ScrollText />
  </div>
</template>

<script>
import Statistics from './statistics.vue';
import Drug from './drug.vue';
import ScrollText from './scrollText.vue';
export default {
  name: 'ytClaim',
  components: { Statistics, Drug, ScrollText }
};
</script>

<style lang="scss" scoped>
.ytClaim {
  width: 1632px;
  height: 748px;
  background: #1f2544;
  border: 1px solid #5d4dfd;
  margin-top: 24px;
  padding: 28px 44px;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
