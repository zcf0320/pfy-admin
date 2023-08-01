<template>
  <div class="insurance-drug">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <Tab
          :current-key="activeName"
          :btns="btns"
          :btn-style="{ overflow: 'visible' }"
          @change="btnChange"
        />
        <div class="panel filter-box">
          <div class="panel-body">
            <div class="title-top" style="margin-top: 16px">
              医保目录<button
                v-if="pageAuthority.includes('add')"
                type="button"
                class="btn-save fr"
                @click="isShow = true"
              >
                新增
              </button>
            </div>
            <div v-if="activeName === '1'" class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <el-select
                      v-model="filter.area"
                      placeholder="全国"
                      clearable
                      filterable
                      @change="getList"
                    >
                      <el-option
                        v-for="item in hasProvince"
                        :key="item.area"
                        :label="item.area"
                        :value="item.area"
                      />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
            <el-table
              v-loading="tableLoading"
              :data="tableData"
              class="table-large"
            >
              <el-table-column label="名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="activeName === '1'">
                    {{ scope.row.area || '-' }}
                  </div>
                  <div v-else>国家基本药品医保目录</div>
                </template>
              </el-table-column>
              <el-table-column label="年份" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-for="item in scope.row.years" :key="item" class="year">
                    <span
                      :class="pageAuthority.includes('detail') ? 'blue' : ''"
                      @click="viewDetail(item, scope.row.area, activeName)"
                      >{{ item }}年</span
                    >
                  </div>
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img" />
            </el-table>
            <!-- <Pagination
              :total="pagingOptions.total"
              :limit="pagingOptions.pageSize"
              :page="pagingOptions.pageNo"
              @pagination="getList"
              layout="total, prev, pager, next"
            /> -->
          </div>
        </div>
      </el-scrollbar>
    </el-container>
    <el-dialog
      title="新增"
      :visible="isShow"
      width="443px"
      @close="isShow = false"
    >
      <div style="margin-bottom: 40px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-form-item v-if="activeName === '1'" label="所属省份" prop="area">
            <el-select
              v-model="form.area"
              placeholder="请选择省份"
              style="width: 383px"
              filterable
            >
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择年份" prop="year">
            <el-select
              v-model="form.year"
              placeholder="请选择年份"
              style="width: 383px"
            >
              <el-option
                v-for="item in yearList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          style="margin-right: 20px; border: 1px solid #3599fe; color: #3599fe"
          @click="isShow = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          :loading="loading"
          size="small"
          @click="submit('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import provinceList from '@/utils/province.json';
export default {
  name: 'insuranceDrug',
  data() {
    return {
      activeName: '0',
      btns: [
        { value: '0', name: '国家医保目录' },
        { value: '1', name: '地方医保目录' }
      ],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      tableLoading: false,
      tableData: [],
      form: {
        year: '',
        area: ''
      },
      yearList: [],
      rules: {
        year: [{ required: true, message: '年份必填', trigger: 'change' }],
        area: [{ required: true, message: '年份必填', trigger: 'change' }]
      },
      isShow: false,
      loading: false,
      isVisible: true,
      filter: {
        area: ''
      },
      provinceList,
      hasProvince: []
    };
  },
  computed: {
    pageAuthority() {
      // 180209 医保药品目录
      return this.$store.state.user.pageAuthority['180209'];
    }
  },
  watch: {
    activeName(newValue) {
      this.pagingOptions.pageNo = 1;
      this.filter.area = '';
      this.getList();
      newValue === '1' && this.getProvince();
    }
  },
  created() {
    this.getYear();
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        time: new Date().getTime(),
        isCountry: this.activeName === '0' ? true : false,
        area: this.activeName === '0' ? '' : this.filter.area
      };
      this.tableLoading = true;
      this.$store.dispatch('drugList/getCatalogs', params).then(res => {
        this.tableLoading = false;
        this.tableData = res.data;
      });
    },
    getProvince() {
      const params = {
        time: new Date().getTime(),
        isCountry: this.activeName === '0' ? true : false,
        area: this.activeName === '0' ? '' : this.filter.area
      };
      this.$store.dispatch('drugList/getCatalogs', params).then(res => {
        this.hasProvince = res.data;
      });
    },
    // 清除筛选条件
    clearFilter() {
      this.filter = {
        serviceId: '',
        serviceName: '',
        provideName: '',
        filterTime: []
      };
      this.getList({});
    },
    addItem() {},
    btnChange(val) {
      this.activeName = val;
    },
    viewDetail(year, area, activeName) {
      if (!this.pageAuthority.includes('detail')) {
        return;
      }
      this.$router.push({
        path: '/dataDictionary/insuranceDrug/detail',
        query: {
          type: activeName,
          year: year,
          area: area
        }
      });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          const params = {
            isCountry: this.activeName === '0' ? true : false,
            area: this.activeName === '0' ? '国家' : this.form.area,
            year: this.form.year
          };
          this.tableLoading = true;
          this.$store.dispatch('drugList/addCatalog', params).then(() => {
            this.loading = false;
            this.$message.success('保存成功！');
            this.getList();
            this.isShow = false;
            this.resetForm(formName);
          });
        }
      });
    },
    getYear() {
      const years = new Date().getFullYear();
      for (let i = years - 4; i <= years; i++) {
        const anOption = {};
        anOption.label = i;
        anOption.value = i;
        this.yearList.unshift(anOption);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.insurance-drug {
  .el-dialog__header {
    height: 80px;
    padding: 30px;
    .el-dialog__title {
      font-size: 16px;
      font-weight: bold;
      color: #464668;
    }
    .el-dialog__headerbtn {
      top: 32px;
      right: 30px;
      .el-dialog__close {
        color: #464668;
        font-size: 20px;
      }
    }
  }
  .el-form-item--medium .el-form-item__content {
    margin-top: -8px;
  }
  .el-dialog__body {
    margin-bottom: 18px;
    box-shadow: 0px 2px 10px 0px rgba(56, 56, 56, 0.06);
  }
  .el-dialog__footer {
    border-radius: 0px 0px 4px 4px;
  }
  .blue {
    color: #464668;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: #3599fe;
    }
  }
  .year {
    margin-right: 20px;
    display: inline-block;
  }
}
</style>
