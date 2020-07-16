<template>
  <el-dialog title="商家详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商家名称">
          <el-input :value="temp.businessName" :disabled="false" />
        </el-form-item>
        <el-form-item label="商家电话">
          <el-input :value="temp.businessTel" :disabled="false" />
        </el-form-item>
        <el-form-item label="身份证照正面">
          <el-image :src="temp.IDcardMain">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="身份证照反面">
          <el-image :src="temp.IDcardSide">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="身份证照正面">
          <el-image :src="temp.license">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input :value="temp.passWord" :disabled="false" />
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input :value="temp.bankNo" :disabled="false" />
        </el-form-item>
        <el-form-item label="银行卡所有人名称">
          <el-input :value="temp.bankUserName" :disabled="false" />
        </el-form-item>
        <el-form-item label="商家钱包">
          <el-input :value="temp.shopMoney" :disabled="false" />
        </el-form-item>
        <el-form-item label="冻结金额">
          <el-input :value="temp.lockMoney" :disabled="false" />
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input :value="temp.rechargeMoney" :disabled="false" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handleCloseDialog">
        关闭
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
        isDialog: false,
        temp: {
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
      }
    }
  }
</script>

<style>
</style>
