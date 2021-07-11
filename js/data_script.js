"use strict";
// !! *********************** All Targeted Html Elements *******************************
const introMsg = document.querySelector(".intro_msg");
const curBalance = document.querySelector(".current_balance");
const inVal = document.querySelector(".in_value");
const outVal = document.querySelector(".out_value");
const interestVal = document.querySelector(".interest_value");
const mainContent = document.querySelector(".container");
const currDate = document.querySelector(".current_date");
const sortSign = document.querySelector(".sort_sign");
const sortVal = document.querySelector(".sort_val");
const timeVal = document.querySelector(".time");
const mode = document.querySelector("#mode");
const icon = document.querySelector("#icon");
const body = document.body;
const logo = document.querySelector("#logo");



const movBox = document.querySelector(".mov_box");
const movement = document.querySelector(".movements")



const userInput = document.querySelector(".user_input");
const inputPin = document.querySelector(".pin_input");
const transferMoneyto = document.querySelector(".transfer_to");
const transferAmount = document.querySelector(".amount_transfer");
const requestAmount = document.querySelector(".amount_request");
const confirmUser = document.querySelector(".confirm_user");
const confirmPin = document.querySelector(".confirm_pin");


const loginBtn = document.querySelector(".login_btn");
const transferBtn = document.querySelector(".transfer_btn");
const loanBtn = document.querySelector(".loan_btn");
const closeBtn = document.querySelector(".close_btn");
const sortBtn = document.querySelector("#btn_sort");






// !! ************************* Basic variables/Data ************************
// Data
const account1 = {
    owner: 'Hafiz Muzamil Ahmad',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-01T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account2 = {
    owner: 'Muhammad Uzair Baig',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Fasih Ur Rehman',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-01T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account4 = {
    owner: 'Muhammad Numan Anees',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];



// !! ************************* General Functions ************************

// FIX: function to Calculate no of days b/w two dates 
const noOfDays = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

// Fix: function to calculate value according to given locale and currency
const formattedCurrency = function (value, locale, curr) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr,
    }).format(value);
}

// FIX: function that return formatted date pattern for movement box
const formattedDate = function (d, locale) {
    const passedDays = noOfDays(new Date(), d);
    if (passedDays === 0) return "Today";
    if (passedDays === 1) return "Yesterday";
    if (passedDays <= 7) return `${passedDays} ago`;
    else return new Intl.DateTimeFormat(locale).format(Number(d));
};

//FIX: Create usernames
const createUserNames = function (accounts) {

    accounts.forEach(function (acc) {
        acc.userName = acc.owner.toLowerCase().split(" ").map(each => each[0]).join("");
    })
};