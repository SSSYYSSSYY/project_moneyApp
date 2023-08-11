<script>
import { mapState, mapActions } from "pinia";
import moneyStatus from "../store/moneyStatus.js";
export default {
    data() {
        return {
            account: null,
            password: null,
            repeatPassword: null,
            isAlertMsgShow: false,
        }
    },
    methods: {
        checkRepeatPassword(){
            if(this.password != this.repeatPassword){
                this.isAlertMsgShow = true;
            }else{
                this.isAlertMsgShow = false;
            }
        },
        setAccountAndPassword(){
            if(this.isAlertMsgShow){
                alert("請確定密碼輸入正確！");
            }else{
                if(this.account != null && this.password != null && this.repeatPassword != null){
                    console.log(this.account, this.password);
                    localStorage.setItem(this.account, this.password);
                    localStorage.setItem("accountName", this.account);
                    alert("註冊成功！畫面將自動進行跳轉");
                    this.$router.push("/");
                }else{
                    alert("請輸入資料！");
                }
            }
        },
    },

}
</script>

<template>
    <div class="w-full h-screen bg-slate-500 py-32 text-white">
        <div class="w-80 mx-auto p-5 box-border">
            <h2 class="text-2xl text-center my-5 font-bold ">註冊帳號</h2>
            <div class="mb-5">
            <label for="account">帳號：</label>
            <br>
            <input v-model="account"
            class="block border-2 w-full rounded-md text-slate-600 p-1"
            type="text" name="account" id="account">
        </div>
        <div class="mb-5">
            <label for="password">密碼：</label>
            <br>
            <input v-model="password"
            @change="checkRepeatPassword"
            class="block border-2 w-full rounded-md  text-slate-600 p-1"
            type="password" name="password" id="password">
        </div>
        <div class="mb-5">
            <label for="repeatPassword">確認密碼：</label>
            <br>
            <input v-model="repeatPassword" @change="checkRepeatPassword"
            class="block border-2 w-full rounded-md  text-slate-600 p-1"
            type="password" name="repeatPassword" id="repeatPassword">
            <p v-if="isAlertMsgShow" class="my-1 text-sm text-red-100">輸入的密碼不符！</p>
        </div>
        <div class="flex justify-around items-center mt-10">
            <RouterLink 
            class="bg-slate-400 px-6 py-1 text-white rounded-lg"
            to="/">取消</RouterLink>
            <button type="button" @click="setAccountAndPassword"
            class="bg-white text-slate-600 px-6 py-1 rounded-lg"
            >註冊</button>
            <!-- 給註冊按鈕綁上@click，
            使其將帳號密碼存到localStorage -->
        </div>
        </div>
    </div>
</template>

<style scoped>

</style>