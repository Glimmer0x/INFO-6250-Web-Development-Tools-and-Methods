"use strict";
const {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchChat,
  fetchChatUpdate,
} = require("./services.js");
const {
  displayError,
  renderChatPage,
  renderInitialPage,
  toggleLoader,
} = require("./view.js");
const { ERRORS, LOGIN_STATUS, CHAT_HISTORY } = require("./model.js");

const checkInputSecurity = (data) => {
  const regex = /<\s*[a-zA-Z]+\b[^>]*>(.*?)<\s*\/\s*[a-zA-Z]+\s*>/gi;
  return !regex.test(data);
};

const logInButton = document.querySelector(".login-button");
logInButton.addEventListener("click", (event) => {
  toggleLoader();
  const username = document
    .querySelector(".username-input")
    .value.toLowerCase();
  if (!checkInputSecurity(username)) {
    toggleLoader();
    displayError("invalid-input");
  } else {
    fetchLogin(username)
      .catch((error) => {
        toggleLoader();
        LOGIN_STATUS.login = false;
        displayError(error.error);
        return Promise.reject(error.error);
      })
      .then((data) => {
        toggleLoader();
        LOGIN_STATUS.login = true;
        renderInitialPage();
        renderChatPage();
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
      renderInitialPage();
    });
  event.preventDefault();
});

const getUpdate = () => {
  if (LOGIN_STATUS.login) {
    fetchChat()
      .catch((error) => {
        displayError(error.error);
        return Promise.reject(error.error);
      })
      .then((data) => {
        CHAT_HISTORY.onlineUsers = data.onlineUsers;
        CHAT_HISTORY.chatHistory = data.chatHistory;
        renderChatPage();
      });
  }
};

const submitChatButton = document.querySelector(".send-button");
submitChatButton.addEventListener("click", (event) => {
  const inputMessageDom = document.querySelector("#sendText");
  const inputMessage = inputMessageDom.value;
  if (!checkInputSecurity(inputMessage)) {
    displayError("invalid-input");
  } else {
    fetchChatUpdate(inputMessage)
      .catch((error) => {
        displayError(error.error);
        return Promise.reject(error.error);
      })
      .then((data) => {
        inputMessageDom.value = "";
      });

    getUpdate();
  }
  event.stopPropagation();
  event.preventDefault();
});

toggleLoader();
fetchSession()
  .catch((error) => {
    toggleLoader();
    LOGIN_STATUS.login = false;
    displayError(error.error);
    return Promise.reject(error.error);
  })
  .then((data) => {
    toggleLoader();
    LOGIN_STATUS.login = true;
    renderInitialPage();
    getUpdate();
  });

setInterval(getUpdate, 5000);
