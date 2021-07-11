"use strict";
createUserNames(accounts);


// !! ********************* DOM Manipulation Functions *********************** 




//FIX: Display movements in Movment Box
const displayMovements = function (account, sort = false) {
    movBox.innerHTML = " ";
    const sMovements = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

    sMovements.forEach(function (val, i) {
        const type = val > 0 ? "deposit" : "withdrawl";
        const eachDate = new Date(account.movementsDates[i]);
        const displayDate = formattedDate(eachDate, currentUser.locale);
        const formatVal = formattedCurrency(val, account.locale, account.currency);
        const html = `
        <div class="row movements text-uppercase">
            <p class="${type}_type">${i+1} ${type}</p>
            <p class = "mov_date" > ${displayDate}</p>
            <p class="mov_value">${formatVal}</p>
        </div>`;
        movBox.insertAdjacentHTML("afterbegin", html);

    });
}


//FIX: display intro message
const displayIntro = function () {
    introMsg.textContent = `Hi, ${currentUser.owner}`
    introMsg.style.color = "inherit";

}

// FIX:  Display Current Balance
const calcDisplayCurrBalance = function (account) {
    account.balance = account.movements.reduce((acc, val) => acc + val, 0);
    curBalance.textContent = formattedCurrency(account.balance, account.locale, account.currency);;
    const nowDate = new Date();
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",

    };
    currDate.textContent = new Intl.DateTimeFormat(currentUser.locale, options).format(Number(nowDate));
}



// FIX:  Display Summary Deatails
const calcDisplaySummary = function (account) {
    const inBalance = account.movements.filter(val => val > 0)
        .reduce((acc, val) => acc + val, 0);

    const outBalance = account.movements.filter(val => val < 0)
        .reduce((acc, val) => acc + val, 0);

    const interestBalance = account.movements.filter(val => val > 0)
        .map(val => val * (account.interestRate / 100))
        .filter(val => val >= 1)
        .reduce((acc, val) => acc + val, 0);
    inVal.textContent = formattedCurrency(inBalance, account.locale, account.currency);
    outVal.textContent = formattedCurrency(outBalance, account.locale, account.currency);
    interestVal.textContent = formattedCurrency(interestBalance, account.locale, account.currency);
}


// FIX:  display main content function
const updateMainContent = function (currentUser) {
    // Display movents
    displayMovements(currentUser)

    // Display Balance
    calcDisplayCurrBalance(currentUser);

    // Display Summary
    calcDisplaySummary(currentUser);
}

let currentUser, timer;

// FIX:  Event on login button
loginBtn.addEventListener("click", function (event) {
    //  prevent the default behaviour of form submitting  
    event.preventDefault();

    currentUser = accounts.find(val => val.userName === userInput.value);

    if (currentUser && currentUser.pin === Number(inputPin.value)) {
        // Display UI and message
        displayIntro();

        mainContent.style.opacity = 100;
        userInput.value = inputPin.value = '';
        inputPin.blur();

        //display Main Content 
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
        updateMainContent(currentUser);

    } else {
        introMsg.textContent = `Wrong Credentials 😭`;
        introMsg.style.color = "red";
        mainContent.style.opacity = 0;
        userInput.value = inputPin.value = '';
        inputPin.blur();
    }

});

// FIX: Event on transfer input field

transferMoneyto.addEventListener('click', function () {
    if (window.innerWidth > 991) {
        document.querySelector(".transfer").textContent = "Transfer to";
        document.querySelector(".transfer").style.color = "inherit";
        document.querySelector(".amount1").textContent = "Amount";
    } else if (window.innerWidth <= 991) {
        document.querySelector(".transfer").style.display = "none";
    }
});


//FIX Event on transfer money 
transferBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const reciever = accounts.find(val => val.userName === transferMoneyto.value);
    const amount = Number(transferAmount.value);


    transferMoneyto.value = transferAmount.value = "";
    transferAmount.blur();

    console.log(reciever, amount);
    console.log(reciever && amount > 0 && currentUser.balance >= amount && reciever.userName !== currentUser.userName);
    if (reciever && amount > 0 && currentUser.balance >= amount && reciever.userName !== currentUser.userName) {
        reciever.movements.push(amount);
        currentUser.movements.push(-amount);

        currentUser.movementsDates.push(new Date().toISOString());
        reciever.movementsDates.push(new Date().toISOString());
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        updateMainContent(currentUser);
    } else if (amount < 0 || currentUser.balance < amount) {
        document.querySelector(".transfer").style.display = "inline";
        document.querySelector(".transfer").style.fontSize = "14px";
        document.querySelector(".transfer").textContent = "Invalid entered amount!";
        document.querySelector(".transfer").style.color = "rgb(105, 16, 16)";
        document.querySelector(".amount1").textContent = "";
    } else {
        document.querySelector(".transfer").style.display = "inline";
        document.querySelector(".transfer").style.fontSize = "14px";
        document.querySelector(".transfer").textContent = "User not fond";
        document.querySelector(".transfer").style.color = "rgb(105, 16, 16)";
        document.querySelector(".amount1").textContent = "";
    }
});

//FIX: Event on close acount inputField
confirmUser.addEventListener('click', function () {
    if (window.innerWidth > 991) {
        document.querySelector(".conf_user").textContent = "Confirm User";
        document.querySelector(".conf_user").style.color = "inherit";
        document.querySelector(".conf_pin").textContent = "Confirm Pin";
    } else if (window.innerWidth <= 991) {
        document.querySelector(".conf_user").style.display = "none";
    }
})


//FIX Event on close account 
closeBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const user = confirmUser.value;
    const pin = Number(confirmPin.value);

    confirmUser.value = confirmPin.value = "";
    confirmPin.blur();

    if (currentUser.userName === user && currentUser.pin === pin) {

        const index = accounts.findIndex(val => val.userName === user)
        accounts.splice(index, 1);
        mainContent.style.opacity = 0;
        introMsg.textContent = "Log in to get started";

    } else {
        document.querySelector(".conf_user").style.display = "inline";
        document.querySelector(".conf_user").style.fontSize = "14px";
        document.querySelector(".conf_user").textContent = "Wrong Credentials!";
        document.querySelector(".conf_user").style.color = "rgb(105, 16, 16)";
        document.querySelector(".conf_pin").textContent = "";
    }
});
// FIX: Event on request input field
requestAmount.addEventListener('click', function () {
    if (window.innerWidth > 991) {
        document.querySelector(".amount2").textContent = `Amount`
        document.querySelector(".amount2").style.color = "inherit";
        document.querySelector(".amount2").style.fontSize = "14px";
    } else if (window.innerWidth <= 991) {
        document.querySelector(".amount2").style.display = "none";
    }

});

//FIX: Event on request loan
loanBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const amount = Number(requestAmount.value);
    requestAmount.value = "";
    requestAmount.blur();

    if (amount > 0 && currentUser.movements.some(val => val >= amount * 0.1)) {
        setTimeout(function () {
            currentUser.movements.push(amount);
            currentUser.movementsDates.push(new Date().toISOString());
            updateMainContent(currentUser);
            if (timer) clearInterval(timer);
            timer = startLogOutTimer();
        }, 6000);

    } else {
        if (window.innerWidth < 991) document.querySelector(".amount2").style.display = "inline";
        document.querySelector(".amount2").style.fontSize = "14px";
        document.querySelector(".amount2").textContent = `You don't have any large deposit😭`
        document.querySelector(".amount2").style.color = "rgb(105, 16, 16)";
        document.querySelector(".amount2").style.fontSize = "14px";
    }
});

let sortState = false;
// FIX: Event on sort
sortBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayMovements(currentUser, !sortState);
    sortSign.textContent = ` ${!sortState ? "↓":"↑"}`;
    sortVal.textContent = ` ${!sortState ? "Un-Sort":"Sort"}`;
    sortState = !sortState;
});


// Fix: Logout Timer Implementation function

const startLogOutTimer = function () {
    let time = 600;

    const tickTock = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        timeVal.textContent = `${min}:${sec}`;

        if (time === 0) {
            clearInterval(logTimer);
            introMsg.textContent = "Log in to get started";
            mainContent.style.opacity = 0;
        }
        time--;
    }
    tickTock();
    const logTimer = setInterval(tickTock, 1000);
    return logTimer;
}

// FIX: Dark/light Mode Implementation
mode.addEventListener("click", function (e) {
    e.preventDefault();

    let currMode = mode.classList.contains("LIGHT") ? "light" : "dark";

    if (currMode === "light") {
        mode.classList.replace("LIGHT", "DARK");
        mode.innerHTML = `<i class="fas fa-sun sun" id="icon" data-toggle="tooltip" data-placement="bottom" title="Light Mode"></i> `;

        body.style.backgroundColor = "rgba(0, 0, 0, 0.829)";
        body.style.color = introMsg.style.color = document.querySelector(".sun").style.color = "white";
        logo.src = "img/icon.png";

    } else if (currMode == "dark") {
        mode.classList.replace("DARK", "LIGHT");
        mode.innerHTML = `<i class="far fa-moon moon" id="icon" data-toggle="tooltip" data-placement="bottom" title="Dark Mode"></i> `;
        body.style.backgroundColor = "#f3f3f3";
        body.style.color = introMsg.style.color = "#444";
        logo.src = "img/logo.png";

    }

});