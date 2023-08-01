<template>
  <div class="contract-edit">
    <Tab
      :btns="btns"
      :current-key="activeName"
      :btn-style="{ overflow: 'visible' }"
      @change="handleClick"
    />
    <div v-show="activeName === '0'" class="content">
      <el-form
        ref="baseForm"
        inline
        class="contract-form"
        label-position="left"
        label-width="100px"
        :model="baseForm"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item label="签订公司" prop="providerId">
              <el-select
                v-model="baseForm.providerId"
                class="search-input"
                :disabled="edit"
                placeholder="全部"
                clearable
                filterable
                @change="changeProvider"
              >
                <el-option
                  v-for="item in supplierList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属项目" prop="serviceValue">
              <el-popover
                v-if="showSave"
                ref="popoverSelect"
                v-model="isShow"
                popper-class="select-popover"
                placement="bottom"
                :width="510"
                trigger="focus"
              >
                <ul v-if="itemlist.length > 0" class="list-module">
                  <li
                    v-for="(item, index) in itemlist"
                    :key="index"
                    :class="item.checked ? 'isactive' : ''"
                    @click="selectToggle(item)"
                  >
                    <span
                      v-if="item.checked"
                      class="el-icon-check"
                      style="color:#3599fe"
                    />
                    <span class="list-item-text">{{
                      item.serviceInfoName
                    }}</span>
                  </li>
                </ul>
                <div v-else class="tip-nodata">
                  无数据
                </div>
                <div v-show="isNoData" class="tip-nodata">
                  没有找到 "{{ searchText }}"
                </div>
                <el-input
                  slot="reference"
                  v-model="searchText"
                  v-popover:popoverSelect
                  placeholder="请选择"
                />
              </el-popover>
              <div class="tag-wrap">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag.serviceInfoId"
                  class="tag"
                  :closable="showSave"
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  @click="goServiceInfo(tag.serviceInfoId)"
                >
                  {{ tag.serviceInfoName }}
                </el-tag>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="合同名称" prop="contractName">
              <el-input
                v-model="baseForm.contractName"
                :disabled="edit && !showSave"
                style="width:510px"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="签订日期" prop="signTime">
              <el-date-picker
                v-model="baseForm.signTime"
                :disabled="edit && !showSave"
                type="date"
                placeholder="请选择签订日"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="有效期" prop="validDate">
              <el-date-picker
                v-model="baseForm.validDate"
                :disabled="edit && !showSave"
                type="daterange"
                value-format="timestamp"
                clearable
                :editable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeEffectiveTime"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              ref="uploadElement"
              label="上传文件："
              prop="pdfFileName"
            >
              <el-upload
                class="upload"
                action=""
                accept="application/pdf"
                :http-request="uploadPdf"
                :before-upload="beforeUpload"
                :multiple="false"
                :show-file-list="false"
                :disabled="edit && !showSave"
              >
                <div
                  v-if="baseForm.pdfFileList.length === 0"
                  style="text-align:left"
                >
                  <div class="info">
                    支持PDF，只可上传一份，大小限制10M
                  </div>
                  <i class="el-icon-plus avatar-uploader-icon" />
                </div>
                <div v-else style="margin-bottom: 100px">
                  <div class="pdf">
                    <div
                      v-if="showSave"
                      class="delete"
                      @click.stop="
                        baseForm.pdfFileList = [];
                        baseForm.pdfFileName = '';
                      "
                    />
                  </div>
                  <span class="name">{{ baseForm.pdfFileName || '' }}</span>
                </div>
              </el-upload>
              <div class="img" style="position: relative">
                <el-image
                  v-for="(item, index) in baseForm.pdfFileList"
                  :key="index"
                  style="width: 178px; height: 178px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="baseForm.pdfFileList"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="activeName === '1'" class="log-items">
      <Logs :id="baseForm.id" :type="'105'" :has-o-a-log="true" />
    </div>
    <div class="page-footer">
      <el-button
        v-if="showSave"
        class="btn-save"
        :loading="loading"
        @click="save('baseForm')"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import uploadImage from '@/utils/uplaodCertificate';
import { addContract, updateContract } from '@/api/supplier';
export default {
  name: 'contract-edit',
  data() {
    return {
      edit: false,
      activeName: '0',
      baseForm: {
        id: '',
        providerId: '',
        project: '',
        contractName: '',
        signTime: '',
        effectiveTime: '',
        expirationTime: '',
        validDate: '',
        pdfFileList: [],
        pdfFileName: '',
        serviceValue: ''
      },
      rules: {
        providerId: [
          {
            required: true,
            message: '请选择签订公司',
            trigger: 'change'
          }
        ],
        serviceValue: [
          {
            required: true,
            message: '请选择所属项目',
            trigger: 'change'
          }
        ],
        validDate: [
          {
            required: true,
            message: '请选择有效期',
            trigger: 'change'
          }
        ],
        pdfFileName: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      },
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ],
      loading: false,
      supplierList: [],
      itemlist: [],
      dynamicTags: [],
      serviceList: [],
      isShow: false,
      searchText: '',
      isNoData: false,
      showSave: true
    };
  },
  watch: {
    searchText(newVal) {
      // 搜索框实时检索
      this.search(newVal);
    },
    serviceList: {
      deep: true,
      handler: function(newVal) {
        if (this.showSave && this.$route.params.id) {
          newVal.forEach(item => {
            this.dynamicTags.forEach(tag => {
              if (item.serviceInfoId === tag.serviceInfoId) {
                item.checked = true;
              }
            });
          });
        }
        this.itemlist = newVal;
      }
    }
  },
  created() {
    this.edit = this.$route.params.id ? true : false;
    if (this.$route.name === 'contractDetail') {
      this.showSave = false;
    }
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id);
    }
    this.getSupplierList();
  },
  methods: {
    ...mapActions('drugManage', ['getSuppliersList']),
    getSupplierList() {
      this.getSuppliersList().then(res => {
        this.supplierList = res.obj;
      });
    },
    getDetail(id) {
      const params = { id };
      this.$store.dispatch('supplier/contractDetail', params).then(res => {
        this.baseForm = Object.assign(this.baseForm, res.data);
        this.baseForm.validDate = [
          res.data.effectiveTime,
          res.data.expirationTime
        ];
        this.dynamicTags = res.data.serviceList;

        const selectName = this.dynamicTags.map(item => item.serviceInfoName);
        this.baseForm.serviceValue = selectName.join(',');
        if (this.showSave) {
          this.getServiveList(res.data.providerId);
        }
      });
    },
    handleClick(tab) {
      const tabItem = this.btns.find(item => item.value === tab);
      if (tabItem.isNew) {
        tabItem.isNew = false;
      }
      this.activeName = tab;
    },
    // 限制文件上传
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error('导入文件大小不能超过 10MB!');
      }
      return isLt2M;
    },
    uploadPdf(item) {
      uploadImage(item, true)
        .then(res => {
          this.baseForm.pdfFileList = res.urls;
          this.baseForm.pdfFileName = res.name;
          this.$refs.uploadElement.clearValidate();
        })
        .catch(() => {
          this.$message.error('上传PDF有误');
        });
    },
    getServiveList(id) {
      if (!id) {
        return;
      }
      const params = { providerId: id };
      this.$store.dispatch('supplier/findServiceInfoList', params).then(res => {
        res.data &&
          res.data.forEach(item => {
            this.serviceList.push({
              serviceInfoId: item.value,
              serviceInfoName: item.label
            });
          });
      });
    },
    changeProvider(val) {
      this.serviceList = [];
      this.dynamicTags = [];
      this.getServiveList(val);
    },
    deleteItem(id) {
      const params = { id };
      this.$store.dispatch('supplier/contractDelete', params).then(() => {
        this.$message.success('删除成功');
        this.getList({ page: 1 });
      });
    },
    save() {
      this.$refs['baseForm'].validate(valid => {
        if (valid) {
          this.loading = true;
          const arrSevice = [];
          this.dynamicTags.forEach(item => {
            arrSevice.push({
              serviceInfoId: item.serviceInfoId,
              serviceInfoName: item.serviceInfoName
            });
          });
          if (!this.$route.params.id) {
            const params = {
              contractName: this.baseForm.contractName,
              effectiveTime: this.baseForm.effectiveTime,
              expirationTime: this.baseForm.expirationTime,
              pdfFileList: this.baseForm.pdfFileList,
              pdfFileName: this.baseForm.pdfFileName,
              providerId: this.baseForm.providerId,
              signTime: this.baseForm.signTime,
              contractServices: arrSevice
            };

            addContract(params)
              .then(res => {
                this.loading = false;
                this.$message.success(res.message);
                this.$router.go(-1);
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            const params = {
              id: this.$route.params.id,
              contractName: this.baseForm.contractName,
              effectiveTime: this.baseForm.effectiveTime,
              expirationTime: this.baseForm.expirationTime,
              pdfFileList: this.baseForm.pdfFileList,
              pdfFileName: this.baseForm.pdfFileName,
              providerId: this.baseForm.providerId,
              signTime: this.baseForm.signTime,
              contractServices: arrSevice
            };
            updateContract(params)
              .then(res => {
                this.loading = false;
                this.$message.success(res.message);
                this.$router.go(-1);
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    handleClose(tag) {
      this.itemlist.forEach(item => {
        if (item.serviceInfoId === tag.serviceInfoId) {
          item.checked = false;
        }
      });
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      const selectName = this.dynamicTags.map(item => item.serviceInfoName);
      if (selectName.length) {
        this.baseForm.serviceValue = selectName.join(',');
      } else {
        this.baseForm.serviceValue = '';
      }
    },
    // 搜索事件
    search(val) {
      this.itemlist = this.serviceList.filter(item => {
        return item.label.indexOf(val) !== -1;
      });
      if (this.itemlist.length > 0) {
        this.isNoData = false;
      } else {
        this.isNoData = true;
      }
    },
    selectToggle(data) {
      data.checked = !data.checked;
      if (data.checked) {
        this.dynamicTags.push(data);
      } else {
        const index = this.dynamicTags.findIndex(
          item => item.serviceInfoId === data.serviceInfoId,
        );
        this.dynamicTags.splice(index, 1);
      }
      const selectName = this.dynamicTags.map(item => item.serviceInfoName);
      if (selectName.length) {
        this.baseForm.serviceValue = selectName.join(',');
      } else {
        this.baseForm.serviceValue = '';
      }
      this.isShow = false;
    },
    changeEffectiveTime() {
      this.baseForm.effectiveTime = this.baseForm.validDate[0];
      this.baseForm.expirationTime =
        this.baseForm.validDate[1] + 3600 * 24 * 1000 - 1000;
    },
    goServiceInfo(id) {
      this.$router.push(`/supplyChainManage/serviceItems/details/${id}/detail`);
    }
  }
};
</script>
<style lang="scss" scoped>
.contract-edit {
  background: #fff;
  margin: 24px;
  padding: 30px 24px;
  .contract-form {
    margin: 24px 0;
    .el-select,
    .el-date-editor {
      width: 510px;
    }
    .upload {
      position: relative;
      display: inline-block;
      text-align: left;
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
      .info {
        text-align: center;
        color: #a2a3b7;
      }
      .avatar-uploader-icon {
        font-size: 51px;
        color: #ebedf2;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d2d4d9;
        &:hover {
          border-color: #409eff;
        }
      }
    }
    .tag-wrap {
      margin: 12px 0 0;
      width: 510px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .tag {
        color: #3599fe;
        padding: 0 10px;
        margin-top: 10px;
        margin-right: 10px;
      }
    }
    .pdf {
      background: url('../../../assets/icon-pdf.png');
      background-size: 100% 100%;
      width: 50px;
      height: 52px;
      position: relative;
      .delete {
        background: url('../../../assets/icon-delete.png');
        background-size: 100% 100%;
        width: 14px;
        height: 14px;
        position: absolute;
        right: 0;
        top: -7px;
      }
    }
    .img {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.el-popper[x-placement^='bottom'],
.el-popper[x-placement^='right'] {
  &.select-popover {
    // 可搜索可多选下拉组件
    margin-top: 2px;
    background: #fff;
    box-shadow: none;
    padding: 0;
    .popper__arrow {
      display: none;
    }
    .list-module {
      margin: 0;
      list-style: none;
      text-align: left;
      max-height: 100px;
      overflow-y: auto;

      li {
        text-align: left;
        &._self-hide {
          display: none;
        }
        cursor: pointer;
        padding: 0 15px;
        height: 34px;
        line-height: 34px;
        color: #555;
        &:hover {
          background: #ddeeff;
        }
        &.isactive {
          color: #3599fe;
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>
