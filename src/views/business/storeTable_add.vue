<template>
    <el-dialog title="编辑桌子" width="40%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 300px;overflow-y: auto;">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="选择分类" prop="categorysId">
                  <el-select v-model="temp.categorysId" filterable class="filter-item" placeholder="请选择商品">
                    <el-option label="高级" :value="1" />
                    <el-option label="中级" :value="2" />
                    <el-option label="低级" :value="3" />
                  </el-select> 
                </el-form-item>
                <el-form-item label="桌子名称" prop="tableName">
                    <el-input v-model="temp.tableName" />
                </el-form-item>
                <el-form-item label="桌号" prop="tableNum">
                    <el-input v-model="temp.tableNum" />
                </el-form-item>
                <el-form-item label="上限人数" prop="maxNum">
                    <el-input v-model.number="temp.maxNum" />
                </el-form-item>
                <el-form-item label="服务费" prop="serveMoney">
                    <el-input v-model.number="temp.serveMoney" />
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
                    tableName: [{
                        required: true,
                        message: '请输入桌子名称',
                        trigger: 'blur'
                    }],
                    categorysId: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'blur'
                    }],
                    maxNum: [{
                        type: 'number',
                        min: 0,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    serveMoney: [{
                        type: 'number',
                        min: 0,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    tableNum: [{
                        type: 'number',
                        min: 0,
                        message: '请输入数字',
                        trigger: 'blur'
                    }]
                },
                temp: {
                    maxNum: '',
                    serveMoney: '',
                    tableName: '',
                    tableNum: '',
                    categorysId:''
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
