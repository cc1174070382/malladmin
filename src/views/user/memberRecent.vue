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
      <el-table-column label="流水号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serviceNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通用户" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通会员" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalmoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买次数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.buyCounts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderState == 0 ? '成功' : '失败' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete()">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import add from './member_add.vue'

  export default {
    name: 'ComplexTable',
    components: {
      Pagination,
      add
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        dialogFormVisible: false,
        listQuery:{
          page:1,
          startTime:new Date(),
          endTime:new Date()
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      operOialog(e){
        this.dialogFormVisible = false;
        if(e.isClose){

        }
        else{

        }
      },
      handleFilter(){

      },
      getList() {
        this.listLoading = true
        var obj = {
          id:1,
          orderNum: '123546',
          serviceNum:'890355',
          userId:9,
          memberId: 1,
          totalmoney:100,
          buyCounts: 1,
          prepayId: 1,
          orderState:0,
          createTime:'2020-08-09 13:22:24'
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
