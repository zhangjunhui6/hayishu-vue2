<template>
    <div>
        <el-row style="height: 615px;">
            <search-bar @onSearch="searchMyBook" ref="searchBar"></search-bar>
            <el-card class="myBooks" shadow="hover"
                     v-for="myBook in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                     :key="myBook.isbn"
            >
                <div slot="header">
                    <el-row>
                        <el-col :span="20">
                            <span style="font-size: 18px">{{myBook.title}}</span>
                        </el-col>
                        <el-col :span="4">
                            <el-row style="padding: 0 0 7px 0;margin-top: -5px">
                                <el-button type="text" style="float: right;padding: 0 15px 0 0" @click="deleteBook(myBook)">下架</el-button>
                            </el-row>
                            <el-row style="margin-bottom: -5px">
                                <el-button type="text" style="float: right;padding: 0 0" @click="edit(myBook)">修改售价</el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-col :span="10">
                        <el-image :src="myBook.cover"></el-image>
                    </el-col>
                    <el-col :span="14">
                        <span>{{myBook.author}}</span>
                        <p>{{myBook.press}}</p>
                        <p>{{myBook.isbn}}</p>
                        <el-link
                                type="danger"
                                :underline="false"
                                style="font-size: 22px;margin-right: 10px;text-decoration-line: line-through"
                        >
                            ￥{{myBook.price}}
                        </el-link>
                        <el-link
                                type="primary"
                                :underline="false"
                                style="font-size: 22px;margin-left: 10px"
                        >
                            ￥{{myBook.sellPrice}}
                        </el-link>
                    </el-col>
                </div>
            </el-card>
            <el-dialog title="修改书本售价" :visible.sync="dialogFormVisible" width="30%" @close="cancel">
                <el-form>
                    <el-form-item label="售价" label-width="80px">
                        <el-input v-model="book.sellPrice"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="changeBookSellPrice">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
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
    .myBooks{
        width: 320px;
        height: 255px;
        float: left;
        margin: 10px 40px 10px 40px;
    }
</style>

<script>
    import SearchBar from "../common/SearchBar";
    export default {
        name: 'MyBooks',
        components: {SearchBar},
        data() {
            return {
                keywords: '',
                books:[],
                currentPage:1,
                pageSize: 6,
                book:{},
                dialogFormVisible: false,
            }
        },
        mounted: function(){
          this.getMyAllBooks();
        },
        methods: {
            getMyAllBooks(){
                this.currentPage = 1;
                let id = this.$store.state.user.id;
                let url = "/book/getMyAllBooks?id=" + id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.books = resp.data;
                        }
                    });
                this.currentPage = 1;
            },
            searchMyBook(){
                this.currentPage = 1;
                this.keywords = this.$refs.searchBar.keywords;
                let url = "/book/searchMyBooks?uid="+this.$store.state.user.id+"&keywords="+this.keywords;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.books = resp.data;
                        }
                    })
            },
            edit(book){
                this.book = book;
                this.dialogFormVisible = true;
            },
            cancel(){
              this.dialogFormVisible = false;
              this.getMyAllBooks();
            },
            changeBookSellPrice(){
                this.$axios
                    .post('/book/changeBookSellPrice',{
                        id: this.book.id,
                        sellPrice: this.book.sellPrice
                    })
                    .then(result => {
                        if (result.data.code === 200){
                            this.$message.success(result.data.message);
                            this.dialogFormVisible = false;
                            this.getMyAllBooks();
                        } else {
                            this.$message.error(result.data.message);
                        }
                    })
                    .catch(error => {

                    })
            },
            deleteBook(book){
                let url = "/book/deleteBook?id="+book.id;
                this.$axios
                    .post(url)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.dialogFormVisible = false;
                            this.getMyAllBooks();
                        } else {
                            this.$message.error(resp.data.message)
                        }
                    })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
        }
    }
</script>