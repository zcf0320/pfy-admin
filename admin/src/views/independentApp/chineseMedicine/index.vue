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
          <div class="title-top">医患列表</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID</span>
                  <el-input
                    v-model="filter.patientId"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">患者姓名</span>
                  <el-input
                    v-model="filter.patientName"
                    placeholder="请输入患者姓名"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">医生ID</span>
                  <el-input
                    v-model="filter.doctorId"
                    placeholder="请输入医生ID"
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
            <div class="search-form flex-between">
              <div class="flex-box">
                 <div class="form-item">
                  <span class="label-name">医生姓名</span>
                  <el-input
                    v-model="filter.doctorName"
                    placeholder="请输入医生姓名"
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
                  <span class="label-name">病历ID</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入病历ID"
                    class="search-input"
                    @keyup.enter.native="getList"
                  />
                </div>
                <!-- <div class="form-item">
                  <span class="label-name">渠道名称</span>
                  <SelectChannel
                    filterable
                    placeholder="请输入渠道名称"
                    v-model="filter.channelCode"
                    @change="change"
                  ></SelectChannel>
                </div> -->
              </div>
              <div v-if="!showMore" class="flex-box">
                     <img
                      class="expand-icon"
                      src="../../../assets/expand.png"
                      alt=""
                      @click="showMore = true"
                    />
              </div>
              <!-- <div class="flex-box">
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
              </div> -->
            </div>
            <div v-if="showMore" class="filter-boxto">
              <div class="search-form flex-between">
                <div class="flex-box">
                      <div class="form-item">
                  <span class="label-name">病程</span>
                  <el-select
                    v-model="filter.diseaseCourse"
                    class="search-input"
                    placeholder="全部"
                    @change="getList"
                  >
                    <el-option
                      v-for="item in diseaseCourse"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">就诊日期</span>
                  <el-date-picker
                    v-model="filter.filterTimeUpdate"
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
                      class="expand-icon"
                      src="../../../assets/collapse.png"
                      alt=""
                      @click="showMore = false"
                    />
              </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="dataList"
          class="table table-large"
        >
          <el-table-column label="患者ID">
            <template slot-scope="scope">
              <div>
                {{ scope.row.patientId || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="患者姓名">
            <template slot-scope="scope">
              <div>
                {{ scope.row.patientName || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="医生ID">
            <template slot-scope="scope">
              <div>
                {{ scope.row.doctorId || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="医生姓名">
            <template slot-scope="scope">
              <div>
                {{ scope.row.doctorName || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <div>
                {{ scope.row.mobile || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="病历ID">
            <template slot-scope="scope">
              <div>
                {{ scope.row.serialNumber || "-" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="病程">
            <template slot-scope="scope">
              <div>
                {{ scope.row.diseaseCourse || "-" }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="渠道名称" prop="channelName"> </el-table-column>
          <el-table-column label="渠道ID" prop="channelCode"> </el-table-column> -->
          <el-table-column label="就诊日期">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.treatmentDate
                    ? $moment(scope.row.treatmentDate).format("YYYY-MM-DD")
                    : "-"
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.dossierId)"
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
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import useRecord from '@/api/useRecord';
export default {
  name: 'ChineseMedicine',
  data() {
    return {
      tableLoading: false,
      isShowClear: true,
      showMore: false,
      filter: {
        patientId: '',
        patientName: '',
        mobile: '',
        doctorId: '',
        doctorName: '',
        serialNumber: '',
        diseaseCourse: '',
        filterTimeUpdate: [],
        startTreatmentDate: '',
        endTreatmentDate: '',
        channelCode: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      dataList: [],
      diseaseCourse: ['初诊', '复诊', '住院', '手术', '出院']
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
      this.filter.startTreatmentDate = this.filter.filterTimeUpdate[0];
      this.filter.endTreatmentDate = this.filter.filterTimeUpdate[1];
      this.getList();
    },
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

      delete params.filterTimeUpdate;
      vm.tableLoading = true;
      useRecord
        .getPatientList(params)
        .then((res) => {
          vm.tableLoading = false;
          vm.dataList = res.data.records || [];
          vm.pagingOptions.total = res.data.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    lookDetails(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(
        `/independent-application/chineseMedicine/detail/${id}`
      );
    },
    clearFilter() {
      this.filter = {
        patientId: '',
        patientName: '',
        mobile: '',
        doctorId: '',
        doctorName: '',
        serialNumber: '',
        diseaseCourse: '',
        filterTimeUpdate: [],
        startTreatmentDate: '',
        endTreatmentDate: '',
        channelCode: ''
      };
      this.getList({ page: 1 });
    }
  },
  change(val) {
    this.filter.channelCode = val;
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  width: 100%;
  .expand-icon,
  .collapse-icon {
    width: 24px;
    height: 30px;
  }
  .card {
    background: #fff;
    margin-bottom: 24px;
    &:last-child {
      padding: 30px;
    }
  }
  .operation-buttons {
    .el-button {
      margin-right: 24px;
    }
    .el-select {
      margin-right: 24px;
    }
  }
  .clear {
    color: #ff625e;
    border-color: #ff625e;
    &:hover {
      background-color: #ffefef;
    }
  }
  .export-button {
    color: #2276ff;
    border-color: #2276ff;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .table {
    .message {
      display: flex;
      justify-content: space-around;
      flex-direction: column;

      .text {
        color: #464668;
        margin: 0 0 12px;
        &:first-child {
          color: #333333;
        }
      }
    }
    .check {
      color: #47cec6;
      background: rgba(71, 206, 198, 0.1);
    }
    .uncheck {
      color: #ff625e;
      background: rgba(255, 98, 94, 0.1);
    }
    .tag {
      font-size: 14px;
      width: 60px;
      height: 22px;
      border-radius: 4px;
      text-align: center;
      line-height: 12px;
    }
  }
}
</style>
