<!--父组件：除登录注册界面外其它页面放置于router-view中-->
<template>
    <div>
        <nav-menu></nav-menu> <!--导航栏-->
        <router-view/> <!--子页面(组件)显示的地方-->
    </div>
</template>

<script>
    import NavMenu from "./common/NavMenu";
    export default {
        name: "Home",
        components: {NavMenu}
    }
</script>

<style scoped>

</style>