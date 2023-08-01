<template>
  <div class="leaving-message-detail">
    <el-container>
      <el-main v-loading="mainLoading">
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-if="activeName == '0'" class="leaving-message-info">
              <div class="leaving-message-info-title">基础信息</div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">用户名</div>
                <div class="leaving-message-info-item-r">
                  {{ detail.userName || '-' }}
                </div>
                 <div class="leaving-message-info-item-l">手机号</div>
                <div class="leaving-message-info-item-r">
                  {{ detail.mobile || '-' }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">留言时间</div>
                <div class="leaving-message-info-item-r">
                  {{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
                  <div class="leaving-message-info-item-l">更新时间</div>
                <div class="leaving-message-info-item-r">
                  {{ $moment(detail.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>
              <div class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">留言内容</div>
                <div class="leaving-message-info-item-r padd-17" id="flexDirection">
                  <div class="leaving-message-info-item-r-text">
                    {{ detail.content || '-' }}
                  </div>
                  <div
                    v-if="detail.pictures && detail.pictures.length > 0"
                    class="leaving-message-imgs"
                  >
                    <div
                      v-for="(item, index) in detail.pictures"
                      :key="'留言图片' + index"
                      class="leaving-message-imgs-item"
                    >
                      <el-image :src="item" :preview-src-list="[item]" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-for="(item, index) in detail.handleRemarks"
                :key="'处理' + index"
                class="leaving-message-info-item"
              >
                <div class="leaving-message-info-item-l">
                  处理备注{{ index + 1 }}
                </div>
                <div class="leaving-message-info-item-r padd-17">
                  <div class="leaving-message-info-item-r-text">
                    {{ item.handleRemark || '-' }}
                  </div>
                  <div class="leaving-message-info-item-r-time">
                    {{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </div>
                </div>
              </div>
           <div v-if="editType" class="leaving-message-info-item">
                <div class="leaving-message-info-item-l">备注</div>
                <div class="leaving-message-info-item-r">
                  <el-input
                    v-model="remark"
                    maxlength="200"
                    placeholder="请输入备注"
                    type="textarea"
                    :rows="3"
                  />
                </div>
              </div>
            </div>
            <div v-if="activeName == '1'" class="log-items">
              <div v-if="logList.length>0">
                <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight">{{
                    operationType[item.operation]
                  }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation]
                    }}{{ menuType[item.type] }}</span
                  >
                </div>
              </div>
              </div>
                    <div v-else  slot="empty" class="empty-img" />
            </div>
          </div>
        </div>
      </el-main>
      <div v-if="editType" class="page-footer">
        <button class="btn-exit mr-32" @click="saveRemark">保存</button>
        <button class="btn-save" @click="changeState">完成</button>
      </div>
    </el-container>
  </div>
</template>

<script>
import { operationType, menuType } from '@/utils/enum';
export default {
  name: 'LeavingMessageDetail',
  data() {
    return {
      operationType,
      menuType,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      activeName: 0,
      detail: {},
      mainLoading: true,
      remark: '',
      editType: false,
      logList: []
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
        this.$store
      .dispatch('leavingMessage/getMessageDetail', {
        id: this.$route.params.id
      })
      .then(res => {
        this.mainLoading = false;
        this.detail = res.data;
        this.editType = res.data.state === 1 ? true : false;
      });
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      if (tab === '1') {
        // 获取问卷日志
        this.$store
          .dispatch('marketingTool/getLogs', {
            id: this.$route.params.id,
            type: [51, 52]
          })
          .then(res => {
            if (res) {
              this.logList = res.data || [];
            }
          });
      }
    },
    saveRemark() {
      if (!this.remark) {
        this.$message({
          message: '请输入备注',
          type: 'error'
        });
        return;
      }
      this.mainLoading = true;
      this.$store
        .dispatch('leavingMessage/setMessageRemark', {
          handleRemark: this.remark,
          leavingMessageId: this.$route.params.id
        })
        .then(() => {
          this.getDetail();
          this.remark = '';
        });
    },
    changeState() {
      this.mainLoading = true;
      this.$confirm('您是否已处理完该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.remark) {
            this.$store
              .dispatch('leavingMessage/setMessageRemark', {
                handleRemark: this.remark,
                leavingMessageId: this.$route.params.id
              })
              .then(() => {
                this.getDetail();
                 this.remark = '';
              });
          } else {
            this.$store
              .dispatch('leavingMessage/setMessageState', {
                id: this.$route.params.id
              })
              .then(() => {
                this.mainLoading = false;
                this.editType = false;
              });
          }
        })
        .catch(() => {
          this.mainLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.leaving-message-detail {
  .leaving-message-info {
    // box-shadow: 0px 0px 2px 2px #e8e8e8;
    // margin-bottom: 20px;
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-item {
      min-height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 14px;
      // align-items: center;
      &-l {
        // height: 100%;
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
          display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
        //  border-right: 1px solid #ebedf2;
      }
      #flexDirection {
          display: flex;
         flex-direction: column;
      }
      &-r {
        // flex: 1;
        // min-height: 48px;
        // display: flex;
        // align-items: flex-start;
        // justify-content: center;
        // padding: 4px 61px;
        border-left: 1px solid #ebedf2;
        // border-right: 1px solid #e8e8e8;
        // flex-direction: column;
         display: flex;
        flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-right: 1px solid #ebedf2;
        &-text {
          line-height: 18px;
          word-break: break-all;
        }
        &-time {
          width: 100%;
          font-size: 14px;
          color: #989ab3;
          line-height: 14px;
          margin-top: 17px;
          text-align: right;
        }
        .leaving-message-imgs {
          display: flex;
          margin-top: 19px;
          &-item {
            width: 107px;
            height: 107px;
            background: #e8e8e8;
            border-radius: 4px;
            margin-right: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
        .el-form-item {
          /deep/ .el-form-item__error {
            right: 10px;
            top: 50%;
            left: auto;
            transform: translateY(-50%);
          }
        }
      }
    }
    &-content {
      border: 1px solid #e8e8e8;
      border-top: none;
      min-height: 48px;
      font-size: 14px;

      color: #545473;
      padding: 17px 24px 17px 32px;
      display: flex;
      line-height: 20px;
      align-items: flex-start;
      &-l {
        font-weight: bold;
      }
      &-c {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.open {
          word-break: break-all;
          white-space: normal;
        }
      }
      &-r {
        color: #3599fe;
        cursor: pointer;
      }
    }
    .padd-17 {
      padding: 17px 61px;
    }
  }
}
</style>
