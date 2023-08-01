<template>
  <div class="mask">
    <div class="user-center">
      <div class="user-center-details">
        <div class="details-header">
          <div class="title">个人信息</div>
          <div class="close" @click="closeUserCenter" />
        </div>
        <div class="details-content">
          <div class="avatar-box">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadPic"
              :before-upload="beforeAvatarUpload"
            >
              <div class="change">更换头像</div>
            </el-upload>
            <img :src="employeeInfo.headPortrait" class="header-img" />
          </div>
          <div class="details-message">
            <div class="name">{{ username }}</div>
            <div class="role">
              <span
                v-for="(item, index) in employeeInfo.roleNameList"
                :key="index"
              >
                {{ item }}</span
              >
            </div>
            <div class="operation">
              <div class="logout" @click="logout">退出登录</div>
              <div class="change-password" @click="editpass">修改密码</div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info-detail flex">
            <div class="id info-icon" />
            <div class="black">工号：</div>
            <div class="grey">{{ employeeInfo.employNo }}</div>
          </div>
          <div class="info-detail flex">
            <div class="mail info-icon" />
            <div class="black">邮箱：</div>
            <div class="grey">{{ employeeInfo.email || '-' }}</div>
          </div>
          <div class="info-detail flex">
            <div class="mobile info-icon" />
            <div class="black">手机：</div>
            <div class="grey">{{ employeeInfo.mobile }}</div>
          </div>
          <div class="info-detail flex">
            <div class="depart info-icon" />
            <div class="black">部门：</div>
            <div class="grey">{{ employeeInfo.deptName }}</div>
          </div>
        </div>
        <div class="message">
          <div class="title flex">
            消息通知<span class="all" @click="viewAll"
              >查看全部<i class="el-icon-arrow-right"
            /></span>
          </div>
          <div v-if="articleList[tabIndex].length" class="message-list">
            <div
              v-for="item in articleList[tabIndex]"
              :key="item.configId"
              class="item"
              @click="lookArticle(item)"
            >
              <div class="icon" />
              <div class="content">
                <div class="message-title">{{ item.title }}</div>
                <div v-if="item.introduce" class="message-time text-overflow">
                  {{ item.introduce }}
                </div>
                <div class="message-time">
                  {{ $moment(item.updateTime).format('YYYY/MM/DD HH:mm:ss') }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="none-message" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uploadImage from '@/utils/uploadImage';
export default {
  name: 'UserCenter',
  data() {
    return {
      tabIndex: 1,
      username: '',
      showEditPassword: false
    };
  },
  computed: {
    articleList() {
      return this.$store.state.app.articleList;
    },
    employeeInfo() {
      return this.$store.state.app.employeeInfo;
    }
  },
  created() {
    this.getNoticeList();
    this.username = localStorage.getItem('username') || '用户名';
  },
  methods: {
    // 获取未读文章列表
    getNoticeList() {
      this.$store.dispatch('app/getNoticeList', {
        userName: localStorage.getItem('username')
      });
    },
    /**
     * 点击查看文章
     * type
     *      1 问诊消息
     *      3001 杠杆预警
     *      3002 结算消息
     *      68 系统消息
     */
    lookArticle(item) {
      const { id, type, configId } = item;
      this.readIt(configId);
      // 移除未读文章
      const list = this.articleList[this.tabIndex].filter(item => {
        return item.id !== id;
      });
      this.articleList[this.tabIndex] = list;
      this.$store.commit('app/CHANGE_USER_CENTER', false);
      if (type === 1) {
        return;
      } else if (type === 3001) {
        this.$store
          .dispatch('contentManage/getDetails', {
            id,
            userName: localStorage.getItem('username')
          })
          .then(res => {
            const { content } = res.data;
            this.$router.push(
              `/supplyChainManage/serviceItems/details/${content}/edit/7`,
            );
          });
      } else if (type === 3002) {
        this.$store
          .dispatch('contentManage/getDetails', {
            id,
            userName: localStorage.getItem('username')
          })
          .then(res => {
            const { content } = res.data;
            this.$router.push(
              `/financial-center/service-item-settlement/detail/${content}`,
            );
          });
      } else if (type === 68) {
        this.$router.push(`/operateManage/contentManage/details/${id}/0/null`);
      } else if (type === 204 || type === 205 || type === 206) {
        // 药品证件合同
        this.$router.push(
          `/notification/personalNews/${this.employeeInfo.id}/${configId}`,
        );
      }
    },
    // 关闭用户中心
    closeUserCenter() {
      this.$store.commit('app/CHANGE_USER_CENTER', false);
    },
    // 退出登录
    async logout() {
      this.$store.commit('app/CHANGE_USER_CENTER', false);
      this.$store.dispatch('user/logout');

      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`);
    },
    editpass() {
      this.$store.commit('app/CHANGE_USER_CENTER', false);
      this.$emit('editpass');
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    },
    // 宣传头像上传
    uploadPic(item) {
      uploadImage(item)
        .then(res => {
          this.$store.commit('app/SET_AVATAR', res);
          this.saveAvatar(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    saveAvatar(headPortrait) {
      const params = {
        headPortrait,
        userName: this.username
      };
      this.$store.dispatch('userManage/updateAvatar', params).then(() => {
        this.$message.success('更换头像成功');
      });
    },
    viewAll() {
      this.$store.commit('app/CHANGE_USER_CENTER', false);
      this.$router.push({
        path: `/notification/personalNews/${this.employeeInfo.id}/null`
      });
    },
    readIt(id) {
      this.$store.dispatch('notification/isRead', id).then(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  .user-center {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .user-center-details {
      width: 374px;
      height: calc(100vh - 56px);
      position: absolute;
      top: 30px;
      right: 23px;
      background-color: #ffffff;
      border-radius: 4px;
      padding: 32px 30px;
      .details-header {
        display: flex;
        margin-bottom: 27px;
        .title {
          flex: 1;
          font-weight: bold;
        }
        .close {
          width: 19px;
          height: 19px;
          border-radius: 4px;
          background-image: url('../../assets/icon_user_close.svg');
          background-size: 100% 100%;
          cursor: pointer;
          &:hover {
            background-image: url('../../assets/icon_user_close_hover.svg');
          }
        }
      }
      .details-content {
        display: flex;
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(235, 237, 242, 1);
        .header-img {
          width: 100px;
          height: 100px;
          //   border-radius: 4px;
          // background-image: url('../../assets/user_avatar.png');
          // background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 3;
          &:hover {
            // z-index: 1;
          }
        }
        .details-message {
          flex: 1;
          .name {
            height: 20px;
            font-size: 20px;

            font-weight: bold;
            color: #464668;
            line-height: 20px;
            margin-bottom: 9px;
          }
          .role {
            height: 14px;
            font-size: 12px;

            font-weight: 400;
            color: #989ab3;
            line-height: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 156px;
          }
          .operation {
            display: flex;
            margin-top: 25px;
            .logout {
              width: 86px;
              height: 31px;
              background: #e1f1ff;
              border-radius: 4px;
              line-height: 31px;
              text-align: center;
              font-size: 12px;

              font-weight: bold;
              color: #3599fe;
              cursor: pointer;
            }
            .change-password {
              font-size: 12px;

              font-weight: bold;
              color: #3599fe;
              line-height: 31px;
              text-decoration: underline;
              margin-left: 20px;
              cursor: pointer;
            }
          }
        }
      }
      .message {
        max-height: calc(100vh - 500px);
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;

          font-weight: bold;
          color: #464668;
          margin-top: 22px;
          justify-content: space-between;
          align-items: center;
        }
        .message-list {
          flex: 1;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0;
          }
          .item {
            cursor: pointer;
            width: 100%;
            height: 84px;
            background: #f1f8ff;
            border-radius: 4px;
            margin-top: 27px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            .icon {
              width: 28px;
              height: 31px;
              margin-right: 12px;
              background-image: url('../../assets/icon_message.svg');
              background-size: 100% 100%;
              flex-shrink: 0;
            }
            .content {
              .message-title {
                font-size: 14px;

                font-weight: bold;
                color: #464668;
              }
              .message-time {
                font-size: 12px;

                font-weight: 400;
                color: #989ab3;
                margin-top: 8px;
                max-width: 220px;
              }
            }
          }
        }
        .none-message {
          width: 280px;
          height: 165px;
          background-image: url('../../assets/none_message.png');
          background-size: 100% 100%;
          margin: 27px auto;
        }
        .all {
          font-size: 14px;
          color: #464668;
          font-weight: normal;
          cursor: pointer;
        }
      }
    }
  }
  .avatar-box {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 4px;
    margin-right: 29px;

    .avatar-uploader {
      position: absolute;
      top: 0;
      left: 0;
    }
    .change {
      width: 100px;
      height: 100px;
      background: #333;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 4;
      color: #fff;
      text-align: center;
      line-height: 100px;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        opacity: 0.71;
      }
    }
  }
  .info {
    position: relative;
    padding-bottom: 16px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
    &-detail {
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      padding-top: 16px;
    }
    &-icon {
      width: 32px;
      height: 32px;
    }
    .black {
      color: #464668;
      margin-left: 16px;
    }
    .grey {
      color: #a2a3b7;
    }
    .id {
      background: url('../../assets/info-id.svg');
      background-size: 100% 100%;
    }
    .mail {
      background: url('../../assets/info-mail.svg');
      background-size: 100% 100%;
    }
    .mobile {
      background: url('../../assets/info-mobile.svg');
      background-size: 100% 100%;
    }
    .depart {
      background: url('../../assets/info-depart.svg');
      background-size: 100% 100%;
    }
  }
}
</style>
