<template>
    <el-dialog title="编辑秒杀商品" width="80%" top="10vh" :before-close="handleCloseDialog" :visible.sync="isDialog">
        <div style="height: 60vh;overflow-y: auto;">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
                <el-form-item label="选择商品" prop="goodsId">
                    <el-select v-model="temp.goodsId" filterable class="filter-item" placeholder="请选择商品">
                        <el-option label="大白菜" :value="1" />
                        <el-option label="芋头" :value="2" />
                        <el-option label="洋芋" :value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="抢购数量" prop="seckillNum">
                    <el-input v-model.number="temp.seckillNum" />
                </el-form-item>
                <el-form-item label="是否秒杀设置">
                    <el-radio-group v-model="temp.isSet">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="秒杀价格" prop="seckillPrice">
                    <el-input v-model.number="temp.seckillPrice" />
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-date-picker v-model="temp.startTime" type="datetime" placeholder="请选择开始时间" />
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-date-picker v-model="temp.endTime" type="datetime" placeholder="请选择结束时间" />
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
                    goodsId: [{
                        required: true,
                        message: '请选择商品',
                        trigger: 'blur'
                    }],
                    seckillPrice: [{
                        type: 'number',
                        min: 0,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    seckillNum: [{
                        type: 'number',
                        min: 0,
                        message: '请输入数字',
                        trigger: 'blur'
                    }]
                },
                temp: {
                    goodsId: '',
                    seckillNum: '',
                    seckillPrice: '',
                    isSet:1,
                    startTime: new Date(),
                    endTime: new Date()
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
