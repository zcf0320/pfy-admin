<template>
  <div class="flow-function card">
    <div class="flex header">
      <div class="card-title flex">
        <div class="icon" />
        <span>常用功能</span>
      </div>
      <div class="tip" @click="dialogVisible = true" />
    </div>
    <div class="box flex">
      <div
        v-for="item in showList"
        :key="item.value"
        class="list flex item"
        @click="$router.push({ name: item.url })"
      >
        <div class="img" />
        <span>{{ item.label }}</span>
      </div>
    </div>
    <el-dialog
      title="已选功能"
      :visible.sync="dialogVisible"
      width="600px"
      class="bold-dialog"
    >
      <el-scrollbar style="height: 450px; overflow-x: hidden">
        <div class="show">
          <div class="container flex height">
            <div
              v-for="(item, curIndex) in selected"
              :key="item.value"
              class="item flex"
            >
              <div class="delete option" @click="reduce(item, curIndex)" />
              <div class="img" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
        <el-divider content-position="center"
          ><span class="show-text">以上功能展示在工作台</span></el-divider
        >
        <div v-for="item in list" :key="item.label" class="show menu">
          <div v-if="item.children.length > 0" class="title">
            {{ item.label }}
          </div>
          <div class="container flex">
            <div
              v-for="items in item.children"
              :key="items.value"
              class="item flex"
            >
              <div
                v-if="selected.length < 8"
                class="add option"
                @click="add(items)"
              />
              <div class="img" />
              <span>{{ items.label }}</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'flowFunction',
  data() {
    return {
      dialogVisible: false,
      selected: [],
      showList: []
    };
  },
  computed: {
    ...mapGetters(['menuList']),
    list() {
      const list = [];
      const menuList = JSON.parse(JSON.stringify(this.menuList));
      menuList.forEach((item, index) => {
        list.push({ label: item.label, value: item.value, children: [] });
        const children = item.children;
        for (const i in children) {
          const son = children[i].children;
          for (const j in son) {
            list[index].children.push({
              label: son[j].label,
              value: son[j].value,
              url: son[j].url,
              parentValue: item.value
            });
          }
        }
      });
      return list;
    }
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$store.dispatch('workflow/menusList').then(res => {
        const data = res.data;
        if (data.flag === 'false') {
          this.getDefault();
        } else {
          this.selected = JSON.parse(JSON.parse(data.menus).menus);
          this.fliterMenus();
        }
        this.showList = JSON.parse(JSON.stringify(this.selected));
      });
    },
    add(data) {
      this.selected.push(data);
      this.list.forEach(item => {
        item.children.forEach((items, index) => {
          items.value === data.value && item.children.splice(index, 1);
        });
      });
    },
    reduce(data, curIndex) {
      this.list.forEach(item => {
        if (item.value === data.parentValue) {
          item.children.push(data);
        }
      });
      this.selected.splice(curIndex, 1);
    },
    getDefault() {
      this.list.forEach(item => {
        const children = item.children;
        for (const i in children) {
          if (this.selected.length < 8) {
            this.selected.push(children[i]);
          } else {
            return false;
          }
        }
      });
    },
    submit() {
      this.$store
        .dispatch('workflow/menusUpdate', {
          menus: JSON.stringify(this.selected)
        })
        .then(() => {
          this.showList = JSON.parse(JSON.stringify(this.selected));
          this.getMenuList();
          this.$message.success('保存成功');
          this.dialogVisible = false;
        });
    },
    fliterMenus() {
      for (const j in this.selected) {
        for (const x in this.list) {
          for (const i in this.list[x].children) {
            if (this.list[x].children[i].value === this.selected[j].value) {
              this.list[x].children.splice(i, 1);
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flow-function {
  height: 272px;
  .header {
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('../images/function.svg');
      background-size: 100% 100%;
    }
    .tip {
      width: 22px;
      height: 22px;
      background: url('../images/setting.svg');
      background-size: 100% 100%;
      &:hover {
        background: url('../images/setting_active.svg');
      }
    }
  }
  .box {
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 40px auto 0;
    .list {
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      font-size: 14px;
      color: #464668;
      margin-bottom: 40px;
      flex: 0 0 25%;
      .img {
        width: 40px;
        height: 40px;
        background: url('../images/f1.svg');
        background-size: 100% 100%;
        margin-bottom: 8px;
        cursor: pointer;
      }
      span{
         cursor: pointer;
      }
    }
  }
  .show {
    .height {
      height: 168px;
    }
    .container {
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 577px;
      margin-top: 7px;
      .item {
        justify-content: center;
        align-items: center;
        align-self: center;
        flex-direction: column;
        font-size: 14px;
        color: #464668;
        margin-bottom: 20px;
        position: relative;
        width: 110px;
        user-select: none;
        .img {
          width: 40px;
          height: 40px;
          margin-bottom: 8px;
          background: url('../images/f1.svg');
          background-size: 100% 100%;
        }
        .option {
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          position: absolute;
          top: -6px;
          right: 31px;
          cursor: pointer;
        }
        .add {
          background: url('../images/add.svg');
        }
        .delete {
          background: url('../images/delete.svg');
        }
      }
      .item:nth-child(8n + 1) {
        .img {
          background: url('../images/f1.svg');
        }
      }
      .item:nth-child(8n + 2) {
        .img {
          background: url('../images/f2.svg');
        }
      }
      .item:nth-child(8n + 3) {
        .img {
          background: url('../images/f3.svg');
        }
      }
      .item:nth-child(8n + 4) {
        .img {
          background: url('../images/f4.svg');
        }
      }
      .item:nth-child(8n + 5) {
        .img {
          background: url('../images/f5.svg');
        }
      }
      .item:nth-child(8n + 6) {
        .img {
          background: url('../images/f6.svg');
        }
      }
      .item:nth-child(8n + 7) {
        .img {
          background: url('../images/f7.svg');
        }
      }
      .item:nth-child(8n + 8) {
        .img {
          background: url('../images/f8.svg');
        }
      }
      .box:nth-child(4n) {
        margin-right: 0;
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 24px 10px;
      color: #464668;
    }
  }
  .show-text {
    color: #989ab3;
  }
  .item:nth-child(8n + 1) {
    .img {
      background: url('../images/f1.svg');
    }
  }
  .item:nth-child(8n + 2) {
    .img {
      background: url('../images/f2.svg');
    }
  }
  .item:nth-child(8n + 3) {
    .img {
      background: url('../images/f3.svg');
    }
  }
  .item:nth-child(8n + 4) {
    .img {
      background: url('../images/f4.svg');
    }
  }
  .item:nth-child(8n + 5) {
    .img {
      background: url('../images/f5.svg');
    }
  }
  .item:nth-child(8n + 6) {
    .img {
      background: url('../images/f6.svg');
    }
  }
  .item:nth-child(8n + 7) {
    .img {
      background: url('../images/f7.svg');
    }
  }
  .item:nth-child(8n + 8) {
    .img {
      background: url('../images/f8.svg');
    }
  }
}
</style>
