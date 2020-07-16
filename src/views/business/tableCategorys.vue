<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
                {{ $t('table.add') }}
            </el-button>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="80">
                <template slot-scope="{row}">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="分类名称" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.categorysName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上级分类" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.pid ? row.pid : '顶级分类'}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleCreate(row)">
                        {{ $t('table.edit') }}
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete()">
                        {{ $t('table.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />

        <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import add from './tableCategorys_add.vue'

    export default {
        name: 'ComplexTable',
        components: {
            Pagination,
            add
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
                    categorysName: '高级',
                    pid: ''
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
