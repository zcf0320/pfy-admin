<template>
  <div class="basis-drugs-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">医院库</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">地区:</span>
                  <el-select
                    v-model="filter.area"
                    filterable
                    placeholder="全部"
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">医院名称:</span>
                  <el-input
                    v-model="filter.hospitalName"
                    placeholder="请输入医院名称"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">医院级别:</span>
                  <el-select
                    v-model="filter.hospitalLevel"
                    placeholder="全部"
                    filterable
                    @change="getList({ page: 1 })"
                  >
                    <el-option
                      v-for="item in hospitalLevelList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
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
                  class="mr-30"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">是否有住院业务:</span>
                <el-select
                  v-model="filter.hasHospitalLive"
                  placeholder="全部"
                  @change="getList({ page: 1 })"
                >
                  <el-option label="有住院业务" :value="1" />
                  <el-option label="无住院业务" :value="0" />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="goodList"
          class="table-nolarge"
        >
          <el-table-column label="所属地区">
            <template slot-scope="scope">
              <div>{{ scope.row.area || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="医院名称">
            <template slot-scope="scope">
              <div class="medicineName">
                {{ scope.row.hospitalName || '-' }}
              </div>
              <div class="medicineSpec">
                {{ scope.row.hospitalLevel || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类型/性质">
            <template slot-scope="scope">
              <div>{{ scope.row.type || '-' }}</div>
              <span class="medicineSpec">{{ scope.row.nature || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否医保">
            <template slot-scope="scope">
              <span>{{ scope.row.isMedicalInsurance || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.hospitalId)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
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
import { mapActions } from 'vuex';
export default {
  name: 'HospitalLibrary',
  data() {
    return {
      filter: {
        area: '',
        hasHospitalLive: '',
        hospitalLevel: '',
        hospitalName: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodList: [],
      hospitalLevelList: [
        '三级甲等',
        '三级乙等',
        '三级丙等',
        '二级甲等',
        '二级乙等',
        '二级丙等',
        '一级甲等',
        '一级乙等',
        '一级丙等',
        '未知'
      ]
    };
  },
  computed: {
    options() {
      const vm = this;
      return vm.$store.state.app.locationList || [];
    },
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    // 获取省份
    this.$store.dispatch('app/getLocations');
    if (this.pageNum) {
      this.getList({
        page: Number(this.pageNum)
      });
    } else {
      this.getList({});
    }
  },
  methods: {
    ...mapActions('dataDictionary', ['getHospitalList']),
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
      this.getHospitalList(params).then(res => {
        this.goodList = res.data.list;
        this.pagingOptions.total = res.data.total;
        this.tableLoading = false;
      });
    },
    clearFilter() {
      this.filter = {
        area: '',
        hasHospitalLive: '',
        hospitalLevel: '',
        hospitalName: ''
      };
      this.getList({});
    },
    lookDetails(id) {
      this.$router.push(`/dataDictionary/hospitalLibrary/detail/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-nolarge {
  /deep/ thead .cell {
    padding: 0;
    padding-left: 10px;
  }
  /deep/ .cell {
    padding: 24px 0;
    padding-left: 10px;
  }
  .medicineName {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    span {
      vertical-align: middle;
    }
  }
  .medicineName.otc {
    &::before {
      content: '';
      display: inline-block;
      width: 42px;
      height: 22px;
      background: url('../../../assets/otc.png') no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .medicineName.Rx {
    &::before {
      content: '';
      display: inline-block;
      width: 35px;
      height: 22px;
      background: url('../../../assets/rx.png') no-repeat;
       background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .medicineSpec {
    font-size: 14px;
    font-weight: 400;
    color: #989ab3;
    margin-top: 16px;
  }
}
</style>
