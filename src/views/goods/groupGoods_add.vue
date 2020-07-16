<template>
  <el-dialog title="编辑分类" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="选择商品" prop="goodsId">
          <el-select v-model="temp.goodsId" filterable class="filter-item" placeholder="请选择商品">
            <el-option label="大白菜" :value="1" />
            <el-option label="芋头" :value="2" />
            <el-option label="洋芋" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="原价" prop="price">
          <el-input v-model.number="temp.price" />
        </el-form-item>
        <el-form-item label="拼团价" prop="showPrice">
          <el-input v-model.number="temp.showPrice" />
        </el-form-item>
        <el-form-item label="限购数量" prop="limitNum">
          <el-input v-model.number="temp.limitNum" />
        </el-form-item>
        <el-form-item label="限购次数" prop="tries">
          <el-input v-model.number="temp.tries" />
        </el-form-item>
        <el-form-item label="持续分钟" prop="duration">
          <el-input v-model.number="temp.duration" />
        </el-form-item>
        <el-form-item label="首页显示">
          <el-radio-group v-model="temp.isindex">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-radio-group v-model="temp.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker v-model="temp.endTime" type="datetime" placeholder="请选择截止时间" />
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
          <el-input v-model.number="temp.sorts" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog">
        {{ $t('table.cancel') }}
      </el-button>
      <el-button type="primary" @click="submit()">
        {{ $t('table.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogFormVisible: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data() {
      return {
        isToplevel: '1',
        isDialog: false,
        data: [{
            id: 1,
            label: '蔬菜',
            children: [{
              id: 2,
              label: '白菜',
            },
            {
              id: 3,
              label: '玉米',
            },
            {
              id: 4,
              label: '花菜',
            }]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {
          limitNum: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          price: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          showPrice: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          sorts: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          duration: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          tries: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }]
        },
        temp: {
          goodsId: 1,
          limitNum: '',
          price: '',
          showPrice: '',
          sorts: 0,
          status: 1,
          duration: '',
          tries: '',
          isindex: 1,
          endTime: new Date(),
        }
      }
    },
    watch: {
      dialogFormVisible: function(data) {
        console.log(data);
        this.isDialog = data;
        var that = this;
        setTimeout(function() {
          //设置选中分类
          that.$refs.tree.setCurrentKey(4);
        }, 100)
      }
    },
    created() {

    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleCloseDialog() {
        this.isDialog = false;
        console.log("关闭");
        this.$emit('operOialog', {
          isClose: true
        });
      },
      upPreview(file, fileList) {
        var fileName = file.name;
        var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.temp.catImg = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      submit() {

        console.log("提交", this.temp);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isDialog = false;
            this.resetTemp();
            this.$emit('operOialog', {
              isClose: false
            });
          }
        });
      },
      resetTemp() {
        this.temp = {
          categoryName: '',
          categoryPid: '',
          categorySort: 0,
          isShow: '1',
          catImg: '',
          seoTitle: '',
          seoKeywords: '',
          seoDes: ''
        }
      }
    }
  }
</script>

<style>
</style>
