//Getting both values of transaction and balance
const balanceElement = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));



let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions: [];
// add transaction
function addTrans(e){
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() ===''){
    alert('Transaction amount needs to be added');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }
    transactions.push(transaction);

    addtransaction(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }

}
//generate rand id
function generateID(){
  return Math.floor(Math.random() * 100000000);
}

// aadd transactions to dom list
function addtransaction(transaction){
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';
const item = document.createElement('li');
// add class based on value
item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
item.innerHTML = `
${transaction.text} <span>${sign}${Math.abs(transaction.amount
  )}</span> <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>
`;
list.appendChild(item);
}
// update the balance , income and expense
function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item), 0)
                    .toFixed(2);
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0)* -1
    ) .toFixed(2);                 

    balanceElement.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}
// remove transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  
  init();
}
// update local storage transactions
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
//init app
function init(){
list.innerHTML = '';
transactions.forEach(addtransaction);
updateValues();


}
init();

form.addEventListener('submit', addTrans);

//updating the balance after pressing the submit button
/*form.addEventListener("submit", function(event) {
  event.preventDefault();
  const transaction = parseFloat(transactionElement.value);
  const transactionName = transactionNameElement.value;
  if (balance + transaction < 0) {
    alert("Transaction amount exceeds current balance. Transaction canceled.");
  } else {
    balance += transaction;
    balanceElement.textContent = balance;
    transactionHistory.push({ name: transactionName, amount: transaction });
    displayTransactionHistory();
    //Updating the transaction box to be empty after the submision
    transactionElement.value = "";
    transactionNameElement.value = "";
  }
});

function displayTransactionHistory() {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";
  transactionHistory.slice().reverse().forEach(transaction => { 
    const transactionItem = document.createElement("li");
    const transactionName = transaction.name ;
    const transactionAmount = transaction.amount.toFixed(2);
    transactionItem.textContent = `${transactionName}: $${transactionAmount}`;
    transactionList.appendChild(transactionItem);
  });
}
*/
