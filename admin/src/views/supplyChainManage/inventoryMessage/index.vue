<template>
    <div class="tag-libray-page page-form modal-form">
        <el-container>
            <el-scrollbar
                :native="false"
                wrap-class="el-main"
                tag="main"
                :noresize="false"
            >
                <div class="flex-between">
                    <div class="title-top ">杠杆消息配置</div>
                    <div class="mb-30">
                        <el-button
                            type="primary"
                            @click="edit(null)"
                        >添加短信消息接收人</el-button>
                    </div>
                </div>
                <el-table
                    v-loading="tableLoading"
                    :data="dataList"
                    class="table-large"
                >
                    <el-table-column
                        label="姓名"
                        prop="name"
                    />
                    <el-table-column
                        label="手机号"
                        prop="mobile"
                    />
                    <el-table-column
                        label="邮箱"
                        prop=""
                    >
                    <template slot-scope="scope">
                        <div class="box">{{scope.row.email}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column label="创建时间">
                        <template slot-scope="{row}">
                            <div class="box">{{ row.createTime | timeFormat }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                    >
                        <template slot-scope="{row}">
                            <div class="box">
                                <HoverTip
                                    content="编辑"
                                    tip-class-name="icon-edit  mr-30"
                                    @click.native.prevent="edit(row.id)"
                                />
                                <el-popconfirm
                                    title="删除后将不可恢复，是否删除？"
                                    placement="top"
                                    confirm-button-text="确认"
                                    cancel-button-text="取消"
                                    confirm-button-type="plain"
                                    cancel-button-type="primary"
                                    :hide-icon="true"
                                    @onConfirm="del(row.id)"
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
                    <div
                        slot="empty"
                        class="empty-img"
                    />
                </el-table>
                <inventoryMessageConfig
                    :id="id"
                    :visible.sync="dialog.visible"
                    @saved="list()"
                />
                <!-- <Pagination
                    v-if='query.total>10'
                    :total="query.total"
                    :limit="query.pageSize"
                    :page.sync="query.pageNo"
                    @pagination="list"
                    layout="total, prev, pager, next"
                /> -->
            </el-scrollbar>
        </el-container>
    </div>
</template>
<script>
import inventoryMessageConfig from './component/inventoryMessageConfig';
export default {
    name: 'inventoryMessage',
    components: { inventoryMessageConfig },
    data() {
        return {
            tableLoading: false,
            id: '',
            dataList: [
                {
                    name: '上三'
                }
            ],
            query: {
                pageSize: 10,
                total: 0,
                pageNo: 1
            }
        };
    },
    computed: {
        pageNum() {
            return this.$store.state.app.pageNum || 1;
        }
    },
    created() {
        this.query.pageNo = this.pageNum;
        this.list();
    },
    methods: {
        /**
         * 获取列表数据
         */
        list: async function() {
            const res = await this.$store.dispatch('inventory/listWarningMessage');
            if (res) {
                this.dataList = res.data || [];
            }
        },
        // 新增或者编辑
        edit(id) {
            this.id = id;
            this.dialog.visible = true;
        },
        // 删除数据
        async del(id) {
            const res = await this.$store.dispatch(
                'inventory/delWarningMessage',
                { id }
            );
            if (res) {
                this.list();
                this.$message.success('删除成功');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.tag-libray-page {
    .tag {
        width: 100%;
        display: flex;
        max-height: 172px;
        flex-wrap: wrap;
        padding: 8px 0;
        overflow-y: auto;
        .tag-item {
            margin-right: 36px;
            margin-bottom: 12px;
            .text {
                color: #1e1e2f;
                font-size: 16px;
            }
            .delete-tag {
                display: inline-block;
                padding: 8px 16px 8px;
                font-size: 14px;
                border: 1px solid #3599fe;
                position: relative;
                color: #1e1e2f;
                border-radius: 4px;
                .delete {
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-image: url("../../../assets/icon_tag_delete.svg");
                    background-size: 100% 100%;
                    cursor: pointer;
                }
            }
        }
    }
    .box{
        height: 24px;
        line-height: 24px;
    }
}
</style>
