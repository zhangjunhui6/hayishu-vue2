<template>
    <el-container class="contain">
        <el-aside width="600px" style="height: 100%">
            <el-card>
                <el-form label-position="right">
                    <el-row gutter="10">
                        <el-col span="10">
                            <el-image :src="book.cover"></el-image>
                        </el-col>
                        <el-col span="14" style="text-align: left">
                            <h2>{{book.title}}</h2>
                            <p>{{book.author}}</p>
                            <p>{{book.press}}</p>
                            <p>{{book.isbn}}</p>
                            <el-link
                                    type="danger"
                                    :underline="false"
                                    style="font-size: 22px;margin-right: 10px;text-decoration-line: line-through"
                            >
                                ￥{{book.price}}
                            </el-link> <br>
                            <el-link
                                    type="primary"
                                    :underline="false"
                                    style="font-size: 22px;margin-top: 10px"
                            >
                                {{prompt}}
                            </el-link>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-input type="textarea" autosize="true" :value="book.abs" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-aside>
        <el-main>
            <el-card v-for="sellBook in books"
                     :key="sellBook.id"
                     shadow="hover"
                     style="width: 60%;margin-left: 20%"
            >
                <el-row>
                    <el-col :span="5">
                        <el-link
                                v-bind:type = " sellBook.sex === '女' ? 'danger' : 'primary' "
                                v-bind:icon=" sellBook.sex === '女' ? 'el-icon-female' : 'el-icon-male' "
                                :underline=false
                                style="font-size: 16px;font-family: 'Microsoft YaHei', sans-serif;padding: 8px 0;"
                                @click="enterUserCenter(sellBook.id)"
                        >
                            {{sellBook.name}}
                        </el-link>
                    </el-col>
                    <el-col :span="7" style="float: right">
                        <el-button
                                round
                                size="medium"
                                type="danger"
                                style="font-size: 14px;"
                                icon="el-icon-shopping-cart-2"
                                @click="joinCart(sellBook.bid)"
                        >
                            加入购物车
                        </el-button>
                    </el-col>
                    <el-col :span="7" style="float: right;margin-top: 3px">
                        <el-tag
                                type="warning"
                                effect="plain"
                                style="font-size: 14px"
                        >
                            {{sellBook.degree}}
                        </el-tag>
                    </el-col>
                    <el-col :span="5" style="float: right;margin-top: 3px">
                        <el-tag
                                type="success"
                                effect="plain"
                                style="font-size: 14px"
                        >
                            ￥{{sellBook.sellPrice}}
                        </el-tag>
                    </el-col>
                </el-row>
            </el-card>
        </el-main>
    </el-container>
</template>

<style>
    .contain{
        width: 100%;
        position: relative;
    }
</style>

<script>
    export default {
        name: "BookDetail",
        data(){
            return{
                id: this.$store.state.user.id,
                book: this.$store.state.book,
                books: [],
                prompt: ""
            }
        },
        mounted() {
            this.getBooks();
        },
        methods:{
            getBooks(){
                let url = "/book/getByIsbnAndNotUid?isbn="+this.book.isbn+"&uid="+this.id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.books = resp.data;
                            if (resp.data.length === 0){
                                this.prompt = "暂无人出售此书本!";
                            } else if (resp.data.length === 1){
                                this.prompt = "￥"+resp.data[0].sellPrice;
                            } else {
                                this.prompt = "￥"+resp.data[0].sellPrice+"起";
                            }
                        }
                    })
            },
            enterUserCenter(id) {
                this.$router.push({
                    name: 'UserCenter',
                    params: {
                        id: id
                    }
                })
            },
            joinCart(bid){
                let uid = this.$store.state.user.id;
                this.$axios
                    .post("/cart/joinCart",{
                        uid: uid,
                        bid: bid,
                        status: 1
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
            }
        }
    }
</script>