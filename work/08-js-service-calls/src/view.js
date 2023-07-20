"use strict";
const { ERRORS, LOGIN_STATUS, DATA_CONTENT } = require("./model.js");

export const displayError = (error) => {
  const errorDomKey = LOGIN_STATUS.login ? ".word-error" : ".login-error";
  const errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = ERRORS[error] || "You meet an unknown error";
};

export const renderWordPage = () => {
  const usernameDom = document.querySelector(".username-display");
  const wordDom = document.querySelector(".word-display");

  const errorDomKey = ".word-error";
  const errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = "";

  usernameDom.innerText = DATA_CONTENT.username;
  wordDom.innerText = DATA_CONTENT.word;
};

export const renderInitialPage = () => {
  const loginPage = document.querySelector(".login-page");
  const wordPage = document.querySelector(".word-page");
  const headerTitle = document.querySelector(".header-title");
  if (LOGIN_STATUS.login) {
    if (!loginPage.classList.contains("hidden")) {
      loginPage.classList.toggle("hidden");
    }
    if (wordPage.classList.contains("hidden")) {
      wordPage.classList.toggle("hidden");
    }
    headerTitle.innerText = "Data Page";
    renderWordPage();
  } else {
    if (loginPage.classList.contains("hidden")) {
      loginPage.classList.toggle("hidden");
    }
    if (!wordPage.classList.contains("hidden")) {
      wordPage.classList.toggle("hidden");
    }
    headerTitle.innerText = "Log In";
    const errorDomKey = ".login-error";
    const errorBlock = document.querySelector(errorDomKey);
    errorBlock.innerText = "";
  }
};
