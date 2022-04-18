<template>
    <!--el-menu参数说明:  mode:模式,水平(horizontal)或竖直(默认);
            router:是否使用vue-router的模式,启动时以index作为path路径跳转;-->
    <el-menu
            mode="horizontal"
            router
            :default-active="$route.path"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            style="min-width: 1300px"
    >
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            <i :class="item.icon"></i>
            {{ item.navItem}}
        </el-menu-item>
        <span class="info">哈易书——我们的二手书交易平台</span>
        <el-button type="danger" size="medium" style="float: right;margin-top: 10px;margin-right: 10px" @click="logout">
            <i class="el-icon-switch-button"></i>
        </el-button>
    </el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        data(){
            return{
                navList:[
                    {name: '/index',navItem: '首页',icon:'el-icon-s-goods'},
                    {name: '/pal',navItem: '书友',icon: 'el-icon-s-custom'},
                    {name: '/publish',navItem: '发布',icon:'el-icon-upload'},
                    {name: '/cart',navItem: '购物车',icon: 'el-icon-shopping-cart-1'},
                    {name: '/myHome',navItem: '个人中心',icon: 'el-icon-s-home'}
                ],
            }
        },
        methods: {
            logout(){
                this.$store.commit('logout');
                this.$message.success("成功退出登录！");
                this.$router.replace("/login");
            }
        }
    }
</script>

<style scoped>
    .info{
        position: absolute;
        padding-top: 15px;
        right: 40%;
        font-size: 20px;
        font-family: "Microsoft YaHei",sans-serif;
        color: royalblue;
        pointer-events: none;
    }
</style>
