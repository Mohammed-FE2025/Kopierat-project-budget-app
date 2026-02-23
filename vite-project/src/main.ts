import './style.css'
type Transaction = {
description: string;
amount: number;
}
const form = document.querySelector("form") as HTMLElement;

const descriptionInput = document.getElementById(
  "transactionDescreption"
) as HTMLInputElement;

const amountInput = document.getElementById(
  "transactionAmount"
) as HTMLInputElement;

const balanceDisplay = document.getElementById("balanceDisplay") as HTMLElement;


const transactionHistory = document.getElementById("transactionHistory") as HTMLElement;
const transactions: Transaction[] = JSON.parse(
  localStorage.getItem("transactions") || "[]"
);

form.addEventListener("submit", function(event) {
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
  saveToLocalStorage();
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
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpense;


  balanceDisplay.textContent = `$${balance}`;

  console.log("Balance:", balance);

  if (balance > 0) {
    balanceDisplay.style.backgroundColor = "green";
  } else if (balance < 0) {
    balanceDisplay.style.backgroundColor = "red";
  } else {
    balanceDisplay.style.backgroundColor = "gray";
  }
}


function deleteTransaction(index: number) {
  transactions.splice(index, 1);
  saveToLocalStorage(); 
  updateTransactionHistory();
  updateBalance();
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

updateTransactionHistory();
updateBalance();
