<template>
  <div>
    <div class="title-top flex-box">
      用户须知文件
      <span
v-if="!disabled"
class="fc-blue fs-14 addItem"
@click="addItem"
>添加</span>
    </div>
    <el-table :data="selectDataList" border>
      <el-table-column label="类型" width="250">
        <template slot-scope="{ row }">
          <div class="pd-4">
            <el-select
              v-model="row.tempKey"
              placeholder="全部"
              :disabled="disabled"
              @change="setRow"
            >
              <el-option
                v-for="item in getDataList(row.key)"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户端名称">
        <template slot-scope="{ row }">
          <div class="flex-box">
            <span>
              {{ data[row.value] }}
            </span>
            <el-progress
              v-if="row.percentage > 0"
              class="progress"
              :percentage="row.percentage"
              :status="row.error ? 'exception' : 'success'"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <!-- -->
        <template slot-scope="{ row, $index }">
          <div v-if="!disabled">
            <ImgUpload
              v-model="data[row.key]"
              :loading.sync="loading"
              :accept="'.pdf'"
              @start="
                () => {
                  startChange(row);
                }
              "
              @error="
                () => {
                  handlerErr(row);
                }
              "
              @change="
                val => {
                  imgUploadChange(val, row.value);
                }
              "
            >
              <span
                v-if="$isEmpty(data[row.key]) && $isNotEmpty(row.key)"
                class="fl upload-text"
                >选择文件</span>
              <span
                v-if="$isNotEmpty(data[row.key]) && $isNotEmpty(row.key)"
                class="fl upload-text"
                @change="
                  val => {
                    imgUploadChange(val, row.value);
                  }
                "
                >重新上传</span>
            </ImgUpload>
            <span
              v-if="$isNotEmpty(row.key)"
              class="ml-24 fl upload-text fc-blue"
              @click="delItem(row, $index)"
              >删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FileUploadList',
  props: {
    value: Boolean,
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: this.value,
      timetId: null,
      dataList: [
        {
          name: '投保须知',
          value: 'insuranceInstructionPdfName',
          key: 'insuranceInstruction',
          percentage: 0,
          error: false,
          tempKey: 'insuranceInstruction'
        },
        {
          name: '隐私政策',
          value: 'privacyPolicyPdfName',
          key: 'privacyPolicy',
          percentage: 0,
          error: false,
          tempKey: 'privacyPolicy'
        },

        {
          name: '保险条款',
          value: 'insuranceClausePdfName',
          key: 'insuranceClause',
          percentage: 0,
          error: false,
          tempKey: 'insuranceClause'
        },

        {
          name: '责任免除',
          value: 'liabilityExemptionPdfName',
          key: 'liabilityExemption',
          percentage: 0,
          error: false,
          tempKey: 'liabilityExemption'
        },

        {
          name: '投保声明',
          value: 'insuranceStatementPdfName',
          key: 'insuranceStatement',
          percentage: 0,
          error: false,
          tempKey: 'insuranceStatement'
        },
        {
          name: '保单样本',
          value: 'samplePolicyPdfName',
          key: 'samplePolicy',
          percentage: 0,
          error: false,
          tempKey: 'samplePolicy'
        },
        {
          name: '客户告知书',
          value: 'customerNoticePdfName',
          key: 'customerNotice',
          percentage: 0,
          error: false,
          tempKey: 'customerNotice'
        },
        {
          name: '费率表',
          value: 'rateTablePdfName',
          key: 'rateTable',
          percentage: 0,
          error: false,
          tempKey: 'rateTable'
        }
      ],
      selectDataList: []
    };
  },
  watch: {
    loading(val) {
      this.$emit('input', val);
    }
  },
  created() {
    this.selectDataList = [];
    this.dataList.forEach(item => {
      if (this.$isNotEmpty(this.data[item.key])) {
        item.percentage = 100;
        this.selectDataList.push(item);
      }
    });
    if (this.$isEmpty(this.selectDataList)) {
      this.selectDataList.push({
        name: '',
        value: '',
        key: '',
        percentage: 0,
        error: false,
        tempKey: ''
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timetId);
  },
  methods: {
    // 获取下拉框数据
    getDataList(key) {
      const arr = [];
      this.dataList.forEach(item => {
        const index = this.selectDataList.findIndex(
          dataItem => dataItem.key === item.key
        );
        if (item.key === key || index === -1) {
          arr.push(item);
        }
      });
      return arr;
    },
    // 添加下拉框
    addItem() {
      this.selectDataList.push({
        name: '',
        value: '',
        key: '',
        percentage: 0,
        tempKey: ''
      });
    },
    // 删除行数据
    delItem(row, index) {
      const vm = this;
      vm.$confirm('删除后将不可恢复，是否删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectDataList.splice(index, 1);
        this.data[row.value] = null;
        this.data[row.key] = null;
      });
    },
    // 文件上传问题修复
    imgUploadChange(val, key) {
      this.data[key] = val.name;
    },
    // 文件类型变更
    setRow(val) {
      const item = this.dataList.find(item => item.key === val);
      const index = this.selectDataList.findIndex(item => item.tempKey === val);
      const row = this.selectDataList[index];
      if (row) {
        const temp = this.$extends({}, row);
        // 清空上次上传的文件
        if (this.$isNotEmpty(temp.key)) {
          this.data[row.key] = null;
          this.data[row.value] = null;
        }
        // 同步行内数据
        row.name = item.name;
        row.value = item.value;
        row.key = item.key;
        row.percentage = 0;
        row.error = false;
      }
    },
    // 上传开始
    startChange(row) {
      row.percentage = 0;
      row.error = false;
      this.data[row.value] = null;
      this.timetId = setInterval(() => {
        if (row.percentage >= 100) {
          row.percentage = 100;
          clearInterval(this.timetId);
          return;
        }
        row.percentage += 20;
      }, 100);
    },
    // 处理报错问题
    handlerErr(row) {
      row.error = true;
      clearInterval(this.timetId);
    }
  }
};
</script>

<style scoped lang="scss">
.progress {
  flex: 1;
  margin-left: 24px;
}
.addItem {
  font-weight: normal;
  margin-left: 14px;
  cursor: pointer;
}
</style>
