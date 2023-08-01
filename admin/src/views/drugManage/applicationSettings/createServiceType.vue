<template>
  <div class="service-type-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="drug-setting">
          <Tab
            :btns="btns"
            :current-key="activeName"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div v-if="activeName === '0'">
            <el-form
              ref="baseForm"
              :model="baseForm"
              :rules="rules"
              label-width="100px"
              label-position="top"
              style="margin-top: 24px"
            >
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="服务类型名称" prop="name">
                    <el-input
                      v-model="baseForm.name"
                      class="w-full"
                      :disabled="type !== '2' || !isUpdate"
                      maxlength="20"
                      placeholder="请输入服务类型名称"
                      @change="changeServiceTypeName"
                      show-word-limit
                    />
                    <!-- <InputMaxTip :max="20" :current-key="baseForm.name" /> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="goodsList.length > 0" :gutter="20">
                <el-col :span="24">
                  <el-form-item label="适用疾病" prop="diseaseIds">
                    <el-select
                      v-model="baseForm.diseaseIds"
                      multiple
                      filterable
                      placeholder="请选择适用疾病"
                      style="width: 100%"
                      :disabled="type !== '2' || !isUpdate"
                      @remove-tag="remove"
                      @change="change"
                    >
                      <el-option
                        v-for="item in diseaseList"
                        :key="item.id"
                        :label="item.diseaseName"
                        :value="item.id"
                      >
                        <span v-html="item.hightLable" />
                        <span class="option-remark">{{
                          item.code ? `${item.code} : ${item.attribute}` : ''
                        }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="goods-list">
              <div class="title-top p-30-lr">
                药品清单({{ goodsList.length }})
                <div
                  v-if="type === '2' && isUpdate"
                  class="add-drug"
                  @click="addDrug"
                  >+ 添加药品</div
                >
              </div>
              <div v-if="type === '1'" class="filter-form">
                <div class="filter-box" style="padding: 0">
                  <div class="search-form flex-between">
                    <div class="flex-box">
                      <div class="form-item">
                        <span class="label-name">商品名称:</span>
                        <el-input
                          v-model="filter.name"
                          placeholder="请输入商品名称"
                          class="search-input"
                        />
                      </div>
                      <div class="form-item">
                        <span class="label-name">适用疾病:</span>
                        <el-select
                          v-model="filter.diseaseId"
                          class="search-input"
                          placeholder="全部"
                          filterable
                        >
                          <el-option
                            v-for="item in diseaseList"
                            :key="item.id"
                            :label="item.diseaseName"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                      <div class="form-item">
                        <span class="label-name">规格:</span>
                        <el-input
                          v-model="filter.standard"
                          placeholder="请输入规格"
                          class="search-input"
                        />
                      </div>
                    </div>
                    <div class="flex-box">
                      <HoverTip
                        content="查询"
                        tip-class-name="icon-search mr-30"
                        @click.native.prevent="onload"
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
                        <span class="label-name">厂家:</span>
                        <el-input
                          v-model="filter.manufacturer"
                          placeholder="请输入厂家"
                          class="search-input"
                        />
                      </div>
                      <div class="form-item">
                        <span class="label-name">分类:</span>
                        <el-cascader
                          v-model="filter.classifyCode"
                          placeholder="全部"
                          :options="classifyList"
                          :props="optionProps"
                          style="width: 100%"
                        />
                      </div>
                      <div class="form-item">
                        <span class="label-name">销售状态:</span>
                        <el-select
                          v-model="filter.status"
                          class="search-input"
                          placeholder="全部"
                        >
                          <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>
                    </div>
                     <div v-if="!showMore" class="flex-box">
                        <img
                          class="expand-icon"
                          src="../../../assets/expand.png"
                          alt=""
                          @click="showMore = true"
                        />
                     </div>
                  </div>
                  <div v-if="showMore" class="filter-boxto">
                    <div class="search-form flex-between">
                      <div class="flex-box">
                        <div class="form-item">
                          <span class="label-name">药品状态:</span>
                          <el-select
                            v-model="filter.saleState"
                            class="search-input"
                            placeholder="全部"
                          >
                            <el-option
                              v-for="item in saleStateList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
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
              <el-table :data="goodsList" class="table-list-setting">
                <el-table-column label="药品信息" min-width="155">
                  <template slot-scope="scope">
                    <div class="info flex">
                      <div class="goods-img">
                        <img :src="JSON.parse(scope.row.headPic)[0]" alt="" />
                      </div>
                      <div class="content-drug">
                        <div class="link-skip" @click="goDrug(scope.row.id)">
                          {{ scope.row.name }}
                        </div>
                        <div>{{ scope.row.authorizedCode }}</div>
                        <div>{{ scope.row.standard }}</div>
                        <div>{{ scope.row.dosageForm }}</div>
                        <div>{{ scope.row.manufacturer }}</div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="适用疾病/分类"
                  show-overflow-tooltip
                  min-width="80"
                >
                  <template slot-scope="scope">
                    <div>{{ scope.row | formatDisease }}</div>
                    <div class="grey">
                      {{ scope.row.classifyName || '-' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="药品/销售状态"
                  show-overflow-tooltip
                  min-width="40"
                >
                  <template slot-scope="scope">
                    <div
                      :class="[
                        'label-text',
                        columnGoodsState[scope.row.saleState],
                      ]"
                      style="padding: 5px 0; min-width: 0"
                    >
                      {{ goodsState[scope.row.saleState] || '-' }}
                    </div>
                    <div class="grey">
                      {{ scope.row.status === 0 ? '停售' : '在售' }}
                    </div>
                  </template>
                </el-table-column>
                <template v-if="$route.params.combine === 'single'">
                  <el-table-column label="购买数量" min-width="150">
                    <template slot-scope="scope">
                      <div class="table-item usage">
                        <el-input-number
                          v-model="scope.row.purchAmount"
                          class="number"
                          :disabled="type !== '2' || !isUpdate"
                          :step="1"
                          :min="1"
                          :max="99"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </template>

                <template v-if="$route.params.combine === 'double'">
                  <el-table-column label="30天用量">
                    <template slot-scope="scope">
                      <div class="table-item usage">
                        <el-input-number
                          v-model="scope.row.thirtyAmount"
                          class="number"
                          :disabled="type !== '2' || !isUpdate"
                          :step="1"
                          :min="1"
                          :max="99"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="45天用量">
                    <template slot-scope="scope">
                      <div class="table-item usage">
                        <el-input-number
                          v-model="scope.row.fortyFiveAmount"
                          class="number"
                          :disabled="type !== '2' || !isUpdate"
                          :step="1"
                          :min="1"
                          :max="99"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="90天用量">
                    <template slot-scope="scope">
                      <div class="table-item usage">
                        <el-input-number
                          v-model="scope.row.ninetyAmount"
                          class="number"
                          :disabled="type !== '2' || !isUpdate"
                          :step="1"
                          :min="1"
                          :max="99"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <div class="setting-option flex">
                      <HoverTip
                        v-if="
                          scope.row.saleState === 1004 && scope.row.status === 0
                        "
                        content="在售"
                        tip-class-name="icon-status-on   mr-10"
                        @click.native.prevent="editItem(scope.row)"
                      />
                      <HoverTip
                        v-if="
                          scope.row.saleState === 1004 && scope.row.status === 1
                        "
                        content="停售"
                        tip-class-name="icon-status-halt  mr-10"
                        @click.native.prevent="editItem(scope.row)"
                      />
                      <div
                        v-if="type === '2'"
                        class="icon-delete"
                        @click="deleteGoods(scope.row)"
                      />
                    </div>
                  </template>
                </el-table-column>
                <div slot="empty">
                  <div slot="empty" class="empty-img" />
                </div>
              </el-table>
            </div>
            <div class="total">共{{ goodsList.length }}条</div>
            <div v-if="type === '2'" class="page-footer">
              <button type="button" class="btn-save" @click="save('baseForm')">
                保存
              </button>
            </div>
          </div>
          <div v-if="activeName === '1'">
            <Logs :id="$route.params.id" :type="'104'" :has-o-a-log="true" />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import _, { uniqWith, isEqual } from 'lodash';
import { replaceHightKeyWord } from '@/utils/common';
import { columnGoodsState, goodsState } from '@/utils/enum';
export default {
  name: 'CreateServiceType',
  filters: {
    formatDisease(val) {
      if (val.diseaseNames) {
        return val.diseaseNames;
      } else {
        if (val.suitDiseases && val.suitDiseases.length) {
          const arr = [];
          val.suitDiseases.forEach(item => {
            arr.push(item.diseaseName);
          });
          return arr.join(',');
        } else {
          return '-';
        }
      }
    }
  },
  data() {
    const checkDiseaseIds = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback();
      } else {
        callback(new Error('请选择适用疾病'));
      }
    };
    return {
      baseForm: {
        name: '',
        diseaseIds: []
      },
      rules: {
        name: {
          required: true,
          message: '请输入类型名称',
          trigger: 'blur'
        },
        diseaseIds: {
          trigger: 'change',
          validator: checkDiseaseIds
        }
      },
      type: '2',
      id: 'add',
      loading: false,
      showMore: false,
      diseaseList: [],
      filter: {
        name: '',
        diseaseId: '',
        standard: '',
        authorizedCode: '',
        classifyCode: '',
        manufacturer: '',
        status: '', // 0：停售，1：在售
        saleState: '' // 1004已上架，1005已下架
      },
      classifyList: [],
      optionProps: {
        label: 'value',
        value: 'label',
        children: 'children'
      },
      activeName: '0',
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      columnGoodsState,
      goodsState,
      statusList: [
        { value: '0', label: '停售' },
        { value: '1', label: '在售' }
      ],
      saleStateList: [
        { value: '1004', label: '已上架' },
        { value: '1005', label: '已下架' }
      ],
      logList: [],
      isUpdate: true
    };
  },
  computed: {
    goodsList() {
      return this.$store.state.drugManage.goodsList || [];
    },
    oldList() {
      return this.$store.state.drugManage.oldList || [];
    },
    pageState() {
      return this.$store.state.drugManage.pageState;
    }
  },
  watch: {
    goodsList: {
      handler(newValue) {
        if (newValue.length > 0) {
          this.getDiseases();
        } else {
          this.diseaseList = [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.onload();
    this.getType();
  },
  methods: {
    ...mapActions('goodsManage', ['getDiseaseByName', 'getDisease']),
    ...mapActions('drugManage', ['setDiseaseIds']),
    // 保存服务类型
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 检验是否重名
          if (!this.goodsList.length) {
            this.$message.warning('药品不能为空');
            return;
          }
          this.goodsList.forEach(item => {
            item.medicineId = item.id;
          });
          const postData = {
            type: this.$route.params.combine === 'single' ? 0 : 1,
            ...this.baseForm,
            dtos: this.goodsList,
            assignMedicineSupplier: this.$route.query.supplier - 0
          };
          this.$store
            .dispatch('drugManage/createApplication', postData)
            .then(res => {
              if (!res.code) {
                this.$message.success(res.comment);
                this.$router.push('/drugManage/applicationSettings');
              }
            });
        }
      });
    },
    // 添加药品页面
    addDrug() {
      this.$router.push(
        `/drugManage/applicationSettings/addDrug?type=${this.$route.params.combine}&supplier=${this.$route.query.supplier}`,
      );
    },
    // 服务类型名称改变
    changeServiceTypeName(value) {
      this.$store.commit('drugManage/SET_SERVICE_TYPE_NAME', value);
    },
    // 获取设置
    getTypeDetails(id) {
      if (this.pageState) {
        const params = {
          ...this.filter,
          id: id
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
        this.$store
          .dispatch('drugManage/getApplicationDetails', params)
          .then(res => {
            const { name, dtos = [], id, suitDiseases, isUpdate } = res.obj;
            const goodsListIds = [];
            this.baseForm.name = name;
            this.baseForm.id = id;
            this.changeServiceTypeName(name);
            this.baseForm.diseaseIds = [];
            this.isUpdate = isUpdate;
            for (const key in suitDiseases) {
              this.baseForm.diseaseIds.push(key.toString());
            }
             this.setDiseaseIds(this.baseForm.diseaseIds);
            if (dtos) {
              dtos.forEach(item => {
                item.id = item.medicineId;
                goodsListIds.push(item.medicineId);
              });
            }
            this.$store.commit('drugManage/SET_GOODS', {
              goodsList: dtos || [],
              goodsListIds
            });
            this.$store.commit('drugManage/SET_OLD', {
              oldList: this.baseForm.diseaseIds
            });
          });
      }
    },
    // 删除药品
    deleteGoods(item) {
      if (!this.isUpdate) {
        this.$message.error('被关联无法删除！');
        return;
      }
      this.$confirm('确认删除该药品吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('drugManage/changeGoodsList', {
          ...item,
          checked: false
        });
      });
    },
    // 模糊搜索疾病
    getDiseases() {
      this.loading = true;
      const medicineIds = [];
      this.goodsList.forEach(item => {
        medicineIds.push(item.id);
      });
      this.$store
        .dispatch('drugManage/getDiseasesByMedicine', medicineIds)
        .then(res => {
          this.loading = false;
          res.obj.forEach(item => {
            item.hightLable = replaceHightKeyWord('', item.diseaseName);
            item.id = item.id.toString();
          });
          this.diseaseList = uniqWith(res.data, isEqual) || [];
        })
        .catch(() => {
          this.loading = false;
        });
    },
    selectDisease() {
      const list = [];
      const diseaseIds = [];
      this.goodsList.forEach(item => {
        for (const i in item.suitDiseases) {
          list.push(item.suitDiseases[i]);
          diseaseIds.push(item.suitDiseases[i].id.toString());
        }
      });
      list.forEach(item => {
        item.hightLable = replaceHightKeyWord('', item.diseaseName);
        item.id = item.id.toString();
      });
      this.diseaseList = _.uniqWith(this.diseaseList.concat(list), _.isEqual);
      const obj = {};
      this.diseaseList = this.diseaseList.reduce((cur, next) => {
        obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []); // 设置cur默认类型为数组，并且初始值为空的数组
      this.$set(
        this.baseForm,
        'diseaseIds',
        _.uniqWith(this.oldList, _.isEqual),
      );
      this.baseForm.diseaseIds = this.$store.state.drugManage.diseaseIds;
    },
    remove() {
      this.$forceUpdate();
    },
    change(val) {
      this.$forceUpdate();
       this.setDiseaseIds(val);
    },
    goDrug(id) {
      const routeData = this.$router.resolve({
        path: `/dataDictionary/basisDrugs/basisDrugsDetail/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    clearFilter() {
      this.filter = {
        name: '',
        diseaseId: '',
        standard: '',
        authorizedCode: '',
        classifyCode: '',
        manufacturer: '',
        status: '', // 0：停售，1：在售
        saleState: '' // 1004已上架，1005已下架
      };
      this.onload();
      this.$nextTick(() => {
        this.$refs.baseForm && this.$refs.baseForm.resetFields();
      });
    },
    onload() {
      if (this.id !== 'add') {
        this.getTypeDetails(this.id);
      }
      this.baseForm = {
        name: this.$store.state.drugManage.serviceTypeName,
        id: this.id !== 'add' ? this.id : null
      };
      this.$nextTick(() => {
        this.$refs.baseForm && this.$refs.baseForm.resetFields();
      });
      if (this.id === 'add') {
        this.$store.commit('drugManage/SET_OLD', {
          oldList: []
        });
      }
       this.selectDisease();
    },
    getType() {
      this.$store.dispatch('drugManage/getMedicineTypes').then(res => {
        this.classifyList = this.getTreeData(res.obj) || [];
      });
    },
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
    handleClick(tab) {
      this.activeName = tab;
    },
    editItem(row) {
      this.$confirm(
        `确认调整为${row.status === 0 ? '在售' : '停售'}状态吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        },
      ).then(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
    }
    // getStatus (row) {
    //   if (!row.status) {
    //     if (row.saleState === 1004) {
    //       return '在售'
    //     } else {
    //       return "停售"
    //     }
    //   } else {
    //     return row.status === 0 ? "停售" : "在售"
    //   }

    // }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/common.scss';
.service-type-page {
     .expand-icon,
  .collapse-icon {
    width: 24px;
    height: 30px;
  }
  .el-input {
    width: 448px;
  }
  .frist-type {
    margin-right: 24px;
    color: #999999;
  }
  .title-top.p-30-lr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 0;
  }
  .add-drug {
    width: 96px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #3599fe;
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
    color: #3599fe;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .goods-list {
    border-radius: 4px;
    padding-bottom: 64px;
    .title {
      color: $fontColor;
      margin-bottom: 30px;
    }
    .goods-img {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      border: 1px solid #ebedf2;
      margin: 30px 17px 0 0;
      overflow: hidden;
      img {
        height: 100px;
        width: 100px;
        display: block;
      }
    }
    .table-item {
      padding: 12px;
      display: flex;
      align-items: center;
    }
    .usage {
      margin-left: -10px;
    }
    .info {
      justify-content: flex-start;
      align-items: flex-start;
      margin: 12px 0;
      .content-drug {
        font-size: 14px;
        color: #989ab3;
        line-height: 26px;
        div:first-child {
          font-size: 16px;
          font-weight: bold;
          color: #464668;
        }
      }
    }
  }
  .grey {
    color: #989ab3;
  }
  .total {
    margin: -39px 0 0 0;
    color: #545473;
  }
  .drug-setting {
    background: #fff;
    padding: 25px 25px 53px 25px;
  }
  .sale {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .onSale {
    background: url('../../../assets/onSale.png');
    background-size: 100% 100%;
  }
  .haltSale {
    background: url('../../../assets/haltSale.png');
    background-size: 100% 100%;
  }
  .setting-option {
    justify-content: space-between;
    align-items: center;
  }
}
</style>
