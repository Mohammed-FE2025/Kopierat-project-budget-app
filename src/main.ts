// @ts-nocheck
import './style.css'
const form = document.querySelector("form");

const descriptionInput = document.getElementById(
  "transactionDescreption"
) as HTMLInputElement;

const amountInput = document.getElementById(
  "transactionAmount"
) as HTMLInputElement;

const balanceDisplay = document.getElementById("balanceDisplay")!;
const incomeDisplay = document.getElementById("incomeDisplay")!;
const expenseDisplay = document.getElementById("expenseDisplay")!;

const transactionHistory = document.getElementById("transactionHistory")!;
const transactions = [];

