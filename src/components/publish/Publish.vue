<template>
    <el-container>
        <el-header style="margin-top: 20px">
            <span>发布流程：1. 输入书本的13位ISBN搜索现有模板</span>
            <p>2. 若有模板则直接输入售价和新旧程度即可发布</p>
            <p>3. 若找不到模板，则可<el-link type="primary" href="http://localhost:8080/#/publishBookAndTemplate" style="font-size: 15px;padding-bottom: 5px">点击这里</el-link>进行发布</p>
        </el-header>
        <el-main>
            <el-form label-width="0" style="margin-top: 50px">
                <el-form-item>
                    <el-input
                            type="number"
                            step="1"
                            style="width: 350px;"
                            @keyup.enter.native="searchTemplateByISBN"
                            placeholder="输入书本的ISBN..."
                            prefix-icon="el-icon-search"
                            v-model="isbn">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="searchTemplateByISBN">
                        搜索
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>

</template>

<style></style>

<script>
    export default {
        data() {
            return {
                isbn:'',
                bookTemplate:{}
            }
        },
        methods:{
            searchTemplateByISBN(){
                let url = "/book/searchTemplateByISBN?isbn="+this.isbn;
                this.$axios.get(url).then(resp => {
                    if (resp.data.code === 200){
                        this.$store.commit('setBook',resp.data.data);
                        this.$router.push('/publishBook');
                    } else {
                        this.$message.error(resp.data.message);
                    }
                })
            }
        }

    }
</script>