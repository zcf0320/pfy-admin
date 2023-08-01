<template>
  <div class="page-comment-manage-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" @change="handleClick"/>
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="content">
                <el-form
                  ref="commentDetails"
                  :model="commentDetails"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="title-top content-detail">
                      基础数据
                    </div>
                    <div class="data-item">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="ID">
                            <el-input
                              v-model="commentDetails.serviceRecordId"
                              disabled
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务项" class="link-box">
                            <el-input disabled/>
                            <div
                              class="link"
                              @click="
                                lookServiceItem(commentDetails.serviceInfoId)
                              "
                            >
                              {{ commentDetails.serviceInfoName }}
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="评价类型">
                            <el-input
                              v-model="commentType[commentDetails.type]"
                              disabled
                              placeholder="请输入评价类型"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="评价内容">
                            <el-input
                              v-model="commentDetails.content"
                              disabled
                              placeholder="请输入评价内容"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="服务记录ID">
                            <el-input
                              v-model="commentDetails.serviceRecordId"
                              disabled
                              placeholder="请输入服务记录ID"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="运营备注">
                            <el-input
                             maxlength="40"
                              show-word-limit
                              v-model="commentDetails.remark"
                              placeholder="该内容仅内部沟通展示,个人中心不展示"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <div v-show="activeName === '1'" class="log-items">
              <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle"/>
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                  }}</span>
                  <!-- <span class="color-hight">{{item.creator}}</span> -->
                  <span class="color-hight">{{ item.name }}</span>
                  <span
class="color-hight"
>{{ operationType[item.operation] }}
                    {{ menuType[item.type] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="page-footer">
          <button
                        type="button"
                        class="btn-save fr"
                        @click="updateRemark"
                      >
                        保存
                      </button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  serviceUseStatus,
  operationType,
  menuType,
  commentType
} from '@/utils/enum';
export default {
  name: 'UserDetails',
  data() {
    return {
      tableLoading: false,
      type: false,
      activeName: '0',
      modalShow: false,
      tabIndex: '0',
      commentDetails: {
        serviceInfoName: '',
        content: '',
        commentId: '',
        serviceInfoId: '',
        commentLevel: '',
        serviceRecordId: '',
        remark: ''
      },
      logList: [],
      serviceUseStatus,
      operationType,
      menuType,
      commentType,
      btns: []
    };
  },
  created() {
    const vm = this;
    // 判断是新增还是编辑
    vm.id = vm.$route.params.id;
    vm.getCommentDetails(vm.id);
    if (vm.id) {
      vm.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
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
      if (tab === '1') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '9'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
    },
    // 获取评价详情
    getCommentDetails(id) {
      this.$store
        .dispatch('commentManage/getCommentDetails', {
          id
        })
        .then(res => {
          this.commentDetails = res.obj;
        });
    },
    // 查看服务预约详情
    lookPage(id, serviceType, reverseType) {
      let routeData = '';
      if (serviceType === 1) {
        // 查看预约记录详情
        routeData = this.$router.resolve({
          path: `/operateManage/appointmentService/details/${id}/${reverseType}`
        });
      } else {
        // 在线服务详情
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${id}`
        });
      }
      window.open(routeData.href, '_blank');
    },
    // 查看服务项
    lookServiceItem(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/details`
      });
      window.open(routeData.href, '_blank');
    },
    // 更新运营备注
    updateRemark() {
      const vm = this;
      this.$store
        .dispatch('commentManage/updateRemark', {
          id: vm.id,
          remark: vm.commentDetails.remark
        })
        .then(() => {
          this.$router.go(-1);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-comment-manage-details {
  // /deep/ textarea{
  //   height: 36px;
  // }
  /deep/ .el-row::after{
    content: none;
  }
  .scroll-table {
    border-top: 1px solid #EBEDF2;
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
        .link-box {
          position: relative;
          .link {
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 2;
            // color: #3b9fff;
            text-decoration: underline;
            height: 36px;
            cursor: pointer;
          }
        }
      }
    }
    .table-link {
      color: #3b9fff;
      text-decoration: underline;
      cursor: pointer;
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
