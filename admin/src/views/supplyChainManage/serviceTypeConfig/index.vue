<template>
  <div class="tag-libray-page page-form modal-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            分类设置<button
              class="btn-save fr"
              @click="createType(1, 0)"
            >
              新增一级分类
            </button>
          </div>
          <div class="filter-box mb-20">
            <div class="search-form">
              <div class="flex-box">
                <div class="line-form mr-16">

                  <!-- <i class="el-icon-search searchto"></i> -->
                  <el-cascader
                    v-model="filter"

                    :options="options"
                    filterable
                    :props="props"
                    style="width: 400px"
                    @change="search"
                  />
                  <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button>
                  <el-button type="danger" plain
                  @click.native.prevent="clearFilter"
                  >重置</el-button> -->
                </div>
                 <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>

            </div>
          </div>
        </div>

        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <div class="grid-content-top">一级分类</div>
              <div class="grid-content-btm">
                <el-scrollbar style="height: 100%">
                  <div
                    v-for="(item, index) in firstList"
                    :key="item.id"
                    :class="{
                      row: true,
                      flex: true,
                      active: firstIndex == index ? true : false
                    }"
                    @click="setIndex(1, item.id, index)"
                  >
                    <span>{{ item.name }}</span>
                    <el-dropdown>
                      <div :class="firstIndex === index ?'active-dot':'dot'" />
                      <el-dropdown-menu slot="dropdown" class="cata-drop">
                        <el-dropdown-item
@click.native="createType(2, item.id)"
>创建子分类</el-dropdown-item>
                        <el-dropdown-item
                          divided
                          @click.native="editType(1, item.id, item.name, 0)"
                          >编辑</el-dropdown-item>
                        <el-dropdown-item divided>
                          <el-popconfirm
                            title="删除后将不可恢复，是否删除？"
                            placement="top"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            confirm-button-type="plain"
                            cancel-button-type="primary"
                            :hide-icon="true"
                            @onConfirm="deleteTags(1, item.id)"
                          >
                            <div slot="reference" class="delete" style="color:red">删除</div>
                          </el-popconfirm>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <div class="grid-content-top">二级分类</div>
              <div class="grid-content-btm">
                <el-scrollbar style="height: 100%">
                  <div
                    v-for="(item, index) in secondList"
                    :key="item.id"
                    :class="{
                      row: true,
                      flex: true,
                      active: secondIndex == index ? true : false
                    }"
                    @click="setIndex(2, item.id, index)"
                  >
                    <span>{{ item.name }}</span>
                    <el-dropdown>
                      <div :class="secondIndex === index ?'active-dot':'dot'" />
                      <el-dropdown-menu slot="dropdown" class="cata-drop">
                        <el-dropdown-item
@click.native="createType(3, item.id)"
>创建子分类</el-dropdown-item>
                        <el-dropdown-item
                          divided
                          @click.native="
                            editType(2, item.id, item.name, item.pid)
                          "
                          >编辑</el-dropdown-item>
                        <el-dropdown-item divided>
                          <el-popconfirm
                            title="删除后将不可恢复，是否删除？"
                            placement="top"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            confirm-button-type="plain"
                            cancel-button-type="primary"
                            :hide-icon="true"
                            @onConfirm="deleteTags(2, item.id)"
                          >
                            <div slot="reference" class="delete" style="color:red">删除</div>
                          </el-popconfirm>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <div class="grid-content-top">三级分类</div>
              <div class="grid-content-btm">
                <el-scrollbar style="height: 100%">
                  <div
                    v-for="(item, index) in thirdList"
                    :key="item.id"
                    :class="{
                      row: true,
                      flex: true,
                      active: thirdIndex == index ? true : false
                    }"
                    @click="setIndex(3, index)"
                  >
                    <span>{{ item.name }}</span>
                    <el-dropdown>
                      <div :class="thirdIndex === index ?'active-dot':'dot'" />
                      <el-dropdown-menu slot="dropdown" class="cata-drop">
                        <el-dropdown-item
                          @click.native="
                            editType(3, item.id, item.name, item.pid)
                          "
                          >编辑</el-dropdown-item>
                        <el-dropdown-item divided>
                          <el-popconfirm
                            title="删除后将不可恢复，是否删除？"
                            placement="top"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            confirm-button-type="plain"
                            cancel-button-type="primary"
                            :hide-icon="true"
                            @onConfirm="deleteTags(3, item.id)"
                          >
                            <div slot="reference" class="delete" style="color:red">删除</div>
                          </el-popconfirm></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-scrollbar>
      <AddTypeModal
        v-if="isShow"
        :id="id"
        :pid="pid"
        :level="level"
        :name="name"
        :is-edit="isEdit"
        @close="isShow = false"
        @save="save"
        @editSave="editSave"
      />
    </el-container>
  </div>
</template>
<script>
import AddTypeModal from './component/addTypeModal';
import { mapActions } from 'vuex';
export default {
  name: 'ServiceType',
  components: {
    AddTypeModal
  },
  data() {
    return {
      typeList: [],
      isShow: false,
      pid: 0,
      deleteIndex: 0,
      deleteState: false,
      firstList: [],
      firstIndex: -1,
      secondList: [],
      secondIndex: -1,
      thirdList: [],
      thirdIndex: -1,
      level: 0,
      isEdit: false,
      name: '',
      filter: '',
      options: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'childs',
        checkStrictly: true
      }
    };
  },
  watch: {
    firstIndex(newValue) {
      if (newValue) {
        this.secondIndex = -1;
        this.thirdIndex = -1;
      }
    }
  },
  created() {
    this.getList(1, 0);
    this.getTree();
  },
  methods: {
    ...mapActions('serviceType', ['getTypeList', 'deleteType', 'getTreeList']),
    getList(level, pid, isAdd = false) {
      const params = {
        level,
        pid,
        time: new Date()
      };
      this.getTypeList(params)
        .then(res => {
          if (level === 1) {
            this.firstList = res.data || [];
            if (!isAdd) {
              this.secondList = [];
              this.thirdList = [];
            }
          } else if (level === 2) {
            this.secondList = res.data || [];
            this.thirdList = [];
          } else {
            this.thirdList = res.data || [];
          }
        })
        .catch(() => {
          if (level === 1) {
            this.firstList = [];
            this.firstIndex = -1;
          } else if (level === 2) {
            this.secondList = [];
            this.thirdList = [];
            this.secondIndex = -1;
            this.thirdIndex = -1;
          } else {
            this.thirdList = [];
            this.thirdIndex = -1;
          }
        });
    },
    // 新增分类
    createType(type, pid) {
      this.isEdit = false;
      this.pid = pid;
      this.level = type;
      this.isShow = true;
      this.deleteState = false;
    },
    // 关闭分类弹框
    closeAddTagModal() {
      this.isShow = false;
      this.getList(this.level, this.pid);
      this.getTree();
    },
    // 删除状态切换
    deleteStateChange(index) {
      this.deleteIndex = index;
      this.deleteState = true;
    },
    // 新增分类
    save() {
      this.closeAddTagModal();
      if (this.level === 1) {
        this.getList(1, 0, true);
      }
    },
    // 删除分类
    deleteTags(level, id) {
      this.deleteType({
        level,
        id
      }).then(res => {
        if (res.status) {
          this.$message.success(res.message);
          this.listToDelete(level, id);
        }
      });
    },
    // 取消删除
    cancelDelete() {
      this.deleteState = false;
      this.getList();
    },
    setIndex(type, pid, index) {
      switch (type) {
        case 1:
          this.firstIndex = index;
          this.getList(type + 1, pid);
          break;
        case 2:
          this.secondIndex = index;
          this.getList(type + 1, pid);
          break;
        case 3:
          this.thirdIndex = index;
          break;
        default:
          break;
      }
    },
    listToDelete(level, id) {
      let list = [];
      switch (level) {
        case 1:
          list = this.firstList;
          break;
        case 2:
          list = this.secondList;
          break;
        case 3:
          list = this.thirdList;
          break;
        default:
          break;
      }
      list &&
        list.length > 0 &&
        list.forEach((item, index) => {
          if (item.id === id) {
            list.splice(index, 1);
          }
          if (level === 2) {
            this.thirdList = [];
          }
        });
    },
    editType(level, id, name, pid) {
      this.name = name;
      this.isEdit = true;
      this.id = id;
      this.pid = pid;
      this.level = level;
      this.isShow = true;
    },
    editSave() {
      this.isShow = false;
      this.getList(this.level, this.pid);
    },
    clearFilter() {
      this.filter = [];
      this.getList(1, 0);
    },
    getTree() {
      this.getTreeList().then(res => {
        const data = res.data;
        this.options = this.deleteEmpty(data);
      });
    },
    deleteEmpty(arr) {
      if (arr.length) {
        for (const i in arr) {
          if (arr[i].childs && arr[i].childs.length) {
            this.deleteEmpty(arr[i].childs);
          } else {
            delete arr[i].childs;
          }
        }
      }
      return arr;
    },
    search() {
      let index1 = -1;
      const index2 = -1;
      if (this.filter.length <= 2) {
        this.firstList.forEach((item, index) => {
          if (item.id === this.filter[0]) {
            index1 = index;
          }
        }); // 选中一级
        this.search2(2, this.filter[0], index1);

        this.thirdList = [];
      }
      if (this.filter.length <= 3 && this.filter.length > 1) {
        this.firstList.forEach((item, index) => {
          if (item.id === this.filter[0]) {
            index1 = index;
          }
        }); // 选中一级
        this.search2(2, this.filter[0], index1);
        this.search3(3, this.filter[1], index2);
      }
      if (this.filter.length === 3) {
        this.firstList.forEach((item, index) => {
          if (item.id === this.filter[0]) {
            index1 = index;
          }
        }); // 选中一级
      }
    },
    search2(level = 2, pid, index) {
      const params = {
        level,
        pid,
        time: new Date()
      };
      this.getTypeList(params).then(res => {
        this.secondList = res.data || [];
        this.firstIndex = index;
        this.secondList.forEach((item, index) => {
          if (item.id === this.filter[1]) {
            this.secondIndex = index;
          }
        }); // 选中一级 二级
        this.thirdList = [];
      });
    },
    search3(level = 3, pid) {
      const params = {
        level,
        pid,
        time: new Date()
      };
      this.getTypeList(params).then(res => {
        this.thirdList = res.data || [];
        this.thirdList.forEach((item, index) => {
          if (item.id === this.filter[2]) {
            this.thirdIndex = index;
          }
        }); // 选中一级 二级 三级
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-libray-page {
  position: relative;
  .tag {
    width: 100%;
    display: flex;
    max-height: 172px;
    flex-wrap: wrap;
    padding: 8px 0;
    overflow-y: auto;
    .tag-item {
      margin-right: 36px;
      margin-bottom: 12px;
      .text {
        color: #1e1e2f;
        font-size: 16px;
      }
      .delete-tag {
        display: inline-block;
        padding: 8px 16px 8px;
        font-size: 14px;
        border: 1px solid #3599fe;
        position: relative;
        color: #1e1e2f;
        border-radius: 4px;
        .delete {
          width: 16px;
          height: 16px;
          position: absolute;
          top: -8px;
          right: -8px;
          background-image: url('../../../assets/icon_tag_delete.svg');
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
  }
  .grid-content {
    &-top {
      height: 42px;
      background: #f3f6f9;
      border-radius: 4px 4px 0px 0px;
      font-size: 14px;
      color: #989ab3;
      line-height: 42px;
      padding-left: 24px;
    }
    &-btm {
      height: 620px;
      border: 1px solid #ebedf2;
      font-size: 16px;
      color: #545473;
    }
    .active-dot {
      width: 28px;
      height: 28px;
      background: url('../../../assets/cata_dot.png');
      background-size: 100% 100%;
    }
     .dot {
      width: 28px;
      height: 28px;
      background: url('../../../assets/cata-dot-gray.png');
      background-size: 100% 100%;
      &:hover{
         width: 28px;
      height: 28px;
         background: url('../../../assets/cata_dot.png');
           background-size: 100% 100%;
      }
    }
    .row {
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      cursor: pointer;
    }
    .active {
      background: #f1f8ff;
    }
  }
  .line-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .label-name {
      width: 90px;
    }
  }
  // /deep/ .el-cascader--medium .el-input--suffix{
  //   position: relative;
  //   // border-left: none;
  //   background: red;
  // /deep/ .el-icon-search {
  //   //  position: absolute;
  //    position: fixed;
  //    left: -20px;
  //    top: 0px;
  //   }
  // }
}
</style>
