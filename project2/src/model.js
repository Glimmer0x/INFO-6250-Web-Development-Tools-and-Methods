"use strict";
export const ERRORS = {
  "auth-missing": "You must be logged in to do that",
  "required-username": "You must provide a username",
  "invalid-input": "That is not a valid input",
  "auth-insufficient": "Your username/password is incorrect",
  "required-message": "You must provide a message",
  "invalid-message": "That is not a valid message",
  "network-message": "Internet interrupt! Cannot connect to server.",
};

export const LOGIN_STATUS = {
  login: false,
};

export const CHAT_HISTORY = {
  onlineUsers: [],
  chatHistory: [],
};
