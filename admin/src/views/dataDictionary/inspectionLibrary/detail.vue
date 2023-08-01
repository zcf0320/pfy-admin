<template>
  <div class="inspection-detail">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="inspection-detail-title">
          套餐名称：{{ inspectionDetail.setMealName || '-' }}
        </div>
        <div class="inspection-detail-content">
          临床应用：{{ inspectionDetail.bedApply || '-' }}
        </div>
        <!-- <div class="inspection-detail-table">
                    <div class="table-head">
                        <div class="table-head-item flex1">检查项名称（别称）</div>
                        <div class="table-head-item flex2">参考值范围</div>
                        <div class="table-head-item flex1">参考值单位</div>
                        <div class="table-head-item flex1">异常状态</div>
                        <div class="table-head-item flex2">异常描述</div>
                    </div>
                    <div class="table-list" v-for="(item,index) in inspectionDetail.checkItemList" :key="`检查项目${index}`">
                        <div class="table-list-item flex1">{{item.itemName || "-"}}({{item.itemNameAbbreviation || "-"}})</div>
                        <div class="table-list-item flex2">
                            <div class="table-list-item-list">
                                <span>{{item.highLimit || "-"}}({{item.suitableForPeople || "-"}})</span>
                            </div>
                            <div class="table-list-item-list">
                                <span>{{item.lowLimit || "-"}}({{item.suitableForPeople || "-"}})</span>

                            </div>
                        </div>
                        <div class="table-list-item flex1">{{item.unit || "-"}}</div>
                        <div class="table-list-item flex1">
                            <div class="table-list-item-list">
                                <span>偏高</span>
                            </div>
                            <div class="table-list-item-list">
                                <span>偏低</span>
                            </div>
                        </div>
                        <div class="table-list-item flex2">
                            <div class="table-list-item-list">
                                <span>{{item.highDesc||"-"}}</span>
                            </div>
                            <div class="table-list-item-list">
                                <span>{{item.lowDesc||"-"}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="inspectionDetail.checkItemList&&inspectionDetail.checkItemList.length <= 0" class="empty-img"></div>
                </div> -->
        <table class="inspection-detail-table1">
          <tr class="table-head">
            <td class="table-head-item flex2">检查项名称（别称）</td>
            <td class="table-head-item flex3">参考值范围</td>
            <td class="table-head-item flex1">参考值单位</td>
            <td class="table-head-item flex1">异常状态</td>
            <td class="table-head-item flex3">异常描述</td>
          </tr>
          <template v-for="(item, index) in inspectionDetail.checkItemList">
            <tr :key="`检查项目上${index}`" class="hoverColor">
              <td rowspan="2">
                {{ item.itemName || '-' }}({{
                  item.itemNameAbbreviation || '-'
                }})
              </td>
              <td>
                {{
                  `${item.highLimit == '阳性' ? '定性指标：' : '定量指标：'}${
                    item.highLimit
                  }`
                }}(适用人群：{{ item.suitableForPeople || '-' }})
              </td>
              <td rowspan="2">{{ item.unit || '-' }}</td>
              <template v-if="item.positiveDesc">
                <td rowspan="2">阳性</td>
                <td rowspan="2">{{ item.positiveDesc || '-' }}</td>
              </template>
              <template v-else>
                <td>偏高</td>
                <td>{{ item.highDesc || '-' }}</td>
              </template>
            </tr>
            <tr :key="`检查项目下${index}`" class="table-list hoverColor">
              <td class="border-r">
                {{
                  `${item.lowLimit == '阴性' ? '定性指标：' : '定量指标：'}${
                    item.lowLimit
                  }`
                }}(适用人群：{{ item.suitableForPeople || '-' }})
              </td>
              <td v-if="!item.positiveDesc">偏低</td>
              <td v-if="!item.positiveDesc">{{ item.lowDesc || '-' }}</td>
            </tr>
          </template>
        </table>

        <div
          v-if="
            inspectionDetail.checkItemList &&
              inspectionDetail.checkItemList.length <= 0
          "
          class="empty-img"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'InspectionDetail',
  data() {
    return {
      inspectionDetail: {}
    };
  },
  created() {
    this.getChecksDetail({ setMealName: this.$route.params.id }).then(res => {
      this.inspectionDetail = res.data;
    });
  },
  methods: {
    ...mapActions('dataDictionary', ['getChecksDetail'])
  }
};
</script>

<style lang="scss" scoped>
.inspection-detail {
  &-title {
    font-size: 16px;

    font-weight: bold;
    color: #464668;
    line-height: 16px;
    padding-bottom: 24px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
  &-content {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 21px;
    padding: 24px 0;
  }
  &-table {
    .table-head {
      height: 42px;
      background: #f3f6f9;
      border-radius: 4px 4px 0px 0px;
      display: flex;
      .flex1 {
        flex: 1;
      }
      .flex2 {
        flex: 2;
      }
      &-item {
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
        line-height: 42px;
        text-align: center;
        box-shadow: 1px 0px 0px 0px #ebedf2;
        &:last-of-type {
          box-shadow: none;
        }
      }
    }
    .table-list {
      display: flex;
      box-shadow: 0px 1px 0px 0px #ebedf2;
      &-item {
        text-align: center;
        box-shadow: 1px 0px 0px 0px #ebedf2;
        font-size: 14px;

        font-weight: 400;
        color: #464668;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &:last-of-type {
          box-shadow: none;
        }
        &-list {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 1px 0px 0px #ebedf2;
          &:last-of-type {
            box-shadow: none;
          }
        }
      }
      .flex1 {
        flex: 1;
      }
      .flex2 {
        flex: 2;
      }
    }
  }
  &-table1 {
    width: 100%;
    border-collapse: collapse;
    td {
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 21px;
      padding: 10px 16px;
      box-sizing: border-box;
      text-align: center;
      box-shadow: 1px 1px 0px 0px #ebedf2;
      &:last-of-type {
        box-shadow: 0px 1px 0px 0px #ebedf2;
      }
    }
    td.border-r {
      box-shadow: 1px 1px 0px 0px #ebedf2;
    }
    .hoverColor:hover {
      background-color: #f1f8ff;
    }
    .table-head {
      height: 22px;
      background: #f3f6f9;
      border-radius: 4px 4px 0px 0px;
      .flex1 {
        width: 10%;
      }
      .flex2 {
        width: 20%;
      }
      .flex3 {
        width: 30%;
      }
      &-item {
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
        line-height: 22px;
        text-align: center;
        box-shadow: 1px 0px 0px 0px #ebedf2;
        box-sizing: border-box;
        &:last-of-type {
          box-shadow: none;
        }
      }
    }
    .table-list {
      box-shadow: 0px 1px 0px 0px #ebedf2;
    }
  }
}
</style>
