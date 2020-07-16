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
      <el-table-column label="广告类型" width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ positionTypeList[row.positionType - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告位置名称" align="center">
        <template slot-scope="{row}">
          <span>{{ positionNameList[row.positionName - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议宽度" align="center">
        <template slot-scope="{row}">
          <span>{{ row.positionWidth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议高度" align="center">
        <template slot-scope="{row}">
          <span>{{ row.positionHeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apSort }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
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
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination'
  import add from './advertPositions_add.vue'

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
        positionTypeList: ['电脑端', '微信端', '手机端', 'app端', '小程序端'],
        positionNameList: ['顶部', '中部', '底部'],
        listQuery: {
          page: 1,
          adName: '',
          adStartTime: '',
          adEndTime: '',
          positionType: ''
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
          positionType: 1,
          positionName: 1,
          positionWidth: 800,
          positionHeight: 300,
          apSort: 1
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
