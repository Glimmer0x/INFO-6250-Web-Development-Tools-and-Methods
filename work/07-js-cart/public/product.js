/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((module) => {

var states = {
  product: {
    page: "product",
    products: [{
      id: 1,
      name: 'Blue Eye Cart',
      imgURL: 'http://placekitten.com/150/150?image=1',
      description: 'A blue eye cart. Very cute, you will love it.',
      price: "0.99"
    }, {
      id: 2,
      name: 'Variegated Cart',
      imgURL: 'http://placekitten.com/150/150?image=2',
      description: 'Carts with variegated colors. They love to group together.',
      price: "3.14"
    }, {
      id: 3,
      name: 'White black Cart',
      imgURL: 'http://placekitten.com/150/150?image=3',
      description: 'A cat with only black and white color. It loves to play when snowing.',
      price: "2.73"
    }]
  },
  cart: {
    page: "cart",
    carts: []
  }
};
module.exports = {
  states: states
};

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((module) => {

var renderProduct = function renderProduct(products) {
  var productContainer = document.querySelector('.products-container');
  var productsHTML = products.map(function (product) {
    return "\n            <div class=\"product\">\n                <div class=\"product-image\">\n                    <img src=\"".concat(product.imgURL, "\" alt=\"Product\">\n                </div>\n                <div class=\"product-info\">\n                    <h2>").concat(product.name, "</h2>\n                    <span class=\"product-description\">").concat(product.description, "</span>\n                    <div class=\"price-container\">\n                        <span class=\"price\">$").concat(product.price, "</span>\n                        <button data-id=").concat(product.id, " class=\"add-to-cart\">Add to cart</button>\n                    </div>\n                </div>\n            </div>\n        ");
  }).join('');
  productContainer.innerHTML = productsHTML;
};
var renderCart = function renderCart(carts) {
  var cartList = document.querySelector('.cart-list');
  var viewCartButton = document.querySelector('.button-cart');
  if (!cartList.classList.contains('hidden')) {
    viewCartButton.textContent = "Hide Cart";
    if (carts.length) {
      var cartSummary = "\n                <div class=\"cart-summary\">\n                    <div class=\"cart-summary-total\">\n                        <span>Number: </span>\n                        <span> ".concat(carts.map(function (item) {
        return item.quantity;
      }).reduce(function (a, b) {
        return a + b;
      }, 0), "</span>\n                    </div>\n                    <div class=\"cart-summary-cost\">\n                        <span>Cost: </span>\n                        <span> $").concat(carts.map(function (item) {
        return item.price * item.quantity;
      }).reduce(function (a, b) {
        return a + b;
      }, 0).toFixed(2), "</span>\n                    </div>\n                </div>\n            ");
      var cartCheckout = "\n                <button class=\"cart-checkout\">Checkout</button>\n            ";
      var cartListHTML = carts.map(function (cartItem) {
        return "\n                        <div class=\"cart-item\">\n                            <div class=\"cart-item-info\">\n                                <div class=\"cart-item-image\">\n                                    <img src=".concat(cartItem.imgURL, " alt=\"Product\">\n                                </div>\n                                <span class=\"cart-item-name\">").concat(cartItem.name, "</span>\n                                <span class=\"cart-item-cost\">").concat((cartItem.price * cartItem.quantity).toFixed(2), "</span>\n                            </div>\n                            <div class=\"cart-item-quantity\">\n                                <button data-id=").concat(cartItem.id, " class=\"cart-item-quantity-remove\">-</button>\n                                <span>").concat(cartItem.quantity, "</span>\n                                <button data-id=").concat(cartItem.id, " class=\"cart-item-quantity-add\">+</button>\n                            </div>\n                        </div>\n                ");
      }).join('');
      cartList.innerHTML = cartSummary + cartCheckout + cartListHTML;
    } else {
      cartList.innerHTML = "<div>Nothing in the cart</div>";
    }
  } else {
    viewCartButton.textContent = carts.length ? "View Cart (".concat(carts.map(function (item) {
      return item.quantity;
    }).reduce(function (a, b) {
      return a + b;
    }, 0), ")") : "View Cart";
  }
};
var renderFor = {
  product: renderProduct,
  cart: renderCart
};
var render = function render(page, contents) {
  renderFor[page](contents);
};
module.exports = {
  render: render
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
var _require = __webpack_require__(/*! ./model.js */ "./src/model.js"),
  states = _require.states;
var _require2 = __webpack_require__(/*! ./view.js */ "./src/view.js"),
  render = _require2.render;
var product = states.product,
  cart = states.cart;
var cartList = document.querySelector('.cart-list');
var viewCartButton = document.querySelector('.button-cart');
viewCartButton.addEventListener('click', function () {
  cartList.classList.toggle('hidden');
  cartList.classList.toggle('cart-list-view');
  render(cart.page, cart.carts);
});
cartList.addEventListener('click', function (e) {
  if (e.target.classList.contains('cart-item-quantity-remove')) {
    var cartItemID = parseInt(e.target.dataset.id);
    var cartItem = cart.carts.find(function (cartItem) {
      return cartItem.id === cartItemID;
    });
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      cart.carts = cart.carts.filter(function (cartItem) {
        return cartItem.id !== cartItemID;
      });
    }
    render(cart.page, cart.carts);
    return;
  }
  if (e.target.classList.contains('cart-item-quantity-add')) {
    var _cartItemID = parseInt(e.target.dataset.id);
    var _cartItem = cart.carts.find(function (cartItem) {
      return cartItem.id === _cartItemID;
    });
    _cartItem.quantity++;
    render(cart.page, cart.carts);
    return;
  }
  if (e.target.classList.contains('cart-checkout')) {
    cart.carts = [];
    render(cart.page, cart.carts);
    return;
  }
});
var productContainer = document.querySelector('.products-container');
productContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    var productID = parseInt(e.target.dataset.id);
    var selectProductItem = product.products.find(function (productItem) {
      return productItem.id === productID;
    });
    var cartItem = cart.carts.find(function (cartItem) {
      return cartItem.id === productID;
    });
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.carts.push({
        id: selectProductItem.id,
        imgURL: selectProductItem.imgURL,
        name: selectProductItem.name,
        price: parseFloat(selectProductItem.price),
        quantity: 1
      });
    }
    render(cart.page, cart.carts);
  }
});
render(product.page, product.products);
render(cart.page, cart.carts);
})();

/******/ })()
;
//# sourceMappingURL=product.js.map