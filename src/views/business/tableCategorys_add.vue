<template>
    <el-dialog title="编辑桌子分类" width="40%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 200px;overflow-y: auto;">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="分类名称" prop="categorysName">
                    <el-input v-model="temp.categorysName" />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="handleCloseDialog">
                {{ $t('table.cancel') }}
            </el-button>
            <el-button type="primary" @click="submit()">
                {{ $t('table.confirm') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            dialogFormVisible: {
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        data() {
            return {
                isToplevel: '1',
                isDialog: false,
                rules: {
                    categorysName: [{
                        required: true,
                        message: '请输入桌子名称',
                        trigger: 'blur'
                    }]
                },
                temp: {
                    categorysName: ''
                }
            }
        },
        watch: {
            dialogFormVisible: function(data) {
                console.log(data);
                this.isDialog = data;
            }
        },
        created() {

        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            handleCloseDialog() {
                this.isDialog = false;
                console.log("关闭");
                this.$emit('operOialog', {
                    isClose: true
                });
            },
            submit() {

                console.log("提交", this.temp);
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.isDialog = false;
                        this.resetTemp();
                        this.$emit('operOialog', {
                            isClose: false
                        });
                    }
                });
            },
            resetTemp() {
                this.temp = {
                    maxNum: '',
                    serveMoney: '',
                    tableName: '',
                    tableNum: ''
                }
            }
        }
    }
</script>

<style>
</style>
