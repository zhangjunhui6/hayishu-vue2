<template>
    <div>
        <el-row style="height: 615px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <!--属性说明:effect:主题(dark/light);placement:文字提示出现的位置;
            content/slot#content:显示的内容;slice(start,end):获取数组的子数组-->
            <el-tooltip effect="dark" placement="right"
                        v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        :key="item.isbn">
                <p slot="content" style="font-size: 15px;margin-bottom: 6px;">
                    {{item.title}}
                </p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px;">
                    <span>{{item.author}}</span> |
                    <span>{{item.press}}</span>
                </p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px;">
                    {{item.isbn}}
                </p>
                <el-card class="book" shadow="hover" body-style="padding: 10px;" @click.native="bookDetail(item)">
                    <div class="cover">
                        <el-image :src="item.cover"></el-image>
                    </div>
                    <div class="title">
                        <span>{{item.title}}</span>
                    </div>
                </el-card>
            </el-tooltip>
        </el-row>
        <el-row>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="books.length"
                    background
            >
            </el-pagination>
        </el-row>
    </div>
</template>

<style>
    .book{
        width: 135px;
        height: 228px;
        float: left;
        margin: 20px 20px 20px 20px;
    }
    .title {
        font-size: 14px;
        text-align: center;
    }
    .cover {
        width: 120px;
        height: 175px;
        margin: 0 0 3px 0;
        overflow: hidden;
        cursor: pointer;
    }
</style>

<script>
    import SearchBar from "../common/SearchBar";

    export default {
        name: 'books',
        components: {SearchBar},
        data() {
            return {
                keywords: '',
                books:[],
                currentPage:1,
                pageSize: 14
            }
        },
        mounted:function () {
            this.loadBooks()
        },
        methods:{
            loadBooks(){
                let url = "/book/getAllTemplate?uid="+this.$store.state.user.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.books = resp.data;
                        }
                    })
            },
            searchResult(){
                this.keywords = this.$refs.searchBar.keywords;
                this.$emit("search");
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            bookDetail(book){
                this.$store.commit('setBook',book);
                this.$router.push('/index/bookDetail');
            }
        }
    }
</script>