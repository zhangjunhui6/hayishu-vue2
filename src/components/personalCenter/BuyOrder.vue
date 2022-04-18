<template>
    <el-tabs type="border-card" v-model="index" @tab-click="getBuyerOrders">
        <el-tab-pane label="待付款" name="0">
            <order ref="waitPay" @pay="pay" @deleteOrder="deleteOrder" @deleteItem="deleteItem"></order>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="1">
            <order ref="waitShip"></order>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="2">
            <order ref="waitReceipt" @receipt="receipt"></order>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="3">
            <order ref="finish" @resale="dialogVisible = true"></order>
            <el-dialog title="转售书本" :visible.sync="dialogVisible" width="30%" @close="cancel">
                <el-form>
                    <el-form-item label="售价" label-width="80px">
                        <el-input type="number" step="0.01" v-model="sellPrice"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="resale">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-tab-pane>
    </el-tabs>
</template>

<style></style>

<script>
    import Order from "./orderModel/Order";
    export default {
        components:{Order},
        data() {
            return {
                index: "0",
                dialogVisible: false,
                sellPrice: 0
            }
        },
        mounted: function () {
            this.getBuyerOrders();
        },
        methods: {
            getBuyerOrders(){
                let url = "/order/getBuyerOrders?buyerId="+this.$store.state.user.id;
                let statuses = [];
                statuses.push(parseInt(this.index));
                this.$axios
                    .post(url,statuses)
                    .then(resp => {
                        if (resp.data.code === 200){
                            switch (this.index) {
                                case "0":
                                    this.$refs.waitPay.orderInfos = resp.data.data;
                                    this.$refs.waitPay.isBuyer = 1;
                                    break;
                                case "1":
                                    this.$refs.waitShip.orderInfos = resp.data.data;
                                    this.$refs.waitShip.isBuyer = 1;
                                    break;
                                case "2":
                                    this.$refs.waitReceipt.orderInfos = resp.data.data;
                                    this.$refs.waitReceipt.isBuyer = 1;
                                    break;
                                case "3":
                                    this.$refs.finish.orderInfos = resp.data.data;
                                    this.$refs.finish.isBuyer = 1;
                                    break;
                                default:
                                    this.$message.error("获取订单信息失败");
                            }
                        } else {
                            this.$message.error("获取订单信息失败");
                        }
                    })
            },
            pay(){
                let orders = [];
                let order = this.$refs.waitPay.order;
                orders.push(order);
                this.$store.commit('setOrders',orders);
                let url = "/order/alipay?totalAmount="+order.subTotal+"&subject="+'二手书';
                this.$axios
                    .post(url,orders)
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
            },
            deleteOrder(){
                let order = this.$refs.waitPay.order;
                let param = new FormData;
                param.append("id", order.id);
                this.$axios
                    .post("/order/deleteOrder",param)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.getBuyerOrders();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            },
            deleteItem(){
                let item = this.$refs.waitPay.item;
                let param = new FormData;
                param.append("id", item.id);
                // let order = this.$refs.waitPay.order;
                this.$axios
                    .post("/order/deleteOrderItem",param)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.getBuyerOrders();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            },
            receipt(){
                let order = this.$refs.waitReceipt.order;
                let param = new FormData;
                param.append("order_id", order.id);
                param.append("order_status", "3");
                this.$axios
                    .post("/order/changeStatus",param)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.getBuyerOrders();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    })
                    .catch(error => {})
            },
            cancel(){
              this.dialogVisible = false;
            },
            resale(){
                let url = "/order/resale?sellPrice="+this.sellPrice+"&uid="+this.$store.state.user.id;
                let item = this.$refs.finish.item;
                this.$axios
                    .post(url,{
                        id: item.id,
                        bid: item.bid
                    })
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                            this.getBuyerOrders();
                            this.dialogVisible = false;
                        } else {
                            this.$message.error(resp.data.message);
                            this.dialogVisible = false;
                        }
                    })
                    .catch(error => {
                    })
            }
        }
    }
</script>
