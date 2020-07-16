<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userName" placeholder="昵称" style="width: 200px;" class="filter-item"/>
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
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值单号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值总金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sumMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠送金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.giveMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderState == 1 ? '支付成功' : '支付失败'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete()">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    name: 'ComplexTable',
    components: {
      Pagination
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          userName: '',
          startTime: '',
          endTime:''
        },
      }
    },
    created() {
      this.getList();
    },
    methods: {
      handleOper(index,status){
        console.log(index);
        this.list[index].status = status;
        this.$notify({
          title: '操作成功',
          message: '修改状态成功',
          type: 'success',
          duration: 2000
        })
      },
      handleFilter(){

      },
      getList() {
        this.listLoading = true
        var obj = {
          id:1,
          userId: 1,
          orderNum:'24567890',
          sumMoney: 100,
          totalMoney: 80,
          giveMoney:20,
          orderState: 1,
          createTime: '2020-07-30 12:23:34'
        }
        var list = [];
        obj = JSON.stringify(obj);

        for(var i = 0;i < 10;i++){
          list.push(JSON.parse(obj));
        }
        var that = this;
        setTimeout(function(){
          that.list = list
          that.total = 100;
          that.listLoading = false;
        },1000)

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
