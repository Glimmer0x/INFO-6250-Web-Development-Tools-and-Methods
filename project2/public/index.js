/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAT_HISTORY": () => (/* binding */ CHAT_HISTORY),
/* harmony export */   "ERRORS": () => (/* binding */ ERRORS),
/* harmony export */   "LOGIN_STATUS": () => (/* binding */ LOGIN_STATUS)
/* harmony export */ });


var ERRORS = {
  "auth-missing": "You must be logged in to do that",
  "required-username": "You must provide a username",
  "invalid-input": "That is not a valid input",
  "auth-insufficient": "Your username/password is incorrect",
  "required-message": "You must provide a message",
  "invalid-message": "That is not a valid message",
  "network-message": "Internet interrupt! Cannot connect to server."
};
var LOGIN_STATUS = {
  login: false
};
var CHAT_HISTORY = {
  onlineUsers: [],
  chatHistory: []
};

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchChat": () => (/* binding */ fetchChat),
/* harmony export */   "fetchChatUpdate": () => (/* binding */ fetchChatUpdate),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });


function fetchLogin(username) {
  return fetch("/api/session/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch("/api/session/", {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch("/api/session/", {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchChat() {
  return fetch("/api/chat/", {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchChatUpdate(message) {
  return fetch("/api/chat/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayError": () => (/* binding */ displayError),
/* harmony export */   "renderChatPage": () => (/* binding */ renderChatPage),
/* harmony export */   "renderInitialPage": () => (/* binding */ renderInitialPage),
/* harmony export */   "toggleLoader": () => (/* binding */ toggleLoader)
/* harmony export */ });


var _require = __webpack_require__(/*! ./model.js */ "./src/model.js"),
  ERRORS = _require.ERRORS,
  LOGIN_STATUS = _require.LOGIN_STATUS,
  CHAT_HISTORY = _require.CHAT_HISTORY;
var displayError = function displayError(error) {
  var errorDomKey = LOGIN_STATUS.login ? ".chat-error" : ".login-error";
  var errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = ERRORS[error] || "You meet an unknown error";
};
var getChatHistoryItems = function getChatHistoryItems(chatHistory) {
  return Object.values(chatHistory.reverse()).map(function (history) {
    return "\n      <li>\n        <div class=\"message\">\n          <div class=\"sender-info\">\n            <div class=\"username-container\">\n              <span class=\"username\"><i>".concat(history.username, " :</i></span>\n            </div>\n          </div>\n          <div class=\"message-text-container\">\n            <p class=\"message-text\">").concat(history.message, "</p>\n          </div>\n        </div>\n      </li>\n      ");
  }).join("");
};
var getOnlineUserItems = function getOnlineUserItems(onlineUsers) {
  return " <li>\n        <div class=\"user\">\n          <h3 class=\"users-title\">Online Users</h3>\n        </div>\n      </li>\n    " + Object.values(onlineUsers).map(function (user) {
    return "\n      <li>\n        <div class=\"user\">\n          <span class=\"username\">".concat(user, "</span>\n        </div>\n      </li>\n    ");
  }).join("");
};
var renderChatPage = function renderChatPage() {
  var errorDomKey = ".chat-error";
  var errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = "";
  var chatHistoryDom = document.querySelector(".messages");
  var onlineUsersDom = document.querySelector(".users");
  var chatHistoryItems = getChatHistoryItems(CHAT_HISTORY.chatHistory);
  var onlineUserItems = getOnlineUserItems(CHAT_HISTORY.onlineUsers);
  chatHistoryDom.innerHTML = chatHistoryItems || "No message yet";
  onlineUsersDom.innerHTML = onlineUserItems;
};
var renderInitialPage = function renderInitialPage() {
  var loginPage = document.querySelector(".login-page");
  var wordPage = document.querySelector(".chat-app");
  var headerTitle = document.querySelector(".header-title");
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
    var errorDomKey = ".login-error";
    var errorBlock = document.querySelector(errorDomKey);
    errorBlock.innerText = "";
  }
};
var toggleLoader = function toggleLoader() {
  var loader = document.querySelector("#loader");
  loader.classList.toggle("loader");
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/


var _require = __webpack_require__(/*! ./services.js */ "./src/services.js"),
  fetchLogin = _require.fetchLogin,
  fetchSession = _require.fetchSession,
  fetchLogout = _require.fetchLogout,
  fetchChat = _require.fetchChat,
  fetchChatUpdate = _require.fetchChatUpdate;
var _require2 = __webpack_require__(/*! ./view.js */ "./src/view.js"),
  displayError = _require2.displayError,
  renderChatPage = _require2.renderChatPage,
  renderInitialPage = _require2.renderInitialPage,
  toggleLoader = _require2.toggleLoader;
var _require3 = __webpack_require__(/*! ./model.js */ "./src/model.js"),
  ERRORS = _require3.ERRORS,
  LOGIN_STATUS = _require3.LOGIN_STATUS,
  CHAT_HISTORY = _require3.CHAT_HISTORY;
var checkInputSecurity = function checkInputSecurity(data) {
  var regex = /<\s*[a-zA-Z]+\b[^>]*>(.*?)<\s*\/\s*[a-zA-Z]+\s*>/gi;
  return !regex.test(data);
};
var logInButton = document.querySelector(".login-button");
logInButton.addEventListener("click", function (event) {
  toggleLoader();
  var username = document.querySelector(".username-input").value.toLowerCase();
  if (!checkInputSecurity(username)) {
    toggleLoader();
    displayError("invalid-input");
  } else {
    fetchLogin(username)["catch"](function (error) {
      toggleLoader();
      LOGIN_STATUS.login = false;
      displayError(error.error);
      return Promise.reject(error.error);
    }).then(function (data) {
      toggleLoader();
      LOGIN_STATUS.login = true;
      renderInitialPage();
      renderChatPage();
    });
  }
  event.preventDefault();
});
var logOutButton = document.querySelector(".logout-button");
logOutButton.addEventListener("click", function (event) {
  fetchLogout()["catch"](function (error) {
    displayError(error.error);
    return Promise.reject(error.error);
  }).then(function () {
    LOGIN_STATUS.login = false;
    renderInitialPage();
  });
  event.preventDefault();
});
var getUpdate = function getUpdate() {
  if (LOGIN_STATUS.login) {
    fetchChat()["catch"](function (error) {
      displayError(error.error);
      return Promise.reject(error.error);
    }).then(function (data) {
      CHAT_HISTORY.onlineUsers = data.onlineUsers;
      CHAT_HISTORY.chatHistory = data.chatHistory;
      renderChatPage();
    });
  }
};
var submitChatButton = document.querySelector(".send-button");
submitChatButton.addEventListener("click", function (event) {
  var inputMessageDom = document.querySelector("#sendText");
  var inputMessage = inputMessageDom.value;
  if (!checkInputSecurity(inputMessage)) {
    displayError("invalid-input");
  } else {
    fetchChatUpdate(inputMessage)["catch"](function (error) {
      displayError(error.error);
      return Promise.reject(error.error);
    }).then(function (data) {
      inputMessageDom.value = "";
    });
    getUpdate();
  }
  event.stopPropagation();
  event.preventDefault();
});
toggleLoader();
fetchSession()["catch"](function (error) {
  toggleLoader();
  LOGIN_STATUS.login = false;
  displayError(error.error);
  return Promise.reject(error.error);
}).then(function (data) {
  toggleLoader();
  LOGIN_STATUS.login = true;
  renderInitialPage();
  getUpdate();
});
setInterval(getUpdate, 5000);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map