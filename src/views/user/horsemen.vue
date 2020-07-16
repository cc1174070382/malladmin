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
      <el-table-column label="骑手姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.horseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="骑手电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.horseTel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可提现金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未入账佣金" align="center">
        <template slot-scope="{row}">
          <span>{{ row.afterAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属区域" align="center">
        <template slot-scope="{row}">
          <span>{{ row.areasId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否上班" align="center">
        <template slot-scope="{row}">
          <span v-if="row.isWork == 0">上班</span>
          <span v-else>休息</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.isFalse == 0">正常</span>
          <span v-else>冻结</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.horseStates == 0">未通过</span>
          <span v-else-if="row.horseStates == 1">待审核</span>
          <span v-else>已通过</span>
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
          <el-tooltip v-if="row.isFalse == 0" class="item" effect="dark" content="冻结账号" placement="top">
            <i class="el-icon-s-help" @click="handleOper(1,$index)"></i>
          </el-tooltip>
          <el-tooltip v-else class="item" effect="dark" content="恢复账号" placement="top">
            <i class="el-icon-help" @click="handleOper(0,$index)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import add from './horsemen_detail.vue'

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
        dialogFormVisible: false,
        orderIndex: 0,
        listQuery: {
          page: 1,
          startTime:new Date(),
          endTime:new Date()
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      handleOper(isFalse,index){
        var tips = isFalse == 1 ? '冻结' : '恢复';
        this.$confirm(`此操作将${tips}此骑手账号, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list[index].isFalse = isFalse;
          this.$notify({
            title: '提示',
            message: `${tips}成功`,
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
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
          horseName: '李四',
          horseTel: '18298675674',
          userName: '18298675674',
          passWord: '123456',
          totalAmount: 58,
          areasId: 1,
          afterAmount: 20,
          isWork: 0,
          isFalse: 0,
          horseStates: 0,
          idCardmain: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          idCardside: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          createTime: '2020-07-08 12:34:12'
        }
        var list = []
        obj = JSON.stringify(obj);

        for(var i = 0;i < 10;i++){
          list.push(JSON.parse(obj));
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
