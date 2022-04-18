<template>
    <div>
        <el-table
                :data="cartTable"
                :default-sort = "{prop: 'id',order:'ascending'}"
                @selection-change="changeSelect"
        >
            <el-table-column
                    type="selection"
                    header-align="center"
                    width="150%"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="卖家"
                    header-align="center"
                    width="150%"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="text" style="font-size: 16px" @click="goToCenter(scope.row.uid)">{{scope.row.name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="书本"
                    header-align="center"
                    align="center"
                    width="200%"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <span>作者：{{scope.row.author}}</span>
                        <p>出版社：{{scope.row.press}}</p>
                        <p>ISBN：{{scope.row.isbn}}</p>
                        <p>原价：{{scope.row.price}}</p>
                        <p>新旧：{{scope.row.degree}}</p>
                        <div slot="reference">
                            <el-tag size="medium">{{scope.row.title}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sellPrice"
                    width="150%"
                    label="售价"
                    header-align="center"
                    align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<style></style>

<script>
    export default {
        data() {
            return {
                cartTable: [],
                multipleSelection:[],
            }
        },
        methods: {
            changeSelect(val){
                this.multipleSelection = val;
                console.log(val);
            },
            goToCenter(id){
                this.$router.push({
                    name: 'UserCenter',
                    params: {
                        id: id
                    }
                })
            }
        }
    }
</script>