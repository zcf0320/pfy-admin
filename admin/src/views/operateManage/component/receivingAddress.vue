<template>
  <div>
    <el-table v-loading="loading" :data="dataList" class="table-large">
      <el-table-column label="收货人" width="160">
        <template slot-scope="{ row }">
          <div class="flex-box">
            <span>{{ row.name }}</span>
            <!--  -->
            <span v-if="row.isDefault" class="default-address">默认</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区" width="180" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.province }} </span>
          <span>{{ row.city }} </span>
          <span>{{ row.district }} </span>
        </template>
      </el-table-column>
      <el-table-column label="详细地址" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.address }} </span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="140" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | timeFormat('yyyy-MM-dd') }} </span>
        </template>
      </el-table-column>
      <div slot="empty" class="empty-img"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'receivingAddress',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      dataList: []
    };
  },
  computed: {},
  created() {
    this.list();
  },
  methods: {
    list() {
      this.loading = true;
      this.$store
        .dispatch('userManage/getReceivingAddress', { userId: this.id })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.default-address {
  width: 43px;
  height: 24px;
  background: #e1f1ff;
  border-radius: 4px;
  line-height: 24px;
  color: #3599feff;
  margin-left: 20px;
  text-align: center;
}
</style>
