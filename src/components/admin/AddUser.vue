<template>
    <el-row type="flex" justify="center">
        <el-form>
            <el-form-item label="手机号">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<style></style>

<script>
    export default {
        data() {
            return {msg: 'vue模板页'}
        }
    }
</script>