<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.positionType" class="filter-item" placeholder="请选择广告源类型">
        <el-option v-for="(item,index) in positionTypeList" :label="item" :value="index + 1" />
      </el-select>
      <el-date-picker v-model="listQuery.adStartTime" type="datetime" class="filter-item" placeholder="请选择广告开始时间" />
      <el-date-picker v-model="listQuery.adStartTime" type="datetime" class="filter-item" placeholder="请选择广告结束时间" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="副标题" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告图片" align="center">
        <template slot-scope="{row}">
          <el-image :src="row.adFile">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adStartTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点击量" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adClickNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告类型" width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ positionTypeList[row.positionType - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告排序" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adSort }}</span>
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
  import add from './add.vue'

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
        positionTypeList:['电脑端','微信端','手机端','app端','小程序端'],
        listQuery: {
          page: 1,
          adName: '',
          adStartTime: '',
          adEndTime:'',
          positionType:'1'
        },
        dialogFormVisible: false
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
          adName: '广告标题1',
          adURL: '',
          adStartTime: '2020-07-08 12:23:34',
          adEndTime: '2020-07-30 12:23:34',
          createTime:'2020-07-08 12:23:34',
          adSort: '0',
          positionType: 1,
          adClickNum:35,
          subTitle: '副标题',
          adFile: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          adPositionId:1,
        }
        var list = []
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
