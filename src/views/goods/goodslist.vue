<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.goodsName" placeholder="商品名称" style="width: 200px;" class="filter-item" />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                {{ $t('table.search') }}
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                {{ $t('table.add') }}
            </el-button>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" sortable="custom" align="center" width="80">
                <template slot-scope="{row}">
                    <span>{{ row.goodsId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="所属分类" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsCategoryId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="所属门店" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.storeId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品图片" align="center">
                <template slot-scope="{row}">
                    <el-image :src="row.goodsImg">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="是否上架" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.isSale == 0 ? '否' : '是'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品状态" align="center">
                <template slot-scope="{row}">
                    <span v-if="row.goodsStatus == -1">违规</span>
                    <span v-else-if="row.goodsStatus == 0">未审核</span>
                    <span v-else>已审核</span>
                </template>
            </el-table-column>
            <el-table-column label="商品类型" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsType == 0 ? '实物商品' : '虚拟商品'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品原价" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="会员价" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsVipPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="售价" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsSellPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="排序" width="60" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.goodsSort }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <i class="el-icon-edit" @click="handleCreate(row)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑规格" placement="top">
                        <router-link :to="'/goods/goodsProperty/' + row.goodsId">
                            <i class="el-icon-set-up"></i>
                        </router-link>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑规格价格" placement="top">
                        <router-link :to="'/goods/goodsAppraises/' + row.goodsId">
                            <i class="el-icon-money"></i>
                        </router-link>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看商品评论" placement="top">
                        <router-link :to="'/goods/goodsAppraises/' + row.goodsId">
                            <i class="el-icon-view"></i>
                        </router-link>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <i class="el-icon-delete" @click="handleDelete()"></i>
                    </el-tooltip>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />

        <add :dialogFormVisible="dialogFormVisible" @operOialog="operOialog"></add>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import add from './good_add.vue'

    export default {
        name: 'ComplexTable',
        components: {
            Pagination,
            add
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    goodsName: ''
                },
                dialogFormVisible: false
            }
        },
        created() {
            this.getList();
        },
        methods: {
            operOialog(e) {
                this.dialogFormVisible = false;
                if (e.isClose) {

                } else {

                }
            },
            handleFilter() {

            },
            getList() {
                this.listLoading = true
                var obj = {
                    goodsId: 1,
                    goodsName: '大白菜',
                    goodsDesc: '',
                    goodsCategoryId: '1',
                    storeId: 1,
                    goodsImg: 'http://cs.hfzyycb.com/resources/picture/f3ccdd27d2000e3f9255a7e3e2c48800.jpeg',
                    isSeckill: 1,
                    isSale: 1,
                    isBest: 1,
                    isHot: 1,
                    isNew: 1,
                    isRecom: 1,
                    showType: 1,
                    goodsCatIdPath: '',
                    goodsCatId: 1,
                    goodsStatus: 1,
                    saleNum: 1,
                    goodsContents: '',
                    visitNum: 234,
                    appraiseNum: 234,
                    isSpec: 0,
                    goodsSeoKeywords: '',
                    illegalRemarks: '',
                    goodPrint: '',
                    goodsType: 0,
                    isDistribut: 0,
                    commission: 560,
                    isFreeShipping: 0,
                    goodsSerachKeywords: '',
                    shippingFeeType: 1,
                    goodsWeight: 23,
                    goodsVolume: 2,
                    deliverType: 0,
                    goodsPrice: 100,
                    goodsVipPrice: 50,
                    goodsSellPrice: 80,
                    goodsSort: 0,
                    saleTime: '2020-07-30 12:23:34',
                    createTime: '2020-07-08 12:23:34',
                }
                var list = []
                for (var i = 0; i < 10; i++) {
                    list.push(obj);
                }
                var that = this;
                setTimeout(function() {
                    that.list = list
                    that.total = 100;
                    that.listLoading = false;
                }, 1000)

            },
            handleCreate() {
                this.dialogFormVisible = true
            },
            handleDelete(row, index) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$notify({
                        title: '提示',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.list.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
