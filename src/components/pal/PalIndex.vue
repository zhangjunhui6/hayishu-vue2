<template>
    <el-container>
        <el-aside style="width: 150px;height: 625px;margin-top: 20px">
            <user-side-menu @indexSelect="handleSelect" ref="indexType"></user-side-menu>
        </el-aside>
        <el-main>
            <users ref="userList" @changeStatus="changeFollowStatus" @search="searchUsers"></users>
        </el-main>
    </el-container>
</template>

<style></style>

<script>
    import UserSideMenu from "./UserSideMenu"
    import Users from "./Users";
    export default {
        name: "PalIndex",
        components: {UserSideMenu,Users},
        data() {
            return {
            }
        },
        mounted: function () {
            this.handleSelect();
        },
        methods: {
            handleSelect(){
                this.$refs.userList.currentPage = 1;
                let index = this.$refs.indexType.index;
                let id = this.$store.state.user.id;
                let url = "/club/getOtherUsers?id="+id+"&index="+index;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.$refs.userList.users = resp.data;
                            this.$refs.userList.follow = (index === "4" || index === "6") ? "取消关注" : "关注";
                        } else {
                            this.$message.error("获取用户列表失败!");
                        }
                    })
            },
            changeFollowStatus(){
                this.$refs.userList.currentPage = 1;
                let index = this.$refs.indexType.index;
                let uid = this.$store.state.user.id;
                let followId = this.$refs.userList.user.id;
                let status = (index === "4" || index === "6") ? 1 : 0;  /*是否取消关注*/
                this.$axios
                    .post("/club/changeFollowStatus",{
                        uid: uid,
                        followId: followId,
                        status: status
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.handleSelect();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            },
            searchUsers(){
                this.$refs.userList.currentPage = 1;
                let index = this.$refs.indexType.index;
                let id = this.$store.state.user.id;
                let keyword = this.$refs.userList.keyword;
                let url = "/club/queryOtherUsers?id="+id+"&index="+index+"&keyword="+keyword;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.$refs.userList.users = resp.data;
                            this.$refs.userList.follow = (index === "4" || index === "6") ? "取消关注" : "关注";
                        } else {
                            this.$message.error("获取用户列表失败!");
                        }
                    })
            }
        }
    }
</script>