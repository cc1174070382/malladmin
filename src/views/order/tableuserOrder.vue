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
      <el-table-column label="下单用户" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品" align="center">
        <template slot-scope="{row}">
          <span>{{ row.goosId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.payState == 1">已支付</span>
          <span v-else>未支付</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template slot-scope="{row}">
          <span v-if="row.payType == 1">微信支付</span>
          <span v-else-if="row.payType == 2">线下支付</span>
          <span v-else>余额支付</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" width="180" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">
            <i class="el-icon-view" @click="handleCreate(row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看收货信息" placement="top">
            <i @click="handleShowReceiving($index)" class="el-icon-folder-checked" style="margin-left: 10px;"></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import clipboard from '@/utils/clipboard'

  export default {
    name: 'horseOrder',
    components: {
      Pagination
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
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
      handleFilter() {

      },
      getList() {
        this.listLoading = true
        var obj = {
          id: 1,
          userId: 1,
          goosId: 1,
          orderMoney: 100,
          payState: 1,
          payType: 1,
          payTime: '2020-07-08 12:34:12'
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
