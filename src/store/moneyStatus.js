import { defineStore } from "pinia";

export default defineStore("moneyStatus", {
    state: () => ({
        income: 0,
        expense: 0,
        accountName: null,
    }),
    getters: {
        balance: (state) => (state.income - state.expense),

    },
    actions: {
        setIncome(incomeFromUser){
            this.income += incomeFromUser;
            localStorage.setItem("income", this.income);
            
        },
        setExpense(expenseFromUser){
            this.expense += expenseFromUser;
            localStorage.setItem("expense", this.expense);
            
        },
        deleteIncome(deleteIncomeAmount){
            this.income = this.income - deleteIncomeAmount;
            localStorage.setItem("income", this.income);
        },
        deleteExpense(deleteExpenseAmount){
            this.expense = this.expense- deleteExpenseAmount;
            localStorage.setItem("expense", this.expense);
        },
        showSavedState(){
            // 避免在重整時，餘額、支出、收入也被重置
            if(localStorage.getItem("income") != null){
                this.income = parseInt(localStorage.getItem("income"));
            }
            if(localStorage.getItem("expense") != null){
                this.expense = parseInt(localStorage.getItem("expense"));
            }
        },

    },
});