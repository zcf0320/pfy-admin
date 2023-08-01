<template>
  <div class="child-ques">
    <el-form
    inline
    label-width="110px"
      v-for="(answerInfo, indexs) in answerInfos"
      :key="indexs"
      :ref="`answerInfo${indexs}`"
      :model="answerInfo"
    >
      <div class="content-item content-flex-center">
        <template v-if="questionType === '1'">
          <el-form-item label="选项" :rules="nextNumberRules" prop="optionId">
            <el-select
              v-model="answerInfo.optionId"
              style="width: 206px"
              :disabled="view"
            >
              <el-option
                v-for="item in setList"
                :key="item.id"
                :label="item.optionName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </template>
        <span v-if="questionType === '3'">填完后</span>
        <div class="ml-16">
          <el-form-item label="跳转" prop="jumpType" :rules="nextNumberRules">
            <el-select
              v-model="answerInfo.jumpType"
              style="width: 206px;"
              :disabled="view"
              @change="changeItem(answerInfo)"
            >
              <el-option
                v-for="item in jumpTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item
          v-if="answerInfo.jumpType === '1'"
          label="至"
          prop="nextNumber"
          :rules="nextNumberRules"
          class="child-ques-select"
        >
          <el-select
            v-model="answerInfo.nextNumber"
            style="width: 206px; margin-left: 18px"
            :disabled="view"
          >
            <el-option
              v-for="item in optionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="answerInfo.jumpType === '2'"
          label="结果"
          prop="nextNumber"
          :rules="nextNumberRules"
          class="child-ques-select"
        >
          <el-select
            v-model="answerInfo.nextNumber"
            style="width: 206px; margin-left: 30px"
            :disabled="view"
          >
            <el-option
              v-for="item in concluList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div
          v-if="
            indexs === answerInfos.length - 1 && !view && questionType === '1'
          "
          class="content-item-add"
          @click="addLine"
        />
        <template>
          <el-popconfirm
            title="删除后将不可恢复，是否删除？"
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="primary"
            cancel-button-type="plain"
            :hide-icon="true"
            @onConfirm="deleteLine(indexs)"
          >
            <div
              v-if="indexs > 1 && !view"
              slot="reference"
              class="content-item-reduce"
            />
          </el-popconfirm>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'quesInfo',
  props: {
    answerInfos: {
      type: Array,
      default: () => {
        [];
      }
    },
    chooseList: {
      type: Array,
      default: () => {
        [];
      }
    },
    setList: {
      type: Array,
      default: () => {
        [];
      }
    },
    child: {
      // 子组件index
      type: Number,
      default: 0
    },
    view: {
      type: Boolean,
      default: false
    },
    questionType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      nextNumberRules: {
        required: true,
        message: '必填项不能为空，请完善选项',
        trigger: 'change',
        type: 'string'
      },
      falseRules: {
        required: false,
        trigger: 'change'
      },
      jumpTypeList: [
        {
          value: '1',
          label: '问题'
        },
        {
          value: '2',
          label: '结论'
        }
      ],
      jumpList: [
        {
          value: '2',
          label: '结论'
        }
      ],
      concluList: [
        {
          value: '1',
          label: '可投保'
        },
        {
          value: '2',
          label: '不可投保'
        },
        {
          value: '3',
          label: '待人工核保'
        }
      ],
      optionList: []
    };
  },
  watch: {
    chooseList: {
      handler(newName) {
        this.optionList = [];
        newName.forEach((item, index) => {
          if (this.child < index) {
            this.optionList.push(item);
          }
        });
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    async getData() {
      const arr = [];
      this.answerInfos.forEach((_item, index) => {
        this.$refs[`answerInfo${index}`][0].validate(valid => {
          if (valid) {
            arr.push(Promise.resolve());
          } else {
            arr.push(Promise.reject());
          }
        });
      });
      await Promise.all(arr)
        .then(() => {
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    addLine() {
      this.answerInfos.push({ jumpType: '', nextNumber: '是', optionId: '' });
    },
    deleteLine(index) {
      this.answerInfos.splice(index, 1);
    },
    changeItem(item) {
      item.nextNumber = '';
    }
  }
};
</script>

<style lang="scss">
.child-ques {
  .el-form-item__error {
    left: 10px;
  }
  &-select {
    .el-form-item__error {
      margin-left: 20px;
    }
  }
  .content {
    &-flex-start {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
    &-flex-center {
      justify-content: flex-start;
      align-items: center;
    }
    &-title {
      font-size: 18px;
      font-weight: 700;
      color: #464668;
      margin-bottom: 18px;
    }
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
    &-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;

      span {
        white-space: nowrap;
      }
      .el-form-item {
        margin-bottom: 0;
      }
      &-add {
        width: 20px;
        height: 20px;
        background: url('../../../assets/icon_add.svg');
        background-size: contain;
        margin-left: 30px;
        cursor: pointer;
      }
      &-reduce {
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
</style>
