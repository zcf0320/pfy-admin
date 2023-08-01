<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <!-- <transition-group name="breadcrumb"> -->
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
      <a @click="handleLink(item, index)">{{ item.label }}</a>
    </el-breadcrumb-item>
    <!-- </transition-group> -->
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex';
import { findParentNode } from '@/filters';
export default {
  name: 'BreadCrumb',
  data() {
    return {
      levelList: []
    };
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const { name, path } = this.$route;
      if (path === '/workflow') {
        this.levelList = [
          {
            label: '寰宇关爱'
          },
          {
            label: '首页'
          }
        ];
        return;
      }
      this.levelList = findParentNode(this.menuList, name);
    },
    handleLink(item, index) {
      if (index === 0 || index === 1) {
        return;
      }
      this.$router.push({
          name: item.url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  margin-left: 8px;
  .el-breadcrumb__item .el-breadcrumb__inner {
    a {
      color: #989ab3 !important;
      &:link {
        color: #989ab3 !important;
      }
      &:visited {
        color: #989ab3 !important;
      }
      &:hover {
        color: #66b2ff !important;
      }
      &:active {
        color: #3599fe !important;
      }
    }
  }
  .no-redirect {
    color: #989ab3;
    cursor: text;
  }
  .el-breadcrumb__item:first-child {
    .el-breadcrumb__inner a {
      color: #989ab3 !important;
      cursor: text;
    }
  }
  .el-breadcrumb__item:nth-child(2) {
    .el-breadcrumb__inner a {
      color: #989ab3 !important;
      cursor: text;
    }
  }
  .el-breadcrumb__item:last-child {
    .el-breadcrumb__inner a {
      color: #2b2c43 !important;
      font-weight: 500 !important;
    }
  }
}
</style>
