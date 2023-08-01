<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="noti-station">
        <div class="title-top">
          站内消息<el-button
            type="primary"
            size="small"
            class="fr"
            @click="goTemplate('')"
            >消息模板</el-button>
        </div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">消息类型:</span>
                  <el-select
                    v-model="filter.templateName"
                    filterable
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in templateList"
                      :key="item.value"
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
                <div class="form-item">
                  <span class="label-name">用户名:</span>
                  <el-input
                    v-model="filter.userName"
                    placeholder="请输入用户名"
                    class="search-input"
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
          </div>
        </div>
        <div class="content">
          <Tab
            :btns="btns"
            :current-key="activeName"
            :btn-style="{ overflow: 'visible' }"
            @change="btnChange"
          />
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="list"
              class="fix-table table-large"
            >
              <el-table-column label="用户名" prop="userName">
                <template slot-scope="scope">
                  {{ scope.row.userName || '-' }}
                </template>
              </el-table-column>
              <el-table-column label="消息内容" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.mainTitle ? scope.row.mainTitle : '-' }} - {{
                    scope.row.subTitle ? scope.row.subTitle : '-'
                  }}
                </template>
              </el-table-column>
              <el-table-column label="消息类型">
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
                  {{
                    $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </template>
              </el-table-column>
              <el-table-column label="读取信息">
                <template slot-scope="scope">
                  <span :class="messageColumn[scope.row.state]">{{
                    messageState[scope.row.state]
                  }}</span>
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
import { messageState, messageColumn } from '@/utils/enum';
export default {
  name: 'station',
  data() {
    return {
      filter: {
        templateName: '',
        beginTime: '',
        endTime: '',
        userName: '',
        channel: '0' // 0:是小程序,1:后台
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
      messageColumn,
      messageState,
      activeName: '0',
      btns: [
        {
          name: '寰宇关爱小程序',
          value: '0'
        },
        {
          name: '森罗树后台',
          value: '1'
        }
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
        .dispatch('notification/messageList', params)
        .then(res => {
          this.tableLoading = false;
          this.list = res.records || [];
          this.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    getTemplate() {
      this.$store
        .dispatch('notification/searchMessage', {
          channel: this.filter.channel
        })
        .then(res => {
          this.templateList = res.data;
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
    clearFilter() {
      this.filter = {
        templateName: '',
        beginTime: '',
        endTime: '',
        userName: '',
        channel: '0'
      };
      this.fliterTime = '';
      this.getList({ page: 1 });
    },
    goTemplate(templateId) {
      templateId
        ? this.$router.push({
            path: `/notification/stationTemplate?id=${templateId}&channel=${this.filter.channel}`
          })
        : this.$router.push({
            path: `/notification/stationTemplate?channel=${this.filter.channel}`
          });
    },
    btnChange(val) {
      this.filter = {
        templateName: '',
        beginTime: '',
        endTime: '',
        userName: ''
      };
      this.fliterTime = '';
      this.filter.channel = val;
      this.getList();
      this.getTemplate();
    }
  }
};
</script>

<style lang="scss" scoped>
.noti-station {
}
</style>
