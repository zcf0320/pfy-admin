<template>
  <div class="network-settings">
    <div class="item">
      <div class="title-top content-detail">
        网点设置
        <button
          v-if="edit"
          type="button"
          class="btn-save fr"
          @click="addNetwork"
        >
          新增
        </button>
      </div>
      <div class="table">
        <el-table :data="serviceSiteList">
          <el-table-column label="省" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.provName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="市" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="网点名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="网点地址">
            <template slot-scope="scope">
              <span>{{ scope.row.siteAddress || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="网点电话" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.contactMobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最多单日接待人数" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.dayMaxPerson || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提前预约天数" width="120">
            <template slot-scope="scope">
              <span>{{
                scope.row.beforeDate ? `${scope.row.beforeDate}天` : '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                v-if="edit"
                content="编辑"
                tip-class-name="icon-edit  mr-30"
                @click.native.prevent="editNetwork(scope.row)"
              />
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteNetwork(scope.row.id)"
              >
                <HoverTip
                  v-if="edit"
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getServiceSiteList"
        />
      </div>
    </div>
    <AddNetwork
      v-if="addNetworkShow"
      :is-show="addNetworkShow"
      :item="item"
      @close="closeNetworkModal"
      @save="saveNetwork"
    />
  </div>
</template>
<script>
import AddNetwork from './addNetwork';
export default {
  name: 'ServiceSite',
  components: {
    AddNetwork
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      addNetworkShow: false,
      item: {},
      serviceSiteList: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      }
    };
  },
  computed: {
    pageNum() {
      return 1;
    }
  },
  created() {
    if (this.pageNum) {
      this.getServiceSiteList({
        page: Number(this.pageNum)
      });
    } else {
      this.getServiceSiteList({});
    }
  },
  methods: {
    // 获取上门城市列表
    getServiceSiteList(pageInfo) {
      if (this.$isEmpty(this.id)) {
        return false;
      }
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      this.$store
        .dispatch('serviceItems/getServiceSiteList', {
          serviceInfoId: this.id,
          pageNum: this.pagingOptions.pageNo
        })
        .then(res => {
          this.serviceSiteList = res.records || [];
          this.pagingOptions.total = res.totalNum;
        });
    },
    // 设置网点
    addNetwork() {
      this.addNetworkShow = true;
      this.item = {};
    },
    // 编辑网点设置
    editNetwork(item) {
      this.addNetworkShow = true;
      this.item = item;
    },
    // 关闭网点设置
    closeNetworkModal() {
      this.addNetworkShow = false;
    },
    // 确定网点设置
    saveNetwork(item) {
      if (item.id) {
        // update
        this.$store
          .dispatch('serviceItems/updateServiceSite', {
            serviceInfoId: this.id,
            ...item
          })
          .then(() => {
            this.$message.success('更新成功');
            this.getServiceSiteList();
            this.closeNetworkModal();
          });
      } else {
        // add
        this.$store
          .dispatch('serviceItems/addServiceSite', {
            serviceInfoId: this.id,
            ...item
          })
          .then(() => {
            this.$message.success('新增成功');
            this.getServiceSiteList();
            this.closeNetworkModal();
          });
      }
    },
    // 删除网点设置
    deleteNetwork(id) {
      this.$confirm('此操作将删除该网点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('serviceItems/deleteServiceSite', {
            id
          })
          .then(() => {
            this.$message.success('删除成功');
            this.getServiceSiteList();
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.network-settings {
  margin-top: 12px;
  .item {
    margin-bottom: 24px;
    .item-title {
      margin-bottom: 24px;
      span {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
        margin-right: 24px;
      }
    }
  }
}
.add-button {
  margin-top: 24px;
}
</style>
