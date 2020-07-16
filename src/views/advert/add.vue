<template>
  <el-dialog title="编辑广告" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="广告名称" prop="adName">
          <el-input v-model="temp.adName" />
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
          <el-input v-model="temp.subTitle" />
        </el-form-item>
        <el-form-item label="广告网址" prop="adURL">
          <el-input v-model="temp.adURL" />
        </el-form-item>
        <el-form-item label="开始时间" prop="adStartTime">
          <el-date-picker v-model="temp.adStartTime" type="datetime" placeholder="请选择广告开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="adEndTime">
          <el-date-picker v-model="temp.adEndTime" type="datetime" placeholder="请选择广告结束时间" />
        </el-form-item>
        <el-form-item label="广告位" prop="adPositionId">
          <el-select v-model="temp.adPositionId" class="filter-item" placeholder="请选择广告位">
            <el-option label="广告位1" value="1" />
            <el-option label="广告位2" value="2" />
            <el-option label="广告位3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告源类型" prop="positionType">
          <el-select v-model="temp.positionType" class="filter-item" placeholder="请选择广告源类型">
            <el-option label="电脑端" value="1" />
            <el-option label="微信端" value="2" />
            <el-option label="手机端" value="3" />
            <el-option label="app端" value="4" />
            <el-option label="小程序端" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告图片" prop="adEndTime">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upPreview">
            <img v-if="temp.adFile" :src="temp.adFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告排序" prop="adSort">
          <el-input v-model="temp.adSort" />
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
        dialogStatus: 'create',
        isDialog: false,
        rules: {
          adPositionId: [{
            required: true,
            message: '请选择广告位',
            trigger: 'change'
          }],
          positionType: [{
            required: true,
            message: '请选择广告源类型',
            trigger: 'change'
          }],
          adStartTime: [{
            type: 'date',
            required: true,
            message: '请选择广告开始时间',
            trigger: 'change'
          }],
          adEndTime: [{
            type: 'date',
            required: true,
            message: '请选择广告结束时间',
            trigger: 'change'
          }],
          adName: [{
            required: true,
            message: '请输入广告名称',
            trigger: 'blur'
          }],
          adURL: [{
            required: true,
            message: '请输入广告网址',
            trigger: 'blur'
          }],
          subTitle: [{
            required: true,
            message: '请输入副标题',
            trigger: 'blur'
          }],
          adFile: [{
            required: true,
            message: '请上传广告图片',
            trigger: 'blur'
          }],
          adSort: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }]
        },
        temp: {
          adPositionId:'1',
          adName: '',
          adURL: '',
          adStartTime: new Date(),
          adEndTime: new Date(),
          adSort: 0,
          positionType: '1',
          subTitle: '',
          adFile: ''
        },
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
          this.temp.adFile = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      submit() {
        console.log("提交", this.temp);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isDialog = false;
            this.$emit('operOialog', {
              isClose: false
            });
          }
        });
      },
      resetTemp() {
        this.temp = {
          adName: '',
          adURL: '',
          adStartTime: new Date(),
          adEndTime: new Date(),
          adSort: 0,
          positionType: 1,
          subTitle: '',
          adFile: ''
        }
      }
    }
  }
</script>

<style>
</style>
