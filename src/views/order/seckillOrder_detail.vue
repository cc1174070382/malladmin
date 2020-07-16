<template>
    <el-dialog title="秒杀订单详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 60vh;overflow-y: auto;">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
                <el-form-item label="订单编号">
                    <el-input class="form-inp-w" :value="temp.orderNum" />
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input class="form-inp-w" :value="temp.goodsId" />
                </el-form-item>
                <el-form-item label="用户">
                    <el-input class="form-inp-w" :value="temp.userId" />
                </el-form-item>
                <el-form-item label="订单总金额">
                    <el-input class="form-inp-w" :value="temp.orderPrice" />
                </el-form-item>
                <el-form-item label="获得积分">
                    <el-input class="form-inp-w" :value="temp.getScore" />
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input class="form-inp-w" :value="temp.goodsNum" />
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input class="form-inp-w" :value="temp.userName" />
                </el-form-item>
                <el-form-item label="收件电话">
                    <el-input class="form-inp-w" :value="temp.userTel" />
                </el-form-item>
                <el-form-item label="收件地址">
                    <el-input class="form-inp-w" :value="temp.userAddress" />
                    <el-button type="primary" @click="handleClipboard($event)">复制收货信息</el-button>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-input class="form-inp-w" v-if="temp.payType == 1" value="余额" />
                    <el-input class="form-inp-w" v-else-if="temp.payType == 2" value="微信" />
                    <el-input class="form-inp-w" v-else-if="temp.payType == 3" value="抵扣" />
                    <el-input class="form-inp-w" v-else value="线下" />
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-input class="form-inp-w" v-if="temp.orderState == 0" value="用户关闭" />
                    <el-input class="form-inp-w" v-else-if="temp.orderState == 1" value="待付款" />
                    <el-input class="form-inp-w" v-else-if="temp.orderState == 2" value="待发货" />
                    <el-input class="form-inp-w" v-else-if="temp.orderState == 3" value="待收货" />
                    <el-input class="form-inp-w" v-else-if="temp.orderState == 4" value="待评价" />
                    <el-input class="form-inp-w" v-else value="超时自动关闭" />
                </el-form-item>
                <el-form-item label="订单备注">
                    <el-input class="form-inp-w" type="textarea" :value="temp.orderRemark"></el-input class="form-inp-w">
                </el-form-item>
                <el-form-item label="关闭原因">
                    <el-input class="form-inp-w" type="textarea" :value="temp.closrType"></el-input class="form-inp-w">
                </el-form-item>
                <el-form-item label="支付时间">
                    <el-input class="form-inp-w" :value="temp.payTime" />
                </el-form-item>
                <el-form-item label="发货时间">
                    <el-input class="form-inp-w" :value="temp.deliveTime" />
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
                    goodsId: 1,
                    userId: 1,
                    orderNum: 1,
                    orderPhoto: '',
                    userAddress: '贵州省贵阳市南明区花果园',
                    userName: '张三',
                    userTel: '18209787665',
                    payType: 2,
                    orderState: 1,
                    orderPrice: 100,
                    orderRemark: '快点',
                    goodsNum: 1,
                    prepayId: 1,
                    getScore: 100,
                    closrType: '我咋知道！',
                    deliveTime: '2020-07-08 12:34:12',
                    payTime: '2020-07-08 12:34:12',
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
