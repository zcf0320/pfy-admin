<template>
  <div class="drugType">
     <div class="drugTypeDetails-table">
           <div class="tip">为用户设置可选择的药品分类</div>
    <el-table
      ref="dataTable"
      v-loading="tableLoading"
      :data="tableData"
      class="drug-type-table"
      :row-style="{ borderLeft: '1px solid #dfe6ec' }"
      :cell-style="cellStyle"
      :header-row-style="{
        borderBottom: '1px solid #dfe6ec',
        background: '#fff',
      }"
      :header-cell-style="{
        background: '#fff',
        borderBottom: '1px solid #E8E8E8',
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column  width="70" type="selection" :selectable="selectable" />
      <el-table-column label="药品分类">
        <template slot-scope="scope">
          <div class="table-maintext">
            <div class="table-maintext-c">{{ scope.row.classifyName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="药品清单">
        <template slot-scope="scope">
          <div class="table-maintext">
            <template v-for="(item, index) in scope.row.medicineClassifies">
              <el-tooltip :key="index" effect="dark" placement="top">
                <div slot="content">
                  {{ item.name || '-' }}&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ item.specifications || '-' }}&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ item.manufacturer || '-' }}
                </div>
                <div class="table-item">
                  <div v-if="item.medicineFlag" class="rx">处方内药品</div>
                  <div v-if="item.isUsed" class="once">曾</div>
                  <div v-if="item.isAllergy" class="allergy">敏</div>
                  {{ item.name || '-' }}&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ item.specifications || '-' }}&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ item.manufacturer || '-' }}
                </div>
              </el-tooltip>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="销售状态" width="100">
        <template slot-scope="scope">
          <div class="table-maintext">
            <div
              v-for="(item, index) in scope.row.medicineClassifies"
              :key="`销售状态${index}`"
              class="table-item padding-7-16"
            >
              <div :class="`${item.saleState ? 'ingshop' : 'stopshop'}`">
                {{ item.saleState ? '在售' : '停售' }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="权益疾病">
        <template slot-scope="scope">
          <div class="table-maintext">
            <template v-for="(item, index) in scope.row.medicineClassifies">
              <el-tooltip :key="index" effect="dark" placement="top">
                <div slot="content">
                  {{ item.diseaseNames || '-' }}
                </div>
                <div class="table-item">
                  {{ item.diseaseNames || '-' }}
                </div>
              </el-tooltip>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div class="flex padd-16">
            <div
              v-if="scope.$index !== 0"
              :class="{ move_up: true, icon: true }"
              @click="upLayer(scope.$index, scope.row)"
            />
            <div
              v-if="scope.$index !== tableData.length - 1"
              :class="{
                move_down: true,
                icon: true,
              }"
              @click="downLayer(scope.$index, scope.row)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <button type="button" class="btn-save fr" @click="save">
      {{ !isEdit ? '修改' : '保存' }}
    </button>
     </div>
  </div>
</template>

<script>
export default {
  name: 'drugType',
  data() {
    return {
      tableData: [],
      isEdit: false,
      ids: [],
      tableLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    cellStyle(obj) {
      if (obj.columnIndex === 5) {
        return { borderLeft: '1px solid #F3F6F9' };
      } else {
        return { borderRight: '1px solid #F3F6F9' };
      }
    },
    upLayer(index, row) {
      this.move(row.id, 'UP', index);
    },
    downLayer(index, row) {
      this.move(row.id, 'DOWN', index);
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    selectable() {
      return this.isEdit ? true : false;
    },
    save() {
      this.isEdit && this.submit();
      this.isEdit = !this.isEdit;
    },
    submit() {
      const ids = this.ids.map(item => {
        return item.id;
      });
      this.$store
        .dispatch('auditRecords/classifySelected', {
          claimRecordId: this.$route.params.id,
          ids
        })
        .then(() => {
          this.isEdit = !this.isEdit;
          this.getList();
          this.$message.success('保存成功');
        });
    },
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch('auditRecords/classify', this.$route.params.id)
        .then(res => {
          this.tableLoading = false;
          this.tableData = res.data;
          this.$nextTick(() => {
            this.tableData.forEach(row => {
              if (row.selected) {
                this.$refs.dataTable.toggleRowSelection(row, true);
              }
            });
          });
        });
    },
    move(id, direction, index) {
      this.$store
        .dispatch('auditRecords/classifyMove', {
          medicineClassifyId: id,
          direction
        })
        .then(res => {
          if (res.statusCode === 0) {
            if (direction === 'DOWN') {
              const downDate = this.tableData[index + 1];
              this.tableData.splice(index + 1, 1);
              this.tableData.splice(index, 0, downDate);
            } else {
              const upDate = this.tableData[index - 1];
              this.tableData.splice(index - 1, 1);
              this.tableData.splice(index, 0, upDate);
            }
          }
          this.getList();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.drugType {
  padding-bottom: 200px;
  .drugTypeDetails-table{
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
  }
  /deep/ .el-checkbox {
    padding-left: 10px;
  }
  .padd-16 {
    padding: 0 16px;
  }
  .move_up {
    background: url('../../../../assets/move_up.png');
    background-size: 100% 100%;
    margin-right: 30px;
  }
  .move_down {
    background: url('../../../../assets/move_down.png');
    background-size: 100% 100%;
  }
  .icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .disable {
    cursor: not-allowed;
  }
  .btn-save {
    margin-top: 64px;
  }
  .rx {
    width: 95px;
    height: 20px;
    float: left;
    margin-top: -3px;
    background: #e1f1ff;
    border-radius: 2px;
    border: 1px solid #3599fe;
    line-height: 20px;
    text-align: center;
    color: #3599fe;
    margin-right: 10px;
  }
  .once {
    float: left;
    font-size: 14px;

    font-weight: 400;
    color: #18c4bd;
    line-height: 14px;
    width: 29px;
    height: 20px;
    background: #c9f7f4;
    border-radius: 2px;
    border: 1px solid #18c4bd;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
    margin-top: -3px;
  }
  .allergy {
    float: left;
    font-size: 14px;

    font-weight: 400;
    color: #f64e60;
    line-height: 14px;
    width: 29px;
    height: 20px;
    background: #ffe2e5;
    border-radius: 2px;
    border: 1px solid #f64e60;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
    margin-top: -3px;
  }
  .tip {
    width: 100%;
    height: 48px;
    background: #f3f6f9;
    line-height: 48px;
    position: relative;
    padding-left: 32px;
    font-size: 16px;
    font-weight: bold;
    color: #545473;
    border-bottom: 1px solid #e8e8e8;
    &::before {
      width: 4px;
      height: 16px;
      background: #3599fe;
      position: absolute;
      left: 16px;
      top: 15px;
      content: '';
    }
  }
  .drug-name {
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 0;
    &:last-child {
      border-bottom: 0;
    }
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /deep/.el-table td .cell {
    padding: 0;
  }
  /deep/.el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #dfe6ec;
  }
  .table-maintext {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    &-c {
      padding: 16px;
      box-sizing: border-box;
    }
    .table-item {
      border-bottom: 1px solid #dfe6ec;
      padding: 12px 16px;
      &:last-of-type {
        border-bottom: none;
      }
      &.padding-7-16 {
        padding: 7px 16px;
      }
    }
  }
}
.ingshop {
  font-size: 14px;

  font-weight: 400;
  color: #18c4bd;
  line-height: 24px;
  text-align: center;
  width: 59px;
  height: 24px;
  background: #c9f7f4;
  border-radius: 4px;
}
.stopshop {
  font-size: 14px;

  font-weight: 400;
  color: #f64e60;
  line-height: 24px;
  text-align: center;
  width: 59px;
  height: 24px;
  background: #ffe2e5;
  border-radius: 4px;
}
</style>
