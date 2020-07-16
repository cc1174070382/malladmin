<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="page-ti">张三</div>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="60">
                <template slot-scope="{row}">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收货人" width="100" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收货电话" width="150" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.userPhone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="地址" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.areaIdPath }}{{ row.userAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否为默认" align="center" width="100">
                <template slot-scope="{row}">
                    <span>{{ row.isDefault == 0 ? '否' : '是'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="160" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>

    export default {
        name: 'ComplexTable',
        components: {
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
                    userId: 1,
                    userName: '李四',
                    userPhone: '18209787564',
                    areaIdPath: '贵州省贵阳市南明区',
                    userAddress: '月亮岩',
                    isDefault: 1,
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
