<template>
  <div class="page-service-pack-details page-form modal-form">
    <el-container>
      <el-main>
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <div class="details-content flex-col">
            <Tab
              :btns="btns"
              :current-key="activeName"
              :btn-style="{ overflow: 'visible' }"
              @change="handleClick"
            />
            <div class="scroll-table">
              <div v-show="activeName === '0'">
                <div class="data-list">
                  <div class="title-top content-detail">基础信息</div>
                  <div class="data-form">
                    <el-row :gutter="20">
                      <el-col v-if="type" :span="12">
                        <el-form-item label="ID" prop="id">
                          <el-input v-model="baseForm.orderNumber" disabled />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="服务包名称" prop="packageName">
                          <el-input
                            v-model="baseForm.packageName"
                            :disabled="type"
                            placeholder="请输入服务包名称"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="服务分类"
                          prop="packageCategoryIdList"
                        >
                          <el-select
                            v-model="baseForm.packageCategoryIdList"
                            :disabled="!edit || baseForm.postStatus !== 107"
                            placeholder="请选择服务分类"
                            filterable
                            multiple
                            clearable
                          >
                            <el-option
                              v-for="item in serviceCategory"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="使用类型" prop="packageType">
                          <el-select
                            v-model="baseForm.packageType"
                            :disabled="!edit || baseForm.postStatus !== 107"
                            filterable
                            placeholder="请选择使用类型"
                          >
                            <el-option
                              v-for="item in packageTypes"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-if="baseForm.packageType === 3" :span="12">
                        <el-form-item label="有效期" prop="validTime">
                          <el-input
                            v-model="baseForm.validTime"
                            placeholder="请输入有效期"
                          >
                            <template slot="append">月</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="服务包成本上限"
                          prop="packageDegression"
                        >
                          <el-input
                            v-model="baseForm.packageDegression"
                            placeholder="请输入"
                            :disabled="!edit || baseForm.postStatus === 105"
                          >
                            <template slot="append">元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                       <el-col :span="12">
                        <el-form-item label="最低服务数量" prop="serviceNum">
                          <el-input
                            v-model.number="baseForm.serviceNum"
                            placeholder="请输入"
                            :disabled="!edit || baseForm.postStatus === 105"
                          >
                            <template slot="append">个</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <SetSales
                          :id="baseForm.id"
                          ref="sales"
                          :checked="flag"
                          :detail="isDetail"
                          :package-type="baseForm.packageType"
                          :type="!edit || baseForm.postStatus === 105"
                        />
                      </el-col>
                      <el-col v-if="type" :span="12">
                        <el-form-item label="发布状态">
                          <el-select
                            v-model="baseForm.postStatus"
                            disabled
                            placeholder="请选择发布状态"
                          >
                            <el-option
                              v-for="item in postStatusList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <div v-if="baseForm.packageType === 3">
                        <el-col :span="24">
                          <el-form-item label="简介" prop="packageDescribe">
                            <el-input
                              v-model="baseForm.packageDescribe"
                              type="textarea"
                              :maxlength="40"
                              :disabled="!edit || baseForm.postStatus !== 105"
                              placeholder="请输入简介"
                              show-word-limit
                            />
                            <!-- <InputMaxTip
                              :max="40"
                              :current-key="baseForm.packageDescribe"
                            /> -->
                          </el-form-item>
                        </el-col>
                      </div>
                      <div v-show="baseForm.packageType === 3">
                        <el-col :span="24">
                          <el-form-item label="">
                            <div class="required-box">
                              <div class="required">
                                <span class="required">*</span>
                                <span class="label">服务特色</span>
                              </div>
                              <div id="editor" />
                            </div>
                          </el-form-item>
                        </el-col>
                      </div>
                      <div v-if="baseForm.packageType === 3">
                        <el-col :span="12">
                          <el-form-item
                            label="宣传头像 (建议图像长宽比例5：2，展示效果更佳)"
                            prop="propagandaPic"
                          >
                            <div class="upload">
                              <UploadImg
                                :url="baseForm.propagandaPic"
                                name="propagandaPic"
                                @changeUrl="changeUrl"
                                :disabled="!edit || baseForm.postStatus !== 107"
                                @deleteImage="deleteImage"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                      </div>
                      <div v-else>
                        <el-col :span="24">
                          <el-form-item label="简介" prop="packageDescribe">
                            <el-input
                              v-model="baseForm.packageDescribe"
                              type="textarea"
                              :maxlength="40"
                              :disabled="!edit || baseForm.postStatus !== 107"
                              placeholder="请输入简介"
                              show-word-limit
                            />
                            <!-- <InputMaxTip
                              :max="40"
                              :current-key="baseForm.packageDescribe"
                            /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="宣传头像" prop="propagandaPic">
                            <div class="upload">
                              <UploadImg
                                :url="baseForm.propagandaPic"
                                name="propagandaPic"
                                @changeUrl="changeUrl"
                                @deleteImage="deleteImage"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="详情图片" prop="detailPic">
                            <div class="upload">
                              <UploadImg
                                :url="baseForm.detailPic"
                                name="detailPic"
                                @changeUrl="changeUrl"
                                @deleteImage="deleteImage"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                      </div>
                    </el-row>
                  </div>
                </div>
              </div>
              <div v-show="activeName === '1'">
                <div class="data-list">
                  <div class="service-type">
                    <div class="service-type-title">服务类型</div>
                    <div class="service-type-radio">
                      <el-radio-group
                        v-model="baseForm.servicePackageType"
                        @change="servicePackageTypeChange"
                      >
                        <el-radio :label="1">指定服务</el-radio>
                        <el-radio :label="2">指定服务+匹配服务</el-radio>
                        <el-radio :label="3">智能匹配服务</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                  <div
                    v-if="
                      baseForm.servicePackageType === 1 ||
                        baseForm.servicePackageType === 2
                    "
                    class="data-item-table"
                  >
                    <div class="title-top content-detail">
                      服务列表
                      <button
                        v-if="pageAuthority.includes('edit')"
                        type="button"
                        class="btn-save fr"
                        @click="addProduct"
                      >
                        新增
                      </button>
                    </div>
                    <el-table
                      v-loading="tableLoading"
                      :data="baseForm.serviceInfos || []"
                    >
                      <el-table-column label="服务名称">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.serviceName }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务ID">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                          >
                            {{ item.serviceId }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务项名称">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                            class="link-skip"
                            @click="lookServiceItemsDetail(item.serviceInfoId)"
                          >
                            {{ item.serviceInfoName }}
                            <span v-if="item.probability"
                              >({{ item.probability }}%)</span
                            >
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务项别称">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                          >
                            {{ item.serviceAlias }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用限次">
                        <template slot-scope="scope">
                          <div>
                            {{
                              scope.row.useLimitCount === -1
                                ? '无限次'
                                : `${scope.row.useLimitCount}次`
                            }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用次数">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                          >
                            {{
                              item.useCount === -1
                                ? '无限次'
                                : `${item.useCount || 0}次`
                            }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="单价成本">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                          >
                            {{ item.serviceCostPrice }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用率">
                        <template slot-scope="scope">
                          <div
                            v-for="item in scope.row.serviceInfoAndProviderList"
                            :key="item.serviceInfoId"
                          >
                            {{ item.useRate || 0 }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新时间">
                        <template slot-scope="scope">
                          <div>
                            {{
                              scope.row.updateTime | timeFormat('yyyy-MM-dd')
                            }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="76">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="此操作将解除该服务项绑定关系, 是否继续?"
                            placement="top"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            confirm-button-type="plain"
                            cancel-button-type="primary"
                            :hide-icon="true"
                            @onConfirm="deleteServiceItem(scope.row.id)"
                          >
                            <HoverTip
                              v-show="
                                (!type || edit) && baseForm.postStatus === 107
                              "
                              slot="reference"
                              content="删除"
                              tip-class-name="icon-delete"
                            />
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                      <div slot="empty" class="empty-img" />
                    </el-table>
                    <div class="select-all">
                      <el-row :gutter="20">
                        <el-col
                          v-if="!!baseForm.serviceInfos.length"
                          :span="12"
                        >
                          <el-form-item label="是否全选">
                            <el-radio-group
                              v-model="baseForm.isSelectAll"
                              :disabled="
                                !edit ||
                                  baseForm.postStatus !== 107 ||
                                  baseForm.serviceInfos.length < 2
                              "
                            >
                              <el-radio :label="1">全选</el-radio>
                              <el-radio :label="0">不全选</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col
                          v-if="
                            !baseForm.isSelectAll &&
                              baseForm.serviceInfos.length > 0
                          "
                          :span="12"
                        >
                          <el-form-item label="可选数量">
                            <el-input-number
                              v-model="baseForm.serviceOptionalNum"
                              class="text-center"
                              :disabled="!edit || baseForm.postStatus !== 107"
                              :min="1"
                              :max="baseForm.serviceInfos.length"
                              placeholder="请输入可选数量"
                              @change="serviceOptionalNumChange"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div
                    v-if="
                      baseForm.servicePackageType === 2 ||
                        baseForm.servicePackageType === 3
                    "
                    class="double-service"
                  >
                  <el-row :gutter="20">
                  <el-col :span="24">
                    <div class="double-service-title mt-24">服务列表</div>
                    <div class="double-service-tip">
                      可匹配服务共<span class="num" @click="openDialog()">{{
                        matchingNum
                      }}</span
                      >项
                    </div>
                    <div class="double-service-input">
                      <el-input
                        v-model="matchingName"
                        class="w-400"
                        placeholder="搜索服务项名称"
                      />
                      <HoverTip
                        content="查询"
                        tip-class-name="icon-search ml-30"
                        @click.native.prevent="
                          searchMatchingList({
                            page: 1,
                          })
                        "
                      />
                    </div>
                    </el-col>
                  </el-row>
                    <el-table
                      v-loading="doubleServicetableLoading"
                      :data="matchingServiceList"
                    >
                      <el-table-column label="服务ID">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.serviceId || '-' }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务项名称">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.serviceInfoName || '-' }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用次数">
                        <template slot-scope="scope">
                          <div>{{ scope.row.useCount }}次</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="单价成本">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.serviceCostPrice }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="分配率">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.distributeRate }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用率">
                        <template slot-scope="scope">
                          <div>
                            {{ scope.row.useRate }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新时间">
                        <template slot-scope="scope">
                          <div>
                            {{
                              scope.row.updateTime | timeFormat('yyyy-MM-dd')
                            }}
                          </div>
                        </template>
                      </el-table-column>
                      <div slot="empty" class="empty-img" />
                    </el-table>
                    <Pagination
                      :total="pagingOptions.total"
                      :limit="pagingOptions.pageSize"
                      :page="pagingOptions.pageNum"
                      layout="total, prev, pager, next"
                      @pagination="searchMatchingList"
                    />
                  </div>
                </div>
              </div>
              <div v-if="activeName === '2'">
                <div class="data-list">
                  <div class="title-top content-detail">产品列表</div>
                  <div class="data-item-table">
                    <el-table
                      v-loading="tableLoading"
                      :data="baseForm.insuranceProducts"
                    >
                      <el-table-column label="序号" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.orderNumber }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="保险产品名称">
                        <template slot-scope="scope">
                          <span>{{ scope.row.name || '-' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="保险分类">
                        <template slot-scope="scope">
                          <span>{{
                            insuranceType[scope.row.type] || '-'
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新时间" width="200">
                        <template slot-scope="scope">
                          <span>{{
                            scope.row.updateTime | timeFormat('yyyy-MM-dd')
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                          <HoverTip
                            content="查看"
                            tip-class-name="icon-detail"
                            class="mr-30"
                            @click.native.prevent="
                              lookProductDetail(scope.row.id)
                            "
                          />
                        </template>
                      </el-table-column>
                      <div slot="empty" class="empty-img" />
                    </el-table>
                  </div>
                </div>
              </div>
              <div v-show="activeName == '3'">
                <div class="title-top content-detail">需求数据</div>
                <div class="data-list">
                  <div
                    :class="
                      needDataShow[0].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    客户数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in needDataShow[0]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      needDataShow[1].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    投保数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in needDataShow[1]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      needDataShow[2].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    服务数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in needDataShow[2]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      needDataShow[3].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    企业数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in needDataShow[3]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-show="activeName == '4'">
                <div class="title-top content-detail">回收数据</div>
                <div class="data-list">
                  <div
                    :class="
                      backDataShow[0].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    客户数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in backDataShow[0]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      backDataShow[1].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    投保数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in backDataShow[1]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      backDataShow[2].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    服务数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in backDataShow[2]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
                <div class="data-list">
                  <div
                    :class="
                      backDataShow[3].length > 0
                        ? 'data-name'
                        : 'data-name-none'
                    "
                  >
                    企业数据
                  </div>
                  <div class="data-item border-no">
                    <span v-for="item in backDataShow[3]" :key="item.id">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="activeName == '5'" class="log-items">
                <Logs :id="baseForm.id" :type="'1'" :has-o-a-log="true" />
              </div>
            </div>
          </div>
        </el-form>
        <div v-if="pageAuthority.includes('edit') || !type" class="page-footer">
          <button
            v-if="type && edit && baseForm.postStatus === 107"
            type="button"
            class="btn-exit"
            @click="changeStatus(105)"
          >
            发布
          </button>
          <button
            v-if="type && edit && baseForm.postStatus === 105"
            type="button"
            class="btn-exit"
            @click="changeStatus(106)"
          >
            下架
          </button>
          <button
            v-if="type && edit && baseForm.postStatus === 106"
            type="button"
            class="btn-save"
            @click="changeStatus(105)"
          >
            上架
          </button>
          <button
            v-if="type && !edit && baseForm.postStatus === 107"
            type="button"
            class="btn-save"
            @click="changeEdit()"
          >
            编辑
          </button>
          <el-button
            v-if="!type && edit && baseForm.postStatus === 107"
            class="btn-save"
            :loading="loading"
            @click="addOrUpdateServicePackage('baseForm')"
            >保存</el-button
          >
          <el-button
            v-if="type && edit && baseForm.postStatus === 107"
            class="btn-save"
            :loading="loading"
            @click="addOrUpdateServicePackage('baseForm')"
            >保存</el-button
          >
          <el-button
            v-if="type && edit && baseForm.postStatus === 106"
            class="btn-save"
            :loading="loading"
            @click="addOrUpdateServicePackage('baseForm')"
            >保存</el-button
          >
        </div>
        <SelectServiceItemModal
          v-if="isShow"
          @save="submit"
          @close="closeModal"
        />
      </el-main>
    </el-container>
    <el-dialog
      width="80%"
      title="匹配服务项设置"
      :visible.sync="dialogTableVisible"
    >
      <el-row type="flex">
        <el-col :span="11">
           <div class="mb-24">
            <el-input v-model="serviceName1" clearable placeholder="输入服务项名字关键字搜索"></el-input>
           </div>
          <el-row class="text-center"
            >参与匹配服务({{ table1Data.length }})</el-row
          >
          <el-table
            ref="table1"
            :data="table1Data.filter(data => !serviceName1 || data.serviceName.toLowerCase().includes(serviceName1.toLowerCase()))"
            style="width: 100%"
            max-height="400"
            row-key="serviceId"
            stripe
            @selection-change="onTable1Select"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"/>
            <el-table-column label="服务信息"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.serviceId }}</span>
                <div>
                  {{ scope.row.serviceName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceAlias" label="服务别称" show-overflow-tooltip />
            <el-table-column prop="degression" label="成本单价" />
            <el-table-column prop="providerName" label="供应商" show-overflow-tooltip />
          </el-table>
        </el-col>
        <el-col :span="2" class="button-transfer">
          <el-button
            :disabled="selectedTable2Data.length === 0"
            type="primary"
            @click="addLeft"
            ><span><i class="el-icon-arrow-left"/></span
          ></el-button>
          <el-button
            :disabled="selectedTable1Data.length === 0"
            type="primary"
            @click="addRight"
            ><span><i class="el-icon-arrow-right"/></span
          ></el-button>
        </el-col>
        <el-col :span="11">
               <div class="mb-24">
            <el-input v-model="serviceName2" clearable placeholder="输入服务项名字关键字搜索"></el-input>
           </div>
          <el-row class="text-center"
            >未参与匹配服务({{ table2Data.length }})</el-row
          >
          <el-table
            ref="table2"
            :data="table2Data.filter(data => !serviceName2 || data.serviceName.toLowerCase().includes(serviceName2.toLowerCase()))"
            style="width: 100%"
             row-key="serviceId"
            max-height="400"
            strip
            @selection-change="onTable2Select"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"/>
            <el-table-column label="服务信息" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.serviceId }}</span>
                <div>
                  {{ scope.row.serviceName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceAlias" label="服务别称" show-overflow-tooltip />
            <el-table-column prop="degression" label="成本单价" />
            <el-table-column prop="providerName" label="供应商" show-overflow-tooltip/>
          </el-table>
        </el-col>
      </el-row>
      <span
        v-if="baseForm.postStatus !== 105"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button
          :disabled="!table1Data.length"
          type="primary"
          @click="savePackage"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import uploadImage from '@/utils/uploadImage';
import {
  operationType,
  menuType,
  insuranceType,
  serviceType
} from '@/utils/enum';
import SelectServiceItemModal from './component/selectServiceItemModal';
import SetSales from './component/setSales';
import { validInteger } from '@/utils/validate';
import { editorUploadImage } from '@/utils/common';
import {
  findRecommendServiceInfo,
  getPackageService,
  updatePackageService
} from '@/api/servicePackage';
import E from 'wangeditor';
let editor;
export default {
  name: 'ServicePackageDetails',
  components: {
    SelectServiceItemModal,
    SetSales
  },
  data() {
    const checkPackagePrice = (rule, value, callback) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error('请输入正确的成本价格'));
      }
      callback();
    };
    const checkValidTime = (rule, value, callback) => {
      if (!validInteger(value)) {
        return callback(new Error('请输入正确的有效期'));
      }
      callback();
    };
    const checkPackage = (rule, value, callback) => {
      if (!this.baseForm.id) {
        this.$store
          .dispatch('servicePackage/checkPackage', {
            packageName: value
          })
          .then(() => {
            callback();
          });
      } else {
        callback();
      }
    };
    return {
      tableLoading: false,
      type: false,
      edit: true,
      activeName: '0',
      isShow: false,
      baseForm: {
        packageName: '',
        // packagePrice: '',
        packageCurrencyType: 1,
        packageDescribe: '',
        propagandaPic: '',
        detailPic: '',
        serviceInfoIds: [],
        serviceInfos: [],
        insuranceProducts: [],
        postStatus: 107,
        isSelectAll: 1,
        serviceOptionalNum: 1,
        validTime: '',
        packageCategoryIdList: [],
        servicePackageType: 1,
        packageDegression: '',
        serviceNum: ''
      },
      needDataShow: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      backDataShow: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      rules: {
        id: [{ required: true, message: '请输入id', trigger: 'blur' }],
        packageName: [
          {
            required: true,
            message: '请输入服务包名称',
            trigger: 'blur'
          },
          { validator: checkPackage, trigger: 'blur' }
        ],
        packageType: [
          {
            required: true,
            message: '请选择使用类型',
            trigger: 'change'
          }
        ],
        // packagePrice: [
        //   {
        //     required: true,
        //     message: '请输入服务包成本价格',
        //     trigger: 'blur'
        //   },
        //   { validator: checkPackagePrice, trigger: 'blur' }
        // ],
        validTime: [
          {
            required: true,
            message: '请输入有效期',
            trigger: 'blur'
          },
          { validator: checkValidTime, trigger: 'blur' }
        ],
        packageDescribe: [
          {
            required: true,
            message: '请输入服务包简介',
            trigger: 'blur'
          }
        ],
        serviceFeature: [
          {
            required: true,
            message: '请输入服务特色',
            trigger: 'blur'
          }
        ],
        propagandaPic: [
          {
            required: true,
            message: '请上传宣传头像',
            trigger: 'change'
          }
        ],
        detailPic: [
          {
            required: true,
            message: '请上传详情图片',
            trigger: 'change'
          }
        ],
        packageCategoryIdList: [
          {
            required: true,
            message: '请选泽服务分类',
            trigger: 'change'
          }
        ],
        packageDegression: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkPackagePrice, trigger: 'blur' }
        ],
        serviceNum: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      operationType,
      menuType,
      insuranceType,
      serviceType,
      packageCurrencyTypes: [],
      packageTypes: [],
      postStatusList: [],
      btns: [],
      serviceCategory: [],
      loading: false,
      flag: false,
      isDetail: false,
      doubleServicetableLoading: false,
      matchingName: '', // 匹配名称
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNum: 1
      },
      matchingServiceList: [],
      matchingNum: 0,
      dialogTableVisible: false,
      table1Data: [],
      table2Data: [],
      selectedTable1Data: [], // table1已选数据
      selectedTable2Data: [], // table2已选数据
      serviceName1: '',
      serviceName2: ''
    };
  },
  computed: {
    pageAuthority() {
      // 100103 服务包
      return this.$store.state.user.pageAuthority['100103'];
    }
  },
  created() {
    const vm = this;
    // 价格类型
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'priceType'
      })
      .then(res => {
        vm.packageCurrencyTypes = res.obj || [];
      });
    // 服务包类型
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'packageType'
      })
      .then(res => {
        vm.packageTypes = res.obj || [];
      });
    // 发布状态
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'postStatus'
      })
      .then(res => {
        vm.postStatusList = res.obj || [];
      });

    vm.$store
      .dispatch('servicePackage/findServicePackageCategory')
      .then(res => {
        vm.serviceCategory = res.data || [];
      });

    // 判断是新增还是编辑
    vm.type = vm.$route.params.id !== 'add' ? true : false;
    // 判断是查看还是编辑
    vm.edit = vm.$route.params.type === 'edit' ? true : false;
  },
  mounted() {
    editor = new E('#editor');
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      editorUploadImage(files)
        .then(res => {
          // insert 是获取图片 url 后，插入到编辑器的方法
          insert(res);
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    };
    editor.customConfig.zIndex = 1;
    editor.create();
    if (this.type) {
      this.getServicePackageDetail(this.$route.params.id);
      this.$refs.sales.getDetail(this.$route.params.id);
      this.isDetail = true;
      this.btns = [
        { value: '0', name: '基础信息' },
        { value: '1', name: '服务列表' },
        { value: '2', name: '涉及产品' },
        { value: '3', name: '需求数据' },
        { value: '4', name: '回收数据' },
        { value: '5', name: '操作日志' }
      ];
    } else {
      this.btns = [{ value: '0', name: '基础信息' }];
    }
  },
  methods: {
    // 类型切换
    servicePackageTypeChange(val) {
      if (val === 2 || val === 3) {
        this.searchMatchingList({ page: 1 });
      }
    },
    // 搜索匹配
    searchMatchingList(pageInfo) {
      const { page } = pageInfo;
      this.doubleServicetableLoading = true;
      const params = {
        pageNum: page || 1,
        serviceName: this.matchingName,
        servicePackageType: this.baseForm.servicePackageType,
        packageId: this.baseForm.id
      };
      if (!this.matchingName) {
        delete params.serviceName;
      }
      delete params.total;
      findRecommendServiceInfo(params).then(res => {
        this.doubleServicetableLoading = false;
        this.matchingServiceList = res.data.recommendServiceInfos;
        this.matchingNum = res.data.allRecommendServiceNum;
        this.pagingOptions.total = res.data.total;
      });
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      const tabItem = this.btns.find(item => item.value === tab);
      if (tabItem.isNew) {
        tabItem.isNew = false;
      }
      if (
        (tab === '1' && this.baseForm.servicePackageType === 2) ||
        this.baseForm.servicePackageType === 3
      ) {
        this.searchMatchingList({ page: 1 });
        this.getPackageServiceList();
      }
      vm.activeName = tab;
    },
    // 宣传头像上传
    uploadPropogandaPic(item) {
      const vm = this;
      uploadImage(item)
        .then(res => {
          vm.baseForm.propagandaPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 详情图片上传
    uploadDetailPic(item) {
      const vm = this;
      uploadImage(item)
        .then(res => {
          vm.baseForm.detailPic = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 服务包新增
    addOrUpdateServicePackage(formName, isBefore) {
      let check = false;
      this.flag = false;
      const vm = this;
      if (this.activeName === '0') {
        if (this.baseForm.packageType) {
          this.$refs['sales'].validateForm().then(res => {
            if (res) {
              check = true;
              vm.$refs[formName].validate(valid => {
                if (valid && check) {
                  this.flag = true;
                  const serviceFeature =
                    vm.baseForm.packageType === 3
                      ? editor.txt.html()
                      : vm.baseForm.serviceFeature;
                  if (
                    vm.baseForm.packageType === 3 &&
                    serviceFeature === '<p><br></p>'
                  ) {
                    vm.$message.warning('简介必填!');
                    return;
                  }
                  const saveForm = {
                    type: this.$refs.sales.formData.settlementMethodType,
                    price: null,
                    ladderList: [],
                    regionList: [],
                    premiumRatio: null // 保费
                  };
                  if (this.$refs.sales.formData.settlementMethodType === 1) {
                    saveForm.price = this.$refs.sales.formData.settlementPrice;
                  } else if (
                    this.$refs.sales.formData.settlementMethodType === 2
                  ) {
                    saveForm.premiumRatio = this.$refs.sales.formData.settlementPrice;
                  } else if (
                    this.$refs.sales.formData.settlementMethodType === 3
                  ) {
                    // 按阶梯
                    if (
                      this.$isNotEmpty(this.$refs.sales.formData.ladderList)
                    ) {
                      this.$refs.sales.formData.ladderList.forEach(
                        (item, index) => {
                          if (
                            index !==
                            this.$refs.sales.formData.ladderList.length - 1
                          ) {
                            item.ladderEndNum = this.$refs.sales.formData.ladderList[
                              index + 1
                            ].ladderStartNum;
                          } else {
                            item.ladderEndNum = null;
                          }
                        },
                      );
                    }
                    saveForm.ladderList = this.$refs.sales.formData.ladderList;
                  }
                  const params = {
                    ...vm.baseForm,
                    serviceFeature,
                    servicePackagePricingMethodVO: saveForm
                    // serviceOptionalNum: vm.baseForm.isSelectAll ? vm.baseForm.serviceInfos.length : vm.baseForm.serviceOptionalNum
                  };

                  delete params.serviceInfos;
                  this.loading = true;

                  if (this.baseForm.id) {
                    vm.$store
                      .dispatch('servicePackage/updateServicePackage', params)
                      .then(res => {
                        if (res.message === '更新成功') {
                          this.$message.success(res.message);
                          this.loading = false;
                        } else {
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {
                        this.loading = false;
                      });
                  } else {
                    vm.$store
                      .dispatch('servicePackage/addServicePackage', params)
                      .then(res => {
                        if (res.data) {
                          this.baseForm.id = res.data;
                          this.type = true;
                          this.edit = true;
                          this.btns = [
                            {
                              value: '0',
                              name: '基础信息'
                            },
                            {
                              value: '1',
                              name: '服务列表',
                              isNew: true
                            },
                            {
                              value: '2',
                              name: '涉及产品'
                            },
                            {
                              value: '3',
                              name: '需求数据'
                            },
                            {
                              value: '4',
                              name: '回收数据'
                            },
                            {
                              value: '5',
                              name: '操作日志'
                            }
                          ];
                          //   this.$refs.sales.saveForm(this.baseForm.id);
                          this.loading = false;
                        } else {
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {
                        this.loading = false;
                      });
                  }
                } else {
                  vm.$message.warning('基础信息必填项不能为空!');
                }
              });
            }
          });
        } else {
          vm.$message.warning('基础信息必填项不能为空!');
        }
      } else if (this.activeName === '1') {
        this.loading = true;
        const params = {
          packageId: vm.baseForm.id,
          serviceInfos: vm.baseForm.serviceInfos,
          servicePackageType: vm.baseForm.servicePackageType,
          isSelectAll: vm.baseForm.isSelectAll,
          serviceOptionalNum: vm.baseForm.isSelectAll
            ? vm.baseForm.serviceInfos.length
            : vm.baseForm.serviceOptionalNum
        };
        vm.$store
          .dispatch('servicePackage/updateServiceInfoList', params)
          .then(res => {
            if (res.code === 0) {
              vm.$message.success(res.message);
              this.loading = false;
              if (isBefore) {
                this.getPackageServiceList();
                this.dialogTableVisible = true;
              }
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    // 服务包详情
    async getServicePackageDetail(id) {
      const vm = this;
      await vm.$store
        .dispatch('servicePackage/getServicePackageDetail', {
          id
        })
        .then(res => {
          vm.baseForm.id = id;
          vm.baseForm = res.obj;
          vm.baseForm.serviceInfos.forEach(item => {
            item.serviceInfoId = item.id;
          });
          if (vm.baseForm.serviceInfos.length === 1) {
            vm.baseForm.isSelectAll = 1;
          }
          res.obj.needDatas &&
            res.obj.needDatas.forEach(item => {
              vm.needDataShow[item.type].push(item);
            });
          res.obj.backDatas &&
            res.obj.backDatas.forEach(item => {
              vm.backDataShow[item.type].push(item);
            });
          if (vm.baseForm.packageType === 3) {
            editor.txt.html(vm.baseForm.serviceFeature);
            delete vm.baseForm.serviceFeature;
          }
        });
    },
    // 修改服务项弹框打开
    addProduct() {
      this.isShow = true;
    },
    // 修改服务项弹框关闭
    closeModal() {
      this.isShow = false;
    },
    // 修改服务项确定
    // submit(list) {
    //     this.baseForm.serviceInfoIds = []
    //     this.baseForm.serviceInfos = list
    //     list.map(item => {
    //         this.baseForm.serviceInfoIds.push(item.id)
    //     })
    //     this.closeModal()
    // },
    // 新增服务项确定
    submit(item) {
      // let list = this.baseForm.serviceInfos.filter(info => {
      //   return info.id !== item.id
      // })
      // list.push(item)
      // list.map(item => {
      //   item.serviceInfoId = item.id
      // })
      // if (list.length === 1) {
      //   this.baseForm.isSelectAll = 1
      // }
      this.baseForm.serviceInfos.push(item);
      this.closeModal();
    },
    // 查看服务项详情
    lookServiceItemsDetail(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/serviceItems/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 查看产品详情
    lookProductDetail(id) {
      const routeData = this.$router.resolve({
        path: `/insuranceManage/insuranceProducts/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    },
    // 删除图片
    deleteImage(key) {
      this.baseForm[key] = '';
    },
    // 删除服务项
    deleteServiceItem(id) {
      const list = this.baseForm.serviceInfos.filter(info => {
        return info.id !== id;
      });
      this.baseForm.serviceInfos = list;
      if (list.length === 1) {
        this.baseForm.isSelectAll = 1;
      }
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 切换编辑
    changeEdit() {
      this.edit = !this.edit;
    },
    // 改变服务包状态
    changeStatus(postStatus) {
      if (postStatus === 106) {
        this.$confirm('确认要下架吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('servicePackage/downShelfServicePackage', {
                id: this.baseForm.id,
                postStatus
              })
              .then(res => {
                if (!res.code) {
                  this.$message.success(res.comment);
                  this.$router.push('/supplyChainManage/servicePackage');
                }
              });
          })
          .catch(() => {});
        return;
      }
      this.$store
        .dispatch('servicePackage/publishServicePackage', {
          id: this.baseForm.id,
          postStatus
        })
        .then(() => {
          this.$router.push('/supplyChainManage/servicePackage');
        });
    },
    // 选择数量改变
    serviceOptionalNumChange() {
      // 判断是否全选
      if (
        this.baseForm.serviceOptionalNum === this.baseForm.serviceInfos.length
      ) {
        this.baseForm.isSelectAll = 1;
        this.baseForm.serviceOptionalNum = 0;
      }
    },
    // 图片上传地址
    changeUrl(name, url) {
      this.baseForm[name] = url;
    },
    getPackageServiceList() {
      getPackageService(this.baseForm.id, 0)
        .then(res => {
          this.table1Data = res.data;
        })
        .catch(() => {
          this.table1Data = [];
        });
      getPackageService(this.baseForm.id, 1)
        .then(res => {
          this.table2Data = res.data;
        })
        .catch(() => {
          this.table2Data = [];
        });
    },
    onTable1Select(rows) {
      this.selectedTable1Data = [...rows];
    },
    onTable2Select(rows) {
      this.selectedTable2Data = [...rows];
    },

    addRight() {
      this.filterAdd(this.selectedTable1Data, this.table2Data, 'serviceId');
      this.table1Data = this.filterDelete(
        this.selectedTable1Data,
        this.table1Data,
        'serviceId',
      );
      this.selectedTable1Data = [];
      this.$refs.table1.clearSelection();
    },
    addLeft() {
      this.filterAdd(this.selectedTable2Data, this.table1Data, 'serviceId');
      this.table2Data = this.filterDelete(
        this.selectedTable2Data,
        this.table2Data,
        'serviceId',
      );
      this.selectedTable2Data = [];
      this.$refs.table2.clearSelection();
    },
    filterAdd(
      records = [],
      targetRecords = [],
      compareProperty,
      isEnd = false,
    ) {
      const set = new Set();
      targetRecords.forEach(record => {
        set.add(record[compareProperty]);
      });
      records.forEach(record => {
        if (!set.has(record[compareProperty])) {
          if (isEnd) {
            targetRecords.push(record);
          } else {
            targetRecords.unshift(record);
          }
        }
      });
    },
    filterDelete(records = [], targetRecords = [], compareProperty) {
      const set = new Set();
      records.forEach(record => {
        set.add(record[compareProperty]);
      });

      return targetRecords.filter(item => !set.has(item[compareProperty]));
    },
    savePackage() {
      const list = [];
      this.table1Data.forEach(item => {
        list.push(item.serviceInfoId);
      });
      updatePackageService({
        servicePackageId: this.baseForm.id,
        serviceInfoIds: list
      }).then(() => {
        this.dialogTableVisible = false;
      });
    },
    openDialog() {
      if (this.baseForm.servicePackageType !== 3 && !this.baseForm.serviceInfos.length) {
        this.$message.warning('请先新增服务列表!');
        return;
      } else {
        this.addOrUpdateServicePackage('baseForm', true);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-service-pack-details {
  position: relative;
  .m-t-24 {
    margin-top: 24px;
  }
  .p-l-24 {
    margin-left: 24px;
    box-sizing: border-box;
    width: calc(100% - 24px);
  }
  .el-form {
    height: 100%;
  }
  .details-content {
    // min-height: calc(100vh - 210px);
    // max-height: calc(100vh - 210px);
    // overflow-y: scroll;
    .upload {
      position: relative;
      display: inline-block;
      &:hover {
        .icon-delete {
          display: block;
        }
      }
      .icon-delete {
        display: none;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        left: 172px;
        background-image: url('../../assets/icon-delete.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .data-list {
      // padding-top: 11px;
      .data-name {
        font-size: 14px;
        color: #282828;
        font-weight: 600;
      }
      .data-name-border {
        padding-left: 10px;
        position: relative;
        &::before {
          content: '';
          width: 4px;
          height: 14px;
          background: rgba(34, 118, 255, 1);
          position: absolute;
          top: 1px;
          left: 0;
        }
      }
      .data-name-none {
        font-size: 12px;
        color: #9f9f9f;
      }
      .data-item-table {
        .link {
          color: #2276ff;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .data-form {
        .required-box {
          .required {
            color: #ff4949;
          }
          .label {
            color: #606266;
            font-size: 12px;
          }
        }
      }
      .data-item {
        padding: 12px 24px;
        display: flex;
        flex-wrap: wrap;
        span {
          font-size: 12px;
          color: #282828;
          margin-right: 16px;
          display: inline-block;
          width: 98px;
          height: 24px;
          border: 1px solid #c6ddff;
          color: #2276ff;
          line-height: 24px;
          text-align: center;
          border-radius: 4px;
        }
      }
      .select-all {
        margin-top: 20px;
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .cost {
    width: 100%;
    display: flex;
    align-items: center;
    .costPrice {
      flex: 1;
      .el-input {
        width: 100%;
      }
    }
    .costType {
      width: 120px;
      margin-bottom: 10px;
    }
  }
  .text-center {
    /deep/ input.el-input__inner {
      text-align: center !important;
    }
  }
  .service-type {
    margin-top: 24px;
    display: flex;
    align-items: center;
    &-title {
      font-size: 16px;

      font-weight: bold;
      color: #464668;
      line-height: 16px;
      margin-right: 32px;
    }
    &-radio {
      flex: 1;
    }
  }
  .double-service {
    &-title {
      font-size: 16px;

      font-weight: bold;
      color: #464668;
      line-height: 16px;
      margin-bottom: 16px;
    }
    &-tip {
      font-size: 14px;

      font-weight: 400;
      color: #989ab3;
      line-height: 14px;
      .num {
        cursor: pointer;
        color: #1890ff;
      }
    }
    &-input {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 16px;
      .w-400 {
        width: 400px;
      }
    }
  }
}
.text-center {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #464668;
  margin-bottom: 6px;
}
.button-transfer {
    margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
