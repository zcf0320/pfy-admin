<template>
  <div class="set-style-page">
    <div class="peopleInfo-l">
      <div class="peopleInfo-l-title">
        背景样式
        <button type="button" class="btn-exit" @click="toView(0)">
          背景预览
        </button>
      </div>
      <div class="select-bg">
        <div class="select-bg-l">
          选择颜色：
        </div>
        <div class="select-bg-r">
          <el-color-picker
            v-model="styleInfo.backgroundSettings"
            :disabled="putOnState"
            :predefine="predefineColors"
          />
        </div>
      </div>
      <div class="peopleInfo-l-title mt-24">
        封面样式
        <button type="button" class="btn-exit" @click="toView(1)">
          封面预览
        </button>
      </div>
      <div class="input-item">
        <div class="input-item-l">问卷标题：</div>
        <div class="input-item-r">
          <el-input
            v-model="styleInfo.name"
            :disabled="putOnState"
            maxlength="10"
            placeholder="请输入问卷标题"
          />
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-l">问卷副标题：</div>
        <div class="input-item-r">
          <el-input
            v-model="styleInfo.secondName"
            :disabled="putOnState"
            maxlength="100"
            placeholder="请输入问卷副标题"
          />
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-l">按钮文案：</div>
        <div class="input-item-r">
          <el-input
            v-model="styleInfo.buttonText"
            :disabled="putOnState"
            maxlength="10"
            placeholder="请输入按钮文案"
          />
        </div>
      </div>
      <div class="cover-bg">
        <div class="cover-bg-img">
          <div class="cover-bg-img-l">
            <el-radio
              v-model="styleInfo.coverSelect"
              :disabled="putOnState"
              :label="1"
              @change="coverSelectChange"
              >上传图片(375*667)：</el-radio
            >
          </div>
          <div class="cover-bg-img-r">
            <el-upload
              :disabled="putOnState || !styleInfo.coverSelect"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadDetailPic"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="styleInfo.imgurl"
                :src="styleInfo.imgurl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </div>
        <div class="cover-bg-color">
          <div class="cover-bg-color-l">
            <el-radio
              v-model="styleInfo.coverSelect"
              :disabled="putOnState"
              :label="0"
              @change="coverSelectChange"
              >颜色选择：</el-radio
            >
          </div>
          <div class="cover-bg-color-r">
            <el-color-picker
              v-model="styleInfo.coverSettings"
              :disabled="putOnState || !!styleInfo.coverSelect"
              :predefine="predefineColors"
            />
          </div>
        </div>
      </div>
      <div class="peopleInfo-l-title mt-24">
        结果页样式
        <button type="button" class="btn-exit" @click="toView(2)">
          结果页预览
        </button>
      </div>
      <div class="select-bg">
        <div class="select-bg-l">
          选择颜色：
        </div>
        <div class="select-bg-r">
          <el-color-picker
            v-model="styleInfo.resultPageSettings"
            :disabled="putOnState"
            :predefine="predefineColors"
          />
        </div>
      </div>
    </div>
    <div class="peopleInfo-r">
      <div class="peopleInfo-r-title">
        预览
      </div>
      <div class="peopleInfo-r-phone">
        <div class="peopleInfo-r-phone-top" />
        <div class="peopleInfo-r-phone-nav">
          <div class="peopleInfo-r-phone-nav-l" />
          <div class="peopleInfo-r-phone-nav-r">{{ styleInfo.name }}</div>
        </div>
        <div
          v-if="pageState == 1"
          class="peopleInfo-r-phone-content"
          :style="{
            background: styleInfo.coverSelect
              ? 'url(' + coverBg + ') no-repeat'
              : coverBg,
          }"
        >
          <div class="peopleInfo-r-phone-content-title">
            {{ styleInfo.name }}
          </div>
          <div
            v-if="styleInfo.secondName"
            class="peopleInfo-r-phone-content-second"
          >
            {{ styleInfo.secondName }}
          </div>
          <div class="peopleInfo-r-phone-content-btn">
            {{ styleInfo.buttonText }}
          </div>
        </div>
        <div
          v-if="pageState == 2"
          class="peopleInfo-r-phone-content"
          :style="{ backgroundColor: styleInfo.resultPageSettings }"
        >
          <div class="peopleInfo-r-phone-content-result">
            <div class="result-title">
              您的健康状况：<span
                :style="{ color: styleInfo.resultPageSettings }"
                >分数</span
              >
            </div>
            <div class="result-tip">
              虽然测试很简短很欢乐，但是我们却为你的健康状态所担忧，你是热爱工作的人，但是健康的身体却比工作更加重要，通过测试我们发现你可能具有慢性病的特征，并且颈椎和腰部都表现太僵硬，最好去医院做一个全面的检查，排查身体隐患。在平常的日子里要适当锻炼，好的身体才能支撑你在职场越战越勇。
            </div>
          </div>
        </div>
        <div
          v-if="pageState == 0"
          class="peopleInfo-r-phone-content"
          :style="{ backgroundColor: styleInfo.backgroundSettings }"
        >
          <div class="peopleInfo-r-phone-content-title">
            {{ styleInfo.name }}
          </div>
          <div class="peopleInfo-r-phone-content-Qname">
            Q3:
            <div>用脚往后踢，能否用脚踢到自己的臀部？</div>
          </div>
          <div class="peopleInfo-r-phone-content-Qitem">
            <div class="peopleInfo-r-phone-content-Qitem-l">A</div>
            <div class="peopleInfo-r-phone-content-Qitem-r">
              从来不会回头看的酷酷
            </div>
          </div>
          <div class="peopleInfo-r-phone-content-Qitem active">
            <div
              class="peopleInfo-r-phone-content-Qitem-l"
              :style="{ backgroundColor: styleInfo.backgroundSettings }"
            >
              B
            </div>
            <div
              class="peopleInfo-r-phone-content-Qitem-r"
              :style="{ color: styleInfo.backgroundSettings }"
            >
              怎么回事，我这脖子，这腰有点疼
            </div>
          </div>
          <div class="peopleInfo-r-phone-content-Qitem">
            <div class="peopleInfo-r-phone-content-Qitem-l">C</div>
            <div class="peopleInfo-r-phone-content-Qitem-r">
              正常是不是能转30度?我能行
            </div>
          </div>
          <div class="peopleInfo-r-phone-content-Qitem">
            <div class="peopleInfo-r-phone-content-Qitem-l">D</div>
            <div class="peopleInfo-r-phone-content-Qitem-r">
              别说了，我能转60度
            </div>
          </div>
          <div class="peopleInfo-r-phone-content-Qaction">
            <div class="peopleInfo-r-phone-content-Qaction-l">上一题</div>
            <div class="peopleInfo-r-phone-content-Qaction-r">下一题</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import uploadImage from '@/utils/uploadImage';
export default {
  name: 'SetStyle',
  props: {
    styleInfo: {
      type: Object,
      default: () => ({
        backgroundSettings: '#0E937B',
        buttonText: '立即开启',
        coverSelect: 0,
        coverSettings: '#0E937B',
        name: '',
        resultPageSettings: '#0E937B',
        secondName: '',
        imgurl: ''
      })
    },
    questionnaireId: {
      type: Number,
      default: 0
    },
    putOnState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      predefineColors: ['#FFFFFF', '#FF5368', '#5A91FF', '#0E937B', '#FFDD77'],
      pageState: 0,
      coverBg: ''
    };
  },
  watch: {
    styleInfo: {
      handler(val) {
        this.coverBg = val.coverSettings;
        if (val.coverSelect === 1) {
          this.$set(this, 'coverBg', val.imgurl);
        } else if (val.coverSelect === 0) {
          this.$set(this.styleInfo, 'imgurl', '');
          this.$set(this, 'coverBg', val.coverSettings);
        }
      },
      deep: true
    }
  },
  created() {
    if (this.questionnaireId) {
      this.$store
        .dispatch('marketingTool/getFirstSetting', this.questionnaireId)
        .then(res => {
          this.styleInfo.name = res.data.name;
          this.styleInfo.secondName = res.data.secondName;
        });
    }
    this.coverBg = this.styleInfo.coverSettings;
  },
  methods: {
    // 颜色图片变化
    coverSelectChange() {
      // if(e === 0&&this.styleInfo.imgurl!=""){
      //     this.$confirm('确认切换吗？将会清除当前图片', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //         }).then(() => {
      //             this.$set(this.styleInfo, 'coverSelect', 0)
      //             this.$set(this.styleInfo, 'imgurl', '')
      //             this.$set(this,"coverBg",this.styleInfo.coverSettings)
      //         }).catch(()=>{
      //             this.$set(this.styleInfo, 'coverSelect', 1)
      //         })
      // }
    },
    toView(index) {
      this.pageState = index;
    },
    toNext() {
      const params = _.cloneDeep(this.styleInfo);
      if (this.styleInfo.coverSelect === 0) {
        params.coverSettings = this.styleInfo.coverSettings;
      } else {
        if (this.styleInfo.imgurl === '') {
          this.$message.error('请上传图片！');
          this.$emit('setThird', 0);
          return;
        }
        params.coverSettings = this.styleInfo.imgurl;
      }
      delete params.imgurl;
      this.$emit('setThird', params);
    },
    uploadDetailPic(item) {
      uploadImage(item)
        .then(res => {
          this.$set(this.styleInfo, 'imgurl', res);
          if (this.styleInfo.coverSelect) {
            this.coverBg = res;
          }
          this.$message.success('上传图片成功');
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-24 {
  margin-top: 24px;
}
.set-style-page {
  display: flex;
  justify-content: space-between;
  .peopleInfo-l {
    flex: 1;
    padding-right: 53px;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #464668;
      line-height: 18px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .select-bg {
      display: flex;
      align-items: center;
      padding-bottom: 18px;
      box-shadow: 0px 1px 0px 0px rgba(235, 237, 242, 1);
      &-l {
        width: 100px;
        font-size: 16px;

        color: #46456b;
        line-height: 16px;
      }
      .el-color-picker {
        width: 52px;
        /deep/ .el-color-picker__trigger {
          width: 52px;
          height: 52px;
        }
        /deep/ .el-color-picker__mask {
          width: 52px;
          height: 52px;
        }
      }
    }
    .input-item {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      &-l {
        font-size: 14px;

        color: #46456b;
        line-height: 14px;
        width: 94px;
      }
      &-r {
        flex: 1;
      }
    }
    .cover-bg {
      display: flex;
      box-shadow: 0px 1px 0px 0px rgba(235, 237, 242, 1);
      padding-bottom: 24px;
      &-color {
        margin-left: 68px;
        &-l {
          width: 100px;
          margin-bottom: 24px;
        }
        &-r {
          .el-color-picker {
            width: 52px;
            /deep/ .el-color-picker__trigger {
              width: 52px;
              height: 52px;
            }
            /deep/ .el-color-picker__mask {
              width: 52px;
              height: 52px;
            }
          }
        }
      }
      &-img {
        &-l {
          width: 100px;
          margin-bottom: 24px;
        }
        &-r {
          position: relative;
          display: inline-block;
          border: 1px solid #e1e3e9;
          .avatar-uploader .el-upload {
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
          &:hover {
            .icon-delete {
              display: block;
            }
          }
          .icon-delete {
            display: none;
            width: 12px;
            height: 12px;
            position: absolute;
            top: -6px;
            left: 172px;
            background-image: url('../../../assets/icon-delete.png');
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
      }
    }
  }
  .peopleInfo-r {
    width: 375px;
    margin-right: 2px;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #464668;
      line-height: 18px;
      margin-bottom: 24px;
    }
    &-phone {
      overflow: hidden;
      width: 100%;
      box-shadow: 0px 0px 6px 0px rgba(204, 204, 204, 0.5);
      &-top {
        height: 20px;
        background: url('../../../assets/questionnaire/notice.png') no-repeat;
        background-size: 100% 100%;
      }
      &-nav {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        &-l {
          width: 16px;
          height: 16px;
          background: url('../../../assets/questionnaire/goback.png') no-repeat;
          background-size: 100% 100%;
        }
        &-r {
          flex: 1;
          text-align: center;
          margin-right: 30px;
          font-size: 16px;

          font-weight: bold;
          color: #333333;
          line-height: 22px;
          text-shadow: 0px 0px 6px rgba(204, 204, 204, 0.5);
        }
      }
      &-content {
        width: 100%;
        height: 603px;
        background-color: #0e937b;
        background-size: 100% 100% !important;
        position: relative;
        cursor: pointer;
        padding: 0 16px;
        &-title {
          font-size: 32px;

          font-weight: bold;
          color: #ffffff;
          line-height: 32px;
          padding-top: 32px;
          text-align: center;
        }
        &-second {
          width: 343px;
          background: #ffffff;
          border-radius: 4px;
          padding: 16px;
          font-size: 16px;

          color: #333333;
          line-height: 28px;
          position: absolute;
          left: 50%;
          top: 387px;
          transform: translateX(-50%) translateY(-50%);
          text-align: center;
          word-wrap: break-word;
        }
        &-btn {
          width: 168px;
          height: 44px;
          background: #ffffff;
          border-radius: 6px;
          font-size: 20px;

          font-weight: bold;
          color: #333333;
          line-height: 44px;
          letter-spacing: 3px;
          line-height: 44px;
          position: absolute;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
        &-left {
          width: 37px;
          height: 37px;
          background: url('../../../assets/questionnaire/left.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: -37px;
          transform: translateY(-50%);
          transition: all 0.2s;
          opacity: 0;
        }
        &-right {
          width: 37px;
          height: 37px;
          background: url('../../../assets/questionnaire/right.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          right: -37px;
          transform: translateY(-50%);
          transition: all 0.2s;
          opacity: 0;
        }
        &-result {
          width: 343px;
          height: 555px;
          position: absolute;
          top: 32px;
          background: #ffffff;
          border-radius: 6px;
          padding: 24px 16px;
          .result-title {
            font-size: 20px;

            font-weight: bold;
            color: #333333;
            line-height: 28px;
            text-align: center;
            span {
              font-size: 32px;
              color: #0e937b;
            }
          }
          .result-tip {
            margin-top: 24px;
            font-size: 16px;

            color: #333333;
            line-height: 22px;
          }
        }
        &-Qname {
          font-size: 16px;

          font-weight: bold;
          color: #ffffff;
          line-height: 22px;
          margin: 32px auto 20px;
          padding: 0 24px;
        }
        &-Qitem {
          width: 295px;
          height: 62px;
          background: #ffffff;
          border-radius: 6px;
          border: 1px solid #ffffff;
          display: flex;
          padding: 15px;
          align-items: center;
          margin: 16px auto 0;
          &-l {
            width: 32px;
            height: 32px;
            border: 1px solid #cccccc;
            font-size: 16px;

            color: #333333;
            line-height: 32px;
            text-align: center;
            margin-right: 12px;
            border-radius: 50%;
          }
          &-r {
            font-size: 14px;

            color: #000000;
            line-height: 16px;
          }
          &.active {
            .peopleInfo-r-phone-content-Qitem-l {
              color: #fff;
              background: #0e937b;
              border: none;
            }
          }
        }
        &-Qaction {
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
          &-l {
            width: 128px;
            height: 44px;
            border-radius: 6px;
            border: 1px solid #ffffff;
            font-size: 20px;

            color: #ffffff;
            line-height: 44px;
            letter-spacing: 3px;
            text-align: center;
          }
          &-r {
            width: 128px;
            height: 44px;
            border-radius: 6px;
            font-size: 20px;

            color: #000;
            line-height: 44px;
            letter-spacing: 3px;
            text-align: center;
            background: #ffffff;
          }
        }
        &:hover .peopleInfo-r-phone-content-left {
          left: 16px;
          opacity: 1;
        }
        &:hover .peopleInfo-r-phone-content-right {
          right: 16px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
