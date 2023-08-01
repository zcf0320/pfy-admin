<template>
  <div class="add-questionneire">
    <div class="title-top">
      问卷内容<button class="btn-save fr" @click="setQuestionnaireResult">
        设置问卷结果
      </button>
    </div>
    <el-form
      ref="baseForm"
      :disabled="putOnState"
      :model="baseForm"
      label-width="100px"
      class="baseForm"
    >
      <el-form-item
        prop="name"
        label="问卷标题："
        :rules="[
          { required: true, message: '请输入问卷标题', trigger: 'blur' },
          { max: 100, message: '长度在10个字符以内', trigger: 'blur' },
        ]"
        class="flex"
      >
        <el-input
          v-model="baseForm.name"
          maxlength="100"
          placeholder="字数限制100字以内"
        />
      </el-form-item>
      <el-form-item
        prop="secondName"
        label="问卷副标题："
        :rules="[{ max: 100, message: '长度在100个字符以内', trigger: 'blur' }]"
        class="flex"
      >
        <el-input
          v-model="baseForm.secondName"
          maxlength="100"
          placeholder="选填，不超过100个字符"
        />
      </el-form-item>
      <div
        v-for="(item, index) in baseForm.questionList"
        :key="'问题' + index"
        class="questionnaire-item"
      >
        <div class="questionnaire-name">问题{{ index + 1 }}</div>
        <div class="content-ques">
          <div class="content-ques-l">
            问题是否必填：
          </div>
          <div class="content-ques-r">
            <el-form-item
              :prop="`questionList[${index}].required`"
              :rules="[
                { required: true, message: '请选择是否必填', trigger: 'blur' },
              ]"
            >
              <el-radio-group v-model="baseForm.questionList[index].required">
                <el-radio :label="1">必填</el-radio>
                <el-radio :label="0">选填</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="content-ques">
          <div class="content-ques-l">
            <el-select
              v-model="baseForm.questionList[index].answerType"
              placeholder="全部"
              @change="typeChange(index)"
            >
              <el-option label="单选" :value="1" />
              <el-option label="多选" :value="2" />
              <el-option label="填空" :value="3" />
            </el-select>
          </div>
          <div class="content-ques-r">
            <el-form-item
              :prop="`questionList[${index}].question`"
              :rules="[
                { required: true, message: '请输入问题内容', trigger: 'blur' },
                { max: 100, message: '长度在100个字符以内', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="baseForm.questionList[index].question"
                maxlength="100"
                placeholder="请输入问题内容，不超过100字"
              />
            </el-form-item>
          </div>
        </div>
        <div class="content-ques">
          <div class="content-ques-l">
            问题备注（选填）：
          </div>
          <div class="content-ques-r">
            <el-form-item
              :prop="`questionList[${index}].remark`"
              :rules="[
                { max: 200, message: '长度在200个字符以内', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="baseForm.questionList[index].remark"
                maxlength="200"
                placeholder="不超过200个字符"
              />
            </el-form-item>
          </div>
        </div>
        <template v-if="baseForm.questionList[index].answerType !== 3">
          <div
            v-for="(ele, ids) in item.answerList"
            :key="'选项' + ids"
            class="content-ques"
          >
            <div class="content-ques-lbg">选项{{ ids + 1 }}：</div>
            <div class="content-ques-c">
              <el-form-item
                :prop="`questionList[${index}].answerList[${ids}].answer`"
                :rules="[
                  {
                    required: true,
                    message: '请输入选择内容',
                    trigger: 'blur',
                  },
                  { max: 30, message: '长度在30个字符以内', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model="baseForm.questionList[index].answerList[ids].answer"
                  maxlength="30"
                  placeholder="不超过30个字符"
                />
              </el-form-item>
            </div>
            <div class="content-ques-score">
              <div class="content-ques-score-l">
                计分：
              </div>
              <div class="content-ques-score-r">
                <el-form-item
                  :prop="`questionList[${index}].answerList[${ids}].score`"
                  :rules="[
                    { required: true, message: '请输入分值', trigger: 'blur' },
                    {
                      type: 'number',
                      message: '必须为数字值',
                      trigger: 'blur',
                    },
                    {
                      pattern: /^(0|[1-9]\d?|100)$/,
                      message: '必须在0-100之间',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.number="
                      baseForm.questionList[index].answerList[ids].score
                    "
                    maxlength="3"
                    type="number"
                    placeholder="请输入分值"
                  />
                </el-form-item>
              </div>
            </div>

            <div class="content-ques-btn">
              <el-popconfirm
                v-if="item.answerList.length > 2"
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="delAnswer(index, ids)"
              >
                <div slot="reference" class="icon-reduce" />
              </el-popconfirm>
              <div
                v-if="ids == item.answerList.length - 1"
                class="icon-add"
                @click="addAnswer(index)"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(ele, ids) in item.answerList"
            :key="'选项' + ids"
            class="content-ques"
          >
            <div class="content-ques-l">
              计分：
            </div>
            <div class="content-ques-r">
              <el-form-item
                :prop="`questionList[${index}].answerList[${ids}].score`"
                :rules="[
                  { required: true, message: '请输入分值', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值', trigger: 'blur' },
                  {
                    pattern: /^(0|[1-9]\d?|100)$/,
                    message: '必须在0-100之间',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model.number="
                    baseForm.questionList[index].answerList[ids].score
                  "
                  maxlength="3"
                  type="number"
                  placeholder="请输入分值"
                />
              </el-form-item>
            </div>
          </div>
        </template>
        <div class="content-ques">
          <div class="content-ques-l">
            题目说明（选填）：
          </div>
          <div class="content-ques-r">
            <el-form-item
              :prop="`questionList[${index}].remark`"
              :rules="[
                { max: 200, message: '长度在200个字符以内', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="baseForm.questionList[index].tip"
                type="textarea"
                maxlength="300"
                autosize
                placeholder="请输入题目结果或说明（不超过300字）"
              />
            </el-form-item>
          </div>
        </div>
        <el-popconfirm
          title="删除后将不可恢复，是否删除？"
          placement="top"
          confirm-button-text="确认"
          cancel-button-text="取消"
          confirm-button-type="plain"
          cancel-button-type="primary"
          :hide-icon="true"
          @onConfirm="delQuestion(index)"
        >
          <div slot="reference" class="del-question" />
        </el-popconfirm>
      </div>
    </el-form>
    <Dialog
      title="得分设置"
      :visible="closeClickModal"
      :width="595"
      :height="420"
      class="set-score"
      @closed="close"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="80px"
        :disabled="putOnState"
      >
        <el-form-item
          label="满分："
          :rules="[
            { required: true, message: '请输入问卷分数', trigger: 'blur' },
          ]"
          class="flex"
        >
          <el-input :value="100" disabled />
        </el-form-item>
        <div
          v-for="(item, index) in ruleForm.conclusionList"
          :key="'结论' + index"
          class="score-list"
        >
          <div class="score-range">
            <div class="score-range-name">分值范围：</div>
            <div class="score-range-input">
              <div class="score-range-input-l">
                <el-form-item
                  :prop="`conclusionList[${index}].minScore`"
                  :rules="[
                    { required: true, message: '请输入分值', trigger: 'blur' },
                    {
                      type: 'number',
                      message: '必须为数字值',
                      trigger: 'blur',
                    },
                    {
                      pattern: /^(0|[1-9]\d?|100)$/,
                      message: '必须在0-100之间',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.number="ruleForm.conclusionList[index].minScore"
                    type="number"
                    maxlength="3"
                    placeholder="输入最小分值"
                  />
                </el-form-item>
              </div>
              <div class="score-range-input-c">-</div>
              <div class="score-range-input-r">
                <el-form-item
                  :prop="`conclusionList[${index}].maxScore`"
                  :rules="[
                    { required: true, message: '请输入分值', trigger: 'blur' },
                    {
                      type: 'number',
                      message: '必须为数字值',
                      trigger: 'blur',
                    },
                    {
                      pattern: /^(0|[1-9]\d?|100)$/,
                      message: '必须在0-100之间',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.number="ruleForm.conclusionList[index].maxScore"
                    type="number"
                    maxlength="3"
                    placeholder="输入最大分值"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="score-result">
            <div class="score-result-l">结论：</div>
            <div class="score-result-c">
              <el-form-item
                :prop="`conclusionList[${index}].content`"
                :rules="[
                  { required: true, message: '请输入结论', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model="ruleForm.conclusionList[index].content"
                  placeholder="输入结论"
                />
              </el-form-item>
            </div>
            <div class="score-result-r">
              <el-popconfirm
                v-if="!(ruleForm.conclusionList.length <= 1)"
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="delResult(index)"
              >
                <div slot="reference" class="icon-reduce" />
              </el-popconfirm>

              <div
                v-if="index == ruleForm.conclusionList.length - 1"
                class="icon-add"
                @click="addResult()"
              />
            </div>
          </div>
        </div>
      </el-form>
      <div class="tip-t">示例：if：问卷结果=0-10分</div>
      <div class="tip-b">else：您的身体有恙，请及时前往医院治疗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button v-if="!putOnState" type="primary" @click="saveResult"
          >确定</el-button
        >
      </span>
    </Dialog>
    <div class="add-question-btn" @click="addQuestion">+添加问题</div>
  </div>
</template>

<script>
export default {
  name: 'SetTitle',
  props: {
    baseForm: {
      type: Object,
      default: () => ({
        name: '',
        required: '',
        questionList: [
          {
            answerList: [
              {
                answer: '',
                score: ''
              }
            ],
            answerType: 1,
            question: '',
            remark: '',
            tip: ''
          }
        ],
        secondName: ''
      })
    },
    ruleForm: {
      type: Object,
      default: () => ({
        conclusionList: [
          {
            content: '',
            maxScore: '',
            minScore: ''
          }
        ]
      })
    },
    putOnState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closeClickModal: false
    };
  },
  methods: {
    typeChange(index) {
      if (this.baseForm.questionList[index].answerType === 3) {
        this.$set(this.baseForm.questionList[index], 'answerList', [
          {
            answer: '',
            score: ''
          }
        ]);
      } else {
        if (this.baseForm.questionList[index].answerList.length <= 1) {
          this.baseForm.questionList[index].answerList.push({
            answer: '',
            score: ''
          });
        }
      }
    },
    setQuestionnaireResult() {
      this.$refs['baseForm'].validate(valid => {
        if (valid) {
          if (this.sumScore(this.baseForm) === 100) {
            this.closeClickModal = true;
          } else {
            this.$message.error('总分不等于100，请检查！');
          }
        } else {
          return false;
        }
      });
    },
    // 添加选项
    addQuestion() {
      if (this.putOnState) {
        return;
      }
      const obj = {
        answerList: [
          {
            answer: '',
            score: ''
          },
          {
            answer: '',
            score: ''
          }
        ],
        answerType: 1,
        question: '',
        remark: ''
      };
      this.baseForm.questionList.push(obj);
    },
    // 删除问题
    delQuestion(index) {
      if (this.putOnState) {
        return;
      }
      this.baseForm.questionList.splice(index, 1);
    },
    // 删除选项
    delAnswer(index, ids) {
      if (this.putOnState) {
        return;
      }
      this.baseForm.questionList[index].answerList.splice(ids, 1);
    },
    // 添加选项
    addAnswer(index) {
      if (this.putOnState) {
        return;
      }
      if (this.baseForm.questionList[index].answerList.length >= 26) {
        this.$message.error('最多26个选项！');
        return;
      }
      const obj = {
        answer: '',
        score: ''
      };
      this.baseForm.questionList[index].answerList.push(obj);
    },
    close() {
      const startArr = [];
      const endArr = [];
      this.ruleForm.conclusionList.forEach(item => {
        startArr.push(item.minScore);
        endArr.push(item.maxScore);
      });
      startArr.sort(function(x, y) {
        return x - y;
      });
      endArr.sort(function(x, y) {
        return x - y;
      });
      if (
        this.isOverlap(startArr, endArr) ||
        this.isBack(this.ruleForm.conclusionList)
      ) {
        this.ruleForm.conclusionList = [
          {
            content: '',
            maxScore: '',
            minScore: ''
          }
        ];
      }
      this.closeClickModal = false;
    },
    saveResult() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const startArr = [];
          const endArr = [];
          this.ruleForm.conclusionList.forEach(item => {
            startArr.push(item.minScore);
            endArr.push(item.maxScore);
          });
          startArr.sort(function(x, y) {
            return x - y;
          });
          endArr.sort(function(x, y) {
            return x - y;
          });
          if (
            this.isOverlap(startArr, endArr) ||
            this.isBack(this.ruleForm.conclusionList)
          ) {
            this.$message.error(
              '分数区间存在重叠，或者最大值和最小值位置反了，请检查！',
            );
          } else {
            this.closeClickModal = false;
          }
        } else {
          return false;
        }
      });
    },
    // 最小值最大值不能反过来
    isBack(arr) {
      const bol = arr.some(item => {
        if (item.minScore >= item.maxScore) {
          return true;
        } else {
          return false;
        }
      });
      return bol;
    },
    // 删除结论
    delResult(index) {
      if (this.putOnState) {
        return;
      }
      this.ruleForm.conclusionList.splice(index, 1);
    },
    // 添加结论
    addResult() {
      if (this.putOnState) {
        return;
      }
      const obj = {
        content: '',
        maxScore: '',
        minScore: ''
      };
      this.ruleForm.conclusionList.push(obj);
    },
    // 计算用户填写的选项总分
    sumScore(obj) {
      let sum = 0;
      obj.questionList.forEach(item => {
        if (item.answerType === 1) {
          sum += Math.max.apply(
            Math,
            item.answerList.map(item1 => {
              return item1.score;
            }),
          );
        }
        if (item.answerType === 2) {
          item.answerList.forEach(item2 => {
            sum += item2.score;
          });
        }
        if (item.answerType === 3) {
          sum += item.answerList[0].score;
        }
      });

      return sum;
    },
    // 判断区间是否有重叠
    /*
     * 思路: 把开始、结束分别存进两个数组，从开始的第二个元素去比较结束的第一个元素。
     *       如此循环判断，如果小于或者等于，就代表有交叉，直接跳出循环.
     */
    isOverlap(startArr, endArr) {
      let bol = false;
      for (let i = 1; i < startArr.length; i++) {
        if (startArr[i] <= endArr[i - 1]) {
          bol = true;
          break;
        }
      }
      return bol;
    },
    // 保存进入下一步
    toNext() {
      this.$refs['baseForm'].validate(valid => {
        if (valid) {
          if (this.sumScore(this.baseForm) === 100) {
            if (this.ruleForm.conclusionList[0].content !== '') {
              this.baseForm.questionList.forEach((item, index) => {
                item.sortNum = index;
              });
              const params = Object.assign({}, this.ruleForm, this.baseForm);
              this.$emit('setFirst', params);
              return;
            }
            if (this.$refs['ruleForm']) {
              this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                  this.baseForm.questionList.forEach((item, index) => {
                    item.sortNum = index;
                  });
                  const params = Object.assign(
                    {},
                    this.ruleForm,
                    this.baseForm,
                  );
                  this.$emit('setFirst', params);
                } else {
                  this.$message.error('请设置问卷结果！');
                }
              });
            } else {
              this.$message.error('请设置问卷结果！');
            }
          } else {
            this.$message.error('总分不等于100，请检查！');
          }
        }
      });
      this.$emit('setFirst', 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.add-questionneire {
  .baseForm {
    padding: 0px 1px;
  }
  .questionnaire-item {
    width: 99%;
    box-shadow: 0px 0px 4px 0px rgba(179, 179, 179, 0.5);
    border-radius: 4px;
    padding: 24px;
    position: relative;
    margin-bottom: 24px;
    .del-question {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background-image: url('../../../assets/disable.svg');
      background-size: 100% 100%;
      position: absolute;
      top: -8px;
      right: -8px;
      cursor: pointer;
    }
    .questionnaire-name {
      font-size: 14px;
      font-weight: bold;
      color: #464668;
      line-height: 16px;
      margin-bottom: 12px;
    }
    .content-ques {
      display: flex;
      &-l {
        width: 126px;
        margin-right: 24px;
        font-size: 14px;

        color: #464668;
        line-height: 36px;
      }
      &-r {
        flex: 1;
      }
      .content-ques-lbg {
        width: 150px;
        height: 36px;
        background: #f3f7ff;
        border-radius: 4px 0px 0px 4px;
        font-size: 14px;

        color: #46456b;
        line-height: 36px;
        text-align: left;
        padding-left: 18px;
      }
      .content-ques-c {
        flex: 1;
        margin-right: 24px;
      }
      .content-ques-score {
        display: flex;
        &-l {
          font-size: 14px;

          color: #46456b;
          line-height: 36px;
        }
        &-r {
          width: 121px;
        }
      }
      .content-ques-btn {
        height: 36px;
        display: flex;
        align-items: center;
        width: 100px;
        .icon-add {
          width: 20px;
          height: 20px;
          background: url('../../../assets/icon_add.svg');
          background-size: contain;
          margin-left: 30px;
          cursor: pointer;
        }
        .icon-reduce {
          width: 20px;
          height: 20px;
          margin-left: 30px;
          background: url('../../../assets/icon_reduce.png');
          background-size: contain;
          cursor: pointer;
        }
      }
    }
  }
  .add-question-btn {
    font-size: 16px;

    font-weight: bold;
    color: #3599fe;
    line-height: 16px;
    text-align: center;
    padding: 0 0 24px;
    cursor: pointer;
  }
  .set-score {
    .score-list {
      .score-range {
        display: flex;
        &-name {
          font-size: 14px;

          color: #464668;
          line-height: 36px;
          width: 80px;
        }
        &-input {
          display: flex;
          flex: 1;
          &-l,
          &-r {
            flex: 1;
          }
          &-c {
            font-size: 14px;

            color: #464668;
            line-height: 36px;
            margin: 0 10px;
          }
        }
      }
      .score-result {
        display: flex;
        &-l {
          font-size: 14px;

          color: #464668;
          line-height: 36px;
          width: 80px;
        }
        &-c {
          flex: 1;
        }
        &-r {
          height: 36px;
          display: flex;
          align-items: center;
          width: 100px;
          .icon-add {
            width: 20px;
            height: 20px;
            background: url('../../../assets/icon_add.svg');
            background-size: contain;
            margin-left: 30px;
            cursor: pointer;
          }
          .icon-reduce {
            width: 20px;
            height: 20px;
            margin-left: 30px;
            background: url('../../../assets/icon_reduce.png');
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .tip-t {
      font-size: 14px;

      font-weight: 400;
      color: #a2a3b7;
      line-height: 14px;
    }
    .tip-b {
      font-size: 14px;

      font-weight: 400;
      color: #a2a3b7;
      line-height: 14px;
      margin-left: 40px;
      margin-top: 12px;
    }
  }
}
</style>
