<template>
    <div id="registerBox">
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-row type="flex" justify="center">
                    <el-form  class="registerForm" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                        <h3 id="registerTitle">用户注册</h3>
                        <el-form-item prop="phone">
                            <el-input type="text" v-model="ruleForm.phone" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-input type="text" v-model="ruleForm.name" placeholder="昵称"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="confirm_password">
                            <el-input type="password" v-model="ruleForm.confirm_password" placeholder="确认密码" @keyup.enter.native="register"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="registerBtn" type="primary" @click="register">注册账号</el-button>
                        </el-form-item>
                        <el-form-item class="loginLink">
                            <router-link style="text-decoration: none;"  to="/login">已有帐号，前往登录</router-link>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name:'Register',
        data() {
            let reg = /^1[3456789]\d{9}$/;
            let Phone=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error("手机号不能为空"));
                }else if (!reg.test(value)) {
                    callback(new Error("请输入有效的手机号码"));
                }else {
                    callback();
                }
            };
            let Password=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error("密码不能为空"));
                }else if (value.length<8 || value.length>20){
                    callback(new Error("密码的长度必须为8~20位"));
                }
                else {
                    callback();
                }
            };
            let Confirm_password=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error("请再次输入密码"));
                }else if (value !== this.ruleForm.password){
                    callback(new Error("两次输入密码不一致！"));
                }else {
                    callback();
                }
            };
            return {
                ruleForm:{
                    phone:'',
                    name:'',
                    password:'',
                    confirm_password:''
                },
                rules:{
                    phone:[{validator: Phone,trigger:'blur'}],
                    name:[{required: true, message: '昵称不能为空', trigger: 'blur'}],
                    password:[{validator: Password,trigger:'blur'}],
                    confirm_password:[{validator: Confirm_password,trigger:'blur'}]
                }
            }
        },
        methods:{
            register(){
                let phone = this.ruleForm.phone;
                let name = this.ruleForm.name;
                let password = this.ruleForm.password;
                this.$axios
                    .post('/user/register',{
                        id: phone,
                        name: name,
                        password: password
                    })
                    .then(response => {
                        if (response.data.code === 200){
                            this.$message.success(response.data.message);
                            this.$router.replace('/login');
                        }
                        else {
                            this.$message.error(response.data.message);
                            this.$refs["ruleForm"].resetFields();
                        }
                    })
                    .catch(failResponse => {
                    })
            }
        }
    }
</script>

<style scoped>
    #registerBox{
        background-image: url("../assets/login.png");
        background-size: cover;
        height: 100%;
        width: 100%;
        position: fixed;
        margin-top: -8px;
        margin-left: -8px;
    }
    .registerForm{
        width: 400px;
        background: white;
        border-radius: 15px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    #registerTitle{
        color: cyan;
    }
    .el-form-item{
        margin-right: 80px;  /*因为默认是左外距离为80px,形成对称居中*/
    }
    .loginLink{
        margin: -10px 0 10px 120px;
    }
    .registerBtn{
        width: 50%;
    }
</style>