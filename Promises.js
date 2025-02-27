const cart = ["apple", "orange", "banana"];

createOrder(cart, function(orderId) {
  proceedTopayment(orderId);
});


// const promise = createOrder(cart);
