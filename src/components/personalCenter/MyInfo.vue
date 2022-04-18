<template>
    <el-row type="flex" justify="center">
        <el-form :model="infoForm" ref="infoForm" label-width="80px">
            <h3 style="color: cornflowerblue">我的信息</h3>
            <el-form-item label="手机号">
                <span style="font-size: 15px">{{this.$store.state.user.id}}</span>
            </el-form-item>
            <el-form-item label="昵称">
                <span style="font-size: 15px">{{this.$store.state.user.name}}</span>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="infoForm.sex" clearable filterable>
                    <el-option
                            v-for="item in sexSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址">
                <el-input type="text" v-model="infoForm.addr"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="changeInfo" type="primary" @click="setInfo">修改信息</el-button>
                <el-button @click="cancel">取消修改</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    export default {
        name: "Info",
        data(){
            return{
                infoForm:{
                    sex: "",
                    addr: "",
                },
                sexSelect:[
                    {label: "男",value: "男"},
                    {label: "女",value: "女"},
                ]
            }
        },
        mounted: function(){
            this.getInfo()
        },
        methods:{
            getInfo(){
                let url = '/user/getInfo?id=' + this.$store.state.user.id;
                this.$axios
                    .get(url)
                    .then(response => {
                        if (response && response.status === 200){
                            this.infoForm = response.data;
                        } else {
                            this.$message.error("查找用户信息失败!");
                        }
                    });
            },
            setInfo(){
                this.$axios
                    .post('/user/setInfo',{
                        id: this.$store.state.user.id,
                        sex: this.infoForm.sex,
                        addr: this.infoForm.addr
                    })
                    .then(response => {
                        if (response.data.code === 200){
                            this.$message.success(response.data.message);
                        }else {
                            this.$message.error(response.data.message);
                            this.getInfo();
                        }
                    })
            },
            cancel(){
                this.getInfo();
            }
        }
    }
</script>

<style scoped>

</style>