<template>
  <el-dialog title="编辑套餐商品" width="40%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 200px;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="所属套餐" prop="mealID">
          <el-select v-model="temp.mealID" filterable placeholder="请选择">
            <el-option v-for="item in mealList" :key="item.id" :label="item.mealName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐商品" prop="goodsID">
          <el-select v-model="temp.goodsID" filterable placeholder="请选择">
            <el-option v-for="item in goodsList" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-radio-group v-model="temp.mealType">
            <el-radio :label="1">商品套餐</el-radio>
            <el-radio :label="0">企业套餐</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
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
        mealList: [{
            id: 1,
            mealName: '超级大套餐'
          },
          {
            id: 2,
            mealName: '大套餐'
          },
          {
            id: 3,
            mealName: '套餐'
          }
        ],
        goodsList:[
          {
            goodsId: 1,
            goodsName: '牛肉丸'
          },
          {
            goodsId: 2,
            goodsName: '生菜'
          }
        ],
        rules: {
          mealID: [{
            required: true,
            message: '请选择套餐',
            trigger: 'blur'
          }],
          goodsID: [{
            required: true,
            message: '请选择商品',
            trigger: 'blur'
          }]
        },
        temp: {
          mealID: '',
          goodsID: '',
          mealType: 0,
        }
      }
    },
    watch: {
      dialogFormVisible: function(data) {
        console.log(data);
        this.isDialog = data;
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
          mealID: '',
          goodsID: '',
          mealType: 0,
        }
      }
    }
  }
</script>

<style>
</style>
