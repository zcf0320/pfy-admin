<template>
  <div class="appointBox">
    <div class="config-list">
      <div v-if="isReview" class="config-item">
        <div class="title ">配置信息</div>
        <div class="label-item  flex-box">
          <div class="label">手工录入核销码</div>
          <el-radio-group
            v-model="needVerificationCode"
            @change="
              val => {
                $emit('input', val);
              }
            "
          >
            <el-radio :label="1">需要</el-radio>
            <el-radio :label="0">不需要</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="reivewedTypeId === 97" class="config-item mb-24">
        <div class="flex-between mb-16">
          <div class="title mb-0">
            商品规格
            <el-popover placement="bottom" width="400" trigger="hover">
              <img :src="explain" alt="" class="explainImg" />
              <span slot="reference" class="explain">设置说明</span>
            </el-popover>
          </div>
          <el-button type="primary" @click="addItem">添加</el-button>
        </div>

        <div v-for="(item, index) in specs" :key="index">
          <div class="flex-box mb-12">
            <el-input
              v-model="item.productSpecificationName"
              class="w-280"
              placeholder="不超过15字"
              maxlength="15"
            />
            <div class="fc-blue pointer ml-10" @click="delItem(index)">
              删除
            </div>
          </div>
        </div>
      </div>
      <div v-for="item in configList" :key="item.id" class="config-item">
        <div class="title">{{ item.name }}</div>
        <div
          v-for="child in item.childs"
          :key="child.id"
          class="label-item  flex-box"
        >
          <div class="label">{{ child.name }}</div>
          <el-radio-group
            v-model="child.value"
            @change="
              val => {
                configChange(val, item, child);
              }
            "
          >
            <el-radio
              v-for="radio in child.type === 1
                ? config1
                : child.type === 2
                ? config2
                : child.name === '预约人手机号'
                ? config3
                : config4"
              :key="radio.value"
              :label="radio.value"
              :disabled="
                item.id === '9' && isDisabled && child.code != 'reverseArea'
              "
              >{{ radio.name }}</el-radio
            >
          </el-radio-group>
        </div>
      </div>
      <div class="table-list">
        <div class="table-label flex-box mb-16">
          <div class="required">预约材料</div>
          <div v-if="isEdit" class="add" @click="increaseMaterials"
            ></div
          >
        </div>
        <el-table :data="materials" class="table-data">
          <el-table-column label="材料名称">
            <template slot-scope="scope">
              <div class="table-form-item">
                <el-select
                  v-model="scope.row.materialId"
                  placeholder="材料名称"
                  :disabled="!isEdit"
                  filterable
                  @change="materialChange(scope)"
                >
                  <el-option
                    v-for="item in materialList"
                    :key="item.id"
                    :label="item.materialName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户端名称">
            <template slot-scope="scope">
              <div class="table-form-item">
                <el-input
                  v-model="scope.row.materialNameForUser"
                  :disabled="!isEdit"
                  :maxlength="20"
                  placeholder="用户端名称"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="示例文件">
            <template slot-scope="scope">
              <span
                v-if="scope.row.sampleFileUrl"
                class="link-skip"
                @click="getShowViewer(scope.row.sampleFileUrl)"
                >查看示例</span
              >
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="说明文字（用户可见）"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.content || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核要求">
            <template slot-scope="scope">
              <span>{{ scope.row.auditRequire || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否必填">
            <template slot-scope="scope">
              <div class="table-form-item">
                <el-select
                  v-model="scope.row.mandatory"
                  placeholder="是否必填"
                  :disabled="!isEdit"
                >
                  <el-option
                    v-for="item in whetherOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="75">
            <template slot-scope="scope">
              <div
                v-if="isEdit"
                class="icon remove"
                @click="deleteMaterials(scope)"
              />
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="empty-img" />
          </div>
        </el-table>
      </div>
    </div>
    <div class="preview-box">
      <el-image
        :src="
          isReview
            ? weChart
            : isFictitious
            ? weChart2
            : isTreatment
            ? weChart3
            : weChart1
        "
      />
      <div class="pd-12">
        <div class="preview-list">
          <div v-for="item in configList" :key="item.id" class="preview-item">
            <div class="title">{{ item.name }}</div>
            <div v-for="child in item.childs" :key="child.id">
              <div v-if="child.value == 1" class="label-item  flex-between">
                <div>{{ child.name }}</div>
                <div class="fc-grey ">
                  {{ child.previewValue }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <elImageViewer
      v-if="showViewer"
      :on-close="showViewerClose"
      :url-list="urlList"
    />
  </div>
</template>

<script>
export default {
  name: 'appointmentConfig',
  props: {
    id: { type: String, default: '' },
    value: { type: Number, default: null },
    dataList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isReview: {
      type: Boolean,
      default: false
    },
    isFictitious: {
      type: Boolean,
      default: false
    },
    productSpecificationList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    reivewedTypeId: { type: Number, default: null },
    // 是否为二次诊疗
    isTreatment: {
      type: Boolean,
      default: false
    },
    reservationMaterials: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      explain: require('@/assets/explain.png'),
      needVerificationCode: this.value || 0,
      weChart: require('@/assets/weChart-top.png'),
      weChart1: require('@/assets/weChart-top1.png'),
      weChart2: require('@/assets/weChart-top2.png'),
      weChart3: require('@/assets/weChart-top3.png'),
      configList: [],
      config1: [
        { name: '不需要', value: 0 },
        { name: '需要', value: 1 }
      ],
      config2: [
        { name: '不展示', value: 0 },
        { name: '展示', value: 1 }
      ],
      config3: [{ name: '可修改预约手机号', value: 1 }],
      config4: [{ name: '指定预约人（预约人必须为服务使用人）', value: 1 }],
      isDisabled: false,
      specs: this.$extends([], this.productSpecificationList),
      materials: this.reservationMaterials,
      whetherOptions: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      materialList: [],
      showViewer: false,
      urlList: []
    };
  },
  computed: {},
  created() {
    this.configList = this.$extends([], this.dataList);
    // this.configList.forEach(item => {
    //   if (this.$isNotEmpty(item.childs)) {
    //     item.childs.forEach(child => {
    //       if (child.code === 'reverseArea') {
    //         if (child.value === 0) {
    //           this.isDisabled = true;
    //           item.childs.forEach(itemCode => {
    //             itemCode.value = 0;
    //           });
    //         } else {
    //           this.isDisabled = false;
    //         }
    //       }
    //     });
    //   }
    // });
    this.findAllMaterial();
  },
  methods: {
    /**
     * 配置项变更
     */
    configChange(val, pItem, item) {
      if (
        item.code === 'reverseArea' ||
        item.code === 'detailAddress' ||
        item.code === 'siteName' ||
        item.code === 'siteMobile' ||
        item.code === 'clinicHospital'
      ) {
        // if (val === 0) {
        if (this.$isNotEmpty(pItem.childs)) {
          pItem.childs.forEach(itemCode => {
            // itemCode.value = 0;
            if (
              itemCode.code === 'reverseArea' ||
              itemCode.code === 'detailAddress' ||
              itemCode.code === 'siteName' ||
              itemCode.code === 'siteMobile' ||
              itemCode.code === 'clinicHospital'
            ) {
              itemCode.value = val;
            }
          });
          // this.isDisabled = true;
        }
        // } else {
        // this.isDisabled = false;
        // }
      }
    },
    // 添加商品规格
    addItem() {
      this.specs.push({
        productSpecificationName: ''
      });
    },
    // 删除商品规格
    delItem(index) {
      const vm = this;
      vm.$confirm('删除后将不可恢复，是否删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.specs.splice(index, 1);
      });
    },
    // 添加审核材料
    increaseMaterials() {
      this.materials = this.materials || [];
      this.materials.push({
        mandatory: null,
        materialNameForUser: '',
        materialId: '',
        materialName: '',
        sampleFileUrl: '',
        content: '',
        auditRequire: null
      });
      this.findAllMaterial();
    },
    // 删除审核材料
    deleteMaterials(scope) {
      this.$confirm('确认删除该预约材料吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        const { $index } = scope;
        this.materials.splice($index, 1);
      });
    },
    findAllMaterial() {
      this.$store
        .dispatch('materalManage/findAllMaterial', {
          time: new Date().getTime()
        })
        .then(res => {
          if (res && res.status) {
            this.materialList = res.obj || [];
          }
        });
    },
    // 选择审核材料
    materialChange(scope) {
      const { $index, row } = scope;
      this.materials.forEach((item, index) => {
        if ($index === index) {
          const material = this.materialList.find(
            item => item.id === row.materialId,
          );
          item.materialName = material.materialName;
          item.content = material.explanatoryText;
          item.auditRequire = material.auditKeyPoints;
          item.materialNameForUser = material.materialName;
          item.sampleFileUrl = material.urls.length ? material.urls[0] : '';
        }
      });
    },
    // 预览图片
    getShowViewer(urls) {
      this.urlList = [];
      this.urlList.push(urls);
      if (this.$isEmpty(urls)) {
        this.$message.warning('当前没有可预览的图片');
        return;
      }
      this.showViewer = true;
    },
    // 关闭预览图片
    showViewerClose() {
      this.showViewer = false;
    }
  }
};
</script>

<style scoped lang="scss">
.appointBox {
  display: flex;
  justify-content: space-between;
  .preview-box {
    width: 347px;
    min-height: 400px;
    background: #f6f6f6;
    box-shadow: 0px 2px 10px 0px #d2d2d2;
    border-radius: 4px;
    border: 1px solid #ccc;
    .preview-item {
      width: 323px;
      background: #ffffff;
      box-shadow: 0px 3px 10px 0px rgba(68, 96, 225, 0.2);
      border-radius: 6px;
      padding: 0px 16px;
      margin-bottom: 12px;
      .title {
        height: 40px;
        line-height: 40px;
        box-shadow: 0px 1px 0px 0px rgba(204, 204, 204, 0.5);
        color: #333;
        font-weight: 600;
        font-size: 16px;
      }
      .label-item {
        padding: 10px 0px;
        font-size: 14px;
        color: #333;
      }
    }
  }
  .config-list {
    width: calc(100% - 347px);
    .table-data {
      width: 90%;
    }
  }
  .config-item {
    min-width: 330px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #464668;
      margin-bottom: 24px;
    }
    .label-item {
      font-size: 16px;
      color: #464668;
      margin-bottom: 24px;
      .label {
        width: 160px;
      }
    }
  }
  .explain {
    font-size: 14px;
    font-weight: 400;
    color: #3599fe;
    margin-left: 12px;
  }
}
.explainImg {
  width: 410px;
  height: 350px;
}
.required{
    font-size: 16px;
font-weight: 400;
color: #464668;
}
.add{
    width: 16px;
    height: 16px;
    margin-left: 16px;
    background: url("../../../assets/add.png") no-repeat;
    background-size: 100% 100%;
}
</style>
