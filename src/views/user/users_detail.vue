<template>
    <el-dialog title="用户详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 60vh;overflow-y: auto;">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
                <el-form-item label="用户昵称">
                    <el-input class="form-inp-w" :value="temp.userName" />
                </el-form-item>
                <el-form-item label="头像">
                    <el-image fit="fill" style="width: 100px;height: 100px;" :src="temp.avatarUrl">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input class="form-inp-w" :value="temp.loginName" />
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input class="form-inp-w" :value="temp.trueName" />
                </el-form-item>
                <el-form-item label="生日">
                    <el-input class="form-inp-w" :value="temp.brithday" />
                </el-form-item>
                <el-form-item label="电话">
                    <el-input class="form-inp-w" :value="temp.userPhone" />
                </el-form-item>
                <el-form-item label="邮件">
                    <el-input class="form-inp-w" :value="temp.userEmail" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-input class="form-inp-w" v-if="temp.userSex == 0" value="保密" />
                    <el-input class="form-inp-w" v-else-if="temp.userSex == 1" value="男" />
                    <el-input class="form-inp-w" v-else value="女" />
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-input class="form-inp-w" v-if="temp.userStatus == 0" value="正常" />
                    <el-input class="form-inp-w" v-else value="冻结" />
                </el-form-item>
                <el-form-item label="会员类型">
                    <el-input class="form-inp-w" :value="temp.memberType" />
                </el-form-item>
                <el-form-item label="分销佣金">
                    <el-input class="form-inp-w" :value="temp.distributMoney" />
                </el-form-item>
                <el-form-item label="余额">
                    <el-input class="form-inp-w" :value="temp.userMoney" />
                </el-form-item>
                <el-form-item label="冻结金额">
                    <el-input class="form-inp-w" :value="temp.lockMoney" />
                </el-form-item>
                <el-form-item label="用户积分">
                    <el-input class="form-inp-w" :value="temp.userScore" />
                </el-form-item>
                <el-form-item label="登录次数">
                    <el-input class="form-inp-w" :value="temp.count" />
                </el-form-item>
                <el-form-item label="上次登录时间">
                    <el-input class="form-inp-w" :value="temp.lastTime" />
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input class="form-inp-w" :value="temp.createTime" />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button type="primary" @click="handleCloseDialog">
                {{ $t('table.confirm') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import clipboard from '@/utils/clipboard'
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
                temp: {
                    userId: 1,
                    userName: '呵呵',
                    userPhone: '18298675674',
                    loginName: '18298675674',
                    passWord: '123456',
                    trueName: '李四',
                    brithday: '2020-07-08',
                    userEmail: '11749876876@qq.com',
                    userSex: 1,
                    userStatus: 0,
                    count:45 ,
                    memberType: 1,
                    wxOpenId: 'hklsdfk954ki876jg76',
                    distributMoney: 10,
                    userMoney: 100,
                    lockMoney: 6,
                    userScore: 170,
                    wxUnionId: '',
                    avatarUrl: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
                    lastTime: '2020-07-08 12:34:12',
                    createTime: '2020-07-08 12:34:12'
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
            handleClipboard(event) {
                var text = `${this.temp.userName} ${this.temp.userTel} ${this.temp.userAddress}`;
                clipboard(text, event);
            },
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
                    this.temp.catImg = URL.createObjectURL(file.raw);
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
                    catImg: '',
                    seoTitle: '',
                    seoKeywords: '',
                    seoDes: ''
                }
            }
        }
    }
</script>

<style>
    .form-inp-w {
        width: 200px;
    }
</style>
