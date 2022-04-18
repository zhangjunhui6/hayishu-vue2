<template>
    <el-container>
        <el-header>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/manage'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
        <el-main style="height: 600px">
            <el-table :data="userList.slice((page-1)*pageSize,page*pageSize)" >
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
                        label="注册日期"
                        header-align="center"
                        align="center"
                        prop="time"
                >
                </el-table-column>
                <el-table-column
                        label="昵称"
                        header-align="center"
                        align="center"
                        prop="name"
                >
                </el-table-column>
                <el-table-column
                        label="手机号"
                        header-align="center"
                        align="center"
                        prop="id"
                >
                </el-table-column>
                <el-table-column
                        label="性别"
                        header-align="center"
                        align="center"
                        prop="sex"
                >
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    :total="userList.length"
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
                userList: [],
                page: 1,
                pageSize: 20
            }
        },
        mounted() {
            this.$axios
                .get("/user/getUserList")
                .then(resp => {
                    if (resp && resp.status === 200){
                        this.userList = resp.data;
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