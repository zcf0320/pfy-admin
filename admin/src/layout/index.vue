<template>
  <div class="layout">
    <div
      class="layout-left"
      :style="{ width: status ? '244px' : '72px' }"
      transition="fade"
    >
      <Menus />
    </div>
    <div :class="{ 'layout-right': true, 'hide-left': !status }">
      <Header />
      <Navbar />
      <AppMain />
    </div>
    <UserCenter v-if="userCenterShow" @editpass="editpass" />
    <EditPassword
      :is-show="showEditPassword"
      @closeModal="closeModal"
      @submit="submit"
    />
  </div>
</template>
<script>
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar.vue';
import Header from './components/header';
import EditPassword from './components/EditPassword';
import Menus from './components/Menus';
export default {
  name: 'Layout',
  components: {
    AppMain,
    Header,
    Menus,
    Navbar,
    EditPassword
  },
  data() {
    return {
      data: {
        appEnv: ''
      }
    };
  },
  computed: {
    userCenterShow() {
      return this.$store.state.app.userCenterShow;
    },
    showEditPassword() {
      return this.$store.state.user.changePassword;
    },
    status() {
      return this.$store.state.app.barStatus;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$store.commit('user/CHANGE_PASSWORD', false);
      this.$store.commit('user/CHANGE_PASSWORD_TIPS', false);
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    editpass() {
      this.$store.commit('user/CHANGE_PASSWORD', true);
      this.$store.commit('user/CHANGE_PASSWORD_TIPS', false);
    },
    closeModal() {
      this.$store.commit('user/CHANGE_PASSWORD', false);
      this.$store.commit('user/CHANGE_PASSWORD_TIPS', false);
    },
    submit() {
      this.logout();
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  min-width: 1366px;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #f7f7f7;
  overflow-x: hidden;
  .layout-left {
    min-height: 100vh;
    background-color: #1e1e2f;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    transition: width 0.2s;
  }
  .layout-right {
    transition: all 0.2s;
    min-height: 100vh;
    width: calc(100vw - 244px);
    min-width: 1122px;
    // overflow-x: auto;
    margin-left: 244px;
    .header {
      width: 100%;
      height: 66px;
    }
  }
  .hide-bar {
    min-width: 72px;
  }
  .hide-left {
    margin-left: 72px;
    width: calc(100vw - 72px);
    background: #f3f6fc;
  }
}
</style>
