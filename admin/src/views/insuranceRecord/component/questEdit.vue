<template>
  <div class="questEdit">
    <el-container>
      <el-main>
        <div class="flex-col">
          <Tab
            :current-key="activeName"
            :btns="btns"
            @change="handleClick"
          ></Tab>
          <div class="scroll-table" v-if="activeName === '0'">
            <el-form
              ref="questEditForm"
              inline
              label-width="110px"
              :model="form"
              class="questEdit-form"
              :rules="rules"
            >
              <div class="form-card">
                <div>
                  <el-form-item label="模版名称：" prop="name">
                    <el-input
                      v-model="form.name"
                      style="width: 522px"
                      placeholder="名称不超过50字符"
                      maxlength="50"
                      :disabled="view"
                    />
                  </el-form-item>
                </div>

                <div>
                  <el-form-item label="模版说明：" prop="remark">
                    <el-input
                      v-model="form.remark"
                      type="textarea"
                      style="width: 522px"
                      :autosize="{ minRows: 3, maxRows: 5 }"
                      placeholder="问卷说明不超过200字符"
                      maxlength="200"
                      :disabled="view"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="content">
                <div
                  class="form-card"
                  v-for="(item, index) in form.questionInfos"
                  :key="index"
                >
                  <div class="content-ques">
                    <div class="content-num">
                      {{ `问题${index + 1}` }}
                    </div>
                    <div v-if="!view">
                      <el-popconfirm
                        v-if="form.questionInfos.length > 1"
                        title="移除后将不可恢复，是否移除？"
                        placement="left"
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        confirm-button-type="primary"
                        cancel-button-type="plain"
                        :hide-icon="true"
                        @onConfirm="deleteQues(index)"
                      >
                        <div slot="reference" class="remove"></div>
                      </el-popconfirm>
                    </div>
                  </div>
                  <el-divider />
                  <div>
                    <el-form-item>
                      <el-radio-group
                        v-model="item.questionType"
                        :disabled="view"
                        @change="changeType(item)"
                      >
                        <el-radio
                          v-for="ques in option"
                          :key="ques.value"
                          :label="ques.value"
                          >{{ ques.label }}</el-radio
                        >
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      label="问题内容"
                      :prop="'questionInfos.' + index + '.questionName'"
                      :rules="questionNameRules"
                    >
                      <el-input
                        v-model="item.questionName"
                        style="width: 522px"
                        placeholder="请输入问题内容"
                        maxlength="500"
                        :disabled="view"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5 }"
                      />
                    </el-form-item>
                  </div>

                  <QuesInfo
                    :ref="'child' + index"
                    :choose-list="chooseList"
                    :answer-infos="item.answerInfos"
                    :set-list="setList"
                    :view="view"
                    :child="index"
                    :question-type="item.questionType"
                  />
                </div>
                <div class="content-bottom">
                  <el-button
                    v-if="!view"
                    class="btn"
                    size="medium"
                    @click="addItem"
                    >+添加问题</el-button
                  >
                </div>
              </div>
            </el-form>
            <div
              v-if="!view && form.questionInfos.length > 0"
              class="questEdit-tools"
            >
              <div class="questEdit-tools-cancel">
                <button
                  type="button"
                  class="btn-exit"
                  @click="
                    $router.replace({ path: '/insuranceRecord/questionnaire' })
                  "
                >
                  取消
                </button>
              </div>
              <button
                type="button"
                class="btn-save"
                @click="submitForm('questEditForm')"
              >
                保存
              </button>
            </div>
          </div>
          <div v-if="id && activeName === '1'" class="log-items">
            <Logs :id="id" :type="'107'" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import QuesInfo from './quesInfo';
export default {
  name: 'QuestEdit',
  components: { QuesInfo },
  data() {
    return {
      id: '',
      length: '',
      form: {
        name: '',
        remark: '',
        single: '单选题',
        questionInfos: []
      },
      option: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '3',
          label: '单选填空'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '必填项不能为空，请完善模版名称',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '必填项不能为空，请完善模版说明',
            trigger: 'blur'
          }
        ]
      },
      questionNameRules: {
        required: true,
        message: '必填项不能为空，请完善问题内容',
        trigger: 'blur'
      },
      setList: [],
      view: false,
      disable: false,
      isEdit: false,
      chooseList: [],
      activeName: '0',
      btns: [{ value: '0', name: '基础信息' }]
    };
  },
  created() {
    this.getList();

    if (this.$route.query.id) {
      this.getDetail();
      this.id = this.$route.query.id;
      this.isEdit = true;
      this.disable = true;
      this.btns.push({ value: '1', name: '操作日志' });
    } else {
      this.addItem();
    }
    if (this.$route.query.view) {
      this.view = true;
    }
  },
  methods: {
    addItem() {
      const data = {
        questionType: '1',
        questionName: '',
        chooseList: [],
        answerInfos: [
          { jumpType: '', nextNumber: '', optionId: '' },
          { jumpType: '', nextNumber: '', optionId: '' }
        ]
      };
      this.form.questionInfos.push(data);
      const length = this.form.questionInfos.length;
      this.chooseList.push({
        value: length.toString(),
        label: `问题${length}`
      });
    },
    submitForm(formName) {
      const arr = [];
      this.form.questionInfos.forEach((_item, index) => {
        arr.push(this.$refs[`child${index}`][0].getData());
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          Promise.all(arr)
            .then(() => {
              this.submit();
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    submit() {
      const length = this.form.questionInfos.length;
      for (let i = 0; i < length; i++) {
        this.form.questionInfos[i].number = i + 1;
        this.form.questionInfos[i].chooseList = JSON.stringify(
          this.form.questionInfos[i].chooseList,
        );
      }
      this.$store
        .dispatch('supplier/healthQuesEdit', this.form)
        .then(() => {
          this.$router.replace({ path: '/insuranceRecord/questionnaire' });
          this.$message.success('保存成功');
        })
        .catch(() => {
          for (let i = 0; i < length; i++) {
            this.form.questionInfos[i].chooseList = JSON.parse(
              this.form.questionInfos[i].chooseList,
            );
          }
        });
    },
    getList() {
      const params = {
        pageNum: 1,
        pageSize: 99999
      };
      this.$store
        .dispatch('supplier/healthOptionList', params)
        .then(response => {
          this.setList = response.records;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    getDetail() {
      const params = {
        id: this.$route.query.id
      };
      this.$store
        .dispatch('supplier/healthQuesDetail', params)
        .then(response => {
          const data = response.data;
          this.form = Object.assign(this.form, data);
          const length = this.form.questionInfos.length;
          for (let i = 0; i < length; i++) {
            this.chooseList.push({
              value: (i + 1).toString(),
              label: `问题${i + 1}`
            });
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    save() {
      if (this.length > 0 && this.length <= 50) {
        for (let index = 0; index < this.length; index++) {
          this.form.questionInfos.push({
            questionType: '1',
            questionName: '',
            chooseList: [],
            answerInfos: [
              { jumpType: '', nextNumber: '', optionId: '' },
              { jumpType: '', nextNumber: '', optionId: '' }
            ]
          });
        }
        this.form.questionInfos.forEach((item, index) => {
          for (let i = index; i < this.length - 1; i++) {
            item.chooseList.push({
              value: `${Number(i) + 2}`,
              label: `问题${Number(i) + 2}`
            });
          }
        });
        this.disable = true;
        return;
      }
      this.$message.error('请确认问题数量');
    },
    getID(length) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now(),
      ).toString(36);
    },
    deleteQues(index) {
      const num = (index + 1).toString();
      const data = this.form.questionInfos;
      let flag = false;
      for (const i in data) {
        const item = data[i].answerInfos;
        for (const j in item) {
          if (item[j].nextNumber === num) {
            flag = true;
          }
        }
      }
      if (!flag) {
        this.deleteitem(index);
      } else {
        this.$message.error('该问题已被关联，无法删除');
      }
    },
    deleteitem(index) {
      const data = this.form.questionInfos;
      this.form.questionInfos.splice(index, 1);
      this.chooseList.splice(index, 1);
      this.chooseList.forEach((item, num) => {
        item.label = `问题${num + 1}`;
        item.value = `${num + 1}` + '';
      });
      for (const i in data) {
        const item = data[i].answerInfos;
        for (const j in item) {
          if (item[j].nextNumber > this.chooseList.length) {
            item[j].nextNumber = '';
          }
        }
      }
    },
    changeType(item) {
      const data = {
        questionType: '1',
        questionName: '',
        chooseList: [],
        answerInfos: [
          { jumpType: '', nextNumber: '', optionId: '' },
          { jumpType: '', nextNumber: '', optionId: '' }
        ]
      };
      if (item.questionType === '3') {
        item.answerInfos.splice(1, 1);
      } else {
        item.answerInfos.push(data);
      }
    },
    handleClick(tab) {
      this.activeName = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
.questEdit {
  &-form {
    padding-bottom: 68px;
    /deep/ .el-form-item__label {
      font-size: 15px;
      color: #464668;
    }
    .el-divider--horizontal {
      margin: 16px 0;
    }
    .form-card {
      padding: 24px;
      margin-bottom: 24px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(242, 242, 242, 0.66);
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }
    .content {

      &-ques {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .remove {
        width: 62px;
        height: 32px;
        background: url('../../../assets/questionnaire/delete-question.png')
          no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      &-num {
        font-size: 18px;
        font-weight: 500;
        color: #464668;
      }
      &-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          width: 233px;
          font-size: 16px;
          font-weight: 500;
          color: #3599fe;
          border: 1px solid #3599fe;
        }
      }
    }
  }
  &-tools {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 68px;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
    border-radius: 0px 0px 4px 4px;
    padding-right: 30px;
    &-cancel {
      margin-right: 30px;
    }
  }
}
</style>
