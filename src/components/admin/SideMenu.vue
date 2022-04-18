<template>
    <el-col style="text-align: left">
        <el-menu
                router
                :default-active="$route.path"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-menu-item index="/manage">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="/userList">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>数据管理</span>
                </template>
                <el-menu-item index="/userList">用户列表</el-menu-item>
                <el-menu-item index="/bookList">书本列表</el-menu-item>
                <el-menu-item index="/orderList">订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="/addUser">
                <template slot="title">
                    <i class="el-icon-plus"></i>
                    <span>添加数据</span>
                </template>
                <el-menu-item index="/addUser">添加用户</el-menu-item>
                <el-menu-item index="/addBookTemplate">添加书本</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>

</template>

<style></style>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>