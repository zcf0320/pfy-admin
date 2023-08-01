<template>
  <div class="portrait">
    <img v-if="pic" :src="pic" alt="" class="cloud" />
    <div id="container" ref="chart" />
  </div>
</template>

<script>
import Js2WordCloud from 'js2wordcloud';
import { mapActions } from 'vuex';
export default {
  name: 'portrait',
  data() {
    return {
      imgList: [
        'http://g-hcare-scm-1301127519.cos.ap-shanghai.myqcloud.com/scm/pic/20210526141126unknow.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDMyJNBigOXPcZHm8yf5D7lAOLHxMbIIl2%26q-sign-time%3D1622009486%3B1937369486%26q-key-time%3D1622009486%3B1937369486%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Dd87c4b8d8a3b732cfc58e81097814247a6e3ec11',
        'http://g-hcare-scm-1301127519.cos.ap-shanghai.myqcloud.com/scm/pic/20210526141151male.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDMyJNBigOXPcZHm8yf5D7lAOLHxMbIIl2%26q-sign-time%3D1622009512%3B1937369512%26q-key-time%3D1622009512%3B1937369512%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D20ee89b78ed4ef4facc3898a608f64728779a454',
        'http://g-hcare-scm-1301127519.cos.ap-shanghai.myqcloud.com/scm/pic/20210526141203female.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDMyJNBigOXPcZHm8yf5D7lAOLHxMbIIl2%26q-sign-time%3D1622009523%3B1937369523%26q-key-time%3D1622009523%3B1937369523%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D04282fb21f1baabff94dc52ff5e2a9912947e88b'
      ], // portrait_unknow portrait_male  portrait_female
      colorList: ['#999', '#545473', '#F64E60'],
      list: [],
      pic: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions('userManage', ['getUserPotrait']),
    getList() {
      this.getUserPotrait({ userId: this.$route.params.id }).then(res => {
        const { userLabel, sex } = res.data;
        userLabel.forEach(element => {
          this.list.push([element.label, element.count]);
        });

        this.sex = sex;
        let color = '';
        if (sex === '女') {
          this.pic = this.imgList[2];
          color = this.colorList[2];
        } else if (sex === '男') {
          this.pic = this.imgList[1];
          color = this.colorList[1];
        } else {
          this.pic = this.imgList[0];
          color = this.colorList[0];
        }
        this.$nextTick(() => {
          const wc = new Js2WordCloud(document.getElementById('container'));
          wc.setOption({
            imageShape: this.pic,
            fontSizeFactor: 1, // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
            maxFontSize: 44, // 最大fontSize，用来控制weightFactor，默认60
            minFontSize: 16, // 最大fontSize，用来控制weightFactor，默认60
            gridSize: this.list.length < 9 ? 80 : 12, // 密集程度 数字越小越密集
            weightFactor: 1, // 字体大小=原始大小*weightFactor
            fontWeight: 'normal', // 字体粗细
            fontFamily: 'PingFangSC-Medium, PingFang SC,sans-serif', // 字体
            color, // 字体颜色 'random-dark' 或者 'random-light'
            backgroundColor: 'rgba(255,255,255,0)', // 背景颜色
            rotateRatio: 0, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
            tooltip: {
              show: false,
              backgroundColor: 'rgba(0, 0, 0, 0.701961)' // 默认：'rgba(0, 0, 0, 0.701961)'
            },
            noDataLoadingOption: {
              // 无数据提示。
              backgroundColor: '#888',
              text: '暂无数据'
            },
            list: this.list
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.portrait {
  width: 100%;
  position: relative;
  #container {
    height: 430px;
    width: 702px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 350px;
  }
  .cloud {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 450px;
    width: 722px;
    transform: translate(-50%, -50%);
    margin-top: 350px;
  }
}
</style>
