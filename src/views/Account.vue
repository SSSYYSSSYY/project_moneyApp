<script>
import NavBar from '../components/NavBar.vue';
import Modal from '../components/Modal.vue';

import { mapState, mapActions } from "pinia";
import moneyStatus from "../store/moneyStatus.js";


export default {
    data() {
        return {
            isAddModalShow: false,
            isDeleteModalShow: false,
            // 狀態管理工具：pinia => 管理全域的狀態/變數
            // 以前用的是Vuex
            isIncome: false,
            isExpense: true,

            detailText: null,
            amount: null,

            details: [],
            deleteIndex: null,

            detailsPerPage: 5,//每頁顯示5筆資料
            currentPage: 1,//預設位於第1頁
            totalPage: 1,//總頁數，mounted時直接修改 
            displayDetails: [],
        }
    },
    components:{
        NavBar,
        Modal,
    },
    methods:{
        addModalHandler(){
            this.isAddModalShow = !this.isAddModalShow;
        },
        deleteModalHandler(index){
            this.isDeleteModalShow = !this.isDeleteModalShow;
            this.deleteIndex = index;
            console.log(this.deleteIndex);
        },
        switchToIncome(){
            this.isIncome = true;
            this.isExpense = false;
            const detailArea = document.querySelector(".detail-area");
            detailArea.classList.remove("expense");
            detailArea.classList.add("income");
        },
        switchToExpense(){
            this.isIncome = false;
            this.isExpense = true;
            const detailArea = document.querySelector(".detail-area");
            detailArea.classList.remove("income");
            detailArea.classList.add("expense");
        },
        addDetail(){
            if(this.detailText != null && this.amount != null){
                if(this.isExpense){
                    console.log("這是支出");
                    if(this.amount <= 0){
                        alert("請輸入正確的數值！");
                    }else{
                        this.details.unshift({
                        category: "expense",
                        text: this.detailText,
                        amount: this.amount,
                    });
                        this.setExpense(this.amount);
                        localStorage.setItem("detailsInLocal", JSON.stringify(this.details));
                        this.isAddModalShow = false;
                        this.detailText = null;
                        console.log(this.details);
                    }

                }
                if(this.isIncome){
                    console.log("這是收入");
                    if(this.amount <= 0){
                        alert("請輸入正確的數值！");
                    }else{
                        this.details.unshift({
                        category: "income",
                        text: this.detailText,
                        amount: this.amount,
                    });
                        this.setIncome(this.amount);
                        localStorage.setItem("detailsInLocal", JSON.stringify(this.details));
                        this.isAddModalShow = false;
                        this.detailText = null;
                        console.log(this.details);
                    }

                }
                this.amount = null;
                if(this.details.length % this.detailsPerPage === 0){
                    this.totalPage = this.details.length / this.detailsPerPage;
                }else{
                    this.totalPage = Math.floor(this.details.length / this.detailsPerPage) + 1;
                }
                this.displayDetails = this.details.slice(0, 5);
            }else{
                alert("請輸入資料！");
            }
        },
        ...mapActions(moneyStatus, [
            "setExpense",
            "setIncome",
            "deleteExpense",
            "deleteIncome",
            "showSavedState",
        ]),
        deleteHandler(){
            if(this.details[this.deleteIndex].category === "income"){
                //如果刪除的是收入
                this.deleteIncome(Number(this.details[this.deleteIndex].amount));
            }
            if(this.details[this.deleteIndex].category === "expense"){
                //如果刪除的是支出
                this.deleteExpense(Number(this.details[this.deleteIndex].amount));
            }
            this.details.splice(this.deleteIndex, 1);
            localStorage.setItem("detailsInLocal", JSON.stringify(this.details));
            this.isDeleteModalShow = false;
            if(this.details.length % 5 === 0)
            {
                this.currentPage--;
                this.totalPage = this.details.length / this.detailsPerPage;
            }else{
                this.totalPage = Math.floor(this.details.length / this.detailsPerPage) + 1;
            }


            if(this.currentPage === this.totalPage){
                this.displayDetails = this.details.slice((this.currentPage - 1) * 5);
            }else{
                this.displayDetails = this.details.slice((this.currentPage - 1) * 5, (this.currentPage - 1) * 5 + 5);
            }
            
        },
        prePage(){
            this.currentPage--;
            this.displayDetails = this.details.slice(5 *(this.currentPage - 1), 5 *(this.currentPage - 1) + 5);
            console.log(this.details);
            console.log(this.displayDetails);
        },
        nextPage(){
            this.currentPage++;
            this.displayDetails = this.details.slice(5 *(this.currentPage - 1), 5 *(this.currentPage - 1) + 5);
            console.log(this.details);
            console.log(this.displayDetails);
        }

    },
    computed:{
        ...mapState(moneyStatus,[
            "balance",//餘額，這是來自getter
            "expense",//支出
            "income",//收入
        ])
    },
    watch:{

    },
    mounted(){
        if(localStorage.getItem("detailsInLocal") != null){
            this.details = JSON.parse(localStorage.getItem("detailsInLocal"));
            // console.log(this.details);
        }
        this.showSavedState();

        if(this.details.length % this.detailsPerPage === 0){
            this.totalPage = this.details.length / this.detailsPerPage;
        }else{
            this.totalPage = Math.floor(this.details.length / this.detailsPerPage) + 1;
        }

        this.displayDetails = this.details.slice(0, 5);
        console.log(`當前是第${this.currentPage}頁`)
        console.log(`總共有${this.totalPage}頁`)
        console.log("此頁要顯示：");
        console.table(this.displayDetails);


        
        


    }
}
</script>

<template>
    <!-- fontawesome用 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- fontawesome用 -->



    <div class="flex">
        <Modal v-if="isAddModalShow"
        @closeModal="addModalHandler">
            <!-- 新增視窗的slot區塊 -->
            <div class="flex justify-around">
                <button @click="switchToExpense"
                class="bg-red-700 text-white px-4 py-1 "
                type="button">支出</button>
                <button @click="switchToIncome"
                class="bg-green-700 text-white  px-4 py-1 "
                type="button">收入</button>
                
            </div>
            <div class="detail-area expense p-4 rounded-md">
                <label for="detail-text">描述：</label>
                <br>
                <input v-model="detailText"
                class="w-full rounded-lg border-2 p-1"
                type="text" name="detail-text" id="detail-text">
                <br><br>
                <label for="amount">金額：</label>
                <br>
                <input v-model="amount" 
                class="w-full rounded-lg border-2 p-1"
                type="number" name="amount" id="amount">
                <button @click="addDetail"
                class="block mx-auto bg-slate-600 py-1 px-4 mt-6 rounded-md text-white"
                type="button">確定新增</button>
            </div>
            

        </Modal>

        <Modal v-if="isDeleteModalShow"
        @closeModal="deleteModalHandler">
            <!-- 刪除視窗的slot區塊 -->
        <h2 class="text-xl text-center">確定要刪除此筆紀錄嗎？</h2>
        <button 
        class="block mx-auto bg-red-600 py-1 px-4 mt-6 rounded-md text-white"
        type="button"
        @click="deleteHandler"
        >確定</button>
        </Modal>

        <NavBar />
        <div class="flex flex-col items-center w-2/3">
            <!-- 右方區塊 -->
            <div class="flex mt-20 w-80 justify-between text-xl">
                <!-- 左邊顯示收入，右邊顯示支出 -->
                <div class="text-green-700">
                    <p>收入：</p>
                    <p>${{ income }}</p>
                </div>
                <div class="text-red-700">
                    <p>支出：</p>
                    <p>${{ expense }}</p>
                </div>

            </div>
            <button 
            class="my-10 bg-slate-500 py-1 px-5 rounded-lg text-white" type="button"
            @click="addModalHandler"
            >新增收支</button>
            
            <div v-if="details.length != 0" class=" pt-3 w-80 h-96">
                <!-- 這裡是收支細項 -->
                <div class="flex p-2 rounded-lg border-2 border-slate-500 justify-between items-center my-4"
                v-for="(detail, index) in displayDetails"
                :class="{'incomeDetail': detail.category === 'income', 'expenseDetail': detail.category === 'expense'}"
                >
                <!-- 用v-for渲染 -->
                    <div 
                    class="flex justify-between items-center w-full">
                        <div class="flex justify-between w-56">
                            <p>{{ detail.text }}</p>
                            <p class="">${{ detail.amount }}</p>
                        </div>
                        <button 
                        @click="deleteModalHandler((currentPage - 1) * 5 + index)"
                        class="bg-slate-500 py-1 px-4 rounded-lg text-white " type="button">刪除</button>
                    </div>
                        

                </div>
            </div>
            <div class="text-slate-600" v-if="details.length > 5">
                <!-- 翻頁按鈕區 -->
                <button @click="prePage"
                class="pre-page"
                :class="{'text-slate-300': currentPage == 1}"
                :disabled="currentPage == 1"
                type="button">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
                <button @click="nextPage"
                class="next-page"
                :class="{'text-slate-300': currentPage == totalPage}"
                :disabled="currentPage == totalPage"
                type="button">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.expense{
    border: rgb(255, 205, 205) 2px solid;
}

.income{
    border: rgb(187, 255, 187) 2px solid;
}

.incomeDetail{
    color: rgb(21, 128, 61);
}
.expenseDetail{
    color: rgb(185, 28, 28);
}



</style>