<template>
    <div class="app-container">


        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="80">
                <template slot-scope="{row}">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作类型" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作用户" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作内容" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作时间" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button size="mini" type="danger" @click="handleDelete()">
                        {{ $t('table.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'

    export default {
        name: 'ComplexTable',
        components: {
            Pagination
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true
                var obj = {
                    id: 1,
                    type: '这种类型',
                    content: '删除商品',
                    time: '2020-08-09 12:34:01',
                    userId: 1,
                    adsId: 1
                }
                var list = [];
                obj = JSON.stringify(obj);
                for (var i = 0; i < 10; i++) {
                    list.push(JSON.parse(obj));
                }
                var that = this;
                setTimeout(function() {
                    that.list = list
                    that.total = 100;
                    that.listLoading = false;
                }, 1000)

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
