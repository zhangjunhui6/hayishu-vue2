<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/manage'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>书本列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main style="height: 600px">
            <el-table :data="bookList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                <el-table-column
                        label="#"
                        type="index"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="ISBN"
                        header-align="center"
                        align="center"
                        prop="isbn"
                >
                </el-table-column>
                <el-table-column
                        label="书名"
                        header-align="center"
                        align="center"
                        prop="title"
                >
                </el-table-column>
                <el-table-column
                        label="作者"
                        header-align="center"
                        align="center"
                        prop="author"
                >
                </el-table-column>
                <el-table-column
                        label="出版社"
                        header-align="center"
                        align="center"
                        prop="press"
                >
                </el-table-column>
                <el-table-column
                        label="价格"
                        header-align="center"
                        align="center"
                        prop="price"
                >
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    :total="bookList.length"
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
                bookList: [],
                currentPage: 1,
                pageSize: 10
            }
        },
        mounted() {
            this.$axios
                .get("/book/getAllTemplate?uid=123456")
                .then(resp => {
                    if (resp && resp.status === 200){
                        this.bookList = resp.data;
                    }
                })
        },
        methods: {
            handleCurrentChange: function (page) {
                this.currentPage = page;
            }
        }
    }
</script>