<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="goods-manage-page">
        <div class="title-top">疾病库</div>
        <div class="filter-form">
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">疾病名称:</span>
                  <el-input
                    v-model="filter.diseaseName"
                    placeholder="请输入疾病名称"
                    class="search-input"
                    @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">疾病标签:</span>
                  <el-select
                    v-model="filter.label"
                    filterable
                    placeholder="全部"
                    @change="getList({ page: 1, pageSize: 10 })"
                  >
                    <el-option
                      v-for="item in diseasesLabels"
                      :key="item.type"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </div>
                <div class="form-item">
                  <span class="label-name">推荐科室:</span>
                  <el-select
                    v-model="filter.departmentName"
                    filterable
                    placeholder="全部"
                    @change="getList({ page: 1, pageSize: 10 })"
                  >
                    <el-option
                      v-for="item in secondDepartments"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
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
                <span class="label-name">ID:</span>
                <el-input
                  v-model="filter.diseaseCode"
                  placeholder="请输入ID"
                  class="search-input"
                  maxlength="20"
                  @keyup.enter.native="getList({ page: 1, pageSize: 10 })"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="table">
            <el-table
              v-loading="tableLoading"
              :data="goodsList"
              class="table-large"
            >
              <el-table-column label="疾病名称">
                <template slot-scope="scope">
                    <div class="message">
                  <div
                    class="link-skip text-overflow mb-16"
                    @click="
                      diseaseAtlas(encodeURIComponent(scope.row.diseaseName))
                    "
                  >
                    {{ scope.row.diseaseName || '-' }}
                  </div>
                  <div class="diseaseCode">{{
                    scope.row.diseaseCode || '-'
                  }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="推荐科室">
                <template slot-scope="scope">
                  <div class="message">
                    {{
                      scope.row.recommendDepartments.length
                        ? scope.row.recommendDepartments.join('、')
                        : '-'
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="疾病症状" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="message text-overflow">
                    {{ scope.row.diseaseSymptoms || '-' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="疾病标签">
                <template slot-scope="scope">
                  <div class="message">
                    {{
                      scope.row.diseaseLabels.length
                        ? scope.row.diseaseLabels.join(' | ')
                        : '-'
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="推荐药物">
                <template slot-scope="scope">
                    <div class="message">
                  <div
                    v-if="scope.row.recommendMedicineNum"
                    class="link-skip"
                    @click="toBasisiDrug(scope.row.diseaseName)"
                  >
                    {{ scope.row.recommendMedicineNum || '-' }}种
                  </div>
                  <div  v-else>暂无</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <div class="message mb-16">
                  <HoverTip
                    v-if="pageAuthority.includes('edit')"
                    content="编辑"
                    tip-class-name="icon-edit"
                    class="mr-30"
                    @click.native.prevent="
                      lookDetails(
                        scope.row.diseaseId,
                        encodeURIComponent(scope.row.diseaseName),
                      )
                    "
                  />
                  <HoverTip
                    v-if="pageAuthority.includes('detail')"
                    content="疾病图谱"
                    tip-class-name="icon-diseaseAtlas"
                    @click.native.prevent="
                      diseaseAtlas(encodeURIComponent(scope.row.diseaseName))
                    "
                  />
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
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'diseaseDatabase',
  filters: {
    formatDept(text) {
      if (text) {
        if (text === 'null') {
          return '';
        }
        return text;
      }
    }
  },
  data() {
    return {
      isShowClear: false,
      filter: {
        diseaseName: '',
        diseaseCode: '',
        departmentName: '',
        label: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      goodsList: [],
      diseasesLabels: [],
      secondDepartments: []
    };
  },
  computed: {
    pageAuthority() {
      // 180201 疾病库
      return this.$store.state.user.pageAuthority['180201'];
    }
  },
  created() {
    // 获取疾病标签
    this.getDiseaseLabel().then(res => {
      this.diseasesLabels = res.data;
    });
    // 获取二级科室
    this.getSubsDepartment().then(res => {
      this.secondDepartments = res.data;
    });
    const { pageNo } = JSON.parse(sessionStorage.getItem('historyFilter')) || {
      pageNo: 1
    };
    this.getList({
      page: Number(pageNo)
    });
  },
  methods: {
    ...mapActions('inquiryManage', [
      'getDiseaseList',
      'getDiseaseLabel',
      'getSubsDepartment'
    ]),
    ...mapActions('drugManage', ['setDiseaseName']),
    ...mapMutations('app', ['SET_PAGE_NUM']),
    toBasisiDrug(name) {
      this.SET_PAGE_NUM(1);
      this.setDiseaseName(name);
      this.$router.push('/dataDictionary/basisDrugs');
    },
    // 疾病图谱
    diseaseAtlas(name) {
      if (!this.pageAuthority.includes('detail')) {
        return;
      }
      const routeData = this.$router.resolve({
        path: '/dataDictionary/diseaseDatabase/diseaseAtlas',
        query: {
          name
        }
      });
      window.open(routeData.href, '_blank');
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        diseaseName: '',
        diseaseCode: '',
        departmentName: '',
        label: ''
      };
      this.getList({ page: 1, pageSize: 10 });
    },
    // 获取疾病列表
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
      vm.tableLoading = true;
      vm.getDiseaseList(params)
        .then(res => {
          vm.tableLoading = false;
          res.data.list.forEach(ele => {
            ele.diseaseLabels.forEach((item, index) => {
              this.$set(ele.diseaseLabels, index, item.substring(0, 1));
            });
          });
          vm.goodsList = res.data.list || [];
          vm.pagingOptions.total = res.data.total;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id, name) {
      const historyFilter = {
        pageNo: this.pagingOptions.pageNo
      };
      sessionStorage.setItem('historyFilter', JSON.stringify(historyFilter));
      this.$router.push({
        path: `/dataDictionary/diseaseDatabase/detail`,
        query: {
          id,
          name
        }
      });
    },
    onlyNumber(value) {
      const reg = /^([0]|[0-9][0-9]*)$/;
      const flag = reg.test(value);
      if (flag) {
        this.filter.serialNumber = value;
        return true;
      }
      this.filter.serialNumber = this.filter.serialNumber.slice(
        0,
        this.filter.serialNumber.length - 1,
      );
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-manage-page {
  .content {
    .table {
      font-size: 16px;
      .diseaseCode {
        font-size: 14px;

        color: #adafc3;
        line-height: 14px;
      }
      .twoLine {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .message {
        height: 60px;
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
  .hidden {
    width: 280px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
