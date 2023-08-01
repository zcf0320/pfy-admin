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
          <div class="title-top">
            工单管理<button
              v-if="pageAuthority.includes('chat')"
              type="button"
              class="btn-save fr"
              @click="goChat"
            >
              聊天工具
            </button>
          </div>
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
                <!-- <div class="form-item">
                                    <span class="label-name">类型:</span>
                                    <el-select v-model="filter.diagnoseType" placeholder="全部">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div> -->
                <div class="form-item">
                  <span class="label-name">问诊开始时间:</span>
                  <el-date-picker
                    v-model="filterTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    :clearable="isShowClear"
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
                  @click.native.prevent="getList({ page: 1 })"
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
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    v-model="filter.channelCode"
                    filterable
                    placeholder="全部"
                    @change="change"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="tabs">
            <Tab
              :btns="btns"
              :current-key="activeName"
              :btn-style="{ overflow: 'visible' }"
              @change="tabClick"
            />
          </div>
          <div class="table">
            <el-table
              v-loading="tableLoading"
              class="table-large"
              :data="workOrderList"
            >
              <el-table-column label="问诊编号">
                <template slot-scope="scope">
                  <span>{{ scope.row.serialNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span>{{ status[scope.row.state] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="问诊时间">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.createTime
                      ? $moment(scope.row.createTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="76">
                <template slot-scope="scope">
                  <HoverTip
                    v-if="pageAuthority.includes('detail')"
                    content="查看"
                    tip-class-name="icon-detail"
                    @click.native.prevent="lookDeatils(scope.row.id)"
                  />
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
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { diagnoseType } from '@/utils/enum';
import { getConfirmNumber } from '@/utils/common';
export default {
  name: 'WorkOrder',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      filter: {
        serialNumber: '',
        name: '',
        state: '',
        diagnoseStartTime: '',
        diagnoseEndTime: ''
      },
       filterTime: [],
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      workOrderList: [],
      options: [
        {
          id: 1,
          label: '智能问诊'
        },
        {
          id: 2,
          label: '人工问诊'
        },
        {
          id: 3,
          label: '电话问诊'
        }
      ],
      diagnoseType,
      dayData: {
        avgHandleTime: 0,
        finishAmount: 0,
        todayWorkOrderAmount: 0,
        unfinishAmount: 0
      },

      status: {
        1: '挂起中',
        2: '处理中',
        3: '已完成'
      },
      activeName: ''
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    btns() {
      return [
        { value: '', name: '全部' },
        {
          value: '2',
          name: '处理中',
          isNumber: true,
          number: getConfirmNumber('WorkOrder') || 0
        },
        { value: '1', name: '挂起中' },
        { value: '3', name: '已完成' }
      ];
    },
    pageAuthority() {
      // 190302 人工问诊
      return this.$store.state.user.pageAuthority['190302'];
    }
  },
  created() {
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
    this.getDayMgs();
  },
  methods: {
    // 修改筛选时间
    changeTime() {
this.filter.diagnoseStartTime = this.filterTime[0];
this.filter.diagnoseEndTime = this.filterTime[1];
 this.getList();
    },
    // 查询列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize

      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      this.$store
        .dispatch('workOrderManageFe/getList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.workOrderList = res.obj.records || [];
          vm.pagingOptions.total = res.obj.total || 0;
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
        state: ''
      };
      this.filterTime = [];
      this.getList();
    },
    // 查看详情
    lookDeatils(id) {
      this.$router.push(
        `/independent-application/manual-consultation/detail/${id}`
      );
    },
    // 打开聊天工具页面
    goChat() {
      const routeData = this.$router.resolve({
        path: `/independent-application/im`
      });
      window.open(routeData.href, '_blank');
    },
    // 获取医生的工单数据
    getDayMgs() {
      this.$store.dispatch('workOrderManageFe/getDayMgs', 0).then(res => {
        this.dayData = res.obj;
      });
    },
    change(val) {
      this.filter.channelCode = val;
      this.getList();
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
