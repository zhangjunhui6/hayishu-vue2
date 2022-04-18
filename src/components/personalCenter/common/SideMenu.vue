<template>
    <el-menu
            router
            :default-active="$route.path"
            background-color="white"
            text-color="#222"
            active-text-color="red"
    >
        <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.name">
            <i :class="item.icon"></i>
            {{ item.navItem}}
        </el-menu-item>
    </el-menu>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                navList:[
                    {name: '/myBooks',navItem: '售书架',icon:'el-icon-reading'},
                    {name: '/myInfo',navItem: '个人信息',icon: 'el-icon-user'},
                    {name: '/myWallet',navItem: '钱包',icon: 'el-icon-wallet'},
                    {name: '/myBuyOrder',navItem: '买的订单',icon:'el-icon-s-order'},
                    {name: '/mySellOrder',navItem: '卖的订单',icon: 'el-icon-s-order'},
                    {name: '/changePassword',navItem: '修改密码',icon: 'el-icon-key'}
                ]
            }
        }
    }
</script>