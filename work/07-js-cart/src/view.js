const renderProduct = (products) => { 
    const productContainer = document.querySelector('.products-container');
    const productsHTML = products.map(product => { 
        return `
            <div class="product">
                <div class="product-image">
                    <img src="${product.imgURL}" alt="Product">
                </div>
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <span class="product-description">${product.description}</span>
                    <div class="price-container">
                        <span class="price">$${product.price}</span>
                        <button data-id=${product.id} class="add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        `
    }).join('');
    productContainer.innerHTML = productsHTML;
}

const renderCart = (carts) => { 
    const cartList = document.querySelector('.cart-list');
    const viewCartButton = document.querySelector('.button-cart');
    if (!cartList.classList.contains('hidden')) {
        viewCartButton.textContent = `Hide Cart`;

        if (carts.length) {
            const cartSummary = `
                <div class="cart-summary">
                    <div class="cart-summary-total">
                        <span>Number: </span>
                        <span> ${carts.map(item => { return item.quantity }).reduce((a, b) => a + b, 0)}</span>
                    </div>
                    <div class="cart-summary-cost">
                        <span>Cost: </span>
                        <span> $${(carts.map(item => { return item.price * item.quantity }).reduce((a, b) => a + b, 0)).toFixed(2)}</span>
                    </div>
                </div>
            `;

            const cartCheckout = `
                <button class="cart-checkout">Checkout</button>
            `;

            const cartListHTML = carts.map(cartItem => { 
                return `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <div class="cart-item-image">
                                    <img src=${cartItem.imgURL} alt="Product">
                                </div>
                                <span class="cart-item-name">${cartItem.name}</span>
                                <span class="cart-item-cost">${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                            </div>
                            <div class="cart-item-quantity">
                                <button data-id=${cartItem.id} class="cart-item-quantity-remove">-</button>
                                <span>${cartItem.quantity}</span>
                                <button data-id=${cartItem.id} class="cart-item-quantity-add">+</button>
                            </div>
                        </div>
                `
            }).join('');
            
            cartList.innerHTML = cartSummary + cartCheckout + cartListHTML;
        }
        else { cartList.innerHTML = `<div>Nothing in the cart</div>`; }
    }
    else { 
        viewCartButton.textContent = carts.length ? `View Cart (${carts.map(item => {return item.quantity }).reduce((a, b) => a + b, 0)})` : `View Cart`;
    }
}

const renderFor = {
    product: renderProduct,
    cart: renderCart
}

const render = (page, contents) => { 
    renderFor[page](contents);
}

module.exports = {
    render
}