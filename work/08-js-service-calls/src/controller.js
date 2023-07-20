"use strict";
const {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchWord,
  fetchWordUpdate,
} = require("./services.js");
const {
  displayError,
  renderWordPage,
  renderInitialPage,
} = require("./view.js");
const { ERRORS, LOGIN_STATUS, DATA_CONTENT } = require("./model.js");

const checkInputSecurity = (data) => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (regex.test(data)) {
    return true;
  }
  return false;
};

const displayDataPage = () => {
  fetchWord()
    .catch((error) => {
      displayError(error.error);
      return Promise.reject(error.error);
    })
    .then((data) => {
      DATA_CONTENT.word = data.storedWord || "";
      renderWordPage();
    });
};

const logInButton = document.querySelector(".login-button");
logInButton.addEventListener("click", (event) => {
  const username = document
    .querySelector(".username-input")
    .value.toLowerCase();
  if (!checkInputSecurity(username)) {
    displayError("invalid-input");
  } else {
    fetchLogin(username)
      .catch((error) => {
        LOGIN_STATUS.login = false;
        displayError(error.error);
        return Promise.reject(error.error);
      })
      .then((data) => {
        LOGIN_STATUS.login = true;
        DATA_CONTENT.username = username;
        renderInitialPage();
        displayDataPage();
      });
  }
  event.preventDefault();
});

const logOutButton = document.querySelector(".logout-button");
logOutButton.addEventListener("click", (event) => {
  fetchLogout()
    .catch((error) => {
      displayError(error.error);
      return Promise.reject(error.error);
    })
    .then(() => {
      LOGIN_STATUS.login = false;
      DATA_CONTENT.username = "";
      DATA_CONTENT.word = "";
      renderInitialPage();
    });
  event.preventDefault();
});

const submitWordButton = document.querySelector(".word-button");
submitWordButton.addEventListener("click", (event) => {
  const word = document.querySelector(".word-input").value;

  if (!checkInputSecurity(word)) {
    displayError("invalid-input");
  } else {
    fetchWordUpdate(word)
      .catch((error) => {
        displayError(error.error);
        return Promise.reject(error.error);
      })
      .then((data) => {
        DATA_CONTENT.word = data.storedWord;
        renderWordPage();
      });
  }
  event.preventDefault();
});

fetchSession()
  .catch((error) => {
    LOGIN_STATUS.login = false;
    displayError(error.error);
    return Promise.reject(error.error);
  })
  .then((data) => {
    LOGIN_STATUS.login = true;
    DATA_CONTENT.username = data.username;
    renderInitialPage();
    displayDataPage();
  });
