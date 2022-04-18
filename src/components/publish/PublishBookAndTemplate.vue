
<template>
    <el-row type="flex" justify="center">
        <el-form class="publishForm" :model="ruleForm" :rules="rules" ref="ruleForm"
                 label-width="100px" label-position="right">
            <el-row :gutter="40" type="flex">
                <el-col :span="12">
                    <el-form-item label="ISBN:" prop="isbn">
                        <el-input v-model="ruleForm.isbn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="书名:" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-form-item label="封面:">  <!--上传图片;部署服务器,http://localhost 变为 http://112.74.77.170 -->
                <el-upload
                        ref="upload"
                        action="http://127.0.0.1:10086/api/book/upload"
                        name="cover"
                        list-type="picture-card"
                        :limit="1"
                        accept="image/jpeg,image/jpg,image/png"
                        :before-upload="beforeUpload"
                        :on-success="handleSuccess"
                        :on-preview="handlePreview"
                        :on-exceed="onExceed"
                        :on-remove="handleRemove"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <el-image width="100%" :src="dialogImageUrl"></el-image>
                </el-dialog>
            </el-form-item>
            <el-row type="flex" :gutter="40">
                <el-col :span="12">
                    <el-form-item label="作者:" prop="author">
                        <el-input v-model="ruleForm.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出版社:" prop="press">
                        <el-input v-model="ruleForm.press"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row type="flex" :gutter="40">
                <el-col :span="12">
                    <el-form-item label="类别:" prop="cid">
                        <el-select v-model="ruleForm.cid" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="原价:" prop="price">
                        <el-input type="number" step="0.01" v-model="ruleForm.price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" :gutter="40">
                <el-col :span="12">
                    <el-form-item label="售价:" prop="sell">
                        <el-input type="number" step="0.01" v-model="ruleForm.sell"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="新旧程度:" prop="degree">
                        <el-select v-model="ruleForm.degree" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in degrees"
                                    :key="index"
                                    :label="item"
                                    :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="描述信息:" prop="abs">
                <el-input type="textarea" :rows="4" v-model="ruleForm.abs" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publishBookTemplate">确定发布</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    export default {
        name: "publishBookForm",
        data(){
            return {
                /*文件上传的参数*/
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [{name: '', url: ''}],
                ruleForm:{
                    isbn:'',
                    cover:'',
                    title:'',
                    author:'',
                    press:'',
                    abs:'',
                    cid:'',
                    price:'',
                    sell:'',
                    degree:''
                },
                rules:{
                    isbn:[{required: true, message: 'ISBN不能为空', trigger: 'blur'}],
                    title: [{required: true, message: '书名不能为空', trigger: 'blur'}],
                    author: [{required: true, message: '作者不能为空', trigger: 'blur'}],
                    date: [{required: true, message: '出版日期不能为空', trigger: 'blur'}],
                    press: [{required: true, message: '出版社不能为空', trigger: 'blur'}],
                    price: [{required: true, message: '请填写正确的金额,保留两位小数', pattern: /(^[\d]|^[1-9][\d]*)($|[.][\d]{0,2}$)/}],
                    sell: [{required: true, message: '请填写正确的金额,保留两位小数', pattern: /(^[\d]|^[1-9][\d]*)($|[.][\d]{0,2}$)/}],
                    degree: [{required: true, message: '新旧程度不能为空', trigger: 'blur'}],
                    cid: [{required: true, message: '类别不能为空', trigger: 'blur'}],
                    abs: [{required: true, message: '描述信息不能为空', trigger: 'blur'}]
                },
                options:[],
                degrees:["全新","9成新","8成新","7成新","6成新"]
            }
        },
        mounted() {
            this.$axios
                .get("/book/category/getAll")
                .then(resp => {
                    if (resp && resp.status === 200){
                        this.options = resp.data;
                    }
                })
        },
        methods:{
            publishBookTemplate(){
                this.$axios
                    .post('/book/insertBookTemplate', {
                        isbn: this.ruleForm.isbn,
                        cover: this.ruleForm.cover,
                        title: this.ruleForm.title,
                        author: this.ruleForm.author,
                        press: this.ruleForm.press,
                        abs: this.ruleForm.abs,
                        cid: this.ruleForm.cid,
                        price: this.ruleForm.price
                    })
                    .then(response => {
                        if (response.data.code === 200) {
                            this.publishBook();
                        } else {
                            this.$message.error(response.data.message);
                        }
                    })
                    .catch(failResponse => {
                    })
            },
            publishBook(){
                this.$axios
                    .post("/book/insertBook",{
                        uid: this.$store.state.user.id,
                        isbn: this.ruleForm.isbn,
                        sellPrice: this.ruleForm.sell,
                        degree: this.ruleForm.degree,
                        status: 0
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.$refs["ruleForm"].resetFields();
                        } else {
                            this.message.error(resp.message);
                        }
                    })
                    .catch(error => {})
            },
            /*文件上传前的钩子函数,参数是上传的文件，若返回false则停止上传*/
            beforeUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isBMP){
                    this.$message.error("上传的图片必须是JPG/PNG/BMP格式")
                }
                if (!isLt2M){
                    this.$message.error('上传图片大小不能超过2MB!');
                }
                return (isJPG || isPNG || isBMP) && isLt2M;
            },
            /*图片上传成功的钩子函数*/
            handleSuccess(response,file){
                this.$message.success('图片上传成功');
                /*将返回的文件存储路径赋值给cover字段*/
                if (response.code === 200){
                    this.ruleForm.cover = response.data;  //设置表单字段为返回的路径名
                }
            },
            /*点击已上传的图片时的钩子函数*/
            handlePreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /*删除图片的之前钩子函数*/
            handleRemove(file){
                console.log(file);
            },
            /*上传的图片个数超出设定时触发的函数*/
            onExceed() {
                this.$message.warning('最多只能上传一个图片');
            }
        }
    }
</script>

<style scoped>
    .publishForm{
        width: 600px;
        margin-top: 20px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner{
        width: 180px;
    }

    .upload .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .upload .el-upload:hover{
        border-color: #409EFF;
    }
    .cover{
        width: 178px;
        height: 178px;
        display: block;
    }
    .cover-icon{
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
</style>