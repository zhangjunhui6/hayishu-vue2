<template>
    <el-container>
        <el-aside width="200px">
            <side-menu></side-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<style></style>

<script>
    import SideMenu from "./SideMenu";
    export default {
        name: 'admin',
        components: {SideMenu}
    }
</script>