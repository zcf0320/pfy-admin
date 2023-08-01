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
          <div class="title-top">
            基础药品库
            <button type="button" class="btn-save fr" @click="batchUpdata">
              批量更新药品
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">药品通用名:</span>
                  <el-input
                    v-model="filter.medicineName"
                    placeholder="请输入药品通用名"
                    class="search-input"
                    @keyup.enter.native="getBasisDrugsList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">药品规格:</span>
                  <el-input
                    v-model="filter.medicineSpec"
                    placeholder="请输入药品规格"
                    class="search-input"
                    @keyup.enter.native="getBasisDrugsList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">适用疾病:</span>
                  <el-input
                    v-model="filter.applyDiseaseName"
                    placeholder="请输入适用疾病"
                    class="search-input"
                    @keyup.enter.native="getBasisDrugsList({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getBasisDrugsList({ page: 1 })"
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
                <span class="label-name">处方标记:</span>
                <el-select
                  v-model="filter.prescription"
                  placeholder="全部"
                  @change="getBasisDrugsList({ page: 1 })"
                >
                  <el-option label="处方药" :value="1" />
                  <el-option label="非处方药" :value="0" />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">数据来源:</span>
                <el-select
                  v-model="filter.source"
                  placeholder="全部"
                  @change="getBasisDrugsList({ page: 1 })"
                >
                  <el-option label="药房网" :value="1" />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">药品分类:</span>
                <el-cascader
                  v-model="filter.classifyCode"
                  :options="medicineTypes"
                  :props="optionProps"
                  placeholder="全部"
                  filterable
                  style="width: 100%"
                  @change="getBasisDrugsList({ page: 1 })"
                />
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="basisDrugsList"
          class="table-large"
        >
          <el-table-column label="药品通用名/规格">
            <template slot-scope="scope">
                <div class="box">
              <div
                :class="
                  scope.row.prescriptionType
                    ? 'medicineName Rx'
                    : 'medicineName otc'
                "
              >
                <span>{{ scope.row.medicineName || '-' }}</span>
              </div>
              <div class="medicineSpec">
                {{ scope.row.medicineSpec || '-' }}
              </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="批准文号/厂家">
            <template slot-scope="scope">
                  <div class="box">
              <div class="medicineName">
                {{ scope.row.approvalNumber || '-' }}
              </div>
              <div class="medicineSpec">
                {{ scope.row.manufacturer || '-' }}
              </div>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="给药途径/用法用量">
            <template slot-scope="scope">
                  <div class="box">
              <div class="mb-16 text-overflow">{{ scope.row.deliveryWay || '-' }}</div>
              <el-popover
                placement="bottom-start"
                width="500"
                popper-class="drugsPopover"
                trigger="hover"
              >
                <span slot="reference" class="icon-drug-use" />
                <div class="drugUseContent">
                  <div class="hover-title">
                    {{
                      scope.row.medicineName
                        ? scope.row.medicineName + '用法用量描述'
                        : '-'
                    }}：
                  </div>
                  <p class="hover-content">{{ scope.row.usage || '-' }}</p>
                </div>
              </el-popover>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="适应疾病" >
            <template slot-scope="scope">
                  <div class="box">
              <el-popover
                placement="bottom-start"
                width="500"
                popper-class="drugsPopover"
                trigger="hover"
              >
                <div class="drugUseContent">
                  <div class="hover-title">适应疾病：</div>
                  <p class="hover-content">
                    {{ scope.row.applyDiseaseName || '暂无数据' }}
                  </p>
                </div>
                <span slot="reference">{{
                  scope.row.applyDiseaseList
                    ? scope.row.applyDiseaseList.length + '个'
                    : '-个'
                }}</span>
              </el-popover>
                  </div>
            </template>
          </el-table-column>
          <el-table-column label="药品分类">
            <template slot-scope="scope">
               <div class="box">{{ scope.row.classifyName || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
  <div class="box">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
              <HoverTip
                content="价格监控"
                tip-class-name="icon-drugPrice"
                @click.native.prevent="
                  toPriceMonitor(scope.row.medicineName, scope.row.medicineSpec)
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
          @pagination="getBasisDrugsList"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'BasisDrugs',
  data() {
    return {
      filter: {
        medicineName: '',
        prescription: '',
        applyDiseaseName: '',
        medicineSpec: '',
        source: '',
        classifyCode: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      basisDrugsList: [],
      medicineTypes: [],
      optionProps: {
        label: 'value',
        value: 'label',
        children: 'children'
      }
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 180203 个险投保记录
      return this.$store.state.user.pageAuthority['180203'];
    }
  },
  created() {
    // 获取商品分类
    this.getMedicineTypes().then(res => {
      this.medicineTypes = this.getTreeData(res.obj) || [];
    });
    // 获取带入的疾病名字
    this.filter.applyDiseaseName =
      this.$store.state.drugManage.diseaseName || '';
    if (this.pageNum) {
      this.getBasisDrugsList({
        page: Number(this.pageNum)
      });
    } else {
      this.getBasisDrugsList({});
    }
  },
  methods: {
    ...mapActions('drugManage', [
      'getBasisDrugList',
      'setDiseaseName',
      'setDiseaseName',
      'getMedicineTypes'
    ]),
    // 递归删除空药品分类方法
    getTreeData(data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length < 1) {
          // children若为空数组，则将children删除
          delete data[i].children;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          if (data[i].children) {
            this.getTreeData(data[i].children);
          }
        }
      }
      return data;
    },
    getBasisDrugsList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      params.classifyCode =
        this.filter.classifyCode.length > 0
          ? this.filter.classifyCode[this.filter.classifyCode.length - 1]
          : '';
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableLoading = true;
      this.getBasisDrugList(params).then(res => {
        this.basisDrugsList = res.data.list;
        this.pagingOptions.total = res.data.total;
        this.tableLoading = false;
      });
    },
    clearFilter() {
      this.filter = {
        medicineName: '',
        prescription: '',
        applyDiseaseName: '',
        medicineSpec: '',
        source: '',
        classifyCode: ''
      };
      this.setDiseaseName('');
      this.getBasisDrugsList({});
    },
    lookDetails(id) {
      this.$router.push(`/dataDictionary/basisDrugs/basisDrugsDetail/${id}`);
    },
    toPriceMonitor(medicineName, medicineSpec) {
      const params = {
        medicineName,
        medicineSpec,
        year: '',
        platform: ''
      };
      localStorage.setItem('drugMonitor', JSON.stringify(params));
      const routeData = this.$router.resolve({
        path: '/dataDictionary/drugMonitor/drugMonitorDetail'
      });
      window.open(routeData.href, '_blank');
    },
    // 批量更新
    batchUpdata() {
      this.$router.push('/dataDictionary/basisDrugs/batchUpdate');
    }
  }
};
</script>

<style lang="scss" scoped>
.box{
    height: 60px;
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

</style>
