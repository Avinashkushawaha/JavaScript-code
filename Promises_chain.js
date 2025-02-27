const cart = ["shoes", "pants", "Kurta"];

const promise = createOrder(cart);
    
promise.then(function() {

    const pr = new Promise(function(resolve, reject) {

        if(validateCart(cart)) {
            const err = new Error("Invalid Cart");
            reject(err);
        }
        const orderId = "12345";
        if (orderId){
            resolve(orderId);
        }

    });
    return pr;


})