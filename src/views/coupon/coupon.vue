<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券名称" width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属门店" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_type_id == 0 ? '平台' : '商家' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_counts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_go_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_stop_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用条件" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_term }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠金额" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余数量" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_residue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coup_create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleCreate(row)">
            {{ $t('table.edit') }}
          </el-button>
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
  import add from './coupon_add.vue'

  export default {
    components: {
      Pagination,
      add
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1
        }, 
        dialogFormVisible: false
      }
    },
    created() {
      this.getList();
    },
    methods: {
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
          coup_name: '重庆老火锅优惠券',
          coup_type_id: 0,
          coup_counts: 100,
          coup_create_time: '2020-07-08 12:45:23',
          coup_stop_time: '2020-07-28 12:45:23',
          coup_go_time: '2020-07-08 12:45:23',
          coup_term: 20,
          coup_money: 10,
          coup_residue: 100
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
