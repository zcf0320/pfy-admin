<template>
  <div>
    <div class="log-list">
        <div v-if="logList.length>0">
         <div v-for="(item, index) in logList" :key="index" class="log-item">
        <span class="dot"/>
        <span class="time">{{ item.createTime | timeFormat }} </span>
        <span class="name">{{ item.name }} </span>
        <span
        class="name"
        >{{ $enums['operationType'][item.operation]
          }}{{ $enums['menuType'][item.type] }}</span>
        <span
          v-if="hasOALog && item.operation === 'DDApprove'"
          class="fc-blue ml-24 pointer"
          @click="toDetail(item)"
          >详情</span>
      </div>
        </div>
      <div v-else class="empty-img" >
      </div>
    </div>
    <ApprovalDetail
      :id="dingDingApproveInstanceId"
      :visible.sync="dialog.visible"
    />
  </div>
</template>

<script>
import ApprovalDetail from './components/approvalDetail';
export default {
  name: 'Logs',
  components: { ApprovalDetail },
  props: {
    type: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    hasOALog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logList: [],
      dingDingApproveInstanceId: ''
    };
  },
  computed: {},
  created() {
    this.getLog();
  },
  methods: {
    async getLog() {
      const res = await this.$store.dispatch('app/getSysLogs', {
        id: this.id,
        type: this.type
      });
      if (res) {
        this.logList = res.data || [];
      }
    },
    //* *查看日志详情 */
    toDetail(item) {
      this.dingDingApproveInstanceId = item.dingDingApproveInstanceId;
      this.dialog.visible = true;
    }
  }
};
</script>

<style scoped lang="scss">
.log-list {
  padding-top: 0px;
}
</style>
