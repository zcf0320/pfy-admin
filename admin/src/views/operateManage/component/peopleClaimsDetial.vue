<template>
  <div class="people-claims-detial">
    <el-container>
      <el-scrollbar
        v-loading="showLoading"
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="basisDrugsDetail-table">
          <div class="basisDrugsDetail-table-title">检验检查报告</div>
          <div
            v-for="(item, index) in checkList"
            :key="`检验检查报告${index}`"
            class="basisDrugsDetail-table-item"
          >
            <div class="basisDrugsDetail-table-item-l">
              {{ item.checkName || '-' }}
            </div>
            <div class="basisDrugsDetail-table-item-r">
              <span>{{
                item.status ? '检查结果无异常' : '检查结果有异常'
              }}</span>
              <span
                v-if="item.status"
                class="look"
                @click="lookDetail(item.status, item.id, item.checkName)"
                >查看详情</span
              >
            </div>
          </div>
          <div class="basisDrugsDetail-table-item">
            <div class="basisDrugsDetail-table-item-l">附件信息</div>
            <div class="basisDrugsDetail-table-item-r padd-17">
              <div class="leaving-message-imgs">
                <div
                  v-for="(item1, index) in checkImageList"
                  :key="`附件信息${index}`"
                  class="leaving-message-imgs-item"
                >
                  <el-image :src="item1" :preview-src-list="[item1]" />
                </div>
                <div
                  v-if="checkImageList && checkImageList.length <= 0"
                  class="no-img"
                >
                  -
                </div>
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-title">用药清单</div>
          <div class="basisDrugsDetail-table-item">
            <div class="basisDrugsDetail-table-item-l">药品名称</div>
            <div class="basisDrugsDetail-table-item-r tabs">
              <div class="tabs-item">规格</div>
              <div class="tabs-item">数量</div>
              <div class="tabs-item">频次</div>
              <div class="tabs-item">单次剂量</div>
              <div class="tabs-item">用法</div>
            </div>
          </div>
          <div
            v-for="(item, index) in baseDrugVOList"
            :key="`用药清单${index}`"
            class="basisDrugsDetail-table-item"
          >
            <div class="basisDrugsDetail-table-item-l">
              {{ item.drugName || '-' }}
            </div>
            <div class="basisDrugsDetail-table-item-r tabs">
              <div class="tabs-item">{{ item.drugSpecifications || '-' }}</div>
              <div class="tabs-item">{{ item.prescribeNumber || '-' }}</div>
              <div class="tabs-item">{{ item.frequency || '-' }}</div>
              <div class="tabs-item">{{ item.unitDose || '-' }}</div>
              <div class="tabs-item">{{ item.useWay || '-' }}</div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-item">
            <div class="basisDrugsDetail-table-item-l">附件信息</div>
            <div class="basisDrugsDetail-table-item-r padd-17">
              <div class="leaving-message-imgs">
                <div
                  v-for="(item1, index) in drugImageList"
                  :key="`附件信息${index}`"
                  class="leaving-message-imgs-item"
                >
                  <el-image :src="item1" :preview-src-list="[item1]" />
                </div>
                <div
                  v-if="drugImageList && drugImageList.length <= 0"
                  class="no-img"
                >
                  -
                </div>
              </div>
            </div>
          </div>
          <Dialog
            :title="checkName"
            :visible="showModal"
            :height="400"
            :width="883"
            @closed="close"
          >
            <el-table
              v-loading="checkTableLoading"
              :data="checkDetailList"
              class="table-large"
            >
              <el-table-column label="检查项目">
                <template slot-scope="scope">
                  <span>{{ scope.row.itemName || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="缩写">
                <template slot-scope="scope">
                  <span>{{ scope.row.itemNameAbbreviation || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="结果">
                <template slot-scope="scope">
                  <span>{{ scope.row.actualValue || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位">
                <template slot-scope="scope">
                  <span>{{ scope.row.unit || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参考值">
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.lowLimit || '-' }} - {{
                      scope.row.highLimit || '-'
                    }}</span
                  >
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="showModal = false"
                >确定</el-button
              >
            </span>
          </Dialog>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'PeopleClaimsDetial',
  data() {
    return {
      showLoading: true,
      baseDrugVOList: [],
      checkImageList: [],
      checkList: [],
      drugImageList: [],
      checkDetailList: [],
      showModal: false,
      checkTableLoading: false,
      checkName: ''
    };
  },
  created() {
    this.getMedicalRecordDetail(this.$route.params.id).then(res => {
      this.baseDrugVOList = res.data.baseDrugVOList || [];
      this.checkImageList = res.data.checkImageList || [];
      this.checkList = res.data.checkList || [];
      this.drugImageList = res.data.drugImageList || [];
      this.showLoading = false;
    });
  },
  methods: {
    ...mapActions('userManage', ['getMedicalRecordDetail', 'getCheckDetail']),
    close() {
      this.showModal = false;
    },
    lookDetail(stutas, id, name) {
      if (stutas) {
        this.checkTableLoading = true;
        this.showModal = true;
        this.checkName = name;
        this.getCheckDetail(id).then(res => {
          this.checkDetailList = res.data;
          this.checkTableLoading = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.people-claims-detial {
  .basisDrugsDetail-table {
    box-shadow: 0px 0px 2px 2px #e8e8e8;
    margin-bottom: 20px;
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
          width: calc(100% - 56px);
          line-height: 14px;
          &.wrap {
            line-height: 18px;
            white-space: normal;
            padding: 17px 0;
          }
        }
        span.look {
          font-size: 14px;

          font-weight: 400;
          color: #3599fe;
          line-height: 14px;
          width: 56px;
          cursor: pointer;
        }
        .tabs-item {
          flex: 1;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 15px;
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

        .leaving-message-imgs {
          display: flex;
          flex-wrap: wrap;
          &-item {
            width: 107px;
            height: 107px;
            background: #e8e8e8;
            border-radius: 4px;
            margin-right: 24px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .padd-17 {
        padding: 17px 61px 0;
      }
    }
  }
}
</style>
