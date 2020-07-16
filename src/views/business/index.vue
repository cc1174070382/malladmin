<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.businessName" placeholder="商家名称" style="width: 200px;" class="filter-item" />
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
      <el-table-column label="商家名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.businessName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.businessTel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业执照" align="center">
        <template slot-scope="{row}">
          <el-image :src="row.license">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="登录密码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.passWord }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家钱包" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shopMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="冻结金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lockMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rechargeMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" style="width: 80px;" @click="handleCreate(row)">
            查看详情
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete()">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination';
  import add from './business_add.vue'

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
        dialogFormVisible: false,
        listLoading: true,
        listQuery: {
          page: 1,
          businessName: ''
        },
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
      handleCreate() {
        this.dialogFormVisible = true
      },
      handleFilter() {

      },
      getList() {
        this.listLoading = true
        var obj = {
          id: 1,
          businessName: '重庆百年老火锅',
          businessTel: 18296875634,
          IDcardMain: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          IDcardSide: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          license: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          passWord: '123456',
          bankNo: '622736576453645364612',
          bankUserName: '张三',
          shopMoney: 6700,
          lockMoney: 6700,
          rechargeMoney: 2345,
        }
        var list = [];
        obj = JSON.stringify(obj);

        for (var i = 0; i < 10; i++) {
          list.push(JSON.parse(obj));
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
