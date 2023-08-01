<template>
  <el-container>
    <!-- <el-main> -->
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="goods-manage-page">
        <div class="title-top">问诊记录</div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">问诊编号</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入问诊编号"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">患者姓名</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入患者姓名"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">患者年龄</span>
                  <InputNumber
                    v-model="filter.ageStart"
                    class="search-input"
                    style="width: 114px; margin-right: 12px"
                    placeholder="请输入患者年龄"
                    :maxlength="3"
                    @input="onlyAgeStart"
                  />
                  -
                  <InputNumber
                    v-model="filter.ageEnd"
                    class="search-input"
                    style="width: 114px; margin-left: 12px"
                    placeholder="请输入患者年龄"
                    :maxlength="3"
                    @input="onlyAgeEnd"
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
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">问诊时间</span>
                <el-date-picker
                  v-model="filter.filterTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="isShowClear"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="search-input"
                  @change="changeTime"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="table">
            <el-table v-loading="tableLoading" :data="goodsList">
              <el-table-column label="患者信息">
                <template slot-scope="scope">
                  <div class="goods-details">
                    <div class="name">
                      编号：{{ scope.row.serialNumber || '-' }}
                    </div>
                    <div class="details">
                      <div class="img">
                        <img :src="scope.row.avatarUrl" alt="暂无图片" >
                      </div>
                      <div class="details-text mb">
                        <div class="name" @click="lookDeatils(scope.row.id)">
                          姓名：{{ scope.row.name || '-' }}
                        </div>
                        <div class="text info">
                          <div class="sex">{{ scope.row.sex | formatSex }}</div>
                          <div>{{ scope.row.age || '-' }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="诊疗结果">
                <template slot-scope="scope">
                  <div class="message">
                    <div class="name">
                      {{ scope.row.patientSymptom || '-' }}
                    </div>
                    <div class="text">
                      {{ scope.row.diseaseClinicDepartment || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="问诊症状">
                <template slot-scope="scope">
                  <div class="message">
                    <div class="name">
                      {{ scope.row.diseaseName || '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="问诊时间">
                <template slot-scope="scope">
                  <div class="message">
                    <div class="name">
                      {{
                        $moment(scope.row.createTime).format(
                          'YYYY-MM-DD HH:mm'
                        ) || '-'
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="76">
                <template slot-scope="scope">
                  <HoverTip
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
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
      </div>
      <!-- </el-main> -->
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'inquiryRecord',
  filters: {
    formatSex(sex) {
      return sex === 1 ? '男' : '女';
    }
  },
  data() {
    return {
      isShowClear: false,
      filter: {
        serialNumber: '',
        name: '',
        ageStart: '',
        ageEnd: '',
        filterTime: []
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      goodsList: []
    };
  },
  created() {
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      page: Number(pageNo)
    });
  },
  methods: {
    ...mapActions('inquiryManage', ['getContentList']),
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        serialNumber: '',
        name: '',
        ageStart: '',
        ageEnd: '',
        filterTime: []
      };
      this.getList({ page: 1, pageSize: 10 });
    },
    // 获取商品列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      vm.getContentList(params)
        .then(res => {
          vm.tableLoading = false;
          vm.goodsList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDeatils(id) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push(`/inquiryManage/inquiryRecord/detail/${id}`);
    },
    onlyAgeStart(value) {
      const reg = /^([1-9][0-9]*)$/;
      const flag = reg.test(value);
      if (flag) {
        this.filter.ageStart = value;
        return true;
      }
      this.filter.ageStart = this.filter.ageStart.slice(
        0,
        this.filter.ageStart.length - 1
      );
      return true;
    },
    onlyAgeEnd(value) {
      const reg = /^([1-9][0-9]*)$/;
      const flag = reg.test(value);
      if (flag) {
        this.filter.ageEnd = value;
        return true;
      }
      this.filter.ageEnd = this.filter.ageEnd.slice(
        0,
        this.filter.ageEnd.length - 1
      );
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-manage-page {
  .page-title {
    padding: 0 0 19px;
    color: #333333;
    font-weight: 500;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }
  .content {
    .table {
      font-size: 16px;
      .goods-details {
        padding: 17px 0 27px 0;
        .name {
          color: #333333;
          margin-bottom: 10px;
        }
        .details {
          display: flex;
          .img {
            width: 56px;
            height: 56px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .details-text {
            margin-left: 22px;

            .text {
              color: #6f6f6f;
              margin-bottom: 8px;
              line-height: 16px;
            }
            .info {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .sex {
                margin-right: 8px;
              }
            }
            .mb {
              margin-bottom: 15px;
            }
          }
        }
      }
      .name {
        color: #333333;
      }
      .message {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        height: 60px;
        margin-top: 22px;
        .text {
          color: #6f6f6f;
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
