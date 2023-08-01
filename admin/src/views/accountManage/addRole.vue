<template>
  <div class="add-role">
    <el-container>
      <el-scrollbar
        ref="myScrollbar"
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="role-form">
          <el-form
            ref="baseForm"
            :model="baseForm"
            :rules="rules"
            label-width="100px"
            label-position="left"
            :inline="true"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input
                    v-model="baseForm.roleName"
                    placeholder="请输入角色名称"
                    style="width: 400px"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色描述:" prop="comments">
                  <el-input
                    v-model="baseForm.comments"
                    placeholder="请输入角色描述"
                    style="width: 400px"
                    maxlength="30"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="line" />
              </el-col>
              <Tab v-if="isEdit" :btns="btns" @change="btnChange" />
              <el-col v-show="activeIndex === '1'" :span="24">
                <el-tabs
                  v-model="activeName"
                  tab-position="left"
                  @tab-click="changeTabs"
                >
                  <el-tab-pane label="全部" name="全部" />
                  <el-tab-pane
                    v-for="item in tree"
                    :key="item.id"
                    :label="item.label"
                    :name="item.id"
                  />
                  <el-tree
                    ref="tree"
                    :data="tree"
                    :show-checkbox="!disabled"
                    node-key="id"
                    :default-checked-keys="checkKeys"
                    default-expand-all
                    class="tree-role"
                    :filter-node-method="filterNode"
                    :expand-on-click-node="false"
                    @check="handleNodeClick"
                  />
                </el-tabs>
              </el-col>
              <el-col v-show="activeIndex === '2' && isEdit" :span="24">
                <el-tabs
                  v-model="activeName"
                  tab-position="left"
                  @tab-click="changeTabs"
                >
                  <el-tab-pane label="全部" name="全部" />
                  <el-tab-pane
                    v-for="item in tree"
                    :key="item.id"
                    :label="item.label"
                    :name="item.id"
                  />
                  <el-tree
                    ref="sensitiveTree"
                    :data="sensitiveTree"
                    :show-checkbox="!disabled"
                    node-key="id"
                    :default-checked-keys="sensitiveCheckKeys"
                    default-expand-all
                    class="tree-role"
                    :render-content="sensitiveRenderContent"
                    :filter-node-method="sensitiveFilterNode"
                    :expand-on-click-node="false"
                  />
                </el-tabs>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div v-if="btnFlag" class="goTop" @click="backTop">
          <div class="arrow-top" />
        </div>
      </el-scrollbar>
    </el-container>
    <div class="page-footer">
      <el-button
        class="border-blue"
        type="primary"
        :loading="loading"
        @click="submit('baseForm')"
      >
        保 存
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addRole',
  data() {
    return {
      loading: false,
      closeClickModal: false,
      baseForm: {
        roleName: '',
        comments: ''
      },
      defaultCheckKeys: new Set([]),
      defaultSensitiveCheckKeys: new Set([]),
      checkKeys: [],
      sensitiveCheckKeys: [],
      tree: [],
      sensitiveTree: [],
      list: [],
      rules: {
        roleName: [{ required: true, message: '角色名必填', trigger: 'blur' }],
        comments: [{ required: true, message: '描述必填', trigger: 'blur' }]
      },
      activeName: '全部',
      index: '0',
      checkedList: [],
      btnFlag: false,
      scrollTop: 0,
      disabled: !!this.$route.query.isView,
      btns: [
        { value: '1', name: '功能权限' },
        { value: '2', name: '数据权限' }
      ],
      activeIndex: '1',
      isEdit: false
    };
  },
  computed: {
    data() {
      return [this.tree[this.index]];
    }
  },
  watch: {
    tree: {
      handler(newValue) {
        this.checkedList = [];
        for (let index = 0; index < newValue.length; index++) {
          this.checkedList.push([]);
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.isEdit = false;
      this.getTree();
    } else {
      this.isEdit = true;
      this.getRoleDetail(this.$route.query.id);
      this.$store
        .dispatch('role/getRoleAuthDetail', this.$route.query.id)
        .then(res => {
          this.sensitiveTree = res.obj.obj;
          this.getDefaultCheckKeys(this.sensitiveTree);
          this.sensitiveCheckKeys = [...this.defaultSensitiveCheckKeys];
        });
    }
  },
  mounted() {
    this.handleScroll();
  },
  methods: {
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
    },
    btnChange(val) {
      this.activeIndex = val;
    },
    // 提交
    submit(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          const authList = new Set(vm.$refs.tree.getCheckedKeys());
          if (![...authList].length) {
            vm.$message({
              type: 'warning',
              message: '权限不能为空'
            });
            return;
          }
          vm.loading = true;
          this.tree.forEach(item => {
            // 系统
            if (![...authList].includes(item.id)) {
              // 一级菜单
              item.children.forEach(child => {
                if (![...authList].includes(child.id)) {
                  // 页面
                  child.children.forEach(page => {
                    if (![...authList].includes(page.id)) {
                      // 按钮
                      page.children.forEach(auth => {
                        if ([...authList].includes(auth.id)) {
                          authList.add(page.id);
                          authList.add(child.id);
                          authList.add(item.id);
                        }
                      });
                    } else {
                      authList.add(child.id);
                      authList.add(item.id);
                    }
                  });
                } else {
                  authList.add(item.id);
                }
              });
            }
          });
          const postData = vm.$route.query.id
            ? Object.assign(
                {},
                { ...vm.baseForm },
                {
                  roleId: vm.$route.query.id,
                  authList: [...authList]
                },
              )
            : Object.assign(
                {},
                { ...vm.baseForm },
                {
                  authList: [...authList]
                },
              );
          vm.$store
            .dispatch('role/roleSaveOrUpdate', postData)
            .then(() => {
              if (vm.$route.query.id) {
                let sensitiveParams = [];
                sensitiveParams = vm.getLastSensitiveCheckKeys(
                  vm.sensitiveTree,
                  sensitiveParams,
                );

                vm.$store
                  .dispatch('role/addRoleAuth', {
                    authList: sensitiveParams,
                    roleId: vm.$route.query.id,
                    ...vm.baseForm
                  })
                  .then(() => {
                    const username = localStorage.getItem('username');
                    vm.$store
                      .dispatch('user/getListByUserName', username)
                      .then(res => {
                        localStorage.setItem('menu', JSON.stringify(res.obj));
                        vm.$store.dispatch('user/setMenuList', res.obj);
                      });
                    vm.loading = false;
                    vm.$message.success('保存成功');
                    vm.$router.go(-1);
                  })
                  .catch(() => {
                    vm.loading = false;
                  });
              } else {
                const username = localStorage.getItem('username');
                vm.$store
                  .dispatch('user/getListByUserName', username)
                  .then(res => {
                    localStorage.setItem('menu', JSON.stringify(res.obj));
                    vm.$store.dispatch('user/setMenuList', res.obj);
                  });
                vm.loading = false;
                vm.$message.success('保存成功');
                vm.$router.go(-1);
              }
            })
            .catch(() => {
              vm.loading = false;
            });
        }
      });
    },
    // 获取最终过敏数据
    getLastSensitiveCheckKeys(data, arr) {
      data.forEach(item => {
        if (item.children.length) {
          this.getLastSensitiveCheckKeys(item.children, arr);
        } else {
          if (arr.length) {
            const arr1 = arr.some(item2 => item2.authGroup === item.pid);
            if (!arr1) {
              if (this.$refs.sensitiveTree.getCheckedKeys().includes(item.id)) {
                const obj = {
                  authGroup: item.pid,
                  showName: 0,
                  showPhone: 0,
                  showIdCard: 0
                };
                arr.push(obj);
              }
            }
          } else {
            if (this.$refs.sensitiveTree.getCheckedKeys().includes(item.id)) {
              arr.push({
                authGroup: item.pid,
                showName: 0,
                showPhone: 0,
                showIdCard: 0
              });
            }
          }
          arr.forEach(item2 => {
            if (this.$refs.sensitiveTree.getCheckedKeys().includes(item.id)) {
              if (item2.authGroup === item.pid) {
                if (item.label === '姓名') {
                  item2.showName = 1;
                }
                if (item.label === '手机号') {
                  item2.showPhone = 1;
                }
                if (item.label === '证件号') {
                  item2.showIdCard = 1;
                }
              }
            }
          });
        }
      });
      return arr;
    },
    // treeFilter
    treeFilter(list) {
      list.forEach(item => {
        item.id = item.value;
        // 判断初始化选中权限
        if (item.flag) {
          this.defaultCheckKeys.add(item.id);
        } else {
          this.defaultCheckKeys.delete(item.id);
        }
        if (item.children && item.children.length) {
          this.treeFilter(item.children);
        }
      });

      return list;
    },
    // 获取权限树
    getTree() {
      this.$store.dispatch('role/getTree').then(res => {
        this.tree = this.treeFilter(res.obj);
        this.index = '0';
        this.checkKeys = [...this.defaultCheckKeys];
        this.$nextTick(() => {
          this.changeCss();
        });
      });
    },
    // 获取角色详情
    getRoleDetail(id) {
      this.$store.dispatch('role/getRoleDetail', id).then(res => {
        this.tree = this.treeFilter(res.obj.obj);
        this.index = '0';
        // this.$nextTick(() => {
        //   this.changeCss();
        // });
        // 由于保存的时候子级选中父级必选,在这判断子级有未选中的时候去除父级id,以免全选
        this.tree.forEach(item => {
          item.children.forEach(child => {
            if (!child.flag && this.defaultCheckKeys.has(child.id)) {
              // 去除系统id
              this.defaultCheckKeys.delete(child.id);
            }
            child.children.forEach(page => {
              if (!page.flag) {
                // 去除菜单id
                this.defaultCheckKeys.delete(child.id);
                // 去除系统id
                this.defaultCheckKeys.delete(item.id);
              }
              page.children.forEach(auth => {
                if (!auth.flag) {
                  // 去除页面id
                  this.defaultCheckKeys.delete(page.id);
                  // 去除菜单id
                  this.defaultCheckKeys.delete(child.id);
                  // 去除系统id
                  this.defaultCheckKeys.delete(item.id);
                }
              });
            });
          });
        });
        this.checkKeys = [...this.defaultCheckKeys];
        this.baseForm = {
          comments: res.obj.comments,
          roleName: res.obj.roleName
        };
      });
    },
    // 获取脱敏选中
    getDefaultCheckKeys(data) {
      // 由于保存的时候子级选中父级必选,在这判断子级有未选中的时候去除父级id,以免全选
      for (let i = 0; i < data.length; i++) {
        data[i].id = data[i].value;
        if (data[i].children && data[i].children.length < 1) {
          if (data[i].flag) {
            this.defaultSensitiveCheckKeys.add(data[i].id);
          }
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          if (data[i].children) {
            this.getDefaultCheckKeys(data[i].children);
          }
        }
      }
    },
    renderContent(h, { node, data }) {
      let className = '';
      if (node.level === 5) {
        className = 'level5';
        return <p class={className}>{node.label}</p>;
      } else {
        return (
          <p class={'node' + data.id} ref={'node' + data.id}>
            {node.label}
          </p>
        );
      }
    },
    sensitiveRenderContent(h, { node, data }) {
      if (
        (node.level === 4 && !node.childNodes.length) ||
        (node.level === 5 && !node.childNodes.length)
      ) {
        return (
          <p class='custom-tree-node'>
            <span class='custom-label'>{node.label}</span>
            <span class='tip'>{node.checked ? '可见' : '不可见'}</span>
          </p>
        );
      } else {
        return <p ref={'node' + data.id}>{node.label}</p>;
      }
    },
    changeCss() {
      const levelName = document.getElementsByClassName('level5'); // levelname是上面的最底层节点的名字
      for (let i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = 'left'; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.marginRight = '24px'; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = 'right';
        levelName[i].parentNode.style.styleMarginRight = '24px';
      }
    },
    changeTabs(tab) {
      this.index = tab.index;
      this.$nextTick(() => {
        this.$refs.tree.filter(tab.label);
        this.$refs.sensitiveTree.filter(tab.label);
        // this.changeCss();
      });
    },
    getCheck() {
      const authList = [];
      this.$refs.tree.forEach(item => {
        item.getCheckedKeys().forEach(items => {
          return authList.push(items);
        });
      });
      return authList;
    },
    flatten(arr) {
      return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? this.flatten(item) : item);
      }, []);
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    },
    handleScroll() {
      const scrollbarEl = this.$refs.myScrollbar.wrap;
      scrollbarEl.onscroll = () => {
        if (scrollbarEl.scrollTop > 10) {
          this.btnFlag = true;
        } else {
          this.btnFlag = false;
        }
      };
    },
    filterNode(value, data, node) {
      if (!value || value === '全部') return true;

      const one = data.label.indexOf(value) !== -1;
      const two =
        node.parent &&
        node.parent.data &&
        node.parent.data.label &&
        node.parent.data.label.indexOf(value) !== -1;
      const three =
        node.parent &&
        node.parent.parent &&
        node.parent.parent.data &&
        node.parent.parent.data.label &&
        node.parent.parent.data.label.indexOf(value) !== -1;
      const four =
        node.parent &&
        node.parent.parent &&
        node.parent.parent.parent &&
        node.parent.parent.parent.data &&
        node.parent.parent.parent.data.label &&
        node.parent.parent.parent.data.label.indexOf(value) !== -1;
        const five = node.parent &&
        node.parent.parent &&
        node.parent.parent.parent &&
        node.parent.parent.parent.parent &&
        node.parent.parent.parent.parent.data.label &&
         node.parent.parent.parent.parent.data.label.indexOf(value) !== -1;
      let result_one = false;
      let result_two = false;
      let result_three = false;
      let result_four = false;
      const resultFive = false;
      if (node.level === 1) {
        result_one = one;
      } else if (node.level === 2) {
        result_two = one || two;
      } else if (node.level === 3) {
        result_three = one || two || three;
      } else if (node.level === 4) {
        result_three = one || two || three || four;
      } else if (node.level === 5) {
        result_four = one || two || three || four || five;
      }
      return result_one || result_two || result_three || result_four || resultFive;
    },
    sensitiveFilterNode(value, data, node) {
      if (!value || value === '全部') return true;
      const one = data.label.indexOf(value) !== -1;
      const two =
        node.parent &&
        node.parent.data &&
        node.parent.data.label &&
        node.parent.data.label.indexOf(value) !== -1;
      const three =
        node.parent &&
        node.parent.parent &&
        node.parent.parent.data &&
        node.parent.parent.data.label &&
        node.parent.parent.data.label.indexOf(value) !== -1;
      const four =
        node.parent &&
        node.parent.parent &&
        node.parent.parent.parent &&
        node.parent.parent.parent.data &&
        node.parent.parent.parent.data.label &&
        node.parent.parent.parent.data.label.indexOf(value) !== -1;
      const five =
        node.parent &&
        node.parent.parent &&
        node.parent.parent.parent &&
        node.parent.parent.parent.data &&
        node.parent.parent.parent.data.label &&
        node.parent.parent.parent.parent.data.label &&
        node.parent.parent.parent.parent.data.label.indexOf(value) !== -1;
      let result_one = false;
      let result_two = false;
      let result_three = false;
      const result_four = false;
      const result_five = false;
      if (node.level === 1) {
        result_one = one;
      } else if (node.level === 2) {
        result_two = one || two;
      } else if (node.level === 3) {
        result_three = one || two || three;
      } else if (node.level === 4) {
        result_three = one || two || three || four;
      } else if (node.level === 5) {
        result_three = one || two || three || four || five;
      }
      return (
        result_one || result_two || result_three || result_four || result_five
      );
    },
    setChecked(id, text, node) {
      const flag = node.checkedKeys.some(item => {
        return item === id;
      });
      text && this.$refs.tree.setChecked(id, true, false);
      text && !flag && this.$message.success(`关联权限(${text})已同步选中`);
    },
    handleNodeClick(data, node) {
      const flag = node.checkedKeys.some(item => {
        return item === data.id;
      });
      if (data.id === '10010206' && flag) {
        this.setChecked('10010204', '服务项编辑', node);
      } else if (data.id === '19030301' && flag) {
        this.setChecked('19030305', '电话问诊查看', node);
      } else if (data.id === '11010403' && flag) {
        this.setChecked('11010405', '预约服务查看', node);
      } else if (data.id === '11010603' && flag) {
        this.setChecked('11010602', '商品兑换查看', node);
      } else if (data.id === '11010102' && flag) {
        this.setChecked('11010105', '用户管理查看', node);
      } else {
        this.setChecked('', '', node);
      }
    }
  }
};
</script>
<style lang="scss">
.add-role {
  position: relative;
  .new {
    width: 14px;
    height: 14px;
  }
  .level4 {
    float: left;
  }
  .tree-role {
    margin-left: 30px;
    padding-bottom: 30px;
    font-size: 14px;
  }
  .goTop {
    cursor: pointer;
    position: fixed;
    right: 35px;
    bottom: 92px;
    width: 38px;
    height: 38px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);
    border-radius: 50%;
    z-index: 9;
    .arrow-top {
      width: 15px;
      height: 15px;
      border-top: 2px solid #3599fe;
      border-right: 2px solid #3599fe;
      transform: rotate(-45deg);
      margin-right: 30px;
      margin-top: 6px;
      position: absolute;
      top: 10px;
      left: 12px;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #ebedf2;
    margin-bottom: 24px;
  }
  .btn-group::after {
    box-shadow: none;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    .custom-label {
      color: #989ab3;
      font-size: 14px;
    }
    .tip {
      font-size: 12px;
      color: #989ab3;
      margin-left: 10px;
    }
  }
}
</style>
