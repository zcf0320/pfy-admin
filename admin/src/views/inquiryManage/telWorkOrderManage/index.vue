<template>
  <div class="work-order-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="work-data">
          <div class="item">
            <div class="data">{{ dayData.todayWorkOrderAmount || 0 }}</div>
              <div class="label">今日工单量:</div>
          </div>
          <div class="item">
            <div class="data"> {{ dayData.finishAmount || 0 }}</div>
             <div class="label">已完成:</div>
          </div>
          <div class="item">

            <div class="data"> {{ dayData.unfinishAmount || 0 }}</div>
             <div class="label">未完成:</div>
          </div>
          <div class="item">
            <div class="data"> {{ dayData.avgHandleTime || 0 }}</div>
             <div class="label">平均处理时长(s):</div>
          </div>
        </div>
        <div class="filter-form">
          <div class="title-top">工单管理</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">问诊编号:</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入问诊编号"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">用户名:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入用户名"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">问诊结束时间:</span>
                  <el-date-picker
                    v-model="filter.filterTime"
                    type="daterange"
                    value-format="timestamp"
                    :clearable="true"
                    :editable="false"
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
                  @click.native.prevent="getList(true)"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form flex-between">
              <div class="form-item">
                <span class="label-name">申请时间:</span>
                <el-date-picker
                  v-model="filter.queryRange"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="true"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTime"
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
            @change="tabClick"
          />
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="dataList"
              class="table-large"
            >
              <el-table-column
                label="问诊编号"

                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.serialNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" >
                <template slot-scope="{ row }">
                  <span
                    :class="['label-text', $enums['columnState'][row.state]]"
                    >{{ status[row.state] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="申请时间" >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.createTime | timeFormat('yyyy-MM-dd')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="问诊结束时间" >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.endTime | timeFormat('yyyy-MM-dd')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最新备注" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.remark || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <HoverTip
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
                    @click.native.prevent="lookDetails(scope.row.id)"
                  />
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img"/>
            </el-table>
            <Pagination
              :total="filter.total"
              :limit="filter.pageSize"
              :page.sync="filter.pageNum"
              layout="total, prev, pager, next"
              @pagination="getList()"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { getConfirmNumber } from '@/utils/common';
export default {
  name: 'WorkOrder',
  data() {
    return {
      tableLoading: false,
      filter: {
        serialNumber: '',
        name: '',
        filterTime: [],
        queryRange: [],
        state: '',
        pageSize: 10,
        total: 10,
        pageNum: 1
      },
      dataList: [],
      dayData: {
        avgHandleTime: 0,
        finishAmount: 0,
        todayWorkOrderAmount: 0,
        unfinishAmount: 0
      },
      status: {
        '2': '待处理',
        '3': '已完成'
      },
      activeName: ''
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 190303 保险公司
      return this.$store.state.user.pageAuthority['190303'];
    },
    btns() {
      return [
        { value: '', name: '全部' },
        {
          value: '2',
          name: '待处理',
          isNumber: true,
          number: getConfirmNumber('TelWorkOrder') || 0
        },
        { value: '3', name: '已完成' }
      ];
    }
  },
  created() {
    this.filter.pageNum = Number(this.pageNum);
    this.getList();
    this.getDayMgs();
  },
  methods: {
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] = vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      
      vm.filter.queryRange[1] = vm.filter.queryRange[1] + 3600 * 24 * 1000 - 1000;

    },
    // 查询列表
    getList(init) {
      const vm = this;
      vm.tableLoading = true;
      if (init) {
        this.filter.pageNum = 1;
      }
      const query = this.$delEmptyKey(this.filter);
      if (this.$isNotEmpty(query.filterTime)) {
        query.diagnoseStartTime = query.filterTime[0];
        query.diagnoseEndTime = query.filterTime[1];
      }
      if (this.$isNotEmpty(query.queryRange)) {
        query.applyStartTime = query.queryRange[0];
        query.applyEndTime = query.queryRange[1];
      }

      this.$store
        .dispatch('telWorkOrderManage/callRecordList', query)
        .then(res => {
          vm.tableLoading = false;
          vm.dataList = res.data.records || [];
          vm.filter.total = res.data.total || 10;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 状态切换
    tabClick(state) {
      this.filter.state = state;
      this.getList();
    },
    // 清空查询条件
    clearFilter() {
      this.filter = {
        serialNumber: '',
        name: '',
        filterTime: [],
        state: this.filter.state,
        queryRange: [],
        pageSize: 10,
        total: 0,
        pageNum: 1
      };
      this.getList();
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/inquiryManage/telWorkOrderManage/detail/${id}`);
    },
    // 打开聊天工具页面
    goChat() {
      const routeData = this.$router.resolve({
        path: `/inquiryManage/im`
      });
      window.open(routeData.href, '_blank');
    },
    // 获取医生的工单数据
    getDayMgs() {
      this.$store.dispatch('workOrderManage/getDayMgs', 3).then(res => {
        this.dayData = res.obj;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.work-order-page {
  .work-data {
    width: 100%;
    height: 150px;
    display: flex;
    background-color: #fff;
    align-items: center;
    margin-bottom: 24px;
  box-shadow: 0px 6px 12px 0px rgba(242,242,242,0.5);
border-radius: 4px;
    .item {
      display: flex;
        flex: 1;
        flex-direction: column;
       align-items: center;

         .label {
color: #464668;
        font-size: 20px;
        font-weight: 500;
      }
      .data {

font-size: 51px;
font-weight: bold;
color: #3599FE;
      }
    }
  }
  .filter-form {
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 4px;
  }
  .content {
    border-radius: 4px;
    .tabs {
      display: flex;
      border-bottom: 1px solid rgba(204, 204, 204, 0.5);
      .tab-item {
        padding: 18px 0;
        margin-right: 48px;
        color: #333333;
        font-size: 16px;
        cursor: pointer;
        transition: color 0.1s ease;
      }
      .tab-item-active {
        position: relative;
        color: #2276ff;
        font-weight: 500;
        &::after {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #2276ff;
        }
      }
    }
    .table {
      .goods-details {
        padding: 17px 0 27px;
        .name {
          color: #333333;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .details {
          display: flex;
          .img {
            width: 111px;
            height: 111px;
            border-radius: 4px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .details-text {
            margin-left: 32px;
            .name {
              margin-bottom: 14px;
              cursor: pointer;
              text-decoration: underline;
              &:hover {
                color: #2276ff;
              }
              &:active {
                color: #005ef7;
              }
            }
            .text {
              color: #6f6f6f;
              margin-bottom: 12px;
              font-size: 14px;
              line-height: 14px;
            }
          }
        }
        .font-weight-500 {
          font-weight: 500;
        }
      }
      .message {
        padding-left: 10px;
        .text {
          color: #6f6f6f;
          margin-top: 45px;
          font-size: 14px;
          line-height: 14px;
        }
      }
      .edit {
        width: 20px;
        height: 20px;
        background-image: url('../../../assets/icon_view.png');
        background-size: 100% 100%;
        cursor: pointer;
        &:active {
          background-image: url('../../../assets/icon_view_avtive.png');
        }
      }
    }
  }
}
</style>
