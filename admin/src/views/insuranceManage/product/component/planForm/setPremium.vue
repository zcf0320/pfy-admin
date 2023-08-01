<template>
  <div class="modal-form">
    <el-dialog
      v-loading="loading"
      title="设置保费"
      :visible="isShow"
      width="1050px"
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-form
        ref="customPremium"
        :model="customPremium"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="选择保费因素" prop="formType">
              <el-select
                v-model="customPremium.formType"
                placeholder="请选择保额"
                @change="keyChange"
              >
                <el-option
                  v-for="item in KeyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间">
              <el-select
                v-model="customPremium.timeUnit"
                placeholder="请选择时间"
                @change="timeUnitChange"
              >
                <el-option
                  v-for="item in times"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="customPremium.table.length" class="table">
            <div class="table-label">
              <span class="label">保费详情</span>
              <span
                v-if="factor[0] === 'age'"
                class="add"
                @click="addAgeRow('customPremium')"
                >添加</span
              >
              <div
                v-if="factor[0] === 'age' && customPremium.table.length > 1"
                class="delete"
              >
                <el-popconfirm
                  title="删除最后一行，是否删除？"
                  placement="top"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  confirm-button-type="plain"
                  cancel-button-type="primary"
                  :hide-icon="true"
                  @onConfirm="deleteAgeRow"
                >
                  <span slot="reference">删除</span>
                </el-popconfirm>
              </div>
            </div>
            <div v-if="factor.length === 1" class="main">
              <div class="table-header">
                <div class="type">{{ TypeName[factor[0]] }}</div>
                <div class="name">保费/{{ timeUnitStr }}</div>
              </div>
              <div class="table-content">
                <div
                  v-for="(item, index) in customPremium.table"
                  :key="index"
                  class="item"
                >
                  <div v-if="item.key === 'age'" class="key-name">
                    <div class="age">
                      <el-form-item
                        :prop="`table[${index}].ageMin`"
                        :rules="[
                          {
                            required: true,
                            message: '请输入最小年龄',
                            trigger: 'change',
                          },
                        ]"
                      >
                        <InputNumber
                          v-model="item.ageMin"
                          class="age-number"
                          :precision="0"
                          :step="1"
                          :min="
                            index === 0
                              ? 0
                              : Number(customPremium.table[index - 1].ageMax) +
                                1
                          "
                          :max="Number(item.ageMax) - 1"
                          placeholder="请输入最小年龄"
                        />
                      </el-form-item>
                    </div>
                    <div class="age-text">-</div>
                    <div class="age">
                      <el-form-item
                        :prop="`table[${index}].ageMax`"
                        :rules="[
                          {
                            required: true,
                            message: '请输入最大年龄',
                            trigger: 'change',
                          },
                        ]"
                      >
                        <InputNumber
                          v-model="item.ageMax"
                          class="age-number"
                          :precision="0"
                          :step="1"
                          :min="Number(item.ageMin) + 1"
                          :max="
                            index === customPremium.table.length - 1
                              ? 99
                              : Number(customPremium.table[index + 1].ageMin) -
                                1
                          "
                          placeholder="请输入最大年龄"
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div v-else-if="item.key === 'fixed'" class="key-name">
                    固定保费
                  </div>
                  <div v-else class="key-name">{{ item[item.key] }}</div>
                  <div class="premium">
                    <el-form-item
                      :prop="`table[${index}].premium`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入保费',
                          trigger: 'change',
                        },
                      ]"
                    >
                      <InputNumber
                        v-model="item.premium"
                        class="premium-number"
                        :min="0"
                        :max="999999.99"
                        :precision="2"
                        :step="0.01"
                        placeholder="请输入保费"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="main">
              <div class="table-header">
                <div class="type-2">
                  {{
                    `${TypeName[factor[0]]} / ${
                      TypeName[factor[1]]
                    } (保费/${timeUnitStr})`
                  }}
                </div>
                <div
                  v-for="name in KeyName[factor[1]]"
                  :key="name"
                  class="name-2"
                >
                  <div class="text">{{ name }}</div>
                </div>
              </div>
              <div class="table-content">
                <div
                  v-for="(item, index) in customPremium.table"
                  :key="index"
                  class="item"
                >
                  <div v-if="item.key !== 'age'" class="key-name-2">
                    {{ item[item.key] }}
                  </div>
                  <div v-else class="key-name-2">
                    <div class="age">
                      <el-form-item
                        :prop="`table[${index}].ageMin`"
                        :rules="[
                          {
                            required: true,
                            message: '请输入最小年龄',
                            trigger: 'change',
                          },
                        ]"
                      >
                        <InputNumber
                          v-model="item.ageMin"
                          class="age-number"
                          :precision="0"
                          :step="1"
                          :min="
                            index === 0
                              ? 0
                              : Number(customPremium.table[index - 1].ageMax) +
                                1
                          "
                          :max="Number(item.ageMax) - 1"
                          placeholder="请输入最小年龄"
                        />
                      </el-form-item>
                    </div>
                    <div class="age-text">-</div>
                    <div class="age">
                      <el-form-item
                        :prop="`table[${index}].ageMax`"
                        :rules="[
                          {
                            required: true,
                            message: '请输入最大年龄',
                            trigger: 'change',
                          },
                        ]"
                      >
                        <InputNumber
                          v-model="item.ageMax"
                          class="age-number"
                          :precision="0"
                          :step="1"
                          :min="Number(item.ageMin) + 1"
                          :max="
                            index === customPremium.table.length - 1
                              ? 99
                              : customPremium.table[index + 1].ageMin - 1
                          "
                          placeholder="请输入最大年龄"
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="premium-2">
                    <div
                      v-for="(child, childIndex) in item.child"
                      :key="childIndex"
                      class="premium-item"
                    >
                      <el-form-item
                        :prop="`table[${index}].child[${childIndex}].premium`"
                        :rules="[
                          {
                            required: true,
                            message: '请输入保费',
                            trigger: 'change',
                          },
                        ]"
                      >
                        <InputNumber
                          v-model="child.premium"
                          class="premium-number"
                          :min="0"
                          :max="999999.99"
                          :precision="2"
                          :step="0.01"
                          placeholder="请输入保费"
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure('customPremium')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { PremiumType, KeyList, KeyName, TypeName } from './config';
import { cloneDeep } from 'lodash';
export default {
  name: 'SetPremium',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    customPremium: {
      type: Object,
      default: () => ({
        formType: '',
        timeUnit: 1,
        table: []
      })
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      KeyList,
      PremiumType,
      KeyName,
      TypeName,
      rules: {
        key: [{ required: true, message: '请选择保费因素', trigger: 'change' }]
      },
      times: [
        {
          label: '年',
          value: 1
        },
        {
          label: '月',
          value: 2
        },
        {
          label: '3个月',
          value: 3
        },
        {
          label: '6个月',
          value: 4
        }
      ],
      factor: [],
      addContent: {},
      minAge: 0,
      oldData: {},
      oldType: 1,
      timeUnitStr: '年'
    };
  },
  created() {
    this.timeUnitChange(this.customPremium.timeUnit); // 修改时间单位
    const factor = new Set();
    this.customPremium.table.forEach(item => {
      factor.add(item.key);
      item.child &&
        item.child.forEach(child => {
          factor.add(child.key);
        });
    });
    this.factor = [...factor];
    this.oldType = this.customPremium.formType;
    this.oldData = cloneDeep(this.customPremium);
    if (this.factor.length === 1) {
      if (this.factor[0] === 'age') {
        this.addContent = {
          key: 'age',
          ageMin: 0,
          ageMax: 1,
          premium: 0
        };
      } else {
        this.addContent = {};
      }
    } else {
      if (this.factor[0] === 'age') {
        this.addContent = {
          key: 'age',
          ageMin: 0,
          ageMax: 1,
          child: []
        };
        this.KeyName[this.factor[1]].forEach(name => {
          const obj = {
            key: this.factor[1],
            premium: 0
          };
          obj[this.factor[1]] = name;
          this.addContent.child.push(obj);
        });
      } else {
        this.addContent = {};
      }
    }
  },
  methods: {
    // 时间单位改变
    timeUnitChange(val) {
      val === 1 && (this.timeUnitStr = '年');
      val === 2 && (this.timeUnitStr = '月');
      val === 3 && (this.timeUnitStr = '3个月');
      val === 4 && (this.timeUnitStr = '6个月');
    },
    // 关闭弹框
    close() {
      this.$emit('close', this.oldData);
    },
    // 确定
    sure(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$emit('setPremium');
        }
      });
    },
    // initTable
    initTable() {
      this.factor = this.PremiumType[this.customPremium.formType];
      // 一维数组
      if (this.factor.length === 1) {
        this.customPremium.table = [];
        if (this.factor[0] === 'age') {
          this.addContent = {
            key: 'age',
            ageMin: 0,
            ageMax: 1,
            premium: 0
          };
          this.customPremium.timeUnit = 1;
          this.KeyName['age'].forEach(() => {
            this.customPremium.table.push(cloneDeep(this.addContent));
          });
        } else {
          this.addContent = {};
          this.KeyName[this.factor[0]].forEach(name => {
            const obj = {
              key: this.factor[0],
              premium: 0
            };
            obj[this.factor[0]] = name;
            this.customPremium.table.push(obj);
          });
        }
      } else {
        this.customPremium.table = [];
        if (this.factor[0] === 'age') {
          this.addContent = {
            key: 'age',
            ageMin: 0,
            ageMax: 1,
            child: []
          };
          this.KeyName[this.factor[1]].forEach(name => {
            const obj = {
              key: this.factor[1],
              premium: 0
            };
            obj[this.factor[1]] = name;
            this.addContent.child.push(obj);
          });
          this.KeyName['age'].forEach(() => {
            this.customPremium.table.push(cloneDeep(this.addContent));
          });
        } else {
          this.KeyName[this.factor[0]].forEach(name => {
            const obj = {
              key: this.factor[0],
              child: []
            };
            obj[this.factor[0]] = name;
            this.customPremium.table.push(obj);
          });
          this.customPremium.table.forEach(item => {
            this.KeyName[this.factor[1]].forEach(name => {
              const obj = {
                key: this.factor[1],
                premium: 0
              };
              obj[this.factor[1]] = name;
              item.child.push(obj);
            });
          });
        }
      }
    },
    // 确定保费表为几维数组
    keyChange() {
      if (!this.oldType) {
        this.initTable();
      } else {
        this.$confirm('确认修改保费因素吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.initTable();
            this.oldType = this.customPremium.formType;
          })
          .catch(() => {
            this.customPremium.formType = this.oldType;
          });
      }
    },
    // 年龄添加行
    addAgeRow(formName) {
      // 判断上一行是否有未填值
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 计算下一行最小年龄值
          this.addContent.ageMin =
            this.customPremium.table[this.customPremium.table.length - 1]
              .ageMax + 1;
          this.addContent.ageMax =
            this.customPremium.table[this.customPremium.table.length - 1]
              .ageMax + 2;
          this.minAge = this.addContent.ageMin;
          if (this.minAge > 98) {
            return;
          }
          this.customPremium.table.push(cloneDeep(this.addContent));
        }
      });
    },
    // 删除最后一行
    deleteAgeRow() {
      this.customPremium.table.splice(this.customPremium.table.length - 1, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-form {
  .el-select {
    width: 100%;
  }
  .table {
    padding: 10px;
    .table-label {
      width: 100%;
      margin-bottom: 12px;
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      display: flex;
      .label {
        flex: 1;
      }
      .add {
        width: 30px;
        color: #3599fe;
        cursor: pointer;
      }
      .delete {
        width: 30px;
        color: #3599fe;
        cursor: pointer;
        margin-left: 12px;
      }
    }
    .main {
      .table-header {
        width: 100%;
        height: 42px;
        background: #f3f6f9;
        border-radius: 4px 4px 0 0;
        display: flex;
        .type {
          flex: 1;
          text-align: center;
          line-height: 42px;
        }
        .name {
          flex: 1;
          text-align: center;
          line-height: 42px;
        }
        .type-2 {
          width: 300px;
          text-align: center;
          line-height: 42px;
        }
        .name-2 {
          flex: 1;
          display: flex;
          .text {
            flex: 1;
            text-align: center;
            line-height: 42px;
          }
        }
      }
      .table-content {
        .item {
          width: 100%;
          display: flex;
          height: 56px;
          overflow: hidden;
          border-bottom: 1px solid #f3f6f9;
          .key-name {
            flex: 1;
            text-align: center;
            display: flex;
            padding: 0 6px;
            align-items: center;
            justify-content: space-around;
            border-right: 1px solid #f3f6f9;
            border-left: 1px solid #f3f6f9;
            .age {
              flex: 1;
              .el-form-item {
                margin-bottom: 0 !important;
                /deep/ .el-form-item__error {
                  color: #fff !important;
                }
              }
              .age-number {
                width: 100%;
              }
            }
            .age-text {
              margin: 0 12px;
            }
          }
          .key-name-2 {
            width: 300px;
            text-align: center;
            display: flex;
            padding: 0 6px;
            align-items: center;
            justify-content: space-around;
            border-right: 1px solid #f3f6f9;
            border-left: 1px solid #f3f6f9;
            .age {
              flex: 1;
              .el-form-item {
                margin-bottom: 0 !important;
                /deep/ .el-form-item__error {
                  color: #fff !important;
                }
              }
              .age-number {
                width: 100%;
              }
            }
            .age-text {
              margin: 0 12px;
            }
          }
          .premium {
            flex: 1;
            padding: 0 6px;
            border-right: 1px solid #f3f6f9;
            .premium-number {
              width: 100%;
              margin: 10px auto;
            }
          }
          .premium-2 {
            flex: 1;
            display: flex;
            .premium-item {
              flex: 1;
              padding: 0 6px;
              border-right: 1px solid #f3f6f9;
              .premium-number {
                width: 100%;
                margin: 10px auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
