<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="noti-message">
        <div class="title-top">
          发送记录
          <el-button
            type="primary"
            size="small"
            class="fr"
            @click="goTemplate('')"
            >短信模板</el-button>
        </div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.smsPhonenum"
                    placeholder="请输入手机号"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">模板名称:</span>
                  <el-select
                    v-model="filter.templateName"
                    filterable
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in templateList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">发送时间:</span>
                  <el-date-picker
                    v-model="fliterTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    @change="changeTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList({ page: 1, pageSize: 10 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">状态:</span>
                  <el-select
                    v-model="filter.smsStatus"
                    filterable
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="list"
              class="fix-table table-large"
            >
              <el-table-column label="手机号" prop="smsPhonenum"/>
              <el-table-column
                label="短信内容"
                show-overflow-tooltip
                prop="message"
              />
              <el-table-column label="模板名称" prop="templateName">
                <template slot-scope="scope">
                  <div
                    :class="{
                      'link-skip': scope.row.templateName ? true : false
                    }"
                    @click="goTemplate(scope.row.templateId)"
                  >
                    {{ scope.row.templateName || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发送时间">
                <template slot-scope="scope">
                  {{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row.smsStatus === '0'"
                    class="box-success flex"
                  >
                    <div class="icon"/>
                    <span>提交成功</span>
                  </div>
                  <div v-else class="box-fail flex">
                    <div class="icon"/>
                    送达失败
                  </div>
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img"/>
            </el-table>
            <Pagination
              :total="pagingOptions.total"
              :limit="pagingOptions.pageSize"
              :page="pagingOptions.pageNo"
              layout="total, prev, pager, next"
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      filter: {
        beginTime: '',
        endTime: '',
        templateName: '',
        smsPhonenum: '',
        smsStatus: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      list: [],
      templateList: [],
      fliterTime: '',
      statusList: [
        { label: '提交成功', value: 0 },
        { label: '送达失败', value: 1 }
      ]
    };
  },
  created() {
    this.getList({ page: 1 });
    this.getTemplate();
  },
  methods: {
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.$store
        .dispatch('notification/smsList', params)
        .then(res => {
          this.list = res.records;
          this.pagingOptions.total = res.totalNum;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    changeTime() {
      if (this.fliterTime) {
        this.filter.beginTime = this.fliterTime[0];
        this.filter.endTime = this.fliterTime[1];
      } else {
        this.filter.beginTime = '';
        this.filter.endTime = '';
      }
    },
    getTemplate() {
      this.$store.dispatch('notification/findTemplateName', {}).then(res => {
        this.templateList = res.data;
      });
    },
    clearFilter() {
      this.filter = {
        beginTime: '',
        endTime: '',
        templateName: '',
        smsPhonenum: '',
        smsStatus: ''
      };
      this.fliterTime = '';
      this.getList({ page: 1 });
    },
    goTemplate(templateId) {
      templateId
        ? this.$router.push({
            path: `/notification/msgTemplate?id=${templateId}`
          })
        : this.$router.push({ path: '/notification/msgTemplate' });
    }
  }
};
</script>

<style lang="scss" scoped>
.noti-message {
  .box {
    justify-content: flex-start;
    align-items: center;
  }
  .box-success {
    color: #18c4bd;
    justify-content: flex-start;
    align-items: center;
    .icon {
      background: url('../../../assets/sms-success.png');
      background-size: 100% 100%;
      width: 16px;
      height: 16px;
      display: block;
      margin-right: 8px;
    }
  }
  .box-fail {
    color: #f64e60;
    justify-content: flex-start;
    align-items: center;
    .icon {
      background: url('../../../assets/sms-fail.png');
      background-size: 100% 100%;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
}
</style>
