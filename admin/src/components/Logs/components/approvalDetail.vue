<template>
  <Dialog
    title="审批字段"
    :visible.sync="dialogVisible"
    :height="800"
    :width="700"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <div class="title ">基础信息</div>
      <el-row :gutter="20">
        <el-col :span="12" class="mb-16">
          审批状态：{{ $enums['DDApprove'][detail.status] }}
        </el-col>
        <el-col :span="12" class="mb-16">
          审批编号：{{ detail.businessId }}
        </el-col>
        <el-col
          v-for="item in detail.formComponentValues"
          :key="item.id"
          :span="12"
          class="mb-16"
        >
          <div class="lh-32 flex">
            <div class="flex-shrink ">{{ item.name }}：</div>
            <div v-if="$isNotEmpty(item.value) && item.value != 'null'">
              {{ item.value }}
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="line-solid mb-24"/>
      <div class="title ">流程</div>
      <!-- <div class="process"> -->
      <!-- <div
                    class="flex-between-normal process-item"
                    v-for='(item,index) in detail.operationRecords'
                    :key='index'
                >
                    <div class="flex">
                        <div class="normal"></div>
                        <div
                            class="ml-10"
                            v-if='item.userid==detail.originatorUser.userId'
                        >
                            <div class="type mb-12">发起申请</div>
                            <div class="applyName">申请人：{{item.userName}}</div>
                        </div>
                        <div
                            class="ml-10"
                            v-else
                        >
                            <div class="type mb-12">{{item.userName}}</div>
                            <div class="applyName">审批人：<span
                                    v-for='data in detail.approverUsers'
                                    :key='data.userId'
                                >{{data.userName}}</span> </div>
                        </div>
                    </div>
                    <div class="time">{{item.date | timeFormat}}</div>
                </div> -->
      <!-- <div class="flex-between-normal process-item">
                    <div class="flex">
                        <div class="normal"></div>
                        <div class="ml-10">
                            <div class="type mb-12">发起审批</div>
                            <div class="applyName">申请人：baoqifan</div>
                        </div>
                    </div>
                    <div class="time">2021-10-21 10:30:20</div>
                </div> -->
      <!-- </div> -->
      <div class="log-list pt-0 ">
        <div
          v-for="(item, index) in detail.operationRecords"
          :key="index"
          class="log-item"
        >
          <span class="time ml-0">{{ item.date | timeFormat }} </span>
          <span class="name">{{ item.userName }} </span>
          <span class="name">{{
            $enums['DDOperation'][item.operationType]
          }}</span>
          <span class="name">{{
            item.operationResult === 'AGREE'
              ? '同意'
              : item.operationResult === 'REFUSE'
              ? '拒绝'
              : ''
          }}</span>
          <span class="name">{{ item.remark }}</span>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </Dialog>
</template>

<script>
export default {
  name: 'sendResult',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,

      detail: {
        formComponentValues: [],
        operationRecords: [],
        approverUsers: [],
        ccUsers: [],
        originatorUser: null
      }
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          if (this.$isNotEmpty(this.id)) {
            this.getDetail();
          }
        }
        this.$nextTick(() => {
          this.dialogVisible = val;
        });
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    // 获取审批流程
    getDetail() {
      this.$store
        .dispatch('approval/queryApproveInstanceDetail', this.id)
        .then(res => {
          this.detail = res.data;
        });
    },
    // 是审批人
    isApprover() {},
    // 是抄送人
    isCC() {}
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: #464668;
  margin-bottom: 16px;
}
.process {
  .process-item {
    margin-bottom: 38px;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: 38px;
      background: rgba(245, 245, 245, 1);
      top: 44px;
      left: 22px;
    }
    &:last-child {
      margin-bottom: 0px;
      &::after {
        position: absolute;
        content: '';
        width: 0px;
      }
    }
  }
  .type {
    font-size: 14px;
    color: #464668;
  }
  .applyName {
    font-size: 14px;
    color: #a2a3b7;
  }
  .agress {
    width: 51px;
    height: 46px;
    background-image: url('../../../assets/agree.png');
    background-size: 100% 100%;
  }
  .disagress {
    width: 51px;
    height: 46px;
    background-image: url('../../../assets/disagree.png');
    background-size: 100% 100%;
  }
  .normal {
    width: 44px;
    height: 44px;
    background-image: url('../../../assets/normal.png');
    background-size: 100% 100%;
  }
}
</style>
