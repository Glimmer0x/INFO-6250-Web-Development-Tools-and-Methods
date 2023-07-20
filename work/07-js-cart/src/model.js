const states = {
    product: {
        page: "product",
        products: [
            {
                id: 1,
                name: 'Blue Eye Cart',
                imgURL: 'http://placekitten.com/150/150?image=1',
                description: 'A blue eye cart. Very cute, you will love it.',
                price: "0.99"
            },
            {
                id: 2,
                name: 'Variegated Cart',
                imgURL: 'http://placekitten.com/150/150?image=2',
                description: 'Carts with variegated colors. They love to group together.',
                price: "3.14"
            },
            {
                id: 3,
                name: 'White black Cart',
                imgURL: 'http://placekitten.com/150/150?image=3',
                description: 'A cat with only black and white color. It loves to play when snowing.',
                price: "2.73"
            }
        ],
    },
    cart: {
        page: "cart",
        carts: []
    }
}

module.exports = {
    states
}