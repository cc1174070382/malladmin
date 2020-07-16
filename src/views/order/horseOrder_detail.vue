<template>
  <el-dialog title="骑手订单详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
        <el-form-item label="订单编号">
          <el-input class="form-inp-w" :value="temp.horseOrderNo" />
        </el-form-item>
        <el-form-item label="骑手">
          <el-input class="form-inp-w" :value="temp.horseId" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input class="form-inp-w" v-if="temp.orderState == 1" value="待抢单" />
          <el-input class="form-inp-w" v-else-if="temp.orderState == 2" value="待取货" />
          <el-input class="form-inp-w" v-else-if="temp.orderState == 3" value="配送中" />
          <el-input class="form-inp-w" v-else value="已完成" />
        </el-form-item>
        <el-form-item label="佣金">
          <el-input class="form-inp-w" :value="temp.brokerage" />
        </el-form-item>
        <el-form-item label="店铺">
          <el-input class="form-inp-w" :value="temp.storeId" />
        </el-form-item>
        <el-form-item label="收货人">
          <el-input class="form-inp-w" :value="temp.userName" />
        </el-form-item>
        <el-form-item label="收货电话">
          <el-input class="form-inp-w" :value="temp.userTel" />
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input class="form-inp-w" :value="temp.userAddress" />
          <el-button type="primary" @click="handleClipboard($event)">复制收货信息</el-button>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-input class="form-inp-w" :value="temp.endTime" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input class="form-inp-w" :value="temp.createTime" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
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
          horseOrderNo: '100567673',
          orderId: 1,
          horseId: 1,
          orderState: 1,
          userAddress: '贵州省贵阳市南明区花果园',
          userName: '张三',
          userTel: '18209787665',
          brokerage: 6,
          storeId: 1,
          endTime: '2020-07-08 12:34:12',
          createTime: '2020-07-08 12:34:12'
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
