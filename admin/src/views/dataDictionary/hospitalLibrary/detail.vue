<template>
  <div class="page-hospital-details">
    <el-container>
      <el-main>
        <div class="modal-form">
          <el-form label-width="100px" label-position="top">
            <div class="data-list">
              <div class="title-top">基础信息</div>
              <div class="data-form">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="医院名称">
                      <el-input :value="hospitalDetail.name || '-'" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="别名">
                      <el-input
                        :value="hospitalDetail.alias || '-'"
                        disabled
                        placeholder="请输入医院别名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类型/性质">
                      <el-input
                        :value="
                          hospitalDetail.type
                            ? hospitalDetail.type + '-' + hospitalDetail.nature
                            : '-'
                        "
                        disabled
                        placeholder="请输入类型/性质"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="级别">
                      <el-input
                        :value="hospitalDetail.level || '-'"
                        disabled
                        placeholder="请输入级别"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="建立时间">
                      <el-input
                        :value="hospitalDetail.establishDate || '-'"
                        disabled
                        placeholder="请输入建立时间"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="院长">
                      <el-input
                        :value="hospitalDetail.owner || '-'"
                        disabled
                        placeholder="请输入院长"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- <div> -->
                    <el-col :span="24">
                      <div>
                        <span class="el-form-item__label">医院简介</span>
                        <div class="openDetail">
                          <div
                            v-if="expandStatus"
                            class="expand"
                            @click="expand"
                          >
                            <span>展开</span
                            ><img src="../../../assets/expand_up.svg" alt="" />
                          </div>
                          <div v-else class="expand" @click="expand">
                            <span>收起</span
                            ><img
                              src="../../../assets/expand_down.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <el-input
                        type="textarea"
                        :value="hospitalDetail.introduce || '-'"
                        disabled
                        placeholder="请输入简介"
                        :rows="expandStatus ? 1 : 6"
                      />
                    </el-col>
                  <!-- </div> -->
                </el-row>
              </div>
            </div>
            <div class="data-list">
              <div class="title-top "
              style="paddingTop:20px;"
              >补充信息</div>
              <div class="data-form">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="科室数量">
                      <el-input
                        :value="hospitalDetail.departmentNumber || '-'"
                        disabled
                        placeholder="请输入科室数量"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="病床数量">
                      <el-input
                        :value="hospitalDetail.bedNumber || '-'"
                        disabled
                        placeholder="请输入病床数量"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医护数量">
                      <el-input
                        :value="hospitalDetail.medicalNumber || '-'"
                        disabled
                        placeholder="请输入医护数量"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="年内门诊">
                      <el-input
                        :value="hospitalDetail.diagnosisNumber || '-'"
                        disabled
                        placeholder="请输入年内门诊"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否医保">
                      <el-input
                        :value="hospitalDetail.healthCare || '-'"
                        disabled
                        placeholder="请输入是否医保"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="data-list">
              <div class="title-top">地址信息</div>
              <div class="data-form">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="省(直辖市)">
                      <el-input
                        :value="hospitalDetail.provinceName || '-'"
                        disabled
                        placeholder="请输入省(直辖市)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="城市名">
                      <el-input
                        :value="hospitalDetail.cityName || '-'"
                        disabled
                        placeholder="请输入城市名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所属地区">
                      <el-input
                        :value="hospitalDetail.area || '-'"
                        disabled
                        placeholder="请输入所属地区"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="详细地址">
                      <el-input
                        :value="hospitalDetail.address || '-'"
                        disabled
                        placeholder="请输入详细地址"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'HospitalDetail',
  data() {
    return {
      expandStatus: true,
      hospitalDetail: {}
    };
  },
  created() {
    // 获取医院详情
    this.getHospitalDetail({ hospitalId: this.$route.params.id }).then(res => {
      this.hospitalDetail = res.data;
    });
  },
  methods: {
    ...mapActions('dataDictionary', ['getHospitalDetail']),
    // 展开
    expand() {
      this.expandStatus = !this.expandStatus;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-hospital-details {
    .modal-form .data-list .data-form .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .el-main {
    &::-webkit-scrollbar {
      display: none;
    }
    .el-form-item__label {
      line-height: 14px;
      vertical-align: middle;
    }
    .openDetail {
      display: inline-block;
      line-height: 14px;
      vertical-align: middle;
      margin-left: 12px;
      padding: 0 0 10px 0;
      .expand {
        font-weight: 400;
        color: #3599fe;
        font-size: 14px;
        float: none;
        cursor: pointer;
      }
    }
  }
}
</style>
