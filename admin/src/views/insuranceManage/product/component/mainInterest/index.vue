<template>
  <div class="base-form page-form modal-form">
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主险权益" prop="mainProtectRightsId">
            <div class="main-protect-rights">
              <el-select
                v-model="baseForm.mainProtectRightsId"
                filterable
                multiple
                :disabled="step > 1 || step === 0"
                placeholder="请选择主险权益"
              >
                <el-option
                  v-for="item in mainProtectRights"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <!-- <div
                class="look-details"
                v-if="step > 1 || step === 0"
                @click="lookProtectRightsId(baseForm.mainProtectRightsId)"
              >
                {{ getMainName(baseForm.mainProtectRightsId) }}
              </div> -->
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="edit === 'edit'" class="page-footer">
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
import { priceUnit } from './config';
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'MainInterest',
  components: {
    Footer
  },
  props: {
    mainProtectRightsId: {
      type: Array,
      default: function() {
        return [];
      }
    },
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
      default: 2
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseForm: {
        mainProtectRightsId: []
      },
      rules: {
        mainProtectRightsId: [
          {
            required: true,
            message: '请选择主险权益',
            trigger: 'change'
          }
        ]
      },
      mainProtectRights: [],
      priceUnit,

      loading: false
    };
  },
  computed: {},
  watch: {
    mainProtectRightsId: function() {
      this.baseForm.mainProtectRightsId = this.mainProtectRightsId;
    }
  },
  created() {
    // 获取主险列表
    this.$store
      .dispatch('insuranceProducts/getAllMain', {
        type: 158,
        postStatus: 105
      })
      .then(res => {
        if (!res.code) {
          this.mainProtectRights = res.obj;
          this.baseForm.mainProtectRightsId = this.mainProtectRightsId;
        }
      });
  },
  methods: {
    ...mapActions('insuranceProducts', ['updateMainRight']),
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 0
      });
    },
    // 保存并新增
    next(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let data = {};
          const arrMainRights = [];
          vm.mainProtectRights.forEach(item => {
            if (vm.baseForm.mainProtectRightsId.indexOf(item.id) > -1) {
              data = {
                ...item,
                protectRightsId: item.id,
                protectRightsPriceSettingIds: '',
                protectRightsName: item.name,
                protectRightsPrice: ''
              };
              // 去除无效的字段,防止后续流程判断有空值
              for (const key in data) {
                if (data[key] === null) {
                  delete data[key];
                }
              }
              arrMainRights.push(data);
            }
          });
          let params = {};
          this.step > 1 || this.step === 0
            ? (params = {
                id: this.id,
                mainRightIds: vm.baseForm.mainProtectRightsId
              })
            : (params = {
                id: this.id,
                mainRightIds: vm.baseForm.mainProtectRightsId,
                step: 2
              });
          if (this.step > 1) {
            this.$emit('next', {
              activeIndex: 2,
              data: {
                data: arrMainRights,
                id: vm.baseForm.mainProtectRightsId,
                stepState: false
              }
            });
          } else {
            this.loading = true;
            this.updateMainRight(params)
              .then(res => {
                this.loading = false;
                if (this.step === 0) {
                  this.$message.success(res.message);
                }
                this.$emit('next', {
                  activeIndex: 2,
                  data: {
                    data: arrMainRights,
                    id: vm.baseForm.mainProtectRightsId,
                    stepState: true
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        }
      });
    },
    // 跟新主险权益
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('insuranceProducts/updateMainRight', {
              id: this.id,
              mainRightIds: this.baseForm.mainProtectRightsId
            })
            .then(() => {
              this.$message.success('更新主险权益成功');
            });
        }
      });
    },
    // 根据id获取主险名称
    getMainName(id) {
      for (let index = 0; index < this.mainProtectRights.length; index++) {
        const item = this.mainProtectRights[index];
        if (item.id === id) {
          return item.name;
        }
      }
    }
    // 点击查看保险权益
    // lookProtectRightsId(id) {
    //   const { href } = this.$router.resolve({
    //     path: `/insuranceManage/guaranteePower/guaranteePowerDetails/${id}`
    //   })
    //   window.open(href, '_blank')
    // }
  }
};
</script>
<style lang="scss" scoped>
.base-form {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .main-protect-rights {
    position: relative;
    .look-details {
      position: absolute;
      position: absolute;
      width: 100%;
      height: 36px;
      background-color: #f3f7ff;
      top: 0px;
      left: 0px;
      padding: 0px 12px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
