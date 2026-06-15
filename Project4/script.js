const formAmount = document.getElementById("form-amount");
const balanceSpan = document.getElementById("balance-amount");
const incomeAmountSpan = document.getElementById("income-amount");
const expenseAmountSpan = document.getElementById("expense-amount");
const transactionCardContainer = document.querySelector(
  ".transaction-cards-container",
);
const formDescriptionValue = document.getElementById("form-description");
const formAmountValue = document.getElementById("form-amount");
const submitBtn = document.querySelector("button[type='submit']");
const form = document.getElementById("transaction-form");

function formatAmount(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let emptyText = null

const amountType = Object.freeze({
  INCOME: "income",
  EXPENSE: "expense",
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emptyText != null){
    emptyText.remove()
  }

  description = formDescriptionValue.value;
  amount = parseFloat(formAmountValue.value);

  let type = "";

  const newCard = document.createElement("div");
  if (amount < 0 && Math.abs(amount) <= parseFloat(balanceSpan.dataset.value)) {
    type = amountType.EXPENSE;
    newCard.classList.add("card", type);
    amount = Math.abs(amount)
  } else if (amount > 0) {
    type = amountType.INCOME;
    newCard.classList.add("card", type);
  } else if (amount === 0) {
    alert("0 Amount Transactions are not allowed");
    return
  } else {
    alert("Balance is too low for the expense");
    return
  }

  transactions.push({
    id:Date.now(),
    description,
    amount,
    type
  })
  localStorage.setItem("transactions",JSON.stringify(transactions))

  newCard.dataset.id = Date.now()

  newCard.innerHTML= `<p class="description">${description}</p>
            <p class="amount">
              <span class="transaction-amount" data-value = "${amount}">${formatAmount(amount)}</span>
              <i class="fa-solid fa-x"></i>
            </p>`

  transactionCardContainer.append(newCard)
  if (emptyText != null){
    emptyText.remove()
  }
  formDescriptionValue.value = ""
  formAmountValue.value = ""
  updateSummary(amount, type)


});

function updateSummary(amount, type){
  console.log("update function")
  if (type === amountType.EXPENSE){
    currentAmount = parseFloat(expenseAmountSpan.dataset.value)
    expenseAmountSpan.dataset.value = currentAmount + amount
    expenseAmountSpan.innerText = formatAmount(expenseAmountSpan.dataset.value)
    balanceSpan.dataset.value = parseFloat(balanceSpan.dataset.value) - amount
  }
  else if (type === amountType.INCOME){
    currentAmount = parseFloat(incomeAmountSpan.dataset.value)
    incomeAmountSpan.dataset.value = currentAmount + amount
    incomeAmountSpan.innerText = formatAmount(incomeAmountSpan.dataset.value)
    balanceSpan.dataset.value = parseFloat(balanceSpan.dataset.value) + amount
  }

  balanceSpan.innerText = formatAmount(balanceSpan.dataset.value)

}

function defaultCase(){
  console.log("default case function")
  balanceSpan.innerText = formatAmount(parseFloat(balanceSpan.dataset.value))
  incomeAmountSpan.innerText = formatAmount(parseFloat(incomeAmountSpan.dataset.value))
  expenseAmountSpan.innerText = formatAmount(parseFloat(expenseAmountSpan.dataset.value))
  if (transactions.length === 0){
    emptyText = document.createElement("div")
    emptyText.innerText = "No Transaction"
    Object.assign(emptyText.style  , {
      width : "100%",
      height : "100%",
      display :  "flex",
      justifyContent:"center",
      alignItems :"center",
      fontWeight:"600"
    })
    transactionCardContainer.appendChild(emptyText)
  }
}

function renderTransactions(){
  let balance = 0, income = 0, expense = 0
  transactions.forEach(transaction => {
    let newCard = document.createElement("div")
    newCard.classList.add("card",transaction.type)
    newCard.dataset.id = transaction.id
    newCard.innerHTML = `<p class="description">${transaction.description}</p>
            <p class="amount">
              <span class='transaction-amount' data-value='${transaction.amount}'>${formatAmount(transaction.amount)}</span>
              <i class="fa-solid fa-x"></i>
            </p>`
    transactionCardContainer.append(newCard)

    if(transaction.type === amountType.INCOME){
      income += transaction.amount
      balance += transaction.amount
    }else if(transaction.type === amountType.EXPENSE){
      expense += transaction.amount
      balance -= transaction.amount
    }
  })

  balanceSpan.dataset.value = balance
  balanceSpan.innerText = formatAmount(balance)
  incomeAmountSpan.dataset.value = income
  incomeAmountSpan.innerText = formatAmount(income)
  expenseAmountSpan.dataset.value = expense
  expenseAmountSpan.innerText = formatAmount(expense)


  defaultCase()


}


transactionCardContainer.addEventListener("click", e => {
  if(e.target.classList.contains("fa-x")){
    console.log("cross icon clicked")
    let deleteCard = e.target.closest(".card")
    let deleteAmount = parseFloat(deleteCard.querySelector(".transaction-amount").dataset.value)
    let transactionId = parseInt(deleteCard.dataset.id)
    console.log("deleteAmount", deleteAmount)
    console.log("deleteCard", deleteCard)
    if(deleteCard.classList.contains(amountType.INCOME)){
      incomeAmountSpan.dataset.value = parseFloat(incomeAmountSpan.dataset.value) - deleteAmount
      balanceSpan.dataset.value = parseFloat(balanceSpan.dataset.value) - deleteAmount
    }
    else if(deleteCard.classList.contains(amountType.EXPENSE)){
      expenseAmountSpan.dataset.value = parseFloat(expenseAmountSpan.dataset.value) - deleteAmount
      balanceSpan.dataset.value = parseFloat(balanceSpan.dataset.value) + deleteAmount
    }
    incomeAmountSpan.innerText = formatAmount(incomeAmountSpan.dataset.value)
    expenseAmountSpan.innerText = formatAmount(expenseAmountSpan.dataset.value)
    balanceSpan.innerText = formatAmount(balanceSpan.dataset.value)
    transactions = transactions.filter(t => t.id != transactionId)
    localStorage.setItem("transactions",JSON.stringify(transactions))
    deleteCard.remove()
  }

})


renderTransactions()

