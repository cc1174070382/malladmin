<template>
  <el-dialog title="编辑分类" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="temp.categoryName" />
        </el-form-item>
        <el-form-item label="是否位顶级分类">
          <el-radio-group v-model="isToplevel">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="isToplevel == '1'" label="所属上级分类">
          <el-tree ref="tree" node-key="id" :default-expand-all="true" :highlight-current="true" :data="data" :props="defaultProps"
            @node-click="handleNodeClick"></el-tree>
        </el-form-item>
        <el-form-item label="分类图片" prop="catImg">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :show-file-list="false" :on-change="upPreview">
            <img v-if="temp.catImg" :src="temp.catImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="temp.isShow">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类排序" prop="categorySort">
          <el-input v-model="temp.categorySort" />
        </el-form-item>
        <el-form-item label="分类SEO标题">
          <el-input v-model="temp.seoTitle" />
        </el-form-item>
        <el-form-item label="分类SEO关键字">
          <el-input type="textarea" v-model="temp.seoKeywords"></el-input>
        </el-form-item>
        <el-form-item label="分类SEO描述">
          <el-input type="textarea" v-model="temp.seoDes"></el-input>
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
        data: [{
            id: 1,
            label: '蔬菜',
            children: [{
              id: 2,
              label: '白菜',
            },
            {
              id: 3,
              label: '玉米',
            },
            {
              id: 4,
              label: '花菜',
            }]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {
          categoryName: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }],
          catImg: [{
            required: true,
            message: '请上传分类图片',
            trigger: 'blur'
          }],
          categorySort: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }]
        },
        temp: {
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
</style>
