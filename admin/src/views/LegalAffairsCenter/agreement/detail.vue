<template>
  <div class="agreement-detail">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <Tab
          v-if="!isEdit"
          :btns="btns"
          :current-key="activeName"
          :btn-style="{ overflow: 'visible' }"
          @change="tabClick"
        />
        <div v-if="activeName == '0'">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="vertical-ruleForm"
          >
            <el-form-item label="协议名称" prop="title">
              <el-input
                v-model="ruleForm.title"
                style="width: 411px"
                :disabled="isEdit"
              />
              <div class="version">版本号：{{ ruleForm.version }}</div>
            </el-form-item>
            <el-form-item label="协议内容" required>
              <div id="editor" class="agreement" />
            </el-form-item>
          </el-form>
          <div v-if="!isEdit" class="page-footer">
            <button
              type="button"
              class="btn-save"
              @click="submitForm('ruleForm')"
            >
              发布
            </button>
          </div>
        </div>
        <div v-if="activeName == '1'" class="log-lists">
          <div class="log-list">
            <div v-if="logList.length>0">
                 <div v-for="(item, index) in logList" :key="index" class="log-item">
              <span class="dot" />
              <span class="time"
                >{{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
              </span>
              <span class="name">{{ item.name }} </span>
              <span class="name"
                >{{ operationType[item.operation]
                }}{{ menuType[item.type] }}</span
              >
            </div>
            </div>
                <div v-else>
                  <!-- 暂无记录 -->
                  <div slot="empty" class="empty-img" />
              </div>
          </div>
        </div>
        <el-dialog
          title="更新协议"
          :visible="isShow"
          width="445px"
          class="bold-dialog"
          @close="close"
        >
          <div class="blod">{{ ruleForm.title }}{{ version }}</div>
          <div class="noti">(为您自动更新版本号并通知用户)</div>
          <div slot="footer" class="dialog-footer">
            <div class="send">
              发布至{{
                ruleForm.type !== 3 ? '寰宇关爱登录页面' : '阳光问卷页面'
              }}
            </div>
            <el-button
              size="small"
              style="
                margin-right: 20px;
                border: 1px solid #3599fe;
                color: #3599fe;
              "
              @click="isShow = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              :loading="loading"
              size="small"
              @click="submit"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import E from 'wangeditor';
import { editorUploadImage } from '@/utils/common';
let editor;
export default {
  name: 'agreementDetail',
  data() {
    return {
      ruleForm: {
        title: '',
        content: '',
        version: '',
        sort: '',
        type: '' // 隐私声明:1,用户注册:2,用户授权:3
      },
      rules: {
        title: [{ required: true, message: '请输入协议名称', trigger: 'blur' }]
      },
      isShow: false,
      loading: false,
      version: '',
      isEdit: false,
      activeName: '0',
      btns: [
        { value: '0', name: '用户协议' },
        { value: '1', name: '操作日志' }
      ],
      logList: []
    };
  },
  created() {
    this.getList();
    this.isEdit = this.$route.params.type === '0' ? true : false;
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
    this.isEdit && editor.$textElem.attr('contenteditable', false);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const content = editor.txt.html();
        if (valid) {
          if (content === '<p><br></p>') {
            this.$message.warning('协议内容不能为空');
            return;
          }
          this.isShow = true;
          let version = JSON.parse(JSON.stringify(this.ruleForm.sort)) + 10;
          version = version.toString().split('');
          this.version = 'V' + version.join('.');
        } else {
          return false;
        }
      });
    },
    getList() {
      this.$store
        .dispatch('marketingTool/getProtocolById', this.$route.params.id)
        .then(res => {
          this.ruleForm = res.data;
          editor.txt.html(res.data.content);
        });
    },
    submit() {
      this.loading = true;
      this.ruleForm.content = editor.txt.html();
      const params = {
        ...this.ruleForm,
        id: this.$route.params.id
      };
      this.$store.dispatch('marketingTool/saveProtocol', params).then(() => {
        this.$message.success('发布成功');
        this.$router.go(-1);
      });
    },
    close() {
      this.isShow = false;
      this.loading = false;
    },
    tabClick(val) {
      this.activeName = val;
      if (val === '1') {
        this.getLogs();
      }
    },
    getLogs() {
      this.$store
        .dispatch('app/getSysLogs', {
          id: this.$route.params.id,
          type: '103'
        })
        .then(res => {
          this.logList = res.obj || [];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.agreement-detail {
  .version {
    position: absolute;
    left: 440px;
    top: 0;
  }

  .blod {
    font-size: 18px;
    font-weight: bold;
    color: #464668;
  }
  .noti {
    font-size: 14px;
    color: #989ab3;
    margin: 12px 0 24px;
  }
  .dialog-footer {
    position: relative;
  }
  .send {
    font-size: 12px;
    color: #3599fe;
    position: absolute;
    top: 13px;
    left: 4px;
  }
}
</style>
