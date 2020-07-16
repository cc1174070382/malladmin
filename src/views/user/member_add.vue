<template>
  <el-dialog title="编辑会员" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="会员名称" prop="vipName">
          <el-input v-model="temp.vipName" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model.number="temp.money" />
        </el-form-item>
        <el-form-item label="优惠折扣" prop="memberRebate">
          <el-input v-model.number="temp.memberRebate" />
        </el-form-item>
        <el-form-item label="晋升条件">
          <el-radio-group v-model="temp.memberPromote">
            <el-radio :label="1">续费晋升</el-radio>
            <el-radio :label="0">充值余额晋升</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="成长值" prop="keyWord">
          <el-input v-model="temp.keyWord" />
        </el-form-item>
        <el-form-item label="服务天数" prop="serverDays">
          <el-input v-model.number="temp.serverDays" />
        </el-form-item>
        <el-form-item label="成长等级比例">
          <el-input v-model="temp.proportion" />
        </el-form-item>
        <el-form-item label="会员图标" prop="vipLogin">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upPreview">
            <img v-if="temp.vipLogin" :src="temp.vipLogin" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
          vipName: [{
            required: true,
            message: '请输入会员名称',
            trigger: 'blur'
          }],
          keyWord: [{
            required: true,
            message: '请输入成长值',
            trigger: 'blur'
          }],
          vipLogin: [{
            required: true,
            message: '请上传会员图标',
            trigger: 'blur'
          }],
          serverDays: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }],
          money: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }],
          memberRebate: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }]
        },
        temp: {
          vipName: '',
          money:'',
          memberRebate:'',
          memberPromote: 0,
          keyWord:'',
          vipLogin: '',
          serverDays: '',
          proportion:''
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
          this.temp.vipLogin = URL.createObjectURL(file.raw);
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
          vipLogin: '',
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
