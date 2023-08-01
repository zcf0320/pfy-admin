<template>
  <div id="audio_detail" class="container_box">
    <div>
      <audio :id="id" autoplay="autoplay" preload="auto" :src="data.url">
        你的浏览器不支持audio标签
      </audio>
      <div class="soundRecord">
        <div class="code mb-14">录音编号：{{ data.serialNumber }}</div>
        <div class="flex-box">
          <VueSlider
            v-model="audioTime"
            style="flex:1"
            :tooltip="'none'"
            :height="8"
            :process-style="{
              background: '#3599FEFF',
            }"
            :disabled="!isPlay"
            @change="onChange"
          />
          <div class="time">{{ audioCurrentTime }}/{{ audioAllTime }}</div>
          <div
            v-if="!isPlay"
            class="img-ico start-img  ml-24"
            @click="playAudio"
          />
          <div
            v-if="isPlay"
            class="img-ico stop-img ml-24"
            @click="pauseAudio"
          />
          <el-popover
            placement="top"
            width="60"
            trigger="click"
            popper-class="select-list"
          >
            <div>
              <div
                v-for="item in multipleArray"
                :key="item"
                class="select-item"
                :class="item == multipleIndex ? 'active' : ''"
                @click="
                  () => {
                    multipleIndex = item;
                    changeMultiple();
                  }
                "
              >
                {{ 'X' + item }}
              </div>
            </div>
            <div slot="reference" class="ml-30 pointer currentStatus">
              X{{ multipleIndex }}
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'telephoneConsultation',
  components: { VueSlider },
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      audioDetail: '',
      audioTime: 0, // 音频进度百分比
      audioCurrentTime: '00:00', // 音频当前播放时间
      audioAllTime: '00:00', // 音频总播放时间
      audioAllDuration: 0, // 音频总播放秒数
      isPlay: false, // 是否正在播放
      multipleArray: [2.0, 1.5, 1.25, 1, 0.5],
      multipleIndex: 1,
      audioInterval: null
    };
  },
  computed: {},
  created() {
    if (this.$isNotEmpty(this.data.talkDuration)) {
      this.audioAllTime = this.realFormatSecond(this.data.talkDuration);
    }
  },
  beforeDestroy() {
    this.stopAll();
  },
  destroyed() {
    clearInterval(this.audioInterval);
  },
  mounted() {
    this.stopAll();
  },
  methods: {
    // 设置定时检测
    setAudioInterval() {
      this.audioInterval = setInterval(() => {
        this.getAudioTime();
        const audioPlayer = document.getElementById(this.id);
        if (audioPlayer.ended) {
          // 播放结束后重置数据
          clearInterval(this.audioInterval);
          this.audioTime = 0;
          audioPlayer.currentTime = 0;
          this.audioCurrentTime = '00:00';
          this.isPlay = false;
        }
        audioPlayer.paused ? (this.isPlay = false) : (this.isPlay = true);
      }, 500);
    },
    // 暂停所有播放列表
    stopAll() {
      const audioList = document.querySelectorAll('audio');
      for (let i = 0; i < audioList.length; i++) {
        audioList[i].pause();
      }
    },
    // 播放
    playAudio() {
      this.stopAll();
      // 重设定时器
      clearInterval(this.audioInterval);
      this.getAudioTime();
      this.setAudioInterval();
      document.getElementById(this.id).play();
      this.isPlay = true;
    },
    // 暂停
    pauseAudio() {
      document.getElementById(this.id).pause();
      this.isPlay = false;
    },
    // 获取播放时间
    getAudioTime() {
      const audioPlayer = document.getElementById(this.id);

      this.audioAllDuration = audioPlayer.duration;
      this.audioCurrentTime = this.realFormatSecond(audioPlayer.currentTime);
      //
      // 计算当前进度百分比
      this.audioTime = Number(
        ((audioPlayer.currentTime * 100) / audioPlayer.duration).toFixed(3),
      );
    },
    // 滑动进度条
    onChange(value) {
      // 设置播放时间
      const audioPlayer = document.getElementById(this.id);
      this.audioCurrentTime = this.realFormatSecond(
        (this.audioAllDuration * value) / 100,
      );
      audioPlayer.currentTime = parseInt((this.audioAllDuration * value) / 100);
    },
    // 设置倍速播放
    changeMultiple() {
      const audioPlayer = document.getElementById(this.id);
      audioPlayer.playbackRate = this.multipleIndex;
    },
    // 格式化秒
    realFormatSecond(second) {
      const secondType = typeof second;
      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        // var hours = Math.floor(second / 3600)
        // second = second - hours * 3600
        // second = second
        const mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2);
      } else {
        return '00:00';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.soundRecord {
  // height: 72px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(53, 153, 254, 0.22);
  border-radius: 4px;
  padding: 17px 24px;
  margin-top: 24px;
  .code {
    height: 16px;
    font-size: 14px;
    color: #6f7293;
    margin-bottom: 14px;
  }
  .time {
    font-size: 14px;
    font-weight: 400;
    color: #6f7293;
    margin-left: 16px;
  }
  .img-ico {
    margin-top: -2px;
  }
  .currentStatus {
    color: #3599fe;
  }
}
.select-list {
  min-width: 60px !important;
}
/*自定义音频器*/
</style>
