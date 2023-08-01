<template>
  <el-container class="approval">
    <el-scrollbar
      :native="false"
      wrap-class="el-main relative"
      tag="main"
      :noresize="false"
    >
      <div v-for="item in baseData" :key="item.type" class="mb-24">
        <div class="title mb-12">
          {{ item.name }}
        </div>
        <div class="approval-item">
          <div class="flex-between approval-content">
            <div
              v-for="childs in item.optionVOList"
              :key="childs.optionVOList"
              :style="{ width: 100 / item.optionVOList.length + '%' }"
            >
              <div>
                <div class="approval-title  ">
                  <div class="flex-box">
                    <span class="mr-12">
                      {{ childs.name }}
                    </span>
                    <el-switch
                      v-if="$isNotEmpty(childs.name)"
                      v-model="childs.deleted"
                      :disabled="!childs.confirmed"
                      @change="
                        val => {
                          changeState(childs, val);
                        }
                      "
                    />
                  </div>
                </div>
                <div class="approval-process ">
                  <div
                    v-if="$isNotEmpty(childs.name)"
                    class="steps-box flex relative"
                  >
                    <div
                      class="steps-item line"
                      :class="$isEmpty(childs.id) ? '' : 'active'"
                    />
                    <div
                      class="steps-item"
                      :class="childs.confirmed ? 'active' : ''"
                    />
                  </div>
                  <div
                    v-if="$isNotEmpty(childs.name)"
                    class="flex approval-text"
                  >
                    <div
                      class="text link-skip  "
                      :class="$isEmpty(childs.id) ? '' : 'active'"
                      @click="add(item.type, childs.stateOption)"
                    >
                      审批字段
                    </div>
                    <div
                      class="ml-16 text link-skip"
                      :class="childs.confirmed ? 'active' : ''"
                      @click="setProcess(childs.id, childs.stateOption)"
                    >
                      审批流程
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$isEmpty(item.optionVOList)" class="w-full">
              <div>
                <div class="approval-title  ">
                  <div class="flex-box">
                    <span class="mr-12">
                      新建
                    </span>
                    <el-switch disabled />
                  </div>
                </div>
                <div class="approval-process ">
                  <div class="steps-box flex relative">
                    <div class="steps-item line " />
                    <div class="steps-item " />
                  </div>
                  <div class="flex approval-text">
                    <div class="text link-skip" @click="add(item.type, 1)">
                      审批字段
                    </div>
                    <div class="ml-16 text link-skip">审批流程</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        size="300px"
        :show-close="false"
        :with-header="false"
        :modal="false"
        :custom-class="'approvelCustomClass'"
      >
        <!--  style="height:470px" -->
        <div class="drawer">
          <div class="drawer-header flex-between-normal mb-24">
            <div class="drawer-title">使用说明</div>
            <div>
              <img
                class="img-box1"
                :src="putitAway"
                alt=""
                @click="
                  () => {
                    drawer = false;
                  }
                "
              />
            </div>
          </div>
          <div class="flex-box tips-box mb-20">
            <span class="icon-search" />
            <span class="link-skip ml-10 fs-14 fc-grey" @click="toPreview()"
              >如何启用审批？</span
            >
          </div>
          <div class="flex-box tips-box mb-20">
            <span class="icon-search" />
            <span class="link-skip ml-10 fs-14 fc-grey" @click="toPreview()"
              >如何修改审批流程？</span
            >
          </div>
        </div>
      </el-drawer>
      <div class="instructions">
        <img
          class="img-box"
          :src="instructions"
          alt=""
          @click="
            () => {
              drawer = true;
            }
          "
        />
      </div>
      <ApprovalField
        :visible.sync="dialog.visible"
        :data="currentData"
        @saved="initData"
      />
      <ApprovalProcess
        :id="id"
        :visible.sync="dialogVisible"
        @saved="initData"
      />
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex';
import ApprovalField from './components/approvalField';
import ApprovalProcess from './components/approvalProcess';
export default {
  name: 'approvalSetting',
  components: { ApprovalField, ApprovalProcess },
  data() {
    return {
      putitAway: require('@/assets/putitAway.png'),
      instructions: require('@/assets/instructions.png'),
      drawer: false,
      direction: 'rtl',
      dialogVisible: false,
      currentData: {
        stateOption: null,
        type: null
      },
      id: null,
      baseData: [
        {
          name: '服务项',
          optionVOList: [
            // {
            //     confirmed: false,
            //     deleted: false,
            //     id: null,
            //     name: '新建',
            //     stateOption: 1,
            //     state: false
            // },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '发布',
              stateOption: 2,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '下架',
              stateOption: 3,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '删除',
              stateOption: 4,
              state: false
            },
            {}
          ],
          type: 0
        },
        {
          name: '服务包',
          optionVOList: [
            // {
            //     confirmed: false,
            //     deleted: false,
            //     id: null,
            //     name: '新建',
            //     stateOption: 1,
            //     state: false
            // },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '发布',
              stateOption: 2,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '下架',
              stateOption: 3,
              state: false
            },
            {},
            {}
          ],
          type: 1
        },
        {
          name: '供应商',
          optionVOList: [
            // {
            //     confirmed: false,
            //     deleted: false,
            //     id: null,
            //     name: '新建',
            //     stateOption: 1,
            //     state: false
            // },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '启用',
              stateOption: 7,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '解约',
              stateOption: 8,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '删除',
              stateOption: 4,
              state: false
            },
            {}
          ],
          type: 2
        },
        {
          name: '保险产品',
          optionVOList: [
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '发布',
              stateOption: 2
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '上架',
              stateOption: 9
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '下架',
              stateOption: 3
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '屏蔽',
              stateOption: 6
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '取消屏蔽',
              stateOption: 10
            }
          ],
          type: 4
        },
        {
          name: '保险权益',
          optionVOList: [
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '发布',
              stateOption: 2,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '上架',
              stateOption: 9,
              state: false
            },
            {},
            {}
          ],
          type: 21
        },
        {
          name: '保险公司',
          optionVOList: [
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '启用',
              stateOption: 7,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '停用',
              stateOption: 5,
              state: false
            },
            {},
            {}
          ],
          type: 3
        },
        {
          name: '企业客户',
          optionVOList: [
            // {
            //     confirmed: false,
            //     deleted: false,
            //     id: null,
            //     name: '新建',
            //     stateOption: 1,
            //     state: false
            // },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '启用',
              stateOption: 7,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '停用',
              stateOption: 5,
              state: false
            },
            {
              confirmed: false,
              deleted: false,
              id: null,
              name: '删除',
              stateOption: 4,
              state: false
            },
            {}
          ],
          type: 90
        }
      ]
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('approval', [
      'initApprovesOption',
      'getApprovesOption',
      'confirmApproveStream',
      'saveOrUpdate',
      'updateApproveState'
    ]),
    /**
     * 初始化字段
     */
    initData() {
      this.initApprovesOption().then(res => {
        const dataList = res.data || [];
        dataList.forEach(item => {
          if (this.$isNotEmpty(item.optionVOList)) {
            const baseData = this.baseData.find(
              data => data.type === item.type,
            );
            item.optionVOList.forEach(itemData => {
              const data = baseData.optionVOList.find(
                data => data.stateOption === itemData.stateOption,
              );
              this.$copyProps(data, itemData, 'name');
            });
          }
        });
      });
    },
    /**
     * 跳转使用说明
     */
    toPreview() {
      this.$router.push({
        path: '/approval/setting/detail'
      });
    },
    /**
     * 设置审批字段
     */
    add(type, stateOption) {
      this.currentData.type = type;
      this.currentData.stateOption = stateOption;
      this.dialog.visible = true;
    },
    // 设置审批流程
    setProcess(id) {
      if (this.$isEmpty(id)) {
        this.$message.warning('请先设置审批字段！');
        return;
      }
      this.id = id;
      this.dialogVisible = true;
    },
    /**
     * 跟新状态
     */
    changeState(item, state) {
      const msg = state ? '是否确认启用？' : '是否确认禁用?';
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.updateApproveState({ id: item.id, state: state }).then(() => {
            this.$message.success('更新状态成功');
            this.initData();
          });
        })
        .catch(() => {
          item.deleted = !state;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.approval {
  .img-box {
    width: 116px;
    height: 36px;
  }
  .img-box1 {
    width: 76px;
    height: 36px;
    position: relative;
    top: -12px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #464668;
  }
  .approval-item {
    box-shadow: 0px 0px 4px 0px rgba(185, 185, 185, 0.5);
    .width-25 {
      width: 25%;
    }
    .approval-content {
      width: 100%;
      background: #f3f6f9;
    }
    .approval-title {
      height: 48px;
      line-height: 48px;
      padding-left: 30px;
      color: #464668;
      font-size: 16px;
    }
    .approval-process {
      height: 60px;
      background: #fff;
      padding-left: 30px;
      padding-top: 10px;
      .approval-text {
        position: relative;
        left: -10px;
        margin-top: 10px;
        cursor: pointer;
      }
      .text {
        font-size: 14px;
        color: #a2a3b7;
        &.active {
          color: #3599fe;
        }
      }

      .steps-item {
        width: 13px;
        height: 13px;
        border: 1px solid #a2a3b7;
        border-radius: 50%;
        margin-right: 60px;
        position: relative;
        &.active {
          border: none;
          background-image: url('../../../../src/assets/step_active.png');
          background-size: 100% 100%;
        }
        &.line::after {
          position: absolute;
          content: '';
          width: 61px;
          height: 1px;
          background: #a2a3b7;
          top: 6px;
          left: 12px;
        }
        &.line.active::after {
          background: #3599fe;
        }
        &.last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .drawer {
    padding: 24px 0px 24px 24px;

    .drawer-header {
      height: 46px;
      border-bottom: 1px solid rgba(235, 237, 242, 1);
      .drawer-title {
        font-size: 16px;
        font-weight: 600;
        color: #464668;
      }
    }
  }
  .instructions {
    position: fixed;
    right: 0px;
    top: 152px;
  }
}
</style>
