<template>
  <div class="page-insurance-products">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
      <div class="title-top">
        审核记录
         <button type="button" class="btn-save fr" @click="exportList">
                导出
         </button>
      </div>
        <div class="filter-box">
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">申请人编号</span>
                <el-input
                  v-model.trim="filter.id"
                  placeholder="请输入申请人编号"
                  class="search-input"
                  :clearable="true"
                />
              </div>
              <div class="form-item">
                <span class="label-name">申请人姓名</span>
                <el-input
                  v-model.trim="filter.name"
                  placeholder="请输入申请人姓名"
                  class="search-input"
                  :clearable="true"
                />
              </div>
              <div class="form-item">
                <span class="label-name">服务项</span>
                <el-select
                  v-model="filter.serviceInfoId"
                  filterable
                  placeholder="全部"
                  @change="list"
                >
                  <el-option
                    v-for="item in serviceList"
                    :key="item.id"
                    :label="item.serviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search"
                class="mr-30"
                @click.native.prevent="list(true)"
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
                <span class="label-name">更新时间</span>
                <el-date-picker
                  v-model="filter.filterTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="false"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTime"
                />
              </div>
            </div>
            <!-- <div class="flex-box">
              <button type="button" class="btn-save fr" @click="exportList">
                导出
              </button>
            </div> -->
            <!-- <div class="form-item">
              <span class="label-name">审核状态</span>
              <el-select
                v-model="filter.state"
                placeholder="全部"
                :clearable="true"
              >
                <el-option
                  v-for="(item, key) in $enums['secondaryTreatmentState']"
                  :key="key"
                  :value="key"
                  :label="item"
                ></el-option>
              </el-select>
            </div> -->
          </div>
        </div>
        <div class="panel mb-0">
          <div class="panel-body">
            <Tab
              :btns="btns"
              :btn-style="{ overflow: 'visible' }"
              @change="tabsChange"
            />
            <el-table
              v-loading="tableLoading"
              :data="dataList"
              class="table-large"
            >
              <el-table-column label="申请编号">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.serialNumber || '-' }}
                    <div class="subTitle mt-16">
                      {{ row.createTime | timeFormat }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="申请人姓名">
                <template slot-scope="{ row }">
                  <span>{{ row.name || '-' }}</span>
                  <div class="subTitle mt-16">
                    {{ row.mobile }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="{ row }">
                    <div class="mb-32">
                  <span
                    :class="$enums['labelClaimState'][row.state]"
                    class="label-text"
                    >{{ $enums['secondaryTreatmentState'][row.state] }}</span>
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="{ row }">
                  <div class="flex-box mb-32">
                    <HoverTip
                      :content="row.state === 1 ? '审核' : '查看'"
                      :tip-class-name="
                        row.state === 1 ? 'icon-claim' : 'icon-detail'
                      "
                      @click.native.prevent="detail(row.id,row.state === 1?true:false)"
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
          :limit="filter.pageSize"
          :page.sync="filter.pageNum"
          layout="total, prev, pager, next"
          @pagination="list()"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { getConfirmNumber } from '@/utils/common';
import { exportMultiConsulation } from '@/api/secondaryTreatment';
export default {
  name: 'Treatments',
  data() {
    const defaultFilter = {
      name: null,
      state: null, // 理赔状态，状态：1待审核，2成功，3失败
      updateEndTime: null,
      updateStartTime: null,
      filterTime: [],
      serviceName: '',
      pageSize: 10,
      id: '',
      pageNum: 1,
      serviceInfoId: ''
    };
    return {
      defaultFilter: defaultFilter,
      // 列表loading
      tableLoading: false,
      dataList: [],
      filter: this.$extends({}, defaultFilter),
      total: 0,
      serviceList: []
    };
  },
  computed: {
    pageAuthority() {
      return this.$store.state.user.pageAuthority['190401'];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        { name: '全部', value: '' },
        {
          name: '待审核',
          value: '1',
          isNumber: true,
          number: getConfirmNumber('Treatments') || 0
        },
        { name: '审核成功', value: '2' },
        { name: '审核失败', value: '3' }
      ];
    }
  },
  created() {
    // 获取服务项
    this.$store
      .dispatch('serviceItems/getServiceinfos', {
        pageNum: 1,
        pageSize: 10000
      })
      .then(response => {
        this.serviceList = response.data;
      });
    if (this.pageNum) {
      this.filter.pageNum = this.pageNum;
      this.list();
    } else {
      this.list();
    }
  },
  methods: {
    // 修改筛选时间
    changeTime() {
      this.filter.filterTime[1] =
        this.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 获取保险产品列表
    async list(reset) {
      this.tableLoading = true;
      if (reset) {
        this.filter.pageNum = 1;
      }
      let query = this.$extends({}, this.filter);
      query.startTime = this.$isNotEmpty(this.filter.filterTime)
        ? this.filter.filterTime[0]
        : null;
      query.endTime = this.$isNotEmpty(this.filter.filterTime)
        ? this.filter.filterTime[1]
        : null;
      // 删除字段为空的key
      query = this.$delEmptyKey(query);

      this.$store
        .dispatch('secondaryTreatment/getSecondaryTreatmentList', query)
        .then((res) => {
          this.dataList = res.data.records || [];
          this.total = res.data.totalNum;
        });
      this.$nextTick(() => {
        this.tableLoading = false;
      });
    },
    // 清除筛选条件
    clearFilter() {
      this.$copyProps(this.filter, this.defaultFilter);
      this.list();
    },
    // 审核或者查看保险产品
    detail(id, type) {
        if (type) {
   this.$router.push(`/secondaryTreatment/treatments/edit/${id}`);
        } else {
   this.$router.push(`/secondaryTreatment/treatments/detail/${id}`);
        }
    },
    tabsChange(val) {
      this.filter.state = val;
      this.filter.pageNum = this.pageNum;
      this.list();
    },
    exportList() {
      const loading = this.$loading({
        lock: true,
        text: '下载中……请耐心等候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      exportMultiConsulation(this.filter).then((res) => {
        const blob = new Blob([res.data], { type: 'application/zip' });
        const element = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        element.href = href;
        element.setAttribute('target', '_blank');
        document.body.appendChild(element);
        element.click();
        loading.close();
        window.URL.revokeObjectURL(href);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mb-30 {
  margin-bottom: 30px;
}
</style>
