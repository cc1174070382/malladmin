<template>
    <el-dialog title="编辑平台成员" width="40%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 250px;overflow-y: auto;">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left:50px;">
                <el-form-item label="用户账号" prop="vipName">
                    <el-input v-model="temp.useName" />
                </el-form-item>
                <el-form-item label="用户密码" prop="money">
                    <el-input v-model.number="temp.money" />
                </el-form-item>
                <el-form-item label="用户电话">
                    <el-input v-model.number="temp.userTel" />
                </el-form-item>
                <el-form-item label="用户角色" prop="roleId">
                    <el-input v-model="temp.roleId" />
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
                    useName: [{
                        required: true,
                        message: '请输入用户账号',
                        trigger: 'blur'
                    }],
                    usePass: [{
                        required: true,
                        message: '请输入用户密码',
                        trigger: 'blur'
                    }]
                },
                temp: {
                    useName: '',
                    usePass: '',
                    userTel: '',
                    roleId: '',
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
            upPreview(file, fileList) {
                var fileName = file.name;
                var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
                if (regex.test(fileName.toLowerCase())) {
                    this.temp.vipLogin = URL.createObjectURL(file.raw);
                } else {
                    this.$message.error('请选择图片文件');
                }
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
                    categoryName: '',
                    categoryPid: '',
                    categorySort: 0,
                    isShow: '1',
                    vipLogin: '',
                    seoTitle: '',
                    seoKeywords: '',
                    seoDes: ''
                }
            }
        }
    }
</script>

<style>
</style>
