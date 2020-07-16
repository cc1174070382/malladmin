<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker v-model="listQuery.startTime" type="datetime" class="filter-item" placeholder="请选择开始时间" />
            <el-date-picker v-model="listQuery.endTime" type="datetime" class="filter-item" placeholder="请选择结束时间" />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                {{ $t('table.search') }}
            </el-button>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="80">
                <template slot-scope="{row}">
                    <span>{{ row.orderId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单号" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.orderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column label="实际订单总金额" width="50" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.realTotalMoney }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.storeId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsNum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.orderStatus == 0">用户拒收</span>
                    <span v-else-if="row.orderStatus == 1">待支付的订单</span>
                    <span v-else-if="row.orderStatus == 2">用户取消</span>
                    <span v-else-if="row.orderStatus == 3">待发货</span>
                    <span v-else-if="row.orderStatus == 4">待收货</span>
                    <span v-else-if="row.orderStatus == 6">用户确认收货</span>
                    <span v-else>配送中</span>
                </template>
            </el-table-column>
            <el-table-column label="收货方式" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.deliverType == 0">物流配送</span>
                    <span v-else-if="row.deliverType == 1">自提</span>
                    <span v-else>同城配送</span>
                </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.payType == 0">货到付款</span>
                    <span v-else-if="row.payType == 1">在线支付</span>
                    <span v-else>余额支付</span>
                </template>
            </el-table-column>
            <el-table-column label="是否支付" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.isPay == 1">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="下单时间" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">
                        <i class="el-icon-view" @click="handleCreate(row)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看收货信息" placement="top">
                        <i @click="handleShowReceiving($index)" class="el-icon-folder-checked" style="margin-left: 10px;"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="发货" placement="top">
                        <i @click="handleShowDeliver($index)" class="el-icon-check" style="margin-left: 10px;"></i>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />

        <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>

        <el-dialog title="收货信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <template v-if="list">
                <div class="receiving">{{list[orderIndex].userName}}</div>
                <div class="receiving">{{list[orderIndex].userPhone}}</div>
                <div class="receiving">{{list[orderIndex].userAddress}}</div>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleClipboard($event)">复 制</el-button>
            </span>
        </el-dialog>

        <el-dialog title="发货" :visible.sync="dialogDeliver" width="30%" :before-close="handleClose">
            <el-input style="width: 100%;" class="form-inp-w" v-model="courierNumber" placeholder="输入快递单号" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDeliver = false">取 消</el-button>
                <el-button type="primary" @click="handleDelivergoods()">发货</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import add from './generalOrder_detail.vue'
    import clipboard from '@/utils/clipboard'

    export default {
        name: 'groupOrder',
        components: {
            Pagination,
            add
        },
        data() {
            return {
                list: null,
                total: 0,
                courierNumber: '',
                listLoading: true,
                dialogVisible: false,
                dialogFormVisible: false,
                dialogDeliver: false,
                orderIndex: 0,
                listQuery: {
                    page: 1
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleDelivergoods() {
                console.log(this.courierNumber);
                this.courierNumber = '';
                this.dialogDeliver = false;
                this.$message({
                    type: 'success',
                    message: '发货成功'
                });
            },
            handleShowDeliver(index) {
                this.dialogDeliver = true;
                this.orderIndex = index;
            },
            handleClipboard(event) {
                var text =
                    `${this.list[this.orderIndex].userName} ${this.list[this.orderIndex].userPhone} ${this.list[this.orderIndex].userAddress}`;
                clipboard(text, event);
                this.dialogVisible = false;
            },
            handleShowReceiving(index) {
                this.orderIndex = index;
                this.dialogVisible = true;
                console.log(123123123);
            },
            handleClose(done) {
                done();
            },
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
    .receiving {
        line-height: 25px;
    }
</style>
