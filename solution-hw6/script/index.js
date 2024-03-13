const cart = []

// Function to retrieve cart from local storage
function retrieveCartFromLocalStorage() {
    // Get the cart data from local storage
    const cartData = localStorage.getItem('cartItems');
    const cart = JSON.parse(cartData);
    return cart;
}


if (localStorage.getItem('cartItems')) {
    console.log("here yay");
    const cart = retrieveCartFromLocalStorage();
    document.querySelector('.notification').innerText = cart.length.toString();//
    console.log(cart);
} else {
    console.log("no local");
    cart = [];
}


function saveCartLocal() {
    let cartListString = JSON.stringify(Array.from(cart));
    console.log(cartListString);
    localStorage.setItem('cartItems', cartListString);
}