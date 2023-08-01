<template>
  <div class="details">
    <el-form label-width="100px" label-position="top">
      <div class="data-list">
        <div class="title-top content-detail">用户信息</div>
        <div class="data-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户姓名" class="link-box">
                <div class="form-value">{{ data.patientName || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="性别" class="link-box">
                <div class="form-value">{{ data.patientSex || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type !== 1" :span="12">
              <el-form-item label="手机号" class="link-box">
                <div class="form-value">{{ data.patientPhone || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="证件类型" class="link-box">
                <div class="form-value">
                  {{ data.patientIdType || '-' }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type !== 1" :span="12">
              <el-form-item label="证件号码" class="link-box">
                <div class="form-value">{{ data.patientIdNo || '-' }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="title-top content-detail">服务信息</div>
        <div class="data-item">
          <el-row :gutter="20">
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="问诊编号" class="link-box">
                <div class="form-value">{{ data.policyNo || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="问诊时间" class="link-box">
                <div class="form-value">
                  {{
                    data.createTime
                      ? $moment(data.createTime).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="服务名称" class="link-box">
                <div class="form-value">{{ data.serviceName || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="所属科室" class="link-box">
                <div class="form-value">{{ data.deptName || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 1" :span="12">
              <el-form-item label="咨询总结" class="link-box">
                <div class="form-textarea">{{ data.conclusion || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="编号" class="link-box">
                <div class="form-value">{{ data.owCode || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="请求时间" class="link-box">
                <div class="form-value">
                  {{ $moment(data.createTm).format('YYYY-MM-DD') }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="目标医院" class="link-box">
                <div class="form-value">{{ data.hospitalName || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="目标科室" class="link-box">
                <div class="form-value">{{ data.departmentName || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="预约医院" class="link-box">
                <div class="form-value">
                  {{ data.finalHospitalName || '-' }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="预约科室" class="link-box">
                <div class="form-value">
                  {{ data.finalDepartmentName || '-' }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="就诊时间" class="link-box">
                <div class="form-value">
                  {{
                    data.updateTime
                      ? $moment(data.updateTime).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 2" :span="12">
              <el-form-item label="状态" class="link-box">
                <div class="form-value">{{ data.status || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="更新时间" class="link-box">
                <div class="form-value">
                  {{
                    data.updateTime
                      ? $moment(data.updateTime).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </el-form-item></el-col>

            <el-col v-if="type === 3" :span="12">
              <el-form-item label="诊断疾病" class="link-box">
                <div class="form-value">
                  {{ data.diagnoseDisease || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="申请垫付金额（元）" class="link-box">
                <div class="form-value">
                  {{ data.applyAdvancedPrice || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="责任结果" class="link-box">
                <div class="form-value">
                  {{ data.serviceSummary || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="实际垫付金额(元)" class="link-box">
                <div class="form-value">
                  {{ data.practicalAdvancedPrice || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="服务状态" class="link-box">
                <div class="form-value">
                  {{ data.status || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="服务总结" class="link-box">
                <div class="form-textarea">
                  {{ data.serviceSummary || '-' }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 3" :span="12">
              <el-form-item label="垫付材料下载" class="link-box">
                <div>
                  <button class="btn-save" @click="download">下载</button>
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 4" :span="12">
              <el-form-item label="创建时间" class="link-box">
                <div class="form-value">
                  {{
                    data.createTime
                      ? $moment(data.createTime).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 4" :span="12">
              <el-form-item label="完成时间" class="link-box">
                <div class="form-value">
                  {{
                    data.finishTm
                      ? $moment(data.finishTm).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </el-form-item></el-col>
            <el-col v-if="type === 4" :span="12">
              <el-form-item label="服务状态" class="link-box">
                <div class="form-value">{{ data.status || '-' }}</div>
              </el-form-item></el-col>
            <el-col v-if="type === 4" :span="12">
              <el-form-item label="服务总结" class="link-box">
                <div class="form-value">{{ data.serviceSummary || '-' }}</div>
              </el-form-item></el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { downloadYjyFiles } from '@/api/onlineService';
export default {
  name: 'yjy-service',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: Number,
      default: 0
    }
  },
  methods: {
    download() {
      downloadYjyFiles(this.$route.params.id).then(res => {
        if (res.data) {
          window.open(res.data);
        } else {
          this.$message('暂无材料下载');
        }
      });
    }
  }
};
</script>
<style scoped>
.form-value {
  width: 498px;
  height: 38px;
  color: #464668;
  background: #f3f7ff;
  border-radius: 4px;
  padding-left: 18px;
}
.form-textarea {
  width: 498px;
  color: #464668;
  background: #f3f7ff;
  border-radius: 4px;
  padding: 0 18px;
}
</style>
