<template>
  <div class="quesSetting">
    <div class="quesSetting-title quesSetting-flex">
      <span class="titleMain">健高问卷</span>
      <button type="button" class="btn-save" @click="goAdd(-1)">新增</button>
    </div>
    <div class="quesSetting-flex quesSetting-search">
      <el-form
        label-position="top"
        label-width="80px"
        :model="form"
        :inline="true"
        class="quesSetting-search-form"
      >
        <el-form-item label="问卷名称">
          <el-select
            v-model="form.id"
            placeholder="全部"
            style="width: 250px; margin-right: 40px"
            filterable
            @change="getList({ page: 1 })"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select
            v-model="form.status"
            placeholder="全部"
            style="width: 250px; margin-right: 40px"
            @change="getList({ page: 1 })"
          >
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            value-format="timestamp"
            :editable="false"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
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
      <el-table-column prop="name" label="问卷名称" show-overflow-tooltip />
      <el-table-column prop="status" label="启用状态">
        <template slot-scope="scope">
          <div
            :class="{
              status: true,
              open: scope.row.status === 0,
              close: scope.row.status === 1,
            }"
          >
            {{ scope.row.status === 0 ? '启用' : '停用' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template slot-scope="scope">
          <div>
            {{ $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <HoverTip
            content="查看"
            tip-class-name="icon-detail"
            class="mr-30"
            @click.native.prevent="goAdd(scope.row.id, true)"
          />
          <HoverTip
            content="编辑"
            tip-class-name="icon-edit"
            class="mr-30"
            @click.native.prevent="goAdd(scope.row.id)"
          />
          <el-popconfirm
            :title="
              `确认${scope.row.status === 0 ? '停用' : '启用'}该问卷模版吗？`
            "
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="primary"
            cancel-button-type="plain"
            :hide-icon="true"
            @onConfirm="switchItem(scope.row.id, scope.row.status)"
          >
            <HoverTip
              v-if="scope.row.status === 0"
              slot="reference"
              content="停用"
              tip-class-name="icon-disable"
            />
            <HoverTip
              v-if="scope.row.status === 1"
              slot="reference"
              content="启用"
              tip-class-name="icon-enable"
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
  </div>
</template>

<script>
export default {
  name: 'quesList',
  data() {
    return {
      form: {
        id: '',
        status: '',
        startUpdateTime: '',
        endUpdateTime: '',
        time: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      tableLoading: false,
      isEdit: false,
      options: [],
      tableDate: [],
      statusList: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '停用'
        }
      ]
    };
  },
  created() {
    this.getList({ page: 1 });
    this.getAll();
  },
  methods: {
    // 清除筛选条件
    clearFilter() {
      this.form = {
        id: '',
        status: '',
        startUpdateTime: '',
        endUpdateTime: '',
        time: ''
      };
      this.getList({});
    },
    getList(pageInfo) {
      const { page } = pageInfo;
      let params = {
        pageNum: page || 1
      };
      this.form.id && (params.id = this.form.id);
      this.form.startUpdateTime &&
        (params.startUpdateTime = this.form.startUpdateTime);
      this.form.endUpdateTime &&
        (params.endUpdateTime = this.form.endUpdateTime);
      if (this.form.status === 0) {
        params = Object.assign(params, { status: this.form.status });
      } else if (this.form.status === 1) {
        params = Object.assign(params, { status: this.form.status });
      }
      this.tableLoading = true;
      this.$store
        .dispatch('supplier/healthQuesList', params)
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
    getAll() {
      const params = {
        pageNum: 1,
        pageSize: 99999
      };
      this.$store
        .dispatch('supplier/healthQuesList', params)
        .then(response => {
          this.options = response.records;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    editItem() {
      this.isEdit = true;
      this.dialogVisible = true;
    },
    changeTime(value) {
      if (value && value.length) {
        this.form.startUpdateTime = value[0];
        this.form.endUpdateTime = value[1];
        this.getList({ page: 1 });
      }
    },
    goAdd(id, view) {
      if (view) {
        this.$router.push({
          path: '/insuranceRecord/questionnaire/questView',
          query: { id, view }
        });
      } else {
        if (id === -1) {
          this.$router.push({
            path: '/insuranceRecord/questionnaire/questAdd'
          });
        } else {
          this.$router.push({
            path: '/insuranceRecord/questionnaire/questEdit',
            query: { id }
          });
        }
      }
    },
    switchItem(id, status) {
      const params = {
        id,
        status: status === 0 ? 1 : 0
      };
      this.$store
        .dispatch('supplier/healthQuesStatus', params)
        .then(() => {
          this.getList({ page: 1 });
          this.$$message.success('操作成功');
        })
        .catch(() => {});
    }
  }
};
</script>
``

<style lang="scss" scoped>
.quesSetting {
  &-flex {
    display: flex;
  }
  &-title {
    justify-content: space-between;
    align-items: center;
    margin: 0 0 23px;
  }
  &-search {
    justify-content: space-between;
    align-items: center;
  }
  &-search-form {
    .el-form-item__label {
      font-size: 14px;
      color: #989ab3;
    }
    .el-form--inline .el-form-item {
      margin-right: 30px;
    }
  }
  .status {
    width: 55px;
    height: 24px;
    border-radius: 4px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
  }
  .open {
    background: #c9f7f4;
    color: #18c4bd;
  }
  .close {
    background: #ffe2e5;
    color: #f64e60;
  }
  .titleMain {
    font-size: 18px;

    font-weight: bolder;
    color: #464668;
  }
}
</style>
