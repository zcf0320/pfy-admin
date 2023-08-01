<template>
  <div class="prescription new-form">
    <div class="prescriptionDetails-table">
    <!-- <div class="content-detail flex">
      <div class="blue-line" />
      处方信息
    </div>
    <div class="content-row flex">
        <div class="content-left">状态</div>
      <div class="content-right normal">
        <div v-if="data.state" class="text">
          <div v-if="data.state === 1700" class="check-status-tag check-pass">
            已开具
          </div>
          <div v-if="data.state === 1701" class="check-status-tag check-passin">
            未开具
          </div>
          <div v-if="data.state === 1702" class="check-status-tag check-unpass">
            已拒绝
          </div>
          <div v-if="data.state === 1703" class="check-status-tag check-passin">
            待确认
          </div>
        </div>
        <div v-if="!data.state" class="text">-</div>
      </div>
      <div class="content-left">申请时间</div>
      <div class="normal">
        {{
          data.createTime
            ? $moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }}
      </div>
    </div>
    <div class="content-row flex">
      <div class="content-left">更新时间</div>
      <div class="content-right normal">
        {{
          data.updateTime
            ? $moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }}
      </div>
      <div class="content-left">肝功能</div>
      <div class="normal overflow">
        {{ data.dictBoolLiver | formatState }}
      </div>
    </div>
    <div class="content-row flex">
      <div class="content-left">肾功能</div>
      <div class="content-right normal">
        {{ data.dictBoolRenal | formatState }}
      </div>
      <div class="content-left">是否备孕/哺乳期</div>
      <div class="normal">
        {{ data.dictBoolNurse | formatState }}
      </div>
    </div>
    <div class="content-row flex">
      <div class="content-left">是否有过敏史</div>
      <div class="content-right normal">
        {{ data.dictBoolAllergyHistory === 1 ? data.allergyHistory : '-' }}
      </div>
      <div class="content-left">是否有家族病史</div>
      <div class="normal overflow">
        {{ data.dictBoolFamilyHistory === 1 ? data.familyHistory : '-' }}
      </div>
    </div>
    <div class="content-row flex">
      <div class="content-left">是否有疾病史</div>
      <div class="content-right normal">
        {{ data.dictBoolMedicalHistory === 1 ? data.medicalHistory : '-' }}
      </div>
        <div class="content-left"></div>
      <div class="content-right normal">
      </div>
    </div>
    <div class="content-detail flex">
      <div class="blue-line" />
      附件信息（历史处方、报告单、病例等）
    </div>
    <div class="content-row flex">
      <div class="content-left">处方状态</div>
      <div class="content-right normal">
        <div v-if="data.state === 1700" class="check-status-tag check-pass">
          已开具
        </div>
        <div v-if="data.state === 1701" class="check-status-tag check-passin">
          未开具
        </div>
        <div v-if="data.state === 1702" class="check-status-tag check-unpass">
          已拒绝
        </div>
        <div v-if="data.state === 1703" class="check-status-tag check-passin">
          待确认
        </div>
        <div v-if="!data.state" class="line-none">-</div>
        <span v-if="data.state === '已拒绝'">（{{ data.message }}）</span>
      </div>
      <div class="content-left">***病例、报告单</div>
      <div class="normal">
        <img
          class="pdf"
          :src="imgUrl"
          @click="viewPicture(data.prescriptionUrl)"
        />
      </div>
    </div> -->
      <div class="data-list">
        <div class="detail-table-title">
          处方信息
        </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                   状态
              </div>
              <div class="detail-table-item-value">
                  <div v-if="data.state" class="text">
                  <div v-if="data.state === 1700" class="check-status-tag check-pass">
                    已开具
                  </div>
                  <div v-if="data.state === 1701" class="check-status-tag check-passin">
                    未开具
                  </div>
                  <div v-if="data.state === 1702" class="check-status-tag check-unpass">
                    已拒绝
                  </div>
                  <div v-if="data.state === 1703" class="check-status-tag check-passin">
                    待确认
                  </div>
                </div>
                <div v-if="!data.state" class="text">-</div>
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
                  申请时间
              </div>
              <div class="detail-table-item-value">
                 {{
          data.createTime
            ? $moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }}
              </div>
              </div>
         </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                   更新时间
              </div>
              <div class="detail-table-item-value">
                  {{
          data.updateTime
            ? $moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')
            : '-'
        }}
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
                  肝功能
              </div>
              <div class="detail-table-item-value">
                 {{ data.dictBoolLiver | formatState }}
              </div>
              </div>
         </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                  肾功能
              </div>
              <div class="detail-table-item-value">
                  {{ data.dictBoolRenal | formatState }}
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
                 是否备孕/哺乳期
              </div>
              <div class="detail-table-item-value">
                 {{ data.dictBoolNurse | formatState }}
              </div>
              </div>
         </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                 是否有过敏史
              </div>
              <div class="detail-table-item-value">
                 {{ data.dictBoolAllergyHistory === 1 ? data.allergyHistory : '-' }}
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
                 是否有家族病史
              </div>
              <div class="detail-table-item-value">
                {{ data.dictBoolFamilyHistory === 1 ? data.familyHistory : '-' }}
              </div>
              </div>
         </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                  是否有疾病史
              </div>
              <div class="detail-table-item-value">
                 {{ data.dictBoolMedicalHistory === 1 ? data.medicalHistory : '-' }}
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
              </div>
              <div class="detail-table-item-value">
              </div>
              </div>
         </div>
         <div class="detail-table-title">
         附件信息（历史处方、报告单、病例等）
        </div>
         <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                 处方状态
              </div>
              <div class="detail-table-item-value">
                 <div v-if="data.state === 1700" class="check-status-tag check-pass">
                  已开具
                </div>
                <div v-if="data.state === 1701" class="check-status-tag check-passin">
                  未开具
                </div>
                <div v-if="data.state === 1702" class="check-status-tag check-unpass">
                  已拒绝
                </div>
                <div v-if="data.state === 1703" class="check-status-tag check-passin">
                  待确认
                </div>
                <div v-if="!data.state" class="line-none">-</div>
                <span v-if="data.state === '已拒绝'">（{{ data.message }}）</span>
              </div>
              </div>
              <div class="detail-table-item-right">
              <div class="detail-table-item-label">
                ***病例、报告单
              </div>
              <div class="detail-table-item-value">
                 <img
                  class="pdf"
                  :src="imgUrl"
                  @click="viewPicture(data.prescriptionUrl)"
                />
              </div>
              </div>
         </div>
      </div>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="548px"
      class="viewPic"
    >
      <img
        src="@/assets/icon_rotate.png"
        alt=""
        class="rotate"
        @click="rotate"
      />
      <img ref="rotate" :src="viewUrl" alt="" class="viewImg" />
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'prescription',
  filters: {
    formatState(type) {
      if (type === 1) {
        return '是';
      } else if (type === 0) {
        return '否';
      } else {
        return '-';
      }
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: {
        allergy_history: '', //	过敏病史信息
        createTime: '', //	创建时间
        dictBoolAllergyHistory: '', //	过敏病史0有，1无
        dictBoolFamilyHistory: '', //	家族病史0有，1无
        dictBoolLiver: '', // 肝功能状态0正常，1异常
        dictBoolMedicalHistory: '', //	过往病史0有，1无
        dictBoolNurse: '', //	妊娠哺乳状态0正常，1异常
        dictBoolRenal: '', // 肾功能状态0正常，1异常
        familyHistory: '', //	家族病史信息
        medicalHistory: '', //	过往病史信息
        prescriptionUrl: '', //	更新时间
        state: '', //	处方单状态
        updateTime: '', //	更新时间
        useMedicine: '', // 是否使用过本药物0是，1否
        userImgUrl: []
      },
      imgUrl: require('@/assets/view_pic.png'),
      viewUrl: '',
      dialogVisible: false
    };
  },
  created() {
    this.getDetails(this.id || this.$route.params.id);
  },
  methods: {
    ...mapActions('orderManage', ['orderPrescription']),
    getDetails(id) {
      this.orderPrescription({
        id
      }).then(res => {
        this.data = res.data;
      });
    },
    rotate() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
      this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`;
    },
    viewPicture(url) {
      this.dialogVisible = true;
      this.viewUrl = url;
      this.$nextTick(() => {
        this.$refs.rotate.style.transform = `rotate(0deg)`;
        this.deg = 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.prescription {
  .content-detail {
    position: relative;
    &::before {
      content: '';
      width: 4px;
      height: 16px;
      position: absolute;
      top: 1px;
      left: -12px;
      background-color: #2276ff;
    }
  }
  .contnet {
    display: flex;
    flex-wrap: wrap;
    .item-2 {
      width: 50%;
      margin-bottom: 24px;
      display: flex;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
      line-height: 14px;
      .label {
        width: 70px;
        font-size: 14px;
        color: #333333;
        text-align: justify-all;
      }
      .text {
        flex: 1;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item-3 {
      width: 33.3%;
      margin-bottom: 24px;
      display: flex;
    }
    .item-1 {
      width: 100%;
      margin-bottom: 24px;
      display: flex;
    }
    .label {
      width: 160px;
      font-size: 14px;
      color: #333333;
      text-align: justify-all;
    }
    .text {
      flex: 1;
      font-size: 14px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .check-status-tag {
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    height: 24px;
    margin-top: 12px;
  }
  .check-pass {
    background: #c9f7f4;
    color: #18c4bd;
    width: 72px;
  }
  .check-passin {
    background: #e1f1ff;
    color: #62acff;
    width: 55px;
  }
  .check-unpass {
    background: #ffe2e5;
    color: #f64e60;
    width: 72px;
  }
  .line-none {
    font-weight: normal;
  }
  .file {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px 46px 0 0;

    span {
      font-size: 12px;
      font-weight: 500;
      color: #2276ff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .viewImg {
    width: 500px;
    height: 500px;
    object-fit: contain;
  }
  .rotate {
    position: absolute;
    width: 16px;
    height: 16px;
    user-select: none;
    top: 14px;
    right: 44px;
    cursor: pointer;
  }
  .pdf {
    width: 31px;
    height: 35px;
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>
