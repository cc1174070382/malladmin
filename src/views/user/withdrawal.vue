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
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现总金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际到账金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.successAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现状态" align="center">
        <template slot-scope="{row}">
          <span>{{ statusList[row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个人所得税" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现类型" align="center">
        <template slot-scope="{row}">
          <span>{{ typeList[row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.amount_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <template v-if="row.status == 0">
            <el-button type="primary" size="mini" @click="handleOper($index,1)">
              待打款
            </el-button>
            <el-button type="primary" size="mini" @click="handleOper($index,2)">
              已提现
            </el-button>
            <el-button type="primary" size="mini" @click="handleOper($index,3)">
              拒绝
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete()">
              {{ $t('table.delete') }}
            </el-button>
          </template>
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
        statusList:['待审核','待打款','已提现','已拒绝'],
        typeList:['微信','余额','银行卡'],
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
          totalMoney: 56,
          userName:'呵呵',
          status: 0,
          type: 0,
          amount_time: '2020-07-30 12:23:34',
          successAmount:0,
          tax: 0
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
