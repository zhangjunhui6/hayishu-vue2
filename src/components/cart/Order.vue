<template>
    <div>
        <el-card shadow="hover"
                 v-for="orderItem in orderInfos"
                 :key="orderItem.id"
                 style="margin-left: 35%;width: 445px"
        >
            <div slot="header">
                <el-link
                        type="warning"
                        :underline=false
                        style="font-size: 18px;font-family: 'Microsoft YaHei', sans-serif;float: left;margin-top: -12px"
                >
                    卖家：{{orderItem.sellerName}}
                </el-link>
                <el-link
                        :underline="false"
                        style="float: right;font-size: 18px;margin-top: -12px"
                >
                    小计：￥{{orderItem.subTotal}}
                </el-link>
            </div>
            <div>
                <el-card
                        shadow="hover"
                        v-for="(item,index) in orderItem.itemInfos"
                        :key="index"
                >
                    <el-row>
                        <el-col span="6">
                            {{index+1}}
                        </el-col>
                        <el-col span="10">
                            <span>
                                {{item.title}}
                            </span>
                        </el-col>
                        <el-col span="8" style="float: right">
                            <span>
                                ￥{{item.sellPrice}}
                            </span>
                        </el-col>
                    </el-row>
                </el-card>
                <el-row style="margin-top: 15px">
                    <el-col :span="3">
                        <label>备注：</label>
                    </el-col>
                    <el-col :span="21">
                        <el-input type="textarea" v-model="orderItem.note" ></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0 -5px 0">
                    <el-col>
                        <el-link :underline=false style="float: left">订单编号:{{orderItem.id}}</el-link>
                    </el-col>
                    <el-col>
                        <el-link :underline=false style="float: right">时间:{{orderItem.time}}</el-link>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<style></style>

<script>
    export default {
        name: 'order',
        data() {
            return {
                orderInfos: [],
                total: 0
            }
        }
    }
</script>