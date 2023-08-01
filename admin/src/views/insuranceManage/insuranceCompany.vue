<template>
  <div class="page-insurance-company">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="panel">
          <div class="panel-body">
            <div class="filter-form">
              <div class="title-top">
                保险机构<button
                  v-if="pageAuthority.includes('add')"
                  type="button"
                  class="btn-save fr"
                  @click="addOrUpdateInsuranceCompany('add', 'edit')"
                >
                  新增
                </button>
              </div>
              <div class="filter-box">
                <div class="search-form flex-between">
                  <div class="flex-box">
                    <div class="form-item">
                      <span class="label-name">保险机构名称:</span>
                      <el-input
                        v-model="filter.companyName"
                        placeholder="请输入保险机构名称"
                        class="search-input"
                        @keyup.enter.native="
                          getInsuranceCompanyList({ page: 1 })
                        "
                      />
                    </div>
                    <div class="form-item">
                      <span class="label-name">保险机构ID:</span>
                      <el-input
                        v-model="filter.companyCode"
                        placeholder="请输入保险机构ID"
                        class="search-input"
                        @keyup.enter.native="
                          getInsuranceCompanyList({ page: 1 })
                        "
                      />
                    </div>
                    <div class="form-item">
                      <span class="label-name">状态:</span>
                      <el-select
                        v-model="filter.companyStatus"
                        placeholder="全部"
                        @change="getInsuranceCompanyList({ page: 1 })"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </div>
                   <div class="flex-box">
                    <HoverTip
                      content="查询"
                      tip-class-name="icon-search"
                      class="mr-30"
                      @click.native.prevent="
                        getInsuranceCompanyList({ page: 1 })
                      "
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
                      <span class="label-name">更新时间：</span>
                      <el-date-picker
                        v-model="filter.filterTime"
                        type="daterange"
                        value-format="timestamp"
                        :clearable="isShowClear"
                        :editable="false"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changeTime"
                      />
                    </div>
                    <div class="form-item">
                      <span class="label-name">企业类型:</span>
                      <el-select
                        v-model="filter.companyType"
                        placeholder="全部"
                        @change="getInsuranceCompanyList({ page: 1 })"
                      >
                        <el-option
                          v-for="item in companyTypes"
                          :key="item.name"
                          :label="item.name"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <el-table
              v-loading="tableLoading"
              :data="insuranceCompanyList"
              class="table-large"
            >
              <el-table-column label="ID" width="200">
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.companyCode }}</div>
                </template>
              </el-table-column>
              <el-table-column label="保险机构名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.companyName || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="简称">
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.companySimpleName || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="企业类型">
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.companyType | companyType }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="所属地区"
                width="160"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="box">{{ scope.row.region || '-' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                  <div class="box mb-10">
                    <div
                      :class="[
                        'label-text',
                        CompanyStatusColumn[scope.row.companyStatus],
                      ]"
                    >
                      {{ CompanyStatus[scope.row.companyStatus] || '-' }}
                    </div>
                    <div class="mt-16 table-sectext">
                      {{
                        scope.row.updateTime
                          ? $moment(scope.row.updateTime).format(
                              'YYYY-MM-DD HH:mm:ss',
                            )
                          : '-'
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="scope">

                    <div class="box">
                      {{ ApprovalStatus[scope.row.approvalStatus] || '-' }}
                    </div>

                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <div class="box">
                  <HoverTip
                    v-if="pageAuthority.includes('detail')"
                    content="查看"
                    tip-class-name="icon-detail"
                    class="mr-30"
                    @click.native.prevent="
                      addOrUpdateInsuranceCompany(scope.row.id, 'detail')
                    "
                  />
                  <HoverTip
                    v-if="pageAuthority.includes('edit')"
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="
                      addOrUpdateInsuranceCompany(scope.row.id, 'edit')
                    "
                  />
                  <el-popconfirm
                    title="删除后将不可恢复，是否删除？"
                    placement="top"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    confirm-button-type="plain"
                    cancel-button-type="primary"
                    :hide-icon="true"
                    @onConfirm="deleteInsuranceCompany(scope.row.id)"
                  >
                    <HoverTip
                      v-show="pageAuthority.includes('delete')"
                      slot="reference"
                      content="删除"
                      tip-class-name="icon-delete"
                    />
                  </el-popconfirm>
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
              @pagination="getInsuranceCompanyList"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import {
  ApprovalStatus,
  CompanyStatus,
  CompanyStatusColumn
} from '@/utils/enum';
export default {
  name: 'InsuranceCompany',
  filters: {
    companyType(val) {
      if (val === 2) {
        return '保险公司';
      } else if (val === 3) {
        return '保险经纪公司';
      } else if (val === 4) {
        return '再保公司';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      isShowClear: false,
      // 列表loading
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      filter: {
        companyName: '',
        companyCode: '',
        filterTime: [],
        companyStatus: '',
        companyType: ''
      },
      insuranceCompanyList: [],
      ApprovalStatus,
      CompanyStatus,
      CompanyStatusColumn,
      options: [
        {
          label: '待启用',
          value: 0
        },
        {
          label: '已启用',
          value: 1
        },
        {
          label: '已停用',
          value: 2
        }
      ],
      companyTypes: [
        {
          name: '保险公司',
          value: 2
        },
        {
          name: '保险经纪公司',
          value: 3
        },
        {
          name: '再保公司',
          value: 4
        }
      ]
    };
  },
  computed: {
    pageAuthority() {
      // 170105 保险机构
      return this.$store.state.user.pageAuthority['170105'];
    }
  },
  created() {
    const vm = this;
    vm.getLocations();
  },
  methods: {
    // 获取地区数据
    getLocations() {
      this.$store.dispatch('app/getLocations').then(() => {
        // 请求完区域接口再请求列表接口
        this.getInsuranceCompanyList({});
      });
    },
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      this.getInsuranceCompanyList({ page: 1 });
    },
    // 获取保险机构列表
    getInsuranceCompanyList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }

      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
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
      vm.$store
        .dispatch('insuranceCompany/getInsuranceCompanyListInput', params)
        .then(response => {
          const getLocationList = vm.$store.state.app.locationList || [];
          let region = '';
          vm.tableLoading = false;
          const { totalNum } = response;
          vm.insuranceCompanyList = response.records;
          // 地区回显处理显示中文
          vm.insuranceCompanyList.forEach(item => {
            item.location.forEach(id => {
              getLocationList.forEach(obj => {
                if (obj.id === id) {
                  region = obj.name;
                }
                obj.citys.forEach(child => {
                  if (child.id === id) {
                    region
                      ? (region = `${region} - ${child.name}`)
                      : (region = child.name);
                  }
                });
              });
            });
            item.region = region;
          });
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 去个人预约详情
    viewPersonalDetail(id) {
      const vm = this;
      vm.$router.push({
        path: `/appointment/personalDetail/${id}`
      });
    },
    // 清除筛选条件
    clearFilter() {
      const vm = this;
      vm.filter = {
        companyName: '',
        companyCode: '',
        filterTime: [],
        companyStatus: '',
        companyType: ''
      };
      vm.getInsuranceCompanyList({});
    },
    // 新增或编辑保险机构
    addOrUpdateInsuranceCompany(id, type) {
      const vm = this;
      if (id === 'add') {
       vm.$router.push({
        path: `/insuranceManage/insuranceCompanyAdd/${id}/${type}`
      });
      } else if (type === 'detail') {
      vm.$router.push({
        path: `/insuranceManage/insuranceCompany/details/${id}/${type}`
      });
      } else if (type === 'edit') {
      vm.$router.push({
        path: `/insuranceManage/insuranceCompany/content-edit/${id}/${type}`
      });
      }
    },
    // 删除保险机构
    deleteInsuranceCompany(id) {
      const vm = this;
      vm.$store
        .dispatch('insuranceCompany/deleteInsuranceCompany', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            vm.getInsuranceCompanyList({
              page: vm.pagingOptions.pageNo
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-insurance-company {
  .search-form {
    .search-input {
      width: 200px;
      &.username {
        margin-right: 24px;
      }
    }
  }
  .operation-buttons {
    margin-bottom: 24px;
    .el-button {
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
  .box{
    height: 60px;

  }
}

</style>
