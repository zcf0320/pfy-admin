<template>
    <Dialog
        title="批量导入"
        :visible.sync="dialog.visible"
        :height="500"
        :width="520"
        @closed="(val)=>{dialog.visible=false}"
    >
        <div class="uploadExcel">
            <input
                ref="input"
                type="file"
                class="none"
                accept=".xls,.xlsx"
                @change="uploadExecl"
            >
            <div class="flex-box mb-14">
                <div class="label">选择文件</div>
                <el-input
                    v-model="fileName"
                    class="fileName"
                />
                <el-button
                    type="default"
                    @click="()=>{
                $refs.input.click()
            }"
                >选择文件</el-button>
            </div>
            <div class="flex">
                <div class="label"/>
                <div>
                    <div class="tips">支持不超过10M的Excel文件。</div>
                    <div class="tips"> 请按照模版格式要求，批量上传理赔数据！<a
                            class="download"
                            download
                            href="/static/导入模板.xlsx"
                        >下载模板</a></div>
                </div>
            </div>
            <a
                v-if="$isNotEmpty(uploadKey)"
                ref="downloadErr"
                class="none"
                download
                :href="downFailModel(uploadKey)"
            >下载模板</a>
            <div
                v-if="success"
                class="mt-30"
            >
                <div class="flex">
                    <div class="label">导入结果</div>
                    <div>
                        <div class="flex-box mb-14">
                            <div class="success mr-12"/>
                            导入成功：{{ formData.successNum }}条数据

                        </div>
                        <div class="flex-box">
                            <div class="error mr-12"/>
                            导入失败：{{ formData.errorNum }}条数据。
                            <span
                                v-if="formData.errorNum>0"
                                class="download mr-12"
                                @click="downloadErr"
                            >下载失败数据</span>
                            <span v-if="formData.errorNum>0">查看失败原因</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button @click="dialog.visible = false">取 消</el-button>
            <el-button
                type="primary"
                :disabled="$isEmpty(file)"
                @click="saveForm()"
            >确 定</el-button>
        </span>
    </Dialog>
</template>

<script>
import { downFailModel } from '@/api/auditRecords';
export default {
    name: 'claimReasonDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            downFailModel: downFailModel,
            fileName: '',
            file: {},
            success: false,
            uploadKey: '',
            formData: {
                successNum: 6,
                errorNum: 4,
                path: ''
            }
        };
    },
    watch: {
        visible: {
            async handler(val) {
                if (val) {
                    this.fileName = '';
                    this.file = {};
                    this.success = false;
                    this.uploadKey = '';
                    if (this.$isNotEmpty(this.$refs.input)) {
                        this.$refs.input.value = '';
                    }
                }
                this.dialog.visible = val;
            }
        },
        'dialog.visible': {
            handler(val) {
                if (!val) {
                    this.$emit('update:visible', false);
                    this.$emit('saved');
                }
            }
        }
    },
    methods: {
        uploadExecl(e) {
            const file = e.target.files[0];
            if (this.$isNotEmpty(file)) {
                const size = file.size / 1024 / 1024;
                if (size > 10) {
                    this.$message({
                        type: 'warning',
                        message: '文件不能大小超过10M'
                    });
                    this.file = {};
                    return;
                }
                this.fileName = file.name;
                this.file = file;
            }
        },
        /**
         * 上传文件
         */
        saveForm() {
            if (this.$isNotEmpty(this.file)) {
                const fileObj = this.file;
                // FormData 对象
                const fd = new FormData();
                // 文件对象
                fd.append('fileName', fileObj);
                this.$store
                    .dispatch('auditRecords/uploadClaimExcel', fd)
                    .then(res => {
                        if (res.data.status) {
                            this.success = true;
                            this.formData.successNum = res.data.data.success;
                            this.formData.errorNum = res.data.data.fails;
                            this.fileName = '';
                            this.file = {};
                            this.uploadKey = res.data.data.uploadKey;
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                    });
                // 防止上传同一张图片不走change事件
                this.$refs.input.value = '';
            }
        },
        /**
         * 下载失败模板
         */
        async downloadErr() {
            this.$refs.downloadErr.click();
        }
    }
};
</script>

<style lang="scss" scoped>
.uploadExcel {
    .fileName {
        width: 250px;
        margin-right: 24px;
    }
    .mb-14 {
        margin-bottom: 14px;
    }
    .label {
        width: 95px;
        color: #464668;
    }
    .download {
        color: #3599fe;
        font-size: 14px;
        cursor: pointer;
    }
    .tips {
        color: #989ab3;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .success {
        width: 20px;
        height: 20px;
        width: 20px;
        height: 20px;
        background-image: url("../../../../assets/success.png");
        background-size: 100% 100%;
        display: inline-block;
    }
    .error {
        width: 20px;
        height: 20px;
        width: 20px;
        height: 20px;
        background-image: url("../../../../assets/error.png");
        background-size: 100% 100%;
        display: inline-block;
    }
}
</style>
