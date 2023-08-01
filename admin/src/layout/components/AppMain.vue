<template>
  <section :class="{ 'app-main': true, 'hide-app-main': !status }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="keepAlivePage">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    },
    status() {
      return this.$store.state.app.barStatus;
    },
    keepAlivePage() {
      return this.$store.getters.keepAlivePage;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: 100%;
  width: 100%;
  min-width: 1200px;
  position: relative;
  overflow: hidden;
  background: rgba(247, 247, 247, 1);
}

.fixed-header + .app-main {
  padding-top: 115px;
  min-height: 100%;
  height: 100%;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 144px);
    min-height: 100%;
    height: 100%;
  }

  .fixed-header + .app-main {
    padding-top: 144px;
  }
}
.hide-app-main {
  //   padding-left: 72px;
  //   width: 1500px;
  //   margin: 0 auto;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
