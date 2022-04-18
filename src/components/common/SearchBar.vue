<template>
    <el-row type="flex"  style="margin-bottom: 25px; width: 800px;padding-left: 400px">
        <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过ISBN/书名/作者搜索..."
            prefix-icon="el-icon-search"
            size="small"
            v-model="keywords">
        </el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </el-row>
</template>

<script>
    export default {
        name: "SearchBar",
        data(){
            return{
                keywords:''
            }
        },
        methods:{
            searchClick(){
                this.$emit('onSearch')
            }
        }
    }
</script>

<style>

</style>