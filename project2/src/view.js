"use strict";
const { ERRORS, LOGIN_STATUS, CHAT_HISTORY } = require("./model.js");

export const displayError = (error) => {
  const errorDomKey = LOGIN_STATUS.login ? ".chat-error" : ".login-error";
  const errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = ERRORS[error] || "You meet an unknown error";
};

const getChatHistoryItems = (chatHistory) => {
  return Object.values(chatHistory.reverse())
    .map(
      (history) => `
      <li>
        <div class="message">
          <div class="sender-info">
            <div class="username-container">
              <span class="username"><i>${history.username} :</i></span>
            </div>
          </div>
          <div class="message-text-container">
            <p class="message-text">${history.message}</p>
          </div>
        </div>
      </li>
      `
    )
    .join("");
};

const getOnlineUserItems = (onlineUsers) => {
  return (
    ` <li>
        <div class="user">
          <h3 class="users-title">Online Users</h3>
        </div>
      </li>
    ` +
    Object.values(onlineUsers)
      .map(
        (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
      )
      .join("")
  );
};

export const renderChatPage = () => {
  const errorDomKey = ".chat-error";
  const errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = "";
  const chatHistoryDom = document.querySelector(".messages");
  const onlineUsersDom = document.querySelector(".users");

  const chatHistoryItems = getChatHistoryItems(CHAT_HISTORY.chatHistory);
  const onlineUserItems = getOnlineUserItems(CHAT_HISTORY.onlineUsers);

  chatHistoryDom.innerHTML = chatHistoryItems || "No message yet";
  onlineUsersDom.innerHTML = onlineUserItems;
};

export const renderInitialPage = () => {
  const loginPage = document.querySelector(".login-page");
  const wordPage = document.querySelector(".chat-app");
  const headerTitle = document.querySelector(".header-title");
  if (LOGIN_STATUS.login) {
    if (!loginPage.classList.contains("hidden")) {
      loginPage.classList.toggle("hidden");
    }
    if (wordPage.classList.contains("hidden")) {
      wordPage.classList.toggle("hidden");
    }
    headerTitle.innerText = "Chat Page";
    renderChatPage();
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

export const toggleLoader = () => {
  const loader = document.querySelector("#loader");
  loader.classList.toggle("loader");
};
