<template>
  <div>
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="tabs"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
             <div v-if="activeName === '0'" class="basisDrugsDetail-table">
              <div class="basisDrugsDetail-table-title">基础信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                     <div class="basisDrugsDetail-type">ID</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.id || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                     <div class="basisDrugsDetail-type">账号</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.mobile || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                 <div class="basisDrugsDetail-type">性别</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.sex | sexFormat }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                     <div class="basisDrugsDetail-type">年龄</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.age || '-' }}
                  </div>

                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">身高</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.height }}cm
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                   <div class="basisDrugsDetail-type">体重</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.weight  }}kg
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">是否有甲状腺疾病</div>
                  <div class="basisDrugsDetail-detail">
                    {{ userInfo.thyroidEntryFlag | medicineFormat}}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">

                </div>
              </div>
            </div>
             <div v-if="activeName === '1'">
                 <Thyroid
                 :respList="respList"
                 >
                 </Thyroid>
            </div>
             <div v-if="activeName === '2'">
              <CbtiQuestionnaireRecord
                :tableLoading="tableLoading"
                :dataList="dataList"
                :pagingOptions="pagingOptions"
              ></CbtiQuestionnaireRecord>
            </div>
             <!-- <div class="scroll-table pb-0"> -->
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { default as api } from '@/api/thyroid';
import useRecord from '@/api/useRecord';

export default {
  name: 'thyroid-detail',
  data() {
    return {
      tabs: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '甲状腺管理' },
        { value: '2', name: '测试问卷' }
      ],
      activeName: '0',
      userInfo: {},
      respList: [],
      tableLoading: false,
      dataList: [],
      pagingOptions: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      }
    };
  },
   created() {
    api
      .getThyroidDetail(this.$route.params.id)
      .then(res => {
        this.userInfo = res.data.userInfo;
        this.respList = res.data.respList;
      });
  },
  methods: {
    handleClick(val) {
      this.activeName = val;
       if (val === '2') {
        this.getQuestionList();
      }
    },
     getQuestionList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize,
        userId: this.$route.params.id,
        serviceCode: 'thyroid'
      };
      useRecord.getThyroidQuestionnaireRecord(params).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.records || [];
        this.pagingOptions.total = res.data.totalNum;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
 .basisDrugsDetail-table {

    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-item {
      min-height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 14px;
      align-items: center;
      &-l {
        height: 100%;
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
      }
      &-r {
        > span {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          line-height: 14px;
          &.wrap {
            line-height: 18px;
            white-space: normal;
            padding: 17px 0;
          }
        }
        flex: 1;
        min-height: 48px;
        display: flex;
        align-items: center;
        padding: 4px 61px;
        border-left: 1px solid #e8e8e8;
        overflow: hidden;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
        .el-form-item {
          /deep/ .el-form-item__error {
            right: 10px;
            top: 50%;
            left: auto;
            transform: translateY(-50%);
          }
        }
      }
    }
    &-content {
      border: 1px solid #e8e8e8;
      border-top: none;
      min-height: 48px;
      font-size: 14px;

      color: #545473;
      padding: 17px 24px 17px 32px;
      display: flex;
      line-height: 20px;
      align-items: flex-start;
      &-l {
        font-weight: bold;
      }
      &-c {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.open {
          word-break: break-all;
          white-space: normal;
        }
      }
      &-r {
        color: #3599fe;
        cursor: pointer;
      }
    }
    &-four {
      height: 48px;
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 48px;
      &-l,
      &-r {
        // flex: 1;
        width: 50%;
        display: flex;
        align-items: center;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
      }
      &-l {
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-type {
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-detail {
        flex: 1;
        padding: 0 61px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .el-form-item {
          margin: 0;
          /deep/ .el-form-item__error {
            right: 10px;
            left: auto;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

  }

</style>
