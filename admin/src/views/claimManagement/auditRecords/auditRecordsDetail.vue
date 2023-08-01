<template>
  <div>
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main detail spacing"
        tag="main"
        :noresize="false"
        class="scrollbar"
      >
        <div class="h-top flex-col">
          <div class="status">
            <div class="left flex">
              <div :class="statusImg" />
              <div class="status-content">
                <div class="status-content-top flex">
                  <div
                    :class="[
                      'state-text',
                      claimState[detail.claimSettlement.stateText],
                    ]"
                  >
                    {{ detail.claimSettlement.stateText }}
                  </div>

                  <div v-if="detail.claimSettlement.remark" class="reason">
                    {{ detail.claimSettlement.remark.split('；')[0] }}
                  </div>
                  <el-popover
                    v-if="remarkList.length > 1"
                    placement="bottom"
                    trigger="hover"
                    popper-class="hover-content-auditrecords"
                  >
                    <div class="hover-title">驳回原因</div>
                    <div
                      v-for="item in remarkList"
                      :key="item"
                      class="hover-item"
                    >
                      {{ item }}
                    </div>
                    <div slot="reference" class="more">更多</div>
                  </el-popover>
                </div>
                <div
                  v-if="detail.claimSettlement.waitProcessTime"
                  class="status-content-bottom"
                >
                  待处理时长{{
                    detail.claimSettlement.waitProcessTime | waitProcessTime
                  }}
                </div>
              </div>
            </div>
            <div
              v-if="detail.claimSettlement.secondState === 2"
              :class="[
                'right',
                detail.claimSettlement.checkState ? 'disable' : '',
              ]"
              @click="agreeCheck"
            >
              {{ detail.claimSettlement.checkState ? '已' : '未' }}复核
            </div>
          </div>
          <div class="bg-fff min-height relative">
            <Tab :btns="btns" @change="btnChange" />
            <div class="scroll-table pb-0">
              <div v-if="activeName === '1'" class="data-list">
                <div class="leaving-message-info">
                  <div class="detail-table-title">基础信息</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">申请编号</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.serialNumber }}
                        <span
                          v-if="detail.claimSettlement.firstServiceClaimed"
                          class="policy-info-red"
                          >首次理赔</span
                        >
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">申请来源</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.serviceInfoName }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">保单号</div>
                      <div class="detail-item-value">
                        <span
                          class="link-skip"
                          @click="lookDetails(detail.claimSettlement.policyId)"
                          >{{ detail.claimSettlement.policyNo }}</span
                        >
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">保险公司</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuranceCompany }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">保险产品名称</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuranceProductName }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">保险有效期</div>
                      <div class="detail-item-value">
                        <span
                          v-if="
                            $isNotEmpty(
                              detail.claimSettlement.insuranStartTime,
                            ) &&
                              $isNotEmpty(detail.claimSettlement.insuranEndTime)
                          "
                          >{{
                            detail.claimSettlement.insuranStartTime
                              | timeFormat('yyyy-MM-dd')
                          }}~{{
                            detail.claimSettlement.insuranEndTime
                              | timeFormat('yyyy-MM-dd')
                          }}</span
                        >
                      </div>
                    </div>
                    <div
                      v-if="detail.claimSettlement.onlineOrOffline"
                      class="detail-item"
                    >
                      <div class="detail-item-label">理赔方式</div>
                      <div class="detail-item-value">
                        门店理赔 - {{ detail.claimSettlement.drugStoreName }}
                      </div>
                    </div>
                  </div>

                  <div class="detail-table-title">被保险人信息</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">被保人姓名</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuredMsg.userName }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">被保人性别</div>
                      <div class="detail-item-value">
                        {{
                          detail.claimSettlement.insuredMsg.sex === 0
                            ? '女'
                            : '男'
                        }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">证件类型</div>
                      <div class="detail-item-value">
                        身份证/护照号码
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">证件号</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuredMsg.idCard }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">联系电话</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuredMsg.mobile }}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">
                        邮箱
                      </div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.insuredMsg.email }}
                      </div>
                    </div>
                  </div>

                  <div class="detail-table-title">理赔信息</div>

                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">责任名称</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.serviceInfoName }}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">计划名称</div>
                      <div class="detail-item-value">
                        {{ detail.claimSettlement.planName }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.patientName"
                      class="detail-item"
                    >
                      <div class="detail-item-label">就诊人姓名</div>
                      <div class="detail-item-value">
                        {{ detail.insuranceClaimInfo.patientName }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.treatmentTime"
                      class="detail-item"
                    >
                      <div class="detail-item-label">就诊时间</div>
                      <div class="detail-item-value">
                        {{
                          detail.insuranceClaimInfo.treatmentTime
                            | timeFormat('yyyy-MM-dd')
                        }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.treatmentDepartment"
                      class="detail-item"
                    >
                      <div class="detail-item-label">就诊医院</div>
                      <div class="detail-item-value">
                        {{ detail.insuranceClaimInfo.treatmentDepartment }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.treatmentDepartment"
                      class="detail-item"
                    >
                      <div class="detail-item-label">就诊科室</div>
                      <div class="detail-item-value">
                        {{ detail.insuranceClaimInfo.treatmentDepartment }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.disease"
                      class="detail-item"
                    >
                      <div class="detail-item-label">确诊疾病</div>
                      <div class="detail-item-value">
                        {{ detail.insuranceClaimInfo.disease }}
                      </div>
                    </div>

                    <div
                      v-if="detail.insuranceClaimInfo.userPaid"
                      class="detail-item"
                    >
                      <div class="detail-item-label">自费金额</div>
                      <div class="detail-item-value">
                        {{ detail.insuranceClaimInfo.userPaid }}
                      </div>
                    </div>

                    <div
                      v-if="
                        detail.insuranceClaimInfo &&
                          detail.insuranceClaimInfo.drugInfoList
                      "
                      class="detail-item"
                    >
                      <div class="detail-item-label">西药处方</div>
                      <div class="detail-item-value">
                        <div
                          v-for="(item, index) in detail.insuranceClaimInfo
                            .drugInfoList"
                          :key="`西药处方${index}`"
                          class="drug-items m-b16"
                        >
                          <span class="m-r16"
                            >{{ index + 1 }}. {{ item.drugName || '-' }}</span
                          >
                          <span class="m-r16">{{
                            item.specifications || '-'
                          }}</span>
                          <span v-if="item.drugNum" class="m-r16"
                            >x{{ item.drugNum || '-' }}</span
                          >
                          <span v-if="item.drugUnitPrice" class="m-r16"
                            >单价：{{
                              item.drugUnitPrice
                                ? item.drugUnitPrice.toFixed(2)
                                : '-'
                            }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        detail.insuranceClaimInfo &&
                          detail.insuranceClaimInfo.checkInfoList &&
                          detail.insuranceClaimInfo.checkInfoList.length > 0
                      "
                      class="detail-item"
                    >
                      <div class="detail-item-label">检验检查</div>
                      <div class="detail-item-value">
                        <div
                          v-for="(item, index) in detail.insuranceClaimInfo
                            .checkInfoList"
                          :key="`检验检查${index}`"
                          class="drug-items"
                        >
                          <span class="m-r16"
                            >{{ index + 1 }}. {{ item.checkName || '-' }}</span
                          >
                          <span class="m-r16">x{{ item.checkNum || '-' }}</span>
                          <span class="m-r16"
                            >单价：{{
                              item.checkUnitPrice
                                ? item.checkUnitPrice.toFixed(2)
                                : '-'
                            }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        detail.insuranceClaimInfo &&
                          detail.insuranceClaimInfo.drugAllergy &&
                          detail.insuranceClaimInfo.drugAllergy.length > 0
                      "
                      class="detail-item"
                    >
                      <div class="detail-item-label">过敏药物</div>
                      <div class="detail-item-value">
                        <div
                          v-for="(item, index) in detail.insuranceClaimInfo
                            .drugAllergy"
                          :key="`过敏药物${index}`"
                          class="drug-items"
                        >
                          <span class="m-r16">{{ item }}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        detail.insuranceClaimInfo &&
                          detail.insuranceClaimInfo.medicines &&
                          detail.insuranceClaimInfo.medicines.length > 0
                      "
                      class="detail-item"
                    >
                      <div class="detail-item-label">曾用药</div>
                      <div class="detail-item-value">
                        <div
                          v-for="(item, index) in detail.insuranceClaimInfo
                            .medicines"
                          :key="`曾用药${index}`"
                          class="drug-items"
                        >
                          <span class="m-r16">{{ item }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="detail-table-title"
                    v-if="
                      detail.orderMallList && detail.orderMallList.length > 0
                    "
                  >
                    购药订单信息
                  </div>
                  <div
                    class="audit-records-table"
                      v-if="
                      detail.orderMallList && detail.orderMallList.length > 0
                    "
                  >
                    <!-- <div class="detail-item-box"
                     v-for="(item, index) in detail.orderMallList"
                      :key="`订单${index}`"
                    > -->
                      <!-- <div class="audit-records-table-head-item flex-1">
                        订单信息
                      </div>
                      <div class="audit-records-table-head-item flex-2">
                        商品列表
                      </div>
                      <div class="audit-records-table-head-item flex-2">
                        供应商信息
                      </div>
                      <div class="audit-records-table-head-item flex-1">
                        订单状态
                      </div>
                      <div class="audit-records-table-head-item flex-2">
                        购药智能审核
                      </div> -->
                       <!-- v-for="(item, index) in detail.orderMallList" -->
                      <!-- :key="`订单${index}`" -->
                       <!-- <div class="detail-item"
                       >
                      <div class="detail-item-label">订单号</div>
                      <div class="detail-item-value"
                      @click="toMedicineOrder(item.id)"
                      >
                        {{ item.serialNumber || '-' }}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">订单时间</div>
                      <div class="detail-item-value">
                         {{
                              $moment(item.createTime).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )
                            }}
                      </div>
                    </div>
                          <div class="detail-item">
                      <div
                      :class="
                          `detail-item-label  flex-2 ${
                            item.medicineList.length <= 1 ? 'item-center' : ''
                          }`
                        "
                      >商品列表</div>
                      <div class="detail-item-value text-overflow"
                      >
                        <template v-if="item.medicineList.length > 1">
                          <div
                            v-for="item1 in item.medicineList"
                            :key="item1.medicineName"
                            class="shopping text-overflow"
                          >
                            {{ item1.medicineName }}—{{ item1.standard }}
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="item1 in item.medicineList"
                            :key="item1.medicineName"
                            class="shopping text-overflow no-border"
                          >
                            {{ item1.medicineName }}—{{ item1.standard }}
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">供应商信息</div>
                      <div class="detail-item-value">
                        <span class="text-overflow">{{
                          item.supplierName || '-'
                        }}</span>
                      </div>
                    </div>
                          <div class="detail-item">
                      <div class="detail-item-label">订单状态</div>
                      <div class="detail-item-value">
                         <span :class="['label-text', columnState[item.status]]">
                          {{ orderState[item.status] }}
                        </span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">购药智能审核</div>
                      <div class="detail-item-value">
                         <span class="text-overflow">{{
                          item.diseaseMatchingResult || '-'
                        }}</span>
                      </div>
                    </div>
                    </div> -->
                    <!-- <div
                      v-for="(item, index) in detail.orderMallList"
                      :key="`订单${index}`"
                      class="audit-records-table-list"
                    >
                      <div
                        class="audit-records-table-list-item flex-1 item-col"
                      >
                        <div>
                          <div
                            class="link-skip text-overflow order"
                            @click="toMedicineOrder(item.id)"
                          >
                            订单号：{{ item.serialNumber || '-' }}
                          </div>
                          <div class="subTitle text-overflow">
                            {{
                              $moment(item.createTime).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )
                            }}
                          </div>
                        </div>
                      </div>
                      <div
                        :class="
                          `audit-records-table-list-item flex-2 ${
                            item.medicineList.length <= 1 ? 'item-center' : ''
                          }`
                        "
                      >
                        <template v-if="item.medicineList.length > 1">
                          <div
                            v-for="item1 in item.medicineList"
                            :key="item1.medicineName"
                            class="shopping text-overflow"
                          >
                            {{ item1.medicineName }}—{{ item1.standard }}
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="item1 in item.medicineList"
                            :key="item1.medicineName"
                            class="shopping text-overflow no-border"
                          >
                            {{ item1.medicineName }}—{{ item1.standard }}
                          </div>
                        </template>
                      </div>
                      <div
                        class="
                            audit-records-table-list-item
                            flex-2
                            text-overflow
                            item-center
                          "
                      >
                        <span class="text-overflow">{{
                          item.supplierName || '-'
                        }}</span>
                      </div>
                      <div
                        class="
                            audit-records-table-list-item
                            flex-1
                            text-overflow
                            item-center
                          "
                      >
                        <span :class="['label-text', columnState[item.status]]">
                          {{ orderState[item.status] }}
                        </span>
                      </div>
                      <div
                        class="
                            audit-records-table-list-item
                            flex-2
                            text-overflow
                            item-center
                          "
                      >
                        <span class="text-overflow">{{
                          item.diseaseMatchingResult || '-'
                        }}</span>
                      </div>
                    </div> -->
                <div class="table">
                    <el-table
                  class="drug-table"
                  :stripe="true"
                  :data="detail.orderMallList"
                   max-height="1000"
                      >
                        <el-table-column label="订单信息">
                          <template slot-scope="scope">
                            <div class="goods-details">
                              <div class="details">
                                <div>
                                  <div
                                    class="link-skip text-overflow order"
                                      @click="toMedicineOrder(scope.row.id)"
                                          >
                                        订单号：{{ scope.row.serialNumber || '-' }}
                                  </div>
                                  <div class="subTitle text-overflow">
                                            {{
                                              $moment(scope.row.createTime).format(
                                                'YYYY-MM-DD HH:mm:ss',
                                              )
                                            }}
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="商品列表">
                          <template slot-scope="scope">
                            <div class="text"
                            :class="`detail-item-label  flex-2 ${
                                scope.row.medicineList.length <= 1 ? 'item-center' : ''}`"
                            >
                              <template v-if="scope.row.medicineList.length > 1">
                                          <div
                                            v-for="item1 in scope.row.medicineList"
                                            :key="item1.medicineName"
                                            class="shopping text-overflow"
                                          >
                                            {{ item1.medicineName }}—{{ item1.standard }}
                                          </div>
                                        </template>
                                        <template v-else>
                                          <div
                                            v-for="item1 in scope.row.medicineList"
                                            :key="item1.medicineName"
                                            class="shopping text-overflow no-border"
                                          >
                                            {{ item1.medicineName }}—{{ item1.standard }}
                                          </div>
                                </template>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="供应商信息">
                          <template slot-scope="scope">
                            <div class="text">
                              <span class="text-overflow">{{
                                          scope.row.supplierName || '-'
                              }}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="订单状态">
                          <template slot-scope="scope">
                            <div class="text">
                              <span :class="['label-text', columnState[scope.row.status]]">
                              {{ orderState[scope.row.status] }}
                              </span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="购药智能审核">
                          <template slot-scope="scope">
                            <div class="text">
                              <span class="text-overflow">{{
                                scope.row.diseaseMatchingResult || '-'
                                }}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <div slot="empty" class="empty-img" />
                </el-table>
                </div>
                  </div>
                  <div v-if="$isNotEmpty(detail.claimSettlement.rejectReasons)">
                    <div class="detail-table-title">不通过原因</div>
                    <div class="detail-item">
                      <div class="detail-item">审核项目</div>
                      <div class="detail-item">原因、备注</div>
                    </div>
                    <div
                      v-for="item in detail.claimSettlement.rejectReasons"
                      :key="item.id + '原因'"
                      class="detail-item"
                    >
                      <div class="detail-item">
                        {{ item.name }}
                      </div>
                      <div class="detail-item padd-17">
                        <div
                          v-for="(itemName, index) in item.childs"
                          :key="`审核项目${index}`"
                          class="drug-items m-b16"
                        >
                          <span class="m-r16"
                            >{{ index + 1 }}、{{ itemName.name || '-' }}</span
                          >
                        </div>
                        <div class="detail-item-time">
                          备注：{{ detail.claimSettlement.remark || '-' }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-collapse
                    v-if="
                      thirdPartyClaimInfo.billData &&
                        thirdPartyClaimInfo.billData.length
                    "
                    v-model="collapseName"
                    accordion
                  >
                    <el-collapse-item
                      v-for="(item, index) in thirdPartyClaimInfo.billData"
                      :key="`账单${index}`"
                      :title="`账单编号${item.billNo}`"
                      :name="index"
                    >
                      <div class="detail-item-box">
                        <div class="detail-item">
                          <div class="detail-item-label">
                            被保险人姓名
                          </div>
                          <div class="detail-item-value">
                            {{ item.name || '-' }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">被保人性别</div>
                          <div class="detail-item-value">
                            {{ item.sex === '1' ? '男' : '女' }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">证件类型</div>
                          <div class="detail-item-value">
                            身份证/护照号码
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">证件号码</div>
                          <div class="detail-item-value">
                            {{ item.idCard || '-' }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">出险类型</div>
                          <div class="detail-item-value">
                            {{ item.accidentType | accidentType }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">入院日期</div>
                          <div class="detail-item-value">
                            {{ item.inCourtyardDate }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">出院日期</div>
                          <div class="detail-item-value">
                            {{ item.outCourtyardDate }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">就诊医院</div>
                          <div class="detail-item-value">
                            {{ item.hospitalName }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊医院代码
                          </div>
                          <div class="detail-item-value">
                            {{ item.hospitalCode }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊疾病名称
                          </div>
                          <div class="detail-item-value">
                            {{ item.diseaseName }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊疾病代码
                          </div>
                          <div class="detail-item-value">
                            {{ item.diseaseCode }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>账单金额&nbsp; </div>
                            <div class="lh-14 fw-0">&nbsp; 自费统筹</div>

                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.billAmount }}
                            </div>
                            <div class="lh-14">
                              {{ item.oneselfAmount }}
                            </div>
                            <div>
                              {{ item.wholePlan }}
                            </div>
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>账单号码&nbsp; </div>
                            <div class="lh-14 fw-0">&nbsp; 乙类其他</div>

                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.billNo || '-' }}
                            </div>
                            <div class="lh-14">
                              {{ item.classB || '-' }}
                            </div>
                            <div>
                              {{ item.other || '-' }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                  <el-collapse
                    v-if="
                      thirdPartyClaimInfo.claimData &&
                        thirdPartyClaimInfo.claimData.length
                    "
                    v-model="claimDataCollapseName"
                    accordion
                  >
                    <el-collapse-item
                      v-for="(item, index) in thirdPartyClaimInfo.claimData"
                      :key="`结论${index}`"
                      :title="`结论信息${item.caseNo}`"
                      :name="index"
                    >
                      <div class="detail-item-box">
                        <div class="detail-item">
                          <div class="detail-item-label">案件结论</div>
                          <div class="detail-item-value">
                            {{ item.caseConclusion | caseConclusion }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">拒赔原因</div>
                          <div class="detail-item-value">
                            {{ item.rejectedCause }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">出险日期</div>
                          <div class="detail-item-value">
                            {{ item.accidentDate }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">出险地点</div>
                          <div class="detail-item-value">
                            {{ item.placeOfDanger }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">出险类型</div>
                          <div class="detail-item-value">
                            {{ item.accidentType | accidentType }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">赔付金额</div>
                          <div class="detail-item-value">
                            {{ item.claimAmount }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">入院日期</div>
                          <div class="detail-item-value">
                            {{ item.inCourtyardDate }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">出院日期</div>
                          <div class="detail-item-value">
                            {{ item.outCourtyardDate }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">就诊医院</div>
                          <div class="detail-item-value">
                            {{ item.hospitalName }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊医院代码
                          </div>
                          <div class="detail-item-value">
                            {{ item.hospitalCode }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊疾病代码
                          </div>
                          <div class="detail-item-value">
                            {{ item.diseaseCode }}
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            就诊疾病名称
                          </div>
                          <div class="detail-item-value">
                            {{ item.diseaseName }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>账单金额</div>
                          </div>
                          <div class="detail-item-value">
                            {{ item.billAmount }}
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>案件号</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.caseNo }}
                            </div>
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>银行名称</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.bankName }}
                            </div>
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>户名</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.accountName }}
                            </div>
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>银行所属省份</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.provinceBank }}
                            </div>
                          </div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>支行名称</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.bankBranch }}
                            </div>
                          </div>
                        </div>

                        <div class="detail-item">
                          <div class="detail-item-label">
                            <div>银行账号</div>
                          </div>
                          <div class="detail-item-value">
                            <div>
                              {{ item.bankAccount }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
              <div v-if="activeName === '2'">
                <supplementaryinformation :id="$route.params.id" />
              </div>
              <div v-if="activeName === '3'" class="log-lists">
                <div class="log-list">
                  <div
                    v-for="(item, index) in logList"
                    :key="index"
                    class="log-item"
                  >
                    <div>
                      <span class="dot" />
                      <span class="time"
                        >{{
                          $moment(item.recordTime).format('YYYY-MM-DD HH:mm:ss')
                        }}
                      </span>
                      <span class="name">{{ item.operation }}</span>
                      <span class="name"
                        >{{ operationType[item.operation]
                        }}{{ menuType[item.type] }}</span
                      >
                    </div>
                    <div v-if="item.remark" class="log-reason">
                      {{ item.remark }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="activeName === '4'">
                <DrugType />
              </div>
            </div>
            <div class="claimWarnModal">
              <div
                :class="visibleWarning ? 'tip close' : 'tip open'"
                @click="visibleWarning = !visibleWarning"
              >
                <div :class="visibleWarning ? 'claim-open' : 'claim-close'" />
                <span>
                  {{
                    visibleWarning
                      ? '收起'
                      : '智能核赔预警(' + visibleWarningBox + ')'
                  }}</span
                >
              </div>
              <transition name="slide-fade">
                <claimWarning
                  v-show="visibleWarning"
                  :drug-price-list="drugPriceList"
                  :visible-warning="visibleWarning"
                  :visible-warning-data="visibleWarningData"
                  @getDrugPriceList="getDrugPriceList"
                  @toDurg="drugToggle"
                />
              </transition>
            </div>
          </div>

          <claimReasonDialog
            :id="$route.params.id"
            :visible.sync="dialogVisible"
            :state="detail.claimSettlement.state"
            :second-state="detail.claimSettlement.secondState"
            @saved="goBack()"
          />
        </div>
      </el-scrollbar>
      <div
        v-if="
          (detail.claimSettlement.state === 4 ||
            detail.claimSettlement.secondState === 4) &&
            activeName != '2' &&
            pageAuthority.includes('review')
        "
        class="page-footer"
      >
        <el-button
          size="small"
          class="btn-bg-blue"
          type="primary"
          @click="passReview()"
          >审核通过</el-button
        >
        <el-button
          size="small"
          class="btn-border-blue"
          type="default"
          border
          @click="reject()"
          >驳回修改</el-button
        >
      </div>
      <DrugPriceComparison
        v-if="drugShow"
        :drug-params="drugParams"
        :drug-price-list="drugPriceList"
        @getDrugPriceList="getDrugPriceList"
        @close="drugToggle"
      />
      <Dialog
        title="复核意见"
        :visible="closeClickModal"
        :height="251"
        :width="445"
        @closed="close"
      >
        <div class="health-tip-content">
          <el-input
            v-model="description"
            class="remarkBox"
            type="textarea"
            maxlength="100"
            placeholder="复核意见"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeClickModal = false">取消</el-button>
          <el-button type="primary" @click="agree">确定</el-button>
        </span>
      </Dialog>
      <Dialog
        title="请确认"
        :visible="settleDialog"
        :height="
          detail.claimSettlement.state === 4 ||
          detail.claimSettlement.secondState === 4
            ? 380
            : 251
        "
        :width="600"
        @closed="closeSettleDia"
      >
        <div class="health-tip-content">
          <div class="settleTitle">
            {{
              detail.claimSettlement.state === 1
                ? `“${detail.claimSettlement.serviceInfoName}”的理赔申请确认初审通过吗？`
                : `确认审核通过“${detail.claimSettlement.serviceInfoName}”的理赔申请？`
            }}
          </div>
          <div class="settleSecond">
            {{
              detail.claimSettlement.state === 1
                ? '(通过后将进入医学待审核)'
                : ''
            }}
          </div>
          <div
            v-if="
              detail.claimSettlement.state === 4 ||
                detail.claimSettlement.secondState === 4
            "
            class="claim-money"
          >
            <div class="claim-money-title">是否需要调整理赔金额</div>
            <div class="claim-money-radio">
              <el-radio v-model="radio" label="1">无需调整</el-radio>
            </div>
            <div class="claim-money-radio">
              <el-radio v-model="radio" label="2">金额调整至</el-radio>
              <el-input
                v-model="claimAmount"
                type="number"
                class="claim-money-input"
                placeholder="金额"
              />元
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="settleDialog = false">取消</el-button>
          <el-button type="primary" @click="sureSettle">{{
            detail.claimSettlement.state == '1' ? '初审通过' : '审核通过'
          }}</el-button>
        </span>
      </Dialog>
    </el-container>
  </div>
</template>

<script>
import claimReasonDialog from './components/claimReasonDialog';
import claimWarning from './components/claimWarning';
import supplementaryinformation from './components/supplementaryinformation';
import DrugType from './components/drugType.vue';
import { claimSettelementCheck } from '@/api/claims';
import {
  operationType,
  menuType,
  orderState,
  columnState,
  claimState
} from '@/utils/enum';
import DrugPriceComparison from './components/drugPriceComparison';
export default {
  name: 'auditRecordsDetail',
  components: {
    claimReasonDialog,
    claimWarning,
    DrugPriceComparison,
    supplementaryinformation,
    DrugType
  },
  filters: {
    waitProcessTime(val) {
      const sends = Math.floor(val / 1000);
      const hour = Math.floor(sends / 3600);
      const mins = Math.floor((sends - hour * 3600) / 60);
      return `${hour}小时${mins}分钟`;
    },
    getReason(val) {
      let text = '';
      val.forEach((item, index) => {
        text += index ? `, ${item.name}` : `${item.name}`;
      });
      return text;
    },
    caseConclusion(val) {
      if (val === '1') {
        return '给予赔付';
      } else if (val === '2') {
        return '通融赔付';
      } else if (val === '3') {
        return '拒赔';
      } else {
        return '-';
      }
    },
    accidentType(val) {
      if (val === '1') {
        return '意外';
      } else if (val === '2') {
        return '上海';
      } else {
        return '-';
      }
    },
    sexFilter(val) {
      if (val === '1') {
        return '男';
      } else if (val === '2') {
        return '女';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      claimState,
      logList: [],
      activeName: '1',
      btns: [
        { value: '1', name: '基础信息' },
        { value: '2', name: '理赔材料' },
        { value: '4', name: '药品分类' },
        { value: '3', name: '操作日志' }
      ],
      dialogVisible: false,
      detail: {
        rejectReasons: [],
        materialMsgList: [],
        insuranceClaimInfo: {
          drugInfoList: [],
          checkInfoList: []
        },
        orderMallList: [],
        claimSettlement: {
          insuredMsg: {}
        },
        thirdPartyClaimInfo: null
      },
      menuType,
      operationType,
      columnState,
      orderState,
      visibleWarning: false,
      visibleWarningData: {},
      drugShow: false,
      visibleWarningBox: '',
      drugPriceList: {},
      drugParams: {},
      closeClickModal: false,
      description: '',
      remarkList: [],
      settleDialog: false,
      collapseName: 0,
      radio: '1',
      claimAmount: '',
      claimDataCollapseName: 0
    };
  },
  computed: {
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    },
    showBtn() {
      if (this.detail.claimSettlement.claimType === 1) {
        return true;
      } else {
        if (
          this.detail.claimSettlement.state === 4 ||
          this.detail.claimSettlement.secondState === 4
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    thirdPartyClaimInfo() {
      if (this.detail.thirdPartyClaimInfo) {
        return this.detail.thirdPartyClaimInfo;
      } else {
        return {
          billData: [],
          claimData: [
            {
              accidentDate: '',
              accountName: '',
              address: '',
              bankAccount: '',
              bankBranch: '',
              bankName: '',
              billAmount: '',
              caseCode: '',
              caseConclusion: '',
              caseNo: '',
              certificateEndTime: '',
              certificateStartTime: '',
              cityBank: '',
              claimAmount: '',
              diseaseCode: '',
              diseaseName: '',
              dutyCode: '',
              hospitalCode: '',
              hospitalName: '',
              inCourtyardDate: '',
              individualClaimNo: '',
              insuredIdCard: '',
              insuredIdType: '',
              insuredName: '',
              insuredSex: '',
              mobile: '',
              outCourtyardDate: '',
              payDutyCode: '',
              placeOfDanger: '',
              planCode: '',
              policyNo: '',
              provinceBank: '',
              rejectedCause: ''
            }
          ]
        };
      }
    },
    statusImg() {
      const { stateText } = this.detail.claimSettlement;
      let arr = [];
      if (stateText === '待审核') {
        arr = ['status-img'];
      }
      if (stateText === '审核通过') {
        arr = ['status-img', 'status-3'];
      }
      if (stateText === '审核不通过') {
        arr = ['status-img', 'status-2'];
      }

      if (stateText === '待复核') {
        arr = ['status-img', 'status-4'];
      }
      if (stateText === '待审核-初审不通过') {
        arr = ['status-img', 'status-5'];
      }

      return arr;
    }
  },
  created() {
    this.getDetail();
    // 获取核赔预警详情
    this.$store
      .dispatch('auditRecords/claimStatisticsDetail', this.$route.params.id)
      .then(res => {
        this.visibleWarningData = res.data instanceof Array ? {} : res.data;
        if (
          this.visibleWarningData.warnInfos ||
          this.visibleWarningData.warnInfosByB
        ) {
          const num1 = this.visibleWarningData.warnInfos
            ? this.visibleWarningData.warnInfos.length
            : 0;
          const num2 = this.visibleWarningData.warnInfosByB
            ? this.visibleWarningData.warnInfosByB.length
            : 0;
          this.visibleWarningBox = num1 + num2;
        } else {
          this.visibleWarningBox = 0;
        }
      });
  },
  methods: {
    // 状态图标
    getimg() {
      if (this.detail.claimSettlement.state === 1) {
        return '';
      } else if (
        this.detail.claimSettlement.state === 2 &&
        this.detail.claimSettlement.secondState === 1
      ) {
        return '';
      } else if (
        this.detail.claimSettlement.state === 2 &&
        this.detail.claimSettlement.secondState === 4
      ) {
        return '';
      } else if (this.detail.claimSettlement.state === 3) {
        return 'status-2';
      } else if (
        this.detail.claimSettlement.state === 2 &&
        this.detail.claimSettlement.secondState === 3
      ) {
        return 'status-2';
      } else if (this.detail.claimSettlement.secondState === 2) {
        return 'status-3';
      }
    },
    // 跳转诊疗资料结构化数据
    toTreatmentInfomation() {
      const routeData = this.$router.resolve({
        path: `/claimManagement/treatmentInfomation/${this.$route.params.id}`
      });
      window.open(routeData.href, '_blank');
    },
    // 跳转购药订单
    toMedicineOrder(id) {
      const routeData = this.$router.resolve({
        path: `/drugManage/orderDetails/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    /**
     * 获取详情数据
     */
    async getDetail() {
      const res = await this.$store.dispatch('auditRecords/getClaimDetail', {
        id: this.$route.params.id
      });
      if (res) {
        res.obj.materialMsgList = res.obj.materialMsgList || [];
        res.data.insuranceClaimInfo = res.data.insuranceClaimInfo || {};
        this.detail = Object.assign(this.detail, res.data);
        this.remarkList = this.detail.claimSettlement.remark
          ? this.detail.claimSettlement.remark.split('；')
          : [];
        this.remarkList.length > 0 &&
          this.remarkList[this.remarkList.length - 1] === '' &&
          this.remarkList.pop();
        if (!res.data.buyMedicine) {
          this.btns = [
            { value: '1', name: '基础信息' },
            { value: '2', name: '理赔材料' },
            { value: '3', name: '操作日志' }
          ];
        }
      }
    },
    /**
     * 驳回数据
     */
    reject() {
      this.dialogVisible = !this.dialogVisible;
    },
    /**
     * 通过
     */
    passReview() {
      this.settleDialog = true;
    },
    sureSettle() {
      const { secondState, state } = this.detail.claimSettlement;
      let isSecond = false;
      state === 2 && secondState === 1 && (isSecond = true);
      state === 2 && secondState === 4 && (isSecond = true);

      const params = {
        claimRecordId: this.$route.params.id,
        isSecond
      };
      if (state === 2 && this.radio === '2') {
        if (!/^\d+(\.\d{1,2})?$/.test(this.claimAmount)) {
          this.$message.error('金额有误!');
          return;
        } else if (this.claimAmount > 9999999) {
          this.$message.error('最大9999999!');
          return;
        }
        params.claimAmount = this.claimAmount;
      }
      this.$store
        .dispatch('auditRecords/passReview', params)
        .then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '审核成功'
            });
            this.goBack();
          }
        })
        .catch(() => {
          this.closeSettleDia();
        });
    },
    /**
     * 查看日志
     */
    async getLog() {
      const res = await this.$store.dispatch(
        'auditRecords/reviewLog',
        this.$route.params.id,
      );
      if (res) {
        this.logList = res.data || [];
      }
    },
    close() {
      this.closeClickModal = false;
    },
    closeSettleDia() {
      this.settleDialog = false;
    },
    /**
     * 跳转至保单详情
     */
    lookDetails(item) {
      let url = '';
      if (this.detail.claimSettlement.policyType === 0) {
        // 个险
        url = `/policyManage/personalPolicy/details/${item}`;
      } else {
        // 团险
        url = `/policyManage/groupPolicy/details/${item}`;
      }
      const routeData = this.$router.resolve({
        path: url
      });
      window.open(routeData.href, '_blank');
      // this.$router.push(url)
    },
    /**
     * 按钮组change
     */
    btnChange(val) {
      this.activeName = val;
      if (val === '3') {
        this.getLog();
      }
    },
    agreeCheck() {
      if (!this.detail.claimSettlement.checkState) {
        this.closeClickModal = true;
      }
    },
    agree() {
      claimSettelementCheck({
        id: this.$route.params.id,
        description: this.description
      }).then(() => {
        this.getDetail();
        this.close();
      });
    },
    /**
     * 获取审核不通过原因
     */
    getReasonName(itemList, id) {
      if (this.$isNotEmpty(itemList) && this.$isNotEmpty(id)) {
        const dataItem = itemList.find(item => item.id === id);
        if (this.$isNotEmpty(dataItem)) {
          return dataItem.name;
        }
      }
      return '';
    },
    /**
     * 返回记录页面
     */
    goBack() {
      this.$router.push('/claimManagement/auditRecords');
    },
    // 药品比价
    drugToggle() {
      this.drugShow = !this.drugShow;
    },
    // 获取药品数据
    getDrugPriceList(params) {
      this.drugParams = params;
      this.$store
        .dispatch('auditRecords/getDrugPriceList', params)
        .then(res => {
          this.drugPriceList = res.data;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.scrollbar{
  width: 99%;
}
.policy-info-red {
  font-size: 14px;

  font-weight: 400;
  color: #f64e60;
  line-height: 14px;
  margin-left: 8px;
}
.table {
      width: 100%;
    padding: 16px 32px;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    .drug-table {
      /deep/ table th {
        background-color: #eef6fe;
      }
    }
}
// .data-list{
//    width: 1091px;
// }
.leaving-message-info {
    width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
}
.detail-item-box {
  width: 100%;
  min-height: 48px;
  height: 100%;
  display: flex;
  border: 1px solid #ebedf2;
  border-top: none;
  font-size: 14px;
  color: #545473;
  flex-flow: row wrap;

  .detail-item {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-label {
      // flex: 1;
      // display: flex;
      // align-items: center;
      // min-height: 48px;
      // height: 100%;
      // font-weight: bold;
      // padding-left: 32px;
      border-right: 1px solid #ebedf2;
      border-bottom: 1px solid #ebedf2;
       display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
    }
    &-value {
      display: flex;
      flex: 1;
      padding-left: 42px;
      align-items: center;
      color: #545473;
      min-height: 48px;
      height: 100%;
      border-right: 1px solid #ebedf2;
      border-bottom: 1px solid #ebedf2;
    }
  }
}
.health-tip-content {
  .settleTitle {
    font-size: 18px;

    font-weight: bold;
    color: #464668;
    line-height: 1.25;
    margin-bottom: 16px;
    text-align: center;
  }
  .settleSecond {
    font-size: 16px;

    font-weight: 400;
    color: #989ab3;
    line-height: 21px;
    text-align: center;
  }
}
.audit-records-table {
  &-head {
    height: 48px;
    display: flex;
    .flex-2 {
      width: 25%;
    }
    .flex-1 {
      width: 12.5%;
    }
    &-item {
      font-size: 14px;
      font-weight: bold;
      color: #989ab3;
      line-height: 48px;
      padding-left: 16px;
      box-sizing: border-box;
      border: 1px solid #e8e8e8;
    }
  }
  &-list {
    display: flex;
    .flex-2 {
      width: 25%;
    }
    .flex-1 {
      width: 12.5%;
    }
    .item-center {
      display: flex;
      align-items: center;
      padding-left: 16px;
      box-sizing: border-box;
      line-height: 18px;
    }
    .item-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-item {
      font-size: 14px;
      border: 1px solid #e8e8e8;
      color: #464668;

      overflow: hidden;
      > div.shopping {
        width: 100%;
        overflow: hidden;
        padding: 17px 16px;
        box-sizing: border-box;
        box-shadow: 0px 1px 0px 0px #e8e8e8;
      }
      div.order {
        padding: 17px 16px;
      }
      .subTitle {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #989ab3;
        line-height: 14px;
        padding: 0 16px 17px;
        box-sizing: border-box;
      }
    }
  }
}

.status {
  width: 100%;
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: #fff;
  margin-bottom: 24px;
  .left {
    display: flex;
    align-items: center;
    .status-img {
      width: 53px;
      height: 58px;
      background-size: 100% 100%;
      background-image: url('../../../assets/status_1.png');
      &.status-2 {
        background-image: url('../../../assets/status_2.png');
      }
      &.status-3 {
        background-image: url('../../../assets/status_3.png');
      }
      &.status-4 {
        background-image: url('../../../assets/status_4.png');
      }
      &.status-5 {
        background-image: url('../../../assets/status_5.png');
      }
    }
    .status-content {
      margin-left: 16px;
      &-top {
        align-items: center;
        font-size: 18px;
        color: #3599fe;
        display: flex;
        align-items: flex-end;

        .state-text {
          font-weight: 500;
          font-size: 18px;

          &.state-1 {
            color: #3599fe;
          }
          &.state-2 {
            color: #ffa800;
          }
          &.state-3 {
            color: #8950fc;
          }
          &.state-4 {
            color: #f64e60;
          }
          &.state-5 {
            color: #18c4bd;
          }
        }
        .reason {
          font-size: 14px;

          font-weight: 400;
          color: #989ab3;
          line-height: 14px;
          margin-left: 8px;
          color: #989ab3;
          font-size: 14px;
        }
        .more {
          font-size: 14px;

          font-weight: 400;
          color: #3599fe;
          line-height: 14px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
      &-bottom {
        font-size: 14px;
        display: flex;
        color: #989ab3;
        margin-top: 12px;
        .time {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          &.state-1 {
            background-image: url('../../../assets/wait_icon.png');
            background-size: 100% 100%;
          }
          &.state-2 {
            background-image: url('../../../assets/claim-state-2.png');
            background-size: 100% 100%;
          }
          &.state-3 {
            background-image: url('../../../assets/claim-state-3.png');
            background-size: 100% 100%;
          }
          &.state-4 {
            background-image: url('../../../assets/close_icon.png');
            background-size: 100% 100%;
          }
          &.state-5 {
            background-image: url('../../../assets/success.png');
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .right {
    width: 89px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #e1f1ff;
    border-radius: 4px;
    border: 1px solid #3599fe;
    font-size: 14px;
    color: #3599fe;
    cursor: pointer;
    &.disable {
      border: 1px solid #989ab3;
      background: #ebedf2;
      color: #989ab3;
    }
  }
}

.data-list {
  padding-bottom: 60px;
}
.el-main::-webkit-scrollbar {
  display: none;
}
.el-main {
  padding-bottom: 0;
}
/deep/main.el-scrollbar__view {
  min-height: calc(100vh - 162px);
  max-height: calc(100vh - 162px);
}
.overflow {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.h-top {
  min-height: calc(100vh - 162px);
  max-height: calc(100vh - 162px);
  overflow: auto;
  .min-height {
    min-height: calc(100vh - 162px - 130px);
    overflow: auto;
  }
}
.fixted-bottom {
  position: fixed;
  bottom: 10px;
  left: 274px;
  right: 30px;
  height: 68px;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
  border-radius: 0px 0px 4px 4px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
  .btn-border-blue {
    border: 1px solid #3599fe;
    color: #3599fe;
  }
  .btn-bg-blue {
    color: #fff;
    background: #3599fe;
  }
}
.detail {
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(417px);
  }
  .claimWarnModal {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    .tip {
      z-index: 3;
      position: absolute;
      right: 0;
      top: 20px;
      height: 36px;
      background: #3599fe;
      box-shadow: 0px 0px 11px 0px rgba(204, 204, 204, 0.5);
      border-radius: 100px 0px 0px 100px;
      transition: all 0.8s;
      font-size: 14px;

      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 0px 11px rgba(204, 204, 204, 0.5);
      cursor: pointer;
      &.close {
        width: 74px;
      }
      &.open {
        width: 162px;
      }
      .claim-open {
        display: inline-block;
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin: 0 6px 0 12px;
        background: url('../../../assets/claim-open.png') no-repeat center
          center;
        background-size: contain;
      }
      .claim-close {
        display: inline-block;
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin: 0 6px 0 12px;
        background: url('../../../assets/claim-close.png') no-repeat center
          center;
        background-size: contain;
      }
      span {
        vertical-align: middle;
        line-height: 36px;
      }
    }
  }
}
.productList {
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
.img-box {
  width: 100px;
  height: 100px;
  /deep/ .el-image-viewer__img {
    background-color: #fff;
  }
}
.log-reason {
  color: #f64e60;
  margin: 24px 0 24px 50px;
}
.bg-fff {
  background-color: #fff;
  padding: 24px;
}
.no-border {
  box-shadow: none !important;
}

.fw-0 {
  font-weight: normal;
}
.claim-money {
  &-title {
    font-size: 14px;

    font-weight: 600;
    color: #464668;
    line-height: 14px;
    margin-top: 24px;
  }
  &-radio {
    margin-top: 17px;
    display: flex;
    align-items: center;
  }
  &-input {
    width: 200px;
    margin-left: -20px;
    margin-right: 10px;
  }
}
/deep/ .el-collapse-item {
  .el-collapse-item__header {
    height: 48px;
    background: #f3f6f9;
    border: 1px solid #e8e8e8;
    border-top: none;
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #545473;
    line-height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 12px;
    }
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
