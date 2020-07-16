<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="page-ti">“大白菜”商品评论</div>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="80">
                <template slot-scope="{row}">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品店铺" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.storeId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.orderId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品规格" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsSpecId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否显示" width="60" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.commenType == 1">好评</span>
                    <span v-else-if="row.commenType == 2">差评</span>
                    <span v-else>中评</span>
                </template>
            </el-table-column>
            <el-table-column label="服务评分" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.serviceScore }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否隐藏" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.isShow == 0 ? '否' : '是' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复时间" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.replyTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论时间" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" style="width: 100px;" @click="handleCreate(row)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />
            
        <detail :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></detail>    

    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import detail from "./goodsAppraises_detail.vue"

    export default {
        name: 'ComplexTable',
        components: {
            Pagination,
            detail
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                dialogFormVisible: false,
                listQuery: {
                    page: 1
                }
            }
        },
        created() {
            const id = this.$route.params && this.$route.params.id;
            this.getList();
        },
        methods: {
            operOialog(e) {
                this.dialogFormVisible = false;
                if (e.isClose) {

                } else {

                }
            },
            handleFilter() {

            },
            getList() {
                this.listLoading = true
                var obj = {
                    id: 1,
                    goodsId: 1,
                    storeId: 1,
                    orderId: 1,
                    goodsSpecId: 1,
                    userId: 1,
                    commenType: 1,
                    serviceScore: 10,
                    content: '不太好',
                    shopReply: '你怕是看错咯',
                    goodsImg: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
                    images: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
                    isShow: 1,
                    replyTime: '2020-07-08 12:34:12',
                    createTime: '2020-07-08 12:34:12'
                }
                var list = []
                for (var i = 0; i < 10; i++) {
                    list.push(obj);
                }
                var that = this;
                setTimeout(function() {
                    that.list = list
                    that.total = 100;
                    that.listLoading = false;
                }, 1000)

            },
            handleCreate() {
                this.dialogFormVisible = true
            },
            handleDelete(row, index) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$notify({
                        title: '提示',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.list.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
<style>
    .page-ti{
        padding-bottom: 20px;
        border-bottom: 2px solid #1890ff;
        margin-bottom: 10px;
    }
</style>
