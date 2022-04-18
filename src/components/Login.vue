<template>
    <div id="loginBox">
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-row type="flex" justify="center"><!--采用Layout布局，使得表单居中显示-->
                    <el-form  class="loginForm" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                        <h3 id="loginTitle">系统登录</h3>
                        <el-form-item prop="username">
                            <el-input type="text" v-model="ruleForm.username" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password"><!--@keyup.enter.native="login"使用enter键触发事件-->
                            <el-input type="password" v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="login"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="loginBtn" @click="reset('ruleForm')">重置</el-button>
                            <el-button class="loginBtn" type="primary" @click="login">登录</el-button>
                        </el-form-item>
                        <el-form-item class="loginLink">
                            <router-link  to="/register">注册账号</router-link>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name:'Login',
        data() {
            return {
                ruleForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                }
            }
        },
        methods: {
            login() {
                let username = this.ruleForm.username;
                let password = this.ruleForm.password;
                // ajax，axios => Get Post 等方法
                this.$axios
                    .post('/user/login', {
                        id: username,
                        password: password
                    })
                    .then(response => {
                        if (response.data.code === 200) {
                            /* 将后台返回的user类对象存储到Vuex的store中 */
                            let data = response.data.data;
                            this.$store.commit('login',data);
                            /* 判断用户身份，分别进入对应的页面 */
                            if (data.identity === 1){
                                this.$router.replace("/index");
                            } else if (data.identity === 0){
                                this.$router.replace("/admin");
                            } else {
                                alert("错误");
                                console.log(data.identity);
                            }
                        } else {
                            this.$message.error(response.data.message);
                        }
                    })
                    .catch(error => {
                    })

            },
            reset(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    #loginBox{   /*先设置整个页面的背景*/
        background-image: url("../assets/login.png");
        background-size: cover; /*覆盖整个页面*/
        height: 100%;
        width: 100%;
        position: fixed;  /*关键语句,有这条才会全屏显示*/
        margin-top: -8px; /*调节外框才使得背景居中*/
        margin-left: -8px;
    }
    .loginForm{ /*设置表单样式*/
        width: 400px;
        background: white;/*白色背景*/
        border-radius: 15px; /*设置圆角边框*/
        border: 1px solid #eaeaea; /*1px实线边框,颜色偏白色*/
        box-shadow: 0 0 25px #cac6c6;/*设置白灰色阴影*/
    }
    #loginTitle{ /*标题样式*/
        color: cyan;
    }
    .el-form-item{
        margin-right: 80px;  /*因为默认是左外距离为80px,形成对称居中*/
    }
    .loginBtn{
        width: 35%;
        margin: 0 15px;
    }
    .loginLink{
        margin: -10px 0 10px 120px;
    }
    a{
        text-decoration: none; /*去除链接下划线*/
    }
</style>