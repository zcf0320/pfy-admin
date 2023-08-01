<template>
  <div class="inventory-detail">
    <div v-if="!pageAuthority.includes('stockSetting')" class="img-no-auth" />
    <div v-else-if="$isEmpty(init) && $isEmpty(datalist)" class="empty-img" />
    <!--   -->
    <div v-else>
      <div class="flex-between">
        <div class="title-top content-detail">库存预设</div>
        <el-button v-if="isEdit" type="primary" @click="showDialog()"
          >调整库存</el-button
        >
      </div>
      <el-row v-if="$isNotEmpty(init)" class="flex-box box-list">
        <el-col :span="8" class="box-item yellow flex-between">
          <div>
            <div class="title">剩余服务量</div>
            <div class="number">
              {{ init.remainingStorageCount }}
            </div>
          </div>
          <div class="inventory1" />
        </el-col>
        <el-col :span="8" class="box-item red flex-between">
          <div>
            <div class="title">预警保险产品数</div>
            <div class="number">{{ init.warningCount }}</div>
          </div>
          <div class="inventory2" />
        </el-col>
        <el-col
          v-if="init.shortageStorageCount > 0"
          :span="8"
          class="box-item blue flex-between"
        >
          <div>
            <div class="title">缺货量(下季度)</div>
            <div class="number">{{ init.shortageStorageCount }}</div>
          </div>
          <div class="inventory4" />
        </el-col>
        <el-col
          v-if="init.overStorageCount > 0"
          :span="8"
          class="box-item gree flex-between"
        >
          <div>
            <div class="title">库存超出量</div>
            <div class="number">{{ init.overStorageCount }}</div>
          </div>
          <div class="inventory3" />
        </el-col>
      </el-row>
      <div class="title-top content-detail">基础数据</div>
      <el-row class="flex-box box-show mb-30">
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">保险公司量</div>
              <div class="number">
                {{ baseData.insuranceCompanyCount }}
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(1)">查看</div>
        </el-col>
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">保险产品量</div>
              <div class="number">
                {{ baseData.insuranceProductCount }}
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(2)">查看</div>
        </el-col>
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">保单量</div>
              <div class="number">
                {{ baseData.policyCount }}
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(3)">查看</div>
        </el-col>
      </el-row>
      <el-row class="flex-box box-show">
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">累计使用量</div>
              <div class="number">
                {{ baseData.cumulativeUsage }}
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(4)">查看</div>
        </el-col>
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">使用人数</div>
              <div class="number">
                {{ baseData.userCount }}
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(5)">查看</div>
        </el-col>
        <el-col :span="8" class="item-list flex-between">
          <div class="left flex-center">
            <div class="item-data">
              <div class="title">平均使用率</div>
              <div class="number">
                {{
                  baseData.avgUseRate
                    ? parseInt(Number(baseData.avgUseRate) * 100)
                    : 0
                }}%
              </div>
            </div>
          </div>
          <div class="right flex-center" @click="showDetail(6)">查看</div>
        </el-col>
      </el-row>
      <div class="title-top content-detail">库存分配</div>
      <el-table :data="dataList">
        <el-table-column label="保险信息">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div>{{ row.insuranceProductName }}</div>
              <div>{{ row.insuranceCompanyName }}</div>
              <div />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="初始配置">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div>
                保单签订量：<span>{{
                  Number(row.policySignCount).toFixed(2)
                }}</span>
              </div>
              <div>
                预设使用率：<span>{{ row.presetUseRate }}%</span>
              </div>
              <div>
                预设服务量：<span>{{ row.defaultServiceVolume }}</span>
              </div>
              <div>
                平均使用次数：<span v-if="row.avgServiceUsed">{{
                  Number(row.avgServiceUsed).toFixed(2)
                }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际数据">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div>
                实际保单量：<span>{{ row.actualPolicyAmount }}</span>
              </div>
              <div>
                已用服务量：<span>{{ row.serviceUsed }}</span>
              </div>
              <div class="flex-box">
                实际使用率：<span
                  >{{ Number(row.actualUsageRate).toFixed(2) }}%</span
                >
                <div
                  class=" ml-4"
                  :class="
                    Number(row.actualUsageRate) > Number(row.presetUseRate)
                      ? 'icon-level1'
                      : Number(row.actualUsageRate) == Number(row.presetUseRate)
                      ? 'icon-level0'
                      : 'icon-level2'
                  "
                />
              </div>
              <div>
                累计补仓量：<span
                  v-if="
                    row.remainingStorageCount || row.remainingStorageCount === 0
                  "
                  >{{ row.remainingStorageCount }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="剩余服务量">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div>
                {{ row.remainingServiceCount }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预约数据">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div>
                预计下期服务使用量：<span>{{
                  Number(row.nextPeriodServiceUseCount).toFixed(2)
                }}</span>
              </div>
              <div>
                预计下期使用率：<span
                  >{{ Number(row.nextPeriodUseRate).toFixed(2) }}%</span
                >
              </div>
              <div>
                预估保单销量：<span>{{ row.estimatedPolicySales }}</span>
              </div>
              <div />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="补仓量（下季度）">
          <template slot-scope="{ row }">
            <div class="cell-row">
              <div :class="Number(row.increaseStorageCount) > 0 ? 'large' : ''">
                {{ row.increaseStorageCount }}
              </div>
              <div />
              <div />
              <div />
            </div>
          </template>
        </el-table-column>
        <div slot="empty" class="empty-img" />
      </el-table>
    </div>
    <adjustInventory
      :id="id"
      :visible.sync="dialog.visible"
      :shortage-storage-count="init.shortageStorageCount"
      :over-storage-count="init.overStorageCount"
      @saved="list()"
    />
    <echartLineDialog :id="id" :visible.sync="dialogVisible" :type="type" />
  </div>
</template>

<script>
import adjustInventory from './adjustInventory';
import echartLineDialog from './echartLineDialog';
export default {
  name: 'InventorySetup',
  components: { adjustInventory, echartLineDialog },
  props: {
    id: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      query: {
        // pageNum: 0,
        // pageSize: 0,
        serviceInfoId: this.id
      },
      dialogVisible: false,
      formData: {},
      dataList: [{}, {}],
      init: {
        overStorageCount: null,
        remainingStorageCount: null,
        shortageStorageCount: null,
        warningCount: null
      },
      baseData: {},
      type: null
    };
  },
  computed: {
    pageAuthority() {
      // 100103 服务包
      return this.$store.state.user.pageAuthority['100102'];
    }
  },
  created() {
    this.list();
    this.getBaseData();
  },
  methods: {
    // 获取列表数据
    list: async function() {
      const query = this.$delEmptyKey(this.query);
      const res = await this.$store.dispatch('inventory/listInventory', query);
      if (res) {
        this.dataList = res.records || [];
      }
      this.initData();
    },
    /**
     * 获取详情数据
     */
    initData: async function() {
      const res = await this.$store.dispatch(
        'inventory/detailInventory',
        this.id,
      );
      if (res) {
        this.init = res.data || {};
      }
    },
    // 获取基础信息
    getBaseData: async function() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const res = await this.$store.dispatch('inventory/getBaseData', {
        year,
        month,
        serviceInfoId: this.id
      });
      if (res) {
        this.baseData = res.data || {};
      }
    },
    /**
     * 调整库存
     */
    showDialog() {
      this.dialog.visible = true;
    },
    /**
     * 查看基础信息趋势
     */
    showDetail(type) {
      this.type = type;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
.inventory-detail {
  .box-list {
    .box-item {
      padding: 24px 30px;
      width: 100%;
      height: 100px;
      border-radius: 4px;
      margin-left: 25px;
      &:first-child {
        margin-left: 0px;
      }
      .title {
        font-size: 16px;
        font-weight: 500;
        height: 22px;
        line-height: 22px;
      }
      .number {
        margin-top: 8px;
        height: 38px;
        font-size: 38px;
        font-weight: 400;
        line-height: 38px;
      }
      &.red {
        background: #ffe2e5;
        color: #f54e60;
      }
      &.yellow {
        background: #fff4de;
        color: #fea900;
      }
      &.gree {
        background: #c9f8f4;
        color: #2dcbc3;
      }
      &.blue {
        background: #e1efffff;
        color: #3599feff;
      }
    }
  }
  .box-show {
    padding: 0 4px;
    .item-list {
      margin-right: 30px;
      height: 116px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(204, 204, 204, 0.5);
      border-radius: 4px;
      &:last-child {
        margin-right: 0px;
      }
      .left {
        width: 210px;
        height: 116px;
      }
      .right {
        width: 105px;
        border-left: 1px solid #ebedf2;
        color: #464668;
        cursor: pointer;
        height: 116px;
        &:hover {
          color: #3599fe;
        }
      }
      .item-data {
        color: #464668;
        font-size: 16px;
        width: 100px;
        .number {
          font-size: 30px;
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
