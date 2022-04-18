<template>
    <el-menu
            class="categories"
            default-active = "0"
            active-text-color="red"
            @select="handleSelect"
    >
        <el-menu-item index = 0>
            <i class="el-icon-menu"></i>
            <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item v-for="item in menuItems" :index="item.id" :key="item.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        data(){
            return{
                cid: '0',
                menuItems: []
            }
        },
        mounted() {
            this.$axios
                .get("/book/category/getAll")
                .then(resp => {
                    if (resp && resp.status === 200){
                        this.menuItems = resp.data;
                    }
                })
        },
        methods:{
            handleSelect(index){
                this.cid = index;
                this.$emit('indexSelect')
            }
        }
    }
</script>

<style>

</style>