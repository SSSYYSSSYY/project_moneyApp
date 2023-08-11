<script>
import { mapState, mapActions } from "pinia";
import moneyStatus from "../store/moneyStatus.js";
export default {
    data() {
        return {
            accountName: null,
        }
    },
    computed:{
        ...mapState(moneyStatus,[
            "balance",
        ])
    },
    methods: {
        getAccountName(){
            this.accountName = localStorage.getItem("accountName");
        }
    },
    mounted(){
        this.getAccountName();
    }
}
</script>

<template>
    <div class="p-10 text-center w-1/3 bg-slate-500 h-screen text-white">
        <h2 class="text-2xl my-20">個人記帳本</h2>
        <h3 class="my-10 text-3xl">{{ accountName }}</h3>
        <div class="">
            <p class="text-center my-2">目前餘額：</p>
            <p 
            :class="{'text-red-200': Number(balance) < 0, 'text-green-200': Number(balance) > 0}"
            class="text-2xl text-center">${{ balance }}</p>
            <!-- 這裡之後改成嵌入金額 -->
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>