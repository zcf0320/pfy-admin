<template>
  <div>
    <div class="filter-form">
      <div class="title-top content-detail">
        服务列表
        <button type="button" class="btn-save fr" @click="dialogVisible = true">
          新增
        </button>
      </div>
      <div class="filter-box">
        <div class="search-form flex-between">
          <div class="flex-box">
            <div class="form-item">
              <span class="label-name">服务名称</span>
              <select-service
                v-model="filter.serviceName"
                filterable
                placeholder="请输入服务名称"
                @change="change"
              />
            </div>
            <div class="form-item">
              <span class="label-name">渠道名称</span>
              <SelectChannel
                v-model="filter.channelCode"
                filterable
                placeholder="全部"
                @change="change2"
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
              @click.native.prevent="getChannelLinkList({ page: 1 })"
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
      <el-table-column label="服务名称">
        <template slot-scope="scope">
          <div class="mb-32">{{ scope.row.serviceName || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="渠道">
        <template slot-scope="scope">
          <div class="channel-name">
            {{ scope.row.channelName || '-' }}
          </div>
          <div class="channel-code">ID:{{ scope.row.channelCode || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="渠道链接" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.channelUrl || '-' }}</span>
          <div class="copy-link mt-16" @click="copy(scope.row.channelUrl, $event)">
            复制链接
          </div>
        </template>
      </el-table-column>
      <el-table-column label="二维码">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.channelPoster"
            style="width: 56px; height: 56px"
            :src="scope.row.channelPoster"
            :preview-src-list="[scope.row.channelPoster]"
          />
          <!-- <QrCode v-if="scope.row.channelUrl" :width="56" :height="56" :url="scope.row.channelUrl"></QrCode> -->
        </template>
      </el-table-column>
      <el-table-column label="生成时间">
        <template slot-scope="scope">
          <div class="mb-32">{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div class="flex mb-32">
            <el-popconfirm
              :title="`确认${scope.row.state === 0 ? '禁用' : '启用'}`"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirm-button-type="plain"
              cancel-button-type="primary"
              :hide-icon="true"
              @onConfirm="updateChannelLink(scope.row)"
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
      @pagination="getChannelLinkList"
    />
    <Dialog
      title="新增渠道链接"
      :visible.sync="dialogVisible"
      :height="300"
      :width="450"
      @closed="
        val => {
          this.$refs.ruleForm.resetFields();
          dialogVisible = false;
        }
      "
    >
      <el-form
        ref="ruleForm"
        label-suffix=":"
        inline
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="channel-link-form"
      >
        <el-form-item label="服务名称" prop="serviceCode">
          <select-service
            v-model="ruleForm.serviceCode"
            style="width:100%"
            filterable
            placeholder="全部"
            @change="changeService"
          />
        </el-form-item>

        <el-form-item label="渠道名称" prop="channelCode">
          <SelectChannel
            v-model="ruleForm.channelCode"
            style="width:100%"
            filterable
            placeholder="全部"
            @change="changeChannel"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="saveLoading"
          @click="saveChannelLink"
          >确 定</el-button
        >
      </span>
    </Dialog>
    <Dialog
      title="操作日志"
      :visible.sync="logDialog"
      destroy-on-close
      :height="400"
      :width="450"
      @closed="closeLogDialog"
    >

          <Logs v-if="logId" :id="logId" type="117"></Logs>

    </Dialog>
  </div>
</template>
<script>
import { default as api } from '@/api/appChannelManange';
import clip from '@/utils/clipboard';
import SelectService from './SelectService.vue';
export default {
  name: 'channel-link',
  components: { SelectService },
  data() {
    return {
      tableLoading: false,
      show: false,
      filter: {
        channelCode: '',
        serviceName: '',
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
        serviceCode: '',
        channelCode: ''
      },
      rules: {
        channelCode: [
          {
            required: true,
            message: '请选择渠道名称',
            trigger: 'change'
          }
        ],
        serviceCode: [
          {
            required: true,
            message: '请选择服务名称',
            trigger: 'change'
          }
        ]
      },
      saveLoading: false,
      logId: '',
      logDialog: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getChannelLinkList();
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      this.filter.beginTime = this.filterTime[0];
      this.filter.endTime = this.filterTime[1];
      this.getChannelLinkList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        channelCode: '',
        serviceName: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      };
      this.filterTime = [];
      this.getChannelLinkList();
    },
    // 获取渠道列表
    getChannelLinkList(pageInfo) {
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
        .getChannelLinkListByParam(params)
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
    updateChannelLink(obj) {
      const state = obj.state === 0 ? 1 : 0;
      api.updateChannelLinkStatus(obj.id, state).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        });
        setTimeout(() => {
          this.getChannelLinkList();
        }, 1000);
      });
    },
    change(val) {
      this.filter.serviceName = val;
      this.getChannelLinkList();
    },
    change2(val) {
      this.filter.channelCode = val;
      this.getChannelLinkList();
    },
    changeService(val) {
      this.ruleForm.serviceCode = val;
    },
    changeChannel(val) {
      this.ruleForm.channelCode = val;
    },
    saveChannelLink() {
      this.saveLoading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          return false;
        }
        api
          .saveChannelLink(this.ruleForm)
          .then(() => {
            this.$message.success('保存成功');
            this.dialogVisible = false;
            this.saveLoading = false;
            this.getChannelLinkList();
            this.$refs.ruleForm.resetFields();
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    },
    copy(url, event) {
      clip(url, event);
    },

    showLog(id) {
      this.logId = id;
      this.logDialog = true;
    },
    closeLogDialog() {
            this.logId = '';
          this.logDialog = false;
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
    margin-top: 16px;
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
.channel-link-form {
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
.copy-link {
  color: #3599fe;
  cursor: pointer;
}
</style>
