<template>
  <el-dialog title="编辑套餐" width="40%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 200px;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="套餐名称" prop="mealName">
          <el-input v-model="temp.mealName" />
        </el-form-item>
        <el-form-item label="套餐价格" prop="mealPrice">
          <el-input v-model.number="temp.mealPrice" />
        </el-form-item>
        </el-form-item>
        <el-form-item label="分类排序" prop="mealSort">
          <el-input v-model.number="temp.mealSort" />
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
        rules: {
          categoryName: [{
            required: true,
            message: '请输入套餐名称',
            trigger: 'blur'
          }],
          mealPrice: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          mealSort: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }]
        },
        temp: {
          mealName: '',
          mealPrice:'',
          mealSort: 0
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
          mealName: '',
          mealPrice:'',
          mealSort: 0
        }
      }
    }
  }
</script>

<style>
</style>
