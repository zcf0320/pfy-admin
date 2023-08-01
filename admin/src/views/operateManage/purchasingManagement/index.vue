<template>
  <div>
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form no-padding bg-white"
        tag="main"
        :noresize="false"
      >
        <!-- <el-main class="filter-form no-padding"> -->
        <div class="filter-box pd-30 pb-0">
          <div class="title-top">采购管理</div>
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item ">
                <span class="label-name">ID</span>
                <el-input
                  v-model.trim="query.id"
                  placeholder="请输入ID"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list"
                />
              </div>
              <div class="form-item">
                <span class="label-name">姓名</span>
                <el-input
                  v-model.trim="query.name"
                  placeholder="请输入姓名"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list"
                />
              </div>
              <div class="form-item ">
                <span class="label-name">手机号</span>
                <el-input
                  v-model.trim="query.mobile"
                  placeholder="请输入手机号"
                  class="search-input"
                  :clearable="true"
                  @keyup.enter.native="list"
                />
              </div>
            </div>
            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search"
                class="mr-30"
                @click.native.prevent="list()"
              />
              <HoverTip
                content="清除查询条件"
                tip-class-name="icon-reset"
                class="mr-30"
                @click.native.prevent="clearFilter"
              />
            </div>
          </div>
          <div class="search-form">
            <div class="form-item ">
              <span class="label-name">公司名称</span>
              <el-input
                v-model.trim="query.company"
                placeholder="请输入公司名称"
                class="search-input"
                :clearable="true"
                @keyup.enter.native="list"
              />
            </div>
            <div class="form-item ">
              <span class="label-name">提交时间</span>
              <el-date-picker
                v-model="query.submitTime"
                type="daterange"
                value-format="timestamp"
                :clearable="false"
                :editable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeTime('submitTime')"
              />
            </div>
            <div class="form-item ">
              <span class="label-name">更新时间</span>
              <el-date-picker
                v-model="query.updateTime"
                type="daterange"
                value-format="timestamp"
                :clearable="false"
                :editable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeTime('updateTime')"
              />
            </div>
          </div>
        </div>
        <div class="line-space"/>
        <div class="panel mb-0 pd-30">
          <div class="panel-body">
            <Tab
              :btns="btns"
              style="overflow:inherit"
              @change="tabsChange"
            />
            <el-table v-loading="loading" :data="dataList" class="table-large">
              <el-table-column label="ID" width="220">
                <template slot-scope="{ row }">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="个人信息" width="150">
                <template slot-scope="{ row }">
                  <div>
                    <span>{{ row.name || '-' }}</span>
                    <div class="subTitle ">{{ row.mobile }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="公司名称" show-overflow-tooltip>
                <template slot-scope="{ row }">
                  <span class="mr-4">{{ row.company }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="130">
                <template slot-scope="{ row }">
                  <span
                    :class="$enums['purchasingState'][row.status]"
                    class="label-text"
                    >{{ $enums['purchasingStatePreview'][row.status] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="提交时间">
                <template slot-scope="{ row }">
                  <span> {{ row.createTime | timeFormat('yyyy-MM-dd') }} </span>
                </template>
              </el-table-column>
              <el-table-column label="更新时间">
                <template slot-scope="{ row }">
                  <span> {{ row.updateTime | timeFormat('yyyy-MM-dd') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="{ row }">
                  <div class="flex-box">
                    <HoverTip
                      content="查看"
                      tip-class-name="icon-detail"
                      @click.native.prevent="lookDetails(row.id)"
                    />
                  </div>
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img"/>
            </el-table>
          </div>
        </div>
        <Pagination
          :total="total"
          :limit="query.pageSize"
          :page.sync="query.pageNum"
          layout="total, prev, pager, next"
          @pagination="list()"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { getConfirmNumber } from '@/utils/common';
export default {
  name: 'purchasingManagement',
  data() {
    const defaultFilter = {
      id: '',
      name: '',
      mobile: '',
      company: '',
      status: '1',
      submitTime: [],
      updateTime: [],
      pageSize: 10,
      pageNum: 1
    };
    return {
      loading: false,
      defaultFilter: defaultFilter,
      query: this.$extends({}, defaultFilter),
      dataList: [],
      total: 0
    };
  },
  computed: {
    /**
     * pageNum
     */
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        {
          name: '待处理',
          value: '1',
          isNumber: true,
          number: getConfirmNumber('PurchasingManagement') || 0
        },
        {
          name: '处理中',
          value: '2'
        },
        { name: '已完成', value: '3' }
      ];
    }
  },
  created() {
    this.list(true);
  },
  methods: {
    // 修改筛选时间
    changeTime(val) {
      this.query[val][1] = this.query[val][1] + 3600 * 24 * 1000 - 1000;
      this.list();
    },
    tabsChange(val) {
      this.query.status = val;
      this.list();
    },
    /**
     * 清空筛选条件
     */
    clearFilter() {
      this.$copyProps(this.query, this.defaultFilter, 'status');
      this.list();
    },
    /**
     * 获取列表数据
     */
    list: async function(init) {
      this.loading = true;
      if (init) {
        this.query.pageNum = this.pageNum;
      }
      let query = this.$extends({}, this.query);
      // 设置时间啊选泽器
      if (this.$isNotEmpty(query.submitTime)) {
        query.submitStartTime = query.submitTime[0];
        query.submitEndTime = query.submitTime[1];
      }
      if (this.$isNotEmpty(query.updateTime)) {
        query.updateStartTime = query.updateTime[0];
        query.updateEndTime = query.updateTime[1];
      }
      query = this.$delEmptyKey(query);
      const res = await this.$store.dispatch(
        'purchasingManagement/getPurchasingList',
        query
      );
      if (res) {
        this.total = res.data.total;
        this.dataList = res.data.records || [];
      }
      this.loading = false;
    },
    /**
     * 查看详情
     */
    lookDetails(id) {
      this.$router.push(`/purchasingManagement/details/${id}`);
    }
  }
};
</script>

<style scoped lang="scss"></style>
