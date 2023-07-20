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
/* harmony export */   "DATA_CONTENT": () => (/* binding */ DATA_CONTENT),
/* harmony export */   "ERRORS": () => (/* binding */ ERRORS),
/* harmony export */   "LOGIN_STATUS": () => (/* binding */ LOGIN_STATUS)
/* harmony export */ });


var ERRORS = {
  "auth-missing": "You must be logged in to do that",
  "required-username": "You must provide a username",
  "invalid-input": "That is not a valid input",
  "auth-insufficient": "Your username/password is incorrect",
  "required-word": "You must provide a word",
  "invalid-word": "That is not a valid word",
  "network-error": "Internet interrupt! Cannot connect to server."
};
var LOGIN_STATUS = {
  login: false
};
var DATA_CONTENT = {
  username: "",
  word: ""
};

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchWord": () => (/* binding */ fetchWord),
/* harmony export */   "fetchWordUpdate": () => (/* binding */ fetchWordUpdate)
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
function fetchWord() {
  return fetch("/api/word/", {
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
function fetchWordUpdate(word) {
  return fetch("/api/word/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      word: word
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
/* harmony export */   "renderInitialPage": () => (/* binding */ renderInitialPage),
/* harmony export */   "renderWordPage": () => (/* binding */ renderWordPage)
/* harmony export */ });


var _require = __webpack_require__(/*! ./model.js */ "./src/model.js"),
  ERRORS = _require.ERRORS,
  LOGIN_STATUS = _require.LOGIN_STATUS,
  DATA_CONTENT = _require.DATA_CONTENT;
var displayError = function displayError(error) {
  var errorDomKey = LOGIN_STATUS.login ? ".word-error" : ".login-error";
  var errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = ERRORS[error] || "You meet an unknown error";
};
var renderWordPage = function renderWordPage() {
  var usernameDom = document.querySelector(".username-display");
  var wordDom = document.querySelector(".word-display");
  var errorDomKey = ".word-error";
  var errorBlock = document.querySelector(errorDomKey);
  errorBlock.innerText = "";
  usernameDom.innerText = DATA_CONTENT.username;
  wordDom.innerText = DATA_CONTENT.word;
};
var renderInitialPage = function renderInitialPage() {
  var loginPage = document.querySelector(".login-page");
  var wordPage = document.querySelector(".word-page");
  var headerTitle = document.querySelector(".header-title");
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
    var errorDomKey = ".login-error";
    var errorBlock = document.querySelector(errorDomKey);
    errorBlock.innerText = "";
  }
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
  fetchWord = _require.fetchWord,
  fetchWordUpdate = _require.fetchWordUpdate;
var _require2 = __webpack_require__(/*! ./view.js */ "./src/view.js"),
  displayError = _require2.displayError,
  renderWordPage = _require2.renderWordPage,
  renderInitialPage = _require2.renderInitialPage;
var _require3 = __webpack_require__(/*! ./model.js */ "./src/model.js"),
  ERRORS = _require3.ERRORS,
  LOGIN_STATUS = _require3.LOGIN_STATUS,
  DATA_CONTENT = _require3.DATA_CONTENT;
var checkInputSecurity = function checkInputSecurity(data) {
  var regex = /^[a-zA-Z0-9]+$/;
  if (regex.test(data)) {
    return true;
  }
  return false;
};
var displayDataPage = function displayDataPage() {
  fetchWord()["catch"](function (error) {
    displayError(error.error);
    return Promise.reject(error.error);
  }).then(function (data) {
    DATA_CONTENT.word = data.storedWord || "";
    renderWordPage();
  });
};
var logInButton = document.querySelector(".login-button");
logInButton.addEventListener("click", function (event) {
  var username = document.querySelector(".username-input").value.toLowerCase();
  if (!checkInputSecurity(username)) {
    displayError("invalid-input");
  } else {
    fetchLogin(username)["catch"](function (error) {
      LOGIN_STATUS.login = false;
      displayError(error.error);
      return Promise.reject(error.error);
    }).then(function () {
      LOGIN_STATUS.login = true;
      DATA_CONTENT.username = username;
      renderInitialPage();
      displayDataPage();
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
    DATA_CONTENT.username = "";
    DATA_CONTENT.word = "";
    renderInitialPage();
  });
  event.preventDefault();
});
var submitWordButton = document.querySelector(".word-button");
submitWordButton.addEventListener("click", function (event) {
  var word = document.querySelector(".word-input").value;
  if (!checkInputSecurity(word)) {
    displayError("invalid-input");
  } else {
    fetchWordUpdate(word)["catch"](function (error) {
      displayError(error.error);
      return Promise.reject(error.error);
    }).then(function (data) {
      DATA_CONTENT.word = data.storedWord;
      renderWordPage();
    });
  }
  event.preventDefault();
});
fetchSession()["catch"](function (error) {
  LOGIN_STATUS.login = false;
  displayError(error.error);
  return Promise.reject(error.error);
}).then(function (data) {
  LOGIN_STATUS.login = true;
  DATA_CONTENT.username = data.username;
  renderInitialPage();
  displayDataPage();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map