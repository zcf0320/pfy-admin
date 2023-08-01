<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="noti-station">
        <div class="title-top">
          消息通知
          <button
            v-if="list.length > 0"
            type="button"
            class="btn-save fr"
            @click="clearNotice"
          >
            全部已读
          </button>
        </div>
        <div class="content">
          <div class="table">
            <el-table v-loading="tableLoading" :data="list" class="table-large">
              <el-table-column
                label="标题"
                prop="title"
                show-overflow-tooltip
              />
              <el-table-column
                label="内容"
                prop="introduce"
                show-overflow-tooltip
                min-width="200"
              >
                <template slot-scope="scope">
                  <span class="link-skip" @click="goContent(scope.row)">{{
                    scope.row.introduce
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="消息类型">
                <template slot-scope="scope">
                  {{ scope.row.sysType + '-' + scope.row.sysName }}
                </template>
              </el-table-column>
              <el-table-column label="是否已读">
                <template slot-scope="scope">
                  <span :class="messageColumn[scope.row.isRead]">{{
                    messageState[scope.row.isRead]
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="发送时间">
                <template slot-scope="scope">
                  {{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <div slot="empty" class="empty-img" />
            </el-table>
            <Pagination
              :total="pagingOptions.total"
              :limit="pagingOptions.pageSize"
              :page="pagingOptions.pageNo"
              layout="total, prev, pager, next"
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { messageState, messageColumn } from '@/utils/enum';
import { readAllNotice } from '@/api/system';
export default {
  name: 'personalNews',
  data() {
    return {
      filter: {
        diseaseName: '',
        diseaseCode: '',
        departmentName: '',
        label: ''
      },
      tableLoading: false,
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      list: [],
      messageColumn,
      messageState
    };
  },
  created() {
    this.getList({
      page: 1,
      configId:
        this.$route.params.configId === 'null'
          ? ''
          : this.$route.params.configId
    });
  },
  methods: {
    getList(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        employeeId: this.$route.params.id,
        configId: pageInfo.configId,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      this.tableLoading = true;
      this.$store
        .dispatch('notification/getAll', params)
        .then(res => {
          this.list = res.records || [];
          this.pagingOptions.total = res.totalNum || 0;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    goContent(item) {
      const { contentId } = item;
      if (item.sysId === 68) {
        // 内部公告,
        this.$router.push({
          path: `/operateManage/contentManage/details/${item.contentId}/0/null`
        });
      } else if (item.sysId === 3001) {
        // 库存预警
        this.$store
          .dispatch('contentManage/getDetails', {
            id: contentId,
            userName: localStorage.getItem('username')
          })
          .then(res => {
            const { content } = res.data;
            this.$router.push(
              `/supplyChainManage/serviceItems/details/${content}/edit/7`,
            );
          });
      } else if (item.sysId === 3002) {
        // 结算通知
        // 42理赔 43保单
        this.$store
          .dispatch('contentManage/getDetails', {
            id: contentId,
            userName: localStorage.getItem('username')
          })
          .then(res => {
            const { content } = res.data;
            if (item.templateId === 42) {
              this.$router.push({
                path: `/financial-center/claim-settlement/detail/${content}`
              });
            } else if (item.templateId === 41) {
              this.$router.push({
                path: `/financial-center/service-item-settlement/detail/${content}`
              });
            } else {
              this.$router.push({
                path: `/financial-center/policy-settlement/detail/${content}`
              });
            }
          });
      } else if (item.sysId === 204) {
        // 药品管理
        this.$router.push({
          path: `/drugManage/goods-details/${item.content}/false`
        });
      } else if (item.sysId === 205) {
        // 证件管理
        if (item.templateId === 61) {
          // 61供应商 71企业
          this.$router.push({
            path: `/supplyChainManage/supplier/details/${item.contentId}/edit`
          });
        } else {
          this.$router.push({
            path: `/projectManage/customer/detail/${item.contentId}/edit`
          });
        }
      } else if (item.sysId === 206) {
        // 合同管理
        this.$router.push({
          path: `/legal-affairs-center/contract-manage/detail/${item.content}`
        });
      } else if (item.sysId === 201) {
        // 人工问诊
        return false;
      } else {
        return false;
      }
    },
    clearNotice() {
      readAllNotice().then(() => {
        this.$message.success('全部已读成功');
        this.getList({
          page: 1,
          configId:
            this.$route.params.configId === 'null'
              ? ''
              : this.$route.params.configId
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.noti-station {
  .title-top {
    justify-content: space-between;
    align-items: center;
  }
  .read-all {
    font-size: 16px;

    font-weight: 400;
    color: #3599fe;
    cursor: pointer;
    user-select: none;
  }
}
</style>
