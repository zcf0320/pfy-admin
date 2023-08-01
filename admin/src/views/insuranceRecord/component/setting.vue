<template>
  <div class="quesSetting">
    <div class="quesSetting-title quesSetting-flex">
      <span class="titleMain">选项设置</span>
      <button type="button" class="btn-save" @click="editItem(false)">
        新增
      </button>
    </div>
    <div class="quesSetting-flex quesSetting-search">
      <el-form
        label-position="top"
        label-width="80px"
        :model="form"
        class="quesSetting-search-form"
      >
        <el-form-item label="选项值">
          <el-input
            v-model="form.optionName"
            style="width: 250px"
            @keyup.enter.native="getList({ page: 1 })"
          />
        </el-form-item>
      </el-form>
      <div class="flex-box">
        <HoverTip
          content="查询"
          tip-class-name="icon-search"
          class="mr-30"
          @click.native.prevent="getList({ page: 1 })"
        />
        <HoverTip
          content="清除查询条件"
          tip-class-name="icon-reset"
          @click.native.prevent="clearFilter"
        />
      </div>
    </div>
    <el-table v-loading="tableLoading" :data="tableDate" class="table-large">
      <el-table-column prop="optionName" label="选项值" />
      <el-table-column prop="creator" label="创建人" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <div>
            {{ $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <HoverTip
            content="编辑"
            tip-class-name="icon-edit"
            class="mr-30"
            @click.native.prevent="
              editItem(true, scope.row.id, scope.row.optionName)
            "
          />
          <el-popconfirm
            title="删除后将不可恢复，是否删除？"
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="primary"
            cancel-button-type="plain"
            :hide-icon="true"
            @onConfirm="deleteItem(scope.row.id)"
          >
            <HoverTip
              slot="reference"
              content="删除"
              tip-class-name="icon-delete"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img" />
    </el-table>
    <Pagination
      :total="pagingOptions.total"
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      layout="total, prev, pager, next"
      @pagination="getList"
    />
    <el-dialog
      :title="isEdit ? '编辑选项' : '新增选项'"
      :visible.sync="dialogVisible"
      width="750px"
      class="quesSetting-dialog"
      :close-on-click-modal="false"
    >
      <el-form
        ref="ruleForm"
        label-position="top"
        label-width="80px"
        :model="dialog"
        :rules="rules"
        class="quesSetting-dia-form"
        hide-required-asterisk
      >
        <el-form-item label="选项值" prop="option">
          <el-input
            v-model="dialog.option"
            style="width: 690px"
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer quesSetting-flex">
        <div class="quesSetting-dialog-cancel">
          <button type="button" class="btn-exit" @click="dialogVisible = false">
            取消
          </button>
        </div>
        <button type="button" class="btn-save" @click="submit('ruleForm')">
          确定
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'quesSetting',
  data() {
    return {
      form: {
        optionName: ''
      },
      dialog: {
        option: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      tableLoading: false,
      dialogVisible: false,
      isEdit: false,
      id: '',
      tableDate: [],
      rules: {
        option: [{ required: true, message: '请输入选项值', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getList({ page: 1 });
  },
  methods: {
    // 清除筛选条件
    clearFilter() {
      this.form = {
        optionName: ''
      };
      this.getList({ page: 1 });
    },
    getList(pageInfo) {
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1
      };
      this.form.optionName && (params.optionName = this.form.optionName);
      this.tableLoading = true;
      this.$store
        .dispatch('supplier/healthOptionList', params)
        .then(response => {
          this.tableLoading = false;
          const { totalNum } = response;
          this.tableDate = response.records;
          this.pagingOptions.pageNo = params.pageNum;
          this.pagingOptions.total = totalNum;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    editItem(type, id, option) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.resetForm('ruleForm');
        this.isEdit = type;
        if (this.isEdit) {
          this.id = id;
          this.dialog.option = option;
        }
      });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            option: this.dialog.option
          };
          if (this.isEdit) {
            params = Object.assign(params, { id: this.id });
          }
          this.$store
            .dispatch('supplier/healthOptionSave', params)
            .then(response => {
              if (response) {
                this.getList({ page: 1 });
                this.dialogVisible = false;
                this.$message.success('保存成功');
              }
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deleteItem(id) {
      const params = {
        id
      };
      this.$store
        .dispatch('supplier/deleteOption', params)
        .then(() => {
          this.getList({ page: 1 });
          this.$message.success('删除成功');
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.quesSetting {
  &-flex {
    display: flex;
  }
  &-title {
    justify-content: space-between;
    align-items: center;
    margin: 17px 0 23px;
  }
  &-search {
    justify-content: space-between;
    align-items: center;
  }
  &-dialog {
    &-cancel {
      margin-right: 30px;
    }
    .dialog-footer {
      justify-content: flex-end;
      align-items: center;
    }
    .el-dialog__footer {
      padding: 18px 24px 18px 0 !important;
      box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
      border-radius: 0px 0px 4px 4px;
    }
    .el-dialog__header {
      padding: 30px;
      height: 80px;
    }
    .el-dialog__headerbtn {
      top: 30px;
    }
    .el-dialog__headerbtn {
      right: 30px;
      font-size: 24px;
    }
  }
  &-search-form {
    .el-form-item__label {
      font-size: 14px;
      color: #989ab3;
    }
  }
  &-dia-form {
    .el-form-item__label {
      font-size: 16px;
      color: #464668;
    }
  }
  .titleMain {
    font-size: 18px;

    font-weight: bolder;
    color: #464668;
  }
}
</style>
