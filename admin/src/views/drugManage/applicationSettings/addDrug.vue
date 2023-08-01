<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <!-- <el-main> -->
      <div class="add-drug-page page-form modal-form">
        <div class="goods-type">
          <div class="title-top"><span class="required" />新增药品</div>
          <div class="filter-form">
            <div class="filter-box">
              <div class="search-form flex-between">
                <div class="flex-box">
                  <div class="form-item">
                    <span class="label-name">商品分类</span>
                    <el-select
                      v-model="baseForm.parentLevel"
                      placeholder="一级分类"
                      @change="firstTypesChange"
                    >
                      <el-option
                        v-for="item in firstTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div v-if="baseForm.parentLevel" class="form-item">
                    <span class="label-name">&nbsp;</span>
                    <el-select
                      v-model="baseForm.childLevel"
                      placeholder="二级分类"
                      value-key="id"
                      @change="secondTypesChange"
                    >
                      <el-option
                        v-for="item in secondTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">疾病名称</span>
                    <el-select
                      v-model="baseForm.diseaseId"
                      filterable
                      placeholder="请选择疾病名称"
                      remote
                      :remote-method="getDiseases"
                      :loading="loading"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in diseaseList"
                        :key="item.diseaseName"
                        :label="item.diseaseName"
                        :value="item.id"
                      >
                        <span v-html="item.hightLable" />
                        <span class="option-remark">{{
                          item.code ? `${item.code} : ${item.attribute}` : ''
                        }}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <div class="form-item">
                    <span class="label-name">药品名称</span>
                    <el-input
                      v-model="baseForm.name"
                      placeholder="请输入药品名称"
                      class="search-input"
                    />
                  </div>
                  <div
                    v-if="this.$route.query.supplier === '1'"
                    class="form-item"
                  >
                    <span class="label-name">供应商名称:</span>
                    <el-input
                      v-model="baseForm.supplierName"
                      placeholder="请输入供应商名称"
                      class="search-input"
                    />
                  </div>
                </div>
                <div class="flex-box">
                  <HoverTip
                    content="查询"
                    tip-class-name="icon-search mr-30"
                    @click.native.prevent="getgoodsListByType"
                  />
                  <HoverTip
                    content="清除查询条件"
                    tip-class-name="icon-reset"
                    @click.native.prevent="clearFilter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-list">
          <el-table v-loading="tableloading" :data="goodsList">
            <el-table-column label="商品图片" min-width="100">
              <template slot-scope="scope">
                <div class="table-item flex">
                  <el-checkbox
                    v-model="scope.row.checked"
                    @change="goodsChange(scope.row)"
                  />
                  <div class="goods-img">
                    <img :src="JSON.parse(scope.row.headPic)[0]" alt="" />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="药品" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="this.$route.query.supplier === '1'"
              label="供应商名称"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.supplierName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="厂家">
              <template slot-scope="scope">
                <span>{{ scope.row.manufacturer || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="批准文号">
              <template slot-scope="scope">
                <span>{{ scope.row.authorizedCode || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格">
              <template slot-scope="scope">
                <span>{{ scope.row.standard || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型">
              <template slot-scope="scope">
                <span>{{ scope.row.dosageForm || '-' }}</span>
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
          <!-- <Pagination
            :total="pagingOptions.total"
            :limit="pagingOptions.pageSize"
            :page="pagingOptions.pageNo"
            @pagination="getgoodsListByType"
            layout="total, prev, pager, next"
          /> -->
        </div>
        <div class="page-footer">
          <button type="button" class="btn-save" @click="goback()">
            确定({{ goodsListIds.length }})
          </button>
        </div>
      </div>
      <!-- </el-main> -->
    </el-scrollbar>
  </el-container>
</template>
<script>
import { uniqWith, isEqual } from 'lodash';
import { replaceHightKeyWord } from '@/utils/common';
import { mapActions } from 'vuex';
export default {
  name: 'AddDrug',
  data() {
    return {
      baseForm: {
        parentLevel: null,
        childLevel: null,
        diseaseId: '',
        name: '',
        supplierName: ''
      },
      goodsList: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      rules: {
        name: { required: true, message: '请输入类型名称', trigger: 'blur' }
      },
      firstTypes: [],
      secondTypes: [],
      diseaseList: [],
      loading: false,
      tableloading: true
    };
  },
  computed: {
    goodsListIds() {
      return this.$store.state.drugManage.goodsListIds;
    }
  },
  created() {
    this.getMedicineTypes();
    this.getgoodsListByType();
  },
  methods: {
    ...mapActions('goodsManage', ['getDiseaseByName']),
    // 根据分类获取商品列表
    getgoodsListByType() {
      const params = {
        ...this.baseForm,
        assignMedicineSupplier: this.$route.query.supplier - 0
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.tableloading = true;
      this.$store
        .dispatch('drugManage/findMedicineByType', params)
        .then(res => {
          this.tableloading = false;
          if (res.records) {
            res.records.forEach(item => {
              if (this.goodsListIds.includes(item.id)) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
            this.goodsList = res.records || [];
          } else {
            this.goodsList = [];
          }
        });
    },
    // 获取商品分类
    getMedicineTypes() {
      this.$store.dispatch('goodsManage/getMedicineTypes').then(res => {
        this.firstTypes = res.obj || [];
      });
    },
    // 一级分类改变
    firstTypesChange(id) {
      this.secondTypes =
        this.firstTypes.find(item => item.id === id).childs || [];
      this.baseForm.childLevel = null;
      this.getgoodsListByType();
    },
    // 二级分类改变
    secondTypesChange() {
      this.getgoodsListByType();
    },
    // 商品选中状态改变
    goodsChange(item) {
      const { checked, id } = item;
      if (!checked) {
        this.$confirm('确认删除该药品吗?', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(() => {
            this.$store.dispatch('drugManage/changeGoodsList', item);
          })
          .catch(() => {
            // 取消选择恢复选中状态
            this.goodsList.forEach(item => {
              if (item.id === id) {
                item.checked = true;
              }
            });
          });
      } else {
        // 初始化购买数量
        item = {
          ...item,
          purchAmount: 1,
          thirtyAmount: 1,
          fortyFiveAmount: 1,
          ninetyAmount: 1
        };
        this.$store.dispatch('drugManage/changeGoodsList', item);
      }
    },
    // 确认返回
    goback() {
      if (this.goodsListIds.length > 0) {
        this.$message.success('添加成功');
      }
      this.$store.commit('drugManage/SET_PAGE_STATE', false);
      this.$router.back(-1);
    },
    // 清除筛选条件
    clearFilter() {
      this.baseForm = {
        serviceId: '',
        serviceName: '',
        provideName: '',
        filterTime: [],
        pageNum: 1,
        pageSize: 10,
        diseaseId: '',
        name: '',
        supplierName: '',
        assignMedicineSupplier: this.$route.query.supplier - 0
      };
      this.getgoodsListByType();
    },
    // 模糊搜索疾病
    getDiseases(keyword) {
      this.loading = true;
      if (keyword !== '') {
        this.getDiseaseByName({
          name: keyword
        })
          .then(res => {
            this.loading = false;
            res.obj.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = uniqWith(res.data, isEqual) || [];
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.diseaseList = [];
      }
    },
    checkStatus(row) {
      if (this.$route.query.type === 'single') {
        let flag = false;
        this.goodsListIds.map(item => {
          if (item === row.id) {
            flag = false;
          } else {
            flag = true;
          }
          return flag;
        });
        return flag;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-drug-page {
  .goods-type {
    .title-top {
      .required {
        color: #ff4949;
      }
    }
    margin-bottom: 24px;
  }
  .el-select {
    width: 100%;
  }
  .goods-list {
    .table-item {
      padding: 12px;
      display: flex;
      align-items: center;

      .goods-img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        margin-left: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
