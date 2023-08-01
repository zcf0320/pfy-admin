<template>
  <div class="network-settings">
    <div class="item">
      <div class="title-top content-detail">
        上门城市
        <button
          v-if="!type || edit"
          type="button"
          class="btn-save fr"
          @click="addDoorCity"
        >
          新增
        </button>
      </div>
      <div class="table">
        <el-table :data="serviceCityList">
          <el-table-column label="省">
            <template slot-scope="scope">
              <span>{{ scope.row.provName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="市">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最少人数">
            <template slot-scope="scope">
              <span>{{ scope.row.minPerson || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提前天数">
            <template slot-scope="scope">
              <span>{{
                scope.row.beforeDate ? `${scope.row.beforeDate}天` : '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <HoverTip
                v-if="edit || !type"
                content="编辑"
                tip-class-name="icon-edit  mr-30"
                @click.native.prevent="editDoorCity(scope.row)"
              />
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteDoorCity(scope.row.id)"
              >
                <HoverTip
                  v-if="edit || !type"
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
          @pagination="getServiceCityList"
        />
      </div>
    </div>
    <AddDoorCity
      v-if="addDoorCityShow"
      :is-show="addDoorCityShow"
      :item="item"
      @close="closeAddDoorCityModal"
      @save="saveDoorCity"
    />
  </div>
</template>
<script>
import AddDoorCity from './addDoorCity';
export default {
  name: 'ServiceSite',
  components: {
    AddDoorCity
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
      addDoorCityShow: false,
      item: {},
      serviceCityList: [],
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
      this.getServiceCityList({
        page: Number(this.pageNum)
      });
    } else {
      this.getServiceCityList({});
    }
  },
  methods: {
    // 获取上门城市列表
    getServiceCityList(pageInfo) {
      if (this.$isEmpty(this.id)) {
        return false;
      }
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      this.$store
        .dispatch('serviceItems/getServiceCityList', {
          serviceInfoId: this.id,
          pageNum: this.pagingOptions.pageNo
        })
        .then(res => {
          this.serviceCityList = res.records || [];
          this.pagingOptions.total = res.totalNum;
        });
    },
    // 打开上门城市弹框
    addDoorCity() {
      this.addDoorCityShow = true;
      this.item = {};
    },
    // 关闭上门城市弹框
    closeAddDoorCityModal() {
      this.addDoorCityShow = false;
    },
    // 编辑上门城市
    editDoorCity(item) {
      this.addDoorCityShow = true;
      this.item = item;
    },
    // 确定上门城市
    saveDoorCity(item) {
      if (item.id) {
        // update
        this.$store
          .dispatch('serviceItems/updateServiceCity', {
            serviceInfoId: this.id,
            ...item
          })
          .then(res => {
            if (!res.code) {
              this.$message.success('更新成功');
              this.getServiceCityList();
              this.closeAddDoorCityModal();
            } else {
              this.$message.warning(res.comment);
            }
          });
      } else {
        // add
        this.$store
          .dispatch('serviceItems/addServiceCity', {
            serviceInfoId: this.id,
            ...item
          })
          .then(res => {
            if (!res.code) {
              this.$message.success('新增成功');
              this.getServiceCityList();
              this.closeAddDoorCityModal();
            } else {
              this.$message.warning(res.comment);
            }
          });
      }
    },
    // 删除上门城市
    deleteDoorCity(id) {
      this.$confirm('此操作将删除该上门城市, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('serviceItems/deleteServiceCity', {
            serviceInfoId: this.id,
            id
          })
          .then(() => {
            this.$message.success('删除成功');
            this.getServiceCityList();
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
