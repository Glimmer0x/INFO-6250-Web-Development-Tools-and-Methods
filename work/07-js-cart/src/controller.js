const {states} = require('./model.js');
const {render} = require('./view.js');

const { product, cart } = states;

const cartList = document.querySelector('.cart-list');
const viewCartButton = document.querySelector('.button-cart');
viewCartButton.addEventListener('click', () => { 
    cartList.classList.toggle('hidden');
    cartList.classList.toggle('cart-list-view');
    render(cart.page, cart.carts);
});

cartList.addEventListener('click', (e) => { 
    if (e.target.classList.contains('cart-item-quantity-remove')) {
        const cartItemID = parseInt(e.target.dataset.id);
        const cartItem = cart.carts.find(cartItem => cartItem.id === cartItemID);
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            cart.carts = cart.carts.filter(cartItem => cartItem.id !== cartItemID);
        }
        render(cart.page, cart.carts);
        return ;
    }
    if (e.target.classList.contains('cart-item-quantity-add')) {
        const cartItemID = parseInt(e.target.dataset.id);
        const cartItem = cart.carts.find(cartItem => cartItem.id === cartItemID);
        cartItem.quantity++;
        
        render(cart.page, cart.carts);
        return ;
    }

    if (e.target.classList.contains('cart-checkout')) {
        cart.carts = [];
        render(cart.page, cart.carts);
        return ;
    }
});

const productContainer = document.querySelector('.products-container');
productContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productID = parseInt(e.target.dataset.id);
        const selectProductItem = product.products.find(productItem => productItem.id === productID);
        const cartItem = cart.carts.find(cartItem => cartItem.id === productID);
        if (cartItem) {
            cartItem.quantity++;
        }
        else {
            cart.carts.push(
                {
                id: selectProductItem.id,
                imgURL: selectProductItem.imgURL,
                name: selectProductItem.name,
                price: parseFloat(selectProductItem.price),
                quantity: 1
            }
            );
        }
        render(cart.page, cart.carts);
    }
});


render(product.page, product.products);
render(cart.page, cart.carts);

