<template>
  <div class="page-role">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">
          角色权限<button
            v-if="pageAuthority.includes('add')"
            type="button"
            class="btn-save fr"
            @click="addOrEditRole('')"
          >
            新增
          </button>
        </div>
        <el-table v-loading="tableLoading" :data="roleList" class="table-large">
          <el-table-column label="角色名" fixed>
            <template slot-scope="scope">
              <span>{{ scope.row.roleName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">
              <span>{{ scope.row.comments || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="员工数">
            <template slot-scope="scope">
              <span>{{ scope.row.userNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updateDate | timeFormat('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="80">
            <template slot-scope="scope">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="查看"
                tip-class-name="icon-detail"
                class="mr-20"
                @click.native.prevent="addOrEditRole(scope.row.id, 1)"
              />
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-20"
                @click.native.prevent="addOrEditRole(scope.row.id)"
              />
              <el-popconfirm
                v-if="!scope.row.userNum"
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteRole(scope.row.id)"
              >
                <HoverTip
                  v-if="pageAuthority.includes('delete')"
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <RoleModal
          v-if="isShow"
          :id="id"
          :is-show="isShow"
          @closeModal="closeModal"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import RoleModal from './component/roleModal';
export default {
  name: 'Role',
  components: {
    RoleModal
  },
  data() {
    return {
      tableLoading: false,
      roleList: [],
      id: '',
      isShow: false
    };
  },
  computed: {
    pageAuthority() {
      // 160102 角色权限
      return this.$store.state.user.pageAuthority['160102'];
    }
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 查询角色列表
    getRoleList() {
      const vm = this;
      vm.tableLoading = true;
      vm.$store
        .dispatch('role/getRoleList')
        .then(res => {
          vm.tableLoading = false;
          vm.roleList = res.obj;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 新增或者编辑角色
    addOrEditRole(id, isView) {
      this.id = id;
      if (id) {
        if (id && isView) {
          return this.$router.push({
            path: `/accountManage/roledetail?id=${id}&isView=1`
          });
        }
        return this.$router.push({ path: `/accountManage/editrole?id=${id}` });
      } else {
        return this.$router.push({ path: '/accountManage/addRole' });
      }
    },
    // 关闭角色弹框
    closeModal(type) {
      this.isShow = false;
      if (type) {
        this.getRoleList();
      }
    },
    // 删除角色
    deleteRole(roleId) {
      const vm = this;
      vm.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$store.dispatch('role/deleteRole', roleId).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getRoleList();
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-role {
  .add-role {
    margin-bottom: 24px;
    text-align: right;
  }
}
</style>
