<template>
  <el-form ref="formData" :model="formData">
    <div class="flex-between mb-24">
      <div class="title-top lh-32 mb-0 pt-0 pb-0 pl-0">项目明细</div>
      <div>
        <el-button
          v-if="isEdit && pageAuthority.includes('add')"
          size="small"
          class="btn-exit"
          @click="add()"
        >
          新增
        </el-button>
      </div>
    </div>
    <div class="line-solid mb-24" />
    <div>
      <div v-for="(item, index) in formData.claimCheckList" :key="index">
        <div class="flex-box mb-24">
          <span class="mr-16">项目{{ index + 1 }}</span>
          <el-form-item
            :prop="`claimCheckList[${index}].name`"
            :rules="[{ required: true, message: '请选择项目名称' }]"
            class="mb-0 mr-16"
          >
            <el-select
              v-model="item.name"
              filterable
              placeholder="请输入项目名称进行查询"
              remote
              :remote-method="getNameList"
              :loading="loading"
              :disabled="!isEdit"
              @change="selectItem(item)"
            >
              <el-option
                v-for="(option, i) in nameList"
                :key="i"
                :label="option.name"
                :value="option.name"
              >
                <span v-html="option.hightLable" />
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :prop="`claimCheckList[${index}].num`"
            :rules="[
              { required: true, message: '请输入数量' },
              { validator: $validators.checkPInt, message: '请输入1~99正整数' },
            ]"
            class="mb-0 mr-16"
          >
            <InputNumber
              v-model="item.num"
              class="w-110"
              :maxlength="2"
              placeholder="请输入数量"
              :disabled="!isEdit"
            />
          </el-form-item>
          <el-form-item
            :prop="`claimCheckList[${index}].univalence`"
            :rules="[
              { required: true, message: '请输入单价' },
              {
                validator: $validators.checkDecima2,
                message: '请输入0~999999.99的数且最多保留两位小数',
              },
            ]"
            class="mb-0 mr-16"
          >
            <InputNumber
              v-model="item.univalence"
              class="w-110"
              placeholder="请输入单价"
              :max="999999.99"
              :disabled="!isEdit"
            />
          </el-form-item>
          <div
            v-if="
              index ===
                (formData.claimCheckList
                  ? formData.claimCheckList.length - 1
                  : 0) &&
                index !== 0 &&
                isEdit
            "
            class="fc-blue pointer"
            @click="del(index)"
          >
            删除
          </div>
        </div>
        <div
          v-if="item.checkProjectDTOList && item.checkProjectDTOList.length"
          class="detail-content-table"
        >
          <div class="detail-text">项目明细</div>
          <el-table :data="item.checkProjectDTOList">
            <el-table-column prop="itemName" label="项目名称" />
            <el-table-column prop="highLimit" label="参考值">
              <template slot-scope="scope">
                {{ scope.row.lowLimit }}~{{ scope.row.highLimit }}
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" />
            <el-table-column prop="actualValue" label="实际值">
              <template slot-scope="scope">
                <el-form-item
                  :prop="
                    `claimCheckList[${index}].checkProjectDTOList.${scope.$index}.actualValue`
                  "
                  :rules="[
                    { required: true, message: '请输入实际值' },
                    {
                      validator: $validators.checkDecima2,
                      message: '请输入0~999999.99的数且最多保留两位小数',
                    },
                  ]"
                  style="margin-top: 24px"
                >
                  <el-input
                    v-model.trim="scope.row.actualValue"
                    placeholder="请输入实际值"
                    :disabled="!isEdit"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
import { replaceHightKeyWord } from '@/utils/common';
export default {
  name: 'Inspection',
  props: {
    id: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        claimCheckList: [
          {
            name: '',
            num: null,
            univalence: null,
            checkProjectDTOList: []
          }
        ]
      },
      nameList: [],
      loading: false
    };
  },
  computed: {
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    }
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'saveCheck',
      'findCheckName',
      'findCheckDetail'
    ]),
    /**
     * 获取初始化数据
     */
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        if (this.$isNotEmpty(res.data.claimCheckList)) {
          this.formData.claimCheckList = res.data.claimCheckList || [];
          this.formData.claimCheckList.forEach(item => {
            item.checkProjectDTOList = item.checkProjectVOList;
          });

          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    /**
     *
     */
    add() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          this.$message.warning('请完善已存在数据');
          return false;
        }
        const obj = {
          name: '',
          num: null,
          univalence: null,
          checkProjectDTOList: []
        };
        this.formData.claimCheckList.push(obj);
      });
    },
    del(index) {
      this.$confirm('删除数据后不可恢复,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.claimCheckList.splice(index, 1);
      });
    },
    /**
     * 获取项目名称
     */
    getNameList(keyword) {
      this.loading = true;
      if (keyword !== '') {
        const arr = [];
        this.findCheckName(keyword)
          .then(res => {
            res.data.forEach(item => {
              const obj = {
                hightLable: replaceHightKeyWord(keyword, item),
                name: item
              };
              arr.push(obj);
            });

            this.nameList = arr;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.nameList = [];
      }
    },
    /**
     * 保存数据
     */
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          this.$message.warning('数据填写有误');
          return false;
        }
        const saveData = {
          claimRecordId: this.id,
          checkDTOList: this.formData.claimCheckList
        };
        this.saveCheck(saveData).then(() => {
          this.$emit('update:isEdit', false);
          this.$message.success('保存成功');
        });
      });
    },
    selectItem(item) {
      const params = {
        claimRecordId: this.$route.params.id,
        name: item.name
      };
      this.findCheckDetail(params).then(res => {
        this.$set(item, 'checkProjectDTOList', res.data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.detail-text {
  margin: 12px 0;
}
.detail-content-table {
  margin-bottom: 32px;
}
</style>
