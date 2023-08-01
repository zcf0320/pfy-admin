<template>
  <div class="page-content-manage-details page-form modal-form upload-border">
    <el-container>
      <el-main>
        <div class="details-content">
          <div v-if="type === '1'" class="flex-col">
            <div class="scroll-table">
              <Tab :btns="btns" @change="handleClick" />
              <div v-show="activeName === '0'">
                <div class="content">
                  <div class="title-top content-detail">基础信息</div>
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
                          <el-col :span="12">
                            <el-form-item label="标题" prop="tittle">
                              <el-input
                                v-model="contentForm.tittle"
                                placeholder="请输入标题"
                                maxlength="20"
                                show-word-limit
                                :disabled="this.$route.params.status === '105'"
                              />
                              <!-- <InputMaxTip
                                :max="20"
                                :current-key="contentForm.tittle"
                              /> -->
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="专栏" prop="specialColumnId">
                              <el-select
                                v-model="contentForm.specialColumnId"
                                filterable
                                placeholder="请选择一个专栏"
                                :disabled="this.$route.params.status === '105'"
                              >
                                <el-option
                                  v-for="item in specialColumns"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="内容简介" prop="introduction">
                              <el-input
                                v-model="contentForm.introduction"
                                type="textarea"
                                placeholder="请输入简介"
                                :disabled="this.$route.params.status === '105'"
                                maxlength="40"
                                show-word-limit
                              />
                              <!-- <InputMaxTip
                                :max="40"
                                :current-key="contentForm.introduction"
                              /> -->
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="内容" required>
                              <div id="editor" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="宣传图"
                              prop="advertsPic"
                              class="propaganda"
                            >
                              <div class="upload">
                                <el-upload
                                  class="avatar-uploader"
                                  action=""
                                  :show-file-list="false"
                                  :http-request="uploadPropogandaPic"
                                  :before-upload="beforeAvatarUpload"
                                  :disabled="
                                    this.$route.params.status === '105'
                                  "
                                >
                                  <img
                                    v-if="contentForm.advertsPic"
                                    :src="contentForm.advertsPic"
                                    class="avatar"
                                  />
                                  <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                  />
                                </el-upload>
                                <i
                                  v-if="
                                    contentForm.advertsPic &&
                                      this.$route.params.status !== '105'
                                  "
                                  class="icon-delete"
                                  @click="deleteImage('advertsPic')"
                                />
                              </div>
                              <div class="tips">
                                建议尺寸500*500，仅支持jpg，png格式，大小不超过10M
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-form>
                </div>
                <div class="page-footer">
                  <el-popover placement="top" width="240" trigger="click">
                    <div ref="qrCodeUrl" class="qrcode" />
                    <button
                      slot="reference"
                      type="button"
                      class="btn-exit mr-20"
                      @click="preview"
                    >
                      预览
                    </button>
                  </el-popover>
                  <button
                    v-if="this.$route.params.status !== '105'"
                    type="button"
                    class="btn-save mr-20"
                    @click="updateContent('contentForm')"
                  >
                    保存
                  </button>
                  <button
                    v-if="this.$route.params.status !== '105'"
                    type="button"
                    class="btn-save"
                    @click="publishContent(105)"
                  >
                    发布
                  </button>
                  <el-popconfirm
                    title="确认下架吗？"
                    placement="top"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    confirm-button-type="plain"
                    cancel-button-type="primary"
                    :hide-icon="true"
                    @onConfirm="publishContent(106)"
                  >
                    <button
                      v-if="this.$route.params.status === '105'"
                      slot="reference"
                      type="button"
                      class="btn-save"
                    >
                      下架
                    </button>
                  </el-popconfirm>
                </div>
              </div>
              <div v-show="activeName == '1'" class="log-items">
                <div v-if="logList.length>0">
                  <div
                  v-for="item in logList"
                  :key="item.createTime"
                  class="log-item"
                >
                  <div class="circle" />
                  <div class="log-details">
                    <span class="create-time">{{
                      $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                    }}</span>
                    <span class="color-hight">{{ item.name }}</span>
                    <span class="color-hight">{{
                      operationType[item.operation]
                    }}</span>
                    <span class="color-hight"
                      >{{ operationType[item.operation] }}
                      {{ menuType[item.type] }}</span
                    >
                  </div>
                </div>
                </div>
                  <div v-else>
                      <!-- 暂无记录 -->
                      <div slot="empty" class="empty-img" />
                  </div>
              </div>
            </div>
          </div>
          <div v-else class="content flex-col">
            <div class="content-top">
              <div class="content-title">{{ contentForm.tittle || '-' }}</div>
              <div class="details">
                <span>{{
                  specialColumnEumn[contentForm.specialColumnId]
                }}</span>
                <span class="right">
                  <img src="../../../assets/time-icon.png" alt="" />发布时间:
                  {{
                    $moment(contentForm.updateTime).format(
                      'YYYY/MM/DD HH:mm:ss',
                    )
                  }}</span
                >
              </div>
            </div>
            <div id="text" class="text scroll-table" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import uploadImage from '@/utils/uploadImage';
import { editorUploadImage } from '@/utils/common';
import E from 'wangeditor';
import { contentType, operationType, menuType } from '@/utils/enum';
import QRCode from 'qrcodejs2';
let editor;
export default {
  name: 'ContentDetails',
  data() {
    return {
      activeName: '0',
      tabIndex: '0',
      type: 0,
      id: '',
      contentForm: {
        tittle: '',
        specialColumnId: '',
        advertsPic: '',
        introduction: ''
      },
      types: [],
      optionProps: {
        label: 'name',
        value: 'id'
      },
      rules: {
        tittle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        specialColumnId: [
          { required: true, message: '请选择专栏', trigger: 'change' }
        ],
        propaganda: [
          {
            required: true,
            message: '请上传宣传图',
            trigger: 'change'
          }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      },
      contentType,
      operationType,
      menuType,
      loading: false,
      specialColumns: [],
      tagsShow: false,
      specialColumnEumn: {},
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      qrcode: null,
      qrcodeID: '',
      logList: []
    };
  },
  created() {
    const vm = this;
    vm.type = vm.$route.params.type; // 1 编辑 0 查看
    vm.id = vm.$route.params.id;
    vm.qrcodeID = vm.$route.params.id;
    // 分类
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'specialColumn'
      })
      .then(res => {
        vm.specialColumns = res.obj;
        res.obj.forEach(item => {
          vm.specialColumnEumn[item.id] = item.name;
        });
        vm.getDetails(vm.$route.params.id);
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
          this.$message.error('图片有误');
        });
    };
    editor.customConfig.zIndex = 1;
    editor.create();
    if (this.$route.params.status === '105') {
      editor.$textElem.attr('contenteditable', false);
    }
  },
  methods: {
    // 预览
    preview() {
      if (this.qrcode) {
        this.qrcode.clear(); // 清除代码
        this.qrcode.makeCode(
          `${process.env.VUE_APP_USER_CENTER}/#/MinApp/pages/detail/index?id=${
            this.qrcodeID
          }&createTime=${new Date().getTime()}`,
        );
        return;
      }
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${
          process.env.VUE_APP_USER_CENTER
        }/#/MinApp/pages/detail/index?id=${
          this.qrcodeID
        }&createTime=${new Date().getTime()}`, // 需要转换为二维码的内容
        width: 228,
        height: 228,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
      vm.tabIndex = tab;
      if (tab === '1') {
        vm.$store
          .dispatch('app/getSysLogs', {
            id: vm.id,
            type: '22'
          })
          .then(res => {
            vm.logList = res.obj || [];
          });
      }
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
          vm.contentForm.advertsPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 删除图片
    deleteImage(key) {
      this.contentForm[key] = '';
    },
    // 新增
    updateContent(formName) {
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
            content,
            id: vm.$route.params.id
          };
          vm.loading = true;
          vm.$store
            .dispatch('healthColumn/healthColumnUpdate', vm.contentForm)
            .then(res => {
              if (res.code === 0) {
                vm.$message.success('更新成功');
                vm.loading = false;
                this.qrcodeID = res.data;
              }
            })
            .catch(() => {
              vm.loading = false;
            });
        } else {
          vm.$message.warning('基础信息填写有误!');
        }
      });
    },
    // 获取文章详情
    getDetails(id) {
      const vm = this;
      vm.$store
        .dispatch('healthColumn/getHealthColumnDetails', {
          id
        })
        .then(res => {
          vm.contentForm = res.obj;
          if (vm.type === '1') {
            editor.txt.html(vm.contentForm.content);
          } else {
            document.getElementById('text').innerHTML = vm.contentForm.content;
          }
        });
    },
    publishContent(postStatus) {
      const params = {
        id: this.$route.params.id,
        postStatus
      };
      this.$store
        .dispatch('healthColumn/updatePostStatus', params)
        .then(() => {
          this.$router.go(-1);
          this.$message.success(
            postStatus === 105 ? '文章发布成功！' : '文章状态更新成功！',
          );
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.page-content-manage-details {
  .details-content {
    height: 100%;
    .data-list {
      // padding: 12px 0px 0;
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
            top: 0;
            color: #666666;
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
        background-image: url('../../../assets/icon-delete.png');
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
    .content {
      .content-top {
        height: 92px;
      }
      .content-title {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
      }
      .details {
        padding: 24px 0;
        border-bottom: 1px solid #dee2e8;
        color: #999999;
        font-size: 14px;
        .right {
          float: right;
          img {
            width: 14px;
            height: 14px;
            position: relative;
            top: 3px;
            margin-right: 8px;
          }
        }
      }
      .text {
        padding: 22px 0;
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
}
</style>
