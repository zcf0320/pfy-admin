<template>
  <div
    :class="{ 'menus-tree': true, 'menu-close-panel': !status }"
    :style="{ width: status ? '244px' : '72px' }"
  >
    <div v-show="status" class="logo" @click="$router.push('/')">
      <div v-if="appEnv !== 'prod'" class="logo-img-test" />
      <div v-else class="logo-img" />
    </div>
    <div
      :class="{
        'menu-option': true,
        'menu-close': status,
        'menu-open': !status,
      }"
      @click="changPanel"
    />
    <div class="menu-select">
      <i
        :class="{ 'el-icon-search': true, 'menu-search-top': !status }"
        @click="searchOpen"
      />
      <el-select
        v-show="status"
        v-model="menuSearch"
        placeholder="关键词搜索"
        filterable
        remote
        class="select"
        :remote-method="remoteMethod"
        @change="goPath"
      >
        <el-option
          v-for="item in showList"
          :key="item.value"
          :label="item.label"
          :value="item.url"
      /></el-select>
    </div>
    <div :class="{ tree: true, 'tree-menu': !status }">
      <div
        :class="[
          'home',
          'flex',
          clickHome ? `icon_home_active` : `icon_menu_home`,
        ]"
        @click="goHome"
      >
        <div
          :class="['icon', clickHome ? `icon_home_active` : `icon_menu_home`]"
          :style="{
            width: !status ? '18px' : '12px',
            height: !status ? '18px' : '12px',
            margin: !status ? '38px 0px 0px 3px' : '-5px 16px 0 0',
          }"
        />
        <span v-show="status">首页</span>
      </div>
      <div
        v-for="(item, index) in menuList"
        :key="index"
        :class="{ 'menus-item': true }"
      >
        <div v-show="status" class="system">{{ item.label }}</div>
        <div v-show="!status" class="menu-dot" />
        <div
          v-for="(parent, parentIndex) in item.children"
          :key="parentIndex"
          class="menus"
        >
          <div
            :class="[
              'menus-parent',
              openStatus &&
                systemActiveIndex === index &&
                parentActiveIndex === parentIndex &&
                'menus-parent-active',
            ]"
            :style="{ padding: !status ? '0 0 0 26px' : '0 24px' }"
            @click="parentClick(index, parentIndex)"
          >
            <div
              :class="[
                'icon',
                openStatus &&
                systemActiveIndex === index &&
                parentActiveIndex === parentIndex
                  ? `${parent.iconActive}`
                  : `${parent.icon}`,
              ]"
              :style="{
                width: !status ? '18px' : '12px',
                height: !status ? '18px' : '12px',
              }"
            />
            <div v-show="status" class="menus-name">
              {{ parent.label }}
              <div v-if="parent.hasRemind" class="remind-icon" />
            </div>
            <div
              v-show="status"
              :class="[
                'action-right',
                openStatus &&
                  systemActiveIndex === index &&
                  parentActiveIndex === parentIndex &&
                  'action-down',
              ]"
            />
          </div>
          <div
            v-show="status"
            :class="[
              'menus-child',
              openStatus &&
                systemActiveIndex === index &&
                parentActiveIndex === parentIndex &&
                'menus-child-open',
            ]"
          >
            <div
              v-for="(child, childIndex) in parent.children"
              :key="childIndex"
              :class="[
                'sub-menus-name',
                subMenusActiveIndex === childIndex &&
                  systemActiveIndex === index &&
                  parentActiveIndex === parentIndex &&
                  'sub-menus-name-active',
              ]"
              @click="history(child.url, childIndex)"
            >
              <div class="sub-icon" />
              <div class="name">
                {{ child.label }}
                <div v-if="child.remindNumber" class="remind-number">
                  {{ child.remindNumber }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Menus',
  data() {
    return {
      systemActiveIndex: null,
      parentActiveIndex: null,
      subMenusActiveIndex: null,
      openStatus: false,
      menuSearch: '',
      searchText: '',
      showList: [],
      clickHome: false
    };
  },
  computed: {
    ...mapGetters(['menuList']),
    appEnv() {
      return process.env.VUE_APP_ENV;
    },
    searchList() {
      const data = [];
      const menuList = JSON.parse(JSON.stringify(this.menuList));
      menuList.forEach(item => {
        for (const i in item.children) {
          const children = item.children[i];
          for (const j in children.children) {
            const son = {};
            const third = children.children[j];
            son.label = `${children.label} / ${third.label}`;
            son.url = `${third.url}`;
            son.value = third.value;
            data.push(son);
          }
        }
      });
      return data;
    },
    status() {
      return this.$store.state.app.barStatus;
    }
  },
  watch: {
    $route() {
      this.refreshMenu();
      if (this.$route.fullPath === '/workflow') {
        this.clickHome = true;
        this.parentActiveIndex = null;
        this.subMenusActiveIndex = null;
        this.systemActiveIndex = null;
      } else {
        this.clickHome = false;
      }
    }
  },
  created() {
    if (this.$route.fullPath === '/workflow') {
      this.clickHome = true;
    } else {
      this.clickHome = false;
    }
  },
  mounted() {
    this.refreshMenu();
  },
  methods: {
    ...mapMutations('app', ['SET_PAGE_NUM']),
    history(path, childIndex) {
      // 清除列表页查询分页历史
      sessionStorage.removeItem('historyFilter');
      this.SET_PAGE_NUM(0);
      this.$router.push({
        name: path
      });
      this.subMenusActiveIndex = childIndex;
    },
    // 菜单展开
    parentClick(systemIndex, parentIndex) {
      if (!this.status) {
        this.$store.dispatch('app/toggleBar');
        return;
      }
      // 重复点击展开收缩菜单
      if (!this.openStatus) {
        this.openStatus = true;
      } else {
        if (
          this.systemActiveIndex === systemIndex &&
          this.parentActiveIndex === parentIndex
        ) {
          this.openStatus = false;
        } else {
          this.openStatus = true;
        }
      }
      this.systemActiveIndex = systemIndex;
      this.parentActiveIndex = parentIndex;
      this.checkPage();
    },
    // 校验当前打开页面是否在当前菜单中
    checkPage() {
      this.menuList.forEach((system, systemIndex) => {
        system.children.forEach((menu, menuIndex) => {
          menu.children.forEach((item, subMenusActiveIndex) => {
            if (item.url === this.$route.name) {
              if (
                this.systemActiveIndex === systemIndex &&
                this.parentActiveIndex === menuIndex
              ) {
                this.subMenusActiveIndex = subMenusActiveIndex;
              } else {
                this.subMenusActiveIndex = null;
              }
            }
          });
        });
      });
    },
    refreshMenu() {
      // if (this.$isNotEmpty(this.menuList)) {
      this.menuList.forEach((system, systemIndex) => {
        system.children.forEach((menu, menuIndex) => {
          menu.children.forEach((item, subMenusActiveIndex) => {
            if (item.url === this.$route.name) {
              this.systemActiveIndex = systemIndex;
              this.parentActiveIndex = menuIndex;
              this.subMenusActiveIndex = subMenusActiveIndex;
              this.openStatus = true;
            }
          });
        });
      });
      // }
    },
    goPath() {
      this.$router.push({
        name: this.menuSearch
      });
      this.menuSearch = '';
      this.showList = [];
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = false;
        this.showList = this.searchList.filter(item => {
          return item.label.includes(query);
        });
      }
    },
    goHome() {
      if (!this.status) {
        this.$store.dispatch('app/toggleBar');
        return;
      }
      // 清除列表页查询分页历史
      sessionStorage.removeItem('historyFilter');
      this.SET_PAGE_NUM(0);
      this.$router.push({ path: '/workflow' });
      this.openStatus = false;
      this.subMenusActiveIndex = null;
      this.clickHome = true;
    },
    changPanel() {
      this.$store.dispatch('app/toggleBar');
    },
    searchOpen() {
      if (!this.status) {
        this.$store.dispatch('app/toggleBar');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/common.scss';
.menus-tree {
  transition: all 0.2s;
  min-height: 100vh;
  background-color: #1e1e2f;
  position: fixed;
  top: 0px;
  left: 0;
  overflow: hidden;
  .logo {
    padding: 13px 24px 12px;
    margin-bottom: 16px;
    cursor: pointer;
    .logo-img {
      width: 107px;
      height: 40px;
      background-image: url('../../../assets/logo_header.png');
      background-size: 100% 100%;
    }
    .logo-img-test {
      width: 119px;
      height: 40px;
      background-image: url('../../../assets/logo_header_test.png');
      background-size: 100% 100%;
    }
  }
  .tree {
    margin-top: 55px;
    max-height: calc(100vh - 109px);
    overflow-y: auto;
    .home {
      color: #b2b8c4;
      justify-content: flex-start;
      align-items: center;
      font-size: 13px;
      padding-left: 24px;
      height: 44px;
      line-height: 44px;
      cursor: pointer;
      user-select: none;
      &:active {
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
      .icon_menu_home {
        background-image: url('../../../assets/menu_icon/icon_home.svg');
      }
      .icon_home_active {
        background-image: url('../../../assets/menu_icon/icon_home_active.svg');
      }
      .icon {
        width: 12px;
        height: 12px;
        margin: -5px 16px 0 0;
        background-size: 100% 100%;
      }
    }
    &::-webkit-scrollbar {
      width: 0;
    }
    .menus-item {
      color: $menuColor;
      margin-bottom: 16px;
      .system {
        padding: 0 24px;
        font-size: 12px;
        height: 44px;
        line-height: 44px;
      }
      .menus {
        width: 100%;
        font-size: 13px;
        cursor: pointer;

        .menus-parent {
          padding: 0 24px;
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          height: 44px;
          color: $menuNormalColor;
          .icon {
            width: 12px;
            height: 12px;
            margin-right: 16px;
            background-size: 100% 100%;
          }
          .menus-name {
            overflow: hidden;
            flex: 1;
            position: relative;
            .remind-icon {
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: #f64e60;
              top: 4px;
              right: 7px;
              border-radius: 50%;
            }
          }
          .action-right {
            width: 12px;
            height: 12px;
            background-image: url('../../../assets/icon_menu-arrow.png');
            background-size: 100% 100%;
          }
          .action-down {
            width: 12px;
            height: 12px;
            background-image: url('../../../assets/icon_menu-arrow_active.png') !important;
            background-size: 100% 100%;
          }
          &:hover {
            background-color: #1b1b29;
            .menus-name {
              color: #ffffff;
            }
            .action-right {
              background-image: url('../../../assets/icon_menu-arrow_hover.png');
            }
          }

          // icon图标
          .icon_menu_insurance {
            background-image: url('../../../assets/menu_icon/icon_menu_insurance.svg');
          }
          .icon_menu_insurance_active {
            background-image: url('../../../assets/menu_icon/icon_menu_insurance_active.svg');
          }
          .icon_menu_insurance_policy {
            background-image: url('../../../assets/menu_icon/icon_menu_insurance_policy.svg');
          }
          .icon_menu_insurance_policy_active {
            background-image: url('../../../assets/menu_icon/icon_menu_insurance_policy_active.svg');
          }
          .icon_menu_insure {
            background-image: url('../../../assets/menu_icon/icon_menu_insure.svg');
          }
          .icon_menu_insure_active {
            background-image: url('../../../assets/menu_icon/icon_menu_insure_active.svg');
          }
          .icon_menu_claims {
            background-image: url('../../../assets/menu_icon/icon_menu_claims.svg');
          }
          .icon_menu_claims_active {
            background-image: url('../../../assets/menu_icon/icon_menu_claims_active.svg');
          }
          .icon_menu_tool {
            background-image: url('../../../assets/menu_icon/icon_menu_tool.svg');
          }
          .icon_menu_tool_active {
            background-image: url('../../../assets/menu_icon/icon_menu_tool_active.svg');
          }
          .icon_menu_chain {
            background-image: url('../../../assets/menu_icon/icon_menu_chain.svg');
          }
          .icon_menu_chain_active {
            background-image: url('../../../assets/menu_icon/icon_menu_chain_active.svg');
          }
          .icon_menu_healthy {
            background-image: url('../../../assets/menu_icon/icon_menu_healthy.svg');
          }
          .icon_menu_healthy_active {
            background-image: url('../../../assets/menu_icon/icon_menu_healthy_active.svg');
          }
          .icon_menu_drug {
            background-image: url('../../../assets/menu_icon/icon_menu_drug.svg');
          }
          .icon_menu_drug_active {
            background-image: url('../../../assets/menu_icon/icon_menu_drug_active.svg');
          }
          .icon_menu_inquiry {
            background-image: url('../../../assets/menu_icon/icon_menu_inquiry.svg');
          }
          .icon_menu_inquiry_active {
            background-image: url('../../../assets/menu_icon/icon_menu_inquiry_active.svg');
          }
          .icon_menu_operate {
            background-image: url('../../../assets/menu_icon/icon_menu_operate.svg');
          }
          .icon_menu_operate_active {
            background-image: url('../../../assets/menu_icon/icon_menu_operate_active.svg');
          }
          .icon_menu_project {
            background-image: url('../../../assets/menu_icon/icon_menu_project.svg');
          }
          .icon_menu_project_active {
            background-image: url('../../../assets/menu_icon/icon_menu_project_active.svg');
          }
          .icon_menu_user {
            background-image: url('../../../assets/menu_icon/icon_menu_user.svg');
          }
          .icon_menu_user_active {
            background-image: url('../../../assets/menu_icon/icon_menu_user_active.svg');
          }
          .icon_menu_data {
            background-image: url('../../../assets/menu_icon/icon_menu_data.svg');
          }
          .icon_menu_data_active {
            background-image: url('../../../assets/menu_icon/icon_menu_data_active.svg');
          }
          .icon_menu_dictionary {
            background-image: url('../../../assets/menu_icon/icon_menu_dictionary.svg');
          }
          .icon_menu_dictionary_active {
            background-image: url('../../../assets/menu_icon/icon_menu_dictionary_active.svg');
          }
          .icon_menu_treatment {
            background-image: url('../../../assets/menu_icon/icon_menu_treatment.svg');
          }
          .icon_menu_treatment_active {
            background-image: url('../../../assets/menu_icon/icon_menu_treatment_active.svg');
          }
          .icon_menu_data_1 {
            background-image: url('../../../assets/menu_icon/icon_menu_data_1.svg');
          }
          .icon_menu_data_1_active {
            background-image: url('../../../assets/menu_icon/icon_menu_data_1_active.svg');
          }
          .icon_menu_data_2 {
            background-image: url('../../../assets/menu_icon/icon_menu_data_2.svg');
          }
          .icon_menu_data_2_active {
            background-image: url('../../../assets/menu_icon/icon_menu_data_2_active.svg');
          }
          .icon_menu_data_3 {
            background-image: url('../../../assets/menu_icon/icon_menu_data_3.svg');
          }
          .icon_menu_data_3_active {
            background-image: url('../../../assets/menu_icon/icon_menu_data_3_active.svg');
          }
          .icon_menu_settle {
            background-image: url('../../../assets/menu_icon/icon_menu_settle.svg');
          }
          .icon_menu_settle_active {
            background-image: url('../../../assets/menu_icon/icon_menu_settle_active.svg');
          }
          .icon_menu_marketing_tool {
            background-image: url('../../../assets/menu_icon/icon_menu_marketing_tool.svg');
          }
          .icon_menu_marketing_tool_active {
            background-image: url('../../../assets/menu_icon/icon_menu_marketing_tool_active.svg');
          }
          .icon_menu_approval {
            background-image: url('../../../assets/menu_icon/icon_menu_approval.svg');
          }
          .icon_menu_approval_active {
            background-image: url('../../../assets/menu_icon/icon_menu_approval_active.svg');
          }
          .icon_menu_tools_store {
            background-image: url('../../../assets/menu_icon/icon_menu_tools_store.svg');
          }
          .icon_menu_tools_store_active {
            background-image: url('../../../assets/menu_icon/icon_menu_tools_store_active.svg');
          }
          .icon_menu_sales_center {
            background-image: url('../../../assets/menu_icon/icon_menu_sales_center.svg');
          }
          .icon_menu_sales_center_active {
            background-image: url('../../../assets/menu_icon/icon_menu_sales_center_active.svg');
          }
          .icon_menu_purchase_management {
            background-image: url('../../../assets/menu_icon/icon_menu_purchase_management.svg');
          }
          .icon_menu_purchase_management_active {
            background-image: url('../../../assets/menu_icon/icon_menu_purchase_management_active.svg');
          }
          .icon_menu_leaving_message {
            background-image: url('../../../assets/menu_icon/icon_menu_leaving_message.svg');
          }
          .icon_menu_leaving_message_active {
            background-image: url('../../../assets/menu_icon/icon_menu_leaving_message_active.svg');
          }

          .icon_menu_message {
            background-image: url('../../../assets/menu_icon/icon_menu_message.svg');
          }
          .icon_menu_message_active {
            background-image: url('../../../assets/menu_icon/icon_menu_message_active.svg');
          }
          .icon_menu_cala {
            background-image: url('../../../assets/menu_icon/icon_menu_cala.svg');
          }
          .icon_menu_cala_active {
            background-image: url('../../../assets/menu_icon/icon_menu_cala_active.svg');
          }
          .icon_menu_legal_affairs {
            background-image: url('../../../assets/menu_icon/icon_menu_legal_affairs.svg');
          }
          .icon_menu_legal_affairs_active {
            background-image: url('../../../assets/menu_icon/icon_menu_legal_affairs_active.svg');
          }
          .icon_menu_standalone_app {
            background-image: url('../../../assets/menu_icon/icon_menu_standalone_app.svg');
          }
          .icon_menu_standalone_app_active {
            background-image: url('../../../assets/menu_icon/icon_menu_standalone_app_active.svg');
          }
          .icon_menu_company_settlement {
            background-image: url('../../../assets/menu_icon/icon_menu_company_settlement.svg');
          }
          .icon_menu_company_settlement_active {
            background-image: url('../../../assets/menu_icon/icon_menu_company_settlement_active.svg');
          }
          .icon_menu_suppiler_settlement {
            background-image: url('../../../assets/menu_icon/icon_menu_suppiler_settlement.svg');
          }
          .icon_menu_suppiler_settlement_active {
            background-image: url('../../../assets/menu_icon/icon_menu_suppiler_settlement_active.svg');
          }
          .icon_menu_questionnaire_service {
            background-image: url('../../../assets/menu_icon/icon_menu_questionnaire_service.svg');
          }
          .icon_menu_questionnaire_service_active {
            background-image: url('../../../assets/menu_icon/icon_menu_questionnaire_service_active.svg');
          }
          .icon_menu_chinese_medicine {
            background-image: url('../../../assets/menu_icon/icon_menu_chinese_medicine.svg');
          }
          .icon_menu_chinese_medicine_active {
            background-image: url('../../../assets/menu_icon/icon_menu_chinese_medicine_active.svg');
          }
          .icon_menu_channel {
            background-image: url('../../../assets/menu_icon/icon_menu_channel.svg');
          }
          .icon_menu_channel_active {
            background-image: url('../../../assets/menu_icon/icon_menu_channel_active.svg');
          }
          .icon_menu_sleep {
            background-image: url('../../../assets/menu_icon/icon_menu_sleep.svg');
          }
          .icon_menu_sleep_active {
            background-image: url('../../../assets/menu_icon/icon_menu_sleep_active.svg');
          }
          .icon_menu_medication_reminder {
            background-image: url('../../../assets/menu_icon/icon_menu_medication_reminder.svg');
          }
          .icon_menu_medication_reminder_active {
            background-image: url('../../../assets/menu_icon/icon_menu_medication_reminder_active.svg');
          }
          .icon_menu_consultation {
            background-image: url('../../../assets/menu_icon/icon_menu_consultation.svg');
          }
          .icon_menu_consultation_active {
            background-image: url('../../../assets/menu_icon/icon_menu_consultation_active.svg');
          }
          .icon_menu_skin {
            background-image: url('../../../assets/menu_icon/icon_menu_skin.svg');
          }
          .icon_menu_skin_active {
            background-image: url('../../../assets/menu_icon/icon_menu_skin_active.svg');
          }
          .icon_menu_youth_health_record {
            background-image: url('../../../assets/menu_icon/icon_menu_youth_health_record.svg');
          }
          .icon_menu_youth_health_record_active {
            background-image: url('../../../assets/menu_icon/icon_menu_youth_health_record_active.svg');
          }
          .icon_menu_diabetess_management {
            background-image: url('../../../assets/menu_icon/icon_menu_diabetess_management.svg');
          }
          .icon_menu_diabetess_management_active {
            background-image: url('../../../assets/menu_icon/icon_menu_diabetess_management_active.svg');
          }
          .icon_menu_thyroid{
            background-image: url('../../../assets/menu_icon/icon_menu_thyroid.png');
          }
          .icon_menu_thyroid_active{
            background-image: url('../../../assets/menu_icon/icon_menu_thyroid_active.png');
          }
        }
        .menus-parent-active {
          color: #ffffff;
        }

        .menus-child {
          max-height: 0;
          overflow: hidden;
          .sub-menus-name {
            height: 39px;
            display: flex;
            align-items: center;
            padding-left: 46px;
            color: $menuNormalColor;
            position: relative;
            .sub-icon {
              width: 4px;
              height: 4px;
              background-color: $menuColor;
              border-radius: 50%;
              margin-right: 12px;
            }
            &:hover {
              background-color: #1b1b29;
              color: #ffffff;
              .sub-icon {
                background-color: $menuActiveColor;
              }
            }
            .remind-number {
              position: absolute;
              font-size: 12px;

              font-weight: 400;
              color: #ffffff;
              padding: 2px 4px;
              background-color: #f64e60;
              top: 10px;
              right: 23px;
              border-radius: 2px;
            }
          }
          .sub-menus-name-active {
            background-color: #1b1b29;
            color: #ffffff;
            .sub-icon {
              background-color: $menuActiveColor;
            }
          }
        }
        .menus-child-open {
          max-height: 500px;
          transition: max-height 1s;
        }
      }
    }
  }
}
.menu-close-panel {
  .menu-search-top {
    top: 90px;
    left: 28px;
    cursor: pointer;
  }
  .menu-dot {
    background: url('../../../assets/menu_dot.png');
    background-size: 100% 100%;
    width: 20px;
    height: 4px;
    margin: 38px auto 20px;
  }
  .tree-menu {
    margin-top: 104px;
  }
  .menus-parent-close {
    padding: 0;
  }
  .menus-icon-close {
    width: 18px;
    height: 18px;
  }
}
.menu-option {
  width: 17px;
  height: 16px;
  position: absolute;
  top: 28px;
  right: 24px;
  cursor: pointer;
}
.menu-close {
  background: url('../../../assets/menu_close.png');
  background-size: 100% 100%;
  &:hover {
    background: url('../../../assets/menu_close_active.png');
    background-size: 100% 100%;
  }
  &:active {
    background: url('../../../assets/menu_close_active.png');
    background-size: 100% 100%;
  }
}
.menu-open {
  background: url('../../../assets/menu_open.png');
  background-size: 100% 100%;
  left: 28px;
  &:hover {
    background: url('../../../assets/menu_open_active.png');
    background-size: 100% 100%;
  }
  &:active {
    background: url('../../../assets/menu_open_active.png');
    background-size: 100% 100%;
  }
}
</style>
