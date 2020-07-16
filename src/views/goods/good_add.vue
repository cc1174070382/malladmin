<template>
  <el-dialog title="编辑广告" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="temp.goodsName" />
        </el-form-item>
        <el-form-item label="商品原价" prop="goodsPrice">
          <el-input v-model.number="temp.goodsPrice" />
        </el-form-item>
        <el-form-item label="会员价" prop="goodsVipPrice">
          <el-input v-model.number="temp.goodsVipPrice" />
        </el-form-item>
        <el-form-item label="商品售价" prop="goodsSellPrice">
          <el-input v-model.number="temp.goodsSellPrice" />
        </el-form-item>
        <el-form-item label="广告图片" prop="adEndTime">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upPreview">
            <img v-if="temp.goodsImg" :src="temp.goodsImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input type="textarea" v-model="temp.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item label="是否秒杀">
          <el-radio-group v-model="temp.isSeckill">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-radio-group v-model="temp.isSale">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-radio-group v-model="temp.isSale">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否精品">
          <el-radio-group v-model="temp.isBest">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热销">
          <el-radio-group v-model="temp.isHot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="temp.isNew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio-group v-model="temp.isRecom">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-radio-group v-model="temp.isFreeShipping">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否分销">
          <el-radio-group v-model="temp.isDistribut">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分销佣金" >
          <el-input v-model="temp.commission" />
        </el-form-item>
        <el-form-item label="是否有规格">
          <el-radio-group v-model="temp.isSpec">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">没有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-radio-group v-model="temp.goodsType">
            <el-radio :label="1">虚拟商品</el-radio>
            <el-radio :label="0">实物商品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示类型">
          <el-radio-group v-model="temp.showType">
            <el-radio label="1">平台</el-radio>
            <el-radio :label="2">线下</el-radio>
            <el-radio :label="3">平台和线下</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-radio-group v-model="temp.goodsStatus">
            <el-radio :label="-1">违规</el-radio>
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">已审核</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="总销售量" prop="saleNum">
          <el-input v-model="temp.saleNum" />
        </el-form-item>
        <el-form-item label="上架时间" prop="saleTime">
          <el-date-picker v-model="temp.saleTime" type="datetime" placeholder="请选择广告开始时间" />
        </el-form-item>
        <el-form-item label="访问数" prop="visitNum">
          <el-input v-model="temp.visitNum" />
        </el-form-item>
        <el-form-item label="评价数" prop="appraiseNum">
          <el-input v-model="temp.appraiseNum" />
        </el-form-item>
        <el-form-item label="计价方式">
          <el-radio-group v-model="temp.shippingFeeType">
            <el-radio :label="1">计件</el-radio>
            <el-radio :label="2">重量</el-radio>
            <el-radio :label="3">体积</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品重量" >
          <el-input v-model.number="temp.goodsWeight" />
        </el-form-item>
        <el-form-item label="商品体积" >
          <el-input v-model.number="temp.goodsVolume" />
        </el-form-item>
        <el-form-item label="配送方式">
          <el-radio-group v-model="temp.deliverType">
            <el-radio :label="0">骑手配送</el-radio>
            <el-radio :label="1">物流配送</el-radio>
            <el-radio :label="2">上架自配</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品SEO关键字">
          <el-input type="textarea" v-model="temp.goodsSeoKeywords"></el-input>
        </el-form-item>
        <el-form-item label="状态说明">
          <el-input type="textarea" v-model="temp.illegalRemarks"></el-input>
        </el-form-item>
        <el-form-item label="商品排序">
          <el-input v-model.number="temp.goodsSort" />
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
          goodsDesc: [{
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }],
          goodsName: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          goodsImg: [{
            required: true,
            message: '请上传广告图片',
            trigger: 'blur'
          }],
          goodsPrice: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          goodsVipPrice: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          goodsSellPrice: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          goodsWeight: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }],
          goodsVolume: [{
            type: 'number',
            min: 0,
            message: '请输入数字',
            trigger: 'blur'
          }]
        },
        temp: {
          goodsName: '',
          goodsDesc: '',
          goodsCategoryId: '',
          storeId: 1,
          goodsImg: '',
          isSeckill: 1,
          isSale: 1,
          isBest: 1,
          isHot: 1,
          isNew: 1,
          isRecom: 1,
          showType: 1,
          goodsCatIdPath: '',
          goodsCatId:1,
          goodsStatus: 1,
          saleNum:1,
          goodsContents: '',
          visitNum:0,
          appraiseNum:0,
          isSpec:0,
          goodsSeoKeywords:'',
          illegalRemarks:'',
          goodPrint:'',
          goodsType:0,
          isDistribut:0,
          commission:0,
          isFreeShipping:0,
          goodsSerachKeywords:'',
          shippingFeeType:1,
          goodsWeight:0,
          goodsVolume:0,
          deliverType:0,
          goodsPrice:'',
          goodsVipPrice:'',
          goodsSellPrice:'',
          goodsSort:0,
          saleTime: new Date()
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
          this.temp.goodsImg = URL.createObjectURL(file.raw);
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
          goodsImg: ''
        }
      }
    }
  }
</script>

<style>
</style>
