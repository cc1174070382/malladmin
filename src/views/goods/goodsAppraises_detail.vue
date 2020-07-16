<template>
  <el-dialog title="评论详情" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="120px" style=" margin-left:50px;">
        <el-form-item label="订单编号">
          <el-input class="form-inp-w" :value="temp.orderId" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input class="form-inp-w" :value="temp.goodsId" />
        </el-form-item>
        <el-form-item label="用户">
          <el-input class="form-inp-w" :value="temp.userId" />
        </el-form-item>
        <el-form-item label="商品店铺">
          <el-input class="form-inp-w" :value="temp.storeId" />
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input class="form-inp-w" type="textarea" :value="temp.goodsSpecId"></el-input class="form-inp-w">
        </el-form-item>
        <el-form-item label="服务评价">
          <el-input class="form-inp-w" v-if="temp.commenType == 1" value="好评" />
          <el-input class="form-inp-w" v-else-if="temp.commenType == 2" value="差评" />
          <el-input class="form-inp-w" v-else value="中评" />
        </el-form-item>
        <el-form-item label="服务评分">
          <el-input class="form-inp-w" :value="temp.serviceScore" />
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input class="form-inp-w" type="textarea" :value="temp.content"></el-input class="form-inp-w">
        </el-form-item>
        <el-form-item label="评论图片">
          <el-image :src="temp.images">
              <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
              </div>
          </el-image>
        </el-form-item>
        <el-form-item label="评论时间">
          <el-input class="form-inp-w" :value="temp.createTime" />
        </el-form-item>
        <el-form-item label="商家回复时间">
          <el-input class="form-inp-w" :value="temp.replyTime" />
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-radio-group v-model="temp.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商家回复">
          <el-input class="form-inp-w" type="textarea" :value="temp.shopReply"></el-input class="form-inp-w">
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handleCloseDialog">
        {{ $t('table.confirm') }}
      </el-button>
      <el-button type="primary" @click="handleCloseDialog">
        回复
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
          goodsId: 1,
          storeId: 1,
          orderId: 1,
          goodsSpecId: 1,
          userId: 1,
          commenType: 1,
          serviceScore: 10,
          content: '不太好',
          shopReply: '你怕是看错咯',
          goodsImg: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          images: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
          isShow: 1,
          replyTime: '2020-07-08 12:34:12',
          createTime: '2020-07-08 12:34:12'
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
