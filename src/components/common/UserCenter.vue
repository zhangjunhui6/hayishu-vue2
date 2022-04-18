<template>
    <el-container>
        <el-header style="margin-top: 15px">
            <el-row>
                <el-col :span="4">
                    <el-link
                            v-bind:type = " otherUser.sex === '女' ? 'danger' : 'primary' "
                            v-bind:icon=" otherUser.sex === '女' ? 'el-icon-female' : 'el-icon-male' "
                            :underline=false
                            style="font-size: 18px;font-family: 'Microsoft YaHei', sans-serif;padding: 8px 0;"
                    >
                        {{otherUser.name}}
                    </el-link>
                </el-col>
                <el-col :span="6" style="margin-top: 5px">
                    <span style="font-size: 21px;color: orangered;font-family: 'Arial Rounded MT Bold',sans-serif; " >
                        {{otherUser.name}}的主页
                    </span>
                </el-col>
                <el-col :span="7">
                    <el-input
                            style="width: 60%;margin-top: 3px"
                            @keyup.enter.native="searchOtherBooks"
                            placeholder="通过ISBN/书名/作者搜索..."
                            prefix-icon="el-icon-search"
                            size="small"
                            v-model="keyword"
                    >
                    </el-input>
                    <el-button size="small" type="primary" icon="el-icon-search" @click="searchOtherBooks">
                        搜索
                    </el-button>
                </el-col>
                <el-col :span="3" style="float: right;">
                    <el-button
                            round
                            size="medium"
                            v-bind:type = " otherUser.sex === '女'? 'danger' : 'primary' "
                            style="font-size: 15px;"
                            @click="changeFollowStatus()"
                    >
                        {{follow}}
                    </el-button>
                </el-col>
                <el-col :span="4" style="float: right;margin-top: 3px">
                    <el-tag
                            type="success"
                            effect="plain"
                            style="font-size: 15px"
                    >
                        出售:{{otherUser.sales}}
                    </el-tag>
                    <el-tag
                            type="warning"
                            effect="plain"
                            style="font-size: 15px"
                    >
                        粉丝:{{otherUser.fans}}
                    </el-tag>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-card shadow="hover"
                     v-for="otherBook in otherBooks.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                     :key="otherBook.isbn"
                     style="float: left;width: 145px;height: 260px;margin: 10px 40px 10px 50px;"
            >
                <el-row>
                    <el-col :span="20" style="height: 32px">
                        <div>
                            <span style="font-size: 14px;text-align:center;">{{otherBook.title}}</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-button icon="el-icon-shopping-cart-2" type="text"  style="float: right; line-height: 5px" @click="joinCart(otherBook)">
                        </el-button>
                    </el-col>
                </el-row>
                <el-row >
                    <el-image style="width: 125px;height: 175px" :src="otherBook.cover"></el-image>
                </el-row>
                <el-row>
                    <el-link
                            type="danger"
                            :underline="false"
                            style="font-size: 20px;margin-right: 5px;text-decoration-line: line-through"
                    >
                        ￥{{otherBook.price}}
                    </el-link>
                    <el-link
                            type="primary"
                            :underline="false"
                            style="font-size: 20px;margin-left: 5px"
                    >
                        ￥{{otherBook.sellPrice}}
                    </el-link>
                </el-row>
            </el-card>
        </el-main>
        <el-footer>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="otherBooks.length"
                    background
                    hide-on-single-page
            >
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<style>
</style>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                otherUser: {},
                status: 1, /*1代表未关注，0代表已关注*/
                follow: '',/*显示关注或已关注*/
                otherBooks: [],
                keyword: '',
                currentPage: 1,
                pageSize: 12
            }
        },
        mounted:function () {
            this.getOtherUser();
            this.getStatus();
            this.getOtherBooks();
        },
        methods: {
            getOtherUser(){
                let url = "/user/getInfo?id="+this.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.otherUser = resp.data;
                        } else {
                            this.$message.error("获取用户信息失败");
                        }
                    })
            },
            getStatus(){
                let url = "/club/getStatus?uid="+this.$store.state.user.id+"&followId="+this.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.status = resp.data;
                            this.follow = this.status === 1 ? "关注" : "已关注";
                        } else {
                            this.$message.error("获取用户关系失败");
                        }
                    })
            },
            getOtherBooks(){
                let url = "/book/getMyAllBooks?id=" + this.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.otherBooks = resp.data;
                        }
                    });
            },
            searchOtherBooks(){
                this.currentPage = 1;
                let uid = this.id;
                let keywords = this.keyword;
                let url = "/book/searchMyBooks?uid="+uid+"&keywords="+keywords;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.otherBooks = resp.data;
                        }
                    })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            changeFollowStatus(){
                let uid = this.$store.state.user.id;
                let followId = this.id;
                let status = this.status === 1 ? 0 : 1;
                this.$axios
                    .post("/club/changeFollowStatus",{
                        uid: uid,
                        followId: followId,
                        status: status
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.getOtherUser();
                            this.getStatus();
                            this.$message.success(resp.data.message);
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            },
            joinCart(book){
                let uid = this.$store.state.user.id;
                let bid = book.id;
                this.$axios
                    .post("/cart/joinCart",{
                        uid: uid,
                        bid: bid,
                        status: 1
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
            }
        }
    }
</script>