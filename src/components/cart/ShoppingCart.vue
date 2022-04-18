<template>
    <el-tabs type="border-card" v-model="index" @tab-click="getMyCart">
        <el-tab-pane label="有效" name="1">
            <el-container>
                <el-main>
                    <el-row type="flex" justify="center">
                        <cart-table ref="tableData"></cart-table>
                    </el-row>
                </el-main>
                <el-footer>
                    <el-button type="danger" @click="deleteCart" style="margin-right: 20px">删除</el-button>
                    <el-button type="primary" @click="placeOrder" style="margin-left: 20px">下订单</el-button>
                </el-footer>
            </el-container>
        </el-tab-pane>
        <el-tab-pane label="无效" name="0">
            <el-container>
                <el-main>
                    <el-row type="flex" justify="center">
                        <cart-table ref="tableData2"></cart-table>
                    </el-row>
                </el-main>
                <el-footer>
                    <el-button type="danger" @click="deleteCart">删除</el-button>
                </el-footer>
            </el-container>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import CartTable from "./CartTable";
    export default {
        name: "ShoppingCart",
        components: {CartTable},
        data() {
            return {
                index: "1"
            }
        },
        mounted: function() {
            this.getMyCart();
        },
        methods:{
            getMyCart(){
                let uid = this.$store.state.user.id;
                let status = this.index;
                let url = "/cart/getMyCart?uid="+uid+"&status="+status;
                this.$axios
                    .get(url)
                    .then(resp => {
                        if (resp && resp.status === 200){
                            if (status === "1"){
                                this.$refs.tableData.cartTable = resp.data;
                            } else {
                                this.$refs.tableData2.cartTable = resp.data;
                            }

                        }
                    });
            },
            deleteCart(){
                let selectData = this.index === "1" ? this.$refs.tableData.multipleSelection
                    : this.$refs.tableData2.multipleSelection;
                let len = selectData.length;
                let ids = [];
                for (let i=0; i<len; i++){
                    ids.push(selectData[i].id);
                }
                this.$axios
                    .post('/cart/delete',ids)
                    .then(response => {
                        if (response.data.code === 200){
                            this.$message.success(response.data.message);
                            this.getMyCart();
                        } else {
                            this.$message.error(response.data.message);
                        }
                    })
                    .catch(failResponse => {})
            },
            placeOrder(){
                /*先删除选中的订单记录*/
                let selectData =  this.$refs.tableData.multipleSelection;
                let len = selectData.length;
                let ids = [];
                for (let i=0; i<len; i++){
                    ids.push(selectData[i].id);
                }
                this.$axios
                    .post('/cart/delete',ids)
                    .then(response => {
                        if (response.data.code === 200){
                            this.getMyCart();
                        } else {
                            this.$message.error(response.data.message);
                        }
                    })
                    .catch(failResponse => {});
                /*传递选中的数据给Order，转至下订单界面*/
                this.$router.push({
                    name: 'PlaceOrders',
                    params: {
                        cartData : selectData
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>