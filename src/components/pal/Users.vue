<template>
    <el-container>
        <el-header>
            <el-row type="flex"  style="width: 34%;margin-left: 33%">
                <el-input
                        @keyup.enter.native="search"
                        placeholder="按昵称搜索..."
                        prefix-icon="el-icon-search"
                        size="small"
                        v-model="keyword"
                ></el-input>
                <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-row>
        </el-header>
        <el-main style="height: 540px">
            <el-card v-for="user in users"
                     :key="user.id"
                     shadow="hover"
                     style="width: 60%;margin-left: 20%"
                     @click.native="enterUserCenter(user)"
            >
                    <el-row>
                        <el-col :span="5">
                            <el-link
                                    v-bind:type = " user.sex === '女' ? 'danger' : 'primary' "
                                    v-bind:icon=" user.sex === '女' ? 'el-icon-female' : 'el-icon-male' "
                                    :underline=false
                                    style="font-size: 18px;font-family: 'Microsoft YaHei', sans-serif;padding: 8px 0;"
                                    @click="enterUserCenter(user)"
                            >
                                {{user.name}}
                            </el-link>
                        </el-col>
                        <el-col :span="5" style="float: right">
                            <el-button
                                    round
                                    size="medium"
                                    v-bind:type = " user.sex === '女'? 'danger' : 'primary' "
                                    style="font-size: 14px;"
                                    @click="changeFollowStatus(user)"
                            >
                                {{follow}}
                            </el-button>
                        </el-col>
                        <el-col :span="3" style="float: right;margin-top: 3px">
                            <el-tag
                                    type="warning"
                                    effect="plain"
                                    style="font-size: 14px"
                            >
                                粉丝:{{user.fans}}
                            </el-tag>
                        </el-col>
                        <el-col :span="3" style="float: right;margin-top: 3px">
                            <el-tag
                                    type="success"
                                    effect="plain"
                                    style="font-size: 14px"
                            >
                                出售:{{user.sales}}
                            </el-tag>
                        </el-col>
                    </el-row>
            </el-card>
        </el-main>
        <el-footer>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="users.length"
                    background
                    hide-on-single-page
            >
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<style>
    .el-card__body{
        padding: 10px;
    }
</style>

<script>
    export default {
        data() {
            return {
                users: [],
                follow:'',
                user: {},
                currentPage: 1,
                pageSize: 12,
                keyword:''
            }
        },
        methods: {
            changeFollowStatus(user){
                this.user = user;
                this.$emit("changeStatus");
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            search(){
                this.$emit("search");
            },
            enterUserCenter(user){
                this.$router.push({
                    name: 'UserCenter',
                    params: {
                        id: user.id
                    }
                })
            }
        }
    }
</script>