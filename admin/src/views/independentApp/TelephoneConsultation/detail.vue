<template>
  <!-- <div class=""> -->
  <el-scrollbar
    :native="false"
    wrap-class="container-box el-main"
    tag="div"
    :noresize="false"
  >
    <iframe
      id="iframeBox"
      ref="iframe"
      src="/static/cti-tool/tel.html"
      frameborder="0"
      style="width: 100%; height: 40px; display: none"
    />
    <div class="flex content-box">
      <div class="life-content">
        <div class="base-contet pd-24">
          <div class="title-top mb-24">基础信息</div>
          <div class="line-solid" />
          <div class="base-info">
            <div class="info-item">
              <span class="label">问诊编号：</span>
              <span class="info-content">{{
                detail.baseMsg.serialNumber
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">开始时间：</span>
              <span class="info-content">{{
                detail.baseMsg.createTime | timeFormat
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">结束时间：</span>
              <span class="info-content">{{
                detail.baseMsg.endTime | timeFormat
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">问诊时长：</span>
              <span class="info-content">{{
                getMin(detail.baseMsg.chartTime)
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">通话数：</span>
              <span class="info-content">{{ detail.baseMsg.chartAmount }}</span>
            </div>
            <!-- <div class="info-item">
              <span class="label">服务来源：</span>
              <span
                :class="{
                  'link-skip': !!detail.serviceSourceVO.serviceSourceId,
                  'info-content': true
                }"
                @click="linkSkip(detail.serviceSourceVO)"
                >{{
                  detail.serviceSourceVO.serviceRegin
                    ? '【' +
                      serviceRegionState[
                        Object.keys(detail.serviceSourceVO.serviceRegin)[0]
                      ] +
                      '】'
                    : '-'
                }}{{ detail.serviceSourceVO.serviceSourceId }}</span>
            </div> -->
          </div>
        </div>
        <div class="log-content pd-24">
          <div class="title-top mb-24">操作日志</div>
          <div class="line-solid mb-24" />
          <el-timeline class="pl-0">
            <el-timeline-item
              v-for="(item, index) in logList"
              :key="index"
              :color="colors[index % 4]"
              size="large"
              :timestamp="item.timestamp"
            >
              <div>
                <span>{{ item.name }} </span>
                <span class="ml-4"
                  >操作{{ $enums['operationType'][item.operation] }}</span
                >
                <span class="ml-4 operation">
                  {{ $enums['menuType'][item.type] }}
                </span>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="right-content pd-24">
        <div class="title-top flex-between">
          电话问诊结果
          <div v-if="detail.state != 3">
            <el-button
              v-if="pageAuthority.includes('deal')"
              type="button"
              class="btn-exit mr-30"
              :disabled="!(status == 1 || status == 7)"
              @click="sendMessage()"
              >电话</el-button
            >
            <el-button
              v-if="pageAuthority.includes('deal')"
              type="primary"
              class="h-32"
              @click="dialog.visible = true"
              >发送问诊结果</el-button
            >
          </div>
        </div>
        <div class="base-info">
          <div class="info-item m-t18">
            <span class="label">手机号：</span>
            <span class="info-content">{{ detail.onlineCallMsg.mobile }}</span>
          </div>
          <div class="info-item-content m-t18">
            <span class="label">问诊状况：</span>
            <span class="info-content-wrap">{{
              detail.onlineCallMsg.patientDescribe
            }}</span>
          </div>
          <div class="info-item m-t18">
            <span class="label">诊疗结果：</span>
            <span
              class="info-content link-skip"
              @click="toDisease(detail.resultMsg.diseaseName)"
              >{{ detail.resultMsg.diseaseName }}</span
            >
          </div>
          <div class="info-item m-t18">
            <span class="label">推荐科室：</span>
            <span class="info-content">{{
              detail.resultMsg.diseaseClinicDepartment
            }}</span>
          </div>
          <div class="info-item m-t18">
            <span class="label">推荐药物：</span>
            <span class="info-content">{{ detail.resultMsg.diseaseDrug }}</span>
          </div>
        </div>
        <div class="line-solid mt-20" />
        <div class="title-top mt-24 mb-12">问诊详情</div>
        <div class="detail">
          本次疾病概述：{{ detail.onlineCallMsg.patientDescribe }}
        </div>
        <div v-if="$isNotEmpty(detail.onlineCallMsg.callRecordVOs)">
          <div
            v-for="item in detail.onlineCallMsg.callRecordVOs"
            :key="item.serialNumber"
          >
            <soundRecord :id="item.serialNumber" :data="item" />
          </div>
        </div>
        <div class="title-top mt-24 mb-12">备注内容</div>
        <div v-if="$isNotEmpty(detail.onlineCallMsg.remarkVOs)">
          <div
            v-for="item in detail.onlineCallMsg.remarkVOs"
            :key="item.createTime"
            class="mb-12 detailContent"
          >
            <div>{{ item.remark }}</div>
          </div>
        </div>
        <div class="mt-12">
          <div class="title-top-small mt-24">备注：</div>
          <el-input
            v-model="remark"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            maxlength="300"
            show-word-limit
          />
        </div>
      </div>
    </div>
    <div class="page-footer">
      <button
        v-if="pageAuthority.includes('deal')"
        type="button"
        class="btn-save"
        @click="saveRemark"
      >
        保存
      </button>
    </div>
    <sendResult :id="id" :visible.sync="dialog.visible" @saved="goBack" />
  </el-scrollbar>
</template>
<script>
import soundRecord from './componments/soundRecord';
import sendResult from './componments/sendResult';
import { serviceRegionState } from '@/utils/enum';
import { default as api } from '@/api/skinTest';
export default {
  name: 'TelephoneConsultationDetail',
  components: {
    soundRecord,
    sendResult
  },
  data() {
    return {
      remark: '',
      colors: ['#FFAA15FF', '#1DC4BEFF', '#F64E60FF', '#1890ff'],
      logList: [],
      iframeWin: '',
      currentStarus: null,
      status: null,
      id: this.$route.params.id,
      detail: {
        baseMsg: {},
        onlineCallMsg: {},
        resultMsg: {},
        userMsg: {}
        // serviceSourceVO: {
        //   serviceRegin: null,
        //   serviceSourceId: ''
        // }
      },
      serviceRegionState
    };
  },
  computed: {
    pageAuthority() {
      return this.$store.state.user.pageAuthority['190303'];
    }
  },
  mounted() {
    this.iframeWin = this.$refs.iframe.contentWindow;
    window.addEventListener('message', this.handlerMessage);
  },
  created() {
    this.getDetail();
    this.getLog();
  },
  methods: {
    // 接受ifram 传来的数据
    handlerMessage(e) {
      // 处理ifram 传来的数据
      const { data } = e;
      switch (data.cmd) {
        case 'changeCode':
          this.status = data.params.code;
          break;
        case 'err':
          this.status = 0;
          this.$message.error(data.params.err);
          break;
        default:
          return false;
      }
    },
    // ifram 发送数据
    sendMessage() {
      if (this.$isEmpty(this.detail.onlineCallMsg.mobile)) {
        return;
      }
      this.$store.dispatch('telephoneconsulation/makeCall', {
        recordId: this.id
      });

      // 处理ifram 传来的数据
      this.iframeWin.postMessage(
        {
          cmd: 'call',
          params: {
            mobile: this.detail.onlineCallMsg.mobile,
            id: this.id
          }
        },
        '*',
      );
    },
    // 获取分钟
    getMin(s) {
      if (this.$isEmpty(s)) {
        return '';
      }
      let H = parseInt(s / 3600);
      H = H < 10 ? 0 + '' + H : H;
      const min = parseInt(s % 3600);
      let M = parseInt(min / 60);
      M = M < 10 ? 0 + '' + M : M;
      let S = parseInt(min % 60);
      S = S < 10 ? 0 + '' + S : S;
      return H + ':' + M + ':' + S;
    },
    // 详情数据‘
    getDetail() {
      if (this.$isEmpty(this.id)) {
        return false;
      }
      this.$store
        .dispatch('telephoneconsulation/callRecordDetail', {
          id: this.id
        })
        .then(res => {
          res.data.resultMsg = res.data.resultMsg || {};
          this.detail = res.data;
        });
    },
    // 获取日志
    getLog() {
      api.getLogList(this.id, '50').then(res => {
        if (this.$isNotEmpty(res.obj)) {
          res.obj.forEach(item => {
            item.timestamp = this.$timeFormat(item.createTime);
          });
        }
        this.logList = res.obj || [];
      });
    },
    // 备注
    saveRemark() {
      if (this.$isEmpty(this.remark)) {
        this.$message.warning('请输入备注');
        return;
      }
      this.$store
        .dispatch('telephoneconsulation/updateRemark', {
          id: this.id,
          remark: this.remark
        })
        .then(() => {
          const obj = {
            remark: this.remark,
            createTime: new Date().getTime()
          };
          this.detail.onlineCallMsg.remarkVOs.unshift(obj);
          this.remark = '';
        });
    },
    // 回到列表页面
    goBack() {
      this.getDetail();
    },
    // 跳转疾病详情
    toDisease(name) {
      const routeData = this.$router.resolve({
        path: `/dataDictionary/diseaseDatabase/detail`,
        query: {
          name
        }
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss">
.container-box {
  .title-top-small {
    font-size: 14px;

    font-weight: 400;
    color: #494b74;
    line-height: 14px;
    margin-bottom: 8px;
  }
  &.el-main {
    padding: 24px !important;
    background: #f3f6fcff !important;
  }
  .top-content {
    height: 140px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 24px;
  }
  .content {
    flex: 1;
    line-height: 32px;
    span {
      font-size: 14px;
      color: #6f7293ff;
    }
    .name {
      color: #464668ff;
    }
  }
  .info-item {
    display: flex;
    align-items: center;
    margin-top: 24px;
    &.m-t18 {
      margin-top: 18px;
    }
    .label {
      width: 130px;
      font-size: 14px;
      font-weight: 500;
      color: #6f7293ff;
    }
    .info-content {
      color: #464668ff;
      flex: 1;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .info-item-content {
    display: flex;
    &.m-t18 {
      margin-top: 18px;
    }
    .label {
      width: 130px;
      font-size: 14px;
      font-weight: 500;
      color: #6f7293ff;
    }
    .info-content-wrap {
      color: #464668ff;
      flex: 1;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .base-contet {
    width: 361px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .log-content {
    width: 361px;
    min-height: 313px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
  }
  .right-content {
    flex: 1;
    min-height: 630px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-left: 24px;
    .detail {
      width: 680px;
      font-size: 14px;
      font-weight: 400;
      color: #6f7293;
      line-height: 32px;
    }
    .info-content {
      line-height: 24px;
      font-size: 14px;
    }
  }
  .operation {
    color: #3599feff;
  }
  .detailContent {
    font-size: 14px;
    color: #6f7293;
    line-height: 21px;
  }
}
</style>
