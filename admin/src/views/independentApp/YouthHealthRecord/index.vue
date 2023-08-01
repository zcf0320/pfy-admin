<template>
  <div class="settlement">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            学生列表
            <el-button class="btn-save fr" @click="goUrl">数据统计</el-button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">学生ID</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入学生ID"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>

                <div class="form-item">
                  <span class="label-name">手机号码</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号码"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">年龄</span>
                  <el-input
                    v-model="filter.age"
                    placeholder="请输入年龄"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getList"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form  flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">学校</span>
                  <select-school
                    v-model="filter.schoolId"
                    filterable
                    placeholder="全部"
                    @change="schoolChange"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">姓名</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入姓名"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">性别</span>
                  <el-select
                    v-model="filter.sex"
                    class="search-input"
                    placeholder="全部"
                    @change="getList"
                  >
                    <el-option label="男" :value="1"/>
                    <el-option label="女" :value="0"/>
                  </el-select>
                </div>
              </div>
              <div v-if="!showMore" class="flex-box">
                <img
                 class="expand-icon"
                 src="../../../assets/expand.png"
                 alt=""
                 @click="showMore = true"
                 />
              </div>
            </div>
            <div v-if="showMore" class="filter-box">
              <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="change"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">更新时间:</span>
                  <el-date-picker
                    v-model="filterTime"
                    style="width: 240px"
                    type="daterange"
                     value-format="yyyy-MM-dd"
                    :editable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTime"
                  />
                </div>
              </div>
              <div class="flex-box">
                <img
                 class="collapse-icon"
                 src="../../../assets/collapse.png"
                 alt=""
                 @click="showMore = false"/>
              </div>
            </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="dataList"
          class="table-large"
        >
          <el-table-column label="学生姓名">
            <template slot-scope="scope">
              <div class="mb-16">
                {{ scope.row.name || '-' }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                  scope.row.sex | sexFormat
                }}
              </div>
               <div>ID:{{ scope.row.id }}</div>
            </template>
          </el-table-column>
          <el-table-column label="手机号" >
            <template slot-scope="scope">
                <div class="mb-32">
                    {{scope.row.mobile}}
                </div>
            </template>
          </el-table-column>
          <el-table-column label="学校名称">
            <template slot-scope="scope">
              <div class="channel-name">
                {{ scope.row.schoolName || '-' }}
              </div>
              <div class="channel-code">
                更新时间:{{
                  $moment(scope.row.updateTime).format('YYYY-MM-DD')
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称/ID">
            <template slot-scope="scope">
              <div class="channel-name">
                {{ scope.row.channelName || '-' }}
              </div>
              <div class="channel-code">
                ID:{{ scope.row.channelCode || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="学生年龄">
            <template slot-scope="scope">
              <div class="mb-32">{{ scope.row.age }}岁</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                <div class="mb-32">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
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
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { default as api } from '@/api/YouthHealthRecord';
import SelectSchool from '../component/SelectSchool.vue';
export default {
  name: 'youth-health-record',
  components: { SelectSchool },
  data() {
    return {
      tableLoading: false,
      showMore: false,
      filter: {
        id: '',
        age: '',
        name: '',
        mobile: '',
        sex: '',
        schoolId: '',
        channelCode: '',
        beginTime: '',
        endTime: ''
      },
      filterTime: [],
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      dataList: []
    };
  },
  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      pageNo: Number(pageNo)
    });
  },
  methods: {
    // 修改筛选时间
    changeTime() {
      if (this.filterTime) {
        this.filter.beginTime = this.filterTime[0];
        this.filter.endTime = this.filterTime[1] + 3600 * 24 * 1000 - 1000;
      } else {
        this.filter.beginTime = '';
        this.filter.endTime = '';
      }

      this.getList({ pageNo: 1 });
    },
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
      api
        .getStudentList(params)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.records || [];
          this.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(
        `/independent-application/youth-health-record/detail/${id}`
      );
    },
    clearFilter() {
      this.filter = {
        id: '',
        age: '',
        name: '',
        mobile: '',
        sex: '',
        schoolId: '',
        channelCode: '',
        beginTime: '',
        endTime: ''
      };
      this.filterTime = [];
      this.getList({ page: 1 });
    },
    change(val) {
      this.filter.channelCode = val;
      this.getList();
    },
    schoolChange(val) {
      this.filter.schoolId = val;
      this.getList();
    },
    goUrl() {
      this.$router.push({ name: 'TeenagersData' });
    }
  }
};
</script>
<style lang="scss" scoped>
.channel-name {
  font-size: 14px;
  margin-bottom: 16px;
  font-weight: 400;
  color: #464668;
}
.channel-code {
  font-size: 14px;
  font-weight: 400;
  color: #a2a3b7;
}
.expand-icon,
.collapse-icon {
  width: 24px;
  height: 30px;
}
</style>
