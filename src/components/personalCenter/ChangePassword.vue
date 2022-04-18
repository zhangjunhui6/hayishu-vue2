<template>
    <el-row type="flex" justify="center">
        <el-form class="changePasswordForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
            <h3 style="color: cornflowerblue">修改密码</h3>
            <el-form-item prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="确认密码"  @keyup.enter.native="changePwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="changePwdBtn" type="primary" @click="changePassword">确认</el-button>
                <el-button @click="reset('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    export default {
        name: "ChangePassword",
        data(){
            /*let reg = new RegExp('(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,12}');*/
            let newPassword=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error("请输入新密码"));
                }else if (value.length<8 || value.length>20){
                    callback(new Error("密码的长度必须为8~20位"));
                }
                else {
                    callback();
                }
            };
            let confirmPassword=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error("请再次输入密码"));
                }else if (value !== this.ruleForm.newPassword){
                    callback(new Error("两次输入密码不一致"));
                }else {
                    callback();
                }
            };
            return{
                ruleForm:{
                    newPassword:'',
                    confirmPassword:''
                },
                rules:{
                    newPassword:[{validator: newPassword,trigger:'blur'}],
                    confirmPassword:[{validator: confirmPassword,trigger:'blur'}]
                }
            }
        },
        methods:{
            changePassword(){
                let id = this.$store.state.user.id;
                let password = this.ruleForm.newPassword;
                let url = "/user/changePassword";
                this.$axios
                    .post(url,{
                        id: id,
                        password: password
                    })
                    .then(response => {
                        if (response.data.code === 200){
                            this.$message.success(response.data.message);
                            this.$store.commit('logout');
                            this.$router.replace({path: '/login'})
                        }
                        else {
                            this.$message.error(response.data.message);
                            this.$refs["ruleForm"].resetFields();
                        }
                    })
                    .catch(failResponse => {
                    })
            },
            reset(formName){
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .changePasswordForm{
        width: 235px;
        margin-top: 50px;
    }
    .el-button{
        margin: auto 12px;
    }
</style>