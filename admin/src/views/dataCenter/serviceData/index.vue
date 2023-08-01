<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main spacing"
      tag="main"
      :noresize="false"
    >
      <div class="sercive-data-page mb-24">
        <div class="title-top">
          服务数据
          <button type="button" class="btn-save fr" @click="uploadData">
            上传数据
          </button>
          <el-date-picker
            v-model="timeString"
            type="year"
            placeholder="年份"
            value-format="yyyy"
            :picker-options="pickerOptions"
            class="fr mr-60"
            @change="timeChange"
          />
        </div>
      </div>
      <div
        v-for="(item, index) in serviceTableList"
        :key="item.id"
        class="sercive-data-page mb-24"
      >
        <div class="title-top">
          {{ item.service_name || '-' }}
          <div class="title-serviceId">
            服务项ID：{{ item.service_id || '-' }}
          </div>
        </div>
        <Chart :service-data-list="item.list" :chart-id="'chart' + index" />
        <div class="table">
          <el-table
            v-loading="tableLoading"
            :data="item.productUseList"
            class="table-large"
          >
            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <span>{{ scope.row.product_name || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="保险公司">
              <template slot-scope="scope">
                <span>{{ scope.row.company_name || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="保障计划名称">
              <template slot-scope="scope">
                <span>{{ scope.row.plan_name || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计使用次数">
              <template slot-scope="scope">
                <span>{{ scope.row.use_count }}</span>
              </template>
            </el-table-column>
            <el-table-column label="年所占比">
              <template slot-scope="scope">
                <span>{{ percentage(scope.row.year_percentage) || '-' }}</span>
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
        </div>
      </div>
      <div class="sercive-data-page">
        <div v-if="!serviceTableList.length" class="none-service">
          <div class="none-img" />
          <div class="none-text">暂无数据</div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import Chart from './component/serviceDataChart';
import getServiceData from '@/utils/getYearServiceData';
export default {
  name: 'ServiceData',
  components: {
    Chart
  },
  data() {
    return {
      timeString: '', // 时间
      serviceTableList: [], // 表格数据
      tableLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 24 * 60 * 60 * 1000;
        }
      }
    };
  },
  computed: {
    percentage() {
      return num => {
        return (num * 100).toFixed(2) + '%';
      };
    }
  },
  created() {
    // 查询当前年份数据
    const date = new Date();
    const timeNow = date.getFullYear();
    this.timeString = timeNow.toString();
    getServiceData(timeNow).then(res => {
      this.changeServiceData(res);
    });
  },
  methods: {
    timeChange(time) {
      this.timeString = time;
      getServiceData(time).then(res => {
        this.changeServiceData(res);
      });
    },
    uploadData() {
      this.$router.push(`/dataCenter/serviceData/AddServiceData`);
    },
    // 处理返回数据
    changeServiceData(arr) {
      arr.forEach(element => {
        for (let i = 0; i <= 11; i++) {
          if (element.list[i]) {
            if (element.list[i].storage_month !== i + 1) {
              element.list.splice(i, 0, {
                storage_month: i + 1,
                use_count: 0,
                use_sum: 0
              });
            } else {
              element.list[i].use_sum = 0;
            }
          } else {
            this.$set(element.list, i, {
              storage_month: i + 1,
              use_count: 0,
              use_sum: 0
            });
          }
        }
      });
      arr.forEach(element => {
        element.list.forEach((item, index) => {
          if (index === 0) {
            item.use_sum = item.use_count;
          } else {
            item.use_sum = item.use_count + element.list[index - 1].use_sum;
          }
        });
      });
      this.serviceTableList = arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.mr-60 {
  margin-right: 60px;
  margin-top: -9px;
}
.btn-save {
  margin-top: -7px;
}
.sercive-data-page {
  background-color: #fff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  .title-serviceId {
    font-size: 14px;

    font-weight: 400;
    color: #989ab3;
    line-height: 14px;
    margin-top: 12px;
  }
  .table {
    padding: 30px;
  }
  &:last-child {
    margin-bottom: 0 !important;
  }
  .none-service {
    width: 100%;
    background-color: #fff;
    padding: 57px 0;
    margin-top: 24px;
    min-height: 670px;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    .none-img {
      width: 440px;
      height: 317px;
      margin: 0 auto;
      background-image: url('../../../assets/data-center/none-img.png');
      background-size: 100% 100%;
    }
    .none-text {
      margin-top: 30px;
      font-size: 24px;

      font-weight: 400;
      color: #6f7293;
      text-align: center;
    }
  }
}
</style>
