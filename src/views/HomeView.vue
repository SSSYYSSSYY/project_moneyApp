<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "../components/NavBar.vue";
export default {
    data() {
        return {
            account: null,
            password: null,
        }
    },
    components:{
        NavBar,
    },
    methods: {
        // 若當前瀏覽器有這組key-value，
        // 則前往/account頁面
        login(){
            if(this.account === null || this.password === null){
                alert("請輸入帳號及密碼！");
            }else if(localStorage.getItem(this.account) === this.password){
                this.$router.push("/account");
            }else{
                alert("帳號或密碼輸入錯誤！");
            }

        }
    }
}
</script>

<template>
    <div class="w-80 mx-auto my-32 p-5 box-border">
        <h1 class="text-2xl text-center my-5 text-slate-600 font-bold">個人記帳本</h1>
        <div class="mb-5">
            <label for="account">帳號：</label>
            <br>
            <input v-model="account"
            class="block border-2 w-full rounded-md"
            type="text" name="account" id="account">
        </div>
        <div class="mb-5">
            <label for="password">密碼：</label>
            <br>
            <input v-model="password"
            class="block border-2 w-full rounded-md"
            type="password" name="password" id="password">
        </div>
        <div class="flex justify-around items-center mt-10">
            <RouterLink 
            class="bg-slate-400 px-6 py-1 text-white rounded-lg"
            to="/sign-up">註冊</RouterLink>
            <button type="button" @click="login"
            class="bg-slate-600 px-6 py-1 text-white rounded-lg"
            to="/account">登入</button>
        </div>
    </div>

</template>

<style lang='scss' scoped>

</style>