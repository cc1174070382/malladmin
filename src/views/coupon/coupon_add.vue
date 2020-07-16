<template>
  <el-dialog title="编辑广告" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
    <div style="height: 60vh;overflow-y: auto;">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="优惠券名称" prop="coup_name">
          <el-input v-model="temp.coup_name" />
        </el-form-item>
        <el-form-item label="优惠券数量" prop="coup_counts">
          <el-input v-model.number="temp.coup_counts" />
        </el-form-item>
        <el-form-item label="使用条件" prop="coup_term">
          <el-input v-model.number="temp.coup_term" placeholder="满多少可使用个"/>
        </el-form-item>
        <el-form-item label="优惠金额" prop="coup_money">
          <el-input v-model.number="temp.coup_money" />
        </el-form-item>
        <el-form-item label="剩余数量" prop="coup_residue">
          <el-input v-model.number="temp.coup_residue" />
        </el-form-item>
        <el-form-item label="发布时间" prop="coup_go_time">
          <el-date-picker placeholder="选择时间" type="datetime" v-model="temp.coup_go_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="coup_stop_time">
          <el-date-picker placeholder="选择时间" type="datetime" v-model="temp.coup_stop_time" style="width: 100%;"></el-date-picker>
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
          coup_name: [{
            required: true,
            message: '请输入优惠券名称',
            trigger: 'blur'
          }],
          coup_stop_time: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          coup_go_time: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          coup_counts: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }],
          coup_term: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }],
          coup_money: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }],
          coup_residue: [{
            type: 'number',
            min: 0,
            message: '请输入整数',
            trigger: 'blur'
          }]
        },
        temp: {
          coup_name: '',
          coup_type_id: 0,
          coup_counts: '',
          coup_stop_time: new Date(),
          coup_go_time: new Date(),
          coup_term: '',
          coup_money: '',
          coup_residue: ''
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
          coup_name: '',
          coup_type_id: 0,
          coup_counts: '',
          coup_create_time: new Date(),
          coup_stop_time: new Date(),
          coup_go_time: new Date(),
          coup_term: '',
          coup_money: '',
          coup_residue: ''
        }
      }
    }
  }
</script>

<style>
</style>
