<template>
  <div class="create-material-manage-page page-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="material-details-page">
          <Tab :btns="btns" @change="btnChange" />
          <div v-if="activeName == '1'">
            <div class="record-details">
              <div class="details">
                <div class="item">
                  <div class="label">材料名称：</div>
                  <div class="text">{{ baseForm.materialName || '-' }}</div>
                </div>
                <div class="item">
                  <div class="label">说明文字：</div>
                  <div class="text">{{ baseForm.explanatoryText || '-' }}</div>
                </div>
                <div class="item">
                  <div class="label">审核要求：</div>
                  <div class="text">{{ baseForm.auditKeyPoints || '-' }}</div>
                </div>
                <div class="item">
                  <div class="label">文件示例：</div>
                  <div class="text">
                    <el-image
                      style="
                                            width: 100px;
                                            height: 100px;
                                            display: block;
                                        "
                      :src="baseForm.materialFile[0]"
                      :preview-src-list="baseForm.materialFile"
                    >
                      <div slot="error" class="image-slot">
                        暂无图片
                      </div>
                    </el-image>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeName == '2'" class="log-items">
            <div v-if="logList.length>0">
                <div
              v-for="item in logList"
              :key="item.createTime"
              class="log-item"
            >
              <div class="circle" />
              <div class="log-details">
                <span class="create-time">{{
                  $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span>
                <span class="color-hight">{{ item.updator }}</span>
                <span class="color-hight">{{ item.node }}</span>
                <span class="color-hight">{{ item.remark }}</span>
              </div>
            </div>
            </div>
              <div v-else>
                  <!-- 暂无记录 -->
                  <div slot="empty" class="empty-img" />
              </div>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'DetailMaterial',
  data() {
    return {
      activeName: '1',
      baseForm: {
        materialName: '',
        explanatoryText: '',
        auditKeyPoints: '',
        materialFile: []
      },
      logList: [],
      btns: [
        { value: '1', name: '基础信息' },
        { value: '2', name: '操作日志' }
      ]
    };
  },
  created() {
    this.$store
      .dispatch('materalManage/detailMaterialLibrary', {
        id: this.$route.params.id
      })
      .then(res => {
        if (res.code === 0) {
          this.baseForm = Object.assign({}, res.obj);
        } else {
          this.$message({
            type: 'warning',
            message: res.comment
          });
        }
      });
    this.$store
      .dispatch('materalManage/logMaterialLibrary', {
        id: this.$route.params.id
      })
      .then(res => {
        if (res.code === 0) {
          this.logList = Object.assign({}, res.obj);
        } else {
          this.$message({
            type: 'warning',
            message: res.comment
          });
        }
      });
  },
  methods: {
    /**
     * 按钮组change
     */
    btnChange(val) {
      const vm = this;
      vm.activeName = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.material-details-page {
  .record-details {
    margin-bottom: 10px;
    .tittle {
      font-size: 16px;

      font-weight: 500;
      color: #333333;
      position: relative;
      padding-left: 16px;
      &::before {
        content: '';
        width: 4px;
        height: 14px;
        background-color: #2276ff;
        position: absolute;
        top: 2px;
        left: 0;
      }
      .progress {
        float: right;
        color: #2276ff;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .details {
      padding: 24px 16px;
      .item {
        font-size: 0px;

        font-weight: 400;
        color: #333333;
        margin-bottom: 24px;
        .label {
          display: inline-block;
          width: 100px;
          font-size: 14px;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          width: calc(100% - 100px);
          font-size: 14px;
          word-break: break-all;
          /deep/ .el-image .image-slot {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            font-size: 14px;
            background: #f5f7fa;
            color: #c0c4cc;
            vertical-align: middle;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
