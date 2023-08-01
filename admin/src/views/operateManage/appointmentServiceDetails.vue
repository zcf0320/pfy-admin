<template>
    <div class="page-online-service-details normal-label">
        <el-container>
            <el-main>
                <div class="details-content flex-col">
                    <Tab :btns="btns" @change="handleClick" />
                    <div class="scroll-table">
                        <div v-show="activeName === '0'">
                            <div class="content">
                                <el-form
                                    ref="companyDetail"
                                    :model="companyDetail"
                                >
                                    <div class="data-list">
                                        <div v-if="appointmentType === '0'">
                                            <div
                                                class="title-top content-detail"
                                            >
                                                基础信息

                                                <button
                                                    v-if="
                                                        companyDetail.state ===
                                                            1
                                                    "
                                                    type="button"
                                                    class="btn-save fr mr-10"
                                                    @click="update"
                                                >
                                                    保存
                                                </button>
                                                <button
                                                    v-if="
                                                        appointmentType ===
                                                            '1' &&
                                                            companyDetail.state ===
                                                                1
                                                    "
                                                    type="button"
                                                    class="btn-save fr"
                                                    @click="save"
                                                >
                                                    保存
                                                </button>
                                                <el-dropdown
                                                    class="btn-save fr"
                                                    @command="btnAction"
                                                >
                                                    <el-button
                                                        class="btn-save mr-10"
                                                        type="button"
                                                        style="width:145px;"
                                                    >
                                                        操作<i
                                                            class="el-icon-arrow-down el-icon--right"
                                                        />
                                                    </el-button>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                        style="width:145px;"
                                                    >
                                                        <el-dropdown-item
                                                            v-if="
                                                                companyDetail.state ===
                                                                    1 &&
                                                                    pageAuthority.includes(
                                                                        'review',
                                                                    )
                                                            "
                                                            command="1"
                                                        >
                                                            {{
                                                                appointmentType ===
                                                                '0'
                                                                    ? '预约审核'
                                                                    : '关闭'
                                                            }}</el-dropdown-item
                                                        >
                                                        <el-dropdown-item
                                                            v-if="
                                                                companyDetail.writeoffStatus !==
                                                                    2
                                                            "
                                                            command="2"
                                                            >服务核销</el-dropdown-item
                                                        >
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                                <button
                                                    v-if="
                                                        companyDetail.state !==
                                                            1
                                                    "
                                                    type="button"
                                                    class="btn-save fr mr-10"
                                                    @click="sendMessage"
                                                >
                                                    发短信
                                                </button>
                                            </div>
                                            <div class="data-item">
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约ID："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.serialNumber
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="服务项："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.serviceInfoName
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约类型："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.type
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <!-- {{companyDetail.linkType}} -->
                                                        <el-form-item
                                                            label="服务来源："
                                                            class="link-box"
                                                        >
                                                            <el-input
                                                                disabled
                                                            />
                                                            <div
                                                                class="link"
                                                                @click="
                                                                    lookServiceFrom
                                                                "
                                                            >
                                                                {{
                                                                    companyDetail.link
                                                                }}
                                                            </div>
                                                        </el-form-item>
                                                        <!-- <el-form-item label="服务来源：">
                                                            <div
                                                                class="link-skip"
                                                                @click="lookServiceFrom"
                                                            >{{companyDetail.link}}</div>
                                                        </el-form-item> -->
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约地区："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    address
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="网点名称："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.serviceSiteName
                                                                "
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="网点地址："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.serviceSiteAddress
                                                                "
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col
                                                        v-if="
                                                            $isNotEmpty(
                                                                companyDetail
                                                                    .escortBaseMsgVO
                                                                    .escortDate,
                                                            )
                                                        "
                                                        :span="12"
                                                    >
                                                        <el-form-item
                                                            label="床号："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .escortBaseMsgVO
                                                                        .bedNumber
                                                                "
                                                                disabled
                                                            />
                                                            <!-- <span>{{companyDetail.escortBaseMsgVO.bedNumber}}</span> -->
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约人姓名："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.userName
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约人手机号："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.mobile
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="网点电话："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.serviceSiteMobile
                                                                "
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col
                                                        v-if="
                                                            $isNotEmpty(
                                                                companyDetail
                                                                    .escortBaseMsgVO
                                                                    .escortDate,
                                                            )
                                                        "
                                                        :span="12"
                                                    >
                                                        <el-form-item
                                                            label="陪护时间："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .escortBaseMsgVO
                                                                        .escortDate
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约状态："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.statuText
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="预约时间："
                                                        >
                                                            <el-date-picker
                                                                v-model="
                                                                    companyDetail.reserveTime
                                                                "
                                                                type="datetime"
                                                                format="yyyy-MM-dd HH:mm:ss"
                                                                valueFormat="timestamp"
                                                                placeholder="选择预约时间"
                                                            >
                                                            </el-date-picker>
                                                        </el-form-item>
                                                    </el-col>
                                                    <!-- 只有少儿推塔才会有核销码 且审核通过必填 -->
                                                    <el-col
                                                        v-if="
                                                            companyDetail.state ===
                                                                0 &&
                                                                companyDetail.needVerificationCode ===
                                                                    1
                                                        "
                                                        :span="12"
                                                    >
                                                        <el-form-item
                                                            label="核销码："
                                                        >
                                                            <el-input
                                                                v-model="code"
                                                                maxlength="20"
                                                                class="w-200"
                                                                :disabled="
                                                                    !isReserveEdit
                                                                "
                                                            />
                                                            <el-button
                                                                v-if="
                                                                    !isReserveEdit
                                                                "
                                                                class="ml-10"
                                                                type="default"
                                                                @click="
                                                                    isReserveEdit = true
                                                                "
                                                                >修改</el-button
                                                            >
                                                            <el-button
                                                                v-else
                                                                class="ml-10"
                                                                type="primary"
                                                                @click="
                                                                    saveCode()
                                                                "
                                                                >保存</el-button
                                                            >
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="报销方式"
                                                        >
                                                            <el-input
                                                                v-if="
                                                                    companyDetail.reimbursementWay ===
                                                                        0
                                                                "
                                                                disabled
                                                                value="自费"
                                                            />
                                                            <el-input
                                                                v-else
                                                                disabled
                                                                value="医保"
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="客户目前所在地"
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.customerAddress
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="是否开具住院单"
                                                        >
                                                            <el-input
                                                                v-if="
                                                                    companyDetail.hostipalDocuments ===
                                                                        0
                                                                "
                                                                disabled
                                                                value="是"
                                                            />
                                                            <el-input
                                                                v-else
                                                                disabled
                                                                value="否"
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="就诊医院"
                                                        >
                                                            <el-input
                                                                disabled
                                                                v-model="
                                                                    companyDetail.clinicHospital
                                                                "
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="就诊科室"
                                                        >
                                                            <el-input
                                                                disabled
                                                                v-model="
                                                                    companyDetail.clinicDepartment
                                                                "
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="病情描述及诊断"
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail.illnessState
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-form-item
                                                            label="上门城市"
                                                        >
                                                            <el-input
                                                            style="width:49%;"
                                                                v-model="
                                                                    companyDetail.comeCity
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                            <div
                                                class="title-top content-detail"
                                            >
                                                供应商信息
                                            </div>
                                            <div class="data-item">
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="ID编号："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .providerCode
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="供应商名称："
                                                            class="link-box"
                                                        >
                                                            <el-input
                                                                disabled
                                                            />
                                                            <div
                                                                class="link"
                                                                @click="
                                                                    linkDetail(
                                                                        companyDetail
                                                                            .basicSupplierMsgVO
                                                                            .id,
                                                                    )
                                                                "
                                                            >
                                                                {{
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .companyName
                                                                }}
                                                            </div>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="联系人："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .chargePeople
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="联系人电话："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .chargePeoplePhone
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="微信号："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .chargePeopleWechart
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="电子邮箱："
                                                        >
                                                            <el-input
                                                                v-model="
                                                                    companyDetail
                                                                        .basicSupplierMsgVO
                                                                        .chargePeopleEmail
                                                                "
                                                                disabled
                                                            />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                            <div
                                                v-if="
                                                    $isNotEmpty(
                                                        companyDetail
                                                            .escortBaseMsgVO
                                                            .escortDate,
                                                    )
                                                "
                                                class="title-top content-detail"
                                            >
                                                陪护人员信息
                                            </div>
                                            <div
                                                v-if="
                                                    $isNotEmpty(
                                                        companyDetail
                                                            .escortBaseMsgVO
                                                            .escortDate,
                                                    )
                                                "
                                                class="data-item"
                                            >
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="姓名："
                                                        >
                                                            <span
                                                                >{{
                                                                    companyDetail
                                                                        .escortBaseMsgVO
                                                                        .escortName
                                                                }}
                                                            </span>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item
                                                            label="手机号："
                                                        >
                                                            <span
                                                                >{{
                                                                    companyDetail
                                                                        .escortBaseMsgVO
                                                                        .mobile
                                                                }}
                                                            </span>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                        <div v-else class="data-item">
                                            <el-row :gutter="20">
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="联系人1："
                                                        prop="peopleName"
                                                    >
                                                        <span>{{
                                                            companyDetail.peopleName
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="联系电话："
                                                        prop="peopleTelephone"
                                                    >
                                                        <span>{{
                                                            companyDetail.peopleTelephone
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="联系邮箱："
                                                        prop="peopleEmail"
                                                    >
                                                        <span>{{
                                                            companyDetail.peopleEmail
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="上门地址："
                                                        prop="detailAddress"
                                                    >
                                                        <span>{{
                                                            companyDetail.detailAddress
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="企业名称："
                                                    >
                                                        <span>{{
                                                            companyDetail.companyName
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="预约服务："
                                                    >
                                                        <span>{{
                                                            companyDetail.serviceInfoId
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="预约人数："
                                                    >
                                                        <span>{{
                                                            companyDetail.personNumber
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="预约时间："
                                                    >
                                                        <span>{{
                                                            companyDetail.infoPretimeText
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="预约地区："
                                                    >
                                                        <span>{{
                                                            address
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item
                                                        label="预约状态："
                                                    >
                                                        <span>{{
                                                            companyDetail.statuText
                                                        }}</span>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                        <div v-show="activeName === '1'">
                            <el-tabs type="border-card" v-if="allList.length>0">
                                <el-tab-pane label="全部">
                                    <div v-if="allList.length" class="details">
                                        <div
                                            v-for="item in allList"
                                            :key="item.id"
                                            class="item"
                                        >
                                            <div class="label">
                                                {{ item.materialName }}
                                            </div>
                                            <div class="text">
                                                <el-image
                                                    v-for="(img,
                                                    index) in item.materialFileList"
                                                    :key="index"
                                                    style="
                                            width: 100px;
                                            height: 100px;
                                            display: block;
                                        "
                                                    :src="img"
                                                    :preview-src-list="
                                                        item.materialFileList
                                                    "
                                                >
                                                    <div
                                                        slot="error"
                                                        class="image-slot"
                                                    >
                                                        暂无图片
                                                    </div>
                                                </el-image>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="empty-img" >

                                    </div>
                                </el-tab-pane>
                                <el-tab-pane
                                    v-for="(item, index) in needList"
                                    :key="index"
                                    :label="item.materialName"
                                >
                                    <div class="details">
                                        <div
                                            v-for="item in needList"
                                            :key="item.id"
                                            class="item"
                                        >
                                            <div class="label">
                                                {{ item.materialName }}
                                            </div>
                                            <div class="text">
                                                <el-image
                                                    v-for="(img,
                                                    index) in item.materialFileList"
                                                    :key="index"
                                                    style="
                                            width: 100px;
                                            height: 100px;
                                            display: block;
                                        "
                                                    :src="img"
                                                    :preview-src-list="
                                                        item.materialFileList
                                                    "
                                                >
                                                    <div
                                                        slot="error"
                                                        class="image-slot"
                                                    >
                                                        暂无图片
                                                    </div>
                                                </el-image>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                             <div v-else>
                                <!-- 暂无记录 -->
                                <div slot="empty" class="empty-img" />
                            </div>
                        </div>
                        <div v-show="activeName === '2'">
                            <div class="title-top content-detail">人员名单</div>
                            <div
                                v-if="!peopleList.length"
                                class="upload-contain"
                            >
                                <p class="people-list-none">
                                    暂无人员名单，请按照模板内容上传
                                </p>
                                <div class="upload-button flex-box">
                                    <el-upload
                                        v-if="companyDetail.state === 1"
                                        class="upload-demo"
                                        action=""
                                        :http-request="uploadFile"
                                        :accept="accpetLimit"
                                        :file-list="fileList"
                                        :multiple="isSelectAll"
                                    >
                                        <el-button slot="trigger" type="primary"
                                            >选取文件</el-button
                                        >
                                    </el-upload>
                                    <a
                                        href="/static/【核酸检测】企业预约人员名单模板.xlsx"
                                        class="download-btn"
                                        target="_blank"
                                        download=""
                                        >下载模板</a
                                    >
                                </div>
                            </div>
                            <div v-else class="upload-contain">
                                <el-table
                                    v-if="peopleList.length"
                                    v-loading="logLoading"
                                    class="b-b"
                                    stripe
                                    :data="peopleList"
                                    style="width: 100%"
                                >
                                    <el-table-column label="激活码">
                                        <template slot-scope="scope">
                                            <span>{{
                                                scope.row.activeCode
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="姓名">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="身份证号">
                                        <template slot-scope="scope">
                                            <span
                                                :class="{
                                                    danger: scope.row.legal,
                                                }"
                                                >{{ scope.row.idCard }}</span
                                            >
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="手机号">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.phone }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="激活码状态">
                                        <template slot-scope="scope">
                                            <span>{{
                                                scope.row.activeCodeStatus
                                                    | appointmentStatusFilter
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <div slot="empty" class="empty-img" />
                                </el-table>
                                <div
                                    v-if="companyDetail.state === 1"
                                    class="upload-button"
                                >
                                    <el-button
                                        v-if="
                                            !notMatch &&
                                                !idCardWarn &&
                                                !allDisable
                                        "
                                        type="primary"
                                        @click="addPeopleList"
                                        >确认提交</el-button
                                    >
                                    <el-upload
                                        class="upload-demo"
                                        action=""
                                        :http-request="uploadFile"
                                        :accept="accpetLimit"
                                        :file-list="fileList"
                                        :multiple="isSelectAll"
                                    >
                                        <el-button
                                            slot="trigger"
                                            class="re-upload"
                                            >重新上传</el-button
                                        >
                                    </el-upload>
                                </div>
                                <el-row class="bottom">
                                    <p v-if="notMatch" class="danger underline">
                                        上传名单的人数和预约数不同
                                    </p>
                                    <p
                                        v-if="idCardWarn"
                                        class="danger underline"
                                    >
                                        名单中身份证不合法
                                    </p>
                                    <p
                                        v-if="allDisable"
                                        class="danger underline"
                                    >
                                        名单中有激活码非可用状态
                                    </p>
                                </el-row>
                            </div>
                        </div>
                        <div v-show="activeName === '3'">
                            <div class="data-list">
                                <div class="title-top content-detail">
                                    基础体征信息
                                </div>
                                <div class="data-item row-line">
                                    <el-row class="mb-10">
                                        <el-col :span="12"
                                            >身高：<span
                                                v-if="signBaseMsgVO.height"
                                                class="ml-10"
                                                >{{
                                                    signBaseMsgVO.height
                                                }}cm</span
                                            ></el-col
                                        >
                                        <el-col :span="12"
                                            >体重：<span
                                                v-if="signBaseMsgVO.weight"
                                                class="ml-10"
                                                >{{
                                                    signBaseMsgVO.weight
                                                }}kg</span
                                            ></el-col
                                        >
                                    </el-row>
                                    <el-row class="mb-10">
                                        <el-col :span="12"
                                            >血型:<span class="ml-10">{{
                                                signBaseMsgVO.bloodTypeName
                                            }}</span></el-col
                                        >
                                        <el-col :span="12"
                                            >疾病:<span class="ml-10">{{
                                                signBaseMsgVO.diseaseName
                                            }}</span></el-col
                                        >
                                    </el-row>
                                </div>
                                <div class="data-name data-name-border">
                                    每日体征信息
                                </div>
                                <div class="data-item">
                                    <el-table
                                        v-loading="tableLoading"
                                        class="small"
                                        :data="dailySignInformationMsgVOList"
                                    >
                                        <el-table-column
                                            label="日期"
                                            width="140"
                                        >
                                            <template slot-scope="{ row }">
                                                <span>{{
                                                    row.signDay
                                                        | timeFormat(
                                                            'yyyy-MM-dd HH:mm',
                                                        )
                                                }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="体温（℃）">
                                            <template slot-scope="{ row }">
                                                <span>{{
                                                    row.bodyTemperature || '-'
                                                }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            label="呼吸次数（分/分钟）"
                                        >
                                            <template slot-scope="{ row }">
                                                <span>{{
                                                    row.numberOfBreaths || '-'
                                                }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            label="心率（分/分钟）"
                                        >
                                            <template slot-scope="{ row }">
                                                <span>{{
                                                    row.heartRate || '-'
                                                }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            label="血压"
                                            align="center"
                                        >
                                            <template>
                                                <el-table-column
                                                    label="舒张压"
                                                    width="140"
                                                >
                                                    <template
                                                        slot-scope="{ row }"
                                                    >
                                                        <span>{{
                                                            row.diastolicBloodPressure ||
                                                                '-'
                                                        }}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                    label="收缩压"
                                                    width="140"
                                                >
                                                    <template
                                                        slot-scope="{ row }"
                                                    >
                                                        <span>{{
                                                            row.systolicBloodPressure ||
                                                                '-'
                                                        }}</span>
                                                    </template>
                                                </el-table-column>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            label="更新时间"
                                            width="180"
                                        >
                                            <template slot-scope="{ row }">
                                                <span>{{
                                                    row.updateTime
                                                        | timeFormat(
                                                            'yyyy-MM-dd HH:mm',
                                                        )
                                                }}</span>
                                            </template>
                                        </el-table-column>
                                        <div slot="empty" class="empty-img" />
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div v-show="activeName === '4'">
                            <div class="data-list">
                                <div class="title-top content-detail">
                                    基础信息
                                </div>
                                <div class="data-item row-line">
                                    <el-row :gutter="20">
                                        <el-col :span="12" class="mb-10">
                                            <span class="mr-10"
                                                >结算编号：</span
                                            >
                                            <el-input
                                                v-model="baseMsg.serialNumber"
                                                :disabled="true"
                                            />
                                        </el-col>
                                        <el-col :span="12" class="mb-10"
                                            ><span>账期： </span>
                                            <el-input
                                                v-model="baseMsg.accountPeriod"
                                                :disabled="true"
                                        /></el-col>
                                        <el-col :span="12" class="mb-10">
                                            <span>结算金额：</span>
                                            <el-input
                                                v-model="settlementPrice"
                                                :disabled="true"
                                        /></el-col>
                                        <el-col :span="12" class="mb-10">
                                            <span>状态：</span>
                                            <el-input
                                                v-model="baseMsg.state"
                                                :disabled="true"
                                        /></el-col>
                                        <el-col :span="12" class="mb-10">
                                            <span>订单数量：</span>
                                            <el-input
                                                v-model="baseMsg.orderAmount"
                                                :disabled="true"
                                        /></el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12" class="mb-10"
                                            ><span>申请人：</span>
                                            <el-input
                                                v-model="baseMsg.applicant"
                                                :disabled="true"
                                        /></el-col>
                                        <el-col :span="12" class="mb-10"
                                            ><span>申请时间：</span>
                                            <el-input
                                                v-model="applicationTime"
                                                :disabled="true"
                                            />
                                        </el-col>
                                        <el-col
                                            v-if="baseMsg.state === '已结算'"
                                            :span="12"
                                            class="mb-10"
                                            ><span>完成人：</span>
                                            <el-input
                                                v-model="baseMsg.updator"
                                                :disabled="true"
                                        /></el-col>
                                        <el-col
                                            v-if="baseMsg.state === '已结算'"
                                            :span="12"
                                            class="mb-10"
                                            ><span>完成时间：</span>
                                            <el-input
                                                v-model="updateTime"
                                                :disabled="true"
                                            />
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12" class="mb-10"
                                            ><span>卡号：</span>
                                            <el-input
                                                v-model="
                                                    settlementAccountMsgVO.cardNumber
                                                "
                                                :disabled="true"
                                        /></el-col>
                                        <el-col :span="12" class="mb-10"
                                            ><span>开户行：</span>
                                            <el-input
                                                v-model="
                                                    settlementAccountMsgVO.bankOfDeposit
                                                "
                                                :disabled="true"
                                        /></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div>汇款凭证</div>
                                            <div v-if="remittanceCertificate.length>0">
                                                  <img
                                                v-for="item in remittanceCertificate"
                                                :key="item"
                                                class="imgs"
                                                :src="item"
                                                alt=""
                                                @click="openWindow(item)"
                                            />
                                            </div>
                                            <div v-else style="color:#3599FE">凭证未上传</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div v-show="activeName === '5'" class="log-items">
                            <div
                                v-for="item in logList"
                                :key="item.createTime"
                                class="log-item"
                            >
                                <div class="circle" />
                                <div class="log-details">
                                    <span>{{ item.serviceInfoName }}</span>
                                    <span class="create-time ml-10">{{
                                        item.createTime | timeFormat
                                    }}</span>
                                    <span class="create-time ml-10">{{
                                        operationType[item.operation]
                                    }}</span>
                                    <span class="color-hight">{{
                                        item.name
                                    }}</span>
                                    <span
                                        v-if="item.mobile"
                                        class="color-hight"
                                        >{{ item.mobile }}</span
                                    >
                                    <span class="color-hight"
                                        >{{ operationType[item.operation]
                                        }}{{ menuType[item.type] }}</span
                                    >
                                    <!-- <span class="color-hight">{{item.remark}}</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
            <ExamineModal
                v-if="show"
                :id="id"
                :is-show="show"
                :type="appointmentType"
                :is-need-code="true"
                @close="toggleModal"
                @save="closeAppointment"
            />
        </el-container>
    </div>
</template>
<script>
import ExamineModal from './component/examineModal';
import { companyStatusFilter } from '@/filters';
import { uploadAppointmentNameList } from '@/api/appointmentService';
import { timeFormat } from '@/utils';
import { operationType, menuType } from '@/utils/enum';
import {
    getMaterialDetail,
    updateReserve,
    IfCancellation
} from '@/api/appointmentService';
export default {
    name: 'UserDetails',
    components: {
        ExamineModal
    },
    data() {
        return {
            code: '',
            isReserveEdit: false,
            appointmentType: 0,
            show: false,
            activeName: '0',
            userInfoLoading: false,
            // 上传文件的名单
            peopleList: [],
            tabIndex: '0',
            // 全部上传
            allDisable: false,
            // 人数不同
            notMatch: false,
            idCardWarn: false,
            logLoading: false,
            accpetLimit: '.xlsx',
            fileList: [],
            isSelectAll: false,
            address: '',
            companyDetail: {
                companyType: '0',
                companyName: '',
                companySimpleName: '',
                location: [],
                companyEstablishTime: '',
                companyPostalAddress: '',
                companyAddress: '',
                companyEmail: '',
                companyWebsite: '',
                businessScope: '',
                chargePeople: '',
                chargePeoplePhone: '',
                chargePeopleWechart: '',
                chargePeopleEmail: '',
                accountBank: '',
                accountBankAddress: '',
                taxNumber: '',
                bankNumber: '',
                credentialIds: [],
                credentials: [],
                serviceInfos: [],
                escortBaseMsgVO: {},
                basicSupplierMsgVO: {},
                writeoffStatus: ''
            },
            rules: {
                detailAddress: [
                    {
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }
                ],
                peopleName: [
                    {
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }
                ],
                peopleEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: this.$validators.checkEmail, trigger: 'blur' }
                ],
                peopleTelephone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },
                    { validator: this.$validators.checkPhone, trigger: 'blur' }
                ]
            },
            logList: [],
            serviceList: [],
            linkType: '',
            linkCode: '',
            operationType,
            menuType,
            tableLoading: false,
            signBaseMsgVO: {}, // 体征基础信息
            dailySignInformationMsgVOList: [], // 每日体征数据
            baseMsg: {}, // 结算基础信息
            settlementAccountMsgVO: {}, // 结算账户信息
            remittanceCertificate: [],
            btns: [],
            allList: [],
            needList: [],
            cancel: '服务核销'
        };
    },
    computed: {
        pageAuthority() {
            // 110104 预约服务
            return this.$store.state.user.pageAuthority['110104'];
        },
        updateTime() {
            return this.baseMsg.updateTime
                ? this.$moment(this.baseMsg.updateTime).format(
                      'YYYY-MM-DD HH:mm:ss',
                  )
                : '-';
        },
        applicationTime() {
            return this.baseMsg.applicationTime
                ? this.$moment(this.baseMsg.applicationTime).format(
                      'YYYY-MM-DD HH:mm:ss',
                  )
                : '-';
        },
        settlementPrice() {
            return `￥${
                this.baseMsg.settlementPrice
                    ? this.baseMsg.settlementPrice
                    : '0.0'
            }`;
        }
    },
    created() {
        const vm = this;
        vm.getAppointmentDetails();
        vm.getServiceVos();
        vm.id = vm.$route.params.id;
        vm.btns.push({ value: '0', name: '预约信息' });
        vm.btns.push({ value: '1', name: '预约资料' });
        if (vm.id) {
            if (vm.appointmentType === '1') {
                vm.btns.push({ value: '2', name: '人员名单' });
            }
            if (
                vm.appointmentType === '0' &&
                vm.companyDetail.escortBaseMsgVO.escortDate
            ) {
                vm.btns.push({ value: '3', name: '体征信息' });
            }
            if (vm.appointmentType === '0') {
                vm.btns.push({ value: '4', name: '结算单信息' });
            }
            vm.btns.push({ value: '5', name: '操作日志' });
        } else {
            if (vm.appointmentType === '1') {
                vm.btns.push({ value: '2', name: '人员名单' });
            }
            if (
                vm.appointmentType === '0' &&
                vm.companyDetail.escortBaseMsgVO.escortDate
            ) {
                vm.btns.push({ value: '3', name: '体征信息' });
            }
            if (vm.appointmentType === '0') {
                vm.btns.push({ value: '4', name: '结算单信息' });
            }
        }
    },
    methods: {
        // 获取服务项列表
        getServiceVos() {
            this.$store
                .dispatch('serviceItems/getServiceVos', {
                    pageNum: 1,
                    pageSize: 10000
                })
                .then(res => {
                    this.serviceList = res.obj || [];
                });
        },
        // tab切换
        handleClick(tab) {
            const vm = this;
            vm.tabIndex = tab;
            vm.activeName = tab;
            if (tab === '0') {
                vm.getAppointmentDetails();
            } else if (tab === '1') {
                getMaterialDetail(vm.id).then(res => {
                    vm.allList = res.data.allList;
                    vm.needList = res.data.needList;
                });
            } else if (tab === '2') {
                vm.tableLoading = true;
                vm.$store
                    .dispatch('serviceItems/getSignServiceDetail', {
                        id: vm.id
                    })
                    .then(res => {
                        vm.signBaseMsgVO = res.obj.signBaseMsgVO || {};
                        vm.dailySignInformationMsgVOList =
                            res.obj.dailySignInformationMsgVOList || [];
                    });
            } else if (tab === '3') {
                vm.$store
                    .dispatch('appointmentService/getSettlementdetail', {
                        id: vm.id
                    })
                    .then(res => {
                        res.obj = res.obj || {};
                        vm.baseMsg = res.obj.baseMsg || {};
                        vm.settlementAccountMsgVO =
                            res.obj.settlementAccountMsgVO || {};
                        vm.remittanceCertificate =
                            res.obj.remittanceCertificate || [];
                    });
            } else if (tab === '4') {
                vm.$store
                    .dispatch('appointmentService/getSettlementdetail', {
                        id: vm.id
                    })
                    .then(res => {
                        res.obj = res.obj || {};
                        vm.baseMsg = res.obj.baseMsg || {};
                        vm.settlementAccountMsgVO =
                            res.obj.settlementAccountMsgVO || {};
                        vm.remittanceCertificate =
                            res.obj.remittanceCertificate || [];
                    });
                vm.$nextTick(() => {
                    vm.tableLoading = false;
                });
            } else if (tab === '5') {
                if (vm.appointmentType === '0') {
                    vm.$store
                        .dispatch('appointmentService/getLogs', {
                            id: vm.id
                        })
                        .then(res => {
                            vm.logList = res.obj || [];
                        });
                } else {
                    vm.$store
                        .dispatch('app/getSysLogs', {
                            id: vm.id,
                            type: '5'
                        })
                        .then(res => {
                            vm.logList = res.obj || [];
                        });
                }
            }
        },
        // 获取预约详情
        getAppointmentDetails() {
            const vm = this;
            vm.id = vm.$route.params.id;
            vm.appointmentType = vm.$route.params.type; // 0 个人 1 企业
            vm.$store
                .dispatch('appointmentService/getAppointmentServiceDetails', {
                    id: vm.id,
                    type: vm.appointmentType
                })
                .then(res => {
                    if (vm.appointmentType === '1') {
                        const {
                            state,
                            provName,
                            cityName,
                            preponitTime,
                            peopleList
                        } = res.obj;
                        // 显示的地址
                        vm.companyDetail = { ...res.obj };
                        vm.address = provName + cityName;
                        vm.companyDetail.statuText = companyStatusFilter(state);
                        vm.companyDetail.infoPretimeText = timeFormat(
                            preponitTime,
                        );
                        peopleList.forEach(item => {
                            item.codeStatus = item.recordType;
                        });
                        vm.peopleList = peopleList;
                    } else {
                        const serviceFrom = {
                            1: '【激活码兑换】',
                            2: '【保单兑换】',
                            3: '【积分兑换】'
                        };
                        const {
                            city,
                            province,
                            state,
                            reserveTime,
                            serviceRegin
                        } = res.obj;
                        // 显示的地址
                        vm.companyDetail = { ...res.obj };
                        vm.address = province + city;
                        vm.companyDetail.statuText = companyStatusFilter(
                            String(state),
                        );
                        vm.companyDetail.reserveTimeText = timeFormat(
                            reserveTime,
                        );
                        vm.companyDetail.type = '个人';
                        vm.code = vm.companyDetail.code || '';
                        for (const key in serviceRegin) {
                            vm.linkType = key;
                            vm.companyDetail.link =
                                serviceFrom[key] + serviceRegin[key];
                        }
                    }
                });
        },
        // 上传文件
        uploadFile(item) {
            const vm = this;
            // 校验状态是否关闭
            if (vm.companyDetail.recordStatus === '2') {
                return;
            }
            const fileObj = item.file;
            // FormData 对象
            const fd = new FormData();
            // 文件对象
            fd.append('file', fileObj);

            vm.loading = true;

            uploadAppointmentNameList(fd)
                .then(response => {
                    const { records, code, comment } = response;
                    if (code === 1) {
                        this.$message({
                            message: comment,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        return;
                    }
                    vm.loading = false;
                    vm.peopleList = records;
                    vm.fileList = [];
                    vm.allDisable = false;
                    vm.notMatch = false;
                    vm.idCardWarn = false;
                    const disableCode = records.filter(item => {
                        return item.activeCodeStatus !== '0';
                    });
                    const legalList = records.filter(item => {
                        return item.legal === 1;
                    });
                    legalList.length && (vm.idCardWarn = true);
                    if (
                        vm.peopleList.length !==
                        Number(vm.companyDetail.personNumber)
                    ) {
                        vm.notMatch = true;
                    }

                    disableCode.length && (vm.allDisable = true);
                })
                .catch(error => {
                    vm.loading = false;
                    this.$message({
                        message: error.message,
                        type: 'error',
                        duration: 5 * 1000
                    });
                });
        },
        // 上传企业人员名单
        addPeopleList() {
            const vm = this;
            // 激活码不可用 不能上传
            if (vm.allDisable || vm.idCardWarn) {
                return;
            }
            vm.$confirm('提交名单后，将成功预约，不可修改', '是否确定', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const params = {
                        list: [],
                        id: vm.$route.params.id
                    };
                    vm.peopleList.forEach(item => {
                        params.list.push({ ...item });
                    });
                    vm.$store
                        .dispatch('appointmentService/saveManyPeople', params)
                        .then(() => {
                            this.$router.go(-1);
                        })
                        .catch(() => {});
                })
                .catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消上传'
                    });
                });
        },
        sendMessage(isAuto) {
            const vm = this;
            vm.$store
                .dispatch('appointment/sendMessage', {
                    id: vm.id,
                    type: vm.appointmentType
                })
                .then(() => {
                    if (isAuto) {
                        this.$router.push('/operateManage/appointmentService');
                    } else {
                        this.$message({
                            message: '发送成功',
                            type: 'success'
                        });
                    }
                })
                .catch(() => {});
        },
        // 切换弹框显示
        toggleModal() {
            this.show = !this.show;
        },
        // 确认审核
        sureExamine() {
            this.toggleModal();
        },
        // 保存企业预约信息
        save() {
            const vm = this;
            vm.$store
                .dispatch('appointmentService/updateAppointment', {
                    id: vm.id,
                    ...vm.companyDetail
                })
                .then(() => {
                    this.$router.push('/operateManage/appointmentService');
                });
        },
        // 图片预览
        openWindow(item) {
            window.open(item);
        },
        // 关闭审核
        closeAppointment() {
            this.sendMessage(true);
        },
        // 查看服务来源
        lookServiceFrom() {
            const vm = this;
            let routeData = '';
            if (vm.linkType === '3') {
                return;
            } else if (vm.linkType === '1') {
                // 激活码详情
                routeData = this.$router.resolve({
                    path: `/projectManage/activeCodeManage/details/${vm.companyDetail.reginId}`
                });
            } else if (vm.linkType === '2') {
                // 保单详情
                if (vm.companyDetail.type === '个人') {
                    routeData = this.$router.resolve({
                        path: `/operateManage/personalPolicy/details/${vm.companyDetail.reginId}`
                    });
                } else {
                    routeData = this.$router.resolve({
                        path: `/policyManage/groupPolicy/details/${vm.companyDetail.reginId}`
                    });
                }
            }
            window.open(routeData.href, '_blank');
        },
        // 限制图片上传
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 20;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 20MB!');
            }
            return isJPG && isLt2M;
        },
        // 跳转供应商详情
        linkDetail(id) {
            if (id) {
                const type = 'detail';
                const vm = this;
                vm.$router.push({
                    path: `/supplyChainManage/supplier/details/${id}/${type}`
                });
            }
        },
        // 保存核销码
        saveCode() {
            if (this.$isEmpty(this.code)) {
                this.$message({
                    message: '核销码不能为空',
                    type: 'warning'
                });
                return false;
            }
            if (!this.$validators.validCode(this.code)) {
                this.$message({
                    message: '核销码只能输入数字或者字母',
                    type: 'warning'
                });
                return;
            }
            this.$store
                .dispatch('appointmentService/updateVerificationCode', {
                    reserveId: this.id,
                    code: this.code
                })
                .then(() => {
                    this.isReserveEdit = false;
                    this.companyDetail.code = this.code;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                })
                .catch(() => {});
        },
        update() {
            const params = {
                id: this.companyDetail.id,
                reserveTime: this.companyDetail.reserveTime,
                serviceSite: this.companyDetail.serviceSiteAddress,
                siteMobile: this.companyDetail.serviceSiteMobile,
                siteName: this.companyDetail.serviceSiteName
            };
            updateReserve(params).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            });
        },
        btnAction(cmd) {
            if (cmd === '1') {
                this.toggleModal();
            } else if (cmd === '2') {
                const h = this.$createElement;
                this.$msgbox({
                    title: '服务核销',
                    message: h(
                        'div',
                        {
                            style: {
                                width: '100%',
                                paddingTop: '20px',
                                borderTop: '1px solid #ccc',
                                paddingLeft: '20px'
                            }
                        },
                        [
                            '是否已使用服务'
                        ],
                    ),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showClose: false,
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            done();
                            instance.confirmButtonLoading = false;
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    const params = {
                        id: this.$route.params.id
                    };
                    IfCancellation(params).then(res => {
                        if (res.status) {
                            this.$message({
                                type: 'success',
                                message: `${res.message}`
                            });
                        }
                        this.getAppointmentDetails();
                    });
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.page-online-service-details {
    /deep/ .el-row::after {
        content: none;
    }
    .btn-group {
        border-bottom: 1px solid #e8e8e8;
    }
    label {
        font-weight: 100;
    }
    .el-form-item__label {
        font-weight: 100;
    }
    .link-box {
        position: relative;
        .link {
            position: absolute;
            top: 0;
            left: 16px;
            z-index: 2;
            height: 36px;
            cursor: pointer;
            color: #464668;
            text-decoration: underline;

            &:link {
                color: #464668 !important;
            }

            &:visited {
                color: #464668 !important;
            }

            &:hover {
                color: #66b2ff !important;
            }

            &:active {
                color: #1c8cff !important;
            }
        }
    }
    .details-content {
        .data-list {
            .data-name {
                font-size: 14px;
                color: #282828;
                font-weight: 600;
            }
            .link {
                text-decoration: underline;
                height: 36px;
                cursor: pointer;
            }
            .data-item {
                font-size: 14px;

                font-weight: 400;
                color: #333333;
                line-height: 14px;
                .el-form-item--medium .el-form-item__label {
                    line-height: 14;
                }
                .el-form-item {
                    margin-bottom: 20px;
                }
                .el-form-item__label {
                    font-size: 14px;

                    font-weight: 400;
                    color: #333333;
                    line-height: 14px;
                }
                .add-certificates {
                    margin-top: 24px;
                }
                .link {
                    text-decoration: underline;
                    height: 36px;
                    cursor: pointer;
                }
                &.row-line {
                    .el-row {
                        line-height: 36px;
                    }
                }
            }
            .upload-contain {
                margin: 24px 0;
                .people-list-none {
                    margin: 0;
                }
                .upload-button {
                    margin-top: 24px;
                    display: flex;
                    .upload-demo {
                        .re-upload {
                            margin-left: 24px;
                        }
                    }
                }
            }
            .danger {
                text-decoration: none;
            }
            .underline {
                text-decoration: underline;
            }
        }
        .imgs {
            width: 120px;
            height: 120px;
            margin: 0 12px 12px 0;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .download-btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;
            color: #606266;
            border: 1px solid #dcdfe6;
            margin-left: 20px;
            &:hover {
                border-color: #409eff;
                color: #409eff;
            }
        }
    }
    .el-select {
        width: 100%;
    }
    .el-cascader {
        width: 100%;
    }
    .el-date-editor {
        width: 100%;
    }
    .el-table th {
        height: 32px;
        line-height: 32px;
    }
    .details {
        padding: 24px 16px;
        .item {
            font-size: 0px;

            font-weight: 400;
            color: #333333;
            margin-bottom: 24px;
            .label {
                display: inline-block;
                width: 100px;
                font-size: 14px;
            }
            .text {
                display: inline-block;
                vertical-align: top;
                width: calc(100% - 100px);
                font-size: 14px;
                word-break: break-all;
                /deep/ .el-image .image-slot {
                    display: flex;
                    -webkit-box-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    align-items: center;
                    font-size: 14px;
                    background: #f5f7fa;
                    color: #c0c4cc;
                    vertical-align: middle;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
