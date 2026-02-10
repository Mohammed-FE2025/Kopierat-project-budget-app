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
form?.addEventListener("submit", function(event) {
  event.preventDefault();
  addTransaction();
});

function addTransaction() {
  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  
  if (description === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    description,
    amount
  };

  transactions.push(transaction);
  updateTransactionHistory();
  updateBalance();
}

function updateTransactionHistory() {
  transactionHistory.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("tr");
    const descriptionCell = document.createElement("td");
    const amountCell = document.createElement("td");
    descriptionCell.textContent = transaction.description;
    amountCell.textContent = `$${transaction.amount}`;
    li.appendChild(descriptionCell);
    li.appendChild(amountCell);
    transactionHistory.appendChild(li);
  });
}

function updateBalance() {
  const totalIncome = transactions.reduce((sum, transaction) => sum + (transaction.amount > 0 ? transaction.amount : 0), 0);
  const totalExpense = transactions.reduce((sum, transaction) => sum + (transaction.amount < 0 ? Math.abs(transaction.amount) : 0), 0);
  
  incomeDisplay.textContent = `Income: ${totalIncome}`;
  expenseDisplay.textContent = `Expense: ${totalExpense}`;
  
  balanceDisplay.textContent = `Balance: ${totalIncome - totalExpense}`;
}
