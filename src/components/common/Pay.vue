<template>
    <el-dialog
            :visible.sync="dialogVisible"
            center
    >
        <el-tabs type="border-card" v-model="type" @tab-click="get">
            <el-tab-pane label="余额支付" name="1">
                <span>支付金额：{{totalPrice}}</span>
                <el-button type="primary" @click="pay">确定付款</el-button>
            </el-tab-pane>
            <el-tab-pane label="支付宝支付" name="2">
                <div id="payDiv"></div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
    export default {
        name: "Pay",
        data(){
            return{
                dialogVisible: false,
                type: "1", /*支付方式，1表示使用余额，2表示使用支付宝*/
                totalPrice: 0,   /*支付金额*/
            }
        },
        mounted() {

        },
        methods:{
            pay(){
                if (this.type === "1"){
                    let money = this.$store.state.user.money;
                    if (money < this.totalPrice){
                        this.$message.success("支付失败!余额不足");
                    } else {
                        this.$emit("paySuccess");
                    }
                } else {
                    this.$emit("paySuccess");
                }
            },
            get(){
                if (this.type === "2"){
                    let url = "/alipay?totalAmount="+this.totalPrice+"&subject="+'二手书';
                    this.$axios
                        .post(url)
                        .then(resp => {
                            const divForm = document.getElementsByTagName('divform')
                            if (divForm.length){
                                document.body.removeChild(divForm[0]);
                            }
                            const div = document.createElement('divform')
                            div.innerHTML = resp.data;
                            document.body.appendChild(div)
                            document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
                            document.forms[0].submit()
                        })
                }
            }
        }
    }
</script>

<style scoped>
</style>