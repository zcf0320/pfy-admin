<template>
  <div class="statistical-report-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main relative"
        tag="main"
        :noresize="false"
      >
        <div class="statistical-report-content">
          <div class="statistical-report-top">
            <div class="top-l">
              <el-select
                v-model="type"
                placeholder="全部"
                class="width100"
                @change="typeChange"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                />
              </el-select>
            </div>
            <div class="top-c">
              <el-select
                v-model="searchName"
                class="width100"
                filterable
                remote
                placeholder="请输入关键字"
                :remote-method="remoteMethod"
                :loading="searchLoading"
              >
                <el-option
                  v-for="item in dataList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <span v-html="item.hightLable" />
                </el-option>
              </el-select>
            </div>
            <!-- <div class="top-r">
                            <el-date-picker
                            value-format="timestamp"
                            class="width100"
                            :disabled="!searchName"
                            v-model="timeList"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="{disabledDate(time) {
                        return time.getTime() > Date.now();
                        }}"
                            @change="timeChange">
                            </el-date-picker>
                        </div> -->
            <button type="button" class="btn-save" @click="search">查询</button>
          </div>
          <div class="statistical-report-main">
            <div class="main-item">
              <div class="item" @click="toNewPage(1)">
                <div class="item-img1" />
                <div class="text">保险产品</div>
              </div>
              <div class="item" @click="toNewPage(2)">
                <div class="item-img2" />
                <div class="text">保单管理</div>
              </div>
              <div class="item" @click="toNewPage(3)">
                <div class="item-img3" />
                <div class="text">保险公司</div>
              </div>
            </div>
            <div class="main-item">
              <div class="item" @click="toNewPage(4)">
                <div class="item-img4" />
                <div class="text">理赔管理</div>
              </div>
              <div class="item" @click="toNewPage(5)">
                <div class="item-img5" />
                <div class="text">服务项</div>
              </div>
              <div class="item" @click="toNewPage(6)">
                <div class="item-img6" />
                <div class="text">供应商</div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { replaceHightKeyWord } from '@/utils/common';
export default {
  name: 'StatisticalReport',
  data() {
    return {
      searchLoading: false,
      timeScope: [],
      typeList: [],
      dataList: [],
      searchName: '',
      type: '',
      timeList: [],
      startDate: '',
      endDate: ''
    };
  },
  created() {
    this.getTypeList().then(res => {
      this.typeList = res.data;
    });
  },
  methods: {
    ...mapActions('settle', ['getTypeList', 'getKeywordList']),
    timeChange() {
      this.startDate = this.timeList[0];
      this.endDate = this.timeList[1];
    },
    toNewPage(index) {
      let url = '';
      index === 1 && (url = '/insuranceManage/insuranceProducts');
      index === 2 && (url = '/policyManage/personalPolicy');
      index === 3 && (url = '/insuranceManage/insuranceCompany');
      index === 4 && (url = '/claimManagement/auditRecords');
      index === 5 && (url = '/supplyChainManage/serviceItems');
      index === 6 && (url = '/supplyChainManage/supplier');
      const routeData = this.$router.resolve({
        path: url
      });
      window.open(routeData.href, '_blank');
    },
    remoteMethod(keyword) {
      this.searchLoading = true;
      if (keyword && this.type) {
        this.getKeywordList({
          formEnum: this.type,
          searchName: keyword
        })
          .then(res => {
            this.searchLoading = false;
            res.data.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.name);
            });
            this.dataList = res.data;
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
      }
    },
    search() {
      if (!this.type) {
        this.$message.error('请选择类型！');
      } else if (!this.searchName) {
        this.$message.error('请输入关键字！');
      } else {
        let url = '';
        this.type === 'INSURANCE_PRODUCT' &&
          (url = '/settle/statisticalReport/productReport');
        this.type === 'POLICY' &&
          (url = '/settle/statisticalReport/policyReport');
        this.type === 'INSURANCE_COMPANY' &&
          (url = '/settle/statisticalReport/companyReport');
        this.type === 'SERVICE_ITEM' &&
          (url = '/settle/statisticalReport/serviceItemReport');
        this.type === 'SERVICE_TICKET' &&
          (url = '/settle/statisticalReport/serviceBillReport');
        this.type === 'SUPPLIER' &&
          (url = '/settle/statisticalReport/supplierReport');
        const query = {
          id: this.searchName,
          startDate: this.startDate,
          endDate: this.endDate
        };
        for (const key in query) {
          if (query[key] === '') {
            delete query[key];
          }
        }

        const routeData = this.$router.resolve({
          path: url,
          query
        });
        window.open(routeData.href, '_blank');
      }
    },
    typeChange() {
      this.searchName = '';
      this.dataList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.statistical-report-page {
  .statistical-report-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .statistical-report-top {
    width: 783px;
    height: 229px;
    background: url('../../assets/statisticalreport/statistical-bg.png')
      no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 63px;
    .top-l,
    .top-c,
    .top-r {
      flex: 1;
      margin-right: 24px;
      .width100 {
        width: 100%;
        /deep/ input {
          border-color: #3599fe !important;
          color: #545473;
        }
      }
    }
  }
  .statistical-report-main {
    width: 520px;
    margin: 60px auto 0;
    .main-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      &:last-of-type {
        margin-bottom: 0;
      }
      .item {
        width: 80px;
        height: 80px;
        border-radius: 3px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
        }
        .item-img1 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport1.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .item-img2 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport2.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .item-img3 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport3.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .item-img4 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport4.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .item-img5 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport5.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .item-img6 {
          width: 44px;
          height: 44px;
          margin: 10px auto 6px;
          background: url('../../assets/statisticalreport/statisticalreport6.png')
            no-repeat center center;
          background-size: 100% 100%;
        }
        .text {
          text-align: center;
          font-size: 12px;

          font-weight: 400;
          color: #464668;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
