// const cart = ["apple", "orange", "banana"];

// createOrder(cart, function(orderId) {
//   proceedTopayment(orderId);
// });


// const promise = createOrder(cart);




const  cart = ["apple", "orange", "banana"];

createOrder(cart, function(orderId) {
  proceedTopayment(orderId, function (paymenInfo){
    showOrderSummary(paymentInfo, function (){
        updateWalletBalance();
    });
  });
});

// createOrder(cart)
// .then(orderId) =>  proceedTopayment(orderId))
// .then(paymentInfo) => showOrderSummary(paymentInfo))
// .then(()=> updateWalletBalance(paymentInfo));
