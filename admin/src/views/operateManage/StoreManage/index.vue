<template>
  <div class="store-manage">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            门店管理<button
              type="button"
              class="btn-save fr"
              @click="openDialog('add')"
            >
              新增
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.serialNumber"
                    placeholder="请输入ID"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">药房名称:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入药房名称"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">门店地址:</span>
                  <el-input
                    v-model="filter.address"
                    placeholder="请输入门店地址"
                    class="search-input"
                    @keyup.enter.native="loadData({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="loadData({ page: 1 })"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                 <div class="form-item">
                  <span class="label-name">门店状态:</span>
                  <el-select
                    v-model="filter.status"
                    placeholder="全部"
                    @change="loadData({ page: 1 })"
                  >
                    <el-option label="关闭" value="0" />
                    <el-option label="正常" value="1" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="list" class="table-large">
          <el-table-column label="ID" prop="serialNumber" />

          <el-table-column label="药房名称" prop="name" />

          <el-table-column label="门店地址">
            <template slot-scope="scope">
              {{ scope.row.region }} - {{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="160">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="门店状态" width="130">
            <template slot-scope="scope">
              <span>{{
                scope.row.status && scope.row.status === 1 ? '正常' : '关闭'
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail"
                class="mr-30"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="loadData"
        />
      </el-scrollbar>
    </el-container>
    <Dialog
      :title="toptitle"
      :visible.sync="dialogVisible"
      :height="460"
      :width="626"
      @closed="onClose"
    >
      <el-form
        inline
        ref="ruleForm"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="门店名称" prop="name">
          <el-input
            style="width:250px"
            v-model="ruleForm.name"
            placeholder="请输入门店名称"
          />
        </el-form-item>
        <el-form-item label="门店电话" prop="mobile">
          <el-input
            style="width:250px"
            v-model="ruleForm.mobile"
            filterable
            placeholder="请输入门店电话"
          />
        </el-form-item>
        <el-form-item label="所属区域" prop="location">
          <el-cascader
            style="width:450px"
            v-model="ruleForm.location"
            :options="options"
            :props="optionProps"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-input
            style="width:450px"
            v-model="ruleForm.address"
            placeholder="请输入门店地址"
          />
        </el-form-item>
        <el-form-item label="门店状态">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="divider"></div>
        <div class="date-select">
          <div>
            <el-form-item label="营业时间：" prop="businessDateType">
              <el-select
                class="select-business-date"
                v-model="ruleForm.businessDateType"
                placeholder="全部"
                @change="changeBusinessDate"
              >
                <el-option label="周一至周五" value="1" />
                <el-option label="周一至周六" value="2" />
                <el-option label="周日至周五" value="3" />
                <el-option label="其他" value="4" />
              </el-select>
            </el-form-item>
          </div>
          <div class="time-select">
            <el-form-item prop="businessBeginTime">
              <el-time-select
                style="width:140px"
                placeholder="起始时间"
                v-model="ruleForm.businessBeginTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30',
                }"
              >
              </el-time-select>
            </el-form-item>
          </div>
          <div class="time-select">
            <el-form-item prop="businessEndTime">
              <el-time-select
                style="width:140px"
                placeholder="结束时间"
                v-model="ruleForm.businessEndTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30',
                  minTime: ruleForm.businessBeginTime,
                }"
              >
              </el-time-select>
            </el-form-item>
          </div>
        </div>
        <div v-if="showWeek" style="display:flex;justify-content: flex-end;">
          <el-checkbox-group v-model="checkList" style="display:flex">
            <el-checkbox label="周一"></el-checkbox>
            <el-checkbox label="周二"></el-checkbox>
            <el-checkbox label="周三"></el-checkbox>
            <el-checkbox label="周四"></el-checkbox>
            <el-checkbox label="周五"></el-checkbox>
            <el-checkbox label="周六"></el-checkbox>
            <el-checkbox label="周日"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveStore"
          >确 定</el-button
        >
      </span>
    </Dialog>
  </div>
</template>
<script>
import {
  getStoreList,
  updateStore,
  getStoreDetail
} from '@/api/operateManageDashboard';
export default {
  name: 'StoreManage',
  data() {
    return {
      toptitle: '',
      filter: {
        name: '',
        serialNumber: '',
        address: '',
        status: ''
      },
      list: [],
      tableLoading: false,
      pageCodeList: [],
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      dialogVisible: false,
      edit: false,
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'citys'
      },
      ruleForm: {
        name: '',
        mobile: '',
        location: '',
        address: '',
        businessDateType: '',
        businessDate: '',
        status: '1',
        businessBeginTime: '',
        businessEndTime: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入门店名称',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入门店电话',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入门店地址',
            trigger: 'blur'
          }
        ],
        location: [
          {
            required: true,
            message: '请选择所属区域',
            trigger: 'change'
          }
        ],
        businessDateType: {
          required: true,
          message: '请选择营业时间',
          trigger: 'change'
        },
        businessBeginTime: {
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        },
        businessEndTime: {
          required: true,
          message: '请选择结束时间',
          trigger: 'change'
        }
      },
      showWeek: false,
      checkList: [],
      saveLoading: false
    };
  },
  computed: {
    options() {
      return this.$store.state.app.locationList || [];
    }
  },
  created() {
    this.$store.dispatch('app/getLocations').then(() => {
      this.loadData();
    });
  },
  methods: {
    loadData(pageInfo) {
      this.tableLoading = true;
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...this.filter,
        pageNum: this.pagingOptions.pageNo,
        pageSize: this.pagingOptions.pageSize
      };
      getStoreList(params)
        .then(res => {
          const getLocationList = this.$store.state.app.locationList || [];
          this.list = res.data.records;
          let region = '';
          this.list.forEach(item => {
            item.location.forEach(id => {
              getLocationList.forEach(obj => {
                if (obj.id === id) {
                  region = obj.name;
                }
                obj.citys.forEach(child => {
                  if (child.id === id) {
                    region
                      ? (region = `${region} - ${child.name}`)
                      : (region = child.name);
                  }
                });
              });
            });
            item.region = region;
          });
          this.pagingOptions.total = res.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 清除筛选条件
    clearFilter() {
      this.filter = {
        name: '',
        serialNumber: '',
        address: '',
        status: ''
      };
      this.loadData({ page: 1 });
    },
    openDialog(type) {
      if (type === 'add') {
        this.dialogVisible = true;
        this.toptitle = '新增门店';
      }
    },
    onClose() {
      this.ruleForm = {
        name: '',
        mobile: '',
        location: '',
        address: '',
        businessDateType: '',
        businessDate: '',
        status: '1',
        businessBeginTime: '',
        businessEndTime: ''
      };
      this.checkList = [];
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    changeBusinessDate(val) {
      if (val === '4') {
        this.showWeek = true;
      } else {
        this.checkList = [];
        this.showWeek = false;
      }
      this.businessDate = val;
    },
    saveStore() {
      this.saveLoading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          return false;
        }
        if (this.ruleForm.businessDateType === '4') {
          if (!this.checkList.length) {
            this.saveLoading = false;
            this.$message.error('请选择营业时间');
            return;
          }
          this.ruleForm.businessDate = this.checkList.toString();
        }

        updateStore(this.ruleForm)
          .then(() => {
            this.$message.success('保存成功');
            this.dialogVisible = false;
            this.saveLoading = false;
            this.loadData();
            this.$refs.ruleForm.resetFields();
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    },
    lookDetails(id) {
      getStoreDetail(id).then(res => {
        const { data } = res;
        this.ruleForm.id = data.id;
        this.ruleForm.name = data.name;
        this.ruleForm.mobile = data.mobile;
        this.ruleForm.address = data.address;
        this.ruleForm.status = data.status.toString();
        this.ruleForm.location = data.location;
        this.ruleForm.businessDate = data.businessDate;
        this.ruleForm.businessBeginTime = data.businessBeginTime;
        this.ruleForm.businessEndTime = data.businessEndTime;
        this.dialogVisible = true;
        this.toptitle = '查看门店';
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.date-select {
  display: flex;
  align-items: center;

  .select-business-date {
    width: 150px;
  }
  .time-select {
    width: 145px;
  }
}
.divider {
  height: 1px;
  width: 100%;
  background: #ebedf2;
  margin-bottom: 30px;
}
.el-checkbox {
  margin-right: 20px;
  /deep/.el-checkbox__label {
    padding-left: 5px;
  }
}
</style>
