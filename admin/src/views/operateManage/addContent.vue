<template>
  <div class="page-content-manage-details page-form modal-form upload-border">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab :btns="btns" />
          <div class="scroll-table">
            <div v-show="activeName == '0'">
              <div class="title-top content-detail">基础信息</div>
              <div class="content">
                <el-form
                  ref="contentForm"
                  :model="contentForm"
                  :rules="rules"
                  label-width="100px"
                  label-position="top"
                >
                  <div class="data-list">
                    <div class="data-item border-no">
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="标题" prop="title">
                            <el-input
                              v-model="contentForm.title"
                              placeholder="请输入标题"
                              maxlength="20"
                              show-word-limit
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="分类" prop="type">
                            <el-cascader
                              v-model="contentForm.type"
                              :options="types"
                              placeholder="请选择服务类型"
                              :props="optionProps"
                              @change="typeChange(contentForm.type)"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item
                            v-if="tagsShow"
                            label="标签"
                            prop="tags"
                          >
                            <el-select
                              v-model="contentForm.tags"
                              multiple
                              placeholder="请选择标签"
                            >
                              <el-option
                                v-for="item in tags"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="简介" prop="introduce">
                            <el-input
                              v-model="contentForm.introduce"
                              type="textarea"
                              placeholder="请输入简介"
                              maxlength="40"
                              show-word-limit
                            />
                          </el-form-item>
                        </el-col>
                          <el-col :span="12">
                          <el-form-item
                            label="宣传图"
                            prop="advertisPic"
                            class="propaganda"
                          >
                            <div class="upload">
                              <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :http-request="uploadPropogandaPic"
                                :before-upload="beforeAvatarUpload"
                              >
                                <img
                                  v-if="contentForm.advertisPic"
                                  :src="contentForm.advertisPic"
                                  class="avatar"
                                />
                                <i
                                  v-else
                                  class="el-icon-plus avatar-uploader-icon"
                                />
                              </el-upload>
                              <i
                                v-if="contentForm.advertisPic"
                                class="icon-delete"
                                @click="deleteImage('advertisPic')"
                              />
                            </div>
                            <div class="tips">
                              建议尺寸500*500，仅支持jpg，png格式，大小不超过10M
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="上传视频"
                            prop=""
                            class="propaganda"
                          >
                            <div class="upload">
                              <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :http-request="uploadVideo"
                                :before-upload="beforeVideoUpload"
                                :disabled="$route.params.postStatus === '105'"
                              >
                                <video
                                  v-if="contentForm.advertisVideo"
                                  :src="contentForm.advertisVideo"
                                  class="avatar"
                                />
                                <i
                                  v-if="
                                    !contentForm.advertisVideo &&
                                      percentage === 0
                                  "
                                  class="el-icon-plus avatar-uploader-icon"
                                />
                                <el-progress
                                  v-if="
                                    !contentForm.advertisVideo &&
                                      percentage > 0 &&
                                      percentage < 100
                                  "
                                  type="circle"
                                  :percentage="percentage"
                                />
                              </el-upload>

                              <i
                                v-if="
                                  contentForm.advertisVideo &&
                                    $route.params.postStatus !== '105'
                                "
                                class="icon-delete"
                                @click="deleteImage('advertisVideo')"
                              />
                            </div>
                            <div class="tips">
                              （仅支持.mp4，大小不超过500M）
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="内容" required>
                            <div id="editor" />
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="isShow || contentForm.fileUrls"
                          :span="24"
                        >
                          <el-form-item label="上传附件：">
                            <span class="tip"
                              >支持pdf，word，大小不超过10M</span
                            >
                            <div class="content-upload-box flex">
                              <div class="file-box flex">
                                <div
                                  v-for="(item, index) in fileUrls"
                                  :key="item"
                                  class="file"
                                  @click="viewFile(item)"
                                >
                                  <div
                                    class="delete"
                                    @click.stop="deleteItem(index)"
                                  />
                                </div>
                              </div>
                              <el-upload
                                v-show="fileUrls.length < 5"
                                class="upload-demo"
                                action=""
                                :http-request="uploadFile"
                                multiple
                                :show-file-list="false"
                                list-type="picture-card"
                                :before-upload="beforeUpload"
                              >
                                <i slot="default" class="el-icon-plus" />
                              </el-upload>
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="isShow || contentForm.sendEmails"
                          :span="24"
                          class="check"
                        >
                          <el-checkbox v-model="checked"
                            >同步发送邮件通知</el-checkbox
                          >
                        </el-col>
                        <el-col v-if="checked && isShow" :span="24">
                          <el-form-item label="收件人">
                            <el-select
                              v-model="contentForm.employeeEmailVOList"
                              multiple
                              filterable
                              placeholder="请选择收件人"
                              style="width: 513px"
                              remote
                              :remote-method="getPeople"
                              value-key="employeeEmailAddress"
                            >
                              <el-option
                                v-for="item in peopleList"
                                :key="item.employeeEmailAddress"
                                :label="item.employeeName"
                                :value="item"
                              >
                                <span v-html="item.hightLable" />
                                <span class="option-remark">{{
                                  item.employeeName
                                    ? `${item.employeeName} : ${item.employeeEmailAddress}`
                                    : ''
                                }}</span>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="page-footer">
          <el-popover placement="top" width="240" trigger="click">
            <div ref="qrCodeUrl" class="qrcode" />
            <button
              v-show="isSave"
              slot="reference"
              type="button"
              class="btn-exit mr-20"
              @click="preview"
            >
              预览
            </button>
          </el-popover>
          <button
            type="button"
            class="btn-save mr-20"
            @click="addContent('contentForm')"
          >
            保存
          </button>
          <button
            v-if="isSave"
            type="button"
            class="btn-save"
            @click="publish(105)"
          >
            发布
          </button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import uploadImage from '@/utils/uploadImage';
import { editorUploadImage } from '@/utils/common';
import E from 'wangeditor';
import QRCode from 'qrcodejs2';
import { replaceHightKeyWord } from '@/utils/common';
import { uniqWith, isEqual } from 'lodash';
let editor;
export default {
  name: 'AddContent',
  data() {
    return {
      activeName: '0',
      tabIndex: '0',
      contentForm: {
        title: '',
        type: [],
        advertisPic: '',
        introduce: '',
        tags: [],
        advertisVideo: '',
        employeeEmailVOList: [],
        fileUrls: ''
      },
      optionProps: {
        label: 'name',
        value: 'id'
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        type: [{ required: true, message: '请选择分类', trigger: 'change' }],
        advertisPic: [
          { required: true, message: '请上传宣传图', trigger: 'change' }
        ],
        tags: [{ required: true, message: '请选择标签', trigger: 'change' }],
        introduce: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      types: [],
      loading: false,
      tags: [],
      tagsShow: false,
      btns: [{ value: '0', name: '基础信息' }],
      qrcode: null,
      qrcodeID: '',
      isSave: false,
      id: '',
      percentage: 0,
      checked: false,
      peopleList: [],
      isShow: false,
      sendEmails: [],
      fileUrls: []
    };
  },
  watch: {
    'contentForm.type': {
      handler(nv) {
        if (nv.length && nv[1] === 68) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    const vm = this;
    // 分类
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'contentManage'
      })
      .then(res => {
        res.obj.forEach(item => {
          item.children.forEach(children => {
            children.children = null;
          });
        });
        vm.types = res.obj;
      });
  },
  mounted() {
    editor = new E('#editor');
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      editorUploadImage(files)
        .then(res => {
          // insert 是获取图片 url 后，插入到编辑器的方法
          insert(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    };
    editor.customConfig.zIndex = 1;
    editor.create();
  },
  methods: {
    // 限制图片上传
    beforeVideoUpload(file) {
      const isMp4 = file.type === 'video/mp4';
      const isLt500M = file.size / 1024 / 1024 < 500;
      if (!isMp4) {
        this.$message.error('上传视频只能是 MP4 格式!');
      }
      if (!isLt500M) {
        this.$message.error('上传视频大小不能超过 500MB!');
      }
      return isMp4 && isLt500M;
    },
    uploadVideo(item) {
      const vm = this;
      const onUploadProgress = progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        this.percentage = percentCompleted === 100 ? 99 : percentCompleted;
      };
      uploadImage(item, onUploadProgress)
        .then(res => {
          vm.contentForm.advertisVideo = res;
          this.percentage = 100;
        })
        .catch(() => {
          this.$message.error('上传视频有误');
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    // 宣传头像上传
    uploadPropogandaPic(item) {
      const vm = this;
      uploadImage(item)
        .then(res => {
          vm.contentForm.advertisPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 删除图片
    deleteImage(key) {
      this.contentForm[key] = '';
      if (key === 'advertisVideo') {
        this.percentage = 0;
      }
    },
    // 新增
    addContent(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        // 富文本内容
        const content = editor.txt.html();

        if (valid) {
          if (content === '<p><br></p>') {
            vm.$message.warning('内容不能为空');
            return;
          }
          vm.contentForm = {
            ...vm.contentForm,
            content
          };
          if (this.id) {
            Object.assign(this.contentForm, { id: this.id });
          }
          vm.loading = true;
          let url;
          this.id ? (url = 'updateContent') : (url = 'addContent');
          if (!this.isShow && !this.contentForm.employeeEmailVOList.length) {
            this.contentForm.employeeEmailVOList = [];
          }
          if (this.isShow && this.fileUrls.length) {
            const fileUrls = JSON.parse(JSON.stringify(this.fileUrls));
            Object.assign(this.contentForm, { fileUrls: fileUrls.join(',') });
          } else {
            this.contentForm.fileUrls = '';
          }
          vm.$store
            .dispatch(`contentManage/${url}`, vm.contentForm)
            .then(res => {
              if (res.code === 0) {
                vm.loading = false;
                vm.$message.success('保存成功！');
                if (!this.id) {
                  vm.$store.dispatch('app/getNoticeList', {
                    userName: localStorage.getItem('username')
                  });
                }
                this.qrcodeID = res.data;
                this.id = res.data;
                this.isSave = true;
              }
            })
            .catch(() => {
              vm.loading = false;
            });
        }
      });
    },
    // 分类改变获取标签
    typeChange(ids) {
      if (ids[1] !== 68) {
        this.tagsShow = true;
        this.$store
          .dispatch('contentManage/getTags', {
            code: 'contentTag',
            id: ids[1]
          })
          .then(res => {
            this.tags = res.obj;
          });
      } else {
        this.tagsShow = false;
      }
    },
    // 预览
    preview() {
      if (this.qrcode) {
        this.qrcode.clear(); // 清除代码
        this.qrcode.makeCode(
          `${process.env.VUE_APP_USER_CENTER}/#/pages/article/detail/index?id=${
            this.qrcodeID
          }&createTime=${new Date().getTime()}`,
        );
        return;
      }
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${
          process.env.VUE_APP_USER_CENTER
        }/#/pages/article/detail/index?id=${
          this.qrcodeID
        }&createTime=${new Date().getTime()}`, // 需要转换为二维码的内容
        width: 228,
        height: 228,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    send(postStatus) {
      const params = { publishContentId: this.id };
      this.$store.dispatch('contentManage/emailsSend', params).then(() => {
        this.$router.go(-1);
        this.$message.success(
          postStatus === 105 ? '文章发布成功！' : '文章状态更新成功！',
        );
      });
    },
    publishContent(postStatus) {
      const params = {
        id: this.id,
        postStatus
      };
      this.$store.dispatch('contentManage/publishContent', params).then(() => {
        if (this.checked) {
          this.send(postStatus);
        } else {
          this.$router.go(-1);
          this.$message.success(
            postStatus === 105 ? '文章发布成功！' : '文章状态更新成功！',
          );
        }
      });
    },
    getPeople(keyword) {
      if (keyword !== '') {
        this.$store.dispatch('contentManage/getEmployee', keyword).then(res => {
          if (res && res.status) {
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.employeeName);
            });
            this.peopleList = uniqWith(res.data, isEqual) || [];
          }
        });
      }
    },
    beforeUpload(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'doc';
      const extension2 = testmsg === 'docx';
      const extension3 = testmsg === 'pdf';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2 && !extension3) {
        this.$message({
          message: '上传文件只能是 doc、docx、pdf!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
      }
      return extension || extension2 || (extension3 && isLt2M);
    },
    uploadFile(item) {
      uploadImage(item)
        .then(res => {
          this.fileUrls.push(res);
        })
        .catch(() => {
          this.$message.error('上传文件有误');
        });
    },
    viewFile(item) {
      window.open(item, '_blank');
    },
    deleteItem(index) {
      this.fileUrls.splice(index, 1);
    },
    publish(postStatus) {
      if (this.checked) {
        if (this.contentForm.employeeEmailVOList.length) {
          this.publishContent(postStatus);
        } else {
          this.$message.error('收件人不能为空');
        }
      } else {
        this.publishContent(postStatus);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-content-manage-details {
  .scroll-table {
    border-top: 1px solid #EBEDF2;
  }
  .details-content {
    .data-list {
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item {
        .add-certificates {
          margin-top: 24px;
        }
        .link-box {
          position: relative;
          .link {
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 2;
            color: #3b9fff;
            text-decoration: underline;
            height: 36px;
            cursor: pointer;
          }
        }
        .propaganda {
          position: relative;
          .tips {
            position: absolute;
            left: 200px;
            bottom: 0;
            color: #A2A3B7 ;
            font-size: 14px;
          }
        }
      }
    }
    .upload {
      position: relative;
      display: inline-block;
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
        background-image: url('../../assets/icon-delete.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
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
    .table-link {
      color: #3b9fff;
      text-decoration: underline;
      cursor: pointer;
    }
    .log-item {
      margin-top: 12px;
      display: flex;
      align-items: center;
      .circle {
        width: 10px;
        height: 10px;
        background-color: #2276ff;
        border-radius: 50%;
        margin-right: 6px;
      }
      .log-details {
        flex: 1;
        span {
          margin-right: 12px;
          color: #b9b9b9;
        }
        .color-hight {
          color: #282828;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .tip {
    font-size: 14px;
    color: #989ab3;
    position: absolute;
    left: 69px;
    top: -35px;
  }
  .check {
    margin-bottom: 24px;
  }
  .file {
    width: 65px;
    height: 70px;
    margin-right: 30px;
    background: url('../../assets/file.png');
    background-size: 100% 100%;
    cursor: pointer;
    position: relative;
  }
  .file-box {
    justify-content: flex-start;
    align-items: center;
    margin: 20px 10px 0 0;
  }

  .delete {
    background: url('../../assets/icon-delete.png');
    background-size: 100% 100%;
    width: 18px;
    height: 18px;
    position: absolute;
    right: -8px;
    top: -12px;
  }
}
</style>
