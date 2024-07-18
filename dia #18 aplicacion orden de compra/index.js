let totalAmount =   document.getElementById("total-amount");
let userAmount  =  document.getElementById("user-amount");
const   checkAmountButton    =  document.getElementById("check-amount");
const   totalAmountButton    =  document.getElementById("total-amount-button");
const   productTitle    =  document.getElementById("product-title");
const   errorMessage    =  document.getElementById("budget-error");
const   productTitleError  =  document.getElementById("product-title-error");
const   productCostError    =  document.getElementById("product-cost-error");
const   amount  =  document.getElementById("amount");
const   expenditureValue    =   document.getElementById("expenditure-value");
const   balanceValue    =  document.getElementById("balance-amount");
const   list    =   document.getElementById("list");
let tempAmount  =   0;

// Set  Budget   Functions

totalAmountButton.addEventListener("click", ()  =>{
    tempAmount  =   totalAmount.value;
    // BAD INPUT
    if(tempAmount   === ""  ||  tempAmount  <   0){
        errorMessage.classList.remove("hide");
    }else{
        errorMessage.classList.add("hide");
        // SET  BUDGET
        amount.innerHTML    =   tempAmount;
        balanceValue.innerText  =   tempAmount  -   expenditureValue.innerText;
        // Clear    Input
        totalAmount.value   =   "";
    }
});

// Disable Edit    And Delete  Button  Function

const   disableButtons  =   (bool)  =>{
    let editButton =   document.getElementsByClassName("edit");
    Array.from(editButton).forEach((element)   =>{
        element.disabled    =   bool;
    });
};

// Modify   List    Elements    Function

const   modifyElement   =   (element,   edit    =   false)  =>{
    let parentDiv   =   element.parentElement;
    let currentBalance  =   balanceValue.innerText;
    let currentExpense  =   expenditureValue.innerText;
    let parentAmount    =   parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText  =   parentDiv.querySelector(".product").innerText;
        productTitle.value  =   parentText;
        userAmount.value    =   parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText  =   parseInt(currentBalance)    +   parseInt(parentAmount);
    expenditureValue.innerText  =   parseInt(currentExpense)    -   parseInt(parentAmount);
    parentDiv.remove();
};

// Create   List    Function

const   listCreator =   (expenseName,   expenseValue)   =>{
    let subListContent  =   document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML    =   `<p class="product">${expenseName}</p><p    class="amount">${expenseValue}</p>`;
    let editButton  =   document.createElement("button");
    editButton.classList.add("fa-solid",    "fa-pen-to-square", "edit");
    editButton.style.fontSize   =   "1.2em";
    editButton.addEventListener("click",    ()  =>{
        modifyElement(editButton,   true);
    });
    let deleteButton    =   document.createElement("button");
    deleteButton.classList.add("fa-solid",  "fa-trash-can", "delete");
    deleteButton.style.fontSize =   "1.2em";
    deleteButton.addEventListener("click",  ()  =>{
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

// ADD  EXPENSES    FUN FUNCTION

checkAmountButton.addEventListener("click", ()  =>{
    // CHECK    EMPTY
    if(!userAmount.value    ||  !productTitle.value){
        productTitleError.classList.remove("hide");
        return  false;
    }
    // ENABLE  BUTTONS
    disableButtons(false);
    // EXPENSE
    let expenditure =   parseInt(userAmount.value);
    // TOTAL    EXPENSE (EXISTING   +   NEW)
    let sum =   parseInt(expenditureValue.innerText)    +   expenditure;
    expenditureValue.innerText  =   sum;
    // TOTAL    BALANCE =   BUDGE   -   TOTAL   EXPENSE
    const   totalBalance    =   tempAmount  -   sum;
    balanceValue.innerText  =   totalBalance;
    // CREATE   LIST
    listCreator(productTitle.value, userAmount.value);
    // CLEAR    INPUTS
    productTitle.value  =   "";
    userAmount.value    =   "";
});