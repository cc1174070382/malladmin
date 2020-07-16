<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.goodsName" placeholder="商品名称" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" sortable="custom" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.goodsId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原价" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拼团价" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.showPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="限购数量" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.limitNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已开团" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.groupNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sorts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status == 0 ? '隐藏' : '显示' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持续分钟" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="次数限制" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tries }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首先显示" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.isindex == 0 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.modifyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
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
  import add from './groupGoods_add.vue'

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
          goodsName:''
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
          goodsId: 1,
          limitNum: 1,
          price: 100,
          showPrice: 80,
          groupNum: 2,
          sorts: 0,
          status: 0,
          duration: 120,
          tries: 5,
          isindex: 1,
          endTime: '2020-07-30 12:34:12',
          modifyTime: '2020-07-09 12:34:12',
          createTime: '2020-07-08 12:34:12'
        }
        var list = []
        for(var i = 0;i < 10;i++){
          list.push(obj);
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
