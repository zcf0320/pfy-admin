<template>
  <div class="page-active-code-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick" />
          <div class="scroll-table">
            <div v-show="activeName == '0'">
              <div class="title-top content-detail">基础信息</div>
              <div class="content">
                <el-form
                  ref="baseForm"
                  :model="baseForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item v-if="id" label="ID">
                            <el-input
                              v-model="baseForm.id"
                              :disabled="id ? true : false"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="渠道名称" prop="chanelName">
                            <el-input
                              v-model="baseForm.chanelName"
                              maxlength="20"
                              placeholder="请输入渠道名称"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="渠道链接" prop="chanelLink">
                            <el-input
                              v-model="baseForm.chanelLink"
                              placeholder="请输入渠道链接"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="备注">
                            <el-input
                              v-model="baseForm.remark"
                              placeholder="请输入备注"
                              maxlength="40"
                              show-word-limit
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
              <div class="table">
                <!-- <div class="title-top content-detail">
                  关联企业（{{ realativeList.length }}）<button
                    type="button"
                    class="btn-save fr"
                    @click="isShow = true"
                  >
                    新增
                  </button>
                </div> -->
                <el-table :data="realativeList" class="table-large">
                  <el-table-column label="ID" prop="id" />
                  <el-table-column label="企业名称" prop="companyName" />
                  <el-table-column label="简称" prop="companySimpleName" />
                  <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <HoverTip
                        content="查看"
                        tip-class-name="icon-detail"
                        class="mr-30"
                        @click.native.prevent="addOrLookSupplier(scope.row.id)"
                      />
                      <el-popconfirm
                        title="删除后将不可恢复，是否删除？"
                        placement="top"
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        confirm-button-type="plain"
                        cancel-button-type="primary"
                        :hide-icon="true"
                        @onConfirm="deleteSupplier(scope.$index)"
                      >
                        <HoverTip
                          slot="reference"
                          content="删除"
                          tip-class-name="icon-delete"
                        />
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
              </div>
            </div>
            <div v-show="activeName == '1'">
              <div class="title-top content-detail">券码信息</div>
              <div class="content">
                <div class="data-list">
                  <div class="data-item-table">
                    <el-table
                      v-loading="tableLoading"
                      :data="baseForm.acticeCodeMsgs"
                    >
                      <el-table-column label="批次号">
                        <template slot-scope="scope">
                          <span>{{ scope.row.codeBatch || '-' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="批次券码数量">
                        <template slot-scope="scope">
                          <span>{{ scope.row.codeMount || '-' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务包">
                        <template slot-scope="scope">
                          <span>{{ scope.row.packageName || '-' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新时间">
                        <template slot-scope="scope">
                          <span>{{
                            $moment(scope.row.updateTime).format(
                              'YYYY/MM/DD HH:mm:ss',
                            ) || '-'
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                          <HoverTip
                            content="查看"
                            tip-class-name="icon-detail"
                            class="mr-30"
                            @click.native.prevent="
                              lookCodeBatch(scope.row.codeBatch)
                            "
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeName == '2'" class="log-items">
              <div v-if="logList.length>0">
                     <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.creator }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation]
                    }}{{ menuType[item.type] }}</span
                  >
                </div>
              </div>
              </div>
                 <div v-else>
                  <!-- 暂无记录 -->
                  <div slot="empty" class="empty-img" />
              </div>
            </div>
          </div>
          <div class="page-footer">
            <button type="button" class="btn-save" @click="save('baseForm')">
              {{ id ? '保存' : '创建' }}
            </button>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      title="新增"
      :visible="isShow"
      width="498px"
      class="bold-dialog"
      @close="closeDialog"
    >
      <div style="margin-bottom: 40px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="企业名称：">
            <el-select
              v-model="form.companys"
              placeholder="请选择企业"
              multiple
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              value-key="id"
              @change="changeCompany"
            >
              <el-option
                v-for="item in enterpriseList"
                :key="item.id"
                :label="item.companyName"
                :value="item"
              >
                <span v-html="item.hightLable" />
                <span class="option-remark">{{ item.companySimpleName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称：" prop="relationCompanyIds">
            <el-input v-model="form.simple" :disabled="true" />
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
          @click="submit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { operationType, menuType } from '@/utils/enum';
import { replaceHightKeyWord } from '@/utils/common';
import { uniqWith, isEqual } from 'lodash';
export default {
  name: 'ActiveCodeDetails',
  data() {
    return {
      tableLoading: false,
      activeName: '0',
      id: '',
      tabIndex: '0',
      baseForm: {
        id: '',
        chanelName: '',
        chanelLink: '',
        remark: '',
        acticeCodeMsgs: [],
        relationCompanyIds: []
      },
      logList: [],
      rules: {
        chanelName: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ],
        chanelLink: [
          { required: true, message: '请输入渠道链接', trigger: 'blur' }
        ]
      },
      operationType,
      menuType,
      btns: [],
      isShow: false,
      form: {
        companys: [],
        simple: ''
      },
      enterpriseList: [],
      searchLoading: false,
      loading: false,
      realativeList: []
    };
  },
  computed: {},
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.query.id;
    if (vm.id) {
      vm.getChannelDetails();
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '券码信息' },
        { value: '2', name: '操作日志' }
      ];
    } else {
      vm.btns = [{ value: '0', name: '基础信息' }];
    }
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
      vm.activeName = tab;
      if (tab === '2') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '13'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 批次号查询
    lookCodeBatch(codeBatch) {
      const routeData = this.$router.resolve({
        path: `/projectManage/activeCodeManage`,
        query: {
          codeBatch
        }
      });
      window.open(routeData.href, '_blank');
    },
    // 创建或者保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          this.baseForm.relationCompanyIds = this.realativeList.map(item => {
            return item.id;
          });
          if (vm.id) {
            vm.$store
              .dispatch('channelManage/update', {
                ...vm.baseForm,
                id: vm.id
              })
              .then(res => {
                if (res.code === 0) {
                  vm.$message.success('保存成功');
                }
              });
          } else {
            vm.$store.dispatch('channelManage/save', vm.baseForm).then(res => {
              if (res.code === 0) {
                vm.$message.success('新增成功');
                vm.$router.push({
                  path: `/projectManage/channelManage`
                });
              }
            });
          }
        }
      });
    },
    // 获取渠道详情
    getChannelDetails() {
      const vm = this;
      vm.$store
        .dispatch('channelManage/getChannelDetails', {
          id: vm.id
        })
        .then(res => {
          if (res.code === 0) {
            vm.baseForm = res.obj;
            this.realativeList = res.obj.companyVos;
          }
        });
    },
    remoteMethod(companyName) {
      this.searchLoading = true;
      if (companyName !== '') {
        const params = { companyName, accountStatus: 2 };
        const relationCompanyIds =
          this.realativeList.map(item => {
            return item.id;
          }) || [];
        if (relationCompanyIds.length) {
          Object.assign(params, { relationCompanyIds });
        }
        this.$store
          .dispatch('channelManage/getcompanyList', params)
          .then(res => {
            this.searchLoading = false;
            res.records.forEach(item => {
              item.hightLable = replaceHightKeyWord(
                companyName,
                item.companyName,
              );
            });
            this.enterpriseList = res.records || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.enterpriseList = [];
      }
    },
    submit() {
      if (this.form.companys.length === 0) {
        return false;
      }
      this.realativeList = uniqWith(
        this.realativeList.concat(this.form.companys),
        isEqual,
      );
      this.isShow = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCompany() {
      const data = [];
      this.form.companys.forEach(item => {
        data.push(item.companySimpleName);
      });
      this.form.simple = data.join(',');
    },
    closeDialog() {
      this.form.companys = [];
      this.form.simple = '';
      this.$refs.form.resetFields();

      this.isShow = false;
    },
    addOrLookSupplier(id) {
      const routeData = this.$router.resolve({
        path: `/projectManage/customer/detail/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    deleteSupplier(index) {
      this.realativeList.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-active-code-details {
  .scroll-table {
    border-top: 1px solid #EBEDF2;
  }
  /deep/ .el-row::after{
    content: none;
  }
  .details-content {
    .data-list {
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item {
        .add-certificates {
          margin-top: 24px;
        }
      }
    }
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
}
</style>
