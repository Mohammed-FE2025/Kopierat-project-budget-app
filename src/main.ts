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

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = transaction.description;

    const amountCell = document.createElement("td");
    amountCell.textContent = `$${transaction.amount}`;

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteTransaction(index);
    });

    actionCell.appendChild(deleteButton);

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(actionCell);

    transactionHistory.appendChild(row);
  });
}


function updateBalance() {
  const totalIncome = transactions.reduce((sum, transaction) => sum + (transaction.amount > 0 ? transaction.amount : 0), 0);
  const totalExpense = transactions.reduce((sum, transaction) => sum + (transaction.amount < 0 ? Math.abs(transaction.amount) : 0), 0);
  
  incomeDisplay.textContent = `Income: ${totalIncome}`;
  expenseDisplay.textContent = `Expense: ${totalExpense}`;
  
  balanceDisplay.textContent = `Balance: ${totalIncome - totalExpense}`;
}

function deleteTransaction(index: number) {
  transactions.splice(index, 1);
  updateTransactionHistory();
  updateBalance();
}
