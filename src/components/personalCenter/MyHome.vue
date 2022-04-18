<template>
    <el-container>
        <el-aside width="150px" style="margin-top: 20px;height: 600px">
            <side-menu></side-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<style></style>

<script>
    import SideMenu from "./common/SideMenu";
     export default {
        name: 'MyHome',
        components: {SideMenu}
    }
</script>