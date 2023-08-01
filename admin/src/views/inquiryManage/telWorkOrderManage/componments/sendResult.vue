<template>
  <Dialog
    title="诊断结果"
    :visible.sync="dialogVisible"
    :height="400"
    :width="500"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div v-if="dialogVisible">
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item label="诊断疾病" prop="diseaseId">
          <el-select
            v-model="formData.diseaseId"
            class="w-full"
            filterable
            remote
            placeholder="请搜索适用疾病"
            :remote-method="remoteMethod"
            :loading="searchLoading"
            @change="handlerSelect"
          >
            <el-option
              v-for="(item, index) in diseaseList"
              :key="index"
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
        <el-form-item label="推荐科室">
          <el-input
            v-if="!departmentVisible"
            v-model="formData.hospitalDepartment"
            class="w-full"
          />
          <el-select
            v-if="departmentVisible"
            v-model="formData.hospitalDepartment"
            filterable
            placeholder="请输入推荐科室"
            style="width: 100%"
          >
            <el-option
              v-for="item in firstDepartmentList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐药物">
          <el-input
            v-if="!drugVisible"
            v-model="formData.diseaseDrug"
            class="w-full"
          />
          <el-select
            v-if="drugVisible"
            v-model="formData.diseaseDrug"
            filterable
            placeholder="请输入推荐药物"
            remote
            :remote-method="getDrug"
            style="width: 100%"
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
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveForm('formData')">确 定</el-button>
    </span>
  </Dialog>
</template>

<script>
import { replaceHightKeyWord } from '@/utils/common';
import { mapActions } from 'vuex';
export default {
  name: 'sendResult',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: { type: String, default: '' }
  },
  data() {
    const defaultForm = {
      id: this.id,
      diseaseDrug: '',
      diseaseId: '',
      diseaseName: '',
      hospitalDepartment: ''
    };
    return {
      searchLoading: false,
      filterText: '',
      diseaseList: [],
      defaultForm: defaultForm,
      formData: this.$extends({}, defaultForm),
      rules: {
        diseaseId: [
          {
            required: true,
            message: '请选择诊断疾病'
          }
        ]
      },
      dialogVisible: false,
      firstDepartmentList: [],
      diseaseDrugList: [],
      departmentVisible: false,
      drugVisible: false
    };
  },
  watch: {
    visible: {
      async handler(val) {
        this.$copyProps(this.formData, this.defaultForm);
        this.dialogVisible = val;
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$copyProps(this.formData, this.defaultForm);
          this.filterText = '';
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {
    if (!this.formData.hospitalDepartment) {
      this.departmentVisible = true;
    }
    if (!this.formData.diseaseDrug) {
      this.drugVisible = true;
    }
    this.getDepartment();
  },
  methods: {
    ...mapActions('inquiryManage', ['getAllDepartment']),
    ...mapActions('drugManage', ['findDrug']),
    handlerSelect(id) {
      const item = this.diseaseList.find(item => item.id === id);
      if (this.$isNotEmpty(item)) {
        this.formData.diseaseName = item.diseaseName;
      }
    },
    // 搜索疾病
    remoteMethod(keyword) {
      this.searchLoading = true;
      if (keyword !== '') {
        this.$store
          .dispatch('goodsManage/getDiseaseByName', {
            name: keyword
          })
          .then(res => {
            this.searchLoading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.diseaseName);
            });
            this.diseaseList = res.data || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.diseaseList = [];
      }
    },
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.$store
          .dispatch('telWorkOrderManage/sendResult', this.formData)
          .then(() => {
            this.$message.success('发送成功');
            this.dialogVisible = false;
            this.$emit('saved');
          });
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

<style lang="scss" scoped></style>
