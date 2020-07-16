<template>
    <el-dialog title="编辑广告" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 60vh;overflow-y: auto;">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="广告类型" prop="positionType">
                    <el-select v-model="temp.positionType" class="filter-item" placeholder="请选择广告源类型">
                        <el-option label="电脑端" value="1" />
                        <el-option label="微信端" value="2" />
                        <el-option label="手机端" value="3" />
                        <el-option label="app端" value="4" />
                        <el-option label="小程序端" value="5" />
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置" prop="positionName">
                    <el-select v-model="temp.positionName" class="filter-item" placeholder="请选择广告位置">
                        <el-option label="顶部" value="1" />
                        <el-option label="中部" value="2" />
                        <el-option label="底部" value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="建议宽度" prop="positionWidth">
                    <el-input v-model.number="temp.positionWidth" />
                </el-form-item>
                <el-form-item label="建议高度" prop="positionHeight">
                    <el-input v-model.number="temp.positionHeight" />
                </el-form-item>
                <el-form-item label="排序" prop="apSort">
                    <el-input v-model.number="temp.apSort" />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
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
                dialogStatus: 'create',
                isDialog: false,
                rules: {
                    positionType: [{
                        required: true,
                        message: '请选择广告源类型',
                        trigger: 'change'
                    }],
                    positionName: [{
                        required: true,
                        message: '请选择广告位置',
                        trigger: 'change'
                    }],
                    positionWidth: [{
                            required: true,
                            message: '请输入建议宽度',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            message: '请输入整数',
                            trigger: 'blur'
                        }
                    ],
                    positionHeight: [{
                            required: true,
                            message: '请输入建议高度',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            message: '请输入整数',
                            trigger: 'blur'
                        }
                    ],
                    apSort: [{
                        type: 'number',
                        min: 0,
                        message: '请输入整数',
                        trigger: 'blur'
                    }]
                },
                temp: {
                    positionType: '1',
                    positionName: '1',
                    positionWidth: '',
                    positionHeight: '',
                    apSort: 0
                },
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
                        this.$emit('operOialog', {
                            isClose: false
                        });
                    }
                });
            },
            resetTemp() {
                this.temp = {
                    positionType: '1',
                    positionName: '1',
                    positionWidth: '',
                    positionHeight: '',
                    apSort: 0
                }
            }
        }
    }
</script>

<style>
</style>
