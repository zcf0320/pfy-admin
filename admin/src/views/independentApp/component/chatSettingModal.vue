<template>
  <div class="chat-setting-modal modal-form">
    <el-dialog
      v-loading="loading"
      title="聊天设置"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号设置" name="1">
          <div class="account-details">
            <div class="avator"/>
            <div class="name">{{ submitInfo.employeeName }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="聊天设置" name="2">
          <el-form
            ref="submitInfo"
            :model="submitInfo"
            class="submit-form"
            label-width="100px"
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="工作时间:" prop="workDay">
              <el-select
                v-model="submitInfo.workDay"
                placeholder="请选择工作时间"
                multiple
              >
                <el-option
                  v-for="item in workDays"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="上午时间:" prop="morningWorkTime">
              <el-time-picker
                v-model="submitInfo.morningWorkTime"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
               value-format="HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="下午时间:" prop="afternoonWorkTime">
              <el-time-picker
                v-model="submitInfo.afternoonWorkTime"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                value-format="HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="最多同时聊天数:" prop="maxChartNum">
              <el-input
                v-model="submitInfo.maxChartNum"
                placeholder="请输入人数"
              >
                <i slot="suffix" class="el-input__icon el-icon-user"/>
              </el-input>
            </el-form-item>
            <el-form-item
              label="结束会话(用户未发送消息后):"
              prop="finishChartTime"
            >
              <div class="chart-time">
                <div class="input">
                  <el-input
                    v-model="submitInfo.finishChartTime"
                    placeholder="请输入时间"
                  >
                    <i slot="suffix" class="el-input__icon el-icon-time"/>
                  </el-input>
                </div>
                <div class="unit">
                  <el-select
                    v-model="submitInfo.finishChartTimeUnit"
                    placeholder="请选择工作时间"
                  >
                    <el-option
                      v-for="item in finishChartTimeUnits"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="话术设置" name="3">
          <div class="script-setting">
            <div class="add-script">
              <el-input
                v-model="scriptText"
                placeholder="请输入话术"
                :maxlength="200"
              />
              <div
                :class="['add', scriptText === '' && 'disable-add']"
                @click="saveWord"
              >
                添加
              </div>
            </div>
            <div class="script-list">
              <div
                v-for="(item, index) in commonWordList"
                :key="item.id"
                class="script-item"
              >
                <div v-if="index !== editIndex" class="script">
                  <div class="text text-overflow">{{ item.word }}</div>
                  <div class="edit-button">
                    <div
                      :class="[
                        'edit',
                        editStatus && index !== editIndex && 'edit-disable'
                      ]"
                      @click="editWord(index)"
                    />
                    <div
                      :class="[
                        'delete',
                        editStatus && index !== editIndex && 'delete-disable'
                      ]"
                      @click="deleteWord(index)"
                    />
                  </div>
                </div>
                <div v-else class="script">
                  <el-input
                    v-model="scriptEditText"
                    placeholder="请输入话术"
                    class="text"
                    :maxlength="200"
                  />
                  <div class="edit-button">
                    <div class="save" @click="updateWord"/>
                    <div class="cancel" @click="cancelEdit"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save('submitInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'ChatSettingModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checNumber = (rule, value, callback) => {
      if (!/^([1-9]\d{0,2}|1000)$/.test(value)) {
        return callback(new Error('请输入1-1000的数字'));
      }
      callback();
    };
    return {
      submitInfo: {
        morningWorkTime: '',
        afternoonWorkTime: '',
        workDay: [],
        finishChartTimeUnit: 1,
        maxChartNum: '',
        finishChartTime: '',
        employeeName: ''
      },
      loading: false,
      closeClickModal: false,
      rules: {
        workDay: [
          { required: true, message: '请选择工作时间', trigger: 'change' }
        ],
        morningWorkTime: [
          { required: true, message: '请选择上午时间', trigger: 'change' }
        ],
        afternoonWorkTime: [
          { required: true, message: '请选择下午时间', trigger: 'change' }
        ],
        maxChartNum: [
          { required: true, message: '请设置最多同时聊天数', trigger: 'blur' },
          { validator: checNumber, trigger: 'blur' }
        ],
        finishChartTime: [
          { required: true, message: '请设置结束会话时间', trigger: 'blur' },
          { validator: checNumber, trigger: 'blur' }
        ]
      },
      activeName: '1',
      workDays: [
        {
          id: '1',
          label: '星期一'
        },
        {
          id: '2',
          label: '星期二'
        },
        {
          id: '3',
          label: '星期三'
        },
        {
          id: '4',
          label: '星期四'
        },
        {
          id: '5',
          label: '星期五'
        },
        {
          id: '6',
          label: '星期六'
        },
        {
          id: '7',
          label: '星期天'
        }
      ],
      finishChartTimeUnits: [
        {
          id: 1,
          label: '分钟'
        },
        {
          id: 2,
          label: '小时'
        }
      ],
      scriptText: '',
      scriptEditText: '',
      commonWordList: [],
      editIndex: null,
      editStatus: false
    };
  },
  created() {
    this.getChartSettingDetail();
    this.getWordList();
  },
  methods: {
    ...mapActions('inquiryManageFe', [
      'saveCommonWord',
      'queryCommonWord',
      'updateCommonWord',
      'deleteCommonWord'
    ]),
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
          const data = {
            ...vm.submitInfo,
            workMorningStart:
              vm.submitInfo.morningWorkTime[0],
            workMorningEnd:
              vm.submitInfo.morningWorkTime[1],
            workAfternoonStart:
              vm.submitInfo.afternoonWorkTime[0],
            workAfternoonEnd:
              vm.submitInfo.afternoonWorkTime[1]

          };
          this.$store.dispatch('chat/updateChartSetting', data).then(res => {
            if (!res.code) {
              vm.$message.success(res.comment);
              vm.$emit('save', vm.submitInfo.maxChartNum);
            }
          });
        }
      });
    },
    // tab切换
    handleClick() {},
    // 获取聊天设置详情
    getChartSettingDetail() {
      this.$store.dispatch('chat/getChartSettingDetail').then(res => {
        this.submitInfo = {
          ...res.obj,
          morningWorkTime: [res.obj.workMorningStart, res.obj.workMorningEnd],
          afternoonWorkTime: [
            res.obj.workAfternoonStart,
            res.obj.workAfternoonEnd
          ]
        };
      });
    },

    // 编辑常用语
    editWord(index) {
      this.editIndex = index;
      this.editStatus = true;
      this.scriptEditText = this.commonWordList[index].word;
    },
    // 更新常用语
    updateWord() {
      const postData = {
        id: this.commonWordList[this.editIndex].id,
        word: this.scriptEditText
      };
      this.updateCommonWord(postData).then(res => {
        if (res.status) {
          this.getWordList();
          this.editIndex = null;
          this.editStatus = false;
        }
      });
    },
    // 新增常用语
    saveWord() {
      if (!this.scriptText) {
        return;
      }
      this.saveCommonWord({
        word: this.scriptText
      }).then(res => {
        if (res.status) {
          this.scriptText = '';
          this.getWordList();
        }
      });
    },
    // 获取列表
    getWordList() {
      this.queryCommonWord({
        type: true
      }).then(res => {
        if (res.status) {
          this.commonWordList = res.data || [];
        }
      });
    },
    // 取消编辑
    cancelEdit() {
      this.editIndex = null;
      this.editStatus = false;
    },
    // 删除常用语
    deleteWord(index) {
      if (this.editStatus) {
        return;
      }
      this.$confirm('确认删除该常用语, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteCommonWord({
            id: this.commonWordList[index].id
          }).then(res => {
            if (res.status) {
              this.getWordList();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-setting-modal {
  .account-details {
    .avator {
      width: 100px;
      height: 100px;
      background-image: url('../../../assets/default_header.png');
      background-size: 100% 100%;
      margin: 0px auto 20px;
    }
    .name {
      text-align: center;
      color: #333333;
      font-size: 16px;
    }
  }
  .submit-form {
    padding: 2px 0;
    .el-date-editor {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .chart-time {
      display: flex;
      .unit {
        width: 100px;
      }
      .input {
        flex: 1;
      }
    }
  }
  .script-setting {
    .add-script {
      margin-bottom: 24px;
      display: flex;
      .add {
        width: 70px;
        line-height: 34px;
        text-align: center;
        color: #3599fe;
        cursor: pointer;
        margin-left: 20px;
      }
      .disable-add {
        color: #989ab3;
      }
    }
    .script-list {
      max-height: 500px;
      overflow-y: auto;
      .script-item {
        .script {
          display: flex;
          align-items: center;
          height: 36px;
          .text {
            flex: 1;
            color: #333333;
            font-size: 14px;
          }
          .edit-button {
            width: 70px;
            display: flex;
            margin-left: 20px;
            .edit {
              width: 14px;
              height: 14px;
              margin-right: 30px;
              background-image: url('../../../assets/table_icon/edit.svg');
              background-size: 100% 100%;
              cursor: pointer;
            }
            .edit-disable {
              width: 14px;
              height: 14px;
              margin-right: 30px;
              background-image: url('../../../assets/table_icon/edit-disable.svg');
              background-size: 100% 100%;
              cursor: pointer;
            }
            .delete {
              width: 14px;
              height: 14px;
              background-image: url('../../../assets/table_icon/delete.svg');
              background-size: 100% 100%;
              cursor: pointer;
            }
            .delete-disable {
              width: 14px;
              height: 14px;
              background-image: url('../../../assets/table_icon/delete-disable.svg');
              background-size: 100% 100%;
              cursor: pointer;
            }
            .save {
              width: 14px;
              height: 14px;
              background-image: url('../../../assets/table_icon/save.svg');
              background-size: 100% 100%;
              margin-right: 30px;
              cursor: pointer;
            }
            .cancel {
              width: 14px;
              height: 14px;
              background-image: url('../../../assets/table_icon/icon_cancel.svg');
              background-size: 100% 100%;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
