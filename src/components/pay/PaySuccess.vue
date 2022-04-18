<template>
    <div>
    </div>
</template>

<style></style>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted:function () {
            this.paySuccess();
        },
        methods: {
            paySuccess(){
                let orderInfos = this.$store.state.orderInfos;
                this.$axios
                    .post("/order/paySuccess",orderInfos)
                    .then(resp => {
                        if (resp.data.code === 200){
                            this.$message.success(resp.data.message);
                        } else {
                            this.$message.error("错误!")
                        }
                        this.$router.replace("/index");
                    })
            }
        }
    }
</script>