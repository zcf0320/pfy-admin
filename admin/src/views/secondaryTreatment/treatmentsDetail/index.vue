<template>
  <el-container>
    <el-main class="relative detail">
      <div class="h-top flex-col">
        <Tab :btns="btns" @change="btnChange" />
        <div class="scroll-table">
          <div v-if="activeName == '1'" class="data-list">
            <div class="title-top content-detail">基础信息</div>
            <div class="data-item border-no">
              <el-row>
                <el-col :span="8">
                  ID：
                  <span class="ml-10">{{ detail.serialNumber || '-' }}</span>
                </el-col>
                <!-- -->
                <el-col :span="8">
                  服务名称：
                  <span class="ml-10">
                    {{ detail.serviceTypeName }}
                  </span>
                </el-col>
                <el-col :span="8">
                  申请人姓名：
                  <span class="ml-10">{{ detail.name }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  >手机号码：
                  <span class="ml-10">
                    {{ detail.mobile }}
                  </span>
                </el-col>
                <el-col :span="8">
                  身份证号：
                  <span class="ml-10">
                    {{ detail.idCard }}
                  </span>
                </el-col>
                <el-col :span="8">
                  邮箱：
                  <span class="ml-10">
                    {{ detail.email }}
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  审核状态：
                  <span class="ml-10">
                    {{ $enums['secondaryTreatmentState'][detail.state] }}
                  </span>
                </el-col>
              </el-row>
              <el-row v-if="$isNotEmpty(detail.remark)">
                <el-col :span="24">
                  审核不通过原因：
                  <span class="ml-10">
                    {{ detail.remark }}
                  </span>
                </el-col>
              </el-row>
              <el-row v-if="$isNotEmpty(detail.userDemand)">
                <el-col :span="24">
                  用户诉求：
                  <span class="ml-10">{{ detail.userDemand }}</span>
                </el-col>
              </el-row>
              <div v-if="$isNotEmpty(detail.feedbackPic)">
                <div class="title-top content-detail">服务结果</div>
                <div>
                  <el-image
                    style="width: 200px; height: 150px"
                    :src="detail.feedbackPic"
                    :preview-src-list="[detail.feedbackPic]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeName == '2'">
            <div class="data-list">
              <div
                v-for="item in detail.materialMsgList"
                :key="item.materialId"
              >
                <div class="title-top content-detail">
                  {{ item.materialName }}
                </div>
                <imgs :urls="$isEmpty(item.imgs) ? [] : item.imgs.split(',')" />
              </div>
            </div>
          </div>
          <div v-if="activeName == '3'" class="log-lists">
            <Logs :id="$route.params.id" :type="'28'" />
          </div>
        </div>
        <secondaryReject
          :id="$route.params.id"
          :visible.sync="dialogVisible"
          @saved="goBack()"
        />
      </div>
    </el-main>
    <!--      -->
    <div v-if="detail.state == '1'" class="page-footer">
      <el-button
        size="small"
        class="btn-bg-blue"
        type="primary"
        border
        @click="passReview()"
        >审核</el-button
      >
    </div>
  </el-container>
</template>

<script>
import secondaryReject from '../component/secondaryReject';
import imgs from '@/views/claimManagement/auditRecords/components/imgs';
export default {
  name: 'auditRecordsDetail',
  components: { secondaryReject, imgs },
  data() {
    return {
      isReview: false,
      logList: [],
      activeName: '1',
      btns: [
        { value: '1', name: '基础信息' },
        { value: '2', name: '补充资料' },
        { value: '3', name: '操作日志' }
      ],
      dialogVisible: false,
      detail: {
        insuredMsg: {},
        rejectReasons: [],
        materialMsgList: []
      }
    };
  },
  computed: {},
  created() {
    this.getDetail();
  },
  methods: {
    /**
     * 获取详情数据
     */
    async getDetail() {
      const res = await this.$store.dispatch(
        'secondaryTreatment/detailSecondaryTreatment',
        this.$route.params.id,
      );
      if (res) {
        res.obj.materialMsgList = res.obj.materialMsgList || [];
        this.detail = this.$extends({}, res.data);
      }
    },
    /**
     * 通过
     */
    passReview() {
      this.dialogVisible = true;
    },
    /**
     * 查看日志
     */
    async getLog() {
      const res = await this.$store.dispatch('app/getSysLogs', {
        id: this.$route.params.id,
        type: '28'
      });
      if (res) {
        this.logList = res.data || [];
      }
    },
    /**
     * 按钮组change
     */
    btnChange(val) {
      this.activeName = val;
    },
    /**
     * 返回记录页面
     */
    goBack() {
      this.$router.push('/secondaryTreatment/treatments');
    }
  }
};
</script>

<style scoped lang="scss">
.el-main::-webkit-scrollbar {
  display: none;
}
.h-top {
  height: calc(100% - 28px);
  overflow: auto;
}
.fixted-bottom {
  position: fixed;
  bottom: 10px;
  left: 274px;
  right: 30px;
  height: 68px;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
  border-radius: 0px 0px 4px 4px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
  .btn-border-blue {
    border: 1px solid #3599fe;
    color: #3599fe;
  }
  .btn-bg-blue {
    color: #fff;
    background: #3599fe;
  }
}
.detail {
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(417px);
  }
  .claimWarnModal {
    position: absolute;
    right: 0;
    top: 0;
    .tip {
      z-index: 3;
      position: absolute;
      right: 0;
      top: 20px;
      height: 36px;
      background: #3599fe;
      box-shadow: 0px 0px 11px 0px rgba(204, 204, 204, 0.5);
      border-radius: 100px 0px 0px 100px;
      transition: all 0.8s;
      font-size: 14px;

      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
      cursor: pointer;
      &.close {
        width: 74px;
      }
      &.open {
        width: 162px;
      }
      .claim-open {
        display: inline-block;
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin: 0 6px 0 12px;
        background: url('../../../assets/claim-open.png') no-repeat center
          center;
        background-size: contain;
      }
      .claim-close {
        display: inline-block;
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin: 0 6px 0 12px;
        background: url('../../../assets/claim-close.png') no-repeat center
          center;
        background-size: contain;
      }
      span {
        vertical-align: middle;
        line-height: 36px;
      }
    }
  }
}
</style>
