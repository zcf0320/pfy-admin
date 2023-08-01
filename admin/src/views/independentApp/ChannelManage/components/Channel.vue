<template>
  <div>
    <div class="filter-form">
      <div class="title-top content-detail">
        渠道列表
        <button type="button" class="btn-save fr" @click="dialogVisible = true">
          新增渠道
        </button>
      </div>
      <div class="filter-box">
        <div class="search-form flex-between">
          <div class="flex-box">
            <div class="form-item">
              <span class="label-name">渠道名称</span>
              <SelectChannel
                ref="selectChannel"
                v-model="filter.channelCode"
                filterable
                placeholder="全部"
                @change="change"
              />
            </div>
            <div class="form-item">
              <span class="label-name">生成时间</span>
              <el-date-picker
                v-model="filterTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeTime"
              />
            </div>
          </div>
          <div class="flex-box">
            <HoverTip
              content="查询"
              tip-class-name="icon-search"
              class="mr-30"
              @click.native.prevent="getChannelList({ page: 1 })"
            />
            <HoverTip
              content="清除查询条件"
              tip-class-name="icon-reset"
              @click.native.prevent="clearFilter"
            />
          </div>
        </div>
      </div>
    </div>
    <el-table v-loading="tableLoading" :data="channelList" class="table-large">
      <el-table-column label="渠道ID">
        <template slot-scope="scope">
          <div class="channel-code">ID:{{ scope.row.channelCode || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="渠道名称">
        <template slot-scope="scope">
          <div class="channel-name">{{ scope.row.channelName || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="生成时间">
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div class="flex">
            <el-popconfirm
              :title="`确认${scope.row.state === 0 ? '禁用' : '启用'}`"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirm-button-type="plain"
              cancel-button-type="primary"
              :hide-icon="true"
              @onConfirm="updateChannel(scope.row)"
            >
              <a
                slot="reference"
                :class="`status-btn ${scope.row.state === 0 ? 'red' : 'green'}`"
              >
                {{ scope.row.state === 0 ? '停用' : '启用' }}
              </a>
            </el-popconfirm>
            <el-button class="ml-10" type="text" @click="showLog(scope.row.id)"
              >日志</el-button
            >
          </div>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img" />
    </el-table>
    <Pagination
      :total="pagingOptions.total"
      :limit="pagingOptions.pageSize"
      :page="pagingOptions.pageNo"
      layout="total, prev, pager, next"
      @pagination="getChannelList"
    />
    <Dialog
      title="新增渠道"
      :visible.sync="dialogVisible"
      :height="330"
      :width="450"
      @closed="onClose"
    >
      <el-form
        ref="ruleForm"
        inline
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        class="channel-form"
      >
        <el-form-item label="渠道名称" prop="channelName">
          <el-input
            v-model="ruleForm.channelName"
            filterable
            placeholder="请输入渠道名称"
          />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
            :maxlength="300"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注（300字以内）"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveChannel"
          >确 定</el-button
        >
      </span>
    </Dialog>
    <Dialog
      title="操作日志"
      :visible.sync="logDialog"
      destroy-on-close
      :height="300"
      :width="450"
      @closed="
        val => {
          logDialog = false;
        }
      "
    >
      <div class="log-list">
        <div v-if="logList.length > 0">
          <div v-for="(item, index) in logList" :key="index" class="log-item">
            <span class="dot" />
            <span class="time">{{ item.createTime | timeFormat }} </span>
            <span class="name">{{ item.name }} </span>
            <span class="name"
              >{{ $enums['operationType'][item.operation]
              }}{{ $enums['menuType'][item.type] }}</span
            >
          </div>
        </div>
        <div v-else>
          暂无记录
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { default as api } from '@/api/appChannelManange';
export default {
  name: 'channel',
  data() {
    return {
      tableLoading: false,
      show: false,
      filter: {
        channelCode: '',
        chanelName: '',
        beginTime: '',
        endTime: '',
        pageSize: 10,
        pageNum: 1
      },
      filterTime: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      channelList: [],
      dialogVisible: false,
      ruleForm: {
        remark: '',
        channelName: ''
      },
      rules: {
        channelName: [
          {
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }
        ]
      },
      saveLoading: false,
      logId: '',
      logDialog: false,
      logList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getChannelList();
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      this.filter.beginTime = this.filterTime[0];
      this.filter.endTime = this.filterTime[1];
      this.getChannelList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        channelCode: '',
        chanelName: '',
        serviceName: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      };
      this.filterTime = [];
      this.getChannelList();
    },
    // 获取渠道列表
    getChannelList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      api
        .getChannelListByParam(params)
        .then(res => {
          this.tableLoading = false;
          this.channelList = res.data.records || [];
          this.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          this.tableLoading = false;
          this.pagingOptions.total = 0;
        });
    },
    updateChannel(obj) {
      const state = obj.state === 0 ? 1 : 0;
      api.updateChannelStatus(obj.id, state).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        });

        this.getChannelList();
      });
    },
    change(val) {
      this.filter.channelCode = val;
      this.getChannelList();
    },
    saveChannel() {
      this.saveLoading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          return false;
        }
        api
          .saveChannel(this.ruleForm)
          .then(() => {
            this.$message.success('保存成功');
            this.dialogVisible = false;
            this.saveLoading = false;
            this.getChannelList();
            this.$refs.selectChannel.getChannelList();
            this.$refs.ruleForm.resetFields();
            this.ruleForm.remark = '';
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    },
    onClose() {
      this.ruleForm.remark = '';
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    async getLog() {
      const res = await this.$store.dispatch('app/getSysLogs', {
        id: this.logId,
        type: '117'
      });
      if (res) {
        this.logList = res.data || [];
      }
    },
    showLog(id) {
      this.logId = id;
      this.logDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.label-name {
  color: #464668 !important;
}
.channel-name {
  font-size: 14px;
  font-weight: 400;
  color: #464668;
}
.channel-code {
  font-size: 14px;
  font-weight: 400;
  color: #989ab3;
}
.status-btn {
  display: block;
  width: 47px;
  text-align: center;
  height: 34px;
  line-height: 34px;
  color: #464668;
  background: #ebedf2;
  border-radius: 4px;
  &.red {
    background: #ffe2e5;
    border-radius: 4px;
    color: #f64e60;
  }
  &.green {
    background: #c9f7f4;
    border-radius: 4px;
    color: #18c4bd;
  }
}
.channel-form {
  margin: 0;
  /deep/ .el-form-item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
  }
  /deep/ .el-form-item__content {
    flex: 1;
  }
}
</style>
