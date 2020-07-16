<template>
    <el-dialog title="订单详情" width="80%" top="5vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 70vh;overflow-y: auto;">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
                <el-form-item label="订单编号">
                    <el-input class="form-inp-w" :value="temp.orderNo" />
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input class="form-inp-w" :value="temp.goodsId" />
                </el-form-item>
                <el-form-item label="商品店铺">
                    <el-input class="form-inp-w" :value="temp.storeId" />
                </el-form-item>
                <el-form-item label="下单用户">
                    <el-input class="form-inp-w" :value="temp.userId" />
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input class="form-inp-w" :value="temp.goodsNum" />
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-input class="form-inp-w" v-if="temp.orderStatus == 0" value="用户拒收" />
                    <el-input class="form-inp-w" v-else-if="temp.orderStatus == 1" value="待支付的订单" />
                    <el-input class="form-inp-w" v-else-if="temp.orderStatus == 2" value="用户取消" />
                    <el-input class="form-inp-w" v-else-if="temp.orderStatus == 3" value="待发货" />
                    <el-input class="form-inp-w" v-else-if="temp.orderStatus == 4" value="待收货" />
                    <el-input class="form-inp-w" v-else-if="temp.orderStatus == 5" value="用户确认收货" />
                    <el-input class="form-inp-w" v-else value="配送中" />
                </el-form-item>
                <el-form-item label="商品总金额">
                    <el-input class="form-inp-w" :value="temp.goodsMoney" />
                </el-form-item>
                <el-form-item label="收货方式">
                    <el-input class="form-inp-w" v-if="temp.deliverType == 0" value="物流配送" />
                    <el-input class="form-inp-w" v-else-if="temp.deliverType == 1" value="自提" />
                    <el-input class="form-inp-w" v-else value="同城配送" />
                </el-form-item>
                <el-form-item label="运费">
                    <el-input class="form-inp-w" :value="temp.deliverMoney" />
                </el-form-item>
                <el-form-item label="物流单号">
                    <el-input class="form-inp-w" :value="temp.logisticsNum" />
                </el-form-item>
                <el-form-item label="订单总金额">
                    <el-input class="form-inp-w" :value="temp.totalMoney" />
                </el-form-item>
                <el-form-item label="实际订单总金额">
                    <el-input class="form-inp-w" :value="temp.realTotalMoney" />
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-input class="form-inp-w" v-if="temp.payType == 0" value="货到付款" />
                    <el-input class="form-inp-w" v-else-if="temp.payType == 1" value="在线支付" />
                    <el-input class="form-inp-w" v-else value="余额支付" />
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-input class="form-inp-w" v-if="temp.isPay == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input class="form-inp-w" :value="temp.userName" />
                </el-form-item>
                <el-form-item label="收件电话">
                    <el-input class="form-inp-w" :value="temp.userPhone" />
                </el-form-item>
                <el-form-item label="收件地址">
                    <el-input class="form-inp-w" :value="temp.userAddress" />
                    <el-button type="primary" @click="handleClipboard($event)">复制收货信息</el-button>
                </el-form-item>
                <el-form-item label="所得积分">
                    <el-input class="form-inp-w" :value="temp.orderScore" />
                </el-form-item>
                <el-form-item label="是否需要发票">
                    <el-input class="form-inp-w" v-if="temp.isInvoice == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="发票抬头">
                    <el-input class="form-inp-w" :value="temp.invoiceClient" />
                </el-form-item>
                <el-form-item label="订单备注">
                    <el-input class="form-inp-w" type="textarea" :value="temp.orderRemarks"></el-input class="form-inp-w">
                </el-form-item>
                <el-form-item label="订单来源">
                    <el-input class="form-inp-w" v-if="temp.orderSrc == 0" value="商城" />
                    <el-input class="form-inp-w" v-else-if="temp.orderSrc == 1" value="微信" />
                    <el-input class="form-inp-w" v-else-if="temp.orderSrc == 2" value="手机版" />
                    <el-input class="form-inp-w" v-else-if="temp.orderSrc == 3" value="安卓App" />
                    <el-input class="form-inp-w" v-else-if="temp.orderSrc == 4" value="苹果App" />
                    <el-input class="form-inp-w" v-else value="小程序" />
                </el-form-item>
                <el-form-item label="是否退款">
                    <el-input class="form-inp-w" v-if="temp.isRefund == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="是否点评">
                    <el-input class="form-inp-w" v-if="temp.isAppraise == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="订单失败内容">
                    <el-input class="form-inp-w" type="textarea" :value="temp.ordeFailText"></el-input class="form-inp-w">
                </el-form-item>
                <el-form-item label="是否退款">
                    <el-input class="form-inp-w" v-if="temp.orderFailType == 0" value="取消" />
                    <el-input class="form-inp-w" v-else-if="temp.orderFailType == 1" value="退款" />
                    <el-input class="form-inp-w" v-else value="拒收" />
                </el-form-item>
                <el-form-item label="是否完结">
                    <el-input class="form-inp-w" v-if="temp.isClosed == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="订单流水号">
                    <el-input class="form-inp-w" :value="temp.orderunique" />
                </el-form-item>
                <el-form-item label="收货时间">
                    <el-input class="form-inp-w" :value="temp.receiveTime" />
                </el-form-item>
                <el-form-item label="发货时间">
                    <el-input class="form-inp-w" :value="temp.deliveryTime" />
                </el-form-item>
                <el-form-item label="在线支付流水号">
                    <el-input class="form-inp-w" :value="temp.tradeNo" />
                </el-form-item>
                <el-form-item label="订单应收佣金">
                    <el-input class="form-inp-w" :value="temp.commissionFee" />
                </el-form-item>
                <el-form-item label="支付自增ID">
                    <el-input class="form-inp-w" :value="temp.payRand" />
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-input class="form-inp-w" v-if="temp.orderType == 0" value="实物订单" />
                    <el-input class="form-inp-w" v-else value="非实物订单" />
                </el-form-item>
                <el-form-item label="积分抵扣的金额">
                    <el-input class="form-inp-w" :value="temp.scoreMoney" />
                </el-form-item>
                <el-form-item label="用于抵扣的积分">
                    <el-input class="form-inp-w" :value="temp.useScore" />
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-input class="form-inp-w" v-if="temp.distributType == 0" value="按商品设置提取佣金" />
                    <el-input class="form-inp-w" v-else value="按订单比例提取佣金" />
                </el-form-item>
                <el-form-item label="分成比例">
                    <el-input class="form-inp-w" :value="temp.distributOrderRate" />
                </el-form-item>
                <el-form-item label="分成佣金">
                    <el-input class="form-inp-w" :value="temp.totalCommission" />
                </el-form-item>
                <el-form-item label="提醒发货">
                    <el-input class="form-inp-w" v-if="temp.noticeDeliver == 0" value="未提醒" />
                    <el-input class="form-inp-w" v-else value="已提醒" />
                </el-form-item>
                <el-form-item label="所使用的充值送金额">
                    <el-input class="form-inp-w" :value="temp.lockCashMoney" />
                </el-form-item>
                <el-form-item label="优惠券ID">
                    <el-input class="form-inp-w" :value="temp.userCouponId" />
                </el-form-item>
                <el-form-item label="付款时间">
                    <el-input class="form-inp-w" :value="temp.payTime" />
                </el-form-item>
                <el-form-item label="退款金额">
                    <el-input class="form-inp-w" :value="temp.totalPayFee" />
                </el-form-item>
                <el-form-item label="收银员">
                    <el-input class="form-inp-w" :value="temp.shopUserId" />
                </el-form-item>
                <el-form-item label="收银类型">
                    <el-input class="form-inp-w" v-if="temp.tradeType == 0" value="普通收银" />
                    <el-input class="form-inp-w" v-else value="收银系统" />
                </el-form-item>
                <el-form-item label="余额支付金额">
                    <el-input class="form-inp-w" :value="temp.balancePay" />
                </el-form-item>
                <el-form-item label="是否开发票">
                    <el-input class="form-inp-w" v-if="temp.isMakeInvoice == 0" value="已开" />
                    <el-input class="form-inp-w" v-else value="未开" />
                </el-form-item>
                <el-form-item label="售后结束时间">
                    <el-input class="form-inp-w" :value="temp.afterSaleEndTime" />
                </el-form-item>
                <el-form-item label="分销佣金是否结算">
                    <el-input class="form-inp-w" v-if="temp.dmoneyIsSettlement == 0" value="否" />
                    <el-input class="form-inp-w" v-else value="是" />
                </el-form-item>
                <el-form-item label="自提点ID">
                    <el-input class="form-inp-w" v-if="temp.storeType == 0" value="商家自提点" />
                    <el-input class="form-inp-w" v-else value="平台自提点" />
                </el-form-item>
                <el-form-item label="核销人">
                    <el-input class="form-inp-w" :value="temp.uersId" />
                </el-form-item>
                <el-form-item label="核销码">
                    <el-input class="form-inp-w" :value="temp.verificationCode" />
                </el-form-item>
                <el-form-item label="核销二维码">
                    <el-image :src="temp.verificationImg">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                </el-form-item>
                <el-form-item label="核销时间">
                    <el-input class="form-inp-w" :value="temp.verificationTime" />
                </el-form-item>
                <el-form-item label="已退支付金额">
                    <el-input class="form-inp-w" :value="temp.refundedPayMoney" />
                </el-form-item>
                <el-form-item label="下单时间">
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
                    orderId: 1,
                    orderNo: '123456789',
                    storeId: 1,
                    userId: 1,
                    goodsId: 1,
                    userAddress: '贵州省贵阳市南明区花果园',
                    userName: '张三',
                    userPhone: '18209787665',
                    goodsNum: 2,
                    orderStatus: 1,
                    goodsMoney: 100,
                    deliverType: 0,
                    deliverMoney: 10,
                    logisticsNum: '09876543',
                    totalMoney: 100,
                    realTotalMoney: 100,
                    payType: 1,
                    isPay: 0,
                    orderPhoto: '',
                    addressPhoto: '',
                    orderScore: 100,
                    isInvoice: 1,
                    invoiceClient: '',
                    orderRemarks: '这是订单备注啊',
                    orderSrc: 0,
                    isRefund: 0,
                    isAppraise: 0,
                    ordeFailText: '',
                    orderFailType: 0,
                    isClosed: 0,
                    orderunique: '4567890',
                    tradeNo: '2345678',
                    commissionFee: 1.9,
                    payRand: '',
                    orderType: 0,
                    scoreMoney: 0,
                    useScore: 0,
                    distributType: 1,
                    distributOrderRate: '',
                    totalCommission: 1,
                    noticeDeliver: 1,
                    lockCashMoney: 0,
                    userCouponId: 1,
                    userCouponJson: '',
                    totalPayFee: 0,
                    shopUserId: 1,
                    tradeType: 0,
                    balancePay: 0,
                    prepay_id: '9876543',
                    isMakeInvoice: 0,
                    getScoreVal: 1,
                    dmoneyIsSettlement: 0,
                    storeType: 1,
                    verificationCode: '',
                    verificationImg: '',
                    refundedPayMoney: 0,
                    uersId: 2,
                    verificationTime: '2020-07-08 12:34:12',
                    afterSaleEndTime: '2020-07-08 12:34:12',
                    payTime: '2020-07-08 12:34:12',
                    receiveTime: '2020-07-08 12:34:12',
                    deliveryTime: '2020-07-08 12:34:12',
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
        width: 230px;
    }

    .el-dialog__body {
        padding: 10px 20px;
    }
</style>
