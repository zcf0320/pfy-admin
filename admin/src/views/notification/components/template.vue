<template>
  <div class="noti-template flex">
    <div
      v-for="(item, index) in data"
      :key="item.id"
      :class="{
        'tem-container': true,
        active: item.active,
        highlight: item.templateId == id ? true : false,
      }"
    >
      <div class="title">{{ item.templateName }}</div>
      <div v-if="time" class="time">
        {{ $moment(item.createTime).format('YYYY-MM-DD HH:MM:SS') }}
      </div>
      <div :class="{ content: true, hidden: item.hidden }">
        <span v-if="item.templateTitle">{{ item.templateTitle }}---</span
        >{{ item.templateContent }}
      </div>
      <div class="detail flex" @click="toggle(item, index)">
        <span>{{ item.hidden ? '展开详情' : '收起详情' }}</span>
        <div v-if="item.hidden" :class="{ icon: true, open: item.hidden }" />
        <div v-if="!item.hidden" :class="{ icon: true, close: !item.hidden }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTemplate',
  props: {
    time: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    data() {
      const list = [];
      this.list.forEach(item => {
        item.hidden = true;
        list.push(item);
      });
      return list;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const highlight = document.getElementsByClassName('highlight')[0];
      if (highlight) {
        highlight.scrollIntoView();
      }
    });
  },
  methods: {
    toggle(item) {
      item.hidden = !item.hidden;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.noti-template {
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  .tem-container {
    width: 238px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(232, 232, 232, 0.5);
    border-radius: 4px;
    padding: 16px 16px 12px;
    margin: 0 25px 25px 0;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #464668;
      line-height: 24px;
    }
    .time {
      font-size: 12px;
      color: #989ab3;
      margin-top: 12px;
    }
    .content {
      font-size: 14px;
      color: #989ab3;
      margin-top: 12px;
      line-height: 20px;
    }
    .hidden {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .detail {
      justify-content: center;
      align-items: center;
      padding-top: 12px;
      font-size: 14px;
      color: #3599fe;
      box-shadow: 0px -1px 0px 0px #ebedf2;
      margin-top: 16px;
      cursor: pointer;
      .icon {
        width: 14px;
        height: 14px;
        margin-left: 8px;
      }
      .open {
        background: url('../../../assets/detail-open.png');
        background-size: 100% 100%;
      }
      .close {
        background: url('../../../assets/detail-close.png');
        background-size: 100% 100%;
      }
      .btn {
        cursor: pointer;
      }
    }
  }
  .highlight {
    box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.5);
  }
}
</style>
