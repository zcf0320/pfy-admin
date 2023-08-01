<template>
  <div class="chat-result-modal modal-form">
    <el-dialog
      v-loading="loading"
      title="发送诊断结果"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="submitInfo"
        :model="submitInfo"
        label-width="100px"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="诊断疾病:" prop="diseaseId">
          <el-select
            v-model="submitInfo.diseaseId"
            placeholder="请选择诊断疾病"
            remote
            reserve-keyword
            :remote-method="getDiseases"
            :loading="searchLoading"
            filterable
            @change="selectDisease"
          >
            <el-option
              v-for="item in diseaseList"
              :key="item.diseaseName"
              :label="item.diseaseName"
              :value="item.id"
            >
              <span v-html="item.hightLable" />
              <span class="option-remark">{{
                item.code ? `${item.code} : ${item.attribute}` : ''
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐科室:" prop="hospitalDepartment">
          <el-input
            v-if="!departmentVisible"
            v-model="submitInfo.hospitalDepartment"
            placeholder="请输入推荐科室"
          />
          <el-select
            v-if="departmentVisible"
            v-model="submitInfo.hospitalDepartment"
            filterable
            placeholder="请输入推荐科室"
          >
            <el-option
              v-for="item in firstDepartmentList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐药物:">
          <el-input
            v-if="!drugVisible"
            v-model="submitInfo.diseaseDrug"
            placeholder="请输入推荐药物"
          />
          <el-select
            v-if="drugVisible"
            v-model="submitInfo.diseaseDrug"
            filterable
            placeholder="请输入推荐药物"
            remote
            :remote-method="getDrug"
          >
            <el-option
              v-for="item in diseaseDrugList"
              :key="item.label"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { replaceHightKeyWord } from '@/utils/common';
export default {
  name: 'ChatResultModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitInfo: {
        diseaseId: '',
        diseaseName: '',
        hospitalDepartment: '',
        diseaseDrug: ''
      },
      loading: false,
      searchLoading: false,
      diseaseList: [],
      closeClickModal: false,
      rules: {
        diseaseId: [
          {
            required: true,
            message: '请选择诊断疾病',
            trigger: 'change'
          }
        ]
      },
      firstDepartmentList: [],
      diseaseDrugList: [],
      departmentVisible: false,
      drugVisible: false
    };
  },
  created() {
    if (!this.submitInfo.hospitalDepartment) {
      this.departmentVisible = true;
    }
    if (!this.submitInfo.diseaseDrug) {
      this.drugVisible = true;
    }
    this.getDepartment();
  },
  methods: {
    ...mapActions('goodsManage', ['getDiseaseByName']),
    ...mapActions('inquiryManageFe', ['getAllDepartment']),
    ...mapActions('drugManage', ['findDrug']),
    // 模糊搜索疾病
    getDiseases(keyword) {
      this.searchLoading = true;
      if (keyword !== '') {
        this.getDiseaseByName({
          name: keyword
        })
          .then(res => {
            this.searchLoading = false;
            res.obj.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.obj || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.diseaseList = [];
      }
    },
    // 关闭
    close() {
      this.$emit('close');
    },
    // 保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          const vm = this;
          vm.diseaseList.forEach(item => {
            if (item.id === vm.submitInfo.diseaseId) {
              vm.submitInfo.diseaseName = item.diseaseName;
            }
          });
          vm.$emit('save', vm.submitInfo);
        }
      });
    },
    // 选择诊断疾病智能回填推荐科室和药物
    selectDisease(id) {
      this.diseaseList.forEach(item => {
        if (item.id === id) {
          this.submitInfo = {
            ...this.submitInfo,
            hospitalDepartment: item.hospitalDepartment,
            diseaseDrug: item.diseaseDrug
          };
        }
      });
    },
    getDepartment() {
      this.getAllDepartment({ pageNum: 1, pageSize: 1000 }).then(res => {
        this.firstDepartmentList = res.data.list;
      });
    },
    getDrug(name) {
      if (name) {
        this.findDrug(name).then(res => {
          this.diseaseDrugList = res.data;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-result-modal {
  .el-select {
    width: 100%;
  }
}
</style>
