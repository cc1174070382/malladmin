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
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.goodsId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总金额" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="50" align="center">
        <template slot-scope="{row}">
          <span>{{ row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付金额" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得积分" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.getScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template slot-scope="{row}">
          <span v-if="row.payType == 1">余额</span>
          <span v-else-if="row.payType == 2">微信</span>
          <span v-else-if="row.payType == 3">抵扣</span>
          <span v-else>线下</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.orderState == 0">用户关闭</span>
          <span v-else-if="row.orderState == 1">待付款</span>
          <span v-else-if="row.orderState == 2">待发货</span>
          <span v-else-if="row.orderState == 3">待收货</span>
          <span v-else-if="row.orderState == 4">待评价</span>
          <span v-else>超时自动关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payTime }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>

    <el-dialog title="收货信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <template v-if="list">
        <div class="receiving">{{list[orderIndex].userName}}</div>
        <div class="receiving">{{list[orderIndex].userTel}}</div>
        <div class="receiving">{{list[orderIndex].userAddress}}</div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClipboard($event)">复 制</el-button>
      </span>
    </el-dialog>

    <el-dialog title="发货" :visible.sync="dialogDeliver" width="30%" :before-close="handleClose">
      <el-input style="width: 100%;" class="form-inp-w" v-model="courierNumber" placeholder="输入快递单号"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliver = false">取 消</el-button>
        <el-button type="primary" @click="handleDelivergoods()">发货</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import add from './seckillOrder_detail.vue'
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
        courierNumber:'',
        listLoading: true,
        dialogVisible: false,
        dialogFormVisible: false,
        dialogDeliver:false,
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
      handleDelivergoods(){
        console.log(this.courierNumber);
        this.courierNumber = '';
        this.dialogDeliver = false;
        this.$message({
          type: 'success',
          message: '发货成功'
        });
      },
      handleShowDeliver(index){
        this.dialogDeliver = true;
        this.orderIndex = index;
      },
      handleClipboard(event) {
        var text =
          `${this.list[this.orderIndex].userName} ${this.list[this.orderIndex].userTel} ${this.list[this.orderIndex].userAddress}`;
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
          id: 1,
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
