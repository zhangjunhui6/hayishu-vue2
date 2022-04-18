<template>
    <el-menu
        class="attention"
        default-active = "1"
        active-text-color="red"
        @select="handleSelect"
    >
        <el-menu-item v-for="item in items" :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                items:[
                    {index: "1",name: "最新注册",icon: "el-icon-time"},
                    {index: "2",name: "最多关注",icon: "el-icon-s-grid"},
                    {index: "3",name: "最多出售",icon: "el-icon-s-grid"},
                    {index: "4",name: "关注的人",icon: "el-icon-connection"},
                    {index: "5",name: "粉丝",icon: "el-icon-link"},
                    {index: "6",name: "相互关注",icon: "el-icon-set-up"}
                ],
                index: "1"
            }
        },
        methods: {
            handleSelect(index){
                this.index = index;
                this.$emit("indexSelect");
            }
        }
    }
</script>