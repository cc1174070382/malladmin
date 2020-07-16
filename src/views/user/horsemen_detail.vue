<template>
  <el-dialog title="骑手详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
        <el-form-item label="骑手姓名">
          <el-input class="form-inp-w" :value="temp.horseName" />
        </el-form-item>
        <el-form-item label="骑手电话">
          <el-input class="form-inp-w" :value="temp.horseTel" />
        </el-form-item>
        <el-form-item label="骑手账号">
          <el-input class="form-inp-w" :value="temp.userName" />
        </el-form-item>
        <el-form-item label="可提现金额">
          <el-input class="form-inp-w" :value="temp.totalAmount" />
        </el-form-item>
        <el-form-item label="未入账佣金">
          <el-input class="form-inp-w" :value="temp.afterAmount" />
        </el-form-item>
        <el-form-item label="所属区域">
          <el-input class="form-inp-w" :value="temp.areasId" />
        </el-form-item>
        <el-form-item label="是否上班">
          <el-input class="form-inp-w" v-if="temp.isWork == 1" value="上班" />
          <el-input class="form-inp-w" v-else value="休息" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-input class="form-inp-w" v-if="temp.isFalse == 1" value="正常" />
          <el-input class="form-inp-w" v-else value="冻结" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-input class="form-inp-w" v-if="temp.horseStates == 0" value="未通过" />
          <el-input class="form-inp-w" v-else-if="temp.horseStates == 1" value="待审核" />
          <el-input class="form-inp-w" v-else value="已通过" />
        </el-form-item>
        <el-form-item label="身份证正面">
          <el-image :src="temp.idCardmain">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="身份证反面">
          <el-image :src="temp.idCardside">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input class="form-inp-w" :value="temp.createTime" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handleCloseDialog">
        审核未通过
      </el-button>
      <el-button type="primary" @click="handleCloseDialog">
        审核通过
      </el-button>
      <el-button type="primary" @click="handleCloseDialog">
        {{ $t('table.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import clipboard from '@/utils/clipboard'
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
        temp: {
          id: 1,
          horseName: '李四',
          horseTel: '18298675674',
          userName: '18298675674',
          passWord: '123456',
          totalAmount: 58,
          areasId: 1,
          afterAmount: 20,
          isWork: 0,
          isFalse: 0,
          horseStates: 0,
          idCardmain: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          idCardside: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          createTime: '2020-07-08 12:34:12'
        }
      }
    },
    watch: {
      dialogFormVisible: function(data) {
        console.log(data);
        this.isDialog = data;
        var that = this;
      }
    },
    created() {

    },
    methods: {
      handleClipboard(event) {
        var text = `${this.temp.userName} ${this.temp.userTel} ${this.temp.userAddress}`;
        clipboard(text, event);
      },
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
  .form-inp-w{
    width: 200px;
  }
</style>
