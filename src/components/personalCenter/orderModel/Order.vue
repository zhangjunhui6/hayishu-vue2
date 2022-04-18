<template>
    <div>
        <el-card shadow="hover"
                 v-for="orderItem in orderInfos"
                 :key="orderItem.id"
                 style="width: 445px;float: left;margin: 10px 20px"
        >
            <div slot="header">
                <el-link
                        type="warning"
                        :underline=false
                        style="font-size: 16px;font-family: 'Microsoft YaHei', sans-serif;float: left;margin-top: -12px"
                >
                    <span v-if="isBuyer === 1">卖家：</span>
                    <span v-else>买家：</span>
                    {{orderItem.sellerName}}
                </el-link>
                <el-button
                        v-if="isBuyer===1 && orderItem.status === 0"
                        type="primary" size="mini" @click="pay(orderItem)"
                        style="float: right;font-size: 14px;margin-top: -16px">
                    支付
                </el-button>
                <el-link
                        :underline="false"
                        style="float: right;font-size: 16px;margin-top: -12px;margin-right: 20px"
                >
                    合计：￥{{orderItem.subTotal}}
                </el-link>
            </div>
            <div>
                <el-card
                        shadow="hover"
                        v-for="(item,index) in orderItem.itemInfos"
                        :key="index"
                >
                    <el-row>
                        <el-col span="10">
                            <span>
                                {{item.title}}
                            </span>
                        </el-col>
                        <el-col span="8">
                            <span>
                                ￥{{item.sellPrice}}
                            </span>
                        </el-col>
                        <el-col span="6">
                            <el-button v-if="isBuyer===1 && orderItem.status === 0" type="text" @click="deleteItem(item,orderItem)" style="margin-top: -10px">
                                移除
                            </el-button>
                            <el-button v-else-if="isBuyer===1 && orderItem.status === 3 && item.isResale === 0" type="text" @click="resale(item)" style="margin-top: -10px">
                                转售
                            </el-button>
                            <el-button v-else-if="isBuyer === 1 && orderItem.status === 3 && item.isResale === 1" type="text" disabled="true" style="margin-top: -10px" >
                                已转售
                            </el-button>

                        </el-col>
                    </el-row>
                </el-card>
                <el-row style="margin-top: 15px">
                    <el-col :span="3">
                        <label>备注：</label>
                    </el-col>
                    <el-col :span="21">
                        <el-input type="textarea" v-model="orderItem.note" :disabled="isBuyer===0 || orderItem.status !== 0"></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0 -5px 0">
                    <el-col :span="18">
                        <el-link :underline=false style="float: left">订单编号:{{orderItem.id}}</el-link>
                        <el-link :underline=false style="float: left">时间:{{orderItem.time}}</el-link>
                    </el-col>
                    <el-col :span="6">
                        <el-button v-if="isBuyer===1 && orderItem.status === 0"  type="danger" size="medium" @click="deleteOrder(orderItem)">删除订单</el-button>
                        <el-button v-else-if="isBuyer===1 && orderItem.status === 2" type="primary" size="medium" @click="receipt(orderItem)">确定收货</el-button>
                        <el-button v-else-if="isBuyer!==1 && orderItem.status === 1" type="primary" size="medium"  @click="ship(orderItem)">发货</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                orderInfos: [],
                isBuyer: 1,  /*判断是否为买家，1:是，0:否*/
                order:{},
                item:{}
            }
        },
        methods: {
            pay(order){
                this.order = order;
                this.$emit("pay");
            },
            deleteItem(item,order){
                this.item = item;
                this.order = order;
                this.$emit("deleteItem");
            },
            deleteOrder(order){
                this.order = order;
                this.$emit("deleteOrder");
            },
            ship(order){
                this.order = order;
                this.$emit("ship");
            },
            receipt(order){
                this.order = order;
                this.$emit("receipt");
            },
            resale(item){
                this.item = item;
                this.$emit("resale");
            }
        }
    }
</script>