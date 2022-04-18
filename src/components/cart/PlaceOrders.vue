<template>
    <el-container>
        <el-main>
            <order ref="orders"></order>
        </el-main>
        <el-footer>
            <el-link type="danger" :underline=false style="margin:-5px 20px 0 0;font-size: 22px">合计：{{total}}</el-link>
            <el-button type="primary" size="medium" style="margin-left: 20px" @click="pay">支付</el-button>
        </el-footer>
    </el-container>
</template>

<script>
    import Order from "./Order";
    export default {
        name: "PlaceOrders",
        components: {Order},
        data(){
            return{
                cartData: this.$route.params.cartData, /*下订单的购物车选项*/
                orderInfos: [],
                total: 0
            }
        },
        mounted: function () {
            this.createOrders();
        },
        methods:{
            createOrders(){
                let url = "/order/create?buyerId=" + this.$store.state.user.id;
                this.$axios
                    .post(url,this.cartData)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            this.orderInfos = resp.data.data;
                            this.$refs.orders.orderInfos = this.orderInfos;
                            this.total = 0;
                            for ( let i of this.orderInfos){
                                this.total = i.subTotal + this.total;
                            }
                            this.$refs.orders.total = this.total;
                        } else {
                            this.$message.error("生成订单失败!");
                        }
                    });
            },
            pay(){
                /*包括支付和添加备注信息两个功能*/
                this.orderInfos = this.$refs.orders.orderInfos;
                this.$store.commit('setOrders',this.orderInfos);
                console.log(this.$store.state.orderInfos);
                let url = "/order/alipay?totalAmount="+this.total+"&subject="+'二手书';
                this.$axios
                    .post(url,this.orderInfos)
                    .then(resp => {
                        const divForm = document.getElementsByTagName('divform')
                        if (divForm.length){
                            document.body.removeChild(divForm[0]);
                        }
                        const div = document.createElement('divform')
                        div.innerHTML = resp.data;
                        document.body.appendChild(div)
                        //document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
                        document.forms[0].submit()
                    })
            }
        }
    }
</script>

<style scoped>

</style>