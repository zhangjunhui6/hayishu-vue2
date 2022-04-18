<template>
    <el-tabs type="border-card" v-model="index" @tab-click="getSellerOrders">
        <el-tab-pane label="待发货" name="1">
            <order ref="waitShip" @ship="ship"></order>
        </el-tab-pane>
        <el-tab-pane label="待买家收货" name="2">
            <order ref="waitReceipt"></order>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="3">
            <order ref="finish"></order>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Order from "./orderModel/Order";
    export default {
        name: "",
        components:{Order},
        data(){
            return{
                index: "1",
            }
        },
        mounted: function(){
          this.getSellerOrders();
        },
        methods: {
            getSellerOrders(){
                let url = "/order/getSellerOrders?sellerId="+this.$store.state.user.id;
                let statuses = [];
                statuses.push(parseInt(this.index));
                this.$axios
                    .post(url,statuses)
                    .then(resp => {
                        if (resp.data.code === 200){
                            switch (this.index) {
                                case "1":
                                    this.$refs.waitShip.orderInfos = resp.data.data;
                                    this.$refs.waitShip.isBuyer = 0;
                                    break;
                                case "2":
                                    this.$refs.waitReceipt.orderInfos = resp.data.data;
                                    this.$refs.waitReceipt.isBuyer = 0;
                                    break;
                                case "3":
                                    this.$refs.finish.orderInfos = resp.data.data;
                                    this.$refs.finish.isBuyer = 0;
                                    break;
                                default:
                                    this.$message.error("获取订单信息失败");
                            }
                        } else {
                            this.$message.error("获取订单信息失败");
                        }
                    })
            },
            ship(){
                let order = this.$refs.waitShip.order;
                let param = new FormData();
                param.append("order_id", order.id);
                param.append("order_status", "2");
                this.$axios
                    .post("/order/changeStatus",param)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.getSellerOrders();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            }
        }
    }
</script>

<style scoped>

</style>