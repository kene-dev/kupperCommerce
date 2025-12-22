//ARRAY METHODS
// push (Adds items into an array, in a first come first serve basis)
// unshift (Adds items into an array, but from the first item)
// shift Removes items from an array, but from the first item)
// pop Removes items from an array, but from the last item)


const products = [
    {
    id: 1, //Data type of number
    name: "keyholder", //Data type of string
    price: 20, //Data type of string
    },
    {
    id: 2, //Data type of number
    name: "toothpaste", //Data type of string
    price: 10, //Data type of string
    },
    {
    id: 3, //Data type of number
    name: "Cereal", //Data type of string
    price: 15, //Data type of string
    },
    {
    id: 4, //Data type of number
    name: "Nail Clipper", //Data type of string
    price: 10, //Data type of string
    },
]

// ARRAYS IN JAVASCRIPT
const totalSum = products.reduce((sum, product) => sum + product.price, 0)

const cartItems = [];

const addToCart = (product) => {
    const productExists = cartItems.find(item => item.id === product.id)
    if(productExists){
        console.log('product already exists')
    }else{
        cartItems.push(product)
    }
}

const removeFromCart = (product) => {
   const productExists = cartItems.find(item => item.id === product.id)
   if(productExists){
   const newCart =  cartItems.filter(item => item.id !== productExists.id)
    return newCart
   }else return
}

addToCart(products[2])
addToCart(products[0])

console.log(cartItems)

console.log(removeFromCart(products[0]))
