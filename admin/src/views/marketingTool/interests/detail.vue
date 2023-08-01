<template>
  <div class="userRecordDetail">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main "
        tag="main"
        :noresize="false"
      >
        <el-form ref="formData" :model="formData">
          <div class="details-content flex-col">
            <Tab
              :btns="btns"
              :btn-style="{ overflow: 'visible' }"
              @change="handleClick"
            />
            <div class="scroll-table">
              <div v-if="activeName === '1'">
                <div class="title-top content-detail">基础信息</div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="券名称"
                      class="mb-0"
                      prop="name"
                      :rules="[{ required: true, message: '请输入券名称' }]"
                    >
                      <el-input
                        v-model="formData.name"
                        maxlength="15"
                        placeholder="做为名称在页面展示，不超过15个字"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="送券原因"
                      class="mb-0"
                      prop="channel"
                      :rules="[{ required: true, message: '请输入送券原因' }]"
                    >
                      <el-select v-model="formData.channel" class="w-full">
                        <el-option label="营销活动" :value="1" />
                        <el-option label="服务补偿 " :value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <div class="title-top content-detail">权益设置</div>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="服务项名称"
                      prop="serviceInfoId"
                      :rules="[{ required: true, message: '请选择选择服务项' }]"
                    >
                      <el-select
                        v-model="formData.serviceInfoId"
                        filterable
                        placeholder="请选择选择服务项"
                        class="w-full"
                        @change="serviceInfoChange"
                      >
                        <el-option
                          v-for="item in serviceItemsList"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="供应商"
                      prop="providerName"
                      :rules="[{ required: true, message: '请选择选择供应商' }]"
                    >
                      <el-input v-model="formData.providerName" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="使用次数"
                      prop="useCount"
                      :rules="[
                        { required: true, message: '请选择设置使用次数' },
                      ]"
                    >
                      <el-select
                        v-model="formData.useCount"
                        placeholder="请选择设置使用次数"
                        class="w-full"
                      >
                        <el-option
                          v-for="item in useCounts"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="有效期"
                      prop="rangeTime"
                      :rules="[{ required: true, message: erorMsg }]"
                    >
                      <el-date-picker
                        v-model="formData.rangeTime"
                        class="w-full"
                        value-format="timestamp"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="生效时间"
                        end-placeholder="过期时间"
                        :clearable="false"
                        @change="changeTime"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注(后台人员可见)">
                      <el-input
                        v-model="formData.remark"
                        type="textarea"
                        maxlength="40"
                        placeholder="请输入备注"
                        show-word-limit
                        :rows="4"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="flex-box mb-24">
                  <div class="require">*</div>
                  <div>用户列表({{ userList.length }})：</div>
                  <button
                    type="button"
                    class="btn-exit"
                    :disabled="userList.length > 998"
                    @click="addUser()"
                  >
                    新增
                  </button>
                </div>
                <el-table class="table-large" :data="userList">
                  <el-table-column label="ID">
                    <template slot-scope="{ row }">
                      <span>{{ row.id }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名">
                    <template slot-scope="{ row }">
                      <span>{{ row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号">
                    <template slot-scope="{ row }">
                      <span>{{ row.mobile }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="{ row, $index }">
                      <div class="flex-box">
                        <HoverTip
                          content="查看"
                          tip-class-name="icon-detail"
                          class="mr-30"
                          @click.native.prevent="lookDetails(row.id, '1')"
                        />
                        <el-popconfirm
                          title="删除后将不可恢复，是否删除？"
                          placement="top"
                          confirm-button-text="确认"
                          cancel-button-text="取消"
                          confirm-button-type="plain"
                          cancel-button-type="primary"
                          :hide-icon="true"
                          @onConfirm="deleteItem($index)"
                        >
                          <HoverTip
                            slot="reference"
                            content="删除"
                            tip-class-name="icon-delete"
                          />
                        </el-popconfirm>
                      </div>
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
              </div>
              <div v-if="activeName === '2'">
                <div class="title-top content-detail">权益获取列表</div>
                <el-table class="table-large" :data="dataList">
                  <el-table-column label="ID">
                    <template slot-scope="{ row }">
                      <span>{{ row.id }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名" width="130">
                    <template slot-scope="{ row }">
                      <span>{{ row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号">
                    <template slot-scope="{ row }">
                      <span>{{ row.mobile }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="次数" width="50">
                    <template slot-scope="{ row }">
                      <span>{{ row.useCount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="生效时间" width="120">
                    <template slot-scope="{ row }">
                      <span>{{
                        row.effectiveTimeStart | timeFormat('yyyy-MM-dd')
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="过期时间" width="120">
                    <template slot-scope="{ row }">
                      <span>{{
                        row.effectiveTimeEnd | timeFormat('yyyy-MM-dd')
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="领取情况">
                    <template slot-scope="{ row }">
                      <div
                        :class="[
                          'label-text',
                          $enums['collectionStateClass'][row.state],
                        ]"
                      >
                        {{ $enums['collectionState'][row.state] }}
                      </div>
                      <div>{{ row.receiveTime | timeFormat }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="{ row }">
                      <div class="flex-box">
                        <HoverTip
                          v-if="row.state === 2"
                          content="查看"
                          tip-class-name="icon-detail"
                          class="mr-30"
                          @click.native.prevent="lookDetails(row.userId, '2')"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <div slot="empty" class="empty-img" />
                </el-table>
                <Pagination
                  v-if="total > 10"
                  :set-cache="false"
                  :total="total"
                  :limit="filter.pageSize"
                  :page.sync="filter.pageNum"
                  layout="total, prev, pager, next"
                  @pagination="list"
                />
              </div>
              <div v-if="activeName === '3'" class="log-items">
                <Logs v-if="!isAdd" :id="$route.params.id" :type="'80'" />
                <Logs v-if="isAdd" :id="$route.params.id" :type="'80'" />
              </div>
            </div>
          </div>
        </el-form>
      </el-scrollbar>
    </el-container>
    <userCheckDialog :visible.sync="dialog.visible" @saved="checkUser" />
    <div class="page-footer">
      <button type="button" class="btn-save" @click="saveForm('formData')">
        发送
      </button>
    </div>
  </div>
</template>

<script>
import userCheckDialog from '../components/userCheckDialog';
export default {
  name: 'UserRecordDetail',
  components: { userCheckDialog },

  data() {
    const defaultForm = {
      channel: null,
      effectiveTimeEnd: '',
      effectiveTimeStart: '',
      id: '',
      name: '',
      providerId: '',
      providerName: '',
      remark: '',
      serviceInfoId: '',
      serviceInfoName: '',
      useCount: null,
      rangeTime: [],
      userIds: []
    };
    return {
      userList: [],
      filter: {
        pageSize: 10,
        pageNum: 1
      },
      id: null,
      erorMsg: '请选择有效期',
      btns: [
        { value: '1', name: '基础信息' },
        { value: '2', name: '权益获取列表' },
        { value: '3', name: '操作日志' }
      ],
      total: 11,
      useCounts: [],
      serviceItemsList: [],
      dataList: [],
      activeName: '1',
      formData: this.$extends({}, defaultForm)
    };
  },
  computed: {
    isAdd() {
      return this.$route.params.id === 'add';
    }
  },
  async created() {
    await this.getServiceItemsList();
    // 获取使用次数
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'useCount'
      })
      .then(res => {
        this.useCounts = res.obj || [];
      });
    await this.$nextTick();
    if (!this.isAdd) {
      this.$store
        .dispatch('interests/detailPresentation', this.$route.params.id)
        .then(res => {
          this.$copyProps(this.formData, res.data);
          this.formData.rangeTime = [
            res.data.effectiveTimeStart,
            res.data.effectiveTimeEnd
          ];
        });
    }
  },
  methods: {
    // tab切换
    handleClick(tab) {
      if (tab === 2) {
        this.dataList = [];
        if (!this.isAdd) {
          this.list();
        }
      } else {
        this.filter.pageNum = 1;
      }
      this.activeName = tab;
    },
    // 获取权益列表
    list() {
      const query = {
        id: this.$route.params.id,
        pageSize: 10,
        pageNum: this.filter.pageNum
      };
      this.$store.dispatch('interests/queryUserList', query).then(res => {
        this.dataList = res.data.records || [];
        this.total = res.data.total;
      });
    },
    // 查看详情
    lookDetails(id, type) {
      const { href } = this.$router.resolve({
        path: `/operateManage/userManage/details/${id}/${type}`
      });
      window.open(href, '_blank');
    },
    /**
     * 删除数据
     */
    deleteItem(index) {
      this.userList.splice(index, 1);
    },
    /**
     * 添加用户
     */
    checkUser(val) {
      const index = this.userList.findIndex(item => item.id === val.id);
      if (index === -1) {
        this.userList.push(val);
      }
    },
    /**
     * 获取服务项
     */
    getServiceItemsList() {
      const vm = this;
      // 获取服务项
      vm.$store.dispatch('serviceItems/getAllServiceList').then(response => {
        response.data.forEach(item => {
          if (item.providerName) {
            item.label = item.serviceName + '(' + item.providerName + ')';
          } else {
            item.label = item.serviceName;
          }
        });
        vm.serviceItemsList = response.data;
      });
    },
    // 添加用户
    addUser() {
      this.dialog.visible = true;
    },
    /**
     * 服务项变更 获取服务项
     */
    serviceInfoChange(val) {
      const itemData = this.serviceItemsList.find(item => item.id === val);
      if (this.$isNotEmpty(itemData)) {
        this.formData.providerName = itemData.providerName;
        this.formData.serviceInfoName = itemData.serviceName;
        this.formData.providerId = itemData.providerId;
      }
    },
    /**
     * 时间范围便跟
     */
    changeTime(val) {
      if (this.$isNotEmpty(val)) {
        let time = val[1];
        time += 24 * 60 * 60 * 1000 - 1000;
        let startTime = new Date();
        startTime.setHours(0);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        startTime = startTime.getTime();
        if (time < startTime) {
          this.erorMsg = '过期时间不能小于当天时间';
          this.formData.rangeTime = [];
          return false;
        } else {
          this.erorMsg = '请选择有效期';
          return true;
        }
      }
    },
    saveForm(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (this.$isEmpty(this.userList)) {
          this.$message.warning('至少选择一个用户');
          return;
        }
        const flag = this.changeTime(this.formData.rangeTime);
        if (!flag) {
          this.$message.warning('过期时间不能小于当前时间');
          return;
        }
        this.formData.userIds = [];

        this.userList.forEach(item => {
          this.formData.userIds.push(item.id);
        });
        this.formData.effectiveTimeStart = this.formData.rangeTime[0];
        let endTime = this.formData.rangeTime[1];
        endTime += 24 * 60 * 60 * 1000 - 1000;
        this.formData.effectiveTimeEnd = endTime;
        if (!this.isAdd) {
          this.formData.id = this.$route.params.id;
          this.$store
            .dispatch('interests/updatePresentation', this.formData)
            .then(() => {
              this.$message.success('保存成功');
              this.$router.go(-1);
            });
        } else {
          this.$store
            .dispatch('interests/savePresentation', this.formData)
            .then(() => {
              this.$message.success('保存成功');
              this.$router.go(-1);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
