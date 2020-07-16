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
      <el-table-column label="会员名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vipName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开卡金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员图标" align="center">
        <template slot-scope="{row}">
          <el-image :src="row.vipLogin">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="优惠折扣" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberRebate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="晋升条件" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberPromote == 0 ? '充值余额晋升' : '续费晋升' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成长值" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.keyWord}}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务天数" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serverDays }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成长等级比例" align="center">
        <template slot-scope="{row}">
          <span>{{ row.proportion }}</span>
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
          page:1
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
          vipName: '超级会员',
          money:100,
          memberRebate:9,
          memberPromote: 0,
          keyWord:100,
          vipLogin: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          serverDays: 30,
          proportion:''
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
