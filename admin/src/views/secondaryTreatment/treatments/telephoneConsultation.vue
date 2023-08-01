<template>
  <div id="audio_detail" class="container_box">
    <img :src="audioDetail.img_url" class="audio_cover" />
    <div>
      <audio
        id="audioPlayer"
        autoplay="autoplay"
        preload="auto"
        src="http://wechatapppro-1252524126.file.myqcloud.com/appG1VMUALC2470/audio_compressed/1505377565_4fd15d83213bceb23a97ad6af45f1dae.mp3"
      >
        你的浏览器不支持audio标签
      </audio>
      <div class="audioBox">
        <div class="audioBox_top">
          <div class="audioBox_left">
            {{ audioCurrentTime }}
          </div>
          <div class="audioBox_slider">
            <!-- <van-slider
                            v-model="audioTime"
                            @change="onChange"
                            bar-height="4px"
                        /> -->
          </div>
          <div class="audioBox_right">
            {{ audioAllTime }}
          </div>
          <div class="clear" />
        </div>
        <div class="audioBox_control">
          <!--播放按钮-->
          <i
            v-show="!isPlay"
            class="iconfont icon-bofang1 iconfont_control"
            @click="playAudio"
          />
          <!--暂停按钮-->
          <i
            v-show="isPlay"
            class="iconfont icon-zanting iconfont_control"
            @click="pauseAudio"
          />
          <!--设置倍速播放-->
          <div class="audioBox_multiple" @click="changeMultiple">
            <div class="multiple_number">
              {{ multipleArray[multipleIndex] }}X
            </div>
            <div class="multiple_des">倍速播放</div>
          </div>
        </div>
      </div>
    </div>

    <div class="audio_title">{{ audioDetail.title }}</div>
    <div class="audio_des" v-html="audioDetail.desc" />
  </div>
</template>

<script>
export default {
  name: 'telephoneConsultation',
  prop: {
    mobile: String
  },
  data() {
    return {
      audioDetail: '',
      audioTime: 0, // 音频进度百分比
      audioCurrentTime: '00:00', // 音频当前播放时间
      audioAllTime: '00:00', // 音频总播放时间
      audioAllDuration: 0, // 音频总播放秒数
      isPlay: false, // 是否正在播放
      multipleArray: [0.75, 1, 1.5, 2],
      multipleIndex: 1,
      audioInterval: null
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.setAudioInterval();
  },
  methods: {
    // 设置定时检测
    setAudioInterval() {
      this.audioInterval = setInterval(() => {
        this.getAudioTime();
        const audioPlayer = document.getElementById('audioPlayer');
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
    // 播放
    playAudio() {
      // 重设定时器
      clearInterval(this.audioInterval);
      this.getAudioTime();
      this.setAudioInterval();
      document.getElementById('audioPlayer').play();
      this.isPlay = true;
    },
    // 暂停
    pauseAudio() {
      document.getElementById('audioPlayer').pause();
      this.isPlay = false;
    },
    // 获取播放时间
    getAudioTime() {
      const audioPlayer = document.getElementById('audioPlayer');

      // 展示用
      this.audioAllTime = this.realFormatSecond(audioPlayer.duration);
      this.audioAllDuration = audioPlayer.duration;
      this.audioCurrentTime = this.realFormatSecond(audioPlayer.currentTime);
      // 计算当前进度百分比
      this.audioTime = (
        (audioPlayer.currentTime * 100) /
        audioPlayer.duration
      ).toFixed(3);
    },
    // 滑动进度条
    onChange(value) {
      // 设置播放时间
      const audioPlayer = document.getElementById('audioPlayer');
      this.audioCurrentTime = this.realFormatSecond(
        (this.audioAllDuration * value) / 100,
      );
      audioPlayer.currentTime = parseInt((this.audioAllDuration * value) / 100);
    },
    // 设置倍速播放
    changeMultiple() {
      if (this.multipleIndex < 3) {
        this.multipleIndex++;
      } else {
        this.multipleIndex = 0;
      }
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.playbackRate = this.multipleArray[this.multipleIndex];
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
body {
  background: #fff;
}

.audio_cover {
  width: 100%;
}

.audio_title {
  font-size: 18px;
  padding: 15px 10px;
  /*margin-bottom: 10px;*/
}

.audio_des {
  padding: 0 15px;
}
.aplayer-icon-mode {
  display: none !important;
}
/*自定义音频器*/
.audioBox {
  padding: 10px 15px;
}
.audioBox_top {
  line-height: 24px;
}
.audioBox_left {
  float: left;
  color: #999;
  font-size: 12px;
  width: 14%;
  text-align: left;
}
.audioBox_slider {
  float: left;
  width: 72%;
  margin-top: 10px;
}
.audioBox_right {
  float: left;
  color: #999;
  font-size: 12px;
  width: 14%;
  text-align: center;
}
.van-slider__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #18aefc;
  border: 4px solid #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.audioBox_control {
  text-align: center;
  margin-top: 15px;
  position: relative;
}
.iconfont_control {
  display: inline-block;
  margin: 0 auto;
  font-size: 54px;
  color: #18aefc;
}
.audioBox_multiple {
  position: absolute;
  right: 28px;
  top: 15px;
  color: #b4b4b4;
}
.multiple_number {
  margin-bottom: 6px;
  font-size: 14px;
}
.multiple_des {
  font-size: 12px;
}
/*自定义音频器*/
</style>
