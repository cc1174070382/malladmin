<template>
  <el-dialog title="编辑导航" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="导航位置">
          <el-radio-group v-model="temp.location">
            <el-radio :label="1">顶部</el-radio>
            <el-radio :label="2">底部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跳转参数" prop="param">
          <el-input v-model="temp.param" />
        </el-form-item>
        <el-form-item label="跳转类型" prop="urlType">
          <el-input v-model="temp.urlType" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="temp.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="temp.sort" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upIcon">
            <img v-if="temp.icon" :src="temp.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="选中图标" prop="selectIcon">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upSelectIcon">
            <img v-if="temp.selectIcon" :src="temp.selectIcon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="主题图片" prop="img">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upImg">
            <img v-if="temp.img" :src="temp.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="主题描述" prop="keyWord">
          <el-input type="textarea" v-model="temp.description"></el-input>
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
        rules: {
          icon: [{
            required: true,
            message: '请上传导航图标',
            trigger: 'blur'
          }],
          selectIcon: [{
            required: true,
            message: '请上传导航选中图标',
            trigger: 'blur'
          }],
          param: [{
            required: true,
            message: '请输入跳转参数',
            trigger: 'blur'
          }],
          urlType: [{
            required: true,
            message: '请输入跳转类型',
            trigger: 'blur'
          }],
          img: [{
            required: true,
            message: '请上传主题图片',
            trigger: 'blur'
          }],
          sort: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }]
        },
        temp: {
          location: 1,
          icon:'',
          selectIcon:'',
          description: '',
          param:'',
          urlType:'',
          isShow:1,
          img: '',
          sort: 0
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
      upIcon(file, fileList){
        this.upPreview(file, fileList,1);
      },
      upSelectIcon(file, fileList){
        this.upPreview(file, fileList,2);
      },
      upImg(file, fileList){
        this.upPreview(file, fileList,3);
      },
      upPreview(file, fileList,type) {
        var fileName = file.name;
        var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          var path = URL.createObjectURL(file.raw)
          if(type == 1){
            this.temp.icon = path;
          }
          else if(type == 2){
            this.temp.selectIcon = path;
          }
          else{
            this.temp.img = path;
          }

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
          location: 1,
          icon:'',
          selectIcon:'',
          description: '',
          param:'',
          urlType:'',
          isShow:1,
          img: '',
          sort: 0
        }
      }
    }
  }
</script>

<style>
</style>
