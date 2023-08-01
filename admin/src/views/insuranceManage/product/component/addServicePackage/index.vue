<template>
  <div class="base-form page-form modal-form">
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-table :data="baseForm.items"
      :row-style="tableRowStyle"
      >
        <el-table-column label="保障计划">
          <template slot-scope="scope">
            <div class="look-content">{{ scope.row.planName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="服务包">
          <template slot-scope="scope">
            <div class="package-select">
              <el-form-item
                :prop="'items.' + scope.$index + '.packageId'"
                :rules="rules.packageId"
              >
                <el-select
                  v-model="scope.row.packageId"
                  filterable
                  placeholder="请选择服务包"
                  :disabled="edit === 'detail' || postStatus !== 107"
                >
                  <el-option
                    v-for="item in servicePackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <div
                v-if="edit === 'detail' || postStatus !== 107"
                class="look-details link-skip"
                @click="lookServicePackageId(scope.row.packageId)"
              >
                {{ getPackageName(scope.row.packageId) }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="next('baseForm')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button @click.native.prevent="back()">上一步</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="next('baseForm')"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'AddServicePackage',
  components: {
    Footer
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    step: {
      type: Number,
      default: 4
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      servicePackageList: [],

      loading: false,
      baseForm: {
        items: []
      },
      rules: {
        packageId: [
          {
            required: true,
            message: '请选择服务包',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getServicePackageList();
  },
  methods: {
    ...mapActions('insuranceProducts', [
      'createOrUpdatePackage',
      'getPlanServicePackages'
    ]),
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 2
      });
    },
    // 下一步
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {};
          this.step > 3 || this.step === 0
            ? (params = {
                ...this.baseForm,
                productId: this.id
              })
            : (params = {
                ...this.baseForm,
                productId: this.id,
                step: 4
              });

          this.loading = true;
          this.createOrUpdatePackage(params).then(res => {
            if (this.step === 0) {
              this.$message.success(res.message);
            }
            this.loading = false;
            if (this.step > 3) {
              this.$emit('next', {
                activeIndex: 4,
                data: { ...this.baseForm, stepState: false }
              });
              this.loading = false;
            } else {
              this.$emit('next', {
                activeIndex: 4,
                data: { ...this.baseForm, stepState: true }
              });
            }
          });
        }
      });
    },
    // 获取服务包列表
    getServicePackageList() {
      const vm = this;
      vm.$store
        .dispatch('servicePackage/getServicePackageListNew', {
          pageNum: 1,
          pageSize: 1000,
          postStatus: 105 // 已发布服务包
        })
        .then(response => {
          vm.servicePackageList = response.records;
          this.getPlanServicePackages({
            productId: this.id
          }).then(res => {
            this.baseForm.items = (res.data && res.data.configItems) || [];
          });
        })
        .catch(() => {});
    },
    // 根据id获取服务包名称
    getPackageName(id) {
      for (let index = 0; index < this.servicePackageList.length; index++) {
        const item = this.servicePackageList[index];
        if (item.id === id) {
          return item.packageName;
        }
      }
    },
    // 查看服务包详情
    lookServicePackageId(id) {
      const { href } = this.$router.resolve({
        path: `/supplyChainManage/servicePackage/details/${id}/detail`
      });
      window.open(href, '_blank');
    },
        // 设置表格行的样式
      tableRowStyle() {
        return 'border: 1px dashed #ccc;background:#FAFCFC;';
      }
  }
};
</script>
<style lang="scss" scoped>
.base-form {
  /deep/ .el-table__row {
   background: #F6F9F8;
     height: 58px;
     border: 1px #FDFFFF dashed;
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .package-select {
    padding: 24px 0;
    position: relative;
    .el-form-item {
      margin-bottom: 0;
    }
    /deep/ .el-input_inner {
     background: none;
    }
    .look-details {
      position: absolute;
      width: 100%;
      height: 36px;
      background-color: #f3f7ff;
      top: 24px;
      left: 0px;
      padding: 6px 12px;
    }
  }
}
</style>
