<template>
    <el-container>
        <el-aside style="width: 150px;height: 625px;margin-top: 20px">
            <side-menu @indexSelect="getByCategory" ref="sideMenu"></side-menu>
        </el-aside>
        <el-main>
            <books @search="searchByKeyword" class="books-area" ref="booksArea"></books>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from "./BookSideMenu";
    import Books from "./Books";
    export default {
        name: "BooksIndex",
        components:{SideMenu,Books},
        methods:{
            getByCategory(){
                this.$refs.booksArea.currentPage = 1;
                let url = 'book/getTemplateByCategory/'+this.$refs.sideMenu.cid+"?uid="+this.$store.state.user.id;
                this.$axios
                    .get(url)
                    .then(resp=>{
                        if (resp && resp.status === 200){
                            this.$refs.booksArea.books = resp.data;
                        }
                    })
            },
            searchByKeyword(){
                this.$refs.booksArea.currentPage = 1;
                let keyword = this.$refs.booksArea.keywords;
                let cid = this.$refs.sideMenu.cid;
                let url = '/book/searchTemplateByKeyword?keyword=' + keyword + '&cid=' + cid + "&uid=" + this.$store.state.user.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.$refs.booksArea.books = resp.data;
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .books-area{
        width: 1340px;
    }
</style>