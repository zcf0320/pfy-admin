<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="filter-form">
        <div class="title-top">
          应用设置<el-button
            type="primary"
            class="fr"
            @click="lookDetails(0, 'add')"
            >新建服务设置</el-button
          >
        </div>
        <div class="filter-box">
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">服务名称:</span>
                <el-input
                  v-model="filter.name"
                  placeholder="请输入服务名称"
                  class="search-input"
                />
              </div>
              <div class="form-item">
                <span class="label-name">更新时间:</span>
                <el-date-picker
                  v-model="filterTime"
                  type="daterange"
                  value-format="timestamp"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="search-input"
                  @change="changeTime"
                />
              </div>
            </div>
            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search mr-30"
                @click.native.prevent="search"
              />
              <HoverTip
                content="清除查询条件"
                tip-class-name="icon-reset"
                @click.native.prevent="clearFilter"
              />
            </div>
          </div>
        </div>
      </div>
      <el-table v-loading="loading" :data="dataList" class="table-large">
        <el-table-column label="服务名称" show-overflow-tooltip prop="name" />
        <!-- <el-table-column label="是否反馈服务结果(图片形式)">
          <template slot-scope="{ row }">
            <span>{{ row.isWriteAppeal ? "是" : "否" }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="创建时间">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | timeFormat('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <HoverTip
              content="查看"
              tip-class-name="icon-detail"
              class="mr-30"
              @click.native.prevent="lookDetails(scope.row.id, 'detail')"
            />
            <HoverTip
              content="编辑"
              tip-class-name="icon-edit"
              class="mr-30"
              @click.native.prevent="lookDetails(scope.row.id, 'edit')"
            />
            <el-popconfirm
              title="删除后将不可恢复，是否删除？"
              placement="top"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirm-button-type="plain"
              cancel-button-type="primary"
              :hide-icon="true"
              @onConfirm="deleteItem(scope.row.id)"
            >
              <HoverTip
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
        v-if="query.total > 10"
        :total="query.total"
        :limit="query.pageSize"
        :page.sync="query.pageNum"
        layout="total, prev, pager, next"
        @pagination="list"
      />
    </el-scrollbar>
  </el-container>
</template>

<script>
export default {
  name: 'AuditMaterials',
  data() {
    return {
      query: {
        // total: 0,
        pageSize: 10,
        pageNum: 1
      },
      dataList: [],
      loading: false,
      filter: {
        name: '',
        startTime: '',
        endTime: ''
      },
      filterTime: ''
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.query.pageNum = this.pageNum || 1;
    this.list();
  },
  methods: {
    /**
     * 获取列表数据
     */
    list() {
      this.loading = true;
      const params = Object.assign({}, this.filter, this.query);
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      this.$store
        .dispatch('secondaryTreatment/listTreatment', params)
        .then(res => {
          this.loading = false;
          this.dataList = res.records || [];
          //   this.query.total = res.totalNum || 0
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 查看详情
     */
    lookDetails(id, type) {
        if (id === 0) {
            this.$router.push(
        `/secondaryTreatment/auditMaterials/add/0/add`,
      );
        } else {
 if (type === 'detail') {
  this.$router.push(
        `/secondaryTreatment/auditMaterials/detail/${id}/${type}`,
      );
        } else {
              this.$router.push(
        `/secondaryTreatment/auditMaterials/edit/${id}/${type}`,
      );
        }
        }
    },
    search() {
      this.query.pageNum = 1;
      this.list();
    },
    clearFilter() {
      this.filter = {
        startTime: '',
        name: '',
        endTime: ''
      };
      this.filterTime = [];
      this.search();
    },
    deleteItem(id) {
      this.$store
        .dispatch('secondaryTreatment/deleteSecondaryTreatment', id)
        .then(() => {
          this.$message.success('删除成功');
          this.list();
        });
    },
    changeTime(val) {
      if (val) {
        this.filter.startTime = val[0];
        this.filter.endTime = val[1];
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
