<template>
  <div class="role-modal modal-form">
    <el-dialog
      :title="`${id === '' ? '新增角色' : '编辑角色'}`"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="role-form">
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名:" prop="roleName">
                <el-input
                  v-model="baseForm.roleName"
                  placeholder="请输入角色名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述:" prop="comments">
                <el-input
                  v-model="baseForm.comments"
                  placeholder="请输入描述"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="权限:">
                <el-tree
                  ref="tree"
                  :data="tree"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="checkKeys"
                  default-expand-all
                  :render-content="renderContent"
                  class="tree-role"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submit('baseForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'RoleModal',
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      baseForm: {
        roleName: '',
        comments: ''
      },
      defaultCheckKeys: new Set([]),
      checkKeys: [],
      tree: [],
      // defaultProps: {s
      //     children: 'children',
      //     label: 'label',
      //     id: 'value'
      // },
      rules: {
        roleName: [{ required: true, message: '角色名必填', trigger: 'blur' }],
        comments: [{ required: true, message: '描述必填', trigger: 'blur' }]
      }
    };
  },
  created() {
    if (!this.id) {
      this.getTree();
    } else {
      this.getRoleDetail(this.id);
    }
  },
  methods: {
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
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
          const postData = vm.id
            ? Object.assign(
                {},
                { ...vm.baseForm },
                {
                  roleId: vm.id,
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
            .then(res => {
              vm.loading = false;
              if (!res.code) {
                vm.$emit('closeModal', true);
              } else {
                vm.$message.warning(res.comment);
              }
            })
            .catch(() => {
              vm.loading = false;
            });
        }
      });
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
    // eslint-disable-next-line no-unused-vars
    renderContent(h, { node, data, store }) {
      let classname = '';
      if (node.level === 4) {
        classname = 'levelname';
      }
      return <p class={classname}>{node.label}</p>;
    },
    changeCss() {
      const levelName = document.getElementsByClassName('levelname'); // levelname是上面的最底层节点的名字
      for (let i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = 'left'; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = 'left';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.role-form {
  max-height: 500px;
  overflow-y: auto;
  padding-top: 2px;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
