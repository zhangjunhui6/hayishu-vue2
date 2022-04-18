<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/manage'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main style="height: 600px">
            <el-table :data="orderList.slice((page-1)*pageSize,page*pageSize)" >
                <el-table-column
                        label="#"
                        type="index"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{(page - 1) * pageSize + scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="订单编号"
                        header-align="center"
                        align="center"
                        prop="id"
                >
                </el-table-column>
                <el-table-column
                        label="买家ID"
                        header-align="center"
                        align="center"
                        prop="buyerId"
                >
                </el-table-column>
                <el-table-column
                        label="卖家ID"
                        header-align="center"
                        align="center"
                        prop="sellerId"
                >
                </el-table-column>
                <el-table-column
                        label="订单状态"
                        header-align="center"
                        align="center"
                >
                    <template slot-scope="scope">
                        {{scope.row.status===0?'待支付':(status===1?'待发货':(status===2?'待收货':'已完成'))}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="订单时间"
                        header-align="center"
                        align="center"
                        prop="time"
                >
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    :total="orderList.length"
                    background
            >
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                orderList: [],
                page: 1,
                pageSize: 20
            }
        },
        mounted() {
            this.$axios
                .get("/order/getAll")
                .then(resp => {
                    if (resp && resp.status === 200){
                        this.orderList = resp.data;
                    }
                })
        },
        methods: {
            handleCurrentChange: function (page) {
                this.page = page;
            }
        }
    }
</script>