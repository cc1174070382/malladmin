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
          <span>{{ row.horseOrderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="骑手" align="center">
        <template slot-scope="{row}">
          <span>{{ row.horseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.orderState == 1">待抢单</span>
          <span v-else-if="row.orderState == 2">待取货</span>
          <span v-else-if="row.orderState == 3">配送中</span>
          <span v-else>已完成</span>
        </template>
      </el-table-column>
      <el-table-column label="订单佣金" align="center">
        <template slot-scope="{row}">
          <span>{{ row.brokerage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺" align="center">
        <template slot-scope="{row}">
          <span>{{ row.storeId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
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
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import add from './horseOrder_detail.vue'
  import clipboard from '@/utils/clipboard'

  export default {
    name: 'horseOrder',
    components: {
      Pagination,
      add
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        dialogVisible: false,
        dialogFormVisible: false,
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
      handleClipboard(event) {
        var text =
          `${this.list[this.orderIndex].userName} ${this.list[this.orderIndex].userTel} ${this.list[this.orderIndex].userAddress}`;
        clipboard(text, event);
        this.dialogVisible = false;
      },
      handleShowReceiving(index) {
        this.orderIndex = index;
        this.dialogVisible = true;
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
          horseOrderNo: '100567673',
          orderId: 1,
          horseId: 1,
          orderState: 1,
          userAddress: '贵州省贵阳市南明区花果园',
          userName: '张三',
          userTel: '18209787665',
          brokerage: 6,
          storeId: 1,
          endTime: '2020-07-08 12:34:12',
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
