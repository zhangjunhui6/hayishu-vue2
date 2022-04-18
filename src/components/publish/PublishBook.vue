<template>
     <el-container>
         <el-main>
             <el-card>
                 <el-row>
                     <el-col span="12">
                         <el-image :src="book.cover"></el-image>
                     </el-col>
                     <el-col span="12" style="text-align: left">
                         <h2>{{book.title}}</h2>
                         <p>ISBN:{{book.isbn}}</p>
                         <p>作者:{{book.author}}</p>
                         <p>出版社:{{book.press}}</p>
                         <p>原价:{{book.price}}</p>
                     </el-col>
                 </el-row>
             </el-card>
             <el-row type="flex" justify="center">
                 <el-form :model="publishForm" :rules="rules" ref="publishForm">
                     <h2 >出售信息</h2>
                     <el-form-item  prop="sellPrice" label="售价">
                         <el-input  type="number" step="0.01"  placeholder="请输入出售价格" v-model="publishForm.sellPrice"></el-input>
                     </el-form-item>
                     <el-form-item  prop="degree" label="新旧">
                         <el-select  clearable filterable placeholder="请选择新旧程度" v-model="publishForm.degree">
                             <el-option
                                     v-for="(item,index) in degrees"
                                     :key="index"
                                     :label="item"
                                     :value="item"
                             >
                             </el-option>
                         </el-select>
                     </el-form-item>
                     <el-form-item>
                         <el-button type="primary" @click="publish">发布</el-button>
                     </el-form-item>
                 </el-form>
             </el-row>

         </el-main>
     </el-container>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                publishForm:{
                    uid: this.$store.state.user.id,
                    isbn: this.$store.state.book.isbn,
                    sellPrice:'',
                    degree:'',
                    status:0
                },
                rules:{
                    sellPrice: [{required: true, message: '请填写正确的金额,保留两位小数', pattern: /(^[\d]|^[1-9][\d]*)($|[.][\d]{0,2}$)/}],
                    degree: [{required: true, message: '新旧程度不能为空', trigger: 'blur'}]
                },
                book: this.$store.state.book,
                degrees: ["全新","9成新","8成新","7成新","6成新"]
            }
        },
        methods: {
            publish(){
                this.$axios
                    .post("/book/insertBook",this.publishForm)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.$refs["publishForm"].resetFields();
                        } else {
                            this.message.error(resp.message);
                        }
                    })
                    .catch(error => {})
            }
        }
    }
</script>