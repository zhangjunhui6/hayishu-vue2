<template>
    <el-container>
        <el-header></el-header>
        <el-main>
            <span style="font-size: large;margin-right: 20px;">余额：{{money}}</span>
            <el-button type="primary" size="medium" @click="dialogVisible = true">提现</el-button>
            <el-dialog
                    title="提现"
                    :visible.sync="dialogVisible"
                    width="30%"
            >
                <el-input type="number" step="0.01" style="width: 75%" placeholder="请输入提现金额..." v-model="amount"></el-input>
                <span slot="footer">
                    <el-button type="primary" @click="withdraw" style="margin-right: 10%">确定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                money: 0,
                dialogVisible: false,
                amount: ''
            }
        },
        mounted: function(){
            this.getMyMoney();
        },
        methods: {
            getMyMoney(){
                let id = this.$store.state.user.id;
                let url = "/user/getMoney?id="+id;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp.status === 200){
                            this.money = resp.data;
                        }
                    })
            },
            withdraw(){
                if (parseFloat(this.amount) < 0){
                    this.$message.warning("输入的金额不能为负数!");
                } else if (parseFloat(this.amount) > parseFloat(this.money)){
                    this.$message.error("余额不足，无法提现!");
                } else {
                    this.$axios
                        .post("/user/setMoney",{
                            id: this.$store.state.user.id,
                            money: this.money-this.amount
                        })
                        .then(resp => {
                            if (resp.data.code === 200){
                                this.$message.success(resp.data.message);
                                this.getMyMoney();
                                this.dialogVisible = false;
                                this.amount = '';
                            } else {
                                this.$message.error(resp.data.message);
                            }
                        })
                }
            }
        }
    }
</script>